/*
 * ------------------------- samsung aem -------------------------
 */

const S_URL = {
  p5_aem:             "https://aem.samsung.com/",
  p5_aem_eu:          "https://aem-eu.samsung.com/",
  p5_aem_eu_shop:     "https://aem-eu-shop.samsung.com/",
  p5_login_start:     "aemapi/user/login_sso?s_user_id=",
  p5_login_reset:     "542b562d2e9g30fgcg6b6422101b6e2d95333a3f2e3e49",
  p5_qa:              "https://qaweb.samsung.com/",
  p5_qa_shop:         "https://qaweb-shop.samsung.com/",
  p5_task_management: "aem/taskmanagement",
  p5_workflows:       "notifications.html",
  p5_purging:         "aem/pim/setting/cdnpurge/forwardCDNpurgReq",
  p5_pim_b2c:         "aem/pim/b2c/product/main/forwardProductFamilyList",
  p5_pim_b2b:         "aem/bim/b2b/product/main/forwardProductFamilyList",
  p6_aem_ap:          "https://p6-ap-author.samsung.com/",
  p6_aem_eu:          "https://p6-eu-author.samsung.com/",
  p6_aem_us:          "https://p6-us-author.samsung.com/",
  p6_login_start:     "aemapi/user/login_sso?s_user_email=",
  p6_login_reset:     "pedzich.t@samsung.com",
  p6_qa:              "https://p6-qa.samsung.com/",
  p6_workflows:       "aem/inbox",
  p6_purging:         "aem/pim/global/setting/cdnpurging/page/purgerequest/info",
  p6_pim_b2c:         "aem/pim/b2c/product/detail/main/page/list",
  p6_pim_b2b:         "aem/bim/b2b/product/detail/main/page/list",
  editor_start:       "editor.html/content/samsung/",
  editor_end:         ".html",
  editor_off_start:   "content/samsung/",
  editor_off_end:     "?wcmmode=disabled",
  live:               "https://www.samsung.com/",
  sites:              "sites.html/content/samsung/",
  assets:             "assets.html/content/dam/samsung/"
}

let s_p5_login = "542b562d2e9g30fgcg6b6422101b6e2d95333a3f2e3e49";
let s_p6_login = "pedzich.t@samsung.com";

let s_selected_aem = "p5_aem_eu_shop";
let s_input_url = "pl";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ S_URL });
  chrome.storage.local.set({ s_p5_login });
  chrome.storage.local.set({ s_p6_login });
  chrome.storage.local.set({ s_selected_aem });
  chrome.storage.local.set({ s_input_url });
});

/*
 * ------------------------- pmi aem -------------------------
 */

const PMI_URL = {
  login:                "aem/start.html",
  pre_prod_aem:         "https://author.pp.iqos.com/",
  pre_prod_live:        "https://www.pp.iqos.com/",
  pre_prod_live_login:  "cgi-bin/authorize.cgi?gr=false",
  // pre_prod_live_password: "EI9fwDw7cuEA5qEkcrbr",
  prod_aem:             "https://author.iqos.com/",
  prod_live:            "https://www.iqos.com/",
  editor_start:         "editor.html/content/pmisite/",
  editor_end:           ".html",
  editor_off_start:     "content/pmisite/",
  editor_off_end:       "?wcmmode=disabled",
  live:                 ".html?gr=false",
  sites:                "sites.html/content/pmisite/",
  assets:               "assets.html/content/dam/iqos/local"
}

let pmi_selected_aem = "pre_prod_aem";
let pmi_input_url = "de/en/home";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ PMI_URL });
  chrome.storage.local.set({ pmi_selected_aem });
  chrome.storage.local.set({ pmi_input_url });
});

/*
 * ------------------------- options -------------------------
 */

let s_display_aem = true;
let pmi_display_aem = true;
let display_utilities = true;

let selected_theme = "auto";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ s_display_aem });
  chrome.storage.local.set({ pmi_display_aem });
  chrome.storage.local.set({ display_utilities });
  chrome.storage.local.set({ selected_theme });
});

/*
 * ------------------------- helpers -------------------------
 */

// chrome.storage.onChanged.addListener(function (changes, namespace) {
//   for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
//     console.log(
//       `Storage key "${key}" in namespace "${namespace}" changed.`,
//       `Old value was "${oldValue}", new value is "${newValue}".`
//     );
//   }
// });
