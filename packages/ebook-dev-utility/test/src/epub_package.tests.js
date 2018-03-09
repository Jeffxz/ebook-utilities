const assert = require('chai').assert
const EpubPackage = require('../../lib/epub/epub_package')
const JSZip = require('jszip')

describe('EpubPackage', function() {
    it('should can be initialized with name and other fields', function () {
        let epubPackage = new EpubPackage('test-book', 'test-folder')
        assert.equal(epubPackage.bookName, 'test-book')
        assert.equal(epubPackage.inputDir, 'test-folder')
        assert.equal(epubPackage.extension, '.epub')
        assert.isNotNull(epubPackage.zip)
    })
})
