var getShowSelect = document.getElementById("show-select");
var getShowDetail = document.getElementById("show-detail");
var response = null;

document.addEventListener('DOMContentLoaded', function() {
  getShowSelect.style.visibility="hidden";
  //get search value
  var submitButton = document.getElementsByTagName('input')[1];
  submitButton.addEventListener('click', doSubmit);
  //Add an event listener “change” to the select button. 
  getShowSelect.addEventListener('change',searchDetails);
});

function doSubmit (event){
	event.preventDefault();
	var title = document.getElementById("show-search").value;
	httpRequest(title);
	getShowSelect.style.visibility="visible";
	var firstOption = document.getElementsByTagName("option")[0];
	firstOption.textContent = "Shows matching keyword " + title + " ...";
};

//httpRequest
function httpRequest(title){
	var request = new XMLHttpRequest();

	var responseNames = function() {
		//Send a new request to api. Push the result into a global variable for later use
  		response = JSON.parse(this.responseText);
  		//console.log(response);
  		searchShow(response);
	};
	request.addEventListener("load", responseNames);
	var link = "http://api.tvmaze.com/search/shows?q=" + title;
	request.open("GET", link);
	request.send();
}

function searchShow(response){
	//Loop through result to get all names. Create a new option element for name.
	for(var i=0;i<response.length;i++){
		var showName = response[i]["show"]["name"];
		var createOption = document.createElement("option");
		getShowSelect.appendChild(createOption);
		createOption.textContent = showName;

		//get image
		if(response[i]["show"]["image"] === null){
		var createImg = document.createElement("p");
		createImg.textContent="<No image link found>";
		}
		else{
			var createImg = document.createElement("img");
			createImg.setAttribute("src",response[i]["show"]["image"]["medium"]);
		}
		getShowDetail.appendChild(createImg);
		createImg.setAttribute("class","image");
		createImg.style.display="none";
	}
}

function searchDetails(event){
	event.preventDefault();
	var input = document.getElementById("show-select").selectedIndex;
	//console.log(input);

	var images = document.getElementsByClassName("image");
	for(var i=0;i<images.length;i++){
		//console.log(images[i]);
		images[i].style.display="none";
	}
	
	var showImage = images[input-1];
	//console.log(showImage);
	showImage.style.display="block";
}

