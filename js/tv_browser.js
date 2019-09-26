var doSubmit = function(event) {
    var input = document.querySelector('#show-search');
    var url = input.value;
    var request = new XMLHttpRequest();
    request.addEventListener("load", responseHandler);
    request.open("GET", "http://api.tvmaze.com/search/shows?q=" + url);
    request.send();
};

document.querySelector('button').addEventListener('click', doSubmit);

var displayBox = document.getElementById('show-detail');
var selector = document.getElementById('show-select');
var optionsList = document.querySelectorAll('option')

var responseHandler = function() {
    while (selector.firstChild) {
        selector.removeChild(selector.firstChild)
    }
    var selectShowOption = document.createElement('option');
    selectShowOption.textContent = "Select a show...";
    selector.appendChild(selectShowOption);

    var responseObject = JSON.parse(this.responseText);
    console.log(responseObject);
    displayBox.textContent = this.responseText;
    var optionsList = document.querySelectorAll('option')

    for (var i = 0; i < responseObject.length; i++) {
        // var showName = responseObject[i].show.name;
        var option = document.createElement('option');
        option.innerHTML = responseObject[i].show.name;
        selector.appendChild(option);
}
}