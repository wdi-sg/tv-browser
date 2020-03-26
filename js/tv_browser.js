// API Docs at:
// http://www.tvmaze.com/api
// Create DOM and XHR elements
var request = new XMLHttpRequest();

var resultsJSON;

var tvmazeUrl = "http://api.tvmaze.com/search/shows?q=";

var inputField = document.getElementById("show-search");
var searchButton = document.querySelector("button");
var showSelect = document.getElementById("show-select");
var showDetail = document.getElementById("show-detail");

showSelect.style.visibility = "hidden";



// Helper Functions

function searchHandler() {
  var endPoint = tvmazeUrl + inputField.value;

  request.open("GET", endPoint);
  request.send();
}

function responseHandler() {
  resultsJSON = JSON.parse(this.responseText);
  var nameArray = nameQuery(resultsJSON);
  addOptions(nameArray);
  showSelect.firstElementChild.innerText = `Shows matching ${inputField.value}...`
  showSelect.style.visibility = "visible";
  inputField.value = "";
}

function selectHandler(event) {
  showDetail.innerHTML = "";
  var name = event.target.value;
  var show = findShow(resultsJSON, name);

  showDetail.innerHTML = `<h2>${name}</h2><img src="${show.image.medium}" alt="${name}">` + show.summary;
  // showDetail.innerHTML = show.summary;
  // addName(name);
  // addImage(show);
}

function nameQuery(jsonObject) {
  var outputArray = [];
  for(let i = 0; i < jsonObject.length; i++) {
    outputArray.push(jsonObject[i].show.name);
  }
  return outputArray;
}

function addOptions(array) {
  for (let i = 0; i < array.length; i++) {
    var option = document.createElement("option");
    option.value = array[i];
    option.innerText = array[i];
    showSelect.appendChild(option);
  }
}

function findShow(jsonObject, name) {
  for (let i = 0; i < jsonObject.length; i++) {
    if (jsonObject[i].show.name === name) {
      var show = jsonObject[i].show;
      return show;
    }
  }
}

function addName(name) {
  var showName = document.createElement("h1");
  showName.innerText = name;
  showDetail.insertBefore(showDetail.firstElementChild, showName);
}

function addImage(show) {
  var showImage = document.createElement("img");
  showImage.src = show.image.medium;
  showImage.alt = show.name;
  showDetail.insertBefore(showDetail.firstElementChild, showImage);
}



// Event listeners

request.addEventListener("load", responseHandler);

inputField.addEventListener("change", searchHandler);

searchButton.addEventListener("click", searchHandler);

showSelect.addEventListener("change", selectHandler);