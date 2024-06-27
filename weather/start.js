const apiKey = '6cdb37568e0822c0b127bc32524152b8'; // Replace with your actual API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const weatherIconElement = document.getElementById('weatherIcon');
const bodyElement = document.body;

// weather icons
const weatherIcons = {
    '01d': 'wi-day-sunny',
    '01n': 'wi-night-clear',
    '02d': 'wi-day-cloudy',
    '02n': 'wi-night-alt-cloudy',
    '03d': 'wi-cloud',
    '03n': 'wi-cloud',
    '04d': 'wi-cloudy',
    '04n': 'wi-cloudy',
    '09d': 'wi-showers',
    '09n': 'wi-showers',
    '10d': 'wi-day-rain',
    '10n': 'wi-night-rain',
    '11d': 'wi-thunderstorm',
    '11n': 'wi-thunderstorm',
    '13d': 'wi-snow',
    '13n': 'wi-snow',
    '50d': 'wi-fog',
    '50n': 'wi-fog'
};
// dynamic weather backgrounds
const weatherBackgrounds = {
    'Clear': 'linear-gradient(135deg, #f5af62, #f54744)',
    'Clouds': 'linear-gradient(135deg, #b0b6b8, #6b6b6b)',
    'Rain': 'linear-gradient(135deg, #62a8f5, #4475ef)',
    'Thunderstorm': 'linear-gradient(135deg, #373b44, #4286f4)',
    'Snow': 'linear-gradient(135deg, #a1c4fd, #c2e9fb)',
    'Mist': 'linear-gradient(135deg, #d3cce3, #e9e4f0)',
    'Fog': 'linear-gradient(135deg, #d3cce3, #e9e4f0)',
    'Haze': 'linear-gradient(135deg, #d3cce3, #e9e4f0)',
    'Smoke': 'linear-gradient(135deg, #d3cce3, #e9e4f0)'
};

// Add event listener to search button to trigger weather fetch
searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});

// Fetch weather data from OpenWeatherMap API 
function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // update the DOM element with fetched data
            locationElement.textContent = data.name;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            descriptionElement.textContent = data.weather[0].description;

            // Get main weather conditions and icon
            const weatherMain = data.weather[0].main;
            const weatherIcon = data.weather[0].icon;

            // update background based on weather conditions and update weather icon
            bodyElement.style.background = weatherBackgrounds[weatherMain] || 'linear-gradient(135deg, #62b8f5, #4475ef)';
            weatherIconElement.className = `wi ${weatherIcons[weatherIcon]}`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}