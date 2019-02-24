bin     ->www  启动文件
model   ->数据库文件
public  ->静态资源文件
views   ->视图文件
app.js  ->真正的启动文件
package.json ->项目配置文件

dependencies  生产环境
线上运行的项目需要用到的一些依赖

创建一个新的项目
创建文件夹   bin     ->www  启动文件      www启动文件
            model   ->数据库文件         index.js   db.js  setting.js
            public  ->静态资源文件
            views   ->视图文件
创建文件 app.js  ->真正的启动文件       项目执行文件
        package.json ->项目配置文件    npm init -y 生成一个package.json文件
npm下载安装 到 生产环境中
express  express-session  body-parser  cookie-parser  morgan  formidable  mongodb  silly-datetime
npm i express  express-session  body-parser  cookie-parser  morgan  formidable  mongodb  silly-datetime --save 
devDependencies  里面的插件只用于开发环境，不用于生产环境
dependencies     是需要发布到生产环境的

package.json 文件中
 package.json {
    "dependencies": {
        "body-parser": "^1.18.3",
        "cookie-parser": "^1.4.3",
        "express": "^4.16.4",
        "express-session": "^1.15.6",
        "formidable": "^1.2.1",
        "mongodb": "^3.1.10",
        "morgan": "^1.9.1",
        "silly-datetime": "^0.1.2"
 }

app.js 文件  项目执行文件
引入express  res.send  use 中间件：express.static()静态资源目录 express-router body-parser  session  cookie-parser  flash
引入express
var express=require("express");
处理post请求
var bodyParser=require("body-parser");
处理cookie信息
var cookieParser=require("cookie-parser");
处理错误日志
保存session信息
path 路径



www找到app  监听到接口  npm start 执行     Your application is running here: http://localhost:"+port

path.join  path.resolve
1. 对于以/开始的路径片段，path.join只是简单的将该路径片段进行拼接，而path.resolve将以/开始的路径片段作为根目录，在此之前的路径将会被丢弃，就像是在terminal中使用cd命令一样。
path.join('/a', '/b') // 'a/b'
path.resolve('/a', '/b') // '/b'
 
2. path.resolve总是返回一个以相对于当前的工作目录（working directory）的绝对路径。
path.join('./a', './b') // 'a/b'
path.resolve('./a', './b') // '/Users/username/Projects/webpack-demo/a/b'

优化性能
减少http请求次数



我们在使用npm install 安装模块或插件的时候，有两种命令把他们写入到 package.json 文件里面去，他们是：
--save-dev或--save

首先需要说明的是Dependencies一词的中文意思是依赖和附属的意思，而dev则是develop（开发）的简写。
所以它们的区别在 package.json 文件里面体现出来的就是，使用 --save-dev 安装的 插件，
被写入到 devDependencies 域里面去，而使用 --save 安装的插件，则是被写入到 dependencies 区块里面去。
那 package.json 文件里面的 devDependencies  和 dependencies 对象有什么区别呢？
devDependencies  里面的插件只用于开发环境，不用于生产环境，而 dependencies  是需要发布到生产环境的。
比如我们写一个项目要依赖于jQuery，没有这个包的依赖运行就会报错，这时候就把这个依赖写入dependencies ；
而我们使用的一些构建工具比如glup、webpack这些只是在开发中使用的包，上线以
后就和他们没关系了，所以将它写入devDependencies。


2018.12.14



2018.12.17
注册  修改密码

预习vue
vue-cli 2.0 脚手架  脚手架版本vue-cli 3.0
<script type="text/javascript" src="./vue/js"></script>
指令：
    v-model  数据绑定
    v-show
事件：
    v-on:click  @click
    普通事件
    事件修饰符
        .stop  阻止事件冒泡
    按键修饰符
自定义指令
    directive
    全局
    局部
生命周期
    beforeCreate
组件
    component
    全局
    局部
自定义过滤器：
    filter
    全局
    局部

路由
动画
vuex