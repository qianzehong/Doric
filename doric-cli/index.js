#!/usr/bin/env node

var program = require('commander');


var program = require('commander');

program
    .command('create <name>')
    .option('-n, --native', 'Native')
    .action(function (name, cmd) {
        console.log('create ' + name + (cmd.native ? ' native' : 'js'))
    })
program
    .command('dev')
    .action(function () {
        require('./scripts/watcher')
    })
program.parse(process.argv)
console.log(process.cwd())