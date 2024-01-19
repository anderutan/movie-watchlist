const searchBtn = document.querySelector('.search-btn');
const searchName = document.getElementById('search-bar');

searchBtn.addEventListener('click', async () => {
  const res = await fetch(
    `http://www.omdbapi.com/?apikey=1d02aaa5&s=${searchName.value}`
  );
  const searchMovieResult = await res.json();
  const searchMovieList = searchMovieResult.Search;

  for (let movie in searchMovieList) {
    movieInfoDetail(searchMovieList[movie]);
  }
});

async function movieInfoDetail(movie) {
  const res = await fetch(
    `http://www.omdbapi.com/?apikey=1d02aaa5&i=${movie.imdbID}`
  );
  const moviesDetail = await res.json();

  renderMovie(moviesDetail);
}

/* Boilerplate
<div class="movie-section">
        <img
          src="https://m.media-amazon.com/images/M/MV5BNmQ0ODBhMjUtNDRhOC00MGQzLTk5MTAtZDliODg5NmU5MjZhXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_SX300.jpg"
          alt=""
        />
        <div class="movie-info-section">
          <div class="movie-name-rate">
            <h3 class="movie-title">Harry Potter and the Sorcerer's Stone</h3>
            <p class="movie-rating"><img src="images/star.svg" alt="" /> 7.6</p>
          </div>
          <div class="movie-other-info">
            <p class="movie-runtime">152 min</p>
            <p class="movie-genre">Adventure, Family, Fantasy</p>
            <a href="" class="watchlist-btn"
              ><img src="images/add-circle.svg" alt="" />Add to watchlist</a
            >
          </div>
          <p class="movie-plot">
            An orphaned boy enrolls in a school of wizardry, where he learns the
            truth about himself, his family and the terrible evil that haunts
            the magical world.
          </p>
        </div>
      </div>
*/
function renderMovie(moviesDetail) {
  const poster = moviesDetail.Poster;
  const title = moviesDetail.Title;
  const rating = moviesDetail.imdbRating;
  const time = moviesDetail.Runtime;
  const genre = moviesDetail.Genre;
  const plot = moviesDetail.Plot;

  const divMovieSection = document.createElement('div');
  divMovieSection.classList.add('movie-section');

  const posterImg = document.createElement('img');
  posterImg.src = poster;

  const divMovieInfoSection = document.createElement('div');
  divMovieInfoSection.classList.add('movie-info-section');

  const divMovieNameRate = document.createElement('div');
  divMovieNameRate.classList.add('movie-name-rate');

  const movieTitle = document.createElement('h3');
  movieTitle.classList.add('movie-title');
  movieTitle.textContent = title;

  const starIcon = document.createElement('img');
  starIcon.src = 'images/star.svg';

  const movieRating = document.createElement('p');
  movieRating.classList.add('movie-rating');
  movieRating.textContent = `${starIcon}${rating}`;

  const divMovieOtherInfo = document.createElement('div');
  divMovieOtherInfo.classList.add('movie-other-info');

  const movieRuntime = document.createElement('p');
  movieRuntime.classList.add('movie-runtime');
  movieRuntime.textContent = time;

  const movieGenre = document.createElement('p');
  movieGenre.classList.add('movie-genre');
  movieGenre.textContent = genre;

  const addToWatchlistBtn = document.createElement('img');
  addToWatchlistBtn.src = 'images/add-circle.svg';

  const addToWatchlistLink = document.createElement('a');
  addToWatchlistLink.classList.add('watchlist-btn');
  addToWatchlistLink.textContent = `${addToWatchlistBtn}Add to watchlist`;

  const moviePlot = document.createElement('p');
  moviePlot.classList.add('movie-plot');
  moviePlot.textContent = plot;

  divMovieNameRate.appendChild(movieTitle);
  divMovieNameRate.appendChild(movieRating);

  divMovieOtherInfo.appendChild(movieRuntime);
  divMovieOtherInfo.appendChild(movieGenre);
  divMovieOtherInfo.appendChild(addToWatchlistLink);

  divMovieInfoSection.appendChild(divMovieNameRate);
  divMovieInfoSection.appendChild(divMovieOtherInfo);
  divMovieInfoSection.appendChild(moviePlot);

  divMovieSection.appendChild(posterImg);
  divMovieSection.appendChild(divMovieInfoSection);

  return divMovieInfoSection;
}
