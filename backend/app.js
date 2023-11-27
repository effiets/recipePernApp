const express = require("express");
const recipes = require("./routes/recipes");
const ingredients = require("./routes/ingredients");
const quantities = require('./routes/quantities')
const foodCategories = require("./routes/foodCategories");
const bodyParser = require("body-parser");
const cors  =  require('cors')

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3001", credentials: true }))

app.use("/recipes", recipes);
app.use("/ingredients", ingredients);
app.use('/quantities', quantities)
app.use("/foodCategories", foodCategories);

app.use((err, req, res, next) => {
  res.json(err);
});

module.exports = app;
