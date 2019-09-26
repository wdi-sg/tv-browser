// API Docs at:
// http://www.tvmaze.com/api

var responseHandler = function() {
  console.log("response text", this.responseText);
  var response = JSON.parse( this.responseText );
  console.log( response );

  // //display search results
  // var display = document.createElement("div");
  // display.id = "results";
  // display.innerHTML = JSON.stringify(response);
  // document.body.appendChild(display);


    var input = document.querySelector('#show-search');
    var subj = input.value;

    var select = document.querySelector('#show-select');
    // var toRemove = document.getElementsByTagName("option");
    // console.log(toRemove);
    // select.removeChild(toRemove);

    var matching = document.createElement("option");
    matching.value = "";
    matching.innerHTML = "Shows matching " + document.querySelector('#show-search').value;
    select.appendChild(matching);

  //add to options
  for ( i=0; i < response.length; i++ ) {
    var show = response[i].show.name;

    var result = document.createElement("option");
    result.innerHTML = show;
    result.id = "option"+i;
    select.appendChild(result);
  }
}

// var requestFailed = function(){
//     console.log("response text", this.responseText);
//     console.log("status text", this.statusText);
//     console.log("status code", this.status);
// };

var doSubmit = function(event){

    var input = document.querySelector('#show-search');
    var subj = input.value;

    // make a new request
    var request = new XMLHttpRequest();

    // listen for the request response
    request.addEventListener("load", responseHandler);

    // request.addEventListener("error", requestFailed);

    // ready the system by calling open, and specifying the url
    request.open("GET", `http://api.tvmaze.com/search/shows?q=${subj}`);

    // send the request
    request.send();
}

//to start search
document.querySelector('#submit').addEventListener('click', doSubmit);


//to display final selected
function displaySelected() {
    console.log("response text", this.responseText);
    var response = JSON.parse( this.responseText );
    console.log( response );

//DOM final results
    var displayAt = document.querySelector('#show-detail');

    var title = document.createElement("h1");
    title.innerHTML = document.querySelector('#show-select').value;
    displayAt.appendChild(title);

}


function getResult() {
//    var selected = this.innerHTML
    var selected = document.querySelector('#show-select').value;
    console.log(selected);

    var request = new XMLHttpRequest();
    request.addEventListener("load", displaySelected);
    request.open("GET", `http://api.tvmaze.com/search/shows?q=${selected}`);
    request.send();

}

document.querySelector('#show-select').addEventListener('change', getResult);

//to clear displayed results
function clearDisplay() {
  var toClear = document.getElementById("results");
  toClear.innerHTML = "";
}