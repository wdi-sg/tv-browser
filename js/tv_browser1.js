// API Docs at:
// http://www.tvmaze.com/api
var div = document.getElementById('show-detail');
var select = document.getElementById('show-select');
var input = document.getElementById('show-search');
var button = document.getElementsByTagName('button');
var request = new XMLHttpRequest();
var info;

//when the click occurs, run this function
var responseHandler = function() {
    info = JSON.parse(this.responseText);

    for(var i=0; i<info.length; i++) {
        var name = info[i].show.name;

        var option = document.createElement("option");
        option.text = name;
        select.add(option);
    }
  };


//when the select option changes, run this function
var responseHandler2 = function() {
    info = JSON.parse(this.responseText);

    var name = info[0].show.name;
    var genre = info[0].show.genres; //array form
    var summary = info[0].show.summary;
    var rating = info[0].show.rating.average;
    var language = info[0].show.language;
    var image = info[0].show.image;

    var list = document.createElement('div');
            list.id = name;
    var img = document.createElement('div');
    var rest = document.createElement('div');

    img.classList.add('image');
    //checking whether there are images
    if(image != null) {
        console.log('image');
        console.log(image.medium)
        img.style.backgroundImage = 'url(' + image.medium + ')';
        img.style.width = "210px";
        img.style.height = "300px";
    } else {
        img.style.backgroundImage = "can't find image"
    }

    rest.classList.add('rest');
    //creating paragraphs for text details and adding text
    namePara = document.createElement('h1');
    namePara.innerText = 'name: ' + name;
    genrePara = document.createElement('p');
    genrePara.innerText = 'genre: '
    for (var a=0; a<genre.length; a++) {
        if(a+1 == genre.length) {
            genrePara.innerText = genrePara.innerText + genre;
        } else {
            genrePara.innerText = genrePara.innerText + genre + ", ";
        }
    }
    summaryPara = document.createElement('p');
    summaryPara.innerHTML = 'summary: ' + summary;
    ratingPara = document.createElement('p');
    ratingPara.innerText = 'rating: ' + rating;
    languagePara = document.createElement('p');
    languagePara.innerText = 'language: ' + language;

    //adding name, genre, summary 
    rest.appendChild(namePara);
    rest.appendChild(genrePara);
    rest.appendChild(summaryPara);
    rest.appendChild(ratingPara);
    rest.appendChild(languagePara);

    list.appendChild(img);
    list.appendChild(rest);

    div.appendChild(list);
};


function everything () {
    //when submit button is pressed
    button[0].addEventListener('click', function () {
        var search = input.value;
        request.addEventListener("load", responseHandler);
        request.open("GET", "http://api.tvmaze.com/search/shows?q=" + search);
        request.send();

        //delete all options from the select button
        for(var i = select.options.length-1; i>=0;i--) {
            select.removeChild(select.options[i]);
        }

        //delete child Nodes from the show details section
        for(var i=0; i<div.childNodes.length; i++) {
            div.childNodes[i].remove();
        }

        //show select option + first option
        select.style.display = "block";
        var option = document.createElement("option");
        option.text = "Shows matching " +  search + "...";
        select.add(option);
    })

    //add the stuff when the select options change in value
    select.addEventListener('change', function () {
        var text = event.target.value;
        request.addEventListener('load', responseHandler2)
        request.open('GET', "http://api.tvmaze.com/search/shows?q=" + text);
        request.send();
    })
}

window.onload = everything();