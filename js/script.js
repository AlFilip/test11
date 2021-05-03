// Tabs
const tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParent = document.querySelector(".tabheader__items");

function hideTabContent() {
    tabsContent.forEach(item => {
        item.classList.add("hide");
        item.classList.remove("show", "fade");
    });
    tabs.forEach(item => {
        if (item.classList.contains("tabheader__item_active")) {
            item.classList.remove("tabheader__item_active");
        }
    });
}

function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
}

tabsParent.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("tabheader__item") &&
        !e.target.classList.contains("tabheader__item_active")) {
        tabs.forEach((item, i) => {
            if (e.target === item) {
                hideTabContent();
                showTabContent(i);
            }
        });
    }
});

hideTabContent();
showTabContent();

// Timer

const deadline = "2021-05-05",
    timer = ".timer";

function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
        days = Math.floor(t / (1000 * 60 * 60 * 24)),
        hours = Math.floor(t / (1000 * 60 * 60) % 24),
        minutes = Math.floor((t / 1000 / 60) % 60),
        seconds = Math.floor((t / 1000) % 60);
    return {
        "total": t,
        "days": days,
        "hours": hours,
        "minutes": minutes,
        "seconds": seconds
    };
}

function getZero(num) {
    if (num < 10) {
        num = "0" + num;
    }
    return num;
}

function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
        days = timer.querySelector("#days"),
        hours = timer.querySelector("#hours"),
        minutes = timer.querySelector("#minutes"),
        seconds = timer.querySelector("#seconds"),
        timeInterval = setInterval(updateClock, 1000);
    updateClock();

    function updateClock() {
        const t = getTimeRemaining(endtime);
        days.innerHTML = getZero(t.days),
            hours.innerHTML = getZero(t.hours),
            minutes.innerHTML = getZero(t.minutes),
            seconds.innerHTML = getZero(t.seconds);
        if (t.total <= 0) {
            clearInterval(timeInterval);
        }
    }
}

setClock(timer, deadline);

// Modal

const modalButtons = document.querySelectorAll("button[data-modal]"),
    modal = document.querySelector("div.modal"),
    modalClose = document.querySelector("div[data-modalClose]"),
    modalTimerId = setTimeout(showModal, 20000);


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

modalClose.addEventListener("click", hideModal);

modal.addEventListener("click", (event) => {
    if (event.target.classList.value === "modal show") {
        hideModal();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("show")) {
        hideModal();
    }
});

window.addEventListener("scroll", showModalByScroll);