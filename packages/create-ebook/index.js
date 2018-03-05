#!/usr/bin/env node

'use strict'

const chalk = require('chalk')
const EbookDevUtil = require('ebook-dev-utility')

const currentNodeVersion = EbookDevUtil.Version.currentNodeVersion()
console.log('Your current version of Node is '+ currentNodeVersion)

if (!EbookDevUtil.Version.hasCorrectNodeVersion()) {
    console.error(
        chalk.red(
            'You are running Node ' +
            currentNodeVersion +
            '.\n' +
            'Create Ebook requires Node 4 or higher. \n' +
            'Please update your version of Node.'
            )
    )
    process.exit(1)
}

require('./src/create_ebook');
