const express = require('express');
// Lodash utils library
const _ = require('lodash');
	
const router = express.Router();

// Create RAW data array
let movies = [{
  id: "0",
  movie: "Alien",
  yearOfRelease: 1987,
  duration: 110, // en minutes,
  actors: ["Sigourney", "Weaver"],
  poster: "blabla", // lien vers une image d'affiche,
  boxOffice: 1000000, // en USD$,
  rottenTomatoesScore: 9
 },
 {
  id: "1",
  movie: "Eragon",
  yearOfRelease: 1999,
  duration: 70, // en minutes,
  actors: ["John", "Doe"],
  poster: "blabla", // lien vers une image d'affiche,
  boxOffice: 1000, // en USD$,
  rottenTomatoesScore: 7,
 }
];

/* GET movies listing. */
router.get('/', (req, res) => {
  // Get List of movies and return JSON
  res.status(200).json({ movies });
});

/* GET one movie. */
router.get('/:id', (req, res) => {
  const { id } = req.params;
  // Find movie in DB
  const movie = _.find(movies, ['id', id]);
  // Return movie
  res.status(200).json({
    message: 'Movie found!',
    movie 
  });
});

/* PUT new movie. */
router.put('/', (req, res) => {
  // Get the data from request from request
  const { movie } = req.body;
  // Create new unique id
  const id = _.uniqueId();
  // Insert it in array (normaly with connect the data with the database)
  movies.push({ movie, id });
  // Return message
  res.json({
    message: `Just added ${id}`,
    movie: { movie, id }
  });
});

/* DELETE movie. */
router.delete('/:id', (req, res) => {
  // Get the :id of the movie we want to delete from the params of the request
  const { id } = req.params;

  // Remove from "DB"
  _.remove(movies, ["id", id]);

  // Return message
  res.json({
    message: `Just removed ${id}`
  });
});

/* UPDATE movie. */
router.post('/:id', (req, res) => {
  // Get the :id of the movie we want to update from the params of the request
  const { id } = req.params;
  // Get the new data of the movie we want to update from the body of the request
  const { movie } = req.body;
  // Find in DB
  const movieToUpdate = _.find(movies, ["id", id]);
  // Update data with new data (js is by address)
  movieToUpdate.movie = movie;

  // Return message
  res.json({
    message: `Just updated ${id} with ${movie}`
  });
});

module.exports = router;
