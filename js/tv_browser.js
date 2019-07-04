// API Docs at:
// http://www.tvmaze.com/api


console.log("javascript works");

var inputField = document.querySelector("#show-search");
var button = document.querySelector("#submitButton");
var storeData = "";

var getInput = function () {
    storeData = inputField.value;

    var responseHandler = function () {
        var myObject = JSON.parse(this.responseText);
        console.log(myObject);
        // var height = myObject["height"];
        // console.log("Data: Height: "+height);

            for (var i=0; i< myObject.length; i++) {
            var name = myObject[i]["show"]["name"];
            console.log(name);
            }
        }
    var request = new XMLHttpRequest();
    request.addEventListener("load", responseHandler);
    request.open("GET", "http://api.tvmaze.com/search/shows?q=" + storeData);
    request.send();

};

button.addEventListener('click', getInput);