function modal() {
    // Modal

    const modalButtons = document.querySelectorAll("button[data-modal]"),
        modal = document.querySelector("div.modal");
    modalTimerId = setTimeout(showModal, 50000);


    function hideModal() {
        modal.classList.add("hide");
        modal.classList.remove("show");
        document.body.style.overflow = "";
    }

    function showModal() {
        modal.classList.add("show");
        modal.classList.remove("hide");
        document.body.style.overflow = "hidden";
        clearInterval(modalTimerId);
    }

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight) {
            showModal();
            window.removeEventListener("scroll", showModalByScroll);
        }
    }

    modalButtons.forEach(button => {
        button.addEventListener("click", () => {
            showModal();
        });
    });


    modal.addEventListener("click", (event) => {
        if (event.target === modal || event.target.getAttribute("data-modalClose") == "") {
            hideModal();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.classList.contains("show")) {
            hideModal();
        }
    });

    window.addEventListener("scroll", showModalByScroll);
}

module.exports = modal;
