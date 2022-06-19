export async function update() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    //TODO: wont run when not active tab, if you open a link in a new tab and switch later auto just wont run

    // chrome.scripting.executeScript({
    //     target: { tabId: tab.id },
    //     files: ['graphemeSplitter.js'],
    // }, () => {
    //     chrome.scripting.executeScript({
    //         target: { tabId: tab.id },
    //         files: ['core.js'],
    //     })
    // })
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['core.js'],
    })
}