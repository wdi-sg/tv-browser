// API Docs at:
// http://www.tvmaze.com/api
var receivedRequest=[];
var optionSelect;

//Sending and Recieving Ajax request.
function sendRequest(itemToSearch){
    var request = new XMLHttpRequest();
    // listen for the request response
    request.addEventListener("load", responseHandler);
    // ready the system by calling open, and specifying the url /// REQUEST SENT HERE
    request.open("GET", "http://api.tvmaze.com/search/shows?q=" + itemToSearch);
    // send the request
    request.send();
}

//make request - > listen to the request response -> ready system by opening and specifying the url. -> send request. ------ called by sendRequest()..----calls optionUpdate
var responseHandler = function() {

  console.log("response text", this.responseText);
  receivedRequest = JSON.parse(this.responseText );
  console.log(receivedRequest);
  optionUpdate();
};


//function triggers when submit button clicked. ---> calls sendRequest
var doSubmit = function(event){

    var selectSearchbox = document.getElementById('show-search');
    var searchBoxinput = selectSearchbox.value;
    console.log(searchBoxinput);
    sendRequest(searchBoxinput);
};

document.querySelector('#search-submit').addEventListener('click', doSubmit);

//update options tab with received object sets. (name of films)....called by responseHandler()
var optionUpdate = function(){
        optionSelect = document.getElementById('show-select')
        optionSelect.innerHTML = "";
        for(var i = 0; i < receivedRequest.length; i++){
                var optionElement = document.createElement("option");
                optionElement.textContent = receivedRequest[i].show.name;
                optionElement.setAttribute("value", i);
                optionElement.setAttribute("id", receivedRequest[i].show.id);
                optionSelect.appendChild(optionElement);
             }
}

var clearOptionList = function(){
    return receivedRequest=[];
}

//when dropdown option selected, function will render selected item's name,img and description
var selectOption = function(){
    var valueOfElement= document.getElementById('show-select').value;
    var idOfElement = document.getElementById('show-select')[valueOfElement].id;

    var displayStuffElement = document.getElementById('show-detail');


    //for image
        var imgLink = receivedRequest[valueOfElement].show.image.medium;
        var imgTag = document.createElement('img');
        imgTag.setAttribute('src',imgLink);


    //put title
    var title = receivedRequest[valueOfElement].show.name;
    var titleTag = document.createElement('h1');
    titleTag.textContent = title;

    //put caption
    var caption = receivedRequest[valueOfElement].show.summary; //string
    var captionTag = document.createElement('div');
    captionTag.textContent = caption;

    displayStuffElement.innerHTML = "";//clear any existing child elements

    displayStuffElement.appendChild(imgTag);
    displayStuffElement.appendChild(titleTag);
    displayStuffElement.appendChild(captionTag);

    console.log(valueOfElement);
    console.log(idOfElement);
}
//********************//