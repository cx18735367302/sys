//项目执行文件
//引入express   res.send  use 中间件：express.static()静态资源目录 express-router body-parser  session  cookie-parser  flash
var express=require("express");
//处理post请求
var bodyParser=require("body-parser");
//保存cookie信息   
var cookieParser=require("cookie-parser");
//处理错误日志
var morgan=require("morgan");
//保存session信息 有可能存储失效  connect-flash 中间件
//下载  npm i connect-flash --save  引入：var flash=require("connect-flash")
// 使用 app.use(flash())
var session=require("express-session");
//path  node内置模块
var path=require("path");
var Index=require("./model/index")
var app=express();
//接收post请求  处理json数据
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))//
//使用cookie
app.use(cookieParser());
//错误处理日志  dev  pro
app.use(morgan("dev"));
//处理session
app.use(session({
    "name":"fcht",      //session的名称
    "secret":"fcht",    //设置加密字符串
    "cookie":{"maxAge":9999999},   //失效时间  ms
    "resave":false,     //是否每次重新获取信息
    "saveUninitialized":true    //是否每次初始化
}));



//静态资源目录  path.join  拼接 /    path.resolve
app.use(express.static(path.join(__dirname,"public")))
//跨域处理 配置参数 和配置参数的意思  app.all
//cors get post  设置跨域访问
app.all("*",function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Content-type");
    res.header("Access-Control-Allow-Methods","GET POST PUT DELETE PATCH OPTIONS");
    res.header("Access-Control-Max-Age",99999999);//过期时间
    //允许接收cookie信息
    next()
})


app.use("/Handler",Index);  //与index.js 中的router.post("/AdminLoginHandler",function(req,res)进行连接
var db=require("./model/db");

module.exports=app;