var body = document.querySelector("body");
var input = document.getElementById("show-search");
var button = document.getElementById("submitButton");
var select = document.getElementById("show-select");
var tvMazeSearchEndpoint = "http://api.tvmaze.com/search/shows?q=";

var searchMatches = function() {
    var inputValue = input.value;

    var testContainer = document.getElementById("displayContainer");
    if (testContainer) {
        testContainer.parentNode.removeChild(testContainer);
    }

    select.innerHTML = "";

    var requestFailed = function() {
        console.log("Failed");
    }
    var getMovies = function()  {

        var movies = JSON.parse(this.responseText);

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

    var requestFailed = function() {
        console.log("Failed to retrieve details");
    }

    var displayDetails = function()  {

        var movieList = JSON.parse(this.responseText);
        var movieToDisplay; // list of details

        // Find the movie for which we want to display details
        movieList.forEach(function(movie) {
            if (movie.show.name == selectedMovieName) {
               movieToDisplay = movie;
            }
        })

        // Delete current movie details div if one already exists
        var testContainer = document.getElementById("displayContainer");
        if (testContainer) {
            testContainer.parentNode.removeChild(testContainer);
        }

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

    var request = new XMLHttpRequest();

    request.open("GET", tvMazeSearchEndpoint + selectedMovieName);
    request.addEventListener("error", requestFailed);
    request.addEventListener("load", displayDetails);

    request.send();

}

// use change instead of click, to avoid unnecessary calls to the API
select.addEventListener("change", showDetails);