// API Docs at:
// http://www.tvmaze.com/api
const submitClick = (event) => {
    let input = document.querySelector('#show-search')
    let searchTerm = input.value;
    document.querySelector('#searchTerm').innerText = searchTerm;
    let newOption = document.createElement('option');
    let showSelect = document.querySelector('#show-select');
    newOption.setAttribute('value', searchTerm);
    newOption.innerText = searchTerm;
    showSelect.append(newOption);
}

document.querySelector('#submit').addEventListener('click', submitClick);

console.log(searchTerm);