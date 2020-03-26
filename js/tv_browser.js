var userInput = document.querySelector('#show-search');
var button = document.querySelector('button');


var responseHandler = function() {
    console.log(this);
    var responseText = this.responseText;
    console.log(typeof responseText);
    console.log("response text", this.responseText);
    // var response = JSON.parse(responseText);
    // response = JSON.stringify(response);
    //console.log(response);
    var searchResults = document.createElement('p');
    searchResults.textContent = responseText;
    var resultsDiv = document.getElementById("search-results");
    resultsDiv.appendChild(searchResults);
};

var handleError = function(){};

var userSubmit = function(event) {
    var url = "http://api.tvmaze.com/search/shows?q=" + userInput.value;
    console.log(url);
    var request = new XMLHttpRequest();
    request.addEventListener("load", responseHandler);
    request.addEventListener("error", handleError);
    request.open("GET", url);

    request.send();
}



button.addEventListener('click', userSubmit);