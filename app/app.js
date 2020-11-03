const bodyParser = require('body-parser');
const express = require('express');
const CONFIG = require('../config/config');
const path = require('path')
//https://www.npmjs.com/package/node-themoviedb

const MovieDB = require('node-themoviedb');
// ES6 Style
// import MovieDB from 'node-themoviedb';

const mdb = new MovieDB(CONFIG.API_KEY, 'en-US');
const App = express();



App.use(express.static(path.join(__dirname, 'public')))
App.use(express.json())
App.use(express.urlencoded({ extended: false }))
                
App.set('view engine', 'ejs')

App.get('/', async (req, res, next) => {
    res.render('index')
  })

  
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


module.exports = App;
