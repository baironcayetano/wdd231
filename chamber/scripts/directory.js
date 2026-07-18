const cards = document.getElementById("cards");
const membersUrl = "https://baironcayetano.github.io/wdd231/chamber/data/members.json";

//returns level of membership
function getLevel(level){
    switch (level) {
        case 1:
            return "member";
        case 2:
            return "silver";
        case 3:
            return "gold";    
        default:
            return "member";
    }
}

//creates or updates a card
function card(member,id){
    let card = document.createElement("section");
    card.id = `card-${id}`;
    card.classList.add("card");

    let titleContainer = document.createElement("div");
    let leftContainer = document.createElement("div");
    let rightContainer = document.createElement("div");

    titleContainer.classList.add("card-header");
    leftContainer.classList.add("card-left-container");
    rightContainer.classList.add("card-right-container");

    let title = document.createElement("h3");
        title.textContent = member.company_name;  

    let membershipLvl = document.createElement("span");
    let lvl = getLevel(member.membership_level);
        membershipLvl.textContent = lvl;
        membershipLvl.classList.add(`membership-${lvl}`);
    
    titleContainer.appendChild(title);
    titleContainer.appendChild(membershipLvl);

    let companyImage = document.createElement("img");
        companyImage.src = member.image_url;
        companyImage.setAttribute("alt", `Company logo of ${member.company_name}`);
        portrait.setAttribute("loading","lazy");
        portrait.setAttribute("width",'340');
        portrait.setAttribute("height",'440');

    leftContainer.appendChild(companyImage);

    //Address
    let addressContainer = document.createElement("p");
    let addressStrong = document.createElement("strong");
    let addressSpan = document.createElement("span");
        addressStrong.textContent = "Address";
        addressSpan.textContent = member.address;
        addressContainer.appendChild(addressStrong);
        addressContainer.appendChild(addressSpan);

    //email
    let emailContainer = document.createElement("p");
    let emailStrong = document.createElement("strong");
    let emailLink = document.createElement("a");
        emailStrong.textContent = "Email";
        emailLink.textContent = member.email;
        emailLink.href = `mailto:${member.email}`;
        emailContainer.appendChild(emailStrong);
        emailContainer.appendChild(emailLink);

    //phoneNumber
    let phoneContainer = document.createElement("p");
    let phoneStrong = document.createElement("strong");
    let phoneLink = document.createElement("a");
        phoneStrong.textContent = "Phone";
        phoneLink.textContent = member.phone_number;
        phoneLink.href = `tel:${member.phone_number}`;
        phoneContainer.appendChild(phoneStrong);
        phoneContainer.appendChild(phoneLink);

    //website url
    let websiteContainer = document.createElement("p");
    let websiteStrong = document.createElement("strong");
    let websiteLink = document.createElement("a");
        websiteStrong.textContent = "Website";
        websiteLink.textContent = member.website_url;
        websiteLink.href = member.website_url;
        phoneContainer.appendChild(phoneStrong);
        phoneContainer.appendChild(websiteLink);

     //International
    let internationalContainer = document.createElement("p");
    let intrenationalStrong = document.createElement("strong");
    let internationalSpan = document.createElement("span");
        internationalStrong.textContent = "International";
        interantionalSpan.textContent = member.international ? "Yes" : "No";
        internationalContainer.appendChild(internationalStrong);
        internationalContainer.appendChild(interantionalSpan);

    rightContainer.appendChild(addressContainer);
    rightContainer.appendChild(emailContainer);
    rightContainer.appendChild(phoneContainer);
    rightContainer.appendChild(websiteContainer);
    rightContainer.appendChild(internationalContainer);

    //card
    card.appendChild(titleContainer);
    card.appendChild(leftContainer);
    card.appendChild(rightContainer);

    //replace element if exists
    if(document.getElementById(`card-${id}`)){
        cards.replaceChild(card, document.getElementById(`card-${id}`));
        return;
    }

    cards.appendChild(card);
    return;
}

//displayMembers
function displayMembers(members){
    members.forEach((member,id)=> card(member,id));
}

//Returs the members list
async function getMembers(){
    let response = await fetch(membersUrl);
    let data = await response.json();
    displayMembers(data.companies);
}

getMembers();

