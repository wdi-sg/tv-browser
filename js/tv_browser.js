// API Docs at:
// http://www.tvmaze.com/api

var responseHandler = function() {
    var response = JSON.parse(this.responseText);

    var responseArray = [];
    for (let key in response) {
        var result = response[key].show.name;
        responseArray.push(result);
    }

    var showSelect = document.querySelector('#show-select');

    for (var i = 0; i < responseArray.length; i++) {
        var newOption = document.createElement('option');
        newOption.innerText = responseArray[i];
        showSelect.appendChild(newOption);
    }
};

var showRequest = new XMLHttpRequest();

showRequest.addEventListener("load", responseHandler);

var submitInput = function () {
    var input = document.querySelector('#show-search');
    var userInput = input.value;
    var api = "http://api.tvmaze.com/search/shows?q=" + userInput;
    showRequest.open("GET", api);
    showRequest.send();
}

document.querySelector('button').addEventListener('click', submitInput);

//Attach an event listener to the select. When the user selects an option make another AJAX call. Use the response of that AJAX call to render the individual show they requested

var selectHandler = function () {
    var chosenShowResponse = JSON.parse(this.responseText);
    var chosenShowArray = [];
    for (let key in chosenShowResponse) {
        var chosenShowResult = `Name: ${chosenShowResponse[key].show.name} \n Runtime: ${chosenShowResponse[key].show.runtime} \n Summary: ${chosenShowResponse[key].show.summary}`;
        chosenShowArray.push(chosenShowResult);
    }

    var showDetail = document.querySelector('#show-detail');

    for (var j = 0; j < chosenShowArray.length; j++) {
        var newP = document.createElement('p');
        newP.innerText = chosenShowArray[j];
        showDetail.appendChild(newP);
    }
}

var chooseShow = function () {
    var chosenShow = event.target.value;
    var apiChosenShow = "http://api.tvmaze.com/search/shows?q=" + (chosenShow.split(' ').join('+'));
    showRequest.open("GET", apiChosenShow);
    showRequest.send();
    showRequest.addEventListener("load", selectHandler);
}

document.querySelector('#show-select').addEventListener('mouseleave', chooseShow);