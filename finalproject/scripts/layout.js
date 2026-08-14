const navMenu = document.querySelector("#nav-bar");
const navButton = document.querySelector("#nav-button");

navButton.addEventListener("click",()=>{
    navMenu.classList.toggle("show");
    navButton.classList.toggle("show");
});
