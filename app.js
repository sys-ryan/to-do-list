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


const listSchema = new mongoose.Schema({
  name: String,
  items: [itemSchema]
});

const List = mongoose.model("List", listSchema);


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
  const itemName = req.body.newItem;

  const item = new Item({
    name: itemName
  });

  item.save();
  res.redirect("/");
});

app.post("/delete", function(req, res){
  const id = req.body.item;
  Item.deleteOne({_id: id}, function(err){
    if(err){
      console.log(err);
    }else {
      res.redirect("/");
    }
  });
});

app.get("/:listName", function(req, res){
  const listName = req.params.listName;

  List.findOne({name: listName}, function(err, foundList){
    if(!foundList){
      const list = new List({
        name: listName,
        items: defaultItems
      });
      list.save();
      res.redirect("/" + listName);
    }else{
      res.render('list', {title: listName, items: foundList.items});
    }
  })






})

app.get("/about", function(req, res){
  res.render("about");
})

app.listen(3000, () => {
  console.log("SERVER - 3000");
})
