'use strict'

const expect = require('chai').expect
const path = require('path')
const fs = require('fs')
const Opf = require('../../lib/epub/opf')
const EpubError = require('../../lib/epub/epub_error')

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
                expect(opf.uniqueIdentitier).to.equal('unique-id')
                expect(opf.title[0].value).to.equal('Epub Sample')
                expect(opf.language[0]).to.equal('ja')
                expect(opf.identifier[0].value).to.equal('urn:uuid:xxxx-yyyy-zzzz')
                expect(opf.identifier[0].id).to.equal('unique-id')
                expect(opf.creator[0].value).to.equal('Ebook Utilities')
                expect(opf.creator[0].id).to.equal('creator01')
                expect(opf.meta[0].value).to.equal('2017-01-01T00:00:00Z')
                expect(opf.meta[0].property).to.equal('dcterms:modified')
        }, error => {
                expect(error).to.not.exist
            })
        })
    })

    describe('Error cases', function() {
        it('should raise error when package element does not exist',
            async function() {
            const opf = path.resolve(this.testPath,
                'illegal-no-package.opf')
            const data = fs.readFileSync(opf)
            await this.opf.parse(data).then(opf => {
                expect(opf).to.not.exist
            }, error => {
                expect(error.id).to.equal(EpubError.ErrorType.ERR_EPUB_OPF_NO_PACKAGE)
            })
        })

        it('should raise error if package is not root element',
            async function() {
            const opf = path.resolve(this.testPath,
                'illegal-package-not-root.opf')
            const data = fs.readFileSync(opf)
            await this.opf.parse(data).then(opf => {
                expect(opf).to.not.exist
            }, error => {
                expect(error.id).to.equal(EpubError.ErrorType.ERR_EPUB_OPF_NO_PACKAGE)
            })
        })

        it('should raise error if package has no version',
            async function() {
            const opf = path.resolve(this.testPath,
                'illegal-package-no-version.opf')
            const data = fs.readFileSync(opf)
            await this.opf.parse(data).then(opf => {
                expect(opf).to.not.exist
        }, error => {
                expect(error.id).to.equal(EpubError.ErrorType.ERR_EPUB_OPF_PACKAGE_NO_VERSION)
            })
        })

        it('should raise error if package has no uniqueid',
            async function() {
            const opf = path.resolve(this.testPath,
                'illegal-package-no-uniqueid.opf')
            const data = fs.readFileSync(opf)
            await this.opf.parse(data).then(opf => {
                expect(opf).to.not.exist
        }, error => {
                expect(error.id).to.equal(EpubError.ErrorType.ERR_EPUB_OPF_PACKAGE_NO_UNIUE_ID)
            })
        })

        it('should raise error if not any metadata',
            async function() {
            const opf = path.resolve(this.testPath,
                'illegal-no-metadata.opf')
            const data = fs.readFileSync(opf)
            await this.opf.parse(data).then(opf => {
                expect(opf).to.not.exist
        }, error => {
                expect(error.id).to.equal(EpubError.ErrorType.ERR_EPUB_OPF_PACKAGE_METADATA_COUNT)
            })
        })
    })
})