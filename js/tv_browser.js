// API Docs at:
// http://www.tvmaze.com/api

var showSel = document.querySelector("select");
showSel.style.display = "none";
// showSel.setAttribute("style","display: hidden;");

var input = document.querySelector("input");

var submit = function(){
    var searchValue = input.value;
    console.log(searchValue);
    showSel.style.display = "initial";

    // make a new request
    var request = new XMLHttpRequest();

    // listen for the request response
    request.addEventListener("load", responseHandler);

    // ready the system by calling open, and specifying the url
    // open doesn't open anything??
    request.open("GET", "http://api.tvmaze.com/search/shows?q="+searchValue);

    // send the request
    request.send();
}

//Set button to submit query and receive response
var button = document.querySelector("button");
button.addEventListener('click', submit);

// what to do when we recieve the request
var responseHandler = function() {

  console.log("response text", this.responseText);
  console.log("status text", this.statusText);
  console.log("status code", this.status);

  var myObject = JSON.parse(this.responseText);

  console.log(myObject);
  console.log(myObject[0].show.image.medium);
  console.log(myObject[0].show.name);
  console.log(myObject[0].show.url);

//To display the name keys of results in the selector
  for(i=0;i<myObject.length;i++) {

    var showName = myObject[i].show.name
    var showNameOptions = document.createElement("option");
    showNameOptions.setAttribute('id',showName);
    showNameOptions.innerText = showName;
    var defaultSelect = document.querySelector("#default");
    defaultSelect.innerText = `Shows matching ${input.value}`;
    document.querySelector("#show-select").appendChild(showNameOptions);
  }

//To display images of results based on user search query
  for (i=0;i<myObject.length;i++) {

    var image = document.createElement("img");
    var imageId = myObject[i].show.name;
    image.setAttribute('id',imageId);
    image.setAttribute('class','image-results');
    image.src = myObject[i].show.image.medium;
    var results = document.querySelector("#show-detail");
    results.appendChild(image);
  };

  var selectImages = document.querySelectorAll(".image-results");
  for (i=0;i<myObject.length;i++) {
    console.log(myObject[i].show.url);
    var url = myObject[i].show.url;
    console.log(url);
    selectImages[i].addEventListener('click',function(){
        window.location = url;
        // myObject[i].show.url;
        // window.open(url) = "http://www.google.com";
    });
  }

}



// // make a new request
// var request = new XMLHttpRequest();

// // listen for the request response
// request.addEventListener("load", responseHandler);

// // ready the system by calling open, and specifying the url
// // open doesn't open anything??
// request.open("GET", "http://api.tvmaze.com/search/shows?q="+input);

// // send the request
// request.send();

// window.onload = function() {
//     // button.addEventListener('click', submit);
// };

// var selectImages = document.querySelectorAll(.image-results);

// for (i=0;i<myObject.length;i++) {
//     selectImages[i].onclick = `location.href = ${myObject[i].show.url}`
// }
// $("a#thing_to_click").on('click', function(){
//      window.open(url) = "http://www.google.com/";
// });