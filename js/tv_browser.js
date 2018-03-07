// API Docs at:
// http://www.tvmaze.com/api

// Variables
var show_select = document.getElementById("show-select");
var show_detail = document.getElementById("show-detail");

function responseHandler() {
  var response = JSON.parse( this.responseText );
  console.log( response );

  // Set the first option of the drop down list to something else
  var drop_down_option = document.querySelector("option");
  drop_down_option.innerText = "Shows matching " + input_text + "...";

  // Populate the drop down list with the relevant tv show names
  for (var i = 0; i < response.length; i++) {
    var option = document.createElement("option");
    option.innerText = response[i].show.name;
    console.log(option.value);
    show_select.appendChild(option);
  }
  show_select.style.display = "block";

  // Display more details of the show selected from the drop down list
  var drop_down_options = document.querySelectorAll("option");
  console.log(drop_down_options);
  console.log( response );
  for (var i = 1; i < drop_down_options.length; i++) {
    drop_down_options[i].addEventListener("change", function(){
      console.log("Displaying show details");
      var h2 = document.createElement("h2");
      h2.innerText = response[i].show.name;
      show_detail.appendChild(h2);
      var img = document.createElement("img");
      img.src = response[i].show.image.medium;
      show_detail.appendChild(img);
      var p = document.createElement("p");
      p.innerText = response[i].show.summary;
      show_detail.appendChild(p);
    });
  }
};

function requestFailed(){
  console.log("response text", this.responseText);
  console.log("status text", this.statusText);
  console.log("status code", this.status);
};

// Send request to tv maze for tv show input by user
function get_tv_shows(event){
  // Prevents the page from refreshing after submitting form
  event.preventDefault();

  input_text = document.querySelector('#show-search').value;
  var url = "http://api.tvmaze.com/search/shows?q=" + input_text;

  // make a new request
  var request = new XMLHttpRequest();

  // listen for the request response
  request.addEventListener("load", responseHandler);

  // listen for request error
  request.addEventListener("error", requestFailed);

  // ready the system by calling open, and specifying the url
  request.open("GET", url);

  // send the request
  request.send();
}
document.getElementById("search").addEventListener("submit", get_tv_shows);
