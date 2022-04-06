const BLOCK2 = document.querySelector("#block2");
const BLOCK3 = document.querySelector("#block3");
const BLOCK4 = document.querySelector("#block4");
// @ts-ignore
const setLight = () => {
    document.documentElement.classList.add("light");
};
// @ts-ignore
const setDark = () => {
    document.documentElement.classList.add("dark");
};
// on popup ...
chrome.storage.local.get(["is_block2_visible", "is_block3_visible", "is_block4_visible", "selected_theme"], ({ is_block2_visible, is_block3_visible, is_block4_visible, selected_theme }) => {
    if (is_block2_visible === false) {
        BLOCK2.classList.add("d-none");
    }
    if (is_block3_visible === false) {
        BLOCK3.classList.add("d-none");
    }
    if (is_block4_visible === false) {
        BLOCK4.classList.add("d-none");
    }
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
document.querySelector("#block1__button_images").addEventListener("click", () => {
    const query_3 = async () => {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        chrome.scripting.insertCSS({
            target: { tabId: tab.id },
            files: [
                "css/images.css",
                "css/images_fonts.css",
            ],
        });
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["js/images.js"],
        });
        window.close();
    };
    query_3();
});
document.querySelector("#block1__button_options").addEventListener("click", () => {
    chrome.runtime.openOptionsPage();
});
/*
 * ------------------------- block2, samsung -------------------------
 */
