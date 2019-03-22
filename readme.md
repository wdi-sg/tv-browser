# TV Browser

![https://media.giphy.com/media/XhT868oxljs88/giphy.gif](https://media.giphy.com/media/XhT868oxljs88/giphy.gif)

Use the [TV Maze API docs](http://www.tvmaze.com/api) to build a single-page app that allows a user to search TV shows. The documentation lists the various **endpoints** that the TV Maze development team has made available. Identify which endpoint(s) would most useful for your TV show searching app. Try clicking on the URL examples for each endpoint to see the structure of the JSON data at that endpoint. Each of the API's endpoints may have differently structured JSON responses.

When testing out the API's endpoint URLs, you will want to install [JSON Formatter](https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa?hl=en) to make the JSON responses more readable.

To search the TV Maze API use this URL: http://api.tvmaze.com/search/shows?q=girls

The search query of the URL is the serarch term that the user entered.

The response to the request will be an array of objects. When you recieve the response you should render data from each object in a loop.

#### CORS

Your browser may give you an error regarding a Cross Origin Request, depending on your operating system and version of chrome.  You can install this chrome extension to get rid of it:

[https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en)

## MVP
Use the input to get the search term from the user. Display the results in the dom.

## Further
When you get the results, fill in the select element with an option element for each result

## Further
Attach an event listener to the select. When the user selects an option make another AJAX call. Use the response of that AJAX call to render the individual show they requested


## Full App

 1. Make the selector field (CSS selector `"#show-select"`) hidden by default.

 2. After the user submits a search for a TV show...
  - un-hide the `"#show-select"` field.
  - populate the `"#show-select"` field with the list of search results. (create option tags in the select for each result you get)
  - make the first / default select option read "Shows matching `keyword`…".

 3. Whenever the user selects a title from the `#show-select` field (HINT: listen for a `"change"` event), display that show's name and image in the `"#show-detail"` div.

## Take a look:

http://ga-wdi-exercises.github.io/tv-browser/

### Further
Display in the DOM all of the data given to you for a particular show.

### Further
Add a link to the `cast` of the show.
If the user clicks on the cast link, make an AJAX call to get that info and display it to the user.

### Further
Make each cast person clickable. When the user clicks on that person make an AJAX request for the person.