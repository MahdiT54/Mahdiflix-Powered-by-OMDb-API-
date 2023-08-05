const postListEl = document.querySelector(".movie-list");
const id = localStorage.getItem("imdbID");

async function renderPosts() {
  const post = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=1c44ead`);
  const postData = await post.json();
  console.log(postData);
  postListEl.innerHTML = postHTML(postData); // Set the HTML directly, as it's a single movie
}

function postHTML(post) {
  return `
  <div class="movie-poster">
  <img src="${
    post.Poster !== "N/A" ? post.Poster : "./assets/image_not_found.png"
  }" alt="movie poster" />
  </div>
  <div class="movie-info">
      <h3 class="movie-title">${post.Title}</h3>
      <ul class="movie-misc-info">
          <li class="year">Year: ${post.Year}</li>
          <li class="rated">Ratings: ${post.Rated}</li>
          <li class="released">Released: ${post.Released}</li>
      </ul>
      <p class="genre"><b>Genre:</b> ${post.Genre}</p>
      <p class="writer">
      <b>Writer:</b> ${post.Writer}
      </p>
      <p class="actors">
      <b>Actors:</b> ${post.Actors}
      </p>
      <p class="plot">
      <b>Plot:</b> ${post.Plot}
      </p>
      <p class="language"><b>Language:</b> ${post.Language}</p>
      <p class="awards">
      <b> <i class="fas fa-award"></i></b> ${post.Awards}
      </p>
  </div>
    `;
}

renderPosts();
