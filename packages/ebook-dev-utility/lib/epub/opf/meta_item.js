'use strict'

const EpubError = require('../epub_error')

class MetaItem {
    constructor(elem) {
        this.value = elem._
        if (!elem.$.property) {
            throw new EpubError(EpubError.ErrorType.ERR_EPUB_OPF_METADATA_META_NO_PROPERTY)
        }
        this.property = elem.$.property
        this.optionItems = {
            'opf:alt-rep': '',
            'opf:alt-rep-lang': '',
            'dir': '',
            'opf:file-as': '',
            'id': '',
            'refines': '',
            'scheme': '',
            'xml:lang': ''
        }
        Object.keys(this.optionItems).forEach(key => {
            if (elem.$[key]) {
                this.optionItems[key] = elem.$[key]
            }
        })
    }
}

module.exports = MetaItem