// API Docs at:
// http://www.tvmaze.com/api
var request = new XMLHttpRequest();

function everything() {
	var input = document.querySelector('#show-search');
	var showSearch = input.value;

    var responseHandler = function() {
      	console.log("response text", this.responseText);
      	var response = JSON.parse(this.responseText);
      	console.log(response);
    };

	request.addEventListener("load", responseHandler);

	request.open("GET","http://api.tvmaze.com/search/shows?q=" + showSearch);

	request.send();

};

document.querySelector('#submit').addEventListener('click', everything);



