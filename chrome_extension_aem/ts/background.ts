/*
 * ------------------------- samsung -------------------------
 */

const URL_SAMSUNG = {
  p5_aem:             "https://aem.samsung.com/",
  p5_aem_eu:          "https://aem-eu.samsung.com/",
  p5_aem_eu_shop:     "https://aem-eu-shop.samsung.com/",
  p5_login:           "aemapi/user/login_sso?s_user_id=",
  // p5_login_reset: "542b562d2e9g30fgcg6b6422101b6e2d95333a3f2e3e49",
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
  // p6_login_reset: "pedzich.t@samsung.com",
  p6_qa:              "https://p6-qa.samsung.com/",
  p6_workflows:       "aem/inbox",
  p6_purging:         "aem/pim/global/setting/cdnpurging/page/purgerequest/info",
  p6_pim_b2c:         "aem/pim/b2c/product/detail/main/page/list",
  p6_pim_b2b:         "aem/bim/b2b/product/detail/main/page/list",

  editor1:            "editor.html/content/samsung/",
  editor2:            ".html",
  preview1:           "content/samsung/",
  preview2:           ".html?wcmmode=disabled",
  live:               "https://www.samsung.com/",
  sites:              "sites.html/content/samsung/",
  assets:             "assets.html/content/dam/samsung/"
};

let user_id =               "542b562d2e9g30fgcg6b6422101b6e2d95333a3f2e3e49";
let user_email =            "pedzich.t@samsung.com";
let selected_aem_samsung =  "p5_aem_eu_shop";
let url_samsung =           "pl";

/*
 * ------------------------- iqos -------------------------
 */

const URL_IQOS = {
  pre_prod_aem:           "https://author.pp.iqos.com/",
  pre_prod_qa:            "https://www.pp.iqos.com/",
  pre_prod_qa_login:      "cgi-bin/authorize.cgi",
  pre_prod_veev_qa:       "https://www.pp.veev-vape.com/",
  pre_prod_veev_qa_login: "edgeauth",
  pre_prod_club_qa:       "https://club.pp.iqos.com/",
  pre_prod_club_qa_login: "edgeauth",

  prod_aem:               "https://author.iqos.com/",
  prod_live:              "https://www.iqos.com/",
  prod_veev_live:         "https://www.veev-vape.com/",
  prod_club_live:         "https://www.iqosclub.com/",

  login:                  "aem/start.html",
  editor1:                "editor.html/content/",
  editor2:                ".html",
  preview1:               "content/",
  preview2:               ".html?wcmmode=disabled",
  live:                   ".html?gr=false",
  sites:                  "sites.html/content/",
  assets:                 "assets.html/content/dam/iqos/local",
  grfalse:                "?gr=false",

  pre_prod_hybris:        "https://backoffice.pp.iqos.com/backoffice/login.zul",
  prod_hybris:            "https://backoffice.iqos.com/backoffice/login.zul"
};

let selected_aem_iqos = "pre_prod_aem";
let selected_site =     "pmisite";
let url_iqos =          "de/en/home";

const COUNTRIES_IQOS = {
  cr: "costa-rica",
  cz: "czech-republic",
  eg: "egypt",
  fi: "finland",
  fr: "france",
  de: "germany",
  id: "indonesia",
  jp: "japan",
  kg: "kyrgyzstan",
  mv: "maldives",
  ma: "morocco",
  mx: "mx",
  ph: "philippines",
  pl: "poland",
  pt: "portugal",
  sk: "slovakia",
  tw: "taiwan",
  tn: "tunisia",
  gb: "uk",
  ae: "united-arab-emirates",
  vu: "vanuatu",
  vn: "vietnam"
};

/*
 * ------------------------- ... -------------------------
 */

let is_aem_samsung_visible =  true;
let is_aem_iqos_visible =     true;
let is_tools_visible =        true;

let selected_theme = "auto";

chrome.runtime.onInstalled.addListener( () =>
{
  chrome.storage.local.set( { URL_SAMSUNG } );
  chrome.storage.local.set( { URL_IQOS } );
  chrome.storage.local.set( { user_id } );
  chrome.storage.local.set( { user_email } );
  chrome.storage.local.set( { selected_aem_samsung } );
  chrome.storage.local.set( { url_samsung } );
  chrome.storage.local.set( { selected_aem_iqos } );
  chrome.storage.local.set( { selected_site } );
  chrome.storage.local.set( { url_iqos } );
  chrome.storage.local.set( { COUNTRIES_IQOS } );
  chrome.storage.local.set( { is_aem_samsung_visible } );
  chrome.storage.local.set( { is_aem_iqos_visible } );
  chrome.storage.local.set( { is_tools_visible } );
  chrome.storage.local.set( { selected_theme } );
} );

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
