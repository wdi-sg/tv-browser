// API Docs at:
// http://www.tvmaze.com/api
// what to do when we recieve the request
var searchInput;
// make a new request
var request = new XMLHttpRequest();

var response;

var select = document.querySelector("select");

var updateOption = function (optionValue, optionText) {
    var opt = document.createElement("option");
    opt.value = optionValue;
    opt.text = optionText;
    select.add(opt, null);
}

function getSelectedOption(sel) {
    var opt;
    for ( var i = 0, len = sel.options.length; i < len; i++ ) {
        opt = sel.options[i];
        if ( opt.selected === true ) {
            break;
        }
    }
    return opt;
}

var responseHandler = function() {
 response = JSON.parse(this.responseText);

 for (i = 0; i < response.length; i++) {
    console.log("Title: " + response[i].show.name);
    console.log("Score: " + response[i].score);
    console.log("Type: " + response[i].show.type);
    console.log("Img: " + response[i].show.image.medium);
    console.log("OfficalSite: " + response[i].show.officialSite);
    console.log(" ");
    updateOption(i, response[i].show.name);
    }
}
// get selected option in sel (reference obtained above)

var makeRequest = function(searchInput) {
    // listen for the request response
    request.addEventListener("load", responseHandler);

    // ready the system by calling open, and specifying the url
    request.open("GET", "http://api.tvmaze.com/search/shows?q=" + searchInput);

    // send the requestSummary: null
    request.send();
}

var display = function () {
    var opt = getSelectedOption(select);
    // display its value and text
    var i = opt.value;

    var h1 = document.querySelectorAll("h1")[0];
    h1.innerText = response[i].show.name;

    var score = document.querySelectorAll("#score")[0];
    score.innerText = "Score: " + response[i].score;

    var genres = document.querySelectorAll("#genres")[0];
    genres.innerText = "Genres: " + response[i].show.genres;

    var summary = document.querySelectorAll("#summary")[0];
    summary.innerHTML = "Summary: " + response[i].show.summary;

    var a = document.querySelectorAll("a")[0];
    a.href = response[i].show.url;
    a.innerText = "link: " + response[i].show.url;
}

function myFunction() {
    searchInput = document.getElementById("show-search").value;
    console.log(searchInput);
    makeRequest(searchInput);
    setTimeout(display,5000);
}



