'use strict'

const currentNodeVersion = process.versions.node
const ver = currentNodeVersion.split('.')
const major = ver[0]

class Version {

    static currentNodeVersion() {
        return currentNodeVersion
    }

    static hasCorrectNodeVersion() {
        return major > 4
    }
}

module.exports = Version
