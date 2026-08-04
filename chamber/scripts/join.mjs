import Modal from "./modals.mjs";

//Inserting timestamp to the form
const TIMESTAMP = new Date().toISOString();
document.querySelector("#form-timestamp").value = TIMESTAMP;

//Modal
const membershipInfoModal = new Modal("myModal");

//Buttons
const npMembershipBtn = document.getElementById("np-membership");
const bronzeMembershipBtn = document.getElementById("bronze-membership");
const silverMembershipBtn = document.getElementById("silver-membership");
const goldMembershipBtn = document.getElementById("gold-membership");

//Content
const memberships = {
    "np":{
        "color":"black",
        "price":0,
        "description":"For registered non-profit organizations. Includes a basic organization listing in our member directory, access to community networking events, and eligibility to apply for grant/partnership opportunities we share with members."
    },
    "bronze":{
        "color":"bronze",
        "price":50,
        "description":"Everything in NP Membership, plus a listing with your logo in the member directory, discounted admission to quarterly networking events, and access to our monthly newsletter with local business resources."
    },
    "silver":{
        "color":"silver",
        "price":150,
        "description":'Everything in Bronze, plus a featured listing with a short business description on our directory page, one free training workshop per year, 10% discount on all hosted events, and inclusion in our "New & Notable Members" email spotlight.'
    },
    "gold":{
        "color":"gold",
        "price":350,
        "description":"Everything in Silver, plus a rotating spotlight placement on our homepage, unlimited access to all training workshops, priority booth placement at annual events, 20% discount on event tickets, and one complimentary social media feature per quarter."
    }
}

function ShowModal(title, content){
    membershipInfoModal.SetTitle(title);
    membershipInfoModal.SetHeaderClass(content.color,["gold","silver","black","bronze"]);
    let price = content.price === 0 ? "Free" : `${content.price}/Year`;
    let html = `
    <p class="strong">Price - <span>${price}</span></p>
    <p>${content.description}</p>
    `
    membershipInfoModal.InsertHtml(html);
    membershipInfoModal.ShowModal();
}

//Show Details
npMembershipBtn.addEventListener("click",()=> ShowModal("Np Membership",memberships.np));
bronzeMembershipBtn.addEventListener("click",()=>ShowModal("Bronze Membership", memberships.bronze));
silverMembershipBtn.addEventListener("click",()=>ShowModal("Silver Membership", memberships.silver));
goldMembershipBtn.addEventListener("click",()=>ShowModal("Gold Membership", memberships.gold));