// API Docs at:
// http://www.tvmaze.com/api

//global variables
var input = document.getElementById("search");
const submit = document.querySelector("button");
const details = document.getElementById("show-detail");
const menu = document.getElementById('show-select');
var options = document.querySelectorAll('option');
let finalResult;
let searchResponse;
let idArray =[];
let nameArray =[];




//AJAX FUNCTION
const getSuggestions = () => {
    const wordQuery = input.value;
    const queryParams ="?q=";
    const url = " http://api.tvmaze.com/search/shows";
    const endpoint = `${url}${queryParams}${wordQuery}`;
    
    fetch(endpoint).then(response => {
      if (response.ok) {
        searchResponse = response.json();
        return searchResponse

      }
      throw new Error('Request failed!');
    }, networkError => {
      console.log(networkError.message)
    }).then (searchResponse =>{
      populate(searchResponse);
    })
  }

  //helper function populate the menu

const populate = (results) => {
  menu.innerText= null;
    results.forEach(result => {
        const option =document.createElement('option');
        option.innerText = result.show.name;
        option.value = result.show.id;
        menu.appendChild(option)

    });
    return results;
}

//helper function to display cleaned data
const display = (result) => {
  var header = document.createElement("h1");
  var summary = document.createElement("h3");
  var picture = document.createElement("img");
  var link = document.createElement("a")
  header.innerText=result.name;
  summary.innerText = result.summary;
  picture.src = result.image.medium;
  link.href = result._links.previousepisode.href;
  details.appendChild(header);
  details.appendChild(summary);
  details.appendChild(picture);
  details.appendChild(link);

  };

  //click event

  submit.addEventListener("click", function(){
      getSuggestions();
  })
  
  function optionHandler(event) {
    fetch('http://api.tvmaze.com/shows/'+  event.target.value)
      .then( response => response.json())
      .then( finalResult => display(finalResult))
  };




   menu.addEventListener("change", optionHandler);
  
   
 // async version
