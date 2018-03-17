'use strict'

const xml2js = require('xml2js')
const EpubError = require('./epub_error')
const OpfMetadata = require('./opf_metadata')
const OpfManifest = require('./opf_manifest')
const OpfSpine = require('./opf_spine')

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
                        throw new EpubError('Can opf must have a package element')
                    }
                    const elemPackage = result.package
                    if (!elemPackage.$.version) {
                        throw new EpubError('Package must have attribute "version"')
                    }
                    this.version = elemPackage.$.version
                    if (!elemPackage.$['unique-identifier']) {
                        throw new EpubError('Package must have attribute "unique-identifier"')
                    }
                    this.uniqueIdentitier = elemPackage.$['unique-identifier']
                    if (!elemPackage.metadata ||
                        elemPackage.metadata.length != 1) {
                        throw new EpubError('Opf must have only one metadata')
                    }
                    this.metadata.parse(elemPackage.metadata)
                    if (!elemPackage.manifest ||
                        elemPackage.manifest.length != 1) {
                        throw new EpubError('Opf must have only one manifest')
                    }
                    this.manifest.parse(elemPackage.manifest)
                    if (!elemPackage.spine ||
                        elemPackage.spine.length != 1) {
                        throw new EpubError('Opf must have only one spine')
                    }
                    this.spine.parse(elemPackage.spine)
                    resolve(this)
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}

module.exports = Opf