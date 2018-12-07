 // API Docs at:
 // http://www.tvmaze.com/api
 const queryBox = document.getElementById('show-search');
 const optionBox = document.getElementById('show-select');
 const showDetailContainer = document.getElementById('show-detail');
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

 const  displayShowDetail=()=>{
     while (showDetailContainer.hasChildNodes()){
         showDetailContainer.removeChild(showDetailContainer.childNodes[0])
     }
    let detailElement = document.createElement('div');
    detailElement.innerHTML = queriedShows[optionBox.value].show.summary;
    showDetailContainer.appendChild(detailElement);
 }


 (() => {
     let button = document.getElementById('submit-button');
     button.addEventListener('click', queryLoop);
     optionBox.addEventListener('change', displayShowDetail);

 })()
