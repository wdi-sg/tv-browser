// hi

var showDetail;
var showSelect;
var resultsArray = [];

var showDetails = function (event) {
  showDetail.innerHTML = "";
  console.log(this.value);
  for (var i = 0; i < resultsArray.length; i++) {
    if (this.value === resultsArray[i].show.name) {
      var thisDetails = document.createElement("p");
      showDetail.appendChild(thisDetails);
      var thisShow = resultsArray[i].show;
      thisDetails.innerHTML = `Name: ${thisShow.name}<br>Language: ${thisShow.language}<br>Summary: ${thisShow.summary}`;
    }
  }
}

var responseHandler = function() {

  // crude way to reset select inputs
  showSelect.innerHTML = "<option>Select a show...</option>";

  //actually does stuff
  var response = JSON.parse( this.responseText );
  for (i = 0; i < response.length; i++) {
    var show = document.createElement("option");
    show.textContent = response[i].show.name;
    showSelect.appendChild(show);
  }
  resultsArray = response;
  showDetail.innerHTML = `<br>${response.length} shows found!`;
  console.log(response);
};

var requestFailed = function() {
  console.log("response text", this.responseText);
  console.log("status text", this.statusText);
  console.log("status code", this.status);
};

var doSubmit = function(event) {
  var input = document.querySelector('#show-search');
  var search = "http://api.tvmaze.com/search/shows?q=";
  var searchString = input.value;
  var url = search + searchString;

  // make a new request
  var request = new XMLHttpRequest();

  // listen for the request response
  request.addEventListener("load", responseHandler);
  request.addEventListener("error", requestFailed);

  // ready the system by calling open, and specifying the url
  request.open("GET", url);
  // send the request
  request.send();
};

window.onload = function () {

  document.querySelector('#submit').addEventListener('click', doSubmit);
  showDetail = document.querySelector("#show-detail");
  showSelect = document.querySelector("#show-select");
  showSelect.addEventListener('change', showDetails);

}
