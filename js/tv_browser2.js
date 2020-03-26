// API Docs at:
// http://www.tvmaze.com/api

console.log("~Life is good~");

//*********************
//All data list
var archives=[];
var titleList=[];
//*********************


//*********************
//Set up
var responseHandler = function() {
  console.log("status text", this.statusText);
  console.log("status code", this.status);
//Create data array
  var myObject = JSON.parse(this.responseText);
  archives.push(myObject);
  console.log(archives);
};

// make a new request
var request = new XMLHttpRequest();

// listen for the request response
request.addEventListener("load", responseHandler);

request.open("GET", "http://api.tvmaze.com/search/shows?q=girls");

// send the request
request.send();

//***********************


//***********************
//Record all film title into titleList Arr
// for (var i=0; i<archives[0].length; i++){
// titleList.push(archives[0][i]["show"]["name"])
// }
//***********************





//***********************
//detect user input to display output
const inputFired = document.querySelector('input');

inputFired.addEventListener('change', function(event){
        const list = document.querySelector('option');
        list.textContent = `Florida Girls`;


if (list.textContent==="Florida Girls"){

    //create an img tag at #show-detail
    var result = document.getElementById('show-detail');
    var createImgTag = document.createElement("img");

    //grab image url and append it
    var url = archives[0][0]["show"]["image"]["medium"];//console.log(url);
    createImgTag.setAttribute("src",url);
    result.appendChild(createImgTag);
}
});