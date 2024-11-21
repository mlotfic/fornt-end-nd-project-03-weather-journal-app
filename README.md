
# **Project Setup: Weather-Journal App Project**

## **Overview**

The Weather-Journal App is an asynchronous web application that allows users to record their feelings alongside real-time weather information. This app fetches weather data from the OpenWeatherMap API and updates the user interface dynamically based on user input and API responses.

---

## **Features**

- **Weather Data Fetching**: Retrieves current weather data using the OpenWeatherMap API based on user-provided ZIP codes.
- **User Input Integration**: Combines user feedback with weather data to create a personalized journal entry.
- **Dynamic UI**: Displays temperature, date, and user input dynamically on the webpage.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Development Details](#development-details)
- [Project Requirements](#project-requirements)
- [Contribute](#contribute)
- [License](#license)

---

### **Prerequisites**

Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### **Installation**

1. Clone this repository:

   ```bash
   git clone <repository-url>
   cd weather-journal-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Acquire an API key from [OpenWeatherMap](https://openweathermap.org/).
4. Add your API key to `app.js`:

   ```javascript
   const apiKey = '<your_api_key>&units=imperial';
   ```

[(Back to top)](#table-of-contents)

---

## **Usage**

1. Start the server:

   ```bash
   node server.js
   ```

2. Open your browser and navigate to:

   ```bash
   http://localhost:<port>
   ```

   Replace `<port>` with the port number configured in `server.js` (default is usually `3000`).

3. Enter a ZIP code and your feelings into the form, then click "Generate." The app will fetch the weather data and update the journal entry dynamically.

[(Back to top)](#table-of-contents)

---

## **Development Details**

### **Technologies Used**

- **Node.js**: Server-side runtime environment.
- **Express.js**: Framework for handling server-side routes.
- **Fetch API**: For making asynchronous requests to external APIs.
- **HTML/CSS/JavaScript**: For the user interface.

### **File Structure**

```plaintext
/weather-journal-app
                    ├── website/
                    │   ├── index.html       # Main HTML file
                    │   ├── style.css        # Stylesheet
                    │   ├── app.js           # Client-side JavaScript
                    ├── server.js            # Server-side JavaScript
                    ├── package.json         # Project metadata and dependencies
```

[(Back to top)](#table-of-contents)

### **API Integration**

- The app fetches weather data from OpenWeatherMap using the provided API key.
- Requests include user-provided ZIP codes to get location-specific data.
[(Back to top)](#table-of-contents)

---

## **Project Requirements**

The project is designed to meet the [Udacity Weather-Journal App rubric](https://classroom.udacity.com/).

Key criteria include:

- Node.js and Express environment setup.
- Proper implementation of GET and POST routes.
- Dynamic UI updates using Vanilla JavaScript.
[(Back to top)](#table-of-contents)

---

## **License**

This project is licensed under the MIT License. See the LICENSE file for more details.

[(Back to top)](#table-of-contents)

---

## **Acknowledgments**

- [Udacity](https://www.udacity.com/) for the project structure and guidance.
- [OpenWeatherMap](https://openweathermap.org/) for their free API.

[(Back to top)](#table-of-contents)