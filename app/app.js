"use strict";
const bodyParser = require("body-parser");
const express = require("express");
const CONFIG = require("../config/config");
const path = require("path");
const cors = require("cors");

const configApp = require("../config/");

const Movie = require("./models/Movie");
//https://www.npmjs.com/package/node-themoviedb
const MovieDB = require("node-themoviedb");
// ES6 Style
// import MovieDB from 'node-themoviedb';

const mdb = new MovieDB(CONFIG.API_KEY, "en-US");
const App = express();

App.use(express.static(path.join(__dirname, "../public")));
// App.use(express.static('public'))
App.use(express.json());
App.use(express.urlencoded({ extended: false }));

App.set("view engine", "pug");

const config = configApp[App.get("env")];
App.locals.titulo = config.nombresitio;

//muestra el año actual y genera la ruta
App.use((req, res, next) => {
  // crear fecha
  const fecha = new Date();

  res.locals.fechaActual = fecha.getFullYear();
  res.locals.ruta = req.path;

  return next();
});
// ejecutar el bobyParser para poder enviar en formato json desde un Formulario en en sitio web asi aqui
App.use(bodyParser.urlencoded({ extended: true }));

App.use(cors());

// App.get("/", async (req, res, next) => {
//   const lista = await fetchDataMoviesFromList();
//   //res.json(data);
//   // let movies = lista.data.items;
//   let movies = await getMovieForApi(lista);
//   let listmovies = [...movies];

//   const movies_string = JSON.stringify(movies);

//   res.render("index", {
//     movies: listmovies,
//     movies_string,

//   });
//   res.render("index")
// });

App.get('/', async (req, res, next) => {
  res.render('index')
})


App.get("/api/v1/getMovies", async (req, res, next) => {
  const data = await fetchDataMoviesFromList();

  let movies = await getMovieForApi(data);

  res.json(movies);
});

const getMovieForApi = async (lista) => {
  try {
    let movies = lista.data.items;

    let listmovies = [];
    const size = movies.length;

    for (let i = 0; i < size; i++) {
      const datamovie = movies[i];
      const newMovie = new Movie(
        datamovie.id,
        datamovie.title,
        datamovie.poster_path,
        datamovie.backdrop_path,
        datamovie.release_date,
        datamovie.genres,
        datamovie.overview,
        datamovie.vote_average
      );

      listmovies.push(newMovie);
    }

    return listmovies;
  } catch (error) {
    console.error(error);
  }
};

const fetchDataMoviesFromList = async () => {
  try {
    const args = {
      pathParameters: {
        list_id: 15570,
      },
    };
    const movie = await mdb.list.getDetails(args);
    //console.log(movie);
    /*
      {
        data: Object. Parsed json data of response
        headers: Object. Headers of response
      }
    */
    return movie;
  } catch (error) {
    console.error(error);
  }
};

module.exports = App;