const BLOCK2__SELECT_AEM = document.querySelector("#block2__select_aem");
const BLOCK2__INPUT_URL = document.querySelector("#block2__input_url");
const BLOCK2__BUTTON_TASK_MANAGEMENT = document.querySelector("#block2__button_task_management");
// on popup ...
chrome.storage.local.get(["selected_aem_samsung", "url_samsung"], ({ selected_aem_samsung, url_samsung }) => {
    for (let option of Array.from(BLOCK2__SELECT_AEM.options)) {
        if (option.value === selected_aem_samsung) {
            option.selected = true;
        }
    }
    BLOCK2__INPUT_URL.placeholder = url_samsung;
    BLOCK2__INPUT_URL.value = url_samsung;
});
// ------------------------- select -------------------------
// on popup ...
const setAttributesBlock2 = () => {
    chrome.storage.local.get("selected_aem_samsung", ({ selected_aem_samsung }) => {
        if (selected_aem_samsung === "p6_aem_ap" || selected_aem_samsung === "p6_aem_eu" || selected_aem_samsung === "p6_aem_us") {
            BLOCK2__BUTTON_TASK_MANAGEMENT.setAttribute("disabled", "");
        }
        else {
            BLOCK2__BUTTON_TASK_MANAGEMENT.removeAttribute("disabled");
        }
    });
};
setAttributesBlock2();
// set "selected_aem_samsung" var
BLOCK2__SELECT_AEM.addEventListener("change", () => {
    chrome.storage.local.set({ selected_aem_samsung: BLOCK2__SELECT_AEM.selectedOptions[0].value });
    setAttributesBlock2();
});
// ------------------------- button -------------------------
document.querySelector("#block2__button_login").addEventListener("click", () => {
    chrome.storage.local.get(["S_URL", "selected_aem_samsung", "user_id", "user_email"], ({ S_URL, selected_aem_samsung, user_id, user_email }) => {
        if (selected_aem_samsung === "p5_aem" || selected_aem_samsung === "p5_aem_eu" || selected_aem_samsung === "p5_aem_eu_shop") {
            chrome.tabs.create({ url: S_URL[selected_aem_samsung] + S_URL.p5_login + user_id });
        }
        else {
            chrome.tabs.create({ url: S_URL[selected_aem_samsung] + S_URL.p6_login + user_email });
        }
    });
});
// ------------------------- input -------------------------
const setUrl = (url) => {
    url = url.trim();
    if (url.startsWith("/")) {
        url = url.slice(1);
    }
    if (url.endsWith("/")) {
        url = url.slice(0, url.length - 1);
    }
    if (url.endsWith("?gr=false")) {
        url = url.slice(0, url.length - 9);
    }
    if (url.endsWith("?wcmmode=disabled")) {
        url = url.slice(0, url.length - 17);
    }
    if (url.endsWith(".html")) {
        url = url.slice(0, url.length - 5);
    }
    url = url.toLowerCase();
    return url;
};
// set "url_samsung" var
BLOCK2__INPUT_URL.addEventListener("input", () => {
    let url = BLOCK2__INPUT_URL.value;
    url = setUrl(url);
    chrome.storage.local.set({ url_samsung: url });
});
// ------------------------- buttons -------------------------
document.querySelector("#block2__button_editor").addEventListener("click", () => {
    chrome.storage.local.get(["S_URL", "selected_aem_samsung", "url_samsung"], ({ S_URL, selected_aem_samsung, url_samsung }) => {
        chrome.tabs.create({ url: S_URL[selected_aem_samsung] + S_URL.editor1 + url_samsung + S_URL.editor2 });
    });
});
document.querySelector("#block2__button_preview").addEventListener("click", () => {
    chrome.storage.local.get(["S_URL", "selected_aem_samsung", "url_samsung"], ({ S_URL, selected_aem_samsung, url_samsung }) => {
        chrome.tabs.create({ url: S_URL[selected_aem_samsung] + S_URL.preview1 + url_samsung + S_URL.preview2 });
    });
});
document.querySelector("#block2__button_qa").addEventListener("click", () => {
    chrome.storage.local.get(["S_URL", "selected_aem_samsung", "url_samsung"], ({ S_URL, selected_aem_samsung, url_samsung }) => {
        if (selected_aem_samsung === "p5_aem" || selected_aem_samsung === "p5_aem_eu") {
            chrome.tabs.create({ url: S_URL.p5_qa + url_samsung });
        }
        else if (selected_aem_samsung === "p5_aem_eu_shop") {
            chrome.tabs.create({ url: S_URL.p5_qa_shop + url_samsung });
        }
        else {
            chrome.tabs.create({ url: S_URL.p6_qa + url_samsung });
        }
    });
});
document.querySelector("#block2__button_live").addEventListener("click", () => {
    chrome.storage.local.get(["S_URL", "url_samsung"], ({ S_URL, url_samsung }) => {
        chrome.tabs.create({ url: S_URL.live + url_samsung });
    });
});
document.querySelector("#block2__button_sites").addEventListener("click", () => {
    chrome.storage.local.get(["S_URL", "selected_aem_samsung", "url_samsung"], ({ S_URL, selected_aem_samsung, url_samsung }) => {
        chrome.tabs.create({ url: S_URL[selected_aem_samsung] + S_URL.sites + url_samsung });
    });
});
document.querySelector("#block2__button_assets").addEventListener("click", () => {
    chrome.storage.local.get(["S_URL", "selected_aem_samsung", "url_samsung"], ({ S_URL, selected_aem_samsung, url_samsung }) => {
        chrome.tabs.create({ url: S_URL[selected_aem_samsung] + S_URL.assets + url_samsung });
    });
});
BLOCK2__BUTTON_TASK_MANAGEMENT.addEventListener("click", () => {
    chrome.storage.local.get(["S_URL", "selected_aem_samsung"], ({ S_URL, selected_aem_samsung }) => {
        chrome.tabs.create({ url: S_URL[selected_aem_samsung] + S_URL.p5_task_management });
    });
});
document.querySelector("#block2__button_workflows").addEventListener("click", () => {
    chrome.storage.local.get(["S_URL", "selected_aem_samsung"], ({ S_URL, selected_aem_samsung }) => {
        if (selected_aem_samsung === "p5_aem" || selected_aem_samsung === "p5_aem_eu" || selected_aem_samsung === "p5_aem_eu_shop") {
            chrome.tabs.create({ url: S_URL[selected_aem_samsung] + S_URL.p5_workflows });
        }
        else {
            chrome.tabs.create({ url: S_URL[selected_aem_samsung] + S_URL.p6_workflows });
        }
    });
});
document.querySelector("#block2__button_purging").addEventListener("click", () => {
    chrome.storage.local.get(["S_URL", "selected_aem_samsung"], ({ S_URL, selected_aem_samsung }) => {
        if (selected_aem_samsung === "p5_aem" || selected_aem_samsung === "p5_aem_eu" || selected_aem_samsung === "p5_aem_eu_shop") {
            chrome.tabs.create({ url: S_URL[selected_aem_samsung] + S_URL.p5_purging });
        }
        else {
            chrome.tabs.create({ url: S_URL[selected_aem_samsung] + S_URL.p6_purging });
        }
    });
});
document.querySelector("#block2__button_pim_b2c").addEventListener("click", () => {
    chrome.storage.local.get(["S_URL", "selected_aem_samsung"], ({ S_URL, selected_aem_samsung }) => {
        if (selected_aem_samsung === "p5_aem" || selected_aem_samsung === "p5_aem_eu" || selected_aem_samsung === "p5_aem_eu_shop") {
            chrome.tabs.create({ url: S_URL[selected_aem_samsung] + S_URL.p5_pim_b2c });
        }
        else {
            chrome.tabs.create({ url: S_URL[selected_aem_samsung] + S_URL.p6_pim_b2c });
        }
    });
});
document.querySelector("#block2__button_pim_b2b").addEventListener("click", () => {
    chrome.storage.local.get(["S_URL", "selected_aem_samsung"], ({ S_URL, selected_aem_samsung }) => {
        if (selected_aem_samsung === "p5_aem" || selected_aem_samsung === "p5_aem_eu" || selected_aem_samsung === "p5_aem_eu_shop") {
            chrome.tabs.create({ url: S_URL[selected_aem_samsung] + S_URL.p5_pim_b2b });
        }
        else {
            chrome.tabs.create({ url: S_URL[selected_aem_samsung] + S_URL.p6_pim_b2b });
        }
    });
});
/*
 * ------------------------- block3, iqos -------------------------
 */
