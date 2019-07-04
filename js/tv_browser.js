// API Docs at:
// http://www.tvmaze.com/api
console.log("Hello")

var submitButton = document.getElementById("submit");
var userInput = document.getElementById("show-search");
var urlHome = "http://api.tvmaze.com/search/shows?q=";
var urlSingle = "http://api.tvmaze.com/singlesearch/shows?q="
var selectBar = document.getElementById("show-select");
var detailDisplay = document.getElementById("show-detail");



//get feedback, parse and make options
var requestHappened = function(){
        var myObject = JSON.parse(this.responseText);
        makeOptions(myObject);
    }

//create options
var makeOptions = function(arr){
    //create the first options
    clearOptions();
    var createFirstOption = document.createElement("option");
    createFirstOption.setAttribute("value","");
    createFirstOption.innerHTML="Shows matching "+userInput.value+"...";
    selectBar.appendChild(createFirstOption);

    //create result options
    for(i=0;i<arr.length;i++){
            var createOption = document.createElement("option");
            createOption.innerHTML=arr[i].show.name;
            selectBar.appendChild(createOption);
        }
}

//when an option is selected
var secondRequestHappened = function(){
    var myObject = JSON.parse(this.responseText);
    display(myObject);
}

//display search result
var display = function(obj){
    clearDisplay();

    var createTitle = document.createElement("h2");
    createTitle.innerHTML = obj.name;
    var createImg = document.createElement("img");
    createImg.setAttribute("src",obj.image.medium);

    detailDisplay.appendChild(createTitle);
    detailDisplay.appendChild(createImg);
    detailDisplay.innerHTML += obj.summary;
}

//clear details display
var clearDisplay = function(){
    var child = detailDisplay.lastElementChild;
    while (child) {
        detailDisplay.removeChild(child);
        child = detailDisplay.lastElementChild;
    }

}

//clear the options field
var clearOptions = function(){
    var child = selectBar.lastElementChild;
    while (child) {
        selectBar.removeChild(child);
        child = selectBar.lastElementChild;
    }
}

//when submit button is clicked, send request
submitButton.addEventListener("click",function(){
event.preventDefault();
    selectBar.style.visibility = "visible";
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
