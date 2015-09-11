#!/usr/bin/env node

/**
 * module dependencies
 */
var path = require('path');
var shell = require('shelljs');
var chalk = require('chalk');
var defaults = require('defaults');
var slice = require('sliced');
var series = require('run-series');
var dependenciesCheck = require('check-dependencies');
var depcheck = require('depcheck');
var depmissing = require('depmissing');

/**
 *
 * @param o options: verbose, dryrun, remove, withoutDev, ignoreDirs, ignoreMatches, ignorePackages, saveDev, ignoreVersion, dir
 */
module.exports = function requireomat(o, callback) {

  /**
   * get options right
   */

  var options = defaults({}, o);

  var ignoreDirs = [ // Pathnames to ignore
    "sandbox",
    "dist",
    "public",
    "out",
    "temp",
    "bower_components"
  ];

  if (options._ && options._.length > 0) options.dir = options._[0];
  options = defaults(options, {
    "dir": ".",
    "withoutDev": undefined, // Check against devDependencies too
    "ignoreDirs": ignoreDirs,
    "ignore": ignoreDirs,
    "ignoreMatches": [],  // Ignore dependencies that match these minimatch patterns
    "ignorePackages": []
  });
  var dir = options.dir = path.resolve(options.dir);
  if (options.n) options.dryrun = options.n;
  var foundDependencies = [];

  debug('command options', JSON.stringify(options, null, 2));

  shell.cd(dir);
  var pwd = shell.pwd();
  log('requireomat working directory', pwd);

  /**
   * execute tasks
   */

  series([
      remove,     // 0. optional option remove: remove the whole node_modules folder (just to make sure)
      unused,     // 1. remove unused dependencies from file system and package.json
      install,    // 2. install the defined dependencies
      missing,    // 3. install missing dependencies
      version,    // 4. update package.json with installed version
      done        // 5. say good bye, call callback
    ], function end(err, result) {
      if (callback) callback(err, result);
    }
  );

  /**
   * define tasks.
   *
   * @param cb callback
   */

  function unused(cb) {

    info('start searching for unused dependencies');

    depcheck(options.dir, options, function(unused) {

      unused.dependencies.forEach(function(dep) {
        debug('unused dependency', unused.dependencies);
        exec('npm r --save ' + dep);
      });

      unused.devDependencies.forEach(function(dep) {
        debug('unused devDependency', unused.devDependencies);
        exec('npm r --save-dev ' + dep);
      });

      Object.keys(unused.invalidFiles).forEach(function(key) {
        var value = unused.invalidFiles[key];
        log('found invalid file', key, value);
      });

      cb();

    });
  }

  function remove(cb) {

    if (options.remove) {

      info('ATTENTION: removing existing node_modules folder');

      exec('rm -rf node_modules');

    }

    cb();

  }

  function install(cb) {

    info('start installing defined dependencies');

    exec('npm install');

    cb();

  }

  function missing(cb) {

    info('start searching for missing dependencies');

    depmissing(options.dir, options, function(found) {

      var save = (options.saveDev) ? '--save-dev' : '--save';

      Object.keys(found.missing).forEach(function(dep) {
        var file = found.missing[dep];
        debug('missing dependency', dep, file);
        exec('npm i ' + save + ' ' + dep);
      });

      Object.keys(found.invalidFiles).forEach(function(key) {
        var value = found.invalidFiles[key];
        log('found invalid file', key, value);
      });

      foundDependencies = found.dependencies;

      cb();

    });

  }

  function version(cb) {

    info('start checking version');

    if (options.ignoreVersion) return cb();

    var output = dependenciesCheck.sync({
      packageDir: dir,
      onlySpecified: !options.dryrun,
      install: !options.dryrun,
      verbose: options.verbose || options.dryrun
    });

    if (output.error.length > 0) {
      log('version errors', output.error.join(' | '));
    }

    cb();

  }

  function done(cb) {

    debug('these are your dependencies', foundDependencies.join(' '));

    info('all done!');

    cb();

  }

  /**
   * helper functions
   */

  function exec(cmd) {
    if (options.dryrun) return;
    try {
      return shell.exec(cmd);
    } catch (err) {
      error('ERROR could execute command', cmd, err.message);
    }
  }

  function debug() {
    if (!options.verbose && !options.dryrun) return;
    var args = slice(arguments);
    console.log(chalk.cyan.inverse(args.shift()), args.join(' '));

  }

  function info() {
    if (!options.verbose && !options.dryrun) return;
    var args = slice(arguments);
    console.log(chalk.blue.inverse(args.shift()), args.join(' '));
  }

  function log() {
    var args = slice(arguments);
    console.log(chalk.inverse(args.shift()), args.join(' '));
  }

  function error() {
    var args = slice(arguments);
    console.log(chalk.red.inverse(args.shift()), args.join(' '));
  }

};

/**
 * run from command line
 */
if (require.main === module) {
  var args = require('subarg')(process.argv.slice(2));
  module.exports(args, function(err, result){
    var code = (err) ? -1 : 0;
    process.exit(code);
  });
}
