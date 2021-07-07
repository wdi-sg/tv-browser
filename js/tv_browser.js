

// get all id with sub
var btn = document.getElementById("sub");

//console log all the show name in console log first
var renderSelect = function(data) {
    //repeat for i amount of time
    for(i=0; i<data.length; i++) {
        //created an option element
        var createOption = document.createElement("option");
        //add inner text into newly created element
        createOption.innerHTML = data[i].show.name;
        //select all select button and append new element
    document.getElementById("show-select").appendChild(createOption);
        console.log(data[i].show.name);
    }
}

// run AJAX request on click function
btn.addEventListener("click", function () {
    //AJAX request
    var ourRequest = new XMLHttpRequest ();
    ourRequest.open('GET', 'http://api.tvmaze.com/search/shows?q=girls');
    ourRequest.onload = function() {
        var ourData = JSON.parse(ourRequest.responseText);
        console.log(ourData[0].show.name);
    // renderSelect(ourData);
        renderSelect(ourData);
}
ourRequest.send();
});