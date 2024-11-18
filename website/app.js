/**
 * Client-side JavaScript for Weather Journal App
 */

// Global Variables UI
const generateBtn   = document.getElementById('generate');
const zipInput      = document.getElementById('zip');
const feelingsInput = document.getElementById('feelings');
const entryHolder   = document.getElementById('entryHolder');

// Personal API Key for OpenWeatherMap API
const baseURL = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey  = '897dfedb7128175eba21e6d714104476&units=imperial';

/**
 * Create a new date instance dynamically with JS
 */
const getDate = () => {
    let d = new Date();
    return d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
}

/**
 * Construct weather api URL
 * example docs : https://api.openweathermap.org/data/2.5/weather?zip=94040&appid={API key}&units=imperial
 */
const buildRequestURL = (baseURL, zip, apiKey) => {
    return `${baseURL}?zip=${zip}&appid=${apiKey}`
}

/**
 * Fetch weather data from OpenWeatherMap API
 */
const getWeatherData = async (url, feelings, newDate) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch weather data.');
    const WeatherData = await response.json();
    // return
    return {
        city:        weatherData.name,
        temp:        weatherData.main.temp,
        description: weatherData.weather[0].description,
        feelings:    feelings,
        date:        newDate
    };
};

/**
 * Post data to server
 */
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method:      'POST',
        credentials: 'same-origin',
        headers:     { 'Content-Type': 'application/json' },
        body:        JSON.stringify(data),
    });

    if (!response.ok) throw new Error('Failed to post data.');
};

/**
 * Update UI with the most recent entry
 */
const updateUI = async () => {

    const response = await fetch('/all');
    
    if (!response.ok) throw new Error('Failed to fetch data from server.');

    const data = await response.json();

    document.getElementById('current-city').textContent        = data.city;
    document.getElementById('current-temp').textContent        = `${data.temp}°F`;
    document.getElementById('current-description').textContent = data.description;
    document.getElementById('content').textContent             = data.feelings;
    document.getElementById('current-date-time').textContent   = data.date;
};

/**
 * Event listener to fetch weather data and update UI
 */
generateBtn.addEventListener('click', async () => {
    // get user zip from inputs
    const zip      = zipInput.value;
    // get user feelings from inputs
    const feelings = feelingsInput.value;

    /* -----------------------   validate zip ------------------------- */ 

    // empty
    if (!zip) {
        alert('Please enter a valid US zip-code.');
        return;
    }

    // valid zip
    try {
        // get openWeatherMap url
        const url = buildRequestURL(baseURL, zip, apiKey);

        // get current date
        const newDate = getDate();

        // Fetch weather data via api and user inputs
        const projectData = await getWeatherData(url, feelings, newDate);

        // Post data to server
        await postData('/addData', projectData);

        // Update UI
        updateUI();

    // not valid zip enter
    } catch (error) {
        alert('Please enter a valid US zip-code.');
        console.error('Error:', error);
    }
});


