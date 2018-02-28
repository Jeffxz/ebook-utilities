'use strict';

const chalk = require('chalk');
const commander = require('commander');
const fse = require('fs-extra');
const fs = require('fs');
const JSZip = require('jszip');
const packageJson = require('./package.json');
const path = require('path');

let ebookName;
const extension = ".epub";
const output = "output";
const mimetypeFileName = "mimetype";

const program = new commander.Command(packageJson.name)
    .version(packageJson.version)
    .arguments('<ebook-name>')
    .usage(`${chalk.green('<ebook-name>')} [options]`)
    .action(name => {
        ebookName = name;
    })
    .option('-e, --epub', 'Generate a Epub template')
    .option('-p, --package', 'Package epub, default folder is "./epub".')
    .option('-d, --directory [name]', 'setup input epub directory name.')
    .option('-k, --kobo', 'work with -p, will create kepub file instead of epub.')
    .parse(process.argv);

if (typeof ebookName === 'undefined') {
    console.error('I need a name. Please try --help for more detail.')
    process.exit(1);
}
console.log("ebook name:" + chalk`{green ${ebookName}}`);

if (program.package) {
    var inputFolder;
    var outputFolder;
    if (program.directory) {
        inputFolder = program.directory;
        outputFolder = './';
        console.log("will package folder " + program.directory);
    } else {
        const ebookPath = path.resolve(ebookName);
        inputFolder = path.join(ebookPath, "epub");
        outputFolder = path.join(ebookPath, output);
        console.log("will package default folder ./epub ");
    }
    var fileName;
    if (program.kobo) {
        fileName = ebookName + ".kepub" + extension;
    } else {
        fileName = ebookName + extension;
    }

    process.chdir(inputFolder);
    var zip = new JSZip();
    var contents = fs.readFileSync(mimetypeFileName);
    zip.file(mimetypeFileName, contents);

    zipFolderRecursively('./');

    function zipFolderRecursively(folderName) {
        fs.readdirSync(folderName).forEach(item => {
            var pathName = path.join(folderName, item);
            var stat = fs.lstatSync(pathName);
            console.log("file " + pathName + " mode: " + stat.mode);
            if (stat.isFile()) {
                if (item != mimetypeFileName) {
                    var data = fs.readFileSync(pathName);
                    zip.file(pathName, data, {
                        createFolders: false,
                        compression: "DEFLATE",
                        unixPermissions: stat.mode
                    });
                }
            } else {
                var pathName = path.normalize(path.join(folderName, item));
                var stat = fs.lstatSync(pathName);
                console.log("folder " + pathName + " mode: " + stat.mode);
                zip.folder(pathName);
                zipFolderRecursively(pathName);
            }
        });
    }
    process.chdir(outputFolder);
    zip.generateAsync({
            type: "nodebuffer",
            platform: process.platform
        }).then(content => {
            fs.writeFileSync(fileName, content);
            console.log(fileName + " is created");
        });
    console.log(zip.files);
}

if (program.epub) {
    const ebookPath = path.resolve(ebookName);
    console.log(`Create a new ebook ${chalk.green(ebookPath)},`);
    fse.ensureDirSync(ebookName);
    process.chdir(ebookPath);

    const outputDir = output;
    fse.ensureDirSync(outputDir);

    const epubDir = "epub";
    fse.ensureDirSync(epubDir);
    process.chdir(epubDir);

    const metaInfoDir = "META-INF"
    fse.ensureDirSync(metaInfoDir);

    const oebpsDir = "OEBPS";
    fse.ensureDirSync(oebpsDir);
    const oebpsPath = path.resolve(oebpsDir);
    console.log(oebpsPath);

    const mimetypeFile = mimetypeFileName;
    const mimetypeContent = "application/epub+zip"
    fs.writeFileSync(mimetypeFile, mimetypeContent);

    process.chdir(metaInfoDir)
    const containerFile = "container.xml"
    const containerContent = '\
<?xml version="1.0"?>\n\
<container\n\
  version="1.0"\n\
  xmlns="urn:oasis:names:tc:opendocument:xmlns:container" >\n\
  <rootfiles>\n\
  <rootfile\n\
    full-path="OEBPS/standard.opf"\n\
    media-type="application/oebps-package+xml" />\n\
  </rootfiles>\n\
</container>';
    fs.writeFileSync(containerFile, containerContent);

    process.chdir(oebpsPath);
    const opfFile = "standard.opf";
    const opfContent = '\
<?xml version="1.0" encoding="UTF-8"?>\n\
<package\n\
  xmlns="http://www.idpf.org/2007/opf"\n\
  version="3.0"\n\
  unique-identifier="unique-id"\n\
  prefix="rendition: http://www.idpf.org/vocab/rendition/#" >\n\
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">\n\
    <dc:title id="title">Epub Sample</dc:title>\n\
    <dc:creator id="creator01">Ebook Utilities</dc:creator>\n\
    <dc:language>ja</dc:language>\n\
    <dc:identifier id="unique-id">urn:uuid:xxxx-yyyy-zzzz</dc:identifier>\n\
    <meta property="dcterms:modified">2017-01-01T00:00:00Z</meta>\n\
  </metadata>\n\
  <manifest>\n\
  <item media-type="application/xhtml+xml" id="toc" href="navigation-documents.xhtml" properties="nav"/>\n\
  <item media-type="application/xhtml+xml" id="p-001" href="xhtml/p-001.xhtml"/>\n\
  </manifest>\n\
  <spine>\n\
  <itemref linear="yes" idref="p-001"/>\n\
  </spine>\n\
</package>';
    fs.writeFileSync(opfFile, opfContent);

    const navFile = "navigation-documents.xhtml"
    const navContent = '\
<?xml version="1.0" encoding="UTF-8"?>\n\
<!DOCTYPE html>\n\
<html\n\
  xmlns="http://www.w3.org/1999/xhtml"\n\
  xmlns:epub="http://www.idpf.org/2007/ops"\n\
>\n\
  <head>\n\
  <meta charset="UTF-8"/>\n\
  <title>Navigation</title>\n\
  </head>\n\
  <body>\n\
  <nav epub:type="toc" id="toc">\n\
  <h1>Navigation</h1>\n\
  <ol>\n\
    <li><a href="xhtml/p-001.xhtml">Chapter One</a></li>\n\
  </ol>\n\
  </nav>\n\
  </body>\n\
</html>';
    fs.writeFileSync(navFile, navContent);

    const xhtmlDir = "xhtml";
    fse.ensureDirSync(xhtmlDir);
    process.chdir(xhtmlDir);

    const sampleXhtmlFile = "p-001.xhtml";
    const sampleXhtmlContent = '\
<?xml version="1.0" encoding="UTF-8"?>\n\
<!DOCTYPE html>\n\
<html\n\
  xmlns="http://www.w3.org/1999/xhtml"\n\
  xmlns:epub="http://www.idpf.org/2007/ops" >\n\
  <head>\n\
    <meta charset="UTF-8"/>\n\
    <title>Chapter 1</title>\n\
  </head>\n\
  <body>\n\
    <h1>Chapter One</h1>\n\
  </body>\n\
</html>';
    fs.writeFileSync(sampleXhtmlFile, sampleXhtmlContent);
}
