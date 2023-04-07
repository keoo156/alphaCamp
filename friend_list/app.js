const people = document.querySelector(".people")
const base_url = "https://user-list.alphacamp.io"
const data_Url = base_url + "/api/v1/users";
const PEOPLE_PER_PAGE = 20;

const userData = [];
let filtered = [];
const page = document.querySelector(".pagination")
const searchForm = document.querySelector("#search-form")
const searchInput = document.querySelector("#search-input")

axios.get(data_Url).then(response=>{
    userData.push(...response.data.results)
    showPag(userData.length)
    showUsers(slicePeople(1));
})





function showDetail(id){
    const title = document.querySelector(".modal-title")
    const birthday = document.querySelector(".birthday")
    const email = document.querySelector(".email")
    const region = document.querySelector(".region")
    axios.get(data_Url +"/"+ id).then(response=>{
        const data = response.data
        title.innerHTML = data.name;
        birthday.innerHTML = data.birthday;
        email.innerHTML = data.email;
        region.innerHTML = data.region;
    })
}

function slicePeople(page){
    let startNum = (page - 1) * PEOPLE_PER_PAGE
    let endNum = startNum + PEOPLE_PER_PAGE
    let data = filtered.length ? filtered:userData
    let newUser =  data.slice(startNum, endNum)
    return newUser;
}

function showUsers(data){
    let rawInner = ""
    data.forEach(person => {
        rawInner +=`<div class="card m-4" style="width: 18rem;">
        <img src="${person.avatar}" class="card-img-top"  alt="...">
        <div class="card-body">
          <p class="card-text">"${person.name}"</p>
          <button  type="button" class="btn btn-primary btn-show-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id ="${person.id}">see more</button>
          <button  type="button" class="btn btn-primary btn-add-like"  data-id ="${person.id}">i like it</button>
          </div>
      </div>`
    });
    people.innerHTML = rawInner;
}

function addToLike(id){
    const list =JSON.parse(localStorage.getItem("likeList")) || []
    const user = userData.find((user)=>user.id === Number(id))
    if (list.some((user)=>user.id === Number(id))){
        return alert("已經選過了")
    }
    list.push(user)
    localStorage.setItem("likeList", JSON.stringify(list))
    
}

function showPag(dataNum){
    const totalPage = Math.ceil(dataNum / PEOPLE_PER_PAGE)
    let rawHTML = "";
    for (let i = 1; i <= totalPage; i++){
        rawHTML +=`<li class="page-item"><a class="page-link" href="#" data-page=${i}>${i}</a></li>`
    }
    page.innerHTML = rawHTML
}

people.addEventListener("click", (e)=>{
    if (e.target.matches(".btn-show-detail")){
        showDetail(e.target.dataset.id)
    }else if (e.target.matches(".btn-add-like")){
        console.log("123")
        addToLike(e.target.dataset.id)
    }
})

page.addEventListener("click", (e)=>{
    if (e.target.tagName !== "A") return
    const page = e.target.dataset.page
    showUsers(slicePeople(page))
})

searchForm.addEventListener("submit", (e)=>{
    const keyWord = searchInput.value.trim().toLowerCase()
    if (!keyWord.length){
        return alert("請輸入有效字串")
    }
    
    filtered = userData.filter((user)=>user.name.toLowerCase().includes(keyWord))
    if (filtered.length === 0){
        return alert(`您輸入的${keyWord}沒有搜尋結果`)
    }
    showPag(filtered.length)
    showUsers(slicePeople(1))
    
})