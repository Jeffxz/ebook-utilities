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
        this.opfPath = []
    }

    parse(data) {
        const parser = new xml2js.Parser()

        return new Promise((resolve, reject) => {
            parser.parseString(data, (error, result) => {
                if (!result.container) {
                    reject(new EpubError(EpubError.ErrorType.ERR_EPUB_OCF_NO_CONTAINER))
                }
                const rootfiles = result.container.rootfiles
                if (!rootfiles) {
                    reject(new EpubError(EpubError.ErrorType.ERR_EPUB_OCF_NO_ROOTFILES))
                }
                const rootfile = rootfiles[0].rootfile
                if (!rootfile) {
                    reject(new EpubError(EpubError.ErrorType.ERR_EPUB_OCF_ROOTFILES_EMPTY))
                }
                rootfile.forEach(item => {
                    this.opfPath.push(item.$['full-path'])
                })
                resolve(this.opfPath)
            })
        })
    }

    defaultOpf() {
        if (!this.opfPath) {
            return ''
        }

        return this.opfPath[0]
    }
}

module.exports = Ocf