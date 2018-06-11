// API Docs at:
// http://www.tvmaze.com/api
var btn=document.getElementById('submit');
btn.addEventListener('click',check);

var responseHandler = function() {
 	// console.log("response text", this.responseText);
 	var response = JSON.parse( this.responseText );
 	console.log(response);
 	// calling out the title
 	title(response);
 	//number of total movies
 	numTitle(response);
};
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
	sendxhr(url)
}


//getting the title of the movie out in each search
function title(access){
	for(i=0;i<access.length;i++){
		var movie = access[i].show.name;
		// console.log('The movie is '+movie);
		// appending the movie into the HTML from script
		// create option tag
		var create = document.createElement('option');
		create.setAttribute('value','movies');
		//create a text node
		var disMovies = document.createTextNode(movie);
		//append the option to the text node
		create.appendChild(disMovies);
		var selectedMovie = document.getElementById("show-select").appendChild(create);
		console.log(selectedMovie); //shows the option
		var writeUp = access[i].show.summary;
		// console.log('Title of the movie: ' + movie );
		// console.log('Summary of the movie: ' + writeUp);
	};
};

function setClick(){
	var x =document.getElementById('show-select');
	var i = x.selectedIndex;
    document.getElementById("item").textContent = x.options[i].text;
}
//the number of titles each search has
function numTitle(avail){
	var numOfMovies = avail.length;
	console.log('The number of movies ' + numOfMovies);
}


// #####Bryan's understanding and trial to AJAX
// function responseHandler(){
// 	var response = JSON.parse(xhr.responseText);
// 	console.log(response);
// }

// xhr = new XMLHttpRequest();
// xhr.open('GET', 'https://swapi.co/api/people/');
// xhr.addEventListener('load', responseHandler);
// xhr.send();
