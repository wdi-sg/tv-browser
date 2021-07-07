
// Declaring global variables
var endpointURL = "http://api.tvmaze.com/search/shows?q=";

var inputBtn = document.querySelector("#show-search");
var submitBtn = document.querySelector("#submitBtn");
var selectBtn = document.querySelector("#show-select");
var castBtn = document.querySelector("h3");

var searchString;
var query;

// Function that fetches data from the API endpoint
const fetchListOfShows = () => {

    document.querySelector("#show-select").style.visibility = "visible"

    endpointURL = "http://api.tvmaze.com/search/shows?q="

    query = inputBtn.value;

    searchString = endpointURL.concat(query);

    var request = new XMLHttpRequest();

    // listen for the request response
    request.addEventListener("load", handleDataShowList);

    // ready the system by calling open, and specifying the url
    // open doesn't open anything??
    request.open("GET", searchString);

    // send the request
    request.send();

}

const fetchShow = () => {

    endpointURL = "http://api.tvmaze.com/singlesearch/shows?q="

    query = selectBtn.value;

    searchString = endpointURL.concat(query);

    var request = new XMLHttpRequest();

    // listen for the request response
    request.addEventListener("load", handleDataOneShow);

    // ready the system by calling open, and specifying the url
    // open doesn't open anything??
    request.open("GET", searchString);

    // send the request
    request.send();

}

const fetchCastInfo = function(id) {

    console.log('cast function called')

    endpointURL = `http://api.tvmaze.com/shows/${id}/cast`

    var request = new XMLHttpRequest();

    // listen for the request response
    request.addEventListener("load", handleCastInfo);

    // ready the system by calling open, and specifying the url
    // open doesn't open anything??
    request.open("GET", endpointURL);

    // send the request
    request.send();

}

// AddEventListeners
// inputBtn.addEventListener('change', fetchListOfShows);
submitBtn.addEventListener('click', fetchListOfShows);
selectBtn.addEventListener('change', fetchShow);


// Function to handle data received from API
var handleDataShowList = function() {

    var dataObject = JSON.parse(this.responseText)

    for (i = 0; i < dataObject.length; i ++) {
        var nameOfShow = dataObject[i].show.name;
        var showId = dataObject[i].show.id;
        // console.log(nameOfShow)
        // console.log(showId)

        var createOptions = document.createElement('option');
        createOptions.setAttribute('id', showId);
        createOptions.textContent = nameOfShow;

        document.querySelector("#show-select").appendChild(createOptions)
    }
};

// Function to handle data received from API
var handleDataOneShow = function() {

    var dataObject = JSON.parse(this.responseText)

    console.log(dataObject)

    var nameOfShow = dataObject.name;
    var imageURL = dataObject.image.original
    var summary = dataObject.summary;
    var id = dataObject.id;


    var imgElement = document.createElement('img');
    var h2Element = document.createElement('h2');
    var divElement = document.createElement('div');
    var h3Element = document.createElement('h3');

    imgElement.src = imageURL;
    h2Element.innerHTML = nameOfShow;
    divElement.innerHTML = summary;
    h3Element.textContent = "Cast of Show"

    h3Element.addEventListener("click", function() { fetchCastInfo(id) });

    document.querySelector("#show-detail").appendChild(imgElement)
    document.querySelector("#show-detail").appendChild(h2Element)
    document.querySelector("#show-detail").appendChild(divElement)
    document.querySelector("#show-detail").appendChild(h3Element)



};

var handleCastInfo = function() {

    var dataObject = JSON.parse(this.responseText)

    for (i = 0; i < dataObject.length; i ++) {
        var characterName = dataObject[i].character.name;
        var personName = dataObject[i].person.name;

        var newP = document.createElement('p');
        newP.textContent = `${personName}........${characterName}`

        console.log(newP.textContent)

        document.querySelector("#show-detail").appendChild(newP)
    }

}