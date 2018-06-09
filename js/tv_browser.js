var body = document.querySelector("body");
var notFoundDiv = document.createElement("div");
notFoundDiv.id = "notFoundContainer";
body.appendChild(notFoundDiv);

var container = document.createElement("div");
container.id = "displayContainer";

var titleDiv = document.createElement("div");
titleDiv.id = "title";
var imageDiv = document.createElement("div");
imageDiv.id = "imageDiv"
var image = document.createElement("img");
var summary = document.createElement("div");

container.appendChild(titleDiv);
imageDiv.appendChild(image);
container.appendChild(imageDiv);
container.appendChild(summary);
body.appendChild(container);

var input = document.getElementById("show-search");
var button = document.getElementById("submitButton");
var select = document.getElementById("show-select");
var tvMazeSearchEndpoint = "http://api.tvmaze.com/search/shows?q=";
var movies; // to store the queried movies, and access later

// Function to clear existing dropdown and previously-selected movie info
var clearAll = function() {
    select.innerHTML = "";
    titleDiv.textContent = "";
    imageDiv.style.display = "none";
    summary.innerHTML = "";
}

// Event Listener to search movies with keyword
var searchMatches = function() {
    var inputValue = input.value;

    clearAll();

    var requestFailed = function() {
        console.log("Failed");
    }

    var getMovies = function()  {

        var moviesArray = JSON.parse(this.responseText);

        // clear the previous movie object
        movies = {};

        // transform the moviesArray into an oject for easy access
        // each movie name becomes a key, and the entire info like {name: girl movie, summary: some plot, etc} becomes the object (value)
        // movie[key] = value
        moviesArray.forEach(function(movie) {
            movies[movie.show.name] = movie;
        })

        var defaultOption = document.createElement("option");
        defaultOption.textContent = "Shows matching " + inputValue + "...";
        select.appendChild(defaultOption);
        select.style.display = "flex";

        moviesArray.forEach(function(movie) {
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

// Event Listener to select a movie
var showDetails = function() {
    var selectedMovieName = this.value;

    var movieToDisplay = movies[selectedMovieName];

    titleDiv.textContent = movieToDisplay.show.name;

    // in case some movie has no images
    if (movieToDisplay.show.image) {
        imageDiv.style.display = "flex";
        image.src = movieToDisplay.show.image.medium;
    } else {
        imageDiv.style.display = "none";
    }
    summary.innerHTML = movieToDisplay.show.summary;

}

// use change instead of click, to avoid unnecessary calls to the API
select.addEventListener("change", showDetails);