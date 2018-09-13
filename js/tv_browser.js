// API Docs at:
// http://www.tvmaze.com/api
var ourRequest= new XMLHttpRequest();
ourRequest.open('GET', "http://api.tvmaze.com/shows")
ourRequest.onload= function(){
	var ourData= JSON.parse(ourRequest.responseText);
	// console.log(ourData);
	renderHTML(ourData);
}
ourRequest.send();
var btn=document.getElementById("btn");

var store='';

var valueCompare=function(value){
var searchInput=document.getElementById("show-search");
store= searchInput.value;
console.log(store);
if (value == store){

	alert("hello");
}
else{
	console.log("wrong");
}
}

var renderHTML=function(data){
for(i=0;i<data.length;i++){
var nameShow= data[i].name;
btn.addEventListener("click",function(){
valueCompare(nameShow);

})
}
}

