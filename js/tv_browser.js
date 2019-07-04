// API Docs at:
// http://www.tvmaze.com/api

var btn = document.getElementById("searchBtn");
var showDetail = document.getElementById("show-detail")

btn.addEventListener('click', function(){

    var showRequest = new XMLHttpRequest();
    showRequest.open('GET', 'http://api.tvmaze.com/search/shows?q=girls');

    showRequest.onload = function(){
        var tvShowsData = JSON.parse(showRequest.responseText);
        console.log(tvShowsData);
        showHTML(tvShowsData);
    }
    showRequest.send();
});

var showHTML = function(data){

    var showInfo = "";


}

// document.querySelector('#input').addEventListener('change', function(event){
//         var currentInput = event.target.value;

//         checkUserInput(currentInput);
// });