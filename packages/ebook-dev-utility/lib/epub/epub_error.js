'use strict'

const EpubErrorType = {
    ERR_EPUB_GENERIC: -1001, // used to pass through system or library error
    ERR_EPUB_OCF_NO_CONTAINER: -1002,
    ERR_EPUB_OCF_NO_ROOTFILES: -1003,
    ERR_EPUB_OCF_ROOTFILES_EMPTY: -1004,

    ERR_EPUB_OPF_METADATA_NO_IDENTIFIER: -2001,
    ERR_EPUB_OPF_METADATA_NO_TITLE: -2002,
    ERR_EPUB_OPF_METADATA_NO_LANGUAGE: -2003,
    ERR_EPUB_OPF_METADATA_NO_META: -2004,
    ERR_EPUB_OPF_METADATA_META_NO_PROPERTY: -2005,
    ERR_EPUB_OPF_METADATA_LINK_NO_HREF: -2006,
    ERR_EPUB_OPF_METADATA_LINK_NO_REL: -2007,

    ERR_EPUB_OPF_MANIFEST_NO_ITEM: -2008,
    ERR_EPUB_OPF_MANIFEST_ITEM_NO_HREF: -2009,
    ERR_EPUB_OPF_MANIFEST_ITEM_NO_ID: -2010,
    ERR_EPUB_OPF_MANIFEST_ITEM_NO_MEDIA_TYPE: -2011,
    ERR_EPUB_OPF_MANIFEST_ITEM_DUPLICATE: -2012,

    ERR_EPUB_OPF_SPINE_NO_ITEMREF: -2013,
    ERR_EPUB_OPF_SPINE_ITEMREF_NO_RESOURCE: -2014,

    ERR_EPUB_OPF_NO_PACKAGE: -2015,
    ERR_EPUB_OPF_PACKAGE_NO_VERSION: -2016,
    ERR_EPUB_OPF_PACKAGE_NO_UNIUE_ID: -2017,
    ERR_EPUB_OPF_PACKAGE_METADATA_COUNT: -2018,
    ERR_EPUB_OPF_PACKAGE_MANIFEST_COUNT: -2019,
    ERR_EPUB_OPF_PACKAGE_SPINE_COUNT: -2020
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