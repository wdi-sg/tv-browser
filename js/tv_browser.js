// API Docs at:
// http://www.tvmaze.com/api

//set global array for show details
var obj =[];

//populate details
function populateDetails(){
	var selected = document.getElementById("show-select").selectedIndex -1;
	var details = document.getElementById("show-detail");
	var name = document.createElement("h1");
	var image = document.createElement("img");
	name.textContent = obj[selected].show.name;
	image.setAttribute("src",obj[selected].show.image.medium);
	details.appendChild(name);
	details.appendChild(image);
}

//get json from website
function getShows(){
	var show = document.querySelector('input[type="search"]').value;
//if nothing in search box, return
	if(show === ""){
		return;
	}
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		//if request is successful
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("show-select").style.display = "block";
			obj = JSON.parse(this.responseText);
			//reset select
			var select = document.getElementById("show-select");
			select.innerHTML = "";
			//append options
			var name = document.createElement("option");
			name.textContent = "Shows matching "+show+"...";
			select.appendChild(name);
			for(i=0;  i < obj.length; i++){
				var name = document.createElement("option");
				name.setAttribute("value",obj[i].show.name);
				name.textContent = obj[i].show.name;
				select.appendChild(name);
			}
		}
	};
	xhttp.open("GET", "https://api.tvmaze.com/search/shows?q=" + show, true);
	xhttp.send();
}

//add event listeners
document.querySelector('input[type="submit"]').addEventListener("click",getShows);
document.getElementById("show-select").addEventListener("change", function(){ setTimeout(populateDetails(),200)});
