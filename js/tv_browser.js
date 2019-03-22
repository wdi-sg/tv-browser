// API Docs at:
// http://www.tvmaze.com/api

var response;

var renderSelected = function(){
    var selected = document.getElementById("show-select").value;
    console.log(selected);
    var indexSelected;
    for(var i=0; i<document.getElementsByTagName("option").length; i++){
        if(document.getElementsByTagName("option")[i].innerHTML===selected) {
            indexSelected = i-1;
        }
    }
    var showName = document.createElement("h2");
    showName.innerHTML = response[indexSelected].show.name;
    document.getElementById("show-detail").appendChild(showName);

    var showPic = document.createElement("img");
    showPic.src = response[indexSelected].show.image.medium;
    document.getElementById("show-detail").appendChild(showPic);

    var showSynop = document.createElement("div");
    showSynop.innerHTML = response[indexSelected].show.summary;
    document.getElementById("show-detail").appendChild(showSynop);
}

var responseHandler = function() {
    console.log("response text", this.responseText);
    response = JSON.parse( this.responseText );
    for (var i=0; i<response.length; i++){
        console.log(response[i]);
        var newOption = document.createElement("option");
        newOption.value = response[i].show.name;
        newOption.innerHTML = response[i].show.name;
        document.getElementById("show-select").appendChild(newOption);
    }
}

var doSubmit = function (event) {
    var userInput = document.querySelector("#searchInput").value;
    var url = "http://api.tvmaze.com/search/shows?q=" + userInput;
    var request = new XMLHttpRequest();
    request.addEventListener("load", responseHandler);
    request.open("GET", url);
    request.send();
}

document.querySelector("#submit").addEventListener("click",doSubmit);
document.getElementById("show-select").addEventListener("change", renderSelected);