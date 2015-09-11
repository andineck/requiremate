# requireomat


keeps your installed dependencies in sync with the require'd modules in your code.

Tired of these messages?


```bash
__Error: Cannot find module 'wtf@&!#'__
```


> __requireomat__ to the rescue!
> hassle free installing of your required modules.



# install
install it globally, you won't regret it. it is really useful for every module you develop.

```bash
npm install -g requireomat
```

# usage

 1. make sure you have got a package.json
 2. write your code (you don't have to do any `npm install`
 3. before you run your code, run: `requireomat` in the root directory of your project.
 4. done.


# how does it work

`requireomat` follows this workfow (taken from code)

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

you can run `requireomat` from the __command line__ as well as from your __node.js__ code.

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


## command line
command line options are handled with [subarg](https://npmjs.org/subarg).

```bash

# dryrun without action, only report
requireomat -n

# fix installs in the current directory
requireomat

# run with verbose logs
requireomat --verbose

# check installs in a neighbour project (dir option)
requireomat ../my-friends-project --dryrun
```

## node.js

```javascript
var requireomat = require('requireomat');

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

requireomat(options);

```

# license

MIT

# sponsored by

[intesso](http://intesso.com)



