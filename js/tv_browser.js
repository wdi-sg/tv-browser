var results
const tvMazeWebsite= "http://api.tvmaze.com/"

var parsedSummary

window.onload = function(){
    document.body.querySelector("button").addEventListener("click", searchShow);
    document.body.querySelector("select").addEventListener("change", function(){
        AJAXRequest(this.value, "singlesearch")
    })
    document.body.querySelector("input").addEventListener("keydown", function(keyboardChar){
        if (keyboardChar.keyCode === 13){
            searchShow();
        }
    })
}

function searchShow(){
    let searchText = document.body.querySelector("#show-search").value
    AJAXRequest(searchText, "search")
}

function AJAXRequest(searchText, searchType){
    let request = new XMLHttpRequest();
    // listen for the request response
    if (searchType === "search"){
        request.addEventListener("load", responseHandler);
        // ready the system by calling open, and specifying the url
    } else if (searchType === "singlesearch"){
        request.addEventListener("load", responseHandlerTwo)
    }
    request.open("GET", tvMazeWebsite + searchType + "/shows?q=" + searchText);
    // send the request
    request.send();
}

var responseHandler = function() {
    // console.log(poopText)
    results = JSON.parse(this.responseText);
    console.log("status text", this.statusText);
    console.log("status code", this.status);
    processResults(results)
};

var responseHandlerTwo = function() {
    // console.log(poopText)
    results = JSON.parse(this.responseText);
    console.log("status text", this.statusText);
    console.log("status code", this.status);
    processResultsTwo(results)
};

function processResultsTwo(resultJSON){
    let div = document.createElement("div")
    let img = document.createElement("img")
    let h2 = document.createElement("h2")
    let template = document.createElement('template');


    img.src = resultJSON.image.medium
    h2.innerText = resultJSON.name
    let summary = resultJSON.summary.trim()
    template.innerHTML = summary

    div.appendChild(h2)
    div.appendChild(img)
    div.appendChild(template.content.firstChild)

    document.body.querySelector("main").appendChild(div)
}

function processResults(resultJSON){
    for (let result of resultJSON){
        let option = document.createElement("option")
        option.value = result.show.name
        option.innerText = result.show.name;
        document.body.querySelector("#show-select").appendChild(option)
    }
}

