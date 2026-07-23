import { apiFetch } from "./weather-api.mjs";

//HTML ELEMENTS
const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("figcaption");

const tierGermanyLocation = {
    lat:49.74,
    lon:6.64
}

/**
 * Displays Results 
**/
function displayResults(data){
    currentTemp.innerHTML = `${data.main.temp}`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let description = data.weather[0].description;
    weatherIcon.src = iconsrc;
    weatherIcon.setAttribute("load","lazy");
    captionDesc.textContent = `${description}`;
}

const weather = await apiFetch(tierGermanyLocation);
displayResults(weather);
