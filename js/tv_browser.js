var body = document.querySelector("body");
var input = document.getElementById("show-search");
var button = document.getElementById("submitButton");
var select = document.getElementById("show-select");
var tvMazeSearchEndpoint = "http://api.tvmaze.com/search/shows?q=";
var movies; // to store the queried movies, and access later

var clearContainer = function() {
    var displayContainer = document.getElementById("displayContainer");
    if (displayContainer) {
        displayContainer.parentNode.removeChild(displayContainer);
    }
}

var searchMatches = function() {
    var inputValue = input.value;

    clearContainer();

    select.innerHTML = "";

    var requestFailed = function() {
        console.log("Failed");
    }

    var getMovies = function()  {

        movies = JSON.parse(this.responseText);

        var defaultOption = document.createElement("option");
        defaultOption.textContent = "Shows matching " + inputValue + "...";
        select.appendChild(defaultOption);
        select.style.display = "flex";

        movies.forEach(function(movie) {
            var option = document.createElement("option");
            option.textContent = movie.show.name
            select.appendChild(option);
        })

    }

    var request = new XMLHttpRequest();

    request.open("GET", tvMazeSearchEndpoint + inputValue);
    request.addEventListener("error", requestFailed);
    request.addEventListener("load", getMovies);
    request.send();
}

button.addEventListener("click", searchMatches);


var showDetails = function() {
    var selectedMovieName = this.value;

    clearContainer();

    var movieToDisplay;
    movies.forEach(function(movie) {
        if (movie.show.name == selectedMovieName) {
            movieToDisplay = movie;
        }
    })

    // Display selected movie details or "movie not found" message
    if (movieToDisplay) {
        var container = document.createElement("div");
        container.id = "displayContainer";
        var titleDiv = document.createElement("div");
        titleDiv.id = "title";
        var imageDiv = document.createElement("div");
        var image = document.createElement("img");
        var plotDiv = document.createElement("div");

        titleDiv.textContent = movieToDisplay.show.name;
        container.appendChild(titleDiv);

        if (movieToDisplay.show.image) {
            console.log(movieToDisplay);
            image.src = movieToDisplay.show.image.medium;
            imageDiv.appendChild(image);
            container.appendChild(imageDiv);
        }

        plotDiv.innerHTML = movieToDisplay.show.summary;
        container.appendChild(plotDiv);

        body.appendChild(container);

    } else {
        var notFoundDiv = document.createElement("div");
        notFoundDiv.id = "displayContainer";
        notFoundDiv.textContent = "No Details Found.";
        body.appendChild(notFoundDiv);
    }
}

// use change instead of click, to avoid unnecessary calls to the API
select.addEventListener("change", showDetails);