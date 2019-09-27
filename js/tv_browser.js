// API Docs at:
// http://www.tvmaze.com/api

console.log("hihi")

var resultArea = document.querySelector("#show-detail");
var website = "http://api.tvmaze.com/search/shows?q=";

///////////////////////////
var submitURL = function(event){
    var input = document.querySelector("#show-search");
    var inputV = input.value;
    var url =  website + inputV;

    //making request
    var request = new XMLHttpRequest();

    //ready the system and specifying the URL
    request.open("GET", url);

    //response handler
    var responseHandler = function(){
        console.log("response text", this.responseText);
        console.log("status text", this.statusText);
        console.log("status code", this.status)
        var result = JSON.parse( this.responseText);
        console.log(result);
        for(i = 0; i < result.length; i++){
            ///////////Creating the variables needed
            var option = document.querySelectorAll(".movies")
            option[i].classList.remove("appear");
            //////////Amending the variables
            option[i].innerHTML = result[i].show.name;
        }
    }

    //listen for request response
    request.addEventListener("load", responseHandler);

    //send the request
    request.send();
}


///////////////////////////
var printItem = function(event){
    var input = document.querySelector("#show-select");
    var inputV = input.value;
    var url =  website + inputV;

    //making request
    var request = new XMLHttpRequest();
    //ready the system and specifying the URL
    request.open("GET", url);

    //response handler
    var responseHandler = function(){
        var result = JSON.parse( this.responseText);;
            ///////////Creating the variables needed
            var title = document.querySelector(".title");
            var poster = document.querySelector(".poster");
            var summary = document.querySelector(".summary");
            var image = result[0].show.image.medium
            //////////Amending the variables
            poster.setAttribute("src", image);
            title.innerHTML = result[0].show.name;
            summary.innerHTML = result[0].show.summary;
        }

    //listen for request response
    request.addEventListener("load", responseHandler);

    //send the request
    request.send();
}



document.querySelector("button").addEventListener("click", submitURL);



document.querySelector("#show-select").addEventListener("change", printItem);