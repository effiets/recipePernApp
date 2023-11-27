const { Router } = require("express");
const pool = require("../index.js");

const router = Router();

//Get all Ingredients

router.get("/", (request, response, next) => {
  pool.query("SELECT * FROM ingredients ORDER BY name ASC", (err, res) => {
    if (err) return next(err);
    response.json(res.rows);
  });
});

//Get recipe by ingredient

router.get("/:id", (request, response, next) => {
  const { id } = request.params;
  pool.query(
    "SELECT r.recipe_id as recipeId, r.name as recipeName, c.name as Course, i.name as ingredientName, q.ingredient_quantity as quantity, q.measurement as unit from recipes as r join courses as c on c.course_id = r.course_id join quantity as q on q.recipe_id = r.recipe_id join ingredients as i on q.ingredient_id = i.ingredient_id where i.ingredient_id = $1",
    [id],
    (err, res) => {
      if(err) return next(err);
      response.json(res.rows)
    }
  );
});

//Create new Ingredient
router.post("/", (request, response, next) => {
  const { name } = request.body;
  pool.query(
    "INSERT INTO ingredients (name) VALUES ($1)",
    [name],
    (err, res) => {
      if (err) return next(err);

      response.json(res.rows)
    }
  );
});
module.exports = router;
