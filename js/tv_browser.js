// API Docs at:
// http://www.tvmaze.com/api
window.onload = function () {
  var baseUrl = 'http://api.tvmaze.com/search/shows?q=';
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

    heading.innerHTML = show.show.name;
    image.src = show.show.image ? show.show.image.medium : "";
    summary.innerHTML = show.show.summary;

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

    option.value = show.show.name;
    option.innerHTML = show.show.name;
    select.appendChild(option);
  };

  var searchShowHandler = function () {
    responseShows = JSON.parse(this.responseText);

    responseShows.forEach(function (show) {
      displayShowDetail(show);
      addOption(show);
    });

    select.options[0].innerHTML = 'Shows matching ' + input.value + '...';
  };

  var searchShow = function () {
    var request = new XMLHttpRequest();
    request.addEventListener('load', searchShowHandler);
    request.open('GET', baseUrl + input.value);
    request.send();
  };

  var setup = function () {
    button.addEventListener('click', searchShow);

    select.addEventListener('change', function () {
      clearDetail();
      displayShowDetail(getShow(this.value));
    });
  };

  setup();

};
