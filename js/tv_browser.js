var webSite = "http://www.tvmaze.com/api";




var searchText = document.getElementById('show-search');
var submitButt = document.getElementById('submit');
var dropDown = document.getElementById('show-select');
var response;

var submitSearch = function(event){
    var searchWord = searchText.value
    var url = `http://api.tvmaze.com/search/shows?q=${searchWord}`;
    var responseHandler = function() {
        var response = JSON.parse( this.responseText );
        console.log( response );
        for (let i=0; i<response.length; i++) {
            var option = document.createElement('option');
            option.innerText = response[i].show.name;
            option.setAttribute('class',[i]);
            dropDown.appendChild(option);
            dropDown.addEventListener('change', renderShow);
            
        }
    };
    // make a new request
    var request = new XMLHttpRequest();
    // listen for the request response
    request.addEventListener("load", responseHandler);
    // ready the system by calling open, and specifying the url
    request.open("GET", url);
    // send the request
    request.send();
}

submitButt.addEventListener('click', submitSearch);


//===================================================================



var renderShow = function(event) { 
    console.log("rendering...");
    var responseHandler = function() {
        var response = JSON.parse( this.responseText );
        console.log(response);

        for (let i=0; i<response.length; i++) {
            var display = document.createElement('display');
            display.innerText = response[i].show.name;
            display.setAttribute('class',[i]);
            body.appendChild(display);
            
            
        }

    }
}


  



