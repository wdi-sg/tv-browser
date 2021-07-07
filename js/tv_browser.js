// API Docs at:
// http://www.tvmaze.com/api

var inputField = document.querySelector('#show-search');
var button = document.querySelector('#submit-button');
var selectField = document.querySelector('#show-select');
var defaultOption = document.querySelector("#default-option");
var input = ""
var updateList = function (event) {
    event.preventDefault();
    input = inputField.value;
    let request = new XMLHttpRequest();
    request.addEventListener("load", responseHandler);
    request.addEventListener("error", requestFailed);

    request.open("GET", "http://api.tvmaze.com/search/shows?q="+input);
    request.send();
    selectField.style.display = "block";
}

var displayShow = function (event) {
    console.log("displaying");
}

var responseHandler = function () {
    var shows = JSON.parse(this.responseText);
    for (var i=0;i<shows.length; i++){
        let option = document.createElement("option");
        //console.log("Name: "+shows[i].show.externals.imdb);
        option.innerText = shows[i].show.name;
        option.value = shows[i].show.externals.imdb
        selectField.appendChild(option);
    }
    defaultOption.innerText = `Shows matching '${input}'`;
}

var requestFailed = function(){
  console.log("error");
};

button.addEventListener("click",updateList);
selectField.addEventListener("change",displayShow);