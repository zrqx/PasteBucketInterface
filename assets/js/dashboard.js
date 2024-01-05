// Functions
function getCookie(cookieName){
    let cookieQuery = cookieName + '='
    let cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++){
        if (cookies[i].includes(cookieQuery)) return cookies[i].replace(cookieQuery, '')
    }
}

async function retrieveAllPastesAndPush() {
    // API Request
    let APIKey = getCookie('PasteBucket-API-Key')
    let response = await fetch('http://localhost:3000/pastes', {
        method: "GET",
        headers: {
            "x-api-key": APIKey
        }
    })
    let data = await response.json()

    // List or Message based on the Response
    if (data.length == 0) {
        // Push :: Message
        canvas.innerHTML = 'You have not created any pastes, yet'
    } else {
        // Push :: List
        canvas.innerHTML = ''
        data.forEach(element => {
            let {body, pasteId, timestamp} = element
            t = new Date(timestamp)
            time = `${t.getDate()}-${t.getMonth()}-${t.getFullYear()} at ${t.getHours()}:${t.getMinutes()}`
            canvas.innerHTML += `<div><p>Paste: ${pasteId} ~ <em>${time}</em></p><p>${body}</p></div>`
        });
    }
}

async function createPasteAndReturn() {
    // Push :: Form 
    canvas.innerHTML = ''
    canvas.innerHTML += '<form action="#" id="create-form"><label for="message">Message</label><textarea id="message" cols="30" rows="10" name="message"></textarea><button> Submit </button></form>'

    // Select the Form and Elements
    let form = document.querySelector('#create-form')
    let message = document.querySelector('#message')

    // Add Event Listeners onto them
    form.addEventListener('submit', async function(e) {
        e.preventDefault()

        // API Request
        let APIKey = getCookie('PasteBucket-API-Key')
        let response = await fetch('http://localhost:3000/pastes', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "x-api-key": APIKey
            },
            body: JSON.stringify({
                "message": message.value
            })
        })
        let data = await response.json()

        // Respond
        canvas.innerHTML = ''
        let {body, pasteId, timestamp} = data
        t = new Date(timestamp)
        time = `${t.getDate()}-${t.getMonth()}-${t.getFullYear()} at ${t.getHours()}:${t.getMinutes()}`
        canvas.innerHTML += `<div><p>Paste: ${pasteId} ~ <em>${time}</em></p><p>${body}</p></div>`
    })
}

async function retrievePasteAndReturn(){
    // Push :: Form to collect `paste_id` input
    canvas.innerHTML = ''
    canvas.innerHTML += '<form action="#" id="create-form"><label for="message">Message ID</label><input id="message" type="text" name="message"></input><button> Submit </button></form>'

    // Select the Forms and Elements
    // Add event listeners onto them
}

// Elemenents
let canvas = document.querySelector('.canvas')
let indexButton = document.querySelector('.index')
let createButton = document.querySelector('.create')
let retrieveButton = document.querySelector('.retrieve')
let updateButton = document.querySelector('.update')
let deleteButton = document.querySelector('.delete')

// Events
indexButton.addEventListener('click', retrieveAllPastesAndPush, false)
createButton.addEventListener('click', createPasteAndReturn, false)
retrieveButton.addEventListener('click', retrievePasteAndReturn, false)
