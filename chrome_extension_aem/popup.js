/*
 * ------------------------- options -------------------------
 */

const BUTTON_OPTIONS = document.querySelector("#button_options");

BUTTON_OPTIONS.addEventListener("click", () => {
  chrome.runtime.openOptionsPage();
});

const S_DIV_AEM = document.querySelector("#s_div_aem");
const PMI_DIV_AEM = document.querySelector("#pmi_div_aem");
const DIV_UTILITIES = document.querySelector("#div_utilities");

const setLight = () => {
  document.documentElement.classList.remove("dark");
  document.documentElement.classList.add("light");
}

const setDark = () => {
  document.documentElement.classList.remove("light");
  document.documentElement.classList.add("dark");
}

// on popup ...
const setThemes = () => {
  chrome.storage.local.get(["s_display_aem", "pmi_display_aem", "display_utilities", "selected_theme"], ({ s_display_aem, pmi_display_aem, display_utilities, selected_theme }) => {
    if (s_display_aem === false) {
      S_DIV_AEM.classList.add("d-none");
    }
    if (pmi_display_aem === false) {
      PMI_DIV_AEM.classList.add("d-none");
    }
    if (display_utilities === false) {
      DIV_UTILITIES.classList.add("d-none");
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

/*
 * ------------------------- samsung aem -------------------------
 */

const S_SELECT_AEM = document.querySelector("#s_select_aem");
const S_BUTTON_LOGIN = document.querySelector("#s_button_login");
const S_INPUT_URL = document.querySelector("#s_input_url");

const S_BUTTON_EDITOR = document.querySelector("#s_button_editor");
const S_BUTTON_EDITOR_OFF = document.querySelector("#s_button_editor_off");
const S_BUTTON_QA = document.querySelector("#s_button_qa");
const S_BUTTON_LIVE = document.querySelector("#s_button_live");
const S_BUTTON_SITES = document.querySelector("#s_button_sites");
const S_BUTTON_ASSETS = document.querySelector("#s_button_assets");

const S_BUTTON_TASK_MANAGEMENT = document.querySelector("#s_button_task_management");
const S_BUTTON_WORKFLOWS = document.querySelector("#s_button_workflows");
const S_BUTTON_PURGING = document.querySelector("#s_button_purging");
const S_BUTTON_PIM_B2C = document.querySelector("#s_button_pim_b2c");
const S_BUTTON_PIM_B2B = document.querySelector("#s_button_pim_b2b");

const setSAttributes = () => {
  chrome.storage.local.get("s_selected_aem", ({ s_selected_aem }) => {
    if (s_selected_aem === "p6_aem_ap" || s_selected_aem === "p6_aem_eu" || s_selected_aem === "p6_aem_us") {
      S_BUTTON_TASK_MANAGEMENT.setAttribute("disabled", "");
    } else {
      S_BUTTON_TASK_MANAGEMENT.removeAttribute("disabled");
    }
  });
}

// on popup ...
const setSAem = () => {
  chrome.storage.local.get(["s_selected_aem", "s_input_url"], ({ s_selected_aem, s_input_url }) => {
    for (let option of Array.from(S_SELECT_AEM.options)) {
      if (option.value === s_selected_aem) {
        option.selected = true;
      }
    }

    S_INPUT_URL.placeholder = s_input_url;
    S_INPUT_URL.value = s_input_url;
  });

  setSAttributes();
}
setSAem();

// ------------------------- samsung aem select -------------------------

// set "s_selected_aem" var
S_SELECT_AEM.addEventListener("change", () => {
  chrome.storage.local.set({ s_selected_aem: S_SELECT_AEM.selectedOptions[0].value });

  setSAttributes();
});

// ------------------------- samsung aem button -------------------------

const createTabs = (url) => {
  chrome.tabs.create({ url: url });
}

S_BUTTON_LOGIN.addEventListener("click", () => {
  chrome.storage.local.get(["S_URL", "s_p5_login", "s_p6_login", "s_selected_aem"], ({ S_URL, s_p5_login, s_p6_login, s_selected_aem }) => {
    if (s_selected_aem === "p5_aem" || s_selected_aem === "p5_aem_eu" || s_selected_aem === "p5_aem_eu_shop") {
      createTabs(S_URL[s_selected_aem] + S_URL.p5_login_start + s_p5_login);
    } else {
      createTabs(S_URL[s_selected_aem] + S_URL.p6_login_start + s_p6_login);
    }
  });
});

// ------------------------- samsung url input -------------------------

const setInputUrl = (input_url) => {
  input_url = input_url.trim();

  if (input_url.startsWith("/")) {
    input_url = input_url.slice(1);
  }

  if (input_url.endsWith("/")) {
    input_url = input_url.slice(0, input_url.length - 1);
  }

  if (input_url.endsWith("?gr=false")) {
    input_url = input_url.slice(0, input_url.length - 9);
  }

  if (input_url.endsWith("?wcmmode=disabled")) {
    input_url = input_url.slice(0, input_url.length - 17);
  }

  if (input_url.endsWith(".html")) {
    input_url = input_url.slice(0, input_url.length - 5);
  }

  input_url = input_url.toLowerCase();
  return input_url;
}

// set "s_input_url" var
S_INPUT_URL.addEventListener("input", () => {
  let input_url = S_INPUT_URL.value;
  input_url = setInputUrl(input_url);
  chrome.storage.local.set({ s_input_url: input_url });
});

// ------------------------- samsung url buttons -------------------------

S_BUTTON_EDITOR.addEventListener("click", () => {
  chrome.storage.local.get(["S_URL", "s_selected_aem", "s_input_url"], ({ S_URL, s_selected_aem, s_input_url }) => {
    createTabs(S_URL[s_selected_aem] + S_URL.editor_start + s_input_url + S_URL.editor_end);
  });
});

S_BUTTON_EDITOR_OFF.addEventListener("click", () => {
  chrome.storage.local.get(["S_URL", "s_selected_aem", "s_input_url"], ({ S_URL, s_selected_aem, s_input_url }) => {
    createTabs(S_URL[s_selected_aem] + S_URL.editor_off_start + s_input_url + S_URL.editor_end + S_URL.editor_off_end);
  });
});

S_BUTTON_QA.addEventListener("click", () => {
  chrome.storage.local.get(["S_URL", "s_selected_aem", "s_input_url"], ({ S_URL, s_selected_aem, s_input_url }) => {
    if (s_selected_aem === "p5_aem" || s_selected_aem === "p5_aem_eu") {
      createTabs(S_URL.p5_qa + s_input_url);
    } else if (s_selected_aem === "p5_aem_eu_shop") {
      createTabs(S_URL.p5_qa_shop + s_input_url);
    } else {
      createTabs(S_URL.p6_qa + s_input_url);
    }
  });
});

S_BUTTON_LIVE.addEventListener("click", () => {
  chrome.storage.local.get(["S_URL", "s_input_url"], ({ S_URL, s_input_url }) => {
    createTabs(S_URL.live + s_input_url);
  });
});

S_BUTTON_SITES.addEventListener("click", () => {
  chrome.storage.local.get(["S_URL", "s_selected_aem", "s_input_url"], ({ S_URL, s_selected_aem, s_input_url }) => {
    createTabs(S_URL[s_selected_aem] + S_URL.sites + s_input_url);
  });
});

S_BUTTON_ASSETS.addEventListener("click", () => {
  chrome.storage.local.get(["S_URL", "s_selected_aem", "s_input_url"], ({ S_URL, s_selected_aem, s_input_url }) => {
    createTabs(S_URL[s_selected_aem] + S_URL.assets + s_input_url);
  });
});

// ------------------------- samsung aem buttons -------------------------

S_BUTTON_TASK_MANAGEMENT.addEventListener("click", () => {
  chrome.storage.local.get(["S_URL", "s_selected_aem"], ({ S_URL, s_selected_aem }) => {
    createTabs(S_URL[s_selected_aem] + S_URL.p5_task_management);
  });
});

S_BUTTON_WORKFLOWS.addEventListener("click", () => {
  chrome.storage.local.get(["S_URL", "s_selected_aem"], ({ S_URL, s_selected_aem }) => {
    if (s_selected_aem === "p5_aem" || s_selected_aem === "p5_aem_eu" || s_selected_aem === "p5_aem_eu_shop") {
      createTabs(S_URL[s_selected_aem] + S_URL.p5_workflows);
    } else {
      createTabs(S_URL[s_selected_aem] + S_URL.p6_workflows);
    }
  });
});

S_BUTTON_PURGING.addEventListener("click", () => {
  chrome.storage.local.get(["S_URL", "s_selected_aem"], ({ S_URL, s_selected_aem }) => {
    if (s_selected_aem === "p5_aem" || s_selected_aem === "p5_aem_eu" || s_selected_aem === "p5_aem_eu_shop") {
      createTabs(S_URL[s_selected_aem] + S_URL.p5_purging);
    } else {
      createTabs(S_URL[s_selected_aem] + S_URL.p6_purging);
    }
  });
});

S_BUTTON_PIM_B2C.addEventListener("click", () => {
  chrome.storage.local.get(["S_URL", "s_selected_aem"], ({ S_URL, s_selected_aem }) => {
    if (s_selected_aem === "p5_aem" || s_selected_aem === "p5_aem_eu" || s_selected_aem === "p5_aem_eu_shop") {
      createTabs(S_URL[s_selected_aem] + S_URL.p5_pim_b2c);
    } else {
      createTabs(S_URL[s_selected_aem] + S_URL.p6_pim_b2c);
    }
  });
});

S_BUTTON_PIM_B2B.addEventListener("click", () => {
  chrome.storage.local.get(["S_URL", "s_selected_aem"], ({ S_URL, s_selected_aem }) => {
    if (s_selected_aem === "p5_aem" || s_selected_aem === "p5_aem_eu" || s_selected_aem === "p5_aem_eu_shop") {
      createTabs(S_URL[s_selected_aem] + S_URL.p5_pim_b2b);
    } else {
      createTabs(S_URL[s_selected_aem] + S_URL.p6_pim_b2b);
    }
  });
});

// ------------------------- samsung helpers -------------------------

const setInputCheckbox = () => {
  const INPUT_CHECKBOX_1 = document.querySelector("#selfCheck1");
  const INPUT_CHECKBOX_2 = document.querySelector("#selfCheck2");
  const INPUT_CHECKBOX_3 = document.querySelector("#selfCheck3");
  const INPUT_CHECKBOX_4 = document.querySelector("#selfCheck4");

  if (INPUT_CHECKBOX_1 !== null && INPUT_CHECKBOX_2 !== null && INPUT_CHECKBOX_3 !== null && INPUT_CHECKBOX_4 !== null) {
    INPUT_CHECKBOX_1.checked = true;
    INPUT_CHECKBOX_2.checked = true;
    INPUT_CHECKBOX_3.checked = true;
    INPUT_CHECKBOX_4.checked = true;
  }
}

// on popup ...
const queryTabs = async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.storage.local.get("S_URL", ({ S_URL }) => {
    if (tab.url.includes(S_URL.p5_workflows)) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setInputCheckbox,
      });
    }
  });
}
// queryTabs();

/*
 * ------------------------- pmi aem -------------------------
 */

const PMI_SELECT_AEM = document.querySelector("#pmi_select_aem");
const PMI_BUTTON_LOGIN = document.querySelector("#pmi_button_login");
const PMI_INPUT_URL = document.querySelector("#pmi_input_url");

const PMI_BUTTON_EDITOR = document.querySelector("#pmi_button_editor");
const PMI_BUTTON_EDITOR_OFF = document.querySelector("#pmi_button_editor_off");
const PMI_BUTTON_LIVE_LOGIN = document.querySelector("#pmi_button_live_login");
const PMI_BUTTON_LIVE = document.querySelector("#pmi_button_live");
const PMI_BUTTON_SITES = document.querySelector("#pmi_button_sites");
const PMI_BUTTON_ASSETS = document.querySelector("#pmi_button_assets");
const PMI_BUTTON_GRFALSE = document.querySelector("#pmi_button_grfalse");

const setPmiAttributes = () => {
  chrome.storage.local.get("pmi_selected_aem", ({ pmi_selected_aem }) => {
    if (pmi_selected_aem === "prod_aem") {
      PMI_DIV_AEM.classList.add("f-critical-background");
      PMI_BUTTON_LIVE_LOGIN.setAttribute("disabled", "");
    } else {
      PMI_DIV_AEM.classList.remove("f-critical-background");
      PMI_BUTTON_LIVE_LOGIN.removeAttribute("disabled");
    }
  });
}

// on popup ...
const setPmiAem = () => {
  chrome.storage.local.get(["pmi_selected_aem", "pmi_input_url"], ({ pmi_selected_aem, pmi_input_url }) => {
    for (let option of Array.from(PMI_SELECT_AEM.options)) {
      if (option.value === pmi_selected_aem) {
        option.selected = true;
      }
    }

    PMI_INPUT_URL.placeholder = pmi_input_url;
    PMI_INPUT_URL.value = pmi_input_url;
  });

  setPmiAttributes();
}
setPmiAem();

// ------------------------- pmi aem select -------------------------

// set "pmi_selected_aem" var
PMI_SELECT_AEM.addEventListener("change", () => {
  chrome.storage.local.set({ pmi_selected_aem: PMI_SELECT_AEM.selectedOptions[0].value });

  setPmiAttributes();
});

// ------------------------- pmi aem button -------------------------

PMI_BUTTON_LOGIN.addEventListener("click", () => {
  chrome.storage.local.get(["PMI_URL", "pmi_selected_aem"], ({ PMI_URL, pmi_selected_aem }) => {
    createTabs(PMI_URL[pmi_selected_aem] + PMI_URL.login);
  });
});

// ------------------------- pmi url input -------------------------

// set "pmi_input_url" var
PMI_INPUT_URL.addEventListener("input", () => {
  let input_url = PMI_INPUT_URL.value;
  input_url = setInputUrl(input_url);
  chrome.storage.local.set({ pmi_input_url: input_url });
});

// ------------------------- pmi url buttons -------------------------

PMI_BUTTON_EDITOR.addEventListener("click", () => {
  chrome.storage.local.get(["PMI_URL", "pmi_selected_aem", "pmi_input_url"], ({ PMI_URL, pmi_selected_aem, pmi_input_url }) => {
    createTabs(PMI_URL[pmi_selected_aem] + PMI_URL.editor_start + pmi_input_url + PMI_URL.editor_end);
  });
});

PMI_BUTTON_EDITOR_OFF.addEventListener("click", () => {
  chrome.storage.local.get(["PMI_URL", "pmi_selected_aem", "pmi_input_url"], ({ PMI_URL, pmi_selected_aem, pmi_input_url }) => {
    createTabs(PMI_URL[pmi_selected_aem] + PMI_URL.editor_off_start + pmi_input_url + PMI_URL.editor_end + PMI_URL.editor_off_end);
  });
});

PMI_BUTTON_LIVE_LOGIN.addEventListener("click", () => {
  chrome.storage.local.get("PMI_URL", ({ PMI_URL }) => {
    createTabs(PMI_URL.pre_prod_live + PMI_URL.pre_prod_live_login);
  });
});

PMI_BUTTON_LIVE.addEventListener("click", () => {
  chrome.storage.local.get(["PMI_URL", "pmi_selected_aem", "pmi_input_url"], ({ PMI_URL, pmi_selected_aem, pmi_input_url }) => {
    if (pmi_selected_aem === "pre_prod_aem") {
      createTabs(PMI_URL.pre_prod_live + pmi_input_url + PMI_URL.live);
    } else {
      createTabs(PMI_URL.prod_live + pmi_input_url + PMI_URL.live);
    }
  });
});

PMI_BUTTON_SITES.addEventListener("click", () => {
  chrome.storage.local.get(["PMI_URL", "pmi_selected_aem", "pmi_input_url"], ({ PMI_URL, pmi_selected_aem, pmi_input_url }) => {
    createTabs(PMI_URL[pmi_selected_aem] + PMI_URL.sites + pmi_input_url);
  });
});

PMI_BUTTON_ASSETS.addEventListener("click", () => {
  chrome.storage.local.get(["PMI_URL", "pmi_selected_aem"], ({ PMI_URL, pmi_selected_aem }) => {
    createTabs(PMI_URL[pmi_selected_aem] + PMI_URL.assets);
  });
});

PMI_BUTTON_GRFALSE.addEventListener("click", () => {
  const updateTabs = async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.tabs.update({ url: tab.url + "?gr=false" });
  }
  updateTabs();
});

/*
 * ------------------------- utilities -------------------------
 */

const BUTTON_PASTE = document.querySelector("#button_paste");
const INPUT_TEXT = document.querySelector("#input_text");
const BUTTON_TO_LOWER_CASE = document.querySelector("#button_to_lower_case");
const BUTTON_TO_UPPER_CASE = document.querySelector("#button_to_upper_case");
const BUTTON_COPY = document.querySelector("#button_copy");
const BUTTON_CUT = document.querySelector("#button_cut");

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

BUTTON_CUT.addEventListener("click", () => {
  INPUT_TEXT.select();
  document.execCommand("cut");
});

BUTTON_COPY.addEventListener("click", () => {
  INPUT_TEXT.select();
  document.execCommand("copy");
});
