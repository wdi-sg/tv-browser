console.log("Let's freaking do this!");

var input;
var responseObject;
var responseList = [];
var word;

//create show selection function
var createOption = function(oNo,name){
    var option = document.createElement("option");
        option.setAttribute("id","o" + oNo);
        option.innerHTML = name;

    var showSelect = document.getElementById("show-select");
        showSelect.appendChild(option);
        showSelect.addEventListener("click", function() {
        })
};

//create images divs function
var createImg = function(iNo,imageURL){
    var img = document.createElement("img");
        img.setAttribute("id","i" + iNo);
        img.setAttribute("src",imageURL);
        img.setAttribute("alt","name");

    var showDetail = document.getElementById("show-detail");
        showDetail.appendChild(img);
};

//remove previous search result
// var removeImg = function(imgLength){

//     for (i = 0; i < imgLength; i++) {
//         showDetail.removeChild(img);
//     }
// };

//when user typed and clicked the submit button
var input = function() {
    word = document.querySelector("#show-search");
    // console.log("inputWord: " + inputWord);

    var responseHandler = function() {
        responseObject = JSON.parse(this.responseText);

        // console.log("response text", this.responseText);
        // console.log("status text", this.statusText);
        // console.log("status code", this.status);
        console.log(responseObject);

        // removeImg();
            //for loop for selector and image creation
            for (i = 0; i < responseObject.length; i++) {

                responseList = responseObject[i].show.name;
                // console.log("responseList " + i + " is " + responseList);

                createOption(i,responseList);
                // console.log("i is " + i );

                responseImg = responseObject[i].show.image.medium;
                // -> console.log("responseImg: " + responseImg);
                createImg(i,responseImg);
                // console.log("url is " + responseList[i].show.name );
            }
    };

    var request = new XMLHttpRequest(); // make a new request
    request.addEventListener("load", responseHandler);  // listen for the request response
    request.open("GET", "http://api.tvmaze.com/search/shows?q=" + word.value);  // ready the system by calling open, and specifying the url
    console.log( "http://api.tvmaze.com/search/shows?q=" + word.value);
    request.send(); // send the request
};

var submitClicked = document.getElementById("button").addEventListener("click",input);

// API Docs at:
// http://www.tvmaze.com/api

// http:api.tvmaze.com/search/shows?q=girls