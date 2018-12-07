 // API Docs at:
 // http://www.tvmaze.com/api
 const queryBox = document.getElementById('show-search');
 const optionBox = document.getElementById('show-select');
 let userQuery;
 let queriedShows = [];

 const queryLoop = () => {
     userQuery = queryBox.value;
     makeRequest(`http://api.tvmaze.com/search/shows?q=${userQuery}`)
         .then((result) => {
             queriedShows = [];
             while (optionBox.hasChildNodes()) {
                 optionBox.removeChild(optionBox.childNodes[0]);
             }
             queriedShows = JSON.parse(result.responseText);
             console.log('success!');
             for (show in queriedShows) {
                 let showElement = document.createElement('option');
                 showElement.value = [show];
                 showElement.innerHTML = queriedShows[show].show.name;
                 optionBox.appendChild(showElement);
             };
         })
         .catch((error) => {
             console.log('something went wrong', error)
         })
 }



 (() => {
     let button = document.getElementById('submit-button');
     button.addEventListener('click', queryLoop)
 })()