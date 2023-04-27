const URL = 'https://user-list.alphacamp.io';
const indexURL = URL + '/api/v1/users/';
const dataPanel = document.querySelector("#data-panel");

let users = [];
const search_form = document.querySelector('#searchForm');
//分頁
const usersPerPage=14;


function addUsers() {
  axios.get(indexURL).then(function(response) {
    users.push(...response.data.results);
    renderUserCards(users);
  });
}


// 顯示用戶卡片
function renderUserCards(users) {
  // 先清空原本的卡片
  const friendsList = JSON.parse(localStorage.getItem('friends')) || [];
  dataPanel.textContent = '';
  // 1.handle success
  users.forEach((user) => {
    if (friendsList.some(f => f.id === user.id)) {
      dataPanel.innerHTML += `
  <div class="card m-2 " style="width: 10rem;">
    <img src="${user.avatar}" class="card-img-top" alt="...">
    <div class="card-body d-flex flex-column align-items-center">
      <h5 class="card-title text-center  m-1">${user.name}</h5>
      <br>
      <a class="btn btn-primary justify-content-center mb-1 infoBtn" id="infoBtn" data-bs-toggle="modal" data-id="${user.id}" data-bs-target="#info-modal">個人資料</a>
      <button class="btn btn-danger addFriendsBtn" id='heart${user.id}' data-id="${user.id}">
        <i class="bi bi-heart" ></i>
      </button>
    </div>
  </div>`
    } else {
      dataPanel.innerHTML += `
  <div class="card m-2 " style="width: 10rem;">
    <img src="${user.avatar}" class="card-img-top" alt="...">
    <div class="card-body d-flex flex-column align-items-center">
      <h5 class="card-title text-center  m-1">${user.name}</h5>
      <br>
      <a class="btn btn-primary justify-content-center mb-1 infoBtn" id="infoBtn" data-bs-toggle="modal" data-id="${user.id}" data-bs-target="#info-modal">個人資料</a>
      <button class="btn btn-outline-danger addFriendsBtn" id='heart${user.id}' data-id="${user.id}">
        <i class="bi bi-heart" ></i>
      </button>
    </div>
  </div>`
    }
    //   dataPanel.innerHTML +=`
    //  <div class="card m-2 " style="width: 10rem;">
    //   <img src="${user.avatar}" class="card-img-top" alt="...">
    //   <div class="card-body d-flex flex-column align-items-center">
    //     <h5 class="card-title text-center  m-1">${user.name}</h5>
    //     <br>
    //     <a class="btn btn-primary justify-content-center mb-1 infoBtn" id="infoBtn" data-bs-toggle="modal" data-id="${user.id}" data-bs-target="#info-modal">個人資料</a>
    //     <button class="btn btn-outline-danger addFriendsBtn" id='heart' data-id="${user.id}">
    //       <i class="bi bi-heart" ></i>
    //     </button>
    //   </div>
    // </div>`
  });
}

//彈出用戶個人資料
function showInfoModal(id) {
  // get elements
  const modalTitle = document.querySelector('#info-modal-title')
  const modalBody = document.querySelector('#info-modal-body')

  // send request to show api
  axios.get(indexURL + id).then(response => {
    const data = response.data
    // insert data into modal ui
    modalTitle.innerText = `${data.name} ${data.surname}`
    modalBody.innerHTML = `
    <div class="row">
            <div class="col-sm-4" id="info-modal-image">
              <img
                src="${data.avatar}"
                alt="info-avatar" class="img-fluid" />
            </div>
            <div class="col-sm-8">
              <p id="modal-age">age: ${data.age}</p>
              <p id="modal-gender">gender: ${data.gender}</p>
              <p id="modal-region">region: ${data.region}</p>
              <p id="modal-birthday">birthday: ${data.birthday}</p>
              <p id="modal-email">email: ${data.email}</p>            
            </div>
          </div>
    `
  })
}


// 搜尋函式
function search(event) {
  event.preventDefault(); // 防止預設的表單提交行為
  const input = document.querySelector('#searchUser');
  const filteredUsers = users.filter((user) => {
    return user.name.toLowerCase().includes(input.value.toLowerCase())
  });
  renderUserCards(filteredUsers);
}


//加好友
function addToFriends(id) {
  const friendsList = JSON.parse(localStorage.getItem('friends')) || [];
  const friend = users.find(user => user.id === id);
  const heart = document.querySelector(`#heart${id}`);
  if (friendsList.some(f => f.id === id)) {
    return alert('此好友已經在最愛清單中！');
  }
  heart.classList.remove('btn-outline-danger');
  heart.classList.add('btn-danger');
  friendsList.push(friend);
  localStorage.setItem('friends', JSON.stringify(friendsList));
  renderUserCards(users)
}

//分頁函式
function getUsersByPage(page){
  const allPages=Math.ceil((users.length)/usersPerPage);
  const startIndex=(page-1)*usersPerPage;
  return users.slice(startIndex,startIndex+usersPerPage);
}

dataPanel.addEventListener('click', function onPanelClicked(event) {
  if (event.target.matches('.infoBtn')) {
    showInfoModal(event.target.dataset.id);
  } else if (event.target.matches('.addFriendsBtn')) {
    addToFriends(Number(event.target.dataset.id));
  }
})

//
search_form.addEventListener('submit', search);
addUsers();


