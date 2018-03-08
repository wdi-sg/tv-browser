// API Docs at:
// http://www.tvmaze.com/api


/*
Note: This script uses ES6 syntax, async functions and promises. They're absolutely not needed, and I'm only doing this for practice. So if you're
reading this for reference, maybe only the below comments will be useful, though I generally find ES6 syntax a bit more readable...

The desired effect is to 1. obtain search results from the tvmaze server using their API and 2. display them in a dropdown list.
When 3. an option in the dropdown list is selected, 4. that show's summary should be displayed, i.e. its title, small poster, and show summary (obtained from the server data).

1. will require XMLHttpRequest since we are requesting for data from a server. Since the search term is to be obtained from the user,
   we will have to use the encodeURI() function to ensure that whatever rubbish the user has typed in is actually sendable over the internet.
   For example, if the user types "game of thrones", the actual search term to be appended to the search URL is "game%20of%20thrones". The
   encodeURI() function does this for us. This server returns data in JSON format, which will have to be passed through the JSON.parse() function
   for it to be recognizable as JSON for further use. For convenience, I'm going to store the results in a global variable (result) so that it can
   be accessed by other functions (useful for future development). Look at task 4. Before proceeding, I will need to inspect some sample results
   from the server to find the keys in the data object that correspond to the shows' titles, posters, and summaries.

2. The dropdown list is initially hidden, so we will have to use <element>.style.display = 'block' to display it. But before that, we need
   to create the options for the list. The names on these options will have to be pulled from the result variable, and the key should have
   been obtained from the data inspection prior to this. The VALUE attribute on these options should correspond to their index in that
   result array. This will enable us to do something like result[index]['show']['name'] to quickly pull out the info we need where index
   is actually the option's value. Since I've stored the show-select element in the global constant showSelect, this is simply showSelect.value.
   This task can then be accomplished by looping over the result data, and for each item in that result array, create an option, set the 
   value of the option to be the current loop index (i.e. i = 0, 1, ...) and set the textContent to be the name in that result item. To
   meet the homework requirements, we will also have to change the textContent of the first option to display "shows matching " + the search term.

3. This can be detected by the event listener 'change', i.e. when the value of the dropdown list changes. addEventListener will be needed here.

4. We are going to be doing this many times when the user browses through the selections, so the div that contains the selected show's details
   will be stored in a global constant (showDetails) for convenience. We will need a function that pulls the show's title, poster image URL,
   and summary from the result, create the html elements (h1, img, and p respectively) to contain that info, and then append these elements
   to the showDetails div. What if the user has already selected a show previously though? There would be stuff there to begin with, so we have
   to clear the showDetails div's contents before all this is done.

Post-completion enhancements: What if the user wants to run another search? The options in the showSelect dropdown list will have to be removed
before filling them in again with the new results. The XMLHttpRequest can be re-used.

Can we initiate the search by optionally pressing enter as well instead of just the submit button? We can use another event listener (keydown) for this.

Can we display the large poster when the user clicks on the small one, in case the words on the small posters are unreadable? We will need an
event listener 'click' for the small poster image. This can display a modal (full screen layer) that displays the large image, i.e. have a div element
that is initially hidden and contains only the image, then use JS to toggle its display style from none to block. Clicking on the screen
should dismiss the large poster then (we will need another event listener 'click' on the full screen layer to do this).

Can we preload the images to show the summaries quicker, and do the preloading in the background? Yes, we just need to create a new Image() object in
the background and set its src attribute to an image URL to preload it. We can obtain the URLs of all the images needed when we are constructing the
dropdown list of search results. Since we are going through the results to pull out the names then, we might as well pull out all the image URLs and
store them into an array (remember to clear the array before this so the previous search doesn't affect it). Then loop over that array and create
those images in the background.

Can we detect the user's network connection type and NOT preload on mobile data (data limits yo)? This one's tricky. Not implemented here.
*/

var showSelect = document.getElementById('show-select');
var showSearchSubmit = document.querySelector('button');
var showDetails = document.getElementById('show-detail');
var showSearch = document.getElementById('show-search');
var showSearchError = document.querySelector('.fail');
var searchAPIPrefix = 'http://api.tvmaze.com/search/shows?q=';
var modal = document.querySelector('.modal');
var modalImage = document.querySelector('.modal-content');

var xhr = new XMLHttpRequest();
var result = null;
var imgArray = [];

function preloadImages() {
    for (var i = 0; i < imgArray.length; i++) {
        var img = new Image();
        img.src = imgArray[i];
    }
}

