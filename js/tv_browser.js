// API Docs at:
// http://www.tvmaze.com/api


//This function takes in an array and returns an array of names
var processSearchArrayToName = function(arr){
    //maps the name to a new array and returns the array
    console.log(arr)
    var newArray = arr.map(function(element,index){
         console.log(index);
         return element.show.name;
    })
    console.log(newArray)
    populateSelectBox(newArray)
    return newArray;
};

//This function populates the select box based on input of arrays
var populateSelectBox = function(nameArray){
    nameArray.forEach(function(element){

        //creating <option tags> and putting into #shows-select box
        var optionTag = document.createElement("option")
        optionTag.setAttribute("value", element)
        optionTag.textContent = element
        document.querySelector("#show-select").appendChild(optionTag)
    })
};


var doSubmit = function(event){

    var responseHandler = function() {
        console.log("response text", this.responseText);
        console.log("status text", this.statusText);
        console.log("status code", this.status);

        //transform JSON into Javascript
        var transformJsonArray = JSON.parse(this.responseText);

        //pass the array to the process array function
        processSearchArrayToName(transformJsonArray);
    };

    var requestFailed = function(){
        console.log("response text", this.responseText);
        console.log("status text", this.statusText);
        console.log("status code", this.status);
    };


    //Get use input from textbox
    var input = document.querySelector('#show-search');
    var searchTerm = input.value;

    //send out the request
    var request = new XMLHttpRequest();
    //when the data is recieved, print it out into console.
    request.addEventListener("load", responseHandler);
    //this will take in input on the place to retrieve data from
    request.open("GET", "http://api.tvmaze.com/search/shows/?q=" + searchTerm)
    //this will retrieve the data
    request.send();

    //add a callback to alert reqyest failed
    request.addEventListener("error", requestFailed)

};

//Add click event to doSubmit which will return result to array
document.querySelector('button').addEventListener("click", doSubmit);


