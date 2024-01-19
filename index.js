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

  const addBtn = document.createElement('a');

  console.log(poster, title, rating, time, genre, plot);
}
