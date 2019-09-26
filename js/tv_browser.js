// API Docs at:
// http://www.tvmaze.com/api

var responseHandler = function() {
  console.log("response text", this.responseText);
  var response = JSON.parse( this.responseText );
  console.log( response );

  //display results
  var display = document.createElement("div");
  display.id = "results";
  display.innerHTML = JSON.stringify(response);
  document.body.appendChild(display);

  //add to options
  for ( i=0; i < response.length; i++ ) {
    var show = response[i].show.name;

    var select = document.querySelector('#show-select');
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

//to clear displayed results
function clearDisplay() {
  var toClear = document.getElementById("results");
  toClear.innerHTML = "";
}

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
};
document.querySelector('#submit').addEventListener('click', doSubmit);