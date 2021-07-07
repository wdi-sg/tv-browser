// API Docs at:
// http://www.tvmaze.com/api

// var list;
// var input = document.getElementById("show-search");
// input.addEventListener("change",doSubmit);

// var responseHandler = function() {
//   console.log("response text", this.responseText);
//   console.log("status text", this.statusText);
//   console.log("status code", this.status);
//   var info = JSON.parse(this.responseText);
// };


// var showName = document.getElementById("show-select");

var responseHandler = function() {
  console.log("response text", this.responseText);
  var response = JSON.parse( this.responseText );
  var showName = document.getElementById("show-select");
  console.log( response );
  for (let i = 0; i < response.length; i++){
    movieName = response[i].show.name;
    var movieOption = document.createElement("option");
    movieOption.setAttribute("id", i);
    movieOption.textContent = movieName;
    showName.appendChild(movieOption);
    }
    console.log(movieName);
};
// showName.add(response[i].show.name);






var website = "http://api.tvmaze.com/search/shows?q=";

// var request = new XMLHttpRequest();

// // listen for the request response
// request.addEventListener("load", responseHandler);

// // ready the system by calling open, and specifying the url
// request.open("GET", website + query);

// // send the request
// request.send();

var query;

var doSubmit = function(event){
    var input = document.getElementById("show-search");
    query = input.value;
    var request = new XMLHttpRequest();

    // listen for the request response
    request.addEventListener("load", responseHandler);

    // ready the system by calling open, and specifying the url
    request.open("GET", website + query);

    // send the request
    request.send();
};

document.getElementById('submit').addEventListener('click', doSubmit);