var button = document.getElementsByTagName('button')[0]
var board = document.getElementById('search-form')
var select = document.getElementsByTagName('select')[0]
var showDetail = document.getElementById('show-detail')
var currentID
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

    function castFill() {
        var castList = JSON.parse(this.responseText)
        var castHeader = document.createElement('h3')
        castHeader.textContent = '*Cast Members*'
        showDetail.appendChild(castHeader)
        castList.forEach(function(e) {
            console.log(e.person.name)
            var name = document.createElement('p')
            name.textContent = e.person.name
            showDetail.appendChild(name)
        })
    }

    function castRequest(event) {
        console.log(currentID)
        event.target.style.visibility = 'hidden'
        var request = new XMLHttpRequest()
        request.addEventListener("error", requestFailed);
        request.addEventListener("load", castFill)
        request.open("GET", `http://api.tvmaze.com/shows/${currentID}/cast`)
        request.send()
    }

    //fill show detail with ajax request of select value
    function detailFill() {
        var e = JSON.parse(this.responseText)
        currentID = e.id

        var details = document.createElement('p')
        var castLink = document.createElement('p')

        //check for null image
        if (e.image != null) {
            details.innerHTML = `<h2>${e.name}</h2><img src=${e.image.medium}></img><br>${e.summary}`
        } else {
            details.innerHTML = `<h2>${e.name}</h2>${e.summary}`
        }

        castLink.textContent = 'CAST'
        castLink.style.color = 'blue'
        castLink.style.fontWeight = 'bold'
        castLink.addEventListener('click', castRequest)
        details.append(castLink)
        showDetail.appendChild(details)

        console.log("status text", this.statusText)
        console.log("status code", this.status)
    }

    //initiate AJAX request with select value
    function displayDetails(event) {
        clearDetails()

        var request = new XMLHttpRequest()
        request.addEventListener("error", requestFailed);
        request.addEventListener("load", detailFill)
        request.open("GET", `http://api.tvmaze.com/singlesearch/shows?q=${select.value}`)
        request.send()
    }

    //fill select drop down with AJAX results: show.name
    function selectFill() {
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
    function showRequest(event) {
        clearAll()

        var inputValue = document.getElementById('show-search').value
        var request = new XMLHttpRequest

        request.addEventListener("error", requestFailed);
        request.addEventListener("load", selectFill)
        request.open("GET", `http://api.tvmaze.com/search/shows?q=${inputValue}`)
        request.send()
    }

    //"error handler"
    function requestFailed(event) {
        console.log("response text", this.responseText)
        console.log("status text", this.statusText)
        console.log("status code", this.status)
    }

    //event listeners
    button.addEventListener('click', showRequest)
    select.addEventListener('change', displayDetails)
}