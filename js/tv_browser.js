// API Docs at:
// http://www.tvmaze.com/api

var doSubmit = function(event){
    //Get use input from textbox
    var input = document.querySelector('#show-search');
    var searchTerm = input.value;

    var responseHandler = function() {
        console.log("response text", this.responseText);
        console.log("status text", this.statusText);
        console.log("status code", this.status);

    };
    //send out the request
    var request = new XMLHttpRequest();
        request.addEventListener("load", responseHandler);
        request.open("GET", "http://api.tvmaze.com/search/shows/?q=" + searchTerm)
        request.send();

    var requestFailed = function(){
        console.log("response text", this.responseText);
        console.log("status text", this.statusText);
        console.log("status code", this.status);
    };

    request.addEventListener("error", requestFailed)

};

//Add click event to doSubmit
document.querySelector('button').addEventListener("click", doSubmit);