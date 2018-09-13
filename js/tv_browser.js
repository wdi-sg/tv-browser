// API Docs at:
// http://www.tvmaze.com/api

var submit = document.getElementById("submit_button");
submit.addEventListener("click", function() {
    var output = document.getElementById("show-search").value;
    console.log(output);

    var responseHandler = function() {
	  console.log("response text", this.responseText);
	  var response = JSON.parse(this.responseText);
	  var select = document.getElementById("show-select");
	  for (var i = 0; i < response.length; i++) {
	  	var out = response[i].show.name;
	  	var opt = document.createElement("option");
	  	opt.textContent = out;
	  	select.appendChild(opt);
	  }
	  console.log("status text", this.statusText);
	  console.log("status code", this.status);
	};

	var request = new XMLHttpRequest();
	request.addEventListener("load", responseHandler);
	request.open("GET", "http://api.tvmaze.com/search/shows?q=" + output);
	request.send();
});




