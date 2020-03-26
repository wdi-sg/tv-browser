// API Docs at:
// http://www.tvmaze.com/api

// make a new request
var request = new XMLHttpRequest();
var showDetail = document.querySelector('#show-detail');
var showSelect = document.querySelector('#show-select');

var createliTag = function(movieDataArray){
    var optionMovieName = document.createElement('option');
    optionMovieName.setAttribute('value', movieDataArray.show.name);
    optionMovieName.innerText = movieDataArray.show.name;
    showSelect.appendChild(optionMovieName);

    var olTag = document.createElement('ol');
    olTag.setAttribute('id', 'movie-name');
    olTag.innerText = movieDataArray.show.name;

    var liTag = document.createElement('li');
    liTag.innerText = "Type: " +movieDataArray.show.type;
    olTag.appendChild(liTag);

    liTag = document.createElement('li');
    liTag.innerText = "Language: " +movieDataArray.show.language;
    olTag.appendChild(liTag);

    liTag = document.createElement('li');
    liTag.innerText = "Rating: " +movieDataArray.show.rating.average;
    olTag.appendChild(liTag);

    liTag = document.createElement('li');
    liTag.innerHTML = "Summary: " +movieDataArray.show.summary;
    olTag.appendChild(liTag);

    showDetail.appendChild(olTag);
};

//function to loop and show results in the DOM.
var loadMovieInfo = function(movieDataObj) {
    showDetail.innerHTML = "";

    for(var i=0; i<movieDataObj.length; i++) {
        var movieDataArray = movieDataObj[i];

        createliTag(movieDataArray);
    };
};
//#show-detail

var responseHandler = function() {
  // console.log("response text", this.responseText);
  var response = JSON.parse( this.responseText );
  console.log( response );
  console.log("Movie name: "+response[0].show.name+" type: "+response[0].show.type);
  loadMovieInfo(response);

  console.log("status text", this.statusText);
  console.log("status code", this.status);
};

var requestFailed = function(){
  console.log("response text", this.responseText);
  console.log("status text", this.statusText);
  console.log("status code", this.status);
};

var doSubmit = function(event){
    var input = document.querySelector('#show-search');
    var endPoint = input.value;
    var url = "http://api.tvmaze.com/search/shows?q="+endPoint;
    input.value = "";
    request.open("GET", url);
    request.send();
};

document.querySelector('button').addEventListener('click', doSubmit);

// listen for the request response
request.addEventListener("load", responseHandler);

request.addEventListener("error", requestFailed);