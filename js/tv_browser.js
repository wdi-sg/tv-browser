// API Docs at:
// http://www.tvmaze.com/api

window.onload = function() {

    var request = new XMLHttpRequest();

    var selection = document.getElementById("show-select");
    var allOptions = document.getElementsByTagName("option");
    var tvNames;
    var listCast;

    var responseHandler = function() {

        console.log("response text", JSON.parse(this.responseText));
        console.log("status text", this.statusText);
        console.log("status code", this.status);
        tvNames = JSON.parse(this.responseText);

        while (allOptions[0].nextSibling !== null) {

            selection.removeChild(allOptions[0].nextSibling);
        }

        tvNames.forEach(function(element) {

            var option = document.createElement("option");
            option.setAttribute( "value", element.show.name);
            option.textContent = element.show.name;
            selection.appendChild(option);

        });

        selection.style.visibility = "visible";

    };


    var requestFailed = function(){
      console.log("response text", this.responseText);
      console.log("status text", this.statusText);
      console.log("status code", this.status);
    };

    function getInput() {

        var input = document.querySelector("input");
        allOptions[0].innerHTML = "Shows matching " + input.value + "...";
        var url = "http://api.tvmaze.com/search/shows?q=" + input.value;

        request.addEventListener("load", responseHandler);

        request.open("GET", url);

        request.send();

        request.addEventListener("error", requestFailed);


    }

    document.querySelector("button").addEventListener("click", getInput);

    var renderDetails = function() {

        var parent = document.getElementById("show-detail");

        while (parent.firstChild) {

            parent.removeChild(parent.firstChild);

        }

        var selected = this.value;
        var title = document.createElement("h2");
        title.innerHTML = selected;
        parent.appendChild(title);

        if (tvNames[this.options.selectedIndex - 1].show.image !== null) {

            var image = document.createElement("img");
            image.setAttribute("src", tvNames[this.options.selectedIndex - 1].show.image.medium);
            parent.appendChild(image);

        }

        if (tvNames[this.options.selectedIndex - 1].show.summary !== null) {
            var summary  = document.createElement("p");
            summary.innerHTML = tvNames[this.options.selectedIndex - 1].show.summary;
            parent.appendChild(summary);
        }

    };


    selection.addEventListener("change", renderDetails);



}