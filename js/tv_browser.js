// API Docs at:
// http://www.tvmaze.com/api

var getShowSelect = document.getElementById("show-select");

document.addEventListener('DOMContentLoaded', function() {
  //hide getShowSelect by default
  getShowSelect.style.visibility="hidden";

  //when user submit search for tv show
  var submitButton = document.getElementsByTagName('input')[1];
  submitButton.addEventListener('click', doSubmit);
});

//search for show
function doSubmit (event){
	event.preventDefault();
	var input = document.getElementById("show-search");
	var title = input.value;
	httpRequest(title);
	getShowSelect.style.visibility="visible";
	var firstOption = document.getElementsByTagName("option")[0];
	firstOption.textContent = "Shows matching keyword " + title + " ...";
};

//httpRequest
function httpRequest(title){
	var request = new XMLHttpRequest();

	var responseHandler = function() {
		console.log("response text", this.responseText);
  		var response = JSON.parse( this.responseText );
  		console.log(response);
  		display(response);
	};

	var requestFailed = function(){
		console.log("response text", this.responseText);
		console.log("status text", this.statusText);
		console.log("status code", this.status);
	};

	// listen for the request response
	request.addEventListener("load", responseHandler);
	request.addEventListener("error", requestFailed);

	// ready the system by calling open, and specifying the url
	var link = "http://api.tvmaze.com/search/shows?q=" + title;
	//var link ="http://www.tvmaze.com/search?q=test";
	request.open("GET", link);

	// send the request
	request.send();
}

function display(response){
	for(var i=0;i<response.length;i++){
		var showName = response[i]["show"]["name"];
		//console.log(showName);
		var image = "";
		if(response[i]["show"]["image"] == null){
			image = "<No image link found>";
		}else{
			image = response[i]["show"]["image"]["original"];
		}
		var createOption = document.createElement("option");
		getShowSelect.appendChild(createOption);
		createOption.textContent = showName + "<" + image + ">";
	}
}
