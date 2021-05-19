import {
    hideModal,
    showModal
} from "./modal";

import {
    postData
} from "../services/services";


function forms(formSelector, modalTimerId) {
    // Forms
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: "img/054 spinner.svg",
        sucsess: "Спасибо! Мы с вами свяжемся.",
        failure: "Что то пошло не так."
    };

    forms.forEach(item => bindPostData(item));

    function showthanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog'),
            modal = document.querySelector("div.modal");
        prevModalDialog.classList.add("hide");
        showModal("div.modal", modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `<div class="modal__content">
                    <div data-modalClose class="modal__close">&times;</div>
                    <div class="modal__title">${message}</div>
                </div>`;
        modal.append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.remove("hide");
            hideModal("div.modal");
        }, 4000);
    }

    function bindPostData(form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const statusMessage = document.createElement("img");
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            margin: 0 auto;
            display: block;
        `;

            form.insertAdjacentElement("afterend", statusMessage);

            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData("http://localhost:3000/requests", json)
                .then(data => {
                    showthanksModal(message.sucsess);
                })
                .catch(() => showthanksModal(message.failure))
                .finally(() => {
                    statusMessage.remove();
                    form.reset();
                });
        });
    }
}


export default forms;