// API Docs at:
// http://www.tvmaze.com/api

document.addEventListener('DOMContentLoaded', () => {

  // select the submit button
  let inputs = document.getElementsByTagName('input');
  let submitBtn = Array.from(inputs).filter(input => {
    return input.value === 'Submit'
  })[0];

  // select the input field
  let inputField = document.getElementById('show-search');

  // select the show details area
  let showDetailDiv = document.getElementById('show-detail');

  // select dropdown menu
  let selectMenu = document.getElementById('show-select');
  selectMenu.style.visibility = 'hidden';
  
  // search function
  const searchFunction = (e) => {
    e.preventDefault();
    
    // toggle visibility for dropdown menu
    selectMenu.style.visibility = 'unset';
    
    let queryParams = inputField.value;
    let endPoint = `http://api.tvmaze.com/search/shows?q=${queryParams}`;
    
    // create the search params option
    let paramsOption = document.createElement('option');
    paramsOption.innerText = `Shows matching ${queryParams}`;
    
    // remove the default option
    while(selectMenu.firstChild){
      selectMenu.removeChild(selectMenu.firstChild);
    }

    selectMenu.appendChild(paramsOption);

    fetch(endPoint).then(res => {
      return res.json();
    }).then(datas => {
      // console.log(datas[1]);
      datas.forEach(data => {
        let option = document.createElement('option');
        option.innerText = data.show.name;
        option.value = data.show.id;
        selectMenu.appendChild(option);
      });
    });
  } 

  const showMovieDetails = () => {

    // remove exisiting movie details
    while (showDetailDiv.firstChild) {
      showDetailDiv.removeChild(showDetailDiv.firstChild);
    }
    let movieId = selectMenu.value;
    console.log(movieId);
    let idEndPoint = `http://api.tvmaze.com/shows/${movieId}`;
    
    fetch(idEndPoint).then(res => {
      return res.json();
    }).then(movieData => {
      console.log(movieData);
      let movieTitle = document.createElement('a');
      movieTitle.href = movieData.url;
      movieTitle.target = `_blank`;
      movieTitle.innerText = movieData.name;
      showDetailDiv.appendChild(movieTitle);

      let movieImg;
      if (movieData.image === null) {
        movieImg = document.createElement('p');
        movieImg.innerText = 'No image for this show';
      }
      else {
        movieImg = document.createElement('img');
        movieImg.src = movieData.image.original;
      }
      showDetailDiv.appendChild(movieImg);

      let movieSummaryDiv = document.createElement('div');
      movieSummaryDiv.innerHTML = movieData.summary;

      showDetailDiv.appendChild(movieSummaryDiv);

      // showDetailDiv.innerHTML = movieSummary;

    });

  }

  // get data on submit
  submitBtn.addEventListener('click', searchFunction);

  selectMenu.addEventListener('change', showMovieDetails);


});