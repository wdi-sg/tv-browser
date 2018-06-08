// API Docs at:
// http://www.tvmaze.com/api

var submit = document.querySelector("#search > input:nth-child(2)");
var showSelect = document.querySelector("#show-select");
submit.addEventListener("click", function(event) {
    event.preventDefault();

    // the `"#show-select"` field should be un-hidden.
    showSelect.style.display = "block";
    
    var searchBox = document.querySelector("#show-search");
    // the first select option should read "Shows matching `keyword`…".
    var defaultOption = document.createElement("option");
    defaultOption.innerText = `Shows matching ${searchBox.value}`
    showSelect.appendChild(defaultOption);

    // it should be populated with all search results.
    var request = new XMLHttpRequest();
    request.addEventListener("load", populateShows);
    request.open("GET", `http://api.tvmaze.com/search/shows?q=${searchBox.value}`, true);
    request.send();
});

function populateShows() {
    var shows = JSON.parse(this.responseText);
    
    var searchBox = document.querySelector("#show-search");
    var defaultOption = document.createElement("option");
    defaultOption.innerText = `Shows matching ${searchBox.value}`
    showSelect.innerHTML = "";
    showSelect.appendChild(defaultOption);
    
    shows.forEach(function(response,index) {
        var newOption = document.createElement("option");
        newOption.innerText = `${response.show.name}`;
        newOption.value = `${response.show.name}`;
        showSelect.appendChild(newOption);
        console.log(response.show.name);
    })
}

// 3. Whenever the user selects a title from the `#show-select` field (HINT: listen for a `"change"` event), the app should populate the `"#show-detail"` div with that show's name and image.
var showDetail = document.querySelector("#show-detail");
showSelect.addEventListener("change", function(event) {
    event.preventDefault();
    var show = this.value;
    console.log(`SHOW: ${show}`);
    
    // it should be populated with all search results.
    var request = new XMLHttpRequest();
    request.addEventListener("load", populateDetails);
    request.open("GET", `http://api.tvmaze.com/singlesearch/shows?q=${show}`, true);
    request.send();
});

function populateDetails() {
    var details =JSON.parse(this.responseText);
    var title = document.createElement("h1");
    var newImg = document.createElement("img");
    var description = document.createElement("div");

    title.innerText = details.name;
    newImg.src = details.image.medium;
    description.innerHTML = details.summary;

    showDetail.innerHTML = "";
    showDetail.appendChild(title);
    showDetail.appendChild(newImg);
    showDetail.appendChild(description);

}


//http://api.tvmaze.com/search/shows?q=girls
// URL: /singlesearch/shows?q=:query
// Example: http://api.tvmaze.com/singlesearch/shows?q=girls
// Example: http://api.tvmaze.com/singlesearch/shows?q=girls&embed=episodes
