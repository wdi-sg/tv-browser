// API Docs at:
// http://www.tvmaze.com/api





var submitButton = document.getElementById('submit');
var dropDown = document.getElementById('show-select')
var searchBar = document.getElementById('show-search')
var response;

var submitSearch = function (event) {
    var searchWord = searchBar.value;

    var url = `http://api.tvmaze.com/search/shows?q=${searchWord}`

    var responseHandler = function () {

        response = JSON.parse(this.responseText);
        console.log(response)
        for (let i = 0; i < response.length; i++) {
            var el = document.createElement('option');
            el.innerText = response[i].show.name
            el.setAttribute('class', [i])
            dropDown.appendChild(el)

        }
    };

    var request = new XMLHttpRequest();

    request.addEventListener("load", responseHandler);

    request.open("GET", url);

    request.send();

}

submitButton.addEventListener('click', submitSearch)

/************************************************************** */
/************************************************************** */
/************************************************************** */
/************************************************************** */



var render = function (event) {



    var searchWord = dropDown.value;
    var url = `http://api.tvmaze.com/search/shows?q=${searchWord}`


    var responseHandler = function () {
        response = JSON.parse(this.responseText);
        console.log(response)

        var name = response[0].show.name;
        var summary = response[0].show.summary;
        var premiered = response[0].show.premiered;
        var image = response[0].show.image.medium
        console.log(response[0])
        var section = document.createElement('section');
        section.innerHTML = `
        <h1>Title: ${name}</h1>
        <img src=${image}>
        <p> Summary: ${summary}</p>
        <p>Premiered: ${premiered}<p>
        `
        document.body.appendChild(section);
        console.log(section)

    };
    var request = new XMLHttpRequest();

    request.addEventListener("load", responseHandler);

    request.open("GET", url);

    request.send();
}
console.log(dropDown)


dropDown.addEventListener('change', render)