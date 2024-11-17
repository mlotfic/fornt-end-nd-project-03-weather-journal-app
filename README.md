# Weather-Journal App Project

# Project Title

# Quickstart/Demo

# Table of Contents

- [Project Title](#project-title)
- [Quickstart/Demo](#quickstartdemo)
- [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [Contribute](#contribute)
- [License](#license)

# Installation
[(Back to top)](#table-of-contents)

# Usage
[(Back to top)](#table-of-contents)

# Development
[(Back to top)](#table-of-contents)

# Contribute
[(Back to top)](#table-of-contents)

# License
[(Back to top)](#table-of-contents)

## Overview
This project requires you to create an asynchronous web app that uses Web API and user data to dynamically update the UI. 

## Instructions
This will require modifying the `server.js` file and the `website/app.js` file. You can see `index.html` for element references, and once you are finished with the project steps, you can use `style.css` to style your application to customized perfection.

## Extras
If you are interested in testing your code as you go, you can use `tests.js` as a template for writing and running some basic tests for your code.

## Glossary

### Server-side

- It refers to operations performed by the server in a network.
- In web development, we used the Server-side scripting technique to employ scripts on a web server that produces a response for each user's request.

### Client-side

- It refers to operations performed at the client or user's end.

### Package

- It is a file or directory defined by a `package.json`.
- The npm registry contains many packages which are node modules or include node modules.

### Module

- Any file or directory in the `node_modules` directory that can be loaded by the `Node.js` require() function is known as a module.

### Arrow function

- An arrow function is a compact alternative to a traditional function expression.

### HTTP Request

- It is an action to be performed on a resource identified by a given request-url.
- Some HTTP request methods are GET, POST, PUT, DELETE, etc.

### GET

- GET is an HTTP request method used to request data from a specified resource.

### POST

- POST is an HTTP request method that requests the web-server to accept the data enclosed in the body of the request message.


Development Strategy
For this project, you will be writing most of your code in two files: server.js and website/app.js. Note that it's very important that you plan your project before you start writing any code! Break your project down into small pieces of work and strategize your approach to each one. With these bite-sized amounts, it'll be easier to debug and fix any issues that appear.


Feel free to implement your own design workflow, but if you get stuck -- here is a walkthrough to get you up and running!

Start by setting up your project environment. Make sure Node is installed from the terminal. Install the packages Express, Body-Parser, and Cors from the terminal and include them in your server.js file.
Create a server running on the port of your choosing
Add a console.log() to the server callback function, and test that your server is running using Node in the terminal to run the file server.js
Add a GET route that returns the projectData object in your server code Then, add a POST route that adds incoming data to projectData.
The POST route should anticipate receiving three pieces of data from the request body
temperature
date
user response
Make sure your POST route is setup to add each of these values with a key to projectData.
Acquire API credentials from OpenWeatherMap website. Use your credentials and the base url to create global variables at the top of your app.js code.
Write an async function in app.js that uses fetch() to make a GET request to the OpenWeatherMap API.
Create an event listener for the element with the id: generate, with a callback function to execute when it is clicked.
Inside that callback function call your async GET request with the parameters:
base url
user entered zip code (see input in html with id zip)
personal API key
Rubric Tip: This step will help you to pass the rubric item "Integrating OpenWeatherMap API."
After your successful retrieval of the weather data, you will need to chain another Promise that makes a POST request to add the API data, as well as data entered by the user, to your app.
You will need to write another async function to make this POST request.
The function should receive a path and a data object.
The data object should include
temperature
date
user response
Remember, you can access the value of DOM elements by selecting them in your JS code.
Finally, chain another Promise that updates the UI dynamically Write another async function that is called after the completed POST request. This function should retrieve data from our app, select the necessary elements on the DOM (index.html), and then update their necessary values to reflect the dynamic values for:
Temperature
Date
User input
Note:

The body-parser has been deprecated in the latest version of Express.js (version 4.16.0 and above), the built-in middleware express.json() and express.urlencoded() are used to parse incoming request bodies. These middleware functions are based on the body-parser module and provide similar functionality.

Just like the body-parser module, express.json() and express.urlencoded() also have options you can pass to customize their behavior. You can refer to the Express.js documentation(opens in a new tab) for more information on these options.