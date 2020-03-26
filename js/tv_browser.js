// API Docs at:
// http://www.tvmaze.com/api
console.log("hello ah boy");

var responseHandler = function() {
    // this keyword refers to the request variable
  console.log("response text", this.responseText);
  console.log("status text", this.statusText);
  console.log("status code", this.status);

  var myObject = JSON.parse(this.responseText);
  console.log(myObject);
};

var emptyInput="";
    var doSubmit = function(event){
        var input = document.querySelector('#show-search');
        emptyInput=input.value;
        console.log(emptyInput);
        // what to do when we recieve the request
        var responseHandler = function() {
          var response = JSON.parse(this.responseText);
          console.log(response);
          for(var i=0; i<response.length;i++){
            var name = response[i]["show"]["name"];
            console.log(name);
            }
        };



        // make a new requests
        var request = new XMLHttpRequest();
        // listen for the request response
        request.addEventListener("load",responseHandler);
        // ready the system by calling open, and specifying the url
        request.open("GET", "http://api.tvmaze.com/search/shows?q="+emptyInput);
        // send the request
        request.send();
    }
    document.querySelector('#submit').addEventListener('click', doSubmit);










// make a new request
var request = new XMLHttpRequest();

// listen for the request response
request.addEventListener("load", responseHandler);

// ready the system by calling open, and specifying the url
// open doesn't open anything??
request.open("GET", "http://api.tvmaze.com/search/shows?q=girls");

// send the request from my mac to server
request.send();