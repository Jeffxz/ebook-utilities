'use strict'

const JSZip = require('jszip')
const fs = require('fs')
const EpubError = require('../epub_error')

class Zipfile {
    constructor() {
        this.files = {}
    }

    loadZip(zip) {
        this.files = zip.files
    }

    loadSync(filePath) {
        try {
            const data = fs.readFileSync(filePath)
            const zip = new JSZip()
            zip.loadAsync(data)
                .then(result => this.loadZip(result))
        } catch (error) {
            throw new EpubError(error.message)
        }
    }
}

module.exports = Zipfile