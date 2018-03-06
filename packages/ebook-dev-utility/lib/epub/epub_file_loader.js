'use strict'

const Epub = require('./epub')
const fs = require('fs')
const JSZip = require('jszip')
const path = require('path')

class EpubFileLoader {
    constructor() {
        this.zip = new JSZip()
    }

    loadFile(filePath) {
        this.filePath = filePath
        this.epub = new Epub(path.basename(filePath))

        return new Promise((resolve, reject) => {
            try {
                fs.readFileSync(filePath)
                resolve(this.epub)
            } catch (err) {
                reject(err)
            }

        })
    }
}

module.exports = EpubFileLoader