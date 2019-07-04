// API Docs at:
// http://www.tvmaze.com/api

console.log("hello JS script is running");

var showDetail = document.getElementById("show-detail");

var searchShows = function(){

    if(showDetail.hasChildNodes()){ //to remove any previous search output
        showDetail.removeChild(showDetail.firstChild);
    }

    var showName = document.getElementById("show-search").value;
    console.log("show: " + showName);

    // make a new request
    var request = new XMLHttpRequest();

    // listen for the request response
    request.addEventListener("load", responseHandler);

    // ready the system by calling open, and specifying the url
    // open doesn't open anything??
    //This is the set up step for the location to send the request.
    request.open("GET", "http://api.tvmaze.com/search/shows?q="+showName);

    // send the request
    request.send();
};

// what to do when we recieve the request
var responseHandler = function() {

  // "this" keyword refers to the request variable and is specific to THIS request
  console.log("response text", this.responseText);

  console.log("status text", this.statusText);
  console.log("status code", this.status);

  var myObject = JSON.parse(this.responseText);
    var para = document.createElement("p"); //create paragraph to hold show details
    para.innerHTML = `Show name: ${myObject[0].show.name} <br> Language: ${myObject[0].show.language} <br> Genres: ${myObject[0].show.genres} <br> Run time: ${myObject[0].show.runtime} mins <br> Date premiered: ${myObject[0].show.name} <br> Summary: ${myObject[0].show.summary}`;
//    var showDetail = document.getElementById("show-detail");
    showDetail.appendChild(para);
};

var button = document.getElementById("submitbtn");
button.addEventListener("click", searchShows);