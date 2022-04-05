/*
 * ------------------------- block1 -------------------------
 */

// const BLOCK1__BUTTON_IMAGES = document.querySelector("#block1__button_images") as HTMLButtonElement;

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
      files: [ "js/images.js" ],
    });

    window.close();
  }
  query_3();
});

// const BLOCK1__BUTTON_OPTIONS = document.querySelector("#block1__button_options") as HTMLButtonElement;

document.querySelector("#block1__button_options").addEventListener("click", () => {
  chrome.runtime.openOptionsPage();
});

/*
 * ------------------------- ... -------------------------
 */

const BLOCK2 = document.querySelector("#block2") as HTMLDivElement;
const BLOCK3 = document.querySelector("#block3") as HTMLDivElement;
const BLOCK4 = document.querySelector("#block4") as HTMLDivElement;

// @ts-ignore
const setLight = () => {
  document.documentElement.classList.add("light");
}

// @ts-ignore
const setDark = () => {
  document.documentElement.classList.add("dark");
}

// on popup ...
chrome.storage.local.get(["vis_s_aem", "vis_p_aem", "vis_utilities", "theme"], ({ vis_s_aem, vis_p_aem, vis_utilities, theme }) => {
  // ------------------------- visibility -------------------------

  if (vis_s_aem === false) {
    BLOCK2.classList.add("d-none");
  }

  if (vis_p_aem === false) {
    BLOCK3.classList.add("d-none");
  }

  if (vis_utilities === false) {
    BLOCK4.classList.add("d-none");
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
 * ------------------------- block2 -------------------------
 */

const BLOCK2__SELECT_AEM = document.querySelector("#block2__select_aem") as HTMLSelectElement;
// const BLOCK2__BUTTON_LOGIN = document.querySelector("#block2__button_login") as HTMLButtonElement;
const BLOCK2__INPUT_URL = document.querySelector("#block2__input_url") as HTMLInputElement;

// const BLOCK2__BUTTON_EDITOR = document.querySelector("#block2__button_editor") as HTMLButtonElement;
// const BLOCK2__BUTTON_PREVIEW = document.querySelector("#block2__button_preview") as HTMLButtonElement;
// const BLOCK2__BUTTON_QA = document.querySelector("#block2__button_qa") as HTMLButtonElement;
// const BLOCK2__BUTTON_LIVE = document.querySelector("#block2__button_live") as HTMLButtonElement;
// const BLOCK2__BUTTON_SITES = document.querySelector("#block2__button_sites") as HTMLButtonElement;
// const BLOCK2__BUTTON_ASSETS = document.querySelector("#block2__button_assets") as HTMLButtonElement;

const BLOCK2__BUTTON_TASK_MANAGEMENT = document.querySelector("#block2__button_task_management") as HTMLButtonElement;
// const BLOCK2__BUTTON_WORKFLOWS = document.querySelector("#block2__button_workflows") as HTMLButtonElement;
// const BLOCK2__BUTTON_PURGING = document.querySelector("#block2__button_purging") as HTMLButtonElement;
// const BLOCK2__BUTTON_PIM_B2C = document.querySelector("#block2__button_pim_b2c") as HTMLButtonElement;
// const BLOCK2__BUTTON_PIM_B2B = document.querySelector("#block2__button_pim_b2b") as HTMLButtonElement;

// on popup ...
chrome.storage.local.get(["s_aem", "s_url"], ({ s_aem, s_url }) => {
  for (let option of Array.from(BLOCK2__SELECT_AEM.options)) {
    if (option.value === s_aem) {
      option.selected = true;
    }
  }

  BLOCK2__INPUT_URL.placeholder = s_url;
  BLOCK2__INPUT_URL.value = s_url;
});

// ------------------------- select -------------------------

// on popup ...
const setSAttributes = () => {
  chrome.storage.local.get("s_aem", ({ s_aem }) => {
    if (s_aem === "p6_aem_ap" || s_aem === "p6_aem_eu" || s_aem === "p6_aem_us") {
      BLOCK2__BUTTON_TASK_MANAGEMENT.setAttribute("disabled", "");
    } else {
      BLOCK2__BUTTON_TASK_MANAGEMENT.removeAttribute("disabled");
    }
  });
}
setSAttributes();

// set "s_aem" var
BLOCK2__SELECT_AEM.addEventListener("change", () => {
  chrome.storage.local.set({ s_aem: BLOCK2__SELECT_AEM.selectedOptions[0].value });
  setSAttributes();
});

// ------------------------- button -------------------------

document.querySelector("#block2__button_login").addEventListener("click", () => {
  chrome.storage.local.get(["S_URL", "s_aem", "s_p5_login", "s_p6_login"], ({ S_URL, s_aem, s_p5_login, s_p6_login }) => {
    if (s_aem === "p5_aem" || s_aem === "p5_aem_eu" || s_aem === "p5_aem_eu_shop") {
      chrome.tabs.create({ url: S_URL[s_aem] + S_URL.p5_login + s_p5_login });
    } else {
      chrome.tabs.create({ url: S_URL[s_aem] + S_URL.p6_login + s_p6_login });
    }
  });
});

// ------------------------- input -------------------------

const setUrl = (url: string): string => {
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
BLOCK2__INPUT_URL.addEventListener("input", () => {
  let url: string = BLOCK2__INPUT_URL.value;

  url = setUrl(url);
  chrome.storage.local.set({ s_url: url });
});

// ------------------------- buttons -------------------------

document.querySelector("#block2__button_editor").addEventListener("click", () => {
  chrome.storage.local.get(["S_URL", "s_aem", "s_url"], ({ S_URL, s_aem, s_url }) => {
    chrome.tabs.create({ url: S_URL[s_aem] + S_URL.editor_s + s_url + S_URL.editor_e });
  });
});

document.querySelector("#block2__button_preview").addEventListener("click", () => {
  chrome.storage.local.get(["S_URL", "s_aem", "s_url"], ({ S_URL, s_aem, s_url }) => {
    chrome.tabs.create({ url: S_URL[s_aem] + S_URL.editor_off_s + s_url + S_URL.editor_off_e });
  });
});

document.querySelector("#block2__button_qa").addEventListener("click", () => {
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

document.querySelector("#block2__button_live").addEventListener("click", () => {
  chrome.storage.local.get(["S_URL", "s_url"], ({ S_URL, s_url }) => {
    chrome.tabs.create({ url: S_URL.live + s_url });
  });
});

document.querySelector("#block2__button_sites").addEventListener("click", () => {
  chrome.storage.local.get(["S_URL", "s_aem", "s_url"], ({ S_URL, s_aem, s_url }) => {
    chrome.tabs.create({ url: S_URL[s_aem] + S_URL.sites + s_url });
  });
});

document.querySelector("#block2__button_assets").addEventListener("click", () => {
  chrome.storage.local.get(["S_URL", "s_aem", "s_url"], ({ S_URL, s_aem, s_url }) => {
    chrome.tabs.create({ url: S_URL[s_aem] + S_URL.assets + s_url });
  });
});

BLOCK2__BUTTON_TASK_MANAGEMENT.addEventListener("click", () => {
  chrome.storage.local.get(["S_URL", "s_aem"], ({ S_URL, s_aem }) => {
    chrome.tabs.create({ url: S_URL[s_aem] + S_URL.p5_task_management });
  });
});

document.querySelector("#block2__button_workflows").addEventListener("click", () => {
  chrome.storage.local.get(["S_URL", "s_aem"], ({ S_URL, s_aem }) => {
    if (s_aem === "p5_aem" || s_aem === "p5_aem_eu" || s_aem === "p5_aem_eu_shop") {
      chrome.tabs.create({ url: S_URL[s_aem] + S_URL.p5_workflows });
    } else {
      chrome.tabs.create({ url: S_URL[s_aem] + S_URL.p6_workflows });
    }
  });
});

document.querySelector("#block2__button_purging").addEventListener("click", () => {
  chrome.storage.local.get(["S_URL", "s_aem"], ({ S_URL, s_aem }) => {
    if (s_aem === "p5_aem" || s_aem === "p5_aem_eu" || s_aem === "p5_aem_eu_shop") {
      chrome.tabs.create({ url: S_URL[s_aem] + S_URL.p5_purging });
    } else {
      chrome.tabs.create({ url: S_URL[s_aem] + S_URL.p6_purging });
    }
  });
});

document.querySelector("#block2__button_pim_b2c").addEventListener("click", () => {
  chrome.storage.local.get(["S_URL", "s_aem"], ({ S_URL, s_aem }) => {
    if (s_aem === "p5_aem" || s_aem === "p5_aem_eu" || s_aem === "p5_aem_eu_shop") {
      chrome.tabs.create({ url: S_URL[s_aem] + S_URL.p5_pim_b2c });
    } else {
      chrome.tabs.create({ url: S_URL[s_aem] + S_URL.p6_pim_b2c });
    }
  });
});

document.querySelector("#block2__button_pim_b2b").addEventListener("click", () => {
  chrome.storage.local.get(["S_URL", "s_aem"], ({ S_URL, s_aem }) => {
    if (s_aem === "p5_aem" || s_aem === "p5_aem_eu" || s_aem === "p5_aem_eu_shop") {
      chrome.tabs.create({ url: S_URL[s_aem] + S_URL.p5_pim_b2b });
    } else {
      chrome.tabs.create({ url: S_URL[s_aem] + S_URL.p6_pim_b2b });
    }
  });
});

/*
 * ------------------------- block3 -------------------------
 */

const BLOCK3__SELECT_AEM = document.querySelector("#block3__select_aem") as HTMLSelectElement;
// const BLOCK3__BUTTON_LOGIN = document.querySelector("#block3__button_login") as HTMLButtonElement;
const BLOCK3__SELECT_CONTENT = document.querySelector("#block3__select_content") as HTMLSelectElement;

const BLOCK3__INPUT_URL = document.querySelector("#block3__input_url") as HTMLInputElement;

// const BLOCK3__BUTTON_EDITOR = document.querySelector("#block3__button_editor") as HTMLButtonElement;
// const BLOCK3__BUTTON_PREVIEW = document.querySelector("#block3__button_preview") as HTMLButtonElement;
const BLOCK3__BUTTON_QA_LOGIN = document.querySelector("#block3__button_qa_login") as HTMLButtonElement;
// const BLOCK3__BUTTON_LIVE = document.querySelector("#block3__button_live") as HTMLButtonElement;
// const BLOCK3__BUTTON_SITES = document.querySelector("#block3__button_sites") as HTMLButtonElement;
// const BLOCK3__BUTTON_ASSETS = document.querySelector("#block3__button_assets") as HTMLButtonElement;

// const BLOCK3__BUTTON_GRFALSE = document.querySelector("#block3__button_grfalse") as HTMLButtonElement;
// const BLOCK3__BUTTON_AGE_GATE = document.querySelector("#block3__button_age_gate") as HTMLButtonElement;

// on popup ...
chrome.storage.local.get(["p_aem", "p_content", "p_url"], ({ p_aem, p_content, p_url }) => {
  for (let option of Array.from(BLOCK3__SELECT_AEM.options)) {
    if (option.value === p_aem) {
      option.selected = true;
    }
  }

  for (let option of Array.from(BLOCK3__SELECT_CONTENT.options)) {
    if (option.value === p_content) {
      option.selected = true;
    }
  }

  BLOCK3__INPUT_URL.placeholder = p_url;
  BLOCK3__INPUT_URL.value = p_url;
});

// ------------------------- select -------------------------

// on popup ...
const setPAttributes = () => {
  chrome.storage.local.get("p_aem", ({ p_aem }) => {
    if (p_aem === "prod_aem") {
      BLOCK2.classList.add("f-critical-background");
      BLOCK3__BUTTON_QA_LOGIN.setAttribute("disabled", "");
    } else {
      BLOCK2.classList.remove("f-critical-background");
      BLOCK3__BUTTON_QA_LOGIN.removeAttribute("disabled");
    }
  });
}
setPAttributes();

// set "p_aem" var
BLOCK3__SELECT_AEM.addEventListener("change", () => {
  chrome.storage.local.set({ p_aem: BLOCK3__SELECT_AEM.selectedOptions[0].value });
  setPAttributes();
});

// ------------------------- button -------------------------

document.querySelector("#block3__button_login").addEventListener("click", () => {
  chrome.storage.local.get(["P_URL", "p_aem"], ({ P_URL, p_aem }) => {
    chrome.tabs.create({ url: P_URL[p_aem] + P_URL.login });
  });
});

// ------------------------- select -------------------------

// set "p_content" var
BLOCK3__SELECT_CONTENT.addEventListener("change", () => {
  chrome.storage.local.set({ p_content: BLOCK3__SELECT_CONTENT.selectedOptions[0].value });
});

// ------------------------- input -------------------------

// set "p_url" var
BLOCK3__INPUT_URL.addEventListener("input", () => {
  let url: string = BLOCK3__INPUT_URL.value;

  url = setUrl(url);
  chrome.storage.local.set({ p_url: url });
});

// ------------------------- buttons -------------------------

document.querySelector("#block3__button_editor").addEventListener("click", () => {
  chrome.storage.local.get(["P_URL", "p_aem", "p_content", "p_url"], ({ P_URL, p_aem, p_content, p_url }) => {
    chrome.tabs.create({ url: P_URL[p_aem] + P_URL.editor_s + p_content + "/" + p_url + P_URL.editor_e });
  });
});

document.querySelector("#block3__button_preview").addEventListener("click", () => {
  chrome.storage.local.get(["P_URL", "p_aem", "p_content", "p_url"], ({ P_URL, p_aem, p_content, p_url }) => {
    chrome.tabs.create({ url: P_URL[p_aem] + P_URL.editor_off_s + p_content + "/" + p_url + P_URL.editor_off_e });
  });
});

BLOCK3__BUTTON_QA_LOGIN.addEventListener("click", () => {
  chrome.storage.local.get(["P_URL", "p_content"], ({ P_URL, p_content }) => {
    switch (p_content) {
      case "pmisite":
        chrome.tabs.create({ url: P_URL.pre_prod_qa + P_URL.pre_prod_qa_login });
        break;
      case "veevsite":
        chrome.tabs.create({ url: P_URL.pre_prod_veev_qa + P_URL.pre_prod_veev_qa_login });
        break;
      case "pmiclub":
        chrome.tabs.create({ url: P_URL.pre_prod_club_qa + P_URL.pre_prod_club_qa_login });
        break;
    }
  });
});

document.querySelector("#block3__button_live").addEventListener("click", () => {
  chrome.storage.local.get(["P_URL", "p_aem", "p_content", "p_url"], ({ P_URL, p_aem, p_content, p_url }) => {
    if (p_aem === "pre_prod_aem") {
      let pre_prod_url: string = "";

      switch (p_content) {
        case "pmisite": pre_prod_url = P_URL.pre_prod_qa; break;
        case "veevsite": pre_prod_url = P_URL.pre_prod_veev_qa; break;
        case "pmiclub": pre_prod_url = P_URL.pre_prod_club_qa; break;
      }

      chrome.tabs.create({ url: pre_prod_url + p_url + P_URL.live });
    } else {
      let prod_url: string = "";

      switch (p_content) {
        case "pmisite": prod_url = P_URL.prod_live; break;
        case "veevsite": prod_url = P_URL.prod_veev_live; break;
        case "pmiclub": prod_url = P_URL.prod_club_live; break;
      }

      chrome.tabs.create({ url: prod_url + p_url + P_URL.live });
    }
  });
});

document.querySelector("#block3__button_sites").addEventListener("click", () => {
  chrome.storage.local.get(["P_URL", "p_aem", "p_content", "p_url"], ({ P_URL, p_aem, p_content, p_url }) => {
    chrome.tabs.create({ url: P_URL[p_aem] + P_URL.sites + p_content + "/" + p_url });
  });
});

document.querySelector("#block3__button_assets").addEventListener("click", () => {
  chrome.storage.local.get(["P_URL", "p_aem", "p_url"], ({ P_URL, p_aem, p_url }) => {
    const URL: string = p_url.slice(0, 3);
    let country: string = "";

    switch (URL) {
      case "cr/": country = "/costa-rica"; break;
      case "cz/": country = "/czech-republic"; break;
      case "eg/": country = "/egypt"; break;
      case "fi/": country = "/finland"; break;
      case "fr/": country = "/france"; break;
      case "de/": country = "/germany"; break;
      case "id/": country = "/indonesia"; break;
      case "jp/": country = "/japan"; break;
      case "kg/": country = "/kyrgyzstan"; break;
      case "mv/": country = "/maldives"; break;
      case "ma/": country = "/morocountryo"; break;
      case "mx/": country = "/mx"; break;
      case "ph/": country = "/philippines"; break;
      case "pl/": country = "/poland"; break;
      case "pt/": country = "/portugal"; break;
      case "sk/": country = "/slovakia"; break;
      case "tw/": country = "/taiwan"; break;
      case "tn/": country = "/tunisia"; break;
      case "gb/": country = "/uk"; break;
      case "ae/": country = "/united-arab-emirates"; break;
      // case "/": country = "/vanuatu"; break;
      case "vn/": country = "/vietnam"; break;

      default:
        break;
    }

    chrome.tabs.create({ url: P_URL[p_aem] + P_URL.assets + country });
  });
});

document.querySelector("#block3__button_grfalse").addEventListener("click", () => {
  const query_1 = async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.storage.local.get(["P_URL"], ({ P_URL }) => {
      chrome.tabs.update({ url: tab.url + P_URL.grfalse });
    });

    window.close();
  }
  query_1();
});

const setSelect = () => {
  // pmisite & pmiclub
  const SPAN_1 = document.querySelector(".label-placeholder--month") as HTMLSpanElement;
  const SPAN_2 = document.querySelector(".label-placeholder--year") as HTMLSpanElement;
  const SELECT_1 = document.querySelector("#months-select") as HTMLSelectElement;
  const SELECT_2 = document.querySelector("#years-select") as HTMLSelectElement;

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
  const SELECT_3 = document.querySelector(".birth-month") as HTMLSelectElement;
  const SELECT_4 = document.querySelector(".birth-year") as HTMLSelectElement;

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
}

document.querySelector("#block3__button_age_gate").addEventListener("click", () => {
  const query_2 = async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setSelect,
    });

    window.close();
  }
  query_2();
});

/*
 * ------------------------- block4 -------------------------
 */

// const BLOCK4__BUTTON_PASTE = document.querySelector("#block4__button_paste") as HTMLButtonElement;
const BLOCK4__INPUT_TEXT = document.querySelector("#block4__input_text") as HTMLInputElement;
// const BLOCK4__BUTTON_TO_LOWER_CASE = document.querySelector("#block4__button_to_lower_case") as HTMLButtonElement;
// const BLOCK4__BUTTON_TO_UPPER_CASE = document.querySelector("#block4__button_to_upper_case") as HTMLButtonElement;
// const BLOCK4__BUTTON_TO_TITLE_CASE = document.querySelector("#block4__button_to_title_case") as HTMLButtonElement;
// const BLOCK4__BUTTON_CUT = document.querySelector("#block4__button_cut") as HTMLButtonElement;
// const BLOCK4__BUTTON_COPY = document.querySelector("#block4__button_copy") as HTMLButtonElement;

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
  const VALUE: string = BLOCK4__INPUT_TEXT.value.trim();
  let values: string[] = VALUE.split(" ");
  let text: string = "";

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

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  // @ts-ignore
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
