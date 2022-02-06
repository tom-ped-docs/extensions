/*
 * ------------------------- samsung -------------------------
 */

const S_URL = {
  p5_aem:             "https://aem.samsung.com/",
  p5_aem_eu:          "https://aem-eu.samsung.com/",
  p5_aem_eu_shop:     "https://aem-eu-shop.samsung.com/",
  p5_login:           "aemapi/user/login_sso?s_user_id=",
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
  p6_login:           "aemapi/user/login_sso?s_user_email=",
  p6_login_reset:     "pedzich.t@samsung.com",
  p6_qa:              "https://p6-qa.samsung.com/",
  p6_workflows:       "aem/inbox",
  p6_purging:         "aem/pim/global/setting/cdnpurging/page/purgerequest/info",
  p6_pim_b2c:         "aem/pim/b2c/product/detail/main/page/list",
  p6_pim_b2b:         "aem/bim/b2b/product/detail/main/page/list",

  editor_s:           "editor.html/content/samsung/",
  editor_e:           ".html",
  editor_off_s:       "content/samsung/",
  editor_off_e:       ".html?wcmmode=disabled",
  live:               "https://www.samsung.com/",
  sites:              "sites.html/content/samsung/",
  assets:             "assets.html/content/dam/samsung/"
};

/*
 * ------------------------- pmi -------------------------
 */

const P_URL = {
  pre_prod_aem:         "https://author.pp.iqos.com/",
  pre_prod_live:        "https://www.pp.iqos.com/",
  pre_prod_live_login:  "cgi-bin/authorize.cgi?gr=false",
  // pre_prod_live_password: "EI9fwDw7cuEA5qEkcrbr",

  prod_aem:             "https://author.iqos.com/",
  prod_live:            "https://www.iqos.com/",

  login:                "aem/start.html",
  editor_s:             "editor.html/content/pmisite/",
  editor_e:             ".html",
  editor_off_s:         "content/pmisite/",
  editor_off_e:         ".html?wcmmode=disabled",
  live:                 ".html?gr=false",
  sites:                "sites.html/content/pmisite/",
  assets_local:         "assets.html/content/dam/iqos/local",
  grfalse:              "?gr=false"
};

/*
 * ------------------------- settings -------------------------
 */

let s_p5_login = "542b562d2e9g30fgcg6b6422101b6e2d95333a3f2e3e49";
let s_p6_login = "pedzich.t@samsung.com";
let s_aem = "p5_aem_eu_shop";
let s_url = "pl";

let p_aem = "pre_prod_aem";
let p_url = "de/en/home";
let p_age_gate = true;

let vis_s_aem = true;
let vis_p_aem = true;
let vis_utilities = true;

let theme = "auto";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ S_URL });
  chrome.storage.local.set({ P_URL });
  chrome.storage.local.set({ s_p5_login });
  chrome.storage.local.set({ s_p6_login });
  chrome.storage.local.set({ s_aem });
  chrome.storage.local.set({ s_url });
  chrome.storage.local.set({ p_aem });
  chrome.storage.local.set({ p_url });
  chrome.storage.local.set({ p_age_gate });
  chrome.storage.local.set({ vis_s_aem });
  chrome.storage.local.set({ vis_p_aem });
  chrome.storage.local.set({ vis_utilities });
  chrome.storage.local.set({ theme });
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
