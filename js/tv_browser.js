// API Docs at:
// http://www.tvmaze.com/api

var doRequest = function(){

    var showSearch = document.querySelector('#show-search');
    var searchTerm = showSearch.value;

// make a new request
    var request = new XMLHttpRequest();

    // listen for the request response
    request.addEventListener("load", responseHandler);

    // ready the system by calling open, and specifying the url
    // request.open("GET", "https://swapi.co/api/people/1");
    request.open("GET", "http://api.tvmaze.com/search/shows?q=" + searchTerm);
    request.send();

}

// what to do when we recieve the request

var responseHandler = function() {
    var results = JSON.parse(this.responseText);
    console.log("status text", this.statusText);
    console.log("status code", this.status);
    console.log(results);


    results.forEach(function(result) {
        var option = document.createElement("option");
        option.value = result.show.id
        option.innerText = result.show.name;
        document.querySelector("#show-select").appendChild(option)
});
}

window.onload = function(){
    document.body.querySelector("button").addEventListener("click", doRequest);
}

