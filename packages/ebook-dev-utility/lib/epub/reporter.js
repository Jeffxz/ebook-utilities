'use strict'

class Reporter {
    constructor() {
        this.warnings = []
        this.errors = []
    }

    addWarning(message) {
        this.warnings.add(message)
    }

    addError(message) {
        this.errors.add(message)
    }
}

module.exports = Reporter