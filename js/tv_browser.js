// API Docs at:
// http://www.tvmaze.com/api

var input = document.querySelector('#show-search');
var apiCall = "http://api.tvmaze.com/search/shows?q=";

//json output

var JSONcall;

var doSubmit = function(event){
  var responseHandler = function() {
    JSONcall = JSON.parse( this.responseText );
    // $('#show-select').removeAttr("style");
    //document.querySelector('#show-select')
    // $('#show-select').empty();
    // $('#show-select').append("<option>Shows matching " + input.value + "</option>")
    var pickShow = document.querySelector('#show-select');
    pickShow.removeAttribute("style");
    pickShow.innerHTML = '';
    var option = document.createElement("option");
    option.text = "Shows matching " + input.value;
    pickShow.appendChild(option);
    showData();
  };

  var request = new XMLHttpRequest();
  request.addEventListener("load", responseHandler);
  request.open("GET", apiCall + input.value);
  request.send();
  var requestFailed = function(){
    console.log("response text", this.responseText);
    console.log("status text", this.statusText);
    console.log("status code", this.status);
  };
  request.addEventListener("error", requestFailed);
};

function selectShow(x){
  console.log(JSONcall[x].show);
  //document.querySelector('#show-detail').innerHTML
  // $('#show-detail').html
  document.querySelector('#show-detail').innerHTML = "<h3>" + JSONcall[x].show.name + "</h3>" + "<br>" + "<img src =\'" + JSONcall[x].show.image.medium + "\'>" + "<br>" + JSONcall[x].show.summary;
}

function showData(){
  //Object.keys returns the keys for an object, then use forEach to loop through the object. For this to work the object must be stored in a globally accessible.
  Object.keys(JSONcall).forEach(function(key){
    //store the key in var due to repeats
    var tvShow = JSONcall[key].show;
    // $('<option>').val(key).text(tvShow.name).appendTo('#show-select');
    var option = document.createElement("option");
    option.value = key;
    option.text = tvShow.name
    document.querySelector('#show-select').appendChild(option);
  });
}
