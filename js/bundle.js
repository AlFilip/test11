/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    // Calc
    const result = document.querySelector(".calculating__result span");

    let sex, height, weight, age, ratio;

    if (localStorage.getItem("sex")) {
        sex = localStorage.getItem("sex");
    } else {
        sex = "female";
        localStorage.getItem("sex", sex);
    }

    if (localStorage.getItem("ratio")) {
        sex = localStorage.getItem("ratio");
    } else {
        ratio = 1.375;
        localStorage.getItem("ratio", ratio);
    }

    function setLocalSettings(selector, activeClass = "calculating__choose-item_active") {
        const elements = document.querySelectorAll(selector);
        elements.forEach(item => {
            if (item.classList.contains(activeClass)) {
                item.classList.remove(activeClass);
            }
            if (item.hasAttribute("data-ratio")) {
                if (localStorage.ratio == item.getAttribute("data-ratio")) {
                    ratio = +localStorage.ratio;
                    item.classList.add(activeClass);
                }
            } else {
                if (localStorage.sex == item.getAttribute("id")) {
                    sex = localStorage.sex;
                    item.classList.add(activeClass);
                }
            }
        });
    }

    setLocalSettings("#gender div");
    setLocalSettings(".calculating__choose_big div");


    function calcResult() {
        if (sex && height && weight && age && ratio) {
            if (sex === "female") {
                result.innerHTML = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio);
            } else {
                result.innerHTML = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio);
            }
        } else {
            result.innerHTML = "____";
        }
    }
    calcResult();

    function getStaticInfo(selector, activeClass = "calculating__choose-item_active") {
        const elements = document.querySelectorAll(selector);
        elements.forEach(item => {
            item.addEventListener("click", (e) => {
                if (e.target.getAttribute("data-ratio")) {
                    ratio = +e.target.getAttribute("data-ratio");
                    localStorage.setItem("ratio", ratio);
                    changeActButton(elements, e.target, activeClass);
                } else {
                    sex = e.target.id;
                    localStorage.setItem("sex", sex);
                    changeActButton(elements, e.target, activeClass);
                }
                calcResult();
            });
        });
    }

    function changeActButton(elements, target, activeClass) {
        elements.forEach(item => item.classList.remove(activeClass));
        target.classList.add(activeClass);
    }

    getStaticInfo(".calculating__choose_big div");
    getStaticInfo("#gender div");

    function getDinamicInfo(selector) {
        const input = document.querySelector(selector);
        input.addEventListener("input", () => {
            if (input.value.match(/\D/)) {
                input.style.boxShadow = "0 4px 15px rgb(255 0 0 / .6)";
            } else input.removeAttribute('style');

            switch (input.id) {
                case "height":
                    height = +input.value;
                    localStorage.setItem("height", height);
                    break;
                case "weight":
                    weight = +input.value;
                    localStorage.setItem("weight", weight);
                    break;
                case "age":
                    age = +input.value;
                    localStorage.setItem("age", age);
                    break;
            }
            calcResult();
        });
    }
    getDinamicInfo("#height");
    getDinamicInfo("#weight");
    getDinamicInfo("#age");
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cards() {
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
                <div class="menu__item-cost">????????:</div>
                <div class="menu__item-total"><span>${this.price}</span> ??????/????????</div>
            </div>`;
            this.parent.append(element);
        }
    }

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
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");





function forms(formSelector, modalTimerId) {
    // Forms
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: "img/054 spinner.svg",
        sucsess: "??????????????! ???? ?? ???????? ????????????????.",
        failure: "?????? ???? ?????????? ???? ??????."
    };

    forms.forEach(item => bindPostData(item));

    function showthanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog'),
            modal = document.querySelector("div.modal");
        prevModalDialog.classList.add("hide");
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showModal)("div.modal", modalTimerId);

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
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.hideModal)("div.modal");
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

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)("http://localhost:3000/requests", json)
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


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "hideModal": () => (/* binding */ hideModal),
/* harmony export */   "showModal": () => (/* binding */ showModal)
/* harmony export */ });
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


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer */ "./js/modules/timer.js");


function slider({
    slidesSelectors,
    prevSelector,
    nextSelector,
    curentCountSelector,
    totalCountSelector,
    wrapperSelector,
    innerSelector,
    sliderSelector
}) {
    // Slider 
    const slides = document.querySelectorAll(slidesSelectors),
        numOfslides = slides.length,
        sliderPrev = document.querySelector(prevSelector),
        sliderNext = document.querySelector(nextSelector),
        current = document.querySelector(curentCountSelector),
        total = document.querySelector(totalCountSelector),
        sliderWrapper = document.querySelector(wrapperSelector),
        sliderInner = document.querySelector(innerSelector),
        wrapperWidth = window.getComputedStyle(sliderWrapper).width,
        slider = document.querySelector(sliderSelector);

    const strToNumber = (str) => +str.replace(/\D/g, "");

    let offset = 0,
        currentSlider = 1;

    total.innerHTML = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(numOfslides);
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
        currentSlider = offset / strToNumber(wrapperWidth) + 1;
        current.innerHTML = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(currentSlider);
    }

    sliderNext.addEventListener("click", () => {
        if (offset === strToNumber(wrapperWidth) * (numOfslides - 1)) {
            offset = 0;
        } else {
            offset += strToNumber(wrapperWidth);
        }
        moveSlider();
    });

    sliderPrev.addEventListener("click", () => {
        if (offset === 0) {
            offset = strToNumber(wrapperWidth) * (numOfslides - 1);
        } else {
            offset -= strToNumber(wrapperWidth);
        }
        moveSlider();
    });

    slider.style.position = "relative";
    const dots = document.createElement("ol");
    dots.classList.add("carousel-indicators");
    slider.append(dots);

    function changeActiveDot() {
        document.querySelector(".active__dot").classList.remove("active__dot");
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
                id = strToNumber(atr);
            offset = (id - 1) * strToNumber(wrapperWidth);
            moveSlider();
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs({tabsSelector, tabsContentSelector, tabsParentSelector, activeTabSelector}) {
    // Tabs
    try {
        const tabs = document.querySelectorAll(tabsSelector),
            tabsContent = document.querySelectorAll(tabsContentSelector),
            tabsParent = document.querySelector(tabsParentSelector);

        function hideTabContent() {
            tabsContent.forEach(item => {
                item.classList.add("hide");
                item.classList.remove("show", "fade");
            });
            tabs.forEach(item => {
                if (item.classList.contains(activeTabSelector)) {
                    item.classList.remove(activeTabSelector);
                }
            });
        }

        function showTabContent(i = 0) {
            tabsContent[i].classList.add("show", "fade");
            tabsContent[i].classList.remove("hide");
            tabs[i].classList.add(activeTabSelector);
        }

        tabsParent.addEventListener("click", (e) => {
            if (e.target && e.target.classList.contains(tabsSelector.slice(1)) &&
                !e.target.classList.contains(activeTabSelector)) {
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
    } catch (e) {
        console.log(e);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getZero": () => (/* binding */ getZero)
/* harmony export */ });
function getZero(num) {
    if (num < 10) {
        num = "0" + num;
    }
    return num;
}

function timer(deadline, timerSelector) {
    // Timer
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

    setClock(timerSelector, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
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



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");









window.addEventListener("DOMContentLoaded", () => {
    const modalTimerId = setTimeout(() => showModal("div.modal", modalTimerId), 50000);

    const deadline = "2021-05-20";

    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_0__.default)();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__.default)();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__.default)("form", modalTimerId);
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.default)("div.modal", "button[data-modal]", modalTimerId);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__.default)({
        slidesSelectors: ".offer__slide", 
        prevSelector: ".offer__slider-prev",
        nextSelector: ".offer__slider-next",
        curentCountSelector: "#current", 
        totalCountSelector: "#total",
        wrapperSelector: ".offer__slider-wrapper",
        innerSelector: ".offer__slider-inner",
        sliderSelector: ".offer__slider"
    });
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__.default)({
        tabsSelector:".tabheader__item",
        tabsContentSelector: ".tabcontent",
        tabsParentSelector: ".tabheader__items",
        activeTabSelector: "tabheader__item_active"
    });
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__.default)(deadline, ".timer");
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map