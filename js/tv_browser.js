// API Docs at:
// http://www.tvmaze.com/api
console.log("~Omg wth is this~")

//global variables
var defaultURL = "http://api.tvmaze.com/search/shows?q=";
var singleURL = "http://api.tvmaze.com/singlesearch/shows?q=";
var inputEntered = document.querySelector("input");
var inputValue = document.getElementById("show-search");
var dropdown = document.getElementById("show-select");
var displayArea = document.getElementById("show-detail");


// parse and generate database
var firstRequest= function(){
    var myObject = JSON.parse(this.responseText);
    //console.log(myObject);
    //pass database to search for matched options
    showOptions(myObject);
}

//generate filtered out results
var showOptions = function(result){
    //clear previous dropdown options
   clearOptions();

   //generate first option: search result
    var optionResult = document.createElement("option");
    optionResult.setAttribute("value","");
    optionResult.innerHTML= result.length + " Shows Found";
    dropdown.appendChild(optionResult);

    //generate all other options: push results to show in dropdown
    console.log(result.length);
    for(var i=0; i<result.length; i++){
        var createOption = document.createElement("option");
        createOption.innerHTML=result[i]["show"]["name"];
        dropdown.appendChild(createOption);
        }
}

//when an film is selected
var secondRequest = function(){
    var myObject = JSON.parse(this.responseText);
    //pass database to generate single film result
    display(myObject);
}

//display search result on single film
var display = function(result){
    //clear previous displayed results
    clearDisplay();

    //create film result detail - title, img, summary
    var createTitle = document.createElement("h2");
    createTitle.innerHTML = result["name"];
    var createImg = document.createElement("img");
    createImg.setAttribute("src", result["image"]["medium"]);
    var createP = document.createElement("p");
    createP.innerHTML = result["summary"];

    //append generated results to show
    displayArea.appendChild(createTitle);
    displayArea.appendChild(createImg);
    displayArea.appendChild(createP);
}


//clear previous displayed single film results
var clearDisplay = function(){
    var child = displayArea.lastElementChild;
    while (child!==null) {
        displayArea.removeChild(child);
        child = displayArea.lastElementChild;
    }
}

//clear the options in the dropdown
var clearOptions = function(){
    var child = dropdown.lastElementChild;
    while (child!==null) {
        dropdown.removeChild(child);
        child = dropdown.lastElementChild;
    }
}


//when input is entered: request to be sent
inputEntered.addEventListener("change",function(){
    var request = new XMLHttpRequest();
    request.addEventListener("load", firstRequest);

    var finalURL = defaultURL+inputValue.value;
    request.open("GET", finalURL);
    request.send();
});

//when option is selected, send another request
dropdown.addEventListener("change",function(){
    var request = new XMLHttpRequest();
    request.addEventListener("load", secondRequest);

    var finalURL = singleURL +this.value;
    request.open("GET", finalURL);
    request.send();
});