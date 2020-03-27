// API Docs at:
// http://www.tvmaze.com/api

console.log("hi ajax");
var url;
var contentName = [];
var contentLang = [];
var contentUrl = [];
var contentImg = [];
var contentRating = [];
var contentSummary = [];
var runSuccess = 0;
var optionSuc = 0;
var optDel = [];
var pDel = [];
var imgDel = [];
var inputLength;

var responseHandler = function() {
    contentName = [];
    contentLang = [];
    vcontentUrl = [];
    contentImg = [];
    contentRating = [];
    contentSummary = [];

    if (optionSuc == 1) {
        console.log("removing")
        optDel = document.querySelectorAll('option');
        for (var i=0 ; i<inputLength ; i++) {
            optDel[i].remove();
            console.log(optDel[i]);
        }
    }

    console.log("WWWOOOWWWW");

      // this keyword refers to the XMLHttpRequest
    console.log("response text", this.responseText);

      // transform text data into javascript object
    var response = JSON.parse(this.responseText);
      // console.log("status text", this.statusText);
      // console.log("status code", this.status);
    console.log("afterJson"+response);

      // cat pics
      // var img = document.createElement('img');
      // img.setAttribute("src",response[0].url)
      // document.body.appendChild(img);
    inputLength = response.length;
    for(var i=0; i<inputLength ; i++) {

        var name = response[i].show.name;
        contentName.push(name);

        var lang = response[i].show.language;
        contentLang.push(lang);

        var url = response[i].show.url;
        contentUrl.push(url);

        if(response[i].show.image != null) {
        var img = response[i].show.image.medium;
        } else {
            img = "undefined";
        }
        contentImg.push(img);


        var rating = response[i].show.rating.average;
        if(response[i].show.rating.average == null){
            rating = "No review";
        }
        contentRating.push(rating);

        var summary = response[i].show.summary;
        contentSummary.push(summary);

        // var ptag = document.createElement('p');
        // console.log(content);

        // showDetail = document.querySelector("#show-detail")
        // showDetail.appendChild(ptag);

        console.log(name,url,lang);
    }




    for (var i=0 ; i<contentName.length ; i++) {
        var select = document.querySelector("select");
        var option = document.createElement('option');
        option.setAttribute("value",i);
        option.textContent = contentName[i];
        select.appendChild(option);
        optionSuc = 1;
    }

};

//URL = http://api.tvmaze.com/search/shows?q
//to get user input
var doSubmit = function(event){
    var unhide = document.querySelector("#hide");
    unhide.classList.remove('hide');


    var input = document.querySelector('#show-search');
    var url1 = input.value;
    var url2 = "http://api.tvmaze.com/search/shows?q=";
    var url = url2.concat(url1);
    console.log(url);

    var request = new XMLHttpRequest();
    // listen for the request response
    request.addEventListener("load", responseHandler);
    request.open("GET", url);
    request.send();

    request.addEventListener("error", requestFailed);
}

var doSubmit2 = function(event){
    var detail = document.querySelector("#show-detail");

    //removing
    if(runSuccess ==1) {
        pDel = document.querySelectorAll('p');

        for (var i=0 ; i<pDel.length ; i++) {
        imgDel = document.querySelectorAll('img');
        pDel[i].remove();
        }
        imgDel[1].remove();
   }

    var index = document.querySelector("select").selectedIndex;
    console.log(index);



    var name = document.createElement('p');
    var lang = document.createElement('p');
    var img = document.createElement('img');
    var rating = document.createElement('p');
    var summary = document.createElement('p');
    img.setAttribute("src",contentImg[index]);

    name.textContent = contentName[index];
    detail.appendChild(name);
    img.textContent = contentImg[index];
    detail.appendChild(img);
    lang.textContent = "Language: "+contentLang[index];
    detail.appendChild(lang);
    rating.textContent = "Rating: "+contentRating[index];
    detail.appendChild(rating);
    summary.innerHTML = contentSummary[index];
    detail.appendChild(summary);

    runSuccess = 1;
}

var requestFailed = function(){
  console.log("response text", this.responseText);
  console.log("status text", this.statusText);
  console.log("status code", this.status);
};

// starts here
var button = document.querySelector("#submit");
button.addEventListener("click", doSubmit)

var button2 = document.querySelector("#submit2");
button2.addEventListener("click", doSubmit2)