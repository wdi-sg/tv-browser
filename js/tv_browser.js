// API Docs at:
// http://www.tvmaze.com/api

var url = "";

var response = [];

var selectTitle = document.querySelector('#show-select');
var showDetail = document.querySelector('#show-detail');
var searchResults = document.querySelector('#search-results');
var searchTerm = "";

selectTitle.style.visibility = "hidden";

var clearDisplay = function(){
  showDetail.innerHTML = '';
}

var clearOptions = function(){
    var child = selectTitle.lastElementChild;
    while (child) {
        selectTitle.removeChild(child);
        child = selectTitle.lastElementChild;
    }
}

var displaySelect = function(event){
  console.log(event);
  console.log(event.target.value);
  console.log(event.target.selectedIndex);

  var index = parseInt(event.target.selectedIndex) - 1;
  console.log(response[index]);

  var title = document.createElement('h1');
  title.innerText = event.target.value;
  showDetail.appendChild(title);

  var showImg = document.createElement('img');
  showImg.setAttribute('src', response[index].show.image.medium);
  showDetail.appendChild(showImg);

  var showDes = document.createElement('p');
  showDes.innerHTML = response[index].show.summary;
  showDetail.appendChild(showDes);

}


var fetchResults = function(response){
  // console.log('hi');
  // console.log(response);
  selectTitle.style.visibility = "visible";
  var defaultOption = document.createElement('option');

  defaultOption.innerText = "Select a show...";
  defaultOption.setAttribute('id',"option-0");
  defaultOption.setAttribute('value',"");

  selectTitle.appendChild(defaultOption);

  for (let i = 0; i< response.length; i++){
    // console.log(response[i].show.name);
    let showOption = document.createElement('option');

    showOption.innerText = response[i].show.name;
    showOption.setAttribute('id',"option-" + (i+1));
    showOption.setAttribute('value',response[i].show.name);
    showOption.setAttribute('data-id',response[i].show.id);
    // console.log('after set');
    // showOption.addEventListener('change', function(){
    //   displaySelect();
    // });

    selectTitle.appendChild(showOption);
  }

  searchResults.innerHTML = response.length + ' shows matches the word "' + searchTerm + '"';
}

selectTitle.addEventListener('change', function(){
  clearDisplay();
  displaySelect(event);
});

var submitRequest = function(event){
  searchTerm = document.querySelector('#show-search').value;
  clearOptions();

  console.log(searchTerm);

  url = "http://api.tvmaze.com/search/shows?q=" + searchTerm;
  console.log(url);

  //clear the search term
  document.querySelector('#show-search').value = "";

  // what to do when we recieve the request
  var responseHandler = function() {
    // console.log("response text", this.responseText);
    // console.log("status text", this.statusText);
    // console.log("status code", this.status);

    response = JSON.parse( this.responseText);


    // return response;
    fetchResults(response);
    };

  // make a new request
  var request = new XMLHttpRequest();

  // listen for the request response
  request.addEventListener("load", responseHandler);
  request.addEventListener("error", responseHandler);

  // ready the system by calling open, and specifying the url
  request.open("GET", url);

  // send the request
  request.send();

  //clear the search term

}

var submitBtn = document.querySelector('#search-btn');

submitBtn.addEventListener('click',submitRequest);
