const BODY = document.body;
const BODY_DIV = document.createElement("div");
BODY_DIV.setAttribute("class", "component ms-motion-slideUpIn");
BODY.appendChild(BODY_DIV);
/*
 * ------------------------- close -------------------------
 */
const CLOSE_DIV = document.createElement("div");
CLOSE_DIV.setAttribute("class", "component__inner component__container-end");
BODY_DIV.appendChild(CLOSE_DIV);
const CLOSE_BUTTON = document.createElement("button");
CLOSE_BUTTON.setAttribute("class", "button button--standard-icon close__button-close");
CLOSE_BUTTON.setAttribute("type", "button");
CLOSE_DIV.appendChild(CLOSE_BUTTON);
/*
 * ------------------------- search -------------------------
 */
const SEARCH_DIV_0 = document.createElement("div");
SEARCH_DIV_0.setAttribute("class", "component__inner search");
BODY_DIV.appendChild(SEARCH_DIV_0);
const SEARCH_DIV_1 = document.createElement("div");
SEARCH_DIV_1.setAttribute("class", "component__container-row");
SEARCH_DIV_0.appendChild(SEARCH_DIV_1);
const SEARCH_DIV_2 = document.createElement("div");
SEARCH_DIV_2.setAttribute("class", "component__container-col");
SEARCH_DIV_1.appendChild(SEARCH_DIV_2);
const SEARCH_DIV_3 = document.createElement("div");
SEARCH_DIV_3.setAttribute("class", "component__input-group");
SEARCH_DIV_2.appendChild(SEARCH_DIV_3);
const SEARCH_SPAN = document.createElement("span");
SEARCH_SPAN.setAttribute("class", "component__input-group-text");
SEARCH_DIV_3.appendChild(SEARCH_SPAN);
const SEARCH_SPAN_TN = document.createTextNode("src");
SEARCH_SPAN.appendChild(SEARCH_SPAN_TN);
// select
const SEARCH_SELECT = document.createElement("select");
SEARCH_SELECT.setAttribute("class", "component__select");
SEARCH_DIV_3.appendChild(SEARCH_SELECT);
const SEARCH_OPTION_0 = document.createElement("option");
SEARCH_OPTION_0.setAttribute("value", "contains");
SEARCH_SELECT.appendChild(SEARCH_OPTION_0);
const SEARCH_OPTION_0_TN = document.createTextNode("contains");
SEARCH_OPTION_0.appendChild(SEARCH_OPTION_0_TN);
const SEARCH_OPTION_1 = document.createElement("option");
SEARCH_OPTION_1.setAttribute("value", "not_contains");
SEARCH_SELECT.appendChild(SEARCH_OPTION_1);
const SEARCH_OPTION_1_TN = document.createTextNode("not contains");
SEARCH_OPTION_1.appendChild(SEARCH_OPTION_1_TN);
const SEARCH_DIV_4 = document.createElement("div");
SEARCH_DIV_4.setAttribute("class", "component__container-col");
SEARCH_DIV_1.appendChild(SEARCH_DIV_4);
// input
const SEARCH_INPUT = document.createElement("input");
SEARCH_INPUT.setAttribute("class", "component__input");
SEARCH_INPUT.setAttribute("type", "text");
SEARCH_INPUT.setAttribute("placeholder", "/pl");
SEARCH_DIV_4.appendChild(SEARCH_INPUT);
/*
 * ------------------------- content -------------------------
 */
const CONTENT_DIV_0 = document.createElement("div");
CONTENT_DIV_0.setAttribute("class", "component__inner content");
BODY_DIV.appendChild(CONTENT_DIV_0);
const CONTENT_DIV_1 = document.createElement("div");
CONTENT_DIV_1.setAttribute("class", "content__container");
CONTENT_DIV_0.appendChild(CONTENT_DIV_1);
const IMGS = document.querySelectorAll("img");
let i = 0;
if (IMGS !== null) {
    for (let img of Array.from(IMGS)) {
        const CONTENT_DIV_2 = document.createElement("div");
        CONTENT_DIV_2.setAttribute("class", "content__container-column");
        CONTENT_DIV_1.appendChild(CONTENT_DIV_2);
        const CONTENT_SPAN_0 = document.createElement("span");
        CONTENT_SPAN_0.setAttribute("class", "content__title");
        CONTENT_DIV_2.appendChild(CONTENT_SPAN_0);
        const CONTENT_SPAN_0_TN = document.createTextNode("img " + i);
        CONTENT_SPAN_0.appendChild(CONTENT_SPAN_0_TN);
        i++;
        const CONTENT_SPAN_1 = document.createElement("span");
        CONTENT_SPAN_1.setAttribute("class", "content__subtitle-src");
        CONTENT_DIV_2.appendChild(CONTENT_SPAN_1);
        const CONTENT_SPAN_1_TN = document.createTextNode("src: " + img.src);
        CONTENT_SPAN_1.appendChild(CONTENT_SPAN_1_TN);
        const CONTENT_SPAN_2 = document.createElement("span");
        CONTENT_SPAN_2.setAttribute("class", "content__subtitle-alt");
        CONTENT_DIV_2.appendChild(CONTENT_SPAN_2);
        const CONTENT_SPAN_2_TN = document.createTextNode("alt: " + img.alt);
        CONTENT_SPAN_2.appendChild(CONTENT_SPAN_2_TN);
    }
}
// ms-motion-slideUpIn animation
BODY.appendChild(BODY_DIV);
CLOSE_BUTTON.addEventListener("click", () => {
    BODY_DIV.classList.remove("ms-motion-slideUpIn");
    BODY_DIV.classList.add("ms-motion-slideDownOut");
    // ms-motion-slideDownOut animation
    setTimeout(() => {
        BODY.removeChild(BODY_DIV);
        location.reload();
    }, 100);
});
const setFilters = () => {
    const DIVS = CONTENT_DIV_0.querySelectorAll("div");
    for (let div of Array.from(DIVS)) {
        const SPAN_TC = div.children[1].textContent;
        if (SEARCH_SELECT.options[SEARCH_SELECT.selectedIndex].value === "contains") {
            if (SPAN_TC.indexOf(SEARCH_INPUT.value) !== -1) {
                div.classList.remove("d-none");
                div.classList.add("d-flex");
            }
            else {
                div.classList.remove("d-flex");
                div.classList.add("d-none");
            }
        }
        else {
            if (SPAN_TC.indexOf(SEARCH_INPUT.value) === -1) {
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
SEARCH_SELECT.addEventListener("change", () => {
    setFilters();
});
SEARCH_INPUT.addEventListener("keyup", () => {
    setFilters();
});
