'use strict'

const fs = require('fs')

const EbookDevUtil = require('ebook-dev-utility')

const EbookPathType = {
    FILE: Symbol('FILE'),
    DIR: Symbol('DIR'),
    URI: Symbol('URI'),
    UNKNOWN: Symbol('UNKNOWN')
}

class EbookDumper {
    constructor() {
        this.inputPathType = EbookPathType.UNKNOWN
        this.loader = new EbookDevUtil.Epubloader.Zipfile()
    }

    loadFile(path, func) {
        this.inputPath = path
        if (path.startsWith('http')) {
            this.inputPathType = EbookPathType.URI
        } else if (fs.existsSync(path)) {
            const stats = fs.lstatSync(path)
            if (stats.isFile()) {
                this.inputPathType = EbookPathType.FILE
                this.loader.loadAsync(path).then(epub => func(epub), error => {
                    console.log(error)
                })
            } else {
                this.inputPathType = EbookPathType.DIR
            }
        }
    }

    simpleJson(path) {
        this.loadFile(path, (epub) => {
            console.log(JSON.stringify(epub))
        })
    }

    listFiles(path) {
        this.loadFile(path, () => {
            console.log(Object.keys(this.loader.files))
        })
    }

    showFile(path, file) {
        this.loadFile(path, () => {
            let files = []
            let matchFolder = false
            let folderName = ''
            for (const key in this.loader.files) {
                if (key.includes(file)) {
                    if (this.loader.files[key].dir) {
                        matchFolder = true
                        folderName = this.loader.files[key].name
                    } else {
                        files.push(key)
                    }
                }
            }
            if (matchFolder) {
                console.log('Folder: ' + folderName)
                console.log('File list: ')
                console.log(files)
            } else {
                files.map(key => {
                    file = this.loader.files[key]
                    console.log('name: ' + file.name +
                    '\n    date: ' + file.date +
                    '\n    compressed size: ' + file._data.compressedSize +
                    '\n    uncompressed size: ' + file._data.uncompressedSize
                    )
                })
            }
        })
    }
}

module.exports = EbookDumper
