// @ts-ignore
const setLight = () => {
    document.documentElement.classList.add("light");
};
// @ts-ignore
const setDark = () => {
    document.documentElement.classList.add("dark");
};
// on popup ...
chrome.storage.local.get("selected_theme", ({ selected_theme }) => {
    // ------------------------- theme -------------------------
    if (selected_theme === "light") {
        setLight();
    }
    else if (selected_theme === "dark") {
        setDark();
    }
    else {
        const PREFERS_COLOR_SCHEME = window.matchMedia("(prefers-color-scheme: light)");
        if (PREFERS_COLOR_SCHEME.matches) {
            setLight();
        }
        else {
            setDark();
        }
    }
});
/*
 * ------------------------- block1 -------------------------
 */
const BODY = document.body;
const DIV_0 = document.createElement("div");
DIV_0.setAttribute("class", "body__container ms-motion-slideUpIn");
const BUTTON = document.createElement("button");
BUTTON.setAttribute("class", "button-close");
BUTTON.setAttribute("type", "button");
DIV_0.appendChild(BUTTON);
/*
 * ------------------------- block1 -------------------------
 */
const DIV_1 = document.createElement("div");
DIV_1.setAttribute("class", "block1");
DIV_0.appendChild(DIV_1);
const DIV_2 = document.createElement("div");
DIV_2.setAttribute("class", "block1__container1");
DIV_1.appendChild(DIV_2);
const DIV_3 = document.createElement("div");
DIV_3.setAttribute("class", "block1__container2");
DIV_2.appendChild(DIV_3);
const DIV_4 = document.createElement("div");
DIV_4.setAttribute("class", "block1__input-group");
DIV_3.appendChild(DIV_4);
const SPAN = document.createElement("span");
SPAN.setAttribute("class", "block1__title");
DIV_4.appendChild(SPAN);
const SPAN_TN = document.createTextNode("src");
SPAN.appendChild(SPAN_TN);
const SELECT = document.createElement("select");
SELECT.setAttribute("class", "block1__select-contains");
DIV_4.appendChild(SELECT);
const OPTION_0 = document.createElement("option");
OPTION_0.setAttribute("value", "contains");
SELECT.appendChild(OPTION_0);
const OPTION_0_TN = document.createTextNode("contains");
OPTION_0.appendChild(OPTION_0_TN);
const OPTION_1 = document.createElement("option");
OPTION_1.setAttribute("value", "not_contains");
SELECT.appendChild(OPTION_1);
const OPTION_1_TN = document.createTextNode("not contains");
OPTION_1.appendChild(OPTION_1_TN);
const DIV_5 = document.createElement("div");
DIV_5.setAttribute("class", "block1__container3");
DIV_2.appendChild(DIV_5);
const INPUT = document.createElement("input");
INPUT.setAttribute("class", "block1__input-text");
INPUT.setAttribute("type", "text");
INPUT.setAttribute("placeholder", "/pl");
DIV_5.appendChild(INPUT);
/*
 * ------------------------- block2 -------------------------
 */
const DIV_6 = document.createElement("div");
DIV_6.setAttribute("class", "block2");
DIV_0.appendChild(DIV_6);
const DIV_7 = document.createElement("div");
DIV_7.setAttribute("class", "block2__container1");
DIV_6.appendChild(DIV_7);
const IMGS = document.querySelectorAll("img");
let i = 0;
/*
 * ------------------------- block2 -------------------------
 */
if (IMGS !== null) {
    for (let img of Array.from(IMGS)) {
        const DIV = document.createElement("div");
        DIV.setAttribute("class", "block2__container2");
        DIV_7.appendChild(DIV);
        const SPAN_0 = document.createElement("span");
        SPAN_0.setAttribute("class", "block2__title");
        DIV.appendChild(SPAN_0);
        const SPAN_0_TN = document.createTextNode("img " + i);
        SPAN_0.appendChild(SPAN_0_TN);
        i++;
        const SPAN_1 = document.createElement("span");
        SPAN_1.setAttribute("class", "block2__subtitle-src");
        DIV.appendChild(SPAN_1);
        const SPAN_1_TN = document.createTextNode("src: " + img.src);
        SPAN_1.appendChild(SPAN_1_TN);
        const SPAN_2 = document.createElement("span");
        SPAN_2.setAttribute("class", "block2__subtitle-alt");
        DIV.appendChild(SPAN_2);
        const SPAN_2_TN = document.createTextNode("alt: " + img.alt);
        SPAN_2.appendChild(SPAN_2_TN);
    }
}
// ms-motion-slideUpIn animation
BODY.appendChild(DIV_0);
BUTTON.addEventListener("click", () => {
    DIV_0.classList.remove("ms-motion-slideUpIn");
    DIV_0.classList.add("ms-motion-slideDownOut");
    // ms-motion-slideDownOut animation
    setTimeout(() => {
        BODY.removeChild(DIV_0);
        location.reload();
    }, 100);
});
const setFilters = () => {
    const DIVS = DIV_7.querySelectorAll("div");
    for (let div of Array.from(DIVS)) {
        const SPAN_TC = div.children[1].textContent;
        if (SELECT.options[SELECT.selectedIndex].value === "contains") {
            if (SPAN_TC.indexOf(INPUT.value) !== -1) {
                div.classList.remove("d-none");
                div.classList.add("d-flex");
            }
            else {
                div.classList.remove("d-flex");
                div.classList.add("d-none");
            }
        }
        else {
            if (SPAN_TC.indexOf(INPUT.value) === -1) {
                div.classList.remove("d-none");
                div.classList.add("d-flex");
            }
            else {
                div.classList.remove("d-flex");
                div.classList.add("d-none");
            }
        }
    }
};
SELECT.addEventListener("change", () => {
    setFilters();
});
INPUT.addEventListener("keyup", () => {
    setFilters();
});
