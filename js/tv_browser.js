// API Docs at:http://api.tvmaze.com/search/shows?q=girls
// http://www.tvmaze.com/api
var userRequest = new XMLHttpRequest();
userRequest.open('GET', 'http://api.tvmaze.com/search/shows?q=girls');
userRequest.onload = function() {
    var userInfo = JSON.parse(userRequest.responseText);
    console.log(userInfo[0]);
};
userRequest.send();