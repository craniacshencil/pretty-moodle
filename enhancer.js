chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "ON",
  });
});

const moodle = 'http://moodle.apsit.org.in/moodle/'

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.startsWith(moodle)) {
    // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    // Next state will always be the opposite
    const nextState = prevState === 'OFF' ? 'ON' : 'OFF'

    // Set the action badge to the next state
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    });

    if (nextState === "ON") {
      // Insert the CSS file when the user turns the extension on
      await chrome.scripting.insertCSS({
        files: ["home.css"],
        target: { tabId: tab.id },
      });
    } 

    else if (nextState === "OFF") {
      // Remove the CSS file when the user turns the extension off
      await chrome.scripting.removeCSS({
        files: ["home.css"],
        target: { tabId: tab.id },
      });
    }

  }
});
