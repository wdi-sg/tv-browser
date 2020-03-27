// API Docs at:
// http://www.tvmaze.com/api

// make a new request
var request = new XMLHttpRequest();
var showDetail = document.querySelector('#show-detail');
var showSelect = document.querySelector('#show-select');
var optionSelect = document.querySelectorAll('option');
var option = document.querySelector('option');
var optionList = document.querySelector('li');

var resetOption = function(){
    while (showSelect.childNodes.length > 1) {
        showSelect.removeChild(showSelect.lastChild);
    }
}

var createList = function(movieDataArray){
    var ulTag = document.createElement('ul');
    ulTag.setAttribute('id', 'movie-name');
    ulTag.innerText = movieDataArray.show.name;

    var liTag = document.createElement('li');
    liTag.innerText = "Type: " +movieDataArray.show.type;
    ulTag.appendChild(liTag);

    liTag = document.createElement('li');
    liTag.innerText = "Language: " +movieDataArray.show.language;
    ulTag.appendChild(liTag);

    liTag = document.createElement('li');
    liTag.innerText = "Rating: " +movieDataArray.show.rating.average;
    ulTag.appendChild(liTag);

    liTag = document.createElement('li');
    liTag.innerHTML = "Summary: " +movieDataArray.show.summary;
    ulTag.appendChild(liTag);

    showDetail.appendChild(ulTag);
};

var createOption = function(movieDataArray){
    var optionMovieName = document.createElement('option');
    optionMovieName.setAttribute('value', movieDataArray.show.name);
    optionMovieName.innerText = movieDataArray.show.name;
    showSelect.appendChild(optionMovieName);
}

//function to loop and show results in the DOM.
var loadMovieInfo = function(movieDataObj) {
    showDetail.innerText= "";
    // resetOption();
    for(var i=0; i<movieDataObj.length; i++) {
        var movieDataArray = movieDataObj[i];
        createList(movieDataArray);
        createOption(movieDataArray);
    };
};

var responseHandler = function() {
  // console.log("response text", this.responseText);
  var response = JSON.parse( this.responseText );
  console.log( response );
  console.log("Movie name: "+response[0].show.name+" type: "+response[0].show.type);
  //reset option list when new name searched.
  resetOption();
  loadMovieInfo(response);

  var matchMovieName = false;
  var selectHandler = function() {
    this.setAttribute('selected', 'selected');
    for(var i=0; i<showSelect.length; i++) {
        for(var j=0; j<response.length; j++)
            if(matchMovieName === false) {
                if(showSelect[i].value === response[j].show.name){
                    matchMovieName = true;
                    showDetail.innerText = "";
                    createList(response[j]);
                } else {
                    matchMovieName = false;
                };
            };
        };

    };

    for (var i = 0; i < showSelect.length; i++){
        userSelect = showSelect[i].addEventListener('click', selectHandler);
    };


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