// API Docs at:
// http://www.tvmaze.com/api
console.log("hello");


var userInput = document.querySelector('#show-search');
var resultList = document.querySelector('#show-select');
var button = document.querySelector('#button');
var input = "";


//function to search for shows with userInput
var displayResult = function (){
    input = userInput.value;
    //create XMLHttpRequest
    var request = new XMLHttpRequest();
    // listen for the request response
    request.addEventListener("load", responseHandler);
    // ready the system by calling open, and specifying the url
    request.open("GET", "http://api.tvmaze.com/search/shows?q="+input);
    //send request
    request.send();
};


// what to do when we receive the request
var responseHandler = function() {
        //parse data received which is string so that it becomes object
        var shows = JSON.parse(this.responseText);
        console.log(shows);
        for (var i=0; i<shows.length; i++) {
            var result = document.createElement("option");
            result.innerText = shows[i].show.name;
            resultList.appendChild(result);
        }

};


//event listener for submit button to list shows with userInput
//note: better to directly define displayResult function below
button.addEventListener("click", displayResult);