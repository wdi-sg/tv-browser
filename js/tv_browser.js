// API Docs at:
// http://www.tvmaze.com/api

window.onload = function() {
  var showSearchElement = document.getElementById("show-search");
  var submitElement = document.querySelector("button");
  var showSelectElement = document.getElementById("show-select");
  var showDetailElement = document.getElementById("show-detail");

  submitElement.addEventListener("click", function() {
    showSelectElement.innerHTML = "";
    showDetailElement.innerHTML = "";

    var userInput = showSearchElement.value;
    url = "http://api.tvmaze.com/search/shows?q=" + userInput

    var firstOptionElement = document.createElement("option");
    firstOptionElement.innerHTML = "Shows matching " + userInput + "...";
    showSelectElement.appendChild(firstOptionElement);
    var responseHandler = function() {
      var response = this.response;
      var parseResponse = JSON.parse(response);
      parseResponse.forEach(function(e) {
      var optionElement = document.createElement("option");
      optionElement.innerHTML = e.show.name;
      optionElement.id = e.show.name;
      console.log(optionElement);
      optionElement.setAttribute("image", e.show.image == null ? "#" : e.show.image.original);
      showSelectElement.appendChild(optionElement);
    })
      showSelectElement.style.visibility = "visible";
    }
    request = new XMLHttpRequest();
    request.addEventListener("load", responseHandler);
    request.open("GET", url);
    request.send();
  })

  var showNameAndImage = function() {
      showDetailElement.innerHTML = "";

      var showClicked = this.value;
      var showClickedElement = document.getElementById(showClicked);
      var imgElement = document.createElement("img");
      imgElement.src = showClickedElement.getAttribute("image");
      showDetailElement.appendChild(imgElement);
    }

  showSelectElement.addEventListener("change", showNameAndImage);
}