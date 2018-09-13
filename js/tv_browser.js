// API Docs at:
// http://www.tvmaze.com/api
window.onload = function () {
  var searchShowsUrl = 'http://api.tvmaze.com/search/shows?q=';
  var singleSearchUrl = 'http://api.tvmaze.com/singlesearch/shows?q=';
  var detail = document.getElementById('show-detail');
  var input = document.getElementById('show-search');
  var select = document.getElementById('show-select');
  var button = document.querySelector('button');
  var allData = document.createElement('p');

  var setup = function () {
    hideSelect();

    button.addEventListener('click', function () {
      searchShow(searchShowsUrl + input.value, false);
      clearDetail();
      showSelect();
    });

    select.addEventListener('change', function () {
      searchShow(singleSearchUrl + this.value, true);
    });
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

  var searchShowsHandler = function () {
    var responseShows = JSON.parse(this.responseText);

    responseShows.forEach(function (response) {
      addOption(response.show);
    });

    select.options[0].innerHTML = 'Shows matching ' + input.value + '...';
  };

  var searchSingleShowHandler = function () {
    var show = JSON.parse(this.responseText);

    clearDetail();
    displayShowDetail(show);
    detail.appendChild(allData);
    displayAllData(show);
  };

  var addOption = function (show) {
    var option = document.createElement('option');

    option.value = show.name;
    option.innerHTML = show.name;
    select.appendChild(option);
  };

  var clearDetail = function () {
    while (detail.firstChild) {
      detail.removeChild(detail.firstChild);
      allData.innerHTML = '';
    }
  };

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

  var displayAllData = function (show) {
    var key;

    for (key in show) {
      allData.innerHTML += key + ':';
      if (Array.isArray(show[key])) {
        show[key].forEach(function (value) {
          allData.innerHTML += ' ' + value;
        });
      } else if (typeof show[key] === 'object') {
        displayAllData(show[key]);
      } else {
        allData.innerHTML += show[key];
      }
      allData.innerHTML += '<br>';
    }
  };

  var hideSelect = function () {
    select.style.display = 'none';
  };

  var showSelect = function () {
    select.style.display = 'block';
  }

  setup();
};
