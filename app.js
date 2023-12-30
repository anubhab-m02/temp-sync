// OpenWeatherMap API key
const apiKey = "8aee61dd7085d8e0c744e755a6749b39";

// API URL for fetching weather data in metric units
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// DOM elements
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Function to check and display weather information for a given city
async function checkWeather(city) {

    // Fetch weather data from OpenWeatherMap API
    const response = await fetch(apiURL + city + "&appid=" + apiKey);

    // Parse JSON data from the response
    var data = await response.json();

    // Check if the city is not found (HTTP status code 404)
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } 
    else {
        // Update DOM elements with weather information
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Set weather icon based on weather conditions
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
        }

        // Display the weather information and hide the error message
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

// Event listener for the search button to trigger weather check
searchBtn.addEventListener("click", function () {
    checkWeather(searchBox.value);
});
