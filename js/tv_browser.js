// API Docs at:
// http://www.tvmaze.com/api
window.onload = function(){
    document.getElementById("button-submit").addEventLister("click", function() {
        var query = document.getElementById("show-search").value;
        document.getElementById("show-search").value = "";

        pullReq(query);
      });

    document.getElementById("show-select").addEventListener("change", function() {
        var query = this.value;

        pullReqSearchOne(query);
      });
}

var pullReq = function(query) {
  var req = new XMLHttpRequest();

  req.addEventListener("load", searchHandler);
  req.open("GET", "http://api.tvmaze.com/search/shows?q=" + query);
  req.send();
};

var pullReqSearchOne = function(query) {
  var request = new XMLHttpRequest();

  request.addEventListener("load", searchHandlerOne);
  request.open("GET", "http://api.tvmaze.com/singlesearch/shows?q=" + query);
  request.send();
};

var searchHandler = function(query) {
  var searchObjectArray = JSON.parse(this.responseText);
  for (var i = 0; i < searchObjectArray.length; i++) {
    var newSelect = document.createElement("option");
    newSelect.value = searchObjectArray[i].show.name;
    newSelect.innerText = searchObjectArray[i].show.name;

    document.getElementById("show-select").appendChild(newSelect);
  }
  console.log(searchHistory);
  displaySelectOption();
  console.log(searchObjectArray);
};

var searchHandlerOne = function() {
  var singleSearchObject = JSON.parse(this.responseText);

  displayShowDetails(singleSearchObject);

  console.log(singleSearchObject);
};