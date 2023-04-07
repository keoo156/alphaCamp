const people = document.querySelector(".people")
const base_url = "https://user-list.alphacamp.io"
const data_Url = base_url + "/api/v1/users";
const PEOPLE_PER_PAGE = 20;

const userData = JSON.parse(localStorage.getItem("likeList")) || [];
// axios.get(data_Url).then(response=>{
//     userData.push(...response.data.results)
    
//     showUsers(slicePeople(1));
// })
showUsers(userData)

people.addEventListener("click", (e)=>{
    if (e.target.matches(".btn-show-detail")){
        showDetail(e.target.dataset.id)
    }else if (e.target.matches(".btn-add-like")){
        
        addToLike(e.target.dataset.id)
    }else if (e.target.matches(".btn-add-delete")){
        deleteThisOne(e.target.dataset.id)
    }
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
    let startNum = Math.ceil((page - 1) * PEOPLE_PER_PAGE)
    let endNum = startNum + PEOPLE_PER_PAGE
    let newUser =  userData.slice(startNum, endNum)
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
          <button  type="button" class="btn btn-primary btn-add-delete"  data-id ="${person.id}">i change my mind</button>
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

function deleteThisOne(id){
    if (!userData || !userData.length) return
    const delIndex = userData.findIndex((user)=> user.id === Number(id))
    if (delIndex === -1) return
    userData.splice(delIndex,1)
    localStorage.setItem("likeList", JSON.stringify(userData))
    showUsers(userData)
}


