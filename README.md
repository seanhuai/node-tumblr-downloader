# node-tumblr-downloader

这是一个使用 JavaScript 完成的 Tumblr 图片、视频资源下载工具，用于获取特定用户的多媒体资源。

## 安装 Install

首先在本地安装 Node.Js 环境，建议通过 [官方网站下载](https://nodejs.org/en/download/)。

克隆本仓库到本地并安装依赖项，命令如下：

```shell
  git clone https://github.com/seanhuai/node-tumblr-downloader.git
  cd node-tumblr-downloader
  npm install && npm link
```

*Linux 用户需要注意程序的读写和执行权限。*

当上述命令执行完毕后，可以在本地全局调用 `tumblr-downloader` 命令，在任何位置执行下载操作。

## 示例 Examples

在默认代理（代理地址为本地，端口 1080）的条件下，下载用户名为 c0096 的用户的全部图片（视频），命令如下：

```shell
  tumblr-downloader photo -u c0096 -p 0  
  tumblr-downloader video -u c0096 -p 0  
```

在网络代理端口为 10086 时，下载用户名为 slavesmart 的用户的全部图片（视频），命令如下：

```shell
  tumblr-downloader photo -u slavesmart -p 0 -P 10086
  tumblr-downloader video -u slavesmart -p 0 -P 10086
```

不使用代理条件下，下载上述内容到特定文件夹，命令如下：

```shell
  tumblr-downloader photo -u slavesmart -o fsfolder --noProxy
```

## 命令 Commands

### 帮助

```shell
  tumblr-downloader help
```

在使用工具时，可以使用 `help` 命令获取帮助信息，同时接受 `--help` 选项。

### 图片

```shell
  tumblr-downloader photo
```

使用工具下载图片资源使用 `photo` 命令，下载对象的信息使用选项进行设置。

### 视频

```shell
  tumblr-downloader video
```

使用工具下载图片资源使用 `photo` 命令，下载对象的信息使用选项进行设置。

## 选项 Options

在使用命令的同时，需要使用选项为程序传递更多信息。

* `--help` 获取帮助信息；
* `-u/--username`  设置下载对象的用户ID，默认为 `c0096`；
* `-p/--page`  设置下载内容页数，每页指 20 篇博文；当值为 `0` 时，获取用户符合规则的全部内容；
* `-t/--thread`  设置同时下载的工作数，默认为 `4`；
* `-o/--output`  设置存放下载内容的目录名，默认为 `download`；
* `--noProxy`  下载时不使用网络代理，默认为 `false`；
* `-H/--host`  设置代理服务器地址，默认为 `127.0.0.1`；
* `-P/--port`  设置代理服务器端口，默认为 `1080`；
* `-T/--timeout`  设置网络请求超时阈值，单位为毫秒。

在设定选项时需要注意以下几点：

1. 如果需要设置一些常用选项时，可以在 `config.js` 文件替换默认值，修改后可以不用再进行选项设置。
2. 设定下载内容页数时，建议使用默认值 `0`；只有当用户数据量过大，需要获取其部分内容时才推荐填写具体数值，以免超量请求带来的致命错误。
3. 由于境内众所周知的网络情况，程序默认是使用代理工作的；对于无需使用代理的用户，可以在执行命令时附带 `--noProxy` 选项或直接修改 `config.js` 文件的 `proxy.noProxy` 属性，该属性与 代理服务器地址、代理服务器端口 两属性冲突。
4. 设置 `thread` 选项需要根据网络环境的实际情况，这个选项值越大，越有可能存在超时错误。一般图片下载建议 `2-6`，视频下载建议 `1-4`，一般建议使用默认值 `4`。

## 日志 LOG

### 2018.9.20-0.3.0

基础框架设计；实现基本功能：下载用户图片、视频；基本错误处理。

### 2018.9.27-0.4.0

更新基础框架设计；补充功能：使用 MD5 检查重复文件，增加命令选项；完善错误处理：对错误内容进行再次下载，规避超时问题。

### 2018.9.29-0.4.1

修正在二次下载时，`download-files-final` 事件被多次触发的问题：新增 `redownload-files-start` 事件，在首次下载文件列表为空时触发，强制进行二次下载流程；当二次下载过程中下载文件列表为空时再触发 `download-files-final` 事件。

### 2018.9.30-0.4.2

新增输出目录选项；完善使用说明文档；调整项目仓库信息，补充部分项目信息。

## 协议 License

此项目遵守 The MIT License。

根据协议，你可以使用，复制和修改软件；可以用于个人项目或商业项目；使用此项目源码必须附带版权声明，即原作者署名。