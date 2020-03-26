// API Docs at:
// http://www.tvmaze.com/api

const userInput = document.getElementById('show-search');

const getInput = (event) => {
    const main = document.querySelector('main');
    const showInput = document.createElement('p');
    showInput.textContent = userInput.value;
    main.appendChild(showInput);
}

const button = document.querySelector('button');
button.addEventListener('click', getInput);