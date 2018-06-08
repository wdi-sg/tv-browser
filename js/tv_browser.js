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
    $('#show-select').empty();
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
}

function showData(){
  Object.keys(JSONcall).forEach(function(key){
    var tvShow = JSONcall[key].show;
    // $('#show-select').append("<option class=\"selectS\"" + "id=\"" + key + "\"" + "value=\"JSONcall[" + key + "].show\" onchange=\"selectShow(this.id)\">" + tvShow.name + "</option>");
    $('<option>').val(key).text(tvShow.name).appendTo('#show-select');
  });
}

//selectShow function displays the data contained
