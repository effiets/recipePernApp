const { Router } = require("express");
const pool = require("../index.js");

const router = Router();

router.get("/", (request, response, next) => {
  pool.query("SELECT * FROM courses", (err, res) => {
    if (err) return next(err);
    response.json(res.rows);
  });
});


module.exports = router;
