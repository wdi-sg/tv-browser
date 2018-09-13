// API Docs at:
// http://www.tvmaze.com/api

window.onload = function() {
  var arrayOfShows = null;
  var defaultURL = "http://api.tvmaze.com/search/shows?q="
  var searchTerm = "";

  var request = new XMLHttpRequest()
  request.addEventListener("load", responseHandler);

  function responseHandler() {
    // removes the text inside the input bar
    document.getElementById('show-search').value = "";

    // parse the response to json
    arrayOfShows = JSON.parse(this.response);
    console.log(arrayOfShows);

    // loop through response
    for(var i = 0; i < arrayOfShows.length; i++) {
      var currentObject = arrayOfShows[i];
      // access the show name
      var showName = currentObject.show.name;

      // create the elements
      var newOption = document.createElement('option')
      newOption.value = showName;
      newOption.text = showName;

      // append elements
      var select = document.getElementById('show-select');
      select.style.display = 'block';
      select.childNodes[1].text = "Shows matching " + searchTerm + "...";
      select.appendChild(newOption);
    };
  };

  document.getElementById('submit-button').addEventListener('click', function() {
    // get input value
    searchTerm = document.getElementById('show-search').value;

    // perform ajax call
    request.open('GET', defaultURL + searchTerm);
    request.send();
  });

  document.getElementById('show-select').addEventListener('change', function() {
    // empty out the div first in case this is not the first call
    var showDetail = document.getElementById('show-detail');
    while (showDetail.firstChild) {
      showDetail.removeChild(showDetail.firstChild);
    };

    // get value of selected choice
    var selectedChoice = this.value;

    for(var j = 0; j < arrayOfShows.length; j++) {
      var currentObject = arrayOfShows[j];

      if (this.value == currentObject.show.name) {
        var name = currentObject.show.name;
        var imgURL = currentObject.show.image ? currentObject.show.image.medium : "nil";
        var summary = currentObject.show.summary;
      };
    };

    // create and attach elements
    var nameElement = document.createElement('p');
    nameElement.innerText = name;

    var imageElement = document.createElement('img');
    imageElement.src = imgURL;

    showDetail.appendChild(nameElement);
    showDetail.appendChild(imageElement);
    imageElement.insertAdjacentHTML('afterend', summary);
  });

};
