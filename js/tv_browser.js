// API Docs at:
// http://www.tvmaze.com/api
var btn=document.getElementById('submit');
var select = document.getElementById('show-select');
var movies;

var clearAll = function() {
    select.innerHTML = "";                 //clear when diff input
    selectedMovie.textContent = "";			//clear title
    createImageDiv.style.display = "none";	//clear img
    createSummaryDiv.innerHTML = "";		//clear summary
}

var responseHandler = function() {
 	// console.log("response text", this.responseText);
 	var moviesArray = JSON.parse( this.responseText );

	movies = {};
	//making the key:value for each movie
	moviesArray.forEach(function(movie){
		movies[movie.show.name]= movie
	})

 	//getting the title of the movie out in each search
	var select = document.getElementById('show-select'); //get element outside
	select.innerHTML="";  //clearing before starting
	moviesArray.forEach(function(movie) {
		var option = document.createElement('option');
		option.textContent = movie.show.name;
		// var select = document.getElementById('show-select');
		select.appendChild(option);
	});
}

var requestFailed = function(){
 	console.log("response text", this.responseText);
 	console.log("status text", this.statusText);
 	console.log("status code", this.status);
};

function sendxhr(url){ 
	request = new XMLHttpRequest(); // make a new request
	request.addEventListener("load", responseHandler); // listen for the request response
	request.addEventListener("error", requestFailed);// run an error function if an error occurs
	request.open("GET", url); // ready the system by calling open, and specifying the url
	request.send(); // send the request


}

function check(){
	var url='http://api.tvmaze.com/search/shows?q=' + document.getElementById("show-search").value;
	sendxhr(url);
}

btn.addEventListener('click',check);


function setClick(){
	// var x =document.getElementById('show-select');
	// var i = x.selectedIndex; //selectIndex is a special word.
 	//document.getElementById("title").innerHTML = x.options[i].text;
 	var getTitle = document.getElementById('title');
	var showDetail = document.getElementById('show-detail'); //append element to group    

 	getTitle.textContent="";
 	showDetail.innerHTML="";

    var selectedMovie = this.value;
    var selectedMovieName = movies[selectedMovie];
	// var getTitle = document.getElementById('title');
	getTitle.textContent = selectedMovie;

	var createImageDiv = document.createElement('div');
	var createImageTag = document.createElement('img');  //create element
	// in case some movie has no images
    if (selectedMovieName.show.image) {
        createImageDiv.style.display = "flex";
        createImageTag.src = selectedMovieName.show.image.medium;
    } else {
        createImageDiv.style.display = "none";
    }
	// var showDetail = document.getElementById('show-detail'); //append element to group
	createImageDiv.appendChild(createImageTag);
	showDetail.appendChild(createImageDiv); //appending to the showDetail group

	var createSummaryDiv=document.createElement('div');
	var writeUp = selectedMovieName.show.summary;
	createSummaryDiv.innerHTML=writeUp;
	showDetail.appendChild(createSummaryDiv); //appending to the showDetail group
}


	// console.log('Title of the movie: ' + movie );
	// console.log('Summary of the movie: ' + writeUp);	

select.addEventListener('change',setClick);

//the number of titles each search has
// function numTitle(avail){
// 	var numOfMovies = avail.length;
// 	console.log('The number of movies ' + numOfMovies);
// }


// #####Bryan's understanding and trial to AJAX
// function responseHandler(){
// 	var response = JSON.parse(xhr.responseText);
// 	console.log(response);
// }

// xhr = new XMLHttpRequest();
// xhr.open('GET', 'https://swapi.co/api/people/');
// xhr.addEventListener('load', responseHandler);
// xhr.send();
