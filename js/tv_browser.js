window.onload = function() {
    var button = document.getElementsByTagName('button')[0]
    var board = document.getElementById('search-form')

    function retrieveResults(event) {
        var inputValue = document.getElementsByTagName('input')[0].value
        var responseHandler = function() {
            var responseObject = JSON.parse(this.responseText)
            var result = []
            for (i in responseObject) {
                result.push(responseObject[i].show.name)
                var display = document.createElement('p')
                display.textContent = result[i]
                board.appendChild(display)
            }
            console.log("status text", this.statusText)
            console.log("status code", this.status)
            console.log(inputValue)

        }

        var request = new XMLHttpRequest()
        request.addEventListener("load", responseHandler)
        request.open("GET", `http://api.tvmaze.com/search/shows?q=${inputValue}`)
        request.send()


    }
    button.addEventListener('click', retrieveResults)
}