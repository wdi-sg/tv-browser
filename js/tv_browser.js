// API Docs at:
// http://www.tvmaze.com/api


window.onload = function() { // what to do when we recieve the request
    var request = new XMLHttpRequest();
    var ulistDiv = document.createElement('ul');
    var showSelect = document.querySelector('select[id="show-select"]');
    var showDetail = document.getElementById('show-detail');
    var input = document.querySelector('#show-search');
    var response

    var doSubmit = function(event) {
        var url = "http://api.tvmaze.com/search/shows?q=" + input.value;
        // ready the system by calling open, and specifying the url
        request.open("GET", url);

        // send the request
        request.send();
    };

    var responseHandler = function() {
        console.log("response text", this.responseText);
        response = JSON.parse(this.responseText);
        showlist(response);
    };

    var requestFailed = function() {
        console.log("response text", this.responseText);
        console.log("status text", this.statusText);
        console.log("status code", this.status);
    };

    // listen for the request response
    request.addEventListener("load", responseHandler);
    request.addEventListener("error", requestFailed);

//issue: Need to clear previous list
    var showlist = function(list) {
        var showArr = [];
        for (var i = 0; i < list.length; i++) {
            showArr.push(list[i].show.name);
            var listDiv = document.createElement('option');
            listDiv.textContent = list[i].show.name;
            listDiv.setAttribute('value', list[i].show.name);
            showSelect.appendChild(listDiv);
        }
        firstOption = document.querySelector('option')
        firstOption.textContent = "Shows matching " + input.value + "...";
        showSelect.style.display="block";

        return showArr
    }

    var showChosen = function(event) {
        var selected = document.querySelector('select[id="show-select"]').value;
        console.log(selected);
        for (var i=0; i<response.length;i++){

//issue: works but returns error

        if (response[i].show.name === selected) {

            var itemHolder = document.createElement('div')
            var image = document.createElement('img')
            var selectedName = document.createElement('div')

            var imageUrl = response[i].show.image.medium;

            itemHolder.classList.add('items-holder')

            selectedName.classList.add('name')
            selectedName.textContent = selected;

            image.classList.add('showImage');
            image.setAttribute('src', imageUrl);

            itemHolder.appendChild(image);
            itemHolder.appendChild(selectedName);

            showDetail.appendChild(itemHolder);

        }
    }
            showSelect.addEventListener('change', function(){
                itemHolder.parentNode.removeChild(itemHolder);
            })

    }

    var clearList = function(){
    }


    document.querySelector('#submit').addEventListener('click', doSubmit);
    showSelect.addEventListener('change', showChosen);
    input.addEventListener('change', clearList);


}