const BLOCK3__SELECT_AEM = document.querySelector("#block3__select_aem");
const BLOCK3__SELECT_SITE = document.querySelector("#block3__select_site");
const BLOCK3__INPUT_URL = document.querySelector("#block3__input_url");
const BLOCK3__BUTTON_QA_LOGIN = document.querySelector("#block3__button_qa_login");
// on popup ...
chrome.storage.local.get(["selected_aem_iqos", "selected_site", "url_iqos"], ({ selected_aem_iqos, selected_site, url_iqos }) => {
    for (let option of Array.from(BLOCK3__SELECT_AEM.options)) {
        if (option.value === selected_aem_iqos) {
            option.selected = true;
        }
    }
    for (let option of Array.from(BLOCK3__SELECT_SITE.options)) {
        if (option.value === selected_site) {
            option.selected = true;
        }
    }
    BLOCK3__INPUT_URL.placeholder = url_iqos;
    BLOCK3__INPUT_URL.value = url_iqos;
});
// ------------------------- select -------------------------
// on popup ...
const setAttributesBlock3 = () => {
    chrome.storage.local.get("selected_aem_iqos", ({ selected_aem_iqos }) => {
        if (selected_aem_iqos === "prod_aem") {
            BLOCK3.classList.add("block3--critical");
            BLOCK3__BUTTON_QA_LOGIN.setAttribute("disabled", "");
        }
        else {
            BLOCK3.classList.remove("block3--critical");
            BLOCK3__BUTTON_QA_LOGIN.removeAttribute("disabled");
        }
    });
};
setAttributesBlock3();
// set "selected_aem_iqos" var
BLOCK3__SELECT_AEM.addEventListener("change", () => {
    chrome.storage.local.set({ selected_aem_iqos: BLOCK3__SELECT_AEM.selectedOptions[0].value });
    setAttributesBlock3();
});
// ------------------------- button -------------------------
document.querySelector("#block3__button_login").addEventListener("click", () => {
    chrome.storage.local.get(["I_URL", "selected_aem_iqos"], ({ I_URL, selected_aem_iqos }) => {
        chrome.tabs.create({ url: I_URL[selected_aem_iqos] + I_URL.login });
    });
});
// ------------------------- select -------------------------
// set "selected_site" var
BLOCK3__SELECT_SITE.addEventListener("change", () => {
    chrome.storage.local.set({ selected_site: BLOCK3__SELECT_SITE.selectedOptions[0].value });
});
// ------------------------- input -------------------------
// set "url_iqos" var
BLOCK3__INPUT_URL.addEventListener("input", () => {
    let url = BLOCK3__INPUT_URL.value;
    url = setUrl(url);
    chrome.storage.local.set({ url_iqos: url });
});
// ------------------------- buttons -------------------------
document.querySelector("#block3__button_editor").addEventListener("click", () => {
    chrome.storage.local.get(["I_URL", "selected_aem_iqos", "selected_site", "url_iqos"], ({ I_URL, selected_aem_iqos, selected_site, url_iqos }) => {
        chrome.tabs.create({ url: I_URL[selected_aem_iqos] + I_URL.editor1 + selected_site + "/" + url_iqos + I_URL.editor2 });
    });
});
document.querySelector("#block3__button_preview").addEventListener("click", () => {
    chrome.storage.local.get(["I_URL", "selected_aem_iqos", "selected_site", "url_iqos"], ({ I_URL, selected_aem_iqos, selected_site, url_iqos }) => {
        chrome.tabs.create({ url: I_URL[selected_aem_iqos] + I_URL.preview1 + selected_site + "/" + url_iqos + I_URL.preview2 });
    });
});
BLOCK3__BUTTON_QA_LOGIN.addEventListener("click", () => {
    chrome.storage.local.get(["I_URL", "selected_site"], ({ I_URL, selected_site }) => {
        let pre_prod_url = "";
        switch (selected_site) {
            case "pmisite":
                pre_prod_url = I_URL.pre_prod_qa + I_URL.pre_prod_qa_login;
                break;
            case "veevsite":
                pre_prod_url = I_URL.pre_prod_veev_qa + I_URL.pre_prod_veev_qa_login;
                break;
            case "pmiclub":
                pre_prod_url = I_URL.pre_prod_club_qa + I_URL.pre_prod_club_qa_login;
                break;
        }
        chrome.tabs.create({ url: pre_prod_url });
    });
});
document.querySelector("#block3__button_live").addEventListener("click", () => {
    chrome.storage.local.get(["I_URL", "selected_aem_iqos", "selected_site", "url_iqos"], ({ I_URL, selected_aem_iqos, selected_site, url_iqos }) => {
        if (selected_aem_iqos === "pre_prod_aem") {
            let pre_prod_url = "";
            switch (selected_site) {
                case "pmisite":
                    pre_prod_url = I_URL.pre_prod_qa;
                    break;
                case "veevsite":
                    pre_prod_url = I_URL.pre_prod_veev_qa;
                    break;
                case "pmiclub":
                    pre_prod_url = I_URL.pre_prod_club_qa;
                    break;
            }
            chrome.tabs.create({ url: pre_prod_url + url_iqos + I_URL.live });
        }
        else {
            let prod_url = "";
            switch (selected_site) {
                case "pmisite":
                    prod_url = I_URL.prod_live;
                    break;
                case "veevsite":
                    prod_url = I_URL.prod_veev_live;
                    break;
                case "pmiclub":
                    prod_url = I_URL.prod_club_live;
                    break;
            }
            chrome.tabs.create({ url: prod_url + url_iqos + I_URL.live });
        }
    });
});
document.querySelector("#block3__button_sites").addEventListener("click", () => {
    chrome.storage.local.get(["I_URL", "selected_aem_iqos", "selected_site", "url_iqos"], ({ I_URL, selected_aem_iqos, selected_site, url_iqos }) => {
        chrome.tabs.create({ url: I_URL[selected_aem_iqos] + I_URL.sites + selected_site + "/" + url_iqos });
    });
});
document.querySelector("#block3__button_assets").addEventListener("click", () => {
    chrome.storage.local.get(["I_URL", "selected_aem_iqos", "url_iqos", "I_COUNTRY"], ({ I_URL, selected_aem_iqos, url_iqos, I_COUNTRY }) => {
        let url = url_iqos.slice(0, 3);
        if (url[2] === "/") {
            url = url.slice(0, 2);
            if (I_COUNTRY[url]) {
                chrome.tabs.create({ url: I_URL[selected_aem_iqos] + I_URL.assets + "/" + I_COUNTRY[url] });
            }
        }
    });
});
document.querySelector("#block3__button_grfalse").addEventListener("click", () => {
    const query_1 = async () => {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        chrome.storage.local.get(["I_URL"], ({ I_URL }) => {
            chrome.tabs.update({ url: tab.url + I_URL.grfalse });
        });
        window.close();
    };
    query_1();
});
const setSelect = () => {
    // pmisite & pmiclub
    const SPAN_1 = document.querySelector(".label-placeholder--month");
    const SPAN_2 = document.querySelector(".label-placeholder--year");
    const SELECT_1 = document.querySelector("#months-select");
    const SELECT_2 = document.querySelector("#years-select");
    if (SELECT_1 !== null && SELECT_2 !== null) {
        for (let option of Array.from(SELECT_1.options)) {
            if (option.value === "07") {
                option.selected = true;
                SPAN_1.textContent = option.label;
            }
        }
        for (let option of Array.from(SELECT_2.options)) {
            if (option.value === "1992") {
                option.selected = true;
                SPAN_2.textContent = option.label;
            }
        }
    }
    // veevsite
    const SELECT_3 = document.querySelector(".birth-month");
    const SELECT_4 = document.querySelector(".birth-year");
    if (SELECT_3 !== null && SELECT_4 !== null) {
        for (let option of Array.from(SELECT_3.options)) {
            if (option.value === "07") {
                option.selected = true;
            }
        }
        for (let option of Array.from(SELECT_4.options)) {
            if (option.value === "1992") {
                option.selected = true;
            }
        }
    }
};
document.querySelector("#block3__button_age_gate").addEventListener("click", () => {
    const query_2 = async () => {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: setSelect,
        });
        window.close();
    };
    query_2();
});
/*
 * ------------------------- block4 -------------------------
 */
const BLOCK4__INPUT_TEXT = document.querySelector("#block4__input_text");
document.querySelector("#block4__button_paste").addEventListener("click", () => {
    BLOCK4__INPUT_TEXT.focus();
    document.execCommand("paste");
});
document.querySelector("#block4__button_to_lower_case").addEventListener("click", () => {
    BLOCK4__INPUT_TEXT.value = BLOCK4__INPUT_TEXT.value.toLowerCase();
});
document.querySelector("#block4__button_to_upper_case").addEventListener("click", () => {
    BLOCK4__INPUT_TEXT.value = BLOCK4__INPUT_TEXT.value.toUpperCase();
});
document.querySelector("#block4__button_to_title_case").addEventListener("click", () => {
    const VALUE = BLOCK4__INPUT_TEXT.value.trim();
    let values = VALUE.split(" ");
    let text = "";
    for (let value of values) {
        text += value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() + " ";
    }
    BLOCK4__INPUT_TEXT.value = text.trimEnd();
});
document.querySelector("#block4__button_cut").addEventListener("click", () => {
    BLOCK4__INPUT_TEXT.select();
    document.execCommand("cut");
});
document.querySelector("#block4__button_copy").addEventListener("click", () => {
    BLOCK4__INPUT_TEXT.select();
    document.execCommand("copy");
});
// ------------------------- tooltips -------------------------
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    // @ts-ignore
    return new bootstrap.Tooltip(tooltipTriggerEl);
});
