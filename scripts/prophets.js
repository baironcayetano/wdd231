const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');

//This function creates or updates a card
function createCard(prophet, cardId){
    let card = document.createElement("section");
        card.id = `p-${cardId}`

    let fullName = document.createElement("h2");
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;

    let portrait = document.createElement("img");
        portrait.setAttribute("src",prophet.imageurl);
        portrait.setAttribute("alt", `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute("loading","lazy");
        portrait.setAttribute("width",'340');
        portrait.setAttribute("height",'440');

    card.appendChild(fullName)
    card.appendChild(portrait)
    
    //Finds a card with the same id and if it founds one it updates the card
    if(document.getElementById(`p-${cardId}`)){
        cards.replaceChild(card,document.getElementById(`p-${cardId}`));
        return
    }

    //Inserts a new card
    cards.appendChild(card);
}

//Display prophets
function displayProphets(prophets){
    prophets.forEach((prophet,i) => createCard(prophet,i))
}

//Returns information about the profets
async function getPropehtData(){
    let response = await fetch(url);
    let data  =  await response.json(); //parse the JSON 
    console.table(data) //temp output test of data response

    displayProphets(data.prophets);
}

getPropehtData();
