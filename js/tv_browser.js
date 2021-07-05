// API Docs at:
// http://www.tvmaze.com/api

console.log("connected");

var response;

var responseResult;

var showSelect = document.getElementById("show-select");

var responseUpdate = function() {
    responseResult = responseHandler();
};

var options = showSelect.options;

var removeOptions = function() {
    options = showSelect.options;
    for (var i = 1; i <= options.length; i+=1 ) {
        options[i].remove();
  };
};

var showNames;

//figure out error
var requestFailed = function(){
  debugger;
  console.log("response text", this.responseText);
  console.log("status text", this.statusText);
  console.log("status code", this.status);
};

//processes the data for the request
var responseHandler = function() {
    // removeOptions();
  // console.log("response text", this.responseText);
  console.log("status text", this.statusText);
  showNames = JSON.parse( this.responseText );
  console.log("status code", this.status);
  console.log(showNames);

  showNames.forEach(function(result) {
    var option = document.createElement("option");
    option.text = result.show.name;
    option.value = result.show.name;
    showSelect.appendChild(option);
  });
};

var doSubmit = function(event){
//draws input from the input tag
    var input = "http://api.tvmaze.com/search/shows?q="+ document.querySelector('#show-search').value;
      console.log(input);
// make a new request
    var request = new XMLHttpRequest();
// The load event is fired when a resource and its dependent resources have finished loading.
    request.addEventListener("load", responseHandler);
//The XMLHttpRequest method open() initializes a newly-created request, or re-initializes an existing one.
    request.open("GET", input);
// Error events are fired at various targets for different kinds of errors:
// When a JavaScript runtime error (including syntax errors and exceptions thrown within handlers) occurs, an error event using interface ErrorEvent is fired at window and window.onerror() is invoked (as well as handlers attached by window.addEventListener (not only capturing)).
// When a resource (such as an <img> or <script>) fails to load, an error event using interface Event is fired at the element that initiated the load, and the onerror() handler on the element is invoked. These error events do not bubble up to window, but (at least in Firefox) can be handled with a single capturing window.addEventListener.
    request.addEventListener("error", requestFailed);
// The XMLHttpRequest method send() sends the request to the server. If the request is asynchronous (which is the default), this method returns as soon as the request is sent and the result is delivered using events. If the request is synchronous, this method doesn't return until the response has arrived.
    request.send();
};

//allows request process to start by allowing user to submit
document.querySelector('button').addEventListener('click', doSubmit);









