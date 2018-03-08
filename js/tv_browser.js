// API Docs at:
// http://www.tvmaze.com/api


window.onload = function(){


	function hideSS() {
		document.getElementById("show-select").style.display = "none";
	}

	hideSS();

	function showSS(event) {
		event.preventDefault();

		document.getElementById("show-select").style.display = "block";
	}

	document.querySelectorAll('input')[1].addEventListener('click', showSS);

	var responseHandler = function() {
		console.log("response text", this.responseText);
		var response = JSON.parse( this.responseText );
		console.log( response );

		var moviesList = [];
		//for(var i = 0 ; i < response.length; i++){
		response.forEach(function(abc){
			moviesList.push(abc.show.name);
			var showDetail = document.getElementById("show-select");
			var addedOption = document.createElement("option");
			addedOption.textContent = String(abc.show.name);
			showDetail.appendChild(addedOption);
		})

		/*{
			moviesList.push(response[i].show.name);
			var showDetail = document.getElementById("show-select");
			var addedOption = document.createElement("option");
			addedOption.textContent = String(response[i].show.name);
			showDetail.appendChild(addedOption);
		}
*/
		console.log(moviesList);
	};

	var doSubmit = function(event){
		event.preventDefault();
		var input = document.querySelectorAll('input')[0];
		var url = "http://api.tvmaze.com/search/shows?q=" + String(input.value);
		var request = new XMLHttpRequest();

		request.addEventListener("load", responseHandler);

		request.open("GET", url);

		request.send();
	};

	document.querySelectorAll('input')[1].addEventListener('click', doSubmit);
}