// API Docs at:
// http://www.tvmaze.com/api

var request = new XMLHttpRequest();

var display = document.getElementById('show-detail')
const inputElement = document.getElementById('show-search');
const submitBtn = document.getElementById('submit-btn');
const url = `http://api.tvmaze.com/search/shows?q=`
const dropdown = document.getElementById('show-select');

submitBtn.addEventListener('click', submitRequest)

function kebabCase(string) {
    return string.replace(/\s/g, `-`).toLowerCase();
}

function submitRequest() {
    var userInput = inputElement.value;
    var inputValue = kebabCase(userInput); //turns all queries into kebab case
    document.getElementById('first-option').innerText = `Shows matching "${userInput}"`;
    var query = url + inputValue;
    request.open("GET", query);
    request.send();
    request.addEventListener("load", populateDropDown);
    request.addEventListener("error", requestFailed);
    inputElement.value = "";
}

function populateDropDown() {
    dropdown.classList.remove('hide');
    display.innerText = "";
    console.log(`responseHandler triggered`)
    var results = JSON.parse(this.responseText);
    for (var index = 0; index < results.length; index++) {
        var itemDropDown = document.createElement("option")
        itemDropDown.innerText = results[index].show.name;
        itemDropDown.value = kebabCase(results[index].show.name);
        dropdown.appendChild(itemDropDown);
    }
};


var requestFailed = function() {
    console.log(`requestFailed triggered`)
    console.log("status code", this.status);
    console.log(`There was an error.`)
    display.innerText = `There was an error.`;
};


dropdown.addEventListener('change', getOneShow);

function getOneShow() {
    var selectedShow = this.value;
    var singleSearchURL = `http://api.tvmaze.com/singlesearch/shows?q=`;
    var query = singleSearchURL + selectedShow
    console.log(query);
    request.open('GET', query);
    request.send();
    request.addEventListener("load", displayShow);
    request.addEventListener("error", requestFailed);
}

function displayShow() {
    display.innerText = "";
    var results = JSON.parse(this.responseText);
    var itemName = document.createElement("h1");
    var itemDesc = document.createElement("p");
    var itemImage = document.createElement('img')
    itemImage.src = results.image.medium
    itemName.innerText = results.name;
    itemDesc.innerHTML = results.summary;
    display.appendChild(itemName);
    display.appendChild(itemImage)
    display.appendChild(itemDesc);
    breakdownObject(results);
}

var breakdownObject = function(objectName) {
    var objectItems = Object.keys(objectName); //Returns array of all the key values
    for (var i = 0; i < objectItems.length; i++) {
        var info = document.createElement("p");
        var key = document.createElement("span");
        key.classList.add('bold');
        var value = document.createElement("span");
        var result = objectName[objectItems[i]];
        if (isPlainObject(result)) {
            breakdownObject(result);
        } else {
            key.innerHTML = `${capitalise(objectItems[i])}: `;
            value.innerHTML = result;
            info.appendChild(key);
            info.appendChild(value)
            display.appendChild(info);
        }
    }
};

var isPlainObject = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
};

function capitalise(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

var gameofthrones = {
    "id": 82,
    "url": "http://www.tvmaze.com/shows/82/game-of-thrones",
    "name": "Game of Thrones",
    "type": "Scripted",
    "language": "English",
    "genres": [
        "Drama",
        "Adventure",
        "Fantasy"
    ],
    "status": "Ended",
    "runtime": 60,
    "premiered": "2011-04-17",
    "officialSite": "http://www.hbo.com/game-of-thrones",
    "schedule": {
        "time": "21:00",
        "days": [
            "Sunday"
        ]
    },
    "rating": {
        "average": 9.1
    },
    "weight": 97,
    "network": {
        "id": 8,
        "name": "HBO",
        "country": {
            "name": "United States",
            "code": "US",
            "timezone": "America/New_York"
        }
    },
    "webChannel": {
        "id": 22,
        "name": "HBO Go",
        "country": {
            "name": "United States",
            "code": "US",
            "timezone": "America/New_York"
        }
    },
    "externals": {
        "tvrage": 24493,
        "thetvdb": 121361,
        "imdb": "tt0944947"
    },
    "image": {
        "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/190/476117.jpg",
        "original": "http://static.tvmaze.com/uploads/images/original_untouched/190/476117.jpg"
    },
    "summary": "<p>Based on the bestselling book series <i>A Song of Ice and Fire</i> by George R.R. Martin, this sprawling new HBO drama is set in a world where summers span decades and winters can last a lifetime. From the scheming south and the savage eastern lands, to the frozen north and ancient Wall that protects the realm from the mysterious darkness beyond, the powerful families of the Seven Kingdoms are locked in a battle for the Iron Throne. This is a story of duplicity and treachery, nobility and honor, conquest and triumph. In the <b>Game of Thrones</b>, you either win or you die.</p>",
    "updated": 1580402781,
    "_links": {
        "self": {
            "href": "http://api.tvmaze.com/shows/82"
        },
        "previousepisode": {
            "href": "http://api.tvmaze.com/episodes/1623968"
        }
    }
}
