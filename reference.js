var responseHandler = function() {

  console.log("response text", this.responseText);

  var person = JSON.parse( this.responseText );

  var h3 = document.querySelector('#search-form');

  h3.innerText = person.name;

  console.log("status text", this.statusText);
  console.log("status code", this.status);
};

var doRequest = function(){

    var request = new XMLHttpRequest();

    // listen for the request response
    request.addEventListener("load", responseHandler);

    // ready the system by calling open, and specifying the url
    request.open("GET", "https://swapi.co/api/people/1");

    request.send();

}


window.onload = function(){
    var button = document.querySelector('#show-select')
        .addEventListener('onclick', doRequest);



}