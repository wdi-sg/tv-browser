var submitButton = document.getElementById("submit")
var dropDownDisplay = document.getElementById("show-select");

var getResults = function() {
    var searchBar = document.getElementById("search-bar");
    var userQuery = searchBar.value;
    var endpoint = `http://api.tvmaze.com/search/shows?q=${userQuery}`;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", endpoint, true);
    xhr.send();

    xhr.onload = function() {
        if (this.status === 200) {
            //check to make sure request was successful
            //console.log(this.responseText);
            var results = JSON.parse(this.responseText);
            // console.log(results);

            //perform for loop on parsed results and use values to populate drop down
            var numOfResults = Object.keys(results).length;

            for (var i = 0; i < numOfResults; i++) {
                var dropDownResult = document.createElement("option");

                //string.replace default is to replace only first instance. g makes global
                var whiteSpaceName = results[i].show.name;
                dropDownResult.value = whiteSpaceName.replace(/ /g, "-");
                console.log(dropDownResult.value);

                dropDownResult.text = results[i].show.name;
                // console.log(dropDownResult.text);

                dropDownDisplay.add(dropDownResult)
            }
        }
    }
    // xhr.send();
};

submitButton.addEventListener("click", getResults);


var displaySelectedShow = function() {
    //clear the current show displayed
    var output = document.getElementById("show-detail");
    while (output.firstChild) {
        output.removeChild(output.firstChild);
    };

    // grabs the value of selected option using selectedIndex
    var selectedShow = dropDownDisplay.options[dropDownDisplay.selectedIndex].value;
    console.log(selectedShow);

    // endpoint changes to selected show's direct url
    var endpoint = `http://api.tvmaze.com/singlesearch/shows?q=${selectedShow}`;
    console.log(endpoint);

    var xhr = new XMLHttpRequest();
    xhr.open("GET", endpoint, true);
    xhr.send();

    xhr.onload = function() {
        if (this.status === 200) {
            //check to make sure request was successful
            // console.log(this.responseText);
            var results = JSON.parse(this.responseText);
            console.log(results);

            // var output = document.getElementById("show-detail"); declared above so should work

            var showImage = document.createElement("img");
            showImage.src = results.image.original; //dunno if need quotes
            output.appendChild(showImage);

            var showTitle = document.createElement("h1");
            showTitle.innerHTML = results.name;
            output.appendChild(showTitle);

            var showDescription = document.createElement("p");
            showDescription.innerHTML = results.summary;
            output.appendChild(showDescription);
        }
    }
};

dropDownDisplay.addEventListener("change", displaySelectedShow);