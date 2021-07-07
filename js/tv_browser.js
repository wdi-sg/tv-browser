var submit = document.getElementById('submit');
var select = document.getElementById('show-select');
var userInput = document.getElementById('show-search')
var url = "http://api.tvmaze.com/search/shows?q=";
var urlSingle = "http://api.tvmaze.com/singlesearch/shows?q=";

// what to do when we receive the request
var responseHandler = function() {
  // console.log("response text", this.responseText);
  var response = JSON.parse( this.responseText );
  console.log( response );
  options(response);
}


//make options
var options = function(arr){
    var createFirstOption = document.createElement("option");
    createFirstOption.setAttribute("value","");
    createFirstOption.innerHTML="Shows matching "+userInput.value+"...";
    select.appendChild(createFirstOption);


    // if (request.status >= 200 && request.status < 400) {
        for(i=0;i<arr.length;i++){
          var createOptions = document.createElement("option");
          createOptions.innerHTML=arr[i].show.name;
          select.appendChild(createOptions);
      // }
  }
}

var responseHandler2 = function(){
    var response = JSON.parse(this.responseText);
    display(response);
}

//display search result
var displayContent = document.getElementById("show-detail");
var display = function(obj){
    var createTitle = document.createElement("h2");
    createTitle.innerHTML = obj.name;
    var createImg = document.createElement("img");
    createImg.setAttribute("src",obj.image.medium);

    displayContent.appendChild(createTitle);
    displayContent.appendChild(createImg);
    displayContent.innerHTML += obj.summary;
}


//submit button hit
submit.addEventListener("click",function(){

// make a new request
var request = new XMLHttpRequest();

// listen for the request response
request.addEventListener("load", responseHandler);

// ready the system by calling open, and specifying the url
var fullurl = `${url}${userInput.value}`;
request.open("GET", fullurl );

// send the request
request.send();
});



//when option is selected, send another request
select.addEventListener("change",function(){
    var request = new XMLHttpRequest();
    request.addEventListener("load", responseHandler2);
    fullurl = `${urlSingle}${this.value}`;
    request.open("GET", fullurl);
    request.send();
});
