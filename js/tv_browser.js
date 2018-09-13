// API Docs at:
// http://www.tvmaze.com/api
window.onload = function(){

// what to do when we recieve the request
var responseHandler = function() {
  console.log("response text", this.responseText);
    console.log("status text", this.statusText);
  console.log("status code", this.status);
  var response = JSON.parse(this.responseText);
  console.log(response);
//for loop to go thru the object>key
    for (var i = 0; i<response.length; i++){
    // var mydetail = document.getElementById("show-select");
    //MVP
    // var mydom = document.getElementById("show-detail");
    // var createp = document.createElement("P");
    // createp.textContent = response[i].show.name;
    //MVP End
    //Further
    var mydetail = document.getElementById("show-select");
    var newoption = document.createElement("option");
    newoption.textContent = response[i].show.name;
    mydetail.appendChild(newoption);
    //Further
    //console.log("====" + response[i].show.name);
  }
};

var requestFailed = function(){
  console.log("response text", this.responseText);
  console.log("status text", this.statusText);
  console.log("status code", this.status);
};

// make a new request
var request = new XMLHttpRequest();

// listen for the request response
// request.addEventListener("load", responseHandler);
// request.addEventListener("error", requestFailed);

// // ready the system by calling open, and specifying the url
// request.open("GET", "https://swapi.co/api/people/1");

// // send the request
// request.send();

var doSubmit = function(event){
    var input = document.querySelector('#show-search');
    var url = "http://api.tvmaze.com/search/shows?q="+input.value; //put front link of the search

    request.addEventListener("load", responseHandler);
    request.addEventListener("error", requestFailed);

    // ready the system by calling open, and specifying the url
    request.open("GET", url);

    // send the request
    request.send();
};

document.querySelector('#submit').addEventListener('click', doSubmit);

}

