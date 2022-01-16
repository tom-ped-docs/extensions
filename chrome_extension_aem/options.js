const S_INPUT_DISPLAY_AEM = document.querySelector("#s_input_display_aem");
const S_SPAN_DISPLAY_AEM = document.querySelector("#s_span_display_aem");

const S_INPUT_P5_LOGIN = document.querySelector("#s_input_p5_login");
const S_INPUT_P6_LOGIN = document.querySelector("#s_input_p6_login");
const S_BUTTON_P5_LOGIN_SAVE = document.querySelector("#s_button_p5_login_save");
const S_BUTTON_P6_LOGIN_SAVE = document.querySelector("#s_button_p6_login_save");
const S_BUTTON_P5_LOGIN_RESET = document.querySelector("#s_button_p5_login_reset");
const S_BUTTON_P6_LOGIN_RESET = document.querySelector("#s_button_p6_login_reset");

const PMI_INPUT_DISPLAY_AEM = document.querySelector("#pmi_input_display_aem");
const PMI_SPAN_DISPLAY_AEM = document.querySelector("#pmi_span_display_aem");

const INPUT_DISPLAY_UTILITIES = document.querySelector("#input_display_utilities");
const SPAN_DISPLAY_UTILITIES = document.querySelector("#span_display_utilities");

const SELECT_THEME = document.querySelector("#select_theme");

// on popup ...
const setAttributes = () => {
  chrome.storage.local.get(["s_p5_login", "s_p6_login", "s_display_aem", "pmi_display_aem", "display_utilities"], ({ s_p5_login, s_p6_login, s_display_aem, pmi_display_aem, display_utilities }) => {
    if (s_display_aem === true) {
      S_INPUT_DISPLAY_AEM.setAttribute("checked", "");
      S_SPAN_DISPLAY_AEM.textContent = "On";
    }

    S_INPUT_P5_LOGIN.value = s_p5_login;
    S_INPUT_P6_LOGIN.value = s_p6_login;

    if (pmi_display_aem === true) {
      PMI_INPUT_DISPLAY_AEM.setAttribute("checked", "");
      PMI_SPAN_DISPLAY_AEM.textContent = "On";
    }

    if (display_utilities === true) {
      INPUT_DISPLAY_UTILITIES.setAttribute("checked", "");
      SPAN_DISPLAY_UTILITIES.textContent = "On";
    }
  });
}
setAttributes();

/*
 * ------------------------- samsung aem -------------------------
 */

// set "s_display_aem" var
S_INPUT_DISPLAY_AEM.addEventListener("click",
  (e) => {
    if (e.target.hasAttribute("checked")) {
      chrome.storage.local.set({ s_display_aem: false });
      S_INPUT_DISPLAY_AEM.removeAttribute("checked");
      S_SPAN_DISPLAY_AEM.textContent = "Off";
    } else {
      chrome.storage.local.set({ s_display_aem: true });
      S_INPUT_DISPLAY_AEM.setAttribute("checked", "");
      S_SPAN_DISPLAY_AEM.textContent = "On";
    }
  }
);

// set "s_p5_login" var
S_BUTTON_P5_LOGIN_SAVE.addEventListener("click", () => {
  chrome.storage.local.set({ s_p5_login: S_INPUT_P5_LOGIN.value });
});

// set "s_p6_login" var
S_BUTTON_P6_LOGIN_SAVE.addEventListener("click", () => {
  chrome.storage.local.set({ s_p6_login: S_INPUT_P6_LOGIN.value });
});

// set "s_p5_login" var
S_BUTTON_P5_LOGIN_RESET.addEventListener("click", () => {
  chrome.storage.local.get(["S_URL", "s_p5_login"], ({ S_URL, s_p5_login }) => {
    chrome.storage.local.set({ s_p5_login: S_URL.p5_login_reset });
    S_INPUT_P5_LOGIN.value = s_p5_login;
  });
});

// set "s_p6_login" var
S_BUTTON_P6_LOGIN_RESET.addEventListener("click", () => {
  chrome.storage.local.get(["S_URL", "s_p6_login"], ({ S_URL, s_p6_login }) => {
    chrome.storage.local.set({ s_p6_login: S_URL.p6_login_reset });
    S_INPUT_P6_LOGIN.value = s_p6_login;
  });
});

/*
 * ------------------------- pmi aem -------------------------
 */

// set "pmi_display_aem" var
PMI_INPUT_DISPLAY_AEM.addEventListener("click",
  (e) => {
    if (e.target.hasAttribute("checked")) {
      chrome.storage.local.set({ pmi_display_aem: false });
      PMI_INPUT_DISPLAY_AEM.removeAttribute("checked");
      PMI_SPAN_DISPLAY_AEM.textContent = "Off";
    } else {
      chrome.storage.local.set({ pmi_display_aem: true });
      PMI_INPUT_DISPLAY_AEM.setAttribute("checked", "");
      PMI_SPAN_DISPLAY_AEM.textContent = "On";
    }
  }
);

/*
 * ------------------------- utilities -------------------------
 */

// set "display_utilities" var
INPUT_DISPLAY_UTILITIES.addEventListener("click",
  (e) => {
    if (e.target.hasAttribute("checked")) {
      chrome.storage.local.set({ display_utilities: false });
      INPUT_DISPLAY_UTILITIES.removeAttribute("checked");
      SPAN_DISPLAY_UTILITIES.textContent = "Off";
    } else {
      chrome.storage.local.set({ display_utilities: true });
      INPUT_DISPLAY_UTILITIES.setAttribute("checked", "");
      SPAN_DISPLAY_UTILITIES.textContent = "On";
    }
  }
);

/*
 * ------------------------- theme -------------------------
 */

const setLight = () => {
  document.body.classList.remove("bg-dark");
  document.body.classList.add("bg-light");
}

const setDark = () => {
  document.body.classList.remove("bg-light");
  document.body.classList.add("bg-dark");
}

// on popup ...
const setThemes = () => {
  chrome.storage.local.get("selected_theme", ({ selected_theme }) => {
    for (let option of Array.from(SELECT_THEME.options)) {
      if (option.value === selected_theme) {
        option.selected = true;
      }
    }

    // ------------------------- set theme -------------------------

    if (selected_theme === "light") {
      setLight();
    } else if (selected_theme === "dark") {
      setDark();
    } else {
      const PREFERS_COLOR_SCHEME = window.matchMedia("(prefers-color-scheme: light)");

      if (PREFERS_COLOR_SCHEME.matches) {
        setLight();
      } else {
        setDark();
      }
    }
  });
}
setThemes();

// set "selected_theme" var
SELECT_THEME.addEventListener("change", () => {
  chrome.storage.local.set({ selected_theme: SELECT_THEME.selectedOptions[0].value });
  location.reload();
});
