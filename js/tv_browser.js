// API Docs at:
// http://api.tvmaze.com/search/shows?q=babylon+5
//var request;
// make a new request
var castUrl;
var UserSearch;
var buttonSelect=document.querySelector("#show-select");
buttonSelect.classList.add('hide');
var doSubmit = function(event){

    var request = new XMLHttpRequest();

    var input = document.querySelector('#show-search');
    var showInput = input.value;
    var showSearchArray=showInput.split(" ");
    var showSearch=showSearchArray.join("+");
    UserSearch=showSearch;
    var url="http://api.tvmaze.com/search/shows?q="+showSearch;
    request.open("GET", url);
    request.send();
    buttonSelect.classList.remove('hide');
    buttonSelect.classList.add('show');
//    console.log(showSearch);
request.addEventListener("error", requestFailed);
request.addEventListener("load", responseHandler);

};
//After selection


var optionClick=function(event){
    //console.log("changed");
    var SpecificRequest = new XMLHttpRequest();
    var selectedOption=document.getElementById('show-select').value;
    console.log(selectedOption);

    var selectedInput = selectedOption;

    var selectedSearchArray=selectedInput.split(" ");
    var selectedSearch=selectedSearchArray.join("+");
//    UserSearch=showSearch;
    var newurl="http://api.tvmaze.com/search/shows?q="+selectedSearch;
    console.log(newurl);
    SpecificRequest.open("GET", newurl);
    SpecificRequest.send();
SpecificRequest.addEventListener("error", requestFailed);
SpecificRequest.addEventListener("load", specificResponseHandler);
}

var castClick=function(event){
    //console.log("changed");
    var CastRequest = new XMLHttpRequest();
    //var url="http://api.tvmaze.com/search/shows?q="+showSearch;
    CastRequest.open("GET", castUrl);
    CastRequest.send();

CastRequest.addEventListener("error", requestFailed);
CastRequest.addEventListener("load", castResponseHandler);
}



document.querySelector('#submit').addEventListener('click', doSubmit);

document.querySelector('#show-select').addEventListener('change',optionClick);

// ready the system by calling open, and specifying the url

// add to list
var addToList=function(option){
var sel=document.getElementById("show-select");
var lengthToClear=sel.length;
for(var clearCount=1;clearCount<lengthToClear;clearCount++){
    sel.removeChild(sel.options[1]);
}
sel.options[0].innerText="Show matching keyword: "+UserSearch;
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

var addToCast=function(option){
        var display=document.getElementById("show-detail");
        display.innerHTML="";
        var list=document.createElement("ul");
        list.innerText="Cast";
        display.appendChild(list);
        console.log(option.length);
        for(var castCount=0; castCount<option.length;castCount++)
        {
            var castList=document.createElement("li");
            var castListText=`${option[castCount].person.name} : ${option[castCount].character.name}`;
            castList.innerText=castListText;
            castList.classList.add("casting");
            castList.setAttribute("href","#");
            list.appendChild(castList);
        }
}

addToImage=function(userOption){
console.log(userOption);
    var display=document.getElementById("show-detail");
    display.innerHTML="";
    var title=document.createElement("h1");
    title.innerText=userOption[0].show.name;
    display.appendChild(title);
    var imageToAdd=document.createElement("img");
    imageToAdd.setAttribute("src",userOption[0].show.image.medium);
    display.appendChild(imageToAdd);
    var information=document.createElement("div");
    information.innerText=userOption[0].show.summary;
    display.appendChild(information);
    var showId=userOption[0].show.id;
    castUrl="http://api.tvmaze.com/shows/"+showId+"/cast"
    console.log(castUrl);
    var cast=document.createElement("a");
    cast.innerText="Cast";
    cast.setAttribute("id","castSearch");
    cast.setAttribute("href","#");
    display.appendChild(cast);
document.querySelector('#castSearch').addEventListener('click',castClick);

}

specificResponseHandler=function(){

    var response = JSON.parse( this.responseText );
    console.log(response);
    addToImage(response);
}

// what to do when we recieve the request
var responseHandler = function() {
//  console.log("response text", this.responseText);
  var response = JSON.parse( this.responseText );
  console.log( response[1].show.summary);
  console.log(response.length);
  addToList(response);
};

var castResponseHandler=function(){
    var response=JSON.parse(this.responseText);
    console.log(response);
    addToCast(response);
}

var requestFailed = function(){
    console.log("no such movies");
  console.log("response text", this.responseText);
  console.log("status text", this.statusText);
  console.log("status code", this.status);
};

var droplist = document.querySelector('#show-select');