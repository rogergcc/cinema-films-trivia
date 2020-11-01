"use strict";

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const bodyParser = require('body-parser');
const express = require('express');
const CONFIG = require('./config/config');

//https://www.npmjs.com/package/node-themoviedb

const MovieDB = require('node-themoviedb');
// ES6 Style
// import MovieDB from 'node-themoviedb';

const mdb = new MovieDB(process.env.API_KEY, 'en-US');
const App = express();



App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: false }));

App.get('/api/v1/getMovies', async (req, res, next) => {
  const data = await fetchDataMoviesFromList();

  res.json(data);
})

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


App.listen(CONFIG.PORT, function (error) {
  if (error) return console.log(error);
  console.log(`Servidor corriendo en el Puerto: ${CONFIG.HOST}:${CONFIG.PORT}`);
});

