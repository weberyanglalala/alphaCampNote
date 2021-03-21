const BASE_URL = 'https://lighthouse-user-api.herokuapp.com'
const INDEX_URL = BASE_URL + '/api/v1/users'
const userList = []
const dataPanel = document.querySelector('#data-panel')

// get data from api using Axios and create userList
axios.get(INDEX_URL).then((response) => {
  userList.push(...response.data.results)
  console.log(userList)
  renderUserList(userList)
})

// clicking event setting
dataPanel.addEventListener('click', function onPanelClick(event) {
  if (event.target.matches('.avatar') || event.target.matches('.user-name')) {
    console.log(event.target)
    console.log(event.target.dataset.id)
    showUserModal(Number(event.target.dataset.id))
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
          data-target="#user-info-modal" data-id="${item.id}}">${item.name} ${item.surname}</h2>
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
    console.log(response.data.id)
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