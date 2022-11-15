var express = require("express");
var router = express.Router();

router.get("/", async (req, res) => {
    const movies = await getMovies();
    const indicator = 0;
    res.render("Movies.ejs", {movies:movies, indicator:indicator});
  });

router.get("/:title", async (req, res, next) => {
  const movies = await getMovies();
  const movieName = req.params.title;

  console.log(movieName);
 
  let index = -1;

  movies.forEach((value, i) => {
    if (value.title === movieName) {
      index = i;
    }
  });
  let singleMov = movies[index];
  if (index !== -1) res.render("singleMovie.ejs", singleMov);
  else next();
});
  
router.get("/:director", async (req, res, next) => {
  const movies = await getMovies();
  const dirName = req.params.director;

 
  let index = -1;
  let movWDirHayao = [];

  movies.forEach((value, i) => {
    if (value.director === dirName) {
      movWDirHayao[i] = movies[i]
      index = i;
    }
  });
  const indicator = 1;
  if (index !== -1) res.render("Movies.ejs", {movies:movWDirHayao, indicator:indicator, dirName:dirName});
  else next();
});

module.exports = router;
  
let fetch = require("node-fetch");

async function getMovies() {
  let responsePromise = await fetch(
    "https://ghibliapi.herokuapp.com/films"
  );
  let json = await responsePromise.json();
  return json;
}