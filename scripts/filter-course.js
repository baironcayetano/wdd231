import {courses} from "./course-list.js";

const coursesContainer = document.querySelector("#courses");
const AllCourses = document.querySelector("#all-courses");
const CSECourses = document.querySelector("#cse-courses");
const WDDCourses = document.querySelector("#wdd-courses");


function FilterList(subject){
    return courses.filter(course => course.subject === subject)
}

function RenderList(list){
    let credits = list.reduce((i,course)=> {
        return i+course.credits 
    },0);

    let content = "";
    let status = "completed";
    list.forEach(course => {
        if(course.title === "Frontend Web Development I"){
            status = "current-course";
        }
        content += `<li>${course.title} <span class="class-status ${status}">(${status})</span></li>`;
    });

    coursesContainer.innerHTML = content;
    document.getElementById("credits").innerText = `${credits}`;
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
