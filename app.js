var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var db = require('mongojs')('uit');
var urlencodedParser = bodyParser.urlencoded({extended : false});
app.set('view engine' , 'ejs');

app.use(express.static('/assets'));

app.get('/',function(req,res){
	res.render('getform');
});

app.get('/post',function(req,res){
	res.render('postform');
});

app.get('/login',function(req,res){
	data = req.query;
//	db.getcollection.insert("name":data.name,"roll":data.roll,"year":data.year,"dept":data.paper,"paper":data.paper,"project":data.project,"arrear":data.arr);
	db.collection("uit").insertOne(data, function(err, res) {
    if (err) throw err;
  //  console.log(res);
   
  });
	console.log("inserted");
	res.redirect('/post');
//	console.log("name "+data.name,"roll "+data.roll,"year "+data.year,"dept "+data.dept,"paper "+data.paper,"project "+data.project,"arrear "+data.arr);
});

app.post('/postlogin',urlencodedParser,function(req,res){
	data = req.body;
	db.collection("uit").insertOne(data, function(err, res) {
    if (err) throw err;
	console.log(res);
	 });
	res.redirect('/');
//	console.log("name "+data.name,"roll "+data.roll,"year "+data.year,"dept "+data.dept,"paper "+data.paper,"project "+data.project,"arrear "+data.arr);
});

app.listen(5000);