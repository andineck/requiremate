# requiremate


keeps your installed dependencies in sync with the require'd modules in your code.

**Tired of these messages?**


```bash
Error: Cannot find module 'wtf@&!#'
```


> __requiremate__ to the rescue!
> hassle free installing of your required modules.


> Not sure if you have got too many dependencies in your package.json?

> Want to know if the installed version are the defined ones?

> Want a simple command to keep your installed and defined dependencies in sync with the required modules in your code?

to check, run:
```bash
requiremate -n
```

to fix it, run:
```bash
requiremate
```



# install
install it globally, you won't regret it. it is really useful for every module you develop.

```bash
npm install -g requiremate
```

# usage

 1. make sure you have got a package.json
 2. write your code (you don't have to do any `npm install`
 3. before you run your code, run: `requiremate` in the root directory of your project.
 4. done.


## command line usage
command line options are handled with [subarg](https://npmjs.org/subarg).

```bash

# dryrun without action, only report
requiremate -n

# fix installs in the current directory
requiremate

# remove all node_modules and fix installs
requiremate --remove

# run with verbose logs
requiremate --verbose

# check installs in a neighbour project (dir option)
requiremate ../my-friends-project --dryrun
```


## example report

```bash

requiremate -n

requiremate working directory /Users/andineck/Development/github/requiremate
start searching for unused dependencies
start installing defined dependencies
start searching for missing dependencies
start checking version
chalk: installed: 1.1.1, expected: ^1.1.1
check-dependencies: installed: 0.9.5, expected: ^0.9.5
defaults: installed: 1.0.2, expected: ^1.0.2
depcheck: installed: 0.4.7, expected: ^0.4.7
depmissing: installed: 0.1.2, expected: ^0.1.1
run-series: installed: 1.1.2, expected: ^1.1.2
shelljs: installed: 0.5.3, expected: ^0.5.3
sliced: installed: 1.0.1, expected: ^1.0.1
subarg: installed: 1.0.0, expected: ^1.0.0
tape: installed: 4.2.0, expected: ^4.2.0
these are your dependencies chalk check-dependencies defaults depcheck depmissing run-series shelljs sliced subarg tape
all done!

```

## node.js usage

```javascript
var requiremate = require('requiremate');

var options = {
  "dryrun": true,
  "dir": "/my/computer/my-project",
  "withoutDev": false,
  "ignoreDirs": [
    "sandbox",
    "dist",
    "bower_components"
  ],
  "ignore": [
    "sandbox",
    "dist",
    "bower_components"
  ],
  "ignoreMatches": [],
  "ignorePackages": []
}

requiremate(options);

```

# how does it work

`requiremate` follows this workfow (taken from code)

 ```javascript

   series([
      remove,     // 0. optional option remove: remove the whole node_modules folder (just to make sure)
      unused,     // 1. remove unused dependencies from file system and package.json
      install,    // 2. install the defined dependencies
      missing,    // 3. install missing dependencies
      version,    // 4. update package.json with installed version
      done        // 5. say good bye, call callback
   ]);

 ```

# options

you can run `requiremate` from the __command line__ as well as from your __node.js__ code.

available options:

 - verbose (alias: n)
 - dryrun
 - remove
 - withoutDev
 - ignoreDirs
 - ignoreMatches
 - ignorePackages
 - saveDev
 - ignoreVersion
 - dir


# license

MIT


# author

Andi Neck | [@andineck](https://twitter.com/andineck) | andi.neck@intesso.com


# sponsored by

[intesso](http://intesso.com)



