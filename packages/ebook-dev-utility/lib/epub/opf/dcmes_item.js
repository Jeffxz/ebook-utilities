'use strict'

class DcmesItem {
    constructor(elem) {
        if (elem._) {
            this.value = elem._
        } else {
            this.value = elem
        }
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