#!/usr/bin/env node

'use strict'

const chalk = require('chalk')
const commander = require('commander')
const packageJson = require('./package.json')
const EbookDevUtil = require('ebook-dev-utility')
const EbookDumper = require('./src/ebook_dumper')

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

let ebookPath

const program = new commander.Command(packageJson.name)
    .version(packageJson.version)
    .arguments('<ebook-path>')
    .usage(`${chalk.green('<ebook-path>')} [options]`)
    .action(str => {
    ebookPath = str
})
.option('-s, --server', 'start verification server.')
.option('-l, --list', 'list files.')
    .parse(process.argv)

if (typeof ebookPath === 'undefined') {
    console.error('I need a file name or path. Please try --help for more detail.')
    process.exit(1)
}

var dumper = new EbookDumper()
if (program.server) {
    console.log('Not yet. ' +
        'Please use standalone version (run without "-s") at this moment.')
} else if (program.list) {
    dumper.listFiles(ebookPath)
} else {
    dumper.simpleJson(ebookPath)
}
