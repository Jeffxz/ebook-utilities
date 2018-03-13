'use strict'

const Ocf = require('./ocf')
const Opf = require('./opf')

class Epub {
    constructor() {
        this.ocf = new Ocf()
        this.opf = new Opf()
    }
}

module.exports = Epub
