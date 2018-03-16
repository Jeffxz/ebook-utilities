'use strict'

const expect = require('chai').expect
const path = require('path')
const fs = require('fs')
const Opf = require('../../lib/epub/opf')

describe('Opf', function() {
    before(function() {
        this.testPath = path.resolve(__dirname, '../fixtures/opf')
    })

    beforeEach(function() {
        this.opf = new Opf()
    })

    describe('Normal cases', function() {
        it('should can retrieve package attributes', async function() {
            const normalOpf = path.resolve(this.testPath,
                'normal.opf')
            const data = fs.readFileSync(normalOpf)
            await this.opf.parse(data).then(opf => {
                expect(opf.version).to.equal('3.0')
        }, error => {
                expect(error).to.not.exist
            })
        })
    })
})