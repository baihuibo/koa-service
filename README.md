koa 静态服务
===

如何开始？
---
```bash
$ cd <project-name>
$ npx @5i5j/koa-service
```
即可启动调试服务

参数说明：
----
```bash
$ npx @5i5j/koa-service --port=3000 --rootDir=./ --basePath=/ --proxyConfig=
```

- port 服务端口，默认3000
- rootDir 文件目录，默认./当前目录
- basePath 基础访问路径，默认 /
- proxyConfig 接口转发配置文件路径，默认空，规则可参考 [koa2-nginx](https://www.npmjs.com/package/koa2-nginx#example)

接口转发案例
----
```bash
$ cd <project-name>
$ npx @5i5j/koa-service --proxyConfig=proxy.js
```

将`proxy.js`文件放置在项目根目录
```js
module.exports = {
    '/api': {
      target: 'http://www.example.com', 
      changeOrigin: true,
    }
};
```
