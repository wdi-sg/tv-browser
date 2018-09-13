

window.onload = function(){


    console.log("hello");

    var responseHandler = function() {

        var results = JSON.parse(this.responseText);

        console.log(results);

        for (var i = 0; i < results.length; i++) {
            if ( results[i].show.image != null ) {
                var img = document.createElement("img");
                img.setAttribute("class", "images");
                img.src = results[i].show.image.medium;
                var src = document.getElementById("show-detail");
                src.appendChild(img);
            };
        };
    };

    var request = new XMLHttpRequest();

    request.addEventListener("load", responseHandler);

    var requestFailed = function() {
        console.log("response text", this.responseText);
        console.log("status text", this.statusText);
        console.log("status code", this.status);
    };
    request.addEventListener("error", requestFailed);

    var doSubmit = function(event) {
        clearPreviousSearch();
        var search = document.getElementById("show-search");
        var input = search.value;
        console.log("working");
        request.open("GET", "http://api.tvmaze.com/search/shows?q=" + input);
        request.send();

        if ( input != "" ) {
            document.getElementById("show-select").style.display = "block";
        };
    };

    var clickOption = function(genre) {
        var input = genre.value;
        request.open("GET", "http://api.tvmaze.com/search/shows?q=" + genre);
        request.send();
    }

    var clearPreviousSearch = function() {
        var myNode = document.getElementById("show-detail");
        while ( myNode.firstChild ) {
            myNode.removeChild(myNode.firstChild);
        };
    };

    document.getElementById("submit").addEventListener("click", doSubmit);

    var options = document.getElementById("show-select");

    options.addEventListener("change", function() {
        clearPreviousSearch();
        clickOption(this.value);
    }, false);




















































};




