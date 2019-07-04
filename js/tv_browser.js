// API Docs at:
// http://www.tvmaze.com/api

// what to do when we received request
var responseHandler = function () {
    console.log("response text", this.responseText);
    var response = JSON.parse(this.responseText);
    //console.log(response);

    //console.log(response[0]);

    // after receiving response,
    // store each result show.id as value for <option>
    var showId = response[0].show.id;

    // store each result show.name as innerHTML for <option> & <div><h1>
    var showName = response[0].show.name;

    // store each result show.image.original as img src for <div><img>
    var showImg = response[0].show.image.original;

    // store each result show.summary as innerHTML for <div><p>
    var showSum = response[0].show.summary;

    // for (var i = 0; i < response.length; i++) {
    //     console.log(response[i].show.name);
    // }

    console.log(showId);
    console.log(showName);
    console.log(showImg);
    console.log(showSum);

};


// make a new request
var request = new XMLHttpRequest();

// listen for request response
request.addEventListener("load", responseHandler);

// ready the system by calling open, and specifying the url
request.open("GET", "http://api.tvmaze.com/search/shows?q=boys");

// send the request
request.send();