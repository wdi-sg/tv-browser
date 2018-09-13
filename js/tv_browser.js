// API Docs at:
// http://www.tvmaze.com/api

window.onload = function(){
    // what to do when we recieve the request
    var responseHandler = function() {
      console.log("response text", this.responseText);
      var response = JSON.parse( this.responseText );
      var arrayShowName = [];

      for (var i = 0; i < response.length; i++){
        var getDiv = document.getElementById("show-select");
        var getOption = document.createElement("option");
        getOption.innerHTML = response[i].show.name;
        getDiv.appendChild(getOption);
        //Display show name on the front page below the search button
        // var showDetailId = document.getElementById(“show-detail”);
        // var createPTag = document.createElement(“P”);
        // createPTag.textContent = response[i].show.name;
        // showDetailId.appendChild(createPTag);
      }

      document.querySelectorAll('option').addEventListener('change', function(){
        console.log()

        // var url2 = "http://api.tvmaze.com/singlesearch/shows?" + this.value;
        // var request2 = new XMLHttpRequest();
        // request2.open("GET", url2);
        // request2.send();

      })



    };

    // var responseHandler2 = function(){

    // }



    var input = document.querySelector("#show-search");

    var doSubmit = function(){
        var url = "http://api.tvmaze.com/search/shows?q=" + input.value; //must be the whole address

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

    // var makeAnotherRequest = function(){


    // }

    document.querySelector("#submit").addEventListener('click', doSubmit);
}


