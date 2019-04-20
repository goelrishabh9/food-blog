var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var fs = require('fs');
var cluster=require('cluster');
var http = require('http');
 
module.exports = http.createServer(function(req, res){

var multer  = require('multer')
var Blog=require("./models/blog");
var User=require("./models/user");
var path = require('path')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/blogs')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({ storage: storage })
app.disable('x-powered-by')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect("mongodb://localhost:27017/postit",{ useNewUrlParser: true })
app.set('view engine','ejs');


app.use(express.static(__dirname + '/public'));

app.get('/',function(req, res){
    Blog.find({},function(error,blogs){
      if(error){
        console.log(error);
      }
      else
      {
        res.render("display",{blog:blogs});
      }
    });
});

app.post('/login',function(req,res){
	res.render('login');
})
app.get('/rishabh',function(req,res)
{
	User.create({loginid:"rishabh",password:"akanksha"},function(error,data)
		{
			console.log(data);
		});

})
app.post('/blog',function(req,res){
	var email=req.body.email;
	email=email.toString();
	console.log(email);
	User.findOne({loginid:email},function(error,user)
  {
  	console.log(user.password);
    if(user.password==req.body.password)
    {

      res.render('blogContent');
    }
    else
    {
    	res.send('Error!!! Can not login');
      console.log("Cannot Login");
    }
  }
	
)});

app.post('/',upload.single('blogphoto'),function(req, res){
    var author=req.body.author;
    var title=req.body.title;
    var description=req.body.description;
    var image = '/images/blogs/'+req.file.filename;
     var newBlog={
      author: author,
      title: title,
      description: description,
      image:image
    }
    Blog.create(newBlog,function(err,newB){
      if(err){
        console.log(err);
      }
      else{
        res.redirect("/");
      }
    });
});

app.post('/edit/:id', function(req, res){
    Blog.findById(req.params.id,function(error,found){
      if(error){
        console.log(error);
      }
      else
      {
        //console.log("Hiiiii");
        console.log(found)
        res.render("edit",{blog:found});
      }
    });
});
app.post('/delete/:id', function(req, res){
    Blog.deleteOne({"_id":req.params.id},function(error,response){
      if(error){
        console.log(error);
      }
      else
      {
        //console.log("Hiiiii");
        //console.log(res)
        res.redirect("/");
      }
    });
});
app.post('/update/:id', function(req, res){
    Blog.update({"_id":req.params.id},{$set: {'title':req.body.title,'author':req.body.author,'description':req.body.description}},function(error,found){
      if(error){
        console.log(error);
      }
      else
      {
        console.log(found);
        res.redirect("/");
      }
    });
});



app.get('/blogs/:id', function(req, res){
    Blog.findById(req.params.id,function(error,found){
      if(error){
        console.log(error);
      }
      else
      {
        console.log("Hiiiii");
        res.render("show",{blog:found});
      }
    });
});
});