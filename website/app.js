/**
 * Client-side JavaScript for Weather Journal App
 */

/* Global Variables */

// input UI
const generateBtn   = document.getElementById('generate');
const zipInput      = document.getElementById('zip');
const feelingsInput = document.getElementById('feelings');
const entryHolder   = document.getElementById('entryHolder');

// output UI
const outputUI = {
    currentCity        : document.getElementById("current-city"),
    currentIcon        : document.getElementById("current-icon"),
    currentTemp        : document.getElementById("temp"),
    currentDescription : document.getElementById("current-description"),
    currentDate        : document.getElementById("date"),
    content            : document.getElementById('content')
}

// Personal API Key for OpenWeatherMap API
const baseURL = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey  = '<API>&units=imperial';

/**
 * Rearrange .
 * @returns {string} The current date in the format "MM.DD.YYYY".
 */
const getDate = () => {
    let d = new Date();
    return d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();
};

/**
 * Constructs URL for weather API request.
 * @param {string} baseURL - The base URL of the OpenWeatherMap API.
 * @param {string} zip     - The zip code for the location.
 * @param {string} apiKey  - The API key for authentication.
 * @returns {string}       - The api request URL.
 */
const buildRequestURL = (baseURL, zip, apiKey) => {
    return `${baseURL}?zip=${zip}&appid=${apiKey}`;
};

/**
 * Simplified summary of weather data.
 * @param {Object} weatherData - The api weather data from the OpenWeatherMap.
 * @param {string} feelings    - User feelings.
 * @returns {Object}           - A summary of weather data and user feelings.
 */
const getWeatherSummary = (weatherData, feelings) => {
    return {
        city:        weatherData.name,
        temp:        `${Math.round(weatherData.main.temp)}°F`,
        description: weatherData.weather[0].description,
        icon:        `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
        feel:        feelings,
        date:        getDate()
    };
};


/**
 * Fetches weather data from the OpenWeatherMap API.
 * @async
 * @param {string} path       - The API request URL.
 * @returns {Promise<Object>} - A promise that resolves to the weather data in JSON format.
 * @throws {Error}            - Report request fails.
 */
const fetchWeather = async (path = '') => {
    try {
        // Fetch weather data
        const request = await fetch(path);

        // Check if the request is OK
        if (!request.ok) {
            throw new Error('Failed to fetch OpenWeatherMap API data.');
        }

        // Transform response into JSON
        const WeatherData = await request.json();

        // Log the data
        console.log(WeatherData);

        // Return the data
        return WeatherData;
    } catch (error) {
        // Handle errors
        console.error('Error fetching OpenWeatherMap API data:', error);
        throw error;
    }
};

/**
 * Fetches data from the server for the most recent entry.
 * @async
 * @param {string} path       - The server endpoint to fetch data from.
 * @returns {Promise<Object>} - A promise that resolves to the server data in JSON format.
 * @throws {Error}            - Report request fails.
 */
const retrieveData = async (path) => {
    try {
        // Fetch data from the server
        const request = await fetch(path);

        // Check if the request was successful
        if (!request.ok) throw new Error('Failed to fetch data from server.');

        // Transform response into JSON
        const allData = await request.json();

        // Log the data for debugging
        console.log(allData);

        // Return the data
        return allData;
    } catch (error) {
        // Handle and log errors
        console.error('Error fetching data:', error);
        throw error; // Re-throw for upstream error handling if needed
    }
};

/**
 * Sends application data to the server.
 * @async
 * @param {string} path       - The server endpoint to send data to.
 * @param {Object} data       - The data to send to the server.
 * @returns {Promise<Object>} - A promise that resolves to the server response.
 * @throws {Error}            - Report request fails.
 */
const sendAppData = async (path = '', data = {}) => {
    try {
        // Post data to the server
        const response = await fetch(path, {
            method: 'POST',
            credentials: 'same-origin', // Ensures cookies are included in the request
            headers: {
                'Content-Type': 'application/json', // Set appropriate headers for JSON
            },
            body: JSON.stringify(data), // Convert data to JSON string
        });

        // Check if the response was successful
        if (!response.ok) throw new Error('Failed to post data.');

        // Parse server response
        const result = await response.json();

        // Log server response for debugging
        console.log(`Server Response: ${result.message}`);

        // Return the result
        return result;
    } catch (error) {
        // Log errors
        console.error('Error sending data:', error);
        throw error; // Re-throw for upstream error handling if needed
    }
};

/**
 * Updates the UI with the most recent entry data.
 * @param {Object} outputUI - A DOM elements to update.
 * @param {Object} data     - The data containing updated values.
 */
const updateUI = (outputUI = {}, data = {}) => {
    // Update DOM elements with data
    outputUI.currentCity.textContent        = data.city || 'N/A';
    outputUI.currentTemp.textContent        = data.temp || 'N/A';
    outputUI.currentDescription.textContent = data.description || 'N/A';
    outputUI.content.textContent            = data.feel || 'N/A';
    outputUI.currentDate.textContent        = data.date || 'N/A';

    // Update weather icon
    if (data.icon) {
        outputUI.currentIcon.src           = data.icon;
        outputUI.currentIcon.alt           = data.description || 'Weather icon';
        outputUI.currentIcon.style.display = 'block'; // Show the icon
    } else {
        outputUI.currentIcon.style.display = 'none'; // Hide the icon if no data
    }
};

/**
 * Event listener to fetch weather data and update UI
 */
generateBtn.addEventListener('click', async () => {
    // get user zip from inputs
    const zip      = zipInput.value;

    // empty
    if (!zip) {
        alert('Please enter a valid US zip-code.');
        return;
    }
    // get openWeatherMap url
    const url = buildRequestURL(baseURL, zip, apiKey);

    // valid zip
    try {
        // Fetch weather data via api and user inputs
        await fetchWeather(url)
            .then(data => {
                // get user feelings from inputs
                const feelings = feelingsInput.value;
                // refactors data before the sent to server
                const weatherSummary = getWeatherSummary(data, feelings);
                // send to server
                return sendAppData('/all', weatherSummary);
            })
            .then(() => {
                // Retrieve data from the server
                return retrieveData('/all');
            })
            .then((data) => {
                // Update the UI
                updateUI(outputUI, data);
            })
            .catch(error => {
                // There can be proper error handling with UI
                alert('Error processing weather data. Please try again.');
                throw error;                
            })

    // not valid zip enter
    } catch (error) {
        alert('Error processing weather data. Please try again');
        throw error;
    }
});
