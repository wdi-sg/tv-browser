var submitButton = document.getElementById("submit")
var dropDownDisplay = document.getElementById("show-select");

var getResults = function() {
    var searchBar = document.getElementById("search-bar");
    var userQuery = searchBar.value;
    var endpoint = `http://api.tvmaze.com/search/shows?q=${userQuery}`;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", endpoint, true);

    xhr.onload = function() {
        if (this.status === 200) {
            //check to make sure request was successful
            //console.log(this.responseText);
            var results = JSON.parse(this.responseText);
            console.log(results);

            //perform for loop on parsed results and use values to populate drop down
            var numOfResults = Object.keys(results).length;

            for (var i = 0; i < numOfResults; i++) {
                var dropDownResult = document.createElement("option");

                dropDownResult.value = results[i].show.name;
                console.log(dropDownResult.value);

                dropDownResult.text = results[i].show.name;
                console.log(dropDownResult.text);

                dropDownDisplay.add(dropDownResult)
            }//end of for loop, still inside onload function
        }
    }
    xhr.send();
};

submitButton.addEventListener("click", getResults);

//Attach an event listener to the select (NOT the option). When the user selects an option make another AJAX call. Use the response of that AJAX call to render the response of the individual show and display it in the output.

var displaySelectedShow = function() {
    // grab the value of that selected option >
    var selectedShow = dropDownDisplay.options[dropDownDisplay.selectedIndex].value;

    // selectedShow becomes the new query. i think can reuse endpoint variable. if not then change lor
    var endpoint= `http://api.tvmaze.com/singlesearch/shows?q=${selectedShow}`;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", endpoint, true);

    //this will return a SINGLE object with several keys (some are nested)
    xhr.onload = function() {
        if (this.status === 200) {
            //check to make sure request was successful
            console.log(this.responseText);
            var results = JSON.parse(this.responseText);
            console.log(results);

            var output= document.getElementById("show-detail");

            var showImage = document.createElement("img");
            showImage.src = results.image.original;
            output.appendChild(showImage);

            var showTitle = document.createElement("h1");
            showTitle.innerHTML = results.name;
            output.appendChild(showTitle);

            var showDescription= document.createElement("p");
            showDescription.innerHTML = results.summary;
            output.appendChild(showDescription);
        }
    }
};

dropDownDisplay.addEventListener("change", displaySelectedShow);