# requiremate


keeps your installed dependencies in sync with the require'd modules in your code.

Tired of these messages?


```bash
__Error: Cannot find module 'wtf@&!#'__
```


> __requiremate__ to the rescue!
> hassle free installing of your required modules.



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

# remove all node_modules fix installs
requiremate --remove

# run with verbose logs
requiremate --verbose

# check installs in a neighbour project (dir option)
requiremate ../my-friends-project --dryrun
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

# sponsored by

[intesso](http://intesso.com)



