// API Docs at:
// http://www.tvmaze.com/api


var request = new XMLHttpRequest();

var responseHandler = function () {
    console.log("response text", this.responseText);
    var response = JSON.parse(this.responseText);
    console.log(response);
    console.log(response[0]);
    for (leti=0;i<response.length;i++) {
        document.body.appendChild(repsonse[i]);
    }


    // var domInfo = document.querySelector("#return-dom");

    // var reponseDom = document.createElement ("p");

    // reponseDom.innerText = response;

    // console.log (responseDom);

    // document.body.appendChild(response);


}



var mySearch;

var doSubmit = function(event){
    //Gets user input
    var input = document.querySelector('#show-search');
    mySearch = input.value;
    request.open("GET", "http://api.tvmaze.com/search/shows?q="+mySearch);
    request.send()
    console.log (mySearch)
    // var allMySearch =
    // request.send()
};
document.querySelector('#submit').addEventListener('click', doSubmit);

request.addEventListener("load", responseHandler);