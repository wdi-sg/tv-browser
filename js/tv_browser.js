// API Docs at:
// http://www.tvmaze.com/api
window.onload = function () {
  var baseUrl = 'http://api.tvmaze.com/search/shows?q=';
  var detail = document.getElementById('show-detail');
  var input = document.getElementById('show-search');
  var button = document.querySelector('button');

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

  var searchShowHandler = function () {
    var shows = JSON.parse(this.responseText);
    shows.forEach(function (show) {
      displayShowDetail(show);
    });
  };

  var searchShow = function () {
    var request = new XMLHttpRequest();
    request.addEventListener('load', searchShowHandler);
    request.open('GET', baseUrl + input.value);
    request.send();
  };

  button.addEventListener('click', searchShow);
};
