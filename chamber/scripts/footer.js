const lastModified = document.getElementById("lastModified");
const currentYearElement = document.getElementById("currentYear");

//current date
let today = new Date();
currentYearElement.innerText =`${today.getFullYear()}`;

//Inserting date to lastModified element
lastModified.innerText = document.lastModified;