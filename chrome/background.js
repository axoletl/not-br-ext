import { update } from "./event.js"

let controls = {
    fixation: 5,
    saccade: 10,
    opacity: 100,
    size: 16,
    height: 1,
    spacing: 1,
    auto: false
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ controls })
    chrome.contextMenus.create({
        id: "notBR",
        title: "Convert this page",
    })
})

chrome.contextMenus.onClicked.addListener(update)

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status != 'complete') {
        return
    }
    chrome.storage.sync.get("controls", ({ controls }) => {
        if (controls.auto) {
            console.log('notBR: autorun')
            update()
        }
    })
}
)