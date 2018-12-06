// API Docs at:
// http://www.tvmaze.com/api
//console.log is for checking purposes

var responseHandler = function(){
    //convert string to JSON object
    var response = JSON.parse(this.response);

    //type of reponse if an array of object
    for(i=0; i < response.length; i++){
        //get all array with object name
        var name = response[i].show.name;
        //create element option with search names, append to drop down
        var option = document.createElement("option")
        option.innerHTML = name;
        document.querySelector("#show-select").appendChild(option);
    }
}


var getSearch = function (){

    var searchWord = this.value;

    var request = new XMLHttpRequest();

    request.addEventListener("load",responseHandler);

    request.open("GET", " http://api.tvmaze.com/search/shows?q=" + searchWord)

    request.send();

}

window.onload = function(){
    //get the search input and do function.
    document.querySelector("#show-search").
        addEventListener("search", getSearch);
}
