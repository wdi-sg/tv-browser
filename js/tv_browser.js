// API Docs at:
// http://www.tvmaze.com/api
var div = document.getElementById('show-detail');
var select = document.getElementById('show-select');

var changeValue = function () {
    var value = select.value;
    var target = document.getElementById(value);
    target.scrollIntoView();
}



//when the click occurs, run this function
var responseHandler = function() {
    info = JSON.parse(this.responseText);

    for(var i=0; i<info.length; i++) {
        var name = info[i].show.name;
        var genre = info[i].show.genres; //array form
        var summary = info[i].show.summary;
        var rating = info[i].show.rating.average;
        var language = info[i].show.language;
        var image = info[i].show.image;

        var option = document.createElement("option");
        option.text = name;
        select.add(option);


        //creating a list where the img and rest should lie within the list div
        var list = document.createElement('div');
            list.id = name;
        var img = document.createElement('div');
        var rest = document.createElement('div');
        
        img.classList.add('image');
        //checking whether there are images
        if(image != null) {
            img.style.backgroundImage = image.medium;
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
    }

    console.log("response text", info);
    console.log("status text", this.statusText);
    console.log("status code", this.status);
  };



function everything () {
    var input = document.getElementById('show-search');
    var button = document.getElementsByTagName('button');
    var info;
    var request = new XMLHttpRequest();

    button[0].addEventListener('click', function () {
        var search = input.value;
        request.addEventListener("load", responseHandler);
        request.open("GET", "http://api.tvmaze.com/search/shows?q=" + search);
        request.send();

    })
}

window.onload = everything();


