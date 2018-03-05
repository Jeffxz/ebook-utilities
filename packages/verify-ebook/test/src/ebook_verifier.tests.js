const assert = require('chai').assert
const EbookVerifier = require('../../src/ebook_verifier')

describe('EbookVerifier', function() {
    it('EbookPathType should be DIR if loading a folder', function() {
        let verifier = new EbookVerifier()
        verifier.load(__dirname)
        assert.equal(String(verifier.inputPathType), 'Symbol(DIR)')
    })

    it('EbookPathType should be FILE if loading a file', function() {
        let verifier = new EbookVerifier()
        verifier.load(__filename)
        assert.equal(String(verifier.inputPathType), 'Symbol(FILE)')
    })

    it('EbookPathType should be URI if loading a url', function() {
        let verifier = new EbookVerifier()
        verifier.load("http://test.epub")
        assert.equal(String(verifier.inputPathType), 'Symbol(URI)')
    })

    it('EbookPathType should be UNKNOWN if loading a file does not exist', function() {
        let verifier = new EbookVerifier()
        verifier.load("./test.epub")
        assert.equal(String(verifier.inputPathType), 'Symbol(UNKNOWN)')
    })
})