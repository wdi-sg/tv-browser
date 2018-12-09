
var doRequest = function(){

var input = document.querySelector('#show-search');

var url = input.value;

var output = ('http://api.tvmaze.com/search/shows?q=' + url
    );

var request = new XMLHttpRequest();

//clears earlier select options, if any

var selectList = document.getElementById("show-select");

var length = selectList.options.length;

for (i = length - 1 ; i >= 0 ; i--) {
  selectList.remove(i);
}

//first define function for response if request is executed
request.addEventListener("load", function() {

 var data = JSON.parse(this.responseText);

 for(var i = 0; i < data.length; i++){

    selectList = document.getElementById("show-select");
    var option = document.createElement("option");
    option.value = data[i].show.name;
    option.text = data[i].show.name;

    selectList.appendChild(option);

 }

});

request.addEventListener("error", function(){
  console.log("failed");
});

//then execute the requests
    request.open("GET", output);
    request.send();
};

window.onload = function(){
    document.querySelector('#submit').addEventListener('click', doRequest);
}



