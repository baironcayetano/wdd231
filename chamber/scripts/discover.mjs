import Places from "../data/turistic-places.mjs";

const TemplateCards = document.querySelector("#template-cards");
const VisitMsgEl = document.querySelector("#visit-message");

//This function renders the card elements inside the 'template-cards' element
function RenderCards(places){
    let Html = '';
    places.forEach((venue, i) => Html +=
        `<div class="template-card">
            <h2>${venue.name}</h2>
            <figure>
                <img src="${venue.src}" alt="picture of ${venue.name}" loading="lazy" width="300" height="200">
                <figcaption>Picture of ${venue.name.toLowerCase()}<figcaption>
            </figure>
            <address>${venue.address}</address>
            <p>${venue.description}</p>
            <button id='${i}' title="learn more">learn more</button>
        </div>`
    ); 

    TemplateCards.innerHTML = Html;
}

function SetMessage(){
    let lastVisit = localStorage.getItem("last-visited");
    const now = new Date();
    const messages = {
        "firstVisit":"Welcome! Let us know if you have any questions!",
        "lessADay":"Back Soon! Awesome!",
        "default":"You last visited "
    }

    //first visit
    if(lastVisit === null){
        VisitMsgEl.textContent = messages.firstVisit;
        localStorage.setItem("last-visited",now.toISOString())
        return;
    }

    const lastVisitTime = new Date(lastVisit).getTime();
    const differenceInMs = now.getTime() - lastVisitTime;

    const secondsInMs = 1000;
    const minutesInMs = 60 * secondsInMs;
    const hourInMs = 60 * minutesInMs;
    const dayInMs = hourInMs * 24; 

    const daysDiff = Math.floor(differenceInMs / dayInMs)
    
    //last visit has been in less than a day
    if(differenceInMs < dayInMs ){
        VisitMsgEl.textContent = messages.lessADay;
    }

    //otherwise
    else {
        VisitMsgEl.textContent = messages.default + `${daysDiff} day${daysDiff === 1 ? "" :"s"} ago`
    }
    
    localStorage.setItem("last-visited",now.toISOString())
    
}

SetMessage();
RenderCards(Places.Tegucigalpa);