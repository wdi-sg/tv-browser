// API Docs at:
// http://www.tvmaze.com/api


var submitButton = document.getElementById("submit");
var userInput = document.getElementById("show-search");


// var showId;
var showName;
var showImg;
var showSum;

var sel;
var showWrapper;
var selectedValue;

var showContent;

var addShowtoList = function(showId) {
    // assign show.id as <option> "value
    // create new <option> element with showId as value"
    var results = document.createElement('option');
    results.setAttribute('value', showId);
    results.textContent = showName;

    sel = document.querySelector('#show-select');
    sel.setAttribute("onchange", "getSelectValue(this)");
    sel.appendChild(results);
};

// check for choice
var getSelectValue = function(showId) {
    if (sel.value == showId) {
        console.log(sel.value);
    }
};

// Hide the Start button
var hideMovieInfo = function(id){
    var movieChoice = document.querySelector(id);
    movieChoice.classList.add('hidden');
    console.log("hide button");
};

// Show the Start button
var showMovieInfo = function(id){
    var movieChoice = document.querySelector(id);
    movieChoice.classList.remove('hidden');
    console.log("show button");
};



// what to do when we received request
var responseHandler = function () {
    // console.log("response text", this.responseText);
    var response = JSON.parse(this.responseText);

    // after receiving response,
    // retrieve all the results based on search input
    for (var i = 0; i < response.length; i++) {
        // store each result show.id as value for <option>
        showId = response[i].show.id;

        // store each result show.name as innerHTML for <option> & <div><h1>
        showName = response[i].show.name;

        // store each result show.image.original as img src for <div><img>
        if (response[i].show.image !== null) {
         showImg = response[i].show.image.original;
        } else {
            showImg = "";
        }

        // store each result show.summary as innerHTML for <div><p>
        showSum = response[i].show.summary;

        addShowtoList();
        displayContent(showId);
        // getSelectValue(showId);
    }
};

// create <div> to display show title, image & summary
var displayContent = function(value) {

    // create new .<div> to store all the show content
    showContent = document.createElement('div');
    // set the <div> id to selected value of option
    // so that we can check which option the user select
    showContent.setAttribute('id', value);

    // create a h1 element for show title
    var showTitle = document.createElement('h1');
    showTitle.textContent = showName;

    // create a img element for show poster
    var showPoster = document.createElement('img');
    showPoster.src = showImg;

    // create a <p> element for show summary
    var showDesc = document.createElement('div');
    showDesc.innerHTML = showSum;

    showWrapper = document.querySelector('#show-detail');
    showWrapper.appendChild(showContent);
    showContent.appendChild(showTitle);
    showContent.appendChild(showPoster);
    showContent.appendChild(showDesc);
};


submitButton.addEventListener("click",function(){
// make a new request
    var request = new XMLHttpRequest();

    // listen for request response
    request.addEventListener("load", responseHandler);

    // ready the system by calling open, and specifying the url
    var searchStr = "http://api.tvmaze.com/search/shows?q=" + userInput.value;
    request.open("GET", searchStr);

    // send the request
    request.send();
})