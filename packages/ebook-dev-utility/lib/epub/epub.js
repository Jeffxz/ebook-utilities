'use strict'

class Epub {
    constructor(name) {
        this.name = name
        this.metaInfoDir = 'META-INF'
        this.mimetypeFileName = 'mimetype'
        this.mimetypeContent = 'application/epub+zip'
        this.containerFile = 'container.xml'
    }
}

module.exports = Epub
