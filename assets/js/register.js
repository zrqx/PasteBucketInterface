// Functions
function setCookie(cname, cvalue, exdays){
	const d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	let expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";";
}

async function generateAndSaveAPIKey() {
    try {
        // Generate API Key
        let response = await fetch('http://localhost:3000/users',{method: "POST"})
        let data = await response.json()
        // Save API Key as Cookie
        setCookie('PasteBucket-API-Key', data.apiKey, 365)
        console.log("Set-Cookie: Success")
        // Redirect to Dashboard
        window.location = "dashboard.html"

    } catch (error) {
        console.log('Error: Could not Generate API Keys')
        console.log(error)
    }
}

// Events
let button = document.querySelector('button')
button.addEventListener('click', generateAndSaveAPIKey , false);
