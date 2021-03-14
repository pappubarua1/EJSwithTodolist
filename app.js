//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const path = require('path'); 

const app = express();

let items = ["Buy Food","Cook Food","Eat Food"];
let workItem = [];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.get("/", function(req,res){

    let today = new Date();
    
    let options ={
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    let day = today.toLocaleDateString("en-US",options);


res.render("list",{listTitle: day, newListItems:items});

}); 

app.get('/work',function(req,res){
res.render("list",{listTitle:"Work list", newListItems:workItem});
});

app.post("/work",function(req,res){
    let item = req.body.newItem;
    workItem.push(item);
    res.redirect("/work");
});

app.post("/",function(req,res){

let item = req.body.newItem; 

if(req.body.list === "Work"){
workItem.push(item);
res.redirect("/work");
}
else{
    items.push(item);
    res.redirect("/");
}
});
app.get("/about",function(req,res){
    res.render("about");
})

app.listen(3000,function(){
console.log("server port is running 3000");
});
