//Getting initial DOM elements
var select = document.getElementById('show-select');
var showDetail = document.getElementById('show-detail');

//Response Handler for initial search
var responseHandler = function() {
  //Parse initial JSON input
  var response = JSON.parse(this.responseText);
  console.log(response);
  displayNames(response);
};

//Function to display names after initial search
var displayNames = function(obj){
    for (var i in obj){
        var nameDisplay = document.createElement('option');
        nameDisplay.innerText = obj[i]['show']['name']
        nameDisplay.value = obj[i]['show']['id']
        select.appendChild(nameDisplay)
    }
}

//Response handler for selecting of movie
var movieHandler = function() {
    var movie = JSON.parse(this.responseText);
    console.log(movie);
    displayMovie(movie);
}

//Function to display show details after movie selected
var displayMovie = function(obj){
    var movieName = document.createElement('h2');
    var movieImage = document.createElement('img');
    var movieSummary = document.createElement('p');

    movieName.innerText = obj.name;
    movieImage.src = obj.image.medium;
    movieSummary.innerHTML = obj.summary;

    showDetail.appendChild(movieName);
    showDetail.appendChild(movieImage);
    showDetail.appendChild(movieSummary);
}

//error handler
var errorHandler = function(){
    console.log(this)
}

//AJAX call for initial search
var initialSearch = function(event){
    select.classList.toggle('hidden');
    var input = document.querySelector('#show-search');
    document.getElementById('default-select').innerText = `Shows matching ${input.value}`
    var showSearch = " http://api.tvmaze.com/search/shows?q=" + input.value;
    // make a new request
    var request = new XMLHttpRequest();
    // ready the system by calling open, and specifying the url
    request.open("GET", showSearch);
    //sending request
    request.send();
    // listen for the request response
    request.addEventListener("load", responseHandler)
    request.addEventListener("error", errorHandler);
}
document.querySelector('#submit').addEventListener('click', initialSearch);

//AJAX call for specific movie
var getMovie = function(event){
    var input = document.querySelector('#show-select');
    var showSelect = "http://api.tvmaze.com/shows/" + input.value;
    // make a new request
    var request = new XMLHttpRequest();
    // ready the system by calling open, and specifying the url
    request.open("GET", showSelect);
    //sending request
    request.send();
    // listen for the request response
    request.addEventListener("load", movieHandler)
    request.addEventListener("error", errorHandler);
}
document.querySelector('#show-select').addEventListener('change', getMovie);