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
    const first = await randomTask("Task 1");
    const second = await randomTask("Task 2");
    const third = await randomTask("Task 3");
    output.textContent = [first, second, third, `Total time: ${Math.round(performance.now() - start)}ms`].join("\n");
});

document.getElementById("day-3").addEventListener("click", async () => {
    const output = document.getElementById("out-3");
    output.textContent = "Fetching user 9999...";
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users/9999");
        // A 404 means the requested user does not exist, so return a safe fallback.
        if (response.status === 404 || response.status === 200 && response.headers.get("content-length") === "0") {
            output.textContent = JSON.stringify({ id: 0, name: "Guest User", email: "guest@example.com" }, null, 2);
            return;
        }
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const user = await response.json();
        output.textContent = JSON.stringify(Object.keys(user).length ? user : { id: 0, name: "Guest User", email: "guest@example.com" }, null, 2);
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
    // Update the page as each individual request settles, then also collect
    // the complete set of outcomes with Promise.allSettled().
    const requests = endpoints.map(async (url, index) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            output.textContent += `\n\nEndpoint ${index + 1} completed: ${JSON.stringify(data)}`;
            return data;
        } catch (error) {
            output.textContent += `\n\nEndpoint ${index + 1} failed: ${error.message}`;
            throw error;
        }
    });
    const results = await Promise.allSettled(requests);
    const successCount = results.filter(result => result.status === "fulfilled").length;
    output.textContent += `\n\nAll requests settled. Successful: ${successCount}/${results.length}.`;
});
