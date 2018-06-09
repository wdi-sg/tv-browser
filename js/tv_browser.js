// API Docs at:
// http://www.tvmaze.com/api

// API Docs at:
// http://www.tvmaze.com/api

 var doSubmit = function(event){

  var input = document.querySelector('#show-search');
  var url = 'http://api.tvmaze.com/search/shows?q=' + input.value;
  var optionList = document.querySelector('#show-select') 

  var responseHandler = function() {
    console.log("response text", this.responseText);
    var response = JSON.parse( this.responseText );
    console.log( response );
    for (var i = 0; i < response.length; i++) {
    	console.log(response[i].show.name)
      // optionList.createEleme = <option>response[i].show.name</option>.
      console.log('hi')
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

  var requestFailed = function(){
    console.log("response text", this.responseText);
    console.log("status text", this.statusText);
    console.log("status code", this.status);
  };
  request.addEventListener("error", requestFailed);

};
document.querySelector('#submit').addEventListener('click', doSubmit);