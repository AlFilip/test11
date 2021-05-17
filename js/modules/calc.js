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

module.exports = calc;