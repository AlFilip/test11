function forms() {
    // Forms

    const forms = document.querySelectorAll("form");

    const message = {
        loading: "img/054 spinner.svg",
        sucsess: "Спасибо! Мы с вами свяжемся.",
        failure: "Что то пошло не так."
    };

    forms.forEach(item => bindPostData(item));

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: data
        });
        return await res.json();
    };

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

module.exports = forms;