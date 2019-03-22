// API Docs at:
// http://www.tvmaze.com/api

var searchItemValue = "";

var doSubmit = function(event){



    var searchItem = document.querySelector('#show-search');
    searchItemValue = searchItem.value;

    var selectDropdown = document.querySelector('#show-select');
    selectDropdown.style.visibility = "visible"


    var defaultOption = document.getElementById("default");
    defaultOption.textContent = "Shows matching " + searchItemValue;


    var searchUrl = "http://api.tvmaze.com/search/shows?q=" + searchItemValue;

    console.log(searchUrl);

    // make a new request
var request = new XMLHttpRequest();

// listen for the request response
request.addEventListener("load", function() {

    console.log("response text: ", this.responseText);
  console.log("status text: ", this.statusText);
  console.log("status code: ", this.status);


  var response = JSON.parse (this.responseText);

  var selectTag = document.getElementById("show-select");

  for(var i=0; i<response.length; i++) {
    var nameOfFilm = response[i]["show"]["name"];
    console.log(nameOfFilm);

    var optionTag = document.createElement("option");
    optionTag.value = response[i]["show"]["id"];
    optionTag.textContent = response[i]["show"]["name"];

    selectTag.appendChild(optionTag);
    console.log(selectTag);


    console.log(optionTag.value);
    console.log(optionTag.textContent);
}

});

// ready the system by calling open, and specifying the url
request.open("GET", searchUrl);

// send the request
request.send();


}

var parentTag = document.getElementById("show-detail");
var imgTag = document.createElement("img");

var divTag = document.createElement("div");

parentTag.appendChild(imgTag);
parentTag.appendChild(divTag);

var doSearch = function(event){
    // var searchItem = document.querySelector('#show-search');
    // var searchItemValue = searchItem.value;


    var idOfShow = event.target.value;
    console.log(idOfShow);

    var searchUrl = "http://api.tvmaze.com/search/shows?q=" + searchItemValue;

    console.log(searchUrl);


// make a new request
    var request = new XMLHttpRequest();

// listen for the request response
request.addEventListener("load", function() {

    console.log("response text: ", this.responseText);
  console.log("status text: ", this.statusText);
  console.log("status code: ", this.status);


  var response = JSON.parse (this.responseText);



  for(var i=0; i<response.length; i++) {
    var imgOfFilm = response[i]["show"]["image"];
    var summaryOfFilm = response[i]["show"]["summary"];


    if(response[i]["show"]["id"] == idOfShow) {

        if(imgOfFilm == null) {
            imgTag.src = "";
            imgTag.alt = "Sorry no image";
            divTag.textContent = summaryOfFilm;
        } else if(imgOfFilm != null) {
           imgTag.src = imgOfFilm["medium"];
           divTag.textContent = summaryOfFilm;
       }
    }
}

});

// ready the system by calling open, and specifying the url
request.open("GET", searchUrl);

// send the request
request.send();


}



var searchButton = document.querySelector("#submit").addEventListener("click", doSubmit);

 var selectOption = document.querySelector("#show-select");
    selectOption.addEventListener("change", doSearch);