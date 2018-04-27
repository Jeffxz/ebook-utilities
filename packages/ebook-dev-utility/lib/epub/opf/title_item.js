'use strict'

class TitleItem {
    constructor(elem) {
        this.value = elem._
        if (elem.$.id) {
            this.id = elem.$.id
        }
        this.optionItems = {
            'opf:alt-rep': '',
            'opf:alt-rep-lang': '',
            'dir': '',
            'opf:file-as': '',
            'xml:lang': ''
        }
        Object.keys(this.optionItems).forEach(key => {
            if (elem.$ && elem.$[key]) {
                this.optionItems[key] = elem.$[key]
            }
        })
    }
}

module.exports = TitleItem
