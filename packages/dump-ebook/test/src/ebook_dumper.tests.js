const assert = require('chai').assert
const EbookDumper = require('../../src/ebook_dumper')

const path = require('path')

before(function () {
    this.ebookPath = path.resolve(__dirname, '../ebooks')
})
describe('EbookDumper', function () {
    it('EbookPathType should be FILE if loading a file', async function() {
        let dumper = new EbookDumper()
        let filePath = path.resolve(this.ebookPath, 'test-book.epub')
        await dumper.loadFile(filePath, () => {})
        assert.equal(String(dumper.inputPathType), 'Symbol(FILE)')
    })
})