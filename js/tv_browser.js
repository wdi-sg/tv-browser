function clearOffChildElements (selector) {
    let elements = document.querySelector(selector).childNodes;

    for (let i = elements.length - 1; i >= 0; i--) {
        elements[i].remove();
    }
}

function searchButtonEvent (event) {
    let request = new XMLHttpRequest();

    let userInput = document.querySelector("#search-form > input").value;
    let url = baseUrl + query + userInput;

    // clear off the previous option when user attempt to search again
    clearOffChildElements("#show-select");

    request.open("GET", url);

    request.addEventListener("load", function () {
        let shows = JSON.parse(this.responseText);

        let selectElement = document.querySelector("#show-select");
        selectElement.addEventListener("change", selectOptionEvent);

        for (let i = 0; i < shows.length; i++) {
            let optionElement = document.createElement("option");

            optionElement.value = shows[i]["show"]["id"];
            optionElement.innerHTML = shows[i]["show"]["name"];

            selectElement.appendChild(optionElement);
        }
    });

    request.send();
}

function selectOptionEvent (event) {
    let request = new XMLHttpRequest();
    let url = baseUrl + idQuery + this.value;

    // clear off the previous option when user attempt to search again
    clearOffChildElements("#show-detail");

    request.open("GET", url);

    request.addEventListener("load", function () {
        var show = JSON.parse(this.responseText);

        let contentElement = document.querySelector("#show-detail");

        let headerElement = document.createElement("h2");
        headerElement.innerHTML = show["name"];
        contentElement.appendChild(headerElement);

        let imgElement = document.createElement("img");
        imgElement.setAttribute("src", show["image"]["medium"]);
        contentElement.appendChild(imgElement);

        let paraElement = document.createElement("p");
        paraElement.innerHTML = show["summary"];
        contentElement.appendChild(paraElement);
    });

    request.send();
}

let query = "/search/shows?q=";
let idQuery = "/shows/";
let baseUrl = "http://api.tvmaze.com";

document.querySelector("#search-form > button").addEventListener("click", searchButtonEvent);
document.querySelector("#show-select").addEventListener("change", selectOptionEvent);