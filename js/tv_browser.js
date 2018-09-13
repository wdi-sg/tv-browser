var button = document.getElementsByTagName('button')[0]
var board = document.getElementById('search-form')
var select = document.getElementsByTagName('select')[0]
var showDetail = document.getElementById('show-detail')
var responseObject

window.onload = function() {

    //runs on select change event
    function displayDetails(event) {
        responseObject.forEach(function(element) {
            console.log(element)
            //fills show-detail with selected show details - TBC
            if (element.show.name == select.value) {
                var line = document.createElement('p')
                line.textContent = element.show.name
                showDetail.appendChild(line)
            }
        })
    }
    //AJAX request function triggered on button click.
    function retrieveResults(event) {
        var inputValue = document.getElementsByTagName('input')[0].value
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
            console.log(inputValue)
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