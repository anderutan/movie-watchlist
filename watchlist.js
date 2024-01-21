const divWatchlistContainer = document.querySelector('.watchlist-container');
const watchlistSection = document.querySelector('.watchlist-section');
let idArray = JSON.parse(localStorage.getItem('imdbId')) || [];
const movieSection = document.querySelectorAll('.movie-section');

async function movieInfoDetail(imdbID) {
  const res = await fetch(
    `http://www.omdbapi.com/?apikey=1d02aaa5&i=${imdbID}`
  );
  const moviesDetail = await res.json();

  renderMovie(moviesDetail, watchlistSection);
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
function renderMovie(moviesDetail, postContainer) {
  const poster = moviesDetail.Poster;
  const title = moviesDetail.Title;
  const rating = moviesDetail.imdbRating;
  const time = moviesDetail.Runtime;
  const genre = moviesDetail.Genre;
  const plot = moviesDetail.Plot;
  const id = moviesDetail.imdbID;

  const movieSection = document.createElement('section');
  movieSection.classList.add('movie-section');
  movieSection.setAttribute('id', id);

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
  movieRating.appendChild(starIcon);
  movieRating.insertAdjacentHTML('beforeend', `${rating}`);

  const divMovieOtherInfo = document.createElement('div');
  divMovieOtherInfo.classList.add('movie-other-info');

  const movieRuntime = document.createElement('p');
  movieRuntime.classList.add('movie-runtime');
  movieRuntime.textContent = time;

  const movieGenre = document.createElement('p');
  movieGenre.classList.add('movie-genre');
  movieGenre.textContent = genre;

  const addToWatchlistBtn = document.createElement('img');
  addToWatchlistBtn.src = 'images/minus-circle.svg';

  const addToWatchlistLink = document.createElement('a');
  addToWatchlistLink.classList.add('watchlist-btn');
  addToWatchlistLink.setAttribute('data-imdb-id', id);
  addToWatchlistLink.appendChild(addToWatchlistBtn);
  addToWatchlistLink.insertAdjacentHTML('beforeend', ' Remove');

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

  movieSection.appendChild(posterImg);
  movieSection.appendChild(divMovieInfoSection);

  postContainer.appendChild(movieSection);
}

function loopTruArray() {
  watchlistSection.textContent = '';
  if (idArray.length === 0) {
    divWatchlistContainer.style.display = 'flex';
  } else {
    idArray.forEach((id) => {
      movieInfoDetail(id);
    });
    divWatchlistContainer.style.display = 'none';
  }
}

// save movie id to localstorage

document.addEventListener('click', (e) => {
  if (e.target.dataset.imdbId) {
    const imdbId = e.target.dataset.imdbId;
    idArray = idArray.filter((item) => item !== imdbId);
    localStorage.setItem('imdbId', JSON.stringify(idArray));
    loopTruArray();
  }
});

loopTruArray();
