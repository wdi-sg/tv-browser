// API Docs at:
// http://www.tvmaze.com/api

		var showSearch = document.querySelector('#show-search')
      	showSearch.onsubmit = function()  {
      		console.log("yay");

          // Initialize new request
         var request = new XMLHttpRequest();
         var showName = document.querySelector('#show-search').value;
         request.open('GET', "http://api.tvmaze.com/search/shows?");
                   // Callback function for when request completes
          request.onload = function()  {

              // Extract JSON data from request
              var data = JSON.parse(this.responseText);
              	console.log(data);
              // create options for the drop down box
              if (data.success) {//need to have a loop here or use forEach();
              	data.forEach(function(){
              	var showList = document.createElement("OPTION");
              	showList.setAttribute("value", data.id);
              	showList.innerHTML = data.name;
              	document.querySelector("#show-select").appendChild(showList);
              	})
              }
              else {
              	var errorMsg = document.querySelector('#errorMsg')
                  errorMsg.innerHTML = 'There was an error.';
                  errorMsg.style.display = "block";
              }
          }

          // Add data to send with request
         var data = new FormData();
          data.append('showList', showList);

          // Send request
          request.send(data);
          return false;
      };

