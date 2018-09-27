const crypto = require('crypto');
const fs = require('fs');

class List {
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

const hash = [];
const md5 = (text)=> crypto.createHash('md5').update(text).digest('hex');

const downloadFile = async (options)=>{
  const {url, filename, path, e} = options;
  const getBinary = (url)=> request.get(url ,{encoding: 'binary'});
  const checkMD5 = (list, item)=> list.includes(md5(item));

  if(!fs.existsSync(path)) fs.mkdirSync(path);
  const filepath = `${path}/${filename}`;

  if(!fs.existsSync(filepath)) {
    await getBinary(url).then((res)=>{
      if (!checkMD5(hash, res)) {  
        fs.writeFileSync(filepath,res,'binary');
        hash.push(md5(res));
        e.trigger('download-file-success');
      }
    }).catch((err)=>{
      e.trigger('download-file-fail', url);
    });
  }
}

module.exports = {List, downloadFile};