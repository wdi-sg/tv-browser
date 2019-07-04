// API Docs at:
// http://www.tvmaze.com/api

var showId;
var showName;
var showImg;
var showSum;

var sel;
var showWrapper;

var addShowtoList = function() {
    // Display the results

    // assign show.id as <option> "value
    // create new <option> element with showId as value"

    var results = document.createElement('option');
    results.setAttribute('value', showId);
    results.textContent = showName;

    // added onclick if this is selected display relevant content
    // results.setAttribute('onclick', 'displayContent(showId)');

    sel = document.querySelector('#show-select');
    sel.setAttribute('onchange', 'getSelectValue()');
    sel.appendChild(results);
};

// check for choice
var getSelectValue = function() {
    var selectedValue = sel.value;
    console.log(selectedValue);
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
    }
};

// create <div> to display show title, image & summary
var displayContent = function() {

    // create new .<div> to store all the show content
    var showContent = document.createElement('div');
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
    var showDesc = document.createElement('p');
    showDesc.textContent = showSum;

    showWrapper = document.querySelector('#show-detail');
    showWrapper.appendChild(showContent);

    showContent.appendChild(showTitle);
    showContent.appendChild(showPoster);
    showContent.appendChild(showDesc);
};



// make a new request
var request = new XMLHttpRequest();

// listen for request response
request.addEventListener("load", responseHandler);

// ready the system by calling open, and specifying the url
request.open("GET", "http://api.tvmaze.com/search/shows?q=boys");

// send the request
request.send();