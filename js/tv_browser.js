// API Docs at:
// http://www.tvmaze.com/api

var responseToDom = {};
var testingForid;
var testingForIdSearch = {};
var forImage;

// get id of options selected and store in variable
    function showOptions(s) {
    testingForid = (s[s.selectedIndex].id);
    };

window.onload = function() {

    function responseFailed() {
        console.log("response text", this.responseText);
        console.log("status text", this.statusText);
        console.log("status code", this.status);
    };

    function responseHandler(event) {
        clearResponseHandler();
        responseToDom = JSON.parse(this.responseText);
        var showNameResult = [];
        for (key in responseToDom) {
            showNameResult.push(responseToDom[key].show.name);
            var option = document.createElement('option');
            option.innerText = showNameResult[key];
            option.setAttribute("id", `${responseToDom[key].show.id}`)
            var getSelect = document.querySelector("#show-select");
            getSelect.appendChild(option);
        };
    };

    function clearResponseHandler(event) {
        var checkSelect = document.querySelector("#show-select");
        var checkOption = document.querySelectorAll("option");
        if (checkOption.length > 1) {
            for (i=1; i<checkOption.length; i++) {
                checkSelect.removeChild(checkOption[i]);
            };
        };
    };

    function clearDetails(event) {
        var checkDiv = document.querySelector("#show-detail");
        if (checkDiv.childNodes.length) {
        document.querySelector("#show-detail").removeChild(checkDiv.firstChild);
        };
    };

    function showDetails(event) {
        clearDetails();
        testingForIdSearch = JSON.parse(this.responseText);
        var tempObject = JSON.parse(this.responseText);
        var showInfo = document.createElement('main')
        showInfo.innerHTML = `<h1>${tempObject.name}</h1>
                              <img src=${tempObject.image.medium}></img>
                              <br>
                              ${tempObject.summary}`
        document.querySelector("#show-detail").appendChild(showInfo);
    };

    function requestDetails(event) {
        var showSelect = document.querySelector("#show-select");
        var request = new XMLHttpRequest();
        request.addEventListener("load", showDetails);
        request.addEventListener("error", responseFailed);
        request.open("GET", `http://api.tvmaze.com/shows/${testingForid}`)
        request.send();
    };

    function doSubmit(event) {
        var input = document.querySelector("#show-search");
        var url = input.value;

        var request = new XMLHttpRequest();
        request.addEventListener("load", responseHandler);
        request.addEventListener("error", responseFailed);
        request.open("GET", "http://api.tvmaze.com/search/shows?q="+url);
        request.send();
    };
document.querySelector("#submitButton").addEventListener("click", doSubmit);
document.querySelector("#show-select").addEventListener("change", requestDetails);

//testing if my theory is right, I should get an object in this variable
//responseToDom;
};