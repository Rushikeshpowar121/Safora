var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var passport=require("passport");
var methodOverride= require("method-override");
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));



app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));

app.get("/", function(req, res){
	res.render("index");
});

app.get("/about", function(req, res){
	res.render("about");
});

app.get("/tips", function(req, res){
	res.render("seafty");
});


app.get("/maps", function(req, res){
	res.sendFile(path.join(__dirname + '/MapAndLoc.html'));
});

app.listen(3000, function(){
    console.log("Safora ~(^_^)~");
	console.log("App Running on port 3000")

});
