'use strict'

class DcmesItem {
    constructor(elem) {
        this.value = elem._
        this.optionItems = {
            'opf:alt-rep': '',
            'opf:alt-rep-lang': '',
            'dir': '',
            'opf:file-as': '',
            'id': '',
            'opf:role': '',
            'opf:scheme': '',
            'xml:lang': ''
        }
        Object.keys(this.optionItems).forEach(key => {
            if (elem.$ && elem.$[key]) {
                this.optionItems[key] = elem.$[key]
            }
        })
    }
}

module.exports = DcmesItem