// API Docs at:
// http://www.tvmaze.com/api

var response = [];

//hide selector:
var toggleShowSelect = document.getElementById('show-select');

document.addEventListener('DOMContentLoaded', function() {
    toggleShowSelect.style.visibility = 'hidden';

    //add event listener for submit button
    var submitButton = document.querySelector("#submitButton");
    submitButton.addEventListener("click", onSubmit);
});

//when user submit a search request
function onSubmit (event) {
    event.preventDefault();
    //find string in input box
    var findInput = document.querySelector("#show-search");
    var inputValue = findInput.value;
    /*make request to server
      wait for response from the server
      include request fail response*/
      makeRequest(inputValue);

    //display show select after getting response
    toggleShowSelect.style.visibility = 'visible';
    document.getElementById('option').textContent = "Show matching " + inputValue + "...";
};

//make request
function makeRequest(inputValue) {
    // make a new request
    var request = new XMLHttpRequest();

    // what to do when we recieve the request
    var responseHandler = function() {
      console.log("response text", this.responseText);
      response = JSON.parse(this.responseText);
      console.log(response);
      display(response);
  };

    //what to do when request fail
    var requestFailed = function() {
      console.log("response text", this.responseText);
      console.log("status text", this.statusText);
      console.log("status code", this.status);  
  };

    // listen for the request response
    request.addEventListener('load', responseHandler);
    request.addEventListener('error', requestFailed);

    // make input box into string
    var valueURI = encodeURI(inputValue);
    
    //specify URL
    var inputURL = "http://api.tvmaze.com/search/shows?q=" + valueURI;
    console.log(inputURL);

    // ready the system by calling open, and specifying the url
    request.open("GET", inputURL);
    request.send();
}

function display(response) {
    for (var i = 0; i < response.length; i++) {
       var showName = response[i].show.name;
       var createOption = document.createElement("option");
       toggleShowSelect.appendChild(createOption);
       createOption.textContent = showName;
   }
}   

//display content in show-detail
var selectedShow = document.querySelector('#show-select');
function detail () {
    var contentDetail = document.querySelector('#show-detail');
    contentDetail.innerHTML = "";
    //print name & img
    for (var i = 0; i < response.length; i++) {
        if (response[i].show.name === selectedShow.value) {
            var title = document.createElement('h1');
            title.textContent = response[i].show.name;
            contentDetail.appendChild(title);
            var img = document.createElement('img');
            img.src = response[i].show.image.medium;
            contentDetail.appendChild(img);
            var sypnosis = document.createElement('p');
            sypnosis.innerHTML = response[i].show.summary;
            contentDetail.appendChild(sypnosis)
        }
    }

}

selectedShow.addEventListener("change", detail);