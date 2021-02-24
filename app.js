const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true, useUnifiedTopology: true});

app.set('view engine', 'ejs');

const itemSchema = new mongoose.Schema({
  name: String
});

const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
  name: "Welcome to your todolist!"
});

const item2 = new Item({
  name: "Hit the + button to add a new item"
});

const item3 = new Item({
  name: "<-- Hit this to delete an item."
});

const defaultItems = [item1, item2, item3];




app.get("/", function(req, res){


  Item.find({}, function(err, foundItems){
    if(err){
      console.log(err);
    }else {

      if(foundItems.length === 0){
        Item.insertMany(defaultItems, function(err){
          if(err){
            console.log(err);
          }
        });
      }else {
        res.render('list', {title: "Today", items: foundItems});
      }
    }
  })


});

app.post("/", function(req, res){
  const item =req.body.newItem;
  // if(req.body.list === "Work"){
  //   workItems.push(item);
  //   res.redirect("/Work");
  // }else {
  //   items.push(item);
  //   res.redirect("/");
  // }
  // console.log(req.body);
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
