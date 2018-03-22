'use strict'

const EpubError = require('../epub_error')

class OpfManifest {
    constructor() {
        this.itemMap = {}
    }

    parse(elem) {
        if (!elem.item || elem.item.length < 1) {
            throw new EpubError(EpubError.ErrorType.ERR_EPUB_OPF_MANIFEST_NO_ITEM)
        }
        elem.item.forEach(data => {
            const item = data.$
            if (!item.href) {
                throw new EpubError(EpubError.ErrorType.ERR_EPUB_OPF_MANIFEST_ITEM_NO_HREF)
            }
            if (!item.id) {
                throw new EpubError(EpubError.ErrorType.ERR_EPUB_OPF_MANIFEST_ITEM_NO_ID)
            }
            if (!item['media-type']) {
                throw new EpubError(EpubError.ErrorType.ERR_EPUB_OPF_MANIFEST_ITEM_NO_MEDIA_TYPE)
            }
            if (this.itemMap[item.id]) {
                throw new EpubError(EpubError.ErrorType.ERR_EPUB_OPF_MANIFEST_ITEM_DUPLICATE,
                    item.id)
            }
            this.itemMap[item.id] = item
        })
    }
}

module.exports = OpfManifest