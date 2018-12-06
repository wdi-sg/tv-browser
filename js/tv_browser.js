// API Docs at:
// http://www.tvmaze.com/api
window.onload = function() {

    var responseHandler = function() {
        console.log("response text", this.resopnseText);
        console.log("status text", this.statusText);
        console.log("status code", this.status);
    };

    var doSubmit = function(event) {
        var input = document.querySelector("#show-search");
        var url = input.value;

        var request = new XMLHttpRequest();
        request.addEventListener("load", responseHandler);
        request.open("GET", "http://api.tvmaze.com/search/shows?q="+url);
        request.send();
    };
document.querySelector("#submitButton").addEventListener("click", doSubmit);
};