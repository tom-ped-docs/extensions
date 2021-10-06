const SELECT_AEM = document.querySelector("#select_aem");
const BUTTON_AEM_LOGIN = document.querySelector("#button_aem_login");
const INPUT_URL = document.querySelector("#input_url");

const BUTTON_EDITOR = document.querySelector("#button_editor");
const BUTTON_EDITOR_OFF = document.querySelector("#button_editor_off");
const BUTTON_QA = document.querySelector("#button_qa");
const BUTTON_LIVE = document.querySelector("#button_live");
const BUTTON_SITES = document.querySelector("#button_sites");
const BUTTON_ASSETS = document.querySelector("#button_assets");

const BUTTON_TASK_MANAGEMENT = document.querySelector("#button_task_management");
const BUTTON_WORKFLOWS = document.querySelector("#button_workflows");
const BUTTON_PURGING = document.querySelector("#button_purging");
const BUTTON_PIM_B2C = document.querySelector("#button_pim_b2c");
const BUTTON_PIM_B2B = document.querySelector("#button_pim_b2b");

/*
 * ------------------------- aem select -------------------------
 */

// set button disabled
const setButtonTaskManagementButtonPimB2bDisabled = () => {
  chrome.storage.local.get("selected_aem", ({ selected_aem }) => {
    if (selected_aem === "p6_aem_ap" || selected_aem === "p6_aem_eu" || selected_aem === "p6_aem_us") {
      BUTTON_TASK_MANAGEMENT.setAttribute("disabled", "");
      BUTTON_PIM_B2B.setAttribute("disabled", "");
    } else {
      BUTTON_TASK_MANAGEMENT.removeAttribute("disabled");
      BUTTON_PIM_B2B.removeAttribute("disabled");
    }
  });
}

// on popup set option selected & set button disabled
const setSelectAemSelected = () => {
  chrome.storage.local.get("selected_aem", ({ selected_aem }) => {
    for (let option of Array.from(SELECT_AEM.options)) {
      if (option.value === selected_aem) {
        option.selected = true;
      }
    }
  });

  setButtonTaskManagementButtonPimB2bDisabled();
}
setSelectAemSelected();

// on change set "selected_aem" var & set button disabled
SELECT_AEM.addEventListener("change", () => {
  chrome.storage.local.set({ selected_aem: SELECT_AEM.selectedOptions[0].value });

  setButtonTaskManagementButtonPimB2bDisabled();
});

/*
 * ------------------------- aem button -------------------------
 */

// on click set "aem_login" url & create new tab
BUTTON_AEM_LOGIN.addEventListener("click", () => {
  chrome.storage.local.get(["URL", "selected_aem"], ({ URL, selected_aem }) => {
    if (selected_aem === "p5_aem" || selected_aem === "p5_aem_eu" || selected_aem === "p5_aem_eu_shop") {
      createTabs(URL[selected_aem] + URL.p5_aem_login);
    } else {
      createTabs(URL[selected_aem] + URL.p6_aem_login);
    }
  });
});

/*
 * ------------------------- url input -------------------------
 */

// on popup set input placeholder & value
const setInputUrlPlaceholder = () => {
  chrome.storage.local.get("input_url", ({ input_url }) => {
    INPUT_URL.placeholder = input_url;
    INPUT_URL.value = input_url;
  });
}
setInputUrlPlaceholder();

// on input set "input_url" var
INPUT_URL.addEventListener("input", () => {
  let input_url = INPUT_URL.value.trim();
  if (input_url.startsWith("/")) {
    input_url = input_url.slice(1);
  }
  input_url = input_url.toLowerCase();
  chrome.storage.local.set({ input_url: input_url });
});

/*
 * ------------------------- url buttons -------------------------
 */

// create new tab
const createTabs = (url) => {
  chrome.tabs.create({ url: url });
}

// on click set "editor" url & create new tab
BUTTON_EDITOR.addEventListener("click", () => {
  chrome.storage.local.get(["URL", "selected_aem", "input_url"], ({ URL, selected_aem, input_url }) => {
    if (input_url.endsWith("/")) {
      const INPUT_URL = input_url.slice(0, input_url.length - 1);
      createTabs(URL[selected_aem] + URL.editor_start + INPUT_URL + URL.editor_end);
    } else {
      createTabs(URL[selected_aem] + URL.editor_start + input_url + URL.editor_end);
    }
  });
});

// on click set "editor_off" url & create new tab
BUTTON_EDITOR_OFF.addEventListener("click", () => {
  chrome.storage.local.get(["URL", "selected_aem", "input_url"], ({ URL, selected_aem, input_url }) => {
    if (input_url.endsWith("/")) {
      const INPUT_URL = input_url.slice(0, input_url.length - 1);
      createTabs(URL[selected_aem] + URL.editor_off_start + INPUT_URL + URL.editor_end + URL.editor_off_end);
    } else {
      createTabs(URL[selected_aem] + URL.editor_off_start + input_url + URL.editor_end + URL.editor_off_end);
    }
  });
});

// on click set "qa" url & create new tab
BUTTON_QA.addEventListener("click", () => {
  chrome.storage.local.get(["URL", "selected_aem", "input_url"], ({ URL, selected_aem, input_url }) => {
    if (selected_aem === "p5_aem" || selected_aem === "p5_aem_eu") {
      createTabs(URL.p5_qa + input_url);
    } else if (selected_aem === "p5_aem_eu_shop") {
      createTabs(URL.p5_qa_shop + input_url);
    } else {
      createTabs(URL.p6_qa + input_url);
    }
  });
});

// on click set "live" url & create new tab
BUTTON_LIVE.addEventListener("click", () => {
  chrome.storage.local.get(["URL", "input_url"], ({ URL, input_url }) => {
    createTabs(URL.live + input_url);
  });
});

// on click set "sites" url & create new tab
BUTTON_SITES.addEventListener("click", () => {
  chrome.storage.local.get(["URL", "selected_aem", "input_url"], ({ URL, selected_aem, input_url }) => {
    createTabs(URL[selected_aem] + URL.sites + input_url);
  });
});

// on click set "assets" url & create new tab
BUTTON_ASSETS.addEventListener("click", () => {
  chrome.storage.local.get(["URL", "selected_aem", "input_url"], ({ URL, selected_aem, input_url }) => {
    createTabs(URL[selected_aem] + URL.assets + input_url);
  });
});

/*
 * ------------------------- aem buttons -------------------------
 */

// on click set "task_management" url & create new tab, if disabled = false
BUTTON_TASK_MANAGEMENT.addEventListener("click", () => {
  chrome.storage.local.get(["URL", "selected_aem"], ({ URL, selected_aem }) => {
    createTabs(URL[selected_aem] + URL.p5_task_management);
  });
});

// on click set "workflows" url & create new tab
BUTTON_WORKFLOWS.addEventListener("click", () => {
  chrome.storage.local.get(["URL", "selected_aem"], ({ URL, selected_aem }) => {
    if (selected_aem === "p5_aem" || selected_aem === "p5_aem_eu" || selected_aem === "p5_aem_eu_shop") {
      createTabs(URL[selected_aem] + URL.p5_workflows);
    } else {
      createTabs(URL[selected_aem] + URL.p6_workflows);
    }
  });
});

// on click set "purging" url & create new tab
BUTTON_PURGING.addEventListener("click", () => {
  chrome.storage.local.get(["URL", "selected_aem"], ({ URL, selected_aem }) => {
    if (selected_aem === "p5_aem" || selected_aem === "p5_aem_eu" || selected_aem === "p5_aem_eu_shop") {
      createTabs(URL[selected_aem] + URL.p5_purging);
    } else {
      createTabs(URL[selected_aem] + URL.p6_purging);
    }
  });
});

// on click set "pim_b2c" url & create new tab
BUTTON_PIM_B2C.addEventListener("click", () => {
  chrome.storage.local.get(["URL", "selected_aem"], ({ URL, selected_aem }) => {
    if (selected_aem === "p5_aem" || selected_aem === "p5_aem_eu" || selected_aem === "p5_aem_eu_shop") {
      createTabs(URL[selected_aem] + URL.p5_pim_b2c);
    } else {
      createTabs(URL[selected_aem] + URL.p6_pim_b2c);
    }
  });
});

// on click set "pim_b2b" url & create new tab, if disabled = false
BUTTON_PIM_B2B.addEventListener("click", () => {
  chrome.storage.local.get(["URL", "selected_aem"], ({ URL, selected_aem }) => {
    createTabs(URL[selected_aem] + URL.p5_pim_b2b);
  });
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

/*
 * ------------------------- helpers -------------------------
 */

// set checkbox checked, if checkbox = true
const setCheckboxChecked = () => {
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

// on popup query tabs & set checkbox checked, if url = true
const queryTabs = async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.storage.local.get("URL", ({ URL }) => {
    if (tab.url.includes(URL.p5_workflows)) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setCheckboxChecked,
      });
    }
  });
}
// queryTabs();
