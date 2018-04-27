'use strict'

let warnings = []
let errors = []

class Reporter {
    static addWarning(message) {
        warnings.push(message)
    }

    static addError(message) {
        errors.push(message)
    }

    static listWarnings() {
        return warnings
    }

    static listErrors() {
        return errors
    }

    static reset() {
        warnings = []
        errors = []
    }
}

module.exports = Reporter