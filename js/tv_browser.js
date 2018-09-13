// API Docs at:
// http://www.tvmaze.com/api

 var doSubmit = function(event){

  // varibale which selects the input element by its ID 		
  var input = document.querySelector('#show-search');

  //variable which retuns the URL of the user's input
  var url = 'http://api.tvmaze.com/search/shows?q=' + input.value;

  //variable that selecets the options element by its ID
  var optionList = document.querySelector('#show-select') 

  var responseHandler = function() {

  	//response text returns a string
    console.log("response text", this.responseText);
    
    // converts string and returns us an javascript object.
    var response = JSON.parse( this.responseText );
    console.log( response );
    
    for (var i = 0; i < response.length; i++) {
    	console.log(response[i].show.name)

    	//create an option tag for each item in array retuned
     	var option = document.createElement('OPTION')
     	// each option tag is given a specific id(thetvdb number). this is so it can be accessed later
     	option.setAttribute('value', ("http://api.tvmaze.com/lookup/shows?thetvdb=" + response[i].show.externals.thetvdb))
     	option.setAttribute('class', 'clickable')
     	
     	//New variable to fill up words option tag. It is appended to the option tag
     	var optionName = document.createTextNode(response[i].show.name);
     	option.appendChild(optionName);
     	//option tags are then appended to its rightful parentnode
     	optionList.appendChild(option);
     	console.log(response[i].show.externals.thetvdb) 
    }
  };
 
  // make a new request
  var request = new XMLHttpRequest();
  // listen for the request response
  request.addEventListener("load", responseHandler);
  // ready the system by calling open, and specifying the url
  request.open("GET", url);
  // send the request
  request.send();

  var requestFailed = function(){
    console.log("response text", this.responseText);
    console.log("status text", this.statusText);
    console.log("status code", this.status);
  };
  request.addEventListener("error", requestFailed);

};
document.querySelector('#submit').addEventListener('click', doSubmit);


// further 2

var responseHandler = function() {

    //clear details div
    var details = document.querySelector('#show-detail')
    details.innerHTML = "";


    //response text returns a string
    console.log("response text", this.responseText);
    
    // converts string and returns us an javascript object.
    var response = JSON.parse( this.responseText );
    console.log( response );

    //show Name heading creating
    var name = document.createElement('H1')
    name.textContent = response.name;
    details.appendChild(name);

    //show image creation
    var picture = document.createElement('img')
    picture.setAttribute('src', response.image.medium)
    details.appendChild(picture);

    // show summary
    var summary = document.createElement('div')
    summary.innerHTML = response.summary;
    details.appendChild(summary);

}

//global
var optionNames = document.querySelectorAll('#show-select');
optionNames = optionNames[0]
  optionNames.addEventListener('change', function(){
    console.log('changed')
    // make a new request
    var request = new XMLHttpRequest();
    // listen for the request response
    request.addEventListener("load", responseHandler);
    // ready the system by calling open, and specifying the url
    request.open("GET", optionNames.value);
    // send the request
    request.send();

  })










    // // make a new request
    // var request = new XMLHttpRequest();
    // // listen for the request response
    // request.addEventListener("load", responseHandler);
    // // ready the system by calling open, and specifying the url
    // request.open("GET", optionNames[i].id);
    // // send the request
    // request.send();



// var changeOption = function(event){

// 	//variable to create an array of the options listed
// 	var optionNames = document.querySelectorAll('.clickable');

// 	var responseHandler = function() {

// 		// for loop to add a click event listener to each option name
// 		for (var i = 0; i < optionNames.length; i++) {
// 		optionNames[i].id
		
// 		}
// 	}	
	
	// // make a new request
 //  	var request = new XMLHttpRequest();
 //  	// listen for the request response
 //  	request.addEventListener("load", responseHandler);
 //  	// ready the system by calling open, and specifying the url
 //  	request.open("GET", optionNames[2].id);
 //  	// send the request
 //  	request.send();

//   	var requestFailed = function(){
//     	console.log("response text", this.responseText);
//     	console.log("status text", this.statusText);
//     	console.log("status code", this.status);
//   	};
  
//   	request.addEventListener("error", requestFailed);

// }

// optionNames.forEach.addEventListener('click', clickOption);




