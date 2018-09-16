// Question: Use the input to get the search term from the user. Display the results in the dom.

//Changing raw JSON data from string type into a javascript object
var response;

//handling error requests
var requestFailed = function(){
  console.log("response text", this.responseText); //responseText is a universal terminology
  console.log("status text", this.statusText);
  console.log("status code", this.status);
};

//hide the dropdown bar until user clicks
var showSelect = document.getElementById('show-select');
showSelect.style.visibility = 'hidden';

//create button with event listener
var submitButton = document.querySelectorAll('Button')[0];
submitButton.addEventListener("click", userInput);

// make a new request
var request = new XMLHttpRequest();

// ready the system by calling open, and specifying the url
var searchItemsUrl = "http://api.tvmaze.com/search/shows?q=";
request.open("GET", searchItemsUrl + "document.getElementById('show-search').value"); //why cant i define another variable, then use searchItemsUrl + searchTerm? DOesnt record the latter!

// send the request
request.send();

// listen for the request response, with 2 scenarios
request.addEventListener("load", responseHandler);
request.addEventListener("error", requestFailed); //if request against url fail, this happens

//on clicking "submit", dropdown box appears and text changes to "Shows matching "search input"
function responseHandler() {
    showSelect.style.visibility='visible';
    //log down details of search, and return relevant results in the dropdown box
    var responseHandler = function(event) {
    response = JSON.parse( this.responseText );
    // var showsArray = [];
        for (i in response) {
            var searchOption = document.createElement('option');
            searchOption.textContent = response[i].show.name;
            showSelect.appendChild(showName);
            // showsArray.push(showName);
        }
    }
}
    //fill select drop down with AJAX results: show.name
    function selectFill() {
        var responseObject = JSON.parse(this.responseText)
        var result = [] //array to store responseObject show.name
        //loop through responseObject and create new option element with show title
        for (i in responseObject) {
            result.push(responseObject[i].show.name)
            var option = document.createElement('option')
            option.textContent = result[i]
            select.appendChild(option)
        }

    // var getItemsByAuthor = function(itemsInput, authorInput){
    //         var authorArray =[];
    //         for (var i=0; i<itemsInput.length; i++) {
    //           var authorName = itemsInput[i].product.author.name;
    //           if (authorName.includes(authorInput) === true){
    //           authorArray.push(itemsInput[i]);


