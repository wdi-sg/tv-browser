var button = document.getElementsByTagName('button')[0]
var board = document.getElementById('search-form')
var select = document.getElementsByTagName('select')[0]
var showDetail = document.getElementById('show-detail')
var responseObject

window.onload = function() {

    function clearAll() {
        while (select.lastChild) {
            select.removeChild(select.lastChild)
        }
        clearDetails()
        var placeholder = document.createElement('option')
        placeholder.textContent = 'Select a show...'
        select.appendChild(placeholder)
    }

    function clearDetails() {
        while (showDetail.lastChild) {
            showDetail.removeChild(showDetail.lastChild)
        }
    }
    //runs on select change event
    function displayDetails(event) {
        clearDetails()
        responseObject.forEach(function(e) {
            //fills show-detail with selected show details - TBC
            if (e.show.name == select.value) {
                var line = document.createElement('p')
                line.innerHTML = `${e.show.name}<br>${e.show.premiered}<br>${e.show.language}<br>${e.show.type}<br>${e.show.summary}`
                showDetail.appendChild(line)
            }
        })
    }
    //AJAX request function triggered on button click.
    function retrieveResults(event) {
        clearAll()
        var inputValue = document.getElementById('show-search').value

        var responseHandler = function() {
            responseObject = JSON.parse(this.responseText)
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

        //standard AJAX stuff
        var request = new XMLHttpRequest()
        request.addEventListener("load", responseHandler)
        request.open("GET", `http://api.tvmaze.com/search/shows?q=${inputValue}`)
        request.send()
    }

    //event listeners
    button.addEventListener('click', retrieveResults)
    select.addEventListener('change', displayDetails)


}