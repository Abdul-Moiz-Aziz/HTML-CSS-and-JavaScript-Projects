let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temperature = document.querySelector(".weather_temperature");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");
let w_feelsLike = document.querySelector(".weather_feelsLike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");
let citySearch = document.querySelector(".weather_search");

let videoBackground = document.querySelector(".video-background");

let city = "london";

citySearch.addEventListener("submit", (e) => {
      e.preventDefault();

      let searchCityName = document.querySelector(".city_name");
      city = searchCityName.value;
      getData();

      searchCityName.value = "";
})

let getDateTime = (dt) => {
      let date = new Date(dt * 1000);
      let options = {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            timeZone: "Asia/Karachi",
            timeZoneName: "short",
      };
      return new Intl.DateTimeFormat('en-US', options).format(date);
}

let getData = async () => {
      // Replace {api-key} with your own API key in apiUrl variable from "OpenWeatherMap.com"

      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid={API_KEY}`;

      try {
            let response = await fetch(apiUrl);
            let data = await response.json();

            if (data.cod === "404") {
                  alert("City not found");
                  return;
            }

            const { main, name, weather, wind, sys, dt } = data;
            let temperature = (main.temp - 273.15).toFixed(1);
            let min_temp = (main.temp_min - 273.15).toFixed(1);
            let max_temp = (main.temp_max - 273.15).toFixed(1);
            let feels_like = (main.feels_like - 273.15).toFixed(1);
            const regionNames = new Intl.DisplayNames([sys.country], { type: "region" }).of(sys.country);

            cityName.innerHTML = `${name}, ${regionNames}`;
            dateTime.innerHTML = getDateTime(dt);
            w_forecast.innerHTML = weather[0].main;
            w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;
            w_temperature.innerHTML = `${temperature}&#176C`;
            w_minTem.innerHTML = `Min: ${min_temp}&#176C`;
            w_maxTem.innerHTML = `Max: ${max_temp}&#176C`;
            w_feelsLike.innerHTML = `${feels_like}&#176C`;
            w_humidity.innerHTML = `${main.humidity}%`;
            w_wind.innerHTML = `${wind.speed} m/s`;
            w_pressure.innerHTML = `${main.pressure} hPa`;

            switch (weather[0].main) {
                  case 'Clear':
                        videoBackground.src = 'clear.mp4';
                        break;
                  case 'Clouds':
                        videoBackground.src = 'clouds.mp4';
                        break;
                  case 'Rain':
                        videoBackground.src = 'rain.mp4';
                        [cityName, w_temperature, w_maxTem, w_minTem, dateTime].forEach(el => el.style.color = "white");
                        break;
                  case 'Thunderstorm':
                        videoBackground.src = 'thunderstorm.mp4';
                        [cityName, w_temperature, w_maxTem, w_minTem, dateTime].forEach(el => el.style.color = "white");
                        break;
                  case 'Snow':
                        videoBackground.src = 'snow.mp4';
                        [w_temperature, w_maxTem, w_minTem].forEach(el => el.style.color = "white");
                        break;
                  case "Mist":
                        videoBackground.src = 'mist.mp4';
                        break;
                  default:
                        videoBackground.src = 'default.mp4';
                        break;
            }
      }
      catch (error) {
            console.error(error);
      }
}

document.addEventListener("DOMContentLoaded", getData());