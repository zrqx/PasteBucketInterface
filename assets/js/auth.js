// Functions
function getCookie(cookieName){
    let cookieQuery = cookieName + '='
    let cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++){
        if (cookies[i].includes(cookieQuery)) return cookies[i].replace(cookieQuery, '')
    }
}

function checkCookie(cookieName){
	let value = getCookie(cookieName)
	if (value != null) return value
}

function cookieBasedActions() {
    if (checkCookie('PasteBucket-API-Key') != null ) {
        console.log('Cookie Found')
        if (window.location.pathname == '/register.html') {
            // Redirect to Dashboard
            window.location = "dashboard.html"
        }
    } else {
        console.log('Cookie Not Found')
        if (window.location.pathname == '/' || window.location.pathname.includes('index.html')){
            // Change the Button Attributes (index.html)
            const btn = document.querySelector('.cta')
            btn.setAttribute('href', 'register.html')
            btn.innerHTML = 'Register to PasteBucket'
        }

    }
}

// Events
window.onload = cookieBasedActions