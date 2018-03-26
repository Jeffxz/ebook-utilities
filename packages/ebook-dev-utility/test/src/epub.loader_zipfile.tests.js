const assert = require('chai').assert
const expect = require('chai').expect
const path = require('path')
const Zipfile = require('../../lib/epub/loader/loader_zipfile')
const EpubError = require('../../lib/epub/epub_error')

before(function () {
    this.ebookPath = path.resolve(__dirname, '../fixtures/ebooks')
})

beforeEach(function() {
    this.loader = new Zipfile()
})

describe('Zipfile', function() {
    it('should can load epub file without error', function() {
        let filePath = path.resolve(this.ebookPath, 'test-book.epub')
        expect(() => {this.loader.loadAsync(filePath)}).to.not.throw()
    })

    it('should raise error with file name if epub file does not exist',
        async function() {
        let filePath = path.resolve(this.ebookPath, 'test-book')
        await this.loader.loadAsync(filePath).then(opf => {
            expect(opf).to.not.exist
        }, error => {
            expect(error.id).to
                .equal(EpubError.ErrorType.ERR_EPUB_GENERIC)
        })
    })
})