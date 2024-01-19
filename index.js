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
  const movieDetail = await res.json();

  console.log(movieDetail);
}
