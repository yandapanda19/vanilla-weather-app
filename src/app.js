

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector('#forecast');
  let forecastHTML = `<div class="row">`

  forecast.forEach(function(forecastDay, index) {
    console.log(index);
    if(index < 6) {
    forecastHTML += 
    `<div class="col-2">
      <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
        <img src="${forecastDay.condition.icon_url}" alt="forecast icon" width="46">
        <div class="weather-forecast-temperature">
          <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temperature.maximum)}°</span>
          <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temperature.minimum)}°</span>
        </div>
    </div>`
  }})


forecastHTML += `</div>`;
forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let key = "2aa5d6c3bt94of74014f9bf308abbb25";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?&lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${key}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
  console.log(apiUrl);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector('#temperature');
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `Humidity: ${response.data.temperature.humidity} %`;
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  iconElement.setAttribute('src', response.data.condition.icon_url);
  iconElement.setAttribute("alt", response.data.condition.icon);
  celsiusTemperature = Math.round(response.data.temperature.current);

getForecast(response.data.coordinates);
}

function search(query) {
  let key = "2aa5d6c3bt94of74014f9bf308abbb25";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${key}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector('#cityInput');
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove('active');
  fahrenheitLink.classList.add('active');
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = celsiusTemperature;
}

let celsiusTemperature = null;
let form = document.querySelector('#search-form');
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector('#fahrenheit-link');
fahrenheitLink.addEventListener('click', displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search('Kyiv');



