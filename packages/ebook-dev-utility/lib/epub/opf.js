'use strict'

const xml2js = require('xml2js')

class Opf {
    constructor() {
        this.version = ''
    }

    parse(data) {
        const parser = new xml2js.Parser()

        return new Promise((resolve, reject) => {
            try {
                parser.parseString(data, (error, result) => {
                    console.log(result.package)
                    this.version = result.package.$.version
                    resolve(this)
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}

module.exports = Opf