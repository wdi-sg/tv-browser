/*console.log("Hello");
var doSubmit = function(event){
    var input = document.querySelector('#show-search');
    var url = input.value;
};
document.querySelector('button').addEventListener('click', doSubmit);

var requestForItems = function (url) {

    // make a new request
    var request = new XMLHttpRequest();

    // ready the system by calling open, and specifying the url
    request.open("GET", "http://api.tvmaze.com/search/people?q=lauren");

    var responseHandler = function() {
      console.log("response text", this.responseText);
      console.log("status text", this.statusText);
      console.log("status code", this.status);
      var response = JSON.parse( this.responseText );
      console.log( response );
    };

    var requestFailed = function() {
      console.log("response text", this.responseText);
      console.log("status text", this.statusText);
      console.log("status code", this.status);
    };

    // listen for the request response
    request.addEventListener("load", responseHandler);
    request.addEventListener("error", requestFailed);

    // send the request
    request.send();
}*/

var responseHandler = function(){
  console.log("response text", this.responseText);
  var responseObject = JSON.parse( this.responseText );
  console.log(responseObject);

  // display it on the screen
  /*var el = document.createElement('p');
  el.innerText = responseObject;
  document.body.appendChild( el );
};*/

var doSubmit = function(event){
    var input = document.querySelector('#show-search');
    var url = input.value;
};
document.querySelector('button').addEventListener('click', doSubmit);
// make a new request
var request = new XMLHttpRequest();

request.addEventListener("load", responseHandler);

// ready the system by calling open, and specifying the url
request.open("GET", "http://api.tvmaze.com/search/people?q=lauren");

// send the request
request.send();