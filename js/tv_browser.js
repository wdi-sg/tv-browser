// API Docs at:
// http://www.tvmaze.com/api

// Change it from a string type into a javascript (JSON) object

var json_obj = [];

var responseHandler = function(event) {
  var response = JSON.parse( this.responseText );
  showSearch(response);
};

var requestFailed = function(){
  console.log("error");
};

var submitSearch = function(event) {
  event.preventDefault();
  var endpoint = 'http://api.tvmaze.com//search/shows?q=';
  var input = document.querySelector('#show-search'); // get the query string
  var query = endpoint+input.value; // add to the endpoint

  var request = new XMLHttpRequest();

  // listen for the request response
  request.addEventListener("load", responseHandler);
  request.addEventListener("error", requestFailed);

  request.open("GET", query); // GET request
  request.send();

}

// get the query
var submit = document.querySelector('#submit');
submit.addEventListener('click', submitSearch);

// #show-select - add to .browse
// it should be populated with all search results.
// the first select option should read "Shows matching keyword…".

var showSearch = function(response) {
  var browse = document.querySelector('.browse');
  var show_select = document.createElement('select');
  show_select.setAttribute('id', 'show-select');
  var option1 = document.createElement('option');
  // 1st option should be 'Select a show...'
  option1.innerText = 'Select a show...';
  show_select.appendChild(option1);

  response.forEach( function(item, index) {
    var option = document.createElement('option');
    option.innerText = item["show"]["name"];
    // option.value = index;
    if (item["show"]["image"] != null) {
      json_obj[option.innerText] = {
        "image": item["show"]["image"]["medium"],
        "summary": item["show"]["summary"]
      };
    }
    else {
      json_obj[option.innerText] = {
        "image": null,
        "summary": item["show"]["summary"]
      };
    }
    show_select.appendChild(option);
  });
  browse.appendChild(show_select);

  // to change
  show_select.addEventListener('change', showDetail);
}

var showDetail = function() {

  var browse = document.querySelector('.browse');

  try {
    var deletediv = document.querySelector('#show-detail');
    if (deletediv != null) browse.removeChild(deletediv);

  }

  finally {
    var show_detail = document.createElement('div');
    show_detail.setAttribute('id', 'show-detail');

    // add the image
    if (json_obj[this.value]["image"] != null) {
      var img = document.createElement('img');
      var imgUrl = json_obj[this.value]["image"]; // get the medium image url
      img.setAttribute('src', imgUrl);
      show_detail.appendChild(img);
    }

    // add the summary
    // var summary = document.createElement
    var summary = json_obj[this.value]["summary"]; // get the show summary
    show_detail.innerHTML += summary;

    browse.appendChild(show_detail);
  }

}
