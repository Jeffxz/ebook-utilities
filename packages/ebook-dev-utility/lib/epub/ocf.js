'use strict'

const xml2js = require('xml2js')
const EpubError = require('./epub_error')

class Ocf {
    constructor() {
        this.metaInfoDir = 'META-INF'
        this.mimetypeFileName = 'mimetype'
        this.mimetypeContent = 'application/epub+zip'
        this.containerFile = 'container.xml'
        this.containerFilePath = this.metaInfoDir + '/' + this.containerFile
        this.opfPath = ''
    }

    parse(data) {
        const parser = new xml2js.Parser()

        return new Promise((resolve, reject) => {
            parser.parseString(data, (error, result) => {
                const rootfiles = result.container.rootfiles
                if (typeof rootfiles === 'undefined') {
                    reject(new EpubError('rootfiles does not exist in container'))
                }
                const rootfile = rootfiles[0].rootfile
                if (typeof rootfile === 'undefined') {
                    reject(new EpubError('rootfile does not exist in container'))
                }
                this.opfPath = rootfile[0].$['full-path']
                resolve(this.opfPath)
            })
        })
    }
}

module.exports = Ocf