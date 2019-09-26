// API Docs at:
// http://www.tvmaze.com/api
let query;
const input = document.getElementById("show-search");
const select = document.getElementById("show-select");
const display = document.getElementById("show-detail");
const option = document.getElementsByTagName("option");
const request = new XMLHttpRequest();

display.style.display = "flex";
display.style.flexDirection = "column";
display.style.alignItems = "space-around";

input.addEventListener("change", (event) => {
  query = event.target.value;
  requestShow(query);
  input.value = "";
});

const responseHandler = function() {
  const response = JSON.parse(this.responseText);
  console.log(response);
  for (let i = 0; i < response.length; i++) {
    const option = document.createElement("option");
    option.value = response[i].show.name;
    option.innerHTML = response[i].show.name;
    select.appendChild(option);
  }
  // remove old data
  while (display.firstChild) {
    display.removeChild(display.firstChild);
  }
  displayShow(response);
};

select.addEventListener("change", () => {
  const index = select.selectedIndex;
  console.log(index);
  query = option[index].value;
  while (select.firstChild.nextSibling) {
    select.removeChild(select.firstChild.nextSibling);
  }
  requestShow(query);
});

select.classList.add("hide-select");

function requestShow(query) {
  request.addEventListener("load", responseHandler);
  request.open("GET", `http://api.tvmaze.com/search/shows?q=${query}`);
  request.send();
  select.classList.remove("hide-select");
}

function displayShow(response) {
  for (let i = 0; i < response.length; i++) {
    createDisplay(response[i].show);
  }
}

function createDisplay(response) {
  const showKeyArr = Object.keys(response);
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  display.appendChild(container);
  for (let i = 0; i < showKeyArr.length; i++) {
    createElements(response, container, showKeyArr[i]);
  }
}

function createElements(show, container, key) {
  if (show[key] !== null) {
    const p = document.createElement("p");
    const a = document.createElement("a");
    switch (key) {
      case "externals":
        break;
      case "id":
        break;
      case "genres":
        p.innerHTML = `genres: `;
        for (let i = 0; i < show[key].length; i++) {
          const span = document.createElement("span");
          span.innerHTML = `${show[key][i]} `;
          p.appendChild(span);
        }
        container.appendChild(p);
        break;
      case "image":
        const img = document.createElement("img");
        img.setAttribute("class", "image");
        img.src = show[key].medium;
        img.alt = show.name;
        container.appendChild(img);
        break;
      case "network":
        p.innerHTML = `Country: ${show[key].country.name}, ${show[key].name}`;
        container.appendChild(p);
        break;
      case "name":
        const h2 = document.createElement("h2");
        h2.innerHTML = `${show[key]}\t`;
        a.href = show.url;
        a.innerHTML = "url";
        container.appendChild(h2);
        h2.appendChild(a);
        break;
      case "rating":
        p.innerHTML = `Rating: ${show[key].average}`;
        container.appendChild(p);
        break;
      case "schedule":
        p.innerHTML = `Schedule: ${show[key].time} `;
        for (let i = 0; i < show[key].days.length; i++) {
          const span = document.createElement("span");
          span.innerHTML = `${show[key].days[i]} `;
          p.appendChild(span);
        }
        container.appendChild(p);
        break;
      case "officialSite":
        a.href = show[key];
        a.innerHTML = "Official Site";
        container.appendChild(a);
        break;
      case "url":
        break;
      case "webChannel":
        break;
      case "updated":
        const currentTime = new Date(parseInt(show[key]));
        const month = currentTime.getMonth() + 1;
        const day = currentTime.getDate();
        const year = currentTime.getFullYear();
        const date = year + "-" + month + "-" + day;
        p.innerHTML = `${key}: ${date}`;
        container.appendChild(p);
        break;
      case "_links":
        break;
      default:
        p.innerHTML = `${key}: ${show[key]}`;
        container.appendChild(p);
        break;
    }
  }
}
