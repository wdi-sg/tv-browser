// API Docs at:
// http://www.tvmaze.com/api

var url = "";

var response = [];

var selectTitle = document.querySelector('#show-select');
var showDetail = document.querySelector('#show-detail');

selectTitle.style.visibility = "hidden";

var displaySelect = function(event){
  console.log(event);
  console.log(event.target.value);
  console.log(event.target.selectedIndex);

  var index = parseInt(event.target.selectedIndex) - 1;
  console.log(response[index]);

  title = document.createElement('h1');
  title.innerText = event.target.value;
  showDetail.appendChild(title);

  showImg = document.createElement('img');
  showImg.setAttribute('src', response[index].show.image.medium);
  showDetail.appendChild(showImg);
}

var clearDisplay = function(){
  showDetail.innerHTML = '';
}
var fetchResults = function(response){
  // console.log('hi');
  // console.log(response);

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
}

selectTitle.addEventListener('change', function(){
  clearDisplay();
  displaySelect(event);
});

var submitRequest = function(event){
  var searchTerm = document.querySelector('#show-search').value;
  selectTitle.style.visibility = "visible";

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
