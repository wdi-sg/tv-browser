let resultArray = [];

const submitClick = (event) => {
    let currentList = document.querySelector('#show-select')
    while (currentList.childNodes.length>3) {
        currentList.removeChild(currentList.lastChild);
    }
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

const showShow = (event) => {
    let showDetail = document.querySelector('#show-detail');
    while (showDetail.childNodes.length>0) {
        showDetail.removeChild(showDetail.lastChild);
    }
    for (let i=0; i<resultArray.length; i++) {
        if (resultArray[i].show.name === event.target.value) {
            let showDetail = document.querySelector('#show-detail');
            let name = document.createElement('h2');
            name.innerText = resultArray[i].show.name;
            showDetail.append(name);
            let img = document.createElement('img');
            img.src = resultArray[i].show.image.medium;
            showDetail.append(img);
            let rating = document.createElement('p');
            rating.innerHTML = `Rating: ${resultArray[i].show.rating.average}`;
            showDetail.append(rating);
            let language = document.createElement('p');
            language.innerHTML = `Language: ${resultArray[i].show.language}`
            showDetail.append(language);
            let genres = document.createElement('ul');
            genres.innerHTML = 'Genres:'
            for (let j=0; j<resultArray[i].show.genres.length; j++) {
                let listItem = document.createElement('li');
                listItem.innerText = resultArray[i].show.genres[j];
                genres.append(listItem);
            }
            showDetail.append(genres);
        }
    }

}

var responseHandler = function() {
    resultArray = JSON.parse(this.responseText);
    for (let i=0; i<resultArray.length; i++) {
        let optionName = document.createElement('option');
        optionName.innerText = resultArray[i].show.name;
        optionName.setAttribute('value', resultArray[i].show.name);
        document.querySelector('#show-select').append(optionName);
  }
};

document.querySelector('#show-select').addEventListener("change", showShow);

function search(arr, s){
    var matches = [], i, key;

    for( i = arr.length; i--; )
        for( key in arr[i] )
            if( arr[i].hasOwnProperty(key) && arr[i][key].indexOf(s) > -1 )
                matches.push( arr[i] );  // <-- This can be changed to anything

    return matches;
};

// dummy data
var items = [
      {
        "foo" : "bar",
        "bar" : "sit"
      },
      {
        "foo" : "lorem",
        "bar" : "ipsum"
      },
      {
        "foo" : "dolor",
        "bar" : "amet"
      }
];

var result = search(items, 'lo'); // search "items" for a query value
console.log(result); // print the result