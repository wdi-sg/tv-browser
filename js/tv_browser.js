// API Docs at:
// http://www.tvmaze.com/api

window.onload = function(){
    let url = `http://api.tvmaze.com/search/shows?q=`

    //if press Submit give response
    var doSubmit = function(event){
        var input = document.getElementById('show-search'); var link = url + input.value
        request.open("GET", link)
        request.send()
        console.log(link)
    return doSubmit
    }

    //link click on button to a function
    document.querySelector('#submit').addEventListener('click', doSubmit);

    //function to translate it to object
    var request = new XMLHttpRequest()

    //function to parse into JSON Object
    var responseHandler = function(){
        var response = JSON.parse(this.responseText)
        console.log(response)
        var girlArray = response

        girlArray.forEach(function(element){
            var selection = document.getElementById('show-select')
            var option = document.createElement('option')
            selection.appendChild(option)
            option.innerText= element.show.name
            return option
        })

    //if press select show give response
    var clickedOption = function(event){
        var response = JSON.parse(this.responseText)
        var showDetail = document.getElementById('show-detail')
        var title = document.createElement('h1')
        showDetail.appendChild(title)
        var para = document.createElement('p')
        showDetail.appendChild(para)
        var image = document.createElement('img')
        showDetail.appendChild(image)

        title.innerHTML = this.show.name
        image.setAttribute('src' , this.show.image.medium )
        para.innerHTML = this.show.summary
        console.log(option)
    }

    //link click on show select
    document.getElementById('show-select').addEventListener('onchange' , clickedOption)
    
    //make request
    var request = new XMLHttpRequest()

    // //run code for details
    // var responseHandler = function(){
    //     var response = JSON.parse(this.responseText)
    //     var showDetail = document.getElementById('show-detail')
    //     var title = document.createElement('h1')
    //     showDetail.appendChild(title)
    //     var para = document.createElement('p')
    //     showDetail.appendChild(para)
    //     var image = document.createElement('img')
    //     showDetail.appendChild(image)

    //     title.innerHTML = this.show.name
    //     image.setAttribute('src' , this.show.image.medium )
    //     para.innerHTML = this.show.summary
    //     return responseHandler
    // }
    
    }
    //function to load
    request.addEventListener("load", responseHandler)
}