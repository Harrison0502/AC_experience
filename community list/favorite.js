const URL = 'https://user-list.alphacamp.io';
const indexURL = URL + '/api/v1/users/';
const dataPanel = document.querySelector("#data-panel");

const users = JSON.parse(localStorage.getItem('friends'));




// 顯示用戶卡片
function renderUserCards(users) {
  // 先清空原本的卡片
  dataPanel.textContent = '';
  // 1.handle success
  users.forEach((user) => {
     dataPanel.innerHTML += `
  <div class="card m-2 " style="width: 10rem;">
    <img src="${user.avatar}" class="card-img-top" alt="...">
    <div class="card-body d-flex flex-column align-items-center">
      <h5 class="card-title text-center  m-1">${user.name}</h5>
      <br>
      <a class="btn btn-primary justify-content-center mb-1 infoBtn" id="infoBtn" data-bs-toggle="modal" data-id="${user.id}" data-bs-target="#info-modal">個人資料</a>
      <button class="btn btn-outline-danger removeFriendsBtn" id='heart${user.id}' data-id="${user.id}">X
      </button>
    </div>
  </div>`
  });
}

//用戶個人資料
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
function removeFromFavorite(id) {
  if (!addUsers) return

  const friendIndex = users.findIndex(friend => friend.id === id)
  if (friendIndex === -1) return

  users.splice(friendIndex, 1)
  localStorage.setItem('friends', JSON.stringify(users))
  renderUserCards(users)
}


function removeFriends(id) {
  const removeIndex = users.findIndex(user => user.id === id);
  if (removeIndex === -1) return
  users.splice(removeIndex, 1);
  localStorage.setItem('friends',JSON.stringify(users));
  renderUserCards(users);
}



dataPanel.addEventListener('click', function onPanelClicked(event) {
  if (event.target.matches('.infoBtn')) {
    showInfoModal(event.target.dataset.id);
  } else if (event.target.matches('.removeFriendsBtn')) { 
    removeFriends(Number(event.target.dataset.id));
  }
})

console.log(users);
renderUserCards(users);