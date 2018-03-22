'use strict'

const EpubError = require('../epub_error')

class LinkItem {
    constructor(elem) {
        this.value = elem._
        if (!elem.$.href) {
            throw new EpubError(EpubError.ErrorType.ERR_EPUB_OPF_METADATA_LINK_NO_HREF)
        }
        this.href = elem.$.href
        if (!elem.$.rel) {
            throw new EpubError(EpubError.ErrorType.ERR_EPUB_OPF_METADATA_LINK_NO_REL)
        }
        this.rel = elem.$.rel
        this.optionItems = {
            'id': '',
            'media-type': '',
            'properties': ''
        }
        Object.keys(this.optionItems).forEach(key => {
            if (elem.$[key]) {
            this.optionItems[key] = elem.$[key]
        }
    })
    }
}

module.exports = LinkItem