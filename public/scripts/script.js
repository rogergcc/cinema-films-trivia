const spinner = document.querySelector('#spinner')
const card = document.querySelector('.content')
const filterGeneres = document.getElementById('filter__generes')

// const URL_API = 'https://cinema-movie-trivia.herokuapp.com/api/v1/getMovies'
const URL_API = 'http://localhost:3001/api/v1/getMovies'

let genresFromListMovies = []
let genresFilterList
document.addEventListener('DOMContentLoaded', async function (e) {
  (async () => {
    const movies = await fetchMovies(URL_API)

    spinner.setAttribute('hidden', '')

    mapCards(movies)
    genresFromListMovies = movies
  })()
})

async function fetchMovies (urlEndpoint) {
  let data
  genresFilterList = []
  try {
    const response = await fetch(urlEndpoint)
    data = await response.json()

    // return (data);
  } catch (error) {
    console.log(error)
  }
  return data
  //   return data.items || data.results;
}

function mapCards (movies, filter = false) {
  card.innerHTML = ''
  const html = movies
    .map((movie) => {
      genresFilterList.push(movie.genres.split(','))

      const title = movie.title || movie.name
      const isMovieOrTv = movie.title ? 'movie' : 'tv'
      return `
        <div class="card" >
          <div class="frontWeb" style="background-image: url(${movie.poster_path}"> 
            <p>${title}</p>
          </div>
  
          <div class="back">
            <div>
              <div class="movie__release_date">${title} 
                <span>(${movie.release_year})</span>
               
                </div>
              <div class="movie__gens">${movie.genres}</div>
              <div class="movie__rating">⭐${movie.vote_average}</div>
              
              <p class="movie__overview">${movie.overview}</p>
              <a target="_blank" href="https://www.themoviedb.org/${isMovieOrTv}/${movie.id}" class="button">Details</a>
            </div>
          </div>
  
        </div>
      `
    })
    .join('')
  const allgens = genresFilterList.flatMap((x) => x)
  const gensFromMovies = new Set(allgens)

  // filterGeneres.innerHTML= [...gensFromMovies];
  const dataGenersFilter = getGeneresFilter(gensFromMovies)
  filterGeneres.innerHTML = dataGenersFilter
  card.innerHTML += html
}

function mapFilterCards (movies, filter = false) {
  card.innerHTML = ''
  const html = movies
    .map((movie) => {
      genresFilterList.push(movie.genres.split(','))

      const title = movie.title || movie.name
      const isMovieOrTv = movie.title ? 'movie' : 'tv'
      return `
        <div class="card" >
          <div class="frontWeb" style="background-image: url(${movie.poster_path}"> 
            <p>${title}</p>
          </div>
  
          <div class="back">
            <div>
              <div class="movie__release_date">${title} 
                <span>(${movie.release_year})</span>
               
                </div>
              <div class="movie__gens">${movie.genres}</div>
              <div class="movie__rating">⭐${movie.vote_average}</div>
              
              <p class="movie__overview">${movie.overview}</p>
              <a target="_blank" href="https://www.themoviedb.org/${isMovieOrTv}/${movie.id}" class="button">Details</a>
            </div>
          </div>
  
        </div>
      `
    })
    .join('')

  card.innerHTML += html
}

filterGeneres.addEventListener('click', function (e) {
  const targ = e.target.type
  // let radioSelect
  // console.log("TARGET: " + e.target)

  if (targ === 'radio') {
    // radioSelect = document.getElementById(e.target.id)

    // console.log("RADIO: " + radioSelect)
    // radioSelect.style.backgroundColor='#2ecc71';

    // getPokemons(e.target.value,toggle);
    // title.innerHTML='Pokemon '+ e.target.id;

    filteringMovies(e.target.id)
  }
})

const filteringMovies = (genere) => {
  const moviesListFiltering = document.querySelectorAll('.content .card')
  const moviesFilterResult = genresFromListMovies.filter((movie) =>
    movie.genres.includes(genere)
  )
  mapFilterCards(moviesFilterResult)
  // genresFromListMovies.filter(movie=>movie.contain)
}

const getGeneresFilter = (genresListFromMovies) => {
  let dataHtml = ''

  // <input class="checkbox-belizehole" type="radio" name="color" id="color-4"/>
  // <label for="color-4">emerland</label>
  genresListFromMovies.forEach(function (genere, index, value) {
    const gen = genere.trim()

    dataHtml += `
                <input class="radio-genere" type="radio" name="genere" id=${gen} />
                <label class="label-genere" for=${gen}>${gen}</label>
        `
  })
  return dataHtml
  //   return data.items || data.results;
}
