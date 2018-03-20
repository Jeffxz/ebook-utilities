'use strict'

const EpubError = require('../epub_error')

class OpfSpine {
    constructor() {
        this.id = ''
        this.pageProgressionDirection = ''
        this.toc = ''
        this.itemref = []
    }

    parse(elem, manifestItemMap) {
        if (elem.$) {
            if (elem.$.id) {
                this.id = elem.$.id
            }
            if (elem.$['page-progression-direction']) {
                this.pageProgressionDirection = elem.$['page-progression-direction']
            }
            if (elem.$.toc) {
                this.toc = elem.$.toc
            }
        }
        if (!elem.itemref || elem.itemref.length < 1) {
            throw new EpubError(EpubError.ErrorType.ERR_EPUB_OPF_SPINE_NO_ITEMREF)
        }
        elem.itemref.forEach(data => {
            const itemref = data.$
            const resource = manifestItemMap[itemref.idref]
            if (!resource) {
                throw new EpubError(EpubError.ErrorType.ERR_EPUB_OPF_SPINE_ITEMREF_NO_RESOURCE)
            }
            itemref.resource = resource
            this.itemref.push(itemref)
        })
    }
}

module.exports = OpfSpine