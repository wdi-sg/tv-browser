// API Docs at:
// http://www.tvmaze.com/api

var nameMovieArray = [];


// This function runs when the server responds with an OK message and some response text. It sets the textContent of the 'output' div to the response text.

  function responseHandler(){

   x = JSON.parse(this.responseText);

    for (i=0; i < x.length; i++) {
    var result = x[i].show.name;
    nameMovieArray.push(result)
    console.log(result);
    document.getElementById('output').textContent = nameMovieArray;
    }
};
// This function runs when the server returns an error
  function errorHandler(){
   document.getElementById('output').textContent = this.statusText;
  };

// This function sends an AJAX request to GET data from a given url (passed in as a parameter).
  function sendRequest(url){
   var request = new XMLHttpRequest();
   request.addEventListener('load', responseHandler);
   request.addEventListener('error', errorHandler);
   request.open('GET', url);
   request.send();
  };

// This function runs when the button is clicked. It gets the value of the input field, which is expected to be some number. Then it passes it into the Javascript encodeURIComponent function, which converts it to a string that can be passed as a URL. THen it adds it to a 'base' URL which is where we are passing the user's search into. Finally, it takes the constructed URL and passes it into the sendxhr function.
  function onBtnClick(){
   var input = document.getElementById('show-search');
   var searchQuery = input.value;
   var url = 'http://api.tvmaze.com/search/shows?q=' + searchQuery;
   sendRequest(url);
  };

// To tie everything together, we make the above onBtnClick function run when the button is clicked, by adding an event listener.
  document.getElementById('btn').addEventListener('click', onBtnClick);