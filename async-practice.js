// LESSON 11 — CALLBACKS, PROMISES AND ASYNC/AWAIT
// The timers imitate slow database or network work so the order is observable.

const pause = ms => new Promise(resolve => setTimeout(resolve, ms));

function loadUser(userId, callback) {
    setTimeout(() => callback({ id: userId, name: `User ${userId}` }), 1500);
}

// Callback versions are kept separate so you can see the nested "pyramid".
function getUserDataCallback(userId, callback) {
    setTimeout(() => callback({ id: userId, name: `User ${userId}` }), 350);
}
function getUserPostsCallback(userId, callback) {
    setTimeout(() => callback([{ id: userId * 10 + 1, title: "Learning JavaScript" }]), 350);
}
function getPostCommentsCallback(postId, callback) {
    setTimeout(() => callback([{ id: 1, text: `A comment on post ${postId}` }]), 350);
}

// Promise versions reject invalid user IDs, which gives try/catch something to handle.
function getUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => userId > 0
            ? resolve({ id: userId, name: `User ${userId}` })
            : reject(new Error("Invalid user ID")), 500);
    });
}
function getUserPosts(userId) {
    return new Promise(resolve => setTimeout(() => resolve([
        { id: userId * 10 + 1, title: "Learning JavaScript" },
        { id: userId * 10 + 2, title: "Working with APIs" }
    ]), 500));
}
function getPostComments(postId) {
    return new Promise(resolve => setTimeout(() => resolve([
        { id: 1, text: `A useful comment on post ${postId}` },
        { id: 2, text: "Thanks for sharing!" }
    ]), 500));
}

function print(id, value) {
    document.getElementById(id).textContent = typeof value === "string"
        ? value : JSON.stringify(value, null, 2);
}

document.getElementById("run-order").addEventListener("click", () => {
    const lines = ["A"];
    setTimeout(() => { lines.push("B"); print("order-output", lines.join("\n")); }, 0);
    lines.push("C");
    setTimeout(() => { lines.push("D"); print("order-output", lines.join("\n")); }, 100);
    lines.push("E");
    print("order-output", lines.join("\n"));
});

document.getElementById("run-callback").addEventListener("click", () => {
    print("callback-output", "Loading...");
    loadUser(7, user => print("callback-output", user));
});

document.getElementById("run-callback-hell").addEventListener("click", () => {
    print("promise-output", "Nested callbacks are running...");
    getUserDataCallback(1, user => {
        const lines = [`User: ${JSON.stringify(user)}`];
        getUserPostsCallback(user.id, posts => {
            lines.push(`Posts: ${JSON.stringify(posts)}`);
            getPostCommentsCallback(posts[0].id, comments => {
                lines.push(`Comments: ${JSON.stringify(comments)}`);
                print("promise-output", lines.join("\n\n"));
            });
        });
    });
});

document.getElementById("run-promise-sequence").addEventListener("click", () => {
    print("promise-output", "Loading user, posts and comments with a Promise chain...");
    getUserData(1)
        .then(user => getUserPosts(user.id))
        .then(posts => getPostComments(posts[0].id))
        .then(comments => print("promise-output", comments))
        .catch(error => print("promise-output", error.message));
});

document.getElementById("run-promise-all").addEventListener("click", async () => {
    print("parallel-output", "Loading three users in parallel...");
    try {
        const users = await Promise.all([1, 2, 3].map(getUserData));
        print("parallel-output", users);
    } catch (error) {
        print("parallel-output", error.message);
    }
});

document.getElementById("run-promise-race").addEventListener("click", async () => {
    const fast = pause(100).then(() => "Fast task finished first");
    const slow = pause(500).then(() => "Slow task finished");
    print("parallel-output", await Promise.race([fast, slow]));
});

async function getDataWithAsync(userId) {
    const user = await getUserData(userId);
    const posts = await getUserPosts(user.id);
    const comments = await getPostComments(posts[0].id);
    return { user, posts, comments };
}

document.getElementById("run-async-sequence").addEventListener("click", async () => {
    print("async-output", "Loading with async/await...");
    try {
        print("async-output", await getDataWithAsync(1));
    } catch (error) {
        print("async-output", error.message);
    }
});

document.getElementById("run-error").addEventListener("click", async () => {
    try {
        await getDataWithAsync(0);
    } catch (error) {
        print("async-output", `Caught with try/catch: ${error.message}`);
    }
});
