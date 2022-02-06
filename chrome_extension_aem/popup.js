/*
 * ------------------------- options -------------------------
 */

const BUTTON_OPTIONS = document.querySelector("#button_options");

BUTTON_OPTIONS.addEventListener("click", () => {
  chrome.runtime.openOptionsPage();
});

const MODULE_S_AEM = document.querySelector("#module_s_aem");
const MODULE_P_AEM = document.querySelector("#module_p_aem");
const MODULE_UTILITIES = document.querySelector("#module_utilities");

const setLight = () => {
  document.documentElement.classList.add("light");
}

const setDark = () => {
  document.documentElement.classList.add("dark");
}

// on popup ...
chrome.storage.local.get(["vis_s_aem", "vis_p_aem", "vis_utilities", "theme"], ({ vis_s_aem, vis_p_aem, vis_utilities, theme }) => {
  // ------------------------- visibility -------------------------

  if (vis_s_aem === false) {
    MODULE_S_AEM.classList.add("d-none");
  }

  if (vis_p_aem === false) {
    MODULE_P_AEM.classList.add("d-none");
  }

  if (vis_utilities === false) {
    MODULE_UTILITIES.classList.add("d-none");
  }

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
 * ------------------------- samsung -------------------------
 */

const SELECT_S_AEM = document.querySelector("#select_s_aem");
const BUTTON_S_LOGIN = document.querySelector("#button_s_login");
const INPUT_S_URL = document.querySelector("#input_s_url");

const BUTTON_S_EDITOR = document.querySelector("#button_s_editor");
const BUTTON_S_EDITOR_OFF = document.querySelector("#button_s_editor_off");
const BUTTON_S_QA = document.querySelector("#button_s_qa");
const BUTTON_S_LIVE = document.querySelector("#button_s_live");
const BUTTON_S_SITES = document.querySelector("#button_s_sites");
const BUTTON_S_ASSETS = document.querySelector("#button_s_assets");

const BUTTON_S_TASK_MANAGEMENT = document.querySelector("#button_s_task_management");
const BUTTON_S_WORKFLOWS = document.querySelector("#button_s_workflows");
const BUTTON_S_PURGING = document.querySelector("#button_s_purging");
const BUTTON_S_PIM_B2C = document.querySelector("#button_s_pim_b2c");
const BUTTON_S_PIM_B2B = document.querySelector("#button_s_pim_b2b");

// on popup ...
chrome.storage.local.get(["s_aem", "s_url"], ({ s_aem, s_url }) => {
  for (let option of Array.from(SELECT_S_AEM.options)) {
    if (option.value === s_aem) {
      option.selected = true;
    }
  }

  INPUT_S_URL.placeholder = s_url;
  INPUT_S_URL.value = s_url;
});

// ------------------------- select -------------------------

// on popup ...
const setSAttributes = () => {
  chrome.storage.local.get("s_aem", ({ s_aem }) => {
    if (s_aem === "p6_aem_ap" || s_aem === "p6_aem_eu" || s_aem === "p6_aem_us") {
      BUTTON_S_TASK_MANAGEMENT.setAttribute("disabled", "");
    } else {
      BUTTON_S_TASK_MANAGEMENT.removeAttribute("disabled");
    }
  });
}
setSAttributes();

// set "s_aem" var
SELECT_S_AEM.addEventListener("change", () => {
  chrome.storage.local.set({ s_aem: SELECT_S_AEM.selectedOptions[0].value });
  setSAttributes();
});

// ------------------------- button -------------------------

BUTTON_S_LOGIN.addEventListener("click", () => {
  chrome.storage.local.get(["S_URL", "s_aem", "s_p5_login", "s_p6_login"], ({ S_URL, s_aem, s_p5_login, s_p6_login }) => {
    if (s_aem === "p5_aem" || s_aem === "p5_aem_eu" || s_aem === "p5_aem_eu_shop") {
      chrome.tabs.create({ url: S_URL[s_aem] + S_URL.p5_login + s_p5_login });
    } else {
      chrome.tabs.create({ url: S_URL[s_aem] + S_URL.p6_login + s_p6_login });
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
}

// set "s_url" var
INPUT_S_URL.addEventListener("input", () => {
  let url = INPUT_S_URL.value;

  url = setUrl(url);
  chrome.storage.local.set({ s_url: url });
});

// ------------------------- buttons -------------------------

BUTTON_S_EDITOR.addEventListener("click", () => {
  chrome.storage.local.get(["S_URL", "s_aem", "s_url"], ({ S_URL, s_aem, s_url }) => {
    chrome.tabs.create({ url: S_URL[s_aem] + S_URL.editor_s + s_url + S_URL.editor_e });
  });
});

BUTTON_S_EDITOR_OFF.addEventListener("click", () => {
  chrome.storage.local.get(["S_URL", "s_aem", "s_url"], ({ S_URL, s_aem, s_url }) => {
    chrome.tabs.create({ url: S_URL[s_aem] + S_URL.editor_off_s + s_url + S_URL.editor_off_e });
  });
});

BUTTON_S_QA.addEventListener("click", () => {
  chrome.storage.local.get(["S_URL", "s_aem", "s_url"], ({ S_URL, s_aem, s_url }) => {
    if (s_aem === "p5_aem" || s_aem === "p5_aem_eu") {
      chrome.tabs.create({ url: S_URL.p5_qa + s_url });
    } else if (s_aem === "p5_aem_eu_shop") {
      chrome.tabs.create({ url: S_URL.p5_qa_shop + s_url });
    } else {
      chrome.tabs.create({ url: S_URL.p6_qa + s_url });
    }
  });
});

BUTTON_S_LIVE.addEventListener("click", () => {
  chrome.storage.local.get(["S_URL", "s_url"], ({ S_URL, s_url }) => {
    chrome.tabs.create({ url: S_URL.live + s_url });
  });
});

BUTTON_S_SITES.addEventListener("click", () => {
  chrome.storage.local.get(["S_URL", "s_aem", "s_url"], ({ S_URL, s_aem, s_url }) => {
    chrome.tabs.create({ url: S_URL[s_aem] + S_URL.sites + s_url });
  });
});

BUTTON_S_ASSETS.addEventListener("click", () => {
  chrome.storage.local.get(["S_URL", "s_aem", "s_url"], ({ S_URL, s_aem, s_url }) => {
    chrome.tabs.create({ url: S_URL[s_aem] + S_URL.assets + s_url });
  });
});

BUTTON_S_TASK_MANAGEMENT.addEventListener("click", () => {
  chrome.storage.local.get(["S_URL", "s_aem"], ({ S_URL, s_aem }) => {
    chrome.tabs.create({ url: S_URL[s_aem] + S_URL.p5_task_management });
  });
});

BUTTON_S_WORKFLOWS.addEventListener("click", () => {
  chrome.storage.local.get(["S_URL", "s_aem"], ({ S_URL, s_aem }) => {
    if (s_aem === "p5_aem" || s_aem === "p5_aem_eu" || s_aem === "p5_aem_eu_shop") {
      chrome.tabs.create({ url: S_URL[s_aem] + S_URL.p5_workflows });
    } else {
      chrome.tabs.create({ url: S_URL[s_aem] + S_URL.p6_workflows });
    }
  });
});

BUTTON_S_PURGING.addEventListener("click", () => {
  chrome.storage.local.get(["S_URL", "s_aem"], ({ S_URL, s_aem }) => {
    if (s_aem === "p5_aem" || s_aem === "p5_aem_eu" || s_aem === "p5_aem_eu_shop") {
      chrome.tabs.create({ url: S_URL[s_aem] + S_URL.p5_purging });
    } else {
      chrome.tabs.create({ url: S_URL[s_aem] + S_URL.p6_purging });
    }
  });
});

BUTTON_S_PIM_B2C.addEventListener("click", () => {
  chrome.storage.local.get(["S_URL", "s_aem"], ({ S_URL, s_aem }) => {
    if (s_aem === "p5_aem" || s_aem === "p5_aem_eu" || s_aem === "p5_aem_eu_shop") {
      chrome.tabs.create({ url: S_URL[s_aem] + S_URL.p5_pim_b2c });
    } else {
      chrome.tabs.create({ url: S_URL[s_aem] + S_URL.p6_pim_b2c });
    }
  });
});

BUTTON_S_PIM_B2B.addEventListener("click", () => {
  chrome.storage.local.get(["S_URL", "s_aem"], ({ S_URL, s_aem }) => {
    if (s_aem === "p5_aem" || s_aem === "p5_aem_eu" || s_aem === "p5_aem_eu_shop") {
      chrome.tabs.create({ url: S_URL[s_aem] + S_URL.p5_pim_b2b });
    } else {
      chrome.tabs.create({ url: S_URL[s_aem] + S_URL.p6_pim_b2b });
    }
  });
});

/*
 * ------------------------- pmi -------------------------
 */

const SELECT_P_AEM = document.querySelector("#select_p_aem");
const BUTTON_P_LOGIN = document.querySelector("#button_p_login");
const INPUT_P_URL = document.querySelector("#input_p_url");

const BUTTON_P_EDITOR = document.querySelector("#button_p_editor");
const BUTTON_P_EDITOR_OFF = document.querySelector("#button_p_editor_off");
const BUTTON_P_LIVE_LOGIN = document.querySelector("#button_p_live_login");
const BUTTON_P_LIVE = document.querySelector("#button_p_live");
const BUTTON_P_SITES = document.querySelector("#button_p_sites");
const BUTTON_P_ASSETS_LOCAL = document.querySelector("#button_p_assets_local");
const BUTTON_P_GRFALSE = document.querySelector("#button_p_grfalse");

// on popup ...
chrome.storage.local.get(["p_aem", "p_url"], ({ p_aem, p_url }) => {
  for (let option of Array.from(SELECT_P_AEM.options)) {
    if (option.value === p_aem) {
      option.selected = true;
    }
  }

  INPUT_P_URL.placeholder = p_url;
  INPUT_P_URL.value = p_url;
});

// ------------------------- select -------------------------

// on popup ...
const setPAttributes = () => {
  chrome.storage.local.get("p_aem", ({ p_aem }) => {
    if (p_aem === "prod_aem") {
      MODULE_P_AEM.classList.add("f-critical-background");
      BUTTON_P_LIVE_LOGIN.setAttribute("disabled", "");
    } else {
      MODULE_P_AEM.classList.remove("f-critical-background");
      BUTTON_P_LIVE_LOGIN.removeAttribute("disabled");
    }
  });
}
setPAttributes();

// set "p_aem" var
SELECT_P_AEM.addEventListener("change", () => {
  chrome.storage.local.set({ p_aem: SELECT_P_AEM.selectedOptions[0].value });
  setPAttributes();
});

// ------------------------- button -------------------------

BUTTON_P_LOGIN.addEventListener("click", () => {
  chrome.storage.local.get(["P_URL", "p_aem"], ({ P_URL, p_aem }) => {
    chrome.tabs.create({ url: P_URL[p_aem] + P_URL.login });
  });
});

// ------------------------- input -------------------------

// set "p_url" var
INPUT_P_URL.addEventListener("input", () => {
  let url = INPUT_P_URL.value;

  url = setUrl(url);
  chrome.storage.local.set({ p_url: url });
});

// ------------------------- buttons -------------------------

BUTTON_P_EDITOR.addEventListener("click", () => {
  chrome.storage.local.get(["P_URL", "p_aem", "p_url"], ({ P_URL, p_aem, p_url }) => {
    chrome.tabs.create({ url: P_URL[p_aem] + P_URL.editor_s + p_url + P_URL.editor_e });
  });
});

BUTTON_P_EDITOR_OFF.addEventListener("click", () => {
  chrome.storage.local.get(["P_URL", "p_aem", "p_url"], ({ P_URL, p_aem, p_url }) => {
    chrome.tabs.create({ url: P_URL[p_aem] + P_URL.editor_off_s + p_url + P_URL.editor_off_e });
  });
});

BUTTON_P_LIVE_LOGIN.addEventListener("click", () => {
  chrome.storage.local.get("P_URL", ({ P_URL }) => {
    chrome.tabs.create({ url: P_URL.pre_prod_live + P_URL.pre_prod_live_login });
  });
});

BUTTON_P_LIVE.addEventListener("click", () => {
  chrome.storage.local.get(["P_URL", "p_aem", "p_url"], ({ P_URL, p_aem, p_url }) => {
    if (p_aem === "pre_prod_aem") {
      chrome.tabs.create({ url: P_URL.pre_prod_live + p_url + P_URL.live });
    } else {
      chrome.tabs.create({ url: P_URL.prod_live + p_url + P_URL.live });
    }
  });
});

BUTTON_P_SITES.addEventListener("click", () => {
  chrome.storage.local.get(["P_URL", "p_aem", "p_url"], ({ P_URL, p_aem, p_url }) => {
    chrome.tabs.create({ url: P_URL[p_aem] + P_URL.sites + p_url });
  });
});

BUTTON_P_ASSETS_LOCAL.addEventListener("click", () => {
  chrome.storage.local.get(["P_URL", "p_aem"], ({ P_URL, p_aem }) => {
    chrome.tabs.create({ url: P_URL[p_aem] + P_URL.assets_local });
  });
});

BUTTON_P_GRFALSE.addEventListener("click", () => {
  const query_1 = async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.storage.local.get(["P_URL"], ({ P_URL }) => {
      chrome.tabs.update({ url: tab.url + P_URL.grfalse });
    });

    window.close();
  }
  query_1();
});

// ------------------------- helpers -------------------------

const TOAST_P_AGE_GATE = document.querySelector("#toast_p_age_gate");

const setSelect = () => {
  const SELECT_1 = document.querySelector("#months-select");
  const SELECT_2 = document.querySelector("#years-select");

  if (SELECT_1 !== null && SELECT_2 !== null) {
    for (let option of Array.from(SELECT_1.options)) {
      if (option.value === "07") {
        option.selected = true;
      }
    }

    for (let option of Array.from(SELECT_2.options)) {
      if (option.value === "1992") {
        option.selected = true;
      }
    }
  }
}

// on popup ...
const query_2 = async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.storage.local.get("P_URL", ({ P_URL }) => {
    if (tab.url.includes(P_URL.pre_prod_live) || tab.url.includes(P_URL.prod_live)) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setSelect,
      });

      const TOAST = new bootstrap.Toast(TOAST_P_AGE_GATE);
      setTimeout(() => { TOAST.show(); }, 250);
    }
  });
}

chrome.storage.local.get("p_age_gate", ({ p_age_gate }) => {
  if (p_age_gate === true) {
    query_2();
  }
});

/*
 * ------------------------- utilities -------------------------
 */

const BUTTON_PASTE = document.querySelector("#button_paste");
const INPUT_TEXT = document.querySelector("#input_text");
const BUTTON_TO_LOWER_CASE = document.querySelector("#button_to_lower_case");
const BUTTON_TO_UPPER_CASE = document.querySelector("#button_to_upper_case");
const BUTTON_TO_TITLE_CASE = document.querySelector("#button_to_title_case");
const BUTTON_CUT = document.querySelector("#button_cut");
const BUTTON_COPY = document.querySelector("#button_copy");

BUTTON_PASTE.addEventListener("click", () => {
  INPUT_TEXT.focus();
  document.execCommand("paste");
});

BUTTON_TO_LOWER_CASE.addEventListener("click", () => {
  INPUT_TEXT.value = INPUT_TEXT.value.toLowerCase();
});

BUTTON_TO_UPPER_CASE.addEventListener("click", () => {
  INPUT_TEXT.value = INPUT_TEXT.value.toUpperCase();
});

BUTTON_TO_TITLE_CASE.addEventListener("click", () => {
  const VALUE = INPUT_TEXT.value.trim();
  let values = VALUE.split(" ");
  let text = "";

  for (let value of values) {
    text += value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() + " ";
  }

  INPUT_TEXT.value = text.trimEnd();
});

BUTTON_CUT.addEventListener("click", () => {
  INPUT_TEXT.select();
  document.execCommand("cut");
});

BUTTON_COPY.addEventListener("click", () => {
  INPUT_TEXT.select();
  document.execCommand("copy");
});

// ------------------------- tooltips -------------------------

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

// ------------------------- toasts -------------------------

var toastElList = [].slice.call(document.querySelectorAll('.toast'))
var toastList = toastElList.map(function (toastEl) {
  return new bootstrap.Toast(toastEl)
})
