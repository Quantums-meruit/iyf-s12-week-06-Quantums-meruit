
// ============================================
// LESSON 12 — WEATHER DASHBOARD
// ============================================

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const MAX_RECENT = 5;


// ============================================
// DOM ELEMENTS
// ============================================

const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const loading = document.getElementById("loading");
const errorBox = document.getElementById("error");
const weatherDisplay = document.getElementById("weather-display");
const historyList = document.getElementById("search-history");

const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");


// ============================================
// STEP 1 — FETCH WEATHER
// ============================================

async function fetchWeather(city) {

    // Build the API URL
    const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

    // Send a request to the API
    const response = await fetch(url);

    // Check if the response was successful
    if (!response.ok) {

        if (response.status === 404) {
            throw new Error("City not found");
        }

        if (response.status === 401) {
            throw new Error("API key not valid yet. Check your API key.");
        }

        throw new Error("Failed to fetch weather data");
    }

    // Convert the response into JSON
    return await response.json();
}


// ============================================
// STEP 2 — GET WEATHER
// ============================================

async function getWeather(city) {

    // Check if the API key exists
    if (typeof API_KEY === "undefined" || !API_KEY) {
        showError("Missing API key: copy config.example.js to config.js and add your key.");
        return;
    }

    // Show loading and hide previous errors
    showLoading();
    hideError();

    try {

        // Fetch the weather data
        const data = await fetchWeather(city);

        // Display the weather information
        displayWeather(data);

        // Save the searched city
        saveToHistory(data.name);

    } catch (err) {

        // Display the appropriate error
        showError(
            err.name === "TypeError"
                ? "Network error — check your connection"
                : err.message
        );

    } finally {

        // Always hide the loading indicator
        hideLoading();
    }
}


// ============================================
// STEP 3 — DISPLAY WEATHER
// ============================================

function displayWeather(data) {

    // Display city and country
    cityName.textContent = `${data.name}, ${data.sys.country}`;

    // Display weather icon
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.alt = data.weather[0].description;

    // Display temperature
    temperature.textContent = `${Math.round(data.main.temp)}°C`;

    // Display weather description
    description.textContent = data.weather[0].description;

    // Display feels-like temperature
    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;

    // Display humidity
    humidity.textContent = `${data.main.humidity}%`;

    // Display wind speed
    wind.textContent = `${data.wind.speed} m/s`;

    // Display atmospheric pressure
    pressure.textContent = `${data.main.pressure} hPa`;

    // Make the weather section visible
    weatherDisplay.classList.remove("hidden");
}


// ============================================
// HELPER FUNCTIONS — LOADING AND ERRORS
// ============================================

// Show loading indicator and hide weather display
function showLoading() {
    loading.classList.remove("hidden");
    weatherDisplay.classList.add("hidden");
}

// Hide loading indicator
function hideLoading() {
    loading.classList.add("hidden");
}

// Display an error message
function showError(message) {
    errorBox.textContent = message;
    errorBox.classList.remove("hidden");
}

// Hide error message
function hideError() {
    errorBox.classList.add("hidden");
}


// ============================================
// STEP 4 — RECENT SEARCHES
// ============================================

function loadRecent() {

    try {

        // Get saved searches from localStorage
        const saved = JSON.parse(localStorage.getItem("recent")) || [];
        // Ignore malformed values so one bad storage entry cannot break the page.
        return Array.isArray(saved) ? saved.filter(item => typeof item === "string") : [];

    } catch (err) {

        // Return an empty array if saved data is invalid
        return [];
    }
}


function saveToHistory(city) {

    // Remove duplicate cities, ignoring uppercase/lowercase
    recent = recent.filter(
        item => item.toLowerCase() !== city.toLowerCase()
    );

    // Add the latest city at the beginning
    recent.unshift(city);

    // Keep only the five most recent searches
    recent = recent.slice(0, MAX_RECENT);

    // Save the updated history
    // Storage can be unavailable in private browsing or restricted contexts.
    try {
        localStorage.setItem("recent", JSON.stringify(recent));
    } catch (err) {
        showError("Weather loaded, but this browser could not save recent searches.");
    }

    // Update the history list even if storage is unavailable.
    renderHistory();
}


function renderHistory() {

    // Clear the previous history
    historyList.innerHTML = "";

    // Create a button for each saved city
    recent.forEach(city => {

        const li = document.createElement("li");
        const button = document.createElement("button");

        // Add class and city name
        button.classList.add("history-item");
        button.textContent = city;

        // Add button to list item
        li.appendChild(button);

        // Add list item to history list
        historyList.appendChild(li);
    });
}


// Load saved searches when the page starts
let recent = loadRecent();


// ============================================
// STEP 5 — EVENTS
// ============================================

// Listen for form submission
form.addEventListener("submit", function(event) {

    // Prevent the page from refreshing
    event.preventDefault();

    // Get the city name and remove extra spaces
    const city = cityInput.value.trim();

    // Search only when the input is not empty
    if (city) {
        getWeather(city);
    }
});


// Event delegation for recent search buttons
historyList.addEventListener("click", function(event) {

    // Find the clicked history button
    const btn = event.target.closest(".history-item");

    // Search for the selected city
    if (btn) {
        getWeather(btn.textContent);
    }
});


// Display recent searches when the page loads
renderHistory();


// ============================================
// STEP 6 — DEPLOYMENT
// ============================================

// Follow the GitHub Pages deployment instructions
// in the original Lesson 12 task file.
