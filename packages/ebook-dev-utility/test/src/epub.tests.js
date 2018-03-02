const assert = require('chai').assert
const Epub = require('../../lib/epub/epub')

describe('Epub', function() {
    it('Epub should have name set with other fixed data', function () {
        let epub = new Epub('test-book')
        assert.equal(epub.name, 'test-book')
        assert.equal(epub.metaInfoDir, 'META-INF')
        assert.equal(epub.mimetypeFileName, 'mimetype')
        assert.equal(epub.mimetypeContent, 'application/epub+zip')
        assert.equal(epub.containerFile, 'container.xml')
    })
})