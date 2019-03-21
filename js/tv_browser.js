  var responseHandler = function() {
    console.log("response text", this.responseText);
    var response = JSON.parse( this.responseText );
var h1 = document.createElement('h1');
h1.textContent = response.name;

    //var select = document.querySelector("#search-form");

    //select.innerText = response.name;
    
    
    console.log("status text", this.statusText);
    console.log("status code", this.status);
  }
  
  var doRequest = function(){
  // make a new request
  var request = new XMLHttpRequest();
  
  // listen for the request response
  request.addEventListener("load", responseHandler);
   
  request.open("GET", "http://api.tvmaze.com/search/shows?q");  
  request.send();
  }


  window.onload = function(){
    var button = document.querySelector('#show-search')
        .addEventListener('click', doRequest);
  }