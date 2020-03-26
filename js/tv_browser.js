// API Docs at:
// http://www.tvmaze.com/api


var getInput = function(){
    // Get userInput
    const userInput = document.getElementById('show-search').value;
    const userInputLower = userInput.toLowerCase();

    // Ready the system by calling open and specifying URL
    request.open("GET", `http://api.tvmaze.com/search/shows?q=${userInputLower}`);

    // Send the request
    request.send();
}

const button = document.querySelector('button');
button.addEventListener('click', getInput);

// Make a new request
var request = new XMLHttpRequest();

var responseHandler = function(){
    var response = JSON.parse(this.responseText);
    console.log(response);

    //Show in Options
    const showSelect = document.getElementById('show-select');
    for(let i=0; i<response.length; i++){
        const option = document.createElement('option');
        option.value = "";
        option.textContent = response[i]["show"].name;
        showSelect.appendChild(option);
    }
}

// Listen for the request response
request.addEventListener("load", responseHandler);