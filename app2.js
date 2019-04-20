var express=require('express');
var app=express();
var port=process.env.PORT||3000;
var mongoose=require('mongoose');
var path=require('path');
var MongoClient=require('mongodb').MongoClient;
var url="mongodb://localhost:27017/";
app.get('/',function(req,res){
	MongoClient.connect(url,function(err,db){
	if(err)
	console.log(err);
    var dbo=db.db("nasha");
    var myobj={'name':'Ajay','age':'20'};
    dbo.collection("details").insertOne(myobj,function(err,res){
    if(err)
    console.log(err);
    else
    console.log("Inserted");
    db.close();
    });
	});
});

app.listen(port);
console.log("Server started");