// API Docs at:
// http://www.tvmaze.com/api

let showData;

function get(url){

return new Promise((resolve,reject)=>{
    var request = new XMLHttpRequest();

request.addEventListener("load",function(){
    resolve(this.response)
})

request.addEventListener("error",function(){
    reject(this.error)
})

request.open("GET","http://api.tvmaze.com/search/shows?q=" + url)

request.send();
})

}

function getData(){
    let input = document.querySelector('#show-search');
    let url = input.value;
return get(url).then(response=>{
    return response //this is a promise
})
}

function doSubmit(){
    document.querySelector("#show-select").classList.add("show");
    const output = getData();
    let input = document.querySelector("#show-search").value;
    var container = document.querySelector('#show-select');
    container.innerHTML = null;
    let option = document.createElement("option");
    option.innerText = `Shows matching ${input}...`;
    container.appendChild(option);
console.log(output, "----this is output!");

getData().then(data=>{
    let responseData = JSON.parse(data)
     showData = [];
    responseData.forEach(data=>{
        showData.push(data.show);
        let option = document.createElement("option");
        option.setAttribute("value",`${data.show.id}`);
        option.innerText = `${data.show.name}`
        let select = document.querySelector("#show-select");
        select.appendChild(option)
    })

    console.log(responseData, "inside getdata");



})
}

function displayOption(){
    let selected = document.getElementById("show-select").value;
    let display = document.getElementById("show-detail");
    display.innerHTML = null;
    showData.forEach(data=>{
        if(selected == data.id){
            let name = document.createElement("h2");
            name.innerText = `${data.name}`;
            display.appendChild(name);
            let image = document.createElement("img");
            image.setAttribute("src",`${data.image.medium}`);
            image.setAttribute("alt",`${data.name}`);
            display.appendChild(image);
            let summary = document.createElement("p");
            summary.innerHTML = `${data.summary}`;
            display.appendChild(summary);
            let genres = document.createElement('ul');
            data.genres.forEach(genre=>{
                let list = document.createElement('li');
                list.innerText = `${genre}`
                genres.appendChild(list);
            })
            display.appendChild(genres);

            let rating = document.createElement('div');
            rating.innerText = `Average Rating: ${data.rating.average}`
            display.appendChild(rating);

            let status = document.createElement('div');
            status.innerText = `Status: ${data.status}`
            display.appendChild(status);

            let schedule = document.createElement('div');
            schedule.innerText = `Time: ${data.schedule.time} Days: ${data.schedule.days}`
            display.appendChild(schedule);

            let site = document.createElement('div');
            site.innerHTML = `<a href="${data.url}">Official Website</a>`
            display.appendChild(site);

            let cast = document.createElement('div');
            // cast.innerHTML = `<a href="http://api.tvmaze.com/shows/${selected}/cast">List of Cast</a>`
            let activate = document.createElement('button')
            activate.innerText= "Cast List";
            activate.setAttribute("id","castList");
            cast.appendChild(activate);
            display.appendChild(cast);


            document.querySelector('#castList').addEventListener('click', ()=>{
                castData().then(data=>{
                    let castResponse = JSON.parse(data);
                    castResponse.forEach(data=>{
                        let person = document.createElement("div");
                        person.innerText = `Name: ${data.person.name}`;
                        cast.appendChild(person);
                        let image = document.createElement("img");
                            image.setAttribute("src",`${data.person.image.medium}`);
                            image.setAttribute("alt",`${data.person.name}`);
                        let actorLink = data.person._links.self.href;
                            image.addEventListener("click", ()=>{
                                async function get(url){
                                                           try{
                                                                const response = await fetch(url);
                                                                    return response
                                                                } catch(error){
                                                                     throw error
                                                                                 }
}
 async function getData(){
    try{
        let response = await get(`${actorLink}`)
        return response.json();

    } catch(error){
        console.log(error, "--- Error")
    }
}


getData().then(data=>{
    console.log(data);

        var birthday = document.createElement("div");
        birthday.innerText=`Birthday: ${data.birthday}`
        var gender = document.createElement("div");
        gender.innerText = `Gender: ${data.gender}`
        var country = document.createElement("div");
        country.innerText = `Country: ${data.country.name}`
        person.appendChild(birthday);
        person.appendChild(gender);
        person.appendChild(country);

})



})
                            cast.appendChild(image);
                    })
                })
});

        }
    })
    console.log(selected);
}




document.querySelector('#submit').addEventListener('click', doSubmit);
document.querySelector('#show-select').addEventListener('change',displayOption);


function get2(id){

return new Promise((resolve,reject)=>{
    var request = new XMLHttpRequest();

request.addEventListener("load",function(){
    resolve(this.response)
})

request.addEventListener("error",function(){
    reject(this.error)
})

request.open("GET",`http://api.tvmaze.com/shows/${id}/cast`)

request.send();
})

}

function castData(){
    let selected = document.getElementById("show-select").value
return get2(selected).then(response=>{
    return response //this is a promise
})
}