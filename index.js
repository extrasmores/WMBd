const moviesWrapper = document.querySelector('.movies');


moviesWrapper.classList += ' movies__loading'

// if (!movies) {
//   movies = 

// }
// moviesWrapper.classList.remove('movies__loading')

searchButton.disabled = true;
  searchButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

async function renderMovies(filter) {
    event.preventDefault();
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.querySelector('#searchInput');
    const query = searchInput.value;
    moviesWrapper.classList.add('movies__loading');
    const movies = await fetch(`http://www.omdbapi.com/?apikey=1f280777&s=${query}`)
    const moviesData = await movies.json();
    const moviesArray = moviesData.Search;

    if (filter === "NEW_TO_OLD") {
        moviesArray.sort((a, b) => (b.Year) - (a.Year));
      } else if (filter === "OLD_TO_NEW") {
         moviesArray.sort((a, b) => (a.Year) - (b.Year));
      }
      else if (filter === "ALPHABETICALLY") {
        moviesArray.sort((a, b) => (a.Title < b.Title));
            
      }

    moviesWrapper.innerHTML = moviesArray.map(movie => getMovieHTML(movie)).join("");
    moviesWrapper.classList.remove('movies__loading');
    searchButton.disabled = false;
    searchButton.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i>';
}

function filterMovies(event) {
    renderMovies(event.target.value);
  }
  

  
setTimeout(() => {
    renderMovies();
  });

moviesWrapper.classList.remove('movies__loading');




function getMovieHTML(movie) {
    return `<div class="movie">
         <figure class="movie__img--wrapper">
       <img
         class="movie__img"
         src="${movie.Poster}"
         alt=""
       />
        </figure>
        <div class="movie__title">${movie.Title}</div>
       <div class="movie__year"> ${movie.Year}
         </div>           
     </div>`
}





// http://www.omdbapi.com/?apikey=1f280777&