const BASE_URL = 'https://lighthouse-user-api.herokuapp.com'
const INDEX_URL = BASE_URL + '/api/v1/users'
const userList = JSON.parse(localStorage.getItem('favoriteUsers'))
const dataPanel = document.querySelector('#data-panel')
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')

// clicking event setting
dataPanel.addEventListener('click', function onPanelClicked(event) {
  if (event.target.matches('.avatar') || event.target.matches('.btn-more-info')) {
    // console.log(event.target)
    // console.log(event.target.dataset.id)
    showUserModal(Number(event.target.dataset.id))
  } else if (event.target.matches('.btn-remove-favorite')) {
    //console.log(event.target.dataset.id)
    removeFromFavorite(Number(event.target.dataset.id))
  }
})

// function renderUserList
function renderUserList (data) {
  let rawHTML = ''
   data.forEach (item => {
    rawHTML += `<div class="col-sm-2">
    <div class="mt-2">
      <div class="card">
        <img src="${item.avatar}" alt="avatar" class="btn avatar" data-toggle="modal"
          data-target="#user-info-modal"  data-id="${item.id}">
        <div class="card-body">
          <h2 class="h6 user-name" data-toggle="modal"
          data-target="#user-info-modal" data-id="${item.id}">${item.name} ${item.surname}</h2>
        </div>
        <div class="card-footer text-right">
         <button class="btn-more-info btn btn-info" data-id="${item.id}" data-toggle="modal"
         data-target="#user-info-modal">more</button>
          <button class="btn-remove-favorite btn btn-danger" data-id="${item.id}">X</button>
        </div>
      </div>
    </div>
  </div>`
  })
  dataPanel.innerHTML = rawHTML
}
renderUserList(userList)

// function showUserModal
function showUserModal (id) {
  const modalImage = document.querySelector('#modal-image')
  const modalName = document.querySelector('#modal-name')
  const modalSurname = document.querySelector('#modal-surname')
  const modalId = document.querySelector('#modal-id')
  const modalGender = document.querySelector('#modal-gender')
  const modalBirthday = document.querySelector('#modal-birthday')
  const modalAge = document.querySelector('#modal-age')
  const modalRegion = document.querySelector('#modal-region')
  const modalEmail = document.querySelector('#modal-email')
  axios.get(INDEX_URL + `/${id}`).then(response => {
    // console.log(response.data.id)
    modalImage.src = `${response.data.avatar}`
    modalName.innerText = `NAME: ${response.data.name}`
    modalSurname.innerText = `Surname: ${response.data.surname}`
    modalId.innerText = `ID: ${response.data.id}`
    modalGender.innerText = `GENDER: ${response.data.gender}`
    modalBirthday.innerText = `BIRTHDAY: ${response.data.birthday}`
    modalAge.innerText = `AGE: ${response.data.age}`
    modalRegion.innerText = `REGION: ${response.data.region}`
    modalEmail.innerText = `EMAIL: ${response.data.email}`
  })
}

// function removeFromFavorite

function removeFromFavorite (id) {
  console.log(id)
  if (!userList) return
  // 透過 id, 在 userList 尋找要刪除的 index
  const userIndex = userList.findIndex((user) => user.id === id)
  if (userIndex === -1) return
  // 刪除該用戶
  userList.splice(userIndex, 1)
  // 存回 local storage
  localStorage.setItem('favoriteUsers', JSON.stringify(userList))
  // 重新生成 dataPanel
  renderUserList(userList)
}