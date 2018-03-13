'use strict'

function EpubLoader() {
    if (!(this instanceof EpubLoader)) {
        return new EpubLoader()
    }
}

EpubLoader.Zipfile = require('./loader_zipfile')
module.exports = EpubLoader
