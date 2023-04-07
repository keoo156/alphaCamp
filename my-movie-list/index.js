const base_url = "https://webdev.alphacamp.io";
const index_url = base_url + "/api/movies/";
const moviePic_url = "https://raw.githubusercontent.com/ALPHACamp/movie-list-api/master/public"
const poster_url = moviePic_url + "/posters/";
const movies = [];
const dataPanel = document.querySelector("#data-panel")
const searchForm = document.querySelector("#search-form")
const MOVIES_PER_PAGE = 12
const paginator = document.querySelector("#paginator")
const changeMode = document.querySelector(".some-function")

let filterMovies = []

axios.get(index_url).then(response=>{
    movies.push(...response.data.results)
    renderPaginator(movies.length)
    renderMovieList(getMoviesByPage(1))
}).catch((error)=>{
    console.log(error)
})



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
              <button class="btn btn-info btn-add-favorite" data-id=${movie.id}>+</button>
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

function addToFavorite(id){
  const list = JSON.parse(localStorage.getItem("favoriteMovies")) || []
  const movie = movies.find((movie)=> movie.id === id)
  if (list.some((movie)=> movie.id === id)){
    return alert("此電影已在收藏清單中")
  }
  list.push(movie)
  localStorage.setItem("favoriteMovies", JSON.stringify(list))
}

function getMoviesByPage(page){
  //計算起始index
  const data = filterMovies.length ? filterMovies :movies
  const startIndex = (page - 1) * MOVIES_PER_PAGE
  //回傳切割後的新陣列
  filterMovies = []
  return data.slice(startIndex, startIndex + MOVIES_PER_PAGE)
}

function renderPaginator(amount){
  //計算總頁數
  const numberOfPages = Math.ceil(amount / MOVIES_PER_PAGE);
  //製作template
  let rawHTML = ""

  for (let page = 1; page <= numberOfPages ; page++){
    rawHTML +=`<li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>`
  }
  paginator.innerHTML = rawHTML;
}

function renderListMode(data){
  let rawHTML = ""
  rawHTML =`<ul>`
  data.forEach(movie =>{
    rawHTML +=`<li style = "display:flex; justify-content: space-between; margin:1rem 0;">${movie.title}
    <div>
    <button class="btn btn-primary btn-show-movie" 
              data-bs-toggle="modal" 
              data-bs-target="#movie-modal" data-id="${movie.id}" >More</button>
              <button class="btn btn-info btn-add-favorite" data-id=${movie.id}>+</button>
              </li>
              </div>`
    
  })
  rawHTML +=`</ul>`
  dataPanel.innerHTML = rawHTML;
}

//監聽
dataPanel.addEventListener("click", (e)=>{
  if (e.target.matches(".btn-show-movie")){
    showMoviedetail(e.target.dataset.id)
  }else if (e.target.matches(".btn-add-favorite")){
    addToFavorite(Number(e.target.dataset.id))
  }
})
const searchInput = document.querySelector("#search-input")
let pageOut = 1;
searchForm.addEventListener("submit", (e)=>{
  //取消預設事件
  e.preventDefault();
  //處理輸入字串
  const keyWords = searchInput.value.trim().toLocaleLowerCase()
  //儲存符合條件的項目
  
  //判斷字串
  if (!keyWords.length){
    renderMovieList(getMoviesByPage(1))
    renderPaginator(movies.length)
    return alert("請輸入有效字串")
  }
  //條件篩選
  filterMovies = movies.filter((movie) =>
    movie.title.toLocaleLowerCase().includes(keyWords)
  )
  if (filterMovies.length === 0){
    renderPaginator(movies.length)
    renderMovieList(getMoviesByPage(1));
    return alert(`您輸入的關鍵字${keyWords}沒有符合條件的電影`)
  }else{
    renderPaginator(filterMovies.length)
  }
  
  //把篩選完的條件重新渲染
  renderMovieList(getMoviesByPage(1));
})
//設定頁數功能
paginator.addEventListener("click", (e)=>{
  if (e.target.tagName !== "A") return

  //讓頁碼亮起來
  const lis = paginator.childNodes
  lis.forEach(li=>{
    li.childNodes[0].classList.remove("act")
  })
  e.target.classList.add("act")


  pageOut = Number(e.target.dataset.page)
  //透過dataset取得被點擊的頁數
  const page = Number(e.target.dataset.page)
  //根據class來更新頁面
  if (dataPanel.classList.contains("col")){
    renderMovieList(getMoviesByPage(page))
  }else {
    renderListMode(getMoviesByPage(page))
  }
  })
  
 
  

const listBar = document.querySelector(".fa-bars")
const col = document.querySelector(".fa-th")
changeMode.addEventListener("click", (e)=>{
  if (e.target.matches(".fa-bars")){
    dataPanel.classList = "row list"
    // e.target.classList.add("act")
    renderListMode(getMoviesByPage(pageOut))
    // console.log(e.target)
  }else if (e.target.matches(".fa-th")){
    dataPanel.classList = "row col"
    renderMovieList(getMoviesByPage(pageOut))
  }
  //根據頁面決定哪種按鈕變顏色
  if (dataPanel.classList.contains("list")){
    listBar.classList.add("act")
    col.classList.remove("act")
  }else{
    col.classList.add("act")
    listBar.classList.remove("act")
  }
})


