// API Docs at:
// http://www.tvmaze.com/api
console.log("hello");


var userInput = document.querySelector('#search-form');
console.log(showsList);
var
var shortlist = document.querySelector('#show-select');
console.log(shortlist);


//event listener for submit button to list shows with userInput
document.querySelector('#button').addEventListener('click', displayResultFound);

//function to search for shows with userInput
var result = displayResultFound(userInput){
    var request = new XMLHttpRequest();
    request.addEventListener("load", responseHandler);
    request.open("GET", "http://www.tvmaze.com/api");
};

//create XMLHttpRequest



//display populated list as options in #show-select



//event listener for show selected from populated list



//function to search for show selected and display info


//create XMLHttpRequest



var responseHandler = function() {
        var myObject = JSON.parse(this.responseText);
        var output = myObject["xx"];
        console.log("Genre: " + myObject.height);
};