const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.get("/", function(req, res){

  const day = date.getDay();
  console.log(day);
  console.log(date.getDate());
  res.render('list', {title: day, items: items});
});

app.post("/", function(req, res){
  const item =req.body.newItem;
  if(req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/Work");
  }else {
    items.push(item);
    res.redirect("/");
  }
  console.log(req.body);
});

app.get("/Work", function(req, res){
  const title = "Work";
  res.render("list", {title: title, items: workItems });
})

app.post("/work", function(req, res){
  const item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
})

app.get("/about", function(req, res){
  res.render("about");
})

app.listen(3000, () => {
  console.log("SERVER - 3000");
})
