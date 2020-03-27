//Global Variables
var objectStore;
var showStore;
var tvIdStore;

hideSelector();

//For the first AJAX
var responseHandler = function() {
    var responseObjectArray = [];
    var showArray = [];
    var tvIdArray = [];

//Parse response output
    responseObjectArray = JSON.parse(this.responseText);
    objectStore = responseObjectArray;
    //console.log(responseObjectArray);

    //For each object in response, get show name and tvmaze id
    responseObjectArray.forEach(function(element) {
        var tvId = element.show.id;
        var showName = element.show.name;
        console.log(`${showName}, ${tvId}`)

        showArray.push(showName);
        tvIdArray.push(tvId);
    })
    // console.log(showArray);
    // console.log(tvIdArray);
    showArray = showArray;
    tvIdStore  = tvIdArray;
    addShowOptions(showArray);
    clearDetails();



};

// make a new request
var request = new XMLHttpRequest();
// listen for the request response
request.addEventListener("load", responseHandler);


// Add click function to submit button
var inputBox = document.getElementById("show-search")
var submitBtn = document.getElementsByTagName("button")[0];
var value;
var submitAction = function() {
    console.clear();
    value = inputBox.value;
    inputBox.value = "";
    value = value.toLowerCase();
    url = "http://api.tvmaze.com/search/shows?q=" + value;
    request.open("GET", url);

    // send the request
    request.send();
}
submitBtn.addEventListener('click', submitAction);

// Function for displaying shows in list (not used)

// function listShows(showArray) {
//     var list = document.createElement("ul");
//     showArray.forEach(function(element) {
//         var listItem = document.createElement("li");
//         listItem.innerText = element;
//         list.appendChild(listItem);
//     })
//     document.getElementById("search-form").appendChild(list);
// }

// function clearPrev() {
//     var form = document.getElementById("search-form");
//     if (form.lastChild.tagName == "UL"){
//       var prevList = form.getElementsByTagName("ul")[0];
//     document.getElementById("search-form").removeChild(prevList)
//     }

// }

// Updates option selector with list of shows
function addShowOptions(showArray) {
    clearPrevOptions();
    showSelector();
    selector.firstElementChild.innerText = `Shows matching \"${value}...\"`
    showArray.forEach(function(element,index) {
        var selector = document.getElementById("show-select");
        var option = document.createElement("option");
        option.innerHTML=element;
        option.id=index;
        selector.appendChild(option)
    })
}

// Removes previous list when new search is made
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
    // console.log(id)
    var tvId = getTvId(id);
    // console.log(tvId)
    var url2 =  "http://api.tvmaze.com/shows/"+tvId;
    var request2 = new XMLHttpRequest();
    console.log(url2)
    request2.open("GET", url2);
    // send the request
    request2.send();


// For AJAX call 2
var responseHandler2 = function() {
    var responseObjectArray;

    responseObjectArray = JSON.parse(this.responseText);
    console.log(responseObjectArray);
    showDetails(responseObjectArray);

}

// listen for the request response
request2.addEventListener("load", responseHandler2);

})

// Gets tvmaze id from the id array
function getTvId (id){
    // console.log(id)
    var show = objectStore[id];
    var tvId = tvIdStore[id];
    console.log(show);
    return tvId;}

//Hide show-selector
function hideSelector(){
    var selector = document.getElementById("show-select");
    selector.style.visibility = 'hidden';
}
//Show show-selector
function showSelector(){
    var selector = document.getElementById("show-select");
    selector.style.visibility = 'visible';
}

function showDetails(showObject){
    var name = showObject.name;
    var image = showObject.image.medium;
    var descr = showObject.summary;
    var details = document.getElementById("show-detail");
    details.innerHTML = "";
    var showName = document.createElement("h2");
    var showImg = document.createElement("img");
    var showDescr = document.createElement("p");
    showName.innerText = name;
    showImg.src = image;
    showDescr.innerHTML = descr;
    details.append(showName,showImg,showDescr);

}
function clearDetails(){
    var details = document.getElementById("show-detail");
    details.innerHTML = "";
}