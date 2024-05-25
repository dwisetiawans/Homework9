const express = require("express");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const Movie = require("../models/Movie");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const movies = await Movie.find()
    .limit(limit)
    .skip((page - 1) * limit);
  res.json(movies);
});

router.post("/", [auth, [body("title").not().isEmpty()]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description } = req.body;
  const movie = new Movie({ title, description });
  await movie.save();

  res.status(201).json({ msg: "Movie added successfully" });
});

router.put("/:id", auth, async (req, res) => {
  const { title, description } = req.body;
  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    { title, description },
    { new: true }
  );

  if (!movie) {
    return res.status(404).json({ msg: "Movie not found" });
  }

  res.json({ msg: "Movie updated successfully" });
});

router.delete("/:id", auth, async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);

  if (!movie) {
    return res.status(404).json({ msg: "Movie not found" });
  }

  res.json({ msg: "Movie deleted successfully" });
});

module.exports = router;
