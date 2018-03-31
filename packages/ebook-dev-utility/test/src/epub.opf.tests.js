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
                expect(opf.uniqueIdentifier).to.equal('unique-id')
                expect(opf.title[0].value).to.equal('Epub Sample')
                expect(opf.language[0]).to.equal('ja')
                expect(opf.identifier[0].value).to.equal('urn:uuid:xxxx-yyyy-zzzz')
                expect(opf.identifier[0].id).to.equal('unique-id')
                expect(opf.creator[0].value).to.equal('Ebook Utilities')
                expect(opf.creator[0].id).to.equal('creator01')
                expect(opf.meta[0].value).to.equal('2017-01-01T00:00:00Z')
                expect(opf.meta[0].property).to.equal('dcterms:modified')

                expect(Object.keys(opf.manifest.itemMap).length).to.equal(2)
                expect(opf.manifest.itemMap.toc['media-type']).to
                    .equal('application/xhtml+xml')
                expect(opf.manifest.itemMap.toc['href']).to
                    .equal('navigation-documents.xhtml')
                expect(opf.manifest.itemMap.toc['properties']).to
                    .equal('nav')

                expect(opf.spine.pageProgressionDirection).to.equal('ltr')
                expect(opf.spine.itemref.length).to.equal(1)
                expect(opf.spine.itemref[0].linear).to.equal('yes')
                expect(opf.spine.itemref[0].idref).to.equal('p-001')
                expect(opf.spine.itemref[0].resource).to.exist
                expect(opf.spine.itemref[0].resource.href).to
                    .equal('xhtml/p-001.xhtml')
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

        it('should raise error if manifest item miss media-type',
            async function() {
            const opf = path.resolve(this.testPath,
                'illegal-manifest-item-no-media-type.opf')
            const data = fs.readFileSync(opf)
            await this.opf.parse(data).then(opf => {
                expect(opf).to.not.exist
            }, error => {
                expect(error.id).to.equal(EpubError.ErrorType.ERR_EPUB_OPF_MANIFEST_ITEM_NO_MEDIA_TYPE)
            })
        })

        it('should raise error if manifest item miss id',
            async function() {
            const opf = path.resolve(this.testPath,
                'illegal-manifest-item-no-id.opf')
            const data = fs.readFileSync(opf)
            await this.opf.parse(data).then(opf => {
                expect(opf).to.not.exist
            }, error => {
                expect(error.id).to.equal(EpubError.ErrorType.ERR_EPUB_OPF_MANIFEST_ITEM_NO_ID)
            })
        })

        it('should raise error if manifest item miss href',
            async function() {
            const opf = path.resolve(this.testPath,
                'illegal-manifest-item-no-href.opf')
            const data = fs.readFileSync(opf)
            await this.opf.parse(data).then(opf => {
                expect(opf).to.not.exist
            }, error => {
                expect(error.id).to.equal(EpubError.ErrorType.ERR_EPUB_OPF_MANIFEST_ITEM_NO_HREF)
            })
        })

        it('should raise error if not any spine',
            async function() {
            const opf = path.resolve(this.testPath, 'illegal-no-spine.opf')
            const data = fs.readFileSync(opf)
            await this.opf.parse(data).then(opf => {
                expect(opf).to.not.exist
            }, error => {
                expect(error.id).to.equal(EpubError.ErrorType.ERR_EPUB_OPF_PACKAGE_SPINE_COUNT)
            })
        })

        it('should raise error if spine has no itemref',
            async function() {
            const opf = path.resolve(this.testPath, 'illegal-spine-no-itemref.opf')
            const data = fs.readFileSync(opf)
            await this.opf.parse(data).then(opf => {
                expect(opf).to.not.exist
            }, error => {
                expect(error.id).to.equal(EpubError.ErrorType.ERR_EPUB_OPF_SPINE_NO_ITEMREF)
            })
        })

        it('should raise error if itemref idref can not match to item',
            async function() {
            const opf = path.resolve(this.testPath, 'illegal-spine-itemref-not-correct-idref.opf')
            const data = fs.readFileSync(opf)
            await this.opf.parse(data).then(opf => {
                expect(opf).to.not.exist
            }, error => {
                expect(error.id).to.equal(EpubError.ErrorType.ERR_EPUB_OPF_SPINE_ITEMREF_NO_RESOURCE)
            })
        })

        it('should raise error if itemref has no idref',
            async function() {
            const opf = path.resolve(this.testPath, 'illegal-spine-itemref-no-idref.opf')
            const data = fs.readFileSync(opf)
            await this.opf.parse(data).then(opf => {
                expect(opf).to.not.exist
            }, error => {
                expect(error.id).to.equal(EpubError.ErrorType.ERR_EPUB_OPF_SPINE_ITEMREF_NO_IDREF)
            })
        })
    })
})