//
var doSubmit = function(event) {
    var input = document.querySelector('#show-search');
    var url = input.value;
    var request = new XMLHttpRequest();
    request.addEventListener("load", responseHandler);
    request.open("GET", "http://api.tvmaze.com/search/shows?q=" + url);
    request.send();
};

document.getElementById('show-search').addEventListener('keypress', function() {
        if (event.keyCode === 13) {
            doSubmit();
}});
document.querySelector('button').addEventListener('click', doSubmit);

var displayBox = document.getElementById('show-detail');
var selector = document.getElementById('show-select');
var globalResponseObject;

// handles response from AJAX
var responseHandler = function() {
// While the selector has options from previous searches, it will clear all the options and then re-add the "Select a show..." option
    while (selector.firstChild) {
        selector.removeChild(selector.firstChild)
    }
    var selectShowOption = document.createElement('option');
    selectShowOption.textContent = "Select a show...";
    selector.appendChild(selectShowOption);

// takes in the 'string' response from AJAX call and changes to object
    var responseObject = JSON.parse(this.responseText);
    globalResponseObject = responseObject
    console.log(responseObject);

// displays the 'string' version of response to display box
    displayBox.textContent = this.responseText;

// adds selector options to the selector
    for (var i = 0; i < responseObject.length; i++) {
        // var showName = responseObject[i].show.name;
        var option = document.createElement('option');
        option.innerHTML = responseObject[i].show.name;
        option.setAttribute('class', [i])
        selector.appendChild(option);
}
}

// attaches an event listener to the selector, prints out page of the option clicked
selector.addEventListener('change', optionClicked)

function optionClicked() {

    var optionNumber = selector.options.selectedIndex;
    console.log("SOMETHING IS SELECTED!");
    optionNumber = optionNumber - 1;
    var name = globalResponseObject[optionNumber].show.name;
    var image = globalResponseObject[optionNumber].show.image.medium;
    var summary = globalResponseObject[optionNumber].show.summary;
    console.log(`${name}, ${image}, ${summary}`)
    displayBox.textContent = "";
    var title = document.createElement('h1');
    var img = document.createElement('img');
    var summ = document.createElement('p');
    title.textContent = name;
    img.setAttribute('src', image);
    summ.innerHTML = summary;
    displayBox.appendChild(title);
    displayBox.appendChild(img);
    displayBox.appendChild(summ);


}