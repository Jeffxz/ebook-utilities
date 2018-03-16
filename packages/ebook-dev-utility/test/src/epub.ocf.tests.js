const expect = require('chai').expect
const path = require('path')
const fs = require('fs')
const Ocf = require('../../lib/epub/ocf')

describe('Ocf', function() {
    before(function () {
        this.testPath = path.resolve(__dirname, '../fixtures/ocf')
    })

    beforeEach(function() {
        this.ocf = new Ocf()
    })

    describe('Container', function () {
        describe('Normal cases', function() {
            it('should can find opf path', async function() {
                const normalContainer = path.resolve(this.testPath,
                    'container-normal.xml')
                const data = fs.readFileSync(normalContainer)
                await this.ocf.parse(data).then(opfPath => {
                    expect(opfPath.length).to.equal(1)
                    expect(opfPath[0]).to.equal('EPUB/package.opf')
                }, error => {
                    expect(error).to.not.exist
                })
            })

            it('should have all opf path when there are multiple rootfile elements',
                async function() {
                const normalContainer = path.resolve(this.testPath,
                    'container-normal-two-rootfile.xml')
                const data = fs.readFileSync(normalContainer)
                await this.ocf.parse(data).then(opfPath => {
                    expect(opfPath.length).to.equal(2)
                    expect(opfPath[0]).to.equal('EPUB/package.opf')
                    expect(opfPath[1]).to.equal('EPUB/package-second.opf')
                    expect(this.ocf.defaultOpf()).to.equal('EPUB/package.opf')
            }, error => {
                    expect(error).to.not.exist
                })
            })
        })

        describe('Error cases', function() {
            it('should raise error if can not find container as root',
                async function() {
                const noRootContainer = path.resolve(this.testPath,
                    'container-no-root-container.xml')
                const data = fs.readFileSync(noRootContainer)
                await this.ocf.parse(data).then(opfPath => {
                    expect(opfPath).to.not.exist
            }, error => {
                    expect(error).to.exist
                })
            })

            it('should raise error if can not find any rootfiles element',
                async function() {
                const noRootfilesContainer = path.resolve(this.testPath,
                    'container-no-rootfiles.xml')
                const data = fs.readFileSync(noRootfilesContainer)
                await this.ocf.parse(data).then(opfPath => {
                    expect(opfPath).to.not.exist
            }, error => {
                    expect(error).to.exist
                })
            })
        })
    });
})