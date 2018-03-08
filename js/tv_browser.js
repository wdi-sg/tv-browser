// API Docs at:
// http://www.tvmaze.com/api
//user enters input
//user submits input
//return showresults - unhide select div
//user selects show
//return showdetails - unhide details div
//user selects movie from dropdown
	//-add event listener to dropdown options
	//-on click, retrieve id of show
	//-use id to call show details API
	//-On success, get the data and append to div
//display image and details in dive below

var showList = document.getElementById('show-select');

var getInput = function () {
	var titleSearchSubmit = document.getElementById('show-search-button');
	titleSearchSubmit.addEventListener('click',displayResults);
};

var displayResults = function(){
	var url=document.getElementById("show-search").value;
	getList(url);
}

var addMoviesToList = function(movieListResponse){
	showList.innerHTML="";
	var firstOption = document.createElement('option');
	firstOption.textContent="Search results matching "+document.getElementById("show-search").value;
	showList.appendChild(firstOption);
	for(i=0;i<movieListResponse.length;i++){
		let item = document.createElement('option');
		item.textContent = movieListResponse[i].show.name;
		item.setAttribute('id',movieListResponse[i].show.id);
		showList.appendChild(item);
	};
	showList.style.display = "block";
	getDetails(movieListResponse);
};

var getListResponseHandle = function(event){
	var movieListResponse = JSON.parse(this.responseText);
	addMoviesToList(movieListResponse);
};

var errorHandle = function() {
	alert("error");
};

var getList = function(url){
	var showListRequest = new XMLHttpRequest();
	showListRequest.addEventListener('load',getListResponseHandle);
	showListRequest.addEventListener('error',errorHandle);
	showListRequest.open('Get',"http://api.tvmaze.com/search/shows?q=:"+url);
	showListRequest.send();
};

var displayShowDetails = function(ShowDetailsResponse){
	while(document.getElementById('show-detail').firstChild){
		document.getElementById('show-detail').removeChild(document.getElementById('show-detail').firstChild);
	};
	var showName = document.createElement('h1');
	showName.innerText = showList.value;
	document.getElementById('show-detail').appendChild(showName);
	var showImage=document.createElement('img');
	showImage.src=ShowDetailsResponse.image.medium;
	document.getElementById('show-detail').appendChild(showImage);
	var showSummary=document.createElement('p');
	showSummary.innerHTML = ShowDetailsResponse.summary;
	document.getElementById('show-detail').appendChild(showSummary);
	document.getElementById('show-detail').style.display = "block";
};

var getShowDetailsResponseHandle = function(){
	var ShowDetailsResponse = JSON.parse(this.responseText);
	displayShowDetails(ShowDetailsResponse);
};

var getShowDetails = function(event){
	var showListItemsArray = Array.from(showList.children); 
	var clickedMovie = showListItemsArray[event.target.selectedIndex];
	var clickedMovieId = clickedMovie.getAttribute('id');
	console.log(clickedMovieId);
	var showDetailsRequest = new XMLHttpRequest();
	showDetailsRequest.addEventListener('load',getShowDetailsResponseHandle);
	showDetailsRequest.addEventListener('error',errorHandle);
	showDetailsRequest.open('Get',"http://api.tvmaze.com/shows/"+clickedMovieId);
	showDetailsRequest.send();
};

var getDetails = function(movieListResponse){
	showList.addEventListener('change',getShowDetails);
};

var retrieveMoveId= function(){
};

getInput();

