// API Docs at:
// http://api.tvmaze.com/search/shows?q=babylon+5
//var request;
// make a new request

var doSubmit = function(event){

    var request = new XMLHttpRequest();

    var input = document.querySelector('#show-search');
    var showInput = input.value;
    var showSearchArray=showInput.split(" ");
    var showSearch=showSearchArray.join("+");
    var url="http://api.tvmaze.com/search/shows?q="+showSearch;
    request.open("GET", url);
    request.send();
//    console.log(showSearch);
request.addEventListener("error", requestFailed);
request.addEventListener("load", responseHandler);

};

document.querySelector('#submit').addEventListener('click', doSubmit);


// ready the system by calling open, and specifying the url

// send the request

// what to do when we recieve the request
var responseHandler = function() {
  console.log("response text", this.responseText);
  var response = JSON.parse( this.responseText );
  console.log( response );
};

var requestFailed = function(){
    console.log("no such movies");
  console.log("response text", this.responseText);
  console.log("status text", this.statusText);
  console.log("status code", this.status);
};