//IIFE (Immediately Invoked Function Expression)
(function () {
  // Select Elements
  const notificationElement = document.querySelector(".notification");
  const iconElement = document.querySelector(".weather-icon");
  const tempElement = document.querySelector(".temperature-value p");
  const descElement = document.querySelector(".temperature-description p");
  const locationElement = document.querySelector(".location p");

  // Aplication

  const weather = {};
  weather.temperature = {
    unit: "celsius",
  };

  // APP CONSTS AND VARS
  const KELVIN = 273;
  // API KEY
  const key = "82005d27a116c2880c8f0fcb866998a0";

  // Checks if browser supports geolocation
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
  } else {
    notificationElement.getElementsByClassName.display = "block";
    notificationElement.innerHTML =
      "<p>Browser doesn't support Geolocation</p>";
  }

  // Set user's position
  function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
  }
  // Show error when there is an issue with geolocation service
  function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
  }

  // Get weather from API provider
  function getWeather(latitude, longitude) {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api)
      .then(function (response) {
        let data = response.json();
        return data;
      })
      .then(function (data) {
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
      })

      .then(function () {
        displayWeather();
      });
  }

  // Display weather
  function displayWeather() {
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png" />`;
    tempElement.innerHTML = `<p>${weather.temperature.value} °<span>C</span></p>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
  }

  // C to F convertion
  function celsiusToFahrenheit(temperature) {
    return (temperature * 9) / 5 + 32;
  }

  tempElement.addEventListener("click", function (e) {
    if (weather.temperature.value === undefined) return;

    if (weather.temperature.unit === "celsius") {
      let fahrenheit = Math.floor(
        celsiusToFahrenheit(weather.temperature.value)
      );
      tempElement.innerHTML = `<p>${fahrenheit} °<span>F</span></p>`;
      weather.temperature.unit = "fahrenheit";
    } else {
      tempElement.innerHTML = `<p>${weather.temperature.value} °<span>C</span></p>`;
      weather.temperature.unit = "celsius";
    }
  });
})();
