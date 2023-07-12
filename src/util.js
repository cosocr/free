const fs = require('fs')
const readline = require('readline')
const axios = require('./axios')

module.exports.readLine = (fileName) => {
    return new Promise((RES) => {
        const rl = readline.createInterface({
            input: fs.createReadStream(fileName),
            output: process.stdout,
            terminal: false
        })
        let arr = []
        rl.on('line', (line) => {
            arr.push(line)
        })
        rl.on('close', () => {
            RES(arr)
        })
    })
}

module.exports.analyzeNode = (subUrl) => {
    if (!subUrl) return
    const idx = subUrl.indexOf('://')
    if (idx <= 0) {
        return
    }
    let obj = {
        type: subUrl.substring(0, idx),
        url: subUrl
    }
    if (obj.type === 'vmess') {
        let buff = Buffer.from(subUrl.substring(idx + 3), 'base64')
        let text = buff.toString('utf-8')
        obj.content = JSON.parse(text)
    }
    return obj
}

module.exports.subUrlToNodes = (httpUrl) => {
    return new Promise((RES) => {
        axios
            .get(httpUrl)
            .then((res) => {
                if (res.status !== 200 || !res.data) {
                    RES([])
                    return
                }
                let buff = Buffer.from(res.data, 'base64')
                let text = buff.toString('utf-8')
                RES(text.split(/[(\r\n)\r\n]/))
            })
            .catch(() => {
                RES([])
            })
    })
}
