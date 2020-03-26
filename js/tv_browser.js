// API Docs at:
// http://www.tvmaze.com/api


// var url = "http://api.tvmaze.com/search/shows?q=";
var objectStore;
var showStore;
var tvdbStore;
var responseHandler = function() {
    var responseObjectArray = [];
    var showArray = [];
    var tvdbArray = [];
    // console.log("response text", this.responseText);
    // console.log("status text", this.statusText);
    // console.log("status code", this.status);
    responseObjectArray = JSON.parse(this.responseText);
    objectStore = responseObjectArray;
    console.log(responseObjectArray);
    responseObjectArray.forEach(function(element) {
        var tvdb = element.show.externals.thetvdb;
        var showName = element.show.name;
        console.log(`${showName}, ${tvdb}`)

        showArray.push(showName);

        tvdbArray.push(tvdb);
    })
    console.log(showArray);
    console.log(tvdbArray);
    showArray = showArray;
    tvdbStore  = tvdbArray;
    // clearPrev();
    // listShows(showArray);
    addShowOptions(showArray);
    // url = "http://api.tvmaze.com/search/shows?q=";


};

// make a new request
var request = new XMLHttpRequest();
// listen for the request response
request.addEventListener("load", responseHandler);
// ready the system by calling open, and specifying the url


var inputBox = document.getElementById("show-search")
var submitBtn = document.getElementsByTagName("button")[0];
var value = inputBox.value;
var submitAction = function() {
    value = inputBox.value;
    inputBox.value = "";
    value = value.toLowerCase();
    url = "http://api.tvmaze.com/search/shows?q=" + value;
    request.open("GET", url);

    // send the request
    request.send();

}
submitBtn.addEventListener('click', submitAction);

function listShows(showArray) {
    var list = document.createElement("ul");
    showArray.forEach(function(element) {
        var listItem = document.createElement("li");
        listItem.innerText = element;
        list.appendChild(listItem);
    })
    document.getElementById("search-form").appendChild(list);
}

function clearPrev() {
    var form = document.getElementById("search-form");
    if (form.lastChild.tagName == "UL"){
      var prevList = form.getElementsByTagName("ul")[0];
    document.getElementById("search-form").removeChild(prevList)
    }

}

function addShowOptions(showArray) {
    clearPrevOptions();
    showArray.forEach(function(element,index) {
        var selector = document.getElementById("show-select");
        var option = document.createElement("option");
        option.innerHTML=element;
        option.id=index;
        selector.appendChild(option)
    })
}

function clearPrevOptions() {
        var selector = document.getElementById("show-select");
        selector.innerHTML = "";
        var option = document.createElement("option");
        option.innerHTML="Select a show...";
        selector.appendChild(option)
    }
var selector = document.getElementById("show-select");
selector.addEventListener("change", function(){
    var id = this.options[this.selectedIndex].id;
    console.log(id)
    var tvdb = getTVDB(id);
    console.log(tvdb)
    var url2 =  "http://api.tvmaze.com/lookup/shows?thetvdb="+tvdb;
    var request2 = new XMLHttpRequest();
    console.log(url2)
    request2.open("GET", url2);
    // send the request
    request2.send();


var responseHandler2 = function() {
    var responseObjectArray = [];

    responseObjectArray = JSON.parse(this.responseText);
    console.log(responseObjectArray);

}

// listen for the request response
request2.addEventListener("load", responseHandler2);

})
function getTVDB (id){
    console.log(id)
    var show = objectStore[id];
    var tvdb = tvdbStore[id];
    console.log(show);
    return tvdb;}