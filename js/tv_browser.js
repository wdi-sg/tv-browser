// API Docs at:
// http://www.tvmaze.com/api
window.onload = function () {
  var searchShowsUrl = 'http://api.tvmaze.com/search/shows?q=';
  var singleSearchUrl = 'http://api.tvmaze.com/singlesearch/shows?q=';
  var detail = document.getElementById('show-detail');
  var input = document.getElementById('show-search');
  var select = document.getElementById('show-select');
  var button = document.querySelector('button');
  var responseShows;

  var displayShowDetail = function (show) {
    var container = document.createElement('div');
    var heading = document.createElement('h2');
    var image = document.createElement('img');
    var summary = document.createElement('p');

    heading.innerHTML = show.name;
    image.src = show.image ? show.image.medium : "";
    summary.innerHTML = show.summary;

    container.appendChild(heading);
    container.appendChild(image);
    container.appendChild(summary);

    detail.appendChild(container);
  };

  var getShow = function (showName) {
    var i;

    for (i = 0; i < responseShows.length; i++) {
      if (responseShows[i].show.name === showName) {
        return responseShows[i];
      }
    }
  };

  var clearDetail = function () {
    while (detail.firstChild) {
      detail.removeChild(detail.firstChild);
    }
  };

  var addOption = function (show) {
    var option = document.createElement('option');

    option.value = show.name;
    option.innerHTML = show.name;
    select.appendChild(option);
  };

  var searchShowsHandler = function () {
    responseShows = JSON.parse(this.responseText);

    responseShows.forEach(function (show) {
      displayShowDetail(show.show);
      addOption(show.show);
    });

    select.options[0].innerHTML = 'Shows matching ' + input.value + '...';
  };

  var searchSingleShowHandler = function () {
    var show = JSON.parse(this.responseText);
    clearDetail();
    console.log(show);
    displayShowDetail(show);
  };

  var searchShow = function (url, isSingle) {
    var request = new XMLHttpRequest();

    if (isSingle) {
      request.addEventListener('load', searchSingleShowHandler);
    } else {
      request.addEventListener('load', searchShowsHandler);
    }

    request.open('GET', url);
    request.send();
  };

  var setup = function () {
    button.addEventListener('click', function () {
      searchShow(searchShowsUrl + input.value, false);
    });

    select.addEventListener('change', function () {
      searchShow(singleSearchUrl + this.value, true);
    });
  };

  setup();

};
