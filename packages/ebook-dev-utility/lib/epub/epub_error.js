'use strict'

const EpubErrorType = {
    ERR_EPUB_GENERIC: -1001,
    ERR_EPUB_OCF_NO_CONTAINER: -1002,
    ERR_EPUB_OCF_NO_ROOTFILES: -1003,

    ERR_EPUB_OPF_METADATA_NO_IDENTIFIER: -2001,
    ERR_EPUB_OPF_METADATA_NO_TITLE: -2002,
    ERR_EPUB_OPF_METADATA_NO_LANGUAGE: -2003,
    ERR_EPUB_OPF_METADATA_NO_META: -2004,
    ERR_EPUB_OPF_METADATA_META_NO_PROPERTY: -2005,
    ERR_EPUB_OPF_METADATA_LINK_NO_HREF: -2006,
    ERR_EPUB_OPF_METADATA_LINK_NO_REL: -2007
}

class EpubError extends Error {
    constructor(errorType, message) {
        super()
        this.id = errorType
        switch (errorType) {
            case EpubErrorType.ERR_EPUB_GENERIC:
                this.message = message
                break
            case EpubErrorType.ERR_EPUB_OCF_NO_CONTAINER:
                this.message = 'Root element should be container'
                break
            case EpubErrorType.ERR_EPUB_OCF_NO_ROOTFILES:
                this.message = 'rootfiles does not exist in container'
                break
            default:
                break
        }
    }

    errorType() {

        return this.id
    }
}

EpubError.ErrorType = EpubErrorType
module.exports = EpubError