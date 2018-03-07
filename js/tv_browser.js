// API Docs at:
// http://www.tvmaze.com/api

let endPoint = "http://api.tvmaze.com/search/shows?q=";
const results = document.querySelector("#show-select");
let keyword;
let movieDB;
const showDetailElem = document.querySelector("#show-detail");

window.onload = function() {

	var getResult = function(response){
		// clear old data
		movieDB = {};
		var parentSelect = document.querySelector("#show-select");
		while (parentSelect.lastChild) {
			parentSelect.removeChild(parentSelect.lastChild);
		}
		showDetailElem.innerHTML = "";

		// set first option
		var orgSelect = document.createElement("option");
		orgSelect.textContent = `Shows matching ${keyword} ...`;
		parentSelect.appendChild(orgSelect);

		// set results into select tags
		var option;
		// var parentSelect = document.querySelector("#show-select");
		response.forEach(function(res){
			console.log(res);
			console.log(res.show.name);
			option = document.createElement("option");
			option.textContent = res.show.name;
			var id = res.show.id
			option.value = id;
			// load global obj
			movieDB[id] = {
				name: res.show.name
			};
			// get image
			if (res.show.image === null){
				console.log("no image");
				movieDB[id].img = null;
			} else {
				movieDB[id].img = res.show.image.medium
				}
			parentSelect.appendChild(option);
		});
		console.log(movieDB);
	}

	// what to do when we recieve the request
	var responseHandler = function() {
		console.log("success");
		// console.log("response text", this.responseText);
		var response = JSON.parse( this.responseText );
		// console.log( response );
		getResult(response);
	};

	var requestFailed = function(){
		console.log("error");
		console.log("response text", this.responseText);
		console.log("status text", this.statusText);
		console.log("status code", this.status);
	};

	var onSubmit = function(event){
		event.preventDefault();
		results.style.visibility = "visible";
		var request = new XMLHttpRequest();
		request.addEventListener("load", responseHandler);
		request.addEventListener("error", requestFailed);

		var submit = document.querySelector('#search-input');
		var url = submit.value;
		keyword = url;
		var fullUrl = encodeURI(endPoint + url);

		console.log(fullUrl);
		request.open("GET", fullUrl);
		// send the request
		request.send();

	}

	var showDetails = function(event){
		// clear old details 
		showDetailElem.innerHTML = "";

		// inject movie details into show-details
		var title = document.createElement("h3");
		console.log(event.target);
		let movieId = results.value;
		title.textContent = movieDB[movieId].name;
		showDetailElem.appendChild(title);

		if (movieDB[movieId].img !== null) {
			let picture = document.createElement("img");
			picture.src = movieDB[movieId].img;
			showDetailElem.appendChild(picture);
		}


	}

	var results = document.querySelector("#show-select");
	// console.dir(results);
	results.style.visibility = "hidden";

	document.querySelector('#submit').addEventListener('click', onSubmit);

	// insert eventlistner for show-detail when show-select is changed
	document.querySelector('#show-select').addEventListener('change', showDetails);

}