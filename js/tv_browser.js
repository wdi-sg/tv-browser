let mazemazeArray = [];

const submitClick = (event) => {
    let input = document.querySelector('#show-search')
    let searchTerm = input.value;
    ajaxFunction(searchTerm)
    document.querySelector('#firstChild').innerText = `Shows matching '${searchTerm}'...`
    document.querySelector('#show-select').style.visibility = 'visible';
    input.value = "";
}

document.querySelector('#submit').addEventListener('click', submitClick);

const ajaxFunction = (value) => {
    var request = new XMLHttpRequest();
    request.addEventListener("load", responseHandler);
    console.log(event.target.value)
    request.open("GET", `http://api.tvmaze.com/search/shows?q=${value}`);
    request.send();
}

const listAjax = (event) => {
    var request = new XMLHttpRequest();
    request.addEventListener("load", listHandler);
    console.log(event.target.value)
    request.open("GET", `http://api.tvmaze.com/search/shows?q=${event.target.value}`);
    request.send();
}

var responseHandler = function() {
    console.log("response text", this.responseText);
    console.log("status text", this.statusText);
    console.log("status code", this.status);
    mazeArray = JSON.parse(this.responseText);
    for (let i=0; i<mazeArray.length; i++) {
        let optionName = document.createElement('option');
        optionName.innerText = mazeArray[i].show.name;
        optionName.setAttribute('value', mazeArray[i].show.name);
        document.querySelector('#show-select').append(optionName);
  }
};

var listHandler = function() {
    let currentList = document.querySelector('#show-select')
    while (currentList.firstChild) {
        currentList.removeChild(currentList.firstChild);
    }
    console.log("response text", this.responseText);
    console.log("status text", this.statusText);
    console.log("status code", this.status);
    let array = JSON.parse(this.responseText);
        for (let i=0; i<array.length; i++) {
        let optionName = document.createElement('option');
        optionName.innerText = array[i].show.name;
        optionName.setAttribute('value', array[i].show.name);
        document.querySelector('#show-select').append(optionName);
  }
};

document.querySelector('#show-select').addEventListener("change", listAjax);