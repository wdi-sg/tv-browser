
var url = 'http://api.tvmaze.com/singlesearch/shows?q=';
var userInput = prompt("what you want");
var url = url + userInput;

var showContainer = document.getElementById("show-detail");
var showName = document.createElement('h1');
var showImage = document.createElement('img');
var showSummary = document.createElement('p');

showContainer.appendChild(showName);
showContainer.appendChild(showImage);
showContainer.appendChild(showSummary);

console.log(url);

var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', url)
ourRequest.onload = function() {
    var ourData = JSON.parse(ourRequest.responseText);
    var name = ourData.name;
    var summary = ourData.summary;
    var image = ourData.image.medium;
    console.log(name);

    showName.innerHTML = name;
    showImage.setAttribute("src", image);
    showSummary.innerHTML = summary;
// showContainer.appendChild(showSummary);
}
ourRequest.send();


// http://api.tvmaze.com/singlesearch/shows?q=girls