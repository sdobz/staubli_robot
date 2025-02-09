console.log("js loaded, running network request")

async function download() {
    const response = await fetch("/api/hello")

    console.log(await response.json())
}
download()
