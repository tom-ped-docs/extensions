const URL = {
  sites:                "sites.html/content/samsung/",
  editor_start:         "editor.html/content/samsung/",
  editor_end:           ".html",
  editor_off_start:     "content/samsung/",
  editor_off_end:       "?wcmmode=disabled",
  assets:               "assets.html/content/dam/samsung/",
  live:                 "https://www.samsung.com/",
  p5_aem_login:         "aemapi/user/login_sso?s_user_id=542b562d2e9g30fgcg6b6422101b6e2d95333a3f2e3e49",
  p5_aem:               "https://aem.samsung.com/",
  p5_aem_eu:            "https://aem-eu.samsung.com/",
  p5_aem_eu_shop:       "https://aem-eu-shop.samsung.com/",
  p5_qa:                "https://qaweb.samsung.com/",
  p5_qa_shop:           "https://qaweb-shop.samsung.com/",
  p5_task_management:   "aem/taskmanagement",
  p5_pim_b2c:           "aem/pim/b2c/product/main/forwardProductFamilyList",
  p5_pim_b2b:           "aem/bim/b2b/product/main/forwardProductFamilyList",
  p5_purging:           "aem/pim/setting/cdnpurge/forwardCDNpurgReq",
  p5_workflows:         "notifications.html",
  p6_aem_login:         "aemapi/user/login_sso?s_user_email=pedzich.t@samsung.com",
  p6_aem_ap:            "https://p6-ap-author.samsung.com/",
  p6_aem_eu:            "https://p6-eu-author.samsung.com/",
  p6_aem_us:            "https://p6-us-author.samsung.com/",
  p6_qa:                "https://p6-qa.samsung.com/",
  p6_pim_b2c:           "aem/pim/b2c/product/detail/main/page/list",
  p6_purging:           "aem/pim/global/setting/cdnpurging/page/purgerequest/info",
  p6_workflows:         "aem/inbox"
}

let selected_aem = "p5_aem_eu_shop";// initial value
let input_url = "pl/";// initial value

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ URL });
  chrome.storage.local.set({ selected_aem });
  chrome.storage.local.set({ input_url });
});

// chrome.storage.onChanged.addListener(function (changes, namespace) {
//   for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
//     console.log(
//       `Storage key "${key}" in namespace "${namespace}" changed.`,
//       `Old value was "${oldValue}", new value is "${newValue}".`
//     );
//   }
// });
