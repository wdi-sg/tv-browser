// API Docs at:
// http://www.tvmaze.com/api


var getInput = function(){
    // Get userInput
    const userInput = document.getElementById('show-search').value;
    const userInputLower = userInput.toLowerCase();

    // Ready the system by calling open and specifying URL
    // request.open("GET", `http://api.tvmaze.com/search/shows?q=${userInputLower}`);
    request.open("GET", `http://api.tvmaze.com/search/shows?q=${userInputLower}`);

    // Listen for the request response
    request.addEventListener("load", responseHandler);

    // Send the request
    request.send();
}

const button = document.querySelector('button');
button.addEventListener('click', getInput);

// Make a new request
var request = new XMLHttpRequest();

var response;

var responseHandler = function(){
    response = JSON.parse(this.responseText);
    console.log(response);

    //Show in Options
    const showSelect = document.getElementById('show-select');
    for(let i=0; i<response.length; i++){
        const option = document.createElement('option');
        option.value = i;
        option.textContent = response[i]["show"].name;
        option.className = 'hello';
        showSelect.appendChild(option);
    }

    showSelect.addEventListener('change', optionSelect);
}






//////////////////////////////////////////////////////////Select Option


// Make a new request
var showRequest = new XMLHttpRequest();

var showResponseHandler = function(){
    var show = document.createElement('div');
    show.innerHTML = this.responseText;

    const body = document.querySelector('body');
    body.appendChild(show);
}

showRequest.addEventListener('load', showResponseHandler);

var showSelectionNum;

var optionSelect = function(event){
    showSelectionNum = event.target.value;
    var URL = response[showSelectionNum]["show"].url;

    // get request
    showRequest.open("GET", URL);

    // Send request
    showRequest.send();
}