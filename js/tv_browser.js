// API Docs at:
// http://www.tvmaze.com/api

// key in the search item into the input
// hit submit to pass the data 
// return the result into the dropdown
// show the movie info when select on the drop down list

const input = document.getElementById("show-search")
const button = document.getElementById("submit")
const dropMenu = document.getElementById("show-select")
const showDetail = document.getElementById("show-detail")

const request = new XMLHttpRequest();

button.addEventListener("click", onSubmit)

function getData() {
    return new Promise ((resolve, reject) => {
        request.addEventListener("load", function() {
            let data = JSON.parse(this.responseText)
            resolve(data)          
        })
        request.addEventListener("error", function() {
            reject("THIS IS NOT WORKING")
        })
    })
}
getData()
    .then((data) => {
        data.forEach(name => {
            let option = document.createElement("option")
            option.setAttribute("id", name.show.id)
            option.textContent = name.show.name;
            dropMenu.appendChild(option);

            showID = option.id;
        })
    })
    .catch((text) => {
        console.log(text)
    })


function onSubmit() {
    let url = input.value;
    request.open("GET", "http://api.tvmaze.com/search/shows?q=" + url)
    request.send()
    console.log(url)
}

