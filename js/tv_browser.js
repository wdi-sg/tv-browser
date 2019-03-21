const button = document.querySelector("button");
const input = document.getElementById("show-search");
const select = document.getElementById("show-select");

var responseHandler = function() {
    let response = JSON.parse(this.responseText);
    createOptions(response);
};

var doSubmit = function(){
    let url = input.value;
    let request = new XMLHttpRequest();
    select.style.visibility = "visible";
    request.addEventListener("load",responseHandler);
    request.open("GET", "http://api.tvmaze.com/search/shows?q="+url);
    request.send();
};

function createOptions(obj){
    const firstOption = document.querySelector("option");
    firstOption.textContent = `Shows matching ${input.value}`;
    const arrOfOption = [];
    for (let i = 0; i < obj.length; i++) {
        let option = document.createElement("option");
        option.setAttribute("value",obj[i].show.name);
        option.textContent = obj[i].show.name;
        // option.setAttribute("onclick","ajaxCall()");
        arrOfOption.push(option);
        console.log(option);
        select.appendChild(arrOfOption[i]);
    }
}

function renderShow(obj){
    const div = document.getElementById("show-detail");
        var h2 = document.createElement("h2");
        var img = document.createElement("img");
        var paragraph = document.createElement("p");
        h2.textContent = obj.name;
        img.setAttribute("src",obj.image.medium);
        paragraph.textContent = obj.summary;
        div.appendChild(h2);
        div.appendChild(img);
        div.appendChild(paragraph);
}

function responseHandler2(){
    let response = JSON.parse(this.responseText);
    renderShow(response);
}

function ajaxCall(){
    let url = this.value;
    let request = new XMLHttpRequest();
    request.addEventListener("load",responseHandler2);
    request.open("GET", "http://api.tvmaze.com/singlesearch/shows?q="+url);
    request.send();
}

button.addEventListener("click",doSubmit);
select.addEventListener("change",ajaxCall);