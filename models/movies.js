const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("Movie", MovieSchema);

/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the movie
 *         title:
 *           type: string
 *           description: The movie title
 *         description:
 *           type: string
 *           description: The movie description
 *       example:
 *         id: d5fE_asz
 *         title: Inception
 *         description: A mind-bending thriller
 */

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: The movies managing API
 */

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Get movies
 *     tags: [Movies]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number
 *     responses:
 *       200:
 *         description: A list of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 */

/**
 * @swagger
 * /api/movies:
 *   post:
 *     summary: Add a new movie
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       201:
 *         description: The movie was successfully added
 */

/**
 * @swagger
 * /api/movies/{id}:
 *   put:
 *     summary: Update a movie
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The movie id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       200:
 *         description: The movie was successfully updated
 *       404:
 *         description: The movie was not found
 */

/**
 * @swagger
 * /api/movies/{id}:
 *   delete:
 *     summary: Delete a movie
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The movie id
 *     responses:
 *       200:
 *         description: The movie was successfully deleted
 *       404:
 *         description: The movie was not found
 */
