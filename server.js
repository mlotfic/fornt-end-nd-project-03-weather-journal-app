/**
 * Server-side Node.js application for Weather Journal App
 */
// Require Express to run server and routes
// dependencies
const express    = require('express');
const bodyParser = require('body-parser');
const cors       = require('cors');

// Start up an instance of app
const app  = express();
const port = 3000;

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Setup Server

// Initialize all route with a callback function

// Callback function to complete GET '/all'

/**
 * GET route to retrieve all data
 */
app.get('/all', (req, res) => {
    res.status(200).send(projectData);
});

/**
 * POST route to add entry
 */
app.post('/all', (req, res) => {
    projectData = {
        city:        req.body.city,
        temp:        req.body.temp,
        description: req.body.description,
        icon:        req.body.icon,
        feel:        req.body.feel,
        date:        req.body.date
    };
    res.status(200).send({ 
        success: true, message: 'Data Received successfully.' 
    });
});


// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});