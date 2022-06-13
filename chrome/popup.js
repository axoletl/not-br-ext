import { update } from "./event.js"

const fxEl = document.getElementById('fxEl')
const scdEl = document.getElementById('scdEl')
const opcEl = document.getElementById('opcEl')
const szEl = document.getElementById('szEl')
const hgtEl = document.getElementById('hgtEl')
const spcEl = document.getElementById('spcEl')

const runEl = document.getElementById('runEl')
const autoEl = document.getElementById('autoEl')
const preview = document.getElementById('preview')
const prevStyle = document.getElementById('prevStyle')

const bindArrEl = [fxEl, scdEl, opcEl, szEl, hgtEl, spcEl, autoEl]
const bindArrObj = ['fixation', 'saccade', 'opacity', 'size', 'height', 'spacing', 'auto']
let controlsLocal = {} //"model"
const prevText = 'Note: changes will only be updated next time you refresh and convert!'

function init() {
    chrome.storage.sync.get(["controls"], ({ controls }) => {
        controlsLocal = controls
        bindArrEl.forEach((el, i) => {
            bindInput(controls, el, bindArrObj[i], i)
        })
        // autoEl.addEventListener('input', () => {if (controls.auto) update()})
        updatePreview()
    })
}
function bindInput(controls, el, key, i) {
    if (el.type == 'checkbox') {
        el.checked = controls[bindArrObj[i]]
        el.addEventListener('input', () => {
            controlsLocal[key] = el.checked
            chrome.storage.sync.set({ controls: controlsLocal }, function () {
                updatePreview()
            })
        })
        return
    }
    el.value = controls[bindArrObj[i]]
    el.addEventListener('input', () => {
        controlsLocal[key] = el.value
        chrome.storage.sync.set({ controls: controlsLocal }, function () {
            updatePreview()
        })
    })
}
chrome.runtime.onInstalled.addListener(
    init()
)
chrome.runtime.onStartup.addListener(
    init()
)

runEl.addEventListener("click", update)

function updatePreview() {
    prevStyle.innerHTML = `.notbr-text { display: inline; font-weight: 400; font-size: ${controlsLocal.size}px; letter-spacing: ${controlsLocal.spacing}px; line-height: ${parseInt(controlsLocal.size) + parseInt(controlsLocal.height)}px; margin-top: 0; margin-bottom: 0;} .notbr-fixation { font-weight: 700; opacity: ${controlsLocal.opacity / 100}; }`

    const scdFreq = parseInt(scdEl.max) + 1 - parseInt(controlsLocal.saccade)
    let inputArray = prevText.split(/[ ]/gmiu)
    inputArray.forEach((el, i) => {
        if (i % scdFreq !== 0) {
            return
        }
        const fxPerc = parseInt(controlsLocal.fixation) / parseInt(fxEl.max)
        const fixPoint = Math.ceil(fxPerc * el.length)
        const newStr = `<span class="notbr-fixation">${el.slice(0, fixPoint)}</span>${el.slice(fixPoint)}`
        inputArray[i] = newStr
        let initReduce = ''
        const sumReduce = inputArray.reduce(
            (prev, curr) => prev + curr + ' ',
            initReduce
        )
        preview.innerHTML = `<p class="notbr-text">${sumReduce}</p>`
    })

}