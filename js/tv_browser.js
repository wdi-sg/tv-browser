// API Docs at:
// http://www.tvmaze.com/api

//AJAX
request.addEventListener("load", responseHandler);
request.open("GET", "http://api.tvmaze.com/search/shows?q=girls");
request.send();


let request = new XMLHttpRequest();
let response = [];

const ele_select = document.querySelectorAll('select')[0];
const ele_button = document.querySelectorAll('button')[0];


const responseHandler = function(){
	response = JSON.parse(this.responseText);
};

const inputHandler = function(){
	let user_input = document.querySelectorAll('input')[0].value;
	for (i = 0; i < response.length; i++){
		if (response[i].show.name.toLowerCase().includes(user_input.toLowerCase())){
			let ele_option = document.createElement('option');
			ele_select.appendChild(ele_option);
			ele_option.innerHTML = response[i].show.name;
		};
	};
};

const getURL = function(name_of_film){
	for (i = 0; i < response.length; i++){
		if (response[i].show.name === name_of_film){
			return response[i].show.url;
		};
	};
};

const getImage = function(name_of_film){
	for (i = 0; i < response.length; i++){
		if (response[i].show.name === name_of_film){
			return response[i].show.image.medium;
		};
	};
};

//eventlisteners
ele_button.addEventListener('click', function(event){
	let user_input = document.querySelectorAll('input')[0].value;
	inputHandler();
	ele_select.removeAttribute('id');
	document.querySelector('option').innerHTML = `Shows matching "${user_input}"`;
});




ele_select.addEventListener('change', function(event){
	responseHandler;
	let user_input = document.querySelectorAll('input')[0].value;
	let image = document.createElement('img')
		image.src = getImage(event.target.value);
	document.querySelector('#show-detail').innerHTML = event.target.value;
	document.querySelector('#show-detail').appendChild(image);

	// window.open(getURL(event.target.value));
});








