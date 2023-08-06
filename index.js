// Titles: http://www.omdbapi.com/?s=thor&page=1&apikey=1c44ead
// details: http://www.omdbapi.com/?i=tt3896198&apikey=1c44ead
const movieListEl = document.querySelector(".movie-list");
const headerContainer = document.querySelector(".header__image--container")
const movieSearchBox = document.getElementById("search__list");

async function loadMovies(searchTerm) {
  console.log(searchTerm);
  const URL = `https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=1c44ead`; // dynamic
  // Show loading state
  headerContainer.innerHTML = ''
  movieListEl.innerHTML =
    "<div class='loading'><i class='fas fa-spinner'></div>";
  // Simulate a 1-second delay using setTimeout
  setTimeout(async () => {
    try {
      const res = await fetch(URL);
      const data = await res.json();
      if (!data.Search || data.Search.length === 0) {
        // If no movies are found, display the message
        movieListEl.innerHTML =
          '<div class="no-results">No movies available by that search term.</div>';
        return; // exit
      }
      let sixMovies = data.Search.slice(0, 6); // Keep only the first 6 movies
      movieListEl.innerHTML = sixMovies
        .map((movie) => movieHTML(movie))
        .join("");
      console.log(sixMovies);
    } catch (error) {
      // Handle errors here if needed
      console.error(error);
      movieListEl.innerHTML = '<div class="error">Error loading movies.</div>';
    }
  }, 1000); // 1000 milliseconds = 1 second
}

function findMovies() {
  let searchTerm = movieSearchBox.value.trim();
  loadMovies(searchTerm);
}

function showMovieInfo(id) {
  localStorage.setItem("imdbID", id);
  window.location.href = `./moviepage.html`;
}
// ${window.location.origin}/moviepage.html

function movieHTML(movie) {
  return `
    <div class="movie-card" onclick="showMovieInfo('${movie.imdbID}')">
        <div class="movie-card__container">
            <div class="movie-poster">
                <div class="search-item-thumbnail">
                    <img src="${
                      movie.Poster !== "N/A"
                        ? movie.Poster
                        : "./assets/image_not_found.png"
                    }" class="search-item-img" alt="movie poster" />
                </div>
                <div class="search-item-info">
                    <h3 class="search-item-h3">${movie.Title}</h3>
                    <p class="search-item-p">${movie.Year}</p>
                </div>
            </div>
        </div>
    </div>
    `;
}
