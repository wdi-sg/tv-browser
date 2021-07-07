// API Docs at:
// http://www.tvmaze.com/api

window.onload = function() {


var input = document.querySelector("input");
var submitButton = document.querySelector("button");
var select = document.querySelector("#show-select");
var details = document.querySelector("#show-detail");
var response;



var responseHandler = function() {
  // console.log("response text", this.responseText);
    response = JSON.parse( this.responseText );
    console.log( response );
    console.log("status text", this.statusText);
    console.log("status code", this.status);
}

var getListing = function() {
    previousSearch = document.querySelectorAll(".listing")
    for (i =0; i < previousSearch.length; i++) {
        previousSearch[i].remove();
    }
    //get list for user to select
    var optionDefault = document.querySelectorAll("option")[0]
    optionDefault.setAttributes = ("id", "default");
    optionDefault.innerHTML = "Shows matching for " + input.value
    for (i in response) {
        var newList = document.createElement("option");
        newList.setAttribute("id", response[i].show.id);
        newList.setAttribute("class", "listing");
        newList.innerHTML = response[i].show.name;
        select.appendChild(newList);
    }
}

var requestFailed = function() {
  // console.log("response text", this.responseText);
    var response = JSON.parse( this.responseText );
    console.log( response );
    console.log("status text", this.statusText);
    console.log("status code", this.status);
};

getButtonResponse = function() {
// create a postman to send and receive info
    var request = new XMLHttpRequest();
// give advanced instructions to the postman on actions to take when there is a response
    request.addEventListener("load", responseHandler);
    request.addEventListener("load", getListing);
    request.addEventListener("error", requestFailed);
// provide the address to the postman
    var url = "http://api.tvmaze.com/search/shows?q=" + input.value;
    request.open("GET", url);
// send the postman off to send the request to get info
    request.send();
}

getSelectResponse = function() {
// make a new request
    var request = new XMLHttpRequest();
// ready the system by calling open, and specifying the url
    for (i in response) {
        if (response[i].show.id === response[select.selectedIndex].id) {
        var selectedName = response[i].show.name;
        var selectedURL = response[i].show.url;
        var selectedImg = response[i].show.image.medium;
        var selectedSum = response[i].show.summary;
        }
    }
    request.open("GET", selectedURL);

    request.send();

    request.addEventListener("load", responseHandler);
    request.addEventListener("load", function() {
    name = document.createElement("h1");
    summary.innerHTML = selectedName;
    details.appendChild(summary);
    image = document.createElement("img");
    image.src = selectedImg;
    details.appendChild(image);
    summary = document.createElement("p");
    summary.innerHTML = selectedSum;
    details.appendChild(summary);
    })
    request.addEventListener("error", requestFailed);
}

submitButton.addEventListener("click",getButtonResponse);
select.addEventListener("click",getSelectResponse);





//Full App : Make the selector field (CSS selector "#show-select") hidden by default.
// After the user submits a search for a TV show...
// un-hide the "#show-select" field.
// populate the "#show-select" field with the list of search results. (create option tags in the select for each result you get)
// make the first / default select option read "Shows matching keyword…".
// Whenever the user selects a title from the #show-select field (HINT: listen for a "change" event), display that show's name and image in the "#show-detail" div.
//Take a look: http://ga-wdi-exercises.github.io/tv-browser/

//Further : Display in the DOM all of the data given to you for a particular show.

//Further : Add a link to the cast of the show. If the user clicks on the cast link, make an AJAX call to get that info and display it to the user.

//Further : Make each cast person clickable. When the user clicks on that person make an AJAX request for the person.



}