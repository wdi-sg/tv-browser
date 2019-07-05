// API Docs at:
// http://www.tvmaze.com/api
document.querySelector('#submit').addEventListener('click', doSubmit);



var urlText = "http://api.tvmaze.com/search/shows?q=";
//on click, function will take information from the input field, concat it with the urlText variable and send it as a link for AJAX
function doSubmit (){
  clearSpace()
  var input = document.querySelector('#show-search');
  searchValue = input.value;
  requestAJAX(null, urlText, searchValue);
 };

function requestAJAX(id, urlText, searchValue){

  console.log(id)
  var responseHandler = function() {
    // console.log("response text", this.responseText);
    var response = JSON.parse( this.responseText );
    console.log(response)

    displayShows(response, id);
    console.log("status text", this.statusText);
    console.log("status code", this.status);
  };
  // make a new request
  var request = new XMLHttpRequest();

  // listen for the request response
  request.addEventListener("load", responseHandler);

  // ready the system by calling open, and specifying the url
  var checkShow = urlText+searchValue

  console.log(checkShow)
  request.open("GET", checkShow);

  // send the request
  request.send();

  var requestFailed = function(){
    console.log("response text", this.responseText);
    console.log("status text", this.statusText);
    console.log("status code", this.status);
  };

  request.addEventListener("error", requestFailed);
};

function getShowInfo(input){
  console.log(input);

}
//gets information input from user, clears the show-detail space and performs AJAX based on user selecton.
function getInfo(){
  var name = this.name;
  var id = this.id;
  clearSpace()
  requestAJAX(id, urlText,name)
}

function displayShows(input, id){
  //check if user typed in a show or selected from drop down box using presence of ID to identify selection
  if (id === null){
    document.getElementById("show-select").options.length = 0;
    for (var i = 0; i < input.length; i++){
      if (input[i]["show"]["image"] != null){
        var img = document.createElement("img")
        img.className = "showpictures"
        img.src = input[i]["show"]["image"]["medium"];
        img.name = input[i]["show"]["name"];
        img.id = input[i]["show"]["id"];
        img.addEventListener("click",getInfo);
        var option = document.createElement("option")
        var showSelect = document.querySelector("#show-select")
        var showName = input[i]["show"]["name"];
        option.name = input[i]["show"]["name"];
        option.text = showName
        option.id = input[i]["show"]["id"];
        option.addEventListener("click",getInfo);
        showSelect.add(option)
        var showDetails = document.querySelector("#show-detail")
        showDetails.appendChild(img)
      }
    }
  //check if user selected from the select box. if ID is present, will load show details
  }else if(id){
    for (var i = 0; i < input.length; i++){
      if (input[i]["show"]["id"] == id){
        var img = document.createElement("img")
        img.className = "showpictures"
        if (input[i]["show"]["image"]["original"] != null){
            img.src = input[i]["show"]["image"]["original"];
        }else {
            img.src = input[i]["show"]["image"]["medium"];
        }
        img.name = input[i]["show"]["name"];
        img.id = input[i]["show"]["id"];
        img.addEventListener("click",getInfo);
        var showDetails = document.querySelector("#show-detail")
        showDetails.appendChild(img)
      }
    }
    id = null;
  }
}
//clears the show-detail area for next show/s to be displayed
function clearSpace(){
  var clear = document.querySelector("#show-detail")
  while (clear.firstChild){
    clear.removeChild(clear.firstChild)
  }
}
