//=====================HELPER FUNCTIONS=============================
//Function to ascertain if something is an object.
var isPlainObject = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
};

//Function to capitalise string.
function capitalise(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//Function to make string kebab-case. (E.g. 'Chelsea Ee' => 'chelsea-ee')
function kebabCase(string) {
    return string.replace(/\s/g, `-`).toLowerCase();
}

//=====================ELEMENTS=============================

//Targetting all HTML elements for easy reference.
var display = document.getElementById('show-detail')
const inputElement = document.getElementById('show-search');
const submitBtn = document.getElementById('submit-btn');
const url = `http://api.tvmaze.com/search/shows?q=`
const dropdown = document.getElementById('show-select');
var firstDropdown = document.createElement("option")
//Clicking the submit button should trigger a submitRequest.
submitBtn.addEventListener('click', submitRequest)
//When an option is selected from the dropdown menu, trigger getOneShow function.
dropdown.addEventListener('change', getOneShow);


//=====================AJAX REQUEST FUNCTIONS=============================

//Function to handle GET server requests
function getData(url, callback) {
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.send();
  request.addEventListener("load", callback);
  request.addEventListener("error", requestFailed);
}

//requestFailed will trigger error display.
var requestFailed = function() {
    console.log("status code", this.status);
    display.innerText = `Sorry, there was an error. Please try again.`;
};

//Function is triggered when submit button is clicked: search for shows matching user's input.
function submitRequest() {
    //Get the user input.
    var userInput = inputElement.value;

    //Clear the input & previous results.
    inputElement.value = "";
    display.innerText = ""

    //If user input is empty, give error message.
    if (userInput === "") {
        display.innerText = `Input cannot be empty.`;
    //If it's not empty, send a request to the servers with the input value.
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

    //Results here should be an array of shows matching the search query.
    var results = JSON.parse(this.responseText);

    //If results array is empty, return error message.
    if (results.length === 0) {
        return display.innerText = `Sorry, no results were found matching your search!`
    } else {
        //For each object in the array, create a new option element with the object's name as its value and innerText.
        for (var index = 0; index < results.length; index++) {
            var itemDropDown = document.createElement("option")
            itemDropDown.innerText = results[index].show.name;

             //Assign the show id as the 'value' to the <option> element.
            itemDropDown.value = (results[index].show.id);
            dropdown.appendChild(itemDropDown);
        }
    }
};


//getOneShow() retrieves the ID value of the selected option & sends a request to the API.
function getOneShow() {
    var selectedShowID = this.value;
    var query = `http://api.tvmaze.com/shows/${selectedShowID}`;
    getData(query, displayShow);
}

//Function to get cast members' data.
function getCastMembers(){
  //Grab the show cast button's ID, which is the show's id, tag it to the endpoint URL for cast
  const query = `http://api.tvmaze.com/shows/${this.id}/cast`
  display.innerText = "";
  getData(query, displayCastMembers);
}

//Function to get a single actor's data.
function getActor(){
  //Tag the image ID (which is the person ID) onto the end of the endpoint URL.
  const query = `http://api.tvmaze.com/people/${this.id}`
  //Clear the display div to get ready for the actor information elements.
  display.innerText = "";
  //Make the get request with the URL, and upon the event 'load', trigger displayActor().
  getData(query, displayActor);
}


//===================INFORMATION RENDERING FUNCTIONS====================

//displayShow() displays all the show info in the show-details div.
function displayShow() {
    display.innerText = "";
    var results = JSON.parse(this.responseText);
    //Results here should be a singular show object.

    //Generate the Show Cast button.
    var castButton = document.createElement('button');
    //Pass the value of the show's ID to the castButton's ID.
    castButton.id = results.id
    castButton.innerText = `Show Cast`
    //Upon clicking the castButton holds the show ID, trigger the getCastMembers function.
    castButton.addEventListener(`click`, getCastMembers);
    display.appendChild(castButton)

    //Generate the main show info: title, image & summary.
    var itemName = document.createElement("h1");
    var itemDesc = document.createElement("p");
    var itemImage = document.createElement('img')
    itemImage.src = results.image.medium
    itemName.innerText = results.name;
    itemDesc.innerHTML = results.summary;
    display.appendChild(itemName);
    display.appendChild(itemImage)
    display.appendChild(itemDesc);

    //Generate the breakdown of the show object's keys/values.
    breakdownObject(results);
}

//This function loops through an object and renders even nested keys/values.
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

//Displays all cast members from a show.
function displayCastMembers(){
  var results = JSON.parse(this.responseText);
  //Results here should be an array of cast members.

  //If array is empty, return an error message.
  if (results.length===0) {
    return display.innerText = "There were no cast members found."

  //Loop through array and generate each cast member's image & description.
  } else {
    for (var i=0; i < results.length; i++) {
      var desc = document.createElement("p");
      desc.innerHTML = `<h1>${results[i].person.name}</h1> as ${results[i].character.name}`
      var characterImage = document.createElement("img");
      characterImage.src = results[i].character.image.medium

      //Pass the person ID on to the image element's ID.
      characterImage.id = results[i].person.id;
      //Upon clicking the generated image which holds the person ID, trigger the getActor function.
      characterImage.addEventListener('click', getActor);
      display.appendChild(characterImage);
      display.appendChild(desc);
    }
  }
}

//Display information about one actor.
function displayActor(){
  //Results here should be a singular person object.
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
