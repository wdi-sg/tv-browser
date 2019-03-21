// API Docs at:
// http://www.tvmaze.com/api

//when user input a word into the #showsearch "searchbar", use ajax to connect to TV Maza while using the API to "GET" a list of relevant TV show names.
//These should just be names that are presented onto the
var responseHandler = function(){
  console.log("response text", this.responseText);
  var response = JSON.parse( this.responseText );
  console.log(response);
  for (var i = 0; i < response.length; i++){
    var option = document.createElement("option");
    option.innerText = response[i].show.name;
    option.value = response[i].show.id;
    document.getElementById("show-select").appendChild(option);
    console.log(option.value);
    console.log(option.innerText);
  }
}

//this function
var doSubmit = function(event){
  var input = document.querySelector('#show-search');
  var searchTerm = input.value;

  // var searchUrl = "http://api.tvmaze.com/search/shows?q=" + searchTerm
  // make a new request
  var request = new XMLHttpRequest();
  // listen for the request response
  request.addEventListener("load", responseHandler);
  // ready the system by calling open, and specifying the url
  request.open("GET", "http://api.tvmaze.com/search/shows?q="+searchTerm);
  // send the request
  request.send();
}

document.querySelector('#submit').addEventListener('click', doSubmit);

//build a for loop out to handle looping of the array of objects that is generated
//can we use a forEach loop, instead of a for loop?
//show.name
