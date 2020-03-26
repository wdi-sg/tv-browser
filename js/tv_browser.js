// API Docs at:
// http://www.tvmaze.com/api

const search_btn = document.getElementById('search_btn');
const dropdown = document.getElementById('show-select');
const showDetailsContainer = document.getElementById('show-detail');

const searchEventHandler = e => {
  const searchStr = document.getElementById('show-search').value;
  fetch('http://api.tvmaze.com/search/shows?q=' + searchStr)
    .then(response => response.json())
    .then(json => fillDropDown(json))
    .then( _ => dropdown.classList.remove('is_hidden'));
};

const showResult = data => {
  showDetailsContainer.textContent = JSON.stringify(data, null, 2);
};

const optionSelectedHandler = e => {
  fetch('http://api.tvmaze.com/shows/'+ e.target.value)
    .then( response => response.json())
    .then(json => showResult(json))
};

const fillDropDown = data => {
  data.forEach(entry => {
    const option = document.createElement('option');
    option.textContent = entry.show.name;
    option.value = entry.show.id;
    dropdown.appendChild(option);
  });
  return data;
};

search_btn.addEventListener('click', searchEventHandler);
dropdown.addEventListener('change', optionSelectedHandler);


