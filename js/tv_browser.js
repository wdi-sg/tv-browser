// API Docs at:
// http://www.tvmaze.com/api

// window.onload = function () {

var body = document.body;
var selector = document.querySelector("#show-select");
var input = document.querySelector('input');
var submitButton = document.querySelector('button');
var result;

function responseHandler() {

    // console.log("response text", this.responseText);
    // console.log("status text", this.statusText);
    // console.log("status code", this.status);
    var response = JSON.parse( this.responseText );
    console.log(response);
    result = response;
};


function requestFailed() {
    console.log("response text", this.responseText);
    console.log("status text", this.statusText);
    console.log("status code", this.status);
};


function repopulateSelector () {

    selector[0].textContent = `Shows matching "${input.value}"...`;

    while (selector.length > 1) {
        selector.removeChild(document.querySelectorAll("#show-select option:not(:first-child)")[0]);
    };

    for (i in result) {
        var newOption = document.createElement("option");
        newOption.id = result[i].show.id;
        newOption.textContent = result[i].show.name;
        selector.appendChild(newOption);
    };
};


function doSubmit() {

    var url = `http://api.tvmaze.com/search/shows?q=${input.value}`;

    // document.querySelector('#show-select')

    console.log(url);

    var request = new XMLHttpRequest();
    request.addEventListener ('load', responseHandler);
    request.addEventListener ('load', repopulateSelector);
    request.addEventListener("error", requestFailed);

    request.open("GET", url);
    request.send();
};


function doSubmitIndiv() {

    var num = selector.selectedIndex;
    var showId = selector[num].id;

    var url = `http://api.tvmaze.com/shows/${showId}`;

    console.log(url);

    var request = new XMLHttpRequest();
    request.addEventListener("load", responseHandler)
    request.addEventListener("error", requestFailed);

    request.open("GET", url);
    request.send();
};


submitButton.addEventListener('click', doSubmit);

selector.addEventListener('change', doSubmitIndiv);












// };