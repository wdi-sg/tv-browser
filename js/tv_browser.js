console.log('running!')

/////////////////////////////////////////////////////////////////////
//             RUNS WHEN QUERY IS MADE AND RECEIVED           [2]
/////////////////////////////////////////////////////////////////////

let responseHandler = function() {
  // this keyword refers to the request variable
  console.log("Response text:", this.responseText);
  console.log("Status text:", this.statusText);
  console.log("Status code:", this.status);

  let myObject = JSON.parse(this.responseText);
  if (selectOptions === true){
    displayShow(myObject);
  } else {
    setShows(myObject);
  }
}
/////////////////////////////////////////////////////////////////////
//                 RUNS WHEN USER CLICKS SUBMIT                [1]
/////////////////////////////////////////////////////////////////////
let submit = document.querySelector('#submit');
let showsSearch = '';

let runSearchRequest = function(event){
    let select = document.querySelector('#show-select');
    select.style.display = 'block';
    removeShow();
    removeOptions();
    let input = document.querySelector('#show-search');
    showsSearch = input.value;
    // make a new request
    let request = new XMLHttpRequest();
    // listen for the request response
    request.addEventListener("load", responseHandler);
    request.addEventListener("error", responseHandler);
    // ready the system by calling open, and specifying the url
    // open doesn't open anything??
    request.open("GET", "http://api.tvmaze.com/search/shows?q="+showsSearch);
    // send the request
    request.send();
    input.value = '';
}
submit.addEventListener('click', runSearchRequest);

/////////////////////////////////////////////////////////////////////
//        SETS ALL THE DOM OPTION ELEMENTS FOR SELECT TAG         [3]
/////////////////////////////////////////////////////////////////////
let shows = [];
let selectOptions = false;

let setShows = function (myObject) {
    let select = document.querySelector("#show-select");
    let show;
    select.children[0].textContent = 'Shows matching '+ showsSearch;
    for(let i=0; i<myObject.length; i++){
        show = myObject[i]["show"]["name"];
        shows.push(show);

        let option = document.createElement('option');
        option.classList.add('options');
        option.textContent = shows[i];
        select.appendChild(option);
    }
    select.addEventListener('change', runMovieRequest);
    selectOptions = true;
}
/////////////////////////////////////////////////////////////////////
//            RUNS WHEN USER CLICKS ON AN OPTION IN SELECT TAG
/////////////////////////////////////////////////////////////////////
let showValue = '';

let runMovieRequest = function(event){

    let input = document.querySelector('#show-select');
    showValue = input.value;

    let request = new XMLHttpRequest();
    request.addEventListener("load", responseHandler);
    request.addEventListener("error", responseHandler);
    request.open("GET", "http://api.tvmaze.com/search/shows?q="+showsSearch);
    request.send();
}
/////////////////////////////////////////////////////////////////////
//           SETS DOM IN THE 'SHOW DETAIL' DIV (MOVIE IMAGE AND NAME)
/////////////////////////////////////////////////////////////////////
let displayShow = function (myObject) {
    let detail = document.querySelector("#show-detail");
    let image = document.createElement('img');
    let title = document.createElement('h2');
    let rating = document.createElement('h3');

    let indexOfShow = shows.indexOf(showValue);
    title.textContent = showValue;
    image.src = myObject[indexOfShow]["show"]["image"]["medium"];
    rating.textContent = 'Rating: ' + myObject[indexOfShow]["show"]["rating"]["average"];

    detail.appendChild(title);
    detail.appendChild(image);
    detail.appendChild(rating);

}
/////////////////////////////////////////////////////////////////////
//            DELETES ALL OPTIONS IN THE SELECT TAG
/////////////////////////////////////////////////////////////////////

let removeOptions = function () {
    let select = document.querySelector("#show-select");
    if (selectOptions === true){
        for (let i=0; i<shows.length; i++){
            select.removeChild(select.children[1]);
        }
        shows = [];
    }
    //make select options false again so if user wants to click a diff search query, they can do so
    selectOptions = false;
}
/////////////////////////////////////////////////////////////////////
//            DELETES CURRENT SHOW BEING DISPLAYED
/////////////////////////////////////////////////////////////////////

let removeShow = function () {

    let div = document.querySelector("#show-detail");

    for (let i=0; i<div.children.length; i++) {
        div.removeChild(div.children[0]);
    }

}
/////////////////////////////////////////////////////////////////////
//                         END OF SCRIPT
/////////////////////////////////////////////////////////////////////