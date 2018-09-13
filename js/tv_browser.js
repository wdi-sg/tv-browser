// API Docs at:
// http://www.tvmaze.com/api
window.onload = function() {

  //function to handle response
  var url = "http://api.tvmaze.com/search/shows?q=girls";
  var responseHandler = function() {
  	console.log("response text", this.responseText);
  	console.log("status text", this.statusText);
  	console.log("status code", this.status);
  	response = JSON.parse(this.responseText);
  	console.log(response);


  	for(var i = 0; i < response.length; i++) {
  		var currentObject = response[i];
  		var showName = currentObject.show.name;
  		var addOption = document.createElement("option");
  			addOption.value = showName;
  			addOption.text = showName;

  		var selectDropdown = document.getElementById("show-select");
  			selectDropdown.style.display = "block";
  			selectDropdown.appendChild(addOption);
  		};
  	};
  };

  // create new request
  var request = new XMLHttpRequest();
  var button = document.getElementById("submit-button");

  button.addEventListener("click", function() {
  	showSearch = document.getElementById("show-search").value;
  	request.open("GET", url + showSearch);
  	request.send();
  	request.addEventListener("load", responseHandler);
  });

};
