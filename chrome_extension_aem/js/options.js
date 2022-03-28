const SELECT_THEME = document.querySelector("#select_theme");
const BUTTON_SHORTCUTS = document.querySelector("#button_shortcuts");
const SPAN_VIS_S_AEM = document.querySelector("#span_vis_s_aem");
const INPUT_VIS_S_AEM = document.querySelector("#input_vis_s_aem");
const SPAN_VIS_P_AEM = document.querySelector("#span_vis_p_aem");
const INPUT_VIS_P_AEM = document.querySelector("#input_vis_p_aem");
const SPAN_VIS_UTILITIES = document.querySelector("#span_vis_utilities");
const INPUT_VIS_UTILITIES = document.querySelector("#input_vis_utilities");
const INPUT_S_P5_LOGIN = document.querySelector("#input_s_p5_login");
const INPUT_S_P6_LOGIN = document.querySelector("#input_s_p6_login");
const BUTTON_S_P5_LOGIN_SAVE = document.querySelector("#button_s_p5_login_save");
const BUTTON_S_P6_LOGIN_SAVE = document.querySelector("#button_s_p6_login_save");
const BUTTON_S_P5_LOGIN_RESET = document.querySelector("#button_s_p5_login_reset");
const BUTTON_S_P6_LOGIN_RESET = document.querySelector("#button_s_p6_login_reset");
// @ts-ignore
const setLight = () => {
    document.documentElement.classList.add("light");
};
// @ts-ignore
const setDark = () => {
    document.documentElement.classList.add("dark");
};
// on popup ...
chrome.storage.local.get(["s_p5_login", "s_p6_login", "vis_s_aem", "vis_p_aem", "vis_utilities", "theme"], ({ s_p5_login, s_p6_login, vis_s_aem, vis_p_aem, vis_utilities, theme }) => {
    for (let option of Array.from(SELECT_THEME.options)) {
        if (option.value === theme) {
            option.selected = true;
        }
    }
    if (vis_s_aem === true) {
        SPAN_VIS_S_AEM.textContent = "On";
        INPUT_VIS_S_AEM.setAttribute("checked", "");
    }
    if (vis_p_aem === true) {
        SPAN_VIS_P_AEM.textContent = "On";
        INPUT_VIS_P_AEM.setAttribute("checked", "");
    }
    if (vis_utilities === true) {
        SPAN_VIS_UTILITIES.textContent = "On";
        INPUT_VIS_UTILITIES.setAttribute("checked", "");
    }
    INPUT_S_P5_LOGIN.value = s_p5_login;
    INPUT_S_P6_LOGIN.value = s_p6_login;
    // ------------------------- theme -------------------------
    if (theme === "light") {
        setLight();
    }
    else if (theme === "dark") {
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
 * ------------------------- ... -------------------------
 */
// set "theme" var
SELECT_THEME.addEventListener("change", () => {
    chrome.storage.local.set({ theme: SELECT_THEME.selectedOptions[0].value });
    location.reload();
});
// on popup ...
const setShortcuts = () => {
    const MANIFEST = chrome.runtime.getManifest();
    const COMMANDS = MANIFEST.commands._execute_action.suggested_key.default;
    const KEYS = COMMANDS.split("+");
    for (let key of KEYS) {
        const BUTTON = document.createElement("button");
        BUTTON.setAttribute("class", "btn btn-sm me-2 | min-width-2 f-body f-text-on-accent");
        BUTTON.textContent = key;
        BUTTON_SHORTCUTS.parentElement.insertBefore(BUTTON, BUTTON_SHORTCUTS);
    }
};
setShortcuts();
BUTTON_SHORTCUTS.addEventListener("click", () => {
    chrome.tabs.create({ url: "brave://extensions/shortcuts" });
});
// ------------------------- visibility -------------------------
// set "vis_s_aem" var
INPUT_VIS_S_AEM.addEventListener("click", (e) => {
    if (e.target.hasAttribute("checked")) {
        chrome.storage.local.set({ vis_s_aem: false });
        SPAN_VIS_S_AEM.textContent = "Off";
        INPUT_VIS_S_AEM.removeAttribute("checked");
    }
    else {
        chrome.storage.local.set({ vis_s_aem: true });
        SPAN_VIS_S_AEM.textContent = "On";
        INPUT_VIS_S_AEM.setAttribute("checked", "");
    }
});
// set "vis_p_aem" var
INPUT_VIS_P_AEM.addEventListener("click", (e) => {
    if (e.target.hasAttribute("checked")) {
        chrome.storage.local.set({ vis_p_aem: false });
        SPAN_VIS_P_AEM.textContent = "Off";
        INPUT_VIS_P_AEM.removeAttribute("checked");
    }
    else {
        chrome.storage.local.set({ vis_p_aem: true });
        SPAN_VIS_P_AEM.textContent = "On";
        INPUT_VIS_P_AEM.setAttribute("checked", "");
    }
});
// set "vis_utilities" var
INPUT_VIS_UTILITIES.addEventListener("click", (e) => {
    if (e.target.hasAttribute("checked")) {
        chrome.storage.local.set({ vis_utilities: false });
        SPAN_VIS_UTILITIES.textContent = "Off";
        INPUT_VIS_UTILITIES.removeAttribute("checked");
    }
    else {
        chrome.storage.local.set({ vis_utilities: true });
        SPAN_VIS_UTILITIES.textContent = "On";
        INPUT_VIS_UTILITIES.setAttribute("checked", "");
    }
});
/*
 * ------------------------- samsung -------------------------
 */
// set "s_p5_login" var
BUTTON_S_P5_LOGIN_SAVE.addEventListener("click", () => {
    chrome.storage.local.set({ s_p5_login: INPUT_S_P5_LOGIN.value });
});
// set "s_p6_login" var
BUTTON_S_P6_LOGIN_SAVE.addEventListener("click", () => {
    chrome.storage.local.set({ s_p6_login: INPUT_S_P6_LOGIN.value });
});
// set "s_p5_login" var
BUTTON_S_P5_LOGIN_RESET.addEventListener("click", () => {
    chrome.storage.local.get(["S_URL", "s_p5_login"], ({ S_URL, s_p5_login }) => {
        chrome.storage.local.set({ s_p5_login: S_URL.p5_login_reset });
        INPUT_S_P5_LOGIN.value = s_p5_login;
    });
    location.reload();
});
// set "s_p6_login" var
BUTTON_S_P6_LOGIN_RESET.addEventListener("click", () => {
    chrome.storage.local.get(["S_URL", "s_p6_login"], ({ S_URL, s_p6_login }) => {
        chrome.storage.local.set({ s_p6_login: S_URL.p6_login_reset });
        INPUT_S_P6_LOGIN.value = s_p6_login;
    });
    location.reload();
});
// ------------------------- tooltips -------------------------
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});
