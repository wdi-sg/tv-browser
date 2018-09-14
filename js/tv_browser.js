// API Docs at:
// http://www.tvmaze.com/api
window.onload = function(){
 // what to do when we recieve the request
    var responseHandler = function() {
        console.log("response text", this.responseText);
        console.log("status text", this.statusText);
        console.log("status code", this.status);
      var response = JSON.parse(this.responseText);
        //console.log("myresponse",response);
    //for loop to go thru the object>key
        for (var i = 0; i<response.length; i++){
        var mydetail = document.getElementById("show-select");
        var newoption = document.createElement("option");
        newoption.textContent = response[i].show.name;
        mydetail.appendChild(newoption);
    }

    var showSelect = document.getElementById("show-select");
    var showOption = document.getElementById("show-detail");
        showSelect.addEventListener('change',function(){

    var newUrl = "http://api.tvmaze.com/singlesearch/shows?q=" + this.value;
    var request2 = new XMLHttpRequest();
        request2.open("GET", newUrl);
        request2.send();
        request2.addEventListener("load", function(){
           var response2 = JSON.parse(this.responseText);
           console.log(response2);
            var getTitle = document.createElement("h2");
            getTitle.innerHTML = response2.name;
            showOption.appendChild(getTitle);
            console.log(response2);
        });






        //console.log(response[i].show.summary);

        // var getTitle = createElementById('h1');
        // getTitle.textContent = response
    })

        //debugger;


};
     var requestFailed = function(){
      console.log("response text", this.responseText);
      console.log("status text", this.statusText);
      console.log("status code", this.status);
    };
     // make a new request
    var request = new XMLHttpRequest();
     // listen for the request response
    // request.addEventListener("load", responseHandler);
    // request.addEventListener("error", requestFailed);
     // // ready the system by calling open, and specifying the url
    // request.open("GET", "https://swapi.co/api/people/1");
     // // send the request
    // request.send();
     var doSubmit = function(event){
        var input = document.querySelector('#show-search');
        var url = "http://api.tvmaze.com/search/shows?q="+ input.value;
        //put front link of the search
        request.addEventListener("load", responseHandler);
        request.addEventListener("error", requestFailed);
         // ready the system by calling open, and specifying the url
        request.open("GET", url);
         // send the request
        request.send();

    };
     document.querySelector('#submit').addEventListener('click', doSubmit);
 }


