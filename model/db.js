//创建客户端
var MongoClient=require("mongodb").MongoClient;
//取到数据库路径
var setting=require("./setting");
// console.log(setting)
function connectDB(callback){
    var url=setting.url;
    //连接
    MongoClient.connect(url,function(err,db){
        // console.log(arguments);    输出两个参数  0：null  
        //创建一个数据库   数据库名  公用的数据库
        dbName=db.db("test");
        if(err){
            callback(err,null);
            return;
        }
        callback(err,db)
    })
}
//collectionName 集合名称   json 数据  callback  回掉函数
//增
exports.add=function add(collectionName,json,callback){
    connectDB(function(err,db){
        dbName.collection(collectionName).insertOne(json,function(err,result){
            callback(err,result);
            db.close();
        })
    })
}
//删
exports.remove=function add(collectionName,json,callback){
    connectDB(function(err,db){
        dbName.collection(collectionName).removeOne(json,function(err,result){
            callback(err,result);
            db.close();
        })
    })
}
//改
exports.update=function add(collectionName,json,newjson,callback){
    connectDB(function(err,db){
        dbName.collection(collectionName).updateOne(json,newjson,function(err,result){
            callback(err,result);
            db.close();
        })
    })
}
//查                       集合名称       对象  回调函数(err,result)报错 返回的数据
exports.find=function add(collectionName,json,callback){
    connectDB(function(err,db){
        dbName.collection(collectionName).find(json).toArray(function(err,result){
            callback(err,result);
            db.close();
        })
    })
}