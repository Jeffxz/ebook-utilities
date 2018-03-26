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
.option('-o, --output [name]', 'save a single file to local. This need to be used with -f')
.option('-l, --list', 'list files.')
.option('-f, --file [name]', 'file or directory information.')
    .parse(process.argv)

if (typeof ebookPath === 'undefined') {
    console.error('I need a file name or path. Please try --help for more detail.')
    process.exit(1)
}

var dumper = new EbookDumper()
if (program.file) {
    if (program.output) {
        dumper.saveFlie('output to file ' + program.output)
    } else {
        dumper.showFile(ebookPath, program.file)
    }
} else if (program.list) {
    dumper.listFiles(ebookPath)
} else {
    dumper.simpleJson(ebookPath)
}