function displaySummary() {
    showDetails.innerHTML = ""; // clear any summary being displayed
    var index = showSelect.value; // retrieve the location of the show's information in the large array of info from the server
    
    if (index >= 0) {
        var title, image, summary; // Yes, you can declare multiple variables in a line
        title = document.createElement('h1');
        title.textContent = result[index]['show']['name'];

        image = document.createElement('img');
        image.setAttribute('src', result[index]['show']['image']['medium']); // Show only the small poster at first. The original posters can be huge!
        image.style.cursor = 'pointer'; // Let's make sure that if the mouse hovers over the poster, the user will know it's clickable

        // When clicking on the medium image, display the large original image using the full screen
        image.addEventListener('click', () => {
            modalImage.setAttribute('src', result[index]['show']['image']['original']);
            if (modalImage.height > window.innerHeight) { // Because some posters are YUUUGGGEEEE.... check out the Stranger Things one D:
                modalImage.height = window.innerHeight
            }
            modal.style.display = 'block';
        })
    
        summary = document.createElement('p');
        summary.innerHTML = result[index]['show']['summary']; // Using innerHTML here because the summary text includes the <p> tags already
    
        showDetails.appendChild(title);
        showDetails.appendChild(image);
        showDetails.appendChild(summary);
    }
}

function resetSearch() {
    showSearchError.textContent = '';
    Array.from(document.querySelectorAll('#show-select option:nth-child(n+2)')).forEach(elem => {
        elem.parentNode.removeChild(elem);
    });
}

function displaySearchTerms (data) {
    resetSearch(); //remove all the show options except for the first
    showDetails.innerHTML = ''; //clear any summary that might be currently being displayed
    result = data; // store the data in a global variable since we will need it later
    imgArray = []; // meant for storing the links of images for preloading later (after the results are displayed)
    if (result.length === 0) { // display an error if no results were found
        showSearchError.textContent = "No results found!";
        return;
    };
    result.forEach(function(showObject, index) {
        var option = document.createElement('option');
        option.textContent = showObject['show']['name']; // The option should display the name of the show
        option.setAttribute('value', index); // I use the value attribute to store the index here because the value is automatically given to the showSelect dropdown list when the option is selected, i.e. if you call showSelect.value, it will return the value of the current option, whereas if you do showSelect.textContent, it will not give you the option's text because the dropdown list element is not the same as the option itself.
        showSelect.appendChild(option);

        // This next part is for preloading the poster images in the background once the search results have arrived
        if (showObject['show']['image'] !== null) { //Not all shows might have an image. If there's nothing there, don't process.
            imgArray.push(showObject['show']['image']['medium']);
            imgArray.push(showObject['show']['image']['original']);
        }
    })
    showSelect.style.display = 'block';
    preloadImages();
};

function submitSearch (event) {
    event.preventDefault();
    var searchTerm = showSearch.value;
    if (searchTerm !== '') { // Only do stuff when the user has typed in something
        document.querySelector('#show-select > option').textContent = 'Shows matching ' + searchTerm;
        xhr.onreadystatechange = function () { // the onreadystatechange function is called whenever the server sends a signal back that the readystate has changed
            if (this.readyState === 4 && this.status === 200) { // Signifies that the loading is complete
                displaySearchTerms(JSON.parse(xhr.responseText)); // Parse the server response as JSON first. displaySearchTerms is only meant to display the data given to it, not process it.
            }
        };
        xhr.open('GET', encodeURI(searchAPIPrefix + searchTerm)); //encodeURI is needed here to ensure that even if the user inputs rubbish, we can still send it over the internet
        xhr.send();
    };
};

// Search when either the enter key is pressed and the searchbox is focused, or when the submit button is pressed
document.addEventListener('keydown', function (event) {
    if (document.activeElement == showSearch && event.keyCode == 13) {
        submitSearch(event);
    };
});

showSearchSubmit.addEventListener('click', submitSearch);

// Display the summary of the show selected from the dropdown list when the selection is changed
showSelect.addEventListener('change', displaySummary, false);

// This will hide the modal screen (that shows the large, original poster)
modal.addEventListener('click', function () {
    modal.style.display = 'none'
});

function constrainLargePosters () {
    if (modal.style.display === 'block') {
        modalImage.height = window.innerHeight;
    }
};

// Because some posters are YUUUGGGEEEE.... check out the Stranger Things one D:
window.addEventListener('resize', constrainLargePosters, true);

/* ======================================
ES6 Implementation
=========================================
const showSelect = document.getElementById('show-select');
const showSearchSubmit = document.querySelector('button');
const showDetails = document.getElementById('show-detail');
const showSearch = document.getElementById('show-search');
const showSearchError = document.querySelector('.fail');
const searchAPIPrefix = 'http://api.tvmaze.com/search/shows?q=';
const modal = document.querySelector('.modal');
const modalImage = document.querySelector('.modal-content');

let xhr = new XMLHttpRequest();
let result = null;
let imgArray = [];

// These 2 functions together serve to preload images when the search results are obtained.
// Unfortunately navigator.connection.effectiveType is only supported in Chrome and it's quite inaccurate, so there's no point in using
// that to check for the connection type, otherwise we could turn off preloading when a mobile data connection is detected.
function preloadImage(imgSrc) {
    return new Promise(resolve => {
        let img = new Image();
        img.src = imgSrc;
        img.onload = () => {resolve(`${imgSrc} preloaded\n`)};
    })
}

async function preloadImages() {
    let result = '';
    let imgHeightArray = [];
    for (let i = 0; i < imgArray.length; i++) {
        result += await preloadImage(imgArray[i]); //Somehow, the await keyword couldn't be used in the forEach iterator D:
    }
    return result;
}

// If another search is done, all options from the 2nd one onwards should be first removed in preparation for
// refilling of the list with new results.
function resetSearch() {
    showSearchError.textContent = '';
    Array.from(document.querySelectorAll('#show-select option:nth-child(n+2)')).forEach(elem => {
        elem.parentNode.removeChild(elem);
    });
}

function displaySearchTerms(data) {
    resetSearch();
    showDetails.innerHTML = '';
    result = data; //response.json() has been passed into this function, already in json format.
    imgArray = [];
    if (result.length === 0) {
        showSearchError.textContent = "No results found!";
        return;
    }
    for (let key in result) {
        let option = document.createElement('option');
        let name = result[key]['show']['name'];
        option.innerText = name;
        option.setAttribute('value', key); //I use the value attribute to store the index here because the value is automatically given to the showSelect dropdown list when the option is selected, i.e. if you call showSelect.value, it will return the value of the current option, whereas if you do showSelect.textContent, it will not give you the option's text because the dropdown list element is not the same as the option itself.
        showSelect.appendChild(option);

        // For image preloading
        if (result[key]['show']['image'] != null) { //Not all shows might have an image. If there's nothing there, don't process.
            imgArray.push(result[key]['show']['image']['medium']);
            imgArray.push(result[key]['show']['image']['original']);
        }
    }
    preloadImages().then(result => {console.log(result)});
    showSelect.style.display = 'block';
}

// Tasks for displaying the summary of the selected show. If the 1st option from the list, "Shows matching ..." is selected, do nothing.
// Otherwise, get rid of previous summary. Create the elements for the show's title, image, and summary.
// Fill said elements with the details from the JSON data obtained from the API, stored in the global variable summary.
// Append to the showDetails block for display.
function displaySummary() {
    showDetails.innerHTML = "";
    let index = showSelect.value;
    if (index >= 0) {
        let title, image, summary;
        title = document.createElement('h1');
        title.textContent = result[index]['show']['name'];

        image = document.createElement('img');
        image.setAttribute('src', result[index]['show']['image']['medium']);
        image.style.cursor = 'pointer';

        // When clicking on the medium image, display the large original image using the full screen
        image.addEventListener('click', () => {
            modalImage.setAttribute('src', result[index]['show']['image']['original']) ;
            modalImage.height = (modalImage.height > window.innerHeight) ? window.innerHeight : modalImage.height; // Because some posters are YUUUGGGEEEE.... check out the Stranger Things one D:
            modal.style.display = 'block';
        })
    
        summary = document.createElement('p');
        summary.innerHTML = result[index]['show']['summary'];
    
        showDetails.appendChild(title);
        showDetails.appendChild(image);
        showDetails.appendChild(summary);
    }
}

function submitSearch(event) {
    if (event != null) {
        event.preventDefault()
    };
    let inputValue = showSearch.value;
    if (inputValue != '') {
        showSearch.value = '';
        document.querySelector('#show-select > option').textContent = `Shows matching ${inputValue}`;
        fetch(encodeURI(searchAPIPrefix + inputValue)).then(response => {return response.json()}).then((data) => {displaySearchTerms(data)});
    };
};

// Search when either the enter key is pressed and the searchbox is focused, or when the submit button is pressed
document.addEventListener('keydown', (event) => {
    if (document.activeElement == showSearch && event.keyCode == 13) {
        submitSearch();
    };
});

showSearchSubmit.addEventListener('click', submitSearch);

// Display the summary of the show selected from the dropdown list when the selection is changed
showSelect.addEventListener('change', displaySummary, false);

// This will hide the modal screen (that shows the large, original poster)
modal.addEventListener('click', () => {modal.style.display = 'none'});

function constrainLargePosters () {
    if (modal.style.display == 'block') {
        modalImage.height = window.innerHeight;
    }
};

// Because some posters are YUUUGGGEEEE.... check out the Stranger Things one D:
window.addEventListener('resize', constrainLargePosters, true);
*/