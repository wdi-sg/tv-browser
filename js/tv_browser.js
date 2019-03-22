
var url = 'http://api.tvmaze.com/singlesearch/shows?q=';
var userInput = prompt("what you want");
var url = url + userInput;

console.log(url);

var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', url)
ourRequest.onload = function() {
    var ourData = JSON.parse(ourRequest.responseText);

console.log(ourData.summary);
}
ourRequest.send();


// http://api.tvmaze.com/singlesearch/shows?q=girls