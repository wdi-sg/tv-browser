// API Docs at:
// http://www.tvmaze.com/api
window.onload = function() {

    function responseFailed() {
        console.log("response text", this.responseText);
        console.log("status text", this.statusText);
        console.log("status code", this.status);
    }

    function responseHandler(event) {
        var getObject = JSON.parse(this.responseText);
        var showNameResult = [];

        for (key in getObject) {
            showNameResult.push(getObject[key].show.name);
            var option = document.createElement('option');
            option.innerText = showNameResult[key];
            var getSelect = document.querySelector("#show-select");
            getSelect.appendChild(option);
        };

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
};