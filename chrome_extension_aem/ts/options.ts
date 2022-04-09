const APPEARANCE__SELECT_THEME = document.querySelector("#appearance__select-theme") as HTMLSelectElement;

const EXTENSIONS__SPAN_SAMSUNG = document.querySelector("#extensions__span-samsung") as HTMLSpanElement;
const EXTENSIONS__SPAN_IQOS = document.querySelector("#extensions__span-iqos") as HTMLSpanElement;
const EXTENSIONS__SPAN_TOOLS = document.querySelector("#extensions__span-tools") as HTMLSpanElement;

const EXTENSIONS__INPUT_SAMSUNG = document.querySelector("#extensions__input-samsung") as HTMLInputElement;
const EXTENSIONS__INPUT_IQOS = document.querySelector("#extensions__input-iqos") as HTMLInputElement;
const EXTENSIONS__INPUT_TOOLS = document.querySelector("#extensions__input-tools") as HTMLInputElement;

const SAMSUNG__INPUT_USER_ID = document.querySelector("#samsung__input-user-id") as HTMLInputElement;
const SAMSUNG__INPUT_USER_EMAIL = document.querySelector("#samsung__input-user-email") as HTMLInputElement;

// @ts-ignore
const setLight = () => {
  document.documentElement.classList.add("light");
}

// @ts-ignore
const setDark = () => {
  document.documentElement.classList.add("dark");
}

// on popup ...
chrome.storage.local.get(["user_id", "user_email", "is_aem_samsung_visible", "is_block3_visible", "is_tools_visible", "selected_theme"], ({ user_id, user_email, is_aem_samsung_visible, is_block3_visible, is_tools_visible, selected_theme }) => {
  for (let option of Array.from(APPEARANCE__SELECT_THEME.options)) {
    if (option.value === selected_theme) {
      option.selected = true;
    }
  }

  if (is_aem_samsung_visible === true) {
    EXTENSIONS__SPAN_SAMSUNG.textContent = "On";
    EXTENSIONS__INPUT_SAMSUNG.setAttribute("checked", "");
  }

  if (is_block3_visible === true) {
    EXTENSIONS__SPAN_IQOS.textContent = "On";
    EXTENSIONS__INPUT_IQOS.setAttribute("checked", "");
  }

  if (is_tools_visible === true) {
    EXTENSIONS__SPAN_TOOLS.textContent = "On";
    EXTENSIONS__INPUT_TOOLS.setAttribute("checked", "");
  }

  SAMSUNG__INPUT_USER_ID.value = user_id;
  SAMSUNG__INPUT_USER_EMAIL.value = user_email;

  // ------------------------- theme -------------------------

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

/*
 * ------------------------- appearance -------------------------
 */

// set "selected_theme" var
APPEARANCE__SELECT_THEME.addEventListener("change", () => {
  chrome.storage.local.set({ selected_theme: APPEARANCE__SELECT_THEME.selectedOptions[0].value });
  location.reload();
});

/*
 * ------------------------- shortcuts -------------------------
 */

document.querySelector("#shortcuts__button-open").addEventListener("click", () => {
  chrome.tabs.create({ url: "chrome://extensions/shortcuts" });
});

/*
 * ------------------------- extensions -------------------------
 */

// set "is_aem_samsung_visible" var
EXTENSIONS__INPUT_SAMSUNG.addEventListener("click",
  (e) => {
    if ((e.target as HTMLInputElement).hasAttribute("checked")) {
      chrome.storage.local.set({ is_aem_samsung_visible: false });
      EXTENSIONS__SPAN_SAMSUNG.textContent = "Off";
      EXTENSIONS__INPUT_SAMSUNG.removeAttribute("checked");
    } else {
      chrome.storage.local.set({ is_aem_samsung_visible: true });
      EXTENSIONS__SPAN_SAMSUNG.textContent = "On";
      EXTENSIONS__INPUT_SAMSUNG.setAttribute("checked", "");
    }
  }
);

// set "is_block3_visible" var
EXTENSIONS__INPUT_IQOS.addEventListener("click",
  (e) => {
    if ((e.target as HTMLInputElement).hasAttribute("checked")) {
      chrome.storage.local.set({ is_block3_visible: false });
      EXTENSIONS__SPAN_IQOS.textContent = "Off";
      EXTENSIONS__INPUT_IQOS.removeAttribute("checked");
    } else {
      chrome.storage.local.set({ is_block3_visible: true });
      EXTENSIONS__SPAN_IQOS.textContent = "On";
      EXTENSIONS__INPUT_IQOS.setAttribute("checked", "");
    }
  }
);

// set "is_tools_visible" var
EXTENSIONS__INPUT_TOOLS.addEventListener("click",
  (e) => {
    if ((e.target as HTMLInputElement).hasAttribute("checked")) {
      chrome.storage.local.set({ is_tools_visible: false });
      EXTENSIONS__SPAN_TOOLS.textContent = "Off";
      EXTENSIONS__INPUT_TOOLS.removeAttribute("checked");
    } else {
      chrome.storage.local.set({ is_tools_visible: true });
      EXTENSIONS__SPAN_TOOLS.textContent = "On";
      EXTENSIONS__INPUT_TOOLS.setAttribute("checked", "");
    }
  }
);

/*
 * ------------------------- aem (samsung) -------------------------
 */

// set "user_id" var
document.querySelector("#samsung__button-save-user-id").addEventListener("click", () => {
  chrome.storage.local.set({ user_id: SAMSUNG__INPUT_USER_ID.value });
});

// set "user_email" var
document.querySelector("#samsung__button-save-user-email").addEventListener("click", () => {
  chrome.storage.local.set({ user_email: SAMSUNG__INPUT_USER_EMAIL.value });
});

// ------------------------- tooltips -------------------------

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  // @ts-ignore
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
