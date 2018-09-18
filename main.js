const config = require('./config');
const request = require('./request');
const {installEventListener} = require('./event');
const {DownloadTask, downloadFile} = require('./download');

class Main {
  constructor(options){
    this.options = {
      username: options.username || 'm-3102',
      type: options.type || 'photo',
      page: options.page || 0,
      thread: options.thread || config.download.thread
    }

    this.url = `/blog/${this.options.username}/posts/${this.options.type}?api_key=${config.api.key}`;

    const e = {};
    this.eventlistener = installEventListener(e);
    this.eventInit();

    this.list = new DownloadTask();
    this.final = this.options.thread;
    this.init();
  }

  init() {
    if(this.options.page) {
      this.getFileList(this.options.page);
    }else {
      this.getPageNumber();
    }
  }

  eventInit(){
    this.eventlistener.listen('error', (message)=>{
      console.log(`在${message.message}时发生了错误，错误信息 ${message.err}`);
    })
    this.eventlistener.listen('get-page-number-finished', (message)=>{
      console.log(`检索到资源共计 ${message} 页`);
      this.getFileList(this.options.page);
    })
    this.eventlistener.listen('get-file-success', (page)=>{
      this.getFileList(page);
    })
    this.eventlistener.listen('get-file-finished', (message)=>{
      console.log(`下载任务已创建，共计 ${message} 项`);
      this.list = this.list.get();
      this.createDownloadTasks(this.options.thread);
    })
    this.eventlistener.listen('download-file-success', (message)=>{
      this.callDownloadTask();
    })
    this.eventlistener.listen('download-file-final', ()=>{
      this.final -= 1;
      if(this.final <= 0) console.log('下载任务已完成');
    })
  }

  getPageNumber() {
    request.get(config.api.baseURL+this.url).then((res)=>{
      const json = JSON.parse(res);
      if (json.meta.status == 200) {
        this.options.page = Math.ceil(json.response.total_posts / 20);
        this.eventlistener.trigger('get-page-number-finished', this.options.page);
      }
    })
  }

  getFileName(url, type) {
    return type == 'photo' ? url.split('/')[4] : url.split('/')[3];
  }

  async getFileList(page){
    if(page <= 0) return this.eventlistener.trigger('get-file-finished', this.list.get().length);
    await request.get(config.api.baseURL + this.url + `&offset=${(page-1)*20}`).then((res)=>{
      const json = JSON.parse(res);
      for (const key in json.response.posts) {
        const item = json.response.posts[key];
        if(item.type == 'photo' || item.type == 'video'){
          if (this.options.type == 'photo') {
            for (let i = 0; i < item.photos.length; i++) {
              const url = item.photos[i].original_size.url;
              if(url) this.list.push(url);            
            }
          }else {
            const url = item.video_url;
            if(url) this.list.push(url);
          }
        }
      }
      this.eventlistener.trigger('get-file-success', page-1);
    }).catch((err)=>{
      const message = '获取下载文件列表';
      this.eventlistener.trigger('error', {message, err})
      this.eventlistener.trigger('get-file-success', page-1);
    })
  }

  createDownloadTasks(num) {
    for(let i = num; i > 0; i--) {
      this.callDownloadTask();
    }
  }

  callDownloadTask() {
    if(this.list.length <= 0) return this.eventlistener.trigger('download-file-final');
    const item = this.list.pop(), path = `${config.download.path}/${this.options.username}`;
    downloadFile(item, this.getFileName(item, this.options.type), path, this.eventlistener);
  }
}

module.exports = Main;