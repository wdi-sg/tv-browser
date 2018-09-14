// API Docs at:
// http://www.tvmaze.com/api

// window.onload = function () {

var body = document.body;
var selector = document.querySelector("#show-select");
var input = document.querySelector('input');
var submitButton = document.querySelector('button');
var details = document.querySelector("#show-detail");
var response;

function responseHandler() {

    // console.log("response text", this.responseText);
    // console.log("status text", this.statusText);
    // console.log("status code", this.status);
    response = JSON.parse( this.responseText );
    console.log(response);
};


function requestFailed() {
    console.log("response text", this.responseText);
    console.log("status text", this.statusText);
    console.log("status code", this.status);
};


function repopulateSelector() {

    selector[0].textContent = `Shows matching "${input.value}"...`;

    while (selector.length > 1) {
        selector.removeChild(document.querySelectorAll("#show-select option:not(:first-child)")[0]);
    };

    for (i in response) {
        var newOption = document.createElement("option");
        newOption.id = response[i].show.id;
        newOption.textContent = response[i].show.name;
        selector.appendChild(newOption);
    };
};


function doSubmit() {

    var url = `http://api.tvmaze.com/search/shows?q=${input.value}`;

    selector.style.visibility = "visible";

    console.log(url);

    var request = new XMLHttpRequest();
    request.addEventListener ('load', responseHandler);
    request.addEventListener ('load', repopulateSelector);
    request.addEventListener("error", requestFailed);

    request.open("GET", url);
    request.send();
};


function doSubmitIndiv() {

    var num = selector.selectedIndex;
    var showId = selector[num].id;

    var url = `http://api.tvmaze.com/shows/${showId}`;

    console.log(url);

    var request = new XMLHttpRequest();
    request.addEventListener("load", responseHandler);
    request.addEventListener("load", function() {

        details.innerHTML = "";

        var newH2 = document.createElement("h2");
        newH2.textContent = response.name;
        details.appendChild(newH2);

        var newImg = document.createElement("img");
        if (response.image) {
            newImg.src = response.image.medium};
        details.appendChild(newImg);

        details.insertAdjacentHTML('beforeend', response.summary);

    });

    request.addEventListener("error", requestFailed);

    request.open("GET", url);
    request.send();
};


submitButton.addEventListener('click', doSubmit);

selector.addEventListener('change', doSubmitIndiv);


// };