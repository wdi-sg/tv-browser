// API Docs at:
// http://www.tvmaze.com/api

window.onload = function(){
    // what to do when we recieve the request
    var responseHandler = function() {
      console.log("response text", this.responseText);
      var response = JSON.parse( this.responseText );
    };

    var doSubmit = function(){
        var input = document.querySelector("#show-search");
        var url = " http://api.tvmaze.com/search/shows?q=" + input.value;

        //console.log( response )
        // make a new request
        var request = new XMLHttpRequest();

        // listen for the request response
        request.addEventListener("load", responseHandler);

        // ready the system by calling open, and specifying the url
        request.open("GET",  url);
        // send the request
        request.send();
    }

    document.querySelector("#submit").addEventListener('click', doSubmit);
}


