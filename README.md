# Week 6: Asynchronous JavaScript & Weather Dashboard

## About this project

This repository contains my Week 6 work for IYF Weekend Academy Season 12. During this week, I practised working with asynchronous JavaScript, Promises, the Fetch API and external APIs. I also built a Weather Dashboard that lets a user search for the current weather in a city.

I organised the work into the main dashboard, lesson practice and daily challenges so that each part can be explored separately.

## Live demo

[Open my Weather Dashboard](https://quantums-meruit.github.io/iyf-s12-week-06-Quantums-meruit/)

## Project structure

| File or folder | Purpose |
|---|---|
| `index.html`, `styles.css`, `app.js` | Main Weather Dashboard |
| `config.example.js` | Example configuration file with an empty API-key value |
| `config.js` | Local API-key configuration; ignored by Git and not committed |
| `async-practice.js`, `lesson-11.html` | Lesson 11 practice: callbacks, Promises and async/await |
| `lesson-12.html`, `lesson-12.js`, `practice.css` | Lesson 12 Fetch API and user-directory practice |
| `daily-challenges.html` | Root-level daily-challenges page |
| `daily-challenges/` | Daily challenge page, JavaScript exercises and guide |
| `.github/workflows/deploy.yml` | GitHub Actions workflow for GitHub Pages deployment |
| `.gitignore` | Excludes local configuration and other files that should not be committed |
| `README.md` | Project information and setup instructions |

## Weather Dashboard features

- Search for a city using the Search button or by pressing Enter.
- Display the city and country, weather icon, temperature in Celsius and weather description.
- Show feels-like temperature, humidity, wind speed and atmospheric pressure.
- Show a loading state while the weather request is in progress.
- Display useful error messages for an unknown city, an invalid API key or a network problem.
- Save the five most recent successful searches in browser localStorage.
- Click a recent search to look up that city again.

## Lessons and daily challenges

### Lesson 11 — Asynchronous JavaScript

I practised synchronous and asynchronous execution, callbacks, nested callbacks, Promises, Promise chaining, `Promise.all()`, `Promise.race()`, async/await and error handling with try/catch.

### Lesson 12 — Fetch API

I practised fetching a user and related posts, displaying a user directory, searching by name or email, sorting by name, filtering by city and sending a POST request with JSON data.

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
- Git and GitHub
- GitHub Actions
- GitHub Pages

## Run the project locally

1. Clone the repository:

   ```bash
   git clone https://github.com/Quantums-meruit/iyf-s12-week-06-Quantums-meruit.git
   cd iyf-s12-week-06-Quantums-meruit
   ```

2. Copy the example configuration file. In PowerShell:

   ```powershell
   Copy-Item config.example.js config.js
   ```

3. Open `config.js` and add your own OpenWeatherMap API key:

   ```js
   const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY";
   ```

4. Start the folder with a local development server, such as VS Code Live Server, and open `index.html`.

5. The lesson and challenge pages can also be opened separately: `lesson-11.html`, `lesson-12.html` and `daily-challenges/index.html`.

**Important:** `config.js` is listed in `.gitignore`. Keep your real key in that local file and do not commit it. Commit `config.example.js` instead.

## What I learned

I learned that asynchronous JavaScript lets the browser continue responding while work such as a timer or network request is pending. Callbacks helped me understand how one function can pass work to another function. Promises gave me a clearer way to represent an operation that may complete later, and async/await made Promise-based code easier for me to follow.

I also learned that Fetch does not automatically reject its Promise just because the server responds with an HTTP error status. Checking `response.ok` is therefore important before using the response data. In the dashboard, I applied these ideas by fetching weather data, updating the page, showing loading and error states, and saving recent searches with localStorage.

## Challenges I worked through

- **Understanding execution order:** I used timer examples to see why even a zero-delay timeout runs after the current call stack.
- **Reducing callback nesting:** I compared nested callbacks with Promise chains and async/await.
- **Handling request errors:** I practised checking HTTP responses and showing messages for failed searches and network problems.
- **Managing multiple requests:** I compared `Promise.all()` with `Promise.allSettled()` and considered when each is useful.
- **Managing API configuration:** I separated the key from the application code and added `config.js` to `.gitignore`.

## API key and deployment

The dashboard uses the [OpenWeatherMap Current Weather API](https://openweathermap.org/current). The practice exercises use [JSONPlaceholder](https://jsonplaceholder.typicode.com/).

For GitHub Pages deployment, the workflow reads the repository Actions secret named `OPENWEATHER_API_KEY` and creates `config.js` during the workflow. The local `config.js` is ignored by Git and should never be committed.

**Security note:** this is a static browser-based website. The API key is delivered to the visitor's browser when the dashboard runs, so visitors can inspect it. A GitHub Actions secret keeps the key out of the repository source, but does not make a key used by frontend JavaScript private. A backend proxy is needed for genuine key secrecy.

## Possible future improvements

I would like to add a multi-day forecast, a Celsius/Fahrenheit switch and more detailed weather information. I would also like to explore a backend proxy so that the API key does not need to be exposed to the browser.
