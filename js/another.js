var btn=document.getElementById("btn");
btn.addEventListener("click",function(){
var ourRequest= new XMLHttpRequest();
ourRequest.open('GET', "http://api.tvmaze.com/shows")
ourRequest.onload= function(){
	var ourData= JSON.parse(ourRequest.responseText);
	console.log(ourData);
	renderHTML(ourData);
}
	ourRequest.send();
});
var renderHTML=function(data){
var searchInput=document.getElementById("show-search");
console.log(searchInput.value);
store= searchInput.value;
for(i=0;i<data.length;i++){
var nameShow= data[i].name;
var titleShow= nameShow;
var imageShow=data[i].image.medium;
console.log(imageShow)
var summaryShow=data[i].summary;
if (nameShow.includes(store)) 
    {	
    	var selector=document.createElement("option")
    	selector.innerText= nameShow;
    	selector.id="choice";
    	var select=document.querySelector("#show-select")
    	select.appendChild(selector)

    	// nameShow.addEventListener("click",function(){
    	var title =document.createElement('h1')
    	var summary=document.createElement('div')
    	var image=document.createElement('img')
    	displayArea=document.getElementById("show-detail")
    	displayArea.appendChild(title)
    	displayArea.appendChild(image)
    	displayArea.appendChild(summary)
    	title.innerText=titleShow;
    	image.style.background= url(imageShow);
    	summary.innerText= summaryShow;


    	};
    }
}
    // var options=document.getElementByTag("option")
    // 	options.addEventListener("click",function(){
    // 		// container.innerText= data[i].name;
    // 	// container.innerText= data[i].image;
    // 		console.log("check")
    // 	});
// displaySummary();
    	// nameShow.addEventListener("click",function(){
    	// 	alert("helo")
    	// });
    	// var container=document.createElement("div") 
    	// var showDetail= document.getElementById("#show-detail")
    	// container.innerText= data[i].name;
    	// container.innerText= data[i].image;
    	// showDetail.appendChild(container);
// var displaySummary=function(){
	
// 	data[i].image
// 	data[i].summary
// }

// var displaySummary=function(){
//     	var options=document.querySelectorAll("#choice")
//     	options.addEventListener("click",function(){
//     		console.log("hi");
//     		var display=document.createElement("div")
//     		var showDetail=document.getElementById("show-detail")
//     		showDetail.innerText= options.name;
//     		showDetail.innerText= options.image;
//     		showDetail.appendChild(display)
//     	});
//     }


