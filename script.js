// window.onload=runCode;

var doSubmit = function(event){  };
document.querySelector('#submit').addEventListener('click', runCode); 

// what to do when we recieve the request
var responseHandler = function() {
  console.log("response text", this.responseText);
  console.log("status text", this.statusText);
  console.log("status code", this.status);
};


function runCode (){
// make a new request
var input = document.querySelector('#url'); 
var url = input.value;
var request = new XMLHttpRequest();

// listen for the request response
request.addEventListener("load", responseHandler);
request.addEventListener("error", requestFailed);

// ready the system by calling open, and specifying the url
request.open("GET", "https://swapi.co/api/people1/?search="+url);
// request.open("GET", "https://google.com?"+url);
// send the request
request.send();
}

var requestFailed = function(){
  console.log("response text", this.responseText);
  console.log("status text", this.statusText);
  console.log("status code", this.status);
};

