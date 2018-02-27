'use strict';

const chalk = require('chalk');
const commander = require('commander');
const fse = require('fs-extra');
const fs = require('fs');
const packageJson = require('./package.json');
const path = require('path');

let ebookName;
let isEpub = true; // default

const program = new commander.Command(packageJson.name)
    .version(packageJson.version)
    .arguments('<ebook-directory>')
    .usage(`${chalk.green('<ebook-directory>')} [options]`)
    .action(name => {
        ebookName = name;
    })
    .option('-e, --epub', 'Create a Epub template')
    .parse(process.argv);


const ebookPath = path.resolve(ebookName);
console.log(`Create a new ebook ${chalk.green(ebookPath)},`);
fse.ensureDirSync(ebookName);
process.chdir(ebookPath);

const metaInfoDir = "META-INF"
fse.ensureDirSync(metaInfoDir);

const itemDir = "item";
fse.ensureDirSync(itemDir);

const mimeyypeFile = "mimetype"
const mimetype = "application/epub+zip"
fs.writeFileSync(mimeyypeFile, mimetype);

process.chdir(metaInfoDir)
const containerFile = "container.xml"
const container = '
<?xml version="1.0"?>
<container
version="1.0"
xmlns="urn:oasis:names:tc:opendocument:xmlns:container"
    >
    <rootfiles>
    <rootfile
full-path="item/standard.opf"
media-type="application/oebps-package+xml"
    />
    </rootfiles>
    </container>
'
