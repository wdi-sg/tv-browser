// API Docs at:
// http://www.tvmaze.com/api


var userInput;
var results = [];

window.onload = () => {
    document.querySelector('#submit').addEventListener('click', query);
}

function query() {
    var input = document.getElementById('show-search');
    var userUrl = input.value;
    userInput = userUrl.split(' ').join('&');
    console.log(userInput);

    var request = new XMLHttpRequest();
    request.addEventListener("load", responseHandler);
    request.open("GET", ("http://api.tvmaze.com/search/shows?q=" + userInput));

    // send the request
    request.send();

    var requestFailed = function () {
        console.log("response text", this.responseText);
        console.log("status text", this.statusText);
        console.log("status code", this.status);
    };

    request.addEventListener("error", requestFailed);

}

var responseHandler = function () {
    results = JSON.parse(this.responseText);
    console.log(results);
    console.log("status text", this.statusText);
    console.log("status code", this.status);

    printResult();

}

var printResult = function () {
    for (var i = 0; i < results.length; i++) {
        var eachOption = document.createElement("option");
        eachOption.textContent = results[i].show.name;
        document.getElementById("show-select").appendChild(eachOption);
    };
    document.getElementById("show-select").addEventListener("change", querySingle);
}

function querySingle() {
    console.log("hi im query2");
    debugger;
    userInput = event.target;

    // userInput = userInput.split(' ').join('&');
    console.log(userInput);
    // https://github.com/wdi-sg/tv-browser/pull/48/commits/8e1b067e0eaab3d0200a3c1446c089ae5e141624
    // need to remove sibling
    
    var request = new XMLHttpRequest();
    request.addEventListener("load", responseHandler);
    request.open("GET", ("http://api.tvmaze.com/singlesearch/shows?q=" + userInput));
    request.send();

    var requestFailed = function () {
        console.log("response text", this.responseText);
        console.log("status text", this.statusText);
        console.log("status code", this.status);
    };

    request.addEventListener("error", requestFailed);
}