watchListMainSection = document.getElementById('watchlist-main-section')
let returnedWatchList = JSON.parse(localStorage.getItem('watchList'))
renderWatchList()

if (returnedWatchList && returnedWatchList.length > 0){
  for (let movie of returnedWatchList){
      if (movie.imdbID){
          watchListMainSection.addEventListener('click', (e) => {

              if (e.target.id === 'button' && e.target.dataset.name === movie.imdbID){
                  
                  let updatedWatchlist = returnedWatchList
                  const movieIndex = updatedWatchlist.findIndex( e => e.imdbID === movie.imdbID)
                  
                  updatedWatchlist.splice( movieIndex, 1 )
                  localStorage.setItem( 'watchList', JSON.stringify(updatedWatchlist) )
                  renderWatchList()
              }  
          })
      }
  }
}

function renderWatchList(){
  if (returnedWatchList && returnedWatchList.length > 0){
      watchListMainSection.innerHTML = "" 
      watchListMainSection.classList.add('add-margin-top')
      for (let movie of returnedWatchList){
              
          watchListMainSection.innerHTML += `
              <div class="movie-container">
                  <img src="${movie.Poster}" class="movie-poster">
                  <div class="movie-data-container">
                      <div class="first-line-movie-data">
                          <h3 class="movie-data movie-title">${movie.Title}</h3>
                          <div class="movie-review-container">
                              <img src="images/star-icon.png" class="star-icon">
                              <p class="movie-data movie-rating">${movie.imdbRating}</p>
                          </div>
                      </div>
                      <div class="second-line-movie-data">
                          <p class="movie-data">${movie.Runtime}</p>
                          <p class="movie-data">${movie.Genre}</p>
                          <button class="add-to-watchlist" id="button" data-name="${movie.imdbID}">
                              <img src="images/minus-icon.png" class="plus-icon" id="button" data-name="${movie.imdbID}">
                              <p class="movie-data" id="button" data-name="${movie.imdbID}">Remove</p>
                          </button>
                      </div>
                      <p class="movie-plot">${movie.Plot}</p>
                  </div>
              </div>
              <hr>
          `     
      }
  } else {
    watchListMainSection.innerHTML = `
        <p class="main-text watchlist-main-text">Your watchlist is looking a little empty...</p>
        <a href="index.html">
            <div class="link-to-main-page">
                <img src="images/plus-icon.png" class="plus-button-link">
                <p>Let's add some movies!</p>
            </div>
        </a>
    `
    }
}