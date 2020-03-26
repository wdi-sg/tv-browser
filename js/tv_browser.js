// API Docs at:
// http://www.tvmaze.com/api

//fuzzy search api endpoint: http://api.tvmaze.com/search/shows?q=girls
var searchResults;
var pattern = "";

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

var parseResponse = function () {
  var responseText = this.responseText;
  searchResults = JSON.parse(responseText);
  buildShowList(searchResults);
}

var handleError = function () {
  console.log("error: ", this.responseText)
  console.log("status text: ", this.statusText);
  console.log("error code: ", this.status);
}

var submitSearch = function () {
  var searchStr = document.querySelector("#show-search").value;
  pattern = searchStr;
  searchStr = searchStr.replace(" ", "+");
  var param = `?q=${searchStr}`;

  var url = "http://api.tvmaze.com/search/shows" + param;

  var request = new XMLHttpRequest;
  request.addEventListener("load", parseResponse);
  request.addEventListener("error", handleError);
  request.open("GET", url);
  request.send();
}

var setup = function () {
  var submitButton = document.querySelector("button");
  submitButton.addEventListener("click", submitSearch);
  var select = document.querySelector("#show-select");
  select.style.visibility = "hidden";
}

setup();
