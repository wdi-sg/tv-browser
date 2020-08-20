// API Docs at:
// http://www.tvmaze.com/api

document.querySelector('button').addEventListener('click', search)



function search() {
    let input = document.getElementById('show-search');
    var url = input.value;

    function getData() {
        return get("http://api.tvmaze.com/search/shows?q=" + url)
            .then(response => {
                console.log(response)
 

                output = JSON.parse(response);
                output.forEach(progData => {
                    option = document.createElement('option');
                    option.innerHTML = progData.show.name;
                    document.getElementById('show-select').appendChild(option);
                })
                

 
                
            })
            .catch(response => {
                alert("wake up your idea")
            })
    }

    getData();
    
}

function get(url) {
    return new Promise((resolve, reject) => {
        var request = new XMLHttpRequest()

        request.addEventListener("load", function () {
            resolve(this.response)
        });

        request.addEventListener("error", function () {
            reject(this.error);
        })

        request.open("GET", url);

        request.send();

    })
}







