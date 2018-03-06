const should = require('chai').should()
const assert = require('chai').assert
const path = require('path')
const EpubFileLoader = require('../../lib/epub/epub_file_loader')

before(function () {
    this.ebookPath = path.resolve(__dirname, '../ebooks')
})

beforeEach(function() {
    this.loader = new EpubFileLoader()
})

describe('EpubFileLoader', function(done) {

    it('should return an epub with opf instance', function(done) {
        let filePath = path.resolve(this.ebookPath, 'test-book.epub')
        this.loader
            .loadFile(filePath)
            .then(function(result) {
                let epub = result
                epub.should.have.property('name')
                done()
            })
            .catch(function(err) {
                should.not.exist(err)
                done()
            })
            .catch(done)
    })
})