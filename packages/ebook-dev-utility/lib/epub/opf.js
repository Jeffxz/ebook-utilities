'use strict'

const xml2js = require('xml2js')
const EpubError = require('./epub_error')
const OpfMetadata = require('./opf/opf_metadata')
const OpfManifest = require('./opf/opf_manifest')
const OpfSpine = require('./opf/opf_spine')

class Opf {
    constructor() {
        this.version = ''
        this.uniqueIdentitier = ''
        this.dir = ''
        this.id = ''
        this.prefix = ''
        this.xmlLang = ''
        this.metadata = new OpfMetadata()
        this.manifest = new OpfManifest()
        this.spine = new OpfSpine()
    }

    parse(data) {
        const parser = new xml2js.Parser()

        return new Promise((resolve, reject) => {
            try {
                parser.parseString(data, (error, result) => {
                    if (!result.package) {
                        throw new EpubError(EpubError.ErrorType.ERR_EPUB_OPF_NO_PACKAGE)
                    }
                    const elemPackage = result.package
                    if (!elemPackage.$.version) {
                        throw new EpubError(EpubError.ErrorType.ERR_EPUB_OPF_PACKAGE_NO_VERSION)
                    }
                    this.version = elemPackage.$.version
                    if (!elemPackage.$['unique-identifier']) {
                        throw new EpubError(EpubError.ErrorType.ERR_EPUB_OPF_PACKAGE_NO_UNIUE_ID)
                    }
                    this.uniqueIdentitier = elemPackage.$['unique-identifier']
                    if (!elemPackage.metadata ||
                        elemPackage.metadata.length != 1) {
                        throw new EpubError(EpubError.ErrorType.ERR_EPUB_OPF_PACKAGE_METADATA_COUNT)
                    }
                    this.metadata.parse(elemPackage.metadata[0])
                    if (!elemPackage.manifest ||
                        elemPackage.manifest.length != 1) {
                        throw new EpubError(EpubError.ErrorType.ERR_EPUB_OPF_PACKAGE_MANIFEST_COUNT)
                    }
                    this.manifest.parse(elemPackage.manifest[0])
                    if (!elemPackage.spine ||
                        elemPackage.spine.length != 1) {
                        throw new EpubError(EpubError.ErrorType.ERR_EPUB_OPF_PACKAGE_SPINE_COUNT)
                    }
                    this.spine.parse(elemPackage.spine[0], this.manifest.itemMap)
                    resolve(this)
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    get title() {
        return this.metadata.title
    }

    get language() {
        return this.metadata.language
    }

    get identifier() {
        return this.metadata.identifier
    }

    get creator() {
        return this.metadata.dcmesItems['dc:creator']
    }

    get meta() {
        return this.metadata.meta
    }
}

module.exports = Opf