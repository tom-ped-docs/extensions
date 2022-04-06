const BLOCK2__SELECT_THEME = document.querySelector("#block2__select_theme") as HTMLSelectElement;

const BLOCK3__BUTTON_SHORTCUTS = document.querySelector("#block3__button_shortcuts") as HTMLButtonElement;

const BLOCK4__SPAN_AEM1 = document.querySelector("#block4__span_aem1") as HTMLSpanElement;
const BLOCK4__INPUT_AEM1 = document.querySelector("#block4__input_aem1") as HTMLInputElement;

const BLOCK4__SPAN_AEM2 = document.querySelector("#block4__span_aem2") as HTMLSpanElement;
const BLOCK4__INPUT_AEM2 = document.querySelector("#block4__input_aem2") as HTMLInputElement;

const BLOCK4__SPAN_AEM_CAPITALIZATION = document.querySelector("#block4__span_capitalization") as HTMLSpanElement;
const BLOCK4__INPUT_AEM_CAPITALIZATION = document.querySelector("#block4__input_capitalization") as HTMLInputElement;

const BLOCK5__INPUT_LOGIN_P5 = document.querySelector("#block5__input_login_p5") as HTMLInputElement;
const BLOCK5__INPUT_LOGIN_P6 = document.querySelector("#block5__input_login_p6") as HTMLInputElement;
// const BLOCK5__BUTTON_LOGIN_SAVE_P5 = document.querySelector("#block5__button_login_save_p5") as HTMLButtonElement;
// const BLOCK5__BUTTON_LOGIN_SAVE_P6 = document.querySelector("#block5__button_login_save_p6") as HTMLButtonElement;
// const BLOCK5__BUTTON_LOGIN_RESET_P5 = document.querySelector("#block5__button_login_reset_p5") as HTMLButtonElement;
// const BLOCK5__BUTTON_LOGIN_RESET_P6 = document.querySelector("#block5__button_login_reset_p6") as HTMLButtonElement;

// @ts-ignore
const setLight = () => {
  document.documentElement.classList.add("light");
}

// @ts-ignore
const setDark = () => {
  document.documentElement.classList.add("dark");
}

// on popup ...
chrome.storage.local.get(["s_p5_login", "s_p6_login", "vis_s_aem", "vis_p_aem", "vis_utilities", "theme"], ({ s_p5_login, s_p6_login, vis_s_aem, vis_p_aem, vis_utilities, theme }) => {
  for (let option of Array.from(BLOCK2__SELECT_THEME.options)) {
    if (option.value === theme) {
      option.selected = true;
    }
  }

  if (vis_s_aem === true) {
    BLOCK4__SPAN_AEM1.textContent = "On";
    BLOCK4__INPUT_AEM1.setAttribute("checked", "");
  }

  if (vis_p_aem === true) {
    BLOCK4__SPAN_AEM2.textContent = "On";
    BLOCK4__INPUT_AEM2.setAttribute("checked", "");
  }

  if (vis_utilities === true) {
    BLOCK4__SPAN_AEM_CAPITALIZATION.textContent = "On";
    BLOCK4__INPUT_AEM_CAPITALIZATION.setAttribute("checked", "");
  }

  BLOCK5__INPUT_LOGIN_P5.value = s_p5_login;
  BLOCK5__INPUT_LOGIN_P6.value = s_p6_login;

  // ------------------------- theme -------------------------

  if (theme === "light") {
    setLight();
  } else if (theme === "dark") {
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

/*
 * ------------------------- block2 -------------------------
 */

// set "theme" var
BLOCK2__SELECT_THEME.addEventListener("change", () => {
  chrome.storage.local.set({ theme: BLOCK2__SELECT_THEME.selectedOptions[0].value });
  location.reload();
});

/*
 * ------------------------- block3 -------------------------
 */

// on popup ...
const setShortcuts = () => {
  const MANIFEST = chrome.runtime.getManifest();
  const COMMANDS: string = MANIFEST.commands._execute_action.suggested_key.default;
  const KEYS: string[] = COMMANDS.split("+");

  for (let key of KEYS) {
    const BUTTON = document.createElement("button") as HTMLButtonElement;

    BUTTON.setAttribute("class", "btn btn-sm me-2 | min-width-2 f-body f-text-on-accent");
    BUTTON.textContent = key;
    BLOCK3__BUTTON_SHORTCUTS.parentElement.insertBefore(BUTTON, BLOCK3__BUTTON_SHORTCUTS);
  }
}
setShortcuts();

BLOCK3__BUTTON_SHORTCUTS.addEventListener("click", () => {
  chrome.tabs.create({ url: "brave://extensions/shortcuts" });
});

/*
 * ------------------------- block4 -------------------------
 */

// set "vis_s_aem" var
BLOCK4__INPUT_AEM1.addEventListener("click",
  (e) => {
    if ((e.target as HTMLInputElement).hasAttribute("checked")) {
      chrome.storage.local.set({ vis_s_aem: false });
      BLOCK4__SPAN_AEM1.textContent = "Off";
      BLOCK4__INPUT_AEM1.removeAttribute("checked");
    } else {
      chrome.storage.local.set({ vis_s_aem: true });
      BLOCK4__SPAN_AEM1.textContent = "On";
      BLOCK4__INPUT_AEM1.setAttribute("checked", "");
    }
  }
);

// set "vis_p_aem" var
BLOCK4__INPUT_AEM2.addEventListener("click",
  (e) => {
    if ((e.target as HTMLInputElement).hasAttribute("checked")) {
      chrome.storage.local.set({ vis_p_aem: false });
      BLOCK4__SPAN_AEM2.textContent = "Off";
      BLOCK4__INPUT_AEM2.removeAttribute("checked");
    } else {
      chrome.storage.local.set({ vis_p_aem: true });
      BLOCK4__SPAN_AEM2.textContent = "On";
      BLOCK4__INPUT_AEM2.setAttribute("checked", "");
    }
  }
);

// set "vis_utilities" var
BLOCK4__INPUT_AEM_CAPITALIZATION.addEventListener("click",
  (e) => {
    if ((e.target as HTMLInputElement).hasAttribute("checked")) {
      chrome.storage.local.set({ vis_utilities: false });
      BLOCK4__SPAN_AEM_CAPITALIZATION.textContent = "Off";
      BLOCK4__INPUT_AEM_CAPITALIZATION.removeAttribute("checked");
    } else {
      chrome.storage.local.set({ vis_utilities: true });
      BLOCK4__SPAN_AEM_CAPITALIZATION.textContent = "On";
      BLOCK4__INPUT_AEM_CAPITALIZATION.setAttribute("checked", "");
    }
  }
);

/*
 * ------------------------- block5 -------------------------
 */

// set "s_p5_login" var
document.querySelector("#block5__button_save_p5").addEventListener("click", () => {
  chrome.storage.local.set({ s_p5_login: BLOCK5__INPUT_LOGIN_P5.value });
});

// set "s_p6_login" var
document.querySelector("#block5__button_save_p6").addEventListener("click", () => {
  chrome.storage.local.set({ s_p6_login: BLOCK5__INPUT_LOGIN_P6.value });
});

// set "s_p5_login" var
document.querySelector("#block5__button_reset_p5").addEventListener("click", () => {
  chrome.storage.local.get(["S_URL", "s_p5_login"], ({ S_URL, s_p5_login }) => {
    chrome.storage.local.set({ s_p5_login: S_URL.p5_login_reset });
    BLOCK5__INPUT_LOGIN_P5.value = s_p5_login;
  });
  location.reload();
});

// set "s_p6_login" var
document.querySelector("#block5__button_reset_p6").addEventListener("click", () => {
  chrome.storage.local.get(["S_URL", "s_p6_login"], ({ S_URL, s_p6_login }) => {
    chrome.storage.local.set({ s_p6_login: S_URL.p6_login_reset });
    BLOCK5__INPUT_LOGIN_P6.value = s_p6_login;
  });
  location.reload();
});

// ------------------------- tooltips -------------------------

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  // @ts-ignore
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
