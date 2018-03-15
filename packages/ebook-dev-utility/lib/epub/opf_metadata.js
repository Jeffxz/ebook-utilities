'use strict'

class OpfMetadata {
    constructor() {
        this.identifier = ''
        this.title = ''
        this.language = ''
        this.meta = []
    }

    parse(elem) {
        console.log(elem)
        console.log(this)
    }
}

module.exports = OpfMetadata