const assert = require('chai').assert
const Epub = require('../../lib/epub/epub')

describe('Epub', function() {
    it('Epub should have name set with other fixed data', function () {
        let epub = new Epub()
        assert.equal(epub.ocf.metaInfoDir, 'META-INF')
        assert.equal(epub.ocf.mimetypeFileName, 'mimetype')
        assert.equal(epub.ocf.mimetypeContent, 'application/epub+zip')
        assert.equal(epub.ocf.containerFile, 'container.xml')
    })
})