// API Docs at:
// http://www.tvmaze.com/api
window.onload = function(){
    let url = `http://api.tvmaze.com/search/shows?q=`
    var selection = document.getElementById('show-select')
    var girlArray;


    //if press Submit give response
    var doSubmit = function(event){
        var input = document.getElementById('show-search'); var link = url + input.value
        request.addEventListener("load", responseHandler)
        request.open("GET", link)
        request.send()
        console.log(link)
    }

    //link click on button to a function
    document.querySelector('#submit').addEventListener('click', doSubmit);

    //function to translate it to object
    var request = new XMLHttpRequest()

    //function to parse into JSON Object
    var responseHandler = function(){

        console.log("status code: ", this.status);
        girlArray = JSON.parse(this.responseText)
        console.log(girlArray)

        girlArray.forEach(function(element){
            var option = document.createElement('option')
            selection.appendChild(option)
            option.setAttribute("value",element.show.name)
            option.innerText= element.show.name
        })

    }

    //run code for details
    var giveDetails = function(){

        var showDetail = document.getElementById('show-detail')
    
        while(showDetail.firstChild){
            showDetail.removeChild(showDetail.firstChild)
        }

            var title = document.createElement('h1')
            showDetail.appendChild(title)
            var para = document.createElement('p')
            showDetail.appendChild(para)
            var image = document.createElement('img')
            showDetail.appendChild(image)

            title.innerHTML = this.value
            console.log(this.value)

            image.setAttribute("src", girlArray[this.options.selectedIndex -1].show.image.medium)
            console.log(image.src);

            para.innerHTML = girlArray[this.options.selectedIndex -1].show.summary
            console.log(para)
        }
    //function to load 
    selection.addEventListener('change' , giveDetails)
}