// API Docs at:
// http://www.tvmaze.com/api
window.onload = function () {
  var searchShowsUrl = 'http://api.tvmaze.com/search/shows?q=';
  var singleSearchUrl = 'http://api.tvmaze.com/singlesearch/shows?q=';
  var detail = document.getElementById('show-detail');
  var showHeading = document.getElementById('show-heading');
  var showImage = document.getElementById('show-image');
  var showSummary = document.getElementById('show-summary');
  var allData = document.getElementById('show-all-data');
  var input = document.getElementById('show-search');
  var select = document.getElementById('show-select');
  var button = document.querySelector('button');

  var setup = function () {
    hideSelect();

    button.addEventListener('click', function () {
      searchShow(searchShowsUrl + input.value, false);
      hideDetail();
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

    hideDetail();
    displayShowDetail(show);
  };

  var addOption = function (show) {
    var option = document.createElement('option');

    option.value = show.name;
    option.innerHTML = show.name;
    select.appendChild(option);
  };

  var hideDetail = function () {
    detail.style.display = 'none';
  };

  var displayShowDetail = function (show) {
    detail.style.display = 'block';
    showHeading.innerHTML = show.name;
    showImage.src = show.image ? show.image.medium : "";
    showSummary.innerHTML = show.summary;
    allData.innerHTML = '';
    displayAllData(show);
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
