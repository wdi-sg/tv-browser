// API Docs at:
// http://www.tvmaze.com/api


var showSelect = document.getElementById('show-select');
var objectResponse = [];


var responseHandler = function(event) {
    console.log("response text", this.responseText);
    var response = JSON.parse(this.responseText);
    console.log(response.name);
    objectResponse.push(response);

    var showName = response.name;

    console.log(showName + " NAME OF SHOW");
    addShow(showName);
    var showList = document.querySelector('.show-summary');
    var showTitle = document.createElement('div');

    showTitle.innerText = showName;
    showList.appendChild(showTitle);
}


//Makes a new request
var request = new XMLHttpRequest();

request.addEventListener("load", responseHandler);

//Add shows to list
var searchShow = function(event) {

    var searchTvShow = document.querySelector("#show-search");
    var url = "http://api.tvmaze.com/shows/" + searchTvShow.value;
    request.open("GET", url);
    request.send();
}

var addShow = function(show) {

    var listOfShows = document.createElement('option');
    listOfShows.innerText = show;
    document.querySelector('#show-select').appendChild(listOfShows);

}


var displayShow = function(event) {
    console.log("TIME TO SHOW YOU A SHOW!");


/*
    for(var i = 0; i < document.querySelectorAll('.option-list').length; i++) {
        console.log(document.querySelectorAll('.option-list')[1].label);
        console.log(document.querySelectorAll('.option-list').length + " LENGTH OF LIST");
        for(var j = 0; j < objectResponse.length; j++) {
           if(document.querySelectorAll('.option-list')[i].label === objectResponse[j].name) {
            console.log(objectResponse[j].name);


           }
        }

    }
    console.log(objectResponse);


   // for(var i = 0; i < listOfSelectShows.length; i++) {
     //   if(listOfSelectShows[i] === showName) {
       //     console.log(response.summary);
*/
    }



var pickShow = function(event) {
    console.log("Pick a show!");

    for(var i = 0; i < showSelect.length; i++) {
        showSelect[i].setAttribute('class', "option-list");
    }

    document.querySelector(".option-list").addEventListener('click', displayShow);
    displayShow();
}

document.querySelector('button').addEventListener('click', searchShow);
document.querySelector('#show-select').addEventListener('click', pickShow);