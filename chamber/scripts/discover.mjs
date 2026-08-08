import Places from "../data/turistic-places.mjs";

const TemplateCards = document.querySelector("#template-cards");

//This function renders the card elements inside the 'template-cards' element
function RenderCards(places){
    let Html = '';
    places.forEach((venue, i) => Html +=
        `<div class="template-card">
            <h2>${venue.name}</h2>
            <figure>
                <img src="${venue.src}" alt="picture of ${venue.name}" load="lazy" width="300" height="200">
                <figcaption>Picture of ${venue.name.toLowerCase()}<figcaption>
            </figure>
            <address>${venue.address}</address>
            <p>${venue.description}</p>
            <button id='${i}'>learn more</button>
        </div>`
    ); 

    TemplateCards.innerHTML = Html;
}

RenderCards(Places.Tegucigalpa);