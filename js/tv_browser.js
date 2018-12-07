// API Docs at:
// http://www.tvmaze.com/api
// http://api.tvmaze.com/search/shows?q=

let search = document.getElementById('show-search').value;
let submit = document.getElementById("submit");
let showSelect = document.getElementById("show-select");
let showDetail = document.getElementById("show-detail");
let searchReturnList = {};
let searchList = [];
let showId = 0;

function prepareShowList() {

    // showSelect.innerHTML = "";

    for (var i = 0; i < searchReturnList.length; i++) {
        var id = searchReturnList[i].show.id;
        var showName = searchReturnList[i].show.name;

        var selectItem = document.createElement('option');
        selectItem.value = i + "-" + id;
        selectItem.textContent = showName;

        showSelect.insertAdjacentElement('beforeend', selectItem)
    }
}

function selectShow(e) {



    let i = showSelect.selectedIndex;
    selectedValue = showSelect[i].value.split("-");

    recordId = parseInt(selectedValue[0]);
    showId = parseInt(selectedValue[1]);

    showDetail.innerHTML = "";
    let showName = document.createElement('h1');
    showName.textContent = searchReturnList[recordId].show.name;
    // showName.class = "float-left";
    showDetail.insertAdjacentElement("beforeend", showName);

    let showSummary = document.createElement("div");
    let showImageUrl = searchReturnList[recordId].show.image;
    showSummary.innerHTML = searchReturnList[recordId].show.summary;

    if (showImageUrl !== null) {

        let showImageUrl = searchReturnList[recordId].show.image.medium;
        let img = document.createElement("img");
        img.src = showImageUrl;
        // img.className = "float-left";
        showDetail.insertAdjacentElement("beforeend", img);
        // showSummary.className = "float-right";
    }

    showDetail.insertAdjacentElement("beforeend", showSummary);





    console.log("i waz ere");
}

function processResults() {

    showDetail.innerHTML = "";

    prepareShowList();

    // showSelect.addEventListener('onchange', selectShow);

}

function processRequest() {


    let search = document.getElementById('show-search').value;

    var responseHandler = function () {

        if (this.status = 200) {
            searchReturnList = JSON.parse(this.responseText);
        } else {
            alert("Nothing found : " + this.statusText)
        }

        processResults();
    };

    // make a new request
    var request = new XMLHttpRequest();

    // listen for the request response
    request.addEventListener("load", responseHandler);

    // ready the system by calling open, and specifying the url
    request.open("GET", "http://api.tvmaze.com/search/shows?q=" + search);

    // send the request
    request.send();
}

submit.addEventListener('click', processRequest);