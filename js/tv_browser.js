// API Docs at:
// http://api.tvmaze.com/search/shows?q=babylon+5
//var request;
// make a new request
var buttonSelect=document.querySelector("#show-select");
buttonSelect.classList.add('hide');
var doSubmit = function(event){

    var request = new XMLHttpRequest();

    var input = document.querySelector('#show-search');
    var showInput = input.value;
    var showSearchArray=showInput.split(" ");
    var showSearch=showSearchArray.join("+");
    var url="http://api.tvmaze.com/search/shows?q="+showSearch;
    request.open("GET", url);
    request.send();
    buttonSelect.classList.remove('hide');
    buttonSelect.classList.add('show');
//    console.log(showSearch);
request.addEventListener("error", requestFailed);
request.addEventListener("load", responseHandler);

};

var optionClick=function(event){
    //console.log("changed");
    var selectedOption=document.getElementById('show-select').value;
    console.log(selectedOption);
}

document.querySelector('#submit').addEventListener('click', doSubmit);

document.querySelector('#show-select').addEventListener('change',optionClick);
// ready the system by calling open, and specifying the url

// add to list
var addToList=function(option){
var sel=document.getElementById("show-select");

for(var searchCount=0; searchCount<option.length;searchCount++)
{
    var opt=document.createElement('option');

    opt.value=option[searchCount].show.name;
    opt.appendChild(document.createTextNode(option[searchCount].show.name));
    sel.appendChild(opt);
}
console.log(sel.length);
console.log(sel[1]);
console.log(sel);

}


// what to do when we recieve the request
var responseHandler = function() {
//  console.log("response text", this.responseText);
  var response = JSON.parse( this.responseText );
  console.log( response[1].show.summary);
  console.log(response.length);
  addToList(response);
};

var requestFailed = function(){
    console.log("no such movies");
  console.log("response text", this.responseText);
  console.log("status text", this.statusText);
  console.log("status code", this.status);
};

var droplist = document.querySelector('#show-select');