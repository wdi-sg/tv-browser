// API Docs at:
// http://www.tvmaze.com/api

var button = document.getElementById("button");
var showSelect = document.getElementById("show-select");
var showDetail = document.getElementById("show-detail");

var addOption = function(optionText, listPosition, selectList, lala) {
  var option = document.createElement("option");
  option.text = optionText;
  selectList.add(option, listPosition);
  option.setAttribute("id", lala);
};

button.addEventListener("click", function(event) {
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
})