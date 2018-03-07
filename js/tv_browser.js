// API Docs at:
// http://www.tvmaze.com/api

const showSelect = document.getElementById('show-select');
const showSearchSubmit = document.getElementById('show-search-submit');
const showDetails = document.getElementById('show-detail');
const showSearch = document.getElementById('show-search');
const searchAPIPrefix = 'http://api.tvmaze.com/search/shows?q=';

let xhr = new XMLHttpRequest();
let result = null;

function displayShowSelect() {
    showSelect.style.display = 'block';
};

function searchForShow(searchTerm) {
    return new Promise((resolve, reject) => {
        xhr.open("GET", encodeURI(searchAPIPrefix + searchTerm), true);
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response);
            } else {
                reject(new Error(xhr.statusText));
            }
        };
        xhr.onerror = () => {reject(new Error(xhr.statusText));}
        xhr.send();
    })
};

function scoldUser(error) {
    alert("Error: status = " + error.status + ", statusText = " + error.statusText);
};

function displaySearchTerms(data) {
    resetSearch();
    removeSummary();
    result = JSON.parse(data);
    for (let key in result) {
        let option = document.createElement('option');
        let name = result[key]['show']['name'];
        option.innerText = name;
        option.setAttribute('value', key);
        showSelect.appendChild(option);
    }
    displayShowSelect();
}

function resetSearch() {
    Array.from(document.querySelectorAll('#show-select option:nth-child(n+2)')).forEach(elem => {
        elem.parentNode.removeChild(elem);
    });
}

function removeSummary() {
    let elem = document.querySelector('#show-detail div');
    if (elem != null) {
        elem.parentNode.removeChild(elem);
    }
}

function displaySummary() {
    if (result == null) {return;};
    let index = showSelect.value;
    removeSummary();
    let d = document.createElement('div');
    let title, image, summary;
    title = document.createElement('p');
    title.textContent = result[index]['show']['name'];
    image = document.createElement('img');
    image.setAttribute('src', result[index]['show']['image']['medium']);

    summary = document.createElement('p');
    summary.innerHTML = result[index]['show']['summary'];

    d.appendChild(title);
    d.appendChild(image);
    d.appendChild(summary);
    showDetails.appendChild(d);
}

function submitSearch(event) {
    event.preventDefault();
    let inputValue = showSearch.value;
    if (inputValue != '') {
        showSearch.value = '';
        searchForShow(inputValue).then((success) => displaySearchTerms(success)).catch((error) => scoldUser(error));
    };
};

showSearchSubmit.addEventListener('click', submitSearch);
showSelect.addEventListener('change', displaySummary, false);
