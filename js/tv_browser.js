// API Docs at:
// http://www.tvmaze.com/api

window.onload = function() {
    document.getElementById('submit-button').addEventListener('click',function(){
        var query=document.getElementById('show-search').value;
        document.getElementById('show-search').value='';
        pullRequestSearch(query);
    });

    document.getElementById('show-select').addEventListener('change',function(){
        var singleQuery = this.value;
        pullRequestSingleSearch(singleQuery);
    });
}

var searchHistory = '';

var displaySelectOption = function(){
    var select=document.getElementById('show-select');
    select.style.display = 'initial';
    select.children[0].innerText=`Shows Matching ${searchHistory}`;
}

var displayShowDetails = function(singleSearchObject){
    var showDetails = document.getElementById('show-detail')
    var showName = document.createElement('p');
    var showImage = document.createElement('img');
    var showCast = document.createElement('a');


    showName.innerText = singleSearchObject.name;
    showImage.src=singleSearchObject.image.medium;

    var showID=singleSearchObject.id;
    showCast.href="cast.html";
    showCast.innerText ='Cast';
    showCast.addEventListener('onclick',function(){
        pullRequestShowSearch(showID);
    });

    showDetails.appendChild(showImage);
    showDetails.appendChild(showName);
    showDetails.appendChild(showCast);
}

var responseSearchHandler = function(query){
    var searchObjectArray = JSON.parse(this.responseText);
    for (var i=0; i<searchObjectArray.length; i++){
        var newSelect = document.createElement('option');
        newSelect.value = searchObjectArray[i].show.name;
        newSelect.innerText = searchObjectArray[i].show.name;

        document.getElementById('show-select').appendChild(newSelect);
    }
    console.log(searchHistory);
    displaySelectOption();
    console.log(searchObjectArray);
}

var responseSingleSearchHandler = function(){
    var singleSearchObject = JSON.parse(this.responseText);

    displayShowDetails(singleSearchObject);

    console.log(singleSearchObject);
}


var pullRequestSearch = function(query){
    searchHistory = query;
    var request = new XMLHttpRequest();

    request.addEventListener('load',responseSearchHandler);
    request.open("GET",'http://api.tvmaze.com/search/shows?q='+query);
    request.send();
}

var pullRequestSingleSearch = function(singleQuery){
    var request = new XMLHttpRequest();

    request.addEventListener('load',responseSingleSearchHandler);
    request.open("GET",'http://api.tvmaze.com/singlesearch/shows?q='+ singleQuery);
    request.send();
}

var pullRequestShowSearch = function(id){
    var request = new XMLHttpRequest();

    request.addEventListener('load',responseCastSearchHandler)
    request.open("GET",'http://api.tvmaze.com//shows/'+id+'/cast');
    request.send();
}