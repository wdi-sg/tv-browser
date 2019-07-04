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
            console.log(this.responseText);
            var results = JSON.parse(this.responseText);
            console.log(results);

            //create for loop on parsed results and use values to populate drop down
            var dropDownDisplay = document.getElementById("show-select");

            for (var i = 0, i > results something, i++) {
                var dropDownResults = document.createElement("select");
                dropDownResults.value = results[i].show.name;
                dropDownResults.text = results[i].show.name;
                dropDownDisplay.appendChild(dropDownResults);
            }//end of for loop, still inside onload function
        }
    }
    xhr.send();
};

submitButton.addEventListener("click", getResults);