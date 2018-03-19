'use strict'

const EpubError = require('../epub_error')
const IdentifierItem = require('./identifier_item')
const TitleItem = require('./title_item')
const DcmesItem = require('./dcmes_item')
const MetaItem = require('./meta_item')
const LinkItem = require('./link_item')

class OpfMetadata {
    constructor() {
        this.identifier = []
        this.title = []
        this.language = []
        this.dcmesItems = {
            'dc:contributor': [],
            'dc:coverage': [],
            'dc:creator': [],
            'dc:date': [],
            'dc:description': [],
            'dc:format': [],
            'dc:publisher': [],
            'dc:relation': [],
            'dc:rights': [],
            'dc:source': [],
            'dc:subject': [],
            'dc:type': []
        }
        this.meta = []
        this.link = []
    }

    parse(elem) {
        if (!elem['dc:identifier']) {
            throw new EpubError(EpubError.ErrorType.ERR_EPUB_OPF_METADATA_NO_IDENTIFIER)
        }
        elem['dc:identifier'].forEach(item => {
            this.identifier.push(new IdentifierItem(item))
        })
        if (!elem['dc:title']) {
            throw new EpubError(EpubError.ErrorType.ERR_EPUB_OPF_METADATA_NO_TITLE)
        }
        elem['dc:title'].forEach(item => {
            this.title.push(new TitleItem(item))
        })
        if (!elem['dc:language']) {
            throw new EpubError(EpubError.ErrorType.ERR_EPUB_OPF_METADATA_NO_LANGUAGE)
        }
        elem['dc:language'].forEach(item => {
            this.language.push(item)
        })
        Object.keys(this.dcmesItems).forEach(key => {
            if (elem[key]) {
                elem[key].forEach(item => {
                    this.dcmesItems[key].push(new DcmesItem(item))
                })
            }
        })
        if (!elem.meta) {
            throw new EpubError(EpubError.ErrorType.ERR_EPUB_OPF_METADATA_NO_META)
        }
        elem.meta.forEach(item => {
            this.meta.push(new MetaItem(item))
        })
        if (elem.link) {
            elem.link.forEach(item => {
                this.link.push(new LinkItem(item))
            })
        }
    }
}

module.exports = OpfMetadata