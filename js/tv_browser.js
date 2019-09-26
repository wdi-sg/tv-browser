// API Docs at:http://api.tvmaze.com/search/shows?q=girls
// http://www.tvmaze.com/api
var showContainer = document.getElementById("show-detail");
var btn = document.getElementById("btn");

btn.addEventListener('click', function() {
   var userRequest = new XMLHttpRequest();
userRequest.open('GET', 'http://api.tvmaze.com/search/shows?q=girls');
userRequest.onload = function() {
    var userInfo = JSON.parse(userRequest.responseText);
    renderHTML(userInfo)
};
userRequest.send();
})

function renderHTML(data) {

    var htmlString = "";

    for(i=0; i < data.length; i++)
        htmlString += "<p>" + data[i].show.name + " will be screened in " + data[i].show.language + " with a runtime of " + data[i].show.runtime + " min.</p>";
    showContainer.insertAdjacentHTML('beforeend', htmlString);

}