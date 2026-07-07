const navButton = document.getElementById("nav-button");
const navBar = document.getElementById("nav-bar");

//Toggle to show class off and on
navButton.addEventListener("click",()=>{
    navButton.classList.toggle("show");
    navBar.classList.toggle("show");
})


