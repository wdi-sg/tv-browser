// API Docs at:
// http://www.tvmaze.com/api
var response = []
var search;

// makes submit button work only when HTML is fully loaded
window.onload = function() {
    document.querySelector("button").addEventListener('click', submit);
}

// submit function and all the ajax crap
function submit() {
    var input = document.querySelector('#show-search');
    search = input.value;
    console.log(search);

    // add new new request
    var request = new XMLHttpRequest();

    // handle response and then runs the function for the results
    var responseHandler = function() {
      console.log(this.responseText);
      response = JSON.parse( this.responseText );
      console.log( response );
      resultSearch();
    };

    // listen for the request response
    request.addEventListener("load", responseHandler);
    request.addEventListener("error", requestFailed);

    // call open & specify the url with search value
    //CHANGE SEARCH AFTER Q= SOMEHOW WHEN YOU GO HOME UH UH
    request.open("GET", "http://api.tvmaze.com/search/shows?q="+search);

    // send the request
    request.send();

    var requestFailed = function(){
        console.log("response text", this.responseText);
        console.log("status text", this.statusText);
        console.log("status code", this.status);
    };

    // do this if something went wrong
    request.addEventListener("error", requestFailed);
}

//runs a loop for all search results to create an option element and then adds the name of the show as the text
function resultSearch () {
    //deletes options for every search
    document.getElementById('show-select').innerHTML = '';
    //recreate initial option each time
    var placeHolder = document.createElement("option");
    placeHolder.textContent = "Select a show...";
    document.getElementById('show-select').appendChild(placeHolder);
    for ( var i = 0; i < response.length; i++) {
        var options = document.createElement("option");
        options.setAttribute('value', response[i].show.id)
        options.textContent = response[i].show.name;
        document.querySelector("#show-select").appendChild(options);
    }
}

// function selectShow () {
//     var i = document.querySelector('#show-select').selectedIndex;
//     var options = response[(i-1)];
//     console.log(options);
//         // create elements to house following
//         // general starting path = response.
//         //picture of show = response.show.image.medium
//         //name of show = response.show.name
//         //rating of show = response.show.rating
//         //summary of show = response.show.summary
//     var details = document.getElementById('show-detail');
//     var showImg = options.show.image.medium;
//     var showName = options.show.name;
//     var showSummary = options.show.summary;

//     details.innerHTML = '';
//         //create image tag, set src to link, append to parent div
//     var createImg = document.createElement('img');
//     createImg.setAttribute('src', showImg);
//     details.appendChild(createImg);

//     var createName = document.createElement('h1');
//     createName.innerHTML = showName;
//     details.appendChild(createName);

//     var createSummary = document.createElement('div');
//     createSummary.innerHTML = showSummary;
//     details.appendChild(createSummary);

// }








    var optResponse = [];

function selectShow () {
    var selectedId = document.getElementById('show-select').value;
        // add new new request
    var request = new XMLHttpRequest();

    // handle response and then runs the function for the results
    var responseHandler = function() {
        optResponse = JSON.parse( this.responseText );
        console.log(optResponse);
        var details = document.getElementById('show-detail');
        var showImg;
        var showName = optResponse.name;
        var showSummary = optResponse.summary;



        details.innerHTML = '';
            //create image tag, set src to link, append to parent div

        if (optResponse.image == null) {
            showImg = "Image not available";
            var notAvailable = document.createElement('div');
            notAvailable.innerHTML = showImg;
            details.appendChild(notAvailable);
        } else {
            showImg = optResponse.image.medium;
            var createImg = document.createElement('img');
            createImg.setAttribute('src', showImg);
            details.appendChild(createImg);
        }

        var createName = document.createElement('h1');
        createName.innerHTML = showName;
        details.appendChild(createName);

        var createSummary = document.createElement('div');
        createSummary.innerHTML = showSummary;
        details.appendChild(createSummary);
    };

    // listen for the request response
    request.addEventListener("load", responseHandler);
    // request.addEventListener("error", requestFailed);

    // call open & specify the url with search value
    request.open("GET", "http://api.tvmaze.com/shows/"+selectedId);

    // send the request
    request.send();

}