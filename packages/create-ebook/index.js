#!/usr/bin/env node

'use strict';

var chalk = require('chalk');

var version = process.versions.node.split('.');
var major = version[0];

console.log('Your current version of Node is '+ JSON.stringify(version.join(',')))

if (major < 4) {
  console.error(
    chalk.red(
      'You are running Node ' +
        currentNodeVersion +
        '.\n' +
        'Create Ebook requires Node 4 or higher. \n' +
        'Please update your version of Node.'
    )
  );
  process.exit(1);
}

require('./createEbook');