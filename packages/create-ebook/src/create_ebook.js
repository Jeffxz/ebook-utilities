'use strict'

const chalk = require('chalk')
const commander = require('commander')
const fse = require('fs-extra')
const packageJson = require('../package.json')
const path = require('path')
const EbookDevUtil = require('ebook-dev-utility')

let ebookName
const input = 'epub'
const output = 'output'

const program = new commander.Command(packageJson.name)
    .version(packageJson.version)
    .arguments('<ebook-name>')
    .usage(`${chalk.green('<ebook-name>')} [options]`)
    .action(name => {
        ebookName = name
    })
    .option('-e, --epub', 'Generate a Epub template')
    .option('-p, --package', 'Package epub, default folder is "./epub".')
    .option('-d, --directory [name]', 'setup input epub directory name.')
    .option('-k, --kobo', 'work with -p, will create kepub file instead of epub.')
    .parse(process.argv)

if (typeof ebookName === 'undefined') {
    console.error('I need a name. Please try --help for more detail.')
    process.exit(1)
}
console.log('ebook name:' + chalk`{green ${ebookName}}`)

if (program.package) {
    let inputFolder
    let outputFolder
    if (program.directory) {
        inputFolder = program.directory
        outputFolder = process.cwd()
        console.log('will package folder ' + program.directory)
    } else {
        const ebookPath = path.resolve(ebookName)
        inputFolder = path.join(ebookPath, input)
        outputFolder = path.join(ebookPath, output)
        console.log('will package default folder ./epub ')
    }
    console.log(inputFolder)
    const epubPackage = new EbookDevUtil.EpubPackage(
        ebookName,
        inputFolder
    )
    if (program.kobo) {
        epubPackage.setKoboEpub().save(outputFolder)
    } else {
        epubPackage.save(outputFolder)
    }
}

if (program.epub) {
    const ebookPath = path.resolve(ebookName)
    console.log(`Create a new ebook ${chalk.green(ebookPath)},`)
    fse.ensureDirSync(ebookName)
    process.chdir(ebookPath)

    const outputDir = output
    fse.ensureDirSync(outputDir)

    const epubDir = 'epub'
    fse.ensureDirSync(epubDir)
    process.chdir(epubDir)

    const epubTemplate = new EbookDevUtil.EpubTemplateGenerator(
        process.cwd()
    )
    epubTemplate.build().saveToLocal(process.cwd())
}
