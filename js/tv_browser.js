// API Docs at:
// http://www.tvmaze.com/api

var showId;
var showName;
var showImg;
var showSum;


var addShowtoList = function() {
    // Display the results
    //console.log(showId);

    // console.log('type:' + (typeof showId));
    // console.log(showName);
    // console.log(showImg);
    // console.log(showSum);

    // assign show.id as <option> "value
    // create new <option> element with showId as value"

    var results = document.createElement('option');
    results.value = showId;
    results.innerHTML = showName;

    var sel = document.querySelector('#show-select');

    sel.appendChild(results);
    console.log(sel);
    console.log("option created!");
};


// what to do when we received request
var responseHandler = function () {
    console.log("response text", this.responseText);
    var response = JSON.parse(this.responseText);
    console.log(response);

    //console.log(response[0]);

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
    // for (var i = 0; i < response.length; i++) {
    //     console.log(response[i].show.name);
    // }

};



// make a new request
var request = new XMLHttpRequest();

// listen for request response
request.addEventListener("load", responseHandler);

// ready the system by calling open, and specifying the url
request.open("GET", "http://api.tvmaze.com/search/shows?q=boys");

// send the request
request.send();

// create dropdown list when window load
// var onClickSel = function () {
//     addShowtoList();
//     console.log("show added");
// }