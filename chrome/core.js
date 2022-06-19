parse()

function parse() {
    chrome.storage.sync.get("controls", ({ controls }) => {
        //TODO: this needs to be browser agnostic code or polyfilled
        const ignoreEl = ['script', 'style', 'noscript', 'textarea', 'input']

        if (controls.auto) {
            autoLoad()
        }
        function autoLoad() {
            //roughly check dom changes, resize and mutation observers are finicky
            const dom = document.getElementsByTagName('*')
            let lastLength = dom.length
            //TODO: find some way to remove duplicate intervals
            setInterval(() => {
                if (dom.length != lastLength) {
                    console.log('notbr auto updated!', dom.length, lastLength)
                    run()
                    lastLength = dom.length
                }
            }, 1000)
        }

        function parseTarget(targetEl, fx, fxMax, scd, scdMax) {
            const textInput = targetEl.nodeValue
            let paras = textInput.split(/[\n]/gmiu)
            paras.forEach((para, j) => {
                let inputArray = para.split(/[ ]/gmiu)
                const scdFreq = (scdMax + 1) - scd
                const fxPerc = fx / fxMax
                inputArray.forEach((el, i) => {
                    if (i % scdFreq !== 0 || el.length < 1) {
                        return
                    }
                    const fixPoint = Math.ceil(fxPerc * el.length)
                    // const newStr = `<span class="notbr-fixation">${el.slice(0, fixPoint)}</span>${el.slice(fixPoint)}`
                    const charArray = Array.from(el)
                    charArray[fixPoint - 1] += '</span>'
                    let newStr = '<span class="notbr-fixation">'
                    charArray.forEach((str) => {
                        newStr += str
                    })
                    inputArray[i] = newStr
                })
                const initReduce = '<span class="notbr-text">'
                const sumReduce = inputArray.reduce(
                    (prev, curr) => prev + curr + ' ',
                    initReduce
                )
                paras[j] = `${sumReduce}</span>`
            })
            const initReduce = ''
            const sumReduce = paras.reduce(
                (prev, curr) => prev + curr + '\n',
                initReduce
            )
            const newNode = document.createElement("span")
            newNode.innerHTML = sumReduce
            const parent = targetEl.parentNode
            parent.insertBefore(newNode, targetEl)
            parent.removeChild(targetEl)
        }

        function styleSetup() {
            if (document.head.querySelector('#not-br-style')) {
                return
            }
            let styleEl = document.createElement('STYLE')
            styleEl.id = 'not-br-style'
            styleEl.innerHTML = `.notbr-text { display: inline; font-weight: 400; font-size: ${controls.size}px; letter-spacing: ${controls.spacing}px; line-height: ${parseInt(controls.size) + parseInt(controls.height)}px; margin-top: 0; margin-bottom: 0;} .notbr-fixation { font-weight: 700; opacity: ${controls.opacity / 100}; }`
            document.head.appendChild(styleEl)
        }

        function run() {
            if (!document.body) {
                return
            }

            let elArray = []

            const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false)
            while (walker.nextNode()) {
                const curr = walker.currentNode
                const nodeName = curr.parentElement.nodeName.toLowerCase()
                const checkLength = curr.nodeValue.trim().length < 1
                const checkConvert = curr.parentElement.classList.contains('notbr-text') || curr.parentElement.classList.contains('notbr-fixation')
                const checkIgnore = ignoreEl.some(el => el === nodeName)
                const checkEditable = curr.parentElement.isContentEditable
                if (checkLength || checkConvert || checkIgnore || checkEditable) {
                    continue
                }
                elArray.push(curr)
            }

            elArray.forEach((el, i) => {
                parseTarget(el, controls.fixation, 10, controls.saccade, 10)
            })
            styleSetup()
        }
        run()

    })
}