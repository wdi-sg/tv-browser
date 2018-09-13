// API Docs at:
// http://www.tvmaze.com/api

window.onload = function(){
    var api = "http://api.tvmaze.com/search/shows?q="
    // make a new request

    var responseHandler = function() {
        //console.log("response text", this.responseText);
        var response = JSON.parse( this.responseText );
        console.log( response );
        //returns an array of objects
        for (var i = 0; i < response.length; i++){
            var showSelect = document.getElementById("show-select");
            var arrayShows = response[i];
            var showName = arrayShows.show.name;

            //create new element option
            var optionElement = document.createElement("option");

            //attach elements
            optionElement.textContent = showName;
            optionElement.value = showName;

            //append to show select div
            showSelect.appendChild(optionElement);
        }
            //selecting an option (one show) from the options list
            document.querySelector('#show-select').addEventListener('change', function(){

                //new AJAX request
                var request = new XMLHttpRequest();

                //Using the single show search URL
                var showApi = "http://api.tvmaze.com/singlesearch/shows?q=";

                //console.log(this.value);
                //sending request (one show search based on the change event)
                request.open("GET", showApi + this.value);
                request.send();

                //Listener to receive request
                request.addEventListener("load", function(){
                    var oneResponse = JSON.parse( this.responseText );

                    var showDetail = document.getElementById("show-detail");
                    //returns an object
                    console.log(oneResponse.summary);
                    console.log(oneResponse.image.medium);

                    var oneShowname = oneResponse.name;
                    var oneImage = oneResponse.image.medium;
                    var oneSummary = oneResponse.summary;

                    //create new elements
                    var oneShownameElement = document.createElement("p");
                    var oneImageElement = document.createElement("img");
                    var oneSummaryElement = document.createElement("div");

                    //attach elements
                    oneShownameElement.textContent = oneShowname;
                    oneImageElement.src = oneImage;
                    oneSummaryElement.innerHTML = oneSummary;

                    //append to show-details div
                    showDetail.appendChild(oneShownameElement);
                    showDetail.appendChild(oneImageElement);
                    showDetail.appendChild(oneSummaryElement);
                })
            })

    };

    var request = new XMLHttpRequest();

    var doSubmit = function(event){
        var input = document.querySelector('#show-search');
        var search = input.value;
        request.open("GET", api + search);
        request.send();
    };

    document.querySelector('#submit').addEventListener('click', doSubmit);

    // listen for the request response
    request.addEventListener("load", responseHandler);

}
