// API Docs at:
// http://www.tvmaze.com/api

var request = new XMLHttpRequest();

var display = document.getElementById('show-detail')
const inputElement = document.getElementById('show-search');
const submitBtn = document.getElementById('submit-btn');
const url = `http://api.tvmaze.com/search/shows?q=`

submitBtn.addEventListener('click', submitRequest)


var responseHandler = function() {
    console.log(`responseHandler triggered`)
    var results = JSON.parse(this.responseText);
    for (var index=0; index < results.length; index++) {
      var itemName = document.createElement("h1");
      var itemDesc = document.createElement("p");
      itemName.innerText = results[index].show.name;
      itemDesc.innerHTML = results[index].show.summary;
      display.appendChild(itemName);
      display.appendChild(itemDesc);
    }
};

var requestFailed = function() {
    console.log(`requestFailed triggered`)
    console.log("status code", this.status);
    console.log(`There was an error.`)
    display.innerText = `There was an error.`;
};

function submitRequest(event) {
    var inputValue = inputElement.value.replace(/\s/g, `-`); //turns all queries into kebab case
    var query = url + inputValue;
    request.open("GET", query);
    request.send();
    request.addEventListener("load", responseHandler);
    request.addEventListener("error", requestFailed);
}
