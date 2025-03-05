function toggleMenu() {
    document.getElementById("nav-links").classList.toggle("show");
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById("output").innerHTML = "Geolocation is not supported by your browser.";
    }
}

function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    document.getElementById("output").innerHTML = `Latitude: ${lat} <br> Longitude: ${lon}`;
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById("output").innerHTML = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById("output").innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            document.getElementById("output").innerHTML = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById("output").innerHTML = "An unknown error occurred.";
            break;
    }
}

const apiKey = 'f86442094176641a09b2caea7e50d0fa';
let isCelsius = true;
let currentTempCelsius = 0;

function getWeather() {
    const city = document.getElementById('city-input').value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            const location = `${data.name}, ${data.sys.country}`;
            const datetime = new Date().toLocaleString();
            const iconCode = data.weather[0].icon
            const icon = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
            currentTempCelsius = data.main.temp;
            const temperature = `${currentTempCelsius.toFixed(1)} °C`;
            const description = data.weather[0].description;

            document.getElementById('location').innerText = location;
            document.getElementById('datetime').innerText = datetime;
            document.getElementById('weather-icon').src = icon;
            document.getElementById('temperature').innerText = temperature;
            document.getElementById('description').innerText = description;
            document.getElementById('humidity').innerText = `${data.main.humidity}%`;
            document.getElementById('wind-speed').innerText = `${data.wind.speed} km/h`;
            document.getElementById('pressure').innerText = `${data.main.pressure} hPa`;
        })
        .catch(error => {
            alert('City not found!');
            console.error(error);
        });
}

function toggleTemperature() {
    if (isCelsius) {
        const tempFahrenheit = (currentTempCelsius * 9/5) + 32;
        document.getElementById('temperature').innerText = `${tempFahrenheit.toFixed(1)} °F`;
    } else {
        document.getElementById('temperature').innerText = `${currentTempCelsius.toFixed(1)} °C`;
    }
    isCelsius = !isCelsius;
}

// Initialize Particles.js
particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 100,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#ffffff"
        },
        "shape": {
            "type": "circle"
        },
        "opacity": {
            "value": 0.5
        },
        "size": {
            "value": 3
        },
        "move": {
            "enable": true,
            "speed": 2
        }
    },
    "interactivity": {
        "events": {
            "onhover": {
                "enable": true,
                "mode": "repulse"
            }
        }
    }
});