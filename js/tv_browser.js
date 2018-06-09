// API Docs at:
// http://www.tvmaze.com/api

// window.onload = function() {

var displayArea = document.querySelector('#show-detail')
var selectShow = document.querySelector('#show-select')

function responseHandler() {
	var data = JSON.parse(this.responseText)
	
	console.log(data)
	selectShow.setAttribute("style", "display: block")
	var optionDefault = "Select a show..."
	selectShow.innerHTML = '<option value="">' + optionDefault + '</option>'
	
	// push titles to options ----------------------------------------
	for (var i = 0; i < data.length; i++) {
		var option = document.createElement('option')
		option.textContent = data[i].show.name
		option.setAttribute("id", data[i].show.id)
		selectShow.appendChild(option)
	}
	// displayAllStuff(data)
}


// display items on DOM -------------------------------------------
// function displayAllStuff(data) {

// 	for (var i = 0; i < data.length; i++) {
// 		var title = document.createElement('h2');
// 		var summary = document.createElement('div');
// 		var image = document.createElement('img');

		// if (data[i].show.image === null) {
		// 	// do nothing
		// } else {
		// 	image.setAttribute("src", data[i].show.image.medium)
		// }

// 		var showName = data[i].show.name
// 		var showSummary = data[i].show.summary

// 		title.innerHTML = showName
// 		summary.innerHTML = showSummary

// 		displayArea.appendChild(title)
// 		displayArea.appendChild(image)
// 		displayArea.append(summary)

// 	}
// }


function responseHandler2() {
	var oneShowData = JSON.parse(this.responseText)
	console.log(oneShowData);
	displayOneShow(oneShowData)
}


function displayOneShow(oneShowData) {

	var title = document.createElement('h1');
	var summary = document.createElement('div');
	var image = document.createElement('img');

	if (oneShowData.image === null) {
		// do nothing
	} else {
		image.setAttribute("src", oneShowData.image.medium)
	}

	var showName = oneShowData.name
	var showSummary = oneShowData.summary

	title.innerHTML = showName
	summary.innerHTML = showSummary

	displayArea.innerHTML = "";

	displayArea.append(title)
	displayArea.appendChild(image)
	displayArea.appendChild(summary)
}


function errorHandler() {
	console.log(this.statusText)
}


function newRequest(url) {
	var request = new XMLHttpRequest;
	request.addEventListener('load', responseHandler);
	request.addEventListener('error', errorHandler);
	request.open('GET', url);
	request.send();
}

function onClick() {
	var searchQuery = document.querySelector('#show-search').value
	var url = "http://api.tvmaze.com/search/shows?q=" + encodeURIComponent(searchQuery);
	newRequest(url);
}

// create another ajax call to access individual information

function requestShow(url2) {
	var request2 = new XMLHttpRequest;
	request2.addEventListener('load', responseHandler2);
	request2.addEventListener('error', errorHandler);
	request2.open('GET', url2);
	request2.send();
}

function onClickSelect() {
	var theChosenIndex = selectShow.selectedIndex;
	var theChosen = selectShow.options;
	var theChosenId = theChosen[theChosenIndex].id;

	var url2 = "http://api.tvmaze.com/shows/" + theChosenId
	requestShow(url2);
	
}

document.querySelector('button').addEventListener('click', onClick);

selectShow.addEventListener('change', onClickSelect)



// }