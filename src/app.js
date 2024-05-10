

function updateWeather(response){
let temperatureElement = document.querySelector("#temperature");
let temperature = response.data.temperature.current;
let cityElement = document.querySelector("#city");
let descriptionElement = document.querySelector("#description");
let humidityElement =  document.querySelector("#Humidity");
let windSpeedElement = document.querySelector("#wind-speed");
let timeElement = document.querySelector("#Time");
let date = new Date(response.data.time * 1000);
let iconElement = document.querySelector("#icon");


cityElement.innerHTML = response.data.city;
timeElement.innerHTML = formatDate(date);
humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
descriptionElement.innerHTML = response.data.condition.description;
windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
temperatureElement.innerHTML = Math.round(temperature);
iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`; 
}
function formatDate(date){
let hours = date.getHours();
let minutes = date.getMinutes();
let days = [
      "Sunday", 
      "Monday",
      "Tuesday",
      "Wednesday",
       "Thursday", 
       "Friday", 
       "Saturday"
      ] ;

let day = days[date.getDay()];
if (minutes < 10){
  minutes = `0${minutes}`;
}

return `${day} ${hours}:${minutes}`;
}

function changeCity(city){
let apiKey = "00c99d472fbddtac3e3b2d017a4afdbo";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
console.log(apiUrl)
 axios.get(apiUrl).then(updateWeather); 
}

function handleSearchSubmit(event){
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
  changeCity(searchInput.value);

}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit",handleSearchSubmit);

changeCity("Johannesburg");
displayForecast();

function displayForecast() {
  let days = ["Sun", "Mon", "Tue", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${day}</div>
        <div class="weather-forecast-icon">🌤️</div>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>15º</strong>
          </div>
          <div class="weather-forecast-temperature">9º</div>
        </div>
      </div>
    `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
