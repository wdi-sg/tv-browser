// API Docs at:http://api.tvmaze.com/search/shows?q=girls
// http://www.tvmaze.com/api

var btn = document.getElementById("btn");

btn.addEventListener('click', function() {
   ar userRequest = new XMLHttpRequest();
userRequest.open('GET', 'http://api.tvmaze.com/search/shows?q=girls');
userRequest.onload = function() {
    var userInfo = JSON.parse(userRequest.responseText);
    console.log(userInfo[0]);
};
userRequest.send();
})