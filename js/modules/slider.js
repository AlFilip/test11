function slider() {
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

    const strToNumber = (str) => +str.replace(/\D/g, "");

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
        currentSlider = offset / strToNumber(wrapperWidth) + 1;
        current.innerHTML = getZero(currentSlider);
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

module.exports = slider;