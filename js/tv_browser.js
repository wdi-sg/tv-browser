// API Docs at:
// http://www.tvmaze.com/api

var responseHandle = function() {
  var response = JSON.parse( this.responseText );
 for (var i = 0; i<response.length; i++){
    var showN = response[i].show.name;
    console.log(showN);
  }
};

var request = new XMLHttpRequest();


 var submitButton = function(){
    var input = document.querySelector('#show-search');
    var searchShow = document.querySelector('#show-search');
    var apiUrl ="http://api.tvmaze.com/search/shows?q="+input.value;
    request.addEventListener("load", responseHandle);
    request.open("GET", apiUrl);
    request.send();
}
     document.querySelector('button').addEventListener('click', submitButton);
