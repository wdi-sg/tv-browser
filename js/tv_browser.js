// API Docs at:
// http://www.tvmaze.com/api

window.onload = function() {
	
	var url = "http://api.tvmaze.com/search/shows?q=";
	var hide = document.getElementsByTagName("select"); // initially hide select tag
	hide[0].style.display = "none"

//** create function to handle response received.**

	var responseHandler = function() {
		console.log("response text", this.responseText);
		console.log("status text", this.statusText);
		console.log("status code", this.status);

		// change from STRING to javascript OBJECT via JSON.
		response = JSON.parse(this.responseText);
		console.log(response);

		//once response is received, LOOP through response ARRAY list.
		for(var i =0; i <response.length; i++) {
			var currentObject = response[i];
			var showName = currentObject.show.name;  // obtain NAME VALUE within SHOW OBJECT within RESPONSE ARRAY

		// create OPTION element tag to be added on to SELECT dropdown tag.
		var addOption = document.createElement("option");
			addOption.value = showName; 	// assign  OPTION VALUE with OBJECT name.
			addOption.text = showName;		// assign OPTION TEXT with OBJECT name.

		// append child element newOption to parent element selectDropdown.
		var selectDropdown = document.getElementById("show-select");
			selectDropdown.style.display = "block";   // set SELECT tag to display: block when input is entered
			selectDropdown.appendChild(addOption);
		};
	};



//** Standard creation of AJAX new request**

	// create Global variable to make a new request
	var request = new XMLHttpRequest();

	// add Event Listener to submit button.
	var button = document.getElementById("submit-button");
	button.addEventListener("click", function() {

		// obtain VALUE from INPUT tag.
		showSearch = document.getElementById("show-search").value;

		// ready the system by calling open, and specifying the url + showSearch input value.
		request.open("GET", url + showSearch);

		// send the request
		request.send();

		// listen for the request sent to server. If there is a response, callback function is executed.
		request.addEventListener("load", responseHandler);
	});



//**What happens when option from dropdown is selected.**

	var selectTag = document.getElementById("show-select");

	selectTag.addEventListener("change", function() {   // event listener to detect for changes in show-select. 
		var currentObject;
		var selectedOption = this.value;	// value of selected element. In **this** case, element is an OPTION
		console.log("Selected Option: " + selectedOption);

		// response retains its assigned value because responseHandler function was executed above.

		for(var i = 0; i < response.length; i++) {		// loop through response list and obtain OBJECT name. 
			var currentObject = response[i];
			console.log(currentObject.show.name);	// will log show.name value

			if (selectedOption === currentObject.show.name) {	//if selected OPTION value equals to OBJECT name
				var name = currentObject.show.name;		
				var img = currentObject.show.image.medium;	
				var summary = currentObject.show.summary;

//**create elements to display details under show-detail DIV tag.**

				var displayName = document.createElement("p");	// create element to display show's name
				displayName.innerHTML = name;

				var displayImg = document.createElement("img");	// create element to display show's image
				displayImg.src = img;

				var displaySum = document.createElement("p");	// create element to dosplay show's summary
				displaySum.innerHTML = summary;

				// append child to parent show-detail DIV tag.
				var showDetail = document.getElementById('show-detail');
				showDetail.appendChild(displayName);
				showDetail.appendChild(displayImg);
				showDetail.appendChild(displaySum);
			};
		};
	}); // change event listener will execute this entire function above.



//** create function if request failed and sendback a response.
	var requestFailed = function(){
		console.log("response text", this.responseText);
		console.log("status text", this.statusText);
		console.log("status code", this.status);
		alert("Sorry page is not working");
	};
	request.addEventListener("error", requestFailed);

}; // all these happen under window onload

