// API Docs at:
// http://www.tvmaze.com/api
console.log("Hello")

var submitButton = document.getElementById("submit");
var userInput = document.getElementById("show-search");
var urlHome = "http://api.tvmaze.com/search/shows?q=";
var urlSingle = "http://api.tvmaze.com/singlesearch/shows?q="
var selectBar = document.getElementById("show-select");




//get feedback, parse and make options
var requestHappened = function(){
        var myObject = JSON.parse(this.responseText);
        makeOptions(myObject);
    }

//create options
var makeOptions = function(arr){
    for(i=0;i<arr.length;i++){
            var createOption = document.createElement("option");
            createOption.innerHTML=arr[i].show.name;
            selectBar.appendChild(createOption);
        }
}

var secondRequestHappened = function(){
    var myObject = JSON.parse(this.responseText);

}

//display search result
var display = function(str){
    document.getElementById("show-detail").innerHTML=str;
}

//when submit button is clicked, send request
submitButton.addEventListener("click",function(){
event.preventDefault();
    var request = new XMLHttpRequest();
    request.addEventListener("load", requestHappened);
    var endpoint = `${urlHome}${userInput.value}`;
    request.open("GET", endpoint);
    request.send();
})

//when option is selected, send another request
selectBar.addEventListener("change",function(){
    var request = new XMLHttpRequest();
    request.addEventListener("load", secondRequestHappened);
    endpoint = `${urlSingle}${this.value}`;
    request.open("GET", endpoint);
    request.send();
});
