// API Docs at:
// http://www.tvmaze.com/api
var response = [];

var responseHandler = function() {
  console.log("response text", this.responseText);
  // console.log("status text", this.statusText);
  // console.log("status code", this.status);
  response = JSON.parse( this.responseText );
  console.log( response );
  select.addEventListener("mouseover",createSelect);
  select.addEventListener("click",showMovieDetails);
}

var url;
var doSubmit = function(){
    var input = document.querySelector('#show-search');
    url = input.value;
    console.log(url);
    var request = new XMLHttpRequest();
    request.addEventListener("load", responseHandler);
    request.open("GET", "http://api.tvmaze.com/search/shows?q="+url);
    request.send();
}
document.querySelector('#submit').addEventListener('click', doSubmit);

//Creates dropdown of search results with id and event listener
var select = document.querySelector("#show-select");
var option = [];
var createSelect = function () {
    for (i=0; i<response.length; i++) {
    option = document.createElement("option");
    console.log("option "+i+ ": "+option);
    option.textContent = response[i].show.name;
    option.value = i;
    console.log(option.value);
    select.appendChild(option);
}
select.removeEventListener("mouseover",createSelect);
}


var details = document.querySelector("#show-detail");
var showMovieDetails = function (event) {

    //Finds out which movie is selected from drop-down
    selectedMovieValue = parseInt(event.target.value);
    console.log(selectedMovieValue);

    //Adds the name of the selected movie to the movie details
    movieName = response[selectedMovieValue].show.name;
    details.innerHTML = movieName+"<br>";

    //Adds the image (medium-sized) of the selected movie to the movie details
    var movieImage = document.createElement("img");
    movieImage.className = "movie-poster";
    (response[selectedMovieValue].show.image.medium) != null ? movieImage.src = response[selectedMovieValue].show.image.medium : movieImage.src = response[selectedMovieValue].show.image.original ;
    console.log(movieImage.src);
    details.appendChild(movieImage);

//Adds movie synopsis of the selected movie to the movie details
    var movieSynopsisTag = document.createElement("div");
    movieSynopsisTag.className = "movie-synopsis";
    var movieSynopsis = response[selectedMovieValue].show.summary;
    console.log(typeof movieSynopsis);
    console.log("movieSyn: "+movieSynopsis);
    movieSynopsisTag.innerHTML = movieSynopsis;
    details.appendChild(movieSynopsisTag)

}


// var requestFailed = function(){
//   console.log("response text", this.responseText);
//   console.log("status text", this.statusText);
//   console.log("status code", this.status);
// }
// request.addEventListener("error", requestFailed);