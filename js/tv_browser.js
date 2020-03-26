// API Docs at:
// http://www.tvmaze.com/api
/* TRYING DIFFERENT LOGIC

var input;
var button;
var request;
var response;
var title = [];
var item;
var resultArray = [];




var onClick = function(event){
    request = new XMLHttpRequest();
    input = document.getElementById("show-search");
    request.open("GET", "http://www.tvmaze.com/search/shows?q=" + input.value);
    request.addEventListener("error", requestFailed);
    request.addEventListener("load", responseHandler);
    request.send();

}
var responseHandler = function() {
    console.log("response text", this.responseText);
    console.log("status text", this.statusText);
    console.log("status code", this.status);
};*/

/*var responseHandler = function() {
    resultArray = JSON.parse(this.responseText);
    //console.log(resultArray);
    for(var i = 0; i < resultArray.length; i++) {

         var selectShow = document.querySelector('#show-select');

         var showNames = document.createElement('option');

         showNames.innerHTML = resultArray[i].show.name;

         selectShow.appendChild(showNames);

     }

}
var requestFailed = function(){
    alert("Cannot view. Wrong input!!");
}
button = document.querySelector('#btn');
button.addEventListener('click',onClick);*/
/*let searchedItem;
 let searchUrl;
 let showTitlesArr = [];
 let selectDiv = document.getElementById("show-select");*/




 /*VERSION 1


//RESPOND TO THE REQUESTED URL
var responseHandler = function(){
    var response = JSON.parse(this.responseText);
    console.log(response);
}
var requestFailed = function() {
   console.log("Request failed");
 };


// ON CLICKING FETCH INPUT DATA AND SEND QUERY FOR // THAT URL
var onClick = function(event){
    var request = new XMLHttpRequest();
    var input = document.querySelector("#show-search");
    var item = input.value;
    var url = "http://api.tvmaze.com/search/shows?q=" + item;
    request.open("GET", url);
    request.addEventListener("load", responseHandler);
    request.addEventListener("error", requestFailed);
    request.send();
}

//CREATE A BUTTON
var button = document.getElementById('btn');
button.addEventListener('click',onClick);
*/

//VERSION 2

//RESPOND TO THE REQUESTED URL AND ADD IT TO MENU
var newDiv = document.getElementById("show-select");
var responseHandler = function(){
    newDiv.innerHTML = "";
    var response = JSON.parse(this.responseText);
    console.log(response);
    console.log(response[0].show.name);
    var name = document.getElementById('show-select');
    var optionList = [];
    for(var i=0;i<response.length;i++){
        optionList.push(response[i].show.name);
        let optionName = document.createElement("option");
        optionName.textContent = response[i].show.name;
        newDiv.appendChild(optionName);
    }
    console.log(optionList);

    //console.log("option list:" + optionList);
}
var requestFailed = function() {
   console.log("Request failed");
 };


// ON CLICKING FETCH INPUT DATA AND SEND QUERY FOR // THAT URL
var onClick = function(event){
    var request = new XMLHttpRequest();
    var input = document.querySelector("#show-search");
    var item = input.value;
    var url = "http://api.tvmaze.com/search/shows?q=" + item;
    request.open("GET", url);
    request.addEventListener("load", responseHandler);
    request.addEventListener("error", requestFailed);
    request.send();
}

//CREATE A BUTTON
var button = document.getElementById('btn');
button.addEventListener('click',onClick);