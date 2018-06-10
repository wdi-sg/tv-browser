// API Docs at:
// http://www.tvmaze.com/api

//global var
//input's value

var input = document.querySelector('#show-search');
var apiCall = "http://api.tvmaze.com/search/shows?q=";

//json output

var JSONcall;

var doSubmit = function(event){
  var responseHandler = function() {
    // console.log("response text", this.responseText);
    JSONcall = JSON.parse( this.responseText );
    console.log(JSONcall);
    $('#show-select').removeAttr("style");
    $('#show-select').empty();
    $('#show-select').append("<option>Shows matching " + input.value + "</option>")
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
  $('#show-detail').html("<h3>" + JSONcall[x].show.name + "</h3>" + "<br>" + "<img src =\'" + JSONcall[x].show.image.medium + "\'>" + "<br>" + JSONcall[x].show.summary)
}

function showData(){
  Object.keys(JSONcall).forEach(function(key){
    var tvShow = JSONcall[key].show;
    $('<option>').val(key).text(tvShow.name).appendTo('#show-select');
  });
}

//selectShow function displays the data contained
