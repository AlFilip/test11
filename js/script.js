import calc from "./modules/calc";
import cards from "./modules/cards";
import forms from "./modules/forms";
import modal from "./modules/modal";
import slider from "./modules/slider";
import tabs from "./modules/tabs";
import timer from "./modules/timer";


window.addEventListener("DOMContentLoaded", () => {
    const modalTimerId = setTimeout(() => showModal("div.modal", modalTimerId), 50000);

    const deadline = "2021-05-20";

    calc();
    cards();
    forms("form", modalTimerId);
    modal("div.modal", "button[data-modal]", modalTimerId);
    slider({
        slidesSelectors: ".offer__slide", 
        prevSelector: ".offer__slider-prev",
        nextSelector: ".offer__slider-next",
        curentCountSelector: "#current", 
        totalCountSelector: "#total",
        wrapperSelector: ".offer__slider-wrapper",
        innerSelector: ".offer__slider-inner",
        sliderSelector: ".offer__slider"
    });
    tabs({
        tabsSelector:".tabheader__item",
        tabsContentSelector: ".tabcontent",
        tabsParentSelector: ".tabheader__items",
        activeTabSelector: "tabheader__item_active"
    });
    timer(deadline, ".timer");
});