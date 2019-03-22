window.onload = function () {
  var sendRequest = function (url) {
    // what to do when we recieve the request
    var responseHandler = function () {
      console.log("response text", this.responseText);
      var response = JSON.parse(this.responseText);
      console.log("status text", this.statusText);
      console.log("status code", this.status);
    };

    var requestFailed = function () {
      console.log("response text", this.responseText);
      console.log("status text", this.statusText);
      console.log("status code", this.status);
    };

    // make a new request
    var request = new XMLHttpRequest();

    // listen for errors
    request.addEventListener("error", requestFailed);

    // listen for the request response
    request.addEventListener("load", responseHandler);

    // ready the system by calling open, and specifying the url
    request.open("GET", url);

    // send the request
    request.send();
  };

  var doSubmit = function (event) {
    var input = document.querySelector('#url');
    var url = input.value;
    sendRequest(url);
  };

  document.querySelector('#submit').addEventListener('click', doSubmit);