'use strict'

function EbookDevUtil() {
    if (!(this instanceof EbookDevUtil)) {
        return new EbookDevUtil()
    }
}
EbookDevUtil.Version = require('./version')
EbookDevUtil.Epub = require('./epub/epub')
EbookDevUtil.EpubTemplateGenerator =
    require('./epub/epub_template_generator')
EbookDevUtil.EpubPackage = require('./epub/epub_package')
EbookDevUtil.Epubloader = require('./epub/loader/loader')
EbookDevUtil.Reporter = require('./epub/reporter')
module.exports = EbookDevUtil
