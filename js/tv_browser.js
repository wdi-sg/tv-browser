// API Docs at:
// http://www.tvmaze.com/api
var url;
var response;
var main = document.getElementsByTagName('main')[0];
var showSelect = document.getElementById('show-select');

function load() {

	var request = new XMLHttpRequest();

	request.open('GET', url);

	function changeEventHandler() {

		var selectRemove = document.getElementById('container');
		if (selectRemove != null) {
			selectRemove.parentNode.removeChild(selectRemove);
		}

 		var container = document.createElement('div');
 		container.id = 'container';
 		var addText = document.createElement('h1');
		var addOn = document.createElement('div');
		var addPic = document.createElement('img');
		for (var i = 0; i < response.length; i++) {
		 if (response[i].show.name == this.value) {
		 	addText.textContent = response[i].show.name;
		 	addPic.src = response[i].show.image.medium;
			addOn.innerHTML = response[i].show.summary;
		 };
		};
		container.appendChild(addPic);
		container.appendChild(addText);
		container.appendChild(addOn);
		main.appendChild(container);

	};

	request.addEventListener('load', function () {
		console.log(this.responseText);
		response = JSON.parse(this.responseText);
		showSelect.onchange = changeEventHandler;

 		for (var i = showSelect.childNodes.length-1; i > 1; i--) {
 			showSelect.removeChild(showSelect.childNodes[i]);
 		};


		for (var i = 0; i < response.length; i++) {
			var nameOfShow = response[i].show.name;
			var value = document.createElement('option');
			value.textContent = nameOfShow;
			showSelect.appendChild(value);

		};


		// showSelect[1].addEventListener('select', function(){
		// 	console.log(this);
		// });
	} );



	


	request.send();
};



window.onload = function() {

	document.getElementById('button').addEventListener('click', function () {
		var userInput = document.getElementById('show-search');
		url = 'http://api.tvmaze.com/search/shows?q=' + userInput.value;

		load();
	});
	
	

};