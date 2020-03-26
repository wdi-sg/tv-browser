// API Docs at:
// http://www.tvmaze.com/api
var showDetail = document.getElementById("show-detail");
var searchBar = document.getElementById("show-search");
var submitButton = document.getElementById("submit-button");
var optionBar = document.getElementById("show-select");
var firstOption = document.getElementById("first-option");
var response;
var showNames = [];

// what to do when we recieve the request
var responseHandler = function() {
  console.log(JSON.parse(this.responseText));
  response = JSON.parse(this.responseText);
  for(var i = 0; i < response.length; i++){
    var show = document.createElement("option");
    show.innerHTML = response[i].show.name;
    show.value = response[i].show.name;
    show.classList.add("shows");
    document.getElementById("show-select").appendChild(show);
  }
};

var getResult = function(){
  optionBar.classList.remove("hide");
  firstOption.innerHTML = "Shows matching " + searchBar.value;
  var selectList = document.getElementsByClassName("shows");
  var j = 0;
  while(j < selectList.length){
    optionBar.removeChild(selectList[0]);;
  }
  var request = new XMLHttpRequest();
  request.open("GET", "http://api.tvmaze.com/search/shows?q=" + searchBar.value);
  request.send();
  request.addEventListener("load", responseHandler);
}

var optionResult = function (){

  var selectedName = optionBar.options[optionBar.selectedIndex].value;
  var selectedImage;
  for(var i = 0; i < response.length; i++){
    if(selectedName === response[i].show.name){
      selectedImage = response[i].show.image.original;
    }
  }
  showDetail.innerHTML = `Name: ${selectedName}`
  var imageShow = document.createElement("IMG");
  imageShow.src = selectedImage;
  imageShow.classList.add = "image";
  showDetail.appendChild(imageShow);
}

submitButton.addEventListener("click", getResult);
optionBar.addEventListener("change", optionResult);