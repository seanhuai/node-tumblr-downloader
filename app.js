#!/usr/bin/env node
const Main = require('./main');
const yargs = require('yargs')
.command('photo','Get photos from Tumblr.')
.command('video','Get videos from Tumblr.')
.options({
  'u': {
    alias: 'username',
    default: 'm3102'
  },
  'p': {
    alias: 'page',
    default: 0
  },
  't': {
    alias: 'thread',
    default: 4
  }
}).example('$0 photo -u m3102 -p 2')
.example('$0 video -u m3102 -p 0')
.demand(['u','p']).argv;

const username = yargs.username, page = yargs.page, thread = yargs.thread;
const args = { username, page, thread};
args.type = yargs._[0];

if(args.type == 'photo' || args.type == 'video'){
  const func = new Main(args); 
}else{
  console.info('命令不正确，获取帮助请使用 help 命令')
}