// API Docs at:
// http://www.tvmaze.com/api
// Assignment:
// use the input to get the search term from user, and display results in the DOM
// further:
// give user an option element for each result(eg. when girls is typed in, there are many options containing  girls)
// attach an event listener to the select so that when they click on these options the indiv show displays
// images: just link to them
// search: use show search
// for the event listener use single search?
var responseHandler = function(){
console.log("response text", this.responseText);
// console.log("status text", this.statusText);
// console.log("status code", this.status);
var response = JSON.parse(this.responseText);
console.log("response is :" + response);
};


// var request = new XMLHttpRequest();

// request.addEventListener("load", responseHandler);

// request.open("GET", "http://api.tvmaze.com/search/shows?q=girls");

// request.send();

var showSearch = "http://api.tvmaze.com/search/shows?q=";
var searchTerm = "";
document.getElementById('submit').addEventListener('click', goSubmit);

var goSubmit = function(event){
    console.log("goSubmit activated");
    var input = document.getElementById('show-search');

    var url = input.value;

    var request = new XMLHttpRequest();

    request.addEventListener("load", responseHandler);

    searchTerm = `${showSearch}${url}`;
    request.open("GET", searchTerm);

    request.send();
}