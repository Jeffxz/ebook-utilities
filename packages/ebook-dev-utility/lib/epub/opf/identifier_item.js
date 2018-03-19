'use strict'

class IdentifierItem {
    constructor(elem) {
        this.value = elem._
        if (elem.$.id) {
            this.id = elem.$.id
        }
        this.optionItems = {'opf:scheme': ''}
        if (elem.$['opf:scheme']) {
            this.optionItems['opf:scheme'] = elem.$['opf:scheme']
        }
    }
}

module.exports = IdentifierItem