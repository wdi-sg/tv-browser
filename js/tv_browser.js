//DOM variables
const inputField = document.querySelector("input");
const submitButton = document.querySelector("button");
const optionSelector = document.querySelector("select");

//Lists
const showNameArray = [];
    //consider refactoring re: having two overlapping arrays - assignment's further requirements has resulted in need to obtain other key values.
const showsArray = [];
let selectedShow;

//XHR Function
const sendRequestTVM = (endpoint) => {

    const promise = new Promise((resolve, reject) => {

        const xhr = new XMLHttpRequest();
        xhr.open('GET', `http://api.tvmaze.com/${endpoint}`);
        xhr.responseType = 'json';

        xhr.onload = () => {
            resolve(xhr.response);
        }
        xhr.send();
    });
    return promise;
}


//Handlers, DOM and API Functions
const resetSearchResults = () => {
    optionSelector.innerHTML = `<option value="">Select a show</option>`;
    document.getElementById("show-detail").innerHTML = "";
    showNameArray.length = 0;
    showsArray.length = 0;
}

const getShowByName = () => {
    resetSearchResults();
    optionSelector.classList.remove("hide");
    let showName = inputField.value;

    sendRequestTVM(`/search/shows?q=${showName}`)
    .then(responseData => {

        for (let i = 0; i < responseData.length; i++){

            showNameArray.push(responseData[i].show.name);
            showsArray.push(responseData[i].show)
        }

        for (let i = 0; i < showNameArray.length; i++) {

            let option = document.createElement("option");
            option.innerText = showNameArray[i];
            optionSelector.appendChild(option);
        }
    })

    .catch(err => console.log(err));
}

const getShowInformation = () => {

    document.getElementById("show-detail").innerHTML = "";
    let showName = optionSelector.value;

    for (let i = 0; i < showsArray.length; i++) {

        if (showName === showsArray[i].name) {
            selectedShow = showsArray[i];
            let showInfoSection = document.createElement("div");
            showInfoSection.classList.add("show-info");
            showInfoSection.innerHTML = `
                <p><b>Title:</b> ${selectedShow.name}</p>
                <p><b>Genres:</b> ${selectedShow.genres.join(", ")}</p>
                <p>${selectedShow.summary}\n</p>
                </p><a href="${selectedShow.officialSite}">link<a>\n</p>
            `
            document.getElementById("show-detail").appendChild(showInfoSection);
        }
    }
}

submitButton.addEventListener("click", getShowByName);
optionSelector.addEventListener("click", getShowInformation)
optionSelector.addEventListener("mouseup", () => {
    if (optionSelector.value) {
        optionSelector.classList.add("hide");
    }
})