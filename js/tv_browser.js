// API Docs at:
// http://www.tvmaze.com/api

console.log("hello world");
var searchString = "http://api.tvmaze.com/search/shows?q=";
var dataArr;
var eventTYPE;
var doSubmit = function(event) {
    var input = document.getElementById('show-search');
    var url = searchString + input.value;
    // make a new request
    var request = new XMLHttpRequest();
    // listen for error response
    request.addEventListener("error", errorHandler);
    // listen for the request response
    request.addEventListener("load", responseHandler);
    // ready the system by calling open, and specifying the url
    request.open("GET", url);
    // send the request
    request.send();
};

var selectSubmit = function(event) {
    console.log(event.type);
    var selectedOptValue = event.target.value;
    var url = "http://api.tvmaze.com/singlesearch/shows?q=" + selectedOptValue;
    console.log(url);
    var request = new XMLHttpRequest();
    request.addEventListener("load", responseRefined);
    request.open("GET", url);
    request.send();
}

var outputToSelect = function(dataObj) {
    var showSelect = document.getElementById('show-select');
    for (let i = 0; i < dataObj.length; i++) {
        var opt = document.createElement('option');
        opt.value = dataObj[i]["show"]["name"];
        opt.innerHTML = dataObj[i]["show"]["name"];
        console.log(`${dataObj[i]["show"]["name"]}`)
        showSelect.appendChild(opt);
    }

}

document.getElementById('submit').addEventListener('click', doSubmit);
document.getElementById('show-select').addEventListener('change', selectSubmit);

var errorHandler = function() {
    console.log("response text, this.responseText");
    console.log("status text", this.statusText);
    console.log("status code", this.status);
}

var responseHandler = function() {
    // console.log("response text", this.responseText);
    // console.log("status text", this.statusText);
    // console.log("status code", this.status);
    dataArr = JSON.parse(this.responseText);
    outputToSelect(dataArr);
};

var responseRefined = function() {
    // console.log("response text", this.responseText);
    // console.log("status text", this.statusText);
    // console.log("status code", this.status);
    dataArr = JSON.parse(this.responseText);
    console.log(dataArr);
    outputToScr(dataArr);
};
var outputToScr = function(dataArr) {
    var outputData = document.getElementById("output");
    outputData.innerHTML = "<h3>" + dataArr['name'] + "</h3> <p>"+dataArr['summary']+"</p>";


}


//https://swapi.co/api/people/10
