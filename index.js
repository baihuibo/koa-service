#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2))
var path = require('path');
var Koa = require('koa');
var cors = require('koa2-cors');
var nginx = require('koa2-nginx');
var logger = require('koa-logger');
var staticServer = require('koa-static-server');

if (argv.h || argv.help) {
    console.log('  ')
    console.log('  运行命令 `npx @5i5j/koa-service` ')
    console.log('  可选参数:')
    console.log('     --port=3000    监听端口，默认3000')
    console.log('     --rootDir=./   项目路径，默认`./`')
    console.log('     --basePath=/   项目访问基本路径，默认 `/` ')
    console.log('     --proxyConfig= 代理转发配置文件路径')
    console.log('  ')
    return;
}

var cwd = process.cwd();
var rootDir = path.join(cwd, argv.rootDir || './');
var port = argv.port || 3000;
var basePath = argv.basePath || '/';

var app = new Koa();

app.use(logger())
app.use(cors());

if (argv.proxyConfig) {
    var config = require(path.join(cwd, argv.proxyConfig))
    app.use(nginx(config));
}

app.use(staticServer({
    rootDir: rootDir,
    rootPath: basePath
}));

app.listen(port, function () {
    console.log('service start in http://127.0.0.1:' + port + basePath);
    console.log('service start in http://localhost:' + port + basePath);
});
