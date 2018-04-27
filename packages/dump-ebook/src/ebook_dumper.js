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
                    console.error(error)
                })
            } else {
                this.inputPathType = EbookPathType.DIR
            }
        }
    }

    simpleJson(path) {
        this.loadFile(path, epub => {
            console.log(JSON.stringify(epub))
            console.log('==========================================')
            let warnings = EbookDevUtil.Reporter.listWarnings()
            if (warnings.length > 0) {
                console.log(warnings)
            }
        })
    }

    listFiles(path) {
        this.loadFile(path, () => {
            console.log(Object.keys(this.loader.files))
        })
    }

    showFile(path, file) {
        this.loadFile(path, () => {
            const files = []
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
                files.map(key => console.log(this.loader.files[key]))
            }
        })
    }

    saveFile(path, inputFile, outputFile) {
        this.loadFile(path, () => {
            const files = []
            for (const key in this.loader.files) {
                if (key.includes(inputFile)) {
                    if (this.loader.files[key].dir) {
                        console.log('Can not save folder')

                        return
                    }
                    files.push(key)
                }
            }
            if (files.length > 1) {
                console.log('Input file name matched multiple files. Only can save one file')
                console.log(files)

                return
            } else if (files.length == 0) {
                console.log('Could not find file matches inputFile: ' + inputFile)

                return
            }
            this.loader.files[files[0]]
                .async('uint8array')
                .then(data => {
                    console.log(inputFile + ' ======> ' + outputFile)
                    fs.writeFileSync(outputFile, data)
            })
        })
    }
}

module.exports = EbookDumper
