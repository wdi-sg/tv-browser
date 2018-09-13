// API Docs at:
// http://www.tvmaze.com/api

  var submitButton = document.getElementById("submit-button");

  const URL_STRING = "http://api.tvmaze.com/search/shows?q=";

  var addOption = function(optionText, listPosition, selectList) {
      var option=document.createElement("option");
      option.text=optionText;
      selectList.add(option, listPosition)
  }

  submitButton.addEventListener("click", function(event) {
    var input = document.querySelector("#show-search");
    var searchValue = input.value;

    var url = "http://api.tvmaze.com/search/shows?q=" + searchValue;
    console.log(url);
    // Create a response handler to handle the response
    var responseHandler = function() {
      var response = JSON.parse(this.responseText);
      console.log(response);
      var showSelect = document.getElementById("show-select")
      for(i = 0; i < response.length; i++) {
          console.log(response[i].show.name);
          addOption(response[i].show.name, showSelect[i], showSelect)
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
