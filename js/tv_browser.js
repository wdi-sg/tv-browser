// API Docs at:
// http://www.tvmaze.com/api

var searchResults = [];
window.onload = function() {
document.querySelector('#show-search').addEventListener('click', doSubmit);
}
// What to execute when we receive the request
var responseHandler = function() {

      var response = JSON.parse( this.responseText );
      console.log("response text", this.responseText);
      console.log("status text", this.statusText);
      console.log("status code", this.status);
      console.log(response);
      searchResults = response;
};

//create a new request
//var url = new XMLHttpRequest();

var doSubmit = function(event){
    // make a new request
    var request = new XMLHttpRequest();
    var input = document.querySelector('#show-search').value;

    // listen for the request response
    request.addEventListener("load", responseHandler);
    request.open("GET", "http://api.tvmaze.com/search/shows?q=" + input);
    request.send();
    console.log("success");
};

var showDetail = function() {
    var details = document.querySelector("#show-select").value;
    var detailResults = document.querySelector('#show-detail').value;
    detailResults.innerHTML = "";

    for (var i = 0; i < searchResults.length; i++)
    {
        if(searchResults[i].show.name === details)
        {
            var movieTitle = document.createElement('h1');
            movieTitle.textContent = searchResults[i].show.name;
            details.appendChild(movieTitle);

            var movieImg = document.createElement('img');
            movieImg = searchResults[i].show.image.original;
            detailResults.appendChild(movieImg);
        }
    }

}




