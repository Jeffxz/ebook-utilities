'use strict'

class Ocf {
    constructor() {
        this.metaInfoDir = 'META-INF'
        this.mimetypeFileName = 'mimetype'
        this.mimetypeContent = 'application/epub+zip'
        this.containerFile = 'container.xml'
    }
}

module.exports = Ocf