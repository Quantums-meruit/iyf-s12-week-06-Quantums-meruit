// WEEK 6 DAILY CHALLENGES
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

document.getElementById("day-1").addEventListener("click", async () => {
    const output = document.getElementById("out-1");
    output.textContent = "Waiting...";
    await delay(2000);
    output.textContent = "This prints after the two-second Promise delay.";
});

function randomTask(label) {
    const ms = Math.floor(Math.random() * 900) + 300;
    return delay(ms).then(() => `${label} finished after ${ms}ms`);
}
document.getElementById("day-2").addEventListener("click", async () => {
    const output = document.getElementById("out-2");
    const start = performance.now();
    const results = await randomTask("Task 1").then(() => randomTask("Task 2")).then(() => randomTask("Task 3"));
    output.textContent = `${results}\nTotal time: ${Math.round(performance.now() - start)}ms`;
});

document.getElementById("day-3").addEventListener("click", async () => {
    const output = document.getElementById("out-3");
    output.textContent = "Fetching user 9999...";
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users/9999");
        if (response.status === 404) {
            output.textContent = JSON.stringify({ id: 0, name: "Guest User", email: "guest@example.com" }, null, 2);
            return;
        }
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        output.textContent = JSON.stringify(await response.json(), null, 2);
    } catch (error) { output.textContent = error.message; }
});

function callbackOperation(callback) {
    setTimeout(() => callback(null, "Callback result successfully converted to async/await."), 600);
}
function callbackAsPromise() {
    return new Promise((resolve, reject) => callbackOperation((error, value) => error ? reject(error) : resolve(value)));
}
document.getElementById("day-4").addEventListener("click", async () => {
    try { document.getElementById("out-4").textContent = await callbackAsPromise(); }
    catch (error) { document.getElementById("out-4").textContent = error.message; }
});

document.getElementById("day-5").addEventListener("click", async () => {
    const output = document.getElementById("out-5");
    output.textContent = "Requests started...";
    const endpoints = [
        "https://jsonplaceholder.typicode.com/users/1",
        "https://jsonplaceholder.typicode.com/posts/1",
        "https://jsonplaceholder.typicode.com/comments/1"
    ];
    const requests = endpoints.map(async url => {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`${url} returned HTTP ${response.status}`);
        return response.json();
    });
    const results = await Promise.allSettled(requests);
    // Render each settled result in order, including any individual failure.
    output.textContent = results.map((result, index) => result.status === "fulfilled"
        ? `Endpoint ${index + 1}: ${JSON.stringify(result.value)}`
        : `Endpoint ${index + 1} failed: ${result.reason.message}`).join("\n\n");
});
