var submitButton = document.getElementById("submit")

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
            var dropDownDisplay = document.getElementById("show-select");
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