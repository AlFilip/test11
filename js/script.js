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

const deadline = "2021-05-20",
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

// menu cards

class MenuCard {
    constructor(src, alt, title, description, price, parentSelector, ...classes) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.description = description;
        this.price = price;
        this.parent = document.querySelector(parentSelector);
        this.classes = classes;
        this.transfer = 27;
        this.changeToUACH();
    }

    changeToUACH() {
        this.price *= this.transfer;
    }

    render() {
        const element = document.createElement("div");
        if (this.classes.length === 0) {
            this.classes.push("menu__item");
        }
        this.classes.forEach(classList => element.classList.add(classList));
        element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}"</h3>
            <div class="menu__item-descr">${this.description}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>`;
        this.parent.append(element);
    }
}

const getResourses = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Couldn't fetch ${url}, status ${res.status}`);
    }
    return await res.json();
};

// getResourses("http://localhost:3000/menu")
//     .then(data => {
//         data.forEach(({
//             img,
//             altimg,
//             title,
//             descr,
//             price
//         }) => {
//             new MenuCard(img, altimg, title, descr, price, '.menu .container')
//                 .render();
//         });
//     });

// getResourses("http://localhost:3000/menu")
//     .then(data => createCard(data));


// function createCard(data) {
//     data.forEach(({
//         img,
//         altimg,
//         title,
//         descr,
//         price
//     }) => {
//         const element = document.createElement("div");
//         element.classList.add("menu__item");

//         element.innerHTML = `
//             <img src=${img} alt=${altimg}>
//             <h3 class="menu__item-subtitle">${title}"</h3>
//             <div class="menu__item-descr">${descr}</div>
//             <div class="menu__item-divider"></div>
//             <div class="menu__item-price">
//                 <div class="menu__item-cost">Цена:</div>
//                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
//             </div>`;
//         document.querySelector(".menu .container").append(element);
//     });
// }

axios.get("http://localhost:3000/menu")
    .then(data => {
        data.data.forEach(({
            img,
            altimg,
            title,
            descr,
            price
        }) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container')
                .render();
        });
    });

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

        // const object = {};
        // formData.forEach((value, key) => object[key] = value);


        // fetch("server.php", {
        //         method: "POST",
        //         headers: {
        //             "Content-type": "application/json"
        //         },
        //         // body: formData
        //         body: JSON.stringify(object)})
        postData("http://localhost:3000/requests", json)
            .then(data => {
                console.log(data);
                showthanksModal(message.sucsess);
            }).catch(() => showthanksModal(message.failure)).finally(() => {
                statusMessage.remove();
                form.reset();
            });
    });
}



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

// Slider 

const slides = document.querySelectorAll(".offer__slide"),
    numOfslides = slides.length,
    sliderPrev = document.querySelector(".offer__slider-prev"),
    sliderNext = document.querySelector(".offer__slider-next"),
    current = document.querySelector("#current"),
    total = document.querySelector("#total"),
    sliderWrapper = document.querySelector(".offer__slider-wrapper"),
    sliderInner = document.querySelector(".offer__slider-inner"),
    wrapperWidth = window.getComputedStyle(sliderWrapper).width,
    slider = document.querySelector(".offer__slider");


let offset = 0,
    currentSlider = 1;

total.innerHTML = getZero(numOfslides);
changeCurent();

sliderInner.style.width = 100 * numOfslides + "%";
sliderInner.style.display = "flex";
sliderInner.style.transition = "0.5s all";
sliderWrapper.style.overflow = "hidden";
slides.forEach(slide => {
    slide.style.width = wrapperWidth;
});

function moveSlider() {
    sliderInner.style.transform = `translateX(-${offset}px)`;
    changeCurent();
    changeActiveDot();
}

function changeCurent() {
    currentSlider = offset / parseInt(wrapperWidth) + 1;
    current.innerHTML = getZero(currentSlider);
}
sliderNext.addEventListener("click", () => {
    if (offset == parseInt(wrapperWidth) * (numOfslides - 1)) {
        offset = 0;
    } else {
        offset += parseInt(wrapperWidth);
    }
    moveSlider();
});

sliderPrev.addEventListener("click", () => {
    if (offset == 0) {
        offset = parseInt(wrapperWidth) * (numOfslides - 1);
    } else {
        offset -= parseInt(wrapperWidth);
    }
    moveSlider();
});

slider.style.position = "relative";
const dots = document.createElement("ol");
dots.classList.add("carousel-indicators");
slider.append(dots);

function changeActiveDot() {
    document.querySelector(".active__dot").classList.toggle("active__dot");
    document.querySelector(`#dot__${currentSlider}`).classList.add("active__dot");
}

for (let i = 0; i < numOfslides; i++) {
    const dot = document.createElement("li");
    dot.classList.add("dot");
    dot.setAttribute("id", `dot__${i + 1}`);
    if (i + 1 === currentSlider) {
        dot.classList.add("active__dot");
    }
    dots.append(dot);
}
dots.addEventListener("click", e => {
    let classes = e.target.classList;
    if (classes.contains("dot") && !classes.contains("active__dot")) {
        const atr = e.target.getAttribute("id"),
            id = +atr.slice(atr.length - 1);        
        offset = (id - 1) * parseInt(wrapperWidth);
        moveSlider();
    }
});