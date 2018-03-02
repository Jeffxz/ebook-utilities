'use strict'

const Epub = require('./epub')
const fs = require('fs')
const JSZip = require('jszip')
const path = require('path')

class EpubPackage {
    constructor(bookName, inputDir) {
        this.bookName = bookName
        this.inputDir = inputDir
        this.extension = '.epub'
        this.epub = new Epub(bookName)
        this.zip = new JSZip()
    }

    setKoboEpub() {
        this.extension = '.kepub.epub'

        return this
    }

    zipFolderRecursively(folderName) {
        fs.readdirSync(folderName).forEach(item => {
            const pathName = path.join(folderName, item)
                .replace(/\\/g, '/'); // for Windows
            const stat = fs.lstatSync(pathName)
            if (stat.isFile()) {
                if (item != this.epub.mimetypeFileName) {
                    const data = fs.readFileSync(pathName)
                    this.zip.file(pathName, data, {
                        createFolders: true,
                        compression: 'DEFLATE',
                        unixPermissions: stat.mode
                    })
                }
            } else {
                this.zip.folder(pathName)
                this.zipFolderRecursively(pathName)
            }
        })
    }

    save(outputDir) {
        process.chdir(this.inputDir)
        var contents = fs.readFileSync(this.epub.mimetypeFileName)
        this.zip.file(this.epub.mimetypeFileName, contents)
        this.zipFolderRecursively('./')

        process.chdir(outputDir)

        const fileName = this.bookName + this.extension
        this.zip.generateAsync({
            type: 'nodebuffer',
            platform: process.platform
        }).then(content => {
            fs.writeFileSync(fileName, content)
        })
    }
}

module.exports = EpubPackage