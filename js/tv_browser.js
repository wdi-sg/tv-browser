// API Docs at:
// http://www.tvmaze.com/api

var results

window.onload = function(){
    document.body.querySelector("button").addEventListener("click", searchShow);
}

function searchShow(){
    let searchText = document.body.querySelector("#show-search").value
    let request = new XMLHttpRequest();
    // listen for the request response
    request.addEventListener("load", responseHandler);
    // ready the system by calling open, and specifying the url
    request.open("GET", "http://api.tvmaze.com/search/shows?q=" + searchText);
    // send the request
    request.send();
}

var responseHandler = function() {
    results = JSON.parse(this.responseText);
    console.log("status text", this.statusText);
    console.log("status code", this.status);
    processResults(results)
};

function processResults(resultJSON){
    for (let result of resultJSON){
        let option = document.createElement("option")
        option.value = result.show.id
        option.innerText = result.show.name;
        document.body.querySelector("#show-select").appendChild(option)
    }
}

