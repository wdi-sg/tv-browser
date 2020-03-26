var request = new XMLHttpRequest();

//Helper functions:
var isPlainObject = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
};

function capitalise(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function kebabCase(string) {
    return string.replace(/\s/g, `-`).toLowerCase();
}

//Targetting all HTML elements for easy reference.
var display = document.getElementById('show-detail')
const inputElement = document.getElementById('show-search');
const submitBtn = document.getElementById('submit-btn');
const url = `http://api.tvmaze.com/search/shows?q=`
const dropdown = document.getElementById('show-select');
var firstDropdown = document.createElement("option")

//Clicking the submit button should trigger a submitRequest.
submitBtn.addEventListener('click', submitRequest)

function submitRequest() {
    //Get the user input as a string.
    var userInput = inputElement.value;

    //Clear the input & previous results.
    inputElement.value = "";
    display.innerText = ""

    //If user input is empty, give error message.
    if (userInput === "") {
        display.innerText = `Input cannot be empty.`;
    //If it's not empty, send a request to the servers with the input.
    } else {
        //Turn input into kebab case so that we can account for spaces in show names.
        var inputValue = kebabCase(userInput);
        //Making a string with API url with the input
        var query = url + inputValue;
        //Request info from the servers.
        getData(query, populateDropDown);

        dropdown.textContent = ""; //Clears the entire drop down menu, including the first option.
        //Change the first option in the dropdown to show `shows matching (userinput)`.
        firstDropdown.innerText = `Shows matching "${userInput}"`;
        //Add the first option into dropdown.
        dropdown.appendChild(firstDropdown);
    }
}

//populateDropDown will populate the dropdown list with the data received from submitRequest
function populateDropDown() {
    //Make dropdown appear.
    dropdown.classList.remove('hide');
    //Get the array of results.
    var results = JSON.parse(this.responseText);

    //If results array is empty, return error message.
    if (results.length === 0) {
        return display.innerText = `Sorry, no results were found matching your search!`
    } else {
        //For each object in the array, create a new option element with the object's name as its value and innerText.
        for (var index = 0; index < results.length; index++) {
            var itemDropDown = document.createElement("option")
            itemDropDown.innerText = results[index].show.name;
            itemDropDown.value = kebabCase(results[index].show.name); //kebabcase the value.
            dropdown.appendChild(itemDropDown);
        }
    }
};

//requestFailed will trigger error status.

var requestFailed = function() {
    console.log("status code", this.status);
    display.innerText = `There was an error.`;
};

//When an option is selected from the dropdown menu, trigger getOneShow function.
dropdown.addEventListener('change', getOneShow);

//getOneShow() retrieves the kebab-cased value of the selected option & sends a request to the API.
function getOneShow() {
    var selectedShow = this.value;
    var singleSearchURL = `http://api.tvmaze.com/singlesearch/shows?q=`;
    var query = singleSearchURL + selectedShow
    getData(query, displayShow);
}

//displayShow() displays all the show info in the show-details div.

function displayShow() {
    display.innerText = "";
    var results = JSON.parse(this.responseText);
    //Generate the main show info: title, image & summary.
    var itemName = document.createElement("h1");
    var itemDesc = document.createElement("p");
    var itemImage = document.createElement('img')

    var castButton = document.createElement('button');
    castButton.id = results.id
    castButton.innerText = `Show Cast`
    castButton.addEventListener(`click`, getCastMembers);
    itemImage.src = results.image.medium
    itemName.innerText = results.name;
    itemDesc.innerHTML = results.summary;
    display.appendChild(castButton)
    display.appendChild(itemName);
    display.appendChild(itemImage)
    display.appendChild(itemDesc);
    //Generate the breakdown of all the object's values.
    breakdownObject(results);
}


//breakdownObject() goes through a nested object and breaks down all its keys/values.
var breakdownObject = function(obj) {
    var objectKeys = Object.keys(obj); //Returns array of all the key values

    //Loop through the objectItems array while using it to reference from the parent object (objectName)
    for (var index = 0; index < objectKeys.length; index++) {

        //If object = {name: 'Game of Thrones', type: 'tv show'},
        //Then objectItems = ['name', 'type']
        //And result = gameOfThrones['id']
        var result = obj[objectKeys[index]];
        //If the result is still an object, breakdown the result further.
        if (isPlainObject(result)) {
            breakdownObject(result);
            //If it's not an object, generate paragraph with key(capitalised+bolded) & value & append to the show-details div.
        } else {
            var info = document.createElement("p");
            var key = document.createElement("span");
            key.classList.add('bold');
            var value = document.createElement("span");
            key.innerHTML = `${capitalise(objectKeys[index])}: `;
            value.innerHTML = result;
            info.appendChild(key);
            info.appendChild(value)
            display.appendChild(info);
        }
    }
};

//Function to get cast members.
function getCastMembers(){
  //Grabs the image element ID, which is the actor's id.
  const query = `http://api.tvmaze.com/shows/${this.id}/cast`
  display.innerText = "";
  getData(query, displayCastMembers);

}

function displayCastMembers(){
  var results = JSON.parse(this.responseText);

  if (results.length===0) {
    return display.innerText = "There were no cast members found."
  } else {
    for (var i=0; i < results.length; i++) {
      var desc = document.createElement("p");
      desc.innerText = `${results[i].person.name} as ${results[i].character.name}`
      var characterImage = document.createElement("img");
      characterImage.id = results[i].person.id;
      characterImage.src = results[i].character.image.medium
      characterImage.addEventListener('click', getActor);
      display.appendChild(characterImage);
      display.appendChild(desc);
    }
  }
}

function getActor(xhttp){
  const query = `http://api.tvmaze.com/people/${this.id}`
  display.innerText = "";
  getData(query, displayActor);
}


function displayActor(){
  var results = JSON.parse(this.responseText)

  //Create actorName & image elements.
  var actorName = document.createElement("h1");
  var image = document.createElement("img");
  actorName.innerText = results.name;
  image.src = results.image.medium
  display.appendChild(actorName);
  display.appendChild(image);

  //Render breakdown of the rest of the actor object's keys/values.
  breakdownObject(results);
}

//Function to handle GET server requests
function getData(url, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, true);
  xhttp.send();
  xhttp.addEventListener("load", callback);
  xhttp.addEventListener("error", requestFailed);
}
