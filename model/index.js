//编写接口的正式文件
var express=require("express");
var fs=require("fs");
//路由
var router=express.Router();
//处理表单
var fd=require("formidable");
//时间
var sd=require("silly-datetime");
//加密  md5
var crypto=require("crypto");
//引入数据库文件
var db=require("./db");
var ObjectID=require("mongodb").ObjectId;
console.log(ObjectID)
//接口文件
//验证码
/**
 * 路径     http:127.0.0.1:3000/Handler/AdminHandler
 * req.url
 * veri   验证码   checkveri校验验证码
 * 随机数  Math.random()
 */
router.get("/AdminHandler",function(req,res){
    var type=req.query.type;
    switch(type){
        case "veri":
        var random=function(min,max){
            return Math.floor(Math.random()*(max-min)+min)
        }
        var str="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var returnTxt="";
        for(var i=0;i<4;i++){
            var txt=str[random(0,str.length)];
            returnTxt+=txt;
        }
        //session和cookie的区别  web安全  xss csrf
        req.session.veri=returnTxt;
        
        res.send({"success":"ok","data":returnTxt})
        
        break;
        case "checkveri":
        console.log(req.session.veri);
        if(req.query.veri===req.session.veri){
            res.send({"success":"校验成功"})
        }else{
            res.send({"success":"验证码不正确"})
        }
        res.send();
        break;
        case "returnInfo":
        /**
         * 1.如果id存在的话就去查找当前的用户的信息
         * 2.postman
         * md5  加密方式的特点
         *      加密方式：hash  base64  ssh   对等加密
         */
        if(req.session.username&&req.session._id){
            // var id=new ObjectID(req.session._id)
            var id=new ObjectID(req.session._id)//如果存储时变量值为id，生成的id会覆盖(更新)
            db.find("admin",{"_id":id},function(err,result){
                res.send(result);
            })
        }else{
            res.send({"err":"未登录"})
        }
        break;
        case "quit":
            if(req.session.username&&req.session.password&&req.session._id){
                req.session.username="";
                req.session.password="";
                req.session._id="";
            }
            res.send({"success":"退出成功"})
        break;
        }
    })
//登录  注册
router.post("/AdminLoginHandler",function(req,res){
    var type=req.query.type;
    switch(type){
        //执行登录  用户已经存在  会用到mongodb中的方法 find() 用到的字段 用户名 密码
        //登录
        case "login":
            var md5=crypto.createHash("md5")
            var password=md5.update(req.body.password).digest("base64")
            db.find("admin",{
                //md5
                //加密的方式  base64  digest(req.body.password)
                "username":req.body.username,   //可以使用.body  是因为我们使用了中间件 body-parser
                "password":password},function(err,result){
                    // console.log(result)
                    if(result.length==0){
                        res.send({"err":"没有此用户或密码错误"})
                        // &&result[0].password==password
                    }else if(result.length!==0){
                        req.session.username=req.body.username;
                        req.session.password=req.body.password;
                        //id
                        req.session._id=result[0]._id;
                        res.send({"success":"登录成功"})
                    }
            })    
        break;
        //注册
        case "add":
        db.find("admin",{"username":req.body.username},function(err,result){
            if(result.length!==0){
                res.send({"error":"用户已经存在，请重新输入"})
            }else{
                //密码加密  md5 crypto 加密 node里面的内置模块 方法:md5.update().digest("base64")
                var md5=crypto.createHash("md5")
                db.find("admin",{},function(err,result){
                    // console.log(result)
                    //注册信息 用户名 密码 邮箱 电话号码 注册事件  更新事件 权限 真实姓名 是否删除 tokenId success
                    var info={
                    "username":req.body.username,
                    "password":md5.update(req.body.password).digest("base64"),
                    //1005095276@qq.com    xur52765938@163.com
                    "email":/^\[0-9A-Za-z]{6,10}@\[0-9A-Za-z]{2,5}\.[a-z]{2,5}\&/.test(req.body.email),
                    "phone":/^\1\d{10}/.test(parseInt(req.body.phone)?req.body.phone:null),
                    "createAt":new Date(),
                    "updateAt":new Date(),
                    //权限  code 1 0普通管理员
                    "power":req.body.powerCode==1?"超级管理员":"普通管理员",
                    "truename":req.body.truename?req.body.truename:false,
                    "isDelete":req.body.truename?true:false,
                    "tokenId":result.length+1,
                    "success":"ok"
                    }
                    db.add("admin",info,function(err,result){
                        if(err){
                            res.send({"error":err})
                        }else{
                            res.send({"success":"ok"})
                        }
                    })
                })
                
            }
        })
    }
})

//注册  修改密码   用户列表   删除   编辑
//注册
router.post('/user/register', function (req, res, next) {
    //console.log(req.body);
    var userName = req.body.userName;
    var pwd = req.body.pwd;
    if (!userName) {
        resData.code = 1;
        resData.message = '用户名不能为空';
        return res.json(resData);
    }
    if (!pwd) {
        resData.code = 2;
        resData.message = '密码不能为空';
        res.json(resData);
    }
    User.findOne({
        userName: userName
    }).then(function (userInfo) {
        console.log(userInfo);
        // 如果存在说明数据库有这条记录
        if (userInfo) {
            resData.code = 4;
            resData.message = '用户名已被注册';
            return res.json(resData);
        }
        // 新建文档对象实例,保存用户的信息到数据库中
        var user = new User({
            userName: userName,
            pwd: pwd
        });
        return user.save();
    }).then(function (newUserInfo) {
        console.log(newUserInfo);
        resData.code = 0;
        resData.message = '注册成功';
        res.json(resData);
    });
});



module.exports=router;