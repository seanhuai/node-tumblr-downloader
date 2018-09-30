#!/usr/bin/env node
const setRequest = require('./request');
const yargs = require('yargs')
.command('photo','Get photos from Tumblr.')
.command('video','Get videos from Tumblr.')
.command('help','Get help information.')
.options({
  'username': {
    alias: 'u',
    default: 'c0096'
  },
  'page': {
    alias: 'p',
    default: 0
  },
  'thread': {
    alias: 't',
    default: 4,
    description: 'Set threads for download.'
  },
  'output': {
    alias: 'o',
    description: 'Set output folder.'
  },
  'noProxy': {
    boolean: true,
    description: 'Do not use HTTP proxy for download.'
  },
  'host': {
    alias: 'H',
    description: 'Set an HTTP proxy host.'
  },
  'port': {
    alias: 'P',
    description: 'Set a proxy port.'
  },
  'timeout': {
    alias: 'T',
    description: 'Set request timeout.'
  }
}).example('$0 photo -u c0096 -p 0')
.example('$0 photo -u slavesmart --port 8080')
.example('$0 video -u c0096 --noProxy')
.demand(['u','p']).argv;

const args = yargs;
args.type = yargs._[0];

if(args.type == 'photo' || args.type == 'video'){
  setRequest(args);
}else{
  console.error('命令不正确，获取帮助请使用 help 命令')
}