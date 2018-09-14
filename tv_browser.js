// API Docs at:
// http://www.tvmaze.com/api


var responseHandler = function() {
  console.log("response text", this.responseText);
  console.log("status text", this.statusText);
  console.log("status code", this.status);
  var response = JSON.parse( this.responseText );
  console.log( response );

for (var i = 0; i<response.length; i++){
    var showDOM = document.getElementById("show-detail");
    var showP = document.createElement("p");
    showP.textContent = response[i].show.name;
    showDOM.appendChild(showP);
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


// // // listen for the request response
// request.addEventListener("load", responseHandler);

// // // // ready the system by calling open, and specifying the url
// request.open("GET", "http://api.tvmaze.com/search/shows?q=girls");


var doSubmit = function(event){
    var input = document.querySelector('#show-search');
    var url ="http://api.tvmaze.com/search/shows?q="+input.value;


    // listen for the request response
    request.addEventListener("load", responseHandler);
    request.addEventListener("error", requestFailed)
    // // ready the system by calling open, and specifying the url
    request.open("GET", url);

    // send the request
    request.send();
}

    document.querySelector('#show-search').addEventListener('click', doSubmit);

// print the elements within the query















