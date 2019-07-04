var responseHandler = function(){
// console.log("response text", this.responseText);
// console.log("status text", this.statusText);
// console.log("status code", this.status);
var response = JSON.parse(this.responseText);
console.log("response is :" + response);
createOpt(response); //creates and appends options to select
clickOpt();  //clickifies options
console.log(sel);
};

var goSubmit = function(event){
    console.log("goSubmit activated");
    var input = document.getElementById('show-search');

    var url = input.value;

    var request = new XMLHttpRequest();

    request.addEventListener("load", responseHandler);

    searchTerm = showSearch + url;
    request.open("GET", searchTerm);

    request.send();
}

var showSearch = "http://api.tvmaze.com/search/shows?q=";
var singleSearch = "http://api.tvmaze.com/singlesearch/shows?q="
var searchTerm = "";
var submitButton = document.getElementById('submit');
submitButton.addEventListener('click', goSubmit);



var sel = document.getElementById('show-select');


var createOpt = function(response){
    for (i = 0; i < response.length; i += 1){
        var opt = document.createElement('option');
        opt.innerHTML = response[i].show.name;
        opt.setAttribute = "id, `opt${i}`";
        sel.appendChild(opt);
    }

}

var getShow = function(event){
        var request = new XMLHttpRequest();

        request.addEventListener("load", responseHandler);

        searchTerm = singleSearch + event.target.innerHTML;
        request.open("GET", searchTerm);

        request.send();
        console.log( response )

    console.log("searchterm :" + searchTerm);
}

var clickOpt = function(){
    for (j = 1; j < sel.length; j += 1){
        console.log("options clickified!")
        sel[j].addEventListener('change', getShow);
    }
}