const base_url = "https://webdev.alphacamp.io";
const index_url = base_url + "/api/movies/";
const moviePic_url = "https://raw.githubusercontent.com/ALPHACamp/movie-list-api/master/public"
const poster_url = moviePic_url + "/posters/";
const movies = JSON.parse(localStorage.getItem('favoriteMovies')) || []
const dataPanel = document.querySelector("#data-panel")
const searchForm = document.querySelector("#search-form")


//function
function renderMovieList(data){
    let rawHTML = ""
    data.forEach((movie) => {
        rawHTML +=`<div class="col-sm-3">
        <div class="mb-2">
          <div class="card">
            <img
              src= "${poster_url + movie.image}"
              class="card-img-top"
              alt="Movie Poster"
            />
            <div class="card-body">
              <h5 class="card-title">${movie.title}</h5>
            </div>
            <div class="card-footer">
              <button class="btn btn-primary btn-show-movie" 
              data-bs-toggle="modal" 
              data-bs-target="#movie-modal" data-id="${movie.id}" >More</button>
              <button class="btn btn-info btn-add-delete" data-id=${movie.id}>X</button>
            </div>
          </div>
        </div>
        </div>`
    });
    dataPanel.innerHTML = rawHTML;
}

function showMoviedetail (id){
  const modalTitle = document.querySelector("#movie-modal-title")
  const modalImage = document.querySelector("#movie-modal-image")
  const modalDate = document.querySelector("#movie-modal-date")
  const modalDescription = document.querySelector("#movie-modal-description")
  axios.get(index_url + id).then(response=>{
    const data = response.data.results
    modalTitle.innerText = data.title
    modalDate.innerText = "Release date:" + data.release_date
    modalDescription.innerText = data.description
    modalImage.innerHTML = `<img src="${poster_url + data.image}" alt="movie-poster" class="img-fluid">`
  })
}

function removeFromFavorite(id){
  if (!movies || !movies.length) return
  //透過id找到要刪除的電影index
  const movieIndex = movies.findIndex((movie) => movie.id === id)
  if (movieIndex === -1) return
  //刪除該電影
  movies.splice(movieIndex,1)
  //存回local storage
  localStorage.setItem("favoriteMovies", JSON.stringify(movies))
  //更新頁面
  renderMovieList(movies)
}


//監聽
dataPanel.addEventListener("click", (e)=>{
  if (e.target.matches(".btn-show-movie")){
    showMoviedetail(e.target.dataset.id)
  }else if (e.target.matches(".btn-add-favorite")){
    addToFavorite(Number(e.target.dataset.id))
  }else if (e.target.matches(".btn-add-delete")){
    removeFromFavorite(Number(e.target.dataset.id))
  }
})

console.log(movies)
renderMovieList(movies)