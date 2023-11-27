const { Router } = require("express");
const pool = require("../index.js");

const router = Router();

//get all recipes

router.get("/", (request, response, next) => {
  //search recipes
  if (request.query.term) {
    pool.query(
      "SELECT * FROM recipes WHERE name LIKE '%" +
        request.query.term +
        "%' ORDER BY prep_time",
      (err, res) => {
        if (err) return next(err);
        response.json(res.rows);
      }
    );
  }

  //get by course
  else if (request.query.course) {
    pool.query(
      "SELECT * FROM recipes AS r JOIN courses as c ON r.course_id = c.course_id WHERE c.course_id = $1",
      [request.query.course],
      (err, res) => {
        if (err) return next(err);
        response.json(res.rows);
      }
    );
  } else {
    pool.query(
      "SELECT * FROM recipes as r JOIN courses as c on c.course_id = r.course_id",
      (err, res) => {
        if (err) return next(err);

        response.json(res.rows);
      }
    );
  }
});

router.get("/:id", (request, response, next) => {
  const { id } = request.params;
  pool.query(
    "SELECT r.name, r.prep_time, r.cook_time, r.instructions, c.c_name FROM recipes as r JOIN courses as c on c.course_id = r.course_id where r.recipe_id = $1",
    [id],
    (err, res) => {
      if (err) return next(err);

      response.json(res.rows);
    }
  );
});

router.post("/", (request, response, next) => {
  const { name, instructions, prep_time, cook_time, course_id } = request.body;
  pool.query(
    "INSERT INTO recipes(name, prep_time, cook_time, course_id, instructions) VALUES ($1, $2, $3, $4, $5) returning *",
    [name, prep_time, cook_time, course_id, instructions],
    (err, res) => {
      if (err) return next(err);

      response.json(res.rows[0]);
    }
  );
});

router.patch("/:id", (request, response, next) => {
  const { id } = request.params;
  const { instructions, prep_time, cook_time, image } = request.body;
  pool.query(
    "UPDATE recipes SET instructions = ($1),  prep_time = ($2), cook_time=($3), image=($4) WHERE recipe_id = $5",
    [instructions, prep_time, cook_time, image, id,],
    (err, res) => {
      if (err) return next(err);

      response.json(res.rows[0]);
    }
  );
});

router.delete("/:id", (request, response, next) => {
  const { id } = request.params;
  pool.query("DELETE  FROM recipes WHERE recipe_id = $1", [id], (err, res) => {
    if (err) return next(err);

    response.json();
  });
});

module.exports = router;
