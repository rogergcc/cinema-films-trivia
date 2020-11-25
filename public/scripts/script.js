
const spinner = document.querySelector('#spinner');
const card = document.querySelector('.content');

const URL_API = 'https://cinema-movie-trivia.herokuapp.com/api/v1/getMovies';
// const URL_API = 'http://localhost:3000/api/v1/getMovies';


document.addEventListener("DOMContentLoaded", async function (e) {

  (async () => {
    const movies = await fetchMovies(URL_API);

    spinner.setAttribute("hidden", "");

    mapCards(movies);
  })();
});

async function fetchMovies(urlEndpoint) {
  let data;
  try {
    const response = await fetch(urlEndpoint);
    data = await response.json();

    //return (data);
  } catch (error) {
    console.log(error);
  }
  return data;
//   return data.items || data.results;
}

function mapCards(movies){
    const html = movies.map(movie => {
      let title = movie.title || movie.name;
      let isMovieOrTv=(movie.title)?'movie':'tv';
      return `
        <div class="card" >
          <div class="frontWeb" style="background-image: url(${movie.poster_path}"> 
            <p>${title}</p>
          </div>
  
          <div class="back">
            <div>
              <div class="release_date">${title} <span>(${movie.release_year})</span></div>
              <div class="movie_gens">${movie.genres}</div>
              <div>⭐${movie.vote_average}</div>
              
              <p class="overview">${movie.overview}</p>
              <a target="_blank" href="https://www.themoviedb.org/${isMovieOrTv}/${movie.id}" class="button">Details</a>
            </div>
          </div>
  
        </div>
      `;
    }).join('');
    card.innerHTML= 
      `<h1 class="heading">Movies</h1>`;
    card.innerHTML+= html;
  }
