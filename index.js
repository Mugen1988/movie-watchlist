const searchForm = document.getElementById('search-form')
const mainSection = document.getElementById('main-section')
const watchList = JSON.parse(localStorage.getItem('watchList')) || []
let movieIdArray = []

searchForm.addEventListener('submit', function(e){
    e.preventDefault()
    const searchFormData = new FormData(searchForm)
    const movie = searchFormData.get('movie-search')
    
    getMovieID(movie)
})

function getMovieID(movieInput){
    fetch(`https://www.omdbapi.com/?apikey=2a10424d&s=${movieInput}&type=movie`)
        .then(res=>res.json())
        .then(data =>{
            //pushing movie IMDB ids to new array to access additional info
            movieIdArray = []
            if (data.Search){
                mainSection.innerHTML = ""
                for (let movieIds of data.Search){
                    movieIdArray.push(movieIds.imdbID)
                }
            } else {
                mainSection.innerHTML = `<p class="search-error">Unable to find what you’re looking for. Please try another search.</p>`
            }
        })
        .then(function(){
            for (let id of movieIdArray){
                fetch(`https://www.omdbapi.com/?apikey=2a10424d&i=${id}&type=movie&plot=short`)
                .then(res => res.json())
                .then(data => {

                    if(data.Title){
                        mainSection.addEventListener('click', (e) => {
                            if (e.target.id === 'button' && e.target.dataset.name === data.imdbID){
                                watchList.push(data)
                                localStorage.setItem('watchList', JSON.stringify(watchList))
                                document.querySelector(`button[data-name='${data.imdbID}']`).innerHTML = `<p class="movie-data"><span style="color: #08a32a; font-weight: 500;">&#10003 Added</span></p>`
                                document.querySelector(`button[data-name='${data.imdbID}']`).setAttribute('disabled', '')
                            }
                        })


                        mainSection.innerHTML += 
`<div class="movie-container">
    <img src="${data.Poster}" class="movie-poster">
    <div class="movie-data-container">
        <div class="first-line-movie-data">
            <h3 class="movie-data movie-title">${data.Title}</h3>
            <div class="movie-review-container">
                <img src="images/star-icon.png" class="star-icon">
                <p class="movie-data movie-rating">${data.imdbRating}</p>
            </div>
        </div>
        <div class="second-line-movie-data">
            <p class="movie-data">${data.Runtime}</p>
            <p class="movie-data">${data.Genre}</p>
            <button class="add-to-watchlist" id="button" data-name="${data.imdbID}">
                <img src="images/plus-icon.png" class="plus-icon" id="button" data-name="${data.imdbID}">
                <p class="movie-data" id="button" data-name="${data.imdbID}">Watchlist</p>
            </button>
            
            
        </div>
        <p class="movie-plot">${data.Plot}</p>
    </div>
</div>
<hr>`
                    }

                    for (let added of watchList){
                        if (added.imdbID === data.imdbID){
                            document.querySelector(`button[data-name='${data.imdbID}']`).setAttribute('disabled', '')
                            document.querySelector(`button[data-name='${data.imdbID}']`).innerHTML = `
                                    <p class="movie-data"><span style="color: #08a32a; font-weight: 500;">&#10003 Added</span></p>
                                `
                        }
                    }
                })
            }
        })
    
}