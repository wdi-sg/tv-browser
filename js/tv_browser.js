// API Docs at:
// http://www.tvmaze.com/api

var results = [];
  console.log(results);



  for ( let i = 0; i < results.length; i ++){
    var userEntry = document.querySelector('#show-search');
    var searchWord = userEntry.value;
    if ( (string.charAt(i) === searchWord ){
      console.log(i)
    }

  }





  /*var pTag = document.createElement('p');
  pTag.innerText = response.name;
  document.querySelector('#show-detail').appendChild(pTag);*/

//Response Handler
var responseHandler = function() {
  console.log(this.responseText)

  var response = JSON.parse(this.responseText);
  console.log(response);

  results.push(response);

  var name = response.name
  console.log(name);
  // console.log
  console.log("response text", this.responseText);
  console.log("status text", this.statusText);
  console.log("status code", this.status);


};

var errorHandler = function(){
    console.log(this)
}

var doSubmit = function(event){
    var input = document.querySelector('#show-search');
    var url = input.value;
    // make a new request
    var request = new XMLHttpRequest();
    // ready the system by calling open, and specifying the url
    request.open("GET", "http://api.tvmaze.com/search/shows?q=" + url);
    //sending request
    request.send();
    // listen for the request response
    request.addEventListener("load", responseHandler)
    request.addEventListener("error", errorHandler);
}

document.querySelector('#submit').addEventListener('click', doSubmit);
