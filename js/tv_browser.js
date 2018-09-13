// correspond to html elements, initialised in window.onload
var showDetail;
var showSelect;
var searchString;

// array of search results & show's id for searching cast members
// syntax for the 'select' element to get the id of its current result is:
// showSelect[showSelect.selectedIndex].id
// should implement this into an AJAX search: http://api.tvmaze.com/shows/ + show's id
// only figured this out after doing it for the cast members so I store the response array in a global variable for now
var resultsArray = [];
var showId;

var populateShowDetails = function (event) {

  showDetail.innerHTML = "";
  for (var i = 0; i < resultsArray.length; i++) {
    if (this.value === resultsArray[i].show.name) {
      var thisDetails = document.createElement("p");
      showDetail.appendChild(thisDetails);
      var thisShow = resultsArray[i].show;

        if (thisShow.image) {
          var thisPicture = document.createElement("img");
          showDetail.appendChild(thisPicture);
          thisPicture.src = thisShow.image.medium;
        }

      thisDetails.innerHTML = `<h1>${thisShow.name}</h1><p>Language: ${thisShow.language}</p>${thisShow.summary}`;

      var castButton = document.createElement("button");
      showDetail.appendChild(castButton);
      castButton.style.display = "block";
      castButton.innerHTML = "cast";

      showId = thisShow.id;
      castButton.addEventListener("click", showCast);
    }
  }
}

var responseHandler = function() {
  showSelect.style.visibility = "visible";

  // crude way to reset select inputs
  showSelect.innerHTML = `<option>Shows matching \"${searchString}\"</option>`;

  //actually does stuff
  var response = JSON.parse( this.responseText );
  for (i = 0; i < response.length; i++) {
    var show = document.createElement("option");
    show.textContent = response[i].show.name;
    show.id = response[i].show.id;
    showSelect.appendChild(show);
  }
  resultsArray = response;
  showDetail.innerHTML = `<br>${response.length} shows found!`;
};

var requestFailed = function() {
  console.log("response text", this.responseText);
  console.log("status text", this.statusText);
  console.log("status code", this.status);
};

var doSubmit = function(event) {
  var input = document.querySelector('#show-search');
  var search = "http://api.tvmaze.com/search/shows?q=";
  searchString = input.value;
  var url = search + searchString;

  // make a new request
  var request = new XMLHttpRequest();

  // listen for the request response
  request.addEventListener("load", responseHandler);
  request.addEventListener("error", requestFailed);

  // ready the system by calling open, and specifying the url
  request.open("GET", url);
  // send the request
  request.send();
};

var showCast = function (event) {

  var url = "http://api.tvmaze.com/shows/" + showId + "/cast";

  var request = new XMLHttpRequest();
  request.addEventListener("load", castResponseHandler);
  request.addEventListener("error", requestFailed);
  request.open("GET", url);
  request.send();

  this.removeEventListener("click", showCast);
  this.addEventListener("click", hideCast);
}

var hideCast = function (event) {
  var castList = document.querySelector(".cast-list");
  castList.parentElement.removeChild(castList);

  this.removeEventListener("click", hideCast);
  this.addEventListener("click", showCast);
}

var showPerson = function (event) {
  var url = "http://api.tvmaze.com/people/" + this.id;

  var request = new XMLHttpRequest();
  request.addEventListener("load", personResponseHandler);
  request.addEventListener("error", requestFailed);
  request.open("GET", url);
  request.send();

  this.removeEventListener("click", showPerson);
  this.addEventListener("click", hidePerson);
}

var hidePerson = function (event) {
  var childElements = document.querySelectorAll(".person-details");
  for (var i = 0; i < childElements.length; i++) {
    if (childElements[i].parentNode === this) {
      this.removeChild(childElements[i]);
    }
  }

  this.removeEventListener("click", hidePerson);
  this.addEventListener("click", showPerson);
}

var personResponseHandler = function () {
  var response = JSON.parse(this.responseText);
  thisPerson = document.getElementById(response.id);

  gender = document.createElement("li");
  gender.classList.add("person-details");
  gender.textContent = `Gender: ${response.gender}`;
  thisPerson.appendChild(gender);

  birthday = document.createElement("li");
  birthday.classList.add("person-details");
  birthday.textContent = `Birthdate: ${response.birthday}`;
  thisPerson.appendChild(birthday);

  if (response.image)
  {
    image = document.createElement("img");
    image.classList.add("person-details");
    image.src = response.image.medium;
    thisPerson.appendChild(image);
  }
}

var castResponseHandler = function() {

  castList = document.createElement("ul");
  showDetail.appendChild(castList);
  castList.classList.add("cast-list");

  var response = JSON.parse(this.responseText);

  for (var i = 0; i < response.length; i++) {
    castMember = document.createElement("li");
    castList.appendChild(castMember);
    castMember.id = response[i].person.id;
    castMember.textContent = `${response[i].person.name} : ${response[i].character.name}`;
    castMember.addEventListener("click", showPerson);
  }
}

window.onload = function (event) {

  document.querySelector('#submit').addEventListener('click', doSubmit);
  showDetail = document.querySelector("#show-detail");
  showSelect = document.querySelector("#show-select");
  showSelect.addEventListener('change', populateShowDetails);

}
