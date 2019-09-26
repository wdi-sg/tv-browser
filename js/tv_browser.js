// API Docs at:
// http://www.tvmaze.com/api
const submitClick = (event) => {
    let input = document.querySelector('#show-search')
    console.log("i'm activated!!!");
    let searchTerm = input.value;
    document.querySelector('#searchTerm').innerText = searchTerm;
}

document.querySelector('#submit').addEventListener('click', submitClick);