const BASE_URL = 'https://lighthouse-user-api.herokuapp.com'
const INDEX_URL = BASE_URL + '/api/v1/users'
const userList = []
const dataPanel = document.querySelector('#data-panel')
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')

// get data from api using Axios and create userList
axios.get(INDEX_URL).then((response) => {
  userList.push(...response.data.results)
  console.log(userList)
  renderUserList(userList)
})

// clicking event setting
dataPanel.addEventListener('click', function onPanelClicked(event) {
  if (event.target.matches('.avatar') || event.target.matches('.btn-more-info')) {
    // console.log(event.target)
    // console.log(event.target.dataset.id)
    showUserModal(Number(event.target.dataset.id))
  } else if (event.target.matches('.btn-add-favorite')) {
    addToFavorite(Number(event.target.dataset.id))
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
          <h2 class="h6 user-name" data-id="${item.id}">${item.name} ${item.surname}</h2>
        </div>
        <div class="card-footer text-right">
         <button class="btn-more-info btn btn-info" data-id="${item.id}" data-toggle="modal"
         data-target="#user-info-modal">more</button>
          <button class="btn-add-favorite btn btn-primary" data-id="${item.id}">+</button>
        </div>
      </div>
    </div>
  </div>`
  })
  dataPanel.innerHTML = rawHTML
}

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

// searchForm
searchForm.addEventListener('submit', function onSearchFormSubmit(event){
  event.preventDefault()
  const keyword = searchInput.value.trim().toLowerCase()
  let filteredUser = []
  
  // filter
  filteredUser = userList.filter((user) =>
  user.name.toLowerCase().includes(keyword) || user.surname.toLowerCase().includes(keyword))
  // 搜尋優化
  if (filteredUser.length === 0) {
    return alert(`找不到符合 ${keyword} 的結果，請重新搜尋`)
  }
  renderUserList(filteredUser)
})

// local storage
// localStorage.setItem('name', 'Weber')
// localStorage.setItem('surname', 'Yang')
// localStorage.getItem('name')
// localStorage.removeItem('name')

// function addToFavorite
function addToFavorite (id) {
  const list = JSON.parse(localStorage.getItem('favoriteUsers')) || []
  const user = userList.find((user) => user.id === id)
  if (list.some((user) => user.id === id)) {
    return alert('此人已加入收藏清單')
  }
  list.push(user)
  alert(`${user.name} ${user.surname} 已加入最愛清單`)
  localStorage.setItem('favoriteUsers',JSON.stringify(list))
}

// pagination 分頁