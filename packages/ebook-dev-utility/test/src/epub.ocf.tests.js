const assert = require('chai').assert
const expect = require('chai').expect
const path = require('path')
const fs = require('fs')
const Ocf = require('../../lib/epub/ocf')

before(function () {
    this.testPath = path.resolve(__dirname, '../fixtures/ocf')
})

beforeEach(function() {
    this.ocf = new Ocf()
})

describe('Ocf Test', function() {
    describe('Container Test', function () {
        it('should can find opf path', async function() {
            const normalContainer = path.resolve(this.testPath,
                'container-normal.xml')
            const data = fs.readFileSync(normalContainer)
            await this.ocf.parse(data).then(opfPath => {
                expect(opfPath).to.equal('EPUB/package.opf')
            }, error => {
                expect(error).to.not.exist
            })
        })
    });
})