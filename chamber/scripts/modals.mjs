export default class Modal{
    constructor(id){
        this.modal = document.getElementById(id);
        document.querySelector("#closeModal")
                .addEventListener("click",()=>this.HideModal());
    }

    ShowModal(){
        this.modal.showModal();
    }

    HideModal(){
        this.modal.close();
    }

    SetTitle(title){
        document.querySelector("#modal-title").textContent = title;
    }

    SetHeaderClass(className, classesToRM){
        let header = document.querySelector(".modal-header");
            header.classList.remove(...classesToRM);
            header.classList.toggle(className);
    }

    InsertHtml(html){
        document.querySelector(".modal-content").innerHTML = html;
    }
}