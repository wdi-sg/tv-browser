// API Docs at:
// http://www.tvmaze.com/api

var displayHandler = function() {
    console.log("show info");
    // Display Show info

}
var search = function(event) {
    console.log("search");
    var searchTerm = event.target.value;

    var request = new XMLHttpRequest();
    request.addEventListener("load", responseHandler);
    request.open("GET", "http://api.tvmaze.com/search/shows?q="+searchTerm);
    request.send();
};

var responseHandler = function(response) {
    console.log("result");
    var response = JSON.parse(this.responseText);
    // console.log("JSON: ", response);
    // console.log("Show name: ", response[0].show.name);

    for (var i = 0; i < response.length ; i++){
        var option = document.createElement("option");
        option.value = response[i].show.name;
        option.innerText = response[i].show.name;
        // console.log("option: ", option);
        document.querySelector("#show-select").appendChild(option);
    }

};

var display = function(event) {
    console.log("display!");
    // console.log("event: ", event);

    var searchTerm = event.target.value;

    var request = new XMLHttpRequest();
    request.addEventListener("load", displayHandler);
    request.open("GET", "http://api.tvmaze.com/singlesearch/shows?q="+searchTerm);
    request.send();
};

document.querySelector("#show-search").addEventListener("search", search);

document.querySelector("#show-select").addEventListener("change", display);