
var errorHandler = function(){
    console.log(this)
}
var results;

var input = document.querySelector('#show-search');
//console.log(results);

var searchResult = function(){
  var newArray = []
    for( let i = 0; i < results.length; i ++){
    var name = results[i].show.name;
    newArray.push(name);
    }
    return newArray;
}

//Response Handler*/
var responseHandler = function() {
  console.log(this)
  console.log(this.responseText)

var response = JSON.parse(this.responseText);
  //console.log(Array.isArray(response))
  //console.log(response);
  results = response;
  console.log(searchResult());
  // console.log
  console.log("response text", this.responseText);
  console.log("status text", this.statusText);
  console.log("status code", this.status);
};

var doSubmit = function(event){
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


  /*var pTag = document.createElement('p');
  pTag.innerText = response.name;
  document.querySelector('#show-detail').appendChild(pTag);*/
