"use strict";
// start current day
let currentDay = document.getElementById("currentDay");
let currentDayInMonth = document.getElementById("currentDayInMonth");
let country = document.getElementById("location");
let currentTemp = document.getElementById("currentTemp");
let currentIcon = document.getElementById("currentIcon");
let weatherStatus = document.getElementById("weatherStatus");
let humidityRatio = document.getElementById("humidityRatio");
let windSpeed = document.getElementById("windSpeed");
let windDir = document.getElementById("windDir");

// start first day
let firstDay = document.getElementById("firstDay");
let firstDayIcon = document.getElementById("firstDayIcon");
let firstDayMaxTemp = document.getElementById("firstDayMaxTemp");
let firstDayMinTemp = document.getElementById("firstDayMinTemp");
let firstDayWeatherStatus = document.getElementById("firstDayWeatherStatus");

// start second day
let secondDay = document.getElementById("secondDay");
let secondDayIcon = document.getElementById("secondDayIcon");
let secondDayMaxTemp = document.getElementById("secondDayMaxTemp");
let secondDayMinTemp = document.getElementById("secondDayMinTemp");
let secondDayWeatherStatus = document.getElementById("secondDayWeatherStatus");

let locationSearch = document.getElementById("locationSearch");
let defaultCountry = "cairo";
let weatherData = {};

// Get data from API
async function getApiData(country) {
  let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=f6a7ea19c539479182903728220106&q=${country}&days=7`);
  let apiData = await response.json();
  weatherData = apiData;
}

// Fill current day card
function fillCurrentDay() {
  let date = new Date(`${weatherData.forecast.forecastday[0].date}`);
  let day = date.toLocaleString("en-us", { weekday: "long" });
  let month = date.toLocaleString("en-us", { month: "long" });
  currentDay.innerHTML = `${day}`;
  currentDayInMonth.innerHTML = `${date.getDate()} ${month}`;
  country.innerHTML = weatherData.location.name;
  currentTemp.innerHTML = `${weatherData.current.temp_c}<sup>o</sup>C`;
  currentIcon.setAttribute("src", `https:${weatherData.current.condition.icon}`);
  weatherStatus.innerHTML = weatherData.current.condition.text;
  humidityRatio.innerHTML = `${weatherData.current.cloud}%`;
  windSpeed.innerHTML = `${weatherData.current.wind_kph}km/h`;
  windDir.innerHTML = weatherData.current.wind_dir;
}

// fill forecast first-day card
function fillFirstDay() {
  let date = new Date(`${weatherData.forecast.forecastday[1].date}`);
  let day = date.toLocaleString("en-us", { weekday: "long" });
  firstDay.innerHTML = `${day}`;
  firstDayIcon.setAttribute("src", `https:${weatherData.forecast.forecastday[1].day.condition.icon}`);
  firstDayMaxTemp.innerHTML = `${weatherData.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C`;
  firstDayMinTemp.innerHTML = `${weatherData.forecast.forecastday[1].day.mintemp_c}<sup>o</sup>`;
  firstDayWeatherStatus.innerHTML = weatherData.forecast.forecastday[1].day.condition.text;
}

// fill forecast second-day card
function fillSecondDay() {
  let date = new Date(`${weatherData.forecast.forecastday[2].date}`);
  let day = date.toLocaleString("en-us", { weekday: "long" });
  secondDay.innerHTML = `${day}`;
  secondDayIcon.setAttribute("src", `https:${weatherData.forecast.forecastday[2].day.condition.icon}`);
  secondDayMaxTemp.innerHTML = `${weatherData.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C`;
  secondDayMinTemp.innerHTML = `${weatherData.forecast.forecastday[2].day.mintemp_c}<sup>o</sup>`;
  secondDayWeatherStatus.innerHTML = weatherData.forecast.forecastday[2].day.condition.text;
}

// Display data after getting from API
async function displayData() {
  await getApiData(defaultCountry);
  fillCurrentDay();
  fillFirstDay();
  fillSecondDay();
}
displayData();

// Display data for the searched word
locationSearch.addEventListener("input", function () {
  if (locationSearch.value.length >= 3) {
    defaultCountry = locationSearch.value;
    displayData();
  }
});