'use stricts'

const Epub = require('./epub')
const fse = require('fs-extra')
const fs = require('fs')
const path = require('path')

class EpubTemplateGenerator {
    constructor() {
        this.oebpsDir = 'OEBPS'
        this.epub = new Epub('template')
    }

    build() {
        this.containerContent = '\
<?xml version="1.0"?>\n\
<container\n\
  version="1.0"\n\
  xmlns="urn:oasis:names:tc:opendocument:xmlns:container" >\n\
  <rootfiles>\n\
  <rootfile\n\
    full-path="OEBPS/standard.opf"\n\
    media-type="application/oebps-package+xml" />\n\
  </rootfiles>\n\
</container>'
        this.opfFile = 'standard.opf'
        this.opfContent = '\
<?xml version="1.0" encoding="UTF-8"?>\n\
<package\n\
  xmlns="http://www.idpf.org/2007/opf"\n\
  version="3.0"\n\
  unique-identifier="unique-id"\n\
  prefix="rendition: http://www.idpf.org/vocab/rendition/#" >\n\
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">\n\
    <dc:title id="title">Epub Sample</dc:title>\n\
    <dc:creator id="creator01">Ebook Utilities</dc:creator>\n\
    <dc:language>ja</dc:language>\n\
    <dc:identifier id="unique-id">urn:uuid:xxxx-yyyy-zzzz</dc:identifier>\n\
    <meta property="dcterms:modified">2017-01-01T00:00:00Z</meta>\n\
  </metadata>\n\
  <manifest>\n\
  <item media-type="application/xhtml+xml" id="toc" href="navigation-documents.xhtml" properties="nav"/>\n\
  <item media-type="application/xhtml+xml" id="p-001" href="xhtml/p-001.xhtml"/>\n\
  </manifest>\n\
  <spine>\n\
  <itemref linear="yes" idref="p-001"/>\n\
  </spine>\n\
</package>'
        this.navFile = "navigation-documents.xhtml"
        this.navContent = '\
<?xml version="1.0" encoding="UTF-8"?>\n\
<!DOCTYPE html>\n\
<html\n\
  xmlns="http://www.w3.org/1999/xhtml"\n\
  xmlns:epub="http://www.idpf.org/2007/ops"\n\
>\n\
  <head>\n\
  <meta charset="UTF-8"/>\n\
  <title>Navigation</title>\n\
  </head>\n\
  <body>\n\
  <nav epub:type="toc" id="toc">\n\
  <h1>Navigation</h1>\n\
  <ol>\n\
    <li><a href="xhtml/p-001.xhtml">Chapter One</a></li>\n\
  </ol>\n\
  </nav>\n\
  </body>\n\
</html>'
        this.xhtmlDir = "xhtml"
        this.sampleXhtmlFile = "p-001.xhtml"
        this.sampleXhtmlContent = '\
<?xml version="1.0" encoding="UTF-8"?>\n\
<!DOCTYPE html>\n\
<html\n\
  xmlns="http://www.w3.org/1999/xhtml"\n\
  xmlns:epub="http://www.idpf.org/2007/ops" >\n\
  <head>\n\
    <meta charset="UTF-8"/>\n\
    <title>Chapter 1</title>\n\
  </head>\n\
  <body>\n\
    <h1>Chapter One</h1>\n\
  </body>\n\
</html>'

        return this
    }

    saveToLocal(dir) {
        process.chdir(dir)

        fs.writeFileSync(
            this.epub.mimetypeFileName,
            this.epub.mimetypeContent
        )

        fse.ensureDirSync(this.epub.metaInfoDir)
        fse.ensureDirSync(this.oebpsDir)

        const oebpsPath = path.resolve(this.oebpsDir)
        process.chdir(this.epub.metaInfoDir)
        fs.writeFileSync(
            this.epub.containerFile,
            this.containerContent
        )

        process.chdir(oebpsPath)
        fs.writeFileSync(
            this.opfFile,
            this.opfContent
        )
        fs.writeFileSync(
            this.navFile,
            this.navContent
        )

        const xhtmlDir = 'xhtml'
        fse.ensureDirSync(xhtmlDir)
        process.chdir(xhtmlDir)

        fs.writeFileSync(
            this.sampleXhtmlFile,
            this.sampleXhtmlContent
        )
    }
}

module.exports = EpubTemplateGenerator