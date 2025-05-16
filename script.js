const quote=document.getElementById("quote");
const author=document.getElementById("author");
        
let select=document.getElementById("options");
let count=0

let darkmode = localStorage.getItem('dark-mode');
const switchButton = document.getElementById('switch');

const enableDarkMode = () => {
    document.body.classList.add('dark-mode')
    localStorage.setItem('dark-mode', 'active')
}

const disableDarkMode = () => {
    document.body.classList.remove('dark-mode')
    localStorage.setItem('dark-mode', null)
}

if(darkmode === 'active') {
    enableDarkMode()
}

switchButton.addEventListener("click", () => {
    darkmode = localStorage.getItem('dark-mode')
    darkmode !== "active" ? enableDarkMode() : disableDarkMode();
})

function inc() {
    if (count >= 9) {
        count = 0;
    }
    else
        count++;
    api_call_Pre_nex();
}

function dec() {
    if (count <= 0) {
        count = 9;
    }
    else
        count--;
    api_call_Pre_nex();
}
        
async function api_call_Pre_nex() {
    const response = await fetch("https://thequoteshub.com/api/tags/" + select.value);
    var data = await response.json();
    quote.innerHTML = data.quotes[count].text;
    author.innerHTML = data.quotes[count].author;
}
random();
       
async function random() {
    const response = await fetch("https://thequoteshub.com/api/tags/" + select.value);
    var data = await response.json();
    count = Math.floor(Math.random() * data.quotes.length);
    quote.innerHTML = data.quotes[count].text;
    author.innerHTML = data.quotes[count].author;
}

select.addEventListener("change", function() {
    count = 0;
    api_call_Pre_nex();
});