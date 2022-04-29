const BODY = document.body;
const BODY_DIV = document.createElement("div");
BODY_DIV.setAttribute("class", "surface-base surface-base__images ms-motion-slideUpIn");
BODY.appendChild(BODY_DIV);
/*
 * ------------------------- close -------------------------
 */
const CLOSE_DIV = document.createElement("div");
CLOSE_DIV.setAttribute("class", "surface-layer surface-layer__images container-end");
BODY_DIV.appendChild(CLOSE_DIV);
const CLOSE_BUTTON = document.createElement("button");
CLOSE_BUTTON.setAttribute("class", "button button--standard-icon close__button-close");
CLOSE_BUTTON.setAttribute("type", "button");
CLOSE_DIV.appendChild(CLOSE_BUTTON);
/*
 * ------------------------- search -------------------------
 */
const SEARCH_DIV_0 = document.createElement("div");
SEARCH_DIV_0.setAttribute("class", "surface-layer surface-layer__images search");
BODY_DIV.appendChild(SEARCH_DIV_0);
const SEARCH_DIV_1 = document.createElement("div");
SEARCH_DIV_1.setAttribute("class", "search__container");
SEARCH_DIV_0.appendChild(SEARCH_DIV_1);
const SEARCH_DIV_2 = document.createElement("div");
SEARCH_DIV_2.setAttribute("class", "input-group");
SEARCH_DIV_1.appendChild(SEARCH_DIV_2);
const SEARCH_SPAN = document.createElement("span");
SEARCH_SPAN.setAttribute("class", "input-group-text");
SEARCH_DIV_2.appendChild(SEARCH_SPAN);
const SEARCH_SPAN_TN = document.createTextNode("src");
SEARCH_SPAN.appendChild(SEARCH_SPAN_TN);
// select
const SEARCH_SELECT = document.createElement("select");
SEARCH_SELECT.setAttribute("class", "dropdown");
SEARCH_DIV_2.appendChild(SEARCH_SELECT);
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
// input
const SEARCH_INPUT = document.createElement("input");
SEARCH_INPUT.setAttribute("class", "text-box search__text-box");
SEARCH_INPUT.setAttribute("type", "text");
SEARCH_INPUT.setAttribute("placeholder", "/pl");
SEARCH_DIV_1.appendChild(SEARCH_INPUT);
/*
 * ------------------------- content -------------------------
 */
const CONTENT_DIV_0 = document.createElement("div");
CONTENT_DIV_0.setAttribute("class", "surface-layer surface-layer__images content");
BODY_DIV.appendChild(CONTENT_DIV_0);
const CONTENT_DIV_1 = document.createElement("div");
CONTENT_DIV_1.setAttribute("class", "content__container");
CONTENT_DIV_0.appendChild(CONTENT_DIV_1);
const IMGS = document.querySelectorAll("img");
let i = 0;
if (IMGS !== null) {
    for (let img of Array.from(IMGS)) {
        img.setAttribute("id", "img_" + i);
        const CONTENT_DIV_2 = document.createElement("div");
        CONTENT_DIV_2.setAttribute("class", "content__container-inner");
        CONTENT_DIV_1.appendChild(CONTENT_DIV_2);
        const CONTENT_A = document.createElement("a");
        CONTENT_A.setAttribute("class", "content__body");
        CONTENT_A.setAttribute("href", "#img_" + i);
        CONTENT_DIV_2.appendChild(CONTENT_A);
        const CONTENT_A_TN = document.createTextNode("img " + i);
        CONTENT_A.appendChild(CONTENT_A_TN);
        i++;
        const CONTENT_SPAN_0 = document.createElement("span");
        CONTENT_SPAN_0.setAttribute("class", "content__caption");
        CONTENT_DIV_2.appendChild(CONTENT_SPAN_0);
        const CONTENT_SPAN_0_TN = document.createTextNode("src: " + img.src);
        CONTENT_SPAN_0.appendChild(CONTENT_SPAN_0_TN);
        const CONTENT_SPAN_1 = document.createElement("span");
        CONTENT_SPAN_1.setAttribute("class", "content__caption");
        CONTENT_DIV_2.appendChild(CONTENT_SPAN_1);
        const CONTENT_SPAN_1_TN = document.createTextNode("alt: " + img.alt);
        CONTENT_SPAN_1.appendChild(CONTENT_SPAN_1_TN);
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
    const DIVS = CONTENT_DIV_1.querySelectorAll("div");
    for (let div of Array.from(DIVS)) {
        const SPAN_TC = div.children[1].textContent;
        if (SEARCH_SELECT.options[SEARCH_SELECT.selectedIndex].value === "contains") {
            if (SPAN_TC.indexOf(SEARCH_INPUT.value) !== -1) {
                div.style.display = "flex";
            }
            else {
                div.style.display = "none";
            }
        }
        else {
            if (SPAN_TC.indexOf(SEARCH_INPUT.value) === -1) {
                div.style.display = "flex";
            }
            else {
                div.style.display = "none";
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
const ANCHORS = CONTENT_DIV_1.querySelectorAll("a");
for (let anchor of Array.from(ANCHORS)) {
    anchor.addEventListener("click", () => {
        for (let img of Array.from(IMGS)) {
            let href = anchor.href;
            href = href.slice(href.length - img.id.length);
            if (href === img.id) {
                img.classList.add("focus");
            }
        }
    });
}
