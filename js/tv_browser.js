// API Docs at:
// http://www.tvmaze.com/api

var request = new XMLHttpRequest();

var display = document.getElementById('show-detail')
const inputElement = document.getElementById('show-search');
const submitBtn = document.getElementById('submit-btn');
const url = `http://api.tvmaze.com/search/shows?q=`
const dropdown = document.getElementById('show-select');

submitBtn.addEventListener('click', submitRequest)

function kebabCase(string) {
    return string.replace(/\s/g, `-`).toLowerCase();
}

function submitRequest() {
    var userInput = inputElement.value;
    var inputValue = kebabCase(userInput); //turns all queries into kebab case
    document.getElementById('first-option').innerText = `Shows matching "${userInput}"`;
    var query = url + inputValue;
    request.open("GET", query);
    request.send();
    request.addEventListener("load", populateDropDown);
    request.addEventListener("error", requestFailed);
    inputElement.value = "";
}

function populateDropDown() {
  dropdown.classList.remove('hide');
    display.innerText = "";
    console.log(`responseHandler triggered`)
    var results = JSON.parse(this.responseText);
    for (var index = 0; index < results.length; index++) {
        var itemDropDown = document.createElement("option")
        itemDropDown.innerText = results[index].show.name;
        itemDropDown.value = kebabCase(results[index].show.name);
        dropdown.appendChild(itemDropDown);
    }
};


var requestFailed = function() {
    console.log(`requestFailed triggered`)
    console.log("status code", this.status);
    console.log(`There was an error.`)
    display.innerText = `There was an error.`;
};


dropdown.addEventListener('change', getOneShow);

function getOneShow() {
    var selectedShow = this.value;
    var singleSearchURL = `http://api.tvmaze.com/singlesearch/shows?q=`;
    var query = singleSearchURL + selectedShow
    console.log(query);
    request.open('GET', query);
    request.send();
    request.addEventListener("load", displayShow);
    request.addEventListener("error", requestFailed);
}

function displayShow() {
    display.innerText = "";
    var results = JSON.parse(this.responseText);
    var itemName = document.createElement("h1");
    var itemDesc = document.createElement("p");
    itemName.innerText = results.name;
    itemDesc.innerHTML = results.summary;
    display.appendChild(itemName);
    display.appendChild(itemDesc);
}
