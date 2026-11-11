// LESSON 12 — FETCH API, DOM RENDERING, POST, SEARCH AND FILTER
const USERS_URL = "https://jsonplaceholder.typicode.com/users";
const usersContainer = document.getElementById("users-container");
const usersLoading = document.getElementById("users-loading");
const usersError = document.getElementById("users-error");
const searchInput = document.getElementById("user-search");
const sortSelect = document.getElementById("user-sort");
const cityFilter = document.getElementById("city-filter");
let allUsers = [];

async function fetchJSON(url, options) {
    const response = await fetch(url, options);
    // fetch only rejects for network failures; check response.ok for HTTP errors.
    if (!response.ok) throw new Error(`Request failed (HTTP ${response.status})`);
    return response.json();
}

function displayUsers(users) {
    usersContainer.replaceChildren();
    users.forEach(user => {
        const card = document.createElement("article");
        card.className = "user-card";
        const name = document.createElement("h3");
        name.textContent = user.name;
        const email = document.createElement("p");
        email.textContent = `✉ ${user.email}`;
        const company = document.createElement("p");
        company.textContent = `Company: ${user.company.name}`;
        const city = document.createElement("p");
        city.textContent = `City: ${user.address.city}`;
        card.append(name, email, company, city);
        usersContainer.append(card);
    });
    document.getElementById("user-count").textContent = `${users.length} user(s) shown`;
}

function applyUserControls() {
    const query = searchInput.value.trim().toLowerCase();
    const direction = sortSelect.value === "az" ? 1 : -1;
    const city = cityFilter.value;
    const visibleUsers = allUsers
        .filter(user => user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query))
        .filter(user => !city || user.address.city === city)
        .sort((a, b) => direction * a.name.localeCompare(b.name));
    displayUsers(visibleUsers);
}

async function loadUsers() {
    usersLoading.hidden = false;
    usersError.textContent = "";
    try {
        allUsers = await fetchJSON(USERS_URL);
        const cities = [...new Set(allUsers.map(user => user.address.city))].sort();
        cities.forEach(city => {
            const option = document.createElement("option");
            option.value = city;
            option.textContent = city;
            cityFilter.append(option);
        });
        applyUserControls();
    } catch (error) {
        usersError.textContent = error.message;
    } finally {
        usersLoading.hidden = true;
    }
}

searchInput.addEventListener("input", applyUserControls);
sortSelect.addEventListener("change", applyUserControls);
cityFilter.addEventListener("change", applyUserControls);

document.getElementById("post-form").addEventListener("submit", async event => {
    event.preventDefault();
    const status = document.getElementById("post-status");
    const result = document.getElementById("post-result");
    status.textContent = "Submitting...";
    try {
        const created = await fetchJSON("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: document.getElementById("post-title").value.trim(),
                body: document.getElementById("post-body").value.trim(),
                userId: Number(document.getElementById("post-user-id").value)
            })
        });
        result.textContent = JSON.stringify(created, null, 2);
        status.textContent = "The API accepted the post (JSONPlaceholder simulates saving; it does not persist it).";
    } catch (error) {
        status.textContent = `Could not submit: ${error.message}`;
    }
});

document.getElementById("fetch-one").addEventListener("click", async () => {
    try { document.getElementById("fetch-output").textContent = JSON.stringify(await fetchJSON(`${USERS_URL}/1`), null, 2); }
    catch (error) { document.getElementById("fetch-output").textContent = error.message; }
});
document.getElementById("fetch-posts").addEventListener("click", async () => {
    try { document.getElementById("fetch-output").textContent = JSON.stringify(await fetchJSON(`${USERS_URL}/1/posts`), null, 2); }
    catch (error) { document.getElementById("fetch-output").textContent = error.message; }
});

loadUsers();
