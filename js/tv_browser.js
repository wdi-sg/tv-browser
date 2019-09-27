// API Docs at:
// http://www.tvmaze.com/api

var showList = [];

var responseHandler = function() {
  var response = JSON.parse( this.responseText );
  console.log( response )

  var select = document.querySelector("select");


    for (i=0; i<response.length; i++)
    {
        var option = document.createElement("option");
        option.innerText = response[i]["show"]["name"]
        option.setAttribute("id", [i])
        option.addEventListener("change", function(){
        var location = event.target.id
        console.log(showList[location])
        })
        //option.addEventListener("click", ajaxFunction)
        select.appendChild(option);
        showList.push(response[i]["show"]["name"])
    }
}

function removeResult(){
    var select = document.querySelector("select");
    while (select.firstChild){
        select.firstChild.remove();
    }
    showList = []
}

var button = document.querySelector("button");
button.addEventListener('click', function(){
       var input = document.getElementById("show-search");
        console.log(input.value)
        removeResult();
        var request = new XMLHttpRequest();
        request.addEventListener("load", responseHandler);
        request.open("GET", `http://api.tvmaze.com/search/shows?q=${input.value}`);
        request.send();
        console.log('WHAT')

        })