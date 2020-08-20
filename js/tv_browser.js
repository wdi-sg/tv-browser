// API Docs at:
// http://www.tvmaze.com/api
var rootURL = "http://api.tvmaze.com/search/shows?q="
var submitButton = document.querySelector("#submit-button")
var showSearchInput = document.querySelector("#show-search")
var dropdownList = document.querySelector("#show-select")
var resultDiv = document.querySelector("#show-detail")


dropdownList.classList.add("hide")
submitButton.addEventListener("click", onSubmitEvent)


function onSubmitEvent(){
    resultDiv.innerHTML = ""
    dropdownList.innerHTML = "<option value=''>Select a show...</option>"
    fetch("http://api.tvmaze.com/search/shows?q=" + showSearchInput.value)
        .then(response => response.json())
        .then(function(response){
            console.log(response)
            response.forEach(function(item){
                var newOption = document.createElement("option")
                newOption.innerText = item.show.name
                newOption.id = item.show.id
                dropdownList.appendChild(newOption)
            })
            dropdownList.classList.remove("hide")
            dropdownList.addEventListener("change", function(){
                var selectedOption = document.querySelector("option:checked")
                resultDiv.innerHTML = ""
                for(i=0;i<response.length;i++){
                    if(response[i].show.id == selectedOption.id){
                        var chosenShow = response[i]
                    }
                }

                var showTitle = document.createElement("h2")
                showTitle.innerHTML = chosenShow.show.name
                resultDiv.appendChild(showTitle)

                if(chosenShow.show.image&&chosenShow.show.image.medium){
                    var showImg = document.createElement("img")
                    showImg.src = chosenShow.show.image.medium
                    resultDiv.appendChild(showImg)
                }

                var showSummary = document.createElement("p")
                showSummary.innerHTML = chosenShow.show.summary
                resultDiv.appendChild(showSummary)

                var castTitle = document.createElement("h2")
                castTitle.innerText = "Cast"
                resultDiv.appendChild(castTitle)

                var showCast = document.createElement("ul")
                fetch("http://api.tvmaze.com/shows/" + chosenShow.show.id + "/cast")
                    .then(castResponse => castResponse.json())
                    .then(function(castResponse){
                        castResponse.forEach(function(item){
                            var castMember = document.createElement("li")
                            castMember.innerHTML = `<a href='${item.person.url}'>${item.person.name}</a>`
                            showCast.appendChild(castMember)
                        })
                        resultDiv.appendChild(showCast)
                    })
            })

        })
        .catch(err=>console.log(err))
}