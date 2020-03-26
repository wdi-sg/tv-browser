// http://www.tvmaze.com/api


//setting the request var for use later
var request = new XMLHttpRequest();
var optionRequest = new XMLHttpRequest();
var buttonGetter = document.getElementById('submit')
var optionGetter = document.getElementById('show-select');
var showDetailGetter = document.getElementById("show-detail");

//setting the response handler for action
var responseHandler = function() {
    var response = JSON.parse( this.responseText );
    console.log("status code", this.status);
    console.log("response text", this.responseText);
    var lengthOfArray = response.length;
    optionGetter.setAttribute("style", "visibility: visible");
    //looping to print all show names
    for (i=0; i<lengthOfArray; i++){
    var createOption = document.createElement('option');
    createOption.value = response[i].show.id;
    createOption.innerText = response[i].show.name;
    optionGetter.appendChild(createOption);
    }
};

var responseHandlerOpt = function() {
    var response1 = JSON.parse( this.responseText );
    console.log("status code", this.status);
    console.log("response text", this.responseText);
    var createShowNames = document.createElement('h1');
    createShowNames.innerText = "Show Name: " + response1.name;
    showDetailGetter.appendChild(createShowNames);
    var createImage = document.createElement('img');
    createImage.src = response1.image.original;
    showDetailGetter.appendChild(createImage);
}
//setting up request api function.
var requestAPI = function(){
    var input = document.querySelector('#show-search');
    var entry = input.value;
    var optionGetter = document.getElementById("show-select");
    request.open("GET", "http://api.tvmaze.com/search/shows?q=" + entry);
    request.send();
};

// setting up the api request for the click on options.
var optRequestApi = function (){
    var idOfShow = optionGetter.value;
    optionRequest.open("GET", "http://api.tvmaze.com/shows/" + idOfShow);
    optionRequest.send();
    console.log("status code", this.status);
    console.log("response text", this.responseText);
}


// to load up the response handler for the item which
request.addEventListener("load", responseHandler);
// setting, once submit button clicked then request for the api.
buttonGetter.addEventListener('click', requestAPI);
//setting once the item changed, get the value, which is the id and run optRequestApi
optionGetter.addEventListener('change', optRequestApi);
//defining the response handler for the loaded infomation upon chaning the value of the opton.
optionRequest.addEventListener("load", responseHandlerOpt);