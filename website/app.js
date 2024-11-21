/**
 * Client-side JavaScript for Weather Journal App
 */

/* Global Variables UI */

// Input
const generateBtn   = document.getElementById('generate');
const zipInput      = document.getElementById('zip');
const feelingsInput = document.getElementById('feelings');

// output
const outputUI = {
    currentCity        : document.getElementById("current-city"),
    currentIcon        : document.getElementById("current-icon"),
    currentTemp        : document.getElementById("temp"),
    currentDescription : document.getElementById("current-description"),
    currentDate        : document.getElementById("date"),
    entryHolder        : document.getElementById('entryHolder'),
    content            : document.getElementById('content')
}

/**
 * Update UI with the most recent entry
 */
const updateUI = (outputUI = {}, data = {}) => {
    // Write updated data to DOM elements
    outputUI.currentCity.textContent        = data.city;
    outputUI.currentTemp.textContent        = `${Math.round(data.temp)}°F`;
    outputUI.currentDescription.textContent = data.description;
    outputUI.content.textContent            = data.feel;
    outputUI.currentDate.textContent        = data.date;

    // icon
    outputUI.currentIcon.src = data.icon;
    outputUI.currentIcon.alt = data.description;
    outputUI.currentIcon.style.display = 'block'; // Show the icon
};

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
const fetchWeather = async (path, feelings, newDate) => {
    const request = await fetch(path);
    if (!request.ok) throw new Error('Failed to fetch OpenWeatherMap API data.');
    const WeatherData = await request.json();

    try {
        // Transform into JSON
        const WeatherData = await request.json()
        // send to log
        console.log(WeatherData)        
        // return
        return {
            city:        weatherData.name,
            temp:        weatherData.main.temp,
            description: weatherData.weather[0].description,        
            icon:        `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
            feel:        feelings,
            date:        newDate
        };    
    }
    catch(error) {
        console.log('Error fetching OpenWeatherMap API data:', error);
        // appropriately handle the error
        console.error('Error fetching OpenWeatherMap API data:', error);
    }
};

/**
 * Fetch data from the server on the most recent entry
 */
const retrieveData = async (path) => {
    const request = await fetch(path);        
    if (!request.ok) throw new Error('Failed to fetch data from server.');
    try {
        // Transform into JSON
        const allData = await request.json()
        // send to log
        console.log(allData)   
        return allData
    }
    catch(error) {
        console.log('Error fetching data:', error);
        // appropriately handle the error
        console.error('Error fetching data:', error);
    }
}

/**
 * Post data to server
 */
const sendAppData = async (path = '', data = {}) => {   
    try {
        const response = await fetch(path, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to post data.');
        // wait for server conformation message
        const result = await response.json();
        console.log(`Server Response: ${result.message}`);
        return result;
    } catch (error) {
        console.log(`Server Response: ${error}`);
        console.error('Error Sending data:', error);
    }
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
        await fetchWeather(url, feelings, newDate)
        .then(data => {
            sendAppData('/data', data)
        })
        .then(data => {
            return retrieveData('/allData')
        })
        .then(temp => {
            return {outputUI, data}
        })
        .then(({outputUI, data}) => updateUI(outputUI, data))
        .catch(e => {
            // There can be proper error handling with UI
            console.error(e)
        })
    // not valid zip enter
    } catch (error) {
        alert('Please enter a valid US zip-code.');
        console.error('Error:', error);
    }
});


