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

        return this.files[this.epub.ocf.containerFilePath]
            .async('string')
    }

    loadAsync(filePath) {
        return new Promise((resolve, reject) => {
            try {
                const data = fs.readFileSync(filePath)
                const zip = new JSZip()
                zip.loadAsync(data)
                .then(result => this.loadZip(result))
                .then(ocfData => this.epub.ocf.parse(ocfData))
                .then(ocf => this.files[ocf.defaultOpf()].async('string'))
                .then(opfData => this.epub.opf.parse(opfData))
                .then(() => resolve(this.epub), error => {
                    reject(error)
                })
            } catch (error) {
                if (error instanceof EpubError) {
                    reject(error)
                } else {
                    reject(new EpubError(EpubError.ErrorType.ERR_EPUB_GENERIC,
                        error.message))
                }
            }
        })
    }
}

module.exports = Zipfile