// API Docs at:
// http://www.tvmaze.com/api
// http://api.tvmaze.com/search/shows?q=
// http://api.tvmaze.com/singlesearch/shows?q=
/*
<option value="volvo">Volvo</option>
The <option> tag can be used without any attributes, but you usually need the value attribute, which indicates what is sent to the server.
*/

var websitePartOne = "http://api.tvmaze.com/";
var websitePartTwo = "/shows?q=";

var response;
var result;

//once window loads
window.onload = function(){
    //append click event handler to button to receive input
    document.querySelector("button").addEventListener('click', searchInput);
    //append click event handler to select to receive input
    //since input is from select: searchType is singlesearch
    document.querySelector('#show-select').addEventListener('change', function(){
        sendSearch(this.value, "singlesearch")
    });
};

//get user search input
function searchInput(){
    //clear previous search options if present
    clearOldSearchOptions()
    var searchTerm = document.querySelector("input").value
    // since input is from button: searchType is search
    sendSearch(searchTerm, "search");
};

//clear previous search options if present
function clearOldSearchOptions(){
    document.querySelector('#show-select').innerHTML = '<option value="">Select a show...</option>';
};

//clear previous singlesearch results if present
function clearOldSearchResults(){
    document.querySelector('#show-detail').innerHTML = "";
};

// forming the request
function sendSearch(searchTerm, searchType){
    //clear previous singlesearch results if present
    clearOldSearchResults();
    //creating the new request
    var request = new XMLHttpRequest();
    //ready the system by calling open, and specifying the url
    request.open("GET", websitePartOne + searchType + websitePartTwo + searchTerm);
    //listen for the request response
    if (searchType === "search") {
        //if searchType is search, send response(s) into option tags:
        request.addEventListener("load", searchResponseHandler);
    } else if (searchType === "singlesearch") {
        //else if searchType is single, send response into show-detail:
        request.addEventListener("load", singleSearchResponseHandler);
    };
    //send out the actual request:
    request.send();
};

//if searchType is search, process response, then add into option tags
function searchResponseHandler(){
    // console.log("response text", this.responseText);
    var response = JSON.parse(this.responseText);
    console.log(response);
    for (let option of response) {
        var result = document.createElement("option");
        result.value = option.show.name;
        result.innerText = option.show.name;
        document.querySelector('#show-select').appendChild(result);
    }
};

//if searchType is singlesearch, process response, then add into show-detail
function singleSearchResponseHandler(){
    // console.log("response text", this.responseText);
    var response = JSON.parse(this.responseText);
    console.log(response);
    //creating elements and appending
    var title = document.createElement("h2");
    var image = document.createElement("img");
    var summary = document.createElement("div");
    title.innerText = response.name;
    summary.innerHTML = response.summary;
    image.setAttribute("src", response.image.medium);
    document.querySelector('#show-detail').appendChild(title);
    document.querySelector('#show-detail').appendChild(image);
    document.querySelector('#show-detail').appendChild(summary);
};

//alert if no results found
//alert if error 404