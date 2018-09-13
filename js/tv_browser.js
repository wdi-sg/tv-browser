// API Docs at:
// http://www.tvmaze.com/api

var submitButton = document.getElementById("submit-button");
var showSelect = document.getElementById("show-select");
var showDetail = document.getElementById("show-detail");

var addOption = function(optionText, listPosition, selectList, fhfh) {
  var option = document.createElement("option");
  option.text = optionText;
  selectList.add(option, listPosition);
  option.setAttribute("id", fhfh);
};

submitButton.addEventListener("click", function(event) {
  var input = document.querySelector("#show-search");
  var searchValue = input.value;

  var url = "http://api.tvmaze.com/search/shows?q=" + searchValue;
  console.log(url);

  // Create a response handler to handle the response
  var responseHandler = function() {
    var response = JSON.parse(this.responseText);
    console.log(response);
    for (i = 0; i < response.length; i++) {
      console.log(response[i].show.name);
      addOption(
        response[i].show.name,
        showSelect[i],
        showSelect,
        response[i].show.id
      );
    }
  };

  // Create a new request
  var request = new XMLHttpRequest();
  // Listen for the request response
  request.addEventListener("load", responseHandler);
  // Ready the system by opening and calling the url
  request.open("GET", url);
  // Send the request
  request.send();
});

showSelect.addEventListener("change", function() {
  // This is how to access the movie id but it doesn't matter anyway
  // because the TVMaze API does not allow you to search by ID
  // This is why you should plan the search before doing the exercise.
  // var selectedId = event.target.selectedOptions[0].id
  // Create a response handler to handle the response
  var responseHandler = function() {
    var response = JSON.parse(this.responseText);
    var nameElement = document.createElement("p");
    nameElement.innerText = response.name;
    var imageElement = document.createElement("img");
    imageElement.src = response.image.original;
    showDetail.appendChild(nameElement);
    showDetail.appendChild(imageElement);
    console.log(response.name);
  };

  var request = new XMLHttpRequest();
  // Listen for the request response
  request.addEventListener("load", responseHandler);
  // Ready the system by opening and calling the url
  request.open(
    "GET",
    "http://api.tvmaze.com/singlesearch/shows?q=" + event.target.value
  );
  // Send the request
  request.send();
});
