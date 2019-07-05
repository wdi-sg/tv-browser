// API Docs at:
// http://www.tvmaze.com/api

console.log("hello JS script is running");

var showDetail = document.getElementById("show-detail");

var searchShows = function(){

    while(showDetail.hasChildNodes()){ //to remove any previous search output
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

// what to do when we receive the request
var responseHandler = function() {

  // "this" keyword refers to the request variable and is specific to THIS request
  console.log("response text", this.responseText);

  console.log("status text", this.statusText);
  console.log("status code", this.status);

  var myObject = JSON.parse(this.responseText);

    var showList = []; //create an array of shows
    for (var i = 0; i < myObject.length; i++){
        console.log(myObject[i].show.name);
        showList.push(myObject[i].show);
        var eachShow = document.createElement("option");
        var selectDrop = document.getElementById("show-select");
        eachShow.setAttribute("value", myObject[i].show.name);
        eachShow.innerHTML = myObject[i].show.name;
        selectDrop.appendChild(eachShow);
    }



    var para = document.createElement("p"); //create paragraph to hold show details
    //used innerHTML so that text in para can be styled using HTML
    para.innerHTML = `Show name: ${myObject[0].show.name} <br> Language: ${myObject[0].show.language} <br> Genres: ${myObject[0].show.genres} <br> Run time: ${myObject[0].show.runtime} mins <br> Date premiered: ${myObject[0].show.name} <br> Summary: ${myObject[0].show.summary}`;
    showDetail.appendChild(para);
};

var button = document.getElementById("submitbtn");
button.addEventListener("click", searchShows);