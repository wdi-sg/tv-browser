console.log('running!')

/////////////////////////////////////////////////////////////////////
//                         GLOBAL VARIABLES
/////////////////////////////////////////////////////////////////////
// used to attach to 1st main event listener to start the whole thing
let submit = document.querySelector('#submit');
// used to store shows and check if user has made a search or not
let shows = [];
let selectOptions = false;

/////////////////////////////////////////////////////////////////////
//             RUNS WHEN QUERY IS MADE AND RECEIVED           [2]
/////////////////////////////////////////////////////////////////////

let responseHandler = function() {
  // this keyword refers to the request variable
  console.log("Response text:", this.responseText);
  console.log("Status text:", this.statusText);
  console.log("Status code:", this.status);

  let myObject = JSON.parse(this.responseText);
  setShows(myObject);
}
/////////////////////////////////////////////////////////////////////
//                 RUNS WHEN USER CLICKS SUBMIT                [1]
/////////////////////////////////////////////////////////////////////

let runRequest = function(event){
    removeOptions();

    let input;
    let inputValue;
    // make a new request
    let request = new XMLHttpRequest();
    // listen for the request response
    // if (selectOptions === true) {
    //     input = document.querySelector('#show-search');
    //     inputValue; //make the option into a string???
    //     request.addEventListener("load", responseHandler);
    //     request.addEventListener("error", responseHandler);

    //     selectOptions = false;
    // } else {
        input = document.querySelector('#show-search');
        inputValue = input.value;
        request.addEventListener("load", responseHandler);
        request.addEventListener("error", responseHandler);
    // }
    // ready the system by calling open, and specifying the url
    // open doesn't open anything??
    request.open("GET", "http://api.tvmaze.com/search/shows?q="+inputValue);
    // send the request
    request.send();

    input.value = '';
}
submit.addEventListener('click', runRequest);

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
}
/////////////////////////////////////////////////////////////////////
//        SETS ALL THE DOM OPTION ELEMENTS FOR SELECT TAG         [3]
/////////////////////////////////////////////////////////////////////

let setShows = function (myObject) {
    let select = document.querySelector("#show-select");
    let show;
    for(let i=0; i<myObject.length; i++){
        show = myObject[i]["show"]["name"];
        shows.push(show);
        show;
        console.log("DATA: Show: "+ show);

        let option = document.createElement('option');
        option.classList.add('options');
        option.textContent = shows[i];
        option.addEventListener('click', function(){
            // run another AJAX call
            // get individual show
        });
        select.appendChild(option);
    }
    selectOptions = true;
}
/////////////////////////////////////////////////////////////////////
//                         FUNCTION TO RUN
/////////////////////////////////////////////////////////////////////