// API Docs at:
// http://www.tvmaze.com/api




    // Submit button
    var submitButton = document.getElementById('submit');
    var dropDown = document.getElementById('show-select')
    
    var responseHandler = function () {
        // console.log("response text", this.responseText);
        var response = JSON.parse(this.responseText);
        for (let i = 0; i<response.length; i++) {
            var el = document.createElement('option');
            el.innerText = response[i].show.name 
            dropDown.appendChild(el)
        }
        ;
    };
    

    var requestFailed = function () {
        // console.log("response text", this.responseText);
        // console.log("status text", this.statusText);
        // console.log("status code", this.status);
    };



    var submitSearch = function(event) {
       var searchBar = document.getElementById('show-search')
       var searchWord = searchBar.value;
       var url = `http://api.tvmaze.com/search/shows?q=${searchWord}`
       
    var request = new XMLHttpRequest();

    request.addEventListener("load", responseHandler);

    request.open("GET", url);
       
    request.send();
 
    var el = document.createElement('p');
    
    request.addEventListener("error", requestFailed);
    }



    submitButton.addEventListener('click', submitSearch)


