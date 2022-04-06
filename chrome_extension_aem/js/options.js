const BLOCK2__SELECT_THEME = document.querySelector("#block2__select_theme");
const BLOCK3__BUTTON_SHORTCUTS = document.querySelector("#block3__button_shortcuts");
const BLOCK4__SPAN_AEM1 = document.querySelector("#block4__span_aem1");
const BLOCK4__INPUT_AEM1 = document.querySelector("#block4__input_aem1");
const BLOCK4__SPAN_AEM2 = document.querySelector("#block4__span_aem2");
const BLOCK4__INPUT_AEM2 = document.querySelector("#block4__input_aem2");
const BLOCK4__SPAN_AEM_CAPITALIZATION = document.querySelector("#block4__span_capitalization");
const BLOCK4__INPUT_AEM_CAPITALIZATION = document.querySelector("#block4__input_capitalization");
const BLOCK5__INPUT_LOGIN_P5 = document.querySelector("#block5__input_login_p5");
const BLOCK5__INPUT_LOGIN_P6 = document.querySelector("#block5__input_login_p6");
// @ts-ignore
const setLight = () => {
    document.documentElement.classList.add("light");
};
// @ts-ignore
const setDark = () => {
    document.documentElement.classList.add("dark");
};
// on popup ...
chrome.storage.local.get(["user_id", "user_email", "is_block2_visible", "is_block3_visible", "is_block4_visible", "selected_theme"], ({ user_id, user_email, is_block2_visible, is_block3_visible, is_block4_visible, selected_theme }) => {
    for (let option of Array.from(BLOCK2__SELECT_THEME.options)) {
        if (option.value === selected_theme) {
            option.selected = true;
        }
    }
    if (is_block2_visible === true) {
        BLOCK4__SPAN_AEM1.textContent = "On";
        BLOCK4__INPUT_AEM1.setAttribute("checked", "");
    }
    if (is_block3_visible === true) {
        BLOCK4__SPAN_AEM2.textContent = "On";
        BLOCK4__INPUT_AEM2.setAttribute("checked", "");
    }
    if (is_block4_visible === true) {
        BLOCK4__SPAN_AEM_CAPITALIZATION.textContent = "On";
        BLOCK4__INPUT_AEM_CAPITALIZATION.setAttribute("checked", "");
    }
    BLOCK5__INPUT_LOGIN_P5.value = user_id;
    BLOCK5__INPUT_LOGIN_P6.value = user_email;
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
 * ------------------------- block2 -------------------------
 */
// set "selected_theme" var
BLOCK2__SELECT_THEME.addEventListener("change", () => {
    chrome.storage.local.set({ selected_theme: BLOCK2__SELECT_THEME.selectedOptions[0].value });
    location.reload();
});
/*
 * ------------------------- block3 -------------------------
 */
BLOCK3__BUTTON_SHORTCUTS.addEventListener("click", () => {
    chrome.tabs.create({ url: "chrome://extensions/shortcuts" });
});
/*
 * ------------------------- block4 -------------------------
 */
// set "is_block2_visible" var
BLOCK4__INPUT_AEM1.addEventListener("click", (e) => {
    if (e.target.hasAttribute("checked")) {
        chrome.storage.local.set({ is_block2_visible: false });
        BLOCK4__SPAN_AEM1.textContent = "Off";
        BLOCK4__INPUT_AEM1.removeAttribute("checked");
    }
    else {
        chrome.storage.local.set({ is_block2_visible: true });
        BLOCK4__SPAN_AEM1.textContent = "On";
        BLOCK4__INPUT_AEM1.setAttribute("checked", "");
    }
});
// set "is_block3_visible" var
BLOCK4__INPUT_AEM2.addEventListener("click", (e) => {
    if (e.target.hasAttribute("checked")) {
        chrome.storage.local.set({ is_block3_visible: false });
        BLOCK4__SPAN_AEM2.textContent = "Off";
        BLOCK4__INPUT_AEM2.removeAttribute("checked");
    }
    else {
        chrome.storage.local.set({ is_block3_visible: true });
        BLOCK4__SPAN_AEM2.textContent = "On";
        BLOCK4__INPUT_AEM2.setAttribute("checked", "");
    }
});
// set "is_block4_visible" var
BLOCK4__INPUT_AEM_CAPITALIZATION.addEventListener("click", (e) => {
    if (e.target.hasAttribute("checked")) {
        chrome.storage.local.set({ is_block4_visible: false });
        BLOCK4__SPAN_AEM_CAPITALIZATION.textContent = "Off";
        BLOCK4__INPUT_AEM_CAPITALIZATION.removeAttribute("checked");
    }
    else {
        chrome.storage.local.set({ is_block4_visible: true });
        BLOCK4__SPAN_AEM_CAPITALIZATION.textContent = "On";
        BLOCK4__INPUT_AEM_CAPITALIZATION.setAttribute("checked", "");
    }
});
/*
 * ------------------------- block5, samsung -------------------------
 */
// set "user_id" var
document.querySelector("#block5__button_save_p5").addEventListener("click", () => {
    chrome.storage.local.set({ user_id: BLOCK5__INPUT_LOGIN_P5.value });
});
// set "user_email" var
document.querySelector("#block5__button_save_p6").addEventListener("click", () => {
    chrome.storage.local.set({ user_email: BLOCK5__INPUT_LOGIN_P6.value });
});
// ------------------------- tooltips -------------------------
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    // @ts-ignore
    return new bootstrap.Tooltip(tooltipTriggerEl);
});
