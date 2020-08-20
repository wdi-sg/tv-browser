// API Docs at:
// http://www.tvmaze.com/api

function get (url) {

    return new Promise ( (resolve, reject) => {
        let request = new XMLHttpRequest();

        request.addEventListener('load', function() {
            resolve(this.response);
        })

        request.addEventListener('error', function() {
            reject(this.error);
        })

        request.open('GET', url);

        request.send()
    })
}

function submit () {

    let input = document.getElementById('show-search');
    let url = input.value;
    console.log(url);

    return get ('http://api.tvmaze.com/search/shows?q='+url)
        .then( response => {
            let jsonResponse = JSON.parse(response);

            jsonResponse.forEach ( show => {
                console.log(show.show.name);
                let option = document.createElement('option');
                option.setAttribute('value', show.show.id);
                option.textContent = show.show.name;
                document.getElementById('show-select').appendChild(option);
            })

            document.getElementById('show-select').addEventListener('change', function(){
                console.log('hello');
            })
        })

        .catch( response => {
            console.log('beep! beep! error!')
        })

}

// function responseHandler () {

//     // console.log('response text', this.responseText);

//     let response = JSON.parse(this.responseText);
//     console.log(response);

//     response.forEach ( show => {
//         console.log(show.show.name);
//         let option = document.createElement('option');
//         option.textContent = show.show.name;
//         document.getElementById('show-select').appendChild(option);
//     })

//     var showDetails = document.getElementById('show-detail');
// }

// function submit (event) {

//     let input = document.getElementById('show-search');
//     let url = input.value;
//     console.log(url);

//     var request = new XMLHttpRequest();
//     request.addEventListener('load', responseHandler);
//     request.open('GET', 'http://api.tvmaze.com/search/shows?q='+url);
//     request.send();
// }

document.querySelector('button').addEventListener('click', submit);