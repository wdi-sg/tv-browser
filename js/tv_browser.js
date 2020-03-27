console.log("The script is running");

// this is the url to search from
var url = "http://api.tvmaze.com/search/shows?q=girls;"


// function to run when event is loaded
var responseGet = function(){
    // to format strings into objects
    var response = JSON.parse(this.responseText);
        // define show from the parsed response
        var show = response.show
        console.log(response);
        console.log(show);
        // location to display show
        showDetails = document.querySelector("#show-detail");
        // display show
        showDetails.innerText = show;
}


// a function to send the request for the button
var sendRequest = function(){
    // define the location of input
    var input = document.getElementById("show-search")
    console.log("searching....");
    // define request into a variable
    var requestGet = new XMLHttpRequest();
    console.log("getting request...");
    // get the request from the global var url
        requestGet.open("get" , url);
        console.log("searching the url...")
        // send the request
        requestGet.send();
        console.log("sending request...");

    // add an event
    requestGet.addEventListener("load", responseGet);

}
// assign the button from
var submitButton = document.querySelector("#submit-button");

//create an event click on button
submitButton.addEventListener("click", sendRequest);
console.log("The button is listening...")