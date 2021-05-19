function hideModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
}

function showModal(modalSelector, modalTimerId) {    
    const modal = document.querySelector(modalSelector);
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerId);
}

function modal(modalSelector, trigger, modalTimerId) {
    // Modal
    const modalButtons = document.querySelectorAll(trigger),
        modal = document.querySelector(modalSelector);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight) {
            showModal(modalSelector, modalTimerId);
            window.removeEventListener("scroll", showModalByScroll);
        }
    }

    modalButtons.forEach(button => {
        button.addEventListener("click", () => {
            showModal(modalSelector, modalTimerId);
        });
    });


    modal.addEventListener("click", (event) => {
        if (event.target === modal || event.target.getAttribute("data-modalClose") == "") {
            hideModal(modalSelector);
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.classList.contains("show")) {
            hideModal(modalSelector);
        }
    });

    window.addEventListener("scroll", showModalByScroll);

}


export default modal;
export {
    hideModal,
    showModal
};