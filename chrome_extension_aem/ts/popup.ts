const SAMSUNG = document.querySelector("#samsung") as HTMLDivElement;
const IQOS = document.querySelector("#iqos") as HTMLDivElement;
const TOOLS = document.querySelector("#tools") as HTMLDivElement;

// on popup ...
chrome.storage.local.get(["is_aem_samsung_visible", "is_aem_iqos_visible", "is_tools_visible"], ({ is_aem_samsung_visible, is_aem_iqos_visible, is_tools_visible }) => {
  if (is_aem_samsung_visible === false) {
    SAMSUNG.style.display = "none";
  }

  if (is_aem_iqos_visible === false) {
    IQOS.style.display = "none";
  }

  if (is_tools_visible === false) {
    TOOLS.style.display = "none";
  }
});

/*
 * ------------------------- toolbar -------------------------
 */

document.querySelector("#toolbar__button-images").addEventListener("click", () => {
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
      files: [
        "js/set_theme.js",
        "js/images.js"
      ],
    });

    window.close();
  };
  query_3();
});

document.querySelector("#toolbar__button-options").addEventListener("click", () => {
  chrome.runtime.openOptionsPage();
});

document.querySelector("#toolbar__button-help").addEventListener("click", () => {
  chrome.tabs.create({ url: "/html/help.html" });
});

/*
 * ------------------------- aem (samsung) -------------------------
 */

const SAMSUNG__SELECT_AEM = document.querySelector("#samsung__select-aem") as HTMLSelectElement;
const SAMSUNG__INPUT_URL = document.querySelector("#samsung__input-url") as HTMLInputElement;
const SAMSUNG__BUTTON_TASK_MANAGEMENT = document.querySelector("#samsung__button-task-management") as HTMLButtonElement;

// on popup ...
chrome.storage.local.get(["selected_aem_samsung", "url_samsung"], ({ selected_aem_samsung, url_samsung }) => {
  for (let option of Array.from(SAMSUNG__SELECT_AEM.options)) {
    if (option.value === selected_aem_samsung) {
      option.selected = true;
    }
  }

  SAMSUNG__INPUT_URL.placeholder = url_samsung;
  SAMSUNG__INPUT_URL.value = url_samsung;
});

// ------------------------- select -------------------------

// on popup ...
const setAttributesSamsung = () => {
  chrome.storage.local.get("selected_aem_samsung", ({ selected_aem_samsung }) => {
    if (selected_aem_samsung === "p6_aem_ap" || selected_aem_samsung === "p6_aem_eu" || selected_aem_samsung === "p6_aem_us") {
      SAMSUNG__BUTTON_TASK_MANAGEMENT.setAttribute("disabled", "");
    } else {
      SAMSUNG__BUTTON_TASK_MANAGEMENT.removeAttribute("disabled");
    }
  });
};
setAttributesSamsung();

// set "selected_aem_samsung" var
SAMSUNG__SELECT_AEM.addEventListener("change", () => {
  chrome.storage.local.set({ selected_aem_samsung: SAMSUNG__SELECT_AEM.selectedOptions[0].value });
  setAttributesSamsung();
});

// ------------------------- button -------------------------

document.querySelector("#samsung__button-login").addEventListener("click", () => {
  chrome.storage.local.get(["URL_SAMSUNG", "selected_aem_samsung", "user_id", "user_email"], ({ URL_SAMSUNG, selected_aem_samsung, user_id, user_email }) => {
    if (selected_aem_samsung === "p5_aem" || selected_aem_samsung === "p5_aem_eu" || selected_aem_samsung === "p5_aem_eu_shop") {
      chrome.tabs.create({ url: URL_SAMSUNG[selected_aem_samsung] + URL_SAMSUNG.p5_login + user_id });
    } else {
      chrome.tabs.create({ url: URL_SAMSUNG[selected_aem_samsung] + URL_SAMSUNG.p6_login + user_email });
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
};

// set "url_samsung" var
SAMSUNG__INPUT_URL.addEventListener("input", () => {
  let url: string = SAMSUNG__INPUT_URL.value;

  url = setUrl(url);
  chrome.storage.local.set({ url_samsung: url });
});

// ------------------------- buttons -------------------------

document.querySelector("#samsung__button-editor").addEventListener("click", () => {
  chrome.storage.local.get(["URL_SAMSUNG", "selected_aem_samsung", "url_samsung"], ({ URL_SAMSUNG, selected_aem_samsung, url_samsung }) => {
    chrome.tabs.create({ url: URL_SAMSUNG[selected_aem_samsung] + URL_SAMSUNG.editor1 + url_samsung + URL_SAMSUNG.editor2 });
  });
});

document.querySelector("#samsung__button-preview").addEventListener("click", () => {
  chrome.storage.local.get(["URL_SAMSUNG", "selected_aem_samsung", "url_samsung"], ({ URL_SAMSUNG, selected_aem_samsung, url_samsung }) => {
    chrome.tabs.create({ url: URL_SAMSUNG[selected_aem_samsung] + URL_SAMSUNG.preview1 + url_samsung + URL_SAMSUNG.preview2 });
  });
});

document.querySelector("#samsung__button-qa").addEventListener("click", () => {
  chrome.storage.local.get(["URL_SAMSUNG", "selected_aem_samsung", "url_samsung"], ({ URL_SAMSUNG, selected_aem_samsung, url_samsung }) => {
    if (selected_aem_samsung === "p5_aem" || selected_aem_samsung === "p5_aem_eu") {
      chrome.tabs.create({ url: URL_SAMSUNG.p5_qa + url_samsung });
    } else if (selected_aem_samsung === "p5_aem_eu_shop") {
      chrome.tabs.create({ url: URL_SAMSUNG.p5_qa_shop + url_samsung });
    } else {
      chrome.tabs.create({ url: URL_SAMSUNG.p6_qa + url_samsung });
    }
  });
});

document.querySelector("#samsung__button-live").addEventListener("click", () => {
  chrome.storage.local.get(["URL_SAMSUNG", "url_samsung"], ({ URL_SAMSUNG, url_samsung }) => {
    chrome.tabs.create({ url: URL_SAMSUNG.live + url_samsung });
  });
});

document.querySelector("#samsung__button-sites").addEventListener("click", () => {
  chrome.storage.local.get(["URL_SAMSUNG", "selected_aem_samsung", "url_samsung"], ({ URL_SAMSUNG, selected_aem_samsung, url_samsung }) => {
    chrome.tabs.create({ url: URL_SAMSUNG[selected_aem_samsung] + URL_SAMSUNG.sites + url_samsung });
  });
});

document.querySelector("#samsung__button-assets").addEventListener("click", () => {
  chrome.storage.local.get(["URL_SAMSUNG", "selected_aem_samsung", "url_samsung"], ({ URL_SAMSUNG, selected_aem_samsung, url_samsung }) => {
    chrome.tabs.create({ url: URL_SAMSUNG[selected_aem_samsung] + URL_SAMSUNG.assets + url_samsung });
  });
});

SAMSUNG__BUTTON_TASK_MANAGEMENT.addEventListener("click", () => {
  chrome.storage.local.get(["URL_SAMSUNG", "selected_aem_samsung"], ({ URL_SAMSUNG, selected_aem_samsung }) => {
    chrome.tabs.create({ url: URL_SAMSUNG[selected_aem_samsung] + URL_SAMSUNG.p5_task_management });
  });
});

document.querySelector("#samsung__button-workflows").addEventListener("click", () => {
  chrome.storage.local.get(["URL_SAMSUNG", "selected_aem_samsung"], ({ URL_SAMSUNG, selected_aem_samsung }) => {
    if (selected_aem_samsung === "p5_aem" || selected_aem_samsung === "p5_aem_eu" || selected_aem_samsung === "p5_aem_eu_shop") {
      chrome.tabs.create({ url: URL_SAMSUNG[selected_aem_samsung] + URL_SAMSUNG.p5_workflows });
    } else {
      chrome.tabs.create({ url: URL_SAMSUNG[selected_aem_samsung] + URL_SAMSUNG.p6_workflows });
    }
  });
});

document.querySelector("#samsung__button-purging").addEventListener("click", () => {
  chrome.storage.local.get(["URL_SAMSUNG", "selected_aem_samsung"], ({ URL_SAMSUNG, selected_aem_samsung }) => {
    if (selected_aem_samsung === "p5_aem" || selected_aem_samsung === "p5_aem_eu" || selected_aem_samsung === "p5_aem_eu_shop") {
      chrome.tabs.create({ url: URL_SAMSUNG[selected_aem_samsung] + URL_SAMSUNG.p5_purging });
    } else {
      chrome.tabs.create({ url: URL_SAMSUNG[selected_aem_samsung] + URL_SAMSUNG.p6_purging });
    }
  });
});

document.querySelector("#samsung__button-pim-b2c").addEventListener("click", () => {
  chrome.storage.local.get(["URL_SAMSUNG", "selected_aem_samsung"], ({ URL_SAMSUNG, selected_aem_samsung }) => {
    if (selected_aem_samsung === "p5_aem" || selected_aem_samsung === "p5_aem_eu" || selected_aem_samsung === "p5_aem_eu_shop") {
      chrome.tabs.create({ url: URL_SAMSUNG[selected_aem_samsung] + URL_SAMSUNG.p5_pim_b2c });
    } else {
      chrome.tabs.create({ url: URL_SAMSUNG[selected_aem_samsung] + URL_SAMSUNG.p6_pim_b2c });
    }
  });
});

document.querySelector("#samsung__button-pim-b2b").addEventListener("click", () => {
  chrome.storage.local.get(["URL_SAMSUNG", "selected_aem_samsung"], ({ URL_SAMSUNG, selected_aem_samsung }) => {
    if (selected_aem_samsung === "p5_aem" || selected_aem_samsung === "p5_aem_eu" || selected_aem_samsung === "p5_aem_eu_shop") {
      chrome.tabs.create({ url: URL_SAMSUNG[selected_aem_samsung] + URL_SAMSUNG.p5_pim_b2b });
    } else {
      chrome.tabs.create({ url: URL_SAMSUNG[selected_aem_samsung] + URL_SAMSUNG.p6_pim_b2b });
    }
  });
});

/*
 * ------------------------- aem (iqos) -------------------------
 */

const IQOS__SELECT_AEM = document.querySelector("#iqos__select-aem") as HTMLSelectElement;
const IQOS__SELECT_SITE = document.querySelector("#iqos__select-site") as HTMLSelectElement;
const IQOS__INPUT_URL = document.querySelector("#iqos__input-url") as HTMLInputElement;
const IQOS__BUTTON_QA_LOGIN = document.querySelector("#iqos__button-qa-login") as HTMLButtonElement;

// on popup ...
chrome.storage.local.get(["selected_aem_iqos", "selected_site", "url_iqos"], ({ selected_aem_iqos, selected_site, url_iqos }) => {
  for (let option of Array.from(IQOS__SELECT_AEM.options)) {
    if (option.value === selected_aem_iqos) {
      option.selected = true;
    }
  }

  for (let option of Array.from(IQOS__SELECT_SITE.options)) {
    if (option.value === selected_site) {
      option.selected = true;
    }
  }

  IQOS__INPUT_URL.placeholder = url_iqos;
  IQOS__INPUT_URL.value = url_iqos;
});

// ------------------------- select -------------------------

// on popup ...
const setAttributesIqos = () => {
  chrome.storage.local.get("selected_aem_iqos", ({ selected_aem_iqos }) => {
    if (selected_aem_iqos === "prod_aem") {
      IQOS.classList.add("aem--critical");
      IQOS__BUTTON_QA_LOGIN.setAttribute("disabled", "");
    } else {
      IQOS.classList.remove("aem--critical");
      IQOS__BUTTON_QA_LOGIN.removeAttribute("disabled");
    }
  });
};
setAttributesIqos();

// set "selected_aem_iqos" var
IQOS__SELECT_AEM.addEventListener("change", () => {
  chrome.storage.local.set({ selected_aem_iqos: IQOS__SELECT_AEM.selectedOptions[0].value });
  setAttributesIqos();
});

// ------------------------- button -------------------------

document.querySelector("#iqos__button-login").addEventListener("click", () => {
  chrome.storage.local.get(["URL_IQOS", "selected_aem_iqos"], ({ URL_IQOS, selected_aem_iqos }) => {
    chrome.tabs.create({ url: URL_IQOS[selected_aem_iqos] + URL_IQOS.login });
  });
});

// ------------------------- select -------------------------

// set "selected_site" var
IQOS__SELECT_SITE.addEventListener("change", () => {
  chrome.storage.local.set({ selected_site: IQOS__SELECT_SITE.selectedOptions[0].value });
});

// ------------------------- input -------------------------

// set "url_iqos" var
IQOS__INPUT_URL.addEventListener("input", () => {
  let url: string = IQOS__INPUT_URL.value;

  url = setUrl(url);
  chrome.storage.local.set({ url_iqos: url });
});

// ------------------------- buttons -------------------------

document.querySelector("#iqos__button-editor").addEventListener("click", () => {
  chrome.storage.local.get(["URL_IQOS", "selected_aem_iqos", "selected_site", "url_iqos"], ({ URL_IQOS, selected_aem_iqos, selected_site, url_iqos }) => {
    chrome.tabs.create({ url: URL_IQOS[selected_aem_iqos] + URL_IQOS.editor1 + selected_site + "/" + url_iqos + URL_IQOS.editor2 });
  });
});

document.querySelector("#iqos__button-preview").addEventListener("click", () => {
  chrome.storage.local.get(["URL_IQOS", "selected_aem_iqos", "selected_site", "url_iqos"], ({ URL_IQOS, selected_aem_iqos, selected_site, url_iqos }) => {
    chrome.tabs.create({ url: URL_IQOS[selected_aem_iqos] + URL_IQOS.preview1 + selected_site + "/" + url_iqos + URL_IQOS.preview2 });
  });
});

IQOS__BUTTON_QA_LOGIN.addEventListener("click", () => {
  chrome.storage.local.get(["URL_IQOS", "selected_site"], ({ URL_IQOS, selected_site }) => {
    let pre_prod_url: string = "";

    switch (selected_site) {
      case "pmisite":
        pre_prod_url = URL_IQOS.pre_prod_qa + URL_IQOS.pre_prod_qa_login;
        break;
      case "veevsite":
        pre_prod_url = URL_IQOS.pre_prod_veev_qa + URL_IQOS.pre_prod_veev_qa_login;
        break;
      case "pmiclub":
        pre_prod_url = URL_IQOS.pre_prod_club_qa + URL_IQOS.pre_prod_club_qa_login;
        break;
    }

    chrome.tabs.create({ url: pre_prod_url });
  });
});

document.querySelector("#iqos__button-live").addEventListener("click", () => {
  chrome.storage.local.get(["URL_IQOS", "selected_aem_iqos", "selected_site", "url_iqos"], ({ URL_IQOS, selected_aem_iqos, selected_site, url_iqos }) => {
    if (selected_aem_iqos === "pre_prod_aem") {
      let pre_prod_url: string = "";

      switch (selected_site) {
        case "pmisite":
          pre_prod_url = URL_IQOS.pre_prod_qa;
          break;
        case "veevsite":
          pre_prod_url = URL_IQOS.pre_prod_veev_qa;
          break;
        case "pmiclub":
          pre_prod_url = URL_IQOS.pre_prod_club_qa;
          break;
      }

      chrome.tabs.create({ url: pre_prod_url + url_iqos + URL_IQOS.live });
    } else {
      let prod_url: string = "";

      switch (selected_site) {
        case "pmisite":
          prod_url = URL_IQOS.prod_live;
          break;
        case "veevsite":
          prod_url = URL_IQOS.prod_veev_live;
          break;
        case "pmiclub":
          prod_url = URL_IQOS.prod_club_live;
          break;
      }

      chrome.tabs.create({ url: prod_url + url_iqos + URL_IQOS.live });
    }
  });
});

document.querySelector("#iqos__button-sites").addEventListener("click", () => {
  chrome.storage.local.get(["URL_IQOS", "selected_aem_iqos", "selected_site", "url_iqos"], ({ URL_IQOS, selected_aem_iqos, selected_site, url_iqos }) => {
    chrome.tabs.create({ url: URL_IQOS[selected_aem_iqos] + URL_IQOS.sites + selected_site + "/" + url_iqos });
  });
});

document.querySelector("#iqos__button-assets").addEventListener("click", () => {
  chrome.storage.local.get(["URL_IQOS", "selected_aem_iqos", "url_iqos", "COUNTRIES_IQOS"], ({ URL_IQOS, selected_aem_iqos, url_iqos, COUNTRIES_IQOS }) => {
    let url: string = url_iqos.slice(0, 3);
    let assets_url: string = URL_IQOS[selected_aem_iqos] + URL_IQOS.assets;

    if (url[2] === "/") {
      url = url.slice(0, 2);

      if (COUNTRIES_IQOS[url]) {
        assets_url = assets_url + "/" + COUNTRIES_IQOS[url];
      }
    }

    chrome.tabs.create({ url: assets_url });
  });
});

document.querySelector("#iqos__button-grfalse").addEventListener("click", () => {
  const query_1 = async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.storage.local.get(["URL_IQOS"], ({ URL_IQOS }) => {
      chrome.tabs.update({ url: tab.url + URL_IQOS.grfalse });
    });

    window.close();
  };
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
};

document.querySelector("#iqos__button-age-gate").addEventListener("click", () => {
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

document.querySelector("#iqos__button-hybris").addEventListener("click", () => {
  chrome.storage.local.get(["URL_IQOS", "selected_aem_iqos"], ({ URL_IQOS, selected_aem_iqos }) => {
    if (selected_aem_iqos === "pre_prod_aem") {
      chrome.tabs.create({ url: URL_IQOS.pre_prod_hybris });
    } else {
      chrome.tabs.create({ url: URL_IQOS.prod_hybris });
    }
  });
});

/*
 * ------------------------- tools -------------------------
 */

const TOOLS__INPUT_TEXT = document.querySelector("#tools__input-text") as HTMLInputElement;

document.querySelector("#tools__button-paste").addEventListener("click", () => {
  TOOLS__INPUT_TEXT.focus();
  document.execCommand("paste");
});

document.querySelector("#tools__button-to-lower-case").addEventListener("click", () => {
  TOOLS__INPUT_TEXT.value = TOOLS__INPUT_TEXT.value.toLowerCase();
});

document.querySelector("#tools__button-to-upper-case").addEventListener("click", () => {
  TOOLS__INPUT_TEXT.value = TOOLS__INPUT_TEXT.value.toUpperCase();
});

document.querySelector("#tools__button-to-title-case").addEventListener("click", () => {
  const VALUE: string = TOOLS__INPUT_TEXT.value.trim();
  let values: string[] = VALUE.split(" ");
  let text: string = "";

  for (let value of values) {
    text += value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() + " ";
  }

  TOOLS__INPUT_TEXT.value = text.trimEnd();
});

document.querySelector("#tools__button-cut").addEventListener("click", () => {
  TOOLS__INPUT_TEXT.select();
  document.execCommand("cut");
});

document.querySelector("#tools__button-copy").addEventListener("click", () => {
  TOOLS__INPUT_TEXT.select();
  document.execCommand("copy");
});

// ------------------------- tooltips -------------------------

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  // @ts-ignore
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
