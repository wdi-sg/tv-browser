// http://www.tvmaze.com/api


//setting the request var for use later
var request = new XMLHttpRequest();
var buttonGetter = document.getElementById('submit')

//setting the response handler for action
var responseHandler = function() {
    var response = JSON.parse( this.responseText );
    console.log("status code", this.status);
    console.log("response text", this.responseText);
    var lengthOfArray = response.length;
    //looping to print all show names
    for (i=0; i<lengthOfArray; i++){
    var createShowName = document.createElement('p');
    createShowName.innerText = (i + 1) + ") Show name: " + response[i].show.name;
    document.body.appendChild(createShowName);
    }
};

//setting up request api function.
var requestAPI = function(){
    var input = document.querySelector('#show-search');
    var entry = input.value;
    var optionGetter = document.getElementById("show-select");
    if (optionGetter.value === "search-show")
    request.open("GET", "http://api.tvmaze.com/search/shows?q=" + entry);
    request.send();
};













// to load up the response handler for the item which
request.addEventListener("load", responseHandler);
// setting, once submit button clicked then request for the api.
buttonGetter.addEventListener('click', requestAPI);