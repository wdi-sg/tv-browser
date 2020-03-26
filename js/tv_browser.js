// API Docs at:
// http://www.tvmaze.com/api

var submitButton = document.getElementById('submit');
var searchShow = document.getElementById('show-search');
var showDetails = document.getElementById('show-detail');
var selectShow = document.getElementById('show-select');

// run after submit button clicked
var submitSearch = function () {
    var request = new XMLHttpRequest();
    var userInput = searchShow.value;
    var url = `http://api.tvmaze.com/search/shows?q=${userInput}`
    var responseHandler = function () {
        response = JSON.parse(this.responseText);
        console.log(response)
        // get all shows that consists of user input 
        for (var x = 0; x < response.length; x++) {
            // print all search results into show details section
            var result = document.createElement('p');
            result.innerText = response[x].show.name;
            showDetails.appendChild(result)
            var options = document.createElement('option');
            options.innerText = response[x].show.name;
            selectShow.appendChild(options);
        }
    };

    request.addEventListener("load", responseHandler);

    request.open("GET", url);
    
    request.send();
}

submitButton.addEventListener('click', submitSearch);

var requestFailed = function () {
    console.log("response text", this.responseText);
    console.log("status text", this.statusText);
    console.log("status code", this.status);
};

var request = new XMLHttpRequest();

request.addEventListener("error", requestFailed);