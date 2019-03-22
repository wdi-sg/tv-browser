
/*var getSelectElement = document.querySelector("select");
function createOption(array) {
    for (var i = 0; i < array.length; i++) {
        var newOption = document.createElement("option");
        newOption.value = array[i];
        newOption.textContent = array[i];

        getSelectElement.appendChild(newOption);

    }
}*/

/*function createOption(array) {
     // make the dropdown appear
    getDropDown.setAttribute("class", "visible")
    for (var i = 0; i < array.length; i++) {
        var newOption = document.createElement("button");
        newOption.setAttribute("class", "dropdown-item");
        newOption.setAttribute("id", "show-"+i);
        newOption.setAttribute("onClick", "doIndvShow(event)");
        newOption.type = "button";
        //newOption.value = array[i];
        newOption.textContent = array[i];

        getMenuElement.appendChild(newOption);
    }
}
*/

/*var showNameList = [];
function getShowList() {
    var response = JSON.parse( this.responseText );

    for (var i = 0; i < response.length; i++) {
        var showName = response[i].show.name;
        showNameList.push(showName);
    }

    createOption(showNameList);
    console.log(showNameList)

};
*/

var id = "";
var mainContainer = document.querySelector(".main-container");
var getMenuElement = document.querySelector(".dropdown-menu");
var getDropDown = document.querySelector(".dropdown");

var showNameList = [];
//var showIdList = [];
function getShowList() {
    var response = JSON.parse( this.responseText );

    for (var i = 0; i < response.length; i++) {
        var showName = response[i].show.name;
        showNameList.push(showName);
        var showId = response[i].show.id;

        // make the dropdown button visible
        getDropDown.setAttribute("class", "visible")
        //create dropdown and assign in
        var newOption = document.createElement("button");
        newOption.setAttribute("class", "dropdown-item");
        newOption.setAttribute("id", showId);
        newOption.setAttribute("onClick", "doIndvShow(event)");
        newOption.type = "button";
        //newOption.value = array[i];
        newOption.textContent = showName;

        getMenuElement.appendChild(newOption);
}
    console.log(showNameList)

};

function getIndvShow() {
        $(document).ready(function(){
      $(".dropdown-item").click(function(){
        $(".display").empty();
      });
    });

    var response = JSON.parse( this.responseText );
    console.log(response)

    // display
    var div = document.createElement("div")
    div.setAttribute("class", "display")
    //title
    var name = document.createElement("h2")
    name.textContent = response.name;

    //img
    if (response.image !== null) {
        var img = document.createElement("img");
        img.src = response.image.medium;
        div.appendChild(img);
    }

    //summary
    var summary = document.createElement("p");
    summary.textContent = response.summary;


    div.appendChild(name);
    div.appendChild(summary);

    mainContainer.appendChild(div);

}


var doSubmit = function(event){
    var input = document.querySelector('#show-search');
    var url = "http://api.tvmaze.com/search/shows?q=" + input.value;

    // make a new request
    var request = new XMLHttpRequest();
    // listen for the request response
    request.addEventListener("load", getShowList);
    // ready the system by calling open, and specifying the url
    request.open("GET", url);
    // send the request
    request.send();

};

function doIndvShow(event) {
    // get id of the button
    id = event.target.id;
    var list = document.getElementById(id);
    //wconsole.log(id);

    var url = "http://api.tvmaze.com/shows/" + id;
    console.log(url);

    // make a new request
    var request = new XMLHttpRequest();

    // listen for the request response
    request.addEventListener("load", getIndvShow);

    // ready the system by calling open, and specifying the url
    request.open("GET", url );

    // send the request
    request.send();


}