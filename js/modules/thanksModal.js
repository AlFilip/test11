function thanksModal() {
    // ThanksModal

    function showthanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add("hide");
        showModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
    <div class="modal__content">
        <div data-modalClose class="modal__close">&times;</div>
        <div class="modal__title">${message}</div>
    </div>
    `;
        modal.append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.remove("hide");
            hideModal();
        }, 4000);
    }
}

module.exports = thanksModal;