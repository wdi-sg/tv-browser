// API Docs at:
// http://www.tvmaze.com/api

//fuzzy search api endpoint: http://api.tvmaze.com/search/shows?q=girls
var pattern = "";

displayShowInfo = function (showName, showImgSrc) {
  if (document.querySelector("#show-title") === null) {
    showDetails = document.querySelector("#show-detail");

    var showTitle = document.createElement("h2");
    showTitle.innerText = showName;
    showTitle.id = "show-title";
    var showPoster = document.createElement("img");
    showPoster.src = showImgSrc;
    showPoster.id = "show-poster";
    showDetails.appendChild(showTitle);
    showDetails.appendChild(showPoster);
  } else {
    console.log("here");
    var oldShowTitle = document.querySelector("#show-title");
    oldShowTitle.parentElement.removeChild(oldShowTitle);
    var oldShowPoster = document.querySelector("#show-poster");
    oldShowPoster.parentElement.removeChild(oldShowPoster);

    displayShowInfo(showName, showImgSrc);
  }
}

var parseShowInfo = function () {
  var response = JSON.parse(this.responseText);
  var showName = response.name;
  var showImgSrc = (response.image === null) ? "images/204.jpeg" : response.image.medium;

  displayShowInfo(showName, showImgSrc);
}

var fetchShowInfo = function () {
  var showId = this.value;
  var url = "http://api.tvmaze.com/shows/" + showId;

  var request = new XMLHttpRequest;
  request.addEventListener("load", parseShowInfo);
  request.addEventListener("error", handleError);
  request.open("GET", url);
  request.send();
}

var displayShowList = function (shows) {
  var dropDown = document.querySelector("#show-select");
  var selectTop = document.querySelector("option");
  selectTop.innerText = `Shows matching "${pattern}"...`;

  for (var i = 0; i < shows.length; i++) {
    var optionItem = document.createElement("option");
    optionItem.value = shows[i].id;
    optionItem.innerText = shows[i].name;
    dropDown.appendChild(optionItem);
  }
  dropDown.style.visibility = "visible";
  dropDown.addEventListener("change", fetchShowInfo);
}

var buildShowList = function (searchResp) {
  var showList = [];
  // searchResp is array of len-2 obj, with obj.score and obj.show
  for (var i = 0; i < searchResp.length; i++) {
    showList[i] = {};
    showList[i].name = searchResp[i].show.name;
    showList[i].id = searchResp[i].show.id;
  }
  displayShowList(showList);
}

var parseShowSearch = function () {
  var responseText = this.responseText;
  var searchResults = JSON.parse(responseText);
  buildShowList(searchResults);
}

var handleError = function () {
  console.log("error: ", this.responseText)
  console.log("status text: ", this.statusText);
  console.log("error code: ", this.status);
}

var fetchSearchResults = function () {
  var searchStr = document.querySelector("#show-search").value;
  pattern = searchStr;
  searchStr = searchStr.replace(" ", "+");
  var param = `?q=${searchStr}`;

  var url = "http://api.tvmaze.com/search/shows" + param;

  var request = new XMLHttpRequest;
  request.addEventListener("load", parseShowSearch);
  request.addEventListener("error", handleError);
  request.open("GET", url);
  request.send();
}

var setup = function () {
  var submitButton = document.querySelector("button");
  submitButton.addEventListener("click", fetchSearchResults);
  var select = document.querySelector("#show-select");
  select.style.visibility = "hidden";
}

setup();
