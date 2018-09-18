const fs = require('fs');
const request = require('./request');

class DownloadTask {
  constructor() {
    this.list = new Array();
  }
  get() {
    return Array.from(new Set(this.list));
  }
  push(item) {
    if(item in this.list) return false;
    this.list.push(item);
    return true;
  }
}

async function downloadFile(url, filename, path, e) {
  if(!fs.existsSync(path)) fs.mkdirSync(path);
  const filepath = `${path}/${filename}`;
  if(!fs.existsSync(filepath)) {
    await request.get(url ,{encoding: 'binary'}).then((res)=>{
      fs.writeFileSync(filepath,res,'binary');
      e.trigger('download-file-success')
    }).catch((err)=>{
      e.trigger('error', {err, message: `下载 ${filename} 文件`});
      e.trigger('download-file-success')
    });
  }else {
    e.trigger('download-file-success');
  }
}

module.exports = {DownloadTask, downloadFile};