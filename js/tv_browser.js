var responseHandler = function() {
   console.log("response text", this.responseText);
   var response = JSON.parse(this.responseText);
   for (i = 0; i < response.length; i++) {
        var optionTag = document.createElement("option");
        optionTag.innerHTML = response[i].show.name;
        var selectTag = document.getElementById("show-select");
        selectTag.appendChild(optionTag);
}
};

var doSubmit = function(event) {
    var input = document.querySelector("#showSearch");
    var showSearch = input.value;

    var request = new XMLHttpRequest();
    request.addEventListener("load", responseHandler);
    request.open("GET", "http://api.tvmaze.com/search/shows?q=" + showSearch);
    request.send();
};

document.querySelector('#submit').addEventListener('click', doSubmit);