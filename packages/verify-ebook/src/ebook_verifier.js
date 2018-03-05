'use strict'

const fs = require('fs')

const EbookPathType = {
    FILE: Symbol('FILE'),
    DIR: Symbol('DIR'),
    URI: Symbol('URI'),
    UNKNOWN: Symbol('UNKNOWN')
}

class EbookVerifier {
    constructor() {
        this.inputPathType = EbookPathType.UNKNOWN
    }

    load(path) {
        this.inputPath = path
        if (path.startsWith('http')) {
            this.inputPathType = EbookPathType.URI
        } else if (fs.existsSync(path)) {
            const stats = fs.lstatSync(path)
            if (stats.isFile()) {
                this.inputPathType = EbookPathType.FILE
            } else {
                this.inputPathType = EbookPathType.DIR
            }
        }
    }
}

module.exports = EbookVerifier