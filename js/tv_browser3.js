// API Docs at:
// http://www.tvmaze.com/api

// window.onload = function () {

var body = document.body;
var request = new XMLHttpRequest();
var result;

function responseHandler() {

    // console.log("response text", this.responseText);
    // console.log("status text", this.statusText);
    // console.log("status code", this.status);

    var response = JSON.parse( this.responseText );
    console.log(response);
    result = response;
};

request.addEventListener("load", responseHandler);


function repopulateSelector () {

    request.removeEventListener("load", repopulateSelector);

    var selector = document.getElementById("show-select")

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


function requestFailed() {
    console.log("response text", this.responseText);
    console.log("status text", this.statusText);
    console.log("status code", this.status);
};

request.addEventListener("error", requestFailed);

function doAjax(url, callback) {

    request.addEventListener("load", function(){
        if( this.status !== 200 ){
            //
        }else{
            callback( JSON.parse(this.responseText);

        }

    });

    request.open("GET", url);
    request.send();

}

function doSubmit() {
    var input = document.querySelector('input');
    var url = `http://api.tvmaze.com/search/shows?q=${input.value}`;

    doAjax(url, function(response){
        //
        repopulateSelector(reponse);
    });

    // request.addEventListener("load", repopulateSelector);

    // console.log(url);

    // request.open("GET", url);
    // request.send();

};


function doSubmitIndiv() {

    var num = document.querySelector('#show-select').selectedIndex;
    var showId = document.querySelector('#show-select')[num].id;

    var url = `http://api.tvmaze.com/shows/${showId}`;

    console.log(url);

    request.open("GET", url);
    request.send();
};

document.querySelector('button').addEventListener('click', function() {
    doSubmit();
    // setTimeout(repopulateSelector, 500);
    });

document.querySelector('#show-select').addEventListener('change', doSubmitIndiv);












// };