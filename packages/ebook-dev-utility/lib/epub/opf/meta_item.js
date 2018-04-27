'use strict'

const Reporter = require('../reporter')

class MetaItem {
    constructor(elem) {
        if (elem._) {
            this.value = elem._
        }
        if (elem.$.property) {
            this.property = elem.$.property
        } else {
            Reporter.addWarning('Meta data has no property')
        }
        this.optionItems = {
            'opf:alt-rep': '',
            'opf:alt-rep-lang': '',
            'dir': '',
            'opf:file-as': '',
            'id': '',
            'refines': '',
            'scheme': '',
            'xml:lang': ''
        }
        Object.keys(this.optionItems).forEach(key => {
            if (elem.$[key]) {
                this.optionItems[key] = elem.$[key]
            }
        })
    }
}

module.exports = MetaItem