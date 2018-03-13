'use strict'

const JSZip = require('jszip')
const fs = require('fs')
const Epub = require('../epub')
const EpubError = require('../epub_error')

class Zipfile {
    constructor() {
        this.files = {}
        this.epub = new Epub()
    }

    loadZip(zip) {
        this.files = zip.files
        this.files[this.epub.ocf.containerFilePath]
            .async('string')
            .then(ocf => this.loadOcf(ocf))
    }

    loadOcf(data) {
        this.epub.ocf.parse(data).then(opfPath => {
            this.files[opfPath]
            .async('string')
            .then(opf => this.loadOpf(opf))
        }, error => {
            throw error
        })
    }

    loadOpf(data) {
        this.epub.opf.parse(data).then(opf => {
            console.log(opf.version)
        }, error => {
            throw error
        })
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