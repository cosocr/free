const { readLine, analyzeNode, subUrlToNodes } = require('./util.js')
const fs = require('fs')

const main = async () => {
    let subNodeObj = {}
    console.log('read assets/nodes.txt')
    const nodeArr = await readLine('assets/nodes.txt')
    nodeArr.forEach((line) => {
        if (!subNodeObj[line] && line) {
            subNodeObj[line] = true
        }
    })

    console.log('read assets/subscribe-url.txt')
    const subUrlArr = await readLine('assets/subscribe-url.txt')
    for (let i = 0; i < subUrlArr.length; i += 1) {
        console.log('     request subUrl: ' + subUrlArr[i])
        const lineArr = await subUrlToNodes(subUrlArr[i])
        console.log('             read node size: ' + lineArr.length)
        lineArr.forEach((line) => {
            if (!subNodeObj[line] && line) {
                subNodeObj[line] = true
            }
        })
    }

    const arr = []
    for (let key in subNodeObj) {
        const obj = analyzeNode(key)
        if (!obj) {
            continue
        }
        arr.push(obj)
    }
    return arr
}

main().then((res) => {
    console.log('write to dist')
    let str = ''
    let log = '['

    for (let i = 0; i < res.length; i += 1) {
        str += res[i].url + '\n'
        log += JSON.stringify(res[i]) + (i + 1 < res.length ? ',\n' : '')
    }
    let buff = Buffer.from(str)
    let text = buff.toString('base64')
    fs.writeFileSync('dist/sub.txt', text)
    fs.writeFileSync('dist/log.json', log + ']')
})
