# Week 6: Asynchronous JavaScript & Weather Dashboard

## Author
- **Name:** Joseph Kinyanjui
- **GitHub:** [@Quantums-meruit](https://github.com/Quantums-meruit)
- **Date:** November 11, 2026

## Project Description
This repository contains my Week 6 practice for IYF Weekend Academy Season 12. It covers asynchronous JavaScript, working with the Fetch API, displaying remote data in the DOM, sending a POST request, and building a Weather Dashboard that searches current conditions by city.

The project is split into three learning pages and the weather application:
- `lesson-11.html` — callbacks, Promises, Promise chaining, parallel work and async/await.
- `lesson-12.html` — Fetch API basics, a user directory, search/sort/city filtering and a POST form.
- `daily-challenges.html` — the five required asynchronous JavaScript daily challenges.
- `index.html` — the OpenWeatherMap Weather Dashboard.

## Technologies Used
- HTML5 for page structure and accessible form controls.
- CSS3 for responsive layouts and visual styling.
- JavaScript (ES6+) for DOM interaction, callbacks, Promises, async/await and Fetch.
- JSONPlaceholder for practice user and post endpoints.
- OpenWeatherMap Current Weather API for live weather data.
- Browser localStorage for recent city searches.
- GitHub Actions and GitHub Pages for deployment.

## Features
### Weather Dashboard
- Search current weather by city name.
- Display city and country, weather icon, temperature in Celsius and description.
- Display feels-like temperature, humidity, wind speed and atmospheric pressure.
- Show loading feedback and readable errors for invalid cities, API-key problems and network failures.
- Save the five most recent successful city searches in localStorage.
- Select a recent city to search for it again.

### Lesson 11 — Asynchronous JavaScript
- Compare synchronous and asynchronous output order.
- Simulate a callback-based user lookup.
- Compare nested callback flow with Promise chaining.
- Demonstrate Promise.all and Promise.race.
- Use async/await and try/catch for readable asynchronous code.

### Lesson 12 — Working with APIs
- Fetch one user and posts belonging to user 1.
- Load and render a user directory with loading and error states.
- Search users by name or email.
- Sort users by name in ascending or descending order.
- Filter the directory by city.
- Submit a new post using an HTTP POST request.

### Daily Challenges
- Create a delay Promise.
- Chain three Promise-based tasks and measure elapsed time.
- Return a fallback user for a 404 response.
- Convert a callback-style operation into an async/await flow.
- Fetch three endpoints concurrently with Promise.allSettled and report each outcome.

## How to Run
1. Clone the repository:
   ```bash
   git clone https://github.com/Quantums-meruit/lesson-12-exercise.git
   cd lesson-12-exercise
   ```
2. Copy `config.example.js` to `config.js`.
3. Create a free OpenWeatherMap API key and put it in `config.js`:
   ```js
   const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY";
   ```
4. Open `index.html` with a local development server (for example, VS Code Live Server). The weather page loads `config.js` before `app.js`.
5. Open `lesson-11.html`, `lesson-12.html` or `daily-challenges.html` to run the learning exercises. These pages do not need the weather API key.

**Important:** `config.js` is listed in `.gitignore`. Do not commit your real API key. The committed `config.example.js` intentionally contains an empty placeholder.

## Lessons Learned
This week's exercises focus on how JavaScript can continue running while asynchronous work is pending. The examples demonstrate why callbacks are useful, how deeply nested callbacks become difficult to follow, and how Promises and async/await make asynchronous flows easier to organize.

The API exercises also demonstrate that a Fetch request must check `response.ok` because HTTP error responses do not automatically reject the Fetch Promise. The user directory practices rendering API data, while the POST form demonstrates sending JSON with request headers and a request body. JSONPlaceholder is a testing service, so its successful POST response is simulated rather than permanently saved.

## Challenges Faced
- **Keeping asynchronous code readable:** separating the request, display and error-handling steps makes each function easier to understand.
- **Handling API errors:** checking the HTTP status and using try/catch provides clearer feedback for failed requests.
- **Keeping credentials out of Git:** the local configuration file is ignored, while deployment creates it from a GitHub Actions secret.
- **Working with several requests:** Promise.all and Promise.allSettled demonstrate two different ways to coordinate parallel requests.

## Live Demo
The live URL will be added after GitHub Pages deployment succeeds.

## API and Credential Notes
- User and post exercises use [JSONPlaceholder](https://jsonplaceholder.typicode.com/).
- Weather data uses the [OpenWeatherMap Current Weather API](https://openweathermap.org/current).
- For GitHub Pages, add a repository Actions secret named `OPENWEATHER_API_KEY`. The workflow writes `config.js` during deployment.
- A browser-based application must send its weather key to the browser to call this API. The workflow keeps the key out of Git history, but this is not equivalent to server-side secret storage. A backend would be needed to keep the key private from site visitors.

## Further Improvements
The assignment lists optional enhancements such as a five-day forecast, Celsius/Fahrenheit toggle, geolocation and weather-based backgrounds. These are not included in this required-feature implementation.
