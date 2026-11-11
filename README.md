# Week 6: Asynchronous JavaScript & Weather Dashboard

## About this project

This is my Week 6 work for IYF Weekend Academy Season 12. I used the exercises to practise asynchronous JavaScript, work with APIs, handle HTTP responses, and display fetched data on a web page. The main project is a Weather Dashboard that searches for current weather by city.

## Live Demo

[Open my Weather Dashboard](https://quantums-meruit.github.io/iyf-s12-week-06-Quantums-meruit/)

## Project contents

| File or folder | What it contains |
|---|---|
| `index.html`, `styles.css`, `app.js` | Weather Dashboard structure, styling and functionality |
| `config.example.js` | Safe example configuration with an empty API-key value |
| `async-practice.js`, `lesson-11.html` | Lesson 11: callbacks, Promises, Promise chaining, Promise.all, Promise.race and async/await |
| `lesson-12.html`, `lesson-12.js`, `practice.css` | Lesson 12: Fetch API, user directory, search, sorting, filtering and POST requests |
| `daily-challenges.html`, `daily-challenges.js` | Five interactive asynchronous JavaScript daily challenges |
| `daily-challenges/` | Overview of the five required daily challenges |
| `.github/workflows/deploy.yml` | GitHub Actions workflow for deploying to GitHub Pages |

## Weather Dashboard features

- Search for a city using the Search button or the Enter key.
- Display the city and country, weather icon, temperature in Celsius and weather description.
- Show feels-like temperature, humidity, wind speed and atmospheric pressure.
- Display a loading message while the request is in progress.
- Show a useful message when a city cannot be found, the API key is invalid, or the network request fails.
- Keep the five most recent successful city searches in browser localStorage.
- Select a recent search to load that city again.

## Lessons and daily practice

### Lesson 11 — Asynchronous JavaScript

I practised synchronous and asynchronous execution, callbacks, nested callbacks, Promises, Promise chaining, `Promise.all()`, `Promise.race()`, async/await and error handling with try/catch.

### Lesson 12 — Fetch API

I practised fetching a single user and related posts, rendering a user directory, searching by name or email, sorting by name, filtering by city, and sending a POST request with JSON data.

### Daily challenges

1. Resolve a Promise after a delay.
2. Chain three asynchronous tasks and measure the elapsed time.
3. Handle a 404 response with a fallback user.
4. Convert a callback-style operation into a Promise that can be used with async/await.
5. Fetch three endpoints concurrently and inspect their outcomes with `Promise.allSettled()`.

## Technologies used

- HTML5 and CSS3
- JavaScript (ES6+)
- Fetch API and JSON
- OpenWeatherMap Current Weather API
- JSONPlaceholder practice API
- Browser localStorage
- Git, GitHub and GitHub Actions
- GitHub Pages

## Run the project locally

1. Clone this repository:

   ```bash
   git clone https://github.com/Quantums-meruit/iyf-s12-week-06-Quantums-meruit.git
   cd iyf-s12-week-06-Quantums-meruit
   ```

2. Make a local copy of the example configuration file. In PowerShell:

   ```powershell
   Copy-Item config.example.js config.js
   ```

3. Open `config.js` and replace the empty value with your own OpenWeatherMap API key:

   ```js
   const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY";
   ```

4. Start the folder with a local development server, such as VS Code Live Server, and open `index.html`.

5. The practice pages can be opened directly: `lesson-11.html`, `lesson-12.html` and `daily-challenges.html`. They do not require the weather API key.

## What I learned

I learned that asynchronous work allows JavaScript to continue handling other tasks while a timer or network request is pending. Callbacks helped me understand how one function can pass work to another function, while Promises gave me a clearer way to represent a result that may arrive later. Async/await made those Promise-based operations easier to read, and try/catch helped me handle failures without leaving the user with an unexplained blank page.

Working with Fetch also taught me an important detail: a request can receive an HTTP error response without the Fetch Promise rejecting. I therefore check `response.ok` before trying to use the returned data. I also practised updating the DOM from API responses, managing loading and error states, and using localStorage to keep recent searches between page visits.

## Challenges I worked through

- **Understanding asynchronous order:** I used timers and output examples to observe why a zero-delay timeout still runs after the current call stack.
- **Avoiding deeply nested callbacks:** I compared nested callbacks with Promise chains and async/await.
- **Handling failed requests:** I added HTTP status checks and error messages for missing cities, invalid API keys and network failures.
- **Coordinating multiple requests:** I practised the difference between Promise.all and Promise.allSettled.
- **Managing configuration:** I separated the API key from the main application code and added config.js to .gitignore.

## API key and deployment notes

The weather application uses the [OpenWeatherMap Current Weather API](https://openweathermap.org/current). The practice exercises use [JSONPlaceholder](https://jsonplaceholder.typicode.com/).

For deployment, the GitHub Actions workflow reads the repository secret named `OPENWEATHER_API_KEY` and creates `config.js` during the build. The real `config.js` file is ignored by Git and must not be committed.

**Security note:** because this is a browser-based static website, the API key is ultimately sent to the visitor's browser and can be inspected by visitors. A GitHub Actions secret prevents the key from being stored in the repository source, but it does not make a browser-exposed key private. A backend service or proxy is needed to keep an API key private.

## Possible future improvements

I would like to extend the dashboard with a multi-day forecast, a Celsius/Fahrenheit switch, and more detailed weather presentation.
