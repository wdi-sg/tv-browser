// API Docs at:
// http://www.tvmaze.com/api
var responseObjectArray = [];
var showArray = [];
 var responseHandler = function() {
  // console.log("response text", this.responseText);
  // console.log("status text", this.statusText);
  // console.log("status code", this.status);
  responseObjectArray = JSON.parse(this.responseText);
  console.log(responseObjectArray);
  responseObjectArray.forEach( function(element) {
      var showName = element.show.name;
      console.log(showName)
      showArray.push(showName);
  })
  console.log(showArray);
  listShows(showArray);


};

// make a new request
var request = new XMLHttpRequest();

// listen for the request response
request.addEventListener("load", responseHandler);

// ready the system by calling open, and specifying the url

var url = "http://api.tvmaze.com/search/shows?q=";
var inputBox = document.getElementById("show-search")
var submitBtn = document.getElementsByTagName("button")[0];
var value = inputBox.value;
var submitAction = function(){
    value = inputBox.value;
    inputBox.value = "";
    value = value.toLowerCase();
    url+= value;
    request.open("GET", url);

// send the request
request.send();

}
submitBtn.addEventListener('click', submitAction);
function listShows(showArray){
    var list = document.createElement("ul");
    showArray.forEach( function(element) {
        var listItem = document.createElement("li");
        listItem.innerText = element;
        list.appendChild(listItem);
    })
    document.getElementById("search-form").appendChild(list);
}