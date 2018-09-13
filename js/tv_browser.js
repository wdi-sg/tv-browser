// API Docs at:
// http://www.tvmaze.com/api
var inputText = document.getElementsByTagName("input")[0];
var button = document.getElementsByTagName("button")[0];
var showD = document.getElementsByClassName("grid-container")[0];
var input = new XMLHttpRequest();
var input2 = new XMLHttpRequest();
var select = document.getElementById("show-select");




// join elements of an array into a string. to turn show genres from array into a string.

var stringed = function(arr) {
	var str = arr.join("/ ");
	return str;
}


// display search results in a grid form

var displayResults = function() {
	var responseList = JSON.parse(this.responseText);
	showD.innerHTML = "";
	select.style.display = "block";
	select.innerHTML = "<option value=''>Shows matching '" + inputText.value + "'...</option>"
	for (var i = 0; i < responseList.length; i++) {
		var response = responseList[i].show;
		if (response.image === null) {
			var image = "#";
		} else {
			image = response.image.medium;
		}
		var text = "<div class='grid-item'><img src=" + image + "></div><div class='grid-item'><p>Title: " + response.name + "</p><p>Language: " + response.language + "</p><p>Genre: " + stringed(response.genres) + "</p><p>Duration: " + response.runtime + " minutes</p></div>";
		var option = "<option value='" + response.name + "'>" + response.name + "</option>"
		showD.innerHTML += text;
		select.innerHTML += option;
	}
}


// render the show

var seeShow = function() {
	var query = JSON.parse(this.responseText)
	var choice = query[0].show;
	if (choice.image === null) {
			var image = "#";
		} else {
			image = choice.image.medium;
		}
	showD.innerHTML = "<div class='grid-item'><img src=" + image + "></div><div class='grid-item'><p>Title: " + choice.name + "</p><p>Language: " + choice.language + "</p><p>Genre: " + stringed(choice.genres) + "</p><p>Duration: " + choice.runtime + " minutes</p></div>"
	window.open(choice.url, "_blank");
}


// send get request for list of shows

var getShows = function() {
	var query = inputText.value;
	input.addEventListener("load", displayResults);
	input.open("GET", "http://api.tvmaze.com/search/shows?q=" + query);
	input.send();
}


// send get request for selected show

var selectShow = function() {
	var choice = select.value;
	console.log(choice);
	input2.addEventListener("load", seeShow);
	input2.open("GET", "http://api.tvmaze.com/search/shows?q=" + choice);
	input2.send()
}

button.addEventListener("click", getShows);
select.addEventListener("change", selectShow);