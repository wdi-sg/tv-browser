// API Docs at:
// http://www.tvmaze.com/api

var displayHandler = function() {
    console.log("displayHandler");
    var response = JSON.parse(this.responseText);
    console.log("response", response);

    var card = document.createElement("div");

    var title = document.createElement("h1");
    title.innerHTML = response.name;

    var summary = document.createElement("div");
    summary.innerHTML = response.summary;

    var image = document.createElement("img");
    image.src = response.image.medium;

    card.appendChild(title);
    card.appendChild(image);
    card.appendChild(summary);
    // card.innerHTML = response.summary;


    document.querySelector("#show-detail").appendChild(card);

}


var display = function(event) {
    console.log("display!");
    // console.log("event: ", event);

    var searchTerm = event.target.value;

    var request = new XMLHttpRequest();
    request.addEventListener("load", displayHandler);
    request.open("GET", "http://api.tvmaze.com/singlesearch/shows?q="+searchTerm);
    request.send();
};

var responseHandler = function(response) {
    console.log("responseHandler");
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



var search = function(event) {
    console.log("search");
    var searchTerm = event.target.value;

    var request = new XMLHttpRequest();
    request.addEventListener("load", responseHandler);
    request.open("GET", "http://api.tvmaze.com/search/shows?q="+searchTerm);
    request.send();
};

document.querySelector("#show-search").addEventListener("search", search);
document.querySelector("#show-select").addEventListener("change", display);