console.log("js loaded, running network request")

async function get(url) {
    return await (await fetch(url)).json()
}

get("/api/robot").then(console.log)
