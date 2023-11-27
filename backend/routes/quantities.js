const { Router } = require("express");
const pool = require("../index.js");

const router = Router();

router.get("/:recipeId", (request, response, next) => {
  const { recipeId } = request.params;
  pool.query(
    "SELECT i.name, q.ingredient_quantity, q.measurement FROM ingredients as i join quantity as q on i.ingredient_id = q.ingredient_id JOIN recipes as r on r.recipe_id = q.recipe_id WHERE r.recipe_id = $1",
    [recipeId],
    (err, res) => {
      if (err) return next(err);
      response.json(res.rows);
    }
  );
});

router.post("/", (request, response, next) => {
  const { recipe_id, ingredient_id, measurement, ingredient_quantity } =
    request.body;
  pool.query(
    "INSERT INTO quantity(recipe_id, ingredient_id, measurement, ingredient_quantity) VALUES ($1, $2, $3, $4) RETURNING *",
    [recipe_id, ingredient_id, measurement, ingredient_quantity],
    (err, res) => {
      if (err) return next(err);

      response.json(res.rows[0]);
    }
  );
});

router.delete("/", (request, response, next) => {
  const { recipe_id, ingredient_id } = request.body;
  pool.query(
    "DELETE FROM quantity WHERE recipe_id = $1 and ingredient_id= $2 returning *",
    [recipe_id, ingredient_id],
    (err, res) => {
      if (err) return next(err);

      response.json(res.rows[0]);
    }
  );
});
module.exports = router;
