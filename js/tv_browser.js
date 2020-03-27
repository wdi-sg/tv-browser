// API Docs at:
// http://www.tvmaze.com/api

var submitButton = document.getElementById('submit');
var searchShow = document.getElementById('show-search');
var showDetails = document.getElementById('show-detail');
var selectShow = document.getElementById('show-select');

// run after submit button clicked
var submitSearch = function () {
    //save value inside searchbar
    var userInput = searchShow.value;
    //put saved value into query url
    var url = `http://api.tvmaze.com/search/shows?q=${userInput}`
    var responseHandler = function () {
        response = JSON.parse(this.responseText);
        console.log(response)
        // get all shows that consists of user input 
        for (var x = 0; x < response.length; x++) {
            // print all search results into show details section
            var result = document.createElement('p');
            // print show names for search results
            result.innerText = response[x].show.name;
            // print names into body
            showDetails.appendChild(result)
            var options = document.createElement('option');
            options.innerText = response[x].show.name;
            // print names into option bar
            selectShow.appendChild(options);
        }
    };
    var request = new XMLHttpRequest();

    request.addEventListener("load", responseHandler);

    request.open("GET", url);
    
    request.send();
}

submitButton.addEventListener('click', submitSearch);

var displayResult = function () {
    var userInput = selectShow.value;
    var url = `http://api.tvmaze.com/search/shows?q=${userInput}`
    var responseHandler = function () {
        response = JSON.parse(this.responseText);
        // save details i want to print
        var name = response[0].show.name;
        var summary = response[0].show.summary;
        var image = response[0].show.image.medium;
        var genre = response[0].show.genres;
        console.log(response[0])
        var selection = document.createElement('div');
        selection.innerHTML = `
        <h1>Title: ${name}</h1>
        <img src=${image}>
        <p> Genre: ${genre}</p>
        <p> Summary: ${summary}</p>
        `
        showDetails.appendChild(selection);
    };
    var request = new XMLHttpRequest();

    request.addEventListener("load", responseHandler);

    request.open("GET", url);

    request.send();
};

var requestFailed = function () {
    console.log("response text", this.responseText);
    console.log("status text", this.statusText);
    console.log("status code", this.status);
};

var request = new XMLHttpRequest();

request.addEventListener("error", requestFailed);