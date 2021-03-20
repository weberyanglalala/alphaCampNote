const BASE_URL = 'https://movie-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/movies/'
const POSTER_URL = BASE_URL + '/posters/'
const movies = []
const dataPanel = document.querySelector('#data-panel')

// 定義函數：渲染電影清單
// 為增加函數複用性，以新的參數 data 儲存資料，避免函數回傳值與原本設定變數 movie 耦合改變了原本 movie 的資料
function renderMovieList (data) {
  let rawHTML = ''
  // process: find movie title, image
  data.forEach(item => {
    rawHTML += `<div class="col-sm-3">
    <div class="mb-2">
      <div class="card">
        <img
          src="${POSTER_URL + item.image}"
          class="card-img-top" alt="Movie Poster" />
        <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
        </div>
        <div class="card-footer">
          <button class="btn btn-primary btn-show-movie" data-toggle="modal"
          data-target="#movie-modal" data-id="${item.id}">More</button>
          <button class="btn btn-info btn-add-favorite">+</button>
        </div>
      </div>
    </div>
  </div>`
  })
  dataPanel.innerHTML = rawHTML
}
// showMovieModal
function showMovieModal (id) {
  const modalTitle = document.querySelector('#movie-modal-title')
  const modalDate = document.querySelector('#movie-modal-date')
  const modalImage = document.querySelector('#movie-modal-image')
  const modalDescription = document.querySelector('#movie-modal-description')

  axios.get(INDEX_URL + id).then(response => {
    const data = response.data.results
    console.log(data)

    modalTitle.innerText = data.title
    modalDate.innerHTML = `Released Date: ${data.release_date}`
    modalImage.innerHTML = `<img src="${ POSTER_URL + data.image}" alt="Movie Poster" class="img-fluid">`
    modalDescription.innerText = data.description
  })
}
// 點擊事件

dataPanel.addEventListener('click', function onPanelClick(event) {
  if (event.target.matches('.btn-show-movie')) {
    console.log(event.target.dataset.id)
    showMovieModal(Number(event.target.dataset.id))
  }
})

// axios
axios.get(INDEX_URL).then((response) => {
  movies.push(...response.data.results)
  renderMovieList(movies)
})