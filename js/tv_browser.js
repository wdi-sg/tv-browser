// API Docs at:
// http://www.tvmaze.com/api
var searchBar = document.getElementById("show-search");
var searchButton = document.getElementById("search-button");
var selectBar = document.getElementById("show-select");
function goToURL() {
    var showURL = this.value;
    window.location.href = showURL;
    console.log("you clicked this");
              
}
selectBar.addEventListener("change", goToURL);
function makeQuery() {
    var query = searchBar.value;
    function requestHandler() {
        var vResponseText = this.responseText;
        var responseJSON = JSON.parse(vResponseText);
        console.log("JSON received: " + responseJSON);

        for (let i = 0; i < responseJSON.length; i++) {
            const show = responseJSON[i].show;
            var showName = show.name;
            var showURL = show.url;
            var newOption = document.createElement("option");
            newOption.setAttribute("value", showURL);
            newOption.innerText = showName;
            selectBar.appendChild(newOption);
        }
    }
    var request = new XMLHttpRequest();
    request.addEventListener("load", requestHandler);
    request.open("GET", "http://api.tvmaze.com/search/shows?q=" + query);
    request.send();
}
searchButton.addEventListener("click", makeQuery);