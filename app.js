const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

const items = ["Buy Food", "Cook Food", "Eat Food"];

app.get("/", function(req, res){

  const today = new Date();
  const currentDay = today.getDay();
  let day  = today.toLocaleDateString('en-US', { weekday: 'long' });;

  res.render('list', {day: day, items: items});
});

app.post("/", function(req, res){
  const newItem = req.body.newItem;
  items.push(newItem);
  res.redirect("/");
})

app.listen(3000, () => {
  console.log("SERVER - 3000");
})
