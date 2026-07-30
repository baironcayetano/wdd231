import {courses} from "./course-list.js";

const coursesContainer = document.querySelector("#courses");
const AllCourses = document.querySelector("#all-courses");
const CSECourses = document.querySelector("#cse-courses");
const WDDCourses = document.querySelector("#wdd-courses");
const modal= document.querySelector("#myModal");
const closeModal = document.querySelector("#closeModal");
const modalTitle = document.querySelector("#modal-title");
const modalContent = document.querySelector(".modal-content");


function FilterList(subject){
    return courses.filter(course => course.subject === subject)
}

function RenderList(list){
    let credits = list.reduce((i,course)=> {
        return i+course.credits 
    },0);

    let content = "";
    list.forEach(course => {
        content += `<li class="course">
        <button class="course-button" data-course-name="${course.title}">${course.title}</button>
        </li>`;
    });
    coursesContainer.innerHTML = content;
    document.getElementById("credits").textContent = credits;
}


function UpdateSelected(subject){
    let buttons = document.querySelectorAll(".course-button");
    
    buttons.forEach(button => {
        if(subject !== button.id){
            button.classList.remove("active");
        }else{
            button.classList.add("active");
        }
    });
}

function showClassDetails(e){
    
    //This will allow us to only render the dialog when a button has been clicked
    if(!e.target.classList[0] || e.target.classList[0] !== "course-button"){
        return
    }

    //Reading the name of the button and then show information about that class.
    const courseName = e.target.getAttribute("data-course-name");

    let course  = courses.filter((courseContent) => courseContent.title === courseName)[0];
    
    if(!course){
        console.log(`The course ${courseName} doesn't exist`);
        return
    }

    modalTitle.textContent = course.subject;

    let status = course.completed ? "Passed" : "Current Course";

    modalContent.innerHTML = `
        <h4>${course.title}<h4/>
        <p><strong>Credits: </strong> <span>${course.credits}</span></p>
        <p><strong>Certifacte: </strong> <span>${course.certificate}</span></p>
        <p><strong>Status: </strong> <span>${status}</span></p>
        <p><strong>Description: <strong></p>
        <p>${course.description}</p>
        <p><strong>Technologies: </strong> ${course.technology.join(", ")}</p>
    ` 
    modal.showModal();
}

AllCourses.addEventListener("click",()=>{
    UpdateSelected("all-courses")
    RenderList(courses);
})

CSECourses.addEventListener("click",()=>{
    UpdateSelected("cse-courses");
    RenderList(FilterList("CSE"));
})

WDDCourses.addEventListener("click",()=>{
    UpdateSelected("wdd-courses");
    RenderList(FilterList("WDD"));
});


//Run this when document has been rendered
document.getElementById("all-courses").classList.add("active");
RenderList(courses)
coursesContainer.addEventListener("click",showClassDetails)
closeModal.addEventListener("click",()=> { modal.close() });