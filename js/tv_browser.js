let searchedItem;
let searchUrl;
let showTitlesArr = [];
let selectDiv = document.getElementById("show-select");

var responseHandler = function() {
  console.log("Response handler start");
  // console.log("response text: ", this.responseText);
  selectDiv.innerHTML = "";
  let response = JSON.parse(this.responseText);
  console.log(response);
  console.log(response[0].show.name);
  for (let i=0; i<response.length; i++) {
    showTitlesArr.push(response[i].show.name);
    let newOption = document.createElement("option");
    newOption.textContent = response[i].show.name; 
    selectDiv.appendChild(newOption);
  }
}

var requestFailed = function() {
  console.log("Request failed");
};

var doSubmit = function() {
  var request = new XMLHttpRequest();
  var input = document.getElementById("show-search");
  searchedItem = input.value;
  // console.log(searchedItem);
  searchUrl = "http://api.tvmaze.com/search/shows?q=" + searchedItem;
  request.open("GET", searchUrl);
  request.addEventListener("load", responseHandler);
  request.addEventListener("error", requestFailed);
  request.send();
};

let button = document.getElementById("submitbutton");
button.addEventListener("click", doSubmit);