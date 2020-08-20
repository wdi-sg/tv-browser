// API Docs at:
// http://www.tvmaze.com/api
console.log("working");
var input = "";
var website = "http://api.tvmaze.com/search/shows?q="
var idWebsite = "http://api.tvmaze.com/shows/"
var movieToDisplay;
var jsonResponse;
// obtaining the value of the input text
document.querySelector('#show-search').addEventListener('change', function(event){
        input = event.target.value;
    })
    //removing all existing options when i send in a new request;
    document.querySelector(".submit").addEventListener("click", function(){
    document.querySelectorAll(".option").forEach(movie=>{
        movie.remove()})
    // Adding the input text into the default template of the website url
    website = "http://api.tvmaze.com/search/shows?q=" + input;
    document.querySelector("#show-search").value = "";
    getData(website).then(data=> {
        website = "http://api.tvmaze.com/search/shows?q=";
        populateData(data);
    }).then(displayData())
})



// FOR THE ENTIRE MOVIE OBJECT
function get(url) {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest;
        request.addEventListener("load", function() {
            return resolve(this.response);
        })
        // In this case there is no error function because tvmaze will return an empty string and not an error so therefore
        // we will always resolve the promise
        request.addEventListener("error", function() {
            return reject(this.error);
        })
        request.open("GET",url);

        request.send();
        })
}
function getData(url) {
    return get(url).then((response) => {
        jsonResponse=JSON.parse(response)
        if(jsonResponse.length == 0){
            alert("Please input valid title");}
        else
            return jsonResponse;
    }).catch((error) => {
        alert("Please input valid title");
    })
}




// FOR INDIVIDUAL MOVIE
function getMovieAPI(url) {
    return new Promise((resolve, reject) => {
    // let displayDiv = document.getElementById("show-detail")
    // displayDiv.removeChild(parent2);
    let request = new XMLHttpRequest;
     request.addEventListener("load", function() {
        return resolve(this.response);
    })
    // In this case there is no error function because tvmaze will return an empty string and not an error so therefore
    // we will always resolve the promise
    request.addEventListener("error", function() {
        return reject(this.error);
    })
    request.open("GET",url);

    request.send();
})}

function getMovieData(url) {
    return getMovieAPI(url).then((response) => {
        return response;
    }).catch((error) => {
        alert("Movie ID not found");
    })

}



// Helper functions
function populateData(obj) {
    obj.forEach(movie => {
        var option = document.createElement("option");
        option.classList.add("option");
        option.textContent = movie.show.name;
        option.value = movie.show.id;
        document.getElementById("show-select").appendChild(option);
    })
}
function displayData() {
    var selectMovie = document.querySelector("#show-select")
    selectMovie.addEventListener("change", (event)=> {
        movieData(event.target.value);
    })
}
function movieData(id) {
    var movieData = idWebsite + id;
    getMovieData(movieData).then((response)=> {
        movieToDisplay = JSON.parse(response);
        displayMovieData(movieToDisplay);
    });
}
function displayMovieData(obj) {
    console.log(obj);
    var parent = document.getElementById("show-detail");
    if(obj.image !== null){
        if(document.querySelector(".image1") !== null){
            document.querySelector(".image1").remove();
        }
        let imageElement = document.createElement("img");
        let img = obj.image.medium
        imageElement.classList.add("image1");
        imageElement.src = img;
        parent.appendChild(imageElement);
    }


    if(document.querySelector(".genre") !== null) {
        document.querySelector(".genre").remove()
    }
    var genres = obj.genres;
    var genreDisplay = "";
    genres.forEach(genre => {
        genreDisplay += genre + " ";
    })
    var genreElement = document.createElement("div");
    genreElement.classList.add("genre");
    genreElement.textContent = genreDisplay;
    parent.appendChild(genreElement);


    if(document.querySelector(".summary") !== null){
        document.querySelector(".summary").remove();
    }
    let summaryElement = document.createElement("div");
    let summary = obj.summary;
    console.log(summary);
    summaryElement.classList.add("summary");
    summaryElement.textContent = summary;
    parent.appendChild(summaryElement);


}