// import { GraphemeSplitter } from "./lib/graphemeSplitter.js"
//need to pass splitter object to window, passing arg as execute script seems to only shallow copy

export async function update() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    //TODO: wont run when not active tab, if you open a link in a new tab and switch later auto just wont run

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['graphemeSplitter.js'],
    }, () => {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['core.js'],
        })
    })
}