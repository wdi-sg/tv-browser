// API Docs at:
// http://www.tvmaze.com/api

window.onload = function() {

    //Declare variables to get user response and to add it to search query.
    var showSearch = document.getElementById("show-search");
    var searchString = "https://cors.io/?http://www.tvmaze.com/search/shows?q=" + showSearch;    
   
    var submitButton = document.getElementById("submitButton");
    submitButton.addEventListener('click', function() {
    
    //Create response Handler function
    var responseHandler = function() {
        var response = JSON.parse( this.responseText );
        console.log(response);
        //Go through response array
        for (var i = 0; i<response.length; i++) {
            var target = response[i];
            var searchResult = target.show.name;
        //Make select box appear.
        var selectBox = document.getElementById("show-select");
        selectBox.style.display = 'block';
        //Create list of show results
        var resultSelection = document.createElement("option");
        resultSelection.value = searchResult;
        resultSelection.text = searchResult;
        selectBox.appendChild(resultSelection);
        
        }
    }

    //AJAX Request
    var request = new XMLHttpRequest();
    request.addEventListener("load", responseHandler);
    request.open("GET", searchString);
    request.send();

    
    
    



    })
};