var button = document.getElementsByTagName('button')[0]
var board = document.getElementById('search-form')
var select = document.getElementsByTagName('select')[0]
var showDetail = document.getElementById('show-detail')

window.onload = function() {

    //reset page when new search item is inputted
    function clearAll() {
        while (select.lastChild) {
            select.removeChild(select.lastChild)
        }
        clearDetails()
        var placeholder = document.createElement('option')
        placeholder.textContent = 'Select a show...'
        select.appendChild(placeholder)
    }

    //refresh show detail section when dropdown list change
    function clearDetails() {
        while (showDetail.lastChild) {
            showDetail.removeChild(showDetail.lastChild)
        }
    }

    //fill show detail with ajax request of select value
    function detailFill(event) {
        var e = JSON.parse(this.responseText)
        var line = document.createElement('p')

        line.innerHTML = `<h2>${e.name}</h2><img src=${e.image.medium}></img><br>${e.summary}`
        showDetail.appendChild(line)

        console.log("status text", this.statusText)
        console.log("status code", this.status)
    }

    //initiate AJAX request with select value
    function displayDetails(event) {
        clearDetails()

        var request = new XMLHttpRequest()

        request.addEventListener("load", detailFill)
        request.open("GET", `http://api.tvmaze.com/singlesearch/shows?q=${select.value}`)
        request.send()
    }

    //fill select drop down with AJAX results: show.name
    function selectFill(event) {
        var responseObject = JSON.parse(this.responseText)
        var result = [] //array to store responseObject show.name
        //loop through responseObject and create new option element with show title
        for (i in responseObject) {
            result.push(responseObject[i].show.name)
            var option = document.createElement('option')
            option.textContent = result[i]
            select.appendChild(option)
        }
        select.style.visibility = 'visible' //set selector to become visible
        console.log("status text", this.statusText)
        console.log("status code", this.status)
    }

    //AJAX request function triggered on button click.
    function retrieveResults(event) {
        clearAll()

        var inputValue = document.getElementById('show-search').value
        var request = new XMLHttpRequest()

        request.addEventListener("load", selectFill)
        request.open("GET", `http://api.tvmaze.com/search/shows?q=${inputValue}`)
        request.send()
    }

    //event listeners
    button.addEventListener('click', retrieveResults)
    select.addEventListener('change', displayDetails)
}