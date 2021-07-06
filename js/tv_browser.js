// API Docs at:
// http://www.tvmaze.com/api

// to display final selected
function displaySelected() {
    console.log("response text", this.responseText);
    var response = JSON.parse( this.responseText );
    console.log( response );

    // DOM final results
    var displayAt = document.querySelector('#show-detail');

    var title = document.createElement("h1");
    title.innerHTML = response.name;
    displayAt.appendChild(title);

    var image = document.createElement("img");
    image.src = response.image.medium;
    displayAt.appendChild(image);

    var summary = document.createElement("p");
    summary.innerHTML = response.summary;
    displayAt.appendChild(summary);

}

// to request result of selected title
function getResult() {

    //search again by Show ID
    var showId = this.value;
    console.log("Show ID is: " + showId);

    var request = new XMLHttpRequest();
    request.addEventListener("load", displaySelected);
    request.open("GET", `http://api.tvmaze.com/shows/${showId}`);
    request.send();

}

var responseHandler = function() {
  console.log("response text", this.responseText);
  var response = JSON.parse( this.responseText );
  console.log( response );

  // //display search results
  // var displayAt = document.querySelector('#show-detail');
  // var display = document.createElement("div");
  // display.innerHTML = JSON.stringify(response);
  // displayAt.appendChild(display);

  //this returns a HTML Object
  var toReplace = document.getElementsByTagName("option");
  console.log(toReplace);
  //first option is [0]
  toReplace[0].innerHTML = "Shows matching " + document.querySelector('#show-search').value;

  var select = document.querySelector('#show-select');

  // add options
  for ( i=0; i < response.length; i++ ) {
    var show = response[i].show;

    var result = document.createElement("option");
    result.innerHTML = show.name;
    // append Show ID to search if selected
    result.value = show.id;
    select.appendChild(result);
  }
}

// start search on submit
var doSubmit = function(event){

    var input = document.querySelector('#show-search');
    var subj = input.value;

    // make a new request
    var request = new XMLHttpRequest();

    // listen for the request response
    request.addEventListener("load", responseHandler);

    // ready the system by calling open, and specifying the url
    request.open("GET", `http://api.tvmaze.com/search/shows?q=${subj}`);

    // send the request
    request.send();
}

//to start search
document.querySelector('#submit').addEventListener('click', doSubmit);
//to get selected show
document.querySelector('#show-select').addEventListener('change', getResult);

//to clear displayed results
function clearDisplay() {
  var toClear = document.querySelector('#show-detail');
  toClear.innerHTML = "";
}
