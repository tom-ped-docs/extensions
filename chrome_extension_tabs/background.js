/*
 * https://developer.chrome.com/docs/extensions/reference/tabGroups
 * https://developer.chrome.com/docs/extensions/reference/tabs
 * https://developer.chrome.com/docs/extensions/reference/windows
 */

chrome.commands.onCommand.addListener((command) => {

  /*
   * ----- tabs-duplicate, toggle-tabs-pinned -----
   */

  chrome.tabs.update({}, (tab) => {
    if (command === "tabs-duplicate")
      chrome.tabs.duplicate(tab.id);
    else if (command === "toggle-tabs-pinned")
      chrome.tabs.update({ pinned: !tab.pinned });
  });

  /*
   * ----- toggle-tabs-group, group-collapsed -----
   */

  chrome.tabs.update({}, (tab) => {
    if (command === "toggle-tabs-group")
      if (tab.groupId === chrome.tabGroups.TAB_GROUP_ID_NONE)
        chrome.tabs.group({ tabIds: tab.id });
      else
        chrome.tabs.ungroup(tab.id);
    else if (command === "group-collapsed")
      chrome.tabGroups.update(tab.groupId, { collapsed: true }, (group) => {
        // chrome.tabGroups.move(group.id, { index: 0 });
      });
  });

  /*
   * ----- tabs-move-left -----
   */

  chrome.tabs.update({}, (tab) => {
    if (command === "tabs-move-left")
      if (tab.pinned === true)
        chrome.tabs.query({ currentWindow: true, pinned: true }, (tabs) => {
          if (tab.index === tabs[0].index)
            chrome.tabs.move(tab.id, { index: -1 });
          else
            chrome.tabs.move(tab.id, { index: tab.index - 1 });
        });
      else if (tab.pinned === false)
        chrome.tabs.query({ currentWindow: true, pinned: false }, (tabs) => {
          if (tab.index === tabs[0].index)
            chrome.tabs.move(tab.id, { index: -1 });
          else
            chrome.tabs.move(tab.id, { index: tab.index - 1 });
        });
  });

  /*
   * ----- tabs-move-right -----
   */

  chrome.tabs.update({}, (tab) => {
    if (command === "tabs-move-right")
      if (tab.pinned === true)
        chrome.tabs.query({ currentWindow: true, pinned: true }, (tabs) => {
          if (tab.index === tabs[tabs.length - 1].index)
            chrome.tabs.move(tab.id, { index: 0 });
          else
            chrome.tabs.move(tab.id, { index: tab.index + 1 });
        });
      else if (tab.pinned === false)
        chrome.tabs.query({ currentWindow: true, pinned: false }, (tabs) => {
          if (tab.index === tabs[tabs.length - 1].index)
            chrome.tabs.move(tab.id, { index: 0 });
          else
            chrome.tabs.move(tab.id, { index: tab.index + 1 });
        });
  });

  /*
   * ----- tabs-move-top, tabs-move-bottom -----
   */

  chrome.tabs.update({}, (tab) => {
    if (command === "tabs-move-top")
      chrome.tabs.move(tab.id, { index: 0 });
    else if (command === "tabs-move-bottom")
      chrome.tabs.move(tab.id, { index: -1 });
  });

  /*
   * ----- tabs-move-window -----
   */

  chrome.tabs.update({}, (tab) => {
    if (command === "tabs-move-window")
      chrome.windows.getCurrent({}, (window) => {
        if (window.incognito === false)
          chrome.windows.create({ tabId: tab.id, incognito: false });
        // else
          // chrome.windows.create({ tabId: tab.id, incognito: true });
      });
  });
});
