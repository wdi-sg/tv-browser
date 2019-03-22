// API Docs at:
// http://www.tvmaze.com/api

  var doRequest = function(event){
    var searchField = document.querySelector('#show-search');
    var searchInput = searchField.value;


// make a new request
  var request = new XMLHttpRequest();

// listen for the request response
  request.addEventListener("load", responseHandler);

// ready the system by calling open, and specifying the url
  request.open("GET", "http://api.tvmaze.com/search/shows?q=" + searchInput);

// send the request
  request.send();
};

    // what to do when we receive the request
  var responseHandler = function() {
    var response = JSON.parse( this.responseText );
    console.log("response text", this.responseText);
    console.log("status text", this.statusText);
    console.log("status code", this.status);
    console.log( response );
  };

window.onload = function() {
  document.querySelector("button").addEventListener('click', doRequest);
};

// When you get the results, fill in the select element with an option element for each result
// response.forEach(function(response) {
//         var option = document.createElement("option");
//         option.value = response.show.id
//         option.innerText = response.show.name;
//         document.querySelector("#show-select").appendChild(option);
// });