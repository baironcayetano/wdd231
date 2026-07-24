import { getThreeRandomMembers } from "./members-api.mjs";
import ThreeDayWeather, { currentWeather, threeDayForecast } from "./weather-api.mjs";

//HTML
const currentEvents = document.querySelector("#currentEvents");
const weather = document.querySelector("#weather");
const todayWeather = document.querySelector("#todayWeather");
const threeDayWeather = document.querySelector("#threeDaysWeather");
const spotlights = document.querySelector("#spotlight-cards");


/* This site is for Tegucigalpa Chamber of Commerce.
   All weather and event information should be specific to Tegucigalpa only.  
*/

//Location of Tegucigalpa City
const tegucigalpaLocation = {
    lat:14.05, 
    lon:-87.18,
}

const todayWeatherInfo = await currentWeather(tegucigalpaLocation);
const threeDayWeatherInfo = await threeDayForecast(tegucigalpaLocation);

function displayTodayWeather(data){
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    const description = data.weather[0].description;
    let html = `
        <div class="card">
          <div class='card-image'>
            <img src="${iconsrc}" alt="${description} icon" load="lazy" width="150px" height="150px"> 
          </div>
          <div class="card-content">
            <h3>Today</h3> 
            <p>${description}</p>         
            <p class="weather-temperature"><strong>Temperature:</strong><span> ${data.main.temp} C°</span></p>
            <p><strong>Feels like:</strong><span> ${data.main.feels_like} C°</span></p>
            <p><strong>Max:</strong><span> ${data.main.temp_max} C°</span></p>
            <p><strong>Min:</strong><spa> ${data.main.temp_min} C°</span></p>
          </div>
        </div>
    `
    todayWeather.innerHTML = html;
}


function createCardDay(dayWeather){
    let iconsrc = `https://openweathermap.org/img/w/${dayWeather.icon}.png`;
    let date = new Date(dayWeather.date);
    let weekDay = date.toLocaleDateString('eng',{weekday:'long'})
    let html = `<div class="card">
        <div class="card-image">
            <img src="${iconsrc}" alt="${dayWeather.description} icon" load="lazy" width="150px" height="150px">             
        </div>
        <div class="card-content">
            <h4>${weekDay}</h4>
            <p>${dayWeather.date}</p>
            <p>${dayWeather.description}</p>
            <p><strong>Max:</strong> <span>${dayWeather.max_temp} C°</span></p>
            <p><strong>Min:</strong> <span>${dayWeather.min_temp} C°</span></p>
        </div>
    </div>`
    return html;
}

function displayThreeDayWeather(data){
    const threeDays= new ThreeDayWeather(data);
    let html = '';
        html += createCardDay(threeDays.getFirstDay())
        html += createCardDay(threeDays.getSecondDay())
        html += createCardDay(threeDays.getThirdDay())
    console.log(html);
    threeDayWeather.innerHTML = html;
}


displayTodayWeather(todayWeatherInfo);
displayThreeDayWeather(threeDayWeatherInfo);

const randomMembers = await getThreeRandomMembers();

function createMemberCard(member){
    let html = `
    <div class="card">
        <div class="card-image">
            <img src="${member.image_url}" alt="Company logo of ${member.company_name}" load="lazy" width="150" heigh="150">
        </div>
        <div class="card-content">
            <h3>${member.company_name}</h3>
            <p><strong>Class: ${member.membership_level > 2 ? "Gold" :"Silver"}</strong></p>
            <p><strong>Phone:</strong><a href="tel:${member.phone_number}" alt="link to add ${member.company_name} to phone contacts"> ${member.phone_number}</a></p>
            <p><strong>Address:</strong><span> ${member.address}</span></p>
            <p><strong>Website:</strong><a href="${member.website_url} alt="link to the website of ${member.company_name}"> ${member.website_url}</a></p>
        </div>
    </div>`;
    return html;
}

function displaySpotlights(members){
    let html = ``
    members.forEach(member => html += createMemberCard(member));
    spotlights.innerHTML = html;
}

displaySpotlights(randomMembers);
