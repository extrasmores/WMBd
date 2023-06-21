const moviesWrapper = document.querySelector('.movies');

async function renderMovies(filter) {
    const movies = await fetch(`http://www.omdbapi.com/?apikey=1f280777&s=${id}`)
    const moviesData = await movies.json();
    const moviesArray = moviesData.Search;
    console.log(moviesData)

    if (filter === "NEW_TO_OLD") {
        moviesArray.sort((a, b) => (a.Year) - (b.Year));
      } else if (filter === "OLD_TO_NEW") {
         moviesArray.sort((a, b) => (b.Year) - (a.Year));
      }

    moviesWrapper.innerHTML = moviesArray.map(movie => getMovieHTML(movie)).join("");
}
console.log(renderMovies);

renderMovies(filter);




function getMovieHTML(movie) {
    return `<div class="movie">
         <figure class="movie__img--wrapper">
       <img
         class="movie__img"
         src=".${movie.Poster}"
         alt=""
       />
        </figure>
        <div class="movie__title">${movie.Title}</div>
       <div class="movie__year"> ${movie.Year}
         </div>           
     </div>`
}


function searchInput(event) {
    id = event.target.value
}


// renderMovies();

// http://www.omdbapi.com/?apikey=1f280777&