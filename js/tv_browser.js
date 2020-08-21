// API Docs at:
// http://api.tvmaze.com/search/shows?q=girls

const submitButton = document.getElementById("submit");
const inputField = document.getElementById("show-search");
const showDetails = document.getElementById("show-detail");
const showSelect = document.getElementById('show-select');
const showName = document.createElement('h2');
const showRating = document.createElement('h3');
const showSummary = document.createElement('p');
// const showOption = document.createElement('option');

showDetails.appendChild(showName);
showDetails.appendChild(showRating);
showDetails.appendChild(showSummary);


let selectHandler = () => {
    selection = event.target.value;

      fetch(`http://api.tvmaze.com/singlesearch/shows?q=${selection}`)
        .then(response => response.json())
        .then(entry => {
            console.log(entry)

            showName.innerText = entry.name;
            showRating.innerText = `Average Rating: ${entry.rating.average}`;
            showSummary.innerHTML = entry.summary;

        })
        .catch(error => window.alert("Oops! Something went wrong"))
}

let clickHandler = () => {
    inputValue = inputField.value;
    console.log(inputValue);
    fetch(`http://api.tvmaze.com/search/shows?q=${inputValue}`)
        .then(response => response.json())
        .then(jsonData => {
            console.log(jsonData);
            showSelect.innerHTML = null;
            jsonData.forEach(entry => {
                showOption = document.createElement('option');
                showOption.value = entry.show.name;
                showOption.innerText = entry.show.name;

                showSelect.appendChild(showOption);
                showSelect.style.display = "block";

            //     showName = document.createElement('h2');
            //     showRating = document.createElement('h3');
            //     showSummary = document.createElement('p');

            //     showName.innerText = entry.show.name;
            //     showRating.innerText = `Average Rating: ${entry.show.rating.average}`;
            //     showSummary.innerHTML = entry.show.summary;

            //     document.getElementById("show-detail").appendChild(showName);
            //     document.getElementById("show-detail").appendChild(showRating);
            //     document.getElementById("show-detail").appendChild(showSummary);

            });
        });
         // .catch(error => window.alert("Oops! Something went wrong."))
}

submitButton.addEventListener('click', clickHandler);
showSelect.addEventListener('change', selectHandler);