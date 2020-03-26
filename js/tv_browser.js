// API Docs at:
// http://www.tvmaze.com/api
var select = document.getElementById('show-select');

//Response Handler
var responseHandler = function() {
  //Parse initial JSON input
  var response = JSON.parse(this.responseText);
  console.log(response);
  //Recursive function to display everything in the object
  // displayEntireObject(response)

  //Displaying Show Name
  displayNames(response);
};

var displayNames = function(obj){
    for (var i in obj){
        var nameDisplay = document.createElement('option');
        nameDisplay.innerText = obj[i]['show']['name']
        nameDisplay.value = obj[i]['show']['name']
        select.appendChild(nameDisplay)
    }
}

// var displayEntireObject = function(obj){
//     for (var i in obj){
//         if (typeof obj[i] === 'object'){
//             displayEntireObject(obj[i])
//         } else {
//             var itemDisplay = document.createElement('p');
//             itemDisplay.innerText = i + ": " + obj[i]
//             display.appendChild(itemDisplay)
//         }
//     }
// }

// function findById(obj, id) {
//     var result;
//     for (var p in obj) {
//         if (obj.id === id) {
//             return obj;
//         } else {
//             if (typeof obj[p] === 'object') {
//                 result = findById(obj[p], id);
//                 if (result) {
//                     return result;
//                 }
//             }
//         }
//     }
//     return result;
// }

var errorHandler = function(){
    console.log(this)
}

var doSubmit = function(event){
    var input = document.querySelector('#show-search');
    var showSearch = " http://api.tvmaze.com/search/shows?q=" + input.value;
    // make a new request
    var request = new XMLHttpRequest();
    // ready the system by calling open, and specifying the url
    request.open("GET", showSearch);
    //sending request
    request.send();
    // listen for the request response
    request.addEventListener("load", responseHandler)
    request.addEventListener("error", errorHandler);
}

document.querySelector('#submit').addEventListener('click', doSubmit);