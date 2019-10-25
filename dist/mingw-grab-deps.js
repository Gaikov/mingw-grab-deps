/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const FileUtils_1 = __webpack_require__(1);
const FilePath_1 = __webpack_require__(47);
const Grabber_1 = __webpack_require__(78);
console.log("Hello from GROm!");
if (process.argv.length < 3) {
    console.error("executable is not specified!");
    process.exit(-1);
}
const targetExe = new FilePath_1.FilePath(process.argv[2]);
console.log("processing exec: ", targetExe.path);
const config = FileUtils_1.FileUtils.readJson(new FilePath_1.FilePath(process.cwd() + "/config.json"));
if (!config) {
    process.exit(-1);
}
const ntldd = config["ntldd-exec"];
if (!ntldd) {
    console.error("ntldd is not specified in the config");
    process.exit(-1);
}
const grabber = new Grabber_1.Grabber();
grabber.grab(ntldd, targetExe.path).then(() => {
    console.log("DONE");
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const fs = __webpack_require__(2);
const fs_extra_1 = __webpack_require__(2);
const fs_1 = __webpack_require__(6);
class FileUtils {
    static readText(file) {
        try {
            return fs_1.readFileSync(file.path, "utf8");
        }
        catch (error) {
            console.warn("can't read text: ", file.path);
        }
        return null;
    }
    static writeText(file, text) {
        try {
            fs_1.writeFileSync(file.path, text);
            return false;
        }
        catch (error) {
            console.warn("can't write text: ", file.path);
        }
        return true;
    }
    static readJson(file) {
        console.info("...reading json: ", file.path);
        try {
            return fs_extra_1.readJSONSync(file.path, { encoding: "utf8" });
        }
        catch (error) {
            console.warn("can't read json: ", file.path);
        }
        return null;
    }
    static writeJson(file, json) {
        console.info("...writing json: ", file.path);
        if (!file.createFolder()) {
            return false;
        }
        try {
            fs_extra_1.writeJSONSync(file.path, json, { encoding: "utf8", spaces: "\t" });
        }
        catch (error) {
            console.warn("can't write json:", file.path);
            return false;
        }
        return true;
    }
    static recursiveFound(targetDirectory, folderHandler, fileHandler) {
        if (!targetDirectory.isFolder) {
            return;
        }
        fs.readdirSync(targetDirectory.path)
            .forEach(file => {
            const filePath = targetDirectory.resolvePath(file);
            if (filePath.isFolder) {
                if (folderHandler) {
                    folderHandler(filePath);
                }
                this.recursiveFound(filePath, folderHandler, fileHandler);
            }
            else {
                if (fileHandler) {
                    fileHandler(filePath);
                }
            }
        });
    }
}
exports.FileUtils = FileUtils;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Object.assign(
  {},
  // Export promiseified graceful-fs:
  __webpack_require__(3),
  // Export extra methods:
  __webpack_require__(14),
  __webpack_require__(25),
  __webpack_require__(28),
  __webpack_require__(31),
  __webpack_require__(37),
  __webpack_require__(17),
  __webpack_require__(42),
  __webpack_require__(44),
  __webpack_require__(46),
  __webpack_require__(27),
  __webpack_require__(29)
)

// Export fs.promises as a getter property so that we don't trigger
// ExperimentalWarning before fs.promises is actually accessed.
const fs = __webpack_require__(6)
if (Object.getOwnPropertyDescriptor(fs, 'promises')) {
  Object.defineProperty(module.exports, 'promises', {
    get () { return fs.promises }
  })
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// This is adapted from https://github.com/normalize/mz
// Copyright (c) 2014-2016 Jonathan Ong me@jongleberry.com and Contributors
const u = __webpack_require__(4).fromCallback
const fs = __webpack_require__(5)

const api = [
  'access',
  'appendFile',
  'chmod',
  'chown',
  'close',
  'copyFile',
  'fchmod',
  'fchown',
  'fdatasync',
  'fstat',
  'fsync',
  'ftruncate',
  'futimes',
  'lchown',
  'lchmod',
  'link',
  'lstat',
  'mkdir',
  'mkdtemp',
  'open',
  'readFile',
  'readdir',
  'readlink',
  'realpath',
  'rename',
  'rmdir',
  'stat',
  'symlink',
  'truncate',
  'unlink',
  'utimes',
  'writeFile'
].filter(key => {
  // Some commands are not available on some systems. Ex:
  // fs.copyFile was added in Node.js v8.5.0
  // fs.mkdtemp was added in Node.js v5.10.0
  // fs.lchown is not available on at least some Linux
  return typeof fs[key] === 'function'
})

// Export all keys:
Object.keys(fs).forEach(key => {
  if (key === 'promises') {
    // fs.promises is a getter property that triggers ExperimentalWarning
    // Don't re-export it here, the getter is defined in "lib/index.js"
    return
  }
  exports[key] = fs[key]
})

// Universalify async methods:
api.forEach(method => {
  exports[method] = u(fs[method])
})

// We differ from mz/fs in that we still ship the old, broken, fs.exists()
// since we are a drop-in replacement for the native module
exports.exists = function (filename, callback) {
  if (typeof callback === 'function') {
    return fs.exists(filename, callback)
  }
  return new Promise(resolve => {
    return fs.exists(filename, resolve)
  })
}

// fs.read() & fs.write need special treatment due to multiple callback args

exports.read = function (fd, buffer, offset, length, position, callback) {
  if (typeof callback === 'function') {
    return fs.read(fd, buffer, offset, length, position, callback)
  }
  return new Promise((resolve, reject) => {
    fs.read(fd, buffer, offset, length, position, (err, bytesRead, buffer) => {
      if (err) return reject(err)
      resolve({ bytesRead, buffer })
    })
  })
}

// Function signature can be
// fs.write(fd, buffer[, offset[, length[, position]]], callback)
// OR
// fs.write(fd, string[, position[, encoding]], callback)
// We need to handle both cases, so we use ...args
exports.write = function (fd, buffer, ...args) {
  if (typeof args[args.length - 1] === 'function') {
    return fs.write(fd, buffer, ...args)
  }

  return new Promise((resolve, reject) => {
    fs.write(fd, buffer, ...args, (err, bytesWritten, buffer) => {
      if (err) return reject(err)
      resolve({ bytesWritten, buffer })
    })
  })
}

// fs.realpath.native only available in Node v9.2+
if (typeof fs.realpath.native === 'function') {
  exports.realpath.native = u(fs.realpath.native)
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.fromCallback = function (fn) {
  return Object.defineProperty(function () {
    if (typeof arguments[arguments.length - 1] === 'function') fn.apply(this, arguments)
    else {
      return new Promise((resolve, reject) => {
        arguments[arguments.length] = (err, res) => {
          if (err) return reject(err)
          resolve(res)
        }
        arguments.length++
        fn.apply(this, arguments)
      })
    }
  }, 'name', { value: fn.name })
}

exports.fromPromise = function (fn) {
  return Object.defineProperty(function () {
    const cb = arguments[arguments.length - 1]
    if (typeof cb !== 'function') return fn.apply(this, arguments)
    else fn.apply(this, arguments).then(r => cb(null, r), cb)
  }, 'name', { value: fn.name })
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var fs = __webpack_require__(6)
var polyfills = __webpack_require__(7)
var legacy = __webpack_require__(9)
var clone = __webpack_require__(11)

var util = __webpack_require__(12)

/* istanbul ignore next - node 0.x polyfill */
var gracefulQueue
var previousSymbol

/* istanbul ignore else - node 0.x polyfill */
if (typeof Symbol === 'function' && typeof Symbol.for === 'function') {
  gracefulQueue = Symbol.for('graceful-fs.queue')
  // This is used in testing by future versions
  previousSymbol = Symbol.for('graceful-fs.previous')
} else {
  gracefulQueue = '___graceful-fs.queue'
  previousSymbol = '___graceful-fs.previous'
}

function noop () {}

var debug = noop
if (util.debuglog)
  debug = util.debuglog('gfs4')
else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ''))
  debug = function() {
    var m = util.format.apply(util, arguments)
    m = 'GFS4: ' + m.split(/\n/).join('\nGFS4: ')
    console.error(m)
  }

// Once time initialization
if (!global[gracefulQueue]) {
  // This queue can be shared by multiple loaded instances
  var queue = []
  Object.defineProperty(global, gracefulQueue, {
    get: function() {
      return queue
    }
  })

  // Patch fs.close/closeSync to shared queue version, because we need
  // to retry() whenever a close happens *anywhere* in the program.
  // This is essential when multiple graceful-fs instances are
  // in play at the same time.
  fs.close = (function (fs$close) {
    function close (fd, cb) {
      return fs$close.call(fs, fd, function (err) {
        // This function uses the graceful-fs shared queue
        if (!err) {
          retry()
        }

        if (typeof cb === 'function')
          cb.apply(this, arguments)
      })
    }

    Object.defineProperty(close, previousSymbol, {
      value: fs$close
    })
    return close
  })(fs.close)

  fs.closeSync = (function (fs$closeSync) {
    function closeSync (fd) {
      // This function uses the graceful-fs shared queue
      fs$closeSync.apply(fs, arguments)
      retry()
    }

    Object.defineProperty(closeSync, previousSymbol, {
      value: fs$closeSync
    })
    return closeSync
  })(fs.closeSync)

  if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || '')) {
    process.on('exit', function() {
      debug(global[gracefulQueue])
      __webpack_require__(13).equal(global[gracefulQueue].length, 0)
    })
  }
}

module.exports = patch(clone(fs))
if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs.__patched) {
    module.exports = patch(fs)
    fs.__patched = true;
}

function patch (fs) {
  // Everything that references the open() function needs to be in here
  polyfills(fs)
  fs.gracefulify = patch

  fs.createReadStream = createReadStream
  fs.createWriteStream = createWriteStream
  var fs$readFile = fs.readFile
  fs.readFile = readFile
  function readFile (path, options, cb) {
    if (typeof options === 'function')
      cb = options, options = null

    return go$readFile(path, options, cb)

    function go$readFile (path, options, cb) {
      return fs$readFile(path, options, function (err) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([go$readFile, [path, options, cb]])
        else {
          if (typeof cb === 'function')
            cb.apply(this, arguments)
          retry()
        }
      })
    }
  }

  var fs$writeFile = fs.writeFile
  fs.writeFile = writeFile
  function writeFile (path, data, options, cb) {
    if (typeof options === 'function')
      cb = options, options = null

    return go$writeFile(path, data, options, cb)

    function go$writeFile (path, data, options, cb) {
      return fs$writeFile(path, data, options, function (err) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([go$writeFile, [path, data, options, cb]])
        else {
          if (typeof cb === 'function')
            cb.apply(this, arguments)
          retry()
        }
      })
    }
  }

  var fs$appendFile = fs.appendFile
  if (fs$appendFile)
    fs.appendFile = appendFile
  function appendFile (path, data, options, cb) {
    if (typeof options === 'function')
      cb = options, options = null

    return go$appendFile(path, data, options, cb)

    function go$appendFile (path, data, options, cb) {
      return fs$appendFile(path, data, options, function (err) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([go$appendFile, [path, data, options, cb]])
        else {
          if (typeof cb === 'function')
            cb.apply(this, arguments)
          retry()
        }
      })
    }
  }

  var fs$readdir = fs.readdir
  fs.readdir = readdir
  function readdir (path, options, cb) {
    var args = [path]
    if (typeof options !== 'function') {
      args.push(options)
    } else {
      cb = options
    }
    args.push(go$readdir$cb)

    return go$readdir(args)

    function go$readdir$cb (err, files) {
      if (files && files.sort)
        files.sort()

      if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
        enqueue([go$readdir, [args]])

      else {
        if (typeof cb === 'function')
          cb.apply(this, arguments)
        retry()
      }
    }
  }

  function go$readdir (args) {
    return fs$readdir.apply(fs, args)
  }

  if (process.version.substr(0, 4) === 'v0.8') {
    var legStreams = legacy(fs)
    ReadStream = legStreams.ReadStream
    WriteStream = legStreams.WriteStream
  }

  var fs$ReadStream = fs.ReadStream
  if (fs$ReadStream) {
    ReadStream.prototype = Object.create(fs$ReadStream.prototype)
    ReadStream.prototype.open = ReadStream$open
  }

  var fs$WriteStream = fs.WriteStream
  if (fs$WriteStream) {
    WriteStream.prototype = Object.create(fs$WriteStream.prototype)
    WriteStream.prototype.open = WriteStream$open
  }

  Object.defineProperty(fs, 'ReadStream', {
    get: function () {
      return ReadStream
    },
    set: function (val) {
      ReadStream = val
    },
    enumerable: true,
    configurable: true
  })
  Object.defineProperty(fs, 'WriteStream', {
    get: function () {
      return WriteStream
    },
    set: function (val) {
      WriteStream = val
    },
    enumerable: true,
    configurable: true
  })

  // legacy names
  var FileReadStream = ReadStream
  Object.defineProperty(fs, 'FileReadStream', {
    get: function () {
      return FileReadStream
    },
    set: function (val) {
      FileReadStream = val
    },
    enumerable: true,
    configurable: true
  })
  var FileWriteStream = WriteStream
  Object.defineProperty(fs, 'FileWriteStream', {
    get: function () {
      return FileWriteStream
    },
    set: function (val) {
      FileWriteStream = val
    },
    enumerable: true,
    configurable: true
  })

  function ReadStream (path, options) {
    if (this instanceof ReadStream)
      return fs$ReadStream.apply(this, arguments), this
    else
      return ReadStream.apply(Object.create(ReadStream.prototype), arguments)
  }

  function ReadStream$open () {
    var that = this
    open(that.path, that.flags, that.mode, function (err, fd) {
      if (err) {
        if (that.autoClose)
          that.destroy()

        that.emit('error', err)
      } else {
        that.fd = fd
        that.emit('open', fd)
        that.read()
      }
    })
  }

  function WriteStream (path, options) {
    if (this instanceof WriteStream)
      return fs$WriteStream.apply(this, arguments), this
    else
      return WriteStream.apply(Object.create(WriteStream.prototype), arguments)
  }

  function WriteStream$open () {
    var that = this
    open(that.path, that.flags, that.mode, function (err, fd) {
      if (err) {
        that.destroy()
        that.emit('error', err)
      } else {
        that.fd = fd
        that.emit('open', fd)
      }
    })
  }

  function createReadStream (path, options) {
    return new fs.ReadStream(path, options)
  }

  function createWriteStream (path, options) {
    return new fs.WriteStream(path, options)
  }

  var fs$open = fs.open
  fs.open = open
  function open (path, flags, mode, cb) {
    if (typeof mode === 'function')
      cb = mode, mode = null

    return go$open(path, flags, mode, cb)

    function go$open (path, flags, mode, cb) {
      return fs$open(path, flags, mode, function (err, fd) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([go$open, [path, flags, mode, cb]])
        else {
          if (typeof cb === 'function')
            cb.apply(this, arguments)
          retry()
        }
      })
    }
  }

  return fs
}

function enqueue (elem) {
  debug('ENQUEUE', elem[0].name, elem[1])
  global[gracefulQueue].push(elem)
}

function retry () {
  var elem = global[gracefulQueue].shift()
  if (elem) {
    debug('RETRY', elem[0].name, elem[1])
    elem[0].apply(null, elem[1])
  }
}


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var constants = __webpack_require__(8)

var origCwd = process.cwd
var cwd = null

var platform = process.env.GRACEFUL_FS_PLATFORM || process.platform

process.cwd = function() {
  if (!cwd)
    cwd = origCwd.call(process)
  return cwd
}
try {
  process.cwd()
} catch (er) {}

var chdir = process.chdir
process.chdir = function(d) {
  cwd = null
  chdir.call(process, d)
}

module.exports = patch

function patch (fs) {
  // (re-)implement some things that are known busted or missing.

  // lchmod, broken prior to 0.6.2
  // back-port the fix here.
  if (constants.hasOwnProperty('O_SYMLINK') &&
      process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
    patchLchmod(fs)
  }

  // lutimes implementation, or no-op
  if (!fs.lutimes) {
    patchLutimes(fs)
  }

  // https://github.com/isaacs/node-graceful-fs/issues/4
  // Chown should not fail on einval or eperm if non-root.
  // It should not fail on enosys ever, as this just indicates
  // that a fs doesn't support the intended operation.

  fs.chown = chownFix(fs.chown)
  fs.fchown = chownFix(fs.fchown)
  fs.lchown = chownFix(fs.lchown)

  fs.chmod = chmodFix(fs.chmod)
  fs.fchmod = chmodFix(fs.fchmod)
  fs.lchmod = chmodFix(fs.lchmod)

  fs.chownSync = chownFixSync(fs.chownSync)
  fs.fchownSync = chownFixSync(fs.fchownSync)
  fs.lchownSync = chownFixSync(fs.lchownSync)

  fs.chmodSync = chmodFixSync(fs.chmodSync)
  fs.fchmodSync = chmodFixSync(fs.fchmodSync)
  fs.lchmodSync = chmodFixSync(fs.lchmodSync)

  fs.stat = statFix(fs.stat)
  fs.fstat = statFix(fs.fstat)
  fs.lstat = statFix(fs.lstat)

  fs.statSync = statFixSync(fs.statSync)
  fs.fstatSync = statFixSync(fs.fstatSync)
  fs.lstatSync = statFixSync(fs.lstatSync)

  // if lchmod/lchown do not exist, then make them no-ops
  if (!fs.lchmod) {
    fs.lchmod = function (path, mode, cb) {
      if (cb) process.nextTick(cb)
    }
    fs.lchmodSync = function () {}
  }
  if (!fs.lchown) {
    fs.lchown = function (path, uid, gid, cb) {
      if (cb) process.nextTick(cb)
    }
    fs.lchownSync = function () {}
  }

  // on Windows, A/V software can lock the directory, causing this
  // to fail with an EACCES or EPERM if the directory contains newly
  // created files.  Try again on failure, for up to 60 seconds.

  // Set the timeout this long because some Windows Anti-Virus, such as Parity
  // bit9, may lock files for up to a minute, causing npm package install
  // failures. Also, take care to yield the scheduler. Windows scheduling gives
  // CPU to a busy looping process, which can cause the program causing the lock
  // contention to be starved of CPU by node, so the contention doesn't resolve.
  if (platform === "win32") {
    fs.rename = (function (fs$rename) { return function (from, to, cb) {
      var start = Date.now()
      var backoff = 0;
      fs$rename(from, to, function CB (er) {
        if (er
            && (er.code === "EACCES" || er.code === "EPERM")
            && Date.now() - start < 60000) {
          setTimeout(function() {
            fs.stat(to, function (stater, st) {
              if (stater && stater.code === "ENOENT")
                fs$rename(from, to, CB);
              else
                cb(er)
            })
          }, backoff)
          if (backoff < 100)
            backoff += 10;
          return;
        }
        if (cb) cb(er)
      })
    }})(fs.rename)
  }

  // if read() returns EAGAIN, then just try it again.
  fs.read = (function (fs$read) {
    function read (fd, buffer, offset, length, position, callback_) {
      var callback
      if (callback_ && typeof callback_ === 'function') {
        var eagCounter = 0
        callback = function (er, _, __) {
          if (er && er.code === 'EAGAIN' && eagCounter < 10) {
            eagCounter ++
            return fs$read.call(fs, fd, buffer, offset, length, position, callback)
          }
          callback_.apply(this, arguments)
        }
      }
      return fs$read.call(fs, fd, buffer, offset, length, position, callback)
    }

    // This ensures `util.promisify` works as it does for native `fs.read`.
    read.__proto__ = fs$read
    return read
  })(fs.read)

  fs.readSync = (function (fs$readSync) { return function (fd, buffer, offset, length, position) {
    var eagCounter = 0
    while (true) {
      try {
        return fs$readSync.call(fs, fd, buffer, offset, length, position)
      } catch (er) {
        if (er.code === 'EAGAIN' && eagCounter < 10) {
          eagCounter ++
          continue
        }
        throw er
      }
    }
  }})(fs.readSync)

  function patchLchmod (fs) {
    fs.lchmod = function (path, mode, callback) {
      fs.open( path
             , constants.O_WRONLY | constants.O_SYMLINK
             , mode
             , function (err, fd) {
        if (err) {
          if (callback) callback(err)
          return
        }
        // prefer to return the chmod error, if one occurs,
        // but still try to close, and report closing errors if they occur.
        fs.fchmod(fd, mode, function (err) {
          fs.close(fd, function(err2) {
            if (callback) callback(err || err2)
          })
        })
      })
    }

    fs.lchmodSync = function (path, mode) {
      var fd = fs.openSync(path, constants.O_WRONLY | constants.O_SYMLINK, mode)

      // prefer to return the chmod error, if one occurs,
      // but still try to close, and report closing errors if they occur.
      var threw = true
      var ret
      try {
        ret = fs.fchmodSync(fd, mode)
        threw = false
      } finally {
        if (threw) {
          try {
            fs.closeSync(fd)
          } catch (er) {}
        } else {
          fs.closeSync(fd)
        }
      }
      return ret
    }
  }

  function patchLutimes (fs) {
    if (constants.hasOwnProperty("O_SYMLINK")) {
      fs.lutimes = function (path, at, mt, cb) {
        fs.open(path, constants.O_SYMLINK, function (er, fd) {
          if (er) {
            if (cb) cb(er)
            return
          }
          fs.futimes(fd, at, mt, function (er) {
            fs.close(fd, function (er2) {
              if (cb) cb(er || er2)
            })
          })
        })
      }

      fs.lutimesSync = function (path, at, mt) {
        var fd = fs.openSync(path, constants.O_SYMLINK)
        var ret
        var threw = true
        try {
          ret = fs.futimesSync(fd, at, mt)
          threw = false
        } finally {
          if (threw) {
            try {
              fs.closeSync(fd)
            } catch (er) {}
          } else {
            fs.closeSync(fd)
          }
        }
        return ret
      }

    } else {
      fs.lutimes = function (_a, _b, _c, cb) { if (cb) process.nextTick(cb) }
      fs.lutimesSync = function () {}
    }
  }

  function chmodFix (orig) {
    if (!orig) return orig
    return function (target, mode, cb) {
      return orig.call(fs, target, mode, function (er) {
        if (chownErOk(er)) er = null
        if (cb) cb.apply(this, arguments)
      })
    }
  }

  function chmodFixSync (orig) {
    if (!orig) return orig
    return function (target, mode) {
      try {
        return orig.call(fs, target, mode)
      } catch (er) {
        if (!chownErOk(er)) throw er
      }
    }
  }


  function chownFix (orig) {
    if (!orig) return orig
    return function (target, uid, gid, cb) {
      return orig.call(fs, target, uid, gid, function (er) {
        if (chownErOk(er)) er = null
        if (cb) cb.apply(this, arguments)
      })
    }
  }

  function chownFixSync (orig) {
    if (!orig) return orig
    return function (target, uid, gid) {
      try {
        return orig.call(fs, target, uid, gid)
      } catch (er) {
        if (!chownErOk(er)) throw er
      }
    }
  }

  function statFix (orig) {
    if (!orig) return orig
    // Older versions of Node erroneously returned signed integers for
    // uid + gid.
    return function (target, options, cb) {
      if (typeof options === 'function') {
        cb = options
        options = null
      }
      function callback (er, stats) {
        if (stats) {
          if (stats.uid < 0) stats.uid += 0x100000000
          if (stats.gid < 0) stats.gid += 0x100000000
        }
        if (cb) cb.apply(this, arguments)
      }
      return options ? orig.call(fs, target, options, callback)
        : orig.call(fs, target, callback)
    }
  }

  function statFixSync (orig) {
    if (!orig) return orig
    // Older versions of Node erroneously returned signed integers for
    // uid + gid.
    return function (target, options) {
      var stats = options ? orig.call(fs, target, options)
        : orig.call(fs, target)
      if (stats.uid < 0) stats.uid += 0x100000000
      if (stats.gid < 0) stats.gid += 0x100000000
      return stats;
    }
  }

  // ENOSYS means that the fs doesn't support the op. Just ignore
  // that, because it doesn't matter.
  //
  // if there's no getuid, or if getuid() is something other
  // than 0, and the error is EINVAL or EPERM, then just ignore
  // it.
  //
  // This specific case is a silent failure in cp, install, tar,
  // and most other unix tools that manage permissions.
  //
  // When running as root, or if other types of errors are
  // encountered, then it's strict.
  function chownErOk (er) {
    if (!er)
      return true

    if (er.code === "ENOSYS")
      return true

    var nonroot = !process.getuid || process.getuid() !== 0
    if (nonroot) {
      if (er.code === "EINVAL" || er.code === "EPERM")
        return true
    }

    return false
  }
}


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("constants");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var Stream = __webpack_require__(10).Stream

module.exports = legacy

function legacy (fs) {
  return {
    ReadStream: ReadStream,
    WriteStream: WriteStream
  }

  function ReadStream (path, options) {
    if (!(this instanceof ReadStream)) return new ReadStream(path, options);

    Stream.call(this);

    var self = this;

    this.path = path;
    this.fd = null;
    this.readable = true;
    this.paused = false;

    this.flags = 'r';
    this.mode = 438; /*=0666*/
    this.bufferSize = 64 * 1024;

    options = options || {};

    // Mixin options into this
    var keys = Object.keys(options);
    for (var index = 0, length = keys.length; index < length; index++) {
      var key = keys[index];
      this[key] = options[key];
    }

    if (this.encoding) this.setEncoding(this.encoding);

    if (this.start !== undefined) {
      if ('number' !== typeof this.start) {
        throw TypeError('start must be a Number');
      }
      if (this.end === undefined) {
        this.end = Infinity;
      } else if ('number' !== typeof this.end) {
        throw TypeError('end must be a Number');
      }

      if (this.start > this.end) {
        throw new Error('start must be <= end');
      }

      this.pos = this.start;
    }

    if (this.fd !== null) {
      process.nextTick(function() {
        self._read();
      });
      return;
    }

    fs.open(this.path, this.flags, this.mode, function (err, fd) {
      if (err) {
        self.emit('error', err);
        self.readable = false;
        return;
      }

      self.fd = fd;
      self.emit('open', fd);
      self._read();
    })
  }

  function WriteStream (path, options) {
    if (!(this instanceof WriteStream)) return new WriteStream(path, options);

    Stream.call(this);

    this.path = path;
    this.fd = null;
    this.writable = true;

    this.flags = 'w';
    this.encoding = 'binary';
    this.mode = 438; /*=0666*/
    this.bytesWritten = 0;

    options = options || {};

    // Mixin options into this
    var keys = Object.keys(options);
    for (var index = 0, length = keys.length; index < length; index++) {
      var key = keys[index];
      this[key] = options[key];
    }

    if (this.start !== undefined) {
      if ('number' !== typeof this.start) {
        throw TypeError('start must be a Number');
      }
      if (this.start < 0) {
        throw new Error('start must be >= zero');
      }

      this.pos = this.start;
    }

    this.busy = false;
    this._queue = [];

    if (this.fd === null) {
      this._open = fs.open;
      this._queue.push([this._open, this.path, this.flags, this.mode, undefined]);
      this.flush();
    }
  }
}


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = clone

function clone (obj) {
  if (obj === null || typeof obj !== 'object')
    return obj

  if (obj instanceof Object)
    var copy = { __proto__: obj.__proto__ }
  else
    var copy = Object.create(null)

  Object.getOwnPropertyNames(obj).forEach(function (key) {
    Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key))
  })

  return copy
}


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  copySync: __webpack_require__(15)
}


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const fs = __webpack_require__(5)
const path = __webpack_require__(16)
const mkdirpSync = __webpack_require__(17).mkdirsSync
const utimesSync = __webpack_require__(21).utimesMillisSync
const stat = __webpack_require__(23)

function copySync (src, dest, opts) {
  if (typeof opts === 'function') {
    opts = { filter: opts }
  }

  opts = opts || {}
  opts.clobber = 'clobber' in opts ? !!opts.clobber : true // default to true for now
  opts.overwrite = 'overwrite' in opts ? !!opts.overwrite : opts.clobber // overwrite falls back to clobber

  // Warn about using preserveTimestamps on 32-bit node
  if (opts.preserveTimestamps && process.arch === 'ia32') {
    console.warn(`fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;\n
    see https://github.com/jprichardson/node-fs-extra/issues/269`)
  }

  const { srcStat, destStat } = stat.checkPathsSync(src, dest, 'copy')
  stat.checkParentPathsSync(src, srcStat, dest, 'copy')
  return handleFilterAndCopy(destStat, src, dest, opts)
}

function handleFilterAndCopy (destStat, src, dest, opts) {
  if (opts.filter && !opts.filter(src, dest)) return
  const destParent = path.dirname(dest)
  if (!fs.existsSync(destParent)) mkdirpSync(destParent)
  return startCopy(destStat, src, dest, opts)
}

function startCopy (destStat, src, dest, opts) {
  if (opts.filter && !opts.filter(src, dest)) return
  return getStats(destStat, src, dest, opts)
}

function getStats (destStat, src, dest, opts) {
  const statSync = opts.dereference ? fs.statSync : fs.lstatSync
  const srcStat = statSync(src)

  if (srcStat.isDirectory()) return onDir(srcStat, destStat, src, dest, opts)
  else if (srcStat.isFile() ||
           srcStat.isCharacterDevice() ||
           srcStat.isBlockDevice()) return onFile(srcStat, destStat, src, dest, opts)
  else if (srcStat.isSymbolicLink()) return onLink(destStat, src, dest, opts)
}

function onFile (srcStat, destStat, src, dest, opts) {
  if (!destStat) return copyFile(srcStat, src, dest, opts)
  return mayCopyFile(srcStat, src, dest, opts)
}

function mayCopyFile (srcStat, src, dest, opts) {
  if (opts.overwrite) {
    fs.unlinkSync(dest)
    return copyFile(srcStat, src, dest, opts)
  } else if (opts.errorOnExist) {
    throw new Error(`'${dest}' already exists`)
  }
}

function copyFile (srcStat, src, dest, opts) {
  if (typeof fs.copyFileSync === 'function') {
    fs.copyFileSync(src, dest)
    fs.chmodSync(dest, srcStat.mode)
    if (opts.preserveTimestamps) {
      return utimesSync(dest, srcStat.atime, srcStat.mtime)
    }
    return
  }
  return copyFileFallback(srcStat, src, dest, opts)
}

function copyFileFallback (srcStat, src, dest, opts) {
  const BUF_LENGTH = 64 * 1024
  const _buff = __webpack_require__(24)(BUF_LENGTH)

  const fdr = fs.openSync(src, 'r')
  const fdw = fs.openSync(dest, 'w', srcStat.mode)
  let pos = 0

  while (pos < srcStat.size) {
    const bytesRead = fs.readSync(fdr, _buff, 0, BUF_LENGTH, pos)
    fs.writeSync(fdw, _buff, 0, bytesRead)
    pos += bytesRead
  }

  if (opts.preserveTimestamps) fs.futimesSync(fdw, srcStat.atime, srcStat.mtime)

  fs.closeSync(fdr)
  fs.closeSync(fdw)
}

function onDir (srcStat, destStat, src, dest, opts) {
  if (!destStat) return mkDirAndCopy(srcStat, src, dest, opts)
  if (destStat && !destStat.isDirectory()) {
    throw new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`)
  }
  return copyDir(src, dest, opts)
}

function mkDirAndCopy (srcStat, src, dest, opts) {
  fs.mkdirSync(dest)
  copyDir(src, dest, opts)
  return fs.chmodSync(dest, srcStat.mode)
}

function copyDir (src, dest, opts) {
  fs.readdirSync(src).forEach(item => copyDirItem(item, src, dest, opts))
}

function copyDirItem (item, src, dest, opts) {
  const srcItem = path.join(src, item)
  const destItem = path.join(dest, item)
  const { destStat } = stat.checkPathsSync(srcItem, destItem, 'copy')
  return startCopy(destStat, srcItem, destItem, opts)
}

function onLink (destStat, src, dest, opts) {
  let resolvedSrc = fs.readlinkSync(src)
  if (opts.dereference) {
    resolvedSrc = path.resolve(process.cwd(), resolvedSrc)
  }

  if (!destStat) {
    return fs.symlinkSync(resolvedSrc, dest)
  } else {
    let resolvedDest
    try {
      resolvedDest = fs.readlinkSync(dest)
    } catch (err) {
      // dest exists and is a regular file or directory,
      // Windows may throw UNKNOWN error. If dest already exists,
      // fs throws error anyway, so no need to guard against it here.
      if (err.code === 'EINVAL' || err.code === 'UNKNOWN') return fs.symlinkSync(resolvedSrc, dest)
      throw err
    }
    if (opts.dereference) {
      resolvedDest = path.resolve(process.cwd(), resolvedDest)
    }
    if (stat.isSrcSubdir(resolvedSrc, resolvedDest)) {
      throw new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`)
    }

    // prevent copy if src is a subdir of dest since unlinking
    // dest in this case would result in removing src contents
    // and therefore a broken symlink would be created.
    if (fs.statSync(dest).isDirectory() && stat.isSrcSubdir(resolvedDest, resolvedSrc)) {
      throw new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`)
    }
    return copyLink(resolvedSrc, dest)
  }
}

function copyLink (resolvedSrc, dest) {
  fs.unlinkSync(dest)
  return fs.symlinkSync(resolvedSrc, dest)
}

module.exports = copySync


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const u = __webpack_require__(4).fromCallback
const mkdirs = u(__webpack_require__(18))
const mkdirsSync = __webpack_require__(20)

module.exports = {
  mkdirs,
  mkdirsSync,
  // alias
  mkdirp: mkdirs,
  mkdirpSync: mkdirsSync,
  ensureDir: mkdirs,
  ensureDirSync: mkdirsSync
}


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const fs = __webpack_require__(5)
const path = __webpack_require__(16)
const invalidWin32Path = __webpack_require__(19).invalidWin32Path

const o777 = parseInt('0777', 8)

function mkdirs (p, opts, callback, made) {
  if (typeof opts === 'function') {
    callback = opts
    opts = {}
  } else if (!opts || typeof opts !== 'object') {
    opts = { mode: opts }
  }

  if (process.platform === 'win32' && invalidWin32Path(p)) {
    const errInval = new Error(p + ' contains invalid WIN32 path characters.')
    errInval.code = 'EINVAL'
    return callback(errInval)
  }

  let mode = opts.mode
  const xfs = opts.fs || fs

  if (mode === undefined) {
    mode = o777 & (~process.umask())
  }
  if (!made) made = null

  callback = callback || function () {}
  p = path.resolve(p)

  xfs.mkdir(p, mode, er => {
    if (!er) {
      made = made || p
      return callback(null, made)
    }
    switch (er.code) {
      case 'ENOENT':
        if (path.dirname(p) === p) return callback(er)
        mkdirs(path.dirname(p), opts, (er, made) => {
          if (er) callback(er, made)
          else mkdirs(p, opts, callback, made)
        })
        break

      // In the case of any other error, just see if there's a dir
      // there already.  If so, then hooray!  If not, then something
      // is borked.
      default:
        xfs.stat(p, (er2, stat) => {
          // if the stat fails, then that's super weird.
          // let the original error be the failure reason.
          if (er2 || !stat.isDirectory()) callback(er, made)
          else callback(null, made)
        })
        break
    }
  })
}

module.exports = mkdirs


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const path = __webpack_require__(16)

// get drive on windows
function getRootPath (p) {
  p = path.normalize(path.resolve(p)).split(path.sep)
  if (p.length > 0) return p[0]
  return null
}

// http://stackoverflow.com/a/62888/10333 contains more accurate
// TODO: expand to include the rest
const INVALID_PATH_CHARS = /[<>:"|?*]/

function invalidWin32Path (p) {
  const rp = getRootPath(p)
  p = p.replace(rp, '')
  return INVALID_PATH_CHARS.test(p)
}

module.exports = {
  getRootPath,
  invalidWin32Path
}


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const fs = __webpack_require__(5)
const path = __webpack_require__(16)
const invalidWin32Path = __webpack_require__(19).invalidWin32Path

const o777 = parseInt('0777', 8)

function mkdirsSync (p, opts, made) {
  if (!opts || typeof opts !== 'object') {
    opts = { mode: opts }
  }

  let mode = opts.mode
  const xfs = opts.fs || fs

  if (process.platform === 'win32' && invalidWin32Path(p)) {
    const errInval = new Error(p + ' contains invalid WIN32 path characters.')
    errInval.code = 'EINVAL'
    throw errInval
  }

  if (mode === undefined) {
    mode = o777 & (~process.umask())
  }
  if (!made) made = null

  p = path.resolve(p)

  try {
    xfs.mkdirSync(p, mode)
    made = made || p
  } catch (err0) {
    if (err0.code === 'ENOENT') {
      if (path.dirname(p) === p) throw err0
      made = mkdirsSync(path.dirname(p), opts, made)
      mkdirsSync(p, opts, made)
    } else {
      // In the case of any other error, just see if there's a dir there
      // already. If so, then hooray!  If not, then something is borked.
      let stat
      try {
        stat = xfs.statSync(p)
      } catch (err1) {
        throw err0
      }
      if (!stat.isDirectory()) throw err0
    }
  }

  return made
}

module.exports = mkdirsSync


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const fs = __webpack_require__(5)
const os = __webpack_require__(22)
const path = __webpack_require__(16)

// HFS, ext{2,3}, FAT do not, Node.js v0.10 does not
function hasMillisResSync () {
  let tmpfile = path.join('millis-test-sync' + Date.now().toString() + Math.random().toString().slice(2))
  tmpfile = path.join(os.tmpdir(), tmpfile)

  // 550 millis past UNIX epoch
  const d = new Date(1435410243862)
  fs.writeFileSync(tmpfile, 'https://github.com/jprichardson/node-fs-extra/pull/141')
  const fd = fs.openSync(tmpfile, 'r+')
  fs.futimesSync(fd, d, d)
  fs.closeSync(fd)
  return fs.statSync(tmpfile).mtime > 1435410243000
}

function hasMillisRes (callback) {
  let tmpfile = path.join('millis-test' + Date.now().toString() + Math.random().toString().slice(2))
  tmpfile = path.join(os.tmpdir(), tmpfile)

  // 550 millis past UNIX epoch
  const d = new Date(1435410243862)
  fs.writeFile(tmpfile, 'https://github.com/jprichardson/node-fs-extra/pull/141', err => {
    if (err) return callback(err)
    fs.open(tmpfile, 'r+', (err, fd) => {
      if (err) return callback(err)
      fs.futimes(fd, d, d, err => {
        if (err) return callback(err)
        fs.close(fd, err => {
          if (err) return callback(err)
          fs.stat(tmpfile, (err, stats) => {
            if (err) return callback(err)
            callback(null, stats.mtime > 1435410243000)
          })
        })
      })
    })
  })
}

function timeRemoveMillis (timestamp) {
  if (typeof timestamp === 'number') {
    return Math.floor(timestamp / 1000) * 1000
  } else if (timestamp instanceof Date) {
    return new Date(Math.floor(timestamp.getTime() / 1000) * 1000)
  } else {
    throw new Error('fs-extra: timeRemoveMillis() unknown parameter type')
  }
}

function utimesMillis (path, atime, mtime, callback) {
  // if (!HAS_MILLIS_RES) return fs.utimes(path, atime, mtime, callback)
  fs.open(path, 'r+', (err, fd) => {
    if (err) return callback(err)
    fs.futimes(fd, atime, mtime, futimesErr => {
      fs.close(fd, closeErr => {
        if (callback) callback(futimesErr || closeErr)
      })
    })
  })
}

function utimesMillisSync (path, atime, mtime) {
  const fd = fs.openSync(path, 'r+')
  fs.futimesSync(fd, atime, mtime)
  return fs.closeSync(fd)
}

module.exports = {
  hasMillisRes,
  hasMillisResSync,
  timeRemoveMillis,
  utimesMillis,
  utimesMillisSync
}


/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const fs = __webpack_require__(5)
const path = __webpack_require__(16)

const NODE_VERSION_MAJOR_WITH_BIGINT = 10
const NODE_VERSION_MINOR_WITH_BIGINT = 5
const NODE_VERSION_PATCH_WITH_BIGINT = 0
const nodeVersion = process.versions.node.split('.')
const nodeVersionMajor = Number.parseInt(nodeVersion[0], 10)
const nodeVersionMinor = Number.parseInt(nodeVersion[1], 10)
const nodeVersionPatch = Number.parseInt(nodeVersion[2], 10)

function nodeSupportsBigInt () {
  if (nodeVersionMajor > NODE_VERSION_MAJOR_WITH_BIGINT) {
    return true
  } else if (nodeVersionMajor === NODE_VERSION_MAJOR_WITH_BIGINT) {
    if (nodeVersionMinor > NODE_VERSION_MINOR_WITH_BIGINT) {
      return true
    } else if (nodeVersionMinor === NODE_VERSION_MINOR_WITH_BIGINT) {
      if (nodeVersionPatch >= NODE_VERSION_PATCH_WITH_BIGINT) {
        return true
      }
    }
  }
  return false
}

function getStats (src, dest, cb) {
  if (nodeSupportsBigInt()) {
    fs.stat(src, { bigint: true }, (err, srcStat) => {
      if (err) return cb(err)
      fs.stat(dest, { bigint: true }, (err, destStat) => {
        if (err) {
          if (err.code === 'ENOENT') return cb(null, { srcStat, destStat: null })
          return cb(err)
        }
        return cb(null, { srcStat, destStat })
      })
    })
  } else {
    fs.stat(src, (err, srcStat) => {
      if (err) return cb(err)
      fs.stat(dest, (err, destStat) => {
        if (err) {
          if (err.code === 'ENOENT') return cb(null, { srcStat, destStat: null })
          return cb(err)
        }
        return cb(null, { srcStat, destStat })
      })
    })
  }
}

function getStatsSync (src, dest) {
  let srcStat, destStat
  if (nodeSupportsBigInt()) {
    srcStat = fs.statSync(src, { bigint: true })
  } else {
    srcStat = fs.statSync(src)
  }
  try {
    if (nodeSupportsBigInt()) {
      destStat = fs.statSync(dest, { bigint: true })
    } else {
      destStat = fs.statSync(dest)
    }
  } catch (err) {
    if (err.code === 'ENOENT') return { srcStat, destStat: null }
    throw err
  }
  return { srcStat, destStat }
}

function checkPaths (src, dest, funcName, cb) {
  getStats(src, dest, (err, stats) => {
    if (err) return cb(err)
    const { srcStat, destStat } = stats
    if (destStat && destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {
      return cb(new Error('Source and destination must not be the same.'))
    }
    if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
      return cb(new Error(errMsg(src, dest, funcName)))
    }
    return cb(null, { srcStat, destStat })
  })
}

function checkPathsSync (src, dest, funcName) {
  const { srcStat, destStat } = getStatsSync(src, dest)
  if (destStat && destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {
    throw new Error('Source and destination must not be the same.')
  }
  if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
    throw new Error(errMsg(src, dest, funcName))
  }
  return { srcStat, destStat }
}

// recursively check if dest parent is a subdirectory of src.
// It works for all file types including symlinks since it
// checks the src and dest inodes. It starts from the deepest
// parent and stops once it reaches the src parent or the root path.
function checkParentPaths (src, srcStat, dest, funcName, cb) {
  const srcParent = path.resolve(path.dirname(src))
  const destParent = path.resolve(path.dirname(dest))
  if (destParent === srcParent || destParent === path.parse(destParent).root) return cb()
  if (nodeSupportsBigInt()) {
    fs.stat(destParent, { bigint: true }, (err, destStat) => {
      if (err) {
        if (err.code === 'ENOENT') return cb()
        return cb(err)
      }
      if (destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {
        return cb(new Error(errMsg(src, dest, funcName)))
      }
      return checkParentPaths(src, srcStat, destParent, funcName, cb)
    })
  } else {
    fs.stat(destParent, (err, destStat) => {
      if (err) {
        if (err.code === 'ENOENT') return cb()
        return cb(err)
      }
      if (destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {
        return cb(new Error(errMsg(src, dest, funcName)))
      }
      return checkParentPaths(src, srcStat, destParent, funcName, cb)
    })
  }
}

function checkParentPathsSync (src, srcStat, dest, funcName) {
  const srcParent = path.resolve(path.dirname(src))
  const destParent = path.resolve(path.dirname(dest))
  if (destParent === srcParent || destParent === path.parse(destParent).root) return
  let destStat
  try {
    if (nodeSupportsBigInt()) {
      destStat = fs.statSync(destParent, { bigint: true })
    } else {
      destStat = fs.statSync(destParent)
    }
  } catch (err) {
    if (err.code === 'ENOENT') return
    throw err
  }
  if (destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {
    throw new Error(errMsg(src, dest, funcName))
  }
  return checkParentPathsSync(src, srcStat, destParent, funcName)
}

// return true if dest is a subdir of src, otherwise false.
// It only checks the path strings.
function isSrcSubdir (src, dest) {
  const srcArr = path.resolve(src).split(path.sep).filter(i => i)
  const destArr = path.resolve(dest).split(path.sep).filter(i => i)
  return srcArr.reduce((acc, cur, i) => acc && destArr[i] === cur, true)
}

function errMsg (src, dest, funcName) {
  return `Cannot ${funcName} '${src}' to a subdirectory of itself, '${dest}'.`
}

module.exports = {
  checkPaths,
  checkPathsSync,
  checkParentPaths,
  checkParentPathsSync,
  isSrcSubdir
}


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint-disable node/no-deprecated-api */
module.exports = function (size) {
  if (typeof Buffer.allocUnsafe === 'function') {
    try {
      return Buffer.allocUnsafe(size)
    } catch (e) {
      return new Buffer(size)
    }
  }
  return new Buffer(size)
}


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const u = __webpack_require__(4).fromCallback
module.exports = {
  copy: u(__webpack_require__(26))
}


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const fs = __webpack_require__(5)
const path = __webpack_require__(16)
const mkdirp = __webpack_require__(17).mkdirs
const pathExists = __webpack_require__(27).pathExists
const utimes = __webpack_require__(21).utimesMillis
const stat = __webpack_require__(23)

function copy (src, dest, opts, cb) {
  if (typeof opts === 'function' && !cb) {
    cb = opts
    opts = {}
  } else if (typeof opts === 'function') {
    opts = { filter: opts }
  }

  cb = cb || function () {}
  opts = opts || {}

  opts.clobber = 'clobber' in opts ? !!opts.clobber : true // default to true for now
  opts.overwrite = 'overwrite' in opts ? !!opts.overwrite : opts.clobber // overwrite falls back to clobber

  // Warn about using preserveTimestamps on 32-bit node
  if (opts.preserveTimestamps && process.arch === 'ia32') {
    console.warn(`fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;\n
    see https://github.com/jprichardson/node-fs-extra/issues/269`)
  }

  stat.checkPaths(src, dest, 'copy', (err, stats) => {
    if (err) return cb(err)
    const { srcStat, destStat } = stats
    stat.checkParentPaths(src, srcStat, dest, 'copy', err => {
      if (err) return cb(err)
      if (opts.filter) return handleFilter(checkParentDir, destStat, src, dest, opts, cb)
      return checkParentDir(destStat, src, dest, opts, cb)
    })
  })
}

function checkParentDir (destStat, src, dest, opts, cb) {
  const destParent = path.dirname(dest)
  pathExists(destParent, (err, dirExists) => {
    if (err) return cb(err)
    if (dirExists) return startCopy(destStat, src, dest, opts, cb)
    mkdirp(destParent, err => {
      if (err) return cb(err)
      return startCopy(destStat, src, dest, opts, cb)
    })
  })
}

function handleFilter (onInclude, destStat, src, dest, opts, cb) {
  Promise.resolve(opts.filter(src, dest)).then(include => {
    if (include) return onInclude(destStat, src, dest, opts, cb)
    return cb()
  }, error => cb(error))
}

function startCopy (destStat, src, dest, opts, cb) {
  if (opts.filter) return handleFilter(getStats, destStat, src, dest, opts, cb)
  return getStats(destStat, src, dest, opts, cb)
}

function getStats (destStat, src, dest, opts, cb) {
  const stat = opts.dereference ? fs.stat : fs.lstat
  stat(src, (err, srcStat) => {
    if (err) return cb(err)

    if (srcStat.isDirectory()) return onDir(srcStat, destStat, src, dest, opts, cb)
    else if (srcStat.isFile() ||
             srcStat.isCharacterDevice() ||
             srcStat.isBlockDevice()) return onFile(srcStat, destStat, src, dest, opts, cb)
    else if (srcStat.isSymbolicLink()) return onLink(destStat, src, dest, opts, cb)
  })
}

function onFile (srcStat, destStat, src, dest, opts, cb) {
  if (!destStat) return copyFile(srcStat, src, dest, opts, cb)
  return mayCopyFile(srcStat, src, dest, opts, cb)
}

function mayCopyFile (srcStat, src, dest, opts, cb) {
  if (opts.overwrite) {
    fs.unlink(dest, err => {
      if (err) return cb(err)
      return copyFile(srcStat, src, dest, opts, cb)
    })
  } else if (opts.errorOnExist) {
    return cb(new Error(`'${dest}' already exists`))
  } else return cb()
}

function copyFile (srcStat, src, dest, opts, cb) {
  if (typeof fs.copyFile === 'function') {
    return fs.copyFile(src, dest, err => {
      if (err) return cb(err)
      return setDestModeAndTimestamps(srcStat, dest, opts, cb)
    })
  }
  return copyFileFallback(srcStat, src, dest, opts, cb)
}

function copyFileFallback (srcStat, src, dest, opts, cb) {
  const rs = fs.createReadStream(src)
  rs.on('error', err => cb(err)).once('open', () => {
    const ws = fs.createWriteStream(dest, { mode: srcStat.mode })
    ws.on('error', err => cb(err))
      .on('open', () => rs.pipe(ws))
      .once('close', () => setDestModeAndTimestamps(srcStat, dest, opts, cb))
  })
}

function setDestModeAndTimestamps (srcStat, dest, opts, cb) {
  fs.chmod(dest, srcStat.mode, err => {
    if (err) return cb(err)
    if (opts.preserveTimestamps) {
      return utimes(dest, srcStat.atime, srcStat.mtime, cb)
    }
    return cb()
  })
}

function onDir (srcStat, destStat, src, dest, opts, cb) {
  if (!destStat) return mkDirAndCopy(srcStat, src, dest, opts, cb)
  if (destStat && !destStat.isDirectory()) {
    return cb(new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`))
  }
  return copyDir(src, dest, opts, cb)
}

function mkDirAndCopy (srcStat, src, dest, opts, cb) {
  fs.mkdir(dest, err => {
    if (err) return cb(err)
    copyDir(src, dest, opts, err => {
      if (err) return cb(err)
      return fs.chmod(dest, srcStat.mode, cb)
    })
  })
}

function copyDir (src, dest, opts, cb) {
  fs.readdir(src, (err, items) => {
    if (err) return cb(err)
    return copyDirItems(items, src, dest, opts, cb)
  })
}

function copyDirItems (items, src, dest, opts, cb) {
  const item = items.pop()
  if (!item) return cb()
  return copyDirItem(items, item, src, dest, opts, cb)
}

function copyDirItem (items, item, src, dest, opts, cb) {
  const srcItem = path.join(src, item)
  const destItem = path.join(dest, item)
  stat.checkPaths(srcItem, destItem, 'copy', (err, stats) => {
    if (err) return cb(err)
    const { destStat } = stats
    startCopy(destStat, srcItem, destItem, opts, err => {
      if (err) return cb(err)
      return copyDirItems(items, src, dest, opts, cb)
    })
  })
}

function onLink (destStat, src, dest, opts, cb) {
  fs.readlink(src, (err, resolvedSrc) => {
    if (err) return cb(err)
    if (opts.dereference) {
      resolvedSrc = path.resolve(process.cwd(), resolvedSrc)
    }

    if (!destStat) {
      return fs.symlink(resolvedSrc, dest, cb)
    } else {
      fs.readlink(dest, (err, resolvedDest) => {
        if (err) {
          // dest exists and is a regular file or directory,
          // Windows may throw UNKNOWN error. If dest already exists,
          // fs throws error anyway, so no need to guard against it here.
          if (err.code === 'EINVAL' || err.code === 'UNKNOWN') return fs.symlink(resolvedSrc, dest, cb)
          return cb(err)
        }
        if (opts.dereference) {
          resolvedDest = path.resolve(process.cwd(), resolvedDest)
        }
        if (stat.isSrcSubdir(resolvedSrc, resolvedDest)) {
          return cb(new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`))
        }

        // do not copy if src is a subdir of dest since unlinking
        // dest in this case would result in removing src contents
        // and therefore a broken symlink would be created.
        if (destStat.isDirectory() && stat.isSrcSubdir(resolvedDest, resolvedSrc)) {
          return cb(new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`))
        }
        return copyLink(resolvedSrc, dest, cb)
      })
    }
  })
}

function copyLink (resolvedSrc, dest, cb) {
  fs.unlink(dest, err => {
    if (err) return cb(err)
    return fs.symlink(resolvedSrc, dest, cb)
  })
}

module.exports = copy


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const u = __webpack_require__(4).fromPromise
const fs = __webpack_require__(3)

function pathExists (path) {
  return fs.access(path).then(() => true).catch(() => false)
}

module.exports = {
  pathExists: u(pathExists),
  pathExistsSync: fs.existsSync
}


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const u = __webpack_require__(4).fromCallback
const fs = __webpack_require__(5)
const path = __webpack_require__(16)
const mkdir = __webpack_require__(17)
const remove = __webpack_require__(29)

const emptyDir = u(function emptyDir (dir, callback) {
  callback = callback || function () {}
  fs.readdir(dir, (err, items) => {
    if (err) return mkdir.mkdirs(dir, callback)

    items = items.map(item => path.join(dir, item))

    deleteItem()

    function deleteItem () {
      const item = items.pop()
      if (!item) return callback()
      remove.remove(item, err => {
        if (err) return callback(err)
        deleteItem()
      })
    }
  })
})

function emptyDirSync (dir) {
  let items
  try {
    items = fs.readdirSync(dir)
  } catch (err) {
    return mkdir.mkdirsSync(dir)
  }

  items.forEach(item => {
    item = path.join(dir, item)
    remove.removeSync(item)
  })
}

module.exports = {
  emptyDirSync,
  emptydirSync: emptyDirSync,
  emptyDir,
  emptydir: emptyDir
}


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const u = __webpack_require__(4).fromCallback
const rimraf = __webpack_require__(30)

module.exports = {
  remove: u(rimraf),
  removeSync: rimraf.sync
}


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const fs = __webpack_require__(5)
const path = __webpack_require__(16)
const assert = __webpack_require__(13)

const isWindows = (process.platform === 'win32')

function defaults (options) {
  const methods = [
    'unlink',
    'chmod',
    'stat',
    'lstat',
    'rmdir',
    'readdir'
  ]
  methods.forEach(m => {
    options[m] = options[m] || fs[m]
    m = m + 'Sync'
    options[m] = options[m] || fs[m]
  })

  options.maxBusyTries = options.maxBusyTries || 3
}

function rimraf (p, options, cb) {
  let busyTries = 0

  if (typeof options === 'function') {
    cb = options
    options = {}
  }

  assert(p, 'rimraf: missing path')
  assert.strictEqual(typeof p, 'string', 'rimraf: path should be a string')
  assert.strictEqual(typeof cb, 'function', 'rimraf: callback function required')
  assert(options, 'rimraf: invalid options argument provided')
  assert.strictEqual(typeof options, 'object', 'rimraf: options should be object')

  defaults(options)

  rimraf_(p, options, function CB (er) {
    if (er) {
      if ((er.code === 'EBUSY' || er.code === 'ENOTEMPTY' || er.code === 'EPERM') &&
          busyTries < options.maxBusyTries) {
        busyTries++
        const time = busyTries * 100
        // try again, with the same exact callback as this one.
        return setTimeout(() => rimraf_(p, options, CB), time)
      }

      // already gone
      if (er.code === 'ENOENT') er = null
    }

    cb(er)
  })
}

// Two possible strategies.
// 1. Assume it's a file.  unlink it, then do the dir stuff on EPERM or EISDIR
// 2. Assume it's a directory.  readdir, then do the file stuff on ENOTDIR
//
// Both result in an extra syscall when you guess wrong.  However, there
// are likely far more normal files in the world than directories.  This
// is based on the assumption that a the average number of files per
// directory is >= 1.
//
// If anyone ever complains about this, then I guess the strategy could
// be made configurable somehow.  But until then, YAGNI.
function rimraf_ (p, options, cb) {
  assert(p)
  assert(options)
  assert(typeof cb === 'function')

  // sunos lets the root user unlink directories, which is... weird.
  // so we have to lstat here and make sure it's not a dir.
  options.lstat(p, (er, st) => {
    if (er && er.code === 'ENOENT') {
      return cb(null)
    }

    // Windows can EPERM on stat.  Life is suffering.
    if (er && er.code === 'EPERM' && isWindows) {
      return fixWinEPERM(p, options, er, cb)
    }

    if (st && st.isDirectory()) {
      return rmdir(p, options, er, cb)
    }

    options.unlink(p, er => {
      if (er) {
        if (er.code === 'ENOENT') {
          return cb(null)
        }
        if (er.code === 'EPERM') {
          return (isWindows)
            ? fixWinEPERM(p, options, er, cb)
            : rmdir(p, options, er, cb)
        }
        if (er.code === 'EISDIR') {
          return rmdir(p, options, er, cb)
        }
      }
      return cb(er)
    })
  })
}

function fixWinEPERM (p, options, er, cb) {
  assert(p)
  assert(options)
  assert(typeof cb === 'function')
  if (er) {
    assert(er instanceof Error)
  }

  options.chmod(p, 0o666, er2 => {
    if (er2) {
      cb(er2.code === 'ENOENT' ? null : er)
    } else {
      options.stat(p, (er3, stats) => {
        if (er3) {
          cb(er3.code === 'ENOENT' ? null : er)
        } else if (stats.isDirectory()) {
          rmdir(p, options, er, cb)
        } else {
          options.unlink(p, cb)
        }
      })
    }
  })
}

function fixWinEPERMSync (p, options, er) {
  let stats

  assert(p)
  assert(options)
  if (er) {
    assert(er instanceof Error)
  }

  try {
    options.chmodSync(p, 0o666)
  } catch (er2) {
    if (er2.code === 'ENOENT') {
      return
    } else {
      throw er
    }
  }

  try {
    stats = options.statSync(p)
  } catch (er3) {
    if (er3.code === 'ENOENT') {
      return
    } else {
      throw er
    }
  }

  if (stats.isDirectory()) {
    rmdirSync(p, options, er)
  } else {
    options.unlinkSync(p)
  }
}

function rmdir (p, options, originalEr, cb) {
  assert(p)
  assert(options)
  if (originalEr) {
    assert(originalEr instanceof Error)
  }
  assert(typeof cb === 'function')

  // try to rmdir first, and only readdir on ENOTEMPTY or EEXIST (SunOS)
  // if we guessed wrong, and it's not a directory, then
  // raise the original error.
  options.rmdir(p, er => {
    if (er && (er.code === 'ENOTEMPTY' || er.code === 'EEXIST' || er.code === 'EPERM')) {
      rmkids(p, options, cb)
    } else if (er && er.code === 'ENOTDIR') {
      cb(originalEr)
    } else {
      cb(er)
    }
  })
}

function rmkids (p, options, cb) {
  assert(p)
  assert(options)
  assert(typeof cb === 'function')

  options.readdir(p, (er, files) => {
    if (er) return cb(er)

    let n = files.length
    let errState

    if (n === 0) return options.rmdir(p, cb)

    files.forEach(f => {
      rimraf(path.join(p, f), options, er => {
        if (errState) {
          return
        }
        if (er) return cb(errState = er)
        if (--n === 0) {
          options.rmdir(p, cb)
        }
      })
    })
  })
}

// this looks simpler, and is strictly *faster*, but will
// tie up the JavaScript thread and fail on excessively
// deep directory trees.
function rimrafSync (p, options) {
  let st

  options = options || {}
  defaults(options)

  assert(p, 'rimraf: missing path')
  assert.strictEqual(typeof p, 'string', 'rimraf: path should be a string')
  assert(options, 'rimraf: missing options')
  assert.strictEqual(typeof options, 'object', 'rimraf: options should be object')

  try {
    st = options.lstatSync(p)
  } catch (er) {
    if (er.code === 'ENOENT') {
      return
    }

    // Windows can EPERM on stat.  Life is suffering.
    if (er.code === 'EPERM' && isWindows) {
      fixWinEPERMSync(p, options, er)
    }
  }

  try {
    // sunos lets the root user unlink directories, which is... weird.
    if (st && st.isDirectory()) {
      rmdirSync(p, options, null)
    } else {
      options.unlinkSync(p)
    }
  } catch (er) {
    if (er.code === 'ENOENT') {
      return
    } else if (er.code === 'EPERM') {
      return isWindows ? fixWinEPERMSync(p, options, er) : rmdirSync(p, options, er)
    } else if (er.code !== 'EISDIR') {
      throw er
    }
    rmdirSync(p, options, er)
  }
}

function rmdirSync (p, options, originalEr) {
  assert(p)
  assert(options)
  if (originalEr) {
    assert(originalEr instanceof Error)
  }

  try {
    options.rmdirSync(p)
  } catch (er) {
    if (er.code === 'ENOTDIR') {
      throw originalEr
    } else if (er.code === 'ENOTEMPTY' || er.code === 'EEXIST' || er.code === 'EPERM') {
      rmkidsSync(p, options)
    } else if (er.code !== 'ENOENT') {
      throw er
    }
  }
}

function rmkidsSync (p, options) {
  assert(p)
  assert(options)
  options.readdirSync(p).forEach(f => rimrafSync(path.join(p, f), options))

  if (isWindows) {
    // We only end up here once we got ENOTEMPTY at least once, and
    // at this point, we are guaranteed to have removed all the kids.
    // So, we know that it won't be ENOENT or ENOTDIR or anything else.
    // try really hard to delete stuff on windows, because it has a
    // PROFOUNDLY annoying habit of not closing handles promptly when
    // files are deleted, resulting in spurious ENOTEMPTY errors.
    const startTime = Date.now()
    do {
      try {
        const ret = options.rmdirSync(p, options)
        return ret
      } catch (er) { }
    } while (Date.now() - startTime < 500) // give up after 500ms
  } else {
    const ret = options.rmdirSync(p, options)
    return ret
  }
}

module.exports = rimraf
rimraf.sync = rimrafSync


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const file = __webpack_require__(32)
const link = __webpack_require__(33)
const symlink = __webpack_require__(34)

module.exports = {
  // file
  createFile: file.createFile,
  createFileSync: file.createFileSync,
  ensureFile: file.createFile,
  ensureFileSync: file.createFileSync,
  // link
  createLink: link.createLink,
  createLinkSync: link.createLinkSync,
  ensureLink: link.createLink,
  ensureLinkSync: link.createLinkSync,
  // symlink
  createSymlink: symlink.createSymlink,
  createSymlinkSync: symlink.createSymlinkSync,
  ensureSymlink: symlink.createSymlink,
  ensureSymlinkSync: symlink.createSymlinkSync
}


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const u = __webpack_require__(4).fromCallback
const path = __webpack_require__(16)
const fs = __webpack_require__(5)
const mkdir = __webpack_require__(17)
const pathExists = __webpack_require__(27).pathExists

function createFile (file, callback) {
  function makeFile () {
    fs.writeFile(file, '', err => {
      if (err) return callback(err)
      callback()
    })
  }

  fs.stat(file, (err, stats) => { // eslint-disable-line handle-callback-err
    if (!err && stats.isFile()) return callback()
    const dir = path.dirname(file)
    pathExists(dir, (err, dirExists) => {
      if (err) return callback(err)
      if (dirExists) return makeFile()
      mkdir.mkdirs(dir, err => {
        if (err) return callback(err)
        makeFile()
      })
    })
  })
}

function createFileSync (file) {
  let stats
  try {
    stats = fs.statSync(file)
  } catch (e) {}
  if (stats && stats.isFile()) return

  const dir = path.dirname(file)
  if (!fs.existsSync(dir)) {
    mkdir.mkdirsSync(dir)
  }

  fs.writeFileSync(file, '')
}

module.exports = {
  createFile: u(createFile),
  createFileSync
}


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const u = __webpack_require__(4).fromCallback
const path = __webpack_require__(16)
const fs = __webpack_require__(5)
const mkdir = __webpack_require__(17)
const pathExists = __webpack_require__(27).pathExists

function createLink (srcpath, dstpath, callback) {
  function makeLink (srcpath, dstpath) {
    fs.link(srcpath, dstpath, err => {
      if (err) return callback(err)
      callback(null)
    })
  }

  pathExists(dstpath, (err, destinationExists) => {
    if (err) return callback(err)
    if (destinationExists) return callback(null)
    fs.lstat(srcpath, (err) => {
      if (err) {
        err.message = err.message.replace('lstat', 'ensureLink')
        return callback(err)
      }

      const dir = path.dirname(dstpath)
      pathExists(dir, (err, dirExists) => {
        if (err) return callback(err)
        if (dirExists) return makeLink(srcpath, dstpath)
        mkdir.mkdirs(dir, err => {
          if (err) return callback(err)
          makeLink(srcpath, dstpath)
        })
      })
    })
  })
}

function createLinkSync (srcpath, dstpath) {
  const destinationExists = fs.existsSync(dstpath)
  if (destinationExists) return undefined

  try {
    fs.lstatSync(srcpath)
  } catch (err) {
    err.message = err.message.replace('lstat', 'ensureLink')
    throw err
  }

  const dir = path.dirname(dstpath)
  const dirExists = fs.existsSync(dir)
  if (dirExists) return fs.linkSync(srcpath, dstpath)
  mkdir.mkdirsSync(dir)

  return fs.linkSync(srcpath, dstpath)
}

module.exports = {
  createLink: u(createLink),
  createLinkSync
}


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const u = __webpack_require__(4).fromCallback
const path = __webpack_require__(16)
const fs = __webpack_require__(5)
const _mkdirs = __webpack_require__(17)
const mkdirs = _mkdirs.mkdirs
const mkdirsSync = _mkdirs.mkdirsSync

const _symlinkPaths = __webpack_require__(35)
const symlinkPaths = _symlinkPaths.symlinkPaths
const symlinkPathsSync = _symlinkPaths.symlinkPathsSync

const _symlinkType = __webpack_require__(36)
const symlinkType = _symlinkType.symlinkType
const symlinkTypeSync = _symlinkType.symlinkTypeSync

const pathExists = __webpack_require__(27).pathExists

function createSymlink (srcpath, dstpath, type, callback) {
  callback = (typeof type === 'function') ? type : callback
  type = (typeof type === 'function') ? false : type

  pathExists(dstpath, (err, destinationExists) => {
    if (err) return callback(err)
    if (destinationExists) return callback(null)
    symlinkPaths(srcpath, dstpath, (err, relative) => {
      if (err) return callback(err)
      srcpath = relative.toDst
      symlinkType(relative.toCwd, type, (err, type) => {
        if (err) return callback(err)
        const dir = path.dirname(dstpath)
        pathExists(dir, (err, dirExists) => {
          if (err) return callback(err)
          if (dirExists) return fs.symlink(srcpath, dstpath, type, callback)
          mkdirs(dir, err => {
            if (err) return callback(err)
            fs.symlink(srcpath, dstpath, type, callback)
          })
        })
      })
    })
  })
}

function createSymlinkSync (srcpath, dstpath, type) {
  const destinationExists = fs.existsSync(dstpath)
  if (destinationExists) return undefined

  const relative = symlinkPathsSync(srcpath, dstpath)
  srcpath = relative.toDst
  type = symlinkTypeSync(relative.toCwd, type)
  const dir = path.dirname(dstpath)
  const exists = fs.existsSync(dir)
  if (exists) return fs.symlinkSync(srcpath, dstpath, type)
  mkdirsSync(dir)
  return fs.symlinkSync(srcpath, dstpath, type)
}

module.exports = {
  createSymlink: u(createSymlink),
  createSymlinkSync
}


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const path = __webpack_require__(16)
const fs = __webpack_require__(5)
const pathExists = __webpack_require__(27).pathExists

/**
 * Function that returns two types of paths, one relative to symlink, and one
 * relative to the current working directory. Checks if path is absolute or
 * relative. If the path is relative, this function checks if the path is
 * relative to symlink or relative to current working directory. This is an
 * initiative to find a smarter `srcpath` to supply when building symlinks.
 * This allows you to determine which path to use out of one of three possible
 * types of source paths. The first is an absolute path. This is detected by
 * `path.isAbsolute()`. When an absolute path is provided, it is checked to
 * see if it exists. If it does it's used, if not an error is returned
 * (callback)/ thrown (sync). The other two options for `srcpath` are a
 * relative url. By default Node's `fs.symlink` works by creating a symlink
 * using `dstpath` and expects the `srcpath` to be relative to the newly
 * created symlink. If you provide a `srcpath` that does not exist on the file
 * system it results in a broken symlink. To minimize this, the function
 * checks to see if the 'relative to symlink' source file exists, and if it
 * does it will use it. If it does not, it checks if there's a file that
 * exists that is relative to the current working directory, if does its used.
 * This preserves the expectations of the original fs.symlink spec and adds
 * the ability to pass in `relative to current working direcotry` paths.
 */

function symlinkPaths (srcpath, dstpath, callback) {
  if (path.isAbsolute(srcpath)) {
    return fs.lstat(srcpath, (err) => {
      if (err) {
        err.message = err.message.replace('lstat', 'ensureSymlink')
        return callback(err)
      }
      return callback(null, {
        'toCwd': srcpath,
        'toDst': srcpath
      })
    })
  } else {
    const dstdir = path.dirname(dstpath)
    const relativeToDst = path.join(dstdir, srcpath)
    return pathExists(relativeToDst, (err, exists) => {
      if (err) return callback(err)
      if (exists) {
        return callback(null, {
          'toCwd': relativeToDst,
          'toDst': srcpath
        })
      } else {
        return fs.lstat(srcpath, (err) => {
          if (err) {
            err.message = err.message.replace('lstat', 'ensureSymlink')
            return callback(err)
          }
          return callback(null, {
            'toCwd': srcpath,
            'toDst': path.relative(dstdir, srcpath)
          })
        })
      }
    })
  }
}

function symlinkPathsSync (srcpath, dstpath) {
  let exists
  if (path.isAbsolute(srcpath)) {
    exists = fs.existsSync(srcpath)
    if (!exists) throw new Error('absolute srcpath does not exist')
    return {
      'toCwd': srcpath,
      'toDst': srcpath
    }
  } else {
    const dstdir = path.dirname(dstpath)
    const relativeToDst = path.join(dstdir, srcpath)
    exists = fs.existsSync(relativeToDst)
    if (exists) {
      return {
        'toCwd': relativeToDst,
        'toDst': srcpath
      }
    } else {
      exists = fs.existsSync(srcpath)
      if (!exists) throw new Error('relative srcpath does not exist')
      return {
        'toCwd': srcpath,
        'toDst': path.relative(dstdir, srcpath)
      }
    }
  }
}

module.exports = {
  symlinkPaths,
  symlinkPathsSync
}


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const fs = __webpack_require__(5)

function symlinkType (srcpath, type, callback) {
  callback = (typeof type === 'function') ? type : callback
  type = (typeof type === 'function') ? false : type
  if (type) return callback(null, type)
  fs.lstat(srcpath, (err, stats) => {
    if (err) return callback(null, 'file')
    type = (stats && stats.isDirectory()) ? 'dir' : 'file'
    callback(null, type)
  })
}

function symlinkTypeSync (srcpath, type) {
  let stats

  if (type) return type
  try {
    stats = fs.lstatSync(srcpath)
  } catch (e) {
    return 'file'
  }
  return (stats && stats.isDirectory()) ? 'dir' : 'file'
}

module.exports = {
  symlinkType,
  symlinkTypeSync
}


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const u = __webpack_require__(4).fromCallback
const jsonFile = __webpack_require__(38)

jsonFile.outputJson = u(__webpack_require__(40))
jsonFile.outputJsonSync = __webpack_require__(41)
// aliases
jsonFile.outputJSON = jsonFile.outputJson
jsonFile.outputJSONSync = jsonFile.outputJsonSync
jsonFile.writeJSON = jsonFile.writeJson
jsonFile.writeJSONSync = jsonFile.writeJsonSync
jsonFile.readJSON = jsonFile.readJson
jsonFile.readJSONSync = jsonFile.readJsonSync

module.exports = jsonFile


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const u = __webpack_require__(4).fromCallback
const jsonFile = __webpack_require__(39)

module.exports = {
  // jsonfile exports
  readJson: u(jsonFile.readFile),
  readJsonSync: jsonFile.readFileSync,
  writeJson: u(jsonFile.writeFile),
  writeJsonSync: jsonFile.writeFileSync
}


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var _fs
try {
  _fs = __webpack_require__(5)
} catch (_) {
  _fs = __webpack_require__(6)
}

function readFile (file, options, callback) {
  if (callback == null) {
    callback = options
    options = {}
  }

  if (typeof options === 'string') {
    options = {encoding: options}
  }

  options = options || {}
  var fs = options.fs || _fs

  var shouldThrow = true
  if ('throws' in options) {
    shouldThrow = options.throws
  }

  fs.readFile(file, options, function (err, data) {
    if (err) return callback(err)

    data = stripBom(data)

    var obj
    try {
      obj = JSON.parse(data, options ? options.reviver : null)
    } catch (err2) {
      if (shouldThrow) {
        err2.message = file + ': ' + err2.message
        return callback(err2)
      } else {
        return callback(null, null)
      }
    }

    callback(null, obj)
  })
}

function readFileSync (file, options) {
  options = options || {}
  if (typeof options === 'string') {
    options = {encoding: options}
  }

  var fs = options.fs || _fs

  var shouldThrow = true
  if ('throws' in options) {
    shouldThrow = options.throws
  }

  try {
    var content = fs.readFileSync(file, options)
    content = stripBom(content)
    return JSON.parse(content, options.reviver)
  } catch (err) {
    if (shouldThrow) {
      err.message = file + ': ' + err.message
      throw err
    } else {
      return null
    }
  }
}

function stringify (obj, options) {
  var spaces
  var EOL = '\n'
  if (typeof options === 'object' && options !== null) {
    if (options.spaces) {
      spaces = options.spaces
    }
    if (options.EOL) {
      EOL = options.EOL
    }
  }

  var str = JSON.stringify(obj, options ? options.replacer : null, spaces)

  return str.replace(/\n/g, EOL) + EOL
}

function writeFile (file, obj, options, callback) {
  if (callback == null) {
    callback = options
    options = {}
  }
  options = options || {}
  var fs = options.fs || _fs

  var str = ''
  try {
    str = stringify(obj, options)
  } catch (err) {
    // Need to return whether a callback was passed or not
    if (callback) callback(err, null)
    return
  }

  fs.writeFile(file, str, options, callback)
}

function writeFileSync (file, obj, options) {
  options = options || {}
  var fs = options.fs || _fs

  var str = stringify(obj, options)
  // not sure if fs.writeFileSync returns anything, but just in case
  return fs.writeFileSync(file, str, options)
}

function stripBom (content) {
  // we do this because JSON.parse would convert it to a utf8 string if encoding wasn't specified
  if (Buffer.isBuffer(content)) content = content.toString('utf8')
  content = content.replace(/^\uFEFF/, '')
  return content
}

var jsonfile = {
  readFile: readFile,
  readFileSync: readFileSync,
  writeFile: writeFile,
  writeFileSync: writeFileSync
}

module.exports = jsonfile


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const path = __webpack_require__(16)
const mkdir = __webpack_require__(17)
const pathExists = __webpack_require__(27).pathExists
const jsonFile = __webpack_require__(38)

function outputJson (file, data, options, callback) {
  if (typeof options === 'function') {
    callback = options
    options = {}
  }

  const dir = path.dirname(file)

  pathExists(dir, (err, itDoes) => {
    if (err) return callback(err)
    if (itDoes) return jsonFile.writeJson(file, data, options, callback)

    mkdir.mkdirs(dir, err => {
      if (err) return callback(err)
      jsonFile.writeJson(file, data, options, callback)
    })
  })
}

module.exports = outputJson


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const fs = __webpack_require__(5)
const path = __webpack_require__(16)
const mkdir = __webpack_require__(17)
const jsonFile = __webpack_require__(38)

function outputJsonSync (file, data, options) {
  const dir = path.dirname(file)

  if (!fs.existsSync(dir)) {
    mkdir.mkdirsSync(dir)
  }

  jsonFile.writeJsonSync(file, data, options)
}

module.exports = outputJsonSync


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  moveSync: __webpack_require__(43)
}


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const fs = __webpack_require__(5)
const path = __webpack_require__(16)
const copySync = __webpack_require__(14).copySync
const removeSync = __webpack_require__(29).removeSync
const mkdirpSync = __webpack_require__(17).mkdirpSync
const stat = __webpack_require__(23)

function moveSync (src, dest, opts) {
  opts = opts || {}
  const overwrite = opts.overwrite || opts.clobber || false

  const { srcStat } = stat.checkPathsSync(src, dest, 'move')
  stat.checkParentPathsSync(src, srcStat, dest, 'move')
  mkdirpSync(path.dirname(dest))
  return doRename(src, dest, overwrite)
}

function doRename (src, dest, overwrite) {
  if (overwrite) {
    removeSync(dest)
    return rename(src, dest, overwrite)
  }
  if (fs.existsSync(dest)) throw new Error('dest already exists.')
  return rename(src, dest, overwrite)
}

function rename (src, dest, overwrite) {
  try {
    fs.renameSync(src, dest)
  } catch (err) {
    if (err.code !== 'EXDEV') throw err
    return moveAcrossDevice(src, dest, overwrite)
  }
}

function moveAcrossDevice (src, dest, overwrite) {
  const opts = {
    overwrite,
    errorOnExist: true
  }
  copySync(src, dest, opts)
  return removeSync(src)
}

module.exports = moveSync


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const u = __webpack_require__(4).fromCallback
module.exports = {
  move: u(__webpack_require__(45))
}


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const fs = __webpack_require__(5)
const path = __webpack_require__(16)
const copy = __webpack_require__(25).copy
const remove = __webpack_require__(29).remove
const mkdirp = __webpack_require__(17).mkdirp
const pathExists = __webpack_require__(27).pathExists
const stat = __webpack_require__(23)

function move (src, dest, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }

  const overwrite = opts.overwrite || opts.clobber || false

  stat.checkPaths(src, dest, 'move', (err, stats) => {
    if (err) return cb(err)
    const { srcStat } = stats
    stat.checkParentPaths(src, srcStat, dest, 'move', err => {
      if (err) return cb(err)
      mkdirp(path.dirname(dest), err => {
        if (err) return cb(err)
        return doRename(src, dest, overwrite, cb)
      })
    })
  })
}

function doRename (src, dest, overwrite, cb) {
  if (overwrite) {
    return remove(dest, err => {
      if (err) return cb(err)
      return rename(src, dest, overwrite, cb)
    })
  }
  pathExists(dest, (err, destExists) => {
    if (err) return cb(err)
    if (destExists) return cb(new Error('dest already exists.'))
    return rename(src, dest, overwrite, cb)
  })
}

function rename (src, dest, overwrite, cb) {
  fs.rename(src, dest, err => {
    if (!err) return cb()
    if (err.code !== 'EXDEV') return cb(err)
    return moveAcrossDevice(src, dest, overwrite, cb)
  })
}

function moveAcrossDevice (src, dest, overwrite, cb) {
  const opts = {
    overwrite,
    errorOnExist: true
  }
  copy(src, dest, opts, err => {
    if (err) return cb(err)
    return remove(src, cb)
  })
}

module.exports = move


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const u = __webpack_require__(4).fromCallback
const fs = __webpack_require__(5)
const path = __webpack_require__(16)
const mkdir = __webpack_require__(17)
const pathExists = __webpack_require__(27).pathExists

function outputFile (file, data, encoding, callback) {
  if (typeof encoding === 'function') {
    callback = encoding
    encoding = 'utf8'
  }

  const dir = path.dirname(file)
  pathExists(dir, (err, itDoes) => {
    if (err) return callback(err)
    if (itDoes) return fs.writeFile(file, data, encoding, callback)

    mkdir.mkdirs(dir, err => {
      if (err) return callback(err)

      fs.writeFile(file, data, encoding, callback)
    })
  })
}

function outputFileSync (file, ...args) {
  const dir = path.dirname(file)
  if (fs.existsSync(dir)) {
    return fs.writeFileSync(file, ...args)
  }
  mkdir.mkdirsSync(dir)
  fs.writeFileSync(file, ...args)
}

module.exports = {
  outputFile: u(outputFile),
  outputFileSync
}


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Roman.Gaikov on 3/21/2019
 */
const fs = __webpack_require__(2);
const fs_extra_1 = __webpack_require__(2);
const path_1 = __webpack_require__(16);
const chalk_1 = __webpack_require__(48);
const fs_1 = __webpack_require__(6);
const tmp_1 = __webpack_require__(59);
class FilePath {
    constructor(path) {
        this.path = path;
    }
    get path() {
        return this._path;
    }
    set path(value) {
        this._path = path_1.normalize(value).replace(/\\/g, "/");
    }
    get name() {
        const parts = this.path.split("/");
        return parts[parts.length - 1];
    }
    get extension() {
        const parts = this.name.split(".");
        if (parts.length > 1) {
            return parts[parts.length - 1];
        }
        return null;
    }
    get exists() {
        return this._path && fs.existsSync(this._path);
    }
    get isFolder() {
        if (this.exists) {
            const stat = fs.statSync(this._path);
            return stat.isDirectory();
        }
        return false;
    }
    resolvePath(relativePath) {
        return new FilePath(this.path + "/" + relativePath);
    }
    relativePath(file) {
        return path_1.relative(this.path, file.path).replace(/\\/g, "/");
    }
    createFolder() {
        if (this.extension) {
            try {
                fs.ensureFileSync(this.path);
            }
            catch (e) {
                console.warn("can't create file path: ", this.path);
                return false;
            }
        }
        else {
            try {
                fs.ensureDirSync(this.path);
            }
            catch (e) {
                console.warn("can't create folder path: ", this.path);
                return false;
            }
        }
        return true;
    }
    static createTempFolder(prefix) {
        const result = tmp_1.dirSync({ prefix: prefix, unsafeCleanup: true });
        return new FilePath(result.name);
    }
    remove() {
        if (this.isFolder) {
            try {
                fs_extra_1.removeSync(this.path);
            }
            catch (e) {
                console.error(null, `Can't remove directory '${chalk_1.default.blue(this.path)}'`);
                return false;
            }
        }
        else {
            try {
                fs_1.unlinkSync(this.path);
            }
            catch (e) {
                console.error(null, `Can't remove file '${chalk_1.default.blue(this.path)}'`);
            }
        }
        return true;
    }
    copy(destination) {
        console.log(null, `copy '${chalk_1.default.blue(this.path)}' to '${chalk_1.default.blue(destination.path)}'`);
        try {
            fs_extra_1.copySync(this.path, destination.path);
        }
        catch (e) {
            console.error(null, `Can't copy '${chalk_1.default.blue(this.path)}' to '${chalk_1.default.blue(destination.path)}'`);
            return false;
        }
        return true;
    }
    listing() {
        if (this.isFolder) {
            const list = [];
            fs.readdirSync(this.path).forEach(fileName => {
                list.push(this.resolvePath(fileName));
            });
            return list;
        }
        return null;
    }
    listingDeep() {
        const list = this.listing();
        let result = list;
        for (const file of list) {
            if (file.isFolder) {
                result = result.concat(file.listingDeep());
            }
        }
        return result;
    }
}
exports.FilePath = FilePath;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const escapeStringRegexp = __webpack_require__(49);
const ansiStyles = __webpack_require__(50);
const stdoutColor = __webpack_require__(56).stdout;

const template = __webpack_require__(58);

const isSimpleWindowsTerm = process.platform === 'win32' && !(process.env.TERM || '').toLowerCase().startsWith('xterm');

// `supportsColor.level` → `ansiStyles.color[name]` mapping
const levelMapping = ['ansi', 'ansi', 'ansi256', 'ansi16m'];

// `color-convert` models to exclude from the Chalk API due to conflicts and such
const skipModels = new Set(['gray']);

const styles = Object.create(null);

function applyOptions(obj, options) {
	options = options || {};

	// Detect level if not set manually
	const scLevel = stdoutColor ? stdoutColor.level : 0;
	obj.level = options.level === undefined ? scLevel : options.level;
	obj.enabled = 'enabled' in options ? options.enabled : obj.level > 0;
}

function Chalk(options) {
	// We check for this.template here since calling `chalk.constructor()`
	// by itself will have a `this` of a previously constructed chalk object
	if (!this || !(this instanceof Chalk) || this.template) {
		const chalk = {};
		applyOptions(chalk, options);

		chalk.template = function () {
			const args = [].slice.call(arguments);
			return chalkTag.apply(null, [chalk.template].concat(args));
		};

		Object.setPrototypeOf(chalk, Chalk.prototype);
		Object.setPrototypeOf(chalk.template, chalk);

		chalk.template.constructor = Chalk;

		return chalk.template;
	}

	applyOptions(this, options);
}

// Use bright blue on Windows as the normal blue color is illegible
if (isSimpleWindowsTerm) {
	ansiStyles.blue.open = '\u001B[94m';
}

for (const key of Object.keys(ansiStyles)) {
	ansiStyles[key].closeRe = new RegExp(escapeStringRegexp(ansiStyles[key].close), 'g');

	styles[key] = {
		get() {
			const codes = ansiStyles[key];
			return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, key);
		}
	};
}

styles.visible = {
	get() {
		return build.call(this, this._styles || [], true, 'visible');
	}
};

ansiStyles.color.closeRe = new RegExp(escapeStringRegexp(ansiStyles.color.close), 'g');
for (const model of Object.keys(ansiStyles.color.ansi)) {
	if (skipModels.has(model)) {
		continue;
	}

	styles[model] = {
		get() {
			const level = this.level;
			return function () {
				const open = ansiStyles.color[levelMapping[level]][model].apply(null, arguments);
				const codes = {
					open,
					close: ansiStyles.color.close,
					closeRe: ansiStyles.color.closeRe
				};
				return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, model);
			};
		}
	};
}

ansiStyles.bgColor.closeRe = new RegExp(escapeStringRegexp(ansiStyles.bgColor.close), 'g');
for (const model of Object.keys(ansiStyles.bgColor.ansi)) {
	if (skipModels.has(model)) {
		continue;
	}

	const bgModel = 'bg' + model[0].toUpperCase() + model.slice(1);
	styles[bgModel] = {
		get() {
			const level = this.level;
			return function () {
				const open = ansiStyles.bgColor[levelMapping[level]][model].apply(null, arguments);
				const codes = {
					open,
					close: ansiStyles.bgColor.close,
					closeRe: ansiStyles.bgColor.closeRe
				};
				return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, model);
			};
		}
	};
}

const proto = Object.defineProperties(() => {}, styles);

function build(_styles, _empty, key) {
	const builder = function () {
		return applyStyle.apply(builder, arguments);
	};

	builder._styles = _styles;
	builder._empty = _empty;

	const self = this;

	Object.defineProperty(builder, 'level', {
		enumerable: true,
		get() {
			return self.level;
		},
		set(level) {
			self.level = level;
		}
	});

	Object.defineProperty(builder, 'enabled', {
		enumerable: true,
		get() {
			return self.enabled;
		},
		set(enabled) {
			self.enabled = enabled;
		}
	});

	// See below for fix regarding invisible grey/dim combination on Windows
	builder.hasGrey = this.hasGrey || key === 'gray' || key === 'grey';

	// `__proto__` is used because we must return a function, but there is
	// no way to create a function with a different prototype
	builder.__proto__ = proto; // eslint-disable-line no-proto

	return builder;
}

function applyStyle() {
	// Support varags, but simply cast to string in case there's only one arg
	const args = arguments;
	const argsLen = args.length;
	let str = String(arguments[0]);

	if (argsLen === 0) {
		return '';
	}

	if (argsLen > 1) {
		// Don't slice `arguments`, it prevents V8 optimizations
		for (let a = 1; a < argsLen; a++) {
			str += ' ' + args[a];
		}
	}

	if (!this.enabled || this.level <= 0 || !str) {
		return this._empty ? '' : str;
	}

	// Turns out that on Windows dimmed gray text becomes invisible in cmd.exe,
	// see https://github.com/chalk/chalk/issues/58
	// If we're on Windows and we're dealing with a gray color, temporarily make 'dim' a noop.
	const originalDim = ansiStyles.dim.open;
	if (isSimpleWindowsTerm && this.hasGrey) {
		ansiStyles.dim.open = '';
	}

	for (const code of this._styles.slice().reverse()) {
		// Replace any instances already present with a re-opening code
		// otherwise only the part of the string until said closing code
		// will be colored, and the rest will simply be 'plain'.
		str = code.open + str.replace(code.closeRe, code.open) + code.close;

		// Close the styling before a linebreak and reopen
		// after next line to fix a bleed issue on macOS
		// https://github.com/chalk/chalk/pull/92
		str = str.replace(/\r?\n/g, `${code.close}$&${code.open}`);
	}

	// Reset the original `dim` if we changed it to work around the Windows dimmed gray issue
	ansiStyles.dim.open = originalDim;

	return str;
}

function chalkTag(chalk, strings) {
	if (!Array.isArray(strings)) {
		// If chalk() was called by itself or with a string,
		// return the string itself as a string.
		return [].slice.call(arguments, 1).join(' ');
	}

	const args = [].slice.call(arguments, 2);
	const parts = [strings.raw[0]];

	for (let i = 1; i < strings.length; i++) {
		parts.push(String(args[i - 1]).replace(/[{}\\]/g, '\\$&'));
		parts.push(String(strings.raw[i]));
	}

	return template(chalk, parts.join(''));
}

Object.defineProperties(Chalk.prototype, styles);

module.exports = Chalk(); // eslint-disable-line new-cap
module.exports.supportsColor = stdoutColor;
module.exports.default = module.exports; // For TypeScript


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

module.exports = function (str) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	return str.replace(matchOperatorsRe, '\\$&');
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
const colorConvert = __webpack_require__(52);

const wrapAnsi16 = (fn, offset) => function () {
	const code = fn.apply(colorConvert, arguments);
	return `\u001B[${code + offset}m`;
};

const wrapAnsi256 = (fn, offset) => function () {
	const code = fn.apply(colorConvert, arguments);
	return `\u001B[${38 + offset};5;${code}m`;
};

const wrapAnsi16m = (fn, offset) => function () {
	const rgb = fn.apply(colorConvert, arguments);
	return `\u001B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
};

function assembleStyles() {
	const codes = new Map();
	const styles = {
		modifier: {
			reset: [0, 0],
			// 21 isn't widely supported and 22 does the same thing
			bold: [1, 22],
			dim: [2, 22],
			italic: [3, 23],
			underline: [4, 24],
			inverse: [7, 27],
			hidden: [8, 28],
			strikethrough: [9, 29]
		},
		color: {
			black: [30, 39],
			red: [31, 39],
			green: [32, 39],
			yellow: [33, 39],
			blue: [34, 39],
			magenta: [35, 39],
			cyan: [36, 39],
			white: [37, 39],
			gray: [90, 39],

			// Bright color
			redBright: [91, 39],
			greenBright: [92, 39],
			yellowBright: [93, 39],
			blueBright: [94, 39],
			magentaBright: [95, 39],
			cyanBright: [96, 39],
			whiteBright: [97, 39]
		},
		bgColor: {
			bgBlack: [40, 49],
			bgRed: [41, 49],
			bgGreen: [42, 49],
			bgYellow: [43, 49],
			bgBlue: [44, 49],
			bgMagenta: [45, 49],
			bgCyan: [46, 49],
			bgWhite: [47, 49],

			// Bright color
			bgBlackBright: [100, 49],
			bgRedBright: [101, 49],
			bgGreenBright: [102, 49],
			bgYellowBright: [103, 49],
			bgBlueBright: [104, 49],
			bgMagentaBright: [105, 49],
			bgCyanBright: [106, 49],
			bgWhiteBright: [107, 49]
		}
	};

	// Fix humans
	styles.color.grey = styles.color.gray;

	for (const groupName of Object.keys(styles)) {
		const group = styles[groupName];

		for (const styleName of Object.keys(group)) {
			const style = group[styleName];

			styles[styleName] = {
				open: `\u001B[${style[0]}m`,
				close: `\u001B[${style[1]}m`
			};

			group[styleName] = styles[styleName];

			codes.set(style[0], style[1]);
		}

		Object.defineProperty(styles, groupName, {
			value: group,
			enumerable: false
		});

		Object.defineProperty(styles, 'codes', {
			value: codes,
			enumerable: false
		});
	}

	const ansi2ansi = n => n;
	const rgb2rgb = (r, g, b) => [r, g, b];

	styles.color.close = '\u001B[39m';
	styles.bgColor.close = '\u001B[49m';

	styles.color.ansi = {
		ansi: wrapAnsi16(ansi2ansi, 0)
	};
	styles.color.ansi256 = {
		ansi256: wrapAnsi256(ansi2ansi, 0)
	};
	styles.color.ansi16m = {
		rgb: wrapAnsi16m(rgb2rgb, 0)
	};

	styles.bgColor.ansi = {
		ansi: wrapAnsi16(ansi2ansi, 10)
	};
	styles.bgColor.ansi256 = {
		ansi256: wrapAnsi256(ansi2ansi, 10)
	};
	styles.bgColor.ansi16m = {
		rgb: wrapAnsi16m(rgb2rgb, 10)
	};

	for (let key of Object.keys(colorConvert)) {
		if (typeof colorConvert[key] !== 'object') {
			continue;
		}

		const suite = colorConvert[key];

		if (key === 'ansi16') {
			key = 'ansi';
		}

		if ('ansi16' in suite) {
			styles.color.ansi[key] = wrapAnsi16(suite.ansi16, 0);
			styles.bgColor.ansi[key] = wrapAnsi16(suite.ansi16, 10);
		}

		if ('ansi256' in suite) {
			styles.color.ansi256[key] = wrapAnsi256(suite.ansi256, 0);
			styles.bgColor.ansi256[key] = wrapAnsi256(suite.ansi256, 10);
		}

		if ('rgb' in suite) {
			styles.color.ansi16m[key] = wrapAnsi16m(suite.rgb, 0);
			styles.bgColor.ansi16m[key] = wrapAnsi16m(suite.rgb, 10);
		}
	}

	return styles;
}

// Make the export immutable
Object.defineProperty(module, 'exports', {
	enumerable: true,
	get: assembleStyles
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(51)(module)))

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var conversions = __webpack_require__(53);
var route = __webpack_require__(55);

var convert = {};

var models = Object.keys(conversions);

function wrapRaw(fn) {
	var wrappedFn = function (args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		return fn(args);
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

function wrapRounded(fn) {
	var wrappedFn = function (args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		var result = fn(args);

		// we're assuming the result is an array here.
		// see notice in conversions.js; don't use box types
		// in conversion functions.
		if (typeof result === 'object') {
			for (var len = result.length, i = 0; i < len; i++) {
				result[i] = Math.round(result[i]);
			}
		}

		return result;
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

models.forEach(function (fromModel) {
	convert[fromModel] = {};

	Object.defineProperty(convert[fromModel], 'channels', {value: conversions[fromModel].channels});
	Object.defineProperty(convert[fromModel], 'labels', {value: conversions[fromModel].labels});

	var routes = route(fromModel);
	var routeModels = Object.keys(routes);

	routeModels.forEach(function (toModel) {
		var fn = routes[toModel];

		convert[fromModel][toModel] = wrapRounded(fn);
		convert[fromModel][toModel].raw = wrapRaw(fn);
	});
});

module.exports = convert;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

/* MIT license */
var cssKeywords = __webpack_require__(54);

// NOTE: conversions should only return primitive values (i.e. arrays, or
//       values that give correct `typeof` results).
//       do not use box values types (i.e. Number(), String(), etc.)

var reverseKeywords = {};
for (var key in cssKeywords) {
	if (cssKeywords.hasOwnProperty(key)) {
		reverseKeywords[cssKeywords[key]] = key;
	}
}

var convert = module.exports = {
	rgb: {channels: 3, labels: 'rgb'},
	hsl: {channels: 3, labels: 'hsl'},
	hsv: {channels: 3, labels: 'hsv'},
	hwb: {channels: 3, labels: 'hwb'},
	cmyk: {channels: 4, labels: 'cmyk'},
	xyz: {channels: 3, labels: 'xyz'},
	lab: {channels: 3, labels: 'lab'},
	lch: {channels: 3, labels: 'lch'},
	hex: {channels: 1, labels: ['hex']},
	keyword: {channels: 1, labels: ['keyword']},
	ansi16: {channels: 1, labels: ['ansi16']},
	ansi256: {channels: 1, labels: ['ansi256']},
	hcg: {channels: 3, labels: ['h', 'c', 'g']},
	apple: {channels: 3, labels: ['r16', 'g16', 'b16']},
	gray: {channels: 1, labels: ['gray']}
};

// hide .channels and .labels properties
for (var model in convert) {
	if (convert.hasOwnProperty(model)) {
		if (!('channels' in convert[model])) {
			throw new Error('missing channels property: ' + model);
		}

		if (!('labels' in convert[model])) {
			throw new Error('missing channel labels property: ' + model);
		}

		if (convert[model].labels.length !== convert[model].channels) {
			throw new Error('channel and label counts mismatch: ' + model);
		}

		var channels = convert[model].channels;
		var labels = convert[model].labels;
		delete convert[model].channels;
		delete convert[model].labels;
		Object.defineProperty(convert[model], 'channels', {value: channels});
		Object.defineProperty(convert[model], 'labels', {value: labels});
	}
}

convert.rgb.hsl = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var min = Math.min(r, g, b);
	var max = Math.max(r, g, b);
	var delta = max - min;
	var h;
	var s;
	var l;

	if (max === min) {
		h = 0;
	} else if (r === max) {
		h = (g - b) / delta;
	} else if (g === max) {
		h = 2 + (b - r) / delta;
	} else if (b === max) {
		h = 4 + (r - g) / delta;
	}

	h = Math.min(h * 60, 360);

	if (h < 0) {
		h += 360;
	}

	l = (min + max) / 2;

	if (max === min) {
		s = 0;
	} else if (l <= 0.5) {
		s = delta / (max + min);
	} else {
		s = delta / (2 - max - min);
	}

	return [h, s * 100, l * 100];
};

convert.rgb.hsv = function (rgb) {
	var rdif;
	var gdif;
	var bdif;
	var h;
	var s;

	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var v = Math.max(r, g, b);
	var diff = v - Math.min(r, g, b);
	var diffc = function (c) {
		return (v - c) / 6 / diff + 1 / 2;
	};

	if (diff === 0) {
		h = s = 0;
	} else {
		s = diff / v;
		rdif = diffc(r);
		gdif = diffc(g);
		bdif = diffc(b);

		if (r === v) {
			h = bdif - gdif;
		} else if (g === v) {
			h = (1 / 3) + rdif - bdif;
		} else if (b === v) {
			h = (2 / 3) + gdif - rdif;
		}
		if (h < 0) {
			h += 1;
		} else if (h > 1) {
			h -= 1;
		}
	}

	return [
		h * 360,
		s * 100,
		v * 100
	];
};

convert.rgb.hwb = function (rgb) {
	var r = rgb[0];
	var g = rgb[1];
	var b = rgb[2];
	var h = convert.rgb.hsl(rgb)[0];
	var w = 1 / 255 * Math.min(r, Math.min(g, b));

	b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));

	return [h, w * 100, b * 100];
};

convert.rgb.cmyk = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var c;
	var m;
	var y;
	var k;

	k = Math.min(1 - r, 1 - g, 1 - b);
	c = (1 - r - k) / (1 - k) || 0;
	m = (1 - g - k) / (1 - k) || 0;
	y = (1 - b - k) / (1 - k) || 0;

	return [c * 100, m * 100, y * 100, k * 100];
};

/**
 * See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
 * */
function comparativeDistance(x, y) {
	return (
		Math.pow(x[0] - y[0], 2) +
		Math.pow(x[1] - y[1], 2) +
		Math.pow(x[2] - y[2], 2)
	);
}

convert.rgb.keyword = function (rgb) {
	var reversed = reverseKeywords[rgb];
	if (reversed) {
		return reversed;
	}

	var currentClosestDistance = Infinity;
	var currentClosestKeyword;

	for (var keyword in cssKeywords) {
		if (cssKeywords.hasOwnProperty(keyword)) {
			var value = cssKeywords[keyword];

			// Compute comparative distance
			var distance = comparativeDistance(rgb, value);

			// Check if its less, if so set as closest
			if (distance < currentClosestDistance) {
				currentClosestDistance = distance;
				currentClosestKeyword = keyword;
			}
		}
	}

	return currentClosestKeyword;
};

convert.keyword.rgb = function (keyword) {
	return cssKeywords[keyword];
};

convert.rgb.xyz = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;

	// assume sRGB
	r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
	g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
	b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);

	var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
	var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
	var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

	return [x * 100, y * 100, z * 100];
};

convert.rgb.lab = function (rgb) {
	var xyz = convert.rgb.xyz(rgb);
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert.hsl.rgb = function (hsl) {
	var h = hsl[0] / 360;
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var t1;
	var t2;
	var t3;
	var rgb;
	var val;

	if (s === 0) {
		val = l * 255;
		return [val, val, val];
	}

	if (l < 0.5) {
		t2 = l * (1 + s);
	} else {
		t2 = l + s - l * s;
	}

	t1 = 2 * l - t2;

	rgb = [0, 0, 0];
	for (var i = 0; i < 3; i++) {
		t3 = h + 1 / 3 * -(i - 1);
		if (t3 < 0) {
			t3++;
		}
		if (t3 > 1) {
			t3--;
		}

		if (6 * t3 < 1) {
			val = t1 + (t2 - t1) * 6 * t3;
		} else if (2 * t3 < 1) {
			val = t2;
		} else if (3 * t3 < 2) {
			val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
		} else {
			val = t1;
		}

		rgb[i] = val * 255;
	}

	return rgb;
};

convert.hsl.hsv = function (hsl) {
	var h = hsl[0];
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var smin = s;
	var lmin = Math.max(l, 0.01);
	var sv;
	var v;

	l *= 2;
	s *= (l <= 1) ? l : 2 - l;
	smin *= lmin <= 1 ? lmin : 2 - lmin;
	v = (l + s) / 2;
	sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);

	return [h, sv * 100, v * 100];
};

convert.hsv.rgb = function (hsv) {
	var h = hsv[0] / 60;
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var hi = Math.floor(h) % 6;

	var f = h - Math.floor(h);
	var p = 255 * v * (1 - s);
	var q = 255 * v * (1 - (s * f));
	var t = 255 * v * (1 - (s * (1 - f)));
	v *= 255;

	switch (hi) {
		case 0:
			return [v, t, p];
		case 1:
			return [q, v, p];
		case 2:
			return [p, v, t];
		case 3:
			return [p, q, v];
		case 4:
			return [t, p, v];
		case 5:
			return [v, p, q];
	}
};

convert.hsv.hsl = function (hsv) {
	var h = hsv[0];
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var vmin = Math.max(v, 0.01);
	var lmin;
	var sl;
	var l;

	l = (2 - s) * v;
	lmin = (2 - s) * vmin;
	sl = s * vmin;
	sl /= (lmin <= 1) ? lmin : 2 - lmin;
	sl = sl || 0;
	l /= 2;

	return [h, sl * 100, l * 100];
};

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
convert.hwb.rgb = function (hwb) {
	var h = hwb[0] / 360;
	var wh = hwb[1] / 100;
	var bl = hwb[2] / 100;
	var ratio = wh + bl;
	var i;
	var v;
	var f;
	var n;

	// wh + bl cant be > 1
	if (ratio > 1) {
		wh /= ratio;
		bl /= ratio;
	}

	i = Math.floor(6 * h);
	v = 1 - bl;
	f = 6 * h - i;

	if ((i & 0x01) !== 0) {
		f = 1 - f;
	}

	n = wh + f * (v - wh); // linear interpolation

	var r;
	var g;
	var b;
	switch (i) {
		default:
		case 6:
		case 0: r = v; g = n; b = wh; break;
		case 1: r = n; g = v; b = wh; break;
		case 2: r = wh; g = v; b = n; break;
		case 3: r = wh; g = n; b = v; break;
		case 4: r = n; g = wh; b = v; break;
		case 5: r = v; g = wh; b = n; break;
	}

	return [r * 255, g * 255, b * 255];
};

convert.cmyk.rgb = function (cmyk) {
	var c = cmyk[0] / 100;
	var m = cmyk[1] / 100;
	var y = cmyk[2] / 100;
	var k = cmyk[3] / 100;
	var r;
	var g;
	var b;

	r = 1 - Math.min(1, c * (1 - k) + k);
	g = 1 - Math.min(1, m * (1 - k) + k);
	b = 1 - Math.min(1, y * (1 - k) + k);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.rgb = function (xyz) {
	var x = xyz[0] / 100;
	var y = xyz[1] / 100;
	var z = xyz[2] / 100;
	var r;
	var g;
	var b;

	r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
	g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
	b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

	// assume sRGB
	r = r > 0.0031308
		? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
		: r * 12.92;

	g = g > 0.0031308
		? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
		: g * 12.92;

	b = b > 0.0031308
		? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
		: b * 12.92;

	r = Math.min(Math.max(0, r), 1);
	g = Math.min(Math.max(0, g), 1);
	b = Math.min(Math.max(0, b), 1);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.lab = function (xyz) {
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert.lab.xyz = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var x;
	var y;
	var z;

	y = (l + 16) / 116;
	x = a / 500 + y;
	z = y - b / 200;

	var y2 = Math.pow(y, 3);
	var x2 = Math.pow(x, 3);
	var z2 = Math.pow(z, 3);
	y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
	x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
	z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;

	x *= 95.047;
	y *= 100;
	z *= 108.883;

	return [x, y, z];
};

convert.lab.lch = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var hr;
	var h;
	var c;

	hr = Math.atan2(b, a);
	h = hr * 360 / 2 / Math.PI;

	if (h < 0) {
		h += 360;
	}

	c = Math.sqrt(a * a + b * b);

	return [l, c, h];
};

convert.lch.lab = function (lch) {
	var l = lch[0];
	var c = lch[1];
	var h = lch[2];
	var a;
	var b;
	var hr;

	hr = h / 360 * 2 * Math.PI;
	a = c * Math.cos(hr);
	b = c * Math.sin(hr);

	return [l, a, b];
};

convert.rgb.ansi16 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];
	var value = 1 in arguments ? arguments[1] : convert.rgb.hsv(args)[2]; // hsv -> ansi16 optimization

	value = Math.round(value / 50);

	if (value === 0) {
		return 30;
	}

	var ansi = 30
		+ ((Math.round(b / 255) << 2)
		| (Math.round(g / 255) << 1)
		| Math.round(r / 255));

	if (value === 2) {
		ansi += 60;
	}

	return ansi;
};

convert.hsv.ansi16 = function (args) {
	// optimization here; we already know the value and don't need to get
	// it converted for us.
	return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
};

convert.rgb.ansi256 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];

	// we use the extended greyscale palette here, with the exception of
	// black and white. normal palette only has 4 greyscale shades.
	if (r === g && g === b) {
		if (r < 8) {
			return 16;
		}

		if (r > 248) {
			return 231;
		}

		return Math.round(((r - 8) / 247) * 24) + 232;
	}

	var ansi = 16
		+ (36 * Math.round(r / 255 * 5))
		+ (6 * Math.round(g / 255 * 5))
		+ Math.round(b / 255 * 5);

	return ansi;
};

convert.ansi16.rgb = function (args) {
	var color = args % 10;

	// handle greyscale
	if (color === 0 || color === 7) {
		if (args > 50) {
			color += 3.5;
		}

		color = color / 10.5 * 255;

		return [color, color, color];
	}

	var mult = (~~(args > 50) + 1) * 0.5;
	var r = ((color & 1) * mult) * 255;
	var g = (((color >> 1) & 1) * mult) * 255;
	var b = (((color >> 2) & 1) * mult) * 255;

	return [r, g, b];
};

convert.ansi256.rgb = function (args) {
	// handle greyscale
	if (args >= 232) {
		var c = (args - 232) * 10 + 8;
		return [c, c, c];
	}

	args -= 16;

	var rem;
	var r = Math.floor(args / 36) / 5 * 255;
	var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
	var b = (rem % 6) / 5 * 255;

	return [r, g, b];
};

convert.rgb.hex = function (args) {
	var integer = ((Math.round(args[0]) & 0xFF) << 16)
		+ ((Math.round(args[1]) & 0xFF) << 8)
		+ (Math.round(args[2]) & 0xFF);

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.hex.rgb = function (args) {
	var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
	if (!match) {
		return [0, 0, 0];
	}

	var colorString = match[0];

	if (match[0].length === 3) {
		colorString = colorString.split('').map(function (char) {
			return char + char;
		}).join('');
	}

	var integer = parseInt(colorString, 16);
	var r = (integer >> 16) & 0xFF;
	var g = (integer >> 8) & 0xFF;
	var b = integer & 0xFF;

	return [r, g, b];
};

convert.rgb.hcg = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var max = Math.max(Math.max(r, g), b);
	var min = Math.min(Math.min(r, g), b);
	var chroma = (max - min);
	var grayscale;
	var hue;

	if (chroma < 1) {
		grayscale = min / (1 - chroma);
	} else {
		grayscale = 0;
	}

	if (chroma <= 0) {
		hue = 0;
	} else
	if (max === r) {
		hue = ((g - b) / chroma) % 6;
	} else
	if (max === g) {
		hue = 2 + (b - r) / chroma;
	} else {
		hue = 4 + (r - g) / chroma + 4;
	}

	hue /= 6;
	hue %= 1;

	return [hue * 360, chroma * 100, grayscale * 100];
};

convert.hsl.hcg = function (hsl) {
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var c = 1;
	var f = 0;

	if (l < 0.5) {
		c = 2.0 * s * l;
	} else {
		c = 2.0 * s * (1.0 - l);
	}

	if (c < 1.0) {
		f = (l - 0.5 * c) / (1.0 - c);
	}

	return [hsl[0], c * 100, f * 100];
};

convert.hsv.hcg = function (hsv) {
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;

	var c = s * v;
	var f = 0;

	if (c < 1.0) {
		f = (v - c) / (1 - c);
	}

	return [hsv[0], c * 100, f * 100];
};

convert.hcg.rgb = function (hcg) {
	var h = hcg[0] / 360;
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	if (c === 0.0) {
		return [g * 255, g * 255, g * 255];
	}

	var pure = [0, 0, 0];
	var hi = (h % 1) * 6;
	var v = hi % 1;
	var w = 1 - v;
	var mg = 0;

	switch (Math.floor(hi)) {
		case 0:
			pure[0] = 1; pure[1] = v; pure[2] = 0; break;
		case 1:
			pure[0] = w; pure[1] = 1; pure[2] = 0; break;
		case 2:
			pure[0] = 0; pure[1] = 1; pure[2] = v; break;
		case 3:
			pure[0] = 0; pure[1] = w; pure[2] = 1; break;
		case 4:
			pure[0] = v; pure[1] = 0; pure[2] = 1; break;
		default:
			pure[0] = 1; pure[1] = 0; pure[2] = w;
	}

	mg = (1.0 - c) * g;

	return [
		(c * pure[0] + mg) * 255,
		(c * pure[1] + mg) * 255,
		(c * pure[2] + mg) * 255
	];
};

convert.hcg.hsv = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var v = c + g * (1.0 - c);
	var f = 0;

	if (v > 0.0) {
		f = c / v;
	}

	return [hcg[0], f * 100, v * 100];
};

convert.hcg.hsl = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var l = g * (1.0 - c) + 0.5 * c;
	var s = 0;

	if (l > 0.0 && l < 0.5) {
		s = c / (2 * l);
	} else
	if (l >= 0.5 && l < 1.0) {
		s = c / (2 * (1 - l));
	}

	return [hcg[0], s * 100, l * 100];
};

convert.hcg.hwb = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;
	var v = c + g * (1.0 - c);
	return [hcg[0], (v - c) * 100, (1 - v) * 100];
};

convert.hwb.hcg = function (hwb) {
	var w = hwb[1] / 100;
	var b = hwb[2] / 100;
	var v = 1 - b;
	var c = v - w;
	var g = 0;

	if (c < 1) {
		g = (v - c) / (1 - c);
	}

	return [hwb[0], c * 100, g * 100];
};

convert.apple.rgb = function (apple) {
	return [(apple[0] / 65535) * 255, (apple[1] / 65535) * 255, (apple[2] / 65535) * 255];
};

convert.rgb.apple = function (rgb) {
	return [(rgb[0] / 255) * 65535, (rgb[1] / 255) * 65535, (rgb[2] / 255) * 65535];
};

convert.gray.rgb = function (args) {
	return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
};

convert.gray.hsl = convert.gray.hsv = function (args) {
	return [0, 0, args[0]];
};

convert.gray.hwb = function (gray) {
	return [0, 100, gray[0]];
};

convert.gray.cmyk = function (gray) {
	return [0, 0, 0, gray[0]];
};

convert.gray.lab = function (gray) {
	return [gray[0], 0, 0];
};

convert.gray.hex = function (gray) {
	var val = Math.round(gray[0] / 100 * 255) & 0xFF;
	var integer = (val << 16) + (val << 8) + val;

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.rgb.gray = function (rgb) {
	var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
	return [val / 255 * 100];
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var conversions = __webpack_require__(53);

/*
	this function routes a model to all other models.

	all functions that are routed have a property `.conversion` attached
	to the returned synthetic function. This property is an array
	of strings, each with the steps in between the 'from' and 'to'
	color models (inclusive).

	conversions that are not possible simply are not included.
*/

function buildGraph() {
	var graph = {};
	// https://jsperf.com/object-keys-vs-for-in-with-closure/3
	var models = Object.keys(conversions);

	for (var len = models.length, i = 0; i < len; i++) {
		graph[models[i]] = {
			// http://jsperf.com/1-vs-infinity
			// micro-opt, but this is simple.
			distance: -1,
			parent: null
		};
	}

	return graph;
}

// https://en.wikipedia.org/wiki/Breadth-first_search
function deriveBFS(fromModel) {
	var graph = buildGraph();
	var queue = [fromModel]; // unshift -> queue -> pop

	graph[fromModel].distance = 0;

	while (queue.length) {
		var current = queue.pop();
		var adjacents = Object.keys(conversions[current]);

		for (var len = adjacents.length, i = 0; i < len; i++) {
			var adjacent = adjacents[i];
			var node = graph[adjacent];

			if (node.distance === -1) {
				node.distance = graph[current].distance + 1;
				node.parent = current;
				queue.unshift(adjacent);
			}
		}
	}

	return graph;
}

function link(from, to) {
	return function (args) {
		return to(from(args));
	};
}

function wrapConversion(toModel, graph) {
	var path = [graph[toModel].parent, toModel];
	var fn = conversions[graph[toModel].parent][toModel];

	var cur = graph[toModel].parent;
	while (graph[cur].parent) {
		path.unshift(graph[cur].parent);
		fn = link(conversions[graph[cur].parent][cur], fn);
		cur = graph[cur].parent;
	}

	fn.conversion = path;
	return fn;
}

module.exports = function (fromModel) {
	var graph = deriveBFS(fromModel);
	var conversion = {};

	var models = Object.keys(graph);
	for (var len = models.length, i = 0; i < len; i++) {
		var toModel = models[i];
		var node = graph[toModel];

		if (node.parent === null) {
			// no possible conversion, or this node is the source model.
			continue;
		}

		conversion[toModel] = wrapConversion(toModel, graph);
	}

	return conversion;
};



/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const os = __webpack_require__(22);
const hasFlag = __webpack_require__(57);

const env = process.env;

let forceColor;
if (hasFlag('no-color') ||
	hasFlag('no-colors') ||
	hasFlag('color=false')) {
	forceColor = false;
} else if (hasFlag('color') ||
	hasFlag('colors') ||
	hasFlag('color=true') ||
	hasFlag('color=always')) {
	forceColor = true;
}
if ('FORCE_COLOR' in env) {
	forceColor = env.FORCE_COLOR.length === 0 || parseInt(env.FORCE_COLOR, 10) !== 0;
}

function translateLevel(level) {
	if (level === 0) {
		return false;
	}

	return {
		level,
		hasBasic: true,
		has256: level >= 2,
		has16m: level >= 3
	};
}

function supportsColor(stream) {
	if (forceColor === false) {
		return 0;
	}

	if (hasFlag('color=16m') ||
		hasFlag('color=full') ||
		hasFlag('color=truecolor')) {
		return 3;
	}

	if (hasFlag('color=256')) {
		return 2;
	}

	if (stream && !stream.isTTY && forceColor !== true) {
		return 0;
	}

	const min = forceColor ? 1 : 0;

	if (process.platform === 'win32') {
		// Node.js 7.5.0 is the first version of Node.js to include a patch to
		// libuv that enables 256 color output on Windows. Anything earlier and it
		// won't work. However, here we target Node.js 8 at minimum as it is an LTS
		// release, and Node.js 7 is not. Windows 10 build 10586 is the first Windows
		// release that supports 256 colors. Windows 10 build 14931 is the first release
		// that supports 16m/TrueColor.
		const osRelease = os.release().split('.');
		if (
			Number(process.versions.node.split('.')[0]) >= 8 &&
			Number(osRelease[0]) >= 10 &&
			Number(osRelease[2]) >= 10586
		) {
			return Number(osRelease[2]) >= 14931 ? 3 : 2;
		}

		return 1;
	}

	if ('CI' in env) {
		if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
			return 1;
		}

		return min;
	}

	if ('TEAMCITY_VERSION' in env) {
		return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
	}

	if (env.COLORTERM === 'truecolor') {
		return 3;
	}

	if ('TERM_PROGRAM' in env) {
		const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

		switch (env.TERM_PROGRAM) {
			case 'iTerm.app':
				return version >= 3 ? 3 : 2;
			case 'Apple_Terminal':
				return 2;
			// No default
		}
	}

	if (/-256(color)?$/i.test(env.TERM)) {
		return 2;
	}

	if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
		return 1;
	}

	if ('COLORTERM' in env) {
		return 1;
	}

	if (env.TERM === 'dumb') {
		return min;
	}

	return min;
}

function getSupportLevel(stream) {
	const level = supportsColor(stream);
	return translateLevel(level);
}

module.exports = {
	supportsColor: getSupportLevel,
	stdout: getSupportLevel(process.stdout),
	stderr: getSupportLevel(process.stderr)
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = (flag, argv) => {
	argv = argv || process.argv;
	const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
	const pos = argv.indexOf(prefix + flag);
	const terminatorPos = argv.indexOf('--');
	return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const TEMPLATE_REGEX = /(?:\\(u[a-f\d]{4}|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;
const STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;
const STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;
const ESCAPE_REGEX = /\\(u[a-f\d]{4}|x[a-f\d]{2}|.)|([^\\])/gi;

const ESCAPES = new Map([
	['n', '\n'],
	['r', '\r'],
	['t', '\t'],
	['b', '\b'],
	['f', '\f'],
	['v', '\v'],
	['0', '\0'],
	['\\', '\\'],
	['e', '\u001B'],
	['a', '\u0007']
]);

function unescape(c) {
	if ((c[0] === 'u' && c.length === 5) || (c[0] === 'x' && c.length === 3)) {
		return String.fromCharCode(parseInt(c.slice(1), 16));
	}

	return ESCAPES.get(c) || c;
}

function parseArguments(name, args) {
	const results = [];
	const chunks = args.trim().split(/\s*,\s*/g);
	let matches;

	for (const chunk of chunks) {
		if (!isNaN(chunk)) {
			results.push(Number(chunk));
		} else if ((matches = chunk.match(STRING_REGEX))) {
			results.push(matches[2].replace(ESCAPE_REGEX, (m, escape, chr) => escape ? unescape(escape) : chr));
		} else {
			throw new Error(`Invalid Chalk template style argument: ${chunk} (in style '${name}')`);
		}
	}

	return results;
}

function parseStyle(style) {
	STYLE_REGEX.lastIndex = 0;

	const results = [];
	let matches;

	while ((matches = STYLE_REGEX.exec(style)) !== null) {
		const name = matches[1];

		if (matches[2]) {
			const args = parseArguments(name, matches[2]);
			results.push([name].concat(args));
		} else {
			results.push([name]);
		}
	}

	return results;
}

function buildStyle(chalk, styles) {
	const enabled = {};

	for (const layer of styles) {
		for (const style of layer.styles) {
			enabled[style[0]] = layer.inverse ? null : style.slice(1);
		}
	}

	let current = chalk;
	for (const styleName of Object.keys(enabled)) {
		if (Array.isArray(enabled[styleName])) {
			if (!(styleName in current)) {
				throw new Error(`Unknown Chalk style: ${styleName}`);
			}

			if (enabled[styleName].length > 0) {
				current = current[styleName].apply(current, enabled[styleName]);
			} else {
				current = current[styleName];
			}
		}
	}

	return current;
}

module.exports = (chalk, tmp) => {
	const styles = [];
	const chunks = [];
	let chunk = [];

	// eslint-disable-next-line max-params
	tmp.replace(TEMPLATE_REGEX, (m, escapeChar, inverse, style, close, chr) => {
		if (escapeChar) {
			chunk.push(unescape(escapeChar));
		} else if (style) {
			const str = chunk.join('');
			chunk = [];
			chunks.push(styles.length === 0 ? str : buildStyle(chalk, styles)(str));
			styles.push({inverse, styles: parseStyle(style)});
		} else if (close) {
			if (styles.length === 0) {
				throw new Error('Found extraneous } in Chalk template literal');
			}

			chunks.push(buildStyle(chalk, styles)(chunk.join('')));
			chunk = [];
			styles.pop();
		} else {
			chunk.push(chr);
		}
	});

	chunks.push(chunk.join(''));

	if (styles.length > 0) {
		const errMsg = `Chalk template literal is missing ${styles.length} closing bracket${styles.length === 1 ? '' : 's'} (\`}\`)`;
		throw new Error(errMsg);
	}

	return chunks.join('');
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Tmp
 *
 * Copyright (c) 2011-2017 KARASZI Istvan <github@spam.raszi.hu>
 *
 * MIT Licensed
 */

/*
 * Module dependencies.
 */
const fs = __webpack_require__(6);
const os = __webpack_require__(22);
const path = __webpack_require__(16);
const crypto = __webpack_require__(60);
const _c = fs.constants && os.constants ?
  { fs: fs.constants, os: os.constants } :
  process.binding('constants');
const rimraf = __webpack_require__(61);

/*
 * The working inner variables.
 */
const
  // the random characters to choose from
  RANDOM_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',

  TEMPLATE_PATTERN = /XXXXXX/,

  DEFAULT_TRIES = 3,

  CREATE_FLAGS = (_c.O_CREAT || _c.fs.O_CREAT) | (_c.O_EXCL || _c.fs.O_EXCL) | (_c.O_RDWR || _c.fs.O_RDWR),

  EBADF = _c.EBADF || _c.os.errno.EBADF,
  ENOENT = _c.ENOENT || _c.os.errno.ENOENT,

  DIR_MODE = 448 /* 0o700 */,
  FILE_MODE = 384 /* 0o600 */,

  EXIT = 'exit',

  SIGINT = 'SIGINT',

  // this will hold the objects need to be removed on exit
  _removeObjects = [];

var
  _gracefulCleanup = false;

/**
 * Random name generator based on crypto.
 * Adapted from http://blog.tompawlak.org/how-to-generate-random-values-nodejs-javascript
 *
 * @param {number} howMany
 * @returns {string} the generated random name
 * @private
 */
function _randomChars(howMany) {
  var
    value = [],
    rnd = null;

  // make sure that we do not fail because we ran out of entropy
  try {
    rnd = crypto.randomBytes(howMany);
  } catch (e) {
    rnd = crypto.pseudoRandomBytes(howMany);
  }

  for (var i = 0; i < howMany; i++) {
    value.push(RANDOM_CHARS[rnd[i] % RANDOM_CHARS.length]);
  }

  return value.join('');
}

/**
 * Checks whether the `obj` parameter is defined or not.
 *
 * @param {Object} obj
 * @returns {boolean} true if the object is undefined
 * @private
 */
function _isUndefined(obj) {
  return typeof obj === 'undefined';
}

/**
 * Parses the function arguments.
 *
 * This function helps to have optional arguments.
 *
 * @param {(Options|Function)} options
 * @param {Function} callback
 * @returns {Array} parsed arguments
 * @private
 */
function _parseArguments(options, callback) {
  /* istanbul ignore else */
  if (typeof options === 'function') {
    return [{}, options];
  }

  /* istanbul ignore else */
  if (_isUndefined(options)) {
    return [{}, callback];
  }

  return [options, callback];
}

/**
 * Generates a new temporary name.
 *
 * @param {Object} opts
 * @returns {string} the new random name according to opts
 * @private
 */
function _generateTmpName(opts) {

  const tmpDir = _getTmpDir();

  // fail early on missing tmp dir
  if (isBlank(opts.dir) && isBlank(tmpDir)) {
    throw new Error('No tmp dir specified');
  }

  /* istanbul ignore else */
  if (!isBlank(opts.name)) {
    return path.join(opts.dir || tmpDir, opts.name);
  }

  // mkstemps like template
  // opts.template has already been guarded in tmpName() below
  /* istanbul ignore else */
  if (opts.template) {
    var template = opts.template;
    // make sure that we prepend the tmp path if none was given
    /* istanbul ignore else */
    if (path.basename(template) === template)
      template = path.join(opts.dir || tmpDir, template);
    return template.replace(TEMPLATE_PATTERN, _randomChars(6));
  }

  // prefix and postfix
  const name = [
    (isBlank(opts.prefix) ? 'tmp-' : opts.prefix),
    process.pid,
    _randomChars(12),
    (opts.postfix ? opts.postfix : '')
  ].join('');

  return path.join(opts.dir || tmpDir, name);
}

/**
 * Gets a temporary file name.
 *
 * @param {(Options|tmpNameCallback)} options options or callback
 * @param {?tmpNameCallback} callback the callback function
 */
function tmpName(options, callback) {
  var
    args = _parseArguments(options, callback),
    opts = args[0],
    cb = args[1],
    tries = !isBlank(opts.name) ? 1 : opts.tries || DEFAULT_TRIES;

  /* istanbul ignore else */
  if (isNaN(tries) || tries < 0)
    return cb(new Error('Invalid tries'));

  /* istanbul ignore else */
  if (opts.template && !opts.template.match(TEMPLATE_PATTERN))
    return cb(new Error('Invalid template provided'));

  (function _getUniqueName() {
    try {
      const name = _generateTmpName(opts);

      // check whether the path exists then retry if needed
      fs.stat(name, function (err) {
        /* istanbul ignore else */
        if (!err) {
          /* istanbul ignore else */
          if (tries-- > 0) return _getUniqueName();

          return cb(new Error('Could not get a unique tmp filename, max tries reached ' + name));
        }

        cb(null, name);
      });
    } catch (err) {
      cb(err);
    }
  }());
}

/**
 * Synchronous version of tmpName.
 *
 * @param {Object} options
 * @returns {string} the generated random name
 * @throws {Error} if the options are invalid or could not generate a filename
 */
function tmpNameSync(options) {
  var
    args = _parseArguments(options),
    opts = args[0],
    tries = !isBlank(opts.name) ? 1 : opts.tries || DEFAULT_TRIES;

  /* istanbul ignore else */
  if (isNaN(tries) || tries < 0)
    throw new Error('Invalid tries');

  /* istanbul ignore else */
  if (opts.template && !opts.template.match(TEMPLATE_PATTERN))
    throw new Error('Invalid template provided');

  do {
    const name = _generateTmpName(opts);
    try {
      fs.statSync(name);
    } catch (e) {
      return name;
    }
  } while (tries-- > 0);

  throw new Error('Could not get a unique tmp filename, max tries reached');
}

/**
 * Creates and opens a temporary file.
 *
 * @param {(Options|fileCallback)} options the config options or the callback function
 * @param {?fileCallback} callback
 */
function file(options, callback) {
  var
    args = _parseArguments(options, callback),
    opts = args[0],
    cb = args[1];

  // gets a temporary filename
  tmpName(opts, function _tmpNameCreated(err, name) {
    /* istanbul ignore else */
    if (err) return cb(err);

    // create and open the file
    fs.open(name, CREATE_FLAGS, opts.mode || FILE_MODE, function _fileCreated(err, fd) {
      /* istanbul ignore else */
      if (err) return cb(err);

      if (opts.discardDescriptor) {
        return fs.close(fd, function _discardCallback(err) {
          /* istanbul ignore else */
          if (err) {
            // Low probability, and the file exists, so this could be
            // ignored.  If it isn't we certainly need to unlink the
            // file, and if that fails too its error is more
            // important.
            try {
              fs.unlinkSync(name);
            } catch (e) {
              if (!isENOENT(e)) {
                err = e;
              }
            }
            return cb(err);
          }
          cb(null, name, undefined, _prepareTmpFileRemoveCallback(name, -1, opts));
        });
      }
      /* istanbul ignore else */
      if (opts.detachDescriptor) {
        return cb(null, name, fd, _prepareTmpFileRemoveCallback(name, -1, opts));
      }
      cb(null, name, fd, _prepareTmpFileRemoveCallback(name, fd, opts));
    });
  });
}

/**
 * Synchronous version of file.
 *
 * @param {Options} options
 * @returns {FileSyncObject} object consists of name, fd and removeCallback
 * @throws {Error} if cannot create a file
 */
function fileSync(options) {
  var
    args = _parseArguments(options),
    opts = args[0];

  const discardOrDetachDescriptor = opts.discardDescriptor || opts.detachDescriptor;
  const name = tmpNameSync(opts);
  var fd = fs.openSync(name, CREATE_FLAGS, opts.mode || FILE_MODE);
  /* istanbul ignore else */
  if (opts.discardDescriptor) {
    fs.closeSync(fd);
    fd = undefined;
  }

  return {
    name: name,
    fd: fd,
    removeCallback: _prepareTmpFileRemoveCallback(name, discardOrDetachDescriptor ? -1 : fd, opts)
  };
}

/**
 * Creates a temporary directory.
 *
 * @param {(Options|dirCallback)} options the options or the callback function
 * @param {?dirCallback} callback
 */
function dir(options, callback) {
  var
    args = _parseArguments(options, callback),
    opts = args[0],
    cb = args[1];

  // gets a temporary filename
  tmpName(opts, function _tmpNameCreated(err, name) {
    /* istanbul ignore else */
    if (err) return cb(err);

    // create the directory
    fs.mkdir(name, opts.mode || DIR_MODE, function _dirCreated(err) {
      /* istanbul ignore else */
      if (err) return cb(err);

      cb(null, name, _prepareTmpDirRemoveCallback(name, opts));
    });
  });
}

/**
 * Synchronous version of dir.
 *
 * @param {Options} options
 * @returns {DirSyncObject} object consists of name and removeCallback
 * @throws {Error} if it cannot create a directory
 */
function dirSync(options) {
  var
    args = _parseArguments(options),
    opts = args[0];

  const name = tmpNameSync(opts);
  fs.mkdirSync(name, opts.mode || DIR_MODE);

  return {
    name: name,
    removeCallback: _prepareTmpDirRemoveCallback(name, opts)
  };
}

/**
 * Removes files asynchronously.
 *
 * @param {Object} fdPath
 * @param {Function} next
 * @private
 */
function _removeFileAsync(fdPath, next) {
  const _handler = function (err) {
    if (err && !isENOENT(err)) {
      // reraise any unanticipated error
      return next(err);
    }
    next();
  }

  if (0 <= fdPath[0])
    fs.close(fdPath[0], function (err) {
      fs.unlink(fdPath[1], _handler);
    });
  else fs.unlink(fdPath[1], _handler);
}

/**
 * Removes files synchronously.
 *
 * @param {Object} fdPath
 * @private
 */
function _removeFileSync(fdPath) {
  try {
    if (0 <= fdPath[0]) fs.closeSync(fdPath[0]);
  } catch (e) {
    // reraise any unanticipated error
    if (!isEBADF(e) && !isENOENT(e)) throw e;
  } finally {
    try {
      fs.unlinkSync(fdPath[1]);
    }
    catch (e) {
      // reraise any unanticipated error
      if (!isENOENT(e)) throw e;
    }
  }
}

/**
 * Prepares the callback for removal of the temporary file.
 *
 * @param {string} name the path of the file
 * @param {number} fd file descriptor
 * @param {Object} opts
 * @returns {fileCallback}
 * @private
 */
function _prepareTmpFileRemoveCallback(name, fd, opts) {
  const removeCallbackSync = _prepareRemoveCallback(_removeFileSync, [fd, name]);
  const removeCallback = _prepareRemoveCallback(_removeFileAsync, [fd, name], removeCallbackSync);

  if (!opts.keep) _removeObjects.unshift(removeCallbackSync);

  return removeCallback;
}

/**
 * Simple wrapper for rimraf.
 *
 * @param {string} dirPath
 * @param {Function} next
 * @private
 */
function _rimrafRemoveDirWrapper(dirPath, next) {
  rimraf(dirPath, next);
}

/**
 * Simple wrapper for rimraf.sync.
 *
 * @param {string} dirPath
 * @private
 */
function _rimrafRemoveDirSyncWrapper(dirPath, next) {
  try {
    return next(null, rimraf.sync(dirPath));
  } catch (err) {
    return next(err);
  }
}

/**
 * Prepares the callback for removal of the temporary directory.
 *
 * @param {string} name
 * @param {Object} opts
 * @returns {Function} the callback
 * @private
 */
function _prepareTmpDirRemoveCallback(name, opts) {
  const removeFunction = opts.unsafeCleanup ? _rimrafRemoveDirWrapper : fs.rmdir.bind(fs);
  const removeFunctionSync = opts.unsafeCleanup ? _rimrafRemoveDirSyncWrapper : fs.rmdirSync.bind(fs);
  const removeCallbackSync = _prepareRemoveCallback(removeFunctionSync, name);
  const removeCallback = _prepareRemoveCallback(removeFunction, name, removeCallbackSync);
  if (!opts.keep) _removeObjects.unshift(removeCallbackSync);

  return removeCallback;
}

/**
 * Creates a guarded function wrapping the removeFunction call.
 *
 * @param {Function} removeFunction
 * @param {Object} arg
 * @returns {Function}
 * @private
 */
function _prepareRemoveCallback(removeFunction, arg, cleanupCallbackSync) {
  var called = false;

  return function _cleanupCallback(next) {
    next = next || function () {};
    if (!called) {
      const toRemove = cleanupCallbackSync || _cleanupCallback;
      const index = _removeObjects.indexOf(toRemove);
      /* istanbul ignore else */
      if (index >= 0) _removeObjects.splice(index, 1);

      called = true;
      // sync?
      if (removeFunction.length === 1) {
        try {
          removeFunction(arg);
          return next(null);
        }
        catch (err) {
          // if no next is provided and since we are
          // in silent cleanup mode on process exit,
          // we will ignore the error
          return next(err);
        }
      } else return removeFunction(arg, next);
    } else return next(new Error('cleanup callback has already been called'));
  };
}

/**
 * The garbage collector.
 *
 * @private
 */
function _garbageCollector() {
  /* istanbul ignore else */
  if (!_gracefulCleanup) return;

  // the function being called removes itself from _removeObjects,
  // loop until _removeObjects is empty
  while (_removeObjects.length) {
    try {
      _removeObjects[0]();
    } catch (e) {
      // already removed?
    }
  }
}

/**
 * Helper for testing against EBADF to compensate changes made to Node 7.x under Windows.
 */
function isEBADF(error) {
  return isExpectedError(error, -EBADF, 'EBADF');
}

/**
 * Helper for testing against ENOENT to compensate changes made to Node 7.x under Windows.
 */
function isENOENT(error) {
  return isExpectedError(error, -ENOENT, 'ENOENT');
}

/**
 * Helper to determine whether the expected error code matches the actual code and errno,
 * which will differ between the supported node versions.
 *
 * - Node >= 7.0:
 *   error.code {string}
 *   error.errno {string|number} any numerical value will be negated
 *
 * - Node >= 6.0 < 7.0:
 *   error.code {string}
 *   error.errno {number} negated
 *
 * - Node >= 4.0 < 6.0: introduces SystemError
 *   error.code {string}
 *   error.errno {number} negated
 *
 * - Node >= 0.10 < 4.0:
 *   error.code {number} negated
 *   error.errno n/a
 */
function isExpectedError(error, code, errno) {
  return error.code === code || error.code === errno;
}

/**
 * Helper which determines whether a string s is blank, that is undefined, or empty or null.
 *
 * @private
 * @param {string} s
 * @returns {Boolean} true whether the string s is blank, false otherwise
 */
function isBlank(s) {
  return s === null || s === undefined || !s.trim();
}

/**
 * Sets the graceful cleanup.
 */
function setGracefulCleanup() {
  _gracefulCleanup = true;
}

/**
 * Returns the currently configured tmp dir from os.tmpdir().
 *
 * @private
 * @returns {string} the currently configured tmp dir
 */
function _getTmpDir() {
  return os.tmpdir();
}

/**
 * If there are multiple different versions of tmp in place, make sure that
 * we recognize the old listeners.
 *
 * @param {Function} listener
 * @private
 * @returns {Boolean} true whether listener is a legacy listener
 */
function _is_legacy_listener(listener) {
  return (listener.name === '_exit' || listener.name === '_uncaughtExceptionThrown')
    && listener.toString().indexOf('_garbageCollector();') > -1;
}

/**
 * Safely install SIGINT listener.
 *
 * NOTE: this will only work on OSX and Linux.
 *
 * @private
 */
function _safely_install_sigint_listener() {

  const listeners = process.listeners(SIGINT);
  const existingListeners = [];
  for (let i = 0, length = listeners.length; i < length; i++) {
    const lstnr = listeners[i];
    /* istanbul ignore else */
    if (lstnr.name === '_tmp$sigint_listener') {
      existingListeners.push(lstnr);
      process.removeListener(SIGINT, lstnr);
    }
  }
  process.on(SIGINT, function _tmp$sigint_listener(doExit) {
    for (let i = 0, length = existingListeners.length; i < length; i++) {
      // let the existing listener do the garbage collection (e.g. jest sandbox)
      try {
        existingListeners[i](false);
      } catch (err) {
        // ignore
      }
    }
    try {
      // force the garbage collector even it is called again in the exit listener
      _garbageCollector();
    } finally {
      if (!!doExit) {
        process.exit(0);
      }
    }
  });
}

/**
 * Safely install process exit listener.
 *
 * @private
 */
function _safely_install_exit_listener() {
  const listeners = process.listeners(EXIT);

  // collect any existing listeners
  const existingListeners = [];
  for (let i = 0, length = listeners.length; i < length; i++) {
    const lstnr = listeners[i];
    /* istanbul ignore else */
    // TODO: remove support for legacy listeners once release 1.0.0 is out
    if (lstnr.name === '_tmp$safe_listener' || _is_legacy_listener(lstnr)) {
      // we must forget about the uncaughtException listener, hopefully it is ours
      if (lstnr.name !== '_uncaughtExceptionThrown') {
        existingListeners.push(lstnr);
      }
      process.removeListener(EXIT, lstnr);
    }
  }
  // TODO: what was the data parameter good for?
  process.addListener(EXIT, function _tmp$safe_listener(data) {
    for (let i = 0, length = existingListeners.length; i < length; i++) {
      // let the existing listener do the garbage collection (e.g. jest sandbox)
      try {
        existingListeners[i](data);
      } catch (err) {
        // ignore
      }
    }
    _garbageCollector();
  });
}

_safely_install_exit_listener();
_safely_install_sigint_listener();

/**
 * Configuration options.
 *
 * @typedef {Object} Options
 * @property {?number} tries the number of tries before give up the name generation
 * @property {?string} template the "mkstemp" like filename template
 * @property {?string} name fix name
 * @property {?string} dir the tmp directory to use
 * @property {?string} prefix prefix for the generated name
 * @property {?string} postfix postfix for the generated name
 * @property {?boolean} unsafeCleanup recursively removes the created temporary directory, even when it's not empty
 */

/**
 * @typedef {Object} FileSyncObject
 * @property {string} name the name of the file
 * @property {string} fd the file descriptor
 * @property {fileCallback} removeCallback the callback function to remove the file
 */

/**
 * @typedef {Object} DirSyncObject
 * @property {string} name the name of the directory
 * @property {fileCallback} removeCallback the callback function to remove the directory
 */

/**
 * @callback tmpNameCallback
 * @param {?Error} err the error object if anything goes wrong
 * @param {string} name the temporary file name
 */

/**
 * @callback fileCallback
 * @param {?Error} err the error object if anything goes wrong
 * @param {string} name the temporary file name
 * @param {number} fd the file descriptor
 * @param {cleanupCallback} fn the cleanup callback function
 */

/**
 * @callback dirCallback
 * @param {?Error} err the error object if anything goes wrong
 * @param {string} name the temporary file name
 * @param {cleanupCallback} fn the cleanup callback function
 */

/**
 * Removes the temporary created file or directory.
 *
 * @callback cleanupCallback
 * @param {simpleCallback} [next] function to call after entry was removed
 */

/**
 * Callback function for function composition.
 * @see {@link https://github.com/raszi/node-tmp/issues/57|raszi/node-tmp#57}
 *
 * @callback simpleCallback
 */

// exporting all the needed methods

// evaluate os.tmpdir() lazily, mainly for simplifying testing but it also will
// allow users to reconfigure the temporary directory
Object.defineProperty(module.exports, 'tmpdir', {
  enumerable: true,
  configurable: false,
  get: function () {
    return _getTmpDir();
  }
});

module.exports.dir = dir;
module.exports.dirSync = dirSync;

module.exports.file = file;
module.exports.fileSync = fileSync;

module.exports.tmpName = tmpName;
module.exports.tmpNameSync = tmpNameSync;

module.exports.setGracefulCleanup = setGracefulCleanup;


/***/ }),
/* 60 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = rimraf
rimraf.sync = rimrafSync

var assert = __webpack_require__(13)
var path = __webpack_require__(16)
var fs = __webpack_require__(6)
var glob = undefined
try {
  glob = __webpack_require__(62)
} catch (_err) {
  // treat glob as optional.
}
var _0666 = parseInt('666', 8)

var defaultGlobOpts = {
  nosort: true,
  silent: true
}

// for EMFILE handling
var timeout = 0

var isWindows = (process.platform === "win32")

function defaults (options) {
  var methods = [
    'unlink',
    'chmod',
    'stat',
    'lstat',
    'rmdir',
    'readdir'
  ]
  methods.forEach(function(m) {
    options[m] = options[m] || fs[m]
    m = m + 'Sync'
    options[m] = options[m] || fs[m]
  })

  options.maxBusyTries = options.maxBusyTries || 3
  options.emfileWait = options.emfileWait || 1000
  if (options.glob === false) {
    options.disableGlob = true
  }
  if (options.disableGlob !== true && glob === undefined) {
    throw Error('glob dependency not found, set `options.disableGlob = true` if intentional')
  }
  options.disableGlob = options.disableGlob || false
  options.glob = options.glob || defaultGlobOpts
}

function rimraf (p, options, cb) {
  if (typeof options === 'function') {
    cb = options
    options = {}
  }

  assert(p, 'rimraf: missing path')
  assert.equal(typeof p, 'string', 'rimraf: path should be a string')
  assert.equal(typeof cb, 'function', 'rimraf: callback function required')
  assert(options, 'rimraf: invalid options argument provided')
  assert.equal(typeof options, 'object', 'rimraf: options should be object')

  defaults(options)

  var busyTries = 0
  var errState = null
  var n = 0

  if (options.disableGlob || !glob.hasMagic(p))
    return afterGlob(null, [p])

  options.lstat(p, function (er, stat) {
    if (!er)
      return afterGlob(null, [p])

    glob(p, options.glob, afterGlob)
  })

  function next (er) {
    errState = errState || er
    if (--n === 0)
      cb(errState)
  }

  function afterGlob (er, results) {
    if (er)
      return cb(er)

    n = results.length
    if (n === 0)
      return cb()

    results.forEach(function (p) {
      rimraf_(p, options, function CB (er) {
        if (er) {
          if ((er.code === "EBUSY" || er.code === "ENOTEMPTY" || er.code === "EPERM") &&
              busyTries < options.maxBusyTries) {
            busyTries ++
            var time = busyTries * 100
            // try again, with the same exact callback as this one.
            return setTimeout(function () {
              rimraf_(p, options, CB)
            }, time)
          }

          // this one won't happen if graceful-fs is used.
          if (er.code === "EMFILE" && timeout < options.emfileWait) {
            return setTimeout(function () {
              rimraf_(p, options, CB)
            }, timeout ++)
          }

          // already gone
          if (er.code === "ENOENT") er = null
        }

        timeout = 0
        next(er)
      })
    })
  }
}

// Two possible strategies.
// 1. Assume it's a file.  unlink it, then do the dir stuff on EPERM or EISDIR
// 2. Assume it's a directory.  readdir, then do the file stuff on ENOTDIR
//
// Both result in an extra syscall when you guess wrong.  However, there
// are likely far more normal files in the world than directories.  This
// is based on the assumption that a the average number of files per
// directory is >= 1.
//
// If anyone ever complains about this, then I guess the strategy could
// be made configurable somehow.  But until then, YAGNI.
function rimraf_ (p, options, cb) {
  assert(p)
  assert(options)
  assert(typeof cb === 'function')

  // sunos lets the root user unlink directories, which is... weird.
  // so we have to lstat here and make sure it's not a dir.
  options.lstat(p, function (er, st) {
    if (er && er.code === "ENOENT")
      return cb(null)

    // Windows can EPERM on stat.  Life is suffering.
    if (er && er.code === "EPERM" && isWindows)
      fixWinEPERM(p, options, er, cb)

    if (st && st.isDirectory())
      return rmdir(p, options, er, cb)

    options.unlink(p, function (er) {
      if (er) {
        if (er.code === "ENOENT")
          return cb(null)
        if (er.code === "EPERM")
          return (isWindows)
            ? fixWinEPERM(p, options, er, cb)
            : rmdir(p, options, er, cb)
        if (er.code === "EISDIR")
          return rmdir(p, options, er, cb)
      }
      return cb(er)
    })
  })
}

function fixWinEPERM (p, options, er, cb) {
  assert(p)
  assert(options)
  assert(typeof cb === 'function')
  if (er)
    assert(er instanceof Error)

  options.chmod(p, _0666, function (er2) {
    if (er2)
      cb(er2.code === "ENOENT" ? null : er)
    else
      options.stat(p, function(er3, stats) {
        if (er3)
          cb(er3.code === "ENOENT" ? null : er)
        else if (stats.isDirectory())
          rmdir(p, options, er, cb)
        else
          options.unlink(p, cb)
      })
  })
}

function fixWinEPERMSync (p, options, er) {
  assert(p)
  assert(options)
  if (er)
    assert(er instanceof Error)

  try {
    options.chmodSync(p, _0666)
  } catch (er2) {
    if (er2.code === "ENOENT")
      return
    else
      throw er
  }

  try {
    var stats = options.statSync(p)
  } catch (er3) {
    if (er3.code === "ENOENT")
      return
    else
      throw er
  }

  if (stats.isDirectory())
    rmdirSync(p, options, er)
  else
    options.unlinkSync(p)
}

function rmdir (p, options, originalEr, cb) {
  assert(p)
  assert(options)
  if (originalEr)
    assert(originalEr instanceof Error)
  assert(typeof cb === 'function')

  // try to rmdir first, and only readdir on ENOTEMPTY or EEXIST (SunOS)
  // if we guessed wrong, and it's not a directory, then
  // raise the original error.
  options.rmdir(p, function (er) {
    if (er && (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM"))
      rmkids(p, options, cb)
    else if (er && er.code === "ENOTDIR")
      cb(originalEr)
    else
      cb(er)
  })
}

function rmkids(p, options, cb) {
  assert(p)
  assert(options)
  assert(typeof cb === 'function')

  options.readdir(p, function (er, files) {
    if (er)
      return cb(er)
    var n = files.length
    if (n === 0)
      return options.rmdir(p, cb)
    var errState
    files.forEach(function (f) {
      rimraf(path.join(p, f), options, function (er) {
        if (errState)
          return
        if (er)
          return cb(errState = er)
        if (--n === 0)
          options.rmdir(p, cb)
      })
    })
  })
}

// this looks simpler, and is strictly *faster*, but will
// tie up the JavaScript thread and fail on excessively
// deep directory trees.
function rimrafSync (p, options) {
  options = options || {}
  defaults(options)

  assert(p, 'rimraf: missing path')
  assert.equal(typeof p, 'string', 'rimraf: path should be a string')
  assert(options, 'rimraf: missing options')
  assert.equal(typeof options, 'object', 'rimraf: options should be object')

  var results

  if (options.disableGlob || !glob.hasMagic(p)) {
    results = [p]
  } else {
    try {
      options.lstatSync(p)
      results = [p]
    } catch (er) {
      results = glob.sync(p, options.glob)
    }
  }

  if (!results.length)
    return

  for (var i = 0; i < results.length; i++) {
    var p = results[i]

    try {
      var st = options.lstatSync(p)
    } catch (er) {
      if (er.code === "ENOENT")
        return

      // Windows can EPERM on stat.  Life is suffering.
      if (er.code === "EPERM" && isWindows)
        fixWinEPERMSync(p, options, er)
    }

    try {
      // sunos lets the root user unlink directories, which is... weird.
      if (st && st.isDirectory())
        rmdirSync(p, options, null)
      else
        options.unlinkSync(p)
    } catch (er) {
      if (er.code === "ENOENT")
        return
      if (er.code === "EPERM")
        return isWindows ? fixWinEPERMSync(p, options, er) : rmdirSync(p, options, er)
      if (er.code !== "EISDIR")
        throw er

      rmdirSync(p, options, er)
    }
  }
}

function rmdirSync (p, options, originalEr) {
  assert(p)
  assert(options)
  if (originalEr)
    assert(originalEr instanceof Error)

  try {
    options.rmdirSync(p)
  } catch (er) {
    if (er.code === "ENOENT")
      return
    if (er.code === "ENOTDIR")
      throw originalEr
    if (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM")
      rmkidsSync(p, options)
  }
}

function rmkidsSync (p, options) {
  assert(p)
  assert(options)
  options.readdirSync(p).forEach(function (f) {
    rimrafSync(path.join(p, f), options)
  })

  // We only end up here once we got ENOTEMPTY at least once, and
  // at this point, we are guaranteed to have removed all the kids.
  // So, we know that it won't be ENOENT or ENOTDIR or anything else.
  // try really hard to delete stuff on windows, because it has a
  // PROFOUNDLY annoying habit of not closing handles promptly when
  // files are deleted, resulting in spurious ENOTEMPTY errors.
  var retries = isWindows ? 100 : 1
  var i = 0
  do {
    var threw = true
    try {
      var ret = options.rmdirSync(p, options)
      threw = false
      return ret
    } finally {
      if (++i < retries && threw)
        continue
    }
  } while (true)
}


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

// Approach:
//
// 1. Get the minimatch set
// 2. For each pattern in the set, PROCESS(pattern, false)
// 3. Store matches per-set, then uniq them
//
// PROCESS(pattern, inGlobStar)
// Get the first [n] items from pattern that are all strings
// Join these together.  This is PREFIX.
//   If there is no more remaining, then stat(PREFIX) and
//   add to matches if it succeeds.  END.
//
// If inGlobStar and PREFIX is symlink and points to dir
//   set ENTRIES = []
// else readdir(PREFIX) as ENTRIES
//   If fail, END
//
// with ENTRIES
//   If pattern[n] is GLOBSTAR
//     // handle the case where the globstar match is empty
//     // by pruning it out, and testing the resulting pattern
//     PROCESS(pattern[0..n] + pattern[n+1 .. $], false)
//     // handle other cases.
//     for ENTRY in ENTRIES (not dotfiles)
//       // attach globstar + tail onto the entry
//       // Mark that this entry is a globstar match
//       PROCESS(pattern[0..n] + ENTRY + pattern[n .. $], true)
//
//   else // not globstar
//     for ENTRY in ENTRIES (not dotfiles, unless pattern[n] is dot)
//       Test ENTRY against pattern[n]
//       If fails, continue
//       If passes, PROCESS(pattern[0..n] + item + pattern[n+1 .. $])
//
// Caveat:
//   Cache all stats and readdirs results to minimize syscall.  Since all
//   we ever care about is existence and directory-ness, we can just keep
//   `true` for files, and [children,...] for directories, or `false` for
//   things that don't exist.

module.exports = glob

var fs = __webpack_require__(6)
var rp = __webpack_require__(63)
var minimatch = __webpack_require__(65)
var Minimatch = minimatch.Minimatch
var inherits = __webpack_require__(69)
var EE = __webpack_require__(71).EventEmitter
var path = __webpack_require__(16)
var assert = __webpack_require__(13)
var isAbsolute = __webpack_require__(72)
var globSync = __webpack_require__(73)
var common = __webpack_require__(74)
var alphasort = common.alphasort
var alphasorti = common.alphasorti
var setopts = common.setopts
var ownProp = common.ownProp
var inflight = __webpack_require__(75)
var util = __webpack_require__(12)
var childrenIgnored = common.childrenIgnored
var isIgnored = common.isIgnored

var once = __webpack_require__(77)

function glob (pattern, options, cb) {
  if (typeof options === 'function') cb = options, options = {}
  if (!options) options = {}

  if (options.sync) {
    if (cb)
      throw new TypeError('callback provided to sync glob')
    return globSync(pattern, options)
  }

  return new Glob(pattern, options, cb)
}

glob.sync = globSync
var GlobSync = glob.GlobSync = globSync.GlobSync

// old api surface
glob.glob = glob

function extend (origin, add) {
  if (add === null || typeof add !== 'object') {
    return origin
  }

  var keys = Object.keys(add)
  var i = keys.length
  while (i--) {
    origin[keys[i]] = add[keys[i]]
  }
  return origin
}

glob.hasMagic = function (pattern, options_) {
  var options = extend({}, options_)
  options.noprocess = true

  var g = new Glob(pattern, options)
  var set = g.minimatch.set

  if (!pattern)
    return false

  if (set.length > 1)
    return true

  for (var j = 0; j < set[0].length; j++) {
    if (typeof set[0][j] !== 'string')
      return true
  }

  return false
}

glob.Glob = Glob
inherits(Glob, EE)
function Glob (pattern, options, cb) {
  if (typeof options === 'function') {
    cb = options
    options = null
  }

  if (options && options.sync) {
    if (cb)
      throw new TypeError('callback provided to sync glob')
    return new GlobSync(pattern, options)
  }

  if (!(this instanceof Glob))
    return new Glob(pattern, options, cb)

  setopts(this, pattern, options)
  this._didRealPath = false

  // process each pattern in the minimatch set
  var n = this.minimatch.set.length

  // The matches are stored as {<filename>: true,...} so that
  // duplicates are automagically pruned.
  // Later, we do an Object.keys() on these.
  // Keep them as a list so we can fill in when nonull is set.
  this.matches = new Array(n)

  if (typeof cb === 'function') {
    cb = once(cb)
    this.on('error', cb)
    this.on('end', function (matches) {
      cb(null, matches)
    })
  }

  var self = this
  this._processing = 0

  this._emitQueue = []
  this._processQueue = []
  this.paused = false

  if (this.noprocess)
    return this

  if (n === 0)
    return done()

  var sync = true
  for (var i = 0; i < n; i ++) {
    this._process(this.minimatch.set[i], i, false, done)
  }
  sync = false

  function done () {
    --self._processing
    if (self._processing <= 0) {
      if (sync) {
        process.nextTick(function () {
          self._finish()
        })
      } else {
        self._finish()
      }
    }
  }
}

Glob.prototype._finish = function () {
  assert(this instanceof Glob)
  if (this.aborted)
    return

  if (this.realpath && !this._didRealpath)
    return this._realpath()

  common.finish(this)
  this.emit('end', this.found)
}

Glob.prototype._realpath = function () {
  if (this._didRealpath)
    return

  this._didRealpath = true

  var n = this.matches.length
  if (n === 0)
    return this._finish()

  var self = this
  for (var i = 0; i < this.matches.length; i++)
    this._realpathSet(i, next)

  function next () {
    if (--n === 0)
      self._finish()
  }
}

Glob.prototype._realpathSet = function (index, cb) {
  var matchset = this.matches[index]
  if (!matchset)
    return cb()

  var found = Object.keys(matchset)
  var self = this
  var n = found.length

  if (n === 0)
    return cb()

  var set = this.matches[index] = Object.create(null)
  found.forEach(function (p, i) {
    // If there's a problem with the stat, then it means that
    // one or more of the links in the realpath couldn't be
    // resolved.  just return the abs value in that case.
    p = self._makeAbs(p)
    rp.realpath(p, self.realpathCache, function (er, real) {
      if (!er)
        set[real] = true
      else if (er.syscall === 'stat')
        set[p] = true
      else
        self.emit('error', er) // srsly wtf right here

      if (--n === 0) {
        self.matches[index] = set
        cb()
      }
    })
  })
}

Glob.prototype._mark = function (p) {
  return common.mark(this, p)
}

Glob.prototype._makeAbs = function (f) {
  return common.makeAbs(this, f)
}

Glob.prototype.abort = function () {
  this.aborted = true
  this.emit('abort')
}

Glob.prototype.pause = function () {
  if (!this.paused) {
    this.paused = true
    this.emit('pause')
  }
}

Glob.prototype.resume = function () {
  if (this.paused) {
    this.emit('resume')
    this.paused = false
    if (this._emitQueue.length) {
      var eq = this._emitQueue.slice(0)
      this._emitQueue.length = 0
      for (var i = 0; i < eq.length; i ++) {
        var e = eq[i]
        this._emitMatch(e[0], e[1])
      }
    }
    if (this._processQueue.length) {
      var pq = this._processQueue.slice(0)
      this._processQueue.length = 0
      for (var i = 0; i < pq.length; i ++) {
        var p = pq[i]
        this._processing--
        this._process(p[0], p[1], p[2], p[3])
      }
    }
  }
}

Glob.prototype._process = function (pattern, index, inGlobStar, cb) {
  assert(this instanceof Glob)
  assert(typeof cb === 'function')

  if (this.aborted)
    return

  this._processing++
  if (this.paused) {
    this._processQueue.push([pattern, index, inGlobStar, cb])
    return
  }

  //console.error('PROCESS %d', this._processing, pattern)

  // Get the first [n] parts of pattern that are all strings.
  var n = 0
  while (typeof pattern[n] === 'string') {
    n ++
  }
  // now n is the index of the first one that is *not* a string.

  // see if there's anything else
  var prefix
  switch (n) {
    // if not, then this is rather simple
    case pattern.length:
      this._processSimple(pattern.join('/'), index, cb)
      return

    case 0:
      // pattern *starts* with some non-trivial item.
      // going to readdir(cwd), but not include the prefix in matches.
      prefix = null
      break

    default:
      // pattern has some string bits in the front.
      // whatever it starts with, whether that's 'absolute' like /foo/bar,
      // or 'relative' like '../baz'
      prefix = pattern.slice(0, n).join('/')
      break
  }

  var remain = pattern.slice(n)

  // get the list of entries.
  var read
  if (prefix === null)
    read = '.'
  else if (isAbsolute(prefix) || isAbsolute(pattern.join('/'))) {
    if (!prefix || !isAbsolute(prefix))
      prefix = '/' + prefix
    read = prefix
  } else
    read = prefix

  var abs = this._makeAbs(read)

  //if ignored, skip _processing
  if (childrenIgnored(this, read))
    return cb()

  var isGlobStar = remain[0] === minimatch.GLOBSTAR
  if (isGlobStar)
    this._processGlobStar(prefix, read, abs, remain, index, inGlobStar, cb)
  else
    this._processReaddir(prefix, read, abs, remain, index, inGlobStar, cb)
}

Glob.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar, cb) {
  var self = this
  this._readdir(abs, inGlobStar, function (er, entries) {
    return self._processReaddir2(prefix, read, abs, remain, index, inGlobStar, entries, cb)
  })
}

Glob.prototype._processReaddir2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {

  // if the abs isn't a dir, then nothing can match!
  if (!entries)
    return cb()

  // It will only match dot entries if it starts with a dot, or if
  // dot is set.  Stuff like @(.foo|.bar) isn't allowed.
  var pn = remain[0]
  var negate = !!this.minimatch.negate
  var rawGlob = pn._glob
  var dotOk = this.dot || rawGlob.charAt(0) === '.'

  var matchedEntries = []
  for (var i = 0; i < entries.length; i++) {
    var e = entries[i]
    if (e.charAt(0) !== '.' || dotOk) {
      var m
      if (negate && !prefix) {
        m = !e.match(pn)
      } else {
        m = e.match(pn)
      }
      if (m)
        matchedEntries.push(e)
    }
  }

  //console.error('prd2', prefix, entries, remain[0]._glob, matchedEntries)

  var len = matchedEntries.length
  // If there are no matched entries, then nothing matches.
  if (len === 0)
    return cb()

  // if this is the last remaining pattern bit, then no need for
  // an additional stat *unless* the user has specified mark or
  // stat explicitly.  We know they exist, since readdir returned
  // them.

  if (remain.length === 1 && !this.mark && !this.stat) {
    if (!this.matches[index])
      this.matches[index] = Object.create(null)

    for (var i = 0; i < len; i ++) {
      var e = matchedEntries[i]
      if (prefix) {
        if (prefix !== '/')
          e = prefix + '/' + e
        else
          e = prefix + e
      }

      if (e.charAt(0) === '/' && !this.nomount) {
        e = path.join(this.root, e)
      }
      this._emitMatch(index, e)
    }
    // This was the last one, and no stats were needed
    return cb()
  }

  // now test all matched entries as stand-ins for that part
  // of the pattern.
  remain.shift()
  for (var i = 0; i < len; i ++) {
    var e = matchedEntries[i]
    var newPattern
    if (prefix) {
      if (prefix !== '/')
        e = prefix + '/' + e
      else
        e = prefix + e
    }
    this._process([e].concat(remain), index, inGlobStar, cb)
  }
  cb()
}

Glob.prototype._emitMatch = function (index, e) {
  if (this.aborted)
    return

  if (isIgnored(this, e))
    return

  if (this.paused) {
    this._emitQueue.push([index, e])
    return
  }

  var abs = isAbsolute(e) ? e : this._makeAbs(e)

  if (this.mark)
    e = this._mark(e)

  if (this.absolute)
    e = abs

  if (this.matches[index][e])
    return

  if (this.nodir) {
    var c = this.cache[abs]
    if (c === 'DIR' || Array.isArray(c))
      return
  }

  this.matches[index][e] = true

  var st = this.statCache[abs]
  if (st)
    this.emit('stat', e, st)

  this.emit('match', e)
}

Glob.prototype._readdirInGlobStar = function (abs, cb) {
  if (this.aborted)
    return

  // follow all symlinked directories forever
  // just proceed as if this is a non-globstar situation
  if (this.follow)
    return this._readdir(abs, false, cb)

  var lstatkey = 'lstat\0' + abs
  var self = this
  var lstatcb = inflight(lstatkey, lstatcb_)

  if (lstatcb)
    fs.lstat(abs, lstatcb)

  function lstatcb_ (er, lstat) {
    if (er && er.code === 'ENOENT')
      return cb()

    var isSym = lstat && lstat.isSymbolicLink()
    self.symlinks[abs] = isSym

    // If it's not a symlink or a dir, then it's definitely a regular file.
    // don't bother doing a readdir in that case.
    if (!isSym && lstat && !lstat.isDirectory()) {
      self.cache[abs] = 'FILE'
      cb()
    } else
      self._readdir(abs, false, cb)
  }
}

Glob.prototype._readdir = function (abs, inGlobStar, cb) {
  if (this.aborted)
    return

  cb = inflight('readdir\0'+abs+'\0'+inGlobStar, cb)
  if (!cb)
    return

  //console.error('RD %j %j', +inGlobStar, abs)
  if (inGlobStar && !ownProp(this.symlinks, abs))
    return this._readdirInGlobStar(abs, cb)

  if (ownProp(this.cache, abs)) {
    var c = this.cache[abs]
    if (!c || c === 'FILE')
      return cb()

    if (Array.isArray(c))
      return cb(null, c)
  }

  var self = this
  fs.readdir(abs, readdirCb(this, abs, cb))
}

function readdirCb (self, abs, cb) {
  return function (er, entries) {
    if (er)
      self._readdirError(abs, er, cb)
    else
      self._readdirEntries(abs, entries, cb)
  }
}

Glob.prototype._readdirEntries = function (abs, entries, cb) {
  if (this.aborted)
    return

  // if we haven't asked to stat everything, then just
  // assume that everything in there exists, so we can avoid
  // having to stat it a second time.
  if (!this.mark && !this.stat) {
    for (var i = 0; i < entries.length; i ++) {
      var e = entries[i]
      if (abs === '/')
        e = abs + e
      else
        e = abs + '/' + e
      this.cache[e] = true
    }
  }

  this.cache[abs] = entries
  return cb(null, entries)
}

Glob.prototype._readdirError = function (f, er, cb) {
  if (this.aborted)
    return

  // handle errors, and cache the information
  switch (er.code) {
    case 'ENOTSUP': // https://github.com/isaacs/node-glob/issues/205
    case 'ENOTDIR': // totally normal. means it *does* exist.
      var abs = this._makeAbs(f)
      this.cache[abs] = 'FILE'
      if (abs === this.cwdAbs) {
        var error = new Error(er.code + ' invalid cwd ' + this.cwd)
        error.path = this.cwd
        error.code = er.code
        this.emit('error', error)
        this.abort()
      }
      break

    case 'ENOENT': // not terribly unusual
    case 'ELOOP':
    case 'ENAMETOOLONG':
    case 'UNKNOWN':
      this.cache[this._makeAbs(f)] = false
      break

    default: // some unusual error.  Treat as failure.
      this.cache[this._makeAbs(f)] = false
      if (this.strict) {
        this.emit('error', er)
        // If the error is handled, then we abort
        // if not, we threw out of here
        this.abort()
      }
      if (!this.silent)
        console.error('glob error', er)
      break
  }

  return cb()
}

Glob.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar, cb) {
  var self = this
  this._readdir(abs, inGlobStar, function (er, entries) {
    self._processGlobStar2(prefix, read, abs, remain, index, inGlobStar, entries, cb)
  })
}


Glob.prototype._processGlobStar2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {
  //console.error('pgs2', prefix, remain[0], entries)

  // no entries means not a dir, so it can never have matches
  // foo.txt/** doesn't match foo.txt
  if (!entries)
    return cb()

  // test without the globstar, and with every child both below
  // and replacing the globstar.
  var remainWithoutGlobStar = remain.slice(1)
  var gspref = prefix ? [ prefix ] : []
  var noGlobStar = gspref.concat(remainWithoutGlobStar)

  // the noGlobStar pattern exits the inGlobStar state
  this._process(noGlobStar, index, false, cb)

  var isSym = this.symlinks[abs]
  var len = entries.length

  // If it's a symlink, and we're in a globstar, then stop
  if (isSym && inGlobStar)
    return cb()

  for (var i = 0; i < len; i++) {
    var e = entries[i]
    if (e.charAt(0) === '.' && !this.dot)
      continue

    // these two cases enter the inGlobStar state
    var instead = gspref.concat(entries[i], remainWithoutGlobStar)
    this._process(instead, index, true, cb)

    var below = gspref.concat(entries[i], remain)
    this._process(below, index, true, cb)
  }

  cb()
}

Glob.prototype._processSimple = function (prefix, index, cb) {
  // XXX review this.  Shouldn't it be doing the mounting etc
  // before doing stat?  kinda weird?
  var self = this
  this._stat(prefix, function (er, exists) {
    self._processSimple2(prefix, index, er, exists, cb)
  })
}
Glob.prototype._processSimple2 = function (prefix, index, er, exists, cb) {

  //console.error('ps2', prefix, exists)

  if (!this.matches[index])
    this.matches[index] = Object.create(null)

  // If it doesn't exist, then just mark the lack of results
  if (!exists)
    return cb()

  if (prefix && isAbsolute(prefix) && !this.nomount) {
    var trail = /[\/\\]$/.test(prefix)
    if (prefix.charAt(0) === '/') {
      prefix = path.join(this.root, prefix)
    } else {
      prefix = path.resolve(this.root, prefix)
      if (trail)
        prefix += '/'
    }
  }

  if (process.platform === 'win32')
    prefix = prefix.replace(/\\/g, '/')

  // Mark this as a match
  this._emitMatch(index, prefix)
  cb()
}

// Returns either 'DIR', 'FILE', or false
Glob.prototype._stat = function (f, cb) {
  var abs = this._makeAbs(f)
  var needDir = f.slice(-1) === '/'

  if (f.length > this.maxLength)
    return cb()

  if (!this.stat && ownProp(this.cache, abs)) {
    var c = this.cache[abs]

    if (Array.isArray(c))
      c = 'DIR'

    // It exists, but maybe not how we need it
    if (!needDir || c === 'DIR')
      return cb(null, c)

    if (needDir && c === 'FILE')
      return cb()

    // otherwise we have to stat, because maybe c=true
    // if we know it exists, but not what it is.
  }

  var exists
  var stat = this.statCache[abs]
  if (stat !== undefined) {
    if (stat === false)
      return cb(null, stat)
    else {
      var type = stat.isDirectory() ? 'DIR' : 'FILE'
      if (needDir && type === 'FILE')
        return cb()
      else
        return cb(null, type, stat)
    }
  }

  var self = this
  var statcb = inflight('stat\0' + abs, lstatcb_)
  if (statcb)
    fs.lstat(abs, statcb)

  function lstatcb_ (er, lstat) {
    if (lstat && lstat.isSymbolicLink()) {
      // If it's a symlink, then treat it as the target, unless
      // the target does not exist, then treat it as a file.
      return fs.stat(abs, function (er, stat) {
        if (er)
          self._stat2(f, abs, null, lstat, cb)
        else
          self._stat2(f, abs, er, stat, cb)
      })
    } else {
      self._stat2(f, abs, er, lstat, cb)
    }
  }
}

Glob.prototype._stat2 = function (f, abs, er, stat, cb) {
  if (er && (er.code === 'ENOENT' || er.code === 'ENOTDIR')) {
    this.statCache[abs] = false
    return cb()
  }

  var needDir = f.slice(-1) === '/'
  this.statCache[abs] = stat

  if (abs.slice(-1) === '/' && stat && !stat.isDirectory())
    return cb(null, false, stat)

  var c = true
  if (stat)
    c = stat.isDirectory() ? 'DIR' : 'FILE'
  this.cache[abs] = this.cache[abs] || c

  if (needDir && c === 'FILE')
    return cb()

  return cb(null, c, stat)
}


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = realpath
realpath.realpath = realpath
realpath.sync = realpathSync
realpath.realpathSync = realpathSync
realpath.monkeypatch = monkeypatch
realpath.unmonkeypatch = unmonkeypatch

var fs = __webpack_require__(6)
var origRealpath = fs.realpath
var origRealpathSync = fs.realpathSync

var version = process.version
var ok = /^v[0-5]\./.test(version)
var old = __webpack_require__(64)

function newError (er) {
  return er && er.syscall === 'realpath' && (
    er.code === 'ELOOP' ||
    er.code === 'ENOMEM' ||
    er.code === 'ENAMETOOLONG'
  )
}

function realpath (p, cache, cb) {
  if (ok) {
    return origRealpath(p, cache, cb)
  }

  if (typeof cache === 'function') {
    cb = cache
    cache = null
  }
  origRealpath(p, cache, function (er, result) {
    if (newError(er)) {
      old.realpath(p, cache, cb)
    } else {
      cb(er, result)
    }
  })
}

function realpathSync (p, cache) {
  if (ok) {
    return origRealpathSync(p, cache)
  }

  try {
    return origRealpathSync(p, cache)
  } catch (er) {
    if (newError(er)) {
      return old.realpathSync(p, cache)
    } else {
      throw er
    }
  }
}

function monkeypatch () {
  fs.realpath = realpath
  fs.realpathSync = realpathSync
}

function unmonkeypatch () {
  fs.realpath = origRealpath
  fs.realpathSync = origRealpathSync
}


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var pathModule = __webpack_require__(16);
var isWindows = process.platform === 'win32';
var fs = __webpack_require__(6);

// JavaScript implementation of realpath, ported from node pre-v6

var DEBUG = process.env.NODE_DEBUG && /fs/.test(process.env.NODE_DEBUG);

function rethrow() {
  // Only enable in debug mode. A backtrace uses ~1000 bytes of heap space and
  // is fairly slow to generate.
  var callback;
  if (DEBUG) {
    var backtrace = new Error;
    callback = debugCallback;
  } else
    callback = missingCallback;

  return callback;

  function debugCallback(err) {
    if (err) {
      backtrace.message = err.message;
      err = backtrace;
      missingCallback(err);
    }
  }

  function missingCallback(err) {
    if (err) {
      if (process.throwDeprecation)
        throw err;  // Forgot a callback but don't know where? Use NODE_DEBUG=fs
      else if (!process.noDeprecation) {
        var msg = 'fs: missing callback ' + (err.stack || err.message);
        if (process.traceDeprecation)
          console.trace(msg);
        else
          console.error(msg);
      }
    }
  }
}

function maybeCallback(cb) {
  return typeof cb === 'function' ? cb : rethrow();
}

var normalize = pathModule.normalize;

// Regexp that finds the next partion of a (partial) path
// result is [base_with_slash, base], e.g. ['somedir/', 'somedir']
if (isWindows) {
  var nextPartRe = /(.*?)(?:[\/\\]+|$)/g;
} else {
  var nextPartRe = /(.*?)(?:[\/]+|$)/g;
}

// Regex to find the device root, including trailing slash. E.g. 'c:\\'.
if (isWindows) {
  var splitRootRe = /^(?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?[\\\/]*/;
} else {
  var splitRootRe = /^[\/]*/;
}

exports.realpathSync = function realpathSync(p, cache) {
  // make p is absolute
  p = pathModule.resolve(p);

  if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
    return cache[p];
  }

  var original = p,
      seenLinks = {},
      knownHard = {};

  // current character position in p
  var pos;
  // the partial path so far, including a trailing slash if any
  var current;
  // the partial path without a trailing slash (except when pointing at a root)
  var base;
  // the partial path scanned in the previous round, with slash
  var previous;

  start();

  function start() {
    // Skip over roots
    var m = splitRootRe.exec(p);
    pos = m[0].length;
    current = m[0];
    base = m[0];
    previous = '';

    // On windows, check that the root exists. On unix there is no need.
    if (isWindows && !knownHard[base]) {
      fs.lstatSync(base);
      knownHard[base] = true;
    }
  }

  // walk down the path, swapping out linked pathparts for their real
  // values
  // NB: p.length changes.
  while (pos < p.length) {
    // find the next part
    nextPartRe.lastIndex = pos;
    var result = nextPartRe.exec(p);
    previous = current;
    current += result[0];
    base = previous + result[1];
    pos = nextPartRe.lastIndex;

    // continue if not a symlink
    if (knownHard[base] || (cache && cache[base] === base)) {
      continue;
    }

    var resolvedLink;
    if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
      // some known symbolic link.  no need to stat again.
      resolvedLink = cache[base];
    } else {
      var stat = fs.lstatSync(base);
      if (!stat.isSymbolicLink()) {
        knownHard[base] = true;
        if (cache) cache[base] = base;
        continue;
      }

      // read the link if it wasn't read before
      // dev/ino always return 0 on windows, so skip the check.
      var linkTarget = null;
      if (!isWindows) {
        var id = stat.dev.toString(32) + ':' + stat.ino.toString(32);
        if (seenLinks.hasOwnProperty(id)) {
          linkTarget = seenLinks[id];
        }
      }
      if (linkTarget === null) {
        fs.statSync(base);
        linkTarget = fs.readlinkSync(base);
      }
      resolvedLink = pathModule.resolve(previous, linkTarget);
      // track this, if given a cache.
      if (cache) cache[base] = resolvedLink;
      if (!isWindows) seenLinks[id] = linkTarget;
    }

    // resolve the link, then start over
    p = pathModule.resolve(resolvedLink, p.slice(pos));
    start();
  }

  if (cache) cache[original] = p;

  return p;
};


exports.realpath = function realpath(p, cache, cb) {
  if (typeof cb !== 'function') {
    cb = maybeCallback(cache);
    cache = null;
  }

  // make p is absolute
  p = pathModule.resolve(p);

  if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
    return process.nextTick(cb.bind(null, null, cache[p]));
  }

  var original = p,
      seenLinks = {},
      knownHard = {};

  // current character position in p
  var pos;
  // the partial path so far, including a trailing slash if any
  var current;
  // the partial path without a trailing slash (except when pointing at a root)
  var base;
  // the partial path scanned in the previous round, with slash
  var previous;

  start();

  function start() {
    // Skip over roots
    var m = splitRootRe.exec(p);
    pos = m[0].length;
    current = m[0];
    base = m[0];
    previous = '';

    // On windows, check that the root exists. On unix there is no need.
    if (isWindows && !knownHard[base]) {
      fs.lstat(base, function(err) {
        if (err) return cb(err);
        knownHard[base] = true;
        LOOP();
      });
    } else {
      process.nextTick(LOOP);
    }
  }

  // walk down the path, swapping out linked pathparts for their real
  // values
  function LOOP() {
    // stop if scanned past end of path
    if (pos >= p.length) {
      if (cache) cache[original] = p;
      return cb(null, p);
    }

    // find the next part
    nextPartRe.lastIndex = pos;
    var result = nextPartRe.exec(p);
    previous = current;
    current += result[0];
    base = previous + result[1];
    pos = nextPartRe.lastIndex;

    // continue if not a symlink
    if (knownHard[base] || (cache && cache[base] === base)) {
      return process.nextTick(LOOP);
    }

    if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
      // known symbolic link.  no need to stat again.
      return gotResolvedLink(cache[base]);
    }

    return fs.lstat(base, gotStat);
  }

  function gotStat(err, stat) {
    if (err) return cb(err);

    // if not a symlink, skip to the next path part
    if (!stat.isSymbolicLink()) {
      knownHard[base] = true;
      if (cache) cache[base] = base;
      return process.nextTick(LOOP);
    }

    // stat & read the link if not read before
    // call gotTarget as soon as the link target is known
    // dev/ino always return 0 on windows, so skip the check.
    if (!isWindows) {
      var id = stat.dev.toString(32) + ':' + stat.ino.toString(32);
      if (seenLinks.hasOwnProperty(id)) {
        return gotTarget(null, seenLinks[id], base);
      }
    }
    fs.stat(base, function(err) {
      if (err) return cb(err);

      fs.readlink(base, function(err, target) {
        if (!isWindows) seenLinks[id] = target;
        gotTarget(err, target);
      });
    });
  }

  function gotTarget(err, target, base) {
    if (err) return cb(err);

    var resolvedLink = pathModule.resolve(previous, target);
    if (cache) cache[base] = resolvedLink;
    gotResolvedLink(resolvedLink);
  }

  function gotResolvedLink(resolvedLink) {
    // resolve the link, then start over
    p = pathModule.resolve(resolvedLink, p.slice(pos));
    start();
  }
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = minimatch
minimatch.Minimatch = Minimatch

var path = { sep: '/' }
try {
  path = __webpack_require__(16)
} catch (er) {}

var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {}
var expand = __webpack_require__(66)

var plTypes = {
  '!': { open: '(?:(?!(?:', close: '))[^/]*?)'},
  '?': { open: '(?:', close: ')?' },
  '+': { open: '(?:', close: ')+' },
  '*': { open: '(?:', close: ')*' },
  '@': { open: '(?:', close: ')' }
}

// any single thing other than /
// don't need to escape / when using new RegExp()
var qmark = '[^/]'

// * => any number of characters
var star = qmark + '*?'

// ** when dots are allowed.  Anything goes, except .. and .
// not (^ or / followed by one or two dots followed by $ or /),
// followed by anything, any number of times.
var twoStarDot = '(?:(?!(?:\\\/|^)(?:\\.{1,2})($|\\\/)).)*?'

// not a ^ or / followed by a dot,
// followed by anything, any number of times.
var twoStarNoDot = '(?:(?!(?:\\\/|^)\\.).)*?'

// characters that need to be escaped in RegExp.
var reSpecials = charSet('().*{}+?[]^$\\!')

// "abc" -> { a:true, b:true, c:true }
function charSet (s) {
  return s.split('').reduce(function (set, c) {
    set[c] = true
    return set
  }, {})
}

// normalizes slashes.
var slashSplit = /\/+/

minimatch.filter = filter
function filter (pattern, options) {
  options = options || {}
  return function (p, i, list) {
    return minimatch(p, pattern, options)
  }
}

function ext (a, b) {
  a = a || {}
  b = b || {}
  var t = {}
  Object.keys(b).forEach(function (k) {
    t[k] = b[k]
  })
  Object.keys(a).forEach(function (k) {
    t[k] = a[k]
  })
  return t
}

minimatch.defaults = function (def) {
  if (!def || !Object.keys(def).length) return minimatch

  var orig = minimatch

  var m = function minimatch (p, pattern, options) {
    return orig.minimatch(p, pattern, ext(def, options))
  }

  m.Minimatch = function Minimatch (pattern, options) {
    return new orig.Minimatch(pattern, ext(def, options))
  }

  return m
}

Minimatch.defaults = function (def) {
  if (!def || !Object.keys(def).length) return Minimatch
  return minimatch.defaults(def).Minimatch
}

function minimatch (p, pattern, options) {
  if (typeof pattern !== 'string') {
    throw new TypeError('glob pattern string required')
  }

  if (!options) options = {}

  // shortcut: comments match nothing.
  if (!options.nocomment && pattern.charAt(0) === '#') {
    return false
  }

  // "" only matches ""
  if (pattern.trim() === '') return p === ''

  return new Minimatch(pattern, options).match(p)
}

function Minimatch (pattern, options) {
  if (!(this instanceof Minimatch)) {
    return new Minimatch(pattern, options)
  }

  if (typeof pattern !== 'string') {
    throw new TypeError('glob pattern string required')
  }

  if (!options) options = {}
  pattern = pattern.trim()

  // windows support: need to use /, not \
  if (path.sep !== '/') {
    pattern = pattern.split(path.sep).join('/')
  }

  this.options = options
  this.set = []
  this.pattern = pattern
  this.regexp = null
  this.negate = false
  this.comment = false
  this.empty = false

  // make the set of regexps etc.
  this.make()
}

Minimatch.prototype.debug = function () {}

Minimatch.prototype.make = make
function make () {
  // don't do it more than once.
  if (this._made) return

  var pattern = this.pattern
  var options = this.options

  // empty patterns and comments match nothing.
  if (!options.nocomment && pattern.charAt(0) === '#') {
    this.comment = true
    return
  }
  if (!pattern) {
    this.empty = true
    return
  }

  // step 1: figure out negation, etc.
  this.parseNegate()

  // step 2: expand braces
  var set = this.globSet = this.braceExpand()

  if (options.debug) this.debug = console.error

  this.debug(this.pattern, set)

  // step 3: now we have a set, so turn each one into a series of path-portion
  // matching patterns.
  // These will be regexps, except in the case of "**", which is
  // set to the GLOBSTAR object for globstar behavior,
  // and will not contain any / characters
  set = this.globParts = set.map(function (s) {
    return s.split(slashSplit)
  })

  this.debug(this.pattern, set)

  // glob --> regexps
  set = set.map(function (s, si, set) {
    return s.map(this.parse, this)
  }, this)

  this.debug(this.pattern, set)

  // filter out everything that didn't compile properly.
  set = set.filter(function (s) {
    return s.indexOf(false) === -1
  })

  this.debug(this.pattern, set)

  this.set = set
}

Minimatch.prototype.parseNegate = parseNegate
function parseNegate () {
  var pattern = this.pattern
  var negate = false
  var options = this.options
  var negateOffset = 0

  if (options.nonegate) return

  for (var i = 0, l = pattern.length
    ; i < l && pattern.charAt(i) === '!'
    ; i++) {
    negate = !negate
    negateOffset++
  }

  if (negateOffset) this.pattern = pattern.substr(negateOffset)
  this.negate = negate
}

// Brace expansion:
// a{b,c}d -> abd acd
// a{b,}c -> abc ac
// a{0..3}d -> a0d a1d a2d a3d
// a{b,c{d,e}f}g -> abg acdfg acefg
// a{b,c}d{e,f}g -> abdeg acdeg abdeg abdfg
//
// Invalid sets are not expanded.
// a{2..}b -> a{2..}b
// a{b}c -> a{b}c
minimatch.braceExpand = function (pattern, options) {
  return braceExpand(pattern, options)
}

Minimatch.prototype.braceExpand = braceExpand

function braceExpand (pattern, options) {
  if (!options) {
    if (this instanceof Minimatch) {
      options = this.options
    } else {
      options = {}
    }
  }

  pattern = typeof pattern === 'undefined'
    ? this.pattern : pattern

  if (typeof pattern === 'undefined') {
    throw new TypeError('undefined pattern')
  }

  if (options.nobrace ||
    !pattern.match(/\{.*\}/)) {
    // shortcut. no need to expand.
    return [pattern]
  }

  return expand(pattern)
}

// parse a component of the expanded set.
// At this point, no pattern may contain "/" in it
// so we're going to return a 2d array, where each entry is the full
// pattern, split on '/', and then turned into a regular expression.
// A regexp is made at the end which joins each array with an
// escaped /, and another full one which joins each regexp with |.
//
// Following the lead of Bash 4.1, note that "**" only has special meaning
// when it is the *only* thing in a path portion.  Otherwise, any series
// of * is equivalent to a single *.  Globstar behavior is enabled by
// default, and can be disabled by setting options.noglobstar.
Minimatch.prototype.parse = parse
var SUBPARSE = {}
function parse (pattern, isSub) {
  if (pattern.length > 1024 * 64) {
    throw new TypeError('pattern is too long')
  }

  var options = this.options

  // shortcuts
  if (!options.noglobstar && pattern === '**') return GLOBSTAR
  if (pattern === '') return ''

  var re = ''
  var hasMagic = !!options.nocase
  var escaping = false
  // ? => one single character
  var patternListStack = []
  var negativeLists = []
  var stateChar
  var inClass = false
  var reClassStart = -1
  var classStart = -1
  // . and .. never match anything that doesn't start with .,
  // even when options.dot is set.
  var patternStart = pattern.charAt(0) === '.' ? '' // anything
  // not (start or / followed by . or .. followed by / or end)
  : options.dot ? '(?!(?:^|\\\/)\\.{1,2}(?:$|\\\/))'
  : '(?!\\.)'
  var self = this

  function clearStateChar () {
    if (stateChar) {
      // we had some state-tracking character
      // that wasn't consumed by this pass.
      switch (stateChar) {
        case '*':
          re += star
          hasMagic = true
        break
        case '?':
          re += qmark
          hasMagic = true
        break
        default:
          re += '\\' + stateChar
        break
      }
      self.debug('clearStateChar %j %j', stateChar, re)
      stateChar = false
    }
  }

  for (var i = 0, len = pattern.length, c
    ; (i < len) && (c = pattern.charAt(i))
    ; i++) {
    this.debug('%s\t%s %s %j', pattern, i, re, c)

    // skip over any that are escaped.
    if (escaping && reSpecials[c]) {
      re += '\\' + c
      escaping = false
      continue
    }

    switch (c) {
      case '/':
        // completely not allowed, even escaped.
        // Should already be path-split by now.
        return false

      case '\\':
        clearStateChar()
        escaping = true
      continue

      // the various stateChar values
      // for the "extglob" stuff.
      case '?':
      case '*':
      case '+':
      case '@':
      case '!':
        this.debug('%s\t%s %s %j <-- stateChar', pattern, i, re, c)

        // all of those are literals inside a class, except that
        // the glob [!a] means [^a] in regexp
        if (inClass) {
          this.debug('  in class')
          if (c === '!' && i === classStart + 1) c = '^'
          re += c
          continue
        }

        // if we already have a stateChar, then it means
        // that there was something like ** or +? in there.
        // Handle the stateChar, then proceed with this one.
        self.debug('call clearStateChar %j', stateChar)
        clearStateChar()
        stateChar = c
        // if extglob is disabled, then +(asdf|foo) isn't a thing.
        // just clear the statechar *now*, rather than even diving into
        // the patternList stuff.
        if (options.noext) clearStateChar()
      continue

      case '(':
        if (inClass) {
          re += '('
          continue
        }

        if (!stateChar) {
          re += '\\('
          continue
        }

        patternListStack.push({
          type: stateChar,
          start: i - 1,
          reStart: re.length,
          open: plTypes[stateChar].open,
          close: plTypes[stateChar].close
        })
        // negation is (?:(?!js)[^/]*)
        re += stateChar === '!' ? '(?:(?!(?:' : '(?:'
        this.debug('plType %j %j', stateChar, re)
        stateChar = false
      continue

      case ')':
        if (inClass || !patternListStack.length) {
          re += '\\)'
          continue
        }

        clearStateChar()
        hasMagic = true
        var pl = patternListStack.pop()
        // negation is (?:(?!js)[^/]*)
        // The others are (?:<pattern>)<type>
        re += pl.close
        if (pl.type === '!') {
          negativeLists.push(pl)
        }
        pl.reEnd = re.length
      continue

      case '|':
        if (inClass || !patternListStack.length || escaping) {
          re += '\\|'
          escaping = false
          continue
        }

        clearStateChar()
        re += '|'
      continue

      // these are mostly the same in regexp and glob
      case '[':
        // swallow any state-tracking char before the [
        clearStateChar()

        if (inClass) {
          re += '\\' + c
          continue
        }

        inClass = true
        classStart = i
        reClassStart = re.length
        re += c
      continue

      case ']':
        //  a right bracket shall lose its special
        //  meaning and represent itself in
        //  a bracket expression if it occurs
        //  first in the list.  -- POSIX.2 2.8.3.2
        if (i === classStart + 1 || !inClass) {
          re += '\\' + c
          escaping = false
          continue
        }

        // handle the case where we left a class open.
        // "[z-a]" is valid, equivalent to "\[z-a\]"
        if (inClass) {
          // split where the last [ was, make sure we don't have
          // an invalid re. if so, re-walk the contents of the
          // would-be class to re-translate any characters that
          // were passed through as-is
          // TODO: It would probably be faster to determine this
          // without a try/catch and a new RegExp, but it's tricky
          // to do safely.  For now, this is safe and works.
          var cs = pattern.substring(classStart + 1, i)
          try {
            RegExp('[' + cs + ']')
          } catch (er) {
            // not a valid class!
            var sp = this.parse(cs, SUBPARSE)
            re = re.substr(0, reClassStart) + '\\[' + sp[0] + '\\]'
            hasMagic = hasMagic || sp[1]
            inClass = false
            continue
          }
        }

        // finish up the class.
        hasMagic = true
        inClass = false
        re += c
      continue

      default:
        // swallow any state char that wasn't consumed
        clearStateChar()

        if (escaping) {
          // no need
          escaping = false
        } else if (reSpecials[c]
          && !(c === '^' && inClass)) {
          re += '\\'
        }

        re += c

    } // switch
  } // for

  // handle the case where we left a class open.
  // "[abc" is valid, equivalent to "\[abc"
  if (inClass) {
    // split where the last [ was, and escape it
    // this is a huge pita.  We now have to re-walk
    // the contents of the would-be class to re-translate
    // any characters that were passed through as-is
    cs = pattern.substr(classStart + 1)
    sp = this.parse(cs, SUBPARSE)
    re = re.substr(0, reClassStart) + '\\[' + sp[0]
    hasMagic = hasMagic || sp[1]
  }

  // handle the case where we had a +( thing at the *end*
  // of the pattern.
  // each pattern list stack adds 3 chars, and we need to go through
  // and escape any | chars that were passed through as-is for the regexp.
  // Go through and escape them, taking care not to double-escape any
  // | chars that were already escaped.
  for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
    var tail = re.slice(pl.reStart + pl.open.length)
    this.debug('setting tail', re, pl)
    // maybe some even number of \, then maybe 1 \, followed by a |
    tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, function (_, $1, $2) {
      if (!$2) {
        // the | isn't already escaped, so escape it.
        $2 = '\\'
      }

      // need to escape all those slashes *again*, without escaping the
      // one that we need for escaping the | character.  As it works out,
      // escaping an even number of slashes can be done by simply repeating
      // it exactly after itself.  That's why this trick works.
      //
      // I am sorry that you have to see this.
      return $1 + $1 + $2 + '|'
    })

    this.debug('tail=%j\n   %s', tail, tail, pl, re)
    var t = pl.type === '*' ? star
      : pl.type === '?' ? qmark
      : '\\' + pl.type

    hasMagic = true
    re = re.slice(0, pl.reStart) + t + '\\(' + tail
  }

  // handle trailing things that only matter at the very end.
  clearStateChar()
  if (escaping) {
    // trailing \\
    re += '\\\\'
  }

  // only need to apply the nodot start if the re starts with
  // something that could conceivably capture a dot
  var addPatternStart = false
  switch (re.charAt(0)) {
    case '.':
    case '[':
    case '(': addPatternStart = true
  }

  // Hack to work around lack of negative lookbehind in JS
  // A pattern like: *.!(x).!(y|z) needs to ensure that a name
  // like 'a.xyz.yz' doesn't match.  So, the first negative
  // lookahead, has to look ALL the way ahead, to the end of
  // the pattern.
  for (var n = negativeLists.length - 1; n > -1; n--) {
    var nl = negativeLists[n]

    var nlBefore = re.slice(0, nl.reStart)
    var nlFirst = re.slice(nl.reStart, nl.reEnd - 8)
    var nlLast = re.slice(nl.reEnd - 8, nl.reEnd)
    var nlAfter = re.slice(nl.reEnd)

    nlLast += nlAfter

    // Handle nested stuff like *(*.js|!(*.json)), where open parens
    // mean that we should *not* include the ) in the bit that is considered
    // "after" the negated section.
    var openParensBefore = nlBefore.split('(').length - 1
    var cleanAfter = nlAfter
    for (i = 0; i < openParensBefore; i++) {
      cleanAfter = cleanAfter.replace(/\)[+*?]?/, '')
    }
    nlAfter = cleanAfter

    var dollar = ''
    if (nlAfter === '' && isSub !== SUBPARSE) {
      dollar = '$'
    }
    var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast
    re = newRe
  }

  // if the re is not "" at this point, then we need to make sure
  // it doesn't match against an empty path part.
  // Otherwise a/* will match a/, which it should not.
  if (re !== '' && hasMagic) {
    re = '(?=.)' + re
  }

  if (addPatternStart) {
    re = patternStart + re
  }

  // parsing just a piece of a larger pattern.
  if (isSub === SUBPARSE) {
    return [re, hasMagic]
  }

  // skip the regexp for non-magical patterns
  // unescape anything in it, though, so that it'll be
  // an exact match against a file etc.
  if (!hasMagic) {
    return globUnescape(pattern)
  }

  var flags = options.nocase ? 'i' : ''
  try {
    var regExp = new RegExp('^' + re + '$', flags)
  } catch (er) {
    // If it was an invalid regular expression, then it can't match
    // anything.  This trick looks for a character after the end of
    // the string, which is of course impossible, except in multi-line
    // mode, but it's not a /m regex.
    return new RegExp('$.')
  }

  regExp._glob = pattern
  regExp._src = re

  return regExp
}

minimatch.makeRe = function (pattern, options) {
  return new Minimatch(pattern, options || {}).makeRe()
}

Minimatch.prototype.makeRe = makeRe
function makeRe () {
  if (this.regexp || this.regexp === false) return this.regexp

  // at this point, this.set is a 2d array of partial
  // pattern strings, or "**".
  //
  // It's better to use .match().  This function shouldn't
  // be used, really, but it's pretty convenient sometimes,
  // when you just want to work with a regex.
  var set = this.set

  if (!set.length) {
    this.regexp = false
    return this.regexp
  }
  var options = this.options

  var twoStar = options.noglobstar ? star
    : options.dot ? twoStarDot
    : twoStarNoDot
  var flags = options.nocase ? 'i' : ''

  var re = set.map(function (pattern) {
    return pattern.map(function (p) {
      return (p === GLOBSTAR) ? twoStar
      : (typeof p === 'string') ? regExpEscape(p)
      : p._src
    }).join('\\\/')
  }).join('|')

  // must match entire pattern
  // ending in a * or ** will make it less strict.
  re = '^(?:' + re + ')$'

  // can match anything, as long as it's not this.
  if (this.negate) re = '^(?!' + re + ').*$'

  try {
    this.regexp = new RegExp(re, flags)
  } catch (ex) {
    this.regexp = false
  }
  return this.regexp
}

minimatch.match = function (list, pattern, options) {
  options = options || {}
  var mm = new Minimatch(pattern, options)
  list = list.filter(function (f) {
    return mm.match(f)
  })
  if (mm.options.nonull && !list.length) {
    list.push(pattern)
  }
  return list
}

Minimatch.prototype.match = match
function match (f, partial) {
  this.debug('match', f, this.pattern)
  // short-circuit in the case of busted things.
  // comments, etc.
  if (this.comment) return false
  if (this.empty) return f === ''

  if (f === '/' && partial) return true

  var options = this.options

  // windows: need to use /, not \
  if (path.sep !== '/') {
    f = f.split(path.sep).join('/')
  }

  // treat the test path as a set of pathparts.
  f = f.split(slashSplit)
  this.debug(this.pattern, 'split', f)

  // just ONE of the pattern sets in this.set needs to match
  // in order for it to be valid.  If negating, then just one
  // match means that we have failed.
  // Either way, return on the first hit.

  var set = this.set
  this.debug(this.pattern, 'set', set)

  // Find the basename of the path by looking for the last non-empty segment
  var filename
  var i
  for (i = f.length - 1; i >= 0; i--) {
    filename = f[i]
    if (filename) break
  }

  for (i = 0; i < set.length; i++) {
    var pattern = set[i]
    var file = f
    if (options.matchBase && pattern.length === 1) {
      file = [filename]
    }
    var hit = this.matchOne(file, pattern, partial)
    if (hit) {
      if (options.flipNegate) return true
      return !this.negate
    }
  }

  // didn't get any hits.  this is success if it's a negative
  // pattern, failure otherwise.
  if (options.flipNegate) return false
  return this.negate
}

// set partial to true to test if, for example,
// "/a/b" matches the start of "/*/b/*/d"
// Partial means, if you run out of file before you run
// out of pattern, then that's fine, as long as all
// the parts match.
Minimatch.prototype.matchOne = function (file, pattern, partial) {
  var options = this.options

  this.debug('matchOne',
    { 'this': this, file: file, pattern: pattern })

  this.debug('matchOne', file.length, pattern.length)

  for (var fi = 0,
      pi = 0,
      fl = file.length,
      pl = pattern.length
      ; (fi < fl) && (pi < pl)
      ; fi++, pi++) {
    this.debug('matchOne loop')
    var p = pattern[pi]
    var f = file[fi]

    this.debug(pattern, p, f)

    // should be impossible.
    // some invalid regexp stuff in the set.
    if (p === false) return false

    if (p === GLOBSTAR) {
      this.debug('GLOBSTAR', [pattern, p, f])

      // "**"
      // a/**/b/**/c would match the following:
      // a/b/x/y/z/c
      // a/x/y/z/b/c
      // a/b/x/b/x/c
      // a/b/c
      // To do this, take the rest of the pattern after
      // the **, and see if it would match the file remainder.
      // If so, return success.
      // If not, the ** "swallows" a segment, and try again.
      // This is recursively awful.
      //
      // a/**/b/**/c matching a/b/x/y/z/c
      // - a matches a
      // - doublestar
      //   - matchOne(b/x/y/z/c, b/**/c)
      //     - b matches b
      //     - doublestar
      //       - matchOne(x/y/z/c, c) -> no
      //       - matchOne(y/z/c, c) -> no
      //       - matchOne(z/c, c) -> no
      //       - matchOne(c, c) yes, hit
      var fr = fi
      var pr = pi + 1
      if (pr === pl) {
        this.debug('** at the end')
        // a ** at the end will just swallow the rest.
        // We have found a match.
        // however, it will not swallow /.x, unless
        // options.dot is set.
        // . and .. are *never* matched by **, for explosively
        // exponential reasons.
        for (; fi < fl; fi++) {
          if (file[fi] === '.' || file[fi] === '..' ||
            (!options.dot && file[fi].charAt(0) === '.')) return false
        }
        return true
      }

      // ok, let's see if we can swallow whatever we can.
      while (fr < fl) {
        var swallowee = file[fr]

        this.debug('\nglobstar while', file, fr, pattern, pr, swallowee)

        // XXX remove this slice.  Just pass the start index.
        if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
          this.debug('globstar found match!', fr, fl, swallowee)
          // found a match.
          return true
        } else {
          // can't swallow "." or ".." ever.
          // can only swallow ".foo" when explicitly asked.
          if (swallowee === '.' || swallowee === '..' ||
            (!options.dot && swallowee.charAt(0) === '.')) {
            this.debug('dot detected!', file, fr, pattern, pr)
            break
          }

          // ** swallows a segment, and continue.
          this.debug('globstar swallow a segment, and continue')
          fr++
        }
      }

      // no match was found.
      // However, in partial mode, we can't say this is necessarily over.
      // If there's more *pattern* left, then
      if (partial) {
        // ran out of file
        this.debug('\n>>> no match, partial?', file, fr, pattern, pr)
        if (fr === fl) return true
      }
      return false
    }

    // something other than **
    // non-magic patterns just have to match exactly
    // patterns with magic have been turned into regexps.
    var hit
    if (typeof p === 'string') {
      if (options.nocase) {
        hit = f.toLowerCase() === p.toLowerCase()
      } else {
        hit = f === p
      }
      this.debug('string match', p, f, hit)
    } else {
      hit = f.match(p)
      this.debug('pattern match', p, f, hit)
    }

    if (!hit) return false
  }

  // Note: ending in / means that we'll get a final ""
  // at the end of the pattern.  This can only match a
  // corresponding "" at the end of the file.
  // If the file ends in /, then it can only match a
  // a pattern that ends in /, unless the pattern just
  // doesn't have any more for it. But, a/b/ should *not*
  // match "a/b/*", even though "" matches against the
  // [^/]*? pattern, except in partial mode, where it might
  // simply not be reached yet.
  // However, a/b/ should still satisfy a/*

  // now either we fell off the end of the pattern, or we're done.
  if (fi === fl && pi === pl) {
    // ran out of pattern and filename at the same time.
    // an exact hit!
    return true
  } else if (fi === fl) {
    // ran out of file, but still had pattern left.
    // this is ok if we're doing the match as part of
    // a glob fs traversal.
    return partial
  } else if (pi === pl) {
    // ran out of pattern, still have file left.
    // this is only acceptable if we're on the very last
    // empty segment of a file with a trailing slash.
    // a/* should match a/b/
    var emptyFileEnd = (fi === fl - 1) && (file[fi] === '')
    return emptyFileEnd
  }

  // should be unreachable.
  throw new Error('wtf?')
}

// replace stuff like \* with *
function globUnescape (s) {
  return s.replace(/\\(.)/g, '$1')
}

function regExpEscape (s) {
  return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var concatMap = __webpack_require__(67);
var balanced = __webpack_require__(68);

module.exports = expandTop;

var escSlash = '\0SLASH'+Math.random()+'\0';
var escOpen = '\0OPEN'+Math.random()+'\0';
var escClose = '\0CLOSE'+Math.random()+'\0';
var escComma = '\0COMMA'+Math.random()+'\0';
var escPeriod = '\0PERIOD'+Math.random()+'\0';

function numeric(str) {
  return parseInt(str, 10) == str
    ? parseInt(str, 10)
    : str.charCodeAt(0);
}

function escapeBraces(str) {
  return str.split('\\\\').join(escSlash)
            .split('\\{').join(escOpen)
            .split('\\}').join(escClose)
            .split('\\,').join(escComma)
            .split('\\.').join(escPeriod);
}

function unescapeBraces(str) {
  return str.split(escSlash).join('\\')
            .split(escOpen).join('{')
            .split(escClose).join('}')
            .split(escComma).join(',')
            .split(escPeriod).join('.');
}


// Basically just str.split(","), but handling cases
// where we have nested braced sections, which should be
// treated as individual members, like {a,{b,c},d}
function parseCommaParts(str) {
  if (!str)
    return [''];

  var parts = [];
  var m = balanced('{', '}', str);

  if (!m)
    return str.split(',');

  var pre = m.pre;
  var body = m.body;
  var post = m.post;
  var p = pre.split(',');

  p[p.length-1] += '{' + body + '}';
  var postParts = parseCommaParts(post);
  if (post.length) {
    p[p.length-1] += postParts.shift();
    p.push.apply(p, postParts);
  }

  parts.push.apply(parts, p);

  return parts;
}

function expandTop(str) {
  if (!str)
    return [];

  // I don't know why Bash 4.3 does this, but it does.
  // Anything starting with {} will have the first two bytes preserved
  // but *only* at the top level, so {},a}b will not expand to anything,
  // but a{},b}c will be expanded to [a}c,abc].
  // One could argue that this is a bug in Bash, but since the goal of
  // this module is to match Bash's rules, we escape a leading {}
  if (str.substr(0, 2) === '{}') {
    str = '\\{\\}' + str.substr(2);
  }

  return expand(escapeBraces(str), true).map(unescapeBraces);
}

function identity(e) {
  return e;
}

function embrace(str) {
  return '{' + str + '}';
}
function isPadded(el) {
  return /^-?0\d/.test(el);
}

function lte(i, y) {
  return i <= y;
}
function gte(i, y) {
  return i >= y;
}

function expand(str, isTop) {
  var expansions = [];

  var m = balanced('{', '}', str);
  if (!m || /\$$/.test(m.pre)) return [str];

  var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
  var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
  var isSequence = isNumericSequence || isAlphaSequence;
  var isOptions = m.body.indexOf(',') >= 0;
  if (!isSequence && !isOptions) {
    // {a},b}
    if (m.post.match(/,.*\}/)) {
      str = m.pre + '{' + m.body + escClose + m.post;
      return expand(str);
    }
    return [str];
  }

  var n;
  if (isSequence) {
    n = m.body.split(/\.\./);
  } else {
    n = parseCommaParts(m.body);
    if (n.length === 1) {
      // x{{a,b}}y ==> x{a}y x{b}y
      n = expand(n[0], false).map(embrace);
      if (n.length === 1) {
        var post = m.post.length
          ? expand(m.post, false)
          : [''];
        return post.map(function(p) {
          return m.pre + n[0] + p;
        });
      }
    }
  }

  // at this point, n is the parts, and we know it's not a comma set
  // with a single entry.

  // no need to expand pre, since it is guaranteed to be free of brace-sets
  var pre = m.pre;
  var post = m.post.length
    ? expand(m.post, false)
    : [''];

  var N;

  if (isSequence) {
    var x = numeric(n[0]);
    var y = numeric(n[1]);
    var width = Math.max(n[0].length, n[1].length)
    var incr = n.length == 3
      ? Math.abs(numeric(n[2]))
      : 1;
    var test = lte;
    var reverse = y < x;
    if (reverse) {
      incr *= -1;
      test = gte;
    }
    var pad = n.some(isPadded);

    N = [];

    for (var i = x; test(i, y); i += incr) {
      var c;
      if (isAlphaSequence) {
        c = String.fromCharCode(i);
        if (c === '\\')
          c = '';
      } else {
        c = String(i);
        if (pad) {
          var need = width - c.length;
          if (need > 0) {
            var z = new Array(need + 1).join('0');
            if (i < 0)
              c = '-' + z + c.slice(1);
            else
              c = z + c;
          }
        }
      }
      N.push(c);
    }
  } else {
    N = concatMap(n, function(el) { return expand(el, false) });
  }

  for (var j = 0; j < N.length; j++) {
    for (var k = 0; k < post.length; k++) {
      var expansion = pre + N[j] + post[k];
      if (!isTop || isSequence || expansion)
        expansions.push(expansion);
    }
  }

  return expansions;
}



/***/ }),
/* 67 */
/***/ (function(module, exports) {

module.exports = function (xs, fn) {
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        var x = fn(xs[i], i);
        if (isArray(x)) res.push.apply(res, x);
        else res.push(x);
    }
    return res;
};

var isArray = Array.isArray || function (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = balanced;
function balanced(a, b, str) {
  if (a instanceof RegExp) a = maybeMatch(a, str);
  if (b instanceof RegExp) b = maybeMatch(b, str);

  var r = range(a, b, str);

  return r && {
    start: r[0],
    end: r[1],
    pre: str.slice(0, r[0]),
    body: str.slice(r[0] + a.length, r[1]),
    post: str.slice(r[1] + b.length)
  };
}

function maybeMatch(reg, str) {
  var m = str.match(reg);
  return m ? m[0] : null;
}

balanced.range = range;
function range(a, b, str) {
  var begs, beg, left, right, result;
  var ai = str.indexOf(a);
  var bi = str.indexOf(b, ai + 1);
  var i = ai;

  if (ai >= 0 && bi > 0) {
    begs = [];
    left = str.length;

    while (i >= 0 && !result) {
      if (i == ai) {
        begs.push(i);
        ai = str.indexOf(a, i + 1);
      } else if (begs.length == 1) {
        result = [ begs.pop(), bi ];
      } else {
        beg = begs.pop();
        if (beg < left) {
          left = beg;
          right = bi;
        }

        bi = str.indexOf(b, i + 1);
      }

      i = ai < bi && ai >= 0 ? ai : bi;
    }

    if (begs.length) {
      result = [ left, right ];
    }
  }

  return result;
}


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

try {
  var util = __webpack_require__(12);
  /* istanbul ignore next */
  if (typeof util.inherits !== 'function') throw '';
  module.exports = util.inherits;
} catch (e) {
  /* istanbul ignore next */
  module.exports = __webpack_require__(70);
}


/***/ }),
/* 70 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}


/***/ }),
/* 71 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function posix(path) {
	return path.charAt(0) === '/';
}

function win32(path) {
	// https://github.com/nodejs/node/blob/b3fcc245fb25539909ef1d5eaa01dbf92e168633/lib/path.js#L56
	var splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
	var result = splitDeviceRe.exec(path);
	var device = result[1] || '';
	var isUnc = Boolean(device && device.charAt(1) !== ':');

	// UNC paths are always absolute
	return Boolean(result[2] || isUnc);
}

module.exports = process.platform === 'win32' ? win32 : posix;
module.exports.posix = posix;
module.exports.win32 = win32;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = globSync
globSync.GlobSync = GlobSync

var fs = __webpack_require__(6)
var rp = __webpack_require__(63)
var minimatch = __webpack_require__(65)
var Minimatch = minimatch.Minimatch
var Glob = __webpack_require__(62).Glob
var util = __webpack_require__(12)
var path = __webpack_require__(16)
var assert = __webpack_require__(13)
var isAbsolute = __webpack_require__(72)
var common = __webpack_require__(74)
var alphasort = common.alphasort
var alphasorti = common.alphasorti
var setopts = common.setopts
var ownProp = common.ownProp
var childrenIgnored = common.childrenIgnored
var isIgnored = common.isIgnored

function globSync (pattern, options) {
  if (typeof options === 'function' || arguments.length === 3)
    throw new TypeError('callback provided to sync glob\n'+
                        'See: https://github.com/isaacs/node-glob/issues/167')

  return new GlobSync(pattern, options).found
}

function GlobSync (pattern, options) {
  if (!pattern)
    throw new Error('must provide pattern')

  if (typeof options === 'function' || arguments.length === 3)
    throw new TypeError('callback provided to sync glob\n'+
                        'See: https://github.com/isaacs/node-glob/issues/167')

  if (!(this instanceof GlobSync))
    return new GlobSync(pattern, options)

  setopts(this, pattern, options)

  if (this.noprocess)
    return this

  var n = this.minimatch.set.length
  this.matches = new Array(n)
  for (var i = 0; i < n; i ++) {
    this._process(this.minimatch.set[i], i, false)
  }
  this._finish()
}

GlobSync.prototype._finish = function () {
  assert(this instanceof GlobSync)
  if (this.realpath) {
    var self = this
    this.matches.forEach(function (matchset, index) {
      var set = self.matches[index] = Object.create(null)
      for (var p in matchset) {
        try {
          p = self._makeAbs(p)
          var real = rp.realpathSync(p, self.realpathCache)
          set[real] = true
        } catch (er) {
          if (er.syscall === 'stat')
            set[self._makeAbs(p)] = true
          else
            throw er
        }
      }
    })
  }
  common.finish(this)
}


GlobSync.prototype._process = function (pattern, index, inGlobStar) {
  assert(this instanceof GlobSync)

  // Get the first [n] parts of pattern that are all strings.
  var n = 0
  while (typeof pattern[n] === 'string') {
    n ++
  }
  // now n is the index of the first one that is *not* a string.

  // See if there's anything else
  var prefix
  switch (n) {
    // if not, then this is rather simple
    case pattern.length:
      this._processSimple(pattern.join('/'), index)
      return

    case 0:
      // pattern *starts* with some non-trivial item.
      // going to readdir(cwd), but not include the prefix in matches.
      prefix = null
      break

    default:
      // pattern has some string bits in the front.
      // whatever it starts with, whether that's 'absolute' like /foo/bar,
      // or 'relative' like '../baz'
      prefix = pattern.slice(0, n).join('/')
      break
  }

  var remain = pattern.slice(n)

  // get the list of entries.
  var read
  if (prefix === null)
    read = '.'
  else if (isAbsolute(prefix) || isAbsolute(pattern.join('/'))) {
    if (!prefix || !isAbsolute(prefix))
      prefix = '/' + prefix
    read = prefix
  } else
    read = prefix

  var abs = this._makeAbs(read)

  //if ignored, skip processing
  if (childrenIgnored(this, read))
    return

  var isGlobStar = remain[0] === minimatch.GLOBSTAR
  if (isGlobStar)
    this._processGlobStar(prefix, read, abs, remain, index, inGlobStar)
  else
    this._processReaddir(prefix, read, abs, remain, index, inGlobStar)
}


GlobSync.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar) {
  var entries = this._readdir(abs, inGlobStar)

  // if the abs isn't a dir, then nothing can match!
  if (!entries)
    return

  // It will only match dot entries if it starts with a dot, or if
  // dot is set.  Stuff like @(.foo|.bar) isn't allowed.
  var pn = remain[0]
  var negate = !!this.minimatch.negate
  var rawGlob = pn._glob
  var dotOk = this.dot || rawGlob.charAt(0) === '.'

  var matchedEntries = []
  for (var i = 0; i < entries.length; i++) {
    var e = entries[i]
    if (e.charAt(0) !== '.' || dotOk) {
      var m
      if (negate && !prefix) {
        m = !e.match(pn)
      } else {
        m = e.match(pn)
      }
      if (m)
        matchedEntries.push(e)
    }
  }

  var len = matchedEntries.length
  // If there are no matched entries, then nothing matches.
  if (len === 0)
    return

  // if this is the last remaining pattern bit, then no need for
  // an additional stat *unless* the user has specified mark or
  // stat explicitly.  We know they exist, since readdir returned
  // them.

  if (remain.length === 1 && !this.mark && !this.stat) {
    if (!this.matches[index])
      this.matches[index] = Object.create(null)

    for (var i = 0; i < len; i ++) {
      var e = matchedEntries[i]
      if (prefix) {
        if (prefix.slice(-1) !== '/')
          e = prefix + '/' + e
        else
          e = prefix + e
      }

      if (e.charAt(0) === '/' && !this.nomount) {
        e = path.join(this.root, e)
      }
      this._emitMatch(index, e)
    }
    // This was the last one, and no stats were needed
    return
  }

  // now test all matched entries as stand-ins for that part
  // of the pattern.
  remain.shift()
  for (var i = 0; i < len; i ++) {
    var e = matchedEntries[i]
    var newPattern
    if (prefix)
      newPattern = [prefix, e]
    else
      newPattern = [e]
    this._process(newPattern.concat(remain), index, inGlobStar)
  }
}


GlobSync.prototype._emitMatch = function (index, e) {
  if (isIgnored(this, e))
    return

  var abs = this._makeAbs(e)

  if (this.mark)
    e = this._mark(e)

  if (this.absolute) {
    e = abs
  }

  if (this.matches[index][e])
    return

  if (this.nodir) {
    var c = this.cache[abs]
    if (c === 'DIR' || Array.isArray(c))
      return
  }

  this.matches[index][e] = true

  if (this.stat)
    this._stat(e)
}


GlobSync.prototype._readdirInGlobStar = function (abs) {
  // follow all symlinked directories forever
  // just proceed as if this is a non-globstar situation
  if (this.follow)
    return this._readdir(abs, false)

  var entries
  var lstat
  var stat
  try {
    lstat = fs.lstatSync(abs)
  } catch (er) {
    if (er.code === 'ENOENT') {
      // lstat failed, doesn't exist
      return null
    }
  }

  var isSym = lstat && lstat.isSymbolicLink()
  this.symlinks[abs] = isSym

  // If it's not a symlink or a dir, then it's definitely a regular file.
  // don't bother doing a readdir in that case.
  if (!isSym && lstat && !lstat.isDirectory())
    this.cache[abs] = 'FILE'
  else
    entries = this._readdir(abs, false)

  return entries
}

GlobSync.prototype._readdir = function (abs, inGlobStar) {
  var entries

  if (inGlobStar && !ownProp(this.symlinks, abs))
    return this._readdirInGlobStar(abs)

  if (ownProp(this.cache, abs)) {
    var c = this.cache[abs]
    if (!c || c === 'FILE')
      return null

    if (Array.isArray(c))
      return c
  }

  try {
    return this._readdirEntries(abs, fs.readdirSync(abs))
  } catch (er) {
    this._readdirError(abs, er)
    return null
  }
}

GlobSync.prototype._readdirEntries = function (abs, entries) {
  // if we haven't asked to stat everything, then just
  // assume that everything in there exists, so we can avoid
  // having to stat it a second time.
  if (!this.mark && !this.stat) {
    for (var i = 0; i < entries.length; i ++) {
      var e = entries[i]
      if (abs === '/')
        e = abs + e
      else
        e = abs + '/' + e
      this.cache[e] = true
    }
  }

  this.cache[abs] = entries

  // mark and cache dir-ness
  return entries
}

GlobSync.prototype._readdirError = function (f, er) {
  // handle errors, and cache the information
  switch (er.code) {
    case 'ENOTSUP': // https://github.com/isaacs/node-glob/issues/205
    case 'ENOTDIR': // totally normal. means it *does* exist.
      var abs = this._makeAbs(f)
      this.cache[abs] = 'FILE'
      if (abs === this.cwdAbs) {
        var error = new Error(er.code + ' invalid cwd ' + this.cwd)
        error.path = this.cwd
        error.code = er.code
        throw error
      }
      break

    case 'ENOENT': // not terribly unusual
    case 'ELOOP':
    case 'ENAMETOOLONG':
    case 'UNKNOWN':
      this.cache[this._makeAbs(f)] = false
      break

    default: // some unusual error.  Treat as failure.
      this.cache[this._makeAbs(f)] = false
      if (this.strict)
        throw er
      if (!this.silent)
        console.error('glob error', er)
      break
  }
}

GlobSync.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar) {

  var entries = this._readdir(abs, inGlobStar)

  // no entries means not a dir, so it can never have matches
  // foo.txt/** doesn't match foo.txt
  if (!entries)
    return

  // test without the globstar, and with every child both below
  // and replacing the globstar.
  var remainWithoutGlobStar = remain.slice(1)
  var gspref = prefix ? [ prefix ] : []
  var noGlobStar = gspref.concat(remainWithoutGlobStar)

  // the noGlobStar pattern exits the inGlobStar state
  this._process(noGlobStar, index, false)

  var len = entries.length
  var isSym = this.symlinks[abs]

  // If it's a symlink, and we're in a globstar, then stop
  if (isSym && inGlobStar)
    return

  for (var i = 0; i < len; i++) {
    var e = entries[i]
    if (e.charAt(0) === '.' && !this.dot)
      continue

    // these two cases enter the inGlobStar state
    var instead = gspref.concat(entries[i], remainWithoutGlobStar)
    this._process(instead, index, true)

    var below = gspref.concat(entries[i], remain)
    this._process(below, index, true)
  }
}

GlobSync.prototype._processSimple = function (prefix, index) {
  // XXX review this.  Shouldn't it be doing the mounting etc
  // before doing stat?  kinda weird?
  var exists = this._stat(prefix)

  if (!this.matches[index])
    this.matches[index] = Object.create(null)

  // If it doesn't exist, then just mark the lack of results
  if (!exists)
    return

  if (prefix && isAbsolute(prefix) && !this.nomount) {
    var trail = /[\/\\]$/.test(prefix)
    if (prefix.charAt(0) === '/') {
      prefix = path.join(this.root, prefix)
    } else {
      prefix = path.resolve(this.root, prefix)
      if (trail)
        prefix += '/'
    }
  }

  if (process.platform === 'win32')
    prefix = prefix.replace(/\\/g, '/')

  // Mark this as a match
  this._emitMatch(index, prefix)
}

// Returns either 'DIR', 'FILE', or false
GlobSync.prototype._stat = function (f) {
  var abs = this._makeAbs(f)
  var needDir = f.slice(-1) === '/'

  if (f.length > this.maxLength)
    return false

  if (!this.stat && ownProp(this.cache, abs)) {
    var c = this.cache[abs]

    if (Array.isArray(c))
      c = 'DIR'

    // It exists, but maybe not how we need it
    if (!needDir || c === 'DIR')
      return c

    if (needDir && c === 'FILE')
      return false

    // otherwise we have to stat, because maybe c=true
    // if we know it exists, but not what it is.
  }

  var exists
  var stat = this.statCache[abs]
  if (!stat) {
    var lstat
    try {
      lstat = fs.lstatSync(abs)
    } catch (er) {
      if (er && (er.code === 'ENOENT' || er.code === 'ENOTDIR')) {
        this.statCache[abs] = false
        return false
      }
    }

    if (lstat && lstat.isSymbolicLink()) {
      try {
        stat = fs.statSync(abs)
      } catch (er) {
        stat = lstat
      }
    } else {
      stat = lstat
    }
  }

  this.statCache[abs] = stat

  var c = true
  if (stat)
    c = stat.isDirectory() ? 'DIR' : 'FILE'

  this.cache[abs] = this.cache[abs] || c

  if (needDir && c === 'FILE')
    return false

  return c
}

GlobSync.prototype._mark = function (p) {
  return common.mark(this, p)
}

GlobSync.prototype._makeAbs = function (f) {
  return common.makeAbs(this, f)
}


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

exports.alphasort = alphasort
exports.alphasorti = alphasorti
exports.setopts = setopts
exports.ownProp = ownProp
exports.makeAbs = makeAbs
exports.finish = finish
exports.mark = mark
exports.isIgnored = isIgnored
exports.childrenIgnored = childrenIgnored

function ownProp (obj, field) {
  return Object.prototype.hasOwnProperty.call(obj, field)
}

var path = __webpack_require__(16)
var minimatch = __webpack_require__(65)
var isAbsolute = __webpack_require__(72)
var Minimatch = minimatch.Minimatch

function alphasorti (a, b) {
  return a.toLowerCase().localeCompare(b.toLowerCase())
}

function alphasort (a, b) {
  return a.localeCompare(b)
}

function setupIgnores (self, options) {
  self.ignore = options.ignore || []

  if (!Array.isArray(self.ignore))
    self.ignore = [self.ignore]

  if (self.ignore.length) {
    self.ignore = self.ignore.map(ignoreMap)
  }
}

// ignore patterns are always in dot:true mode.
function ignoreMap (pattern) {
  var gmatcher = null
  if (pattern.slice(-3) === '/**') {
    var gpattern = pattern.replace(/(\/\*\*)+$/, '')
    gmatcher = new Minimatch(gpattern, { dot: true })
  }

  return {
    matcher: new Minimatch(pattern, { dot: true }),
    gmatcher: gmatcher
  }
}

function setopts (self, pattern, options) {
  if (!options)
    options = {}

  // base-matching: just use globstar for that.
  if (options.matchBase && -1 === pattern.indexOf("/")) {
    if (options.noglobstar) {
      throw new Error("base matching requires globstar")
    }
    pattern = "**/" + pattern
  }

  self.silent = !!options.silent
  self.pattern = pattern
  self.strict = options.strict !== false
  self.realpath = !!options.realpath
  self.realpathCache = options.realpathCache || Object.create(null)
  self.follow = !!options.follow
  self.dot = !!options.dot
  self.mark = !!options.mark
  self.nodir = !!options.nodir
  if (self.nodir)
    self.mark = true
  self.sync = !!options.sync
  self.nounique = !!options.nounique
  self.nonull = !!options.nonull
  self.nosort = !!options.nosort
  self.nocase = !!options.nocase
  self.stat = !!options.stat
  self.noprocess = !!options.noprocess
  self.absolute = !!options.absolute

  self.maxLength = options.maxLength || Infinity
  self.cache = options.cache || Object.create(null)
  self.statCache = options.statCache || Object.create(null)
  self.symlinks = options.symlinks || Object.create(null)

  setupIgnores(self, options)

  self.changedCwd = false
  var cwd = process.cwd()
  if (!ownProp(options, "cwd"))
    self.cwd = cwd
  else {
    self.cwd = path.resolve(options.cwd)
    self.changedCwd = self.cwd !== cwd
  }

  self.root = options.root || path.resolve(self.cwd, "/")
  self.root = path.resolve(self.root)
  if (process.platform === "win32")
    self.root = self.root.replace(/\\/g, "/")

  // TODO: is an absolute `cwd` supposed to be resolved against `root`?
  // e.g. { cwd: '/test', root: __dirname } === path.join(__dirname, '/test')
  self.cwdAbs = isAbsolute(self.cwd) ? self.cwd : makeAbs(self, self.cwd)
  if (process.platform === "win32")
    self.cwdAbs = self.cwdAbs.replace(/\\/g, "/")
  self.nomount = !!options.nomount

  // disable comments and negation in Minimatch.
  // Note that they are not supported in Glob itself anyway.
  options.nonegate = true
  options.nocomment = true

  self.minimatch = new Minimatch(pattern, options)
  self.options = self.minimatch.options
}

function finish (self) {
  var nou = self.nounique
  var all = nou ? [] : Object.create(null)

  for (var i = 0, l = self.matches.length; i < l; i ++) {
    var matches = self.matches[i]
    if (!matches || Object.keys(matches).length === 0) {
      if (self.nonull) {
        // do like the shell, and spit out the literal glob
        var literal = self.minimatch.globSet[i]
        if (nou)
          all.push(literal)
        else
          all[literal] = true
      }
    } else {
      // had matches
      var m = Object.keys(matches)
      if (nou)
        all.push.apply(all, m)
      else
        m.forEach(function (m) {
          all[m] = true
        })
    }
  }

  if (!nou)
    all = Object.keys(all)

  if (!self.nosort)
    all = all.sort(self.nocase ? alphasorti : alphasort)

  // at *some* point we statted all of these
  if (self.mark) {
    for (var i = 0; i < all.length; i++) {
      all[i] = self._mark(all[i])
    }
    if (self.nodir) {
      all = all.filter(function (e) {
        var notDir = !(/\/$/.test(e))
        var c = self.cache[e] || self.cache[makeAbs(self, e)]
        if (notDir && c)
          notDir = c !== 'DIR' && !Array.isArray(c)
        return notDir
      })
    }
  }

  if (self.ignore.length)
    all = all.filter(function(m) {
      return !isIgnored(self, m)
    })

  self.found = all
}

function mark (self, p) {
  var abs = makeAbs(self, p)
  var c = self.cache[abs]
  var m = p
  if (c) {
    var isDir = c === 'DIR' || Array.isArray(c)
    var slash = p.slice(-1) === '/'

    if (isDir && !slash)
      m += '/'
    else if (!isDir && slash)
      m = m.slice(0, -1)

    if (m !== p) {
      var mabs = makeAbs(self, m)
      self.statCache[mabs] = self.statCache[abs]
      self.cache[mabs] = self.cache[abs]
    }
  }

  return m
}

// lotta situps...
function makeAbs (self, f) {
  var abs = f
  if (f.charAt(0) === '/') {
    abs = path.join(self.root, f)
  } else if (isAbsolute(f) || f === '') {
    abs = f
  } else if (self.changedCwd) {
    abs = path.resolve(self.cwd, f)
  } else {
    abs = path.resolve(f)
  }

  if (process.platform === 'win32')
    abs = abs.replace(/\\/g, '/')

  return abs
}


// Return true, if pattern ends with globstar '**', for the accompanying parent directory.
// Ex:- If node_modules/** is the pattern, add 'node_modules' to ignore list along with it's contents
function isIgnored (self, path) {
  if (!self.ignore.length)
    return false

  return self.ignore.some(function(item) {
    return item.matcher.match(path) || !!(item.gmatcher && item.gmatcher.match(path))
  })
}

function childrenIgnored (self, path) {
  if (!self.ignore.length)
    return false

  return self.ignore.some(function(item) {
    return !!(item.gmatcher && item.gmatcher.match(path))
  })
}


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var wrappy = __webpack_require__(76)
var reqs = Object.create(null)
var once = __webpack_require__(77)

module.exports = wrappy(inflight)

function inflight (key, cb) {
  if (reqs[key]) {
    reqs[key].push(cb)
    return null
  } else {
    reqs[key] = [cb]
    return makeres(key)
  }
}

function makeres (key) {
  return once(function RES () {
    var cbs = reqs[key]
    var len = cbs.length
    var args = slice(arguments)

    // XXX It's somewhat ambiguous whether a new callback added in this
    // pass should be queued for later execution if something in the
    // list of callbacks throws, or if it should just be discarded.
    // However, it's such an edge case that it hardly matters, and either
    // choice is likely as surprising as the other.
    // As it happens, we do go ahead and schedule it for later execution.
    try {
      for (var i = 0; i < len; i++) {
        cbs[i].apply(null, args)
      }
    } finally {
      if (cbs.length > len) {
        // added more in the interim.
        // de-zalgo, just in case, but don't call again.
        cbs.splice(0, len)
        process.nextTick(function () {
          RES.apply(null, args)
        })
      } else {
        delete reqs[key]
      }
    }
  })
}

function slice (args) {
  var length = args.length
  var array = []

  for (var i = 0; i < length; i++) array[i] = args[i]
  return array
}


/***/ }),
/* 76 */
/***/ (function(module, exports) {

// Returns a wrapper function that returns a wrapped callback
// The wrapper function should do some stuff, and return a
// presumably different callback function.
// This makes sure that own properties are retained, so that
// decorations and such are not lost along the way.
module.exports = wrappy
function wrappy (fn, cb) {
  if (fn && cb) return wrappy(fn)(cb)

  if (typeof fn !== 'function')
    throw new TypeError('need wrapper function')

  Object.keys(fn).forEach(function (k) {
    wrapper[k] = fn[k]
  })

  return wrapper

  function wrapper() {
    var args = new Array(arguments.length)
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i]
    }
    var ret = fn.apply(this, args)
    var cb = args[args.length-1]
    if (typeof ret === 'function' && ret !== cb) {
      Object.keys(cb).forEach(function (k) {
        ret[k] = cb[k]
      })
    }
    return ret
  }
}


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var wrappy = __webpack_require__(76)
module.exports = wrappy(once)
module.exports.strict = wrappy(onceStrict)

once.proto = once(function () {
  Object.defineProperty(Function.prototype, 'once', {
    value: function () {
      return once(this)
    },
    configurable: true
  })

  Object.defineProperty(Function.prototype, 'onceStrict', {
    value: function () {
      return onceStrict(this)
    },
    configurable: true
  })
})

function once (fn) {
  var f = function () {
    if (f.called) return f.value
    f.called = true
    return f.value = fn.apply(this, arguments)
  }
  f.called = false
  return f
}

function onceStrict (fn) {
  var f = function () {
    if (f.called)
      throw new Error(f.onceError)
    f.called = true
    return f.value = fn.apply(this, arguments)
  }
  var name = fn.name || 'Function wrapped with `once`'
  f.onceError = name + " shouldn't be called more than once"
  f.called = false
  return f
}


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = __webpack_require__(79);
class Grabber {
    async grab(ntldd, targetFile) {
        console.log("checking: ", targetFile);
        const output = await Utils_1.Utils.execute(ntldd + " " + targetFile);
        const reg = /\b[^)]*\)/g;
        const list = output.match(reg);
        let result = [];
        for (const line of list) {
            const filePath = line.match(/(?<==>\s*)[^(]*/)[0].trim();
            if (filePath.indexOf("SYSTEM32") < 0) {
                console.log("dependency:", filePath);
                result.push(filePath);
            }
        }
        return result;
    }
}
exports.Grabber = Grabber;


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = __webpack_require__(80);
class Utils {
    static async execute(command) {
        return new Promise(resolve => {
            child_process_1.exec(command, (err, stdout, stderr) => {
                if (err) {
                    console.log(err);
                    return null;
                }
                resolve(stdout);
            });
        });
    }
}
exports.Utils = Utils;


/***/ }),
/* 80 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9maWxlL0ZpbGVVdGlscy50cyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZnMtZXh0cmEvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mcy1leHRyYS9saWIvZnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3VuaXZlcnNhbGlmeS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ3JhY2VmdWwtZnMvZ3JhY2VmdWwtZnMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZnNcIiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ3JhY2VmdWwtZnMvcG9seWZpbGxzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvbnN0YW50c1wiIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ncmFjZWZ1bC1mcy9sZWdhY3ktc3RyZWFtcy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzdHJlYW1cIiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ3JhY2VmdWwtZnMvY2xvbmUuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidXRpbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImFzc2VydFwiIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mcy1leHRyYS9saWIvY29weS1zeW5jL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mcy1leHRyYS9saWIvY29weS1zeW5jL2NvcHktc3luYy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZzLWV4dHJhL2xpYi9ta2RpcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZzLWV4dHJhL2xpYi9ta2RpcnMvbWtkaXJzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mcy1leHRyYS9saWIvbWtkaXJzL3dpbjMyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mcy1leHRyYS9saWIvbWtkaXJzL21rZGlycy1zeW5jLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mcy1leHRyYS9saWIvdXRpbC91dGltZXMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwib3NcIiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZnMtZXh0cmEvbGliL3V0aWwvc3RhdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZnMtZXh0cmEvbGliL3V0aWwvYnVmZmVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mcy1leHRyYS9saWIvY29weS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZnMtZXh0cmEvbGliL2NvcHkvY29weS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZnMtZXh0cmEvbGliL3BhdGgtZXhpc3RzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mcy1leHRyYS9saWIvZW1wdHkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZzLWV4dHJhL2xpYi9yZW1vdmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZzLWV4dHJhL2xpYi9yZW1vdmUvcmltcmFmLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mcy1leHRyYS9saWIvZW5zdXJlL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mcy1leHRyYS9saWIvZW5zdXJlL2ZpbGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZzLWV4dHJhL2xpYi9lbnN1cmUvbGluay5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZnMtZXh0cmEvbGliL2Vuc3VyZS9zeW1saW5rLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mcy1leHRyYS9saWIvZW5zdXJlL3N5bWxpbmstcGF0aHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZzLWV4dHJhL2xpYi9lbnN1cmUvc3ltbGluay10eXBlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mcy1leHRyYS9saWIvanNvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZnMtZXh0cmEvbGliL2pzb24vanNvbmZpbGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2pzb25maWxlL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mcy1leHRyYS9saWIvanNvbi9vdXRwdXQtanNvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZnMtZXh0cmEvbGliL2pzb24vb3V0cHV0LWpzb24tc3luYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZnMtZXh0cmEvbGliL21vdmUtc3luYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZnMtZXh0cmEvbGliL21vdmUtc3luYy9tb3ZlLXN5bmMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZzLWV4dHJhL2xpYi9tb3ZlL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mcy1leHRyYS9saWIvbW92ZS9tb3ZlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mcy1leHRyYS9saWIvb3V0cHV0L2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9maWxlL0ZpbGVQYXRoLnRzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jaGFsay9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXNjYXBlLXN0cmluZy1yZWdleHAvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Fuc2ktc3R5bGVzL2luZGV4LmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbG9yLWNvbnZlcnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbG9yLWNvbnZlcnQvY29udmVyc2lvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbG9yLW5hbWUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbG9yLWNvbnZlcnQvcm91dGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N1cHBvcnRzLWNvbG9yL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9oYXMtZmxhZy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY2hhbGsvdGVtcGxhdGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90bXAvbGliL3RtcC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjcnlwdG9cIiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmltcmFmL3JpbXJhZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2xvYi9nbG9iLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mcy5yZWFscGF0aC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZnMucmVhbHBhdGgvb2xkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9taW5pbWF0Y2gvbWluaW1hdGNoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9icmFjZS1leHBhbnNpb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbmNhdC1tYXAvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhbGFuY2VkLW1hdGNoL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pbmhlcml0cy9pbmhlcml0cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaW5oZXJpdHMvaW5oZXJpdHNfYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJldmVudHNcIiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcGF0aC1pcy1hYnNvbHV0ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2xvYi9zeW5jLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9nbG9iL2NvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaW5mbGlnaHQvaW5mbGlnaHQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dyYXBweS93cmFwcHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL29uY2Uvb25jZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvR3JhYmJlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvVXRpbHMudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY2hpbGRfcHJvY2Vzc1wiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FB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QU0sbUJBQU8sQ0FBQyxFQUFRO0FBQ3RCLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FB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QUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7OztBQ3JWQSxzQzs7Ozs7O0FDQUEsYUFBYSxtQkFBTyxDQUFDLEVBQVE7O0FBRTdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9CQUFvQjtBQUNwQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsNkNBQTZDLGdCQUFnQjtBQUM3RDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCOztBQUVBOztBQUVBO0FBQ0E7QUFDQSw2Q0FBNkMsZ0JBQWdCO0FBQzdEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNySEEsbUM7Ozs7Ozs7QUNBWTs7QUFFWjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOzs7Ozs7O0FDbEJBLGlDOzs7Ozs7QUNBQSxtQzs7Ozs7OztBQ0FZOztBQUVaO0FBQ0EsWUFBWSxtQkFBTyxDQUFDLEVBQWE7QUFDakM7Ozs7Ozs7O0FDSlk7O0FBRVosV0FBVyxtQkFBTyxDQUFDLENBQWE7QUFDaEMsYUFBYSxtQkFBTyxDQUFDLEVBQU07QUFDM0IsbUJBQW1CLG1CQUFPLENBQUMsRUFBVztBQUN0QyxtQkFBbUIsbUJBQU8sQ0FBQyxFQUFtQjtBQUM5QyxhQUFhLG1CQUFPLENBQUMsRUFBYzs7QUFFbkM7QUFDQTtBQUNBLFlBQVk7QUFDWjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtHQUFrRztBQUNsRztBQUNBOztBQUVBLFNBQVMsb0JBQW9CO0FBQzdCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCx3QkFBd0IsS0FBSztBQUM3QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdCQUFnQixtQkFBTyxDQUFDLEVBQWdCOztBQUV4QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdURBQXVELEtBQUssb0JBQW9CLElBQUk7QUFDcEY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsV0FBVztBQUNwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsWUFBWSxrQ0FBa0MsYUFBYTtBQUNqRzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxhQUFhLFVBQVUsWUFBWTtBQUM5RTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7OztBQ25LQSxpQzs7Ozs7OztBQ0FZO0FBQ1osVUFBVSxtQkFBTyxDQUFDLENBQWM7QUFDaEMsaUJBQWlCLG1CQUFPLENBQUMsRUFBVTtBQUNuQyxtQkFBbUIsbUJBQU8sQ0FBQyxFQUFlOztBQUUxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDYlk7O0FBRVosV0FBVyxtQkFBTyxDQUFDLENBQWE7QUFDaEMsYUFBYSxtQkFBTyxDQUFDLEVBQU07QUFDM0IseUJBQXlCLG1CQUFPLENBQUMsRUFBUzs7QUFFMUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsWUFBWTtBQUNaOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7Ozs7Ozs7O0FDOURZOztBQUVaLGFBQWEsbUJBQU8sQ0FBQyxFQUFNOztBQUUzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDeEJZOztBQUVaLFdBQVcsbUJBQU8sQ0FBQyxDQUFhO0FBQ2hDLGFBQWEsbUJBQU8sQ0FBQyxFQUFNO0FBQzNCLHlCQUF5QixtQkFBTyxDQUFDLEVBQVM7O0FBRTFDOztBQUVBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7Ozs7QUNyRFk7O0FBRVosV0FBVyxtQkFBTyxDQUFDLENBQWE7QUFDaEMsV0FBVyxtQkFBTyxDQUFDLEVBQUk7QUFDdkIsYUFBYSxtQkFBTyxDQUFDLEVBQU07O0FBRTNCLFlBQVksSUFBSTtBQUNoQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNULE9BQU87QUFDUCxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDOUVBLCtCOzs7Ozs7O0FDQVk7O0FBRVosV0FBVyxtQkFBTyxDQUFDLENBQWE7QUFDaEMsYUFBYSxtQkFBTyxDQUFDLEVBQU07O0FBRTNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBa0IsZUFBZTtBQUNqQztBQUNBLHFCQUFxQixlQUFlO0FBQ3BDO0FBQ0Esc0RBQXNELDBCQUEwQjtBQUNoRjtBQUNBO0FBQ0EseUJBQXlCLG9CQUFvQjtBQUM3QyxPQUFPO0FBQ1AsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCwwQkFBMEI7QUFDaEY7QUFDQTtBQUNBLHlCQUF5QixvQkFBb0I7QUFDN0MsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxlQUFlO0FBQy9DLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxlQUFlO0FBQ25ELEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNILHVDQUF1QztBQUN2QztBQUNBO0FBQ0EsVUFBVTtBQUNWOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsb0JBQW9CO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixvQkFBb0I7QUFDekMsR0FBRztBQUNIOztBQUVBO0FBQ0EsU0FBUyxvQkFBb0I7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixlQUFlO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLGVBQWU7QUFDekQsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixTQUFTLElBQUksSUFBSSxrQ0FBa0MsS0FBSztBQUMzRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUMzS1k7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDWFk7O0FBRVosVUFBVSxtQkFBTyxDQUFDLENBQWM7QUFDaEM7QUFDQSxVQUFVLG1CQUFPLENBQUMsRUFBUTtBQUMxQjs7Ozs7Ozs7QUNMWTs7QUFFWixXQUFXLG1CQUFPLENBQUMsQ0FBYTtBQUNoQyxhQUFhLG1CQUFPLENBQUMsRUFBTTtBQUMzQixlQUFlLG1CQUFPLENBQUMsRUFBVztBQUNsQyxtQkFBbUIsbUJBQU8sQ0FBQyxFQUFnQjtBQUMzQyxlQUFlLG1CQUFPLENBQUMsRUFBZ0I7QUFDdkMsYUFBYSxtQkFBTyxDQUFDLEVBQWM7O0FBRW5DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILFlBQVk7QUFDWjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtHQUFrRztBQUNsRztBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLG9CQUFvQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSCw0QkFBNEIsS0FBSztBQUNqQyxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLHFCQUFxQjtBQUNoRTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMkRBQTJELEtBQUssb0JBQW9CLElBQUk7QUFDeEY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxXQUFXO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLFlBQVksa0NBQWtDLGFBQWE7QUFDekc7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsYUFBYSxVQUFVLFlBQVk7QUFDdEY7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7Ozs7Ozs7QUNuTlk7QUFDWixVQUFVLG1CQUFPLENBQUMsQ0FBYztBQUNoQyxXQUFXLG1CQUFPLENBQUMsQ0FBTzs7QUFFMUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ1hZOztBQUVaLFVBQVUsbUJBQU8sQ0FBQyxDQUFjO0FBQ2hDLFdBQVcsbUJBQU8sQ0FBQyxDQUFhO0FBQ2hDLGFBQWEsbUJBQU8sQ0FBQyxFQUFNO0FBQzNCLGNBQWMsbUJBQU8sQ0FBQyxFQUFXO0FBQ2pDLGVBQWUsbUJBQU8sQ0FBQyxFQUFXOztBQUVsQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDL0NZOztBQUVaLFVBQVUsbUJBQU8sQ0FBQyxDQUFjO0FBQ2hDLGVBQWUsbUJBQU8sQ0FBQyxFQUFVOztBQUVqQztBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNSWTs7QUFFWixXQUFXLG1CQUFPLENBQUMsQ0FBYTtBQUNoQyxhQUFhLG1CQUFPLENBQUMsRUFBTTtBQUMzQixlQUFlLG1CQUFPLENBQUMsRUFBUTs7QUFFL0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVB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QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRCxnQkFBZ0I7QUFDckUsbURBQW1ELGNBQWM7QUFDakU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0EsRUFBRTtBQUNGO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCOztBQUV2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsT0FBTyxRQUFRO0FBQy9CLGdCQUFnQixPQUFPLFFBQVE7QUFDL0IsaUJBQWlCLE9BQU8sT0FBTztBQUMvQixpQkFBaUIsT0FBTyxPQUFPO0FBQy9CLGdCQUFnQixRQUFRLE9BQU87QUFDL0IsZ0JBQWdCLFFBQVEsT0FBTztBQUMvQjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzRUFBc0U7O0FBRXRFOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwrQ0FBK0MsRUFBRSxVQUFVLEVBQUU7QUFDN0Q7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsYUFBYSxhQUFhO0FBQ3pDO0FBQ0EsZUFBZSxhQUFhLGFBQWE7QUFDekM7QUFDQSxlQUFlLGFBQWEsYUFBYTtBQUN6QztBQUNBLGVBQWUsYUFBYSxhQUFhO0FBQ3pDO0FBQ0EsZUFBZSxhQUFhLGFBQWE7QUFDekM7QUFDQSxlQUFlLGFBQWE7QUFDNUI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNuMkJZOztBQUVaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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Q0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtB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Q0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsU0FBUztBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLG9CQUFvQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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O0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CO0FBQ3BCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzlTQTtBQUNBOztBQUVBLFlBQVk7QUFDWjtBQUNBLFNBQVMsbUJBQU8sQ0FBQyxFQUFN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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxJQUFJO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxFQUFFLEVBQUUsS0FBSztBQUN6QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsUUFBUTtBQUNoRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxzQkFBc0I7QUFDckM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsNkNBQTZDO0FBQzdDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsUUFBUTtBQUNoQztBQUNBO0FBQ0E7O0FBRUEsYUFBYSxnQkFBZ0I7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSyw2Q0FBNkM7O0FBRWxEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsU0FBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNB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QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQixvQkFBb0I7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixvQkFBb0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNyZUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxXQUFXLG1CQUFPLENBQUMsRUFBTTtBQUN6QixnQkFBZ0IsbUJBQU8sQ0FBQyxFQUFXO0FBQ25DLGlCQUFpQixtQkFBTyxDQUFDLEVBQWtCO0FBQzNDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsWUFBWTtBQUNwRDs7QUFFQTtBQUNBLHFDQUFxQyxZQUFZO0FBQ2pEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVcsZ0NBQWdDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsMENBQTBDLE9BQU87QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixnQkFBZ0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7OztBQy9PQSxhQUFhLG1CQUFPLENBQUMsRUFBUTtBQUM3QjtBQUNBLFdBQVcsbUJBQU8sQ0FBQyxFQUFNOztBQUV6Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLFlBQVk7QUFDN0I7QUFDQTs7Ozs7OztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixpQkFBaUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNoQ0EsYUFBYSxtQkFBTyxDQUFDLEVBQVE7QUFDN0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ3pDQSx3Q0FBOEI7QUFFOUIsTUFBYSxPQUFPO0lBRWhCLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBYSxFQUFFLFVBQWtCO1FBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQztRQUNyQyxNQUFNLE1BQU0sR0FBRyxNQUFNLGFBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxVQUFVLENBQUMsQ0FBQztRQUU3RCxNQUFNLEdBQUcsR0FBRyxZQUFZLENBQUM7UUFDekIsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMvQixJQUFJLE1BQU0sR0FBYSxFQUFFLENBQUM7UUFFMUIsS0FBSyxNQUFNLElBQUksSUFBSSxJQUFJLEVBQUU7WUFDckIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3pELElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNyQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3pCO1NBQ0o7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0NBQ0o7QUFwQkQsMEJBb0JDOzs7Ozs7Ozs7O0FDdEJELGdEQUFtQztBQUVuQyxNQUFhLEtBQUs7SUFDZCxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFlO1FBQ2hDLE9BQU8sSUFBSSxPQUFPLENBQVMsT0FBTyxDQUFDLEVBQUU7WUFDakMsb0JBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFO2dCQUNsQyxJQUFJLEdBQUcsRUFBRTtvQkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNqQixPQUFPLElBQUksQ0FBQztpQkFDZjtnQkFDRCxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEIsQ0FBQyxDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0o7QUFaRCxzQkFZQzs7Ozs7OztBQ2RELDBDIiwiZmlsZSI6Im1pbmd3LWdyYWItZGVwcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsImltcG9ydCB7RmlsZVV0aWxzfSBmcm9tIFwiLi9maWxlL0ZpbGVVdGlsc1wiO1xyXG5pbXBvcnQge0ZpbGVQYXRofSBmcm9tIFwiLi9maWxlL0ZpbGVQYXRoXCI7XHJcbmltcG9ydCB7R3JhYmJlcn0gZnJvbSBcIi4vR3JhYmJlclwiO1xyXG5cclxuY29uc29sZS5sb2coXCJIZWxsbyBmcm9tIEdST20hXCIpO1xyXG5cclxuaWYgKHByb2Nlc3MuYXJndi5sZW5ndGggPCAzKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiZXhlY3V0YWJsZSBpcyBub3Qgc3BlY2lmaWVkIVwiKTtcclxuICAgIHByb2Nlc3MuZXhpdCgtMSk7XHJcbn1cclxuXHJcbmNvbnN0IHRhcmdldEV4ZSA9IG5ldyBGaWxlUGF0aChwcm9jZXNzLmFyZ3ZbMl0pO1xyXG5jb25zb2xlLmxvZyhcInByb2Nlc3NpbmcgZXhlYzogXCIsIHRhcmdldEV4ZS5wYXRoKTtcclxuXHJcbmNvbnN0IGNvbmZpZyA9IEZpbGVVdGlscy5yZWFkSnNvbihuZXcgRmlsZVBhdGgocHJvY2Vzcy5jd2QoKSArIFwiL2NvbmZpZy5qc29uXCIpKTtcclxuaWYgKCFjb25maWcpIHtcclxuICAgIHByb2Nlc3MuZXhpdCgtMSk7XHJcbn1cclxuXHJcbmNvbnN0IG50bGRkID0gY29uZmlnW1wibnRsZGQtZXhlY1wiXTtcclxuaWYgKCFudGxkZCkge1xyXG4gICAgY29uc29sZS5lcnJvcihcIm50bGRkIGlzIG5vdCBzcGVjaWZpZWQgaW4gdGhlIGNvbmZpZ1wiKTtcclxuICAgIHByb2Nlc3MuZXhpdCgtMSk7XHJcbn1cclxuXHJcbmNvbnN0IGdyYWJiZXIgPSBuZXcgR3JhYmJlcigpO1xyXG5ncmFiYmVyLmdyYWIobnRsZGQsIHRhcmdldEV4ZS5wYXRoKS50aGVuKCgpPT4ge1xyXG4gICAgY29uc29sZS5sb2coXCJET05FXCIpO1xyXG59KTtcclxuXHJcblxyXG5cclxuXHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFJvbWFuLkdhaWtvdiBvbiAzLzIxLzIwMTlcclxuICovXHJcbmltcG9ydCB7RmlsZVBhdGh9IGZyb20gXCIuL0ZpbGVQYXRoXCI7XHJcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmcy1leHRyYVwiO1xyXG5pbXBvcnQge3JlYWRKU09OU3luYywgd3JpdGVKU09OU3luY30gZnJvbSBcImZzLWV4dHJhXCI7XHJcbmltcG9ydCB7XHJcbiAgICByZWFkRmlsZVN5bmMsXHJcbiAgICB3cml0ZUZpbGVTeW5jXHJcbn0gZnJvbSBcImZzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRmlsZVV0aWxzIHtcclxuXHJcbiAgICBzdGF0aWMgcmVhZFRleHQoZmlsZTogRmlsZVBhdGgpOiBzdHJpbmcge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZWFkRmlsZVN5bmMoZmlsZS5wYXRoLCBcInV0ZjhcIik7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiY2FuJ3QgcmVhZCB0ZXh0OiBcIiwgZmlsZS5wYXRoKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgd3JpdGVUZXh0KGZpbGU6IEZpbGVQYXRoLCB0ZXh0OiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB3cml0ZUZpbGVTeW5jKGZpbGUucGF0aCwgdGV4dCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJjYW4ndCB3cml0ZSB0ZXh0OiBcIiwgZmlsZS5wYXRoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHJlYWRKc29uKGZpbGU6IEZpbGVQYXRoKTogYW55IHtcclxuICAgICAgICBjb25zb2xlLmluZm8oXCIuLi5yZWFkaW5nIGpzb246IFwiLCBmaWxlLnBhdGgpO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZWFkSlNPTlN5bmMoZmlsZS5wYXRoLCB7ZW5jb2Rpbmc6IFwidXRmOFwifSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiY2FuJ3QgcmVhZCBqc29uOiBcIiwgZmlsZS5wYXRoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHdyaXRlSnNvbihmaWxlOiBGaWxlUGF0aCwganNvbjogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc29sZS5pbmZvKFwiLi4ud3JpdGluZyBqc29uOiBcIiwgZmlsZS5wYXRoKTtcclxuICAgICAgICBpZiAoIWZpbGUuY3JlYXRlRm9sZGVyKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgd3JpdGVKU09OU3luYyhmaWxlLnBhdGgsIGpzb24sIHtlbmNvZGluZzogXCJ1dGY4XCIsIHNwYWNlczogXCJcXHRcIn0pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcImNhbid0IHdyaXRlIGpzb246XCIsIGZpbGUucGF0aCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZWN1cnNpdmVGb3VuZCh0YXJnZXREaXJlY3Rvcnk6IEZpbGVQYXRoLCBmb2xkZXJIYW5kbGVyOiAoZm9sZGVyOiBGaWxlUGF0aCkgPT4gdm9pZCwgZmlsZUhhbmRsZXI6IChmaWxlOiBGaWxlUGF0aCkgPT4gdm9pZCkge1xyXG4gICAgICAgIGlmICghdGFyZ2V0RGlyZWN0b3J5LmlzRm9sZGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnMucmVhZGRpclN5bmModGFyZ2V0RGlyZWN0b3J5LnBhdGgpXHJcbiAgICAgICAgICAgIC5mb3JFYWNoKGZpbGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZVBhdGg6IEZpbGVQYXRoID0gdGFyZ2V0RGlyZWN0b3J5LnJlc29sdmVQYXRoKGZpbGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGZpbGVQYXRoLmlzRm9sZGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZvbGRlckhhbmRsZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9sZGVySGFuZGxlcihmaWxlUGF0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVjdXJzaXZlRm91bmQoZmlsZVBhdGgsIGZvbGRlckhhbmRsZXIsIGZpbGVIYW5kbGVyKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbGVIYW5kbGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVIYW5kbGVyKGZpbGVQYXRoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiIsIid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5hc3NpZ24oXG4gIHt9LFxuICAvLyBFeHBvcnQgcHJvbWlzZWlmaWVkIGdyYWNlZnVsLWZzOlxuICByZXF1aXJlKCcuL2ZzJyksXG4gIC8vIEV4cG9ydCBleHRyYSBtZXRob2RzOlxuICByZXF1aXJlKCcuL2NvcHktc3luYycpLFxuICByZXF1aXJlKCcuL2NvcHknKSxcbiAgcmVxdWlyZSgnLi9lbXB0eScpLFxuICByZXF1aXJlKCcuL2Vuc3VyZScpLFxuICByZXF1aXJlKCcuL2pzb24nKSxcbiAgcmVxdWlyZSgnLi9ta2RpcnMnKSxcbiAgcmVxdWlyZSgnLi9tb3ZlLXN5bmMnKSxcbiAgcmVxdWlyZSgnLi9tb3ZlJyksXG4gIHJlcXVpcmUoJy4vb3V0cHV0JyksXG4gIHJlcXVpcmUoJy4vcGF0aC1leGlzdHMnKSxcbiAgcmVxdWlyZSgnLi9yZW1vdmUnKVxuKVxuXG4vLyBFeHBvcnQgZnMucHJvbWlzZXMgYXMgYSBnZXR0ZXIgcHJvcGVydHkgc28gdGhhdCB3ZSBkb24ndCB0cmlnZ2VyXG4vLyBFeHBlcmltZW50YWxXYXJuaW5nIGJlZm9yZSBmcy5wcm9taXNlcyBpcyBhY3R1YWxseSBhY2Nlc3NlZC5cbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKVxuaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZnMsICdwcm9taXNlcycpKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUuZXhwb3J0cywgJ3Byb21pc2VzJywge1xuICAgIGdldCAoKSB7IHJldHVybiBmcy5wcm9taXNlcyB9XG4gIH0pXG59XG4iLCIndXNlIHN0cmljdCdcbi8vIFRoaXMgaXMgYWRhcHRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9ub3JtYWxpemUvbXpcbi8vIENvcHlyaWdodCAoYykgMjAxNC0yMDE2IEpvbmF0aGFuIE9uZyBtZUBqb25nbGViZXJyeS5jb20gYW5kIENvbnRyaWJ1dG9yc1xuY29uc3QgdSA9IHJlcXVpcmUoJ3VuaXZlcnNhbGlmeScpLmZyb21DYWxsYmFja1xuY29uc3QgZnMgPSByZXF1aXJlKCdncmFjZWZ1bC1mcycpXG5cbmNvbnN0IGFwaSA9IFtcbiAgJ2FjY2VzcycsXG4gICdhcHBlbmRGaWxlJyxcbiAgJ2NobW9kJyxcbiAgJ2Nob3duJyxcbiAgJ2Nsb3NlJyxcbiAgJ2NvcHlGaWxlJyxcbiAgJ2ZjaG1vZCcsXG4gICdmY2hvd24nLFxuICAnZmRhdGFzeW5jJyxcbiAgJ2ZzdGF0JyxcbiAgJ2ZzeW5jJyxcbiAgJ2Z0cnVuY2F0ZScsXG4gICdmdXRpbWVzJyxcbiAgJ2xjaG93bicsXG4gICdsY2htb2QnLFxuICAnbGluaycsXG4gICdsc3RhdCcsXG4gICdta2RpcicsXG4gICdta2R0ZW1wJyxcbiAgJ29wZW4nLFxuICAncmVhZEZpbGUnLFxuICAncmVhZGRpcicsXG4gICdyZWFkbGluaycsXG4gICdyZWFscGF0aCcsXG4gICdyZW5hbWUnLFxuICAncm1kaXInLFxuICAnc3RhdCcsXG4gICdzeW1saW5rJyxcbiAgJ3RydW5jYXRlJyxcbiAgJ3VubGluaycsXG4gICd1dGltZXMnLFxuICAnd3JpdGVGaWxlJ1xuXS5maWx0ZXIoa2V5ID0+IHtcbiAgLy8gU29tZSBjb21tYW5kcyBhcmUgbm90IGF2YWlsYWJsZSBvbiBzb21lIHN5c3RlbXMuIEV4OlxuICAvLyBmcy5jb3B5RmlsZSB3YXMgYWRkZWQgaW4gTm9kZS5qcyB2OC41LjBcbiAgLy8gZnMubWtkdGVtcCB3YXMgYWRkZWQgaW4gTm9kZS5qcyB2NS4xMC4wXG4gIC8vIGZzLmxjaG93biBpcyBub3QgYXZhaWxhYmxlIG9uIGF0IGxlYXN0IHNvbWUgTGludXhcbiAgcmV0dXJuIHR5cGVvZiBmc1trZXldID09PSAnZnVuY3Rpb24nXG59KVxuXG4vLyBFeHBvcnQgYWxsIGtleXM6XG5PYmplY3Qua2V5cyhmcykuZm9yRWFjaChrZXkgPT4ge1xuICBpZiAoa2V5ID09PSAncHJvbWlzZXMnKSB7XG4gICAgLy8gZnMucHJvbWlzZXMgaXMgYSBnZXR0ZXIgcHJvcGVydHkgdGhhdCB0cmlnZ2VycyBFeHBlcmltZW50YWxXYXJuaW5nXG4gICAgLy8gRG9uJ3QgcmUtZXhwb3J0IGl0IGhlcmUsIHRoZSBnZXR0ZXIgaXMgZGVmaW5lZCBpbiBcImxpYi9pbmRleC5qc1wiXG4gICAgcmV0dXJuXG4gIH1cbiAgZXhwb3J0c1trZXldID0gZnNba2V5XVxufSlcblxuLy8gVW5pdmVyc2FsaWZ5IGFzeW5jIG1ldGhvZHM6XG5hcGkuZm9yRWFjaChtZXRob2QgPT4ge1xuICBleHBvcnRzW21ldGhvZF0gPSB1KGZzW21ldGhvZF0pXG59KVxuXG4vLyBXZSBkaWZmZXIgZnJvbSBtei9mcyBpbiB0aGF0IHdlIHN0aWxsIHNoaXAgdGhlIG9sZCwgYnJva2VuLCBmcy5leGlzdHMoKVxuLy8gc2luY2Ugd2UgYXJlIGEgZHJvcC1pbiByZXBsYWNlbWVudCBmb3IgdGhlIG5hdGl2ZSBtb2R1bGVcbmV4cG9ydHMuZXhpc3RzID0gZnVuY3Rpb24gKGZpbGVuYW1lLCBjYWxsYmFjaykge1xuICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGZzLmV4aXN0cyhmaWxlbmFtZSwgY2FsbGJhY2spXG4gIH1cbiAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgIHJldHVybiBmcy5leGlzdHMoZmlsZW5hbWUsIHJlc29sdmUpXG4gIH0pXG59XG5cbi8vIGZzLnJlYWQoKSAmIGZzLndyaXRlIG5lZWQgc3BlY2lhbCB0cmVhdG1lbnQgZHVlIHRvIG11bHRpcGxlIGNhbGxiYWNrIGFyZ3NcblxuZXhwb3J0cy5yZWFkID0gZnVuY3Rpb24gKGZkLCBidWZmZXIsIG9mZnNldCwgbGVuZ3RoLCBwb3NpdGlvbiwgY2FsbGJhY2spIHtcbiAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBmcy5yZWFkKGZkLCBidWZmZXIsIG9mZnNldCwgbGVuZ3RoLCBwb3NpdGlvbiwgY2FsbGJhY2spXG4gIH1cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBmcy5yZWFkKGZkLCBidWZmZXIsIG9mZnNldCwgbGVuZ3RoLCBwb3NpdGlvbiwgKGVyciwgYnl0ZXNSZWFkLCBidWZmZXIpID0+IHtcbiAgICAgIGlmIChlcnIpIHJldHVybiByZWplY3QoZXJyKVxuICAgICAgcmVzb2x2ZSh7IGJ5dGVzUmVhZCwgYnVmZmVyIH0pXG4gICAgfSlcbiAgfSlcbn1cblxuLy8gRnVuY3Rpb24gc2lnbmF0dXJlIGNhbiBiZVxuLy8gZnMud3JpdGUoZmQsIGJ1ZmZlclssIG9mZnNldFssIGxlbmd0aFssIHBvc2l0aW9uXV1dLCBjYWxsYmFjaylcbi8vIE9SXG4vLyBmcy53cml0ZShmZCwgc3RyaW5nWywgcG9zaXRpb25bLCBlbmNvZGluZ11dLCBjYWxsYmFjaylcbi8vIFdlIG5lZWQgdG8gaGFuZGxlIGJvdGggY2FzZXMsIHNvIHdlIHVzZSAuLi5hcmdzXG5leHBvcnRzLndyaXRlID0gZnVuY3Rpb24gKGZkLCBidWZmZXIsIC4uLmFyZ3MpIHtcbiAgaWYgKHR5cGVvZiBhcmdzW2FyZ3MubGVuZ3RoIC0gMV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZnMud3JpdGUoZmQsIGJ1ZmZlciwgLi4uYXJncylcbiAgfVxuXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgZnMud3JpdGUoZmQsIGJ1ZmZlciwgLi4uYXJncywgKGVyciwgYnl0ZXNXcml0dGVuLCBidWZmZXIpID0+IHtcbiAgICAgIGlmIChlcnIpIHJldHVybiByZWplY3QoZXJyKVxuICAgICAgcmVzb2x2ZSh7IGJ5dGVzV3JpdHRlbiwgYnVmZmVyIH0pXG4gICAgfSlcbiAgfSlcbn1cblxuLy8gZnMucmVhbHBhdGgubmF0aXZlIG9ubHkgYXZhaWxhYmxlIGluIE5vZGUgdjkuMitcbmlmICh0eXBlb2YgZnMucmVhbHBhdGgubmF0aXZlID09PSAnZnVuY3Rpb24nKSB7XG4gIGV4cG9ydHMucmVhbHBhdGgubmF0aXZlID0gdShmcy5yZWFscGF0aC5uYXRpdmUpXG59XG4iLCIndXNlIHN0cmljdCdcblxuZXhwb3J0cy5mcm9tQ2FsbGJhY2sgPSBmdW5jdGlvbiAoZm4pIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHR5cGVvZiBhcmd1bWVudHNbYXJndW1lbnRzLmxlbmd0aCAtIDFdID09PSAnZnVuY3Rpb24nKSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBhcmd1bWVudHNbYXJndW1lbnRzLmxlbmd0aF0gPSAoZXJyLCByZXMpID0+IHtcbiAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gcmVqZWN0KGVycilcbiAgICAgICAgICByZXNvbHZlKHJlcylcbiAgICAgICAgfVxuICAgICAgICBhcmd1bWVudHMubGVuZ3RoKytcbiAgICAgICAgZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgICAgfSlcbiAgICB9XG4gIH0sICduYW1lJywgeyB2YWx1ZTogZm4ubmFtZSB9KVxufVxuXG5leHBvcnRzLmZyb21Qcm9taXNlID0gZnVuY3Rpb24gKGZuKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGNiID0gYXJndW1lbnRzW2FyZ3VtZW50cy5sZW5ndGggLSAxXVxuICAgIGlmICh0eXBlb2YgY2IgIT09ICdmdW5jdGlvbicpIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgZWxzZSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpLnRoZW4ociA9PiBjYihudWxsLCByKSwgY2IpXG4gIH0sICduYW1lJywgeyB2YWx1ZTogZm4ubmFtZSB9KVxufVxuIiwidmFyIGZzID0gcmVxdWlyZSgnZnMnKVxudmFyIHBvbHlmaWxscyA9IHJlcXVpcmUoJy4vcG9seWZpbGxzLmpzJylcbnZhciBsZWdhY3kgPSByZXF1aXJlKCcuL2xlZ2FjeS1zdHJlYW1zLmpzJylcbnZhciBjbG9uZSA9IHJlcXVpcmUoJy4vY2xvbmUuanMnKVxuXG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAtIG5vZGUgMC54IHBvbHlmaWxsICovXG52YXIgZ3JhY2VmdWxRdWV1ZVxudmFyIHByZXZpb3VzU3ltYm9sXG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlIC0gbm9kZSAwLnggcG9seWZpbGwgKi9cbmlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBTeW1ib2wuZm9yID09PSAnZnVuY3Rpb24nKSB7XG4gIGdyYWNlZnVsUXVldWUgPSBTeW1ib2wuZm9yKCdncmFjZWZ1bC1mcy5xdWV1ZScpXG4gIC8vIFRoaXMgaXMgdXNlZCBpbiB0ZXN0aW5nIGJ5IGZ1dHVyZSB2ZXJzaW9uc1xuICBwcmV2aW91c1N5bWJvbCA9IFN5bWJvbC5mb3IoJ2dyYWNlZnVsLWZzLnByZXZpb3VzJylcbn0gZWxzZSB7XG4gIGdyYWNlZnVsUXVldWUgPSAnX19fZ3JhY2VmdWwtZnMucXVldWUnXG4gIHByZXZpb3VzU3ltYm9sID0gJ19fX2dyYWNlZnVsLWZzLnByZXZpb3VzJ1xufVxuXG5mdW5jdGlvbiBub29wICgpIHt9XG5cbnZhciBkZWJ1ZyA9IG5vb3BcbmlmICh1dGlsLmRlYnVnbG9nKVxuICBkZWJ1ZyA9IHV0aWwuZGVidWdsb2coJ2dmczQnKVxuZWxzZSBpZiAoL1xcYmdmczRcXGIvaS50ZXN0KHByb2Nlc3MuZW52Lk5PREVfREVCVUcgfHwgJycpKVxuICBkZWJ1ZyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBtID0gdXRpbC5mb3JtYXQuYXBwbHkodXRpbCwgYXJndW1lbnRzKVxuICAgIG0gPSAnR0ZTNDogJyArIG0uc3BsaXQoL1xcbi8pLmpvaW4oJ1xcbkdGUzQ6ICcpXG4gICAgY29uc29sZS5lcnJvcihtKVxuICB9XG5cbi8vIE9uY2UgdGltZSBpbml0aWFsaXphdGlvblxuaWYgKCFnbG9iYWxbZ3JhY2VmdWxRdWV1ZV0pIHtcbiAgLy8gVGhpcyBxdWV1ZSBjYW4gYmUgc2hhcmVkIGJ5IG11bHRpcGxlIGxvYWRlZCBpbnN0YW5jZXNcbiAgdmFyIHF1ZXVlID0gW11cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGdsb2JhbCwgZ3JhY2VmdWxRdWV1ZSwge1xuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gcXVldWVcbiAgICB9XG4gIH0pXG5cbiAgLy8gUGF0Y2ggZnMuY2xvc2UvY2xvc2VTeW5jIHRvIHNoYXJlZCBxdWV1ZSB2ZXJzaW9uLCBiZWNhdXNlIHdlIG5lZWRcbiAgLy8gdG8gcmV0cnkoKSB3aGVuZXZlciBhIGNsb3NlIGhhcHBlbnMgKmFueXdoZXJlKiBpbiB0aGUgcHJvZ3JhbS5cbiAgLy8gVGhpcyBpcyBlc3NlbnRpYWwgd2hlbiBtdWx0aXBsZSBncmFjZWZ1bC1mcyBpbnN0YW5jZXMgYXJlXG4gIC8vIGluIHBsYXkgYXQgdGhlIHNhbWUgdGltZS5cbiAgZnMuY2xvc2UgPSAoZnVuY3Rpb24gKGZzJGNsb3NlKSB7XG4gICAgZnVuY3Rpb24gY2xvc2UgKGZkLCBjYikge1xuICAgICAgcmV0dXJuIGZzJGNsb3NlLmNhbGwoZnMsIGZkLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIC8vIFRoaXMgZnVuY3Rpb24gdXNlcyB0aGUgZ3JhY2VmdWwtZnMgc2hhcmVkIHF1ZXVlXG4gICAgICAgIGlmICghZXJyKSB7XG4gICAgICAgICAgcmV0cnkoKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICBjYi5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgICB9KVxuICAgIH1cblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjbG9zZSwgcHJldmlvdXNTeW1ib2wsIHtcbiAgICAgIHZhbHVlOiBmcyRjbG9zZVxuICAgIH0pXG4gICAgcmV0dXJuIGNsb3NlXG4gIH0pKGZzLmNsb3NlKVxuXG4gIGZzLmNsb3NlU3luYyA9IChmdW5jdGlvbiAoZnMkY2xvc2VTeW5jKSB7XG4gICAgZnVuY3Rpb24gY2xvc2VTeW5jIChmZCkge1xuICAgICAgLy8gVGhpcyBmdW5jdGlvbiB1c2VzIHRoZSBncmFjZWZ1bC1mcyBzaGFyZWQgcXVldWVcbiAgICAgIGZzJGNsb3NlU3luYy5hcHBseShmcywgYXJndW1lbnRzKVxuICAgICAgcmV0cnkoKVxuICAgIH1cblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjbG9zZVN5bmMsIHByZXZpb3VzU3ltYm9sLCB7XG4gICAgICB2YWx1ZTogZnMkY2xvc2VTeW5jXG4gICAgfSlcbiAgICByZXR1cm4gY2xvc2VTeW5jXG4gIH0pKGZzLmNsb3NlU3luYylcblxuICBpZiAoL1xcYmdmczRcXGIvaS50ZXN0KHByb2Nlc3MuZW52Lk5PREVfREVCVUcgfHwgJycpKSB7XG4gICAgcHJvY2Vzcy5vbignZXhpdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgZGVidWcoZ2xvYmFsW2dyYWNlZnVsUXVldWVdKVxuICAgICAgcmVxdWlyZSgnYXNzZXJ0JykuZXF1YWwoZ2xvYmFsW2dyYWNlZnVsUXVldWVdLmxlbmd0aCwgMClcbiAgICB9KVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcGF0Y2goY2xvbmUoZnMpKVxuaWYgKHByb2Nlc3MuZW52LlRFU1RfR1JBQ0VGVUxfRlNfR0xPQkFMX1BBVENIICYmICFmcy5fX3BhdGNoZWQpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHBhdGNoKGZzKVxuICAgIGZzLl9fcGF0Y2hlZCA9IHRydWU7XG59XG5cbmZ1bmN0aW9uIHBhdGNoIChmcykge1xuICAvLyBFdmVyeXRoaW5nIHRoYXQgcmVmZXJlbmNlcyB0aGUgb3BlbigpIGZ1bmN0aW9uIG5lZWRzIHRvIGJlIGluIGhlcmVcbiAgcG9seWZpbGxzKGZzKVxuICBmcy5ncmFjZWZ1bGlmeSA9IHBhdGNoXG5cbiAgZnMuY3JlYXRlUmVhZFN0cmVhbSA9IGNyZWF0ZVJlYWRTdHJlYW1cbiAgZnMuY3JlYXRlV3JpdGVTdHJlYW0gPSBjcmVhdGVXcml0ZVN0cmVhbVxuICB2YXIgZnMkcmVhZEZpbGUgPSBmcy5yZWFkRmlsZVxuICBmcy5yZWFkRmlsZSA9IHJlYWRGaWxlXG4gIGZ1bmN0aW9uIHJlYWRGaWxlIChwYXRoLCBvcHRpb25zLCBjYikge1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgIGNiID0gb3B0aW9ucywgb3B0aW9ucyA9IG51bGxcblxuICAgIHJldHVybiBnbyRyZWFkRmlsZShwYXRoLCBvcHRpb25zLCBjYilcblxuICAgIGZ1bmN0aW9uIGdvJHJlYWRGaWxlIChwYXRoLCBvcHRpb25zLCBjYikge1xuICAgICAgcmV0dXJuIGZzJHJlYWRGaWxlKHBhdGgsIG9wdGlvbnMsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgaWYgKGVyciAmJiAoZXJyLmNvZGUgPT09ICdFTUZJTEUnIHx8IGVyci5jb2RlID09PSAnRU5GSUxFJykpXG4gICAgICAgICAgZW5xdWV1ZShbZ28kcmVhZEZpbGUsIFtwYXRoLCBvcHRpb25zLCBjYl1dKVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGNiID09PSAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgY2IuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgICAgICAgIHJldHJ5KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICB2YXIgZnMkd3JpdGVGaWxlID0gZnMud3JpdGVGaWxlXG4gIGZzLndyaXRlRmlsZSA9IHdyaXRlRmlsZVxuICBmdW5jdGlvbiB3cml0ZUZpbGUgKHBhdGgsIGRhdGEsIG9wdGlvbnMsIGNiKSB7XG4gICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKVxuICAgICAgY2IgPSBvcHRpb25zLCBvcHRpb25zID0gbnVsbFxuXG4gICAgcmV0dXJuIGdvJHdyaXRlRmlsZShwYXRoLCBkYXRhLCBvcHRpb25zLCBjYilcblxuICAgIGZ1bmN0aW9uIGdvJHdyaXRlRmlsZSAocGF0aCwgZGF0YSwgb3B0aW9ucywgY2IpIHtcbiAgICAgIHJldHVybiBmcyR3cml0ZUZpbGUocGF0aCwgZGF0YSwgb3B0aW9ucywgZnVuY3Rpb24gKGVycikge1xuICAgICAgICBpZiAoZXJyICYmIChlcnIuY29kZSA9PT0gJ0VNRklMRScgfHwgZXJyLmNvZGUgPT09ICdFTkZJTEUnKSlcbiAgICAgICAgICBlbnF1ZXVlKFtnbyR3cml0ZUZpbGUsIFtwYXRoLCBkYXRhLCBvcHRpb25zLCBjYl1dKVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGNiID09PSAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgY2IuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgICAgICAgIHJldHJ5KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICB2YXIgZnMkYXBwZW5kRmlsZSA9IGZzLmFwcGVuZEZpbGVcbiAgaWYgKGZzJGFwcGVuZEZpbGUpXG4gICAgZnMuYXBwZW5kRmlsZSA9IGFwcGVuZEZpbGVcbiAgZnVuY3Rpb24gYXBwZW5kRmlsZSAocGF0aCwgZGF0YSwgb3B0aW9ucywgY2IpIHtcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpXG4gICAgICBjYiA9IG9wdGlvbnMsIG9wdGlvbnMgPSBudWxsXG5cbiAgICByZXR1cm4gZ28kYXBwZW5kRmlsZShwYXRoLCBkYXRhLCBvcHRpb25zLCBjYilcblxuICAgIGZ1bmN0aW9uIGdvJGFwcGVuZEZpbGUgKHBhdGgsIGRhdGEsIG9wdGlvbnMsIGNiKSB7XG4gICAgICByZXR1cm4gZnMkYXBwZW5kRmlsZShwYXRoLCBkYXRhLCBvcHRpb25zLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGlmIChlcnIgJiYgKGVyci5jb2RlID09PSAnRU1GSUxFJyB8fCBlcnIuY29kZSA9PT0gJ0VORklMRScpKVxuICAgICAgICAgIGVucXVldWUoW2dvJGFwcGVuZEZpbGUsIFtwYXRoLCBkYXRhLCBvcHRpb25zLCBjYl1dKVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGNiID09PSAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgY2IuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgICAgICAgIHJldHJ5KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICB2YXIgZnMkcmVhZGRpciA9IGZzLnJlYWRkaXJcbiAgZnMucmVhZGRpciA9IHJlYWRkaXJcbiAgZnVuY3Rpb24gcmVhZGRpciAocGF0aCwgb3B0aW9ucywgY2IpIHtcbiAgICB2YXIgYXJncyA9IFtwYXRoXVxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYXJncy5wdXNoKG9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNiID0gb3B0aW9uc1xuICAgIH1cbiAgICBhcmdzLnB1c2goZ28kcmVhZGRpciRjYilcblxuICAgIHJldHVybiBnbyRyZWFkZGlyKGFyZ3MpXG5cbiAgICBmdW5jdGlvbiBnbyRyZWFkZGlyJGNiIChlcnIsIGZpbGVzKSB7XG4gICAgICBpZiAoZmlsZXMgJiYgZmlsZXMuc29ydClcbiAgICAgICAgZmlsZXMuc29ydCgpXG5cbiAgICAgIGlmIChlcnIgJiYgKGVyci5jb2RlID09PSAnRU1GSUxFJyB8fCBlcnIuY29kZSA9PT0gJ0VORklMRScpKVxuICAgICAgICBlbnF1ZXVlKFtnbyRyZWFkZGlyLCBbYXJnc11dKVxuXG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICBjYi5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgICAgIHJldHJ5KClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnbyRyZWFkZGlyIChhcmdzKSB7XG4gICAgcmV0dXJuIGZzJHJlYWRkaXIuYXBwbHkoZnMsIGFyZ3MpXG4gIH1cblxuICBpZiAocHJvY2Vzcy52ZXJzaW9uLnN1YnN0cigwLCA0KSA9PT0gJ3YwLjgnKSB7XG4gICAgdmFyIGxlZ1N0cmVhbXMgPSBsZWdhY3koZnMpXG4gICAgUmVhZFN0cmVhbSA9IGxlZ1N0cmVhbXMuUmVhZFN0cmVhbVxuICAgIFdyaXRlU3RyZWFtID0gbGVnU3RyZWFtcy5Xcml0ZVN0cmVhbVxuICB9XG5cbiAgdmFyIGZzJFJlYWRTdHJlYW0gPSBmcy5SZWFkU3RyZWFtXG4gIGlmIChmcyRSZWFkU3RyZWFtKSB7XG4gICAgUmVhZFN0cmVhbS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKGZzJFJlYWRTdHJlYW0ucHJvdG90eXBlKVxuICAgIFJlYWRTdHJlYW0ucHJvdG90eXBlLm9wZW4gPSBSZWFkU3RyZWFtJG9wZW5cbiAgfVxuXG4gIHZhciBmcyRXcml0ZVN0cmVhbSA9IGZzLldyaXRlU3RyZWFtXG4gIGlmIChmcyRXcml0ZVN0cmVhbSkge1xuICAgIFdyaXRlU3RyZWFtLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoZnMkV3JpdGVTdHJlYW0ucHJvdG90eXBlKVxuICAgIFdyaXRlU3RyZWFtLnByb3RvdHlwZS5vcGVuID0gV3JpdGVTdHJlYW0kb3BlblxuICB9XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZzLCAnUmVhZFN0cmVhbScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBSZWFkU3RyZWFtXG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgIFJlYWRTdHJlYW0gPSB2YWxcbiAgICB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmcywgJ1dyaXRlU3RyZWFtJywge1xuICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIFdyaXRlU3RyZWFtXG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgIFdyaXRlU3RyZWFtID0gdmFsXG4gICAgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KVxuXG4gIC8vIGxlZ2FjeSBuYW1lc1xuICB2YXIgRmlsZVJlYWRTdHJlYW0gPSBSZWFkU3RyZWFtXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmcywgJ0ZpbGVSZWFkU3RyZWFtJywge1xuICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIEZpbGVSZWFkU3RyZWFtXG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgIEZpbGVSZWFkU3RyZWFtID0gdmFsXG4gICAgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KVxuICB2YXIgRmlsZVdyaXRlU3RyZWFtID0gV3JpdGVTdHJlYW1cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZzLCAnRmlsZVdyaXRlU3RyZWFtJywge1xuICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIEZpbGVXcml0ZVN0cmVhbVxuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICBGaWxlV3JpdGVTdHJlYW0gPSB2YWxcbiAgICB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pXG5cbiAgZnVuY3Rpb24gUmVhZFN0cmVhbSAocGF0aCwgb3B0aW9ucykge1xuICAgIGlmICh0aGlzIGluc3RhbmNlb2YgUmVhZFN0cmVhbSlcbiAgICAgIHJldHVybiBmcyRSZWFkU3RyZWFtLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyksIHRoaXNcbiAgICBlbHNlXG4gICAgICByZXR1cm4gUmVhZFN0cmVhbS5hcHBseShPYmplY3QuY3JlYXRlKFJlYWRTdHJlYW0ucHJvdG90eXBlKSwgYXJndW1lbnRzKVxuICB9XG5cbiAgZnVuY3Rpb24gUmVhZFN0cmVhbSRvcGVuICgpIHtcbiAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICBvcGVuKHRoYXQucGF0aCwgdGhhdC5mbGFncywgdGhhdC5tb2RlLCBmdW5jdGlvbiAoZXJyLCBmZCkge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBpZiAodGhhdC5hdXRvQ2xvc2UpXG4gICAgICAgICAgdGhhdC5kZXN0cm95KClcblxuICAgICAgICB0aGF0LmVtaXQoJ2Vycm9yJywgZXJyKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhhdC5mZCA9IGZkXG4gICAgICAgIHRoYXQuZW1pdCgnb3BlbicsIGZkKVxuICAgICAgICB0aGF0LnJlYWQoKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBXcml0ZVN0cmVhbSAocGF0aCwgb3B0aW9ucykge1xuICAgIGlmICh0aGlzIGluc3RhbmNlb2YgV3JpdGVTdHJlYW0pXG4gICAgICByZXR1cm4gZnMkV3JpdGVTdHJlYW0uYXBwbHkodGhpcywgYXJndW1lbnRzKSwgdGhpc1xuICAgIGVsc2VcbiAgICAgIHJldHVybiBXcml0ZVN0cmVhbS5hcHBseShPYmplY3QuY3JlYXRlKFdyaXRlU3RyZWFtLnByb3RvdHlwZSksIGFyZ3VtZW50cylcbiAgfVxuXG4gIGZ1bmN0aW9uIFdyaXRlU3RyZWFtJG9wZW4gKCkge1xuICAgIHZhciB0aGF0ID0gdGhpc1xuICAgIG9wZW4odGhhdC5wYXRoLCB0aGF0LmZsYWdzLCB0aGF0Lm1vZGUsIGZ1bmN0aW9uIChlcnIsIGZkKSB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHRoYXQuZGVzdHJveSgpXG4gICAgICAgIHRoYXQuZW1pdCgnZXJyb3InLCBlcnIpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGF0LmZkID0gZmRcbiAgICAgICAgdGhhdC5lbWl0KCdvcGVuJywgZmQpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVJlYWRTdHJlYW0gKHBhdGgsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IGZzLlJlYWRTdHJlYW0ocGF0aCwgb3B0aW9ucylcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVdyaXRlU3RyZWFtIChwYXRoLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIG5ldyBmcy5Xcml0ZVN0cmVhbShwYXRoLCBvcHRpb25zKVxuICB9XG5cbiAgdmFyIGZzJG9wZW4gPSBmcy5vcGVuXG4gIGZzLm9wZW4gPSBvcGVuXG4gIGZ1bmN0aW9uIG9wZW4gKHBhdGgsIGZsYWdzLCBtb2RlLCBjYikge1xuICAgIGlmICh0eXBlb2YgbW9kZSA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgIGNiID0gbW9kZSwgbW9kZSA9IG51bGxcblxuICAgIHJldHVybiBnbyRvcGVuKHBhdGgsIGZsYWdzLCBtb2RlLCBjYilcblxuICAgIGZ1bmN0aW9uIGdvJG9wZW4gKHBhdGgsIGZsYWdzLCBtb2RlLCBjYikge1xuICAgICAgcmV0dXJuIGZzJG9wZW4ocGF0aCwgZmxhZ3MsIG1vZGUsIGZ1bmN0aW9uIChlcnIsIGZkKSB7XG4gICAgICAgIGlmIChlcnIgJiYgKGVyci5jb2RlID09PSAnRU1GSUxFJyB8fCBlcnIuY29kZSA9PT0gJ0VORklMRScpKVxuICAgICAgICAgIGVucXVldWUoW2dvJG9wZW4sIFtwYXRoLCBmbGFncywgbW9kZSwgY2JdXSlcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgIGNiLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICAgICAgICByZXRyeSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZzXG59XG5cbmZ1bmN0aW9uIGVucXVldWUgKGVsZW0pIHtcbiAgZGVidWcoJ0VOUVVFVUUnLCBlbGVtWzBdLm5hbWUsIGVsZW1bMV0pXG4gIGdsb2JhbFtncmFjZWZ1bFF1ZXVlXS5wdXNoKGVsZW0pXG59XG5cbmZ1bmN0aW9uIHJldHJ5ICgpIHtcbiAgdmFyIGVsZW0gPSBnbG9iYWxbZ3JhY2VmdWxRdWV1ZV0uc2hpZnQoKVxuICBpZiAoZWxlbSkge1xuICAgIGRlYnVnKCdSRVRSWScsIGVsZW1bMF0ubmFtZSwgZWxlbVsxXSlcbiAgICBlbGVtWzBdLmFwcGx5KG51bGwsIGVsZW1bMV0pXG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpOyIsInZhciBjb25zdGFudHMgPSByZXF1aXJlKCdjb25zdGFudHMnKVxuXG52YXIgb3JpZ0N3ZCA9IHByb2Nlc3MuY3dkXG52YXIgY3dkID0gbnVsbFxuXG52YXIgcGxhdGZvcm0gPSBwcm9jZXNzLmVudi5HUkFDRUZVTF9GU19QTEFURk9STSB8fCBwcm9jZXNzLnBsYXRmb3JtXG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24oKSB7XG4gIGlmICghY3dkKVxuICAgIGN3ZCA9IG9yaWdDd2QuY2FsbChwcm9jZXNzKVxuICByZXR1cm4gY3dkXG59XG50cnkge1xuICBwcm9jZXNzLmN3ZCgpXG59IGNhdGNoIChlcikge31cblxudmFyIGNoZGlyID0gcHJvY2Vzcy5jaGRpclxucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uKGQpIHtcbiAgY3dkID0gbnVsbFxuICBjaGRpci5jYWxsKHByb2Nlc3MsIGQpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gcGF0Y2hcblxuZnVuY3Rpb24gcGF0Y2ggKGZzKSB7XG4gIC8vIChyZS0paW1wbGVtZW50IHNvbWUgdGhpbmdzIHRoYXQgYXJlIGtub3duIGJ1c3RlZCBvciBtaXNzaW5nLlxuXG4gIC8vIGxjaG1vZCwgYnJva2VuIHByaW9yIHRvIDAuNi4yXG4gIC8vIGJhY2stcG9ydCB0aGUgZml4IGhlcmUuXG4gIGlmIChjb25zdGFudHMuaGFzT3duUHJvcGVydHkoJ09fU1lNTElOSycpICYmXG4gICAgICBwcm9jZXNzLnZlcnNpb24ubWF0Y2goL152MFxcLjZcXC5bMC0yXXxedjBcXC41XFwuLykpIHtcbiAgICBwYXRjaExjaG1vZChmcylcbiAgfVxuXG4gIC8vIGx1dGltZXMgaW1wbGVtZW50YXRpb24sIG9yIG5vLW9wXG4gIGlmICghZnMubHV0aW1lcykge1xuICAgIHBhdGNoTHV0aW1lcyhmcylcbiAgfVxuXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9pc2FhY3Mvbm9kZS1ncmFjZWZ1bC1mcy9pc3N1ZXMvNFxuICAvLyBDaG93biBzaG91bGQgbm90IGZhaWwgb24gZWludmFsIG9yIGVwZXJtIGlmIG5vbi1yb290LlxuICAvLyBJdCBzaG91bGQgbm90IGZhaWwgb24gZW5vc3lzIGV2ZXIsIGFzIHRoaXMganVzdCBpbmRpY2F0ZXNcbiAgLy8gdGhhdCBhIGZzIGRvZXNuJ3Qgc3VwcG9ydCB0aGUgaW50ZW5kZWQgb3BlcmF0aW9uLlxuXG4gIGZzLmNob3duID0gY2hvd25GaXgoZnMuY2hvd24pXG4gIGZzLmZjaG93biA9IGNob3duRml4KGZzLmZjaG93bilcbiAgZnMubGNob3duID0gY2hvd25GaXgoZnMubGNob3duKVxuXG4gIGZzLmNobW9kID0gY2htb2RGaXgoZnMuY2htb2QpXG4gIGZzLmZjaG1vZCA9IGNobW9kRml4KGZzLmZjaG1vZClcbiAgZnMubGNobW9kID0gY2htb2RGaXgoZnMubGNobW9kKVxuXG4gIGZzLmNob3duU3luYyA9IGNob3duRml4U3luYyhmcy5jaG93blN5bmMpXG4gIGZzLmZjaG93blN5bmMgPSBjaG93bkZpeFN5bmMoZnMuZmNob3duU3luYylcbiAgZnMubGNob3duU3luYyA9IGNob3duRml4U3luYyhmcy5sY2hvd25TeW5jKVxuXG4gIGZzLmNobW9kU3luYyA9IGNobW9kRml4U3luYyhmcy5jaG1vZFN5bmMpXG4gIGZzLmZjaG1vZFN5bmMgPSBjaG1vZEZpeFN5bmMoZnMuZmNobW9kU3luYylcbiAgZnMubGNobW9kU3luYyA9IGNobW9kRml4U3luYyhmcy5sY2htb2RTeW5jKVxuXG4gIGZzLnN0YXQgPSBzdGF0Rml4KGZzLnN0YXQpXG4gIGZzLmZzdGF0ID0gc3RhdEZpeChmcy5mc3RhdClcbiAgZnMubHN0YXQgPSBzdGF0Rml4KGZzLmxzdGF0KVxuXG4gIGZzLnN0YXRTeW5jID0gc3RhdEZpeFN5bmMoZnMuc3RhdFN5bmMpXG4gIGZzLmZzdGF0U3luYyA9IHN0YXRGaXhTeW5jKGZzLmZzdGF0U3luYylcbiAgZnMubHN0YXRTeW5jID0gc3RhdEZpeFN5bmMoZnMubHN0YXRTeW5jKVxuXG4gIC8vIGlmIGxjaG1vZC9sY2hvd24gZG8gbm90IGV4aXN0LCB0aGVuIG1ha2UgdGhlbSBuby1vcHNcbiAgaWYgKCFmcy5sY2htb2QpIHtcbiAgICBmcy5sY2htb2QgPSBmdW5jdGlvbiAocGF0aCwgbW9kZSwgY2IpIHtcbiAgICAgIGlmIChjYikgcHJvY2Vzcy5uZXh0VGljayhjYilcbiAgICB9XG4gICAgZnMubGNobW9kU3luYyA9IGZ1bmN0aW9uICgpIHt9XG4gIH1cbiAgaWYgKCFmcy5sY2hvd24pIHtcbiAgICBmcy5sY2hvd24gPSBmdW5jdGlvbiAocGF0aCwgdWlkLCBnaWQsIGNiKSB7XG4gICAgICBpZiAoY2IpIHByb2Nlc3MubmV4dFRpY2soY2IpXG4gICAgfVxuICAgIGZzLmxjaG93blN5bmMgPSBmdW5jdGlvbiAoKSB7fVxuICB9XG5cbiAgLy8gb24gV2luZG93cywgQS9WIHNvZnR3YXJlIGNhbiBsb2NrIHRoZSBkaXJlY3RvcnksIGNhdXNpbmcgdGhpc1xuICAvLyB0byBmYWlsIHdpdGggYW4gRUFDQ0VTIG9yIEVQRVJNIGlmIHRoZSBkaXJlY3RvcnkgY29udGFpbnMgbmV3bHlcbiAgLy8gY3JlYXRlZCBmaWxlcy4gIFRyeSBhZ2FpbiBvbiBmYWlsdXJlLCBmb3IgdXAgdG8gNjAgc2Vjb25kcy5cblxuICAvLyBTZXQgdGhlIHRpbWVvdXQgdGhpcyBsb25nIGJlY2F1c2Ugc29tZSBXaW5kb3dzIEFudGktVmlydXMsIHN1Y2ggYXMgUGFyaXR5XG4gIC8vIGJpdDksIG1heSBsb2NrIGZpbGVzIGZvciB1cCB0byBhIG1pbnV0ZSwgY2F1c2luZyBucG0gcGFja2FnZSBpbnN0YWxsXG4gIC8vIGZhaWx1cmVzLiBBbHNvLCB0YWtlIGNhcmUgdG8geWllbGQgdGhlIHNjaGVkdWxlci4gV2luZG93cyBzY2hlZHVsaW5nIGdpdmVzXG4gIC8vIENQVSB0byBhIGJ1c3kgbG9vcGluZyBwcm9jZXNzLCB3aGljaCBjYW4gY2F1c2UgdGhlIHByb2dyYW0gY2F1c2luZyB0aGUgbG9ja1xuICAvLyBjb250ZW50aW9uIHRvIGJlIHN0YXJ2ZWQgb2YgQ1BVIGJ5IG5vZGUsIHNvIHRoZSBjb250ZW50aW9uIGRvZXNuJ3QgcmVzb2x2ZS5cbiAgaWYgKHBsYXRmb3JtID09PSBcIndpbjMyXCIpIHtcbiAgICBmcy5yZW5hbWUgPSAoZnVuY3Rpb24gKGZzJHJlbmFtZSkgeyByZXR1cm4gZnVuY3Rpb24gKGZyb20sIHRvLCBjYikge1xuICAgICAgdmFyIHN0YXJ0ID0gRGF0ZS5ub3coKVxuICAgICAgdmFyIGJhY2tvZmYgPSAwO1xuICAgICAgZnMkcmVuYW1lKGZyb20sIHRvLCBmdW5jdGlvbiBDQiAoZXIpIHtcbiAgICAgICAgaWYgKGVyXG4gICAgICAgICAgICAmJiAoZXIuY29kZSA9PT0gXCJFQUNDRVNcIiB8fCBlci5jb2RlID09PSBcIkVQRVJNXCIpXG4gICAgICAgICAgICAmJiBEYXRlLm5vdygpIC0gc3RhcnQgPCA2MDAwMCkge1xuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBmcy5zdGF0KHRvLCBmdW5jdGlvbiAoc3RhdGVyLCBzdCkge1xuICAgICAgICAgICAgICBpZiAoc3RhdGVyICYmIHN0YXRlci5jb2RlID09PSBcIkVOT0VOVFwiKVxuICAgICAgICAgICAgICAgIGZzJHJlbmFtZShmcm9tLCB0bywgQ0IpO1xuICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgY2IoZXIpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0sIGJhY2tvZmYpXG4gICAgICAgICAgaWYgKGJhY2tvZmYgPCAxMDApXG4gICAgICAgICAgICBiYWNrb2ZmICs9IDEwO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2IpIGNiKGVyKVxuICAgICAgfSlcbiAgICB9fSkoZnMucmVuYW1lKVxuICB9XG5cbiAgLy8gaWYgcmVhZCgpIHJldHVybnMgRUFHQUlOLCB0aGVuIGp1c3QgdHJ5IGl0IGFnYWluLlxuICBmcy5yZWFkID0gKGZ1bmN0aW9uIChmcyRyZWFkKSB7XG4gICAgZnVuY3Rpb24gcmVhZCAoZmQsIGJ1ZmZlciwgb2Zmc2V0LCBsZW5ndGgsIHBvc2l0aW9uLCBjYWxsYmFja18pIHtcbiAgICAgIHZhciBjYWxsYmFja1xuICAgICAgaWYgKGNhbGxiYWNrXyAmJiB0eXBlb2YgY2FsbGJhY2tfID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHZhciBlYWdDb3VudGVyID0gMFxuICAgICAgICBjYWxsYmFjayA9IGZ1bmN0aW9uIChlciwgXywgX18pIHtcbiAgICAgICAgICBpZiAoZXIgJiYgZXIuY29kZSA9PT0gJ0VBR0FJTicgJiYgZWFnQ291bnRlciA8IDEwKSB7XG4gICAgICAgICAgICBlYWdDb3VudGVyICsrXG4gICAgICAgICAgICByZXR1cm4gZnMkcmVhZC5jYWxsKGZzLCBmZCwgYnVmZmVyLCBvZmZzZXQsIGxlbmd0aCwgcG9zaXRpb24sIGNhbGxiYWNrKVxuICAgICAgICAgIH1cbiAgICAgICAgICBjYWxsYmFja18uYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZnMkcmVhZC5jYWxsKGZzLCBmZCwgYnVmZmVyLCBvZmZzZXQsIGxlbmd0aCwgcG9zaXRpb24sIGNhbGxiYWNrKVxuICAgIH1cblxuICAgIC8vIFRoaXMgZW5zdXJlcyBgdXRpbC5wcm9taXNpZnlgIHdvcmtzIGFzIGl0IGRvZXMgZm9yIG5hdGl2ZSBgZnMucmVhZGAuXG4gICAgcmVhZC5fX3Byb3RvX18gPSBmcyRyZWFkXG4gICAgcmV0dXJuIHJlYWRcbiAgfSkoZnMucmVhZClcblxuICBmcy5yZWFkU3luYyA9IChmdW5jdGlvbiAoZnMkcmVhZFN5bmMpIHsgcmV0dXJuIGZ1bmN0aW9uIChmZCwgYnVmZmVyLCBvZmZzZXQsIGxlbmd0aCwgcG9zaXRpb24pIHtcbiAgICB2YXIgZWFnQ291bnRlciA9IDBcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGZzJHJlYWRTeW5jLmNhbGwoZnMsIGZkLCBidWZmZXIsIG9mZnNldCwgbGVuZ3RoLCBwb3NpdGlvbilcbiAgICAgIH0gY2F0Y2ggKGVyKSB7XG4gICAgICAgIGlmIChlci5jb2RlID09PSAnRUFHQUlOJyAmJiBlYWdDb3VudGVyIDwgMTApIHtcbiAgICAgICAgICBlYWdDb3VudGVyICsrXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBlclxuICAgICAgfVxuICAgIH1cbiAgfX0pKGZzLnJlYWRTeW5jKVxuXG4gIGZ1bmN0aW9uIHBhdGNoTGNobW9kIChmcykge1xuICAgIGZzLmxjaG1vZCA9IGZ1bmN0aW9uIChwYXRoLCBtb2RlLCBjYWxsYmFjaykge1xuICAgICAgZnMub3BlbiggcGF0aFxuICAgICAgICAgICAgICwgY29uc3RhbnRzLk9fV1JPTkxZIHwgY29uc3RhbnRzLk9fU1lNTElOS1xuICAgICAgICAgICAgICwgbW9kZVxuICAgICAgICAgICAgICwgZnVuY3Rpb24gKGVyciwgZmQpIHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soZXJyKVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIC8vIHByZWZlciB0byByZXR1cm4gdGhlIGNobW9kIGVycm9yLCBpZiBvbmUgb2NjdXJzLFxuICAgICAgICAvLyBidXQgc3RpbGwgdHJ5IHRvIGNsb3NlLCBhbmQgcmVwb3J0IGNsb3NpbmcgZXJyb3JzIGlmIHRoZXkgb2NjdXIuXG4gICAgICAgIGZzLmZjaG1vZChmZCwgbW9kZSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIGZzLmNsb3NlKGZkLCBmdW5jdGlvbihlcnIyKSB7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKGVyciB8fCBlcnIyKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIGZzLmxjaG1vZFN5bmMgPSBmdW5jdGlvbiAocGF0aCwgbW9kZSkge1xuICAgICAgdmFyIGZkID0gZnMub3BlblN5bmMocGF0aCwgY29uc3RhbnRzLk9fV1JPTkxZIHwgY29uc3RhbnRzLk9fU1lNTElOSywgbW9kZSlcblxuICAgICAgLy8gcHJlZmVyIHRvIHJldHVybiB0aGUgY2htb2QgZXJyb3IsIGlmIG9uZSBvY2N1cnMsXG4gICAgICAvLyBidXQgc3RpbGwgdHJ5IHRvIGNsb3NlLCBhbmQgcmVwb3J0IGNsb3NpbmcgZXJyb3JzIGlmIHRoZXkgb2NjdXIuXG4gICAgICB2YXIgdGhyZXcgPSB0cnVlXG4gICAgICB2YXIgcmV0XG4gICAgICB0cnkge1xuICAgICAgICByZXQgPSBmcy5mY2htb2RTeW5jKGZkLCBtb2RlKVxuICAgICAgICB0aHJldyA9IGZhbHNlXG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAodGhyZXcpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgZnMuY2xvc2VTeW5jKGZkKVxuICAgICAgICAgIH0gY2F0Y2ggKGVyKSB7fVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZzLmNsb3NlU3luYyhmZClcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJldFxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBhdGNoTHV0aW1lcyAoZnMpIHtcbiAgICBpZiAoY29uc3RhbnRzLmhhc093blByb3BlcnR5KFwiT19TWU1MSU5LXCIpKSB7XG4gICAgICBmcy5sdXRpbWVzID0gZnVuY3Rpb24gKHBhdGgsIGF0LCBtdCwgY2IpIHtcbiAgICAgICAgZnMub3BlbihwYXRoLCBjb25zdGFudHMuT19TWU1MSU5LLCBmdW5jdGlvbiAoZXIsIGZkKSB7XG4gICAgICAgICAgaWYgKGVyKSB7XG4gICAgICAgICAgICBpZiAoY2IpIGNiKGVyKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgfVxuICAgICAgICAgIGZzLmZ1dGltZXMoZmQsIGF0LCBtdCwgZnVuY3Rpb24gKGVyKSB7XG4gICAgICAgICAgICBmcy5jbG9zZShmZCwgZnVuY3Rpb24gKGVyMikge1xuICAgICAgICAgICAgICBpZiAoY2IpIGNiKGVyIHx8IGVyMilcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgZnMubHV0aW1lc1N5bmMgPSBmdW5jdGlvbiAocGF0aCwgYXQsIG10KSB7XG4gICAgICAgIHZhciBmZCA9IGZzLm9wZW5TeW5jKHBhdGgsIGNvbnN0YW50cy5PX1NZTUxJTkspXG4gICAgICAgIHZhciByZXRcbiAgICAgICAgdmFyIHRocmV3ID0gdHJ1ZVxuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldCA9IGZzLmZ1dGltZXNTeW5jKGZkLCBhdCwgbXQpXG4gICAgICAgICAgdGhyZXcgPSBmYWxzZVxuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIGlmICh0aHJldykge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgZnMuY2xvc2VTeW5jKGZkKVxuICAgICAgICAgICAgfSBjYXRjaCAoZXIpIHt9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZzLmNsb3NlU3luYyhmZClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldFxuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIGZzLmx1dGltZXMgPSBmdW5jdGlvbiAoX2EsIF9iLCBfYywgY2IpIHsgaWYgKGNiKSBwcm9jZXNzLm5leHRUaWNrKGNiKSB9XG4gICAgICBmcy5sdXRpbWVzU3luYyA9IGZ1bmN0aW9uICgpIHt9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2htb2RGaXggKG9yaWcpIHtcbiAgICBpZiAoIW9yaWcpIHJldHVybiBvcmlnXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIG1vZGUsIGNiKSB7XG4gICAgICByZXR1cm4gb3JpZy5jYWxsKGZzLCB0YXJnZXQsIG1vZGUsIGZ1bmN0aW9uIChlcikge1xuICAgICAgICBpZiAoY2hvd25Fck9rKGVyKSkgZXIgPSBudWxsXG4gICAgICAgIGlmIChjYikgY2IuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjaG1vZEZpeFN5bmMgKG9yaWcpIHtcbiAgICBpZiAoIW9yaWcpIHJldHVybiBvcmlnXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIG1vZGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBvcmlnLmNhbGwoZnMsIHRhcmdldCwgbW9kZSlcbiAgICAgIH0gY2F0Y2ggKGVyKSB7XG4gICAgICAgIGlmICghY2hvd25Fck9rKGVyKSkgdGhyb3cgZXJcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuXG4gIGZ1bmN0aW9uIGNob3duRml4IChvcmlnKSB7XG4gICAgaWYgKCFvcmlnKSByZXR1cm4gb3JpZ1xuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCB1aWQsIGdpZCwgY2IpIHtcbiAgICAgIHJldHVybiBvcmlnLmNhbGwoZnMsIHRhcmdldCwgdWlkLCBnaWQsIGZ1bmN0aW9uIChlcikge1xuICAgICAgICBpZiAoY2hvd25Fck9rKGVyKSkgZXIgPSBudWxsXG4gICAgICAgIGlmIChjYikgY2IuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjaG93bkZpeFN5bmMgKG9yaWcpIHtcbiAgICBpZiAoIW9yaWcpIHJldHVybiBvcmlnXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIHVpZCwgZ2lkKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gb3JpZy5jYWxsKGZzLCB0YXJnZXQsIHVpZCwgZ2lkKVxuICAgICAgfSBjYXRjaCAoZXIpIHtcbiAgICAgICAgaWYgKCFjaG93bkVyT2soZXIpKSB0aHJvdyBlclxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXRGaXggKG9yaWcpIHtcbiAgICBpZiAoIW9yaWcpIHJldHVybiBvcmlnXG4gICAgLy8gT2xkZXIgdmVyc2lvbnMgb2YgTm9kZSBlcnJvbmVvdXNseSByZXR1cm5lZCBzaWduZWQgaW50ZWdlcnMgZm9yXG4gICAgLy8gdWlkICsgZ2lkLlxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBvcHRpb25zLCBjYikge1xuICAgICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNiID0gb3B0aW9uc1xuICAgICAgICBvcHRpb25zID0gbnVsbFxuICAgICAgfVxuICAgICAgZnVuY3Rpb24gY2FsbGJhY2sgKGVyLCBzdGF0cykge1xuICAgICAgICBpZiAoc3RhdHMpIHtcbiAgICAgICAgICBpZiAoc3RhdHMudWlkIDwgMCkgc3RhdHMudWlkICs9IDB4MTAwMDAwMDAwXG4gICAgICAgICAgaWYgKHN0YXRzLmdpZCA8IDApIHN0YXRzLmdpZCArPSAweDEwMDAwMDAwMFxuICAgICAgICB9XG4gICAgICAgIGlmIChjYikgY2IuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgICAgfVxuICAgICAgcmV0dXJuIG9wdGlvbnMgPyBvcmlnLmNhbGwoZnMsIHRhcmdldCwgb3B0aW9ucywgY2FsbGJhY2spXG4gICAgICAgIDogb3JpZy5jYWxsKGZzLCB0YXJnZXQsIGNhbGxiYWNrKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXRGaXhTeW5jIChvcmlnKSB7XG4gICAgaWYgKCFvcmlnKSByZXR1cm4gb3JpZ1xuICAgIC8vIE9sZGVyIHZlcnNpb25zIG9mIE5vZGUgZXJyb25lb3VzbHkgcmV0dXJuZWQgc2lnbmVkIGludGVnZXJzIGZvclxuICAgIC8vIHVpZCArIGdpZC5cbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwgb3B0aW9ucykge1xuICAgICAgdmFyIHN0YXRzID0gb3B0aW9ucyA/IG9yaWcuY2FsbChmcywgdGFyZ2V0LCBvcHRpb25zKVxuICAgICAgICA6IG9yaWcuY2FsbChmcywgdGFyZ2V0KVxuICAgICAgaWYgKHN0YXRzLnVpZCA8IDApIHN0YXRzLnVpZCArPSAweDEwMDAwMDAwMFxuICAgICAgaWYgKHN0YXRzLmdpZCA8IDApIHN0YXRzLmdpZCArPSAweDEwMDAwMDAwMFxuICAgICAgcmV0dXJuIHN0YXRzO1xuICAgIH1cbiAgfVxuXG4gIC8vIEVOT1NZUyBtZWFucyB0aGF0IHRoZSBmcyBkb2Vzbid0IHN1cHBvcnQgdGhlIG9wLiBKdXN0IGlnbm9yZVxuICAvLyB0aGF0LCBiZWNhdXNlIGl0IGRvZXNuJ3QgbWF0dGVyLlxuICAvL1xuICAvLyBpZiB0aGVyZSdzIG5vIGdldHVpZCwgb3IgaWYgZ2V0dWlkKCkgaXMgc29tZXRoaW5nIG90aGVyXG4gIC8vIHRoYW4gMCwgYW5kIHRoZSBlcnJvciBpcyBFSU5WQUwgb3IgRVBFUk0sIHRoZW4ganVzdCBpZ25vcmVcbiAgLy8gaXQuXG4gIC8vXG4gIC8vIFRoaXMgc3BlY2lmaWMgY2FzZSBpcyBhIHNpbGVudCBmYWlsdXJlIGluIGNwLCBpbnN0YWxsLCB0YXIsXG4gIC8vIGFuZCBtb3N0IG90aGVyIHVuaXggdG9vbHMgdGhhdCBtYW5hZ2UgcGVybWlzc2lvbnMuXG4gIC8vXG4gIC8vIFdoZW4gcnVubmluZyBhcyByb290LCBvciBpZiBvdGhlciB0eXBlcyBvZiBlcnJvcnMgYXJlXG4gIC8vIGVuY291bnRlcmVkLCB0aGVuIGl0J3Mgc3RyaWN0LlxuICBmdW5jdGlvbiBjaG93bkVyT2sgKGVyKSB7XG4gICAgaWYgKCFlcilcbiAgICAgIHJldHVybiB0cnVlXG5cbiAgICBpZiAoZXIuY29kZSA9PT0gXCJFTk9TWVNcIilcbiAgICAgIHJldHVybiB0cnVlXG5cbiAgICB2YXIgbm9ucm9vdCA9ICFwcm9jZXNzLmdldHVpZCB8fCBwcm9jZXNzLmdldHVpZCgpICE9PSAwXG4gICAgaWYgKG5vbnJvb3QpIHtcbiAgICAgIGlmIChlci5jb2RlID09PSBcIkVJTlZBTFwiIHx8IGVyLmNvZGUgPT09IFwiRVBFUk1cIilcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29uc3RhbnRzXCIpOyIsInZhciBTdHJlYW0gPSByZXF1aXJlKCdzdHJlYW0nKS5TdHJlYW1cblxubW9kdWxlLmV4cG9ydHMgPSBsZWdhY3lcblxuZnVuY3Rpb24gbGVnYWN5IChmcykge1xuICByZXR1cm4ge1xuICAgIFJlYWRTdHJlYW06IFJlYWRTdHJlYW0sXG4gICAgV3JpdGVTdHJlYW06IFdyaXRlU3RyZWFtXG4gIH1cblxuICBmdW5jdGlvbiBSZWFkU3RyZWFtIChwYXRoLCBvcHRpb25zKSB7XG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFJlYWRTdHJlYW0pKSByZXR1cm4gbmV3IFJlYWRTdHJlYW0ocGF0aCwgb3B0aW9ucyk7XG5cbiAgICBTdHJlYW0uY2FsbCh0aGlzKTtcblxuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHRoaXMucGF0aCA9IHBhdGg7XG4gICAgdGhpcy5mZCA9IG51bGw7XG4gICAgdGhpcy5yZWFkYWJsZSA9IHRydWU7XG4gICAgdGhpcy5wYXVzZWQgPSBmYWxzZTtcblxuICAgIHRoaXMuZmxhZ3MgPSAncic7XG4gICAgdGhpcy5tb2RlID0gNDM4OyAvKj0wNjY2Ki9cbiAgICB0aGlzLmJ1ZmZlclNpemUgPSA2NCAqIDEwMjQ7XG5cbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIC8vIE1peGluIG9wdGlvbnMgaW50byB0aGlzXG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvcHRpb25zKTtcbiAgICBmb3IgKHZhciBpbmRleCA9IDAsIGxlbmd0aCA9IGtleXMubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9IGtleXNbaW5kZXhdO1xuICAgICAgdGhpc1trZXldID0gb3B0aW9uc1trZXldO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmVuY29kaW5nKSB0aGlzLnNldEVuY29kaW5nKHRoaXMuZW5jb2RpbmcpO1xuXG4gICAgaWYgKHRoaXMuc3RhcnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKCdudW1iZXInICE9PSB0eXBlb2YgdGhpcy5zdGFydCkge1xuICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ3N0YXJ0IG11c3QgYmUgYSBOdW1iZXInKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmVuZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuZW5kID0gSW5maW5pdHk7XG4gICAgICB9IGVsc2UgaWYgKCdudW1iZXInICE9PSB0eXBlb2YgdGhpcy5lbmQpIHtcbiAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdlbmQgbXVzdCBiZSBhIE51bWJlcicpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5zdGFydCA+IHRoaXMuZW5kKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignc3RhcnQgbXVzdCBiZSA8PSBlbmQnKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5wb3MgPSB0aGlzLnN0YXJ0O1xuICAgIH1cblxuICAgIGlmICh0aGlzLmZkICE9PSBudWxsKSB7XG4gICAgICBwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICBzZWxmLl9yZWFkKCk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmcy5vcGVuKHRoaXMucGF0aCwgdGhpcy5mbGFncywgdGhpcy5tb2RlLCBmdW5jdGlvbiAoZXJyLCBmZCkge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBzZWxmLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgICAgICAgc2VsZi5yZWFkYWJsZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHNlbGYuZmQgPSBmZDtcbiAgICAgIHNlbGYuZW1pdCgnb3BlbicsIGZkKTtcbiAgICAgIHNlbGYuX3JlYWQoKTtcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gV3JpdGVTdHJlYW0gKHBhdGgsIG9wdGlvbnMpIHtcbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgV3JpdGVTdHJlYW0pKSByZXR1cm4gbmV3IFdyaXRlU3RyZWFtKHBhdGgsIG9wdGlvbnMpO1xuXG4gICAgU3RyZWFtLmNhbGwodGhpcyk7XG5cbiAgICB0aGlzLnBhdGggPSBwYXRoO1xuICAgIHRoaXMuZmQgPSBudWxsO1xuICAgIHRoaXMud3JpdGFibGUgPSB0cnVlO1xuXG4gICAgdGhpcy5mbGFncyA9ICd3JztcbiAgICB0aGlzLmVuY29kaW5nID0gJ2JpbmFyeSc7XG4gICAgdGhpcy5tb2RlID0gNDM4OyAvKj0wNjY2Ki9cbiAgICB0aGlzLmJ5dGVzV3JpdHRlbiA9IDA7XG5cbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIC8vIE1peGluIG9wdGlvbnMgaW50byB0aGlzXG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvcHRpb25zKTtcbiAgICBmb3IgKHZhciBpbmRleCA9IDAsIGxlbmd0aCA9IGtleXMubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9IGtleXNbaW5kZXhdO1xuICAgICAgdGhpc1trZXldID0gb3B0aW9uc1trZXldO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnN0YXJ0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICgnbnVtYmVyJyAhPT0gdHlwZW9mIHRoaXMuc3RhcnQpIHtcbiAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdzdGFydCBtdXN0IGJlIGEgTnVtYmVyJyk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5zdGFydCA8IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdzdGFydCBtdXN0IGJlID49IHplcm8nKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5wb3MgPSB0aGlzLnN0YXJ0O1xuICAgIH1cblxuICAgIHRoaXMuYnVzeSA9IGZhbHNlO1xuICAgIHRoaXMuX3F1ZXVlID0gW107XG5cbiAgICBpZiAodGhpcy5mZCA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5fb3BlbiA9IGZzLm9wZW47XG4gICAgICB0aGlzLl9xdWV1ZS5wdXNoKFt0aGlzLl9vcGVuLCB0aGlzLnBhdGgsIHRoaXMuZmxhZ3MsIHRoaXMubW9kZSwgdW5kZWZpbmVkXSk7XG4gICAgICB0aGlzLmZsdXNoKCk7XG4gICAgfVxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzdHJlYW1cIik7IiwiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gY2xvbmVcblxuZnVuY3Rpb24gY2xvbmUgKG9iaikge1xuICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogIT09ICdvYmplY3QnKVxuICAgIHJldHVybiBvYmpcblxuICBpZiAob2JqIGluc3RhbmNlb2YgT2JqZWN0KVxuICAgIHZhciBjb3B5ID0geyBfX3Byb3RvX186IG9iai5fX3Byb3RvX18gfVxuICBlbHNlXG4gICAgdmFyIGNvcHkgPSBPYmplY3QuY3JlYXRlKG51bGwpXG5cbiAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29weSwga2V5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KSlcbiAgfSlcblxuICByZXR1cm4gY29weVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXRpbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhc3NlcnRcIik7IiwiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBjb3B5U3luYzogcmVxdWlyZSgnLi9jb3B5LXN5bmMnKVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGZzID0gcmVxdWlyZSgnZ3JhY2VmdWwtZnMnKVxuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuY29uc3QgbWtkaXJwU3luYyA9IHJlcXVpcmUoJy4uL21rZGlycycpLm1rZGlyc1N5bmNcbmNvbnN0IHV0aW1lc1N5bmMgPSByZXF1aXJlKCcuLi91dGlsL3V0aW1lcy5qcycpLnV0aW1lc01pbGxpc1N5bmNcbmNvbnN0IHN0YXQgPSByZXF1aXJlKCcuLi91dGlsL3N0YXQnKVxuXG5mdW5jdGlvbiBjb3B5U3luYyAoc3JjLCBkZXN0LCBvcHRzKSB7XG4gIGlmICh0eXBlb2Ygb3B0cyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIG9wdHMgPSB7IGZpbHRlcjogb3B0cyB9XG4gIH1cblxuICBvcHRzID0gb3B0cyB8fCB7fVxuICBvcHRzLmNsb2JiZXIgPSAnY2xvYmJlcicgaW4gb3B0cyA/ICEhb3B0cy5jbG9iYmVyIDogdHJ1ZSAvLyBkZWZhdWx0IHRvIHRydWUgZm9yIG5vd1xuICBvcHRzLm92ZXJ3cml0ZSA9ICdvdmVyd3JpdGUnIGluIG9wdHMgPyAhIW9wdHMub3ZlcndyaXRlIDogb3B0cy5jbG9iYmVyIC8vIG92ZXJ3cml0ZSBmYWxscyBiYWNrIHRvIGNsb2JiZXJcblxuICAvLyBXYXJuIGFib3V0IHVzaW5nIHByZXNlcnZlVGltZXN0YW1wcyBvbiAzMi1iaXQgbm9kZVxuICBpZiAob3B0cy5wcmVzZXJ2ZVRpbWVzdGFtcHMgJiYgcHJvY2Vzcy5hcmNoID09PSAnaWEzMicpIHtcbiAgICBjb25zb2xlLndhcm4oYGZzLWV4dHJhOiBVc2luZyB0aGUgcHJlc2VydmVUaW1lc3RhbXBzIG9wdGlvbiBpbiAzMi1iaXQgbm9kZSBpcyBub3QgcmVjb21tZW5kZWQ7XFxuXG4gICAgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qcHJpY2hhcmRzb24vbm9kZS1mcy1leHRyYS9pc3N1ZXMvMjY5YClcbiAgfVxuXG4gIGNvbnN0IHsgc3JjU3RhdCwgZGVzdFN0YXQgfSA9IHN0YXQuY2hlY2tQYXRoc1N5bmMoc3JjLCBkZXN0LCAnY29weScpXG4gIHN0YXQuY2hlY2tQYXJlbnRQYXRoc1N5bmMoc3JjLCBzcmNTdGF0LCBkZXN0LCAnY29weScpXG4gIHJldHVybiBoYW5kbGVGaWx0ZXJBbmRDb3B5KGRlc3RTdGF0LCBzcmMsIGRlc3QsIG9wdHMpXG59XG5cbmZ1bmN0aW9uIGhhbmRsZUZpbHRlckFuZENvcHkgKGRlc3RTdGF0LCBzcmMsIGRlc3QsIG9wdHMpIHtcbiAgaWYgKG9wdHMuZmlsdGVyICYmICFvcHRzLmZpbHRlcihzcmMsIGRlc3QpKSByZXR1cm5cbiAgY29uc3QgZGVzdFBhcmVudCA9IHBhdGguZGlybmFtZShkZXN0KVxuICBpZiAoIWZzLmV4aXN0c1N5bmMoZGVzdFBhcmVudCkpIG1rZGlycFN5bmMoZGVzdFBhcmVudClcbiAgcmV0dXJuIHN0YXJ0Q29weShkZXN0U3RhdCwgc3JjLCBkZXN0LCBvcHRzKVxufVxuXG5mdW5jdGlvbiBzdGFydENvcHkgKGRlc3RTdGF0LCBzcmMsIGRlc3QsIG9wdHMpIHtcbiAgaWYgKG9wdHMuZmlsdGVyICYmICFvcHRzLmZpbHRlcihzcmMsIGRlc3QpKSByZXR1cm5cbiAgcmV0dXJuIGdldFN0YXRzKGRlc3RTdGF0LCBzcmMsIGRlc3QsIG9wdHMpXG59XG5cbmZ1bmN0aW9uIGdldFN0YXRzIChkZXN0U3RhdCwgc3JjLCBkZXN0LCBvcHRzKSB7XG4gIGNvbnN0IHN0YXRTeW5jID0gb3B0cy5kZXJlZmVyZW5jZSA/IGZzLnN0YXRTeW5jIDogZnMubHN0YXRTeW5jXG4gIGNvbnN0IHNyY1N0YXQgPSBzdGF0U3luYyhzcmMpXG5cbiAgaWYgKHNyY1N0YXQuaXNEaXJlY3RvcnkoKSkgcmV0dXJuIG9uRGlyKHNyY1N0YXQsIGRlc3RTdGF0LCBzcmMsIGRlc3QsIG9wdHMpXG4gIGVsc2UgaWYgKHNyY1N0YXQuaXNGaWxlKCkgfHxcbiAgICAgICAgICAgc3JjU3RhdC5pc0NoYXJhY3RlckRldmljZSgpIHx8XG4gICAgICAgICAgIHNyY1N0YXQuaXNCbG9ja0RldmljZSgpKSByZXR1cm4gb25GaWxlKHNyY1N0YXQsIGRlc3RTdGF0LCBzcmMsIGRlc3QsIG9wdHMpXG4gIGVsc2UgaWYgKHNyY1N0YXQuaXNTeW1ib2xpY0xpbmsoKSkgcmV0dXJuIG9uTGluayhkZXN0U3RhdCwgc3JjLCBkZXN0LCBvcHRzKVxufVxuXG5mdW5jdGlvbiBvbkZpbGUgKHNyY1N0YXQsIGRlc3RTdGF0LCBzcmMsIGRlc3QsIG9wdHMpIHtcbiAgaWYgKCFkZXN0U3RhdCkgcmV0dXJuIGNvcHlGaWxlKHNyY1N0YXQsIHNyYywgZGVzdCwgb3B0cylcbiAgcmV0dXJuIG1heUNvcHlGaWxlKHNyY1N0YXQsIHNyYywgZGVzdCwgb3B0cylcbn1cblxuZnVuY3Rpb24gbWF5Q29weUZpbGUgKHNyY1N0YXQsIHNyYywgZGVzdCwgb3B0cykge1xuICBpZiAob3B0cy5vdmVyd3JpdGUpIHtcbiAgICBmcy51bmxpbmtTeW5jKGRlc3QpXG4gICAgcmV0dXJuIGNvcHlGaWxlKHNyY1N0YXQsIHNyYywgZGVzdCwgb3B0cylcbiAgfSBlbHNlIGlmIChvcHRzLmVycm9yT25FeGlzdCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgJyR7ZGVzdH0nIGFscmVhZHkgZXhpc3RzYClcbiAgfVxufVxuXG5mdW5jdGlvbiBjb3B5RmlsZSAoc3JjU3RhdCwgc3JjLCBkZXN0LCBvcHRzKSB7XG4gIGlmICh0eXBlb2YgZnMuY29weUZpbGVTeW5jID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZnMuY29weUZpbGVTeW5jKHNyYywgZGVzdClcbiAgICBmcy5jaG1vZFN5bmMoZGVzdCwgc3JjU3RhdC5tb2RlKVxuICAgIGlmIChvcHRzLnByZXNlcnZlVGltZXN0YW1wcykge1xuICAgICAgcmV0dXJuIHV0aW1lc1N5bmMoZGVzdCwgc3JjU3RhdC5hdGltZSwgc3JjU3RhdC5tdGltZSlcbiAgICB9XG4gICAgcmV0dXJuXG4gIH1cbiAgcmV0dXJuIGNvcHlGaWxlRmFsbGJhY2soc3JjU3RhdCwgc3JjLCBkZXN0LCBvcHRzKVxufVxuXG5mdW5jdGlvbiBjb3B5RmlsZUZhbGxiYWNrIChzcmNTdGF0LCBzcmMsIGRlc3QsIG9wdHMpIHtcbiAgY29uc3QgQlVGX0xFTkdUSCA9IDY0ICogMTAyNFxuICBjb25zdCBfYnVmZiA9IHJlcXVpcmUoJy4uL3V0aWwvYnVmZmVyJykoQlVGX0xFTkdUSClcblxuICBjb25zdCBmZHIgPSBmcy5vcGVuU3luYyhzcmMsICdyJylcbiAgY29uc3QgZmR3ID0gZnMub3BlblN5bmMoZGVzdCwgJ3cnLCBzcmNTdGF0Lm1vZGUpXG4gIGxldCBwb3MgPSAwXG5cbiAgd2hpbGUgKHBvcyA8IHNyY1N0YXQuc2l6ZSkge1xuICAgIGNvbnN0IGJ5dGVzUmVhZCA9IGZzLnJlYWRTeW5jKGZkciwgX2J1ZmYsIDAsIEJVRl9MRU5HVEgsIHBvcylcbiAgICBmcy53cml0ZVN5bmMoZmR3LCBfYnVmZiwgMCwgYnl0ZXNSZWFkKVxuICAgIHBvcyArPSBieXRlc1JlYWRcbiAgfVxuXG4gIGlmIChvcHRzLnByZXNlcnZlVGltZXN0YW1wcykgZnMuZnV0aW1lc1N5bmMoZmR3LCBzcmNTdGF0LmF0aW1lLCBzcmNTdGF0Lm10aW1lKVxuXG4gIGZzLmNsb3NlU3luYyhmZHIpXG4gIGZzLmNsb3NlU3luYyhmZHcpXG59XG5cbmZ1bmN0aW9uIG9uRGlyIChzcmNTdGF0LCBkZXN0U3RhdCwgc3JjLCBkZXN0LCBvcHRzKSB7XG4gIGlmICghZGVzdFN0YXQpIHJldHVybiBta0RpckFuZENvcHkoc3JjU3RhdCwgc3JjLCBkZXN0LCBvcHRzKVxuICBpZiAoZGVzdFN0YXQgJiYgIWRlc3RTdGF0LmlzRGlyZWN0b3J5KCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBvdmVyd3JpdGUgbm9uLWRpcmVjdG9yeSAnJHtkZXN0fScgd2l0aCBkaXJlY3RvcnkgJyR7c3JjfScuYClcbiAgfVxuICByZXR1cm4gY29weURpcihzcmMsIGRlc3QsIG9wdHMpXG59XG5cbmZ1bmN0aW9uIG1rRGlyQW5kQ29weSAoc3JjU3RhdCwgc3JjLCBkZXN0LCBvcHRzKSB7XG4gIGZzLm1rZGlyU3luYyhkZXN0KVxuICBjb3B5RGlyKHNyYywgZGVzdCwgb3B0cylcbiAgcmV0dXJuIGZzLmNobW9kU3luYyhkZXN0LCBzcmNTdGF0Lm1vZGUpXG59XG5cbmZ1bmN0aW9uIGNvcHlEaXIgKHNyYywgZGVzdCwgb3B0cykge1xuICBmcy5yZWFkZGlyU3luYyhzcmMpLmZvckVhY2goaXRlbSA9PiBjb3B5RGlySXRlbShpdGVtLCBzcmMsIGRlc3QsIG9wdHMpKVxufVxuXG5mdW5jdGlvbiBjb3B5RGlySXRlbSAoaXRlbSwgc3JjLCBkZXN0LCBvcHRzKSB7XG4gIGNvbnN0IHNyY0l0ZW0gPSBwYXRoLmpvaW4oc3JjLCBpdGVtKVxuICBjb25zdCBkZXN0SXRlbSA9IHBhdGguam9pbihkZXN0LCBpdGVtKVxuICBjb25zdCB7IGRlc3RTdGF0IH0gPSBzdGF0LmNoZWNrUGF0aHNTeW5jKHNyY0l0ZW0sIGRlc3RJdGVtLCAnY29weScpXG4gIHJldHVybiBzdGFydENvcHkoZGVzdFN0YXQsIHNyY0l0ZW0sIGRlc3RJdGVtLCBvcHRzKVxufVxuXG5mdW5jdGlvbiBvbkxpbmsgKGRlc3RTdGF0LCBzcmMsIGRlc3QsIG9wdHMpIHtcbiAgbGV0IHJlc29sdmVkU3JjID0gZnMucmVhZGxpbmtTeW5jKHNyYylcbiAgaWYgKG9wdHMuZGVyZWZlcmVuY2UpIHtcbiAgICByZXNvbHZlZFNyYyA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCByZXNvbHZlZFNyYylcbiAgfVxuXG4gIGlmICghZGVzdFN0YXQpIHtcbiAgICByZXR1cm4gZnMuc3ltbGlua1N5bmMocmVzb2x2ZWRTcmMsIGRlc3QpXG4gIH0gZWxzZSB7XG4gICAgbGV0IHJlc29sdmVkRGVzdFxuICAgIHRyeSB7XG4gICAgICByZXNvbHZlZERlc3QgPSBmcy5yZWFkbGlua1N5bmMoZGVzdClcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIC8vIGRlc3QgZXhpc3RzIGFuZCBpcyBhIHJlZ3VsYXIgZmlsZSBvciBkaXJlY3RvcnksXG4gICAgICAvLyBXaW5kb3dzIG1heSB0aHJvdyBVTktOT1dOIGVycm9yLiBJZiBkZXN0IGFscmVhZHkgZXhpc3RzLFxuICAgICAgLy8gZnMgdGhyb3dzIGVycm9yIGFueXdheSwgc28gbm8gbmVlZCB0byBndWFyZCBhZ2FpbnN0IGl0IGhlcmUuXG4gICAgICBpZiAoZXJyLmNvZGUgPT09ICdFSU5WQUwnIHx8IGVyci5jb2RlID09PSAnVU5LTk9XTicpIHJldHVybiBmcy5zeW1saW5rU3luYyhyZXNvbHZlZFNyYywgZGVzdClcbiAgICAgIHRocm93IGVyclxuICAgIH1cbiAgICBpZiAob3B0cy5kZXJlZmVyZW5jZSkge1xuICAgICAgcmVzb2x2ZWREZXN0ID0gcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIHJlc29sdmVkRGVzdClcbiAgICB9XG4gICAgaWYgKHN0YXQuaXNTcmNTdWJkaXIocmVzb2x2ZWRTcmMsIHJlc29sdmVkRGVzdCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IGNvcHkgJyR7cmVzb2x2ZWRTcmN9JyB0byBhIHN1YmRpcmVjdG9yeSBvZiBpdHNlbGYsICcke3Jlc29sdmVkRGVzdH0nLmApXG4gICAgfVxuXG4gICAgLy8gcHJldmVudCBjb3B5IGlmIHNyYyBpcyBhIHN1YmRpciBvZiBkZXN0IHNpbmNlIHVubGlua2luZ1xuICAgIC8vIGRlc3QgaW4gdGhpcyBjYXNlIHdvdWxkIHJlc3VsdCBpbiByZW1vdmluZyBzcmMgY29udGVudHNcbiAgICAvLyBhbmQgdGhlcmVmb3JlIGEgYnJva2VuIHN5bWxpbmsgd291bGQgYmUgY3JlYXRlZC5cbiAgICBpZiAoZnMuc3RhdFN5bmMoZGVzdCkuaXNEaXJlY3RvcnkoKSAmJiBzdGF0LmlzU3JjU3ViZGlyKHJlc29sdmVkRGVzdCwgcmVzb2x2ZWRTcmMpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBvdmVyd3JpdGUgJyR7cmVzb2x2ZWREZXN0fScgd2l0aCAnJHtyZXNvbHZlZFNyY30nLmApXG4gICAgfVxuICAgIHJldHVybiBjb3B5TGluayhyZXNvbHZlZFNyYywgZGVzdClcbiAgfVxufVxuXG5mdW5jdGlvbiBjb3B5TGluayAocmVzb2x2ZWRTcmMsIGRlc3QpIHtcbiAgZnMudW5saW5rU3luYyhkZXN0KVxuICByZXR1cm4gZnMuc3ltbGlua1N5bmMocmVzb2x2ZWRTcmMsIGRlc3QpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29weVN5bmNcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7IiwiJ3VzZSBzdHJpY3QnXG5jb25zdCB1ID0gcmVxdWlyZSgndW5pdmVyc2FsaWZ5JykuZnJvbUNhbGxiYWNrXG5jb25zdCBta2RpcnMgPSB1KHJlcXVpcmUoJy4vbWtkaXJzJykpXG5jb25zdCBta2RpcnNTeW5jID0gcmVxdWlyZSgnLi9ta2RpcnMtc3luYycpXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBta2RpcnMsXG4gIG1rZGlyc1N5bmMsXG4gIC8vIGFsaWFzXG4gIG1rZGlycDogbWtkaXJzLFxuICBta2RpcnBTeW5jOiBta2RpcnNTeW5jLFxuICBlbnN1cmVEaXI6IG1rZGlycyxcbiAgZW5zdXJlRGlyU3luYzogbWtkaXJzU3luY1xufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGZzID0gcmVxdWlyZSgnZ3JhY2VmdWwtZnMnKVxuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuY29uc3QgaW52YWxpZFdpbjMyUGF0aCA9IHJlcXVpcmUoJy4vd2luMzInKS5pbnZhbGlkV2luMzJQYXRoXG5cbmNvbnN0IG83NzcgPSBwYXJzZUludCgnMDc3NycsIDgpXG5cbmZ1bmN0aW9uIG1rZGlycyAocCwgb3B0cywgY2FsbGJhY2ssIG1hZGUpIHtcbiAgaWYgKHR5cGVvZiBvcHRzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2FsbGJhY2sgPSBvcHRzXG4gICAgb3B0cyA9IHt9XG4gIH0gZWxzZSBpZiAoIW9wdHMgfHwgdHlwZW9mIG9wdHMgIT09ICdvYmplY3QnKSB7XG4gICAgb3B0cyA9IHsgbW9kZTogb3B0cyB9XG4gIH1cblxuICBpZiAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJyAmJiBpbnZhbGlkV2luMzJQYXRoKHApKSB7XG4gICAgY29uc3QgZXJySW52YWwgPSBuZXcgRXJyb3IocCArICcgY29udGFpbnMgaW52YWxpZCBXSU4zMiBwYXRoIGNoYXJhY3RlcnMuJylcbiAgICBlcnJJbnZhbC5jb2RlID0gJ0VJTlZBTCdcbiAgICByZXR1cm4gY2FsbGJhY2soZXJySW52YWwpXG4gIH1cblxuICBsZXQgbW9kZSA9IG9wdHMubW9kZVxuICBjb25zdCB4ZnMgPSBvcHRzLmZzIHx8IGZzXG5cbiAgaWYgKG1vZGUgPT09IHVuZGVmaW5lZCkge1xuICAgIG1vZGUgPSBvNzc3ICYgKH5wcm9jZXNzLnVtYXNrKCkpXG4gIH1cbiAgaWYgKCFtYWRlKSBtYWRlID0gbnVsbFxuXG4gIGNhbGxiYWNrID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24gKCkge31cbiAgcCA9IHBhdGgucmVzb2x2ZShwKVxuXG4gIHhmcy5ta2RpcihwLCBtb2RlLCBlciA9PiB7XG4gICAgaWYgKCFlcikge1xuICAgICAgbWFkZSA9IG1hZGUgfHwgcFxuICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIG1hZGUpXG4gICAgfVxuICAgIHN3aXRjaCAoZXIuY29kZSkge1xuICAgICAgY2FzZSAnRU5PRU5UJzpcbiAgICAgICAgaWYgKHBhdGguZGlybmFtZShwKSA9PT0gcCkgcmV0dXJuIGNhbGxiYWNrKGVyKVxuICAgICAgICBta2RpcnMocGF0aC5kaXJuYW1lKHApLCBvcHRzLCAoZXIsIG1hZGUpID0+IHtcbiAgICAgICAgICBpZiAoZXIpIGNhbGxiYWNrKGVyLCBtYWRlKVxuICAgICAgICAgIGVsc2UgbWtkaXJzKHAsIG9wdHMsIGNhbGxiYWNrLCBtYWRlKVxuICAgICAgICB9KVxuICAgICAgICBicmVha1xuXG4gICAgICAvLyBJbiB0aGUgY2FzZSBvZiBhbnkgb3RoZXIgZXJyb3IsIGp1c3Qgc2VlIGlmIHRoZXJlJ3MgYSBkaXJcbiAgICAgIC8vIHRoZXJlIGFscmVhZHkuICBJZiBzbywgdGhlbiBob29yYXkhICBJZiBub3QsIHRoZW4gc29tZXRoaW5nXG4gICAgICAvLyBpcyBib3JrZWQuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB4ZnMuc3RhdChwLCAoZXIyLCBzdGF0KSA9PiB7XG4gICAgICAgICAgLy8gaWYgdGhlIHN0YXQgZmFpbHMsIHRoZW4gdGhhdCdzIHN1cGVyIHdlaXJkLlxuICAgICAgICAgIC8vIGxldCB0aGUgb3JpZ2luYWwgZXJyb3IgYmUgdGhlIGZhaWx1cmUgcmVhc29uLlxuICAgICAgICAgIGlmIChlcjIgfHwgIXN0YXQuaXNEaXJlY3RvcnkoKSkgY2FsbGJhY2soZXIsIG1hZGUpXG4gICAgICAgICAgZWxzZSBjYWxsYmFjayhudWxsLCBtYWRlKVxuICAgICAgICB9KVxuICAgICAgICBicmVha1xuICAgIH1cbiAgfSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBta2RpcnNcbiIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG5cbi8vIGdldCBkcml2ZSBvbiB3aW5kb3dzXG5mdW5jdGlvbiBnZXRSb290UGF0aCAocCkge1xuICBwID0gcGF0aC5ub3JtYWxpemUocGF0aC5yZXNvbHZlKHApKS5zcGxpdChwYXRoLnNlcClcbiAgaWYgKHAubGVuZ3RoID4gMCkgcmV0dXJuIHBbMF1cbiAgcmV0dXJuIG51bGxcbn1cblxuLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNjI4ODgvMTAzMzMgY29udGFpbnMgbW9yZSBhY2N1cmF0ZVxuLy8gVE9ETzogZXhwYW5kIHRvIGluY2x1ZGUgdGhlIHJlc3RcbmNvbnN0IElOVkFMSURfUEFUSF9DSEFSUyA9IC9bPD46XCJ8PypdL1xuXG5mdW5jdGlvbiBpbnZhbGlkV2luMzJQYXRoIChwKSB7XG4gIGNvbnN0IHJwID0gZ2V0Um9vdFBhdGgocClcbiAgcCA9IHAucmVwbGFjZShycCwgJycpXG4gIHJldHVybiBJTlZBTElEX1BBVEhfQ0hBUlMudGVzdChwKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0Um9vdFBhdGgsXG4gIGludmFsaWRXaW4zMlBhdGhcbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBmcyA9IHJlcXVpcmUoJ2dyYWNlZnVsLWZzJylcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcbmNvbnN0IGludmFsaWRXaW4zMlBhdGggPSByZXF1aXJlKCcuL3dpbjMyJykuaW52YWxpZFdpbjMyUGF0aFxuXG5jb25zdCBvNzc3ID0gcGFyc2VJbnQoJzA3NzcnLCA4KVxuXG5mdW5jdGlvbiBta2RpcnNTeW5jIChwLCBvcHRzLCBtYWRlKSB7XG4gIGlmICghb3B0cyB8fCB0eXBlb2Ygb3B0cyAhPT0gJ29iamVjdCcpIHtcbiAgICBvcHRzID0geyBtb2RlOiBvcHRzIH1cbiAgfVxuXG4gIGxldCBtb2RlID0gb3B0cy5tb2RlXG4gIGNvbnN0IHhmcyA9IG9wdHMuZnMgfHwgZnNcblxuICBpZiAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJyAmJiBpbnZhbGlkV2luMzJQYXRoKHApKSB7XG4gICAgY29uc3QgZXJySW52YWwgPSBuZXcgRXJyb3IocCArICcgY29udGFpbnMgaW52YWxpZCBXSU4zMiBwYXRoIGNoYXJhY3RlcnMuJylcbiAgICBlcnJJbnZhbC5jb2RlID0gJ0VJTlZBTCdcbiAgICB0aHJvdyBlcnJJbnZhbFxuICB9XG5cbiAgaWYgKG1vZGUgPT09IHVuZGVmaW5lZCkge1xuICAgIG1vZGUgPSBvNzc3ICYgKH5wcm9jZXNzLnVtYXNrKCkpXG4gIH1cbiAgaWYgKCFtYWRlKSBtYWRlID0gbnVsbFxuXG4gIHAgPSBwYXRoLnJlc29sdmUocClcblxuICB0cnkge1xuICAgIHhmcy5ta2RpclN5bmMocCwgbW9kZSlcbiAgICBtYWRlID0gbWFkZSB8fCBwXG4gIH0gY2F0Y2ggKGVycjApIHtcbiAgICBpZiAoZXJyMC5jb2RlID09PSAnRU5PRU5UJykge1xuICAgICAgaWYgKHBhdGguZGlybmFtZShwKSA9PT0gcCkgdGhyb3cgZXJyMFxuICAgICAgbWFkZSA9IG1rZGlyc1N5bmMocGF0aC5kaXJuYW1lKHApLCBvcHRzLCBtYWRlKVxuICAgICAgbWtkaXJzU3luYyhwLCBvcHRzLCBtYWRlKVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBJbiB0aGUgY2FzZSBvZiBhbnkgb3RoZXIgZXJyb3IsIGp1c3Qgc2VlIGlmIHRoZXJlJ3MgYSBkaXIgdGhlcmVcbiAgICAgIC8vIGFscmVhZHkuIElmIHNvLCB0aGVuIGhvb3JheSEgIElmIG5vdCwgdGhlbiBzb21ldGhpbmcgaXMgYm9ya2VkLlxuICAgICAgbGV0IHN0YXRcbiAgICAgIHRyeSB7XG4gICAgICAgIHN0YXQgPSB4ZnMuc3RhdFN5bmMocClcbiAgICAgIH0gY2F0Y2ggKGVycjEpIHtcbiAgICAgICAgdGhyb3cgZXJyMFxuICAgICAgfVxuICAgICAgaWYgKCFzdGF0LmlzRGlyZWN0b3J5KCkpIHRocm93IGVycjBcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbWFkZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1rZGlyc1N5bmNcbiIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBmcyA9IHJlcXVpcmUoJ2dyYWNlZnVsLWZzJylcbmNvbnN0IG9zID0gcmVxdWlyZSgnb3MnKVxuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuXG4vLyBIRlMsIGV4dHsyLDN9LCBGQVQgZG8gbm90LCBOb2RlLmpzIHYwLjEwIGRvZXMgbm90XG5mdW5jdGlvbiBoYXNNaWxsaXNSZXNTeW5jICgpIHtcbiAgbGV0IHRtcGZpbGUgPSBwYXRoLmpvaW4oJ21pbGxpcy10ZXN0LXN5bmMnICsgRGF0ZS5ub3coKS50b1N0cmluZygpICsgTWF0aC5yYW5kb20oKS50b1N0cmluZygpLnNsaWNlKDIpKVxuICB0bXBmaWxlID0gcGF0aC5qb2luKG9zLnRtcGRpcigpLCB0bXBmaWxlKVxuXG4gIC8vIDU1MCBtaWxsaXMgcGFzdCBVTklYIGVwb2NoXG4gIGNvbnN0IGQgPSBuZXcgRGF0ZSgxNDM1NDEwMjQzODYyKVxuICBmcy53cml0ZUZpbGVTeW5jKHRtcGZpbGUsICdodHRwczovL2dpdGh1Yi5jb20vanByaWNoYXJkc29uL25vZGUtZnMtZXh0cmEvcHVsbC8xNDEnKVxuICBjb25zdCBmZCA9IGZzLm9wZW5TeW5jKHRtcGZpbGUsICdyKycpXG4gIGZzLmZ1dGltZXNTeW5jKGZkLCBkLCBkKVxuICBmcy5jbG9zZVN5bmMoZmQpXG4gIHJldHVybiBmcy5zdGF0U3luYyh0bXBmaWxlKS5tdGltZSA+IDE0MzU0MTAyNDMwMDBcbn1cblxuZnVuY3Rpb24gaGFzTWlsbGlzUmVzIChjYWxsYmFjaykge1xuICBsZXQgdG1wZmlsZSA9IHBhdGguam9pbignbWlsbGlzLXRlc3QnICsgRGF0ZS5ub3coKS50b1N0cmluZygpICsgTWF0aC5yYW5kb20oKS50b1N0cmluZygpLnNsaWNlKDIpKVxuICB0bXBmaWxlID0gcGF0aC5qb2luKG9zLnRtcGRpcigpLCB0bXBmaWxlKVxuXG4gIC8vIDU1MCBtaWxsaXMgcGFzdCBVTklYIGVwb2NoXG4gIGNvbnN0IGQgPSBuZXcgRGF0ZSgxNDM1NDEwMjQzODYyKVxuICBmcy53cml0ZUZpbGUodG1wZmlsZSwgJ2h0dHBzOi8vZ2l0aHViLmNvbS9qcHJpY2hhcmRzb24vbm9kZS1mcy1leHRyYS9wdWxsLzE0MScsIGVyciA9PiB7XG4gICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycilcbiAgICBmcy5vcGVuKHRtcGZpbGUsICdyKycsIChlcnIsIGZkKSA9PiB7XG4gICAgICBpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKVxuICAgICAgZnMuZnV0aW1lcyhmZCwgZCwgZCwgZXJyID0+IHtcbiAgICAgICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycilcbiAgICAgICAgZnMuY2xvc2UoZmQsIGVyciA9PiB7XG4gICAgICAgICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycilcbiAgICAgICAgICBmcy5zdGF0KHRtcGZpbGUsIChlcnIsIHN0YXRzKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKVxuICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgc3RhdHMubXRpbWUgPiAxNDM1NDEwMjQzMDAwKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH0pXG4gIH0pXG59XG5cbmZ1bmN0aW9uIHRpbWVSZW1vdmVNaWxsaXMgKHRpbWVzdGFtcCkge1xuICBpZiAodHlwZW9mIHRpbWVzdGFtcCA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcih0aW1lc3RhbXAgLyAxMDAwKSAqIDEwMDBcbiAgfSBlbHNlIGlmICh0aW1lc3RhbXAgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKE1hdGguZmxvb3IodGltZXN0YW1wLmdldFRpbWUoKSAvIDEwMDApICogMTAwMClcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2ZzLWV4dHJhOiB0aW1lUmVtb3ZlTWlsbGlzKCkgdW5rbm93biBwYXJhbWV0ZXIgdHlwZScpXG4gIH1cbn1cblxuZnVuY3Rpb24gdXRpbWVzTWlsbGlzIChwYXRoLCBhdGltZSwgbXRpbWUsIGNhbGxiYWNrKSB7XG4gIC8vIGlmICghSEFTX01JTExJU19SRVMpIHJldHVybiBmcy51dGltZXMocGF0aCwgYXRpbWUsIG10aW1lLCBjYWxsYmFjaylcbiAgZnMub3BlbihwYXRoLCAncisnLCAoZXJyLCBmZCkgPT4ge1xuICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgZnMuZnV0aW1lcyhmZCwgYXRpbWUsIG10aW1lLCBmdXRpbWVzRXJyID0+IHtcbiAgICAgIGZzLmNsb3NlKGZkLCBjbG9zZUVyciA9PiB7XG4gICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soZnV0aW1lc0VyciB8fCBjbG9zZUVycilcbiAgICAgIH0pXG4gICAgfSlcbiAgfSlcbn1cblxuZnVuY3Rpb24gdXRpbWVzTWlsbGlzU3luYyAocGF0aCwgYXRpbWUsIG10aW1lKSB7XG4gIGNvbnN0IGZkID0gZnMub3BlblN5bmMocGF0aCwgJ3IrJylcbiAgZnMuZnV0aW1lc1N5bmMoZmQsIGF0aW1lLCBtdGltZSlcbiAgcmV0dXJuIGZzLmNsb3NlU3luYyhmZClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGhhc01pbGxpc1JlcyxcbiAgaGFzTWlsbGlzUmVzU3luYyxcbiAgdGltZVJlbW92ZU1pbGxpcyxcbiAgdXRpbWVzTWlsbGlzLFxuICB1dGltZXNNaWxsaXNTeW5jXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJvc1wiKTsiLCIndXNlIHN0cmljdCdcblxuY29uc3QgZnMgPSByZXF1aXJlKCdncmFjZWZ1bC1mcycpXG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG5cbmNvbnN0IE5PREVfVkVSU0lPTl9NQUpPUl9XSVRIX0JJR0lOVCA9IDEwXG5jb25zdCBOT0RFX1ZFUlNJT05fTUlOT1JfV0lUSF9CSUdJTlQgPSA1XG5jb25zdCBOT0RFX1ZFUlNJT05fUEFUQ0hfV0lUSF9CSUdJTlQgPSAwXG5jb25zdCBub2RlVmVyc2lvbiA9IHByb2Nlc3MudmVyc2lvbnMubm9kZS5zcGxpdCgnLicpXG5jb25zdCBub2RlVmVyc2lvbk1ham9yID0gTnVtYmVyLnBhcnNlSW50KG5vZGVWZXJzaW9uWzBdLCAxMClcbmNvbnN0IG5vZGVWZXJzaW9uTWlub3IgPSBOdW1iZXIucGFyc2VJbnQobm9kZVZlcnNpb25bMV0sIDEwKVxuY29uc3Qgbm9kZVZlcnNpb25QYXRjaCA9IE51bWJlci5wYXJzZUludChub2RlVmVyc2lvblsyXSwgMTApXG5cbmZ1bmN0aW9uIG5vZGVTdXBwb3J0c0JpZ0ludCAoKSB7XG4gIGlmIChub2RlVmVyc2lvbk1ham9yID4gTk9ERV9WRVJTSU9OX01BSk9SX1dJVEhfQklHSU5UKSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfSBlbHNlIGlmIChub2RlVmVyc2lvbk1ham9yID09PSBOT0RFX1ZFUlNJT05fTUFKT1JfV0lUSF9CSUdJTlQpIHtcbiAgICBpZiAobm9kZVZlcnNpb25NaW5vciA+IE5PREVfVkVSU0lPTl9NSU5PUl9XSVRIX0JJR0lOVCkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9IGVsc2UgaWYgKG5vZGVWZXJzaW9uTWlub3IgPT09IE5PREVfVkVSU0lPTl9NSU5PUl9XSVRIX0JJR0lOVCkge1xuICAgICAgaWYgKG5vZGVWZXJzaW9uUGF0Y2ggPj0gTk9ERV9WRVJTSU9OX1BBVENIX1dJVEhfQklHSU5UKSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZVxufVxuXG5mdW5jdGlvbiBnZXRTdGF0cyAoc3JjLCBkZXN0LCBjYikge1xuICBpZiAobm9kZVN1cHBvcnRzQmlnSW50KCkpIHtcbiAgICBmcy5zdGF0KHNyYywgeyBiaWdpbnQ6IHRydWUgfSwgKGVyciwgc3JjU3RhdCkgPT4ge1xuICAgICAgaWYgKGVycikgcmV0dXJuIGNiKGVycilcbiAgICAgIGZzLnN0YXQoZGVzdCwgeyBiaWdpbnQ6IHRydWUgfSwgKGVyciwgZGVzdFN0YXQpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIGlmIChlcnIuY29kZSA9PT0gJ0VOT0VOVCcpIHJldHVybiBjYihudWxsLCB7IHNyY1N0YXQsIGRlc3RTdGF0OiBudWxsIH0pXG4gICAgICAgICAgcmV0dXJuIGNiKGVycilcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2IobnVsbCwgeyBzcmNTdGF0LCBkZXN0U3RhdCB9KVxuICAgICAgfSlcbiAgICB9KVxuICB9IGVsc2Uge1xuICAgIGZzLnN0YXQoc3JjLCAoZXJyLCBzcmNTdGF0KSA9PiB7XG4gICAgICBpZiAoZXJyKSByZXR1cm4gY2IoZXJyKVxuICAgICAgZnMuc3RhdChkZXN0LCAoZXJyLCBkZXN0U3RhdCkgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgaWYgKGVyci5jb2RlID09PSAnRU5PRU5UJykgcmV0dXJuIGNiKG51bGwsIHsgc3JjU3RhdCwgZGVzdFN0YXQ6IG51bGwgfSlcbiAgICAgICAgICByZXR1cm4gY2IoZXJyKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjYihudWxsLCB7IHNyY1N0YXQsIGRlc3RTdGF0IH0pXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0U3RhdHNTeW5jIChzcmMsIGRlc3QpIHtcbiAgbGV0IHNyY1N0YXQsIGRlc3RTdGF0XG4gIGlmIChub2RlU3VwcG9ydHNCaWdJbnQoKSkge1xuICAgIHNyY1N0YXQgPSBmcy5zdGF0U3luYyhzcmMsIHsgYmlnaW50OiB0cnVlIH0pXG4gIH0gZWxzZSB7XG4gICAgc3JjU3RhdCA9IGZzLnN0YXRTeW5jKHNyYylcbiAgfVxuICB0cnkge1xuICAgIGlmIChub2RlU3VwcG9ydHNCaWdJbnQoKSkge1xuICAgICAgZGVzdFN0YXQgPSBmcy5zdGF0U3luYyhkZXN0LCB7IGJpZ2ludDogdHJ1ZSB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBkZXN0U3RhdCA9IGZzLnN0YXRTeW5jKGRlc3QpXG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBpZiAoZXJyLmNvZGUgPT09ICdFTk9FTlQnKSByZXR1cm4geyBzcmNTdGF0LCBkZXN0U3RhdDogbnVsbCB9XG4gICAgdGhyb3cgZXJyXG4gIH1cbiAgcmV0dXJuIHsgc3JjU3RhdCwgZGVzdFN0YXQgfVxufVxuXG5mdW5jdGlvbiBjaGVja1BhdGhzIChzcmMsIGRlc3QsIGZ1bmNOYW1lLCBjYikge1xuICBnZXRTdGF0cyhzcmMsIGRlc3QsIChlcnIsIHN0YXRzKSA9PiB7XG4gICAgaWYgKGVycikgcmV0dXJuIGNiKGVycilcbiAgICBjb25zdCB7IHNyY1N0YXQsIGRlc3RTdGF0IH0gPSBzdGF0c1xuICAgIGlmIChkZXN0U3RhdCAmJiBkZXN0U3RhdC5pbm8gJiYgZGVzdFN0YXQuZGV2ICYmIGRlc3RTdGF0LmlubyA9PT0gc3JjU3RhdC5pbm8gJiYgZGVzdFN0YXQuZGV2ID09PSBzcmNTdGF0LmRldikge1xuICAgICAgcmV0dXJuIGNiKG5ldyBFcnJvcignU291cmNlIGFuZCBkZXN0aW5hdGlvbiBtdXN0IG5vdCBiZSB0aGUgc2FtZS4nKSlcbiAgICB9XG4gICAgaWYgKHNyY1N0YXQuaXNEaXJlY3RvcnkoKSAmJiBpc1NyY1N1YmRpcihzcmMsIGRlc3QpKSB7XG4gICAgICByZXR1cm4gY2IobmV3IEVycm9yKGVyck1zZyhzcmMsIGRlc3QsIGZ1bmNOYW1lKSkpXG4gICAgfVxuICAgIHJldHVybiBjYihudWxsLCB7IHNyY1N0YXQsIGRlc3RTdGF0IH0pXG4gIH0pXG59XG5cbmZ1bmN0aW9uIGNoZWNrUGF0aHNTeW5jIChzcmMsIGRlc3QsIGZ1bmNOYW1lKSB7XG4gIGNvbnN0IHsgc3JjU3RhdCwgZGVzdFN0YXQgfSA9IGdldFN0YXRzU3luYyhzcmMsIGRlc3QpXG4gIGlmIChkZXN0U3RhdCAmJiBkZXN0U3RhdC5pbm8gJiYgZGVzdFN0YXQuZGV2ICYmIGRlc3RTdGF0LmlubyA9PT0gc3JjU3RhdC5pbm8gJiYgZGVzdFN0YXQuZGV2ID09PSBzcmNTdGF0LmRldikge1xuICAgIHRocm93IG5ldyBFcnJvcignU291cmNlIGFuZCBkZXN0aW5hdGlvbiBtdXN0IG5vdCBiZSB0aGUgc2FtZS4nKVxuICB9XG4gIGlmIChzcmNTdGF0LmlzRGlyZWN0b3J5KCkgJiYgaXNTcmNTdWJkaXIoc3JjLCBkZXN0KSkge1xuICAgIHRocm93IG5ldyBFcnJvcihlcnJNc2coc3JjLCBkZXN0LCBmdW5jTmFtZSkpXG4gIH1cbiAgcmV0dXJuIHsgc3JjU3RhdCwgZGVzdFN0YXQgfVxufVxuXG4vLyByZWN1cnNpdmVseSBjaGVjayBpZiBkZXN0IHBhcmVudCBpcyBhIHN1YmRpcmVjdG9yeSBvZiBzcmMuXG4vLyBJdCB3b3JrcyBmb3IgYWxsIGZpbGUgdHlwZXMgaW5jbHVkaW5nIHN5bWxpbmtzIHNpbmNlIGl0XG4vLyBjaGVja3MgdGhlIHNyYyBhbmQgZGVzdCBpbm9kZXMuIEl0IHN0YXJ0cyBmcm9tIHRoZSBkZWVwZXN0XG4vLyBwYXJlbnQgYW5kIHN0b3BzIG9uY2UgaXQgcmVhY2hlcyB0aGUgc3JjIHBhcmVudCBvciB0aGUgcm9vdCBwYXRoLlxuZnVuY3Rpb24gY2hlY2tQYXJlbnRQYXRocyAoc3JjLCBzcmNTdGF0LCBkZXN0LCBmdW5jTmFtZSwgY2IpIHtcbiAgY29uc3Qgc3JjUGFyZW50ID0gcGF0aC5yZXNvbHZlKHBhdGguZGlybmFtZShzcmMpKVxuICBjb25zdCBkZXN0UGFyZW50ID0gcGF0aC5yZXNvbHZlKHBhdGguZGlybmFtZShkZXN0KSlcbiAgaWYgKGRlc3RQYXJlbnQgPT09IHNyY1BhcmVudCB8fCBkZXN0UGFyZW50ID09PSBwYXRoLnBhcnNlKGRlc3RQYXJlbnQpLnJvb3QpIHJldHVybiBjYigpXG4gIGlmIChub2RlU3VwcG9ydHNCaWdJbnQoKSkge1xuICAgIGZzLnN0YXQoZGVzdFBhcmVudCwgeyBiaWdpbnQ6IHRydWUgfSwgKGVyciwgZGVzdFN0YXQpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgaWYgKGVyci5jb2RlID09PSAnRU5PRU5UJykgcmV0dXJuIGNiKClcbiAgICAgICAgcmV0dXJuIGNiKGVycilcbiAgICAgIH1cbiAgICAgIGlmIChkZXN0U3RhdC5pbm8gJiYgZGVzdFN0YXQuZGV2ICYmIGRlc3RTdGF0LmlubyA9PT0gc3JjU3RhdC5pbm8gJiYgZGVzdFN0YXQuZGV2ID09PSBzcmNTdGF0LmRldikge1xuICAgICAgICByZXR1cm4gY2IobmV3IEVycm9yKGVyck1zZyhzcmMsIGRlc3QsIGZ1bmNOYW1lKSkpXG4gICAgICB9XG4gICAgICByZXR1cm4gY2hlY2tQYXJlbnRQYXRocyhzcmMsIHNyY1N0YXQsIGRlc3RQYXJlbnQsIGZ1bmNOYW1lLCBjYilcbiAgICB9KVxuICB9IGVsc2Uge1xuICAgIGZzLnN0YXQoZGVzdFBhcmVudCwgKGVyciwgZGVzdFN0YXQpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgaWYgKGVyci5jb2RlID09PSAnRU5PRU5UJykgcmV0dXJuIGNiKClcbiAgICAgICAgcmV0dXJuIGNiKGVycilcbiAgICAgIH1cbiAgICAgIGlmIChkZXN0U3RhdC5pbm8gJiYgZGVzdFN0YXQuZGV2ICYmIGRlc3RTdGF0LmlubyA9PT0gc3JjU3RhdC5pbm8gJiYgZGVzdFN0YXQuZGV2ID09PSBzcmNTdGF0LmRldikge1xuICAgICAgICByZXR1cm4gY2IobmV3IEVycm9yKGVyck1zZyhzcmMsIGRlc3QsIGZ1bmNOYW1lKSkpXG4gICAgICB9XG4gICAgICByZXR1cm4gY2hlY2tQYXJlbnRQYXRocyhzcmMsIHNyY1N0YXQsIGRlc3RQYXJlbnQsIGZ1bmNOYW1lLCBjYilcbiAgICB9KVxuICB9XG59XG5cbmZ1bmN0aW9uIGNoZWNrUGFyZW50UGF0aHNTeW5jIChzcmMsIHNyY1N0YXQsIGRlc3QsIGZ1bmNOYW1lKSB7XG4gIGNvbnN0IHNyY1BhcmVudCA9IHBhdGgucmVzb2x2ZShwYXRoLmRpcm5hbWUoc3JjKSlcbiAgY29uc3QgZGVzdFBhcmVudCA9IHBhdGgucmVzb2x2ZShwYXRoLmRpcm5hbWUoZGVzdCkpXG4gIGlmIChkZXN0UGFyZW50ID09PSBzcmNQYXJlbnQgfHwgZGVzdFBhcmVudCA9PT0gcGF0aC5wYXJzZShkZXN0UGFyZW50KS5yb290KSByZXR1cm5cbiAgbGV0IGRlc3RTdGF0XG4gIHRyeSB7XG4gICAgaWYgKG5vZGVTdXBwb3J0c0JpZ0ludCgpKSB7XG4gICAgICBkZXN0U3RhdCA9IGZzLnN0YXRTeW5jKGRlc3RQYXJlbnQsIHsgYmlnaW50OiB0cnVlIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGRlc3RTdGF0ID0gZnMuc3RhdFN5bmMoZGVzdFBhcmVudClcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGlmIChlcnIuY29kZSA9PT0gJ0VOT0VOVCcpIHJldHVyblxuICAgIHRocm93IGVyclxuICB9XG4gIGlmIChkZXN0U3RhdC5pbm8gJiYgZGVzdFN0YXQuZGV2ICYmIGRlc3RTdGF0LmlubyA9PT0gc3JjU3RhdC5pbm8gJiYgZGVzdFN0YXQuZGV2ID09PSBzcmNTdGF0LmRldikge1xuICAgIHRocm93IG5ldyBFcnJvcihlcnJNc2coc3JjLCBkZXN0LCBmdW5jTmFtZSkpXG4gIH1cbiAgcmV0dXJuIGNoZWNrUGFyZW50UGF0aHNTeW5jKHNyYywgc3JjU3RhdCwgZGVzdFBhcmVudCwgZnVuY05hbWUpXG59XG5cbi8vIHJldHVybiB0cnVlIGlmIGRlc3QgaXMgYSBzdWJkaXIgb2Ygc3JjLCBvdGhlcndpc2UgZmFsc2UuXG4vLyBJdCBvbmx5IGNoZWNrcyB0aGUgcGF0aCBzdHJpbmdzLlxuZnVuY3Rpb24gaXNTcmNTdWJkaXIgKHNyYywgZGVzdCkge1xuICBjb25zdCBzcmNBcnIgPSBwYXRoLnJlc29sdmUoc3JjKS5zcGxpdChwYXRoLnNlcCkuZmlsdGVyKGkgPT4gaSlcbiAgY29uc3QgZGVzdEFyciA9IHBhdGgucmVzb2x2ZShkZXN0KS5zcGxpdChwYXRoLnNlcCkuZmlsdGVyKGkgPT4gaSlcbiAgcmV0dXJuIHNyY0Fyci5yZWR1Y2UoKGFjYywgY3VyLCBpKSA9PiBhY2MgJiYgZGVzdEFycltpXSA9PT0gY3VyLCB0cnVlKVxufVxuXG5mdW5jdGlvbiBlcnJNc2cgKHNyYywgZGVzdCwgZnVuY05hbWUpIHtcbiAgcmV0dXJuIGBDYW5ub3QgJHtmdW5jTmFtZX0gJyR7c3JjfScgdG8gYSBzdWJkaXJlY3Rvcnkgb2YgaXRzZWxmLCAnJHtkZXN0fScuYFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY2hlY2tQYXRocyxcbiAgY2hlY2tQYXRoc1N5bmMsXG4gIGNoZWNrUGFyZW50UGF0aHMsXG4gIGNoZWNrUGFyZW50UGF0aHNTeW5jLFxuICBpc1NyY1N1YmRpclxufVxuIiwiJ3VzZSBzdHJpY3QnXG4vKiBlc2xpbnQtZGlzYWJsZSBub2RlL25vLWRlcHJlY2F0ZWQtYXBpICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIGlmICh0eXBlb2YgQnVmZmVyLmFsbG9jVW5zYWZlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBCdWZmZXIuYWxsb2NVbnNhZmUoc2l6ZSlcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gbmV3IEJ1ZmZlcihzaXplKVxuICAgIH1cbiAgfVxuICByZXR1cm4gbmV3IEJ1ZmZlcihzaXplKVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IHUgPSByZXF1aXJlKCd1bml2ZXJzYWxpZnknKS5mcm9tQ2FsbGJhY2tcbm1vZHVsZS5leHBvcnRzID0ge1xuICBjb3B5OiB1KHJlcXVpcmUoJy4vY29weScpKVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGZzID0gcmVxdWlyZSgnZ3JhY2VmdWwtZnMnKVxuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuY29uc3QgbWtkaXJwID0gcmVxdWlyZSgnLi4vbWtkaXJzJykubWtkaXJzXG5jb25zdCBwYXRoRXhpc3RzID0gcmVxdWlyZSgnLi4vcGF0aC1leGlzdHMnKS5wYXRoRXhpc3RzXG5jb25zdCB1dGltZXMgPSByZXF1aXJlKCcuLi91dGlsL3V0aW1lcycpLnV0aW1lc01pbGxpc1xuY29uc3Qgc3RhdCA9IHJlcXVpcmUoJy4uL3V0aWwvc3RhdCcpXG5cbmZ1bmN0aW9uIGNvcHkgKHNyYywgZGVzdCwgb3B0cywgY2IpIHtcbiAgaWYgKHR5cGVvZiBvcHRzID09PSAnZnVuY3Rpb24nICYmICFjYikge1xuICAgIGNiID0gb3B0c1xuICAgIG9wdHMgPSB7fVxuICB9IGVsc2UgaWYgKHR5cGVvZiBvcHRzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgb3B0cyA9IHsgZmlsdGVyOiBvcHRzIH1cbiAgfVxuXG4gIGNiID0gY2IgfHwgZnVuY3Rpb24gKCkge31cbiAgb3B0cyA9IG9wdHMgfHwge31cblxuICBvcHRzLmNsb2JiZXIgPSAnY2xvYmJlcicgaW4gb3B0cyA/ICEhb3B0cy5jbG9iYmVyIDogdHJ1ZSAvLyBkZWZhdWx0IHRvIHRydWUgZm9yIG5vd1xuICBvcHRzLm92ZXJ3cml0ZSA9ICdvdmVyd3JpdGUnIGluIG9wdHMgPyAhIW9wdHMub3ZlcndyaXRlIDogb3B0cy5jbG9iYmVyIC8vIG92ZXJ3cml0ZSBmYWxscyBiYWNrIHRvIGNsb2JiZXJcblxuICAvLyBXYXJuIGFib3V0IHVzaW5nIHByZXNlcnZlVGltZXN0YW1wcyBvbiAzMi1iaXQgbm9kZVxuICBpZiAob3B0cy5wcmVzZXJ2ZVRpbWVzdGFtcHMgJiYgcHJvY2Vzcy5hcmNoID09PSAnaWEzMicpIHtcbiAgICBjb25zb2xlLndhcm4oYGZzLWV4dHJhOiBVc2luZyB0aGUgcHJlc2VydmVUaW1lc3RhbXBzIG9wdGlvbiBpbiAzMi1iaXQgbm9kZSBpcyBub3QgcmVjb21tZW5kZWQ7XFxuXG4gICAgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qcHJpY2hhcmRzb24vbm9kZS1mcy1leHRyYS9pc3N1ZXMvMjY5YClcbiAgfVxuXG4gIHN0YXQuY2hlY2tQYXRocyhzcmMsIGRlc3QsICdjb3B5JywgKGVyciwgc3RhdHMpID0+IHtcbiAgICBpZiAoZXJyKSByZXR1cm4gY2IoZXJyKVxuICAgIGNvbnN0IHsgc3JjU3RhdCwgZGVzdFN0YXQgfSA9IHN0YXRzXG4gICAgc3RhdC5jaGVja1BhcmVudFBhdGhzKHNyYywgc3JjU3RhdCwgZGVzdCwgJ2NvcHknLCBlcnIgPT4ge1xuICAgICAgaWYgKGVycikgcmV0dXJuIGNiKGVycilcbiAgICAgIGlmIChvcHRzLmZpbHRlcikgcmV0dXJuIGhhbmRsZUZpbHRlcihjaGVja1BhcmVudERpciwgZGVzdFN0YXQsIHNyYywgZGVzdCwgb3B0cywgY2IpXG4gICAgICByZXR1cm4gY2hlY2tQYXJlbnREaXIoZGVzdFN0YXQsIHNyYywgZGVzdCwgb3B0cywgY2IpXG4gICAgfSlcbiAgfSlcbn1cblxuZnVuY3Rpb24gY2hlY2tQYXJlbnREaXIgKGRlc3RTdGF0LCBzcmMsIGRlc3QsIG9wdHMsIGNiKSB7XG4gIGNvbnN0IGRlc3RQYXJlbnQgPSBwYXRoLmRpcm5hbWUoZGVzdClcbiAgcGF0aEV4aXN0cyhkZXN0UGFyZW50LCAoZXJyLCBkaXJFeGlzdHMpID0+IHtcbiAgICBpZiAoZXJyKSByZXR1cm4gY2IoZXJyKVxuICAgIGlmIChkaXJFeGlzdHMpIHJldHVybiBzdGFydENvcHkoZGVzdFN0YXQsIHNyYywgZGVzdCwgb3B0cywgY2IpXG4gICAgbWtkaXJwKGRlc3RQYXJlbnQsIGVyciA9PiB7XG4gICAgICBpZiAoZXJyKSByZXR1cm4gY2IoZXJyKVxuICAgICAgcmV0dXJuIHN0YXJ0Q29weShkZXN0U3RhdCwgc3JjLCBkZXN0LCBvcHRzLCBjYilcbiAgICB9KVxuICB9KVxufVxuXG5mdW5jdGlvbiBoYW5kbGVGaWx0ZXIgKG9uSW5jbHVkZSwgZGVzdFN0YXQsIHNyYywgZGVzdCwgb3B0cywgY2IpIHtcbiAgUHJvbWlzZS5yZXNvbHZlKG9wdHMuZmlsdGVyKHNyYywgZGVzdCkpLnRoZW4oaW5jbHVkZSA9PiB7XG4gICAgaWYgKGluY2x1ZGUpIHJldHVybiBvbkluY2x1ZGUoZGVzdFN0YXQsIHNyYywgZGVzdCwgb3B0cywgY2IpXG4gICAgcmV0dXJuIGNiKClcbiAgfSwgZXJyb3IgPT4gY2IoZXJyb3IpKVxufVxuXG5mdW5jdGlvbiBzdGFydENvcHkgKGRlc3RTdGF0LCBzcmMsIGRlc3QsIG9wdHMsIGNiKSB7XG4gIGlmIChvcHRzLmZpbHRlcikgcmV0dXJuIGhhbmRsZUZpbHRlcihnZXRTdGF0cywgZGVzdFN0YXQsIHNyYywgZGVzdCwgb3B0cywgY2IpXG4gIHJldHVybiBnZXRTdGF0cyhkZXN0U3RhdCwgc3JjLCBkZXN0LCBvcHRzLCBjYilcbn1cblxuZnVuY3Rpb24gZ2V0U3RhdHMgKGRlc3RTdGF0LCBzcmMsIGRlc3QsIG9wdHMsIGNiKSB7XG4gIGNvbnN0IHN0YXQgPSBvcHRzLmRlcmVmZXJlbmNlID8gZnMuc3RhdCA6IGZzLmxzdGF0XG4gIHN0YXQoc3JjLCAoZXJyLCBzcmNTdGF0KSA9PiB7XG4gICAgaWYgKGVycikgcmV0dXJuIGNiKGVycilcblxuICAgIGlmIChzcmNTdGF0LmlzRGlyZWN0b3J5KCkpIHJldHVybiBvbkRpcihzcmNTdGF0LCBkZXN0U3RhdCwgc3JjLCBkZXN0LCBvcHRzLCBjYilcbiAgICBlbHNlIGlmIChzcmNTdGF0LmlzRmlsZSgpIHx8XG4gICAgICAgICAgICAgc3JjU3RhdC5pc0NoYXJhY3RlckRldmljZSgpIHx8XG4gICAgICAgICAgICAgc3JjU3RhdC5pc0Jsb2NrRGV2aWNlKCkpIHJldHVybiBvbkZpbGUoc3JjU3RhdCwgZGVzdFN0YXQsIHNyYywgZGVzdCwgb3B0cywgY2IpXG4gICAgZWxzZSBpZiAoc3JjU3RhdC5pc1N5bWJvbGljTGluaygpKSByZXR1cm4gb25MaW5rKGRlc3RTdGF0LCBzcmMsIGRlc3QsIG9wdHMsIGNiKVxuICB9KVxufVxuXG5mdW5jdGlvbiBvbkZpbGUgKHNyY1N0YXQsIGRlc3RTdGF0LCBzcmMsIGRlc3QsIG9wdHMsIGNiKSB7XG4gIGlmICghZGVzdFN0YXQpIHJldHVybiBjb3B5RmlsZShzcmNTdGF0LCBzcmMsIGRlc3QsIG9wdHMsIGNiKVxuICByZXR1cm4gbWF5Q29weUZpbGUoc3JjU3RhdCwgc3JjLCBkZXN0LCBvcHRzLCBjYilcbn1cblxuZnVuY3Rpb24gbWF5Q29weUZpbGUgKHNyY1N0YXQsIHNyYywgZGVzdCwgb3B0cywgY2IpIHtcbiAgaWYgKG9wdHMub3ZlcndyaXRlKSB7XG4gICAgZnMudW5saW5rKGRlc3QsIGVyciA9PiB7XG4gICAgICBpZiAoZXJyKSByZXR1cm4gY2IoZXJyKVxuICAgICAgcmV0dXJuIGNvcHlGaWxlKHNyY1N0YXQsIHNyYywgZGVzdCwgb3B0cywgY2IpXG4gICAgfSlcbiAgfSBlbHNlIGlmIChvcHRzLmVycm9yT25FeGlzdCkge1xuICAgIHJldHVybiBjYihuZXcgRXJyb3IoYCcke2Rlc3R9JyBhbHJlYWR5IGV4aXN0c2ApKVxuICB9IGVsc2UgcmV0dXJuIGNiKClcbn1cblxuZnVuY3Rpb24gY29weUZpbGUgKHNyY1N0YXQsIHNyYywgZGVzdCwgb3B0cywgY2IpIHtcbiAgaWYgKHR5cGVvZiBmcy5jb3B5RmlsZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBmcy5jb3B5RmlsZShzcmMsIGRlc3QsIGVyciA9PiB7XG4gICAgICBpZiAoZXJyKSByZXR1cm4gY2IoZXJyKVxuICAgICAgcmV0dXJuIHNldERlc3RNb2RlQW5kVGltZXN0YW1wcyhzcmNTdGF0LCBkZXN0LCBvcHRzLCBjYilcbiAgICB9KVxuICB9XG4gIHJldHVybiBjb3B5RmlsZUZhbGxiYWNrKHNyY1N0YXQsIHNyYywgZGVzdCwgb3B0cywgY2IpXG59XG5cbmZ1bmN0aW9uIGNvcHlGaWxlRmFsbGJhY2sgKHNyY1N0YXQsIHNyYywgZGVzdCwgb3B0cywgY2IpIHtcbiAgY29uc3QgcnMgPSBmcy5jcmVhdGVSZWFkU3RyZWFtKHNyYylcbiAgcnMub24oJ2Vycm9yJywgZXJyID0+IGNiKGVycikpLm9uY2UoJ29wZW4nLCAoKSA9PiB7XG4gICAgY29uc3Qgd3MgPSBmcy5jcmVhdGVXcml0ZVN0cmVhbShkZXN0LCB7IG1vZGU6IHNyY1N0YXQubW9kZSB9KVxuICAgIHdzLm9uKCdlcnJvcicsIGVyciA9PiBjYihlcnIpKVxuICAgICAgLm9uKCdvcGVuJywgKCkgPT4gcnMucGlwZSh3cykpXG4gICAgICAub25jZSgnY2xvc2UnLCAoKSA9PiBzZXREZXN0TW9kZUFuZFRpbWVzdGFtcHMoc3JjU3RhdCwgZGVzdCwgb3B0cywgY2IpKVxuICB9KVxufVxuXG5mdW5jdGlvbiBzZXREZXN0TW9kZUFuZFRpbWVzdGFtcHMgKHNyY1N0YXQsIGRlc3QsIG9wdHMsIGNiKSB7XG4gIGZzLmNobW9kKGRlc3QsIHNyY1N0YXQubW9kZSwgZXJyID0+IHtcbiAgICBpZiAoZXJyKSByZXR1cm4gY2IoZXJyKVxuICAgIGlmIChvcHRzLnByZXNlcnZlVGltZXN0YW1wcykge1xuICAgICAgcmV0dXJuIHV0aW1lcyhkZXN0LCBzcmNTdGF0LmF0aW1lLCBzcmNTdGF0Lm10aW1lLCBjYilcbiAgICB9XG4gICAgcmV0dXJuIGNiKClcbiAgfSlcbn1cblxuZnVuY3Rpb24gb25EaXIgKHNyY1N0YXQsIGRlc3RTdGF0LCBzcmMsIGRlc3QsIG9wdHMsIGNiKSB7XG4gIGlmICghZGVzdFN0YXQpIHJldHVybiBta0RpckFuZENvcHkoc3JjU3RhdCwgc3JjLCBkZXN0LCBvcHRzLCBjYilcbiAgaWYgKGRlc3RTdGF0ICYmICFkZXN0U3RhdC5pc0RpcmVjdG9yeSgpKSB7XG4gICAgcmV0dXJuIGNiKG5ldyBFcnJvcihgQ2Fubm90IG92ZXJ3cml0ZSBub24tZGlyZWN0b3J5ICcke2Rlc3R9JyB3aXRoIGRpcmVjdG9yeSAnJHtzcmN9Jy5gKSlcbiAgfVxuICByZXR1cm4gY29weURpcihzcmMsIGRlc3QsIG9wdHMsIGNiKVxufVxuXG5mdW5jdGlvbiBta0RpckFuZENvcHkgKHNyY1N0YXQsIHNyYywgZGVzdCwgb3B0cywgY2IpIHtcbiAgZnMubWtkaXIoZGVzdCwgZXJyID0+IHtcbiAgICBpZiAoZXJyKSByZXR1cm4gY2IoZXJyKVxuICAgIGNvcHlEaXIoc3JjLCBkZXN0LCBvcHRzLCBlcnIgPT4ge1xuICAgICAgaWYgKGVycikgcmV0dXJuIGNiKGVycilcbiAgICAgIHJldHVybiBmcy5jaG1vZChkZXN0LCBzcmNTdGF0Lm1vZGUsIGNiKVxuICAgIH0pXG4gIH0pXG59XG5cbmZ1bmN0aW9uIGNvcHlEaXIgKHNyYywgZGVzdCwgb3B0cywgY2IpIHtcbiAgZnMucmVhZGRpcihzcmMsIChlcnIsIGl0ZW1zKSA9PiB7XG4gICAgaWYgKGVycikgcmV0dXJuIGNiKGVycilcbiAgICByZXR1cm4gY29weURpckl0ZW1zKGl0ZW1zLCBzcmMsIGRlc3QsIG9wdHMsIGNiKVxuICB9KVxufVxuXG5mdW5jdGlvbiBjb3B5RGlySXRlbXMgKGl0ZW1zLCBzcmMsIGRlc3QsIG9wdHMsIGNiKSB7XG4gIGNvbnN0IGl0ZW0gPSBpdGVtcy5wb3AoKVxuICBpZiAoIWl0ZW0pIHJldHVybiBjYigpXG4gIHJldHVybiBjb3B5RGlySXRlbShpdGVtcywgaXRlbSwgc3JjLCBkZXN0LCBvcHRzLCBjYilcbn1cblxuZnVuY3Rpb24gY29weURpckl0ZW0gKGl0ZW1zLCBpdGVtLCBzcmMsIGRlc3QsIG9wdHMsIGNiKSB7XG4gIGNvbnN0IHNyY0l0ZW0gPSBwYXRoLmpvaW4oc3JjLCBpdGVtKVxuICBjb25zdCBkZXN0SXRlbSA9IHBhdGguam9pbihkZXN0LCBpdGVtKVxuICBzdGF0LmNoZWNrUGF0aHMoc3JjSXRlbSwgZGVzdEl0ZW0sICdjb3B5JywgKGVyciwgc3RhdHMpID0+IHtcbiAgICBpZiAoZXJyKSByZXR1cm4gY2IoZXJyKVxuICAgIGNvbnN0IHsgZGVzdFN0YXQgfSA9IHN0YXRzXG4gICAgc3RhcnRDb3B5KGRlc3RTdGF0LCBzcmNJdGVtLCBkZXN0SXRlbSwgb3B0cywgZXJyID0+IHtcbiAgICAgIGlmIChlcnIpIHJldHVybiBjYihlcnIpXG4gICAgICByZXR1cm4gY29weURpckl0ZW1zKGl0ZW1zLCBzcmMsIGRlc3QsIG9wdHMsIGNiKVxuICAgIH0pXG4gIH0pXG59XG5cbmZ1bmN0aW9uIG9uTGluayAoZGVzdFN0YXQsIHNyYywgZGVzdCwgb3B0cywgY2IpIHtcbiAgZnMucmVhZGxpbmsoc3JjLCAoZXJyLCByZXNvbHZlZFNyYykgPT4ge1xuICAgIGlmIChlcnIpIHJldHVybiBjYihlcnIpXG4gICAgaWYgKG9wdHMuZGVyZWZlcmVuY2UpIHtcbiAgICAgIHJlc29sdmVkU3JjID0gcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIHJlc29sdmVkU3JjKVxuICAgIH1cblxuICAgIGlmICghZGVzdFN0YXQpIHtcbiAgICAgIHJldHVybiBmcy5zeW1saW5rKHJlc29sdmVkU3JjLCBkZXN0LCBjYilcbiAgICB9IGVsc2Uge1xuICAgICAgZnMucmVhZGxpbmsoZGVzdCwgKGVyciwgcmVzb2x2ZWREZXN0KSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAvLyBkZXN0IGV4aXN0cyBhbmQgaXMgYSByZWd1bGFyIGZpbGUgb3IgZGlyZWN0b3J5LFxuICAgICAgICAgIC8vIFdpbmRvd3MgbWF5IHRocm93IFVOS05PV04gZXJyb3IuIElmIGRlc3QgYWxyZWFkeSBleGlzdHMsXG4gICAgICAgICAgLy8gZnMgdGhyb3dzIGVycm9yIGFueXdheSwgc28gbm8gbmVlZCB0byBndWFyZCBhZ2FpbnN0IGl0IGhlcmUuXG4gICAgICAgICAgaWYgKGVyci5jb2RlID09PSAnRUlOVkFMJyB8fCBlcnIuY29kZSA9PT0gJ1VOS05PV04nKSByZXR1cm4gZnMuc3ltbGluayhyZXNvbHZlZFNyYywgZGVzdCwgY2IpXG4gICAgICAgICAgcmV0dXJuIGNiKGVycilcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0cy5kZXJlZmVyZW5jZSkge1xuICAgICAgICAgIHJlc29sdmVkRGVzdCA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCByZXNvbHZlZERlc3QpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0YXQuaXNTcmNTdWJkaXIocmVzb2x2ZWRTcmMsIHJlc29sdmVkRGVzdCkpIHtcbiAgICAgICAgICByZXR1cm4gY2IobmV3IEVycm9yKGBDYW5ub3QgY29weSAnJHtyZXNvbHZlZFNyY30nIHRvIGEgc3ViZGlyZWN0b3J5IG9mIGl0c2VsZiwgJyR7cmVzb2x2ZWREZXN0fScuYCkpXG4gICAgICAgIH1cblxuICAgICAgICAvLyBkbyBub3QgY29weSBpZiBzcmMgaXMgYSBzdWJkaXIgb2YgZGVzdCBzaW5jZSB1bmxpbmtpbmdcbiAgICAgICAgLy8gZGVzdCBpbiB0aGlzIGNhc2Ugd291bGQgcmVzdWx0IGluIHJlbW92aW5nIHNyYyBjb250ZW50c1xuICAgICAgICAvLyBhbmQgdGhlcmVmb3JlIGEgYnJva2VuIHN5bWxpbmsgd291bGQgYmUgY3JlYXRlZC5cbiAgICAgICAgaWYgKGRlc3RTdGF0LmlzRGlyZWN0b3J5KCkgJiYgc3RhdC5pc1NyY1N1YmRpcihyZXNvbHZlZERlc3QsIHJlc29sdmVkU3JjKSkge1xuICAgICAgICAgIHJldHVybiBjYihuZXcgRXJyb3IoYENhbm5vdCBvdmVyd3JpdGUgJyR7cmVzb2x2ZWREZXN0fScgd2l0aCAnJHtyZXNvbHZlZFNyY30nLmApKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb3B5TGluayhyZXNvbHZlZFNyYywgZGVzdCwgY2IpXG4gICAgICB9KVxuICAgIH1cbiAgfSlcbn1cblxuZnVuY3Rpb24gY29weUxpbmsgKHJlc29sdmVkU3JjLCBkZXN0LCBjYikge1xuICBmcy51bmxpbmsoZGVzdCwgZXJyID0+IHtcbiAgICBpZiAoZXJyKSByZXR1cm4gY2IoZXJyKVxuICAgIHJldHVybiBmcy5zeW1saW5rKHJlc29sdmVkU3JjLCBkZXN0LCBjYilcbiAgfSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb3B5XG4iLCIndXNlIHN0cmljdCdcbmNvbnN0IHUgPSByZXF1aXJlKCd1bml2ZXJzYWxpZnknKS5mcm9tUHJvbWlzZVxuY29uc3QgZnMgPSByZXF1aXJlKCcuLi9mcycpXG5cbmZ1bmN0aW9uIHBhdGhFeGlzdHMgKHBhdGgpIHtcbiAgcmV0dXJuIGZzLmFjY2VzcyhwYXRoKS50aGVuKCgpID0+IHRydWUpLmNhdGNoKCgpID0+IGZhbHNlKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcGF0aEV4aXN0czogdShwYXRoRXhpc3RzKSxcbiAgcGF0aEV4aXN0c1N5bmM6IGZzLmV4aXN0c1N5bmNcbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCB1ID0gcmVxdWlyZSgndW5pdmVyc2FsaWZ5JykuZnJvbUNhbGxiYWNrXG5jb25zdCBmcyA9IHJlcXVpcmUoJ2dyYWNlZnVsLWZzJylcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcbmNvbnN0IG1rZGlyID0gcmVxdWlyZSgnLi4vbWtkaXJzJylcbmNvbnN0IHJlbW92ZSA9IHJlcXVpcmUoJy4uL3JlbW92ZScpXG5cbmNvbnN0IGVtcHR5RGlyID0gdShmdW5jdGlvbiBlbXB0eURpciAoZGlyLCBjYWxsYmFjaykge1xuICBjYWxsYmFjayA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uICgpIHt9XG4gIGZzLnJlYWRkaXIoZGlyLCAoZXJyLCBpdGVtcykgPT4ge1xuICAgIGlmIChlcnIpIHJldHVybiBta2Rpci5ta2RpcnMoZGlyLCBjYWxsYmFjaylcblxuICAgIGl0ZW1zID0gaXRlbXMubWFwKGl0ZW0gPT4gcGF0aC5qb2luKGRpciwgaXRlbSkpXG5cbiAgICBkZWxldGVJdGVtKClcblxuICAgIGZ1bmN0aW9uIGRlbGV0ZUl0ZW0gKCkge1xuICAgICAgY29uc3QgaXRlbSA9IGl0ZW1zLnBvcCgpXG4gICAgICBpZiAoIWl0ZW0pIHJldHVybiBjYWxsYmFjaygpXG4gICAgICByZW1vdmUucmVtb3ZlKGl0ZW0sIGVyciA9PiB7XG4gICAgICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgICAgIGRlbGV0ZUl0ZW0oKVxuICAgICAgfSlcbiAgICB9XG4gIH0pXG59KVxuXG5mdW5jdGlvbiBlbXB0eURpclN5bmMgKGRpcikge1xuICBsZXQgaXRlbXNcbiAgdHJ5IHtcbiAgICBpdGVtcyA9IGZzLnJlYWRkaXJTeW5jKGRpcilcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIG1rZGlyLm1rZGlyc1N5bmMoZGlyKVxuICB9XG5cbiAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICBpdGVtID0gcGF0aC5qb2luKGRpciwgaXRlbSlcbiAgICByZW1vdmUucmVtb3ZlU3luYyhpdGVtKVxuICB9KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZW1wdHlEaXJTeW5jLFxuICBlbXB0eWRpclN5bmM6IGVtcHR5RGlyU3luYyxcbiAgZW1wdHlEaXIsXG4gIGVtcHR5ZGlyOiBlbXB0eURpclxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IHUgPSByZXF1aXJlKCd1bml2ZXJzYWxpZnknKS5mcm9tQ2FsbGJhY2tcbmNvbnN0IHJpbXJhZiA9IHJlcXVpcmUoJy4vcmltcmFmJylcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJlbW92ZTogdShyaW1yYWYpLFxuICByZW1vdmVTeW5jOiByaW1yYWYuc3luY1xufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGZzID0gcmVxdWlyZSgnZ3JhY2VmdWwtZnMnKVxuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuY29uc3QgYXNzZXJ0ID0gcmVxdWlyZSgnYXNzZXJ0JylcblxuY29uc3QgaXNXaW5kb3dzID0gKHByb2Nlc3MucGxhdGZvcm0gPT09ICd3aW4zMicpXG5cbmZ1bmN0aW9uIGRlZmF1bHRzIChvcHRpb25zKSB7XG4gIGNvbnN0IG1ldGhvZHMgPSBbXG4gICAgJ3VubGluaycsXG4gICAgJ2NobW9kJyxcbiAgICAnc3RhdCcsXG4gICAgJ2xzdGF0JyxcbiAgICAncm1kaXInLFxuICAgICdyZWFkZGlyJ1xuICBdXG4gIG1ldGhvZHMuZm9yRWFjaChtID0+IHtcbiAgICBvcHRpb25zW21dID0gb3B0aW9uc1ttXSB8fCBmc1ttXVxuICAgIG0gPSBtICsgJ1N5bmMnXG4gICAgb3B0aW9uc1ttXSA9IG9wdGlvbnNbbV0gfHwgZnNbbV1cbiAgfSlcblxuICBvcHRpb25zLm1heEJ1c3lUcmllcyA9IG9wdGlvbnMubWF4QnVzeVRyaWVzIHx8IDNcbn1cblxuZnVuY3Rpb24gcmltcmFmIChwLCBvcHRpb25zLCBjYikge1xuICBsZXQgYnVzeVRyaWVzID0gMFxuXG4gIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNiID0gb3B0aW9uc1xuICAgIG9wdGlvbnMgPSB7fVxuICB9XG5cbiAgYXNzZXJ0KHAsICdyaW1yYWY6IG1pc3NpbmcgcGF0aCcpXG4gIGFzc2VydC5zdHJpY3RFcXVhbCh0eXBlb2YgcCwgJ3N0cmluZycsICdyaW1yYWY6IHBhdGggc2hvdWxkIGJlIGEgc3RyaW5nJylcbiAgYXNzZXJ0LnN0cmljdEVxdWFsKHR5cGVvZiBjYiwgJ2Z1bmN0aW9uJywgJ3JpbXJhZjogY2FsbGJhY2sgZnVuY3Rpb24gcmVxdWlyZWQnKVxuICBhc3NlcnQob3B0aW9ucywgJ3JpbXJhZjogaW52YWxpZCBvcHRpb25zIGFyZ3VtZW50IHByb3ZpZGVkJylcbiAgYXNzZXJ0LnN0cmljdEVxdWFsKHR5cGVvZiBvcHRpb25zLCAnb2JqZWN0JywgJ3JpbXJhZjogb3B0aW9ucyBzaG91bGQgYmUgb2JqZWN0JylcblxuICBkZWZhdWx0cyhvcHRpb25zKVxuXG4gIHJpbXJhZl8ocCwgb3B0aW9ucywgZnVuY3Rpb24gQ0IgKGVyKSB7XG4gICAgaWYgKGVyKSB7XG4gICAgICBpZiAoKGVyLmNvZGUgPT09ICdFQlVTWScgfHwgZXIuY29kZSA9PT0gJ0VOT1RFTVBUWScgfHwgZXIuY29kZSA9PT0gJ0VQRVJNJykgJiZcbiAgICAgICAgICBidXN5VHJpZXMgPCBvcHRpb25zLm1heEJ1c3lUcmllcykge1xuICAgICAgICBidXN5VHJpZXMrK1xuICAgICAgICBjb25zdCB0aW1lID0gYnVzeVRyaWVzICogMTAwXG4gICAgICAgIC8vIHRyeSBhZ2Fpbiwgd2l0aCB0aGUgc2FtZSBleGFjdCBjYWxsYmFjayBhcyB0aGlzIG9uZS5cbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoKCkgPT4gcmltcmFmXyhwLCBvcHRpb25zLCBDQiksIHRpbWUpXG4gICAgICB9XG5cbiAgICAgIC8vIGFscmVhZHkgZ29uZVxuICAgICAgaWYgKGVyLmNvZGUgPT09ICdFTk9FTlQnKSBlciA9IG51bGxcbiAgICB9XG5cbiAgICBjYihlcilcbiAgfSlcbn1cblxuLy8gVHdvIHBvc3NpYmxlIHN0cmF0ZWdpZXMuXG4vLyAxLiBBc3N1bWUgaXQncyBhIGZpbGUuICB1bmxpbmsgaXQsIHRoZW4gZG8gdGhlIGRpciBzdHVmZiBvbiBFUEVSTSBvciBFSVNESVJcbi8vIDIuIEFzc3VtZSBpdCdzIGEgZGlyZWN0b3J5LiAgcmVhZGRpciwgdGhlbiBkbyB0aGUgZmlsZSBzdHVmZiBvbiBFTk9URElSXG4vL1xuLy8gQm90aCByZXN1bHQgaW4gYW4gZXh0cmEgc3lzY2FsbCB3aGVuIHlvdSBndWVzcyB3cm9uZy4gIEhvd2V2ZXIsIHRoZXJlXG4vLyBhcmUgbGlrZWx5IGZhciBtb3JlIG5vcm1hbCBmaWxlcyBpbiB0aGUgd29ybGQgdGhhbiBkaXJlY3Rvcmllcy4gIFRoaXNcbi8vIGlzIGJhc2VkIG9uIHRoZSBhc3N1bXB0aW9uIHRoYXQgYSB0aGUgYXZlcmFnZSBudW1iZXIgb2YgZmlsZXMgcGVyXG4vLyBkaXJlY3RvcnkgaXMgPj0gMS5cbi8vXG4vLyBJZiBhbnlvbmUgZXZlciBjb21wbGFpbnMgYWJvdXQgdGhpcywgdGhlbiBJIGd1ZXNzIHRoZSBzdHJhdGVneSBjb3VsZFxuLy8gYmUgbWFkZSBjb25maWd1cmFibGUgc29tZWhvdy4gIEJ1dCB1bnRpbCB0aGVuLCBZQUdOSS5cbmZ1bmN0aW9uIHJpbXJhZl8gKHAsIG9wdGlvbnMsIGNiKSB7XG4gIGFzc2VydChwKVxuICBhc3NlcnQob3B0aW9ucylcbiAgYXNzZXJ0KHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJylcblxuICAvLyBzdW5vcyBsZXRzIHRoZSByb290IHVzZXIgdW5saW5rIGRpcmVjdG9yaWVzLCB3aGljaCBpcy4uLiB3ZWlyZC5cbiAgLy8gc28gd2UgaGF2ZSB0byBsc3RhdCBoZXJlIGFuZCBtYWtlIHN1cmUgaXQncyBub3QgYSBkaXIuXG4gIG9wdGlvbnMubHN0YXQocCwgKGVyLCBzdCkgPT4ge1xuICAgIGlmIChlciAmJiBlci5jb2RlID09PSAnRU5PRU5UJykge1xuICAgICAgcmV0dXJuIGNiKG51bGwpXG4gICAgfVxuXG4gICAgLy8gV2luZG93cyBjYW4gRVBFUk0gb24gc3RhdC4gIExpZmUgaXMgc3VmZmVyaW5nLlxuICAgIGlmIChlciAmJiBlci5jb2RlID09PSAnRVBFUk0nICYmIGlzV2luZG93cykge1xuICAgICAgcmV0dXJuIGZpeFdpbkVQRVJNKHAsIG9wdGlvbnMsIGVyLCBjYilcbiAgICB9XG5cbiAgICBpZiAoc3QgJiYgc3QuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgcmV0dXJuIHJtZGlyKHAsIG9wdGlvbnMsIGVyLCBjYilcbiAgICB9XG5cbiAgICBvcHRpb25zLnVubGluayhwLCBlciA9PiB7XG4gICAgICBpZiAoZXIpIHtcbiAgICAgICAgaWYgKGVyLmNvZGUgPT09ICdFTk9FTlQnKSB7XG4gICAgICAgICAgcmV0dXJuIGNiKG51bGwpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVyLmNvZGUgPT09ICdFUEVSTScpIHtcbiAgICAgICAgICByZXR1cm4gKGlzV2luZG93cylcbiAgICAgICAgICAgID8gZml4V2luRVBFUk0ocCwgb3B0aW9ucywgZXIsIGNiKVxuICAgICAgICAgICAgOiBybWRpcihwLCBvcHRpb25zLCBlciwgY2IpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVyLmNvZGUgPT09ICdFSVNESVInKSB7XG4gICAgICAgICAgcmV0dXJuIHJtZGlyKHAsIG9wdGlvbnMsIGVyLCBjYilcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGNiKGVyKVxuICAgIH0pXG4gIH0pXG59XG5cbmZ1bmN0aW9uIGZpeFdpbkVQRVJNIChwLCBvcHRpb25zLCBlciwgY2IpIHtcbiAgYXNzZXJ0KHApXG4gIGFzc2VydChvcHRpb25zKVxuICBhc3NlcnQodHlwZW9mIGNiID09PSAnZnVuY3Rpb24nKVxuICBpZiAoZXIpIHtcbiAgICBhc3NlcnQoZXIgaW5zdGFuY2VvZiBFcnJvcilcbiAgfVxuXG4gIG9wdGlvbnMuY2htb2QocCwgMG82NjYsIGVyMiA9PiB7XG4gICAgaWYgKGVyMikge1xuICAgICAgY2IoZXIyLmNvZGUgPT09ICdFTk9FTlQnID8gbnVsbCA6IGVyKVxuICAgIH0gZWxzZSB7XG4gICAgICBvcHRpb25zLnN0YXQocCwgKGVyMywgc3RhdHMpID0+IHtcbiAgICAgICAgaWYgKGVyMykge1xuICAgICAgICAgIGNiKGVyMy5jb2RlID09PSAnRU5PRU5UJyA/IG51bGwgOiBlcilcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0cy5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgICAgcm1kaXIocCwgb3B0aW9ucywgZXIsIGNiKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9wdGlvbnMudW5saW5rKHAsIGNiKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfSlcbn1cblxuZnVuY3Rpb24gZml4V2luRVBFUk1TeW5jIChwLCBvcHRpb25zLCBlcikge1xuICBsZXQgc3RhdHNcblxuICBhc3NlcnQocClcbiAgYXNzZXJ0KG9wdGlvbnMpXG4gIGlmIChlcikge1xuICAgIGFzc2VydChlciBpbnN0YW5jZW9mIEVycm9yKVxuICB9XG5cbiAgdHJ5IHtcbiAgICBvcHRpb25zLmNobW9kU3luYyhwLCAwbzY2NilcbiAgfSBjYXRjaCAoZXIyKSB7XG4gICAgaWYgKGVyMi5jb2RlID09PSAnRU5PRU5UJykge1xuICAgICAgcmV0dXJuXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IGVyXG4gICAgfVxuICB9XG5cbiAgdHJ5IHtcbiAgICBzdGF0cyA9IG9wdGlvbnMuc3RhdFN5bmMocClcbiAgfSBjYXRjaCAoZXIzKSB7XG4gICAgaWYgKGVyMy5jb2RlID09PSAnRU5PRU5UJykge1xuICAgICAgcmV0dXJuXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IGVyXG4gICAgfVxuICB9XG5cbiAgaWYgKHN0YXRzLmlzRGlyZWN0b3J5KCkpIHtcbiAgICBybWRpclN5bmMocCwgb3B0aW9ucywgZXIpXG4gIH0gZWxzZSB7XG4gICAgb3B0aW9ucy51bmxpbmtTeW5jKHApXG4gIH1cbn1cblxuZnVuY3Rpb24gcm1kaXIgKHAsIG9wdGlvbnMsIG9yaWdpbmFsRXIsIGNiKSB7XG4gIGFzc2VydChwKVxuICBhc3NlcnQob3B0aW9ucylcbiAgaWYgKG9yaWdpbmFsRXIpIHtcbiAgICBhc3NlcnQob3JpZ2luYWxFciBpbnN0YW5jZW9mIEVycm9yKVxuICB9XG4gIGFzc2VydCh0eXBlb2YgY2IgPT09ICdmdW5jdGlvbicpXG5cbiAgLy8gdHJ5IHRvIHJtZGlyIGZpcnN0LCBhbmQgb25seSByZWFkZGlyIG9uIEVOT1RFTVBUWSBvciBFRVhJU1QgKFN1bk9TKVxuICAvLyBpZiB3ZSBndWVzc2VkIHdyb25nLCBhbmQgaXQncyBub3QgYSBkaXJlY3RvcnksIHRoZW5cbiAgLy8gcmFpc2UgdGhlIG9yaWdpbmFsIGVycm9yLlxuICBvcHRpb25zLnJtZGlyKHAsIGVyID0+IHtcbiAgICBpZiAoZXIgJiYgKGVyLmNvZGUgPT09ICdFTk9URU1QVFknIHx8IGVyLmNvZGUgPT09ICdFRVhJU1QnIHx8IGVyLmNvZGUgPT09ICdFUEVSTScpKSB7XG4gICAgICBybWtpZHMocCwgb3B0aW9ucywgY2IpXG4gICAgfSBlbHNlIGlmIChlciAmJiBlci5jb2RlID09PSAnRU5PVERJUicpIHtcbiAgICAgIGNiKG9yaWdpbmFsRXIpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNiKGVyKVxuICAgIH1cbiAgfSlcbn1cblxuZnVuY3Rpb24gcm1raWRzIChwLCBvcHRpb25zLCBjYikge1xuICBhc3NlcnQocClcbiAgYXNzZXJ0KG9wdGlvbnMpXG4gIGFzc2VydCh0eXBlb2YgY2IgPT09ICdmdW5jdGlvbicpXG5cbiAgb3B0aW9ucy5yZWFkZGlyKHAsIChlciwgZmlsZXMpID0+IHtcbiAgICBpZiAoZXIpIHJldHVybiBjYihlcilcblxuICAgIGxldCBuID0gZmlsZXMubGVuZ3RoXG4gICAgbGV0IGVyclN0YXRlXG5cbiAgICBpZiAobiA9PT0gMCkgcmV0dXJuIG9wdGlvbnMucm1kaXIocCwgY2IpXG5cbiAgICBmaWxlcy5mb3JFYWNoKGYgPT4ge1xuICAgICAgcmltcmFmKHBhdGguam9pbihwLCBmKSwgb3B0aW9ucywgZXIgPT4ge1xuICAgICAgICBpZiAoZXJyU3RhdGUpIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBpZiAoZXIpIHJldHVybiBjYihlcnJTdGF0ZSA9IGVyKVxuICAgICAgICBpZiAoLS1uID09PSAwKSB7XG4gICAgICAgICAgb3B0aW9ucy5ybWRpcihwLCBjYilcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9KVxufVxuXG4vLyB0aGlzIGxvb2tzIHNpbXBsZXIsIGFuZCBpcyBzdHJpY3RseSAqZmFzdGVyKiwgYnV0IHdpbGxcbi8vIHRpZSB1cCB0aGUgSmF2YVNjcmlwdCB0aHJlYWQgYW5kIGZhaWwgb24gZXhjZXNzaXZlbHlcbi8vIGRlZXAgZGlyZWN0b3J5IHRyZWVzLlxuZnVuY3Rpb24gcmltcmFmU3luYyAocCwgb3B0aW9ucykge1xuICBsZXQgc3RcblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICBkZWZhdWx0cyhvcHRpb25zKVxuXG4gIGFzc2VydChwLCAncmltcmFmOiBtaXNzaW5nIHBhdGgnKVxuICBhc3NlcnQuc3RyaWN0RXF1YWwodHlwZW9mIHAsICdzdHJpbmcnLCAncmltcmFmOiBwYXRoIHNob3VsZCBiZSBhIHN0cmluZycpXG4gIGFzc2VydChvcHRpb25zLCAncmltcmFmOiBtaXNzaW5nIG9wdGlvbnMnKVxuICBhc3NlcnQuc3RyaWN0RXF1YWwodHlwZW9mIG9wdGlvbnMsICdvYmplY3QnLCAncmltcmFmOiBvcHRpb25zIHNob3VsZCBiZSBvYmplY3QnKVxuXG4gIHRyeSB7XG4gICAgc3QgPSBvcHRpb25zLmxzdGF0U3luYyhwKVxuICB9IGNhdGNoIChlcikge1xuICAgIGlmIChlci5jb2RlID09PSAnRU5PRU5UJykge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gV2luZG93cyBjYW4gRVBFUk0gb24gc3RhdC4gIExpZmUgaXMgc3VmZmVyaW5nLlxuICAgIGlmIChlci5jb2RlID09PSAnRVBFUk0nICYmIGlzV2luZG93cykge1xuICAgICAgZml4V2luRVBFUk1TeW5jKHAsIG9wdGlvbnMsIGVyKVxuICAgIH1cbiAgfVxuXG4gIHRyeSB7XG4gICAgLy8gc3Vub3MgbGV0cyB0aGUgcm9vdCB1c2VyIHVubGluayBkaXJlY3Rvcmllcywgd2hpY2ggaXMuLi4gd2VpcmQuXG4gICAgaWYgKHN0ICYmIHN0LmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgIHJtZGlyU3luYyhwLCBvcHRpb25zLCBudWxsKVxuICAgIH0gZWxzZSB7XG4gICAgICBvcHRpb25zLnVubGlua1N5bmMocClcbiAgICB9XG4gIH0gY2F0Y2ggKGVyKSB7XG4gICAgaWYgKGVyLmNvZGUgPT09ICdFTk9FTlQnKSB7XG4gICAgICByZXR1cm5cbiAgICB9IGVsc2UgaWYgKGVyLmNvZGUgPT09ICdFUEVSTScpIHtcbiAgICAgIHJldHVybiBpc1dpbmRvd3MgPyBmaXhXaW5FUEVSTVN5bmMocCwgb3B0aW9ucywgZXIpIDogcm1kaXJTeW5jKHAsIG9wdGlvbnMsIGVyKVxuICAgIH0gZWxzZSBpZiAoZXIuY29kZSAhPT0gJ0VJU0RJUicpIHtcbiAgICAgIHRocm93IGVyXG4gICAgfVxuICAgIHJtZGlyU3luYyhwLCBvcHRpb25zLCBlcilcbiAgfVxufVxuXG5mdW5jdGlvbiBybWRpclN5bmMgKHAsIG9wdGlvbnMsIG9yaWdpbmFsRXIpIHtcbiAgYXNzZXJ0KHApXG4gIGFzc2VydChvcHRpb25zKVxuICBpZiAob3JpZ2luYWxFcikge1xuICAgIGFzc2VydChvcmlnaW5hbEVyIGluc3RhbmNlb2YgRXJyb3IpXG4gIH1cblxuICB0cnkge1xuICAgIG9wdGlvbnMucm1kaXJTeW5jKHApXG4gIH0gY2F0Y2ggKGVyKSB7XG4gICAgaWYgKGVyLmNvZGUgPT09ICdFTk9URElSJykge1xuICAgICAgdGhyb3cgb3JpZ2luYWxFclxuICAgIH0gZWxzZSBpZiAoZXIuY29kZSA9PT0gJ0VOT1RFTVBUWScgfHwgZXIuY29kZSA9PT0gJ0VFWElTVCcgfHwgZXIuY29kZSA9PT0gJ0VQRVJNJykge1xuICAgICAgcm1raWRzU3luYyhwLCBvcHRpb25zKVxuICAgIH0gZWxzZSBpZiAoZXIuY29kZSAhPT0gJ0VOT0VOVCcpIHtcbiAgICAgIHRocm93IGVyXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHJta2lkc1N5bmMgKHAsIG9wdGlvbnMpIHtcbiAgYXNzZXJ0KHApXG4gIGFzc2VydChvcHRpb25zKVxuICBvcHRpb25zLnJlYWRkaXJTeW5jKHApLmZvckVhY2goZiA9PiByaW1yYWZTeW5jKHBhdGguam9pbihwLCBmKSwgb3B0aW9ucykpXG5cbiAgaWYgKGlzV2luZG93cykge1xuICAgIC8vIFdlIG9ubHkgZW5kIHVwIGhlcmUgb25jZSB3ZSBnb3QgRU5PVEVNUFRZIGF0IGxlYXN0IG9uY2UsIGFuZFxuICAgIC8vIGF0IHRoaXMgcG9pbnQsIHdlIGFyZSBndWFyYW50ZWVkIHRvIGhhdmUgcmVtb3ZlZCBhbGwgdGhlIGtpZHMuXG4gICAgLy8gU28sIHdlIGtub3cgdGhhdCBpdCB3b24ndCBiZSBFTk9FTlQgb3IgRU5PVERJUiBvciBhbnl0aGluZyBlbHNlLlxuICAgIC8vIHRyeSByZWFsbHkgaGFyZCB0byBkZWxldGUgc3R1ZmYgb24gd2luZG93cywgYmVjYXVzZSBpdCBoYXMgYVxuICAgIC8vIFBST0ZPVU5ETFkgYW5ub3lpbmcgaGFiaXQgb2Ygbm90IGNsb3NpbmcgaGFuZGxlcyBwcm9tcHRseSB3aGVuXG4gICAgLy8gZmlsZXMgYXJlIGRlbGV0ZWQsIHJlc3VsdGluZyBpbiBzcHVyaW91cyBFTk9URU1QVFkgZXJyb3JzLlxuICAgIGNvbnN0IHN0YXJ0VGltZSA9IERhdGUubm93KClcbiAgICBkbyB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXQgPSBvcHRpb25zLnJtZGlyU3luYyhwLCBvcHRpb25zKVxuICAgICAgICByZXR1cm4gcmV0XG4gICAgICB9IGNhdGNoIChlcikgeyB9XG4gICAgfSB3aGlsZSAoRGF0ZS5ub3coKSAtIHN0YXJ0VGltZSA8IDUwMCkgLy8gZ2l2ZSB1cCBhZnRlciA1MDBtc1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IHJldCA9IG9wdGlvbnMucm1kaXJTeW5jKHAsIG9wdGlvbnMpXG4gICAgcmV0dXJuIHJldFxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmltcmFmXG5yaW1yYWYuc3luYyA9IHJpbXJhZlN5bmNcbiIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBmaWxlID0gcmVxdWlyZSgnLi9maWxlJylcbmNvbnN0IGxpbmsgPSByZXF1aXJlKCcuL2xpbmsnKVxuY29uc3Qgc3ltbGluayA9IHJlcXVpcmUoJy4vc3ltbGluaycpXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBmaWxlXG4gIGNyZWF0ZUZpbGU6IGZpbGUuY3JlYXRlRmlsZSxcbiAgY3JlYXRlRmlsZVN5bmM6IGZpbGUuY3JlYXRlRmlsZVN5bmMsXG4gIGVuc3VyZUZpbGU6IGZpbGUuY3JlYXRlRmlsZSxcbiAgZW5zdXJlRmlsZVN5bmM6IGZpbGUuY3JlYXRlRmlsZVN5bmMsXG4gIC8vIGxpbmtcbiAgY3JlYXRlTGluazogbGluay5jcmVhdGVMaW5rLFxuICBjcmVhdGVMaW5rU3luYzogbGluay5jcmVhdGVMaW5rU3luYyxcbiAgZW5zdXJlTGluazogbGluay5jcmVhdGVMaW5rLFxuICBlbnN1cmVMaW5rU3luYzogbGluay5jcmVhdGVMaW5rU3luYyxcbiAgLy8gc3ltbGlua1xuICBjcmVhdGVTeW1saW5rOiBzeW1saW5rLmNyZWF0ZVN5bWxpbmssXG4gIGNyZWF0ZVN5bWxpbmtTeW5jOiBzeW1saW5rLmNyZWF0ZVN5bWxpbmtTeW5jLFxuICBlbnN1cmVTeW1saW5rOiBzeW1saW5rLmNyZWF0ZVN5bWxpbmssXG4gIGVuc3VyZVN5bWxpbmtTeW5jOiBzeW1saW5rLmNyZWF0ZVN5bWxpbmtTeW5jXG59XG4iLCIndXNlIHN0cmljdCdcblxuY29uc3QgdSA9IHJlcXVpcmUoJ3VuaXZlcnNhbGlmeScpLmZyb21DYWxsYmFja1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuY29uc3QgZnMgPSByZXF1aXJlKCdncmFjZWZ1bC1mcycpXG5jb25zdCBta2RpciA9IHJlcXVpcmUoJy4uL21rZGlycycpXG5jb25zdCBwYXRoRXhpc3RzID0gcmVxdWlyZSgnLi4vcGF0aC1leGlzdHMnKS5wYXRoRXhpc3RzXG5cbmZ1bmN0aW9uIGNyZWF0ZUZpbGUgKGZpbGUsIGNhbGxiYWNrKSB7XG4gIGZ1bmN0aW9uIG1ha2VGaWxlICgpIHtcbiAgICBmcy53cml0ZUZpbGUoZmlsZSwgJycsIGVyciA9PiB7XG4gICAgICBpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKVxuICAgICAgY2FsbGJhY2soKVxuICAgIH0pXG4gIH1cblxuICBmcy5zdGF0KGZpbGUsIChlcnIsIHN0YXRzKSA9PiB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgaGFuZGxlLWNhbGxiYWNrLWVyclxuICAgIGlmICghZXJyICYmIHN0YXRzLmlzRmlsZSgpKSByZXR1cm4gY2FsbGJhY2soKVxuICAgIGNvbnN0IGRpciA9IHBhdGguZGlybmFtZShmaWxlKVxuICAgIHBhdGhFeGlzdHMoZGlyLCAoZXJyLCBkaXJFeGlzdHMpID0+IHtcbiAgICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgICBpZiAoZGlyRXhpc3RzKSByZXR1cm4gbWFrZUZpbGUoKVxuICAgICAgbWtkaXIubWtkaXJzKGRpciwgZXJyID0+IHtcbiAgICAgICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycilcbiAgICAgICAgbWFrZUZpbGUoKVxuICAgICAgfSlcbiAgICB9KVxuICB9KVxufVxuXG5mdW5jdGlvbiBjcmVhdGVGaWxlU3luYyAoZmlsZSkge1xuICBsZXQgc3RhdHNcbiAgdHJ5IHtcbiAgICBzdGF0cyA9IGZzLnN0YXRTeW5jKGZpbGUpXG4gIH0gY2F0Y2ggKGUpIHt9XG4gIGlmIChzdGF0cyAmJiBzdGF0cy5pc0ZpbGUoKSkgcmV0dXJuXG5cbiAgY29uc3QgZGlyID0gcGF0aC5kaXJuYW1lKGZpbGUpXG4gIGlmICghZnMuZXhpc3RzU3luYyhkaXIpKSB7XG4gICAgbWtkaXIubWtkaXJzU3luYyhkaXIpXG4gIH1cblxuICBmcy53cml0ZUZpbGVTeW5jKGZpbGUsICcnKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY3JlYXRlRmlsZTogdShjcmVhdGVGaWxlKSxcbiAgY3JlYXRlRmlsZVN5bmNcbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCB1ID0gcmVxdWlyZSgndW5pdmVyc2FsaWZ5JykuZnJvbUNhbGxiYWNrXG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG5jb25zdCBmcyA9IHJlcXVpcmUoJ2dyYWNlZnVsLWZzJylcbmNvbnN0IG1rZGlyID0gcmVxdWlyZSgnLi4vbWtkaXJzJylcbmNvbnN0IHBhdGhFeGlzdHMgPSByZXF1aXJlKCcuLi9wYXRoLWV4aXN0cycpLnBhdGhFeGlzdHNcblxuZnVuY3Rpb24gY3JlYXRlTGluayAoc3JjcGF0aCwgZHN0cGF0aCwgY2FsbGJhY2spIHtcbiAgZnVuY3Rpb24gbWFrZUxpbmsgKHNyY3BhdGgsIGRzdHBhdGgpIHtcbiAgICBmcy5saW5rKHNyY3BhdGgsIGRzdHBhdGgsIGVyciA9PiB7XG4gICAgICBpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKVxuICAgICAgY2FsbGJhY2sobnVsbClcbiAgICB9KVxuICB9XG5cbiAgcGF0aEV4aXN0cyhkc3RwYXRoLCAoZXJyLCBkZXN0aW5hdGlvbkV4aXN0cykgPT4ge1xuICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgaWYgKGRlc3RpbmF0aW9uRXhpc3RzKSByZXR1cm4gY2FsbGJhY2sobnVsbClcbiAgICBmcy5sc3RhdChzcmNwYXRoLCAoZXJyKSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGVyci5tZXNzYWdlID0gZXJyLm1lc3NhZ2UucmVwbGFjZSgnbHN0YXQnLCAnZW5zdXJlTGluaycpXG4gICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRpciA9IHBhdGguZGlybmFtZShkc3RwYXRoKVxuICAgICAgcGF0aEV4aXN0cyhkaXIsIChlcnIsIGRpckV4aXN0cykgPT4ge1xuICAgICAgICBpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKVxuICAgICAgICBpZiAoZGlyRXhpc3RzKSByZXR1cm4gbWFrZUxpbmsoc3JjcGF0aCwgZHN0cGF0aClcbiAgICAgICAgbWtkaXIubWtkaXJzKGRpciwgZXJyID0+IHtcbiAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKVxuICAgICAgICAgIG1ha2VMaW5rKHNyY3BhdGgsIGRzdHBhdGgpXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH0pXG4gIH0pXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxpbmtTeW5jIChzcmNwYXRoLCBkc3RwYXRoKSB7XG4gIGNvbnN0IGRlc3RpbmF0aW9uRXhpc3RzID0gZnMuZXhpc3RzU3luYyhkc3RwYXRoKVxuICBpZiAoZGVzdGluYXRpb25FeGlzdHMpIHJldHVybiB1bmRlZmluZWRcblxuICB0cnkge1xuICAgIGZzLmxzdGF0U3luYyhzcmNwYXRoKVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBlcnIubWVzc2FnZSA9IGVyci5tZXNzYWdlLnJlcGxhY2UoJ2xzdGF0JywgJ2Vuc3VyZUxpbmsnKVxuICAgIHRocm93IGVyclxuICB9XG5cbiAgY29uc3QgZGlyID0gcGF0aC5kaXJuYW1lKGRzdHBhdGgpXG4gIGNvbnN0IGRpckV4aXN0cyA9IGZzLmV4aXN0c1N5bmMoZGlyKVxuICBpZiAoZGlyRXhpc3RzKSByZXR1cm4gZnMubGlua1N5bmMoc3JjcGF0aCwgZHN0cGF0aClcbiAgbWtkaXIubWtkaXJzU3luYyhkaXIpXG5cbiAgcmV0dXJuIGZzLmxpbmtTeW5jKHNyY3BhdGgsIGRzdHBhdGgpXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBjcmVhdGVMaW5rOiB1KGNyZWF0ZUxpbmspLFxuICBjcmVhdGVMaW5rU3luY1xufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IHUgPSByZXF1aXJlKCd1bml2ZXJzYWxpZnknKS5mcm9tQ2FsbGJhY2tcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcbmNvbnN0IGZzID0gcmVxdWlyZSgnZ3JhY2VmdWwtZnMnKVxuY29uc3QgX21rZGlycyA9IHJlcXVpcmUoJy4uL21rZGlycycpXG5jb25zdCBta2RpcnMgPSBfbWtkaXJzLm1rZGlyc1xuY29uc3QgbWtkaXJzU3luYyA9IF9ta2RpcnMubWtkaXJzU3luY1xuXG5jb25zdCBfc3ltbGlua1BhdGhzID0gcmVxdWlyZSgnLi9zeW1saW5rLXBhdGhzJylcbmNvbnN0IHN5bWxpbmtQYXRocyA9IF9zeW1saW5rUGF0aHMuc3ltbGlua1BhdGhzXG5jb25zdCBzeW1saW5rUGF0aHNTeW5jID0gX3N5bWxpbmtQYXRocy5zeW1saW5rUGF0aHNTeW5jXG5cbmNvbnN0IF9zeW1saW5rVHlwZSA9IHJlcXVpcmUoJy4vc3ltbGluay10eXBlJylcbmNvbnN0IHN5bWxpbmtUeXBlID0gX3N5bWxpbmtUeXBlLnN5bWxpbmtUeXBlXG5jb25zdCBzeW1saW5rVHlwZVN5bmMgPSBfc3ltbGlua1R5cGUuc3ltbGlua1R5cGVTeW5jXG5cbmNvbnN0IHBhdGhFeGlzdHMgPSByZXF1aXJlKCcuLi9wYXRoLWV4aXN0cycpLnBhdGhFeGlzdHNcblxuZnVuY3Rpb24gY3JlYXRlU3ltbGluayAoc3JjcGF0aCwgZHN0cGF0aCwgdHlwZSwgY2FsbGJhY2spIHtcbiAgY2FsbGJhY2sgPSAodHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicpID8gdHlwZSA6IGNhbGxiYWNrXG4gIHR5cGUgPSAodHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicpID8gZmFsc2UgOiB0eXBlXG5cbiAgcGF0aEV4aXN0cyhkc3RwYXRoLCAoZXJyLCBkZXN0aW5hdGlvbkV4aXN0cykgPT4ge1xuICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgaWYgKGRlc3RpbmF0aW9uRXhpc3RzKSByZXR1cm4gY2FsbGJhY2sobnVsbClcbiAgICBzeW1saW5rUGF0aHMoc3JjcGF0aCwgZHN0cGF0aCwgKGVyciwgcmVsYXRpdmUpID0+IHtcbiAgICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgICBzcmNwYXRoID0gcmVsYXRpdmUudG9Ec3RcbiAgICAgIHN5bWxpbmtUeXBlKHJlbGF0aXZlLnRvQ3dkLCB0eXBlLCAoZXJyLCB0eXBlKSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgICAgIGNvbnN0IGRpciA9IHBhdGguZGlybmFtZShkc3RwYXRoKVxuICAgICAgICBwYXRoRXhpc3RzKGRpciwgKGVyciwgZGlyRXhpc3RzKSA9PiB7XG4gICAgICAgICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycilcbiAgICAgICAgICBpZiAoZGlyRXhpc3RzKSByZXR1cm4gZnMuc3ltbGluayhzcmNwYXRoLCBkc3RwYXRoLCB0eXBlLCBjYWxsYmFjaylcbiAgICAgICAgICBta2RpcnMoZGlyLCBlcnIgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycilcbiAgICAgICAgICAgIGZzLnN5bWxpbmsoc3JjcGF0aCwgZHN0cGF0aCwgdHlwZSwgY2FsbGJhY2spXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfSlcbn1cblxuZnVuY3Rpb24gY3JlYXRlU3ltbGlua1N5bmMgKHNyY3BhdGgsIGRzdHBhdGgsIHR5cGUpIHtcbiAgY29uc3QgZGVzdGluYXRpb25FeGlzdHMgPSBmcy5leGlzdHNTeW5jKGRzdHBhdGgpXG4gIGlmIChkZXN0aW5hdGlvbkV4aXN0cykgcmV0dXJuIHVuZGVmaW5lZFxuXG4gIGNvbnN0IHJlbGF0aXZlID0gc3ltbGlua1BhdGhzU3luYyhzcmNwYXRoLCBkc3RwYXRoKVxuICBzcmNwYXRoID0gcmVsYXRpdmUudG9Ec3RcbiAgdHlwZSA9IHN5bWxpbmtUeXBlU3luYyhyZWxhdGl2ZS50b0N3ZCwgdHlwZSlcbiAgY29uc3QgZGlyID0gcGF0aC5kaXJuYW1lKGRzdHBhdGgpXG4gIGNvbnN0IGV4aXN0cyA9IGZzLmV4aXN0c1N5bmMoZGlyKVxuICBpZiAoZXhpc3RzKSByZXR1cm4gZnMuc3ltbGlua1N5bmMoc3JjcGF0aCwgZHN0cGF0aCwgdHlwZSlcbiAgbWtkaXJzU3luYyhkaXIpXG4gIHJldHVybiBmcy5zeW1saW5rU3luYyhzcmNwYXRoLCBkc3RwYXRoLCB0eXBlKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY3JlYXRlU3ltbGluazogdShjcmVhdGVTeW1saW5rKSxcbiAgY3JlYXRlU3ltbGlua1N5bmNcbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG5jb25zdCBmcyA9IHJlcXVpcmUoJ2dyYWNlZnVsLWZzJylcbmNvbnN0IHBhdGhFeGlzdHMgPSByZXF1aXJlKCcuLi9wYXRoLWV4aXN0cycpLnBhdGhFeGlzdHNcblxuLyoqXG4gKiBGdW5jdGlvbiB0aGF0IHJldHVybnMgdHdvIHR5cGVzIG9mIHBhdGhzLCBvbmUgcmVsYXRpdmUgdG8gc3ltbGluaywgYW5kIG9uZVxuICogcmVsYXRpdmUgdG8gdGhlIGN1cnJlbnQgd29ya2luZyBkaXJlY3RvcnkuIENoZWNrcyBpZiBwYXRoIGlzIGFic29sdXRlIG9yXG4gKiByZWxhdGl2ZS4gSWYgdGhlIHBhdGggaXMgcmVsYXRpdmUsIHRoaXMgZnVuY3Rpb24gY2hlY2tzIGlmIHRoZSBwYXRoIGlzXG4gKiByZWxhdGl2ZSB0byBzeW1saW5rIG9yIHJlbGF0aXZlIHRvIGN1cnJlbnQgd29ya2luZyBkaXJlY3RvcnkuIFRoaXMgaXMgYW5cbiAqIGluaXRpYXRpdmUgdG8gZmluZCBhIHNtYXJ0ZXIgYHNyY3BhdGhgIHRvIHN1cHBseSB3aGVuIGJ1aWxkaW5nIHN5bWxpbmtzLlxuICogVGhpcyBhbGxvd3MgeW91IHRvIGRldGVybWluZSB3aGljaCBwYXRoIHRvIHVzZSBvdXQgb2Ygb25lIG9mIHRocmVlIHBvc3NpYmxlXG4gKiB0eXBlcyBvZiBzb3VyY2UgcGF0aHMuIFRoZSBmaXJzdCBpcyBhbiBhYnNvbHV0ZSBwYXRoLiBUaGlzIGlzIGRldGVjdGVkIGJ5XG4gKiBgcGF0aC5pc0Fic29sdXRlKClgLiBXaGVuIGFuIGFic29sdXRlIHBhdGggaXMgcHJvdmlkZWQsIGl0IGlzIGNoZWNrZWQgdG9cbiAqIHNlZSBpZiBpdCBleGlzdHMuIElmIGl0IGRvZXMgaXQncyB1c2VkLCBpZiBub3QgYW4gZXJyb3IgaXMgcmV0dXJuZWRcbiAqIChjYWxsYmFjaykvIHRocm93biAoc3luYykuIFRoZSBvdGhlciB0d28gb3B0aW9ucyBmb3IgYHNyY3BhdGhgIGFyZSBhXG4gKiByZWxhdGl2ZSB1cmwuIEJ5IGRlZmF1bHQgTm9kZSdzIGBmcy5zeW1saW5rYCB3b3JrcyBieSBjcmVhdGluZyBhIHN5bWxpbmtcbiAqIHVzaW5nIGBkc3RwYXRoYCBhbmQgZXhwZWN0cyB0aGUgYHNyY3BhdGhgIHRvIGJlIHJlbGF0aXZlIHRvIHRoZSBuZXdseVxuICogY3JlYXRlZCBzeW1saW5rLiBJZiB5b3UgcHJvdmlkZSBhIGBzcmNwYXRoYCB0aGF0IGRvZXMgbm90IGV4aXN0IG9uIHRoZSBmaWxlXG4gKiBzeXN0ZW0gaXQgcmVzdWx0cyBpbiBhIGJyb2tlbiBzeW1saW5rLiBUbyBtaW5pbWl6ZSB0aGlzLCB0aGUgZnVuY3Rpb25cbiAqIGNoZWNrcyB0byBzZWUgaWYgdGhlICdyZWxhdGl2ZSB0byBzeW1saW5rJyBzb3VyY2UgZmlsZSBleGlzdHMsIGFuZCBpZiBpdFxuICogZG9lcyBpdCB3aWxsIHVzZSBpdC4gSWYgaXQgZG9lcyBub3QsIGl0IGNoZWNrcyBpZiB0aGVyZSdzIGEgZmlsZSB0aGF0XG4gKiBleGlzdHMgdGhhdCBpcyByZWxhdGl2ZSB0byB0aGUgY3VycmVudCB3b3JraW5nIGRpcmVjdG9yeSwgaWYgZG9lcyBpdHMgdXNlZC5cbiAqIFRoaXMgcHJlc2VydmVzIHRoZSBleHBlY3RhdGlvbnMgb2YgdGhlIG9yaWdpbmFsIGZzLnN5bWxpbmsgc3BlYyBhbmQgYWRkc1xuICogdGhlIGFiaWxpdHkgdG8gcGFzcyBpbiBgcmVsYXRpdmUgdG8gY3VycmVudCB3b3JraW5nIGRpcmVjb3RyeWAgcGF0aHMuXG4gKi9cblxuZnVuY3Rpb24gc3ltbGlua1BhdGhzIChzcmNwYXRoLCBkc3RwYXRoLCBjYWxsYmFjaykge1xuICBpZiAocGF0aC5pc0Fic29sdXRlKHNyY3BhdGgpKSB7XG4gICAgcmV0dXJuIGZzLmxzdGF0KHNyY3BhdGgsIChlcnIpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSBlcnIubWVzc2FnZS5yZXBsYWNlKCdsc3RhdCcsICdlbnN1cmVTeW1saW5rJylcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycilcbiAgICAgIH1cbiAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCB7XG4gICAgICAgICd0b0N3ZCc6IHNyY3BhdGgsXG4gICAgICAgICd0b0RzdCc6IHNyY3BhdGhcbiAgICAgIH0pXG4gICAgfSlcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBkc3RkaXIgPSBwYXRoLmRpcm5hbWUoZHN0cGF0aClcbiAgICBjb25zdCByZWxhdGl2ZVRvRHN0ID0gcGF0aC5qb2luKGRzdGRpciwgc3JjcGF0aClcbiAgICByZXR1cm4gcGF0aEV4aXN0cyhyZWxhdGl2ZVRvRHN0LCAoZXJyLCBleGlzdHMpID0+IHtcbiAgICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgICBpZiAoZXhpc3RzKSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCB7XG4gICAgICAgICAgJ3RvQ3dkJzogcmVsYXRpdmVUb0RzdCxcbiAgICAgICAgICAndG9Ec3QnOiBzcmNwYXRoXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZnMubHN0YXQoc3JjcGF0aCwgKGVycikgPT4ge1xuICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIGVyci5tZXNzYWdlID0gZXJyLm1lc3NhZ2UucmVwbGFjZSgnbHN0YXQnLCAnZW5zdXJlU3ltbGluaycpXG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyKVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwge1xuICAgICAgICAgICAgJ3RvQ3dkJzogc3JjcGF0aCxcbiAgICAgICAgICAgICd0b0RzdCc6IHBhdGgucmVsYXRpdmUoZHN0ZGlyLCBzcmNwYXRoKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfVxufVxuXG5mdW5jdGlvbiBzeW1saW5rUGF0aHNTeW5jIChzcmNwYXRoLCBkc3RwYXRoKSB7XG4gIGxldCBleGlzdHNcbiAgaWYgKHBhdGguaXNBYnNvbHV0ZShzcmNwYXRoKSkge1xuICAgIGV4aXN0cyA9IGZzLmV4aXN0c1N5bmMoc3JjcGF0aClcbiAgICBpZiAoIWV4aXN0cykgdGhyb3cgbmV3IEVycm9yKCdhYnNvbHV0ZSBzcmNwYXRoIGRvZXMgbm90IGV4aXN0JylcbiAgICByZXR1cm4ge1xuICAgICAgJ3RvQ3dkJzogc3JjcGF0aCxcbiAgICAgICd0b0RzdCc6IHNyY3BhdGhcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgZHN0ZGlyID0gcGF0aC5kaXJuYW1lKGRzdHBhdGgpXG4gICAgY29uc3QgcmVsYXRpdmVUb0RzdCA9IHBhdGguam9pbihkc3RkaXIsIHNyY3BhdGgpXG4gICAgZXhpc3RzID0gZnMuZXhpc3RzU3luYyhyZWxhdGl2ZVRvRHN0KVxuICAgIGlmIChleGlzdHMpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICd0b0N3ZCc6IHJlbGF0aXZlVG9Ec3QsXG4gICAgICAgICd0b0RzdCc6IHNyY3BhdGhcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZXhpc3RzID0gZnMuZXhpc3RzU3luYyhzcmNwYXRoKVxuICAgICAgaWYgKCFleGlzdHMpIHRocm93IG5ldyBFcnJvcigncmVsYXRpdmUgc3JjcGF0aCBkb2VzIG5vdCBleGlzdCcpXG4gICAgICByZXR1cm4ge1xuICAgICAgICAndG9Dd2QnOiBzcmNwYXRoLFxuICAgICAgICAndG9Ec3QnOiBwYXRoLnJlbGF0aXZlKGRzdGRpciwgc3JjcGF0aClcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHN5bWxpbmtQYXRocyxcbiAgc3ltbGlua1BhdGhzU3luY1xufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGZzID0gcmVxdWlyZSgnZ3JhY2VmdWwtZnMnKVxuXG5mdW5jdGlvbiBzeW1saW5rVHlwZSAoc3JjcGF0aCwgdHlwZSwgY2FsbGJhY2spIHtcbiAgY2FsbGJhY2sgPSAodHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicpID8gdHlwZSA6IGNhbGxiYWNrXG4gIHR5cGUgPSAodHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicpID8gZmFsc2UgOiB0eXBlXG4gIGlmICh0eXBlKSByZXR1cm4gY2FsbGJhY2sobnVsbCwgdHlwZSlcbiAgZnMubHN0YXQoc3JjcGF0aCwgKGVyciwgc3RhdHMpID0+IHtcbiAgICBpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2sobnVsbCwgJ2ZpbGUnKVxuICAgIHR5cGUgPSAoc3RhdHMgJiYgc3RhdHMuaXNEaXJlY3RvcnkoKSkgPyAnZGlyJyA6ICdmaWxlJ1xuICAgIGNhbGxiYWNrKG51bGwsIHR5cGUpXG4gIH0pXG59XG5cbmZ1bmN0aW9uIHN5bWxpbmtUeXBlU3luYyAoc3JjcGF0aCwgdHlwZSkge1xuICBsZXQgc3RhdHNcblxuICBpZiAodHlwZSkgcmV0dXJuIHR5cGVcbiAgdHJ5IHtcbiAgICBzdGF0cyA9IGZzLmxzdGF0U3luYyhzcmNwYXRoKVxuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuICdmaWxlJ1xuICB9XG4gIHJldHVybiAoc3RhdHMgJiYgc3RhdHMuaXNEaXJlY3RvcnkoKSkgPyAnZGlyJyA6ICdmaWxlJ1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc3ltbGlua1R5cGUsXG4gIHN5bWxpbmtUeXBlU3luY1xufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IHUgPSByZXF1aXJlKCd1bml2ZXJzYWxpZnknKS5mcm9tQ2FsbGJhY2tcbmNvbnN0IGpzb25GaWxlID0gcmVxdWlyZSgnLi9qc29uZmlsZScpXG5cbmpzb25GaWxlLm91dHB1dEpzb24gPSB1KHJlcXVpcmUoJy4vb3V0cHV0LWpzb24nKSlcbmpzb25GaWxlLm91dHB1dEpzb25TeW5jID0gcmVxdWlyZSgnLi9vdXRwdXQtanNvbi1zeW5jJylcbi8vIGFsaWFzZXNcbmpzb25GaWxlLm91dHB1dEpTT04gPSBqc29uRmlsZS5vdXRwdXRKc29uXG5qc29uRmlsZS5vdXRwdXRKU09OU3luYyA9IGpzb25GaWxlLm91dHB1dEpzb25TeW5jXG5qc29uRmlsZS53cml0ZUpTT04gPSBqc29uRmlsZS53cml0ZUpzb25cbmpzb25GaWxlLndyaXRlSlNPTlN5bmMgPSBqc29uRmlsZS53cml0ZUpzb25TeW5jXG5qc29uRmlsZS5yZWFkSlNPTiA9IGpzb25GaWxlLnJlYWRKc29uXG5qc29uRmlsZS5yZWFkSlNPTlN5bmMgPSBqc29uRmlsZS5yZWFkSnNvblN5bmNcblxubW9kdWxlLmV4cG9ydHMgPSBqc29uRmlsZVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IHUgPSByZXF1aXJlKCd1bml2ZXJzYWxpZnknKS5mcm9tQ2FsbGJhY2tcbmNvbnN0IGpzb25GaWxlID0gcmVxdWlyZSgnanNvbmZpbGUnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8ganNvbmZpbGUgZXhwb3J0c1xuICByZWFkSnNvbjogdShqc29uRmlsZS5yZWFkRmlsZSksXG4gIHJlYWRKc29uU3luYzoganNvbkZpbGUucmVhZEZpbGVTeW5jLFxuICB3cml0ZUpzb246IHUoanNvbkZpbGUud3JpdGVGaWxlKSxcbiAgd3JpdGVKc29uU3luYzoganNvbkZpbGUud3JpdGVGaWxlU3luY1xufVxuIiwidmFyIF9mc1xudHJ5IHtcbiAgX2ZzID0gcmVxdWlyZSgnZ3JhY2VmdWwtZnMnKVxufSBjYXRjaCAoXykge1xuICBfZnMgPSByZXF1aXJlKCdmcycpXG59XG5cbmZ1bmN0aW9uIHJlYWRGaWxlIChmaWxlLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICBpZiAoY2FsbGJhY2sgPT0gbnVsbCkge1xuICAgIGNhbGxiYWNrID0gb3B0aW9uc1xuICAgIG9wdGlvbnMgPSB7fVxuICB9XG5cbiAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnc3RyaW5nJykge1xuICAgIG9wdGlvbnMgPSB7ZW5jb2Rpbmc6IG9wdGlvbnN9XG4gIH1cblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICB2YXIgZnMgPSBvcHRpb25zLmZzIHx8IF9mc1xuXG4gIHZhciBzaG91bGRUaHJvdyA9IHRydWVcbiAgaWYgKCd0aHJvd3MnIGluIG9wdGlvbnMpIHtcbiAgICBzaG91bGRUaHJvdyA9IG9wdGlvbnMudGhyb3dzXG4gIH1cblxuICBmcy5yZWFkRmlsZShmaWxlLCBvcHRpb25zLCBmdW5jdGlvbiAoZXJyLCBkYXRhKSB7XG4gICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycilcblxuICAgIGRhdGEgPSBzdHJpcEJvbShkYXRhKVxuXG4gICAgdmFyIG9ialxuICAgIHRyeSB7XG4gICAgICBvYmogPSBKU09OLnBhcnNlKGRhdGEsIG9wdGlvbnMgPyBvcHRpb25zLnJldml2ZXIgOiBudWxsKVxuICAgIH0gY2F0Y2ggKGVycjIpIHtcbiAgICAgIGlmIChzaG91bGRUaHJvdykge1xuICAgICAgICBlcnIyLm1lc3NhZ2UgPSBmaWxlICsgJzogJyArIGVycjIubWVzc2FnZVxuICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyMilcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCBudWxsKVxuICAgICAgfVxuICAgIH1cblxuICAgIGNhbGxiYWNrKG51bGwsIG9iailcbiAgfSlcbn1cblxuZnVuY3Rpb24gcmVhZEZpbGVTeW5jIChmaWxlLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ3N0cmluZycpIHtcbiAgICBvcHRpb25zID0ge2VuY29kaW5nOiBvcHRpb25zfVxuICB9XG5cbiAgdmFyIGZzID0gb3B0aW9ucy5mcyB8fCBfZnNcblxuICB2YXIgc2hvdWxkVGhyb3cgPSB0cnVlXG4gIGlmICgndGhyb3dzJyBpbiBvcHRpb25zKSB7XG4gICAgc2hvdWxkVGhyb3cgPSBvcHRpb25zLnRocm93c1xuICB9XG5cbiAgdHJ5IHtcbiAgICB2YXIgY29udGVudCA9IGZzLnJlYWRGaWxlU3luYyhmaWxlLCBvcHRpb25zKVxuICAgIGNvbnRlbnQgPSBzdHJpcEJvbShjb250ZW50KVxuICAgIHJldHVybiBKU09OLnBhcnNlKGNvbnRlbnQsIG9wdGlvbnMucmV2aXZlcilcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgaWYgKHNob3VsZFRocm93KSB7XG4gICAgICBlcnIubWVzc2FnZSA9IGZpbGUgKyAnOiAnICsgZXJyLm1lc3NhZ2VcbiAgICAgIHRocm93IGVyclxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnkgKG9iaiwgb3B0aW9ucykge1xuICB2YXIgc3BhY2VzXG4gIHZhciBFT0wgPSAnXFxuJ1xuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdvYmplY3QnICYmIG9wdGlvbnMgIT09IG51bGwpIHtcbiAgICBpZiAob3B0aW9ucy5zcGFjZXMpIHtcbiAgICAgIHNwYWNlcyA9IG9wdGlvbnMuc3BhY2VzXG4gICAgfVxuICAgIGlmIChvcHRpb25zLkVPTCkge1xuICAgICAgRU9MID0gb3B0aW9ucy5FT0xcbiAgICB9XG4gIH1cblxuICB2YXIgc3RyID0gSlNPTi5zdHJpbmdpZnkob2JqLCBvcHRpb25zID8gb3B0aW9ucy5yZXBsYWNlciA6IG51bGwsIHNwYWNlcylcblxuICByZXR1cm4gc3RyLnJlcGxhY2UoL1xcbi9nLCBFT0wpICsgRU9MXG59XG5cbmZ1bmN0aW9uIHdyaXRlRmlsZSAoZmlsZSwgb2JqLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICBpZiAoY2FsbGJhY2sgPT0gbnVsbCkge1xuICAgIGNhbGxiYWNrID0gb3B0aW9uc1xuICAgIG9wdGlvbnMgPSB7fVxuICB9XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gIHZhciBmcyA9IG9wdGlvbnMuZnMgfHwgX2ZzXG5cbiAgdmFyIHN0ciA9ICcnXG4gIHRyeSB7XG4gICAgc3RyID0gc3RyaW5naWZ5KG9iaiwgb3B0aW9ucylcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgLy8gTmVlZCB0byByZXR1cm4gd2hldGhlciBhIGNhbGxiYWNrIHdhcyBwYXNzZWQgb3Igbm90XG4gICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjayhlcnIsIG51bGwpXG4gICAgcmV0dXJuXG4gIH1cblxuICBmcy53cml0ZUZpbGUoZmlsZSwgc3RyLCBvcHRpb25zLCBjYWxsYmFjaylcbn1cblxuZnVuY3Rpb24gd3JpdGVGaWxlU3luYyAoZmlsZSwgb2JqLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gIHZhciBmcyA9IG9wdGlvbnMuZnMgfHwgX2ZzXG5cbiAgdmFyIHN0ciA9IHN0cmluZ2lmeShvYmosIG9wdGlvbnMpXG4gIC8vIG5vdCBzdXJlIGlmIGZzLndyaXRlRmlsZVN5bmMgcmV0dXJucyBhbnl0aGluZywgYnV0IGp1c3QgaW4gY2FzZVxuICByZXR1cm4gZnMud3JpdGVGaWxlU3luYyhmaWxlLCBzdHIsIG9wdGlvbnMpXG59XG5cbmZ1bmN0aW9uIHN0cmlwQm9tIChjb250ZW50KSB7XG4gIC8vIHdlIGRvIHRoaXMgYmVjYXVzZSBKU09OLnBhcnNlIHdvdWxkIGNvbnZlcnQgaXQgdG8gYSB1dGY4IHN0cmluZyBpZiBlbmNvZGluZyB3YXNuJ3Qgc3BlY2lmaWVkXG4gIGlmIChCdWZmZXIuaXNCdWZmZXIoY29udGVudCkpIGNvbnRlbnQgPSBjb250ZW50LnRvU3RyaW5nKCd1dGY4JylcbiAgY29udGVudCA9IGNvbnRlbnQucmVwbGFjZSgvXlxcdUZFRkYvLCAnJylcbiAgcmV0dXJuIGNvbnRlbnRcbn1cblxudmFyIGpzb25maWxlID0ge1xuICByZWFkRmlsZTogcmVhZEZpbGUsXG4gIHJlYWRGaWxlU3luYzogcmVhZEZpbGVTeW5jLFxuICB3cml0ZUZpbGU6IHdyaXRlRmlsZSxcbiAgd3JpdGVGaWxlU3luYzogd3JpdGVGaWxlU3luY1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGpzb25maWxlXG4iLCIndXNlIHN0cmljdCdcblxuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuY29uc3QgbWtkaXIgPSByZXF1aXJlKCcuLi9ta2RpcnMnKVxuY29uc3QgcGF0aEV4aXN0cyA9IHJlcXVpcmUoJy4uL3BhdGgtZXhpc3RzJykucGF0aEV4aXN0c1xuY29uc3QganNvbkZpbGUgPSByZXF1aXJlKCcuL2pzb25maWxlJylcblxuZnVuY3Rpb24gb3V0cHV0SnNvbiAoZmlsZSwgZGF0YSwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2FsbGJhY2sgPSBvcHRpb25zXG4gICAgb3B0aW9ucyA9IHt9XG4gIH1cblxuICBjb25zdCBkaXIgPSBwYXRoLmRpcm5hbWUoZmlsZSlcblxuICBwYXRoRXhpc3RzKGRpciwgKGVyciwgaXREb2VzKSA9PiB7XG4gICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycilcbiAgICBpZiAoaXREb2VzKSByZXR1cm4ganNvbkZpbGUud3JpdGVKc29uKGZpbGUsIGRhdGEsIG9wdGlvbnMsIGNhbGxiYWNrKVxuXG4gICAgbWtkaXIubWtkaXJzKGRpciwgZXJyID0+IHtcbiAgICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgICBqc29uRmlsZS53cml0ZUpzb24oZmlsZSwgZGF0YSwgb3B0aW9ucywgY2FsbGJhY2spXG4gICAgfSlcbiAgfSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBvdXRwdXRKc29uXG4iLCIndXNlIHN0cmljdCdcblxuY29uc3QgZnMgPSByZXF1aXJlKCdncmFjZWZ1bC1mcycpXG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG5jb25zdCBta2RpciA9IHJlcXVpcmUoJy4uL21rZGlycycpXG5jb25zdCBqc29uRmlsZSA9IHJlcXVpcmUoJy4vanNvbmZpbGUnKVxuXG5mdW5jdGlvbiBvdXRwdXRKc29uU3luYyAoZmlsZSwgZGF0YSwgb3B0aW9ucykge1xuICBjb25zdCBkaXIgPSBwYXRoLmRpcm5hbWUoZmlsZSlcblxuICBpZiAoIWZzLmV4aXN0c1N5bmMoZGlyKSkge1xuICAgIG1rZGlyLm1rZGlyc1N5bmMoZGlyKVxuICB9XG5cbiAganNvbkZpbGUud3JpdGVKc29uU3luYyhmaWxlLCBkYXRhLCBvcHRpb25zKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG91dHB1dEpzb25TeW5jXG4iLCIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG1vdmVTeW5jOiByZXF1aXJlKCcuL21vdmUtc3luYycpXG59XG4iLCIndXNlIHN0cmljdCdcblxuY29uc3QgZnMgPSByZXF1aXJlKCdncmFjZWZ1bC1mcycpXG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG5jb25zdCBjb3B5U3luYyA9IHJlcXVpcmUoJy4uL2NvcHktc3luYycpLmNvcHlTeW5jXG5jb25zdCByZW1vdmVTeW5jID0gcmVxdWlyZSgnLi4vcmVtb3ZlJykucmVtb3ZlU3luY1xuY29uc3QgbWtkaXJwU3luYyA9IHJlcXVpcmUoJy4uL21rZGlycycpLm1rZGlycFN5bmNcbmNvbnN0IHN0YXQgPSByZXF1aXJlKCcuLi91dGlsL3N0YXQnKVxuXG5mdW5jdGlvbiBtb3ZlU3luYyAoc3JjLCBkZXN0LCBvcHRzKSB7XG4gIG9wdHMgPSBvcHRzIHx8IHt9XG4gIGNvbnN0IG92ZXJ3cml0ZSA9IG9wdHMub3ZlcndyaXRlIHx8IG9wdHMuY2xvYmJlciB8fCBmYWxzZVxuXG4gIGNvbnN0IHsgc3JjU3RhdCB9ID0gc3RhdC5jaGVja1BhdGhzU3luYyhzcmMsIGRlc3QsICdtb3ZlJylcbiAgc3RhdC5jaGVja1BhcmVudFBhdGhzU3luYyhzcmMsIHNyY1N0YXQsIGRlc3QsICdtb3ZlJylcbiAgbWtkaXJwU3luYyhwYXRoLmRpcm5hbWUoZGVzdCkpXG4gIHJldHVybiBkb1JlbmFtZShzcmMsIGRlc3QsIG92ZXJ3cml0ZSlcbn1cblxuZnVuY3Rpb24gZG9SZW5hbWUgKHNyYywgZGVzdCwgb3ZlcndyaXRlKSB7XG4gIGlmIChvdmVyd3JpdGUpIHtcbiAgICByZW1vdmVTeW5jKGRlc3QpXG4gICAgcmV0dXJuIHJlbmFtZShzcmMsIGRlc3QsIG92ZXJ3cml0ZSlcbiAgfVxuICBpZiAoZnMuZXhpc3RzU3luYyhkZXN0KSkgdGhyb3cgbmV3IEVycm9yKCdkZXN0IGFscmVhZHkgZXhpc3RzLicpXG4gIHJldHVybiByZW5hbWUoc3JjLCBkZXN0LCBvdmVyd3JpdGUpXG59XG5cbmZ1bmN0aW9uIHJlbmFtZSAoc3JjLCBkZXN0LCBvdmVyd3JpdGUpIHtcbiAgdHJ5IHtcbiAgICBmcy5yZW5hbWVTeW5jKHNyYywgZGVzdClcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgaWYgKGVyci5jb2RlICE9PSAnRVhERVYnKSB0aHJvdyBlcnJcbiAgICByZXR1cm4gbW92ZUFjcm9zc0RldmljZShzcmMsIGRlc3QsIG92ZXJ3cml0ZSlcbiAgfVxufVxuXG5mdW5jdGlvbiBtb3ZlQWNyb3NzRGV2aWNlIChzcmMsIGRlc3QsIG92ZXJ3cml0ZSkge1xuICBjb25zdCBvcHRzID0ge1xuICAgIG92ZXJ3cml0ZSxcbiAgICBlcnJvck9uRXhpc3Q6IHRydWVcbiAgfVxuICBjb3B5U3luYyhzcmMsIGRlc3QsIG9wdHMpXG4gIHJldHVybiByZW1vdmVTeW5jKHNyYylcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtb3ZlU3luY1xuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IHUgPSByZXF1aXJlKCd1bml2ZXJzYWxpZnknKS5mcm9tQ2FsbGJhY2tcbm1vZHVsZS5leHBvcnRzID0ge1xuICBtb3ZlOiB1KHJlcXVpcmUoJy4vbW92ZScpKVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGZzID0gcmVxdWlyZSgnZ3JhY2VmdWwtZnMnKVxuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuY29uc3QgY29weSA9IHJlcXVpcmUoJy4uL2NvcHknKS5jb3B5XG5jb25zdCByZW1vdmUgPSByZXF1aXJlKCcuLi9yZW1vdmUnKS5yZW1vdmVcbmNvbnN0IG1rZGlycCA9IHJlcXVpcmUoJy4uL21rZGlycycpLm1rZGlycFxuY29uc3QgcGF0aEV4aXN0cyA9IHJlcXVpcmUoJy4uL3BhdGgtZXhpc3RzJykucGF0aEV4aXN0c1xuY29uc3Qgc3RhdCA9IHJlcXVpcmUoJy4uL3V0aWwvc3RhdCcpXG5cbmZ1bmN0aW9uIG1vdmUgKHNyYywgZGVzdCwgb3B0cywgY2IpIHtcbiAgaWYgKHR5cGVvZiBvcHRzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2IgPSBvcHRzXG4gICAgb3B0cyA9IHt9XG4gIH1cblxuICBjb25zdCBvdmVyd3JpdGUgPSBvcHRzLm92ZXJ3cml0ZSB8fCBvcHRzLmNsb2JiZXIgfHwgZmFsc2VcblxuICBzdGF0LmNoZWNrUGF0aHMoc3JjLCBkZXN0LCAnbW92ZScsIChlcnIsIHN0YXRzKSA9PiB7XG4gICAgaWYgKGVycikgcmV0dXJuIGNiKGVycilcbiAgICBjb25zdCB7IHNyY1N0YXQgfSA9IHN0YXRzXG4gICAgc3RhdC5jaGVja1BhcmVudFBhdGhzKHNyYywgc3JjU3RhdCwgZGVzdCwgJ21vdmUnLCBlcnIgPT4ge1xuICAgICAgaWYgKGVycikgcmV0dXJuIGNiKGVycilcbiAgICAgIG1rZGlycChwYXRoLmRpcm5hbWUoZGVzdCksIGVyciA9PiB7XG4gICAgICAgIGlmIChlcnIpIHJldHVybiBjYihlcnIpXG4gICAgICAgIHJldHVybiBkb1JlbmFtZShzcmMsIGRlc3QsIG92ZXJ3cml0ZSwgY2IpXG4gICAgICB9KVxuICAgIH0pXG4gIH0pXG59XG5cbmZ1bmN0aW9uIGRvUmVuYW1lIChzcmMsIGRlc3QsIG92ZXJ3cml0ZSwgY2IpIHtcbiAgaWYgKG92ZXJ3cml0ZSkge1xuICAgIHJldHVybiByZW1vdmUoZGVzdCwgZXJyID0+IHtcbiAgICAgIGlmIChlcnIpIHJldHVybiBjYihlcnIpXG4gICAgICByZXR1cm4gcmVuYW1lKHNyYywgZGVzdCwgb3ZlcndyaXRlLCBjYilcbiAgICB9KVxuICB9XG4gIHBhdGhFeGlzdHMoZGVzdCwgKGVyciwgZGVzdEV4aXN0cykgPT4ge1xuICAgIGlmIChlcnIpIHJldHVybiBjYihlcnIpXG4gICAgaWYgKGRlc3RFeGlzdHMpIHJldHVybiBjYihuZXcgRXJyb3IoJ2Rlc3QgYWxyZWFkeSBleGlzdHMuJykpXG4gICAgcmV0dXJuIHJlbmFtZShzcmMsIGRlc3QsIG92ZXJ3cml0ZSwgY2IpXG4gIH0pXG59XG5cbmZ1bmN0aW9uIHJlbmFtZSAoc3JjLCBkZXN0LCBvdmVyd3JpdGUsIGNiKSB7XG4gIGZzLnJlbmFtZShzcmMsIGRlc3QsIGVyciA9PiB7XG4gICAgaWYgKCFlcnIpIHJldHVybiBjYigpXG4gICAgaWYgKGVyci5jb2RlICE9PSAnRVhERVYnKSByZXR1cm4gY2IoZXJyKVxuICAgIHJldHVybiBtb3ZlQWNyb3NzRGV2aWNlKHNyYywgZGVzdCwgb3ZlcndyaXRlLCBjYilcbiAgfSlcbn1cblxuZnVuY3Rpb24gbW92ZUFjcm9zc0RldmljZSAoc3JjLCBkZXN0LCBvdmVyd3JpdGUsIGNiKSB7XG4gIGNvbnN0IG9wdHMgPSB7XG4gICAgb3ZlcndyaXRlLFxuICAgIGVycm9yT25FeGlzdDogdHJ1ZVxuICB9XG4gIGNvcHkoc3JjLCBkZXN0LCBvcHRzLCBlcnIgPT4ge1xuICAgIGlmIChlcnIpIHJldHVybiBjYihlcnIpXG4gICAgcmV0dXJuIHJlbW92ZShzcmMsIGNiKVxuICB9KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1vdmVcbiIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCB1ID0gcmVxdWlyZSgndW5pdmVyc2FsaWZ5JykuZnJvbUNhbGxiYWNrXG5jb25zdCBmcyA9IHJlcXVpcmUoJ2dyYWNlZnVsLWZzJylcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcbmNvbnN0IG1rZGlyID0gcmVxdWlyZSgnLi4vbWtkaXJzJylcbmNvbnN0IHBhdGhFeGlzdHMgPSByZXF1aXJlKCcuLi9wYXRoLWV4aXN0cycpLnBhdGhFeGlzdHNcblxuZnVuY3Rpb24gb3V0cHV0RmlsZSAoZmlsZSwgZGF0YSwgZW5jb2RpbmcsIGNhbGxiYWNrKSB7XG4gIGlmICh0eXBlb2YgZW5jb2RpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYWxsYmFjayA9IGVuY29kaW5nXG4gICAgZW5jb2RpbmcgPSAndXRmOCdcbiAgfVxuXG4gIGNvbnN0IGRpciA9IHBhdGguZGlybmFtZShmaWxlKVxuICBwYXRoRXhpc3RzKGRpciwgKGVyciwgaXREb2VzKSA9PiB7XG4gICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycilcbiAgICBpZiAoaXREb2VzKSByZXR1cm4gZnMud3JpdGVGaWxlKGZpbGUsIGRhdGEsIGVuY29kaW5nLCBjYWxsYmFjaylcblxuICAgIG1rZGlyLm1rZGlycyhkaXIsIGVyciA9PiB7XG4gICAgICBpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKVxuXG4gICAgICBmcy53cml0ZUZpbGUoZmlsZSwgZGF0YSwgZW5jb2RpbmcsIGNhbGxiYWNrKVxuICAgIH0pXG4gIH0pXG59XG5cbmZ1bmN0aW9uIG91dHB1dEZpbGVTeW5jIChmaWxlLCAuLi5hcmdzKSB7XG4gIGNvbnN0IGRpciA9IHBhdGguZGlybmFtZShmaWxlKVxuICBpZiAoZnMuZXhpc3RzU3luYyhkaXIpKSB7XG4gICAgcmV0dXJuIGZzLndyaXRlRmlsZVN5bmMoZmlsZSwgLi4uYXJncylcbiAgfVxuICBta2Rpci5ta2RpcnNTeW5jKGRpcilcbiAgZnMud3JpdGVGaWxlU3luYyhmaWxlLCAuLi5hcmdzKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgb3V0cHV0RmlsZTogdShvdXRwdXRGaWxlKSxcbiAgb3V0cHV0RmlsZVN5bmNcbn1cbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFJvbWFuLkdhaWtvdiBvbiAzLzIxLzIwMTlcclxuICovXHJcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmcy1leHRyYVwiO1xyXG5pbXBvcnQge2NvcHlTeW5jLCByZW1vdmVTeW5jfSBmcm9tIFwiZnMtZXh0cmFcIjtcclxuaW1wb3J0IHtub3JtYWxpemUsIHJlbGF0aXZlfSBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgY2hhbGsgZnJvbSBcImNoYWxrXCI7XHJcbmltcG9ydCB7dW5saW5rU3luY30gZnJvbSBcImZzXCI7XHJcbmltcG9ydCB7ZGlyU3luY30gZnJvbSBcInRtcFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZpbGVQYXRoIHtcclxuXHJcbiAgICBwcml2YXRlIF9wYXRoOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IocGF0aDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5wYXRoID0gcGF0aDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcGF0aCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXRoO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBwYXRoKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9wYXRoID0gbm9ybWFsaXplKHZhbHVlKS5yZXBsYWNlKC9cXFxcL2csIFwiL1wiKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IHBhcnRzID0gdGhpcy5wYXRoLnNwbGl0KFwiL1wiKTtcclxuICAgICAgICByZXR1cm4gcGFydHNbcGFydHMubGVuZ3RoIC0gMV07XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGV4dGVuc2lvbigpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IHBhcnRzID0gdGhpcy5uYW1lLnNwbGl0KFwiLlwiKTtcclxuICAgICAgICBpZiAocGFydHMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gcGFydHNbcGFydHMubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBleGlzdHMoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhdGggJiYgZnMuZXhpc3RzU3luYyh0aGlzLl9wYXRoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaXNGb2xkZXIoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuZXhpc3RzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXQgPSBmcy5zdGF0U3luYyh0aGlzLl9wYXRoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHN0YXQuaXNEaXJlY3RvcnkoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc29sdmVQYXRoKHJlbGF0aXZlUGF0aDogc3RyaW5nKTogRmlsZVBhdGgge1xyXG4gICAgICAgIHJldHVybiBuZXcgRmlsZVBhdGgodGhpcy5wYXRoICsgXCIvXCIgKyByZWxhdGl2ZVBhdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbGF0aXZlUGF0aChmaWxlOiBGaWxlUGF0aCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHJlbGF0aXZlKHRoaXMucGF0aCwgZmlsZS5wYXRoKS5yZXBsYWNlKC9cXFxcL2csIFwiL1wiKTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVGb2xkZXIoKTogYm9vbGVhbiB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmV4dGVuc2lvbikge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgZnMuZW5zdXJlRmlsZVN5bmModGhpcy5wYXRoKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiY2FuJ3QgY3JlYXRlIGZpbGUgcGF0aDogXCIsIHRoaXMucGF0aCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgZnMuZW5zdXJlRGlyU3luYyh0aGlzLnBhdGgpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJjYW4ndCBjcmVhdGUgZm9sZGVyIHBhdGg6IFwiLCB0aGlzLnBhdGgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZVRlbXBGb2xkZXIocHJlZml4Pzogc3RyaW5nKTogRmlsZVBhdGgge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGRpclN5bmMoe3ByZWZpeDogcHJlZml4LCB1bnNhZmVDbGVhbnVwOiB0cnVlfSk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBGaWxlUGF0aChyZXN1bHQubmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZSgpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5pc0ZvbGRlcikge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlU3luYyh0aGlzLnBhdGgpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKG51bGwsIGBDYW4ndCByZW1vdmUgZGlyZWN0b3J5ICcke2NoYWxrLmJsdWUodGhpcy5wYXRoKX0nYCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdW5saW5rU3luYyh0aGlzLnBhdGgpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKG51bGwsIGBDYW4ndCByZW1vdmUgZmlsZSAnJHtjaGFsay5ibHVlKHRoaXMucGF0aCl9J2ApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjb3B5KGRlc3RpbmF0aW9uOiBGaWxlUGF0aCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG51bGwsIGBjb3B5ICcke2NoYWxrLmJsdWUodGhpcy5wYXRoKX0nIHRvICcke2NoYWxrLmJsdWUoZGVzdGluYXRpb24ucGF0aCl9J2ApO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvcHlTeW5jKHRoaXMucGF0aCwgZGVzdGluYXRpb24ucGF0aCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKG51bGwsIGBDYW4ndCBjb3B5ICcke2NoYWxrLmJsdWUodGhpcy5wYXRoKX0nIHRvICcke2NoYWxrLmJsdWUoZGVzdGluYXRpb24ucGF0aCl9J2ApO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbGlzdGluZygpOiBGaWxlUGF0aFtdIHtcclxuICAgICAgICBpZiAodGhpcy5pc0ZvbGRlcikge1xyXG4gICAgICAgICAgICBjb25zdCBsaXN0OiBGaWxlUGF0aFtdID0gW107XHJcbiAgICAgICAgICAgIGZzLnJlYWRkaXJTeW5jKHRoaXMucGF0aCkuZm9yRWFjaChmaWxlTmFtZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsaXN0LnB1c2godGhpcy5yZXNvbHZlUGF0aChmaWxlTmFtZSkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGxpc3Q7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsaXN0aW5nRGVlcCgpOiBGaWxlUGF0aFtdIHtcclxuICAgICAgICBjb25zdCBsaXN0OiBGaWxlUGF0aFtdID0gdGhpcy5saXN0aW5nKCk7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IGxpc3Q7XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgZmlsZSBvZiBsaXN0KSB7XHJcbiAgICAgICAgICAgIGlmIChmaWxlLmlzRm9sZGVyKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQuY29uY2F0KGZpbGUubGlzdGluZ0RlZXAoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbn1cclxuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgZXNjYXBlU3RyaW5nUmVnZXhwID0gcmVxdWlyZSgnZXNjYXBlLXN0cmluZy1yZWdleHAnKTtcbmNvbnN0IGFuc2lTdHlsZXMgPSByZXF1aXJlKCdhbnNpLXN0eWxlcycpO1xuY29uc3Qgc3Rkb3V0Q29sb3IgPSByZXF1aXJlKCdzdXBwb3J0cy1jb2xvcicpLnN0ZG91dDtcblxuY29uc3QgdGVtcGxhdGUgPSByZXF1aXJlKCcuL3RlbXBsYXRlcy5qcycpO1xuXG5jb25zdCBpc1NpbXBsZVdpbmRvd3NUZXJtID0gcHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJyAmJiAhKHByb2Nlc3MuZW52LlRFUk0gfHwgJycpLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aCgneHRlcm0nKTtcblxuLy8gYHN1cHBvcnRzQ29sb3IubGV2ZWxgIOKGkiBgYW5zaVN0eWxlcy5jb2xvcltuYW1lXWAgbWFwcGluZ1xuY29uc3QgbGV2ZWxNYXBwaW5nID0gWydhbnNpJywgJ2Fuc2knLCAnYW5zaTI1NicsICdhbnNpMTZtJ107XG5cbi8vIGBjb2xvci1jb252ZXJ0YCBtb2RlbHMgdG8gZXhjbHVkZSBmcm9tIHRoZSBDaGFsayBBUEkgZHVlIHRvIGNvbmZsaWN0cyBhbmQgc3VjaFxuY29uc3Qgc2tpcE1vZGVscyA9IG5ldyBTZXQoWydncmF5J10pO1xuXG5jb25zdCBzdHlsZXMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG5mdW5jdGlvbiBhcHBseU9wdGlvbnMob2JqLCBvcHRpb25zKSB7XG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdC8vIERldGVjdCBsZXZlbCBpZiBub3Qgc2V0IG1hbnVhbGx5XG5cdGNvbnN0IHNjTGV2ZWwgPSBzdGRvdXRDb2xvciA/IHN0ZG91dENvbG9yLmxldmVsIDogMDtcblx0b2JqLmxldmVsID0gb3B0aW9ucy5sZXZlbCA9PT0gdW5kZWZpbmVkID8gc2NMZXZlbCA6IG9wdGlvbnMubGV2ZWw7XG5cdG9iai5lbmFibGVkID0gJ2VuYWJsZWQnIGluIG9wdGlvbnMgPyBvcHRpb25zLmVuYWJsZWQgOiBvYmoubGV2ZWwgPiAwO1xufVxuXG5mdW5jdGlvbiBDaGFsayhvcHRpb25zKSB7XG5cdC8vIFdlIGNoZWNrIGZvciB0aGlzLnRlbXBsYXRlIGhlcmUgc2luY2UgY2FsbGluZyBgY2hhbGsuY29uc3RydWN0b3IoKWBcblx0Ly8gYnkgaXRzZWxmIHdpbGwgaGF2ZSBhIGB0aGlzYCBvZiBhIHByZXZpb3VzbHkgY29uc3RydWN0ZWQgY2hhbGsgb2JqZWN0XG5cdGlmICghdGhpcyB8fCAhKHRoaXMgaW5zdGFuY2VvZiBDaGFsaykgfHwgdGhpcy50ZW1wbGF0ZSkge1xuXHRcdGNvbnN0IGNoYWxrID0ge307XG5cdFx0YXBwbHlPcHRpb25zKGNoYWxrLCBvcHRpb25zKTtcblxuXHRcdGNoYWxrLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0Y29uc3QgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcblx0XHRcdHJldHVybiBjaGFsa1RhZy5hcHBseShudWxsLCBbY2hhbGsudGVtcGxhdGVdLmNvbmNhdChhcmdzKSk7XG5cdFx0fTtcblxuXHRcdE9iamVjdC5zZXRQcm90b3R5cGVPZihjaGFsaywgQ2hhbGsucHJvdG90eXBlKTtcblx0XHRPYmplY3Quc2V0UHJvdG90eXBlT2YoY2hhbGsudGVtcGxhdGUsIGNoYWxrKTtcblxuXHRcdGNoYWxrLnRlbXBsYXRlLmNvbnN0cnVjdG9yID0gQ2hhbGs7XG5cblx0XHRyZXR1cm4gY2hhbGsudGVtcGxhdGU7XG5cdH1cblxuXHRhcHBseU9wdGlvbnModGhpcywgb3B0aW9ucyk7XG59XG5cbi8vIFVzZSBicmlnaHQgYmx1ZSBvbiBXaW5kb3dzIGFzIHRoZSBub3JtYWwgYmx1ZSBjb2xvciBpcyBpbGxlZ2libGVcbmlmIChpc1NpbXBsZVdpbmRvd3NUZXJtKSB7XG5cdGFuc2lTdHlsZXMuYmx1ZS5vcGVuID0gJ1xcdTAwMUJbOTRtJztcbn1cblxuZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoYW5zaVN0eWxlcykpIHtcblx0YW5zaVN0eWxlc1trZXldLmNsb3NlUmUgPSBuZXcgUmVnRXhwKGVzY2FwZVN0cmluZ1JlZ2V4cChhbnNpU3R5bGVzW2tleV0uY2xvc2UpLCAnZycpO1xuXG5cdHN0eWxlc1trZXldID0ge1xuXHRcdGdldCgpIHtcblx0XHRcdGNvbnN0IGNvZGVzID0gYW5zaVN0eWxlc1trZXldO1xuXHRcdFx0cmV0dXJuIGJ1aWxkLmNhbGwodGhpcywgdGhpcy5fc3R5bGVzID8gdGhpcy5fc3R5bGVzLmNvbmNhdChjb2RlcykgOiBbY29kZXNdLCB0aGlzLl9lbXB0eSwga2V5KTtcblx0XHR9XG5cdH07XG59XG5cbnN0eWxlcy52aXNpYmxlID0ge1xuXHRnZXQoKSB7XG5cdFx0cmV0dXJuIGJ1aWxkLmNhbGwodGhpcywgdGhpcy5fc3R5bGVzIHx8IFtdLCB0cnVlLCAndmlzaWJsZScpO1xuXHR9XG59O1xuXG5hbnNpU3R5bGVzLmNvbG9yLmNsb3NlUmUgPSBuZXcgUmVnRXhwKGVzY2FwZVN0cmluZ1JlZ2V4cChhbnNpU3R5bGVzLmNvbG9yLmNsb3NlKSwgJ2cnKTtcbmZvciAoY29uc3QgbW9kZWwgb2YgT2JqZWN0LmtleXMoYW5zaVN0eWxlcy5jb2xvci5hbnNpKSkge1xuXHRpZiAoc2tpcE1vZGVscy5oYXMobW9kZWwpKSB7XG5cdFx0Y29udGludWU7XG5cdH1cblxuXHRzdHlsZXNbbW9kZWxdID0ge1xuXHRcdGdldCgpIHtcblx0XHRcdGNvbnN0IGxldmVsID0gdGhpcy5sZXZlbDtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGNvbnN0IG9wZW4gPSBhbnNpU3R5bGVzLmNvbG9yW2xldmVsTWFwcGluZ1tsZXZlbF1dW21vZGVsXS5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuXHRcdFx0XHRjb25zdCBjb2RlcyA9IHtcblx0XHRcdFx0XHRvcGVuLFxuXHRcdFx0XHRcdGNsb3NlOiBhbnNpU3R5bGVzLmNvbG9yLmNsb3NlLFxuXHRcdFx0XHRcdGNsb3NlUmU6IGFuc2lTdHlsZXMuY29sb3IuY2xvc2VSZVxuXHRcdFx0XHR9O1xuXHRcdFx0XHRyZXR1cm4gYnVpbGQuY2FsbCh0aGlzLCB0aGlzLl9zdHlsZXMgPyB0aGlzLl9zdHlsZXMuY29uY2F0KGNvZGVzKSA6IFtjb2Rlc10sIHRoaXMuX2VtcHR5LCBtb2RlbCk7XG5cdFx0XHR9O1xuXHRcdH1cblx0fTtcbn1cblxuYW5zaVN0eWxlcy5iZ0NvbG9yLmNsb3NlUmUgPSBuZXcgUmVnRXhwKGVzY2FwZVN0cmluZ1JlZ2V4cChhbnNpU3R5bGVzLmJnQ29sb3IuY2xvc2UpLCAnZycpO1xuZm9yIChjb25zdCBtb2RlbCBvZiBPYmplY3Qua2V5cyhhbnNpU3R5bGVzLmJnQ29sb3IuYW5zaSkpIHtcblx0aWYgKHNraXBNb2RlbHMuaGFzKG1vZGVsKSkge1xuXHRcdGNvbnRpbnVlO1xuXHR9XG5cblx0Y29uc3QgYmdNb2RlbCA9ICdiZycgKyBtb2RlbFswXS50b1VwcGVyQ2FzZSgpICsgbW9kZWwuc2xpY2UoMSk7XG5cdHN0eWxlc1tiZ01vZGVsXSA9IHtcblx0XHRnZXQoKSB7XG5cdFx0XHRjb25zdCBsZXZlbCA9IHRoaXMubGV2ZWw7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRjb25zdCBvcGVuID0gYW5zaVN0eWxlcy5iZ0NvbG9yW2xldmVsTWFwcGluZ1tsZXZlbF1dW21vZGVsXS5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuXHRcdFx0XHRjb25zdCBjb2RlcyA9IHtcblx0XHRcdFx0XHRvcGVuLFxuXHRcdFx0XHRcdGNsb3NlOiBhbnNpU3R5bGVzLmJnQ29sb3IuY2xvc2UsXG5cdFx0XHRcdFx0Y2xvc2VSZTogYW5zaVN0eWxlcy5iZ0NvbG9yLmNsb3NlUmVcblx0XHRcdFx0fTtcblx0XHRcdFx0cmV0dXJuIGJ1aWxkLmNhbGwodGhpcywgdGhpcy5fc3R5bGVzID8gdGhpcy5fc3R5bGVzLmNvbmNhdChjb2RlcykgOiBbY29kZXNdLCB0aGlzLl9lbXB0eSwgbW9kZWwpO1xuXHRcdFx0fTtcblx0XHR9XG5cdH07XG59XG5cbmNvbnN0IHByb3RvID0gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoKCkgPT4ge30sIHN0eWxlcyk7XG5cbmZ1bmN0aW9uIGJ1aWxkKF9zdHlsZXMsIF9lbXB0eSwga2V5KSB7XG5cdGNvbnN0IGJ1aWxkZXIgPSBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIGFwcGx5U3R5bGUuYXBwbHkoYnVpbGRlciwgYXJndW1lbnRzKTtcblx0fTtcblxuXHRidWlsZGVyLl9zdHlsZXMgPSBfc3R5bGVzO1xuXHRidWlsZGVyLl9lbXB0eSA9IF9lbXB0eTtcblxuXHRjb25zdCBzZWxmID0gdGhpcztcblxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoYnVpbGRlciwgJ2xldmVsJywge1xuXHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0Z2V0KCkge1xuXHRcdFx0cmV0dXJuIHNlbGYubGV2ZWw7XG5cdFx0fSxcblx0XHRzZXQobGV2ZWwpIHtcblx0XHRcdHNlbGYubGV2ZWwgPSBsZXZlbDtcblx0XHR9XG5cdH0pO1xuXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShidWlsZGVyLCAnZW5hYmxlZCcsIHtcblx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdGdldCgpIHtcblx0XHRcdHJldHVybiBzZWxmLmVuYWJsZWQ7XG5cdFx0fSxcblx0XHRzZXQoZW5hYmxlZCkge1xuXHRcdFx0c2VsZi5lbmFibGVkID0gZW5hYmxlZDtcblx0XHR9XG5cdH0pO1xuXG5cdC8vIFNlZSBiZWxvdyBmb3IgZml4IHJlZ2FyZGluZyBpbnZpc2libGUgZ3JleS9kaW0gY29tYmluYXRpb24gb24gV2luZG93c1xuXHRidWlsZGVyLmhhc0dyZXkgPSB0aGlzLmhhc0dyZXkgfHwga2V5ID09PSAnZ3JheScgfHwga2V5ID09PSAnZ3JleSc7XG5cblx0Ly8gYF9fcHJvdG9fX2AgaXMgdXNlZCBiZWNhdXNlIHdlIG11c3QgcmV0dXJuIGEgZnVuY3Rpb24sIGJ1dCB0aGVyZSBpc1xuXHQvLyBubyB3YXkgdG8gY3JlYXRlIGEgZnVuY3Rpb24gd2l0aCBhIGRpZmZlcmVudCBwcm90b3R5cGVcblx0YnVpbGRlci5fX3Byb3RvX18gPSBwcm90bzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wcm90b1xuXG5cdHJldHVybiBidWlsZGVyO1xufVxuXG5mdW5jdGlvbiBhcHBseVN0eWxlKCkge1xuXHQvLyBTdXBwb3J0IHZhcmFncywgYnV0IHNpbXBseSBjYXN0IHRvIHN0cmluZyBpbiBjYXNlIHRoZXJlJ3Mgb25seSBvbmUgYXJnXG5cdGNvbnN0IGFyZ3MgPSBhcmd1bWVudHM7XG5cdGNvbnN0IGFyZ3NMZW4gPSBhcmdzLmxlbmd0aDtcblx0bGV0IHN0ciA9IFN0cmluZyhhcmd1bWVudHNbMF0pO1xuXG5cdGlmIChhcmdzTGVuID09PSAwKSB7XG5cdFx0cmV0dXJuICcnO1xuXHR9XG5cblx0aWYgKGFyZ3NMZW4gPiAxKSB7XG5cdFx0Ly8gRG9uJ3Qgc2xpY2UgYGFyZ3VtZW50c2AsIGl0IHByZXZlbnRzIFY4IG9wdGltaXphdGlvbnNcblx0XHRmb3IgKGxldCBhID0gMTsgYSA8IGFyZ3NMZW47IGErKykge1xuXHRcdFx0c3RyICs9ICcgJyArIGFyZ3NbYV07XG5cdFx0fVxuXHR9XG5cblx0aWYgKCF0aGlzLmVuYWJsZWQgfHwgdGhpcy5sZXZlbCA8PSAwIHx8ICFzdHIpIHtcblx0XHRyZXR1cm4gdGhpcy5fZW1wdHkgPyAnJyA6IHN0cjtcblx0fVxuXG5cdC8vIFR1cm5zIG91dCB0aGF0IG9uIFdpbmRvd3MgZGltbWVkIGdyYXkgdGV4dCBiZWNvbWVzIGludmlzaWJsZSBpbiBjbWQuZXhlLFxuXHQvLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2NoYWxrL2NoYWxrL2lzc3Vlcy81OFxuXHQvLyBJZiB3ZSdyZSBvbiBXaW5kb3dzIGFuZCB3ZSdyZSBkZWFsaW5nIHdpdGggYSBncmF5IGNvbG9yLCB0ZW1wb3JhcmlseSBtYWtlICdkaW0nIGEgbm9vcC5cblx0Y29uc3Qgb3JpZ2luYWxEaW0gPSBhbnNpU3R5bGVzLmRpbS5vcGVuO1xuXHRpZiAoaXNTaW1wbGVXaW5kb3dzVGVybSAmJiB0aGlzLmhhc0dyZXkpIHtcblx0XHRhbnNpU3R5bGVzLmRpbS5vcGVuID0gJyc7XG5cdH1cblxuXHRmb3IgKGNvbnN0IGNvZGUgb2YgdGhpcy5fc3R5bGVzLnNsaWNlKCkucmV2ZXJzZSgpKSB7XG5cdFx0Ly8gUmVwbGFjZSBhbnkgaW5zdGFuY2VzIGFscmVhZHkgcHJlc2VudCB3aXRoIGEgcmUtb3BlbmluZyBjb2RlXG5cdFx0Ly8gb3RoZXJ3aXNlIG9ubHkgdGhlIHBhcnQgb2YgdGhlIHN0cmluZyB1bnRpbCBzYWlkIGNsb3NpbmcgY29kZVxuXHRcdC8vIHdpbGwgYmUgY29sb3JlZCwgYW5kIHRoZSByZXN0IHdpbGwgc2ltcGx5IGJlICdwbGFpbicuXG5cdFx0c3RyID0gY29kZS5vcGVuICsgc3RyLnJlcGxhY2UoY29kZS5jbG9zZVJlLCBjb2RlLm9wZW4pICsgY29kZS5jbG9zZTtcblxuXHRcdC8vIENsb3NlIHRoZSBzdHlsaW5nIGJlZm9yZSBhIGxpbmVicmVhayBhbmQgcmVvcGVuXG5cdFx0Ly8gYWZ0ZXIgbmV4dCBsaW5lIHRvIGZpeCBhIGJsZWVkIGlzc3VlIG9uIG1hY09TXG5cdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL2NoYWxrL2NoYWxrL3B1bGwvOTJcblx0XHRzdHIgPSBzdHIucmVwbGFjZSgvXFxyP1xcbi9nLCBgJHtjb2RlLmNsb3NlfSQmJHtjb2RlLm9wZW59YCk7XG5cdH1cblxuXHQvLyBSZXNldCB0aGUgb3JpZ2luYWwgYGRpbWAgaWYgd2UgY2hhbmdlZCBpdCB0byB3b3JrIGFyb3VuZCB0aGUgV2luZG93cyBkaW1tZWQgZ3JheSBpc3N1ZVxuXHRhbnNpU3R5bGVzLmRpbS5vcGVuID0gb3JpZ2luYWxEaW07XG5cblx0cmV0dXJuIHN0cjtcbn1cblxuZnVuY3Rpb24gY2hhbGtUYWcoY2hhbGssIHN0cmluZ3MpIHtcblx0aWYgKCFBcnJheS5pc0FycmF5KHN0cmluZ3MpKSB7XG5cdFx0Ly8gSWYgY2hhbGsoKSB3YXMgY2FsbGVkIGJ5IGl0c2VsZiBvciB3aXRoIGEgc3RyaW5nLFxuXHRcdC8vIHJldHVybiB0aGUgc3RyaW5nIGl0c2VsZiBhcyBhIHN0cmluZy5cblx0XHRyZXR1cm4gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLmpvaW4oJyAnKTtcblx0fVxuXG5cdGNvbnN0IGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XG5cdGNvbnN0IHBhcnRzID0gW3N0cmluZ3MucmF3WzBdXTtcblxuXHRmb3IgKGxldCBpID0gMTsgaSA8IHN0cmluZ3MubGVuZ3RoOyBpKyspIHtcblx0XHRwYXJ0cy5wdXNoKFN0cmluZyhhcmdzW2kgLSAxXSkucmVwbGFjZSgvW3t9XFxcXF0vZywgJ1xcXFwkJicpKTtcblx0XHRwYXJ0cy5wdXNoKFN0cmluZyhzdHJpbmdzLnJhd1tpXSkpO1xuXHR9XG5cblx0cmV0dXJuIHRlbXBsYXRlKGNoYWxrLCBwYXJ0cy5qb2luKCcnKSk7XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKENoYWxrLnByb3RvdHlwZSwgc3R5bGVzKTtcblxubW9kdWxlLmV4cG9ydHMgPSBDaGFsaygpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5ldy1jYXBcbm1vZHVsZS5leHBvcnRzLnN1cHBvcnRzQ29sb3IgPSBzdGRvdXRDb2xvcjtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBtb2R1bGUuZXhwb3J0czsgLy8gRm9yIFR5cGVTY3JpcHRcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIG1hdGNoT3BlcmF0b3JzUmUgPSAvW3xcXFxce30oKVtcXF1eJCsqPy5dL2c7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHN0cikge1xuXHRpZiAodHlwZW9mIHN0ciAhPT0gJ3N0cmluZycpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBhIHN0cmluZycpO1xuXHR9XG5cblx0cmV0dXJuIHN0ci5yZXBsYWNlKG1hdGNoT3BlcmF0b3JzUmUsICdcXFxcJCYnKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCBjb2xvckNvbnZlcnQgPSByZXF1aXJlKCdjb2xvci1jb252ZXJ0Jyk7XG5cbmNvbnN0IHdyYXBBbnNpMTYgPSAoZm4sIG9mZnNldCkgPT4gZnVuY3Rpb24gKCkge1xuXHRjb25zdCBjb2RlID0gZm4uYXBwbHkoY29sb3JDb252ZXJ0LCBhcmd1bWVudHMpO1xuXHRyZXR1cm4gYFxcdTAwMUJbJHtjb2RlICsgb2Zmc2V0fW1gO1xufTtcblxuY29uc3Qgd3JhcEFuc2kyNTYgPSAoZm4sIG9mZnNldCkgPT4gZnVuY3Rpb24gKCkge1xuXHRjb25zdCBjb2RlID0gZm4uYXBwbHkoY29sb3JDb252ZXJ0LCBhcmd1bWVudHMpO1xuXHRyZXR1cm4gYFxcdTAwMUJbJHszOCArIG9mZnNldH07NTske2NvZGV9bWA7XG59O1xuXG5jb25zdCB3cmFwQW5zaTE2bSA9IChmbiwgb2Zmc2V0KSA9PiBmdW5jdGlvbiAoKSB7XG5cdGNvbnN0IHJnYiA9IGZuLmFwcGx5KGNvbG9yQ29udmVydCwgYXJndW1lbnRzKTtcblx0cmV0dXJuIGBcXHUwMDFCWyR7MzggKyBvZmZzZXR9OzI7JHtyZ2JbMF19OyR7cmdiWzFdfTske3JnYlsyXX1tYDtcbn07XG5cbmZ1bmN0aW9uIGFzc2VtYmxlU3R5bGVzKCkge1xuXHRjb25zdCBjb2RlcyA9IG5ldyBNYXAoKTtcblx0Y29uc3Qgc3R5bGVzID0ge1xuXHRcdG1vZGlmaWVyOiB7XG5cdFx0XHRyZXNldDogWzAsIDBdLFxuXHRcdFx0Ly8gMjEgaXNuJ3Qgd2lkZWx5IHN1cHBvcnRlZCBhbmQgMjIgZG9lcyB0aGUgc2FtZSB0aGluZ1xuXHRcdFx0Ym9sZDogWzEsIDIyXSxcblx0XHRcdGRpbTogWzIsIDIyXSxcblx0XHRcdGl0YWxpYzogWzMsIDIzXSxcblx0XHRcdHVuZGVybGluZTogWzQsIDI0XSxcblx0XHRcdGludmVyc2U6IFs3LCAyN10sXG5cdFx0XHRoaWRkZW46IFs4LCAyOF0sXG5cdFx0XHRzdHJpa2V0aHJvdWdoOiBbOSwgMjldXG5cdFx0fSxcblx0XHRjb2xvcjoge1xuXHRcdFx0YmxhY2s6IFszMCwgMzldLFxuXHRcdFx0cmVkOiBbMzEsIDM5XSxcblx0XHRcdGdyZWVuOiBbMzIsIDM5XSxcblx0XHRcdHllbGxvdzogWzMzLCAzOV0sXG5cdFx0XHRibHVlOiBbMzQsIDM5XSxcblx0XHRcdG1hZ2VudGE6IFszNSwgMzldLFxuXHRcdFx0Y3lhbjogWzM2LCAzOV0sXG5cdFx0XHR3aGl0ZTogWzM3LCAzOV0sXG5cdFx0XHRncmF5OiBbOTAsIDM5XSxcblxuXHRcdFx0Ly8gQnJpZ2h0IGNvbG9yXG5cdFx0XHRyZWRCcmlnaHQ6IFs5MSwgMzldLFxuXHRcdFx0Z3JlZW5CcmlnaHQ6IFs5MiwgMzldLFxuXHRcdFx0eWVsbG93QnJpZ2h0OiBbOTMsIDM5XSxcblx0XHRcdGJsdWVCcmlnaHQ6IFs5NCwgMzldLFxuXHRcdFx0bWFnZW50YUJyaWdodDogWzk1LCAzOV0sXG5cdFx0XHRjeWFuQnJpZ2h0OiBbOTYsIDM5XSxcblx0XHRcdHdoaXRlQnJpZ2h0OiBbOTcsIDM5XVxuXHRcdH0sXG5cdFx0YmdDb2xvcjoge1xuXHRcdFx0YmdCbGFjazogWzQwLCA0OV0sXG5cdFx0XHRiZ1JlZDogWzQxLCA0OV0sXG5cdFx0XHRiZ0dyZWVuOiBbNDIsIDQ5XSxcblx0XHRcdGJnWWVsbG93OiBbNDMsIDQ5XSxcblx0XHRcdGJnQmx1ZTogWzQ0LCA0OV0sXG5cdFx0XHRiZ01hZ2VudGE6IFs0NSwgNDldLFxuXHRcdFx0YmdDeWFuOiBbNDYsIDQ5XSxcblx0XHRcdGJnV2hpdGU6IFs0NywgNDldLFxuXG5cdFx0XHQvLyBCcmlnaHQgY29sb3Jcblx0XHRcdGJnQmxhY2tCcmlnaHQ6IFsxMDAsIDQ5XSxcblx0XHRcdGJnUmVkQnJpZ2h0OiBbMTAxLCA0OV0sXG5cdFx0XHRiZ0dyZWVuQnJpZ2h0OiBbMTAyLCA0OV0sXG5cdFx0XHRiZ1llbGxvd0JyaWdodDogWzEwMywgNDldLFxuXHRcdFx0YmdCbHVlQnJpZ2h0OiBbMTA0LCA0OV0sXG5cdFx0XHRiZ01hZ2VudGFCcmlnaHQ6IFsxMDUsIDQ5XSxcblx0XHRcdGJnQ3lhbkJyaWdodDogWzEwNiwgNDldLFxuXHRcdFx0YmdXaGl0ZUJyaWdodDogWzEwNywgNDldXG5cdFx0fVxuXHR9O1xuXG5cdC8vIEZpeCBodW1hbnNcblx0c3R5bGVzLmNvbG9yLmdyZXkgPSBzdHlsZXMuY29sb3IuZ3JheTtcblxuXHRmb3IgKGNvbnN0IGdyb3VwTmFtZSBvZiBPYmplY3Qua2V5cyhzdHlsZXMpKSB7XG5cdFx0Y29uc3QgZ3JvdXAgPSBzdHlsZXNbZ3JvdXBOYW1lXTtcblxuXHRcdGZvciAoY29uc3Qgc3R5bGVOYW1lIG9mIE9iamVjdC5rZXlzKGdyb3VwKSkge1xuXHRcdFx0Y29uc3Qgc3R5bGUgPSBncm91cFtzdHlsZU5hbWVdO1xuXG5cdFx0XHRzdHlsZXNbc3R5bGVOYW1lXSA9IHtcblx0XHRcdFx0b3BlbjogYFxcdTAwMUJbJHtzdHlsZVswXX1tYCxcblx0XHRcdFx0Y2xvc2U6IGBcXHUwMDFCWyR7c3R5bGVbMV19bWBcblx0XHRcdH07XG5cblx0XHRcdGdyb3VwW3N0eWxlTmFtZV0gPSBzdHlsZXNbc3R5bGVOYW1lXTtcblxuXHRcdFx0Y29kZXMuc2V0KHN0eWxlWzBdLCBzdHlsZVsxXSk7XG5cdFx0fVxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHN0eWxlcywgZ3JvdXBOYW1lLCB7XG5cdFx0XHR2YWx1ZTogZ3JvdXAsXG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZVxuXHRcdH0pO1xuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHN0eWxlcywgJ2NvZGVzJywge1xuXHRcdFx0dmFsdWU6IGNvZGVzLFxuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2Vcblx0XHR9KTtcblx0fVxuXG5cdGNvbnN0IGFuc2kyYW5zaSA9IG4gPT4gbjtcblx0Y29uc3QgcmdiMnJnYiA9IChyLCBnLCBiKSA9PiBbciwgZywgYl07XG5cblx0c3R5bGVzLmNvbG9yLmNsb3NlID0gJ1xcdTAwMUJbMzltJztcblx0c3R5bGVzLmJnQ29sb3IuY2xvc2UgPSAnXFx1MDAxQls0OW0nO1xuXG5cdHN0eWxlcy5jb2xvci5hbnNpID0ge1xuXHRcdGFuc2k6IHdyYXBBbnNpMTYoYW5zaTJhbnNpLCAwKVxuXHR9O1xuXHRzdHlsZXMuY29sb3IuYW5zaTI1NiA9IHtcblx0XHRhbnNpMjU2OiB3cmFwQW5zaTI1NihhbnNpMmFuc2ksIDApXG5cdH07XG5cdHN0eWxlcy5jb2xvci5hbnNpMTZtID0ge1xuXHRcdHJnYjogd3JhcEFuc2kxNm0ocmdiMnJnYiwgMClcblx0fTtcblxuXHRzdHlsZXMuYmdDb2xvci5hbnNpID0ge1xuXHRcdGFuc2k6IHdyYXBBbnNpMTYoYW5zaTJhbnNpLCAxMClcblx0fTtcblx0c3R5bGVzLmJnQ29sb3IuYW5zaTI1NiA9IHtcblx0XHRhbnNpMjU2OiB3cmFwQW5zaTI1NihhbnNpMmFuc2ksIDEwKVxuXHR9O1xuXHRzdHlsZXMuYmdDb2xvci5hbnNpMTZtID0ge1xuXHRcdHJnYjogd3JhcEFuc2kxNm0ocmdiMnJnYiwgMTApXG5cdH07XG5cblx0Zm9yIChsZXQga2V5IG9mIE9iamVjdC5rZXlzKGNvbG9yQ29udmVydCkpIHtcblx0XHRpZiAodHlwZW9mIGNvbG9yQ29udmVydFtrZXldICE9PSAnb2JqZWN0Jykge1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0Y29uc3Qgc3VpdGUgPSBjb2xvckNvbnZlcnRba2V5XTtcblxuXHRcdGlmIChrZXkgPT09ICdhbnNpMTYnKSB7XG5cdFx0XHRrZXkgPSAnYW5zaSc7XG5cdFx0fVxuXG5cdFx0aWYgKCdhbnNpMTYnIGluIHN1aXRlKSB7XG5cdFx0XHRzdHlsZXMuY29sb3IuYW5zaVtrZXldID0gd3JhcEFuc2kxNihzdWl0ZS5hbnNpMTYsIDApO1xuXHRcdFx0c3R5bGVzLmJnQ29sb3IuYW5zaVtrZXldID0gd3JhcEFuc2kxNihzdWl0ZS5hbnNpMTYsIDEwKTtcblx0XHR9XG5cblx0XHRpZiAoJ2Fuc2kyNTYnIGluIHN1aXRlKSB7XG5cdFx0XHRzdHlsZXMuY29sb3IuYW5zaTI1NltrZXldID0gd3JhcEFuc2kyNTYoc3VpdGUuYW5zaTI1NiwgMCk7XG5cdFx0XHRzdHlsZXMuYmdDb2xvci5hbnNpMjU2W2tleV0gPSB3cmFwQW5zaTI1NihzdWl0ZS5hbnNpMjU2LCAxMCk7XG5cdFx0fVxuXG5cdFx0aWYgKCdyZ2InIGluIHN1aXRlKSB7XG5cdFx0XHRzdHlsZXMuY29sb3IuYW5zaTE2bVtrZXldID0gd3JhcEFuc2kxNm0oc3VpdGUucmdiLCAwKTtcblx0XHRcdHN0eWxlcy5iZ0NvbG9yLmFuc2kxNm1ba2V5XSA9IHdyYXBBbnNpMTZtKHN1aXRlLnJnYiwgMTApO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBzdHlsZXM7XG59XG5cbi8vIE1ha2UgdGhlIGV4cG9ydCBpbW11dGFibGVcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsICdleHBvcnRzJywge1xuXHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRnZXQ6IGFzc2VtYmxlU3R5bGVzXG59KTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdGlmICghbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xuXHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxuXHRcdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImxvYWRlZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5sO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiaWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUuaTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcblx0fVxuXHRyZXR1cm4gbW9kdWxlO1xufTtcbiIsInZhciBjb252ZXJzaW9ucyA9IHJlcXVpcmUoJy4vY29udmVyc2lvbnMnKTtcbnZhciByb3V0ZSA9IHJlcXVpcmUoJy4vcm91dGUnKTtcblxudmFyIGNvbnZlcnQgPSB7fTtcblxudmFyIG1vZGVscyA9IE9iamVjdC5rZXlzKGNvbnZlcnNpb25zKTtcblxuZnVuY3Rpb24gd3JhcFJhdyhmbikge1xuXHR2YXIgd3JhcHBlZEZuID0gZnVuY3Rpb24gKGFyZ3MpIHtcblx0XHRpZiAoYXJncyA9PT0gdW5kZWZpbmVkIHx8IGFyZ3MgPT09IG51bGwpIHtcblx0XHRcdHJldHVybiBhcmdzO1xuXHRcdH1cblxuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuXHRcdFx0YXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZuKGFyZ3MpO1xuXHR9O1xuXG5cdC8vIHByZXNlcnZlIC5jb252ZXJzaW9uIHByb3BlcnR5IGlmIHRoZXJlIGlzIG9uZVxuXHRpZiAoJ2NvbnZlcnNpb24nIGluIGZuKSB7XG5cdFx0d3JhcHBlZEZuLmNvbnZlcnNpb24gPSBmbi5jb252ZXJzaW9uO1xuXHR9XG5cblx0cmV0dXJuIHdyYXBwZWRGbjtcbn1cblxuZnVuY3Rpb24gd3JhcFJvdW5kZWQoZm4pIHtcblx0dmFyIHdyYXBwZWRGbiA9IGZ1bmN0aW9uIChhcmdzKSB7XG5cdFx0aWYgKGFyZ3MgPT09IHVuZGVmaW5lZCB8fCBhcmdzID09PSBudWxsKSB7XG5cdFx0XHRyZXR1cm4gYXJncztcblx0XHR9XG5cblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcblx0XHRcdGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuXHRcdH1cblxuXHRcdHZhciByZXN1bHQgPSBmbihhcmdzKTtcblxuXHRcdC8vIHdlJ3JlIGFzc3VtaW5nIHRoZSByZXN1bHQgaXMgYW4gYXJyYXkgaGVyZS5cblx0XHQvLyBzZWUgbm90aWNlIGluIGNvbnZlcnNpb25zLmpzOyBkb24ndCB1c2UgYm94IHR5cGVzXG5cdFx0Ly8gaW4gY29udmVyc2lvbiBmdW5jdGlvbnMuXG5cdFx0aWYgKHR5cGVvZiByZXN1bHQgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRmb3IgKHZhciBsZW4gPSByZXN1bHQubGVuZ3RoLCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHRcdHJlc3VsdFtpXSA9IE1hdGgucm91bmQocmVzdWx0W2ldKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9O1xuXG5cdC8vIHByZXNlcnZlIC5jb252ZXJzaW9uIHByb3BlcnR5IGlmIHRoZXJlIGlzIG9uZVxuXHRpZiAoJ2NvbnZlcnNpb24nIGluIGZuKSB7XG5cdFx0d3JhcHBlZEZuLmNvbnZlcnNpb24gPSBmbi5jb252ZXJzaW9uO1xuXHR9XG5cblx0cmV0dXJuIHdyYXBwZWRGbjtcbn1cblxubW9kZWxzLmZvckVhY2goZnVuY3Rpb24gKGZyb21Nb2RlbCkge1xuXHRjb252ZXJ0W2Zyb21Nb2RlbF0gPSB7fTtcblxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoY29udmVydFtmcm9tTW9kZWxdLCAnY2hhbm5lbHMnLCB7dmFsdWU6IGNvbnZlcnNpb25zW2Zyb21Nb2RlbF0uY2hhbm5lbHN9KTtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbnZlcnRbZnJvbU1vZGVsXSwgJ2xhYmVscycsIHt2YWx1ZTogY29udmVyc2lvbnNbZnJvbU1vZGVsXS5sYWJlbHN9KTtcblxuXHR2YXIgcm91dGVzID0gcm91dGUoZnJvbU1vZGVsKTtcblx0dmFyIHJvdXRlTW9kZWxzID0gT2JqZWN0LmtleXMocm91dGVzKTtcblxuXHRyb3V0ZU1vZGVscy5mb3JFYWNoKGZ1bmN0aW9uICh0b01vZGVsKSB7XG5cdFx0dmFyIGZuID0gcm91dGVzW3RvTW9kZWxdO1xuXG5cdFx0Y29udmVydFtmcm9tTW9kZWxdW3RvTW9kZWxdID0gd3JhcFJvdW5kZWQoZm4pO1xuXHRcdGNvbnZlcnRbZnJvbU1vZGVsXVt0b01vZGVsXS5yYXcgPSB3cmFwUmF3KGZuKTtcblx0fSk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBjb252ZXJ0O1xuIiwiLyogTUlUIGxpY2Vuc2UgKi9cbnZhciBjc3NLZXl3b3JkcyA9IHJlcXVpcmUoJ2NvbG9yLW5hbWUnKTtcblxuLy8gTk9URTogY29udmVyc2lvbnMgc2hvdWxkIG9ubHkgcmV0dXJuIHByaW1pdGl2ZSB2YWx1ZXMgKGkuZS4gYXJyYXlzLCBvclxuLy8gICAgICAgdmFsdWVzIHRoYXQgZ2l2ZSBjb3JyZWN0IGB0eXBlb2ZgIHJlc3VsdHMpLlxuLy8gICAgICAgZG8gbm90IHVzZSBib3ggdmFsdWVzIHR5cGVzIChpLmUuIE51bWJlcigpLCBTdHJpbmcoKSwgZXRjLilcblxudmFyIHJldmVyc2VLZXl3b3JkcyA9IHt9O1xuZm9yICh2YXIga2V5IGluIGNzc0tleXdvcmRzKSB7XG5cdGlmIChjc3NLZXl3b3Jkcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0cmV2ZXJzZUtleXdvcmRzW2Nzc0tleXdvcmRzW2tleV1dID0ga2V5O1xuXHR9XG59XG5cbnZhciBjb252ZXJ0ID0gbW9kdWxlLmV4cG9ydHMgPSB7XG5cdHJnYjoge2NoYW5uZWxzOiAzLCBsYWJlbHM6ICdyZ2InfSxcblx0aHNsOiB7Y2hhbm5lbHM6IDMsIGxhYmVsczogJ2hzbCd9LFxuXHRoc3Y6IHtjaGFubmVsczogMywgbGFiZWxzOiAnaHN2J30sXG5cdGh3Yjoge2NoYW5uZWxzOiAzLCBsYWJlbHM6ICdod2InfSxcblx0Y215azoge2NoYW5uZWxzOiA0LCBsYWJlbHM6ICdjbXlrJ30sXG5cdHh5ejoge2NoYW5uZWxzOiAzLCBsYWJlbHM6ICd4eXonfSxcblx0bGFiOiB7Y2hhbm5lbHM6IDMsIGxhYmVsczogJ2xhYid9LFxuXHRsY2g6IHtjaGFubmVsczogMywgbGFiZWxzOiAnbGNoJ30sXG5cdGhleDoge2NoYW5uZWxzOiAxLCBsYWJlbHM6IFsnaGV4J119LFxuXHRrZXl3b3JkOiB7Y2hhbm5lbHM6IDEsIGxhYmVsczogWydrZXl3b3JkJ119LFxuXHRhbnNpMTY6IHtjaGFubmVsczogMSwgbGFiZWxzOiBbJ2Fuc2kxNiddfSxcblx0YW5zaTI1Njoge2NoYW5uZWxzOiAxLCBsYWJlbHM6IFsnYW5zaTI1NiddfSxcblx0aGNnOiB7Y2hhbm5lbHM6IDMsIGxhYmVsczogWydoJywgJ2MnLCAnZyddfSxcblx0YXBwbGU6IHtjaGFubmVsczogMywgbGFiZWxzOiBbJ3IxNicsICdnMTYnLCAnYjE2J119LFxuXHRncmF5OiB7Y2hhbm5lbHM6IDEsIGxhYmVsczogWydncmF5J119XG59O1xuXG4vLyBoaWRlIC5jaGFubmVscyBhbmQgLmxhYmVscyBwcm9wZXJ0aWVzXG5mb3IgKHZhciBtb2RlbCBpbiBjb252ZXJ0KSB7XG5cdGlmIChjb252ZXJ0Lmhhc093blByb3BlcnR5KG1vZGVsKSkge1xuXHRcdGlmICghKCdjaGFubmVscycgaW4gY29udmVydFttb2RlbF0pKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ21pc3NpbmcgY2hhbm5lbHMgcHJvcGVydHk6ICcgKyBtb2RlbCk7XG5cdFx0fVxuXG5cdFx0aWYgKCEoJ2xhYmVscycgaW4gY29udmVydFttb2RlbF0pKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ21pc3NpbmcgY2hhbm5lbCBsYWJlbHMgcHJvcGVydHk6ICcgKyBtb2RlbCk7XG5cdFx0fVxuXG5cdFx0aWYgKGNvbnZlcnRbbW9kZWxdLmxhYmVscy5sZW5ndGggIT09IGNvbnZlcnRbbW9kZWxdLmNoYW5uZWxzKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2NoYW5uZWwgYW5kIGxhYmVsIGNvdW50cyBtaXNtYXRjaDogJyArIG1vZGVsKTtcblx0XHR9XG5cblx0XHR2YXIgY2hhbm5lbHMgPSBjb252ZXJ0W21vZGVsXS5jaGFubmVscztcblx0XHR2YXIgbGFiZWxzID0gY29udmVydFttb2RlbF0ubGFiZWxzO1xuXHRcdGRlbGV0ZSBjb252ZXJ0W21vZGVsXS5jaGFubmVscztcblx0XHRkZWxldGUgY29udmVydFttb2RlbF0ubGFiZWxzO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb252ZXJ0W21vZGVsXSwgJ2NoYW5uZWxzJywge3ZhbHVlOiBjaGFubmVsc30pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb252ZXJ0W21vZGVsXSwgJ2xhYmVscycsIHt2YWx1ZTogbGFiZWxzfSk7XG5cdH1cbn1cblxuY29udmVydC5yZ2IuaHNsID0gZnVuY3Rpb24gKHJnYikge1xuXHR2YXIgciA9IHJnYlswXSAvIDI1NTtcblx0dmFyIGcgPSByZ2JbMV0gLyAyNTU7XG5cdHZhciBiID0gcmdiWzJdIC8gMjU1O1xuXHR2YXIgbWluID0gTWF0aC5taW4ociwgZywgYik7XG5cdHZhciBtYXggPSBNYXRoLm1heChyLCBnLCBiKTtcblx0dmFyIGRlbHRhID0gbWF4IC0gbWluO1xuXHR2YXIgaDtcblx0dmFyIHM7XG5cdHZhciBsO1xuXG5cdGlmIChtYXggPT09IG1pbikge1xuXHRcdGggPSAwO1xuXHR9IGVsc2UgaWYgKHIgPT09IG1heCkge1xuXHRcdGggPSAoZyAtIGIpIC8gZGVsdGE7XG5cdH0gZWxzZSBpZiAoZyA9PT0gbWF4KSB7XG5cdFx0aCA9IDIgKyAoYiAtIHIpIC8gZGVsdGE7XG5cdH0gZWxzZSBpZiAoYiA9PT0gbWF4KSB7XG5cdFx0aCA9IDQgKyAociAtIGcpIC8gZGVsdGE7XG5cdH1cblxuXHRoID0gTWF0aC5taW4oaCAqIDYwLCAzNjApO1xuXG5cdGlmIChoIDwgMCkge1xuXHRcdGggKz0gMzYwO1xuXHR9XG5cblx0bCA9IChtaW4gKyBtYXgpIC8gMjtcblxuXHRpZiAobWF4ID09PSBtaW4pIHtcblx0XHRzID0gMDtcblx0fSBlbHNlIGlmIChsIDw9IDAuNSkge1xuXHRcdHMgPSBkZWx0YSAvIChtYXggKyBtaW4pO1xuXHR9IGVsc2Uge1xuXHRcdHMgPSBkZWx0YSAvICgyIC0gbWF4IC0gbWluKTtcblx0fVxuXG5cdHJldHVybiBbaCwgcyAqIDEwMCwgbCAqIDEwMF07XG59O1xuXG5jb252ZXJ0LnJnYi5oc3YgPSBmdW5jdGlvbiAocmdiKSB7XG5cdHZhciByZGlmO1xuXHR2YXIgZ2RpZjtcblx0dmFyIGJkaWY7XG5cdHZhciBoO1xuXHR2YXIgcztcblxuXHR2YXIgciA9IHJnYlswXSAvIDI1NTtcblx0dmFyIGcgPSByZ2JbMV0gLyAyNTU7XG5cdHZhciBiID0gcmdiWzJdIC8gMjU1O1xuXHR2YXIgdiA9IE1hdGgubWF4KHIsIGcsIGIpO1xuXHR2YXIgZGlmZiA9IHYgLSBNYXRoLm1pbihyLCBnLCBiKTtcblx0dmFyIGRpZmZjID0gZnVuY3Rpb24gKGMpIHtcblx0XHRyZXR1cm4gKHYgLSBjKSAvIDYgLyBkaWZmICsgMSAvIDI7XG5cdH07XG5cblx0aWYgKGRpZmYgPT09IDApIHtcblx0XHRoID0gcyA9IDA7XG5cdH0gZWxzZSB7XG5cdFx0cyA9IGRpZmYgLyB2O1xuXHRcdHJkaWYgPSBkaWZmYyhyKTtcblx0XHRnZGlmID0gZGlmZmMoZyk7XG5cdFx0YmRpZiA9IGRpZmZjKGIpO1xuXG5cdFx0aWYgKHIgPT09IHYpIHtcblx0XHRcdGggPSBiZGlmIC0gZ2RpZjtcblx0XHR9IGVsc2UgaWYgKGcgPT09IHYpIHtcblx0XHRcdGggPSAoMSAvIDMpICsgcmRpZiAtIGJkaWY7XG5cdFx0fSBlbHNlIGlmIChiID09PSB2KSB7XG5cdFx0XHRoID0gKDIgLyAzKSArIGdkaWYgLSByZGlmO1xuXHRcdH1cblx0XHRpZiAoaCA8IDApIHtcblx0XHRcdGggKz0gMTtcblx0XHR9IGVsc2UgaWYgKGggPiAxKSB7XG5cdFx0XHRoIC09IDE7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIFtcblx0XHRoICogMzYwLFxuXHRcdHMgKiAxMDAsXG5cdFx0diAqIDEwMFxuXHRdO1xufTtcblxuY29udmVydC5yZ2IuaHdiID0gZnVuY3Rpb24gKHJnYikge1xuXHR2YXIgciA9IHJnYlswXTtcblx0dmFyIGcgPSByZ2JbMV07XG5cdHZhciBiID0gcmdiWzJdO1xuXHR2YXIgaCA9IGNvbnZlcnQucmdiLmhzbChyZ2IpWzBdO1xuXHR2YXIgdyA9IDEgLyAyNTUgKiBNYXRoLm1pbihyLCBNYXRoLm1pbihnLCBiKSk7XG5cblx0YiA9IDEgLSAxIC8gMjU1ICogTWF0aC5tYXgociwgTWF0aC5tYXgoZywgYikpO1xuXG5cdHJldHVybiBbaCwgdyAqIDEwMCwgYiAqIDEwMF07XG59O1xuXG5jb252ZXJ0LnJnYi5jbXlrID0gZnVuY3Rpb24gKHJnYikge1xuXHR2YXIgciA9IHJnYlswXSAvIDI1NTtcblx0dmFyIGcgPSByZ2JbMV0gLyAyNTU7XG5cdHZhciBiID0gcmdiWzJdIC8gMjU1O1xuXHR2YXIgYztcblx0dmFyIG07XG5cdHZhciB5O1xuXHR2YXIgaztcblxuXHRrID0gTWF0aC5taW4oMSAtIHIsIDEgLSBnLCAxIC0gYik7XG5cdGMgPSAoMSAtIHIgLSBrKSAvICgxIC0gaykgfHwgMDtcblx0bSA9ICgxIC0gZyAtIGspIC8gKDEgLSBrKSB8fCAwO1xuXHR5ID0gKDEgLSBiIC0gaykgLyAoMSAtIGspIHx8IDA7XG5cblx0cmV0dXJuIFtjICogMTAwLCBtICogMTAwLCB5ICogMTAwLCBrICogMTAwXTtcbn07XG5cbi8qKlxuICogU2VlIGh0dHBzOi8vZW4ubS53aWtpcGVkaWEub3JnL3dpa2kvRXVjbGlkZWFuX2Rpc3RhbmNlI1NxdWFyZWRfRXVjbGlkZWFuX2Rpc3RhbmNlXG4gKiAqL1xuZnVuY3Rpb24gY29tcGFyYXRpdmVEaXN0YW5jZSh4LCB5KSB7XG5cdHJldHVybiAoXG5cdFx0TWF0aC5wb3coeFswXSAtIHlbMF0sIDIpICtcblx0XHRNYXRoLnBvdyh4WzFdIC0geVsxXSwgMikgK1xuXHRcdE1hdGgucG93KHhbMl0gLSB5WzJdLCAyKVxuXHQpO1xufVxuXG5jb252ZXJ0LnJnYi5rZXl3b3JkID0gZnVuY3Rpb24gKHJnYikge1xuXHR2YXIgcmV2ZXJzZWQgPSByZXZlcnNlS2V5d29yZHNbcmdiXTtcblx0aWYgKHJldmVyc2VkKSB7XG5cdFx0cmV0dXJuIHJldmVyc2VkO1xuXHR9XG5cblx0dmFyIGN1cnJlbnRDbG9zZXN0RGlzdGFuY2UgPSBJbmZpbml0eTtcblx0dmFyIGN1cnJlbnRDbG9zZXN0S2V5d29yZDtcblxuXHRmb3IgKHZhciBrZXl3b3JkIGluIGNzc0tleXdvcmRzKSB7XG5cdFx0aWYgKGNzc0tleXdvcmRzLmhhc093blByb3BlcnR5KGtleXdvcmQpKSB7XG5cdFx0XHR2YXIgdmFsdWUgPSBjc3NLZXl3b3Jkc1trZXl3b3JkXTtcblxuXHRcdFx0Ly8gQ29tcHV0ZSBjb21wYXJhdGl2ZSBkaXN0YW5jZVxuXHRcdFx0dmFyIGRpc3RhbmNlID0gY29tcGFyYXRpdmVEaXN0YW5jZShyZ2IsIHZhbHVlKTtcblxuXHRcdFx0Ly8gQ2hlY2sgaWYgaXRzIGxlc3MsIGlmIHNvIHNldCBhcyBjbG9zZXN0XG5cdFx0XHRpZiAoZGlzdGFuY2UgPCBjdXJyZW50Q2xvc2VzdERpc3RhbmNlKSB7XG5cdFx0XHRcdGN1cnJlbnRDbG9zZXN0RGlzdGFuY2UgPSBkaXN0YW5jZTtcblx0XHRcdFx0Y3VycmVudENsb3Nlc3RLZXl3b3JkID0ga2V5d29yZDtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gY3VycmVudENsb3Nlc3RLZXl3b3JkO1xufTtcblxuY29udmVydC5rZXl3b3JkLnJnYiA9IGZ1bmN0aW9uIChrZXl3b3JkKSB7XG5cdHJldHVybiBjc3NLZXl3b3Jkc1trZXl3b3JkXTtcbn07XG5cbmNvbnZlcnQucmdiLnh5eiA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0dmFyIHIgPSByZ2JbMF0gLyAyNTU7XG5cdHZhciBnID0gcmdiWzFdIC8gMjU1O1xuXHR2YXIgYiA9IHJnYlsyXSAvIDI1NTtcblxuXHQvLyBhc3N1bWUgc1JHQlxuXHRyID0gciA+IDAuMDQwNDUgPyBNYXRoLnBvdygoKHIgKyAwLjA1NSkgLyAxLjA1NSksIDIuNCkgOiAociAvIDEyLjkyKTtcblx0ZyA9IGcgPiAwLjA0MDQ1ID8gTWF0aC5wb3coKChnICsgMC4wNTUpIC8gMS4wNTUpLCAyLjQpIDogKGcgLyAxMi45Mik7XG5cdGIgPSBiID4gMC4wNDA0NSA/IE1hdGgucG93KCgoYiArIDAuMDU1KSAvIDEuMDU1KSwgMi40KSA6IChiIC8gMTIuOTIpO1xuXG5cdHZhciB4ID0gKHIgKiAwLjQxMjQpICsgKGcgKiAwLjM1NzYpICsgKGIgKiAwLjE4MDUpO1xuXHR2YXIgeSA9IChyICogMC4yMTI2KSArIChnICogMC43MTUyKSArIChiICogMC4wNzIyKTtcblx0dmFyIHogPSAociAqIDAuMDE5MykgKyAoZyAqIDAuMTE5MikgKyAoYiAqIDAuOTUwNSk7XG5cblx0cmV0dXJuIFt4ICogMTAwLCB5ICogMTAwLCB6ICogMTAwXTtcbn07XG5cbmNvbnZlcnQucmdiLmxhYiA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0dmFyIHh5eiA9IGNvbnZlcnQucmdiLnh5eihyZ2IpO1xuXHR2YXIgeCA9IHh5elswXTtcblx0dmFyIHkgPSB4eXpbMV07XG5cdHZhciB6ID0geHl6WzJdO1xuXHR2YXIgbDtcblx0dmFyIGE7XG5cdHZhciBiO1xuXG5cdHggLz0gOTUuMDQ3O1xuXHR5IC89IDEwMDtcblx0eiAvPSAxMDguODgzO1xuXG5cdHggPSB4ID4gMC4wMDg4NTYgPyBNYXRoLnBvdyh4LCAxIC8gMykgOiAoNy43ODcgKiB4KSArICgxNiAvIDExNik7XG5cdHkgPSB5ID4gMC4wMDg4NTYgPyBNYXRoLnBvdyh5LCAxIC8gMykgOiAoNy43ODcgKiB5KSArICgxNiAvIDExNik7XG5cdHogPSB6ID4gMC4wMDg4NTYgPyBNYXRoLnBvdyh6LCAxIC8gMykgOiAoNy43ODcgKiB6KSArICgxNiAvIDExNik7XG5cblx0bCA9ICgxMTYgKiB5KSAtIDE2O1xuXHRhID0gNTAwICogKHggLSB5KTtcblx0YiA9IDIwMCAqICh5IC0geik7XG5cblx0cmV0dXJuIFtsLCBhLCBiXTtcbn07XG5cbmNvbnZlcnQuaHNsLnJnYiA9IGZ1bmN0aW9uIChoc2wpIHtcblx0dmFyIGggPSBoc2xbMF0gLyAzNjA7XG5cdHZhciBzID0gaHNsWzFdIC8gMTAwO1xuXHR2YXIgbCA9IGhzbFsyXSAvIDEwMDtcblx0dmFyIHQxO1xuXHR2YXIgdDI7XG5cdHZhciB0Mztcblx0dmFyIHJnYjtcblx0dmFyIHZhbDtcblxuXHRpZiAocyA9PT0gMCkge1xuXHRcdHZhbCA9IGwgKiAyNTU7XG5cdFx0cmV0dXJuIFt2YWwsIHZhbCwgdmFsXTtcblx0fVxuXG5cdGlmIChsIDwgMC41KSB7XG5cdFx0dDIgPSBsICogKDEgKyBzKTtcblx0fSBlbHNlIHtcblx0XHR0MiA9IGwgKyBzIC0gbCAqIHM7XG5cdH1cblxuXHR0MSA9IDIgKiBsIC0gdDI7XG5cblx0cmdiID0gWzAsIDAsIDBdO1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xuXHRcdHQzID0gaCArIDEgLyAzICogLShpIC0gMSk7XG5cdFx0aWYgKHQzIDwgMCkge1xuXHRcdFx0dDMrKztcblx0XHR9XG5cdFx0aWYgKHQzID4gMSkge1xuXHRcdFx0dDMtLTtcblx0XHR9XG5cblx0XHRpZiAoNiAqIHQzIDwgMSkge1xuXHRcdFx0dmFsID0gdDEgKyAodDIgLSB0MSkgKiA2ICogdDM7XG5cdFx0fSBlbHNlIGlmICgyICogdDMgPCAxKSB7XG5cdFx0XHR2YWwgPSB0Mjtcblx0XHR9IGVsc2UgaWYgKDMgKiB0MyA8IDIpIHtcblx0XHRcdHZhbCA9IHQxICsgKHQyIC0gdDEpICogKDIgLyAzIC0gdDMpICogNjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFsID0gdDE7XG5cdFx0fVxuXG5cdFx0cmdiW2ldID0gdmFsICogMjU1O1xuXHR9XG5cblx0cmV0dXJuIHJnYjtcbn07XG5cbmNvbnZlcnQuaHNsLmhzdiA9IGZ1bmN0aW9uIChoc2wpIHtcblx0dmFyIGggPSBoc2xbMF07XG5cdHZhciBzID0gaHNsWzFdIC8gMTAwO1xuXHR2YXIgbCA9IGhzbFsyXSAvIDEwMDtcblx0dmFyIHNtaW4gPSBzO1xuXHR2YXIgbG1pbiA9IE1hdGgubWF4KGwsIDAuMDEpO1xuXHR2YXIgc3Y7XG5cdHZhciB2O1xuXG5cdGwgKj0gMjtcblx0cyAqPSAobCA8PSAxKSA/IGwgOiAyIC0gbDtcblx0c21pbiAqPSBsbWluIDw9IDEgPyBsbWluIDogMiAtIGxtaW47XG5cdHYgPSAobCArIHMpIC8gMjtcblx0c3YgPSBsID09PSAwID8gKDIgKiBzbWluKSAvIChsbWluICsgc21pbikgOiAoMiAqIHMpIC8gKGwgKyBzKTtcblxuXHRyZXR1cm4gW2gsIHN2ICogMTAwLCB2ICogMTAwXTtcbn07XG5cbmNvbnZlcnQuaHN2LnJnYiA9IGZ1bmN0aW9uIChoc3YpIHtcblx0dmFyIGggPSBoc3ZbMF0gLyA2MDtcblx0dmFyIHMgPSBoc3ZbMV0gLyAxMDA7XG5cdHZhciB2ID0gaHN2WzJdIC8gMTAwO1xuXHR2YXIgaGkgPSBNYXRoLmZsb29yKGgpICUgNjtcblxuXHR2YXIgZiA9IGggLSBNYXRoLmZsb29yKGgpO1xuXHR2YXIgcCA9IDI1NSAqIHYgKiAoMSAtIHMpO1xuXHR2YXIgcSA9IDI1NSAqIHYgKiAoMSAtIChzICogZikpO1xuXHR2YXIgdCA9IDI1NSAqIHYgKiAoMSAtIChzICogKDEgLSBmKSkpO1xuXHR2ICo9IDI1NTtcblxuXHRzd2l0Y2ggKGhpKSB7XG5cdFx0Y2FzZSAwOlxuXHRcdFx0cmV0dXJuIFt2LCB0LCBwXTtcblx0XHRjYXNlIDE6XG5cdFx0XHRyZXR1cm4gW3EsIHYsIHBdO1xuXHRcdGNhc2UgMjpcblx0XHRcdHJldHVybiBbcCwgdiwgdF07XG5cdFx0Y2FzZSAzOlxuXHRcdFx0cmV0dXJuIFtwLCBxLCB2XTtcblx0XHRjYXNlIDQ6XG5cdFx0XHRyZXR1cm4gW3QsIHAsIHZdO1xuXHRcdGNhc2UgNTpcblx0XHRcdHJldHVybiBbdiwgcCwgcV07XG5cdH1cbn07XG5cbmNvbnZlcnQuaHN2LmhzbCA9IGZ1bmN0aW9uIChoc3YpIHtcblx0dmFyIGggPSBoc3ZbMF07XG5cdHZhciBzID0gaHN2WzFdIC8gMTAwO1xuXHR2YXIgdiA9IGhzdlsyXSAvIDEwMDtcblx0dmFyIHZtaW4gPSBNYXRoLm1heCh2LCAwLjAxKTtcblx0dmFyIGxtaW47XG5cdHZhciBzbDtcblx0dmFyIGw7XG5cblx0bCA9ICgyIC0gcykgKiB2O1xuXHRsbWluID0gKDIgLSBzKSAqIHZtaW47XG5cdHNsID0gcyAqIHZtaW47XG5cdHNsIC89IChsbWluIDw9IDEpID8gbG1pbiA6IDIgLSBsbWluO1xuXHRzbCA9IHNsIHx8IDA7XG5cdGwgLz0gMjtcblxuXHRyZXR1cm4gW2gsIHNsICogMTAwLCBsICogMTAwXTtcbn07XG5cbi8vIGh0dHA6Ly9kZXYudzMub3JnL2Nzc3dnL2Nzcy1jb2xvci8jaHdiLXRvLXJnYlxuY29udmVydC5od2IucmdiID0gZnVuY3Rpb24gKGh3Yikge1xuXHR2YXIgaCA9IGh3YlswXSAvIDM2MDtcblx0dmFyIHdoID0gaHdiWzFdIC8gMTAwO1xuXHR2YXIgYmwgPSBod2JbMl0gLyAxMDA7XG5cdHZhciByYXRpbyA9IHdoICsgYmw7XG5cdHZhciBpO1xuXHR2YXIgdjtcblx0dmFyIGY7XG5cdHZhciBuO1xuXG5cdC8vIHdoICsgYmwgY2FudCBiZSA+IDFcblx0aWYgKHJhdGlvID4gMSkge1xuXHRcdHdoIC89IHJhdGlvO1xuXHRcdGJsIC89IHJhdGlvO1xuXHR9XG5cblx0aSA9IE1hdGguZmxvb3IoNiAqIGgpO1xuXHR2ID0gMSAtIGJsO1xuXHRmID0gNiAqIGggLSBpO1xuXG5cdGlmICgoaSAmIDB4MDEpICE9PSAwKSB7XG5cdFx0ZiA9IDEgLSBmO1xuXHR9XG5cblx0biA9IHdoICsgZiAqICh2IC0gd2gpOyAvLyBsaW5lYXIgaW50ZXJwb2xhdGlvblxuXG5cdHZhciByO1xuXHR2YXIgZztcblx0dmFyIGI7XG5cdHN3aXRjaCAoaSkge1xuXHRcdGRlZmF1bHQ6XG5cdFx0Y2FzZSA2OlxuXHRcdGNhc2UgMDogciA9IHY7IGcgPSBuOyBiID0gd2g7IGJyZWFrO1xuXHRcdGNhc2UgMTogciA9IG47IGcgPSB2OyBiID0gd2g7IGJyZWFrO1xuXHRcdGNhc2UgMjogciA9IHdoOyBnID0gdjsgYiA9IG47IGJyZWFrO1xuXHRcdGNhc2UgMzogciA9IHdoOyBnID0gbjsgYiA9IHY7IGJyZWFrO1xuXHRcdGNhc2UgNDogciA9IG47IGcgPSB3aDsgYiA9IHY7IGJyZWFrO1xuXHRcdGNhc2UgNTogciA9IHY7IGcgPSB3aDsgYiA9IG47IGJyZWFrO1xuXHR9XG5cblx0cmV0dXJuIFtyICogMjU1LCBnICogMjU1LCBiICogMjU1XTtcbn07XG5cbmNvbnZlcnQuY215ay5yZ2IgPSBmdW5jdGlvbiAoY215aykge1xuXHR2YXIgYyA9IGNteWtbMF0gLyAxMDA7XG5cdHZhciBtID0gY215a1sxXSAvIDEwMDtcblx0dmFyIHkgPSBjbXlrWzJdIC8gMTAwO1xuXHR2YXIgayA9IGNteWtbM10gLyAxMDA7XG5cdHZhciByO1xuXHR2YXIgZztcblx0dmFyIGI7XG5cblx0ciA9IDEgLSBNYXRoLm1pbigxLCBjICogKDEgLSBrKSArIGspO1xuXHRnID0gMSAtIE1hdGgubWluKDEsIG0gKiAoMSAtIGspICsgayk7XG5cdGIgPSAxIC0gTWF0aC5taW4oMSwgeSAqICgxIC0gaykgKyBrKTtcblxuXHRyZXR1cm4gW3IgKiAyNTUsIGcgKiAyNTUsIGIgKiAyNTVdO1xufTtcblxuY29udmVydC54eXoucmdiID0gZnVuY3Rpb24gKHh5eikge1xuXHR2YXIgeCA9IHh5elswXSAvIDEwMDtcblx0dmFyIHkgPSB4eXpbMV0gLyAxMDA7XG5cdHZhciB6ID0geHl6WzJdIC8gMTAwO1xuXHR2YXIgcjtcblx0dmFyIGc7XG5cdHZhciBiO1xuXG5cdHIgPSAoeCAqIDMuMjQwNikgKyAoeSAqIC0xLjUzNzIpICsgKHogKiAtMC40OTg2KTtcblx0ZyA9ICh4ICogLTAuOTY4OSkgKyAoeSAqIDEuODc1OCkgKyAoeiAqIDAuMDQxNSk7XG5cdGIgPSAoeCAqIDAuMDU1NykgKyAoeSAqIC0wLjIwNDApICsgKHogKiAxLjA1NzApO1xuXG5cdC8vIGFzc3VtZSBzUkdCXG5cdHIgPSByID4gMC4wMDMxMzA4XG5cdFx0PyAoKDEuMDU1ICogTWF0aC5wb3cociwgMS4wIC8gMi40KSkgLSAwLjA1NSlcblx0XHQ6IHIgKiAxMi45MjtcblxuXHRnID0gZyA+IDAuMDAzMTMwOFxuXHRcdD8gKCgxLjA1NSAqIE1hdGgucG93KGcsIDEuMCAvIDIuNCkpIC0gMC4wNTUpXG5cdFx0OiBnICogMTIuOTI7XG5cblx0YiA9IGIgPiAwLjAwMzEzMDhcblx0XHQ/ICgoMS4wNTUgKiBNYXRoLnBvdyhiLCAxLjAgLyAyLjQpKSAtIDAuMDU1KVxuXHRcdDogYiAqIDEyLjkyO1xuXG5cdHIgPSBNYXRoLm1pbihNYXRoLm1heCgwLCByKSwgMSk7XG5cdGcgPSBNYXRoLm1pbihNYXRoLm1heCgwLCBnKSwgMSk7XG5cdGIgPSBNYXRoLm1pbihNYXRoLm1heCgwLCBiKSwgMSk7XG5cblx0cmV0dXJuIFtyICogMjU1LCBnICogMjU1LCBiICogMjU1XTtcbn07XG5cbmNvbnZlcnQueHl6LmxhYiA9IGZ1bmN0aW9uICh4eXopIHtcblx0dmFyIHggPSB4eXpbMF07XG5cdHZhciB5ID0geHl6WzFdO1xuXHR2YXIgeiA9IHh5elsyXTtcblx0dmFyIGw7XG5cdHZhciBhO1xuXHR2YXIgYjtcblxuXHR4IC89IDk1LjA0Nztcblx0eSAvPSAxMDA7XG5cdHogLz0gMTA4Ljg4MztcblxuXHR4ID0geCA+IDAuMDA4ODU2ID8gTWF0aC5wb3coeCwgMSAvIDMpIDogKDcuNzg3ICogeCkgKyAoMTYgLyAxMTYpO1xuXHR5ID0geSA+IDAuMDA4ODU2ID8gTWF0aC5wb3coeSwgMSAvIDMpIDogKDcuNzg3ICogeSkgKyAoMTYgLyAxMTYpO1xuXHR6ID0geiA+IDAuMDA4ODU2ID8gTWF0aC5wb3coeiwgMSAvIDMpIDogKDcuNzg3ICogeikgKyAoMTYgLyAxMTYpO1xuXG5cdGwgPSAoMTE2ICogeSkgLSAxNjtcblx0YSA9IDUwMCAqICh4IC0geSk7XG5cdGIgPSAyMDAgKiAoeSAtIHopO1xuXG5cdHJldHVybiBbbCwgYSwgYl07XG59O1xuXG5jb252ZXJ0LmxhYi54eXogPSBmdW5jdGlvbiAobGFiKSB7XG5cdHZhciBsID0gbGFiWzBdO1xuXHR2YXIgYSA9IGxhYlsxXTtcblx0dmFyIGIgPSBsYWJbMl07XG5cdHZhciB4O1xuXHR2YXIgeTtcblx0dmFyIHo7XG5cblx0eSA9IChsICsgMTYpIC8gMTE2O1xuXHR4ID0gYSAvIDUwMCArIHk7XG5cdHogPSB5IC0gYiAvIDIwMDtcblxuXHR2YXIgeTIgPSBNYXRoLnBvdyh5LCAzKTtcblx0dmFyIHgyID0gTWF0aC5wb3coeCwgMyk7XG5cdHZhciB6MiA9IE1hdGgucG93KHosIDMpO1xuXHR5ID0geTIgPiAwLjAwODg1NiA/IHkyIDogKHkgLSAxNiAvIDExNikgLyA3Ljc4Nztcblx0eCA9IHgyID4gMC4wMDg4NTYgPyB4MiA6ICh4IC0gMTYgLyAxMTYpIC8gNy43ODc7XG5cdHogPSB6MiA+IDAuMDA4ODU2ID8gejIgOiAoeiAtIDE2IC8gMTE2KSAvIDcuNzg3O1xuXG5cdHggKj0gOTUuMDQ3O1xuXHR5ICo9IDEwMDtcblx0eiAqPSAxMDguODgzO1xuXG5cdHJldHVybiBbeCwgeSwgel07XG59O1xuXG5jb252ZXJ0LmxhYi5sY2ggPSBmdW5jdGlvbiAobGFiKSB7XG5cdHZhciBsID0gbGFiWzBdO1xuXHR2YXIgYSA9IGxhYlsxXTtcblx0dmFyIGIgPSBsYWJbMl07XG5cdHZhciBocjtcblx0dmFyIGg7XG5cdHZhciBjO1xuXG5cdGhyID0gTWF0aC5hdGFuMihiLCBhKTtcblx0aCA9IGhyICogMzYwIC8gMiAvIE1hdGguUEk7XG5cblx0aWYgKGggPCAwKSB7XG5cdFx0aCArPSAzNjA7XG5cdH1cblxuXHRjID0gTWF0aC5zcXJ0KGEgKiBhICsgYiAqIGIpO1xuXG5cdHJldHVybiBbbCwgYywgaF07XG59O1xuXG5jb252ZXJ0LmxjaC5sYWIgPSBmdW5jdGlvbiAobGNoKSB7XG5cdHZhciBsID0gbGNoWzBdO1xuXHR2YXIgYyA9IGxjaFsxXTtcblx0dmFyIGggPSBsY2hbMl07XG5cdHZhciBhO1xuXHR2YXIgYjtcblx0dmFyIGhyO1xuXG5cdGhyID0gaCAvIDM2MCAqIDIgKiBNYXRoLlBJO1xuXHRhID0gYyAqIE1hdGguY29zKGhyKTtcblx0YiA9IGMgKiBNYXRoLnNpbihocik7XG5cblx0cmV0dXJuIFtsLCBhLCBiXTtcbn07XG5cbmNvbnZlcnQucmdiLmFuc2kxNiA9IGZ1bmN0aW9uIChhcmdzKSB7XG5cdHZhciByID0gYXJnc1swXTtcblx0dmFyIGcgPSBhcmdzWzFdO1xuXHR2YXIgYiA9IGFyZ3NbMl07XG5cdHZhciB2YWx1ZSA9IDEgaW4gYXJndW1lbnRzID8gYXJndW1lbnRzWzFdIDogY29udmVydC5yZ2IuaHN2KGFyZ3MpWzJdOyAvLyBoc3YgLT4gYW5zaTE2IG9wdGltaXphdGlvblxuXG5cdHZhbHVlID0gTWF0aC5yb3VuZCh2YWx1ZSAvIDUwKTtcblxuXHRpZiAodmFsdWUgPT09IDApIHtcblx0XHRyZXR1cm4gMzA7XG5cdH1cblxuXHR2YXIgYW5zaSA9IDMwXG5cdFx0KyAoKE1hdGgucm91bmQoYiAvIDI1NSkgPDwgMilcblx0XHR8IChNYXRoLnJvdW5kKGcgLyAyNTUpIDw8IDEpXG5cdFx0fCBNYXRoLnJvdW5kKHIgLyAyNTUpKTtcblxuXHRpZiAodmFsdWUgPT09IDIpIHtcblx0XHRhbnNpICs9IDYwO1xuXHR9XG5cblx0cmV0dXJuIGFuc2k7XG59O1xuXG5jb252ZXJ0Lmhzdi5hbnNpMTYgPSBmdW5jdGlvbiAoYXJncykge1xuXHQvLyBvcHRpbWl6YXRpb24gaGVyZTsgd2UgYWxyZWFkeSBrbm93IHRoZSB2YWx1ZSBhbmQgZG9uJ3QgbmVlZCB0byBnZXRcblx0Ly8gaXQgY29udmVydGVkIGZvciB1cy5cblx0cmV0dXJuIGNvbnZlcnQucmdiLmFuc2kxNihjb252ZXJ0Lmhzdi5yZ2IoYXJncyksIGFyZ3NbMl0pO1xufTtcblxuY29udmVydC5yZ2IuYW5zaTI1NiA9IGZ1bmN0aW9uIChhcmdzKSB7XG5cdHZhciByID0gYXJnc1swXTtcblx0dmFyIGcgPSBhcmdzWzFdO1xuXHR2YXIgYiA9IGFyZ3NbMl07XG5cblx0Ly8gd2UgdXNlIHRoZSBleHRlbmRlZCBncmV5c2NhbGUgcGFsZXR0ZSBoZXJlLCB3aXRoIHRoZSBleGNlcHRpb24gb2Zcblx0Ly8gYmxhY2sgYW5kIHdoaXRlLiBub3JtYWwgcGFsZXR0ZSBvbmx5IGhhcyA0IGdyZXlzY2FsZSBzaGFkZXMuXG5cdGlmIChyID09PSBnICYmIGcgPT09IGIpIHtcblx0XHRpZiAociA8IDgpIHtcblx0XHRcdHJldHVybiAxNjtcblx0XHR9XG5cblx0XHRpZiAociA+IDI0OCkge1xuXHRcdFx0cmV0dXJuIDIzMTtcblx0XHR9XG5cblx0XHRyZXR1cm4gTWF0aC5yb3VuZCgoKHIgLSA4KSAvIDI0NykgKiAyNCkgKyAyMzI7XG5cdH1cblxuXHR2YXIgYW5zaSA9IDE2XG5cdFx0KyAoMzYgKiBNYXRoLnJvdW5kKHIgLyAyNTUgKiA1KSlcblx0XHQrICg2ICogTWF0aC5yb3VuZChnIC8gMjU1ICogNSkpXG5cdFx0KyBNYXRoLnJvdW5kKGIgLyAyNTUgKiA1KTtcblxuXHRyZXR1cm4gYW5zaTtcbn07XG5cbmNvbnZlcnQuYW5zaTE2LnJnYiA9IGZ1bmN0aW9uIChhcmdzKSB7XG5cdHZhciBjb2xvciA9IGFyZ3MgJSAxMDtcblxuXHQvLyBoYW5kbGUgZ3JleXNjYWxlXG5cdGlmIChjb2xvciA9PT0gMCB8fCBjb2xvciA9PT0gNykge1xuXHRcdGlmIChhcmdzID4gNTApIHtcblx0XHRcdGNvbG9yICs9IDMuNTtcblx0XHR9XG5cblx0XHRjb2xvciA9IGNvbG9yIC8gMTAuNSAqIDI1NTtcblxuXHRcdHJldHVybiBbY29sb3IsIGNvbG9yLCBjb2xvcl07XG5cdH1cblxuXHR2YXIgbXVsdCA9ICh+fihhcmdzID4gNTApICsgMSkgKiAwLjU7XG5cdHZhciByID0gKChjb2xvciAmIDEpICogbXVsdCkgKiAyNTU7XG5cdHZhciBnID0gKCgoY29sb3IgPj4gMSkgJiAxKSAqIG11bHQpICogMjU1O1xuXHR2YXIgYiA9ICgoKGNvbG9yID4+IDIpICYgMSkgKiBtdWx0KSAqIDI1NTtcblxuXHRyZXR1cm4gW3IsIGcsIGJdO1xufTtcblxuY29udmVydC5hbnNpMjU2LnJnYiA9IGZ1bmN0aW9uIChhcmdzKSB7XG5cdC8vIGhhbmRsZSBncmV5c2NhbGVcblx0aWYgKGFyZ3MgPj0gMjMyKSB7XG5cdFx0dmFyIGMgPSAoYXJncyAtIDIzMikgKiAxMCArIDg7XG5cdFx0cmV0dXJuIFtjLCBjLCBjXTtcblx0fVxuXG5cdGFyZ3MgLT0gMTY7XG5cblx0dmFyIHJlbTtcblx0dmFyIHIgPSBNYXRoLmZsb29yKGFyZ3MgLyAzNikgLyA1ICogMjU1O1xuXHR2YXIgZyA9IE1hdGguZmxvb3IoKHJlbSA9IGFyZ3MgJSAzNikgLyA2KSAvIDUgKiAyNTU7XG5cdHZhciBiID0gKHJlbSAlIDYpIC8gNSAqIDI1NTtcblxuXHRyZXR1cm4gW3IsIGcsIGJdO1xufTtcblxuY29udmVydC5yZ2IuaGV4ID0gZnVuY3Rpb24gKGFyZ3MpIHtcblx0dmFyIGludGVnZXIgPSAoKE1hdGgucm91bmQoYXJnc1swXSkgJiAweEZGKSA8PCAxNilcblx0XHQrICgoTWF0aC5yb3VuZChhcmdzWzFdKSAmIDB4RkYpIDw8IDgpXG5cdFx0KyAoTWF0aC5yb3VuZChhcmdzWzJdKSAmIDB4RkYpO1xuXG5cdHZhciBzdHJpbmcgPSBpbnRlZ2VyLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpO1xuXHRyZXR1cm4gJzAwMDAwMCcuc3Vic3RyaW5nKHN0cmluZy5sZW5ndGgpICsgc3RyaW5nO1xufTtcblxuY29udmVydC5oZXgucmdiID0gZnVuY3Rpb24gKGFyZ3MpIHtcblx0dmFyIG1hdGNoID0gYXJncy50b1N0cmluZygxNikubWF0Y2goL1thLWYwLTldezZ9fFthLWYwLTldezN9L2kpO1xuXHRpZiAoIW1hdGNoKSB7XG5cdFx0cmV0dXJuIFswLCAwLCAwXTtcblx0fVxuXG5cdHZhciBjb2xvclN0cmluZyA9IG1hdGNoWzBdO1xuXG5cdGlmIChtYXRjaFswXS5sZW5ndGggPT09IDMpIHtcblx0XHRjb2xvclN0cmluZyA9IGNvbG9yU3RyaW5nLnNwbGl0KCcnKS5tYXAoZnVuY3Rpb24gKGNoYXIpIHtcblx0XHRcdHJldHVybiBjaGFyICsgY2hhcjtcblx0XHR9KS5qb2luKCcnKTtcblx0fVxuXG5cdHZhciBpbnRlZ2VyID0gcGFyc2VJbnQoY29sb3JTdHJpbmcsIDE2KTtcblx0dmFyIHIgPSAoaW50ZWdlciA+PiAxNikgJiAweEZGO1xuXHR2YXIgZyA9IChpbnRlZ2VyID4+IDgpICYgMHhGRjtcblx0dmFyIGIgPSBpbnRlZ2VyICYgMHhGRjtcblxuXHRyZXR1cm4gW3IsIGcsIGJdO1xufTtcblxuY29udmVydC5yZ2IuaGNnID0gZnVuY3Rpb24gKHJnYikge1xuXHR2YXIgciA9IHJnYlswXSAvIDI1NTtcblx0dmFyIGcgPSByZ2JbMV0gLyAyNTU7XG5cdHZhciBiID0gcmdiWzJdIC8gMjU1O1xuXHR2YXIgbWF4ID0gTWF0aC5tYXgoTWF0aC5tYXgociwgZyksIGIpO1xuXHR2YXIgbWluID0gTWF0aC5taW4oTWF0aC5taW4ociwgZyksIGIpO1xuXHR2YXIgY2hyb21hID0gKG1heCAtIG1pbik7XG5cdHZhciBncmF5c2NhbGU7XG5cdHZhciBodWU7XG5cblx0aWYgKGNocm9tYSA8IDEpIHtcblx0XHRncmF5c2NhbGUgPSBtaW4gLyAoMSAtIGNocm9tYSk7XG5cdH0gZWxzZSB7XG5cdFx0Z3JheXNjYWxlID0gMDtcblx0fVxuXG5cdGlmIChjaHJvbWEgPD0gMCkge1xuXHRcdGh1ZSA9IDA7XG5cdH0gZWxzZVxuXHRpZiAobWF4ID09PSByKSB7XG5cdFx0aHVlID0gKChnIC0gYikgLyBjaHJvbWEpICUgNjtcblx0fSBlbHNlXG5cdGlmIChtYXggPT09IGcpIHtcblx0XHRodWUgPSAyICsgKGIgLSByKSAvIGNocm9tYTtcblx0fSBlbHNlIHtcblx0XHRodWUgPSA0ICsgKHIgLSBnKSAvIGNocm9tYSArIDQ7XG5cdH1cblxuXHRodWUgLz0gNjtcblx0aHVlICU9IDE7XG5cblx0cmV0dXJuIFtodWUgKiAzNjAsIGNocm9tYSAqIDEwMCwgZ3JheXNjYWxlICogMTAwXTtcbn07XG5cbmNvbnZlcnQuaHNsLmhjZyA9IGZ1bmN0aW9uIChoc2wpIHtcblx0dmFyIHMgPSBoc2xbMV0gLyAxMDA7XG5cdHZhciBsID0gaHNsWzJdIC8gMTAwO1xuXHR2YXIgYyA9IDE7XG5cdHZhciBmID0gMDtcblxuXHRpZiAobCA8IDAuNSkge1xuXHRcdGMgPSAyLjAgKiBzICogbDtcblx0fSBlbHNlIHtcblx0XHRjID0gMi4wICogcyAqICgxLjAgLSBsKTtcblx0fVxuXG5cdGlmIChjIDwgMS4wKSB7XG5cdFx0ZiA9IChsIC0gMC41ICogYykgLyAoMS4wIC0gYyk7XG5cdH1cblxuXHRyZXR1cm4gW2hzbFswXSwgYyAqIDEwMCwgZiAqIDEwMF07XG59O1xuXG5jb252ZXJ0Lmhzdi5oY2cgPSBmdW5jdGlvbiAoaHN2KSB7XG5cdHZhciBzID0gaHN2WzFdIC8gMTAwO1xuXHR2YXIgdiA9IGhzdlsyXSAvIDEwMDtcblxuXHR2YXIgYyA9IHMgKiB2O1xuXHR2YXIgZiA9IDA7XG5cblx0aWYgKGMgPCAxLjApIHtcblx0XHRmID0gKHYgLSBjKSAvICgxIC0gYyk7XG5cdH1cblxuXHRyZXR1cm4gW2hzdlswXSwgYyAqIDEwMCwgZiAqIDEwMF07XG59O1xuXG5jb252ZXJ0LmhjZy5yZ2IgPSBmdW5jdGlvbiAoaGNnKSB7XG5cdHZhciBoID0gaGNnWzBdIC8gMzYwO1xuXHR2YXIgYyA9IGhjZ1sxXSAvIDEwMDtcblx0dmFyIGcgPSBoY2dbMl0gLyAxMDA7XG5cblx0aWYgKGMgPT09IDAuMCkge1xuXHRcdHJldHVybiBbZyAqIDI1NSwgZyAqIDI1NSwgZyAqIDI1NV07XG5cdH1cblxuXHR2YXIgcHVyZSA9IFswLCAwLCAwXTtcblx0dmFyIGhpID0gKGggJSAxKSAqIDY7XG5cdHZhciB2ID0gaGkgJSAxO1xuXHR2YXIgdyA9IDEgLSB2O1xuXHR2YXIgbWcgPSAwO1xuXG5cdHN3aXRjaCAoTWF0aC5mbG9vcihoaSkpIHtcblx0XHRjYXNlIDA6XG5cdFx0XHRwdXJlWzBdID0gMTsgcHVyZVsxXSA9IHY7IHB1cmVbMl0gPSAwOyBicmVhaztcblx0XHRjYXNlIDE6XG5cdFx0XHRwdXJlWzBdID0gdzsgcHVyZVsxXSA9IDE7IHB1cmVbMl0gPSAwOyBicmVhaztcblx0XHRjYXNlIDI6XG5cdFx0XHRwdXJlWzBdID0gMDsgcHVyZVsxXSA9IDE7IHB1cmVbMl0gPSB2OyBicmVhaztcblx0XHRjYXNlIDM6XG5cdFx0XHRwdXJlWzBdID0gMDsgcHVyZVsxXSA9IHc7IHB1cmVbMl0gPSAxOyBicmVhaztcblx0XHRjYXNlIDQ6XG5cdFx0XHRwdXJlWzBdID0gdjsgcHVyZVsxXSA9IDA7IHB1cmVbMl0gPSAxOyBicmVhaztcblx0XHRkZWZhdWx0OlxuXHRcdFx0cHVyZVswXSA9IDE7IHB1cmVbMV0gPSAwOyBwdXJlWzJdID0gdztcblx0fVxuXG5cdG1nID0gKDEuMCAtIGMpICogZztcblxuXHRyZXR1cm4gW1xuXHRcdChjICogcHVyZVswXSArIG1nKSAqIDI1NSxcblx0XHQoYyAqIHB1cmVbMV0gKyBtZykgKiAyNTUsXG5cdFx0KGMgKiBwdXJlWzJdICsgbWcpICogMjU1XG5cdF07XG59O1xuXG5jb252ZXJ0LmhjZy5oc3YgPSBmdW5jdGlvbiAoaGNnKSB7XG5cdHZhciBjID0gaGNnWzFdIC8gMTAwO1xuXHR2YXIgZyA9IGhjZ1syXSAvIDEwMDtcblxuXHR2YXIgdiA9IGMgKyBnICogKDEuMCAtIGMpO1xuXHR2YXIgZiA9IDA7XG5cblx0aWYgKHYgPiAwLjApIHtcblx0XHRmID0gYyAvIHY7XG5cdH1cblxuXHRyZXR1cm4gW2hjZ1swXSwgZiAqIDEwMCwgdiAqIDEwMF07XG59O1xuXG5jb252ZXJ0LmhjZy5oc2wgPSBmdW5jdGlvbiAoaGNnKSB7XG5cdHZhciBjID0gaGNnWzFdIC8gMTAwO1xuXHR2YXIgZyA9IGhjZ1syXSAvIDEwMDtcblxuXHR2YXIgbCA9IGcgKiAoMS4wIC0gYykgKyAwLjUgKiBjO1xuXHR2YXIgcyA9IDA7XG5cblx0aWYgKGwgPiAwLjAgJiYgbCA8IDAuNSkge1xuXHRcdHMgPSBjIC8gKDIgKiBsKTtcblx0fSBlbHNlXG5cdGlmIChsID49IDAuNSAmJiBsIDwgMS4wKSB7XG5cdFx0cyA9IGMgLyAoMiAqICgxIC0gbCkpO1xuXHR9XG5cblx0cmV0dXJuIFtoY2dbMF0sIHMgKiAxMDAsIGwgKiAxMDBdO1xufTtcblxuY29udmVydC5oY2cuaHdiID0gZnVuY3Rpb24gKGhjZykge1xuXHR2YXIgYyA9IGhjZ1sxXSAvIDEwMDtcblx0dmFyIGcgPSBoY2dbMl0gLyAxMDA7XG5cdHZhciB2ID0gYyArIGcgKiAoMS4wIC0gYyk7XG5cdHJldHVybiBbaGNnWzBdLCAodiAtIGMpICogMTAwLCAoMSAtIHYpICogMTAwXTtcbn07XG5cbmNvbnZlcnQuaHdiLmhjZyA9IGZ1bmN0aW9uIChod2IpIHtcblx0dmFyIHcgPSBod2JbMV0gLyAxMDA7XG5cdHZhciBiID0gaHdiWzJdIC8gMTAwO1xuXHR2YXIgdiA9IDEgLSBiO1xuXHR2YXIgYyA9IHYgLSB3O1xuXHR2YXIgZyA9IDA7XG5cblx0aWYgKGMgPCAxKSB7XG5cdFx0ZyA9ICh2IC0gYykgLyAoMSAtIGMpO1xuXHR9XG5cblx0cmV0dXJuIFtod2JbMF0sIGMgKiAxMDAsIGcgKiAxMDBdO1xufTtcblxuY29udmVydC5hcHBsZS5yZ2IgPSBmdW5jdGlvbiAoYXBwbGUpIHtcblx0cmV0dXJuIFsoYXBwbGVbMF0gLyA2NTUzNSkgKiAyNTUsIChhcHBsZVsxXSAvIDY1NTM1KSAqIDI1NSwgKGFwcGxlWzJdIC8gNjU1MzUpICogMjU1XTtcbn07XG5cbmNvbnZlcnQucmdiLmFwcGxlID0gZnVuY3Rpb24gKHJnYikge1xuXHRyZXR1cm4gWyhyZ2JbMF0gLyAyNTUpICogNjU1MzUsIChyZ2JbMV0gLyAyNTUpICogNjU1MzUsIChyZ2JbMl0gLyAyNTUpICogNjU1MzVdO1xufTtcblxuY29udmVydC5ncmF5LnJnYiA9IGZ1bmN0aW9uIChhcmdzKSB7XG5cdHJldHVybiBbYXJnc1swXSAvIDEwMCAqIDI1NSwgYXJnc1swXSAvIDEwMCAqIDI1NSwgYXJnc1swXSAvIDEwMCAqIDI1NV07XG59O1xuXG5jb252ZXJ0LmdyYXkuaHNsID0gY29udmVydC5ncmF5LmhzdiA9IGZ1bmN0aW9uIChhcmdzKSB7XG5cdHJldHVybiBbMCwgMCwgYXJnc1swXV07XG59O1xuXG5jb252ZXJ0LmdyYXkuaHdiID0gZnVuY3Rpb24gKGdyYXkpIHtcblx0cmV0dXJuIFswLCAxMDAsIGdyYXlbMF1dO1xufTtcblxuY29udmVydC5ncmF5LmNteWsgPSBmdW5jdGlvbiAoZ3JheSkge1xuXHRyZXR1cm4gWzAsIDAsIDAsIGdyYXlbMF1dO1xufTtcblxuY29udmVydC5ncmF5LmxhYiA9IGZ1bmN0aW9uIChncmF5KSB7XG5cdHJldHVybiBbZ3JheVswXSwgMCwgMF07XG59O1xuXG5jb252ZXJ0LmdyYXkuaGV4ID0gZnVuY3Rpb24gKGdyYXkpIHtcblx0dmFyIHZhbCA9IE1hdGgucm91bmQoZ3JheVswXSAvIDEwMCAqIDI1NSkgJiAweEZGO1xuXHR2YXIgaW50ZWdlciA9ICh2YWwgPDwgMTYpICsgKHZhbCA8PCA4KSArIHZhbDtcblxuXHR2YXIgc3RyaW5nID0gaW50ZWdlci50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTtcblx0cmV0dXJuICcwMDAwMDAnLnN1YnN0cmluZyhzdHJpbmcubGVuZ3RoKSArIHN0cmluZztcbn07XG5cbmNvbnZlcnQucmdiLmdyYXkgPSBmdW5jdGlvbiAocmdiKSB7XG5cdHZhciB2YWwgPSAocmdiWzBdICsgcmdiWzFdICsgcmdiWzJdKSAvIDM7XG5cdHJldHVybiBbdmFsIC8gMjU1ICogMTAwXTtcbn07XG4iLCIndXNlIHN0cmljdCdcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdFwiYWxpY2VibHVlXCI6IFsyNDAsIDI0OCwgMjU1XSxcclxuXHRcImFudGlxdWV3aGl0ZVwiOiBbMjUwLCAyMzUsIDIxNV0sXHJcblx0XCJhcXVhXCI6IFswLCAyNTUsIDI1NV0sXHJcblx0XCJhcXVhbWFyaW5lXCI6IFsxMjcsIDI1NSwgMjEyXSxcclxuXHRcImF6dXJlXCI6IFsyNDAsIDI1NSwgMjU1XSxcclxuXHRcImJlaWdlXCI6IFsyNDUsIDI0NSwgMjIwXSxcclxuXHRcImJpc3F1ZVwiOiBbMjU1LCAyMjgsIDE5Nl0sXHJcblx0XCJibGFja1wiOiBbMCwgMCwgMF0sXHJcblx0XCJibGFuY2hlZGFsbW9uZFwiOiBbMjU1LCAyMzUsIDIwNV0sXHJcblx0XCJibHVlXCI6IFswLCAwLCAyNTVdLFxyXG5cdFwiYmx1ZXZpb2xldFwiOiBbMTM4LCA0MywgMjI2XSxcclxuXHRcImJyb3duXCI6IFsxNjUsIDQyLCA0Ml0sXHJcblx0XCJidXJseXdvb2RcIjogWzIyMiwgMTg0LCAxMzVdLFxyXG5cdFwiY2FkZXRibHVlXCI6IFs5NSwgMTU4LCAxNjBdLFxyXG5cdFwiY2hhcnRyZXVzZVwiOiBbMTI3LCAyNTUsIDBdLFxyXG5cdFwiY2hvY29sYXRlXCI6IFsyMTAsIDEwNSwgMzBdLFxyXG5cdFwiY29yYWxcIjogWzI1NSwgMTI3LCA4MF0sXHJcblx0XCJjb3JuZmxvd2VyYmx1ZVwiOiBbMTAwLCAxNDksIDIzN10sXHJcblx0XCJjb3Juc2lsa1wiOiBbMjU1LCAyNDgsIDIyMF0sXHJcblx0XCJjcmltc29uXCI6IFsyMjAsIDIwLCA2MF0sXHJcblx0XCJjeWFuXCI6IFswLCAyNTUsIDI1NV0sXHJcblx0XCJkYXJrYmx1ZVwiOiBbMCwgMCwgMTM5XSxcclxuXHRcImRhcmtjeWFuXCI6IFswLCAxMzksIDEzOV0sXHJcblx0XCJkYXJrZ29sZGVucm9kXCI6IFsxODQsIDEzNCwgMTFdLFxyXG5cdFwiZGFya2dyYXlcIjogWzE2OSwgMTY5LCAxNjldLFxyXG5cdFwiZGFya2dyZWVuXCI6IFswLCAxMDAsIDBdLFxyXG5cdFwiZGFya2dyZXlcIjogWzE2OSwgMTY5LCAxNjldLFxyXG5cdFwiZGFya2toYWtpXCI6IFsxODksIDE4MywgMTA3XSxcclxuXHRcImRhcmttYWdlbnRhXCI6IFsxMzksIDAsIDEzOV0sXHJcblx0XCJkYXJrb2xpdmVncmVlblwiOiBbODUsIDEwNywgNDddLFxyXG5cdFwiZGFya29yYW5nZVwiOiBbMjU1LCAxNDAsIDBdLFxyXG5cdFwiZGFya29yY2hpZFwiOiBbMTUzLCA1MCwgMjA0XSxcclxuXHRcImRhcmtyZWRcIjogWzEzOSwgMCwgMF0sXHJcblx0XCJkYXJrc2FsbW9uXCI6IFsyMzMsIDE1MCwgMTIyXSxcclxuXHRcImRhcmtzZWFncmVlblwiOiBbMTQzLCAxODgsIDE0M10sXHJcblx0XCJkYXJrc2xhdGVibHVlXCI6IFs3MiwgNjEsIDEzOV0sXHJcblx0XCJkYXJrc2xhdGVncmF5XCI6IFs0NywgNzksIDc5XSxcclxuXHRcImRhcmtzbGF0ZWdyZXlcIjogWzQ3LCA3OSwgNzldLFxyXG5cdFwiZGFya3R1cnF1b2lzZVwiOiBbMCwgMjA2LCAyMDldLFxyXG5cdFwiZGFya3Zpb2xldFwiOiBbMTQ4LCAwLCAyMTFdLFxyXG5cdFwiZGVlcHBpbmtcIjogWzI1NSwgMjAsIDE0N10sXHJcblx0XCJkZWVwc2t5Ymx1ZVwiOiBbMCwgMTkxLCAyNTVdLFxyXG5cdFwiZGltZ3JheVwiOiBbMTA1LCAxMDUsIDEwNV0sXHJcblx0XCJkaW1ncmV5XCI6IFsxMDUsIDEwNSwgMTA1XSxcclxuXHRcImRvZGdlcmJsdWVcIjogWzMwLCAxNDQsIDI1NV0sXHJcblx0XCJmaXJlYnJpY2tcIjogWzE3OCwgMzQsIDM0XSxcclxuXHRcImZsb3JhbHdoaXRlXCI6IFsyNTUsIDI1MCwgMjQwXSxcclxuXHRcImZvcmVzdGdyZWVuXCI6IFszNCwgMTM5LCAzNF0sXHJcblx0XCJmdWNoc2lhXCI6IFsyNTUsIDAsIDI1NV0sXHJcblx0XCJnYWluc2Jvcm9cIjogWzIyMCwgMjIwLCAyMjBdLFxyXG5cdFwiZ2hvc3R3aGl0ZVwiOiBbMjQ4LCAyNDgsIDI1NV0sXHJcblx0XCJnb2xkXCI6IFsyNTUsIDIxNSwgMF0sXHJcblx0XCJnb2xkZW5yb2RcIjogWzIxOCwgMTY1LCAzMl0sXHJcblx0XCJncmF5XCI6IFsxMjgsIDEyOCwgMTI4XSxcclxuXHRcImdyZWVuXCI6IFswLCAxMjgsIDBdLFxyXG5cdFwiZ3JlZW55ZWxsb3dcIjogWzE3MywgMjU1LCA0N10sXHJcblx0XCJncmV5XCI6IFsxMjgsIDEyOCwgMTI4XSxcclxuXHRcImhvbmV5ZGV3XCI6IFsyNDAsIDI1NSwgMjQwXSxcclxuXHRcImhvdHBpbmtcIjogWzI1NSwgMTA1LCAxODBdLFxyXG5cdFwiaW5kaWFucmVkXCI6IFsyMDUsIDkyLCA5Ml0sXHJcblx0XCJpbmRpZ29cIjogWzc1LCAwLCAxMzBdLFxyXG5cdFwiaXZvcnlcIjogWzI1NSwgMjU1LCAyNDBdLFxyXG5cdFwia2hha2lcIjogWzI0MCwgMjMwLCAxNDBdLFxyXG5cdFwibGF2ZW5kZXJcIjogWzIzMCwgMjMwLCAyNTBdLFxyXG5cdFwibGF2ZW5kZXJibHVzaFwiOiBbMjU1LCAyNDAsIDI0NV0sXHJcblx0XCJsYXduZ3JlZW5cIjogWzEyNCwgMjUyLCAwXSxcclxuXHRcImxlbW9uY2hpZmZvblwiOiBbMjU1LCAyNTAsIDIwNV0sXHJcblx0XCJsaWdodGJsdWVcIjogWzE3MywgMjE2LCAyMzBdLFxyXG5cdFwibGlnaHRjb3JhbFwiOiBbMjQwLCAxMjgsIDEyOF0sXHJcblx0XCJsaWdodGN5YW5cIjogWzIyNCwgMjU1LCAyNTVdLFxyXG5cdFwibGlnaHRnb2xkZW5yb2R5ZWxsb3dcIjogWzI1MCwgMjUwLCAyMTBdLFxyXG5cdFwibGlnaHRncmF5XCI6IFsyMTEsIDIxMSwgMjExXSxcclxuXHRcImxpZ2h0Z3JlZW5cIjogWzE0NCwgMjM4LCAxNDRdLFxyXG5cdFwibGlnaHRncmV5XCI6IFsyMTEsIDIxMSwgMjExXSxcclxuXHRcImxpZ2h0cGlua1wiOiBbMjU1LCAxODIsIDE5M10sXHJcblx0XCJsaWdodHNhbG1vblwiOiBbMjU1LCAxNjAsIDEyMl0sXHJcblx0XCJsaWdodHNlYWdyZWVuXCI6IFszMiwgMTc4LCAxNzBdLFxyXG5cdFwibGlnaHRza3libHVlXCI6IFsxMzUsIDIwNiwgMjUwXSxcclxuXHRcImxpZ2h0c2xhdGVncmF5XCI6IFsxMTksIDEzNiwgMTUzXSxcclxuXHRcImxpZ2h0c2xhdGVncmV5XCI6IFsxMTksIDEzNiwgMTUzXSxcclxuXHRcImxpZ2h0c3RlZWxibHVlXCI6IFsxNzYsIDE5NiwgMjIyXSxcclxuXHRcImxpZ2h0eWVsbG93XCI6IFsyNTUsIDI1NSwgMjI0XSxcclxuXHRcImxpbWVcIjogWzAsIDI1NSwgMF0sXHJcblx0XCJsaW1lZ3JlZW5cIjogWzUwLCAyMDUsIDUwXSxcclxuXHRcImxpbmVuXCI6IFsyNTAsIDI0MCwgMjMwXSxcclxuXHRcIm1hZ2VudGFcIjogWzI1NSwgMCwgMjU1XSxcclxuXHRcIm1hcm9vblwiOiBbMTI4LCAwLCAwXSxcclxuXHRcIm1lZGl1bWFxdWFtYXJpbmVcIjogWzEwMiwgMjA1LCAxNzBdLFxyXG5cdFwibWVkaXVtYmx1ZVwiOiBbMCwgMCwgMjA1XSxcclxuXHRcIm1lZGl1bW9yY2hpZFwiOiBbMTg2LCA4NSwgMjExXSxcclxuXHRcIm1lZGl1bXB1cnBsZVwiOiBbMTQ3LCAxMTIsIDIxOV0sXHJcblx0XCJtZWRpdW1zZWFncmVlblwiOiBbNjAsIDE3OSwgMTEzXSxcclxuXHRcIm1lZGl1bXNsYXRlYmx1ZVwiOiBbMTIzLCAxMDQsIDIzOF0sXHJcblx0XCJtZWRpdW1zcHJpbmdncmVlblwiOiBbMCwgMjUwLCAxNTRdLFxyXG5cdFwibWVkaXVtdHVycXVvaXNlXCI6IFs3MiwgMjA5LCAyMDRdLFxyXG5cdFwibWVkaXVtdmlvbGV0cmVkXCI6IFsxOTksIDIxLCAxMzNdLFxyXG5cdFwibWlkbmlnaHRibHVlXCI6IFsyNSwgMjUsIDExMl0sXHJcblx0XCJtaW50Y3JlYW1cIjogWzI0NSwgMjU1LCAyNTBdLFxyXG5cdFwibWlzdHlyb3NlXCI6IFsyNTUsIDIyOCwgMjI1XSxcclxuXHRcIm1vY2Nhc2luXCI6IFsyNTUsIDIyOCwgMTgxXSxcclxuXHRcIm5hdmFqb3doaXRlXCI6IFsyNTUsIDIyMiwgMTczXSxcclxuXHRcIm5hdnlcIjogWzAsIDAsIDEyOF0sXHJcblx0XCJvbGRsYWNlXCI6IFsyNTMsIDI0NSwgMjMwXSxcclxuXHRcIm9saXZlXCI6IFsxMjgsIDEyOCwgMF0sXHJcblx0XCJvbGl2ZWRyYWJcIjogWzEwNywgMTQyLCAzNV0sXHJcblx0XCJvcmFuZ2VcIjogWzI1NSwgMTY1LCAwXSxcclxuXHRcIm9yYW5nZXJlZFwiOiBbMjU1LCA2OSwgMF0sXHJcblx0XCJvcmNoaWRcIjogWzIxOCwgMTEyLCAyMTRdLFxyXG5cdFwicGFsZWdvbGRlbnJvZFwiOiBbMjM4LCAyMzIsIDE3MF0sXHJcblx0XCJwYWxlZ3JlZW5cIjogWzE1MiwgMjUxLCAxNTJdLFxyXG5cdFwicGFsZXR1cnF1b2lzZVwiOiBbMTc1LCAyMzgsIDIzOF0sXHJcblx0XCJwYWxldmlvbGV0cmVkXCI6IFsyMTksIDExMiwgMTQ3XSxcclxuXHRcInBhcGF5YXdoaXBcIjogWzI1NSwgMjM5LCAyMTNdLFxyXG5cdFwicGVhY2hwdWZmXCI6IFsyNTUsIDIxOCwgMTg1XSxcclxuXHRcInBlcnVcIjogWzIwNSwgMTMzLCA2M10sXHJcblx0XCJwaW5rXCI6IFsyNTUsIDE5MiwgMjAzXSxcclxuXHRcInBsdW1cIjogWzIyMSwgMTYwLCAyMjFdLFxyXG5cdFwicG93ZGVyYmx1ZVwiOiBbMTc2LCAyMjQsIDIzMF0sXHJcblx0XCJwdXJwbGVcIjogWzEyOCwgMCwgMTI4XSxcclxuXHRcInJlYmVjY2FwdXJwbGVcIjogWzEwMiwgNTEsIDE1M10sXHJcblx0XCJyZWRcIjogWzI1NSwgMCwgMF0sXHJcblx0XCJyb3N5YnJvd25cIjogWzE4OCwgMTQzLCAxNDNdLFxyXG5cdFwicm95YWxibHVlXCI6IFs2NSwgMTA1LCAyMjVdLFxyXG5cdFwic2FkZGxlYnJvd25cIjogWzEzOSwgNjksIDE5XSxcclxuXHRcInNhbG1vblwiOiBbMjUwLCAxMjgsIDExNF0sXHJcblx0XCJzYW5keWJyb3duXCI6IFsyNDQsIDE2NCwgOTZdLFxyXG5cdFwic2VhZ3JlZW5cIjogWzQ2LCAxMzksIDg3XSxcclxuXHRcInNlYXNoZWxsXCI6IFsyNTUsIDI0NSwgMjM4XSxcclxuXHRcInNpZW5uYVwiOiBbMTYwLCA4MiwgNDVdLFxyXG5cdFwic2lsdmVyXCI6IFsxOTIsIDE5MiwgMTkyXSxcclxuXHRcInNreWJsdWVcIjogWzEzNSwgMjA2LCAyMzVdLFxyXG5cdFwic2xhdGVibHVlXCI6IFsxMDYsIDkwLCAyMDVdLFxyXG5cdFwic2xhdGVncmF5XCI6IFsxMTIsIDEyOCwgMTQ0XSxcclxuXHRcInNsYXRlZ3JleVwiOiBbMTEyLCAxMjgsIDE0NF0sXHJcblx0XCJzbm93XCI6IFsyNTUsIDI1MCwgMjUwXSxcclxuXHRcInNwcmluZ2dyZWVuXCI6IFswLCAyNTUsIDEyN10sXHJcblx0XCJzdGVlbGJsdWVcIjogWzcwLCAxMzAsIDE4MF0sXHJcblx0XCJ0YW5cIjogWzIxMCwgMTgwLCAxNDBdLFxyXG5cdFwidGVhbFwiOiBbMCwgMTI4LCAxMjhdLFxyXG5cdFwidGhpc3RsZVwiOiBbMjE2LCAxOTEsIDIxNl0sXHJcblx0XCJ0b21hdG9cIjogWzI1NSwgOTksIDcxXSxcclxuXHRcInR1cnF1b2lzZVwiOiBbNjQsIDIyNCwgMjA4XSxcclxuXHRcInZpb2xldFwiOiBbMjM4LCAxMzAsIDIzOF0sXHJcblx0XCJ3aGVhdFwiOiBbMjQ1LCAyMjIsIDE3OV0sXHJcblx0XCJ3aGl0ZVwiOiBbMjU1LCAyNTUsIDI1NV0sXHJcblx0XCJ3aGl0ZXNtb2tlXCI6IFsyNDUsIDI0NSwgMjQ1XSxcclxuXHRcInllbGxvd1wiOiBbMjU1LCAyNTUsIDBdLFxyXG5cdFwieWVsbG93Z3JlZW5cIjogWzE1NCwgMjA1LCA1MF1cclxufTtcclxuIiwidmFyIGNvbnZlcnNpb25zID0gcmVxdWlyZSgnLi9jb252ZXJzaW9ucycpO1xuXG4vKlxuXHR0aGlzIGZ1bmN0aW9uIHJvdXRlcyBhIG1vZGVsIHRvIGFsbCBvdGhlciBtb2RlbHMuXG5cblx0YWxsIGZ1bmN0aW9ucyB0aGF0IGFyZSByb3V0ZWQgaGF2ZSBhIHByb3BlcnR5IGAuY29udmVyc2lvbmAgYXR0YWNoZWRcblx0dG8gdGhlIHJldHVybmVkIHN5bnRoZXRpYyBmdW5jdGlvbi4gVGhpcyBwcm9wZXJ0eSBpcyBhbiBhcnJheVxuXHRvZiBzdHJpbmdzLCBlYWNoIHdpdGggdGhlIHN0ZXBzIGluIGJldHdlZW4gdGhlICdmcm9tJyBhbmQgJ3RvJ1xuXHRjb2xvciBtb2RlbHMgKGluY2x1c2l2ZSkuXG5cblx0Y29udmVyc2lvbnMgdGhhdCBhcmUgbm90IHBvc3NpYmxlIHNpbXBseSBhcmUgbm90IGluY2x1ZGVkLlxuKi9cblxuZnVuY3Rpb24gYnVpbGRHcmFwaCgpIHtcblx0dmFyIGdyYXBoID0ge307XG5cdC8vIGh0dHBzOi8vanNwZXJmLmNvbS9vYmplY3Qta2V5cy12cy1mb3ItaW4td2l0aC1jbG9zdXJlLzNcblx0dmFyIG1vZGVscyA9IE9iamVjdC5rZXlzKGNvbnZlcnNpb25zKTtcblxuXHRmb3IgKHZhciBsZW4gPSBtb2RlbHMubGVuZ3RoLCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0Z3JhcGhbbW9kZWxzW2ldXSA9IHtcblx0XHRcdC8vIGh0dHA6Ly9qc3BlcmYuY29tLzEtdnMtaW5maW5pdHlcblx0XHRcdC8vIG1pY3JvLW9wdCwgYnV0IHRoaXMgaXMgc2ltcGxlLlxuXHRcdFx0ZGlzdGFuY2U6IC0xLFxuXHRcdFx0cGFyZW50OiBudWxsXG5cdFx0fTtcblx0fVxuXG5cdHJldHVybiBncmFwaDtcbn1cblxuLy8gaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQnJlYWR0aC1maXJzdF9zZWFyY2hcbmZ1bmN0aW9uIGRlcml2ZUJGUyhmcm9tTW9kZWwpIHtcblx0dmFyIGdyYXBoID0gYnVpbGRHcmFwaCgpO1xuXHR2YXIgcXVldWUgPSBbZnJvbU1vZGVsXTsgLy8gdW5zaGlmdCAtPiBxdWV1ZSAtPiBwb3BcblxuXHRncmFwaFtmcm9tTW9kZWxdLmRpc3RhbmNlID0gMDtcblxuXHR3aGlsZSAocXVldWUubGVuZ3RoKSB7XG5cdFx0dmFyIGN1cnJlbnQgPSBxdWV1ZS5wb3AoKTtcblx0XHR2YXIgYWRqYWNlbnRzID0gT2JqZWN0LmtleXMoY29udmVyc2lvbnNbY3VycmVudF0pO1xuXG5cdFx0Zm9yICh2YXIgbGVuID0gYWRqYWNlbnRzLmxlbmd0aCwgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0dmFyIGFkamFjZW50ID0gYWRqYWNlbnRzW2ldO1xuXHRcdFx0dmFyIG5vZGUgPSBncmFwaFthZGphY2VudF07XG5cblx0XHRcdGlmIChub2RlLmRpc3RhbmNlID09PSAtMSkge1xuXHRcdFx0XHRub2RlLmRpc3RhbmNlID0gZ3JhcGhbY3VycmVudF0uZGlzdGFuY2UgKyAxO1xuXHRcdFx0XHRub2RlLnBhcmVudCA9IGN1cnJlbnQ7XG5cdFx0XHRcdHF1ZXVlLnVuc2hpZnQoYWRqYWNlbnQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBncmFwaDtcbn1cblxuZnVuY3Rpb24gbGluayhmcm9tLCB0bykge1xuXHRyZXR1cm4gZnVuY3Rpb24gKGFyZ3MpIHtcblx0XHRyZXR1cm4gdG8oZnJvbShhcmdzKSk7XG5cdH07XG59XG5cbmZ1bmN0aW9uIHdyYXBDb252ZXJzaW9uKHRvTW9kZWwsIGdyYXBoKSB7XG5cdHZhciBwYXRoID0gW2dyYXBoW3RvTW9kZWxdLnBhcmVudCwgdG9Nb2RlbF07XG5cdHZhciBmbiA9IGNvbnZlcnNpb25zW2dyYXBoW3RvTW9kZWxdLnBhcmVudF1bdG9Nb2RlbF07XG5cblx0dmFyIGN1ciA9IGdyYXBoW3RvTW9kZWxdLnBhcmVudDtcblx0d2hpbGUgKGdyYXBoW2N1cl0ucGFyZW50KSB7XG5cdFx0cGF0aC51bnNoaWZ0KGdyYXBoW2N1cl0ucGFyZW50KTtcblx0XHRmbiA9IGxpbmsoY29udmVyc2lvbnNbZ3JhcGhbY3VyXS5wYXJlbnRdW2N1cl0sIGZuKTtcblx0XHRjdXIgPSBncmFwaFtjdXJdLnBhcmVudDtcblx0fVxuXG5cdGZuLmNvbnZlcnNpb24gPSBwYXRoO1xuXHRyZXR1cm4gZm47XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZyb21Nb2RlbCkge1xuXHR2YXIgZ3JhcGggPSBkZXJpdmVCRlMoZnJvbU1vZGVsKTtcblx0dmFyIGNvbnZlcnNpb24gPSB7fTtcblxuXHR2YXIgbW9kZWxzID0gT2JqZWN0LmtleXMoZ3JhcGgpO1xuXHRmb3IgKHZhciBsZW4gPSBtb2RlbHMubGVuZ3RoLCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0dmFyIHRvTW9kZWwgPSBtb2RlbHNbaV07XG5cdFx0dmFyIG5vZGUgPSBncmFwaFt0b01vZGVsXTtcblxuXHRcdGlmIChub2RlLnBhcmVudCA9PT0gbnVsbCkge1xuXHRcdFx0Ly8gbm8gcG9zc2libGUgY29udmVyc2lvbiwgb3IgdGhpcyBub2RlIGlzIHRoZSBzb3VyY2UgbW9kZWwuXG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHRjb252ZXJzaW9uW3RvTW9kZWxdID0gd3JhcENvbnZlcnNpb24odG9Nb2RlbCwgZ3JhcGgpO1xuXHR9XG5cblx0cmV0dXJuIGNvbnZlcnNpb247XG59O1xuXG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCBvcyA9IHJlcXVpcmUoJ29zJyk7XG5jb25zdCBoYXNGbGFnID0gcmVxdWlyZSgnaGFzLWZsYWcnKTtcblxuY29uc3QgZW52ID0gcHJvY2Vzcy5lbnY7XG5cbmxldCBmb3JjZUNvbG9yO1xuaWYgKGhhc0ZsYWcoJ25vLWNvbG9yJykgfHxcblx0aGFzRmxhZygnbm8tY29sb3JzJykgfHxcblx0aGFzRmxhZygnY29sb3I9ZmFsc2UnKSkge1xuXHRmb3JjZUNvbG9yID0gZmFsc2U7XG59IGVsc2UgaWYgKGhhc0ZsYWcoJ2NvbG9yJykgfHxcblx0aGFzRmxhZygnY29sb3JzJykgfHxcblx0aGFzRmxhZygnY29sb3I9dHJ1ZScpIHx8XG5cdGhhc0ZsYWcoJ2NvbG9yPWFsd2F5cycpKSB7XG5cdGZvcmNlQ29sb3IgPSB0cnVlO1xufVxuaWYgKCdGT1JDRV9DT0xPUicgaW4gZW52KSB7XG5cdGZvcmNlQ29sb3IgPSBlbnYuRk9SQ0VfQ09MT1IubGVuZ3RoID09PSAwIHx8IHBhcnNlSW50KGVudi5GT1JDRV9DT0xPUiwgMTApICE9PSAwO1xufVxuXG5mdW5jdGlvbiB0cmFuc2xhdGVMZXZlbChsZXZlbCkge1xuXHRpZiAobGV2ZWwgPT09IDApIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGxldmVsLFxuXHRcdGhhc0Jhc2ljOiB0cnVlLFxuXHRcdGhhczI1NjogbGV2ZWwgPj0gMixcblx0XHRoYXMxNm06IGxldmVsID49IDNcblx0fTtcbn1cblxuZnVuY3Rpb24gc3VwcG9ydHNDb2xvcihzdHJlYW0pIHtcblx0aWYgKGZvcmNlQ29sb3IgPT09IGZhbHNlKSB7XG5cdFx0cmV0dXJuIDA7XG5cdH1cblxuXHRpZiAoaGFzRmxhZygnY29sb3I9MTZtJykgfHxcblx0XHRoYXNGbGFnKCdjb2xvcj1mdWxsJykgfHxcblx0XHRoYXNGbGFnKCdjb2xvcj10cnVlY29sb3InKSkge1xuXHRcdHJldHVybiAzO1xuXHR9XG5cblx0aWYgKGhhc0ZsYWcoJ2NvbG9yPTI1NicpKSB7XG5cdFx0cmV0dXJuIDI7XG5cdH1cblxuXHRpZiAoc3RyZWFtICYmICFzdHJlYW0uaXNUVFkgJiYgZm9yY2VDb2xvciAhPT0gdHJ1ZSkge1xuXHRcdHJldHVybiAwO1xuXHR9XG5cblx0Y29uc3QgbWluID0gZm9yY2VDb2xvciA/IDEgOiAwO1xuXG5cdGlmIChwcm9jZXNzLnBsYXRmb3JtID09PSAnd2luMzInKSB7XG5cdFx0Ly8gTm9kZS5qcyA3LjUuMCBpcyB0aGUgZmlyc3QgdmVyc2lvbiBvZiBOb2RlLmpzIHRvIGluY2x1ZGUgYSBwYXRjaCB0b1xuXHRcdC8vIGxpYnV2IHRoYXQgZW5hYmxlcyAyNTYgY29sb3Igb3V0cHV0IG9uIFdpbmRvd3MuIEFueXRoaW5nIGVhcmxpZXIgYW5kIGl0XG5cdFx0Ly8gd29uJ3Qgd29yay4gSG93ZXZlciwgaGVyZSB3ZSB0YXJnZXQgTm9kZS5qcyA4IGF0IG1pbmltdW0gYXMgaXQgaXMgYW4gTFRTXG5cdFx0Ly8gcmVsZWFzZSwgYW5kIE5vZGUuanMgNyBpcyBub3QuIFdpbmRvd3MgMTAgYnVpbGQgMTA1ODYgaXMgdGhlIGZpcnN0IFdpbmRvd3Ncblx0XHQvLyByZWxlYXNlIHRoYXQgc3VwcG9ydHMgMjU2IGNvbG9ycy4gV2luZG93cyAxMCBidWlsZCAxNDkzMSBpcyB0aGUgZmlyc3QgcmVsZWFzZVxuXHRcdC8vIHRoYXQgc3VwcG9ydHMgMTZtL1RydWVDb2xvci5cblx0XHRjb25zdCBvc1JlbGVhc2UgPSBvcy5yZWxlYXNlKCkuc3BsaXQoJy4nKTtcblx0XHRpZiAoXG5cdFx0XHROdW1iZXIocHJvY2Vzcy52ZXJzaW9ucy5ub2RlLnNwbGl0KCcuJylbMF0pID49IDggJiZcblx0XHRcdE51bWJlcihvc1JlbGVhc2VbMF0pID49IDEwICYmXG5cdFx0XHROdW1iZXIob3NSZWxlYXNlWzJdKSA+PSAxMDU4NlxuXHRcdCkge1xuXHRcdFx0cmV0dXJuIE51bWJlcihvc1JlbGVhc2VbMl0pID49IDE0OTMxID8gMyA6IDI7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIDE7XG5cdH1cblxuXHRpZiAoJ0NJJyBpbiBlbnYpIHtcblx0XHRpZiAoWydUUkFWSVMnLCAnQ0lSQ0xFQ0knLCAnQVBQVkVZT1InLCAnR0lUTEFCX0NJJ10uc29tZShzaWduID0+IHNpZ24gaW4gZW52KSB8fCBlbnYuQ0lfTkFNRSA9PT0gJ2NvZGVzaGlwJykge1xuXHRcdFx0cmV0dXJuIDE7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG1pbjtcblx0fVxuXG5cdGlmICgnVEVBTUNJVFlfVkVSU0lPTicgaW4gZW52KSB7XG5cdFx0cmV0dXJuIC9eKDlcXC4oMCpbMS05XVxcZCopXFwufFxcZHsyLH1cXC4pLy50ZXN0KGVudi5URUFNQ0lUWV9WRVJTSU9OKSA/IDEgOiAwO1xuXHR9XG5cblx0aWYgKGVudi5DT0xPUlRFUk0gPT09ICd0cnVlY29sb3InKSB7XG5cdFx0cmV0dXJuIDM7XG5cdH1cblxuXHRpZiAoJ1RFUk1fUFJPR1JBTScgaW4gZW52KSB7XG5cdFx0Y29uc3QgdmVyc2lvbiA9IHBhcnNlSW50KChlbnYuVEVSTV9QUk9HUkFNX1ZFUlNJT04gfHwgJycpLnNwbGl0KCcuJylbMF0sIDEwKTtcblxuXHRcdHN3aXRjaCAoZW52LlRFUk1fUFJPR1JBTSkge1xuXHRcdFx0Y2FzZSAnaVRlcm0uYXBwJzpcblx0XHRcdFx0cmV0dXJuIHZlcnNpb24gPj0gMyA/IDMgOiAyO1xuXHRcdFx0Y2FzZSAnQXBwbGVfVGVybWluYWwnOlxuXHRcdFx0XHRyZXR1cm4gMjtcblx0XHRcdC8vIE5vIGRlZmF1bHRcblx0XHR9XG5cdH1cblxuXHRpZiAoLy0yNTYoY29sb3IpPyQvaS50ZXN0KGVudi5URVJNKSkge1xuXHRcdHJldHVybiAyO1xuXHR9XG5cblx0aWYgKC9ec2NyZWVufF54dGVybXxednQxMDB8XnZ0MjIwfF5yeHZ0fGNvbG9yfGFuc2l8Y3lnd2lufGxpbnV4L2kudGVzdChlbnYuVEVSTSkpIHtcblx0XHRyZXR1cm4gMTtcblx0fVxuXG5cdGlmICgnQ09MT1JURVJNJyBpbiBlbnYpIHtcblx0XHRyZXR1cm4gMTtcblx0fVxuXG5cdGlmIChlbnYuVEVSTSA9PT0gJ2R1bWInKSB7XG5cdFx0cmV0dXJuIG1pbjtcblx0fVxuXG5cdHJldHVybiBtaW47XG59XG5cbmZ1bmN0aW9uIGdldFN1cHBvcnRMZXZlbChzdHJlYW0pIHtcblx0Y29uc3QgbGV2ZWwgPSBzdXBwb3J0c0NvbG9yKHN0cmVhbSk7XG5cdHJldHVybiB0cmFuc2xhdGVMZXZlbChsZXZlbCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRzdXBwb3J0c0NvbG9yOiBnZXRTdXBwb3J0TGV2ZWwsXG5cdHN0ZG91dDogZ2V0U3VwcG9ydExldmVsKHByb2Nlc3Muc3Rkb3V0KSxcblx0c3RkZXJyOiBnZXRTdXBwb3J0TGV2ZWwocHJvY2Vzcy5zdGRlcnIpXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSAoZmxhZywgYXJndikgPT4ge1xuXHRhcmd2ID0gYXJndiB8fCBwcm9jZXNzLmFyZ3Y7XG5cdGNvbnN0IHByZWZpeCA9IGZsYWcuc3RhcnRzV2l0aCgnLScpID8gJycgOiAoZmxhZy5sZW5ndGggPT09IDEgPyAnLScgOiAnLS0nKTtcblx0Y29uc3QgcG9zID0gYXJndi5pbmRleE9mKHByZWZpeCArIGZsYWcpO1xuXHRjb25zdCB0ZXJtaW5hdG9yUG9zID0gYXJndi5pbmRleE9mKCctLScpO1xuXHRyZXR1cm4gcG9zICE9PSAtMSAmJiAodGVybWluYXRvclBvcyA9PT0gLTEgPyB0cnVlIDogcG9zIDwgdGVybWluYXRvclBvcyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgVEVNUExBVEVfUkVHRVggPSAvKD86XFxcXCh1W2EtZlxcZF17NH18eFthLWZcXGRdezJ9fC4pKXwoPzpcXHsofik/KFxcdysoPzpcXChbXildKlxcKSk/KD86XFwuXFx3Kyg/OlxcKFteKV0qXFwpKT8pKikoPzpbIFxcdF18KD89XFxyP1xcbikpKXwoXFx9KXwoKD86LnxbXFxyXFxuXFxmXSkrPykvZ2k7XG5jb25zdCBTVFlMRV9SRUdFWCA9IC8oPzpefFxcLikoXFx3KykoPzpcXCgoW14pXSopXFwpKT8vZztcbmNvbnN0IFNUUklOR19SRUdFWCA9IC9eKFsnXCJdKSgoPzpcXFxcLnwoPyFcXDEpW15cXFxcXSkqKVxcMSQvO1xuY29uc3QgRVNDQVBFX1JFR0VYID0gL1xcXFwodVthLWZcXGRdezR9fHhbYS1mXFxkXXsyfXwuKXwoW15cXFxcXSkvZ2k7XG5cbmNvbnN0IEVTQ0FQRVMgPSBuZXcgTWFwKFtcblx0WyduJywgJ1xcbiddLFxuXHRbJ3InLCAnXFxyJ10sXG5cdFsndCcsICdcXHQnXSxcblx0WydiJywgJ1xcYiddLFxuXHRbJ2YnLCAnXFxmJ10sXG5cdFsndicsICdcXHYnXSxcblx0WycwJywgJ1xcMCddLFxuXHRbJ1xcXFwnLCAnXFxcXCddLFxuXHRbJ2UnLCAnXFx1MDAxQiddLFxuXHRbJ2EnLCAnXFx1MDAwNyddXG5dKTtcblxuZnVuY3Rpb24gdW5lc2NhcGUoYykge1xuXHRpZiAoKGNbMF0gPT09ICd1JyAmJiBjLmxlbmd0aCA9PT0gNSkgfHwgKGNbMF0gPT09ICd4JyAmJiBjLmxlbmd0aCA9PT0gMykpIHtcblx0XHRyZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShwYXJzZUludChjLnNsaWNlKDEpLCAxNikpO1xuXHR9XG5cblx0cmV0dXJuIEVTQ0FQRVMuZ2V0KGMpIHx8IGM7XG59XG5cbmZ1bmN0aW9uIHBhcnNlQXJndW1lbnRzKG5hbWUsIGFyZ3MpIHtcblx0Y29uc3QgcmVzdWx0cyA9IFtdO1xuXHRjb25zdCBjaHVua3MgPSBhcmdzLnRyaW0oKS5zcGxpdCgvXFxzKixcXHMqL2cpO1xuXHRsZXQgbWF0Y2hlcztcblxuXHRmb3IgKGNvbnN0IGNodW5rIG9mIGNodW5rcykge1xuXHRcdGlmICghaXNOYU4oY2h1bmspKSB7XG5cdFx0XHRyZXN1bHRzLnB1c2goTnVtYmVyKGNodW5rKSk7XG5cdFx0fSBlbHNlIGlmICgobWF0Y2hlcyA9IGNodW5rLm1hdGNoKFNUUklOR19SRUdFWCkpKSB7XG5cdFx0XHRyZXN1bHRzLnB1c2gobWF0Y2hlc1syXS5yZXBsYWNlKEVTQ0FQRV9SRUdFWCwgKG0sIGVzY2FwZSwgY2hyKSA9PiBlc2NhcGUgPyB1bmVzY2FwZShlc2NhcGUpIDogY2hyKSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBDaGFsayB0ZW1wbGF0ZSBzdHlsZSBhcmd1bWVudDogJHtjaHVua30gKGluIHN0eWxlICcke25hbWV9JylgKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0cztcbn1cblxuZnVuY3Rpb24gcGFyc2VTdHlsZShzdHlsZSkge1xuXHRTVFlMRV9SRUdFWC5sYXN0SW5kZXggPSAwO1xuXG5cdGNvbnN0IHJlc3VsdHMgPSBbXTtcblx0bGV0IG1hdGNoZXM7XG5cblx0d2hpbGUgKChtYXRjaGVzID0gU1RZTEVfUkVHRVguZXhlYyhzdHlsZSkpICE9PSBudWxsKSB7XG5cdFx0Y29uc3QgbmFtZSA9IG1hdGNoZXNbMV07XG5cblx0XHRpZiAobWF0Y2hlc1syXSkge1xuXHRcdFx0Y29uc3QgYXJncyA9IHBhcnNlQXJndW1lbnRzKG5hbWUsIG1hdGNoZXNbMl0pO1xuXHRcdFx0cmVzdWx0cy5wdXNoKFtuYW1lXS5jb25jYXQoYXJncykpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXN1bHRzLnB1c2goW25hbWVdKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0cztcbn1cblxuZnVuY3Rpb24gYnVpbGRTdHlsZShjaGFsaywgc3R5bGVzKSB7XG5cdGNvbnN0IGVuYWJsZWQgPSB7fTtcblxuXHRmb3IgKGNvbnN0IGxheWVyIG9mIHN0eWxlcykge1xuXHRcdGZvciAoY29uc3Qgc3R5bGUgb2YgbGF5ZXIuc3R5bGVzKSB7XG5cdFx0XHRlbmFibGVkW3N0eWxlWzBdXSA9IGxheWVyLmludmVyc2UgPyBudWxsIDogc3R5bGUuc2xpY2UoMSk7XG5cdFx0fVxuXHR9XG5cblx0bGV0IGN1cnJlbnQgPSBjaGFsaztcblx0Zm9yIChjb25zdCBzdHlsZU5hbWUgb2YgT2JqZWN0LmtleXMoZW5hYmxlZCkpIHtcblx0XHRpZiAoQXJyYXkuaXNBcnJheShlbmFibGVkW3N0eWxlTmFtZV0pKSB7XG5cdFx0XHRpZiAoIShzdHlsZU5hbWUgaW4gY3VycmVudCkpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBVbmtub3duIENoYWxrIHN0eWxlOiAke3N0eWxlTmFtZX1gKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGVuYWJsZWRbc3R5bGVOYW1lXS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdGN1cnJlbnQgPSBjdXJyZW50W3N0eWxlTmFtZV0uYXBwbHkoY3VycmVudCwgZW5hYmxlZFtzdHlsZU5hbWVdKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGN1cnJlbnQgPSBjdXJyZW50W3N0eWxlTmFtZV07XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGN1cnJlbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gKGNoYWxrLCB0bXApID0+IHtcblx0Y29uc3Qgc3R5bGVzID0gW107XG5cdGNvbnN0IGNodW5rcyA9IFtdO1xuXHRsZXQgY2h1bmsgPSBbXTtcblxuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LXBhcmFtc1xuXHR0bXAucmVwbGFjZShURU1QTEFURV9SRUdFWCwgKG0sIGVzY2FwZUNoYXIsIGludmVyc2UsIHN0eWxlLCBjbG9zZSwgY2hyKSA9PiB7XG5cdFx0aWYgKGVzY2FwZUNoYXIpIHtcblx0XHRcdGNodW5rLnB1c2godW5lc2NhcGUoZXNjYXBlQ2hhcikpO1xuXHRcdH0gZWxzZSBpZiAoc3R5bGUpIHtcblx0XHRcdGNvbnN0IHN0ciA9IGNodW5rLmpvaW4oJycpO1xuXHRcdFx0Y2h1bmsgPSBbXTtcblx0XHRcdGNodW5rcy5wdXNoKHN0eWxlcy5sZW5ndGggPT09IDAgPyBzdHIgOiBidWlsZFN0eWxlKGNoYWxrLCBzdHlsZXMpKHN0cikpO1xuXHRcdFx0c3R5bGVzLnB1c2goe2ludmVyc2UsIHN0eWxlczogcGFyc2VTdHlsZShzdHlsZSl9KTtcblx0XHR9IGVsc2UgaWYgKGNsb3NlKSB7XG5cdFx0XHRpZiAoc3R5bGVzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0ZvdW5kIGV4dHJhbmVvdXMgfSBpbiBDaGFsayB0ZW1wbGF0ZSBsaXRlcmFsJyk7XG5cdFx0XHR9XG5cblx0XHRcdGNodW5rcy5wdXNoKGJ1aWxkU3R5bGUoY2hhbGssIHN0eWxlcykoY2h1bmsuam9pbignJykpKTtcblx0XHRcdGNodW5rID0gW107XG5cdFx0XHRzdHlsZXMucG9wKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNodW5rLnB1c2goY2hyKTtcblx0XHR9XG5cdH0pO1xuXG5cdGNodW5rcy5wdXNoKGNodW5rLmpvaW4oJycpKTtcblxuXHRpZiAoc3R5bGVzLmxlbmd0aCA+IDApIHtcblx0XHRjb25zdCBlcnJNc2cgPSBgQ2hhbGsgdGVtcGxhdGUgbGl0ZXJhbCBpcyBtaXNzaW5nICR7c3R5bGVzLmxlbmd0aH0gY2xvc2luZyBicmFja2V0JHtzdHlsZXMubGVuZ3RoID09PSAxID8gJycgOiAncyd9IChcXGB9XFxgKWA7XG5cdFx0dGhyb3cgbmV3IEVycm9yKGVyck1zZyk7XG5cdH1cblxuXHRyZXR1cm4gY2h1bmtzLmpvaW4oJycpO1xufTtcbiIsIi8qIVxuICogVG1wXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDExLTIwMTcgS0FSQVNaSSBJc3R2YW4gPGdpdGh1YkBzcGFtLnJhc3ppLmh1PlxuICpcbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbi8qXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5jb25zdCBvcyA9IHJlcXVpcmUoJ29zJyk7XG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuY29uc3QgY3J5cHRvID0gcmVxdWlyZSgnY3J5cHRvJyk7XG5jb25zdCBfYyA9IGZzLmNvbnN0YW50cyAmJiBvcy5jb25zdGFudHMgP1xuICB7IGZzOiBmcy5jb25zdGFudHMsIG9zOiBvcy5jb25zdGFudHMgfSA6XG4gIHByb2Nlc3MuYmluZGluZygnY29uc3RhbnRzJyk7XG5jb25zdCByaW1yYWYgPSByZXF1aXJlKCdyaW1yYWYnKTtcblxuLypcbiAqIFRoZSB3b3JraW5nIGlubmVyIHZhcmlhYmxlcy5cbiAqL1xuY29uc3RcbiAgLy8gdGhlIHJhbmRvbSBjaGFyYWN0ZXJzIHRvIGNob29zZSBmcm9tXG4gIFJBTkRPTV9DSEFSUyA9ICcwMTIzNDU2Nzg5QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5eicsXG5cbiAgVEVNUExBVEVfUEFUVEVSTiA9IC9YWFhYWFgvLFxuXG4gIERFRkFVTFRfVFJJRVMgPSAzLFxuXG4gIENSRUFURV9GTEFHUyA9IChfYy5PX0NSRUFUIHx8IF9jLmZzLk9fQ1JFQVQpIHwgKF9jLk9fRVhDTCB8fCBfYy5mcy5PX0VYQ0wpIHwgKF9jLk9fUkRXUiB8fCBfYy5mcy5PX1JEV1IpLFxuXG4gIEVCQURGID0gX2MuRUJBREYgfHwgX2Mub3MuZXJybm8uRUJBREYsXG4gIEVOT0VOVCA9IF9jLkVOT0VOVCB8fCBfYy5vcy5lcnJuby5FTk9FTlQsXG5cbiAgRElSX01PREUgPSA0NDggLyogMG83MDAgKi8sXG4gIEZJTEVfTU9ERSA9IDM4NCAvKiAwbzYwMCAqLyxcblxuICBFWElUID0gJ2V4aXQnLFxuXG4gIFNJR0lOVCA9ICdTSUdJTlQnLFxuXG4gIC8vIHRoaXMgd2lsbCBob2xkIHRoZSBvYmplY3RzIG5lZWQgdG8gYmUgcmVtb3ZlZCBvbiBleGl0XG4gIF9yZW1vdmVPYmplY3RzID0gW107XG5cbnZhclxuICBfZ3JhY2VmdWxDbGVhbnVwID0gZmFsc2U7XG5cbi8qKlxuICogUmFuZG9tIG5hbWUgZ2VuZXJhdG9yIGJhc2VkIG9uIGNyeXB0by5cbiAqIEFkYXB0ZWQgZnJvbSBodHRwOi8vYmxvZy50b21wYXdsYWsub3JnL2hvdy10by1nZW5lcmF0ZS1yYW5kb20tdmFsdWVzLW5vZGVqcy1qYXZhc2NyaXB0XG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGhvd01hbnlcbiAqIEByZXR1cm5zIHtzdHJpbmd9IHRoZSBnZW5lcmF0ZWQgcmFuZG9tIG5hbWVcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIF9yYW5kb21DaGFycyhob3dNYW55KSB7XG4gIHZhclxuICAgIHZhbHVlID0gW10sXG4gICAgcm5kID0gbnVsbDtcblxuICAvLyBtYWtlIHN1cmUgdGhhdCB3ZSBkbyBub3QgZmFpbCBiZWNhdXNlIHdlIHJhbiBvdXQgb2YgZW50cm9weVxuICB0cnkge1xuICAgIHJuZCA9IGNyeXB0by5yYW5kb21CeXRlcyhob3dNYW55KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJuZCA9IGNyeXB0by5wc2V1ZG9SYW5kb21CeXRlcyhob3dNYW55KTtcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgaG93TWFueTsgaSsrKSB7XG4gICAgdmFsdWUucHVzaChSQU5ET01fQ0hBUlNbcm5kW2ldICUgUkFORE9NX0NIQVJTLmxlbmd0aF0pO1xuICB9XG5cbiAgcmV0dXJuIHZhbHVlLmpvaW4oJycpO1xufVxuXG4vKipcbiAqIENoZWNrcyB3aGV0aGVyIHRoZSBgb2JqYCBwYXJhbWV0ZXIgaXMgZGVmaW5lZCBvciBub3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybnMge2Jvb2xlYW59IHRydWUgaWYgdGhlIG9iamVjdCBpcyB1bmRlZmluZWRcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIF9pc1VuZGVmaW5lZChvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnO1xufVxuXG4vKipcbiAqIFBhcnNlcyB0aGUgZnVuY3Rpb24gYXJndW1lbnRzLlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gaGVscHMgdG8gaGF2ZSBvcHRpb25hbCBhcmd1bWVudHMuXG4gKlxuICogQHBhcmFtIHsoT3B0aW9uc3xGdW5jdGlvbil9IG9wdGlvbnNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7QXJyYXl9IHBhcnNlZCBhcmd1bWVudHNcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIF9wYXJzZUFyZ3VtZW50cyhvcHRpb25zLCBjYWxsYmFjaykge1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gW3t9LCBvcHRpb25zXTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gIGlmIChfaXNVbmRlZmluZWQob3B0aW9ucykpIHtcbiAgICByZXR1cm4gW3t9LCBjYWxsYmFja107XG4gIH1cblxuICByZXR1cm4gW29wdGlvbnMsIGNhbGxiYWNrXTtcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSBuZXcgdGVtcG9yYXJ5IG5hbWUuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAqIEByZXR1cm5zIHtzdHJpbmd9IHRoZSBuZXcgcmFuZG9tIG5hbWUgYWNjb3JkaW5nIHRvIG9wdHNcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIF9nZW5lcmF0ZVRtcE5hbWUob3B0cykge1xuXG4gIGNvbnN0IHRtcERpciA9IF9nZXRUbXBEaXIoKTtcblxuICAvLyBmYWlsIGVhcmx5IG9uIG1pc3NpbmcgdG1wIGRpclxuICBpZiAoaXNCbGFuayhvcHRzLmRpcikgJiYgaXNCbGFuayh0bXBEaXIpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdObyB0bXAgZGlyIHNwZWNpZmllZCcpO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgaWYgKCFpc0JsYW5rKG9wdHMubmFtZSkpIHtcbiAgICByZXR1cm4gcGF0aC5qb2luKG9wdHMuZGlyIHx8IHRtcERpciwgb3B0cy5uYW1lKTtcbiAgfVxuXG4gIC8vIG1rc3RlbXBzIGxpa2UgdGVtcGxhdGVcbiAgLy8gb3B0cy50ZW1wbGF0ZSBoYXMgYWxyZWFkeSBiZWVuIGd1YXJkZWQgaW4gdG1wTmFtZSgpIGJlbG93XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gIGlmIChvcHRzLnRlbXBsYXRlKSB7XG4gICAgdmFyIHRlbXBsYXRlID0gb3B0cy50ZW1wbGF0ZTtcbiAgICAvLyBtYWtlIHN1cmUgdGhhdCB3ZSBwcmVwZW5kIHRoZSB0bXAgcGF0aCBpZiBub25lIHdhcyBnaXZlblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgaWYgKHBhdGguYmFzZW5hbWUodGVtcGxhdGUpID09PSB0ZW1wbGF0ZSlcbiAgICAgIHRlbXBsYXRlID0gcGF0aC5qb2luKG9wdHMuZGlyIHx8IHRtcERpciwgdGVtcGxhdGUpO1xuICAgIHJldHVybiB0ZW1wbGF0ZS5yZXBsYWNlKFRFTVBMQVRFX1BBVFRFUk4sIF9yYW5kb21DaGFycyg2KSk7XG4gIH1cblxuICAvLyBwcmVmaXggYW5kIHBvc3RmaXhcbiAgY29uc3QgbmFtZSA9IFtcbiAgICAoaXNCbGFuayhvcHRzLnByZWZpeCkgPyAndG1wLScgOiBvcHRzLnByZWZpeCksXG4gICAgcHJvY2Vzcy5waWQsXG4gICAgX3JhbmRvbUNoYXJzKDEyKSxcbiAgICAob3B0cy5wb3N0Zml4ID8gb3B0cy5wb3N0Zml4IDogJycpXG4gIF0uam9pbignJyk7XG5cbiAgcmV0dXJuIHBhdGguam9pbihvcHRzLmRpciB8fCB0bXBEaXIsIG5hbWUpO1xufVxuXG4vKipcbiAqIEdldHMgYSB0ZW1wb3JhcnkgZmlsZSBuYW1lLlxuICpcbiAqIEBwYXJhbSB7KE9wdGlvbnN8dG1wTmFtZUNhbGxiYWNrKX0gb3B0aW9ucyBvcHRpb25zIG9yIGNhbGxiYWNrXG4gKiBAcGFyYW0gez90bXBOYW1lQ2FsbGJhY2t9IGNhbGxiYWNrIHRoZSBjYWxsYmFjayBmdW5jdGlvblxuICovXG5mdW5jdGlvbiB0bXBOYW1lKG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gIHZhclxuICAgIGFyZ3MgPSBfcGFyc2VBcmd1bWVudHMob3B0aW9ucywgY2FsbGJhY2spLFxuICAgIG9wdHMgPSBhcmdzWzBdLFxuICAgIGNiID0gYXJnc1sxXSxcbiAgICB0cmllcyA9ICFpc0JsYW5rKG9wdHMubmFtZSkgPyAxIDogb3B0cy50cmllcyB8fCBERUZBVUxUX1RSSUVTO1xuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gIGlmIChpc05hTih0cmllcykgfHwgdHJpZXMgPCAwKVxuICAgIHJldHVybiBjYihuZXcgRXJyb3IoJ0ludmFsaWQgdHJpZXMnKSk7XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgaWYgKG9wdHMudGVtcGxhdGUgJiYgIW9wdHMudGVtcGxhdGUubWF0Y2goVEVNUExBVEVfUEFUVEVSTikpXG4gICAgcmV0dXJuIGNiKG5ldyBFcnJvcignSW52YWxpZCB0ZW1wbGF0ZSBwcm92aWRlZCcpKTtcblxuICAoZnVuY3Rpb24gX2dldFVuaXF1ZU5hbWUoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IG5hbWUgPSBfZ2VuZXJhdGVUbXBOYW1lKG9wdHMpO1xuXG4gICAgICAvLyBjaGVjayB3aGV0aGVyIHRoZSBwYXRoIGV4aXN0cyB0aGVuIHJldHJ5IGlmIG5lZWRlZFxuICAgICAgZnMuc3RhdChuYW1lLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICAgIGlmICghZXJyKSB7XG4gICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgICAgICBpZiAodHJpZXMtLSA+IDApIHJldHVybiBfZ2V0VW5pcXVlTmFtZSgpO1xuXG4gICAgICAgICAgcmV0dXJuIGNiKG5ldyBFcnJvcignQ291bGQgbm90IGdldCBhIHVuaXF1ZSB0bXAgZmlsZW5hbWUsIG1heCB0cmllcyByZWFjaGVkICcgKyBuYW1lKSk7XG4gICAgICAgIH1cblxuICAgICAgICBjYihudWxsLCBuYW1lKTtcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY2IoZXJyKTtcbiAgICB9XG4gIH0oKSk7XG59XG5cbi8qKlxuICogU3luY2hyb25vdXMgdmVyc2lvbiBvZiB0bXBOYW1lLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJucyB7c3RyaW5nfSB0aGUgZ2VuZXJhdGVkIHJhbmRvbSBuYW1lXG4gKiBAdGhyb3dzIHtFcnJvcn0gaWYgdGhlIG9wdGlvbnMgYXJlIGludmFsaWQgb3IgY291bGQgbm90IGdlbmVyYXRlIGEgZmlsZW5hbWVcbiAqL1xuZnVuY3Rpb24gdG1wTmFtZVN5bmMob3B0aW9ucykge1xuICB2YXJcbiAgICBhcmdzID0gX3BhcnNlQXJndW1lbnRzKG9wdGlvbnMpLFxuICAgIG9wdHMgPSBhcmdzWzBdLFxuICAgIHRyaWVzID0gIWlzQmxhbmsob3B0cy5uYW1lKSA/IDEgOiBvcHRzLnRyaWVzIHx8IERFRkFVTFRfVFJJRVM7XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgaWYgKGlzTmFOKHRyaWVzKSB8fCB0cmllcyA8IDApXG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHRyaWVzJyk7XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgaWYgKG9wdHMudGVtcGxhdGUgJiYgIW9wdHMudGVtcGxhdGUubWF0Y2goVEVNUExBVEVfUEFUVEVSTikpXG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHRlbXBsYXRlIHByb3ZpZGVkJyk7XG5cbiAgZG8ge1xuICAgIGNvbnN0IG5hbWUgPSBfZ2VuZXJhdGVUbXBOYW1lKG9wdHMpO1xuICAgIHRyeSB7XG4gICAgICBmcy5zdGF0U3luYyhuYW1lKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gbmFtZTtcbiAgICB9XG4gIH0gd2hpbGUgKHRyaWVzLS0gPiAwKTtcblxuICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBnZXQgYSB1bmlxdWUgdG1wIGZpbGVuYW1lLCBtYXggdHJpZXMgcmVhY2hlZCcpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW5kIG9wZW5zIGEgdGVtcG9yYXJ5IGZpbGUuXG4gKlxuICogQHBhcmFtIHsoT3B0aW9uc3xmaWxlQ2FsbGJhY2spfSBvcHRpb25zIHRoZSBjb25maWcgb3B0aW9ucyBvciB0aGUgY2FsbGJhY2sgZnVuY3Rpb25cbiAqIEBwYXJhbSB7P2ZpbGVDYWxsYmFja30gY2FsbGJhY2tcbiAqL1xuZnVuY3Rpb24gZmlsZShvcHRpb25zLCBjYWxsYmFjaykge1xuICB2YXJcbiAgICBhcmdzID0gX3BhcnNlQXJndW1lbnRzKG9wdGlvbnMsIGNhbGxiYWNrKSxcbiAgICBvcHRzID0gYXJnc1swXSxcbiAgICBjYiA9IGFyZ3NbMV07XG5cbiAgLy8gZ2V0cyBhIHRlbXBvcmFyeSBmaWxlbmFtZVxuICB0bXBOYW1lKG9wdHMsIGZ1bmN0aW9uIF90bXBOYW1lQ3JlYXRlZChlcnIsIG5hbWUpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgIGlmIChlcnIpIHJldHVybiBjYihlcnIpO1xuXG4gICAgLy8gY3JlYXRlIGFuZCBvcGVuIHRoZSBmaWxlXG4gICAgZnMub3BlbihuYW1lLCBDUkVBVEVfRkxBR1MsIG9wdHMubW9kZSB8fCBGSUxFX01PREUsIGZ1bmN0aW9uIF9maWxlQ3JlYXRlZChlcnIsIGZkKSB7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgaWYgKGVycikgcmV0dXJuIGNiKGVycik7XG5cbiAgICAgIGlmIChvcHRzLmRpc2NhcmREZXNjcmlwdG9yKSB7XG4gICAgICAgIHJldHVybiBmcy5jbG9zZShmZCwgZnVuY3Rpb24gX2Rpc2NhcmRDYWxsYmFjayhlcnIpIHtcbiAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIC8vIExvdyBwcm9iYWJpbGl0eSwgYW5kIHRoZSBmaWxlIGV4aXN0cywgc28gdGhpcyBjb3VsZCBiZVxuICAgICAgICAgICAgLy8gaWdub3JlZC4gIElmIGl0IGlzbid0IHdlIGNlcnRhaW5seSBuZWVkIHRvIHVubGluayB0aGVcbiAgICAgICAgICAgIC8vIGZpbGUsIGFuZCBpZiB0aGF0IGZhaWxzIHRvbyBpdHMgZXJyb3IgaXMgbW9yZVxuICAgICAgICAgICAgLy8gaW1wb3J0YW50LlxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgZnMudW5saW5rU3luYyhuYW1lKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgaWYgKCFpc0VOT0VOVChlKSkge1xuICAgICAgICAgICAgICAgIGVyciA9IGU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjYihlcnIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYihudWxsLCBuYW1lLCB1bmRlZmluZWQsIF9wcmVwYXJlVG1wRmlsZVJlbW92ZUNhbGxiYWNrKG5hbWUsIC0xLCBvcHRzKSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgIGlmIChvcHRzLmRldGFjaERlc2NyaXB0b3IpIHtcbiAgICAgICAgcmV0dXJuIGNiKG51bGwsIG5hbWUsIGZkLCBfcHJlcGFyZVRtcEZpbGVSZW1vdmVDYWxsYmFjayhuYW1lLCAtMSwgb3B0cykpO1xuICAgICAgfVxuICAgICAgY2IobnVsbCwgbmFtZSwgZmQsIF9wcmVwYXJlVG1wRmlsZVJlbW92ZUNhbGxiYWNrKG5hbWUsIGZkLCBvcHRzKSk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG4vKipcbiAqIFN5bmNocm9ub3VzIHZlcnNpb24gb2YgZmlsZS5cbiAqXG4gKiBAcGFyYW0ge09wdGlvbnN9IG9wdGlvbnNcbiAqIEByZXR1cm5zIHtGaWxlU3luY09iamVjdH0gb2JqZWN0IGNvbnNpc3RzIG9mIG5hbWUsIGZkIGFuZCByZW1vdmVDYWxsYmFja1xuICogQHRocm93cyB7RXJyb3J9IGlmIGNhbm5vdCBjcmVhdGUgYSBmaWxlXG4gKi9cbmZ1bmN0aW9uIGZpbGVTeW5jKG9wdGlvbnMpIHtcbiAgdmFyXG4gICAgYXJncyA9IF9wYXJzZUFyZ3VtZW50cyhvcHRpb25zKSxcbiAgICBvcHRzID0gYXJnc1swXTtcblxuICBjb25zdCBkaXNjYXJkT3JEZXRhY2hEZXNjcmlwdG9yID0gb3B0cy5kaXNjYXJkRGVzY3JpcHRvciB8fCBvcHRzLmRldGFjaERlc2NyaXB0b3I7XG4gIGNvbnN0IG5hbWUgPSB0bXBOYW1lU3luYyhvcHRzKTtcbiAgdmFyIGZkID0gZnMub3BlblN5bmMobmFtZSwgQ1JFQVRFX0ZMQUdTLCBvcHRzLm1vZGUgfHwgRklMRV9NT0RFKTtcbiAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgaWYgKG9wdHMuZGlzY2FyZERlc2NyaXB0b3IpIHtcbiAgICBmcy5jbG9zZVN5bmMoZmQpO1xuICAgIGZkID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBuYW1lLFxuICAgIGZkOiBmZCxcbiAgICByZW1vdmVDYWxsYmFjazogX3ByZXBhcmVUbXBGaWxlUmVtb3ZlQ2FsbGJhY2sobmFtZSwgZGlzY2FyZE9yRGV0YWNoRGVzY3JpcHRvciA/IC0xIDogZmQsIG9wdHMpXG4gIH07XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIHRlbXBvcmFyeSBkaXJlY3RvcnkuXG4gKlxuICogQHBhcmFtIHsoT3B0aW9uc3xkaXJDYWxsYmFjayl9IG9wdGlvbnMgdGhlIG9wdGlvbnMgb3IgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcGFyYW0gez9kaXJDYWxsYmFja30gY2FsbGJhY2tcbiAqL1xuZnVuY3Rpb24gZGlyKG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gIHZhclxuICAgIGFyZ3MgPSBfcGFyc2VBcmd1bWVudHMob3B0aW9ucywgY2FsbGJhY2spLFxuICAgIG9wdHMgPSBhcmdzWzBdLFxuICAgIGNiID0gYXJnc1sxXTtcblxuICAvLyBnZXRzIGEgdGVtcG9yYXJ5IGZpbGVuYW1lXG4gIHRtcE5hbWUob3B0cywgZnVuY3Rpb24gX3RtcE5hbWVDcmVhdGVkKGVyciwgbmFtZSkge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgaWYgKGVycikgcmV0dXJuIGNiKGVycik7XG5cbiAgICAvLyBjcmVhdGUgdGhlIGRpcmVjdG9yeVxuICAgIGZzLm1rZGlyKG5hbWUsIG9wdHMubW9kZSB8fCBESVJfTU9ERSwgZnVuY3Rpb24gX2RpckNyZWF0ZWQoZXJyKSB7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgaWYgKGVycikgcmV0dXJuIGNiKGVycik7XG5cbiAgICAgIGNiKG51bGwsIG5hbWUsIF9wcmVwYXJlVG1wRGlyUmVtb3ZlQ2FsbGJhY2sobmFtZSwgb3B0cykpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuLyoqXG4gKiBTeW5jaHJvbm91cyB2ZXJzaW9uIG9mIGRpci5cbiAqXG4gKiBAcGFyYW0ge09wdGlvbnN9IG9wdGlvbnNcbiAqIEByZXR1cm5zIHtEaXJTeW5jT2JqZWN0fSBvYmplY3QgY29uc2lzdHMgb2YgbmFtZSBhbmQgcmVtb3ZlQ2FsbGJhY2tcbiAqIEB0aHJvd3Mge0Vycm9yfSBpZiBpdCBjYW5ub3QgY3JlYXRlIGEgZGlyZWN0b3J5XG4gKi9cbmZ1bmN0aW9uIGRpclN5bmMob3B0aW9ucykge1xuICB2YXJcbiAgICBhcmdzID0gX3BhcnNlQXJndW1lbnRzKG9wdGlvbnMpLFxuICAgIG9wdHMgPSBhcmdzWzBdO1xuXG4gIGNvbnN0IG5hbWUgPSB0bXBOYW1lU3luYyhvcHRzKTtcbiAgZnMubWtkaXJTeW5jKG5hbWUsIG9wdHMubW9kZSB8fCBESVJfTU9ERSk7XG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBuYW1lLFxuICAgIHJlbW92ZUNhbGxiYWNrOiBfcHJlcGFyZVRtcERpclJlbW92ZUNhbGxiYWNrKG5hbWUsIG9wdHMpXG4gIH07XG59XG5cbi8qKlxuICogUmVtb3ZlcyBmaWxlcyBhc3luY2hyb25vdXNseS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZmRQYXRoXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBuZXh0XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBfcmVtb3ZlRmlsZUFzeW5jKGZkUGF0aCwgbmV4dCkge1xuICBjb25zdCBfaGFuZGxlciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICBpZiAoZXJyICYmICFpc0VOT0VOVChlcnIpKSB7XG4gICAgICAvLyByZXJhaXNlIGFueSB1bmFudGljaXBhdGVkIGVycm9yXG4gICAgICByZXR1cm4gbmV4dChlcnIpO1xuICAgIH1cbiAgICBuZXh0KCk7XG4gIH1cblxuICBpZiAoMCA8PSBmZFBhdGhbMF0pXG4gICAgZnMuY2xvc2UoZmRQYXRoWzBdLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICBmcy51bmxpbmsoZmRQYXRoWzFdLCBfaGFuZGxlcik7XG4gICAgfSk7XG4gIGVsc2UgZnMudW5saW5rKGZkUGF0aFsxXSwgX2hhbmRsZXIpO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgZmlsZXMgc3luY2hyb25vdXNseS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZmRQYXRoXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBfcmVtb3ZlRmlsZVN5bmMoZmRQYXRoKSB7XG4gIHRyeSB7XG4gICAgaWYgKDAgPD0gZmRQYXRoWzBdKSBmcy5jbG9zZVN5bmMoZmRQYXRoWzBdKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIHJlcmFpc2UgYW55IHVuYW50aWNpcGF0ZWQgZXJyb3JcbiAgICBpZiAoIWlzRUJBREYoZSkgJiYgIWlzRU5PRU5UKGUpKSB0aHJvdyBlO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBmcy51bmxpbmtTeW5jKGZkUGF0aFsxXSk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAvLyByZXJhaXNlIGFueSB1bmFudGljaXBhdGVkIGVycm9yXG4gICAgICBpZiAoIWlzRU5PRU5UKGUpKSB0aHJvdyBlO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFByZXBhcmVzIHRoZSBjYWxsYmFjayBmb3IgcmVtb3ZhbCBvZiB0aGUgdGVtcG9yYXJ5IGZpbGUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgdGhlIHBhdGggb2YgdGhlIGZpbGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBmZCBmaWxlIGRlc2NyaXB0b3JcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gKiBAcmV0dXJucyB7ZmlsZUNhbGxiYWNrfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gX3ByZXBhcmVUbXBGaWxlUmVtb3ZlQ2FsbGJhY2sobmFtZSwgZmQsIG9wdHMpIHtcbiAgY29uc3QgcmVtb3ZlQ2FsbGJhY2tTeW5jID0gX3ByZXBhcmVSZW1vdmVDYWxsYmFjayhfcmVtb3ZlRmlsZVN5bmMsIFtmZCwgbmFtZV0pO1xuICBjb25zdCByZW1vdmVDYWxsYmFjayA9IF9wcmVwYXJlUmVtb3ZlQ2FsbGJhY2soX3JlbW92ZUZpbGVBc3luYywgW2ZkLCBuYW1lXSwgcmVtb3ZlQ2FsbGJhY2tTeW5jKTtcblxuICBpZiAoIW9wdHMua2VlcCkgX3JlbW92ZU9iamVjdHMudW5zaGlmdChyZW1vdmVDYWxsYmFja1N5bmMpO1xuXG4gIHJldHVybiByZW1vdmVDYWxsYmFjaztcbn1cblxuLyoqXG4gKiBTaW1wbGUgd3JhcHBlciBmb3IgcmltcmFmLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBkaXJQYXRoXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBuZXh0XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBfcmltcmFmUmVtb3ZlRGlyV3JhcHBlcihkaXJQYXRoLCBuZXh0KSB7XG4gIHJpbXJhZihkaXJQYXRoLCBuZXh0KTtcbn1cblxuLyoqXG4gKiBTaW1wbGUgd3JhcHBlciBmb3IgcmltcmFmLnN5bmMuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGRpclBhdGhcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIF9yaW1yYWZSZW1vdmVEaXJTeW5jV3JhcHBlcihkaXJQYXRoLCBuZXh0KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIG5leHQobnVsbCwgcmltcmFmLnN5bmMoZGlyUGF0aCkpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gbmV4dChlcnIpO1xuICB9XG59XG5cbi8qKlxuICogUHJlcGFyZXMgdGhlIGNhbGxiYWNrIGZvciByZW1vdmFsIG9mIHRoZSB0ZW1wb3JhcnkgZGlyZWN0b3J5LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0c1xuICogQHJldHVybnMge0Z1bmN0aW9ufSB0aGUgY2FsbGJhY2tcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIF9wcmVwYXJlVG1wRGlyUmVtb3ZlQ2FsbGJhY2sobmFtZSwgb3B0cykge1xuICBjb25zdCByZW1vdmVGdW5jdGlvbiA9IG9wdHMudW5zYWZlQ2xlYW51cCA/IF9yaW1yYWZSZW1vdmVEaXJXcmFwcGVyIDogZnMucm1kaXIuYmluZChmcyk7XG4gIGNvbnN0IHJlbW92ZUZ1bmN0aW9uU3luYyA9IG9wdHMudW5zYWZlQ2xlYW51cCA/IF9yaW1yYWZSZW1vdmVEaXJTeW5jV3JhcHBlciA6IGZzLnJtZGlyU3luYy5iaW5kKGZzKTtcbiAgY29uc3QgcmVtb3ZlQ2FsbGJhY2tTeW5jID0gX3ByZXBhcmVSZW1vdmVDYWxsYmFjayhyZW1vdmVGdW5jdGlvblN5bmMsIG5hbWUpO1xuICBjb25zdCByZW1vdmVDYWxsYmFjayA9IF9wcmVwYXJlUmVtb3ZlQ2FsbGJhY2socmVtb3ZlRnVuY3Rpb24sIG5hbWUsIHJlbW92ZUNhbGxiYWNrU3luYyk7XG4gIGlmICghb3B0cy5rZWVwKSBfcmVtb3ZlT2JqZWN0cy51bnNoaWZ0KHJlbW92ZUNhbGxiYWNrU3luYyk7XG5cbiAgcmV0dXJuIHJlbW92ZUNhbGxiYWNrO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBndWFyZGVkIGZ1bmN0aW9uIHdyYXBwaW5nIHRoZSByZW1vdmVGdW5jdGlvbiBjYWxsLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlbW92ZUZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gYXJnXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBfcHJlcGFyZVJlbW92ZUNhbGxiYWNrKHJlbW92ZUZ1bmN0aW9uLCBhcmcsIGNsZWFudXBDYWxsYmFja1N5bmMpIHtcbiAgdmFyIGNhbGxlZCA9IGZhbHNlO1xuXG4gIHJldHVybiBmdW5jdGlvbiBfY2xlYW51cENhbGxiYWNrKG5leHQpIHtcbiAgICBuZXh0ID0gbmV4dCB8fCBmdW5jdGlvbiAoKSB7fTtcbiAgICBpZiAoIWNhbGxlZCkge1xuICAgICAgY29uc3QgdG9SZW1vdmUgPSBjbGVhbnVwQ2FsbGJhY2tTeW5jIHx8IF9jbGVhbnVwQ2FsbGJhY2s7XG4gICAgICBjb25zdCBpbmRleCA9IF9yZW1vdmVPYmplY3RzLmluZGV4T2YodG9SZW1vdmUpO1xuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgIGlmIChpbmRleCA+PSAwKSBfcmVtb3ZlT2JqZWN0cy5zcGxpY2UoaW5kZXgsIDEpO1xuXG4gICAgICBjYWxsZWQgPSB0cnVlO1xuICAgICAgLy8gc3luYz9cbiAgICAgIGlmIChyZW1vdmVGdW5jdGlvbi5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZW1vdmVGdW5jdGlvbihhcmcpO1xuICAgICAgICAgIHJldHVybiBuZXh0KG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAvLyBpZiBubyBuZXh0IGlzIHByb3ZpZGVkIGFuZCBzaW5jZSB3ZSBhcmVcbiAgICAgICAgICAvLyBpbiBzaWxlbnQgY2xlYW51cCBtb2RlIG9uIHByb2Nlc3MgZXhpdCxcbiAgICAgICAgICAvLyB3ZSB3aWxsIGlnbm9yZSB0aGUgZXJyb3JcbiAgICAgICAgICByZXR1cm4gbmV4dChlcnIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgcmV0dXJuIHJlbW92ZUZ1bmN0aW9uKGFyZywgbmV4dCk7XG4gICAgfSBlbHNlIHJldHVybiBuZXh0KG5ldyBFcnJvcignY2xlYW51cCBjYWxsYmFjayBoYXMgYWxyZWFkeSBiZWVuIGNhbGxlZCcpKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGUgZ2FyYmFnZSBjb2xsZWN0b3IuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gX2dhcmJhZ2VDb2xsZWN0b3IoKSB7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gIGlmICghX2dyYWNlZnVsQ2xlYW51cCkgcmV0dXJuO1xuXG4gIC8vIHRoZSBmdW5jdGlvbiBiZWluZyBjYWxsZWQgcmVtb3ZlcyBpdHNlbGYgZnJvbSBfcmVtb3ZlT2JqZWN0cyxcbiAgLy8gbG9vcCB1bnRpbCBfcmVtb3ZlT2JqZWN0cyBpcyBlbXB0eVxuICB3aGlsZSAoX3JlbW92ZU9iamVjdHMubGVuZ3RoKSB7XG4gICAgdHJ5IHtcbiAgICAgIF9yZW1vdmVPYmplY3RzWzBdKCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gYWxyZWFkeSByZW1vdmVkP1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEhlbHBlciBmb3IgdGVzdGluZyBhZ2FpbnN0IEVCQURGIHRvIGNvbXBlbnNhdGUgY2hhbmdlcyBtYWRlIHRvIE5vZGUgNy54IHVuZGVyIFdpbmRvd3MuXG4gKi9cbmZ1bmN0aW9uIGlzRUJBREYoZXJyb3IpIHtcbiAgcmV0dXJuIGlzRXhwZWN0ZWRFcnJvcihlcnJvciwgLUVCQURGLCAnRUJBREYnKTtcbn1cblxuLyoqXG4gKiBIZWxwZXIgZm9yIHRlc3RpbmcgYWdhaW5zdCBFTk9FTlQgdG8gY29tcGVuc2F0ZSBjaGFuZ2VzIG1hZGUgdG8gTm9kZSA3LnggdW5kZXIgV2luZG93cy5cbiAqL1xuZnVuY3Rpb24gaXNFTk9FTlQoZXJyb3IpIHtcbiAgcmV0dXJuIGlzRXhwZWN0ZWRFcnJvcihlcnJvciwgLUVOT0VOVCwgJ0VOT0VOVCcpO1xufVxuXG4vKipcbiAqIEhlbHBlciB0byBkZXRlcm1pbmUgd2hldGhlciB0aGUgZXhwZWN0ZWQgZXJyb3IgY29kZSBtYXRjaGVzIHRoZSBhY3R1YWwgY29kZSBhbmQgZXJybm8sXG4gKiB3aGljaCB3aWxsIGRpZmZlciBiZXR3ZWVuIHRoZSBzdXBwb3J0ZWQgbm9kZSB2ZXJzaW9ucy5cbiAqXG4gKiAtIE5vZGUgPj0gNy4wOlxuICogICBlcnJvci5jb2RlIHtzdHJpbmd9XG4gKiAgIGVycm9yLmVycm5vIHtzdHJpbmd8bnVtYmVyfSBhbnkgbnVtZXJpY2FsIHZhbHVlIHdpbGwgYmUgbmVnYXRlZFxuICpcbiAqIC0gTm9kZSA+PSA2LjAgPCA3LjA6XG4gKiAgIGVycm9yLmNvZGUge3N0cmluZ31cbiAqICAgZXJyb3IuZXJybm8ge251bWJlcn0gbmVnYXRlZFxuICpcbiAqIC0gTm9kZSA+PSA0LjAgPCA2LjA6IGludHJvZHVjZXMgU3lzdGVtRXJyb3JcbiAqICAgZXJyb3IuY29kZSB7c3RyaW5nfVxuICogICBlcnJvci5lcnJubyB7bnVtYmVyfSBuZWdhdGVkXG4gKlxuICogLSBOb2RlID49IDAuMTAgPCA0LjA6XG4gKiAgIGVycm9yLmNvZGUge251bWJlcn0gbmVnYXRlZFxuICogICBlcnJvci5lcnJubyBuL2FcbiAqL1xuZnVuY3Rpb24gaXNFeHBlY3RlZEVycm9yKGVycm9yLCBjb2RlLCBlcnJubykge1xuICByZXR1cm4gZXJyb3IuY29kZSA9PT0gY29kZSB8fCBlcnJvci5jb2RlID09PSBlcnJubztcbn1cblxuLyoqXG4gKiBIZWxwZXIgd2hpY2ggZGV0ZXJtaW5lcyB3aGV0aGVyIGEgc3RyaW5nIHMgaXMgYmxhbmssIHRoYXQgaXMgdW5kZWZpbmVkLCBvciBlbXB0eSBvciBudWxsLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gc1xuICogQHJldHVybnMge0Jvb2xlYW59IHRydWUgd2hldGhlciB0aGUgc3RyaW5nIHMgaXMgYmxhbmssIGZhbHNlIG90aGVyd2lzZVxuICovXG5mdW5jdGlvbiBpc0JsYW5rKHMpIHtcbiAgcmV0dXJuIHMgPT09IG51bGwgfHwgcyA9PT0gdW5kZWZpbmVkIHx8ICFzLnRyaW0oKTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBncmFjZWZ1bCBjbGVhbnVwLlxuICovXG5mdW5jdGlvbiBzZXRHcmFjZWZ1bENsZWFudXAoKSB7XG4gIF9ncmFjZWZ1bENsZWFudXAgPSB0cnVlO1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIGN1cnJlbnRseSBjb25maWd1cmVkIHRtcCBkaXIgZnJvbSBvcy50bXBkaXIoKS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHJldHVybnMge3N0cmluZ30gdGhlIGN1cnJlbnRseSBjb25maWd1cmVkIHRtcCBkaXJcbiAqL1xuZnVuY3Rpb24gX2dldFRtcERpcigpIHtcbiAgcmV0dXJuIG9zLnRtcGRpcigpO1xufVxuXG4vKipcbiAqIElmIHRoZXJlIGFyZSBtdWx0aXBsZSBkaWZmZXJlbnQgdmVyc2lvbnMgb2YgdG1wIGluIHBsYWNlLCBtYWtlIHN1cmUgdGhhdFxuICogd2UgcmVjb2duaXplIHRoZSBvbGQgbGlzdGVuZXJzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiBAcHJpdmF0ZVxuICogQHJldHVybnMge0Jvb2xlYW59IHRydWUgd2hldGhlciBsaXN0ZW5lciBpcyBhIGxlZ2FjeSBsaXN0ZW5lclxuICovXG5mdW5jdGlvbiBfaXNfbGVnYWN5X2xpc3RlbmVyKGxpc3RlbmVyKSB7XG4gIHJldHVybiAobGlzdGVuZXIubmFtZSA9PT0gJ19leGl0JyB8fCBsaXN0ZW5lci5uYW1lID09PSAnX3VuY2F1Z2h0RXhjZXB0aW9uVGhyb3duJylcbiAgICAmJiBsaXN0ZW5lci50b1N0cmluZygpLmluZGV4T2YoJ19nYXJiYWdlQ29sbGVjdG9yKCk7JykgPiAtMTtcbn1cblxuLyoqXG4gKiBTYWZlbHkgaW5zdGFsbCBTSUdJTlQgbGlzdGVuZXIuXG4gKlxuICogTk9URTogdGhpcyB3aWxsIG9ubHkgd29yayBvbiBPU1ggYW5kIExpbnV4LlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIF9zYWZlbHlfaW5zdGFsbF9zaWdpbnRfbGlzdGVuZXIoKSB7XG5cbiAgY29uc3QgbGlzdGVuZXJzID0gcHJvY2Vzcy5saXN0ZW5lcnMoU0lHSU5UKTtcbiAgY29uc3QgZXhpc3RpbmdMaXN0ZW5lcnMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDAsIGxlbmd0aCA9IGxpc3RlbmVycy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGxzdG5yID0gbGlzdGVuZXJzW2ldO1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgaWYgKGxzdG5yLm5hbWUgPT09ICdfdG1wJHNpZ2ludF9saXN0ZW5lcicpIHtcbiAgICAgIGV4aXN0aW5nTGlzdGVuZXJzLnB1c2gobHN0bnIpO1xuICAgICAgcHJvY2Vzcy5yZW1vdmVMaXN0ZW5lcihTSUdJTlQsIGxzdG5yKTtcbiAgICB9XG4gIH1cbiAgcHJvY2Vzcy5vbihTSUdJTlQsIGZ1bmN0aW9uIF90bXAkc2lnaW50X2xpc3RlbmVyKGRvRXhpdCkge1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW5ndGggPSBleGlzdGluZ0xpc3RlbmVycy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgLy8gbGV0IHRoZSBleGlzdGluZyBsaXN0ZW5lciBkbyB0aGUgZ2FyYmFnZSBjb2xsZWN0aW9uIChlLmcuIGplc3Qgc2FuZGJveClcbiAgICAgIHRyeSB7XG4gICAgICAgIGV4aXN0aW5nTGlzdGVuZXJzW2ldKGZhbHNlKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAvLyBpZ25vcmVcbiAgICAgIH1cbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIGZvcmNlIHRoZSBnYXJiYWdlIGNvbGxlY3RvciBldmVuIGl0IGlzIGNhbGxlZCBhZ2FpbiBpbiB0aGUgZXhpdCBsaXN0ZW5lclxuICAgICAgX2dhcmJhZ2VDb2xsZWN0b3IoKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKCEhZG9FeGl0KSB7XG4gICAgICAgIHByb2Nlc3MuZXhpdCgwKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuXG4vKipcbiAqIFNhZmVseSBpbnN0YWxsIHByb2Nlc3MgZXhpdCBsaXN0ZW5lci5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBfc2FmZWx5X2luc3RhbGxfZXhpdF9saXN0ZW5lcigpIHtcbiAgY29uc3QgbGlzdGVuZXJzID0gcHJvY2Vzcy5saXN0ZW5lcnMoRVhJVCk7XG5cbiAgLy8gY29sbGVjdCBhbnkgZXhpc3RpbmcgbGlzdGVuZXJzXG4gIGNvbnN0IGV4aXN0aW5nTGlzdGVuZXJzID0gW107XG4gIGZvciAobGV0IGkgPSAwLCBsZW5ndGggPSBsaXN0ZW5lcnMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBsc3RuciA9IGxpc3RlbmVyc1tpXTtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgIC8vIFRPRE86IHJlbW92ZSBzdXBwb3J0IGZvciBsZWdhY3kgbGlzdGVuZXJzIG9uY2UgcmVsZWFzZSAxLjAuMCBpcyBvdXRcbiAgICBpZiAobHN0bnIubmFtZSA9PT0gJ190bXAkc2FmZV9saXN0ZW5lcicgfHwgX2lzX2xlZ2FjeV9saXN0ZW5lcihsc3RucikpIHtcbiAgICAgIC8vIHdlIG11c3QgZm9yZ2V0IGFib3V0IHRoZSB1bmNhdWdodEV4Y2VwdGlvbiBsaXN0ZW5lciwgaG9wZWZ1bGx5IGl0IGlzIG91cnNcbiAgICAgIGlmIChsc3Ruci5uYW1lICE9PSAnX3VuY2F1Z2h0RXhjZXB0aW9uVGhyb3duJykge1xuICAgICAgICBleGlzdGluZ0xpc3RlbmVycy5wdXNoKGxzdG5yKTtcbiAgICAgIH1cbiAgICAgIHByb2Nlc3MucmVtb3ZlTGlzdGVuZXIoRVhJVCwgbHN0bnIpO1xuICAgIH1cbiAgfVxuICAvLyBUT0RPOiB3aGF0IHdhcyB0aGUgZGF0YSBwYXJhbWV0ZXIgZ29vZCBmb3I/XG4gIHByb2Nlc3MuYWRkTGlzdGVuZXIoRVhJVCwgZnVuY3Rpb24gX3RtcCRzYWZlX2xpc3RlbmVyKGRhdGEpIHtcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuZ3RoID0gZXhpc3RpbmdMaXN0ZW5lcnMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIC8vIGxldCB0aGUgZXhpc3RpbmcgbGlzdGVuZXIgZG8gdGhlIGdhcmJhZ2UgY29sbGVjdGlvbiAoZS5nLiBqZXN0IHNhbmRib3gpXG4gICAgICB0cnkge1xuICAgICAgICBleGlzdGluZ0xpc3RlbmVyc1tpXShkYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAvLyBpZ25vcmVcbiAgICAgIH1cbiAgICB9XG4gICAgX2dhcmJhZ2VDb2xsZWN0b3IoKTtcbiAgfSk7XG59XG5cbl9zYWZlbHlfaW5zdGFsbF9leGl0X2xpc3RlbmVyKCk7XG5fc2FmZWx5X2luc3RhbGxfc2lnaW50X2xpc3RlbmVyKCk7XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBvcHRpb25zLlxuICpcbiAqIEB0eXBlZGVmIHtPYmplY3R9IE9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7P251bWJlcn0gdHJpZXMgdGhlIG51bWJlciBvZiB0cmllcyBiZWZvcmUgZ2l2ZSB1cCB0aGUgbmFtZSBnZW5lcmF0aW9uXG4gKiBAcHJvcGVydHkgez9zdHJpbmd9IHRlbXBsYXRlIHRoZSBcIm1rc3RlbXBcIiBsaWtlIGZpbGVuYW1lIHRlbXBsYXRlXG4gKiBAcHJvcGVydHkgez9zdHJpbmd9IG5hbWUgZml4IG5hbWVcbiAqIEBwcm9wZXJ0eSB7P3N0cmluZ30gZGlyIHRoZSB0bXAgZGlyZWN0b3J5IHRvIHVzZVxuICogQHByb3BlcnR5IHs/c3RyaW5nfSBwcmVmaXggcHJlZml4IGZvciB0aGUgZ2VuZXJhdGVkIG5hbWVcbiAqIEBwcm9wZXJ0eSB7P3N0cmluZ30gcG9zdGZpeCBwb3N0Zml4IGZvciB0aGUgZ2VuZXJhdGVkIG5hbWVcbiAqIEBwcm9wZXJ0eSB7P2Jvb2xlYW59IHVuc2FmZUNsZWFudXAgcmVjdXJzaXZlbHkgcmVtb3ZlcyB0aGUgY3JlYXRlZCB0ZW1wb3JhcnkgZGlyZWN0b3J5LCBldmVuIHdoZW4gaXQncyBub3QgZW1wdHlcbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IEZpbGVTeW5jT2JqZWN0XG4gKiBAcHJvcGVydHkge3N0cmluZ30gbmFtZSB0aGUgbmFtZSBvZiB0aGUgZmlsZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IGZkIHRoZSBmaWxlIGRlc2NyaXB0b3JcbiAqIEBwcm9wZXJ0eSB7ZmlsZUNhbGxiYWNrfSByZW1vdmVDYWxsYmFjayB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gdG8gcmVtb3ZlIHRoZSBmaWxlXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBEaXJTeW5jT2JqZWN0XG4gKiBAcHJvcGVydHkge3N0cmluZ30gbmFtZSB0aGUgbmFtZSBvZiB0aGUgZGlyZWN0b3J5XG4gKiBAcHJvcGVydHkge2ZpbGVDYWxsYmFja30gcmVtb3ZlQ2FsbGJhY2sgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIHJlbW92ZSB0aGUgZGlyZWN0b3J5XG4gKi9cblxuLyoqXG4gKiBAY2FsbGJhY2sgdG1wTmFtZUNhbGxiYWNrXG4gKiBAcGFyYW0gez9FcnJvcn0gZXJyIHRoZSBlcnJvciBvYmplY3QgaWYgYW55dGhpbmcgZ29lcyB3cm9uZ1xuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgdGhlIHRlbXBvcmFyeSBmaWxlIG5hbWVcbiAqL1xuXG4vKipcbiAqIEBjYWxsYmFjayBmaWxlQ2FsbGJhY2tcbiAqIEBwYXJhbSB7P0Vycm9yfSBlcnIgdGhlIGVycm9yIG9iamVjdCBpZiBhbnl0aGluZyBnb2VzIHdyb25nXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSB0aGUgdGVtcG9yYXJ5IGZpbGUgbmFtZVxuICogQHBhcmFtIHtudW1iZXJ9IGZkIHRoZSBmaWxlIGRlc2NyaXB0b3JcbiAqIEBwYXJhbSB7Y2xlYW51cENhbGxiYWNrfSBmbiB0aGUgY2xlYW51cCBjYWxsYmFjayBmdW5jdGlvblxuICovXG5cbi8qKlxuICogQGNhbGxiYWNrIGRpckNhbGxiYWNrXG4gKiBAcGFyYW0gez9FcnJvcn0gZXJyIHRoZSBlcnJvciBvYmplY3QgaWYgYW55dGhpbmcgZ29lcyB3cm9uZ1xuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgdGhlIHRlbXBvcmFyeSBmaWxlIG5hbWVcbiAqIEBwYXJhbSB7Y2xlYW51cENhbGxiYWNrfSBmbiB0aGUgY2xlYW51cCBjYWxsYmFjayBmdW5jdGlvblxuICovXG5cbi8qKlxuICogUmVtb3ZlcyB0aGUgdGVtcG9yYXJ5IGNyZWF0ZWQgZmlsZSBvciBkaXJlY3RvcnkuXG4gKlxuICogQGNhbGxiYWNrIGNsZWFudXBDYWxsYmFja1xuICogQHBhcmFtIHtzaW1wbGVDYWxsYmFja30gW25leHRdIGZ1bmN0aW9uIHRvIGNhbGwgYWZ0ZXIgZW50cnkgd2FzIHJlbW92ZWRcbiAqL1xuXG4vKipcbiAqIENhbGxiYWNrIGZ1bmN0aW9uIGZvciBmdW5jdGlvbiBjb21wb3NpdGlvbi5cbiAqIEBzZWUge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9yYXN6aS9ub2RlLXRtcC9pc3N1ZXMvNTd8cmFzemkvbm9kZS10bXAjNTd9XG4gKlxuICogQGNhbGxiYWNrIHNpbXBsZUNhbGxiYWNrXG4gKi9cblxuLy8gZXhwb3J0aW5nIGFsbCB0aGUgbmVlZGVkIG1ldGhvZHNcblxuLy8gZXZhbHVhdGUgb3MudG1wZGlyKCkgbGF6aWx5LCBtYWlubHkgZm9yIHNpbXBsaWZ5aW5nIHRlc3RpbmcgYnV0IGl0IGFsc28gd2lsbFxuLy8gYWxsb3cgdXNlcnMgdG8gcmVjb25maWd1cmUgdGhlIHRlbXBvcmFyeSBkaXJlY3Rvcnlcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUuZXhwb3J0cywgJ3RtcGRpcicsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIF9nZXRUbXBEaXIoKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzLmRpciA9IGRpcjtcbm1vZHVsZS5leHBvcnRzLmRpclN5bmMgPSBkaXJTeW5jO1xuXG5tb2R1bGUuZXhwb3J0cy5maWxlID0gZmlsZTtcbm1vZHVsZS5leHBvcnRzLmZpbGVTeW5jID0gZmlsZVN5bmM7XG5cbm1vZHVsZS5leHBvcnRzLnRtcE5hbWUgPSB0bXBOYW1lO1xubW9kdWxlLmV4cG9ydHMudG1wTmFtZVN5bmMgPSB0bXBOYW1lU3luYztcblxubW9kdWxlLmV4cG9ydHMuc2V0R3JhY2VmdWxDbGVhbnVwID0gc2V0R3JhY2VmdWxDbGVhbnVwO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY3J5cHRvXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmltcmFmXG5yaW1yYWYuc3luYyA9IHJpbXJhZlN5bmNcblxudmFyIGFzc2VydCA9IHJlcXVpcmUoXCJhc3NlcnRcIilcbnZhciBwYXRoID0gcmVxdWlyZShcInBhdGhcIilcbnZhciBmcyA9IHJlcXVpcmUoXCJmc1wiKVxudmFyIGdsb2IgPSB1bmRlZmluZWRcbnRyeSB7XG4gIGdsb2IgPSByZXF1aXJlKFwiZ2xvYlwiKVxufSBjYXRjaCAoX2Vycikge1xuICAvLyB0cmVhdCBnbG9iIGFzIG9wdGlvbmFsLlxufVxudmFyIF8wNjY2ID0gcGFyc2VJbnQoJzY2NicsIDgpXG5cbnZhciBkZWZhdWx0R2xvYk9wdHMgPSB7XG4gIG5vc29ydDogdHJ1ZSxcbiAgc2lsZW50OiB0cnVlXG59XG5cbi8vIGZvciBFTUZJTEUgaGFuZGxpbmdcbnZhciB0aW1lb3V0ID0gMFxuXG52YXIgaXNXaW5kb3dzID0gKHByb2Nlc3MucGxhdGZvcm0gPT09IFwid2luMzJcIilcblxuZnVuY3Rpb24gZGVmYXVsdHMgKG9wdGlvbnMpIHtcbiAgdmFyIG1ldGhvZHMgPSBbXG4gICAgJ3VubGluaycsXG4gICAgJ2NobW9kJyxcbiAgICAnc3RhdCcsXG4gICAgJ2xzdGF0JyxcbiAgICAncm1kaXInLFxuICAgICdyZWFkZGlyJ1xuICBdXG4gIG1ldGhvZHMuZm9yRWFjaChmdW5jdGlvbihtKSB7XG4gICAgb3B0aW9uc1ttXSA9IG9wdGlvbnNbbV0gfHwgZnNbbV1cbiAgICBtID0gbSArICdTeW5jJ1xuICAgIG9wdGlvbnNbbV0gPSBvcHRpb25zW21dIHx8IGZzW21dXG4gIH0pXG5cbiAgb3B0aW9ucy5tYXhCdXN5VHJpZXMgPSBvcHRpb25zLm1heEJ1c3lUcmllcyB8fCAzXG4gIG9wdGlvbnMuZW1maWxlV2FpdCA9IG9wdGlvbnMuZW1maWxlV2FpdCB8fCAxMDAwXG4gIGlmIChvcHRpb25zLmdsb2IgPT09IGZhbHNlKSB7XG4gICAgb3B0aW9ucy5kaXNhYmxlR2xvYiA9IHRydWVcbiAgfVxuICBpZiAob3B0aW9ucy5kaXNhYmxlR2xvYiAhPT0gdHJ1ZSAmJiBnbG9iID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBFcnJvcignZ2xvYiBkZXBlbmRlbmN5IG5vdCBmb3VuZCwgc2V0IGBvcHRpb25zLmRpc2FibGVHbG9iID0gdHJ1ZWAgaWYgaW50ZW50aW9uYWwnKVxuICB9XG4gIG9wdGlvbnMuZGlzYWJsZUdsb2IgPSBvcHRpb25zLmRpc2FibGVHbG9iIHx8IGZhbHNlXG4gIG9wdGlvbnMuZ2xvYiA9IG9wdGlvbnMuZ2xvYiB8fCBkZWZhdWx0R2xvYk9wdHNcbn1cblxuZnVuY3Rpb24gcmltcmFmIChwLCBvcHRpb25zLCBjYikge1xuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYiA9IG9wdGlvbnNcbiAgICBvcHRpb25zID0ge31cbiAgfVxuXG4gIGFzc2VydChwLCAncmltcmFmOiBtaXNzaW5nIHBhdGgnKVxuICBhc3NlcnQuZXF1YWwodHlwZW9mIHAsICdzdHJpbmcnLCAncmltcmFmOiBwYXRoIHNob3VsZCBiZSBhIHN0cmluZycpXG4gIGFzc2VydC5lcXVhbCh0eXBlb2YgY2IsICdmdW5jdGlvbicsICdyaW1yYWY6IGNhbGxiYWNrIGZ1bmN0aW9uIHJlcXVpcmVkJylcbiAgYXNzZXJ0KG9wdGlvbnMsICdyaW1yYWY6IGludmFsaWQgb3B0aW9ucyBhcmd1bWVudCBwcm92aWRlZCcpXG4gIGFzc2VydC5lcXVhbCh0eXBlb2Ygb3B0aW9ucywgJ29iamVjdCcsICdyaW1yYWY6IG9wdGlvbnMgc2hvdWxkIGJlIG9iamVjdCcpXG5cbiAgZGVmYXVsdHMob3B0aW9ucylcblxuICB2YXIgYnVzeVRyaWVzID0gMFxuICB2YXIgZXJyU3RhdGUgPSBudWxsXG4gIHZhciBuID0gMFxuXG4gIGlmIChvcHRpb25zLmRpc2FibGVHbG9iIHx8ICFnbG9iLmhhc01hZ2ljKHApKVxuICAgIHJldHVybiBhZnRlckdsb2IobnVsbCwgW3BdKVxuXG4gIG9wdGlvbnMubHN0YXQocCwgZnVuY3Rpb24gKGVyLCBzdGF0KSB7XG4gICAgaWYgKCFlcilcbiAgICAgIHJldHVybiBhZnRlckdsb2IobnVsbCwgW3BdKVxuXG4gICAgZ2xvYihwLCBvcHRpb25zLmdsb2IsIGFmdGVyR2xvYilcbiAgfSlcblxuICBmdW5jdGlvbiBuZXh0IChlcikge1xuICAgIGVyclN0YXRlID0gZXJyU3RhdGUgfHwgZXJcbiAgICBpZiAoLS1uID09PSAwKVxuICAgICAgY2IoZXJyU3RhdGUpXG4gIH1cblxuICBmdW5jdGlvbiBhZnRlckdsb2IgKGVyLCByZXN1bHRzKSB7XG4gICAgaWYgKGVyKVxuICAgICAgcmV0dXJuIGNiKGVyKVxuXG4gICAgbiA9IHJlc3VsdHMubGVuZ3RoXG4gICAgaWYgKG4gPT09IDApXG4gICAgICByZXR1cm4gY2IoKVxuXG4gICAgcmVzdWx0cy5mb3JFYWNoKGZ1bmN0aW9uIChwKSB7XG4gICAgICByaW1yYWZfKHAsIG9wdGlvbnMsIGZ1bmN0aW9uIENCIChlcikge1xuICAgICAgICBpZiAoZXIpIHtcbiAgICAgICAgICBpZiAoKGVyLmNvZGUgPT09IFwiRUJVU1lcIiB8fCBlci5jb2RlID09PSBcIkVOT1RFTVBUWVwiIHx8IGVyLmNvZGUgPT09IFwiRVBFUk1cIikgJiZcbiAgICAgICAgICAgICAgYnVzeVRyaWVzIDwgb3B0aW9ucy5tYXhCdXN5VHJpZXMpIHtcbiAgICAgICAgICAgIGJ1c3lUcmllcyArK1xuICAgICAgICAgICAgdmFyIHRpbWUgPSBidXN5VHJpZXMgKiAxMDBcbiAgICAgICAgICAgIC8vIHRyeSBhZ2Fpbiwgd2l0aCB0aGUgc2FtZSBleGFjdCBjYWxsYmFjayBhcyB0aGlzIG9uZS5cbiAgICAgICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgcmltcmFmXyhwLCBvcHRpb25zLCBDQilcbiAgICAgICAgICAgIH0sIHRpbWUpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gdGhpcyBvbmUgd29uJ3QgaGFwcGVuIGlmIGdyYWNlZnVsLWZzIGlzIHVzZWQuXG4gICAgICAgICAgaWYgKGVyLmNvZGUgPT09IFwiRU1GSUxFXCIgJiYgdGltZW91dCA8IG9wdGlvbnMuZW1maWxlV2FpdCkge1xuICAgICAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICByaW1yYWZfKHAsIG9wdGlvbnMsIENCKVxuICAgICAgICAgICAgfSwgdGltZW91dCArKylcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBhbHJlYWR5IGdvbmVcbiAgICAgICAgICBpZiAoZXIuY29kZSA9PT0gXCJFTk9FTlRcIikgZXIgPSBudWxsXG4gICAgICAgIH1cblxuICAgICAgICB0aW1lb3V0ID0gMFxuICAgICAgICBuZXh0KGVyKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5cbi8vIFR3byBwb3NzaWJsZSBzdHJhdGVnaWVzLlxuLy8gMS4gQXNzdW1lIGl0J3MgYSBmaWxlLiAgdW5saW5rIGl0LCB0aGVuIGRvIHRoZSBkaXIgc3R1ZmYgb24gRVBFUk0gb3IgRUlTRElSXG4vLyAyLiBBc3N1bWUgaXQncyBhIGRpcmVjdG9yeS4gIHJlYWRkaXIsIHRoZW4gZG8gdGhlIGZpbGUgc3R1ZmYgb24gRU5PVERJUlxuLy9cbi8vIEJvdGggcmVzdWx0IGluIGFuIGV4dHJhIHN5c2NhbGwgd2hlbiB5b3UgZ3Vlc3Mgd3JvbmcuICBIb3dldmVyLCB0aGVyZVxuLy8gYXJlIGxpa2VseSBmYXIgbW9yZSBub3JtYWwgZmlsZXMgaW4gdGhlIHdvcmxkIHRoYW4gZGlyZWN0b3JpZXMuICBUaGlzXG4vLyBpcyBiYXNlZCBvbiB0aGUgYXNzdW1wdGlvbiB0aGF0IGEgdGhlIGF2ZXJhZ2UgbnVtYmVyIG9mIGZpbGVzIHBlclxuLy8gZGlyZWN0b3J5IGlzID49IDEuXG4vL1xuLy8gSWYgYW55b25lIGV2ZXIgY29tcGxhaW5zIGFib3V0IHRoaXMsIHRoZW4gSSBndWVzcyB0aGUgc3RyYXRlZ3kgY291bGRcbi8vIGJlIG1hZGUgY29uZmlndXJhYmxlIHNvbWVob3cuICBCdXQgdW50aWwgdGhlbiwgWUFHTkkuXG5mdW5jdGlvbiByaW1yYWZfIChwLCBvcHRpb25zLCBjYikge1xuICBhc3NlcnQocClcbiAgYXNzZXJ0KG9wdGlvbnMpXG4gIGFzc2VydCh0eXBlb2YgY2IgPT09ICdmdW5jdGlvbicpXG5cbiAgLy8gc3Vub3MgbGV0cyB0aGUgcm9vdCB1c2VyIHVubGluayBkaXJlY3Rvcmllcywgd2hpY2ggaXMuLi4gd2VpcmQuXG4gIC8vIHNvIHdlIGhhdmUgdG8gbHN0YXQgaGVyZSBhbmQgbWFrZSBzdXJlIGl0J3Mgbm90IGEgZGlyLlxuICBvcHRpb25zLmxzdGF0KHAsIGZ1bmN0aW9uIChlciwgc3QpIHtcbiAgICBpZiAoZXIgJiYgZXIuY29kZSA9PT0gXCJFTk9FTlRcIilcbiAgICAgIHJldHVybiBjYihudWxsKVxuXG4gICAgLy8gV2luZG93cyBjYW4gRVBFUk0gb24gc3RhdC4gIExpZmUgaXMgc3VmZmVyaW5nLlxuICAgIGlmIChlciAmJiBlci5jb2RlID09PSBcIkVQRVJNXCIgJiYgaXNXaW5kb3dzKVxuICAgICAgZml4V2luRVBFUk0ocCwgb3B0aW9ucywgZXIsIGNiKVxuXG4gICAgaWYgKHN0ICYmIHN0LmlzRGlyZWN0b3J5KCkpXG4gICAgICByZXR1cm4gcm1kaXIocCwgb3B0aW9ucywgZXIsIGNiKVxuXG4gICAgb3B0aW9ucy51bmxpbmsocCwgZnVuY3Rpb24gKGVyKSB7XG4gICAgICBpZiAoZXIpIHtcbiAgICAgICAgaWYgKGVyLmNvZGUgPT09IFwiRU5PRU5UXCIpXG4gICAgICAgICAgcmV0dXJuIGNiKG51bGwpXG4gICAgICAgIGlmIChlci5jb2RlID09PSBcIkVQRVJNXCIpXG4gICAgICAgICAgcmV0dXJuIChpc1dpbmRvd3MpXG4gICAgICAgICAgICA/IGZpeFdpbkVQRVJNKHAsIG9wdGlvbnMsIGVyLCBjYilcbiAgICAgICAgICAgIDogcm1kaXIocCwgb3B0aW9ucywgZXIsIGNiKVxuICAgICAgICBpZiAoZXIuY29kZSA9PT0gXCJFSVNESVJcIilcbiAgICAgICAgICByZXR1cm4gcm1kaXIocCwgb3B0aW9ucywgZXIsIGNiKVxuICAgICAgfVxuICAgICAgcmV0dXJuIGNiKGVyKVxuICAgIH0pXG4gIH0pXG59XG5cbmZ1bmN0aW9uIGZpeFdpbkVQRVJNIChwLCBvcHRpb25zLCBlciwgY2IpIHtcbiAgYXNzZXJ0KHApXG4gIGFzc2VydChvcHRpb25zKVxuICBhc3NlcnQodHlwZW9mIGNiID09PSAnZnVuY3Rpb24nKVxuICBpZiAoZXIpXG4gICAgYXNzZXJ0KGVyIGluc3RhbmNlb2YgRXJyb3IpXG5cbiAgb3B0aW9ucy5jaG1vZChwLCBfMDY2NiwgZnVuY3Rpb24gKGVyMikge1xuICAgIGlmIChlcjIpXG4gICAgICBjYihlcjIuY29kZSA9PT0gXCJFTk9FTlRcIiA/IG51bGwgOiBlcilcbiAgICBlbHNlXG4gICAgICBvcHRpb25zLnN0YXQocCwgZnVuY3Rpb24oZXIzLCBzdGF0cykge1xuICAgICAgICBpZiAoZXIzKVxuICAgICAgICAgIGNiKGVyMy5jb2RlID09PSBcIkVOT0VOVFwiID8gbnVsbCA6IGVyKVxuICAgICAgICBlbHNlIGlmIChzdGF0cy5pc0RpcmVjdG9yeSgpKVxuICAgICAgICAgIHJtZGlyKHAsIG9wdGlvbnMsIGVyLCBjYilcbiAgICAgICAgZWxzZVxuICAgICAgICAgIG9wdGlvbnMudW5saW5rKHAsIGNiKVxuICAgICAgfSlcbiAgfSlcbn1cblxuZnVuY3Rpb24gZml4V2luRVBFUk1TeW5jIChwLCBvcHRpb25zLCBlcikge1xuICBhc3NlcnQocClcbiAgYXNzZXJ0KG9wdGlvbnMpXG4gIGlmIChlcilcbiAgICBhc3NlcnQoZXIgaW5zdGFuY2VvZiBFcnJvcilcblxuICB0cnkge1xuICAgIG9wdGlvbnMuY2htb2RTeW5jKHAsIF8wNjY2KVxuICB9IGNhdGNoIChlcjIpIHtcbiAgICBpZiAoZXIyLmNvZGUgPT09IFwiRU5PRU5UXCIpXG4gICAgICByZXR1cm5cbiAgICBlbHNlXG4gICAgICB0aHJvdyBlclxuICB9XG5cbiAgdHJ5IHtcbiAgICB2YXIgc3RhdHMgPSBvcHRpb25zLnN0YXRTeW5jKHApXG4gIH0gY2F0Y2ggKGVyMykge1xuICAgIGlmIChlcjMuY29kZSA9PT0gXCJFTk9FTlRcIilcbiAgICAgIHJldHVyblxuICAgIGVsc2VcbiAgICAgIHRocm93IGVyXG4gIH1cblxuICBpZiAoc3RhdHMuaXNEaXJlY3RvcnkoKSlcbiAgICBybWRpclN5bmMocCwgb3B0aW9ucywgZXIpXG4gIGVsc2VcbiAgICBvcHRpb25zLnVubGlua1N5bmMocClcbn1cblxuZnVuY3Rpb24gcm1kaXIgKHAsIG9wdGlvbnMsIG9yaWdpbmFsRXIsIGNiKSB7XG4gIGFzc2VydChwKVxuICBhc3NlcnQob3B0aW9ucylcbiAgaWYgKG9yaWdpbmFsRXIpXG4gICAgYXNzZXJ0KG9yaWdpbmFsRXIgaW5zdGFuY2VvZiBFcnJvcilcbiAgYXNzZXJ0KHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJylcblxuICAvLyB0cnkgdG8gcm1kaXIgZmlyc3QsIGFuZCBvbmx5IHJlYWRkaXIgb24gRU5PVEVNUFRZIG9yIEVFWElTVCAoU3VuT1MpXG4gIC8vIGlmIHdlIGd1ZXNzZWQgd3JvbmcsIGFuZCBpdCdzIG5vdCBhIGRpcmVjdG9yeSwgdGhlblxuICAvLyByYWlzZSB0aGUgb3JpZ2luYWwgZXJyb3IuXG4gIG9wdGlvbnMucm1kaXIocCwgZnVuY3Rpb24gKGVyKSB7XG4gICAgaWYgKGVyICYmIChlci5jb2RlID09PSBcIkVOT1RFTVBUWVwiIHx8IGVyLmNvZGUgPT09IFwiRUVYSVNUXCIgfHwgZXIuY29kZSA9PT0gXCJFUEVSTVwiKSlcbiAgICAgIHJta2lkcyhwLCBvcHRpb25zLCBjYilcbiAgICBlbHNlIGlmIChlciAmJiBlci5jb2RlID09PSBcIkVOT1RESVJcIilcbiAgICAgIGNiKG9yaWdpbmFsRXIpXG4gICAgZWxzZVxuICAgICAgY2IoZXIpXG4gIH0pXG59XG5cbmZ1bmN0aW9uIHJta2lkcyhwLCBvcHRpb25zLCBjYikge1xuICBhc3NlcnQocClcbiAgYXNzZXJ0KG9wdGlvbnMpXG4gIGFzc2VydCh0eXBlb2YgY2IgPT09ICdmdW5jdGlvbicpXG5cbiAgb3B0aW9ucy5yZWFkZGlyKHAsIGZ1bmN0aW9uIChlciwgZmlsZXMpIHtcbiAgICBpZiAoZXIpXG4gICAgICByZXR1cm4gY2IoZXIpXG4gICAgdmFyIG4gPSBmaWxlcy5sZW5ndGhcbiAgICBpZiAobiA9PT0gMClcbiAgICAgIHJldHVybiBvcHRpb25zLnJtZGlyKHAsIGNiKVxuICAgIHZhciBlcnJTdGF0ZVxuICAgIGZpbGVzLmZvckVhY2goZnVuY3Rpb24gKGYpIHtcbiAgICAgIHJpbXJhZihwYXRoLmpvaW4ocCwgZiksIG9wdGlvbnMsIGZ1bmN0aW9uIChlcikge1xuICAgICAgICBpZiAoZXJyU3RhdGUpXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIGlmIChlcilcbiAgICAgICAgICByZXR1cm4gY2IoZXJyU3RhdGUgPSBlcilcbiAgICAgICAgaWYgKC0tbiA9PT0gMClcbiAgICAgICAgICBvcHRpb25zLnJtZGlyKHAsIGNiKVxuICAgICAgfSlcbiAgICB9KVxuICB9KVxufVxuXG4vLyB0aGlzIGxvb2tzIHNpbXBsZXIsIGFuZCBpcyBzdHJpY3RseSAqZmFzdGVyKiwgYnV0IHdpbGxcbi8vIHRpZSB1cCB0aGUgSmF2YVNjcmlwdCB0aHJlYWQgYW5kIGZhaWwgb24gZXhjZXNzaXZlbHlcbi8vIGRlZXAgZGlyZWN0b3J5IHRyZWVzLlxuZnVuY3Rpb24gcmltcmFmU3luYyAocCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICBkZWZhdWx0cyhvcHRpb25zKVxuXG4gIGFzc2VydChwLCAncmltcmFmOiBtaXNzaW5nIHBhdGgnKVxuICBhc3NlcnQuZXF1YWwodHlwZW9mIHAsICdzdHJpbmcnLCAncmltcmFmOiBwYXRoIHNob3VsZCBiZSBhIHN0cmluZycpXG4gIGFzc2VydChvcHRpb25zLCAncmltcmFmOiBtaXNzaW5nIG9wdGlvbnMnKVxuICBhc3NlcnQuZXF1YWwodHlwZW9mIG9wdGlvbnMsICdvYmplY3QnLCAncmltcmFmOiBvcHRpb25zIHNob3VsZCBiZSBvYmplY3QnKVxuXG4gIHZhciByZXN1bHRzXG5cbiAgaWYgKG9wdGlvbnMuZGlzYWJsZUdsb2IgfHwgIWdsb2IuaGFzTWFnaWMocCkpIHtcbiAgICByZXN1bHRzID0gW3BdXG4gIH0gZWxzZSB7XG4gICAgdHJ5IHtcbiAgICAgIG9wdGlvbnMubHN0YXRTeW5jKHApXG4gICAgICByZXN1bHRzID0gW3BdXG4gICAgfSBjYXRjaCAoZXIpIHtcbiAgICAgIHJlc3VsdHMgPSBnbG9iLnN5bmMocCwgb3B0aW9ucy5nbG9iKVxuICAgIH1cbiAgfVxuXG4gIGlmICghcmVzdWx0cy5sZW5ndGgpXG4gICAgcmV0dXJuXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXN1bHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHAgPSByZXN1bHRzW2ldXG5cbiAgICB0cnkge1xuICAgICAgdmFyIHN0ID0gb3B0aW9ucy5sc3RhdFN5bmMocClcbiAgICB9IGNhdGNoIChlcikge1xuICAgICAgaWYgKGVyLmNvZGUgPT09IFwiRU5PRU5UXCIpXG4gICAgICAgIHJldHVyblxuXG4gICAgICAvLyBXaW5kb3dzIGNhbiBFUEVSTSBvbiBzdGF0LiAgTGlmZSBpcyBzdWZmZXJpbmcuXG4gICAgICBpZiAoZXIuY29kZSA9PT0gXCJFUEVSTVwiICYmIGlzV2luZG93cylcbiAgICAgICAgZml4V2luRVBFUk1TeW5jKHAsIG9wdGlvbnMsIGVyKVxuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAvLyBzdW5vcyBsZXRzIHRoZSByb290IHVzZXIgdW5saW5rIGRpcmVjdG9yaWVzLCB3aGljaCBpcy4uLiB3ZWlyZC5cbiAgICAgIGlmIChzdCAmJiBzdC5pc0RpcmVjdG9yeSgpKVxuICAgICAgICBybWRpclN5bmMocCwgb3B0aW9ucywgbnVsbClcbiAgICAgIGVsc2VcbiAgICAgICAgb3B0aW9ucy51bmxpbmtTeW5jKHApXG4gICAgfSBjYXRjaCAoZXIpIHtcbiAgICAgIGlmIChlci5jb2RlID09PSBcIkVOT0VOVFwiKVxuICAgICAgICByZXR1cm5cbiAgICAgIGlmIChlci5jb2RlID09PSBcIkVQRVJNXCIpXG4gICAgICAgIHJldHVybiBpc1dpbmRvd3MgPyBmaXhXaW5FUEVSTVN5bmMocCwgb3B0aW9ucywgZXIpIDogcm1kaXJTeW5jKHAsIG9wdGlvbnMsIGVyKVxuICAgICAgaWYgKGVyLmNvZGUgIT09IFwiRUlTRElSXCIpXG4gICAgICAgIHRocm93IGVyXG5cbiAgICAgIHJtZGlyU3luYyhwLCBvcHRpb25zLCBlcilcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcm1kaXJTeW5jIChwLCBvcHRpb25zLCBvcmlnaW5hbEVyKSB7XG4gIGFzc2VydChwKVxuICBhc3NlcnQob3B0aW9ucylcbiAgaWYgKG9yaWdpbmFsRXIpXG4gICAgYXNzZXJ0KG9yaWdpbmFsRXIgaW5zdGFuY2VvZiBFcnJvcilcblxuICB0cnkge1xuICAgIG9wdGlvbnMucm1kaXJTeW5jKHApXG4gIH0gY2F0Y2ggKGVyKSB7XG4gICAgaWYgKGVyLmNvZGUgPT09IFwiRU5PRU5UXCIpXG4gICAgICByZXR1cm5cbiAgICBpZiAoZXIuY29kZSA9PT0gXCJFTk9URElSXCIpXG4gICAgICB0aHJvdyBvcmlnaW5hbEVyXG4gICAgaWYgKGVyLmNvZGUgPT09IFwiRU5PVEVNUFRZXCIgfHwgZXIuY29kZSA9PT0gXCJFRVhJU1RcIiB8fCBlci5jb2RlID09PSBcIkVQRVJNXCIpXG4gICAgICBybWtpZHNTeW5jKHAsIG9wdGlvbnMpXG4gIH1cbn1cblxuZnVuY3Rpb24gcm1raWRzU3luYyAocCwgb3B0aW9ucykge1xuICBhc3NlcnQocClcbiAgYXNzZXJ0KG9wdGlvbnMpXG4gIG9wdGlvbnMucmVhZGRpclN5bmMocCkuZm9yRWFjaChmdW5jdGlvbiAoZikge1xuICAgIHJpbXJhZlN5bmMocGF0aC5qb2luKHAsIGYpLCBvcHRpb25zKVxuICB9KVxuXG4gIC8vIFdlIG9ubHkgZW5kIHVwIGhlcmUgb25jZSB3ZSBnb3QgRU5PVEVNUFRZIGF0IGxlYXN0IG9uY2UsIGFuZFxuICAvLyBhdCB0aGlzIHBvaW50LCB3ZSBhcmUgZ3VhcmFudGVlZCB0byBoYXZlIHJlbW92ZWQgYWxsIHRoZSBraWRzLlxuICAvLyBTbywgd2Uga25vdyB0aGF0IGl0IHdvbid0IGJlIEVOT0VOVCBvciBFTk9URElSIG9yIGFueXRoaW5nIGVsc2UuXG4gIC8vIHRyeSByZWFsbHkgaGFyZCB0byBkZWxldGUgc3R1ZmYgb24gd2luZG93cywgYmVjYXVzZSBpdCBoYXMgYVxuICAvLyBQUk9GT1VORExZIGFubm95aW5nIGhhYml0IG9mIG5vdCBjbG9zaW5nIGhhbmRsZXMgcHJvbXB0bHkgd2hlblxuICAvLyBmaWxlcyBhcmUgZGVsZXRlZCwgcmVzdWx0aW5nIGluIHNwdXJpb3VzIEVOT1RFTVBUWSBlcnJvcnMuXG4gIHZhciByZXRyaWVzID0gaXNXaW5kb3dzID8gMTAwIDogMVxuICB2YXIgaSA9IDBcbiAgZG8ge1xuICAgIHZhciB0aHJldyA9IHRydWVcbiAgICB0cnkge1xuICAgICAgdmFyIHJldCA9IG9wdGlvbnMucm1kaXJTeW5jKHAsIG9wdGlvbnMpXG4gICAgICB0aHJldyA9IGZhbHNlXG4gICAgICByZXR1cm4gcmV0XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmICgrK2kgPCByZXRyaWVzICYmIHRocmV3KVxuICAgICAgICBjb250aW51ZVxuICAgIH1cbiAgfSB3aGlsZSAodHJ1ZSlcbn1cbiIsIi8vIEFwcHJvYWNoOlxuLy9cbi8vIDEuIEdldCB0aGUgbWluaW1hdGNoIHNldFxuLy8gMi4gRm9yIGVhY2ggcGF0dGVybiBpbiB0aGUgc2V0LCBQUk9DRVNTKHBhdHRlcm4sIGZhbHNlKVxuLy8gMy4gU3RvcmUgbWF0Y2hlcyBwZXItc2V0LCB0aGVuIHVuaXEgdGhlbVxuLy9cbi8vIFBST0NFU1MocGF0dGVybiwgaW5HbG9iU3Rhcilcbi8vIEdldCB0aGUgZmlyc3QgW25dIGl0ZW1zIGZyb20gcGF0dGVybiB0aGF0IGFyZSBhbGwgc3RyaW5nc1xuLy8gSm9pbiB0aGVzZSB0b2dldGhlci4gIFRoaXMgaXMgUFJFRklYLlxuLy8gICBJZiB0aGVyZSBpcyBubyBtb3JlIHJlbWFpbmluZywgdGhlbiBzdGF0KFBSRUZJWCkgYW5kXG4vLyAgIGFkZCB0byBtYXRjaGVzIGlmIGl0IHN1Y2NlZWRzLiAgRU5ELlxuLy9cbi8vIElmIGluR2xvYlN0YXIgYW5kIFBSRUZJWCBpcyBzeW1saW5rIGFuZCBwb2ludHMgdG8gZGlyXG4vLyAgIHNldCBFTlRSSUVTID0gW11cbi8vIGVsc2UgcmVhZGRpcihQUkVGSVgpIGFzIEVOVFJJRVNcbi8vICAgSWYgZmFpbCwgRU5EXG4vL1xuLy8gd2l0aCBFTlRSSUVTXG4vLyAgIElmIHBhdHRlcm5bbl0gaXMgR0xPQlNUQVJcbi8vICAgICAvLyBoYW5kbGUgdGhlIGNhc2Ugd2hlcmUgdGhlIGdsb2JzdGFyIG1hdGNoIGlzIGVtcHR5XG4vLyAgICAgLy8gYnkgcHJ1bmluZyBpdCBvdXQsIGFuZCB0ZXN0aW5nIHRoZSByZXN1bHRpbmcgcGF0dGVyblxuLy8gICAgIFBST0NFU1MocGF0dGVyblswLi5uXSArIHBhdHRlcm5bbisxIC4uICRdLCBmYWxzZSlcbi8vICAgICAvLyBoYW5kbGUgb3RoZXIgY2FzZXMuXG4vLyAgICAgZm9yIEVOVFJZIGluIEVOVFJJRVMgKG5vdCBkb3RmaWxlcylcbi8vICAgICAgIC8vIGF0dGFjaCBnbG9ic3RhciArIHRhaWwgb250byB0aGUgZW50cnlcbi8vICAgICAgIC8vIE1hcmsgdGhhdCB0aGlzIGVudHJ5IGlzIGEgZ2xvYnN0YXIgbWF0Y2hcbi8vICAgICAgIFBST0NFU1MocGF0dGVyblswLi5uXSArIEVOVFJZICsgcGF0dGVybltuIC4uICRdLCB0cnVlKVxuLy9cbi8vICAgZWxzZSAvLyBub3QgZ2xvYnN0YXJcbi8vICAgICBmb3IgRU5UUlkgaW4gRU5UUklFUyAobm90IGRvdGZpbGVzLCB1bmxlc3MgcGF0dGVybltuXSBpcyBkb3QpXG4vLyAgICAgICBUZXN0IEVOVFJZIGFnYWluc3QgcGF0dGVybltuXVxuLy8gICAgICAgSWYgZmFpbHMsIGNvbnRpbnVlXG4vLyAgICAgICBJZiBwYXNzZXMsIFBST0NFU1MocGF0dGVyblswLi5uXSArIGl0ZW0gKyBwYXR0ZXJuW24rMSAuLiAkXSlcbi8vXG4vLyBDYXZlYXQ6XG4vLyAgIENhY2hlIGFsbCBzdGF0cyBhbmQgcmVhZGRpcnMgcmVzdWx0cyB0byBtaW5pbWl6ZSBzeXNjYWxsLiAgU2luY2UgYWxsXG4vLyAgIHdlIGV2ZXIgY2FyZSBhYm91dCBpcyBleGlzdGVuY2UgYW5kIGRpcmVjdG9yeS1uZXNzLCB3ZSBjYW4ganVzdCBrZWVwXG4vLyAgIGB0cnVlYCBmb3IgZmlsZXMsIGFuZCBbY2hpbGRyZW4sLi4uXSBmb3IgZGlyZWN0b3JpZXMsIG9yIGBmYWxzZWAgZm9yXG4vLyAgIHRoaW5ncyB0aGF0IGRvbid0IGV4aXN0LlxuXG5tb2R1bGUuZXhwb3J0cyA9IGdsb2JcblxudmFyIGZzID0gcmVxdWlyZSgnZnMnKVxudmFyIHJwID0gcmVxdWlyZSgnZnMucmVhbHBhdGgnKVxudmFyIG1pbmltYXRjaCA9IHJlcXVpcmUoJ21pbmltYXRjaCcpXG52YXIgTWluaW1hdGNoID0gbWluaW1hdGNoLk1pbmltYXRjaFxudmFyIGluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKVxudmFyIEVFID0gcmVxdWlyZSgnZXZlbnRzJykuRXZlbnRFbWl0dGVyXG52YXIgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxudmFyIGFzc2VydCA9IHJlcXVpcmUoJ2Fzc2VydCcpXG52YXIgaXNBYnNvbHV0ZSA9IHJlcXVpcmUoJ3BhdGgtaXMtYWJzb2x1dGUnKVxudmFyIGdsb2JTeW5jID0gcmVxdWlyZSgnLi9zeW5jLmpzJylcbnZhciBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbi5qcycpXG52YXIgYWxwaGFzb3J0ID0gY29tbW9uLmFscGhhc29ydFxudmFyIGFscGhhc29ydGkgPSBjb21tb24uYWxwaGFzb3J0aVxudmFyIHNldG9wdHMgPSBjb21tb24uc2V0b3B0c1xudmFyIG93blByb3AgPSBjb21tb24ub3duUHJvcFxudmFyIGluZmxpZ2h0ID0gcmVxdWlyZSgnaW5mbGlnaHQnKVxudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsJylcbnZhciBjaGlsZHJlbklnbm9yZWQgPSBjb21tb24uY2hpbGRyZW5JZ25vcmVkXG52YXIgaXNJZ25vcmVkID0gY29tbW9uLmlzSWdub3JlZFxuXG52YXIgb25jZSA9IHJlcXVpcmUoJ29uY2UnKVxuXG5mdW5jdGlvbiBnbG9iIChwYXR0ZXJuLCBvcHRpb25zLCBjYikge1xuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIGNiID0gb3B0aW9ucywgb3B0aW9ucyA9IHt9XG4gIGlmICghb3B0aW9ucykgb3B0aW9ucyA9IHt9XG5cbiAgaWYgKG9wdGlvbnMuc3luYykge1xuICAgIGlmIChjYilcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2NhbGxiYWNrIHByb3ZpZGVkIHRvIHN5bmMgZ2xvYicpXG4gICAgcmV0dXJuIGdsb2JTeW5jKHBhdHRlcm4sIG9wdGlvbnMpXG4gIH1cblxuICByZXR1cm4gbmV3IEdsb2IocGF0dGVybiwgb3B0aW9ucywgY2IpXG59XG5cbmdsb2Iuc3luYyA9IGdsb2JTeW5jXG52YXIgR2xvYlN5bmMgPSBnbG9iLkdsb2JTeW5jID0gZ2xvYlN5bmMuR2xvYlN5bmNcblxuLy8gb2xkIGFwaSBzdXJmYWNlXG5nbG9iLmdsb2IgPSBnbG9iXG5cbmZ1bmN0aW9uIGV4dGVuZCAob3JpZ2luLCBhZGQpIHtcbiAgaWYgKGFkZCA9PT0gbnVsbCB8fCB0eXBlb2YgYWRkICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBvcmlnaW5cbiAgfVxuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMoYWRkKVxuICB2YXIgaSA9IGtleXMubGVuZ3RoXG4gIHdoaWxlIChpLS0pIHtcbiAgICBvcmlnaW5ba2V5c1tpXV0gPSBhZGRba2V5c1tpXV1cbiAgfVxuICByZXR1cm4gb3JpZ2luXG59XG5cbmdsb2IuaGFzTWFnaWMgPSBmdW5jdGlvbiAocGF0dGVybiwgb3B0aW9uc18pIHtcbiAgdmFyIG9wdGlvbnMgPSBleHRlbmQoe30sIG9wdGlvbnNfKVxuICBvcHRpb25zLm5vcHJvY2VzcyA9IHRydWVcblxuICB2YXIgZyA9IG5ldyBHbG9iKHBhdHRlcm4sIG9wdGlvbnMpXG4gIHZhciBzZXQgPSBnLm1pbmltYXRjaC5zZXRcblxuICBpZiAoIXBhdHRlcm4pXG4gICAgcmV0dXJuIGZhbHNlXG5cbiAgaWYgKHNldC5sZW5ndGggPiAxKVxuICAgIHJldHVybiB0cnVlXG5cbiAgZm9yICh2YXIgaiA9IDA7IGogPCBzZXRbMF0ubGVuZ3RoOyBqKyspIHtcbiAgICBpZiAodHlwZW9mIHNldFswXVtqXSAhPT0gJ3N0cmluZycpXG4gICAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlXG59XG5cbmdsb2IuR2xvYiA9IEdsb2JcbmluaGVyaXRzKEdsb2IsIEVFKVxuZnVuY3Rpb24gR2xvYiAocGF0dGVybiwgb3B0aW9ucywgY2IpIHtcbiAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2IgPSBvcHRpb25zXG4gICAgb3B0aW9ucyA9IG51bGxcbiAgfVxuXG4gIGlmIChvcHRpb25zICYmIG9wdGlvbnMuc3luYykge1xuICAgIGlmIChjYilcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2NhbGxiYWNrIHByb3ZpZGVkIHRvIHN5bmMgZ2xvYicpXG4gICAgcmV0dXJuIG5ldyBHbG9iU3luYyhwYXR0ZXJuLCBvcHRpb25zKVxuICB9XG5cbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIEdsb2IpKVxuICAgIHJldHVybiBuZXcgR2xvYihwYXR0ZXJuLCBvcHRpb25zLCBjYilcblxuICBzZXRvcHRzKHRoaXMsIHBhdHRlcm4sIG9wdGlvbnMpXG4gIHRoaXMuX2RpZFJlYWxQYXRoID0gZmFsc2VcblxuICAvLyBwcm9jZXNzIGVhY2ggcGF0dGVybiBpbiB0aGUgbWluaW1hdGNoIHNldFxuICB2YXIgbiA9IHRoaXMubWluaW1hdGNoLnNldC5sZW5ndGhcblxuICAvLyBUaGUgbWF0Y2hlcyBhcmUgc3RvcmVkIGFzIHs8ZmlsZW5hbWU+OiB0cnVlLC4uLn0gc28gdGhhdFxuICAvLyBkdXBsaWNhdGVzIGFyZSBhdXRvbWFnaWNhbGx5IHBydW5lZC5cbiAgLy8gTGF0ZXIsIHdlIGRvIGFuIE9iamVjdC5rZXlzKCkgb24gdGhlc2UuXG4gIC8vIEtlZXAgdGhlbSBhcyBhIGxpc3Qgc28gd2UgY2FuIGZpbGwgaW4gd2hlbiBub251bGwgaXMgc2V0LlxuICB0aGlzLm1hdGNoZXMgPSBuZXcgQXJyYXkobilcblxuICBpZiAodHlwZW9mIGNiID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2IgPSBvbmNlKGNiKVxuICAgIHRoaXMub24oJ2Vycm9yJywgY2IpXG4gICAgdGhpcy5vbignZW5kJywgZnVuY3Rpb24gKG1hdGNoZXMpIHtcbiAgICAgIGNiKG51bGwsIG1hdGNoZXMpXG4gICAgfSlcbiAgfVxuXG4gIHZhciBzZWxmID0gdGhpc1xuICB0aGlzLl9wcm9jZXNzaW5nID0gMFxuXG4gIHRoaXMuX2VtaXRRdWV1ZSA9IFtdXG4gIHRoaXMuX3Byb2Nlc3NRdWV1ZSA9IFtdXG4gIHRoaXMucGF1c2VkID0gZmFsc2VcblxuICBpZiAodGhpcy5ub3Byb2Nlc3MpXG4gICAgcmV0dXJuIHRoaXNcblxuICBpZiAobiA9PT0gMClcbiAgICByZXR1cm4gZG9uZSgpXG5cbiAgdmFyIHN5bmMgPSB0cnVlXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgaSArKykge1xuICAgIHRoaXMuX3Byb2Nlc3ModGhpcy5taW5pbWF0Y2guc2V0W2ldLCBpLCBmYWxzZSwgZG9uZSlcbiAgfVxuICBzeW5jID0gZmFsc2VcblxuICBmdW5jdGlvbiBkb25lICgpIHtcbiAgICAtLXNlbGYuX3Byb2Nlc3NpbmdcbiAgICBpZiAoc2VsZi5fcHJvY2Vzc2luZyA8PSAwKSB7XG4gICAgICBpZiAoc3luYykge1xuICAgICAgICBwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBzZWxmLl9maW5pc2goKVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VsZi5fZmluaXNoKClcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuR2xvYi5wcm90b3R5cGUuX2ZpbmlzaCA9IGZ1bmN0aW9uICgpIHtcbiAgYXNzZXJ0KHRoaXMgaW5zdGFuY2VvZiBHbG9iKVxuICBpZiAodGhpcy5hYm9ydGVkKVxuICAgIHJldHVyblxuXG4gIGlmICh0aGlzLnJlYWxwYXRoICYmICF0aGlzLl9kaWRSZWFscGF0aClcbiAgICByZXR1cm4gdGhpcy5fcmVhbHBhdGgoKVxuXG4gIGNvbW1vbi5maW5pc2godGhpcylcbiAgdGhpcy5lbWl0KCdlbmQnLCB0aGlzLmZvdW5kKVxufVxuXG5HbG9iLnByb3RvdHlwZS5fcmVhbHBhdGggPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLl9kaWRSZWFscGF0aClcbiAgICByZXR1cm5cblxuICB0aGlzLl9kaWRSZWFscGF0aCA9IHRydWVcblxuICB2YXIgbiA9IHRoaXMubWF0Y2hlcy5sZW5ndGhcbiAgaWYgKG4gPT09IDApXG4gICAgcmV0dXJuIHRoaXMuX2ZpbmlzaCgpXG5cbiAgdmFyIHNlbGYgPSB0aGlzXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5tYXRjaGVzLmxlbmd0aDsgaSsrKVxuICAgIHRoaXMuX3JlYWxwYXRoU2V0KGksIG5leHQpXG5cbiAgZnVuY3Rpb24gbmV4dCAoKSB7XG4gICAgaWYgKC0tbiA9PT0gMClcbiAgICAgIHNlbGYuX2ZpbmlzaCgpXG4gIH1cbn1cblxuR2xvYi5wcm90b3R5cGUuX3JlYWxwYXRoU2V0ID0gZnVuY3Rpb24gKGluZGV4LCBjYikge1xuICB2YXIgbWF0Y2hzZXQgPSB0aGlzLm1hdGNoZXNbaW5kZXhdXG4gIGlmICghbWF0Y2hzZXQpXG4gICAgcmV0dXJuIGNiKClcblxuICB2YXIgZm91bmQgPSBPYmplY3Qua2V5cyhtYXRjaHNldClcbiAgdmFyIHNlbGYgPSB0aGlzXG4gIHZhciBuID0gZm91bmQubGVuZ3RoXG5cbiAgaWYgKG4gPT09IDApXG4gICAgcmV0dXJuIGNiKClcblxuICB2YXIgc2V0ID0gdGhpcy5tYXRjaGVzW2luZGV4XSA9IE9iamVjdC5jcmVhdGUobnVsbClcbiAgZm91bmQuZm9yRWFjaChmdW5jdGlvbiAocCwgaSkge1xuICAgIC8vIElmIHRoZXJlJ3MgYSBwcm9ibGVtIHdpdGggdGhlIHN0YXQsIHRoZW4gaXQgbWVhbnMgdGhhdFxuICAgIC8vIG9uZSBvciBtb3JlIG9mIHRoZSBsaW5rcyBpbiB0aGUgcmVhbHBhdGggY291bGRuJ3QgYmVcbiAgICAvLyByZXNvbHZlZC4gIGp1c3QgcmV0dXJuIHRoZSBhYnMgdmFsdWUgaW4gdGhhdCBjYXNlLlxuICAgIHAgPSBzZWxmLl9tYWtlQWJzKHApXG4gICAgcnAucmVhbHBhdGgocCwgc2VsZi5yZWFscGF0aENhY2hlLCBmdW5jdGlvbiAoZXIsIHJlYWwpIHtcbiAgICAgIGlmICghZXIpXG4gICAgICAgIHNldFtyZWFsXSA9IHRydWVcbiAgICAgIGVsc2UgaWYgKGVyLnN5c2NhbGwgPT09ICdzdGF0JylcbiAgICAgICAgc2V0W3BdID0gdHJ1ZVxuICAgICAgZWxzZVxuICAgICAgICBzZWxmLmVtaXQoJ2Vycm9yJywgZXIpIC8vIHNyc2x5IHd0ZiByaWdodCBoZXJlXG5cbiAgICAgIGlmICgtLW4gPT09IDApIHtcbiAgICAgICAgc2VsZi5tYXRjaGVzW2luZGV4XSA9IHNldFxuICAgICAgICBjYigpXG4gICAgICB9XG4gICAgfSlcbiAgfSlcbn1cblxuR2xvYi5wcm90b3R5cGUuX21hcmsgPSBmdW5jdGlvbiAocCkge1xuICByZXR1cm4gY29tbW9uLm1hcmsodGhpcywgcClcbn1cblxuR2xvYi5wcm90b3R5cGUuX21ha2VBYnMgPSBmdW5jdGlvbiAoZikge1xuICByZXR1cm4gY29tbW9uLm1ha2VBYnModGhpcywgZilcbn1cblxuR2xvYi5wcm90b3R5cGUuYWJvcnQgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuYWJvcnRlZCA9IHRydWVcbiAgdGhpcy5lbWl0KCdhYm9ydCcpXG59XG5cbkdsb2IucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIXRoaXMucGF1c2VkKSB7XG4gICAgdGhpcy5wYXVzZWQgPSB0cnVlXG4gICAgdGhpcy5lbWl0KCdwYXVzZScpXG4gIH1cbn1cblxuR2xvYi5wcm90b3R5cGUucmVzdW1lID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5wYXVzZWQpIHtcbiAgICB0aGlzLmVtaXQoJ3Jlc3VtZScpXG4gICAgdGhpcy5wYXVzZWQgPSBmYWxzZVxuICAgIGlmICh0aGlzLl9lbWl0UXVldWUubGVuZ3RoKSB7XG4gICAgICB2YXIgZXEgPSB0aGlzLl9lbWl0UXVldWUuc2xpY2UoMClcbiAgICAgIHRoaXMuX2VtaXRRdWV1ZS5sZW5ndGggPSAwXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVxLmxlbmd0aDsgaSArKykge1xuICAgICAgICB2YXIgZSA9IGVxW2ldXG4gICAgICAgIHRoaXMuX2VtaXRNYXRjaChlWzBdLCBlWzFdKVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5fcHJvY2Vzc1F1ZXVlLmxlbmd0aCkge1xuICAgICAgdmFyIHBxID0gdGhpcy5fcHJvY2Vzc1F1ZXVlLnNsaWNlKDApXG4gICAgICB0aGlzLl9wcm9jZXNzUXVldWUubGVuZ3RoID0gMFxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcS5sZW5ndGg7IGkgKyspIHtcbiAgICAgICAgdmFyIHAgPSBwcVtpXVxuICAgICAgICB0aGlzLl9wcm9jZXNzaW5nLS1cbiAgICAgICAgdGhpcy5fcHJvY2VzcyhwWzBdLCBwWzFdLCBwWzJdLCBwWzNdKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5HbG9iLnByb3RvdHlwZS5fcHJvY2VzcyA9IGZ1bmN0aW9uIChwYXR0ZXJuLCBpbmRleCwgaW5HbG9iU3RhciwgY2IpIHtcbiAgYXNzZXJ0KHRoaXMgaW5zdGFuY2VvZiBHbG9iKVxuICBhc3NlcnQodHlwZW9mIGNiID09PSAnZnVuY3Rpb24nKVxuXG4gIGlmICh0aGlzLmFib3J0ZWQpXG4gICAgcmV0dXJuXG5cbiAgdGhpcy5fcHJvY2Vzc2luZysrXG4gIGlmICh0aGlzLnBhdXNlZCkge1xuICAgIHRoaXMuX3Byb2Nlc3NRdWV1ZS5wdXNoKFtwYXR0ZXJuLCBpbmRleCwgaW5HbG9iU3RhciwgY2JdKVxuICAgIHJldHVyblxuICB9XG5cbiAgLy9jb25zb2xlLmVycm9yKCdQUk9DRVNTICVkJywgdGhpcy5fcHJvY2Vzc2luZywgcGF0dGVybilcblxuICAvLyBHZXQgdGhlIGZpcnN0IFtuXSBwYXJ0cyBvZiBwYXR0ZXJuIHRoYXQgYXJlIGFsbCBzdHJpbmdzLlxuICB2YXIgbiA9IDBcbiAgd2hpbGUgKHR5cGVvZiBwYXR0ZXJuW25dID09PSAnc3RyaW5nJykge1xuICAgIG4gKytcbiAgfVxuICAvLyBub3cgbiBpcyB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IG9uZSB0aGF0IGlzICpub3QqIGEgc3RyaW5nLlxuXG4gIC8vIHNlZSBpZiB0aGVyZSdzIGFueXRoaW5nIGVsc2VcbiAgdmFyIHByZWZpeFxuICBzd2l0Y2ggKG4pIHtcbiAgICAvLyBpZiBub3QsIHRoZW4gdGhpcyBpcyByYXRoZXIgc2ltcGxlXG4gICAgY2FzZSBwYXR0ZXJuLmxlbmd0aDpcbiAgICAgIHRoaXMuX3Byb2Nlc3NTaW1wbGUocGF0dGVybi5qb2luKCcvJyksIGluZGV4LCBjYilcbiAgICAgIHJldHVyblxuXG4gICAgY2FzZSAwOlxuICAgICAgLy8gcGF0dGVybiAqc3RhcnRzKiB3aXRoIHNvbWUgbm9uLXRyaXZpYWwgaXRlbS5cbiAgICAgIC8vIGdvaW5nIHRvIHJlYWRkaXIoY3dkKSwgYnV0IG5vdCBpbmNsdWRlIHRoZSBwcmVmaXggaW4gbWF0Y2hlcy5cbiAgICAgIHByZWZpeCA9IG51bGxcbiAgICAgIGJyZWFrXG5cbiAgICBkZWZhdWx0OlxuICAgICAgLy8gcGF0dGVybiBoYXMgc29tZSBzdHJpbmcgYml0cyBpbiB0aGUgZnJvbnQuXG4gICAgICAvLyB3aGF0ZXZlciBpdCBzdGFydHMgd2l0aCwgd2hldGhlciB0aGF0J3MgJ2Fic29sdXRlJyBsaWtlIC9mb28vYmFyLFxuICAgICAgLy8gb3IgJ3JlbGF0aXZlJyBsaWtlICcuLi9iYXonXG4gICAgICBwcmVmaXggPSBwYXR0ZXJuLnNsaWNlKDAsIG4pLmpvaW4oJy8nKVxuICAgICAgYnJlYWtcbiAgfVxuXG4gIHZhciByZW1haW4gPSBwYXR0ZXJuLnNsaWNlKG4pXG5cbiAgLy8gZ2V0IHRoZSBsaXN0IG9mIGVudHJpZXMuXG4gIHZhciByZWFkXG4gIGlmIChwcmVmaXggPT09IG51bGwpXG4gICAgcmVhZCA9ICcuJ1xuICBlbHNlIGlmIChpc0Fic29sdXRlKHByZWZpeCkgfHwgaXNBYnNvbHV0ZShwYXR0ZXJuLmpvaW4oJy8nKSkpIHtcbiAgICBpZiAoIXByZWZpeCB8fCAhaXNBYnNvbHV0ZShwcmVmaXgpKVxuICAgICAgcHJlZml4ID0gJy8nICsgcHJlZml4XG4gICAgcmVhZCA9IHByZWZpeFxuICB9IGVsc2VcbiAgICByZWFkID0gcHJlZml4XG5cbiAgdmFyIGFicyA9IHRoaXMuX21ha2VBYnMocmVhZClcblxuICAvL2lmIGlnbm9yZWQsIHNraXAgX3Byb2Nlc3NpbmdcbiAgaWYgKGNoaWxkcmVuSWdub3JlZCh0aGlzLCByZWFkKSlcbiAgICByZXR1cm4gY2IoKVxuXG4gIHZhciBpc0dsb2JTdGFyID0gcmVtYWluWzBdID09PSBtaW5pbWF0Y2guR0xPQlNUQVJcbiAgaWYgKGlzR2xvYlN0YXIpXG4gICAgdGhpcy5fcHJvY2Vzc0dsb2JTdGFyKHByZWZpeCwgcmVhZCwgYWJzLCByZW1haW4sIGluZGV4LCBpbkdsb2JTdGFyLCBjYilcbiAgZWxzZVxuICAgIHRoaXMuX3Byb2Nlc3NSZWFkZGlyKHByZWZpeCwgcmVhZCwgYWJzLCByZW1haW4sIGluZGV4LCBpbkdsb2JTdGFyLCBjYilcbn1cblxuR2xvYi5wcm90b3R5cGUuX3Byb2Nlc3NSZWFkZGlyID0gZnVuY3Rpb24gKHByZWZpeCwgcmVhZCwgYWJzLCByZW1haW4sIGluZGV4LCBpbkdsb2JTdGFyLCBjYikge1xuICB2YXIgc2VsZiA9IHRoaXNcbiAgdGhpcy5fcmVhZGRpcihhYnMsIGluR2xvYlN0YXIsIGZ1bmN0aW9uIChlciwgZW50cmllcykge1xuICAgIHJldHVybiBzZWxmLl9wcm9jZXNzUmVhZGRpcjIocHJlZml4LCByZWFkLCBhYnMsIHJlbWFpbiwgaW5kZXgsIGluR2xvYlN0YXIsIGVudHJpZXMsIGNiKVxuICB9KVxufVxuXG5HbG9iLnByb3RvdHlwZS5fcHJvY2Vzc1JlYWRkaXIyID0gZnVuY3Rpb24gKHByZWZpeCwgcmVhZCwgYWJzLCByZW1haW4sIGluZGV4LCBpbkdsb2JTdGFyLCBlbnRyaWVzLCBjYikge1xuXG4gIC8vIGlmIHRoZSBhYnMgaXNuJ3QgYSBkaXIsIHRoZW4gbm90aGluZyBjYW4gbWF0Y2ghXG4gIGlmICghZW50cmllcylcbiAgICByZXR1cm4gY2IoKVxuXG4gIC8vIEl0IHdpbGwgb25seSBtYXRjaCBkb3QgZW50cmllcyBpZiBpdCBzdGFydHMgd2l0aCBhIGRvdCwgb3IgaWZcbiAgLy8gZG90IGlzIHNldC4gIFN0dWZmIGxpa2UgQCguZm9vfC5iYXIpIGlzbid0IGFsbG93ZWQuXG4gIHZhciBwbiA9IHJlbWFpblswXVxuICB2YXIgbmVnYXRlID0gISF0aGlzLm1pbmltYXRjaC5uZWdhdGVcbiAgdmFyIHJhd0dsb2IgPSBwbi5fZ2xvYlxuICB2YXIgZG90T2sgPSB0aGlzLmRvdCB8fCByYXdHbG9iLmNoYXJBdCgwKSA9PT0gJy4nXG5cbiAgdmFyIG1hdGNoZWRFbnRyaWVzID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbnRyaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGUgPSBlbnRyaWVzW2ldXG4gICAgaWYgKGUuY2hhckF0KDApICE9PSAnLicgfHwgZG90T2spIHtcbiAgICAgIHZhciBtXG4gICAgICBpZiAobmVnYXRlICYmICFwcmVmaXgpIHtcbiAgICAgICAgbSA9ICFlLm1hdGNoKHBuKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbSA9IGUubWF0Y2gocG4pXG4gICAgICB9XG4gICAgICBpZiAobSlcbiAgICAgICAgbWF0Y2hlZEVudHJpZXMucHVzaChlKVxuICAgIH1cbiAgfVxuXG4gIC8vY29uc29sZS5lcnJvcigncHJkMicsIHByZWZpeCwgZW50cmllcywgcmVtYWluWzBdLl9nbG9iLCBtYXRjaGVkRW50cmllcylcblxuICB2YXIgbGVuID0gbWF0Y2hlZEVudHJpZXMubGVuZ3RoXG4gIC8vIElmIHRoZXJlIGFyZSBubyBtYXRjaGVkIGVudHJpZXMsIHRoZW4gbm90aGluZyBtYXRjaGVzLlxuICBpZiAobGVuID09PSAwKVxuICAgIHJldHVybiBjYigpXG5cbiAgLy8gaWYgdGhpcyBpcyB0aGUgbGFzdCByZW1haW5pbmcgcGF0dGVybiBiaXQsIHRoZW4gbm8gbmVlZCBmb3JcbiAgLy8gYW4gYWRkaXRpb25hbCBzdGF0ICp1bmxlc3MqIHRoZSB1c2VyIGhhcyBzcGVjaWZpZWQgbWFyayBvclxuICAvLyBzdGF0IGV4cGxpY2l0bHkuICBXZSBrbm93IHRoZXkgZXhpc3QsIHNpbmNlIHJlYWRkaXIgcmV0dXJuZWRcbiAgLy8gdGhlbS5cblxuICBpZiAocmVtYWluLmxlbmd0aCA9PT0gMSAmJiAhdGhpcy5tYXJrICYmICF0aGlzLnN0YXQpIHtcbiAgICBpZiAoIXRoaXMubWF0Y2hlc1tpbmRleF0pXG4gICAgICB0aGlzLm1hdGNoZXNbaW5kZXhdID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKyspIHtcbiAgICAgIHZhciBlID0gbWF0Y2hlZEVudHJpZXNbaV1cbiAgICAgIGlmIChwcmVmaXgpIHtcbiAgICAgICAgaWYgKHByZWZpeCAhPT0gJy8nKVxuICAgICAgICAgIGUgPSBwcmVmaXggKyAnLycgKyBlXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBlID0gcHJlZml4ICsgZVxuICAgICAgfVxuXG4gICAgICBpZiAoZS5jaGFyQXQoMCkgPT09ICcvJyAmJiAhdGhpcy5ub21vdW50KSB7XG4gICAgICAgIGUgPSBwYXRoLmpvaW4odGhpcy5yb290LCBlKVxuICAgICAgfVxuICAgICAgdGhpcy5fZW1pdE1hdGNoKGluZGV4LCBlKVxuICAgIH1cbiAgICAvLyBUaGlzIHdhcyB0aGUgbGFzdCBvbmUsIGFuZCBubyBzdGF0cyB3ZXJlIG5lZWRlZFxuICAgIHJldHVybiBjYigpXG4gIH1cblxuICAvLyBub3cgdGVzdCBhbGwgbWF0Y2hlZCBlbnRyaWVzIGFzIHN0YW5kLWlucyBmb3IgdGhhdCBwYXJ0XG4gIC8vIG9mIHRoZSBwYXR0ZXJuLlxuICByZW1haW4uc2hpZnQoKVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArKykge1xuICAgIHZhciBlID0gbWF0Y2hlZEVudHJpZXNbaV1cbiAgICB2YXIgbmV3UGF0dGVyblxuICAgIGlmIChwcmVmaXgpIHtcbiAgICAgIGlmIChwcmVmaXggIT09ICcvJylcbiAgICAgICAgZSA9IHByZWZpeCArICcvJyArIGVcbiAgICAgIGVsc2VcbiAgICAgICAgZSA9IHByZWZpeCArIGVcbiAgICB9XG4gICAgdGhpcy5fcHJvY2VzcyhbZV0uY29uY2F0KHJlbWFpbiksIGluZGV4LCBpbkdsb2JTdGFyLCBjYilcbiAgfVxuICBjYigpXG59XG5cbkdsb2IucHJvdG90eXBlLl9lbWl0TWF0Y2ggPSBmdW5jdGlvbiAoaW5kZXgsIGUpIHtcbiAgaWYgKHRoaXMuYWJvcnRlZClcbiAgICByZXR1cm5cblxuICBpZiAoaXNJZ25vcmVkKHRoaXMsIGUpKVxuICAgIHJldHVyblxuXG4gIGlmICh0aGlzLnBhdXNlZCkge1xuICAgIHRoaXMuX2VtaXRRdWV1ZS5wdXNoKFtpbmRleCwgZV0pXG4gICAgcmV0dXJuXG4gIH1cblxuICB2YXIgYWJzID0gaXNBYnNvbHV0ZShlKSA/IGUgOiB0aGlzLl9tYWtlQWJzKGUpXG5cbiAgaWYgKHRoaXMubWFyaylcbiAgICBlID0gdGhpcy5fbWFyayhlKVxuXG4gIGlmICh0aGlzLmFic29sdXRlKVxuICAgIGUgPSBhYnNcblxuICBpZiAodGhpcy5tYXRjaGVzW2luZGV4XVtlXSlcbiAgICByZXR1cm5cblxuICBpZiAodGhpcy5ub2Rpcikge1xuICAgIHZhciBjID0gdGhpcy5jYWNoZVthYnNdXG4gICAgaWYgKGMgPT09ICdESVInIHx8IEFycmF5LmlzQXJyYXkoYykpXG4gICAgICByZXR1cm5cbiAgfVxuXG4gIHRoaXMubWF0Y2hlc1tpbmRleF1bZV0gPSB0cnVlXG5cbiAgdmFyIHN0ID0gdGhpcy5zdGF0Q2FjaGVbYWJzXVxuICBpZiAoc3QpXG4gICAgdGhpcy5lbWl0KCdzdGF0JywgZSwgc3QpXG5cbiAgdGhpcy5lbWl0KCdtYXRjaCcsIGUpXG59XG5cbkdsb2IucHJvdG90eXBlLl9yZWFkZGlySW5HbG9iU3RhciA9IGZ1bmN0aW9uIChhYnMsIGNiKSB7XG4gIGlmICh0aGlzLmFib3J0ZWQpXG4gICAgcmV0dXJuXG5cbiAgLy8gZm9sbG93IGFsbCBzeW1saW5rZWQgZGlyZWN0b3JpZXMgZm9yZXZlclxuICAvLyBqdXN0IHByb2NlZWQgYXMgaWYgdGhpcyBpcyBhIG5vbi1nbG9ic3RhciBzaXR1YXRpb25cbiAgaWYgKHRoaXMuZm9sbG93KVxuICAgIHJldHVybiB0aGlzLl9yZWFkZGlyKGFicywgZmFsc2UsIGNiKVxuXG4gIHZhciBsc3RhdGtleSA9ICdsc3RhdFxcMCcgKyBhYnNcbiAgdmFyIHNlbGYgPSB0aGlzXG4gIHZhciBsc3RhdGNiID0gaW5mbGlnaHQobHN0YXRrZXksIGxzdGF0Y2JfKVxuXG4gIGlmIChsc3RhdGNiKVxuICAgIGZzLmxzdGF0KGFicywgbHN0YXRjYilcblxuICBmdW5jdGlvbiBsc3RhdGNiXyAoZXIsIGxzdGF0KSB7XG4gICAgaWYgKGVyICYmIGVyLmNvZGUgPT09ICdFTk9FTlQnKVxuICAgICAgcmV0dXJuIGNiKClcblxuICAgIHZhciBpc1N5bSA9IGxzdGF0ICYmIGxzdGF0LmlzU3ltYm9saWNMaW5rKClcbiAgICBzZWxmLnN5bWxpbmtzW2Fic10gPSBpc1N5bVxuXG4gICAgLy8gSWYgaXQncyBub3QgYSBzeW1saW5rIG9yIGEgZGlyLCB0aGVuIGl0J3MgZGVmaW5pdGVseSBhIHJlZ3VsYXIgZmlsZS5cbiAgICAvLyBkb24ndCBib3RoZXIgZG9pbmcgYSByZWFkZGlyIGluIHRoYXQgY2FzZS5cbiAgICBpZiAoIWlzU3ltICYmIGxzdGF0ICYmICFsc3RhdC5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICBzZWxmLmNhY2hlW2Fic10gPSAnRklMRSdcbiAgICAgIGNiKClcbiAgICB9IGVsc2VcbiAgICAgIHNlbGYuX3JlYWRkaXIoYWJzLCBmYWxzZSwgY2IpXG4gIH1cbn1cblxuR2xvYi5wcm90b3R5cGUuX3JlYWRkaXIgPSBmdW5jdGlvbiAoYWJzLCBpbkdsb2JTdGFyLCBjYikge1xuICBpZiAodGhpcy5hYm9ydGVkKVxuICAgIHJldHVyblxuXG4gIGNiID0gaW5mbGlnaHQoJ3JlYWRkaXJcXDAnK2FicysnXFwwJytpbkdsb2JTdGFyLCBjYilcbiAgaWYgKCFjYilcbiAgICByZXR1cm5cblxuICAvL2NvbnNvbGUuZXJyb3IoJ1JEICVqICVqJywgK2luR2xvYlN0YXIsIGFicylcbiAgaWYgKGluR2xvYlN0YXIgJiYgIW93blByb3AodGhpcy5zeW1saW5rcywgYWJzKSlcbiAgICByZXR1cm4gdGhpcy5fcmVhZGRpckluR2xvYlN0YXIoYWJzLCBjYilcblxuICBpZiAob3duUHJvcCh0aGlzLmNhY2hlLCBhYnMpKSB7XG4gICAgdmFyIGMgPSB0aGlzLmNhY2hlW2Fic11cbiAgICBpZiAoIWMgfHwgYyA9PT0gJ0ZJTEUnKVxuICAgICAgcmV0dXJuIGNiKClcblxuICAgIGlmIChBcnJheS5pc0FycmF5KGMpKVxuICAgICAgcmV0dXJuIGNiKG51bGwsIGMpXG4gIH1cblxuICB2YXIgc2VsZiA9IHRoaXNcbiAgZnMucmVhZGRpcihhYnMsIHJlYWRkaXJDYih0aGlzLCBhYnMsIGNiKSlcbn1cblxuZnVuY3Rpb24gcmVhZGRpckNiIChzZWxmLCBhYnMsIGNiKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoZXIsIGVudHJpZXMpIHtcbiAgICBpZiAoZXIpXG4gICAgICBzZWxmLl9yZWFkZGlyRXJyb3IoYWJzLCBlciwgY2IpXG4gICAgZWxzZVxuICAgICAgc2VsZi5fcmVhZGRpckVudHJpZXMoYWJzLCBlbnRyaWVzLCBjYilcbiAgfVxufVxuXG5HbG9iLnByb3RvdHlwZS5fcmVhZGRpckVudHJpZXMgPSBmdW5jdGlvbiAoYWJzLCBlbnRyaWVzLCBjYikge1xuICBpZiAodGhpcy5hYm9ydGVkKVxuICAgIHJldHVyblxuXG4gIC8vIGlmIHdlIGhhdmVuJ3QgYXNrZWQgdG8gc3RhdCBldmVyeXRoaW5nLCB0aGVuIGp1c3RcbiAgLy8gYXNzdW1lIHRoYXQgZXZlcnl0aGluZyBpbiB0aGVyZSBleGlzdHMsIHNvIHdlIGNhbiBhdm9pZFxuICAvLyBoYXZpbmcgdG8gc3RhdCBpdCBhIHNlY29uZCB0aW1lLlxuICBpZiAoIXRoaXMubWFyayAmJiAhdGhpcy5zdGF0KSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbnRyaWVzLmxlbmd0aDsgaSArKykge1xuICAgICAgdmFyIGUgPSBlbnRyaWVzW2ldXG4gICAgICBpZiAoYWJzID09PSAnLycpXG4gICAgICAgIGUgPSBhYnMgKyBlXG4gICAgICBlbHNlXG4gICAgICAgIGUgPSBhYnMgKyAnLycgKyBlXG4gICAgICB0aGlzLmNhY2hlW2VdID0gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIHRoaXMuY2FjaGVbYWJzXSA9IGVudHJpZXNcbiAgcmV0dXJuIGNiKG51bGwsIGVudHJpZXMpXG59XG5cbkdsb2IucHJvdG90eXBlLl9yZWFkZGlyRXJyb3IgPSBmdW5jdGlvbiAoZiwgZXIsIGNiKSB7XG4gIGlmICh0aGlzLmFib3J0ZWQpXG4gICAgcmV0dXJuXG5cbiAgLy8gaGFuZGxlIGVycm9ycywgYW5kIGNhY2hlIHRoZSBpbmZvcm1hdGlvblxuICBzd2l0Y2ggKGVyLmNvZGUpIHtcbiAgICBjYXNlICdFTk9UU1VQJzogLy8gaHR0cHM6Ly9naXRodWIuY29tL2lzYWFjcy9ub2RlLWdsb2IvaXNzdWVzLzIwNVxuICAgIGNhc2UgJ0VOT1RESVInOiAvLyB0b3RhbGx5IG5vcm1hbC4gbWVhbnMgaXQgKmRvZXMqIGV4aXN0LlxuICAgICAgdmFyIGFicyA9IHRoaXMuX21ha2VBYnMoZilcbiAgICAgIHRoaXMuY2FjaGVbYWJzXSA9ICdGSUxFJ1xuICAgICAgaWYgKGFicyA9PT0gdGhpcy5jd2RBYnMpIHtcbiAgICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKGVyLmNvZGUgKyAnIGludmFsaWQgY3dkICcgKyB0aGlzLmN3ZClcbiAgICAgICAgZXJyb3IucGF0aCA9IHRoaXMuY3dkXG4gICAgICAgIGVycm9yLmNvZGUgPSBlci5jb2RlXG4gICAgICAgIHRoaXMuZW1pdCgnZXJyb3InLCBlcnJvcilcbiAgICAgICAgdGhpcy5hYm9ydCgpXG4gICAgICB9XG4gICAgICBicmVha1xuXG4gICAgY2FzZSAnRU5PRU5UJzogLy8gbm90IHRlcnJpYmx5IHVudXN1YWxcbiAgICBjYXNlICdFTE9PUCc6XG4gICAgY2FzZSAnRU5BTUVUT09MT05HJzpcbiAgICBjYXNlICdVTktOT1dOJzpcbiAgICAgIHRoaXMuY2FjaGVbdGhpcy5fbWFrZUFicyhmKV0gPSBmYWxzZVxuICAgICAgYnJlYWtcblxuICAgIGRlZmF1bHQ6IC8vIHNvbWUgdW51c3VhbCBlcnJvci4gIFRyZWF0IGFzIGZhaWx1cmUuXG4gICAgICB0aGlzLmNhY2hlW3RoaXMuX21ha2VBYnMoZildID0gZmFsc2VcbiAgICAgIGlmICh0aGlzLnN0cmljdCkge1xuICAgICAgICB0aGlzLmVtaXQoJ2Vycm9yJywgZXIpXG4gICAgICAgIC8vIElmIHRoZSBlcnJvciBpcyBoYW5kbGVkLCB0aGVuIHdlIGFib3J0XG4gICAgICAgIC8vIGlmIG5vdCwgd2UgdGhyZXcgb3V0IG9mIGhlcmVcbiAgICAgICAgdGhpcy5hYm9ydCgpXG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuc2lsZW50KVxuICAgICAgICBjb25zb2xlLmVycm9yKCdnbG9iIGVycm9yJywgZXIpXG4gICAgICBicmVha1xuICB9XG5cbiAgcmV0dXJuIGNiKClcbn1cblxuR2xvYi5wcm90b3R5cGUuX3Byb2Nlc3NHbG9iU3RhciA9IGZ1bmN0aW9uIChwcmVmaXgsIHJlYWQsIGFicywgcmVtYWluLCBpbmRleCwgaW5HbG9iU3RhciwgY2IpIHtcbiAgdmFyIHNlbGYgPSB0aGlzXG4gIHRoaXMuX3JlYWRkaXIoYWJzLCBpbkdsb2JTdGFyLCBmdW5jdGlvbiAoZXIsIGVudHJpZXMpIHtcbiAgICBzZWxmLl9wcm9jZXNzR2xvYlN0YXIyKHByZWZpeCwgcmVhZCwgYWJzLCByZW1haW4sIGluZGV4LCBpbkdsb2JTdGFyLCBlbnRyaWVzLCBjYilcbiAgfSlcbn1cblxuXG5HbG9iLnByb3RvdHlwZS5fcHJvY2Vzc0dsb2JTdGFyMiA9IGZ1bmN0aW9uIChwcmVmaXgsIHJlYWQsIGFicywgcmVtYWluLCBpbmRleCwgaW5HbG9iU3RhciwgZW50cmllcywgY2IpIHtcbiAgLy9jb25zb2xlLmVycm9yKCdwZ3MyJywgcHJlZml4LCByZW1haW5bMF0sIGVudHJpZXMpXG5cbiAgLy8gbm8gZW50cmllcyBtZWFucyBub3QgYSBkaXIsIHNvIGl0IGNhbiBuZXZlciBoYXZlIG1hdGNoZXNcbiAgLy8gZm9vLnR4dC8qKiBkb2Vzbid0IG1hdGNoIGZvby50eHRcbiAgaWYgKCFlbnRyaWVzKVxuICAgIHJldHVybiBjYigpXG5cbiAgLy8gdGVzdCB3aXRob3V0IHRoZSBnbG9ic3RhciwgYW5kIHdpdGggZXZlcnkgY2hpbGQgYm90aCBiZWxvd1xuICAvLyBhbmQgcmVwbGFjaW5nIHRoZSBnbG9ic3Rhci5cbiAgdmFyIHJlbWFpbldpdGhvdXRHbG9iU3RhciA9IHJlbWFpbi5zbGljZSgxKVxuICB2YXIgZ3NwcmVmID0gcHJlZml4ID8gWyBwcmVmaXggXSA6IFtdXG4gIHZhciBub0dsb2JTdGFyID0gZ3NwcmVmLmNvbmNhdChyZW1haW5XaXRob3V0R2xvYlN0YXIpXG5cbiAgLy8gdGhlIG5vR2xvYlN0YXIgcGF0dGVybiBleGl0cyB0aGUgaW5HbG9iU3RhciBzdGF0ZVxuICB0aGlzLl9wcm9jZXNzKG5vR2xvYlN0YXIsIGluZGV4LCBmYWxzZSwgY2IpXG5cbiAgdmFyIGlzU3ltID0gdGhpcy5zeW1saW5rc1thYnNdXG4gIHZhciBsZW4gPSBlbnRyaWVzLmxlbmd0aFxuXG4gIC8vIElmIGl0J3MgYSBzeW1saW5rLCBhbmQgd2UncmUgaW4gYSBnbG9ic3RhciwgdGhlbiBzdG9wXG4gIGlmIChpc1N5bSAmJiBpbkdsb2JTdGFyKVxuICAgIHJldHVybiBjYigpXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIHZhciBlID0gZW50cmllc1tpXVxuICAgIGlmIChlLmNoYXJBdCgwKSA9PT0gJy4nICYmICF0aGlzLmRvdClcbiAgICAgIGNvbnRpbnVlXG5cbiAgICAvLyB0aGVzZSB0d28gY2FzZXMgZW50ZXIgdGhlIGluR2xvYlN0YXIgc3RhdGVcbiAgICB2YXIgaW5zdGVhZCA9IGdzcHJlZi5jb25jYXQoZW50cmllc1tpXSwgcmVtYWluV2l0aG91dEdsb2JTdGFyKVxuICAgIHRoaXMuX3Byb2Nlc3MoaW5zdGVhZCwgaW5kZXgsIHRydWUsIGNiKVxuXG4gICAgdmFyIGJlbG93ID0gZ3NwcmVmLmNvbmNhdChlbnRyaWVzW2ldLCByZW1haW4pXG4gICAgdGhpcy5fcHJvY2VzcyhiZWxvdywgaW5kZXgsIHRydWUsIGNiKVxuICB9XG5cbiAgY2IoKVxufVxuXG5HbG9iLnByb3RvdHlwZS5fcHJvY2Vzc1NpbXBsZSA9IGZ1bmN0aW9uIChwcmVmaXgsIGluZGV4LCBjYikge1xuICAvLyBYWFggcmV2aWV3IHRoaXMuICBTaG91bGRuJ3QgaXQgYmUgZG9pbmcgdGhlIG1vdW50aW5nIGV0Y1xuICAvLyBiZWZvcmUgZG9pbmcgc3RhdD8gIGtpbmRhIHdlaXJkP1xuICB2YXIgc2VsZiA9IHRoaXNcbiAgdGhpcy5fc3RhdChwcmVmaXgsIGZ1bmN0aW9uIChlciwgZXhpc3RzKSB7XG4gICAgc2VsZi5fcHJvY2Vzc1NpbXBsZTIocHJlZml4LCBpbmRleCwgZXIsIGV4aXN0cywgY2IpXG4gIH0pXG59XG5HbG9iLnByb3RvdHlwZS5fcHJvY2Vzc1NpbXBsZTIgPSBmdW5jdGlvbiAocHJlZml4LCBpbmRleCwgZXIsIGV4aXN0cywgY2IpIHtcblxuICAvL2NvbnNvbGUuZXJyb3IoJ3BzMicsIHByZWZpeCwgZXhpc3RzKVxuXG4gIGlmICghdGhpcy5tYXRjaGVzW2luZGV4XSlcbiAgICB0aGlzLm1hdGNoZXNbaW5kZXhdID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuXG4gIC8vIElmIGl0IGRvZXNuJ3QgZXhpc3QsIHRoZW4ganVzdCBtYXJrIHRoZSBsYWNrIG9mIHJlc3VsdHNcbiAgaWYgKCFleGlzdHMpXG4gICAgcmV0dXJuIGNiKClcblxuICBpZiAocHJlZml4ICYmIGlzQWJzb2x1dGUocHJlZml4KSAmJiAhdGhpcy5ub21vdW50KSB7XG4gICAgdmFyIHRyYWlsID0gL1tcXC9cXFxcXSQvLnRlc3QocHJlZml4KVxuICAgIGlmIChwcmVmaXguY2hhckF0KDApID09PSAnLycpIHtcbiAgICAgIHByZWZpeCA9IHBhdGguam9pbih0aGlzLnJvb3QsIHByZWZpeClcbiAgICB9IGVsc2Uge1xuICAgICAgcHJlZml4ID0gcGF0aC5yZXNvbHZlKHRoaXMucm9vdCwgcHJlZml4KVxuICAgICAgaWYgKHRyYWlsKVxuICAgICAgICBwcmVmaXggKz0gJy8nXG4gICAgfVxuICB9XG5cbiAgaWYgKHByb2Nlc3MucGxhdGZvcm0gPT09ICd3aW4zMicpXG4gICAgcHJlZml4ID0gcHJlZml4LnJlcGxhY2UoL1xcXFwvZywgJy8nKVxuXG4gIC8vIE1hcmsgdGhpcyBhcyBhIG1hdGNoXG4gIHRoaXMuX2VtaXRNYXRjaChpbmRleCwgcHJlZml4KVxuICBjYigpXG59XG5cbi8vIFJldHVybnMgZWl0aGVyICdESVInLCAnRklMRScsIG9yIGZhbHNlXG5HbG9iLnByb3RvdHlwZS5fc3RhdCA9IGZ1bmN0aW9uIChmLCBjYikge1xuICB2YXIgYWJzID0gdGhpcy5fbWFrZUFicyhmKVxuICB2YXIgbmVlZERpciA9IGYuc2xpY2UoLTEpID09PSAnLydcblxuICBpZiAoZi5sZW5ndGggPiB0aGlzLm1heExlbmd0aClcbiAgICByZXR1cm4gY2IoKVxuXG4gIGlmICghdGhpcy5zdGF0ICYmIG93blByb3AodGhpcy5jYWNoZSwgYWJzKSkge1xuICAgIHZhciBjID0gdGhpcy5jYWNoZVthYnNdXG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShjKSlcbiAgICAgIGMgPSAnRElSJ1xuXG4gICAgLy8gSXQgZXhpc3RzLCBidXQgbWF5YmUgbm90IGhvdyB3ZSBuZWVkIGl0XG4gICAgaWYgKCFuZWVkRGlyIHx8IGMgPT09ICdESVInKVxuICAgICAgcmV0dXJuIGNiKG51bGwsIGMpXG5cbiAgICBpZiAobmVlZERpciAmJiBjID09PSAnRklMRScpXG4gICAgICByZXR1cm4gY2IoKVxuXG4gICAgLy8gb3RoZXJ3aXNlIHdlIGhhdmUgdG8gc3RhdCwgYmVjYXVzZSBtYXliZSBjPXRydWVcbiAgICAvLyBpZiB3ZSBrbm93IGl0IGV4aXN0cywgYnV0IG5vdCB3aGF0IGl0IGlzLlxuICB9XG5cbiAgdmFyIGV4aXN0c1xuICB2YXIgc3RhdCA9IHRoaXMuc3RhdENhY2hlW2Fic11cbiAgaWYgKHN0YXQgIT09IHVuZGVmaW5lZCkge1xuICAgIGlmIChzdGF0ID09PSBmYWxzZSlcbiAgICAgIHJldHVybiBjYihudWxsLCBzdGF0KVxuICAgIGVsc2Uge1xuICAgICAgdmFyIHR5cGUgPSBzdGF0LmlzRGlyZWN0b3J5KCkgPyAnRElSJyA6ICdGSUxFJ1xuICAgICAgaWYgKG5lZWREaXIgJiYgdHlwZSA9PT0gJ0ZJTEUnKVxuICAgICAgICByZXR1cm4gY2IoKVxuICAgICAgZWxzZVxuICAgICAgICByZXR1cm4gY2IobnVsbCwgdHlwZSwgc3RhdClcbiAgICB9XG4gIH1cblxuICB2YXIgc2VsZiA9IHRoaXNcbiAgdmFyIHN0YXRjYiA9IGluZmxpZ2h0KCdzdGF0XFwwJyArIGFicywgbHN0YXRjYl8pXG4gIGlmIChzdGF0Y2IpXG4gICAgZnMubHN0YXQoYWJzLCBzdGF0Y2IpXG5cbiAgZnVuY3Rpb24gbHN0YXRjYl8gKGVyLCBsc3RhdCkge1xuICAgIGlmIChsc3RhdCAmJiBsc3RhdC5pc1N5bWJvbGljTGluaygpKSB7XG4gICAgICAvLyBJZiBpdCdzIGEgc3ltbGluaywgdGhlbiB0cmVhdCBpdCBhcyB0aGUgdGFyZ2V0LCB1bmxlc3NcbiAgICAgIC8vIHRoZSB0YXJnZXQgZG9lcyBub3QgZXhpc3QsIHRoZW4gdHJlYXQgaXQgYXMgYSBmaWxlLlxuICAgICAgcmV0dXJuIGZzLnN0YXQoYWJzLCBmdW5jdGlvbiAoZXIsIHN0YXQpIHtcbiAgICAgICAgaWYgKGVyKVxuICAgICAgICAgIHNlbGYuX3N0YXQyKGYsIGFicywgbnVsbCwgbHN0YXQsIGNiKVxuICAgICAgICBlbHNlXG4gICAgICAgICAgc2VsZi5fc3RhdDIoZiwgYWJzLCBlciwgc3RhdCwgY2IpXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBzZWxmLl9zdGF0MihmLCBhYnMsIGVyLCBsc3RhdCwgY2IpXG4gICAgfVxuICB9XG59XG5cbkdsb2IucHJvdG90eXBlLl9zdGF0MiA9IGZ1bmN0aW9uIChmLCBhYnMsIGVyLCBzdGF0LCBjYikge1xuICBpZiAoZXIgJiYgKGVyLmNvZGUgPT09ICdFTk9FTlQnIHx8IGVyLmNvZGUgPT09ICdFTk9URElSJykpIHtcbiAgICB0aGlzLnN0YXRDYWNoZVthYnNdID0gZmFsc2VcbiAgICByZXR1cm4gY2IoKVxuICB9XG5cbiAgdmFyIG5lZWREaXIgPSBmLnNsaWNlKC0xKSA9PT0gJy8nXG4gIHRoaXMuc3RhdENhY2hlW2Fic10gPSBzdGF0XG5cbiAgaWYgKGFicy5zbGljZSgtMSkgPT09ICcvJyAmJiBzdGF0ICYmICFzdGF0LmlzRGlyZWN0b3J5KCkpXG4gICAgcmV0dXJuIGNiKG51bGwsIGZhbHNlLCBzdGF0KVxuXG4gIHZhciBjID0gdHJ1ZVxuICBpZiAoc3RhdClcbiAgICBjID0gc3RhdC5pc0RpcmVjdG9yeSgpID8gJ0RJUicgOiAnRklMRSdcbiAgdGhpcy5jYWNoZVthYnNdID0gdGhpcy5jYWNoZVthYnNdIHx8IGNcblxuICBpZiAobmVlZERpciAmJiBjID09PSAnRklMRScpXG4gICAgcmV0dXJuIGNiKClcblxuICByZXR1cm4gY2IobnVsbCwgYywgc3RhdClcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVhbHBhdGhcbnJlYWxwYXRoLnJlYWxwYXRoID0gcmVhbHBhdGhcbnJlYWxwYXRoLnN5bmMgPSByZWFscGF0aFN5bmNcbnJlYWxwYXRoLnJlYWxwYXRoU3luYyA9IHJlYWxwYXRoU3luY1xucmVhbHBhdGgubW9ua2V5cGF0Y2ggPSBtb25rZXlwYXRjaFxucmVhbHBhdGgudW5tb25rZXlwYXRjaCA9IHVubW9ua2V5cGF0Y2hcblxudmFyIGZzID0gcmVxdWlyZSgnZnMnKVxudmFyIG9yaWdSZWFscGF0aCA9IGZzLnJlYWxwYXRoXG52YXIgb3JpZ1JlYWxwYXRoU3luYyA9IGZzLnJlYWxwYXRoU3luY1xuXG52YXIgdmVyc2lvbiA9IHByb2Nlc3MudmVyc2lvblxudmFyIG9rID0gL152WzAtNV1cXC4vLnRlc3QodmVyc2lvbilcbnZhciBvbGQgPSByZXF1aXJlKCcuL29sZC5qcycpXG5cbmZ1bmN0aW9uIG5ld0Vycm9yIChlcikge1xuICByZXR1cm4gZXIgJiYgZXIuc3lzY2FsbCA9PT0gJ3JlYWxwYXRoJyAmJiAoXG4gICAgZXIuY29kZSA9PT0gJ0VMT09QJyB8fFxuICAgIGVyLmNvZGUgPT09ICdFTk9NRU0nIHx8XG4gICAgZXIuY29kZSA9PT0gJ0VOQU1FVE9PTE9ORydcbiAgKVxufVxuXG5mdW5jdGlvbiByZWFscGF0aCAocCwgY2FjaGUsIGNiKSB7XG4gIGlmIChvaykge1xuICAgIHJldHVybiBvcmlnUmVhbHBhdGgocCwgY2FjaGUsIGNiKVxuICB9XG5cbiAgaWYgKHR5cGVvZiBjYWNoZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNiID0gY2FjaGVcbiAgICBjYWNoZSA9IG51bGxcbiAgfVxuICBvcmlnUmVhbHBhdGgocCwgY2FjaGUsIGZ1bmN0aW9uIChlciwgcmVzdWx0KSB7XG4gICAgaWYgKG5ld0Vycm9yKGVyKSkge1xuICAgICAgb2xkLnJlYWxwYXRoKHAsIGNhY2hlLCBjYilcbiAgICB9IGVsc2Uge1xuICAgICAgY2IoZXIsIHJlc3VsdClcbiAgICB9XG4gIH0pXG59XG5cbmZ1bmN0aW9uIHJlYWxwYXRoU3luYyAocCwgY2FjaGUpIHtcbiAgaWYgKG9rKSB7XG4gICAgcmV0dXJuIG9yaWdSZWFscGF0aFN5bmMocCwgY2FjaGUpXG4gIH1cblxuICB0cnkge1xuICAgIHJldHVybiBvcmlnUmVhbHBhdGhTeW5jKHAsIGNhY2hlKVxuICB9IGNhdGNoIChlcikge1xuICAgIGlmIChuZXdFcnJvcihlcikpIHtcbiAgICAgIHJldHVybiBvbGQucmVhbHBhdGhTeW5jKHAsIGNhY2hlKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBlclxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBtb25rZXlwYXRjaCAoKSB7XG4gIGZzLnJlYWxwYXRoID0gcmVhbHBhdGhcbiAgZnMucmVhbHBhdGhTeW5jID0gcmVhbHBhdGhTeW5jXG59XG5cbmZ1bmN0aW9uIHVubW9ua2V5cGF0Y2ggKCkge1xuICBmcy5yZWFscGF0aCA9IG9yaWdSZWFscGF0aFxuICBmcy5yZWFscGF0aFN5bmMgPSBvcmlnUmVhbHBhdGhTeW5jXG59XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxudmFyIHBhdGhNb2R1bGUgPSByZXF1aXJlKCdwYXRoJyk7XG52YXIgaXNXaW5kb3dzID0gcHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJztcbnZhciBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5cbi8vIEphdmFTY3JpcHQgaW1wbGVtZW50YXRpb24gb2YgcmVhbHBhdGgsIHBvcnRlZCBmcm9tIG5vZGUgcHJlLXY2XG5cbnZhciBERUJVRyA9IHByb2Nlc3MuZW52Lk5PREVfREVCVUcgJiYgL2ZzLy50ZXN0KHByb2Nlc3MuZW52Lk5PREVfREVCVUcpO1xuXG5mdW5jdGlvbiByZXRocm93KCkge1xuICAvLyBPbmx5IGVuYWJsZSBpbiBkZWJ1ZyBtb2RlLiBBIGJhY2t0cmFjZSB1c2VzIH4xMDAwIGJ5dGVzIG9mIGhlYXAgc3BhY2UgYW5kXG4gIC8vIGlzIGZhaXJseSBzbG93IHRvIGdlbmVyYXRlLlxuICB2YXIgY2FsbGJhY2s7XG4gIGlmIChERUJVRykge1xuICAgIHZhciBiYWNrdHJhY2UgPSBuZXcgRXJyb3I7XG4gICAgY2FsbGJhY2sgPSBkZWJ1Z0NhbGxiYWNrO1xuICB9IGVsc2VcbiAgICBjYWxsYmFjayA9IG1pc3NpbmdDYWxsYmFjaztcblxuICByZXR1cm4gY2FsbGJhY2s7XG5cbiAgZnVuY3Rpb24gZGVidWdDYWxsYmFjayhlcnIpIHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICBiYWNrdHJhY2UubWVzc2FnZSA9IGVyci5tZXNzYWdlO1xuICAgICAgZXJyID0gYmFja3RyYWNlO1xuICAgICAgbWlzc2luZ0NhbGxiYWNrKGVycik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbWlzc2luZ0NhbGxiYWNrKGVycikge1xuICAgIGlmIChlcnIpIHtcbiAgICAgIGlmIChwcm9jZXNzLnRocm93RGVwcmVjYXRpb24pXG4gICAgICAgIHRocm93IGVycjsgIC8vIEZvcmdvdCBhIGNhbGxiYWNrIGJ1dCBkb24ndCBrbm93IHdoZXJlPyBVc2UgTk9ERV9ERUJVRz1mc1xuICAgICAgZWxzZSBpZiAoIXByb2Nlc3Mubm9EZXByZWNhdGlvbikge1xuICAgICAgICB2YXIgbXNnID0gJ2ZzOiBtaXNzaW5nIGNhbGxiYWNrICcgKyAoZXJyLnN0YWNrIHx8IGVyci5tZXNzYWdlKTtcbiAgICAgICAgaWYgKHByb2Nlc3MudHJhY2VEZXByZWNhdGlvbilcbiAgICAgICAgICBjb25zb2xlLnRyYWNlKG1zZyk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICBjb25zb2xlLmVycm9yKG1zZyk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIG1heWJlQ2FsbGJhY2soY2IpIHtcbiAgcmV0dXJuIHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJyA/IGNiIDogcmV0aHJvdygpO1xufVxuXG52YXIgbm9ybWFsaXplID0gcGF0aE1vZHVsZS5ub3JtYWxpemU7XG5cbi8vIFJlZ2V4cCB0aGF0IGZpbmRzIHRoZSBuZXh0IHBhcnRpb24gb2YgYSAocGFydGlhbCkgcGF0aFxuLy8gcmVzdWx0IGlzIFtiYXNlX3dpdGhfc2xhc2gsIGJhc2VdLCBlLmcuIFsnc29tZWRpci8nLCAnc29tZWRpciddXG5pZiAoaXNXaW5kb3dzKSB7XG4gIHZhciBuZXh0UGFydFJlID0gLyguKj8pKD86W1xcL1xcXFxdK3wkKS9nO1xufSBlbHNlIHtcbiAgdmFyIG5leHRQYXJ0UmUgPSAvKC4qPykoPzpbXFwvXSt8JCkvZztcbn1cblxuLy8gUmVnZXggdG8gZmluZCB0aGUgZGV2aWNlIHJvb3QsIGluY2x1ZGluZyB0cmFpbGluZyBzbGFzaC4gRS5nLiAnYzpcXFxcJy5cbmlmIChpc1dpbmRvd3MpIHtcbiAgdmFyIHNwbGl0Um9vdFJlID0gL14oPzpbYS16QS1aXTp8W1xcXFxcXC9dezJ9W15cXFxcXFwvXStbXFxcXFxcL11bXlxcXFxcXC9dKyk/W1xcXFxcXC9dKi87XG59IGVsc2Uge1xuICB2YXIgc3BsaXRSb290UmUgPSAvXltcXC9dKi87XG59XG5cbmV4cG9ydHMucmVhbHBhdGhTeW5jID0gZnVuY3Rpb24gcmVhbHBhdGhTeW5jKHAsIGNhY2hlKSB7XG4gIC8vIG1ha2UgcCBpcyBhYnNvbHV0ZVxuICBwID0gcGF0aE1vZHVsZS5yZXNvbHZlKHApO1xuXG4gIGlmIChjYWNoZSAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY2FjaGUsIHApKSB7XG4gICAgcmV0dXJuIGNhY2hlW3BdO1xuICB9XG5cbiAgdmFyIG9yaWdpbmFsID0gcCxcbiAgICAgIHNlZW5MaW5rcyA9IHt9LFxuICAgICAga25vd25IYXJkID0ge307XG5cbiAgLy8gY3VycmVudCBjaGFyYWN0ZXIgcG9zaXRpb24gaW4gcFxuICB2YXIgcG9zO1xuICAvLyB0aGUgcGFydGlhbCBwYXRoIHNvIGZhciwgaW5jbHVkaW5nIGEgdHJhaWxpbmcgc2xhc2ggaWYgYW55XG4gIHZhciBjdXJyZW50O1xuICAvLyB0aGUgcGFydGlhbCBwYXRoIHdpdGhvdXQgYSB0cmFpbGluZyBzbGFzaCAoZXhjZXB0IHdoZW4gcG9pbnRpbmcgYXQgYSByb290KVxuICB2YXIgYmFzZTtcbiAgLy8gdGhlIHBhcnRpYWwgcGF0aCBzY2FubmVkIGluIHRoZSBwcmV2aW91cyByb3VuZCwgd2l0aCBzbGFzaFxuICB2YXIgcHJldmlvdXM7XG5cbiAgc3RhcnQoKTtcblxuICBmdW5jdGlvbiBzdGFydCgpIHtcbiAgICAvLyBTa2lwIG92ZXIgcm9vdHNcbiAgICB2YXIgbSA9IHNwbGl0Um9vdFJlLmV4ZWMocCk7XG4gICAgcG9zID0gbVswXS5sZW5ndGg7XG4gICAgY3VycmVudCA9IG1bMF07XG4gICAgYmFzZSA9IG1bMF07XG4gICAgcHJldmlvdXMgPSAnJztcblxuICAgIC8vIE9uIHdpbmRvd3MsIGNoZWNrIHRoYXQgdGhlIHJvb3QgZXhpc3RzLiBPbiB1bml4IHRoZXJlIGlzIG5vIG5lZWQuXG4gICAgaWYgKGlzV2luZG93cyAmJiAha25vd25IYXJkW2Jhc2VdKSB7XG4gICAgICBmcy5sc3RhdFN5bmMoYmFzZSk7XG4gICAgICBrbm93bkhhcmRbYmFzZV0gPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIC8vIHdhbGsgZG93biB0aGUgcGF0aCwgc3dhcHBpbmcgb3V0IGxpbmtlZCBwYXRocGFydHMgZm9yIHRoZWlyIHJlYWxcbiAgLy8gdmFsdWVzXG4gIC8vIE5COiBwLmxlbmd0aCBjaGFuZ2VzLlxuICB3aGlsZSAocG9zIDwgcC5sZW5ndGgpIHtcbiAgICAvLyBmaW5kIHRoZSBuZXh0IHBhcnRcbiAgICBuZXh0UGFydFJlLmxhc3RJbmRleCA9IHBvcztcbiAgICB2YXIgcmVzdWx0ID0gbmV4dFBhcnRSZS5leGVjKHApO1xuICAgIHByZXZpb3VzID0gY3VycmVudDtcbiAgICBjdXJyZW50ICs9IHJlc3VsdFswXTtcbiAgICBiYXNlID0gcHJldmlvdXMgKyByZXN1bHRbMV07XG4gICAgcG9zID0gbmV4dFBhcnRSZS5sYXN0SW5kZXg7XG5cbiAgICAvLyBjb250aW51ZSBpZiBub3QgYSBzeW1saW5rXG4gICAgaWYgKGtub3duSGFyZFtiYXNlXSB8fCAoY2FjaGUgJiYgY2FjaGVbYmFzZV0gPT09IGJhc2UpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICB2YXIgcmVzb2x2ZWRMaW5rO1xuICAgIGlmIChjYWNoZSAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY2FjaGUsIGJhc2UpKSB7XG4gICAgICAvLyBzb21lIGtub3duIHN5bWJvbGljIGxpbmsuICBubyBuZWVkIHRvIHN0YXQgYWdhaW4uXG4gICAgICByZXNvbHZlZExpbmsgPSBjYWNoZVtiYXNlXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHN0YXQgPSBmcy5sc3RhdFN5bmMoYmFzZSk7XG4gICAgICBpZiAoIXN0YXQuaXNTeW1ib2xpY0xpbmsoKSkge1xuICAgICAgICBrbm93bkhhcmRbYmFzZV0gPSB0cnVlO1xuICAgICAgICBpZiAoY2FjaGUpIGNhY2hlW2Jhc2VdID0gYmFzZTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIHJlYWQgdGhlIGxpbmsgaWYgaXQgd2Fzbid0IHJlYWQgYmVmb3JlXG4gICAgICAvLyBkZXYvaW5vIGFsd2F5cyByZXR1cm4gMCBvbiB3aW5kb3dzLCBzbyBza2lwIHRoZSBjaGVjay5cbiAgICAgIHZhciBsaW5rVGFyZ2V0ID0gbnVsbDtcbiAgICAgIGlmICghaXNXaW5kb3dzKSB7XG4gICAgICAgIHZhciBpZCA9IHN0YXQuZGV2LnRvU3RyaW5nKDMyKSArICc6JyArIHN0YXQuaW5vLnRvU3RyaW5nKDMyKTtcbiAgICAgICAgaWYgKHNlZW5MaW5rcy5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcbiAgICAgICAgICBsaW5rVGFyZ2V0ID0gc2VlbkxpbmtzW2lkXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGxpbmtUYXJnZXQgPT09IG51bGwpIHtcbiAgICAgICAgZnMuc3RhdFN5bmMoYmFzZSk7XG4gICAgICAgIGxpbmtUYXJnZXQgPSBmcy5yZWFkbGlua1N5bmMoYmFzZSk7XG4gICAgICB9XG4gICAgICByZXNvbHZlZExpbmsgPSBwYXRoTW9kdWxlLnJlc29sdmUocHJldmlvdXMsIGxpbmtUYXJnZXQpO1xuICAgICAgLy8gdHJhY2sgdGhpcywgaWYgZ2l2ZW4gYSBjYWNoZS5cbiAgICAgIGlmIChjYWNoZSkgY2FjaGVbYmFzZV0gPSByZXNvbHZlZExpbms7XG4gICAgICBpZiAoIWlzV2luZG93cykgc2VlbkxpbmtzW2lkXSA9IGxpbmtUYXJnZXQ7XG4gICAgfVxuXG4gICAgLy8gcmVzb2x2ZSB0aGUgbGluaywgdGhlbiBzdGFydCBvdmVyXG4gICAgcCA9IHBhdGhNb2R1bGUucmVzb2x2ZShyZXNvbHZlZExpbmssIHAuc2xpY2UocG9zKSk7XG4gICAgc3RhcnQoKTtcbiAgfVxuXG4gIGlmIChjYWNoZSkgY2FjaGVbb3JpZ2luYWxdID0gcDtcblxuICByZXR1cm4gcDtcbn07XG5cblxuZXhwb3J0cy5yZWFscGF0aCA9IGZ1bmN0aW9uIHJlYWxwYXRoKHAsIGNhY2hlLCBjYikge1xuICBpZiAodHlwZW9mIGNiICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgY2IgPSBtYXliZUNhbGxiYWNrKGNhY2hlKTtcbiAgICBjYWNoZSA9IG51bGw7XG4gIH1cblxuICAvLyBtYWtlIHAgaXMgYWJzb2x1dGVcbiAgcCA9IHBhdGhNb2R1bGUucmVzb2x2ZShwKTtcblxuICBpZiAoY2FjaGUgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGNhY2hlLCBwKSkge1xuICAgIHJldHVybiBwcm9jZXNzLm5leHRUaWNrKGNiLmJpbmQobnVsbCwgbnVsbCwgY2FjaGVbcF0pKTtcbiAgfVxuXG4gIHZhciBvcmlnaW5hbCA9IHAsXG4gICAgICBzZWVuTGlua3MgPSB7fSxcbiAgICAgIGtub3duSGFyZCA9IHt9O1xuXG4gIC8vIGN1cnJlbnQgY2hhcmFjdGVyIHBvc2l0aW9uIGluIHBcbiAgdmFyIHBvcztcbiAgLy8gdGhlIHBhcnRpYWwgcGF0aCBzbyBmYXIsIGluY2x1ZGluZyBhIHRyYWlsaW5nIHNsYXNoIGlmIGFueVxuICB2YXIgY3VycmVudDtcbiAgLy8gdGhlIHBhcnRpYWwgcGF0aCB3aXRob3V0IGEgdHJhaWxpbmcgc2xhc2ggKGV4Y2VwdCB3aGVuIHBvaW50aW5nIGF0IGEgcm9vdClcbiAgdmFyIGJhc2U7XG4gIC8vIHRoZSBwYXJ0aWFsIHBhdGggc2Nhbm5lZCBpbiB0aGUgcHJldmlvdXMgcm91bmQsIHdpdGggc2xhc2hcbiAgdmFyIHByZXZpb3VzO1xuXG4gIHN0YXJ0KCk7XG5cbiAgZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgLy8gU2tpcCBvdmVyIHJvb3RzXG4gICAgdmFyIG0gPSBzcGxpdFJvb3RSZS5leGVjKHApO1xuICAgIHBvcyA9IG1bMF0ubGVuZ3RoO1xuICAgIGN1cnJlbnQgPSBtWzBdO1xuICAgIGJhc2UgPSBtWzBdO1xuICAgIHByZXZpb3VzID0gJyc7XG5cbiAgICAvLyBPbiB3aW5kb3dzLCBjaGVjayB0aGF0IHRoZSByb290IGV4aXN0cy4gT24gdW5peCB0aGVyZSBpcyBubyBuZWVkLlxuICAgIGlmIChpc1dpbmRvd3MgJiYgIWtub3duSGFyZFtiYXNlXSkge1xuICAgICAgZnMubHN0YXQoYmFzZSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgIGlmIChlcnIpIHJldHVybiBjYihlcnIpO1xuICAgICAgICBrbm93bkhhcmRbYmFzZV0gPSB0cnVlO1xuICAgICAgICBMT09QKCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhMT09QKTtcbiAgICB9XG4gIH1cblxuICAvLyB3YWxrIGRvd24gdGhlIHBhdGgsIHN3YXBwaW5nIG91dCBsaW5rZWQgcGF0aHBhcnRzIGZvciB0aGVpciByZWFsXG4gIC8vIHZhbHVlc1xuICBmdW5jdGlvbiBMT09QKCkge1xuICAgIC8vIHN0b3AgaWYgc2Nhbm5lZCBwYXN0IGVuZCBvZiBwYXRoXG4gICAgaWYgKHBvcyA+PSBwLmxlbmd0aCkge1xuICAgICAgaWYgKGNhY2hlKSBjYWNoZVtvcmlnaW5hbF0gPSBwO1xuICAgICAgcmV0dXJuIGNiKG51bGwsIHApO1xuICAgIH1cblxuICAgIC8vIGZpbmQgdGhlIG5leHQgcGFydFxuICAgIG5leHRQYXJ0UmUubGFzdEluZGV4ID0gcG9zO1xuICAgIHZhciByZXN1bHQgPSBuZXh0UGFydFJlLmV4ZWMocCk7XG4gICAgcHJldmlvdXMgPSBjdXJyZW50O1xuICAgIGN1cnJlbnQgKz0gcmVzdWx0WzBdO1xuICAgIGJhc2UgPSBwcmV2aW91cyArIHJlc3VsdFsxXTtcbiAgICBwb3MgPSBuZXh0UGFydFJlLmxhc3RJbmRleDtcblxuICAgIC8vIGNvbnRpbnVlIGlmIG5vdCBhIHN5bWxpbmtcbiAgICBpZiAoa25vd25IYXJkW2Jhc2VdIHx8IChjYWNoZSAmJiBjYWNoZVtiYXNlXSA9PT0gYmFzZSkpIHtcbiAgICAgIHJldHVybiBwcm9jZXNzLm5leHRUaWNrKExPT1ApO1xuICAgIH1cblxuICAgIGlmIChjYWNoZSAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY2FjaGUsIGJhc2UpKSB7XG4gICAgICAvLyBrbm93biBzeW1ib2xpYyBsaW5rLiAgbm8gbmVlZCB0byBzdGF0IGFnYWluLlxuICAgICAgcmV0dXJuIGdvdFJlc29sdmVkTGluayhjYWNoZVtiYXNlXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZzLmxzdGF0KGJhc2UsIGdvdFN0YXQpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ290U3RhdChlcnIsIHN0YXQpIHtcbiAgICBpZiAoZXJyKSByZXR1cm4gY2IoZXJyKTtcblxuICAgIC8vIGlmIG5vdCBhIHN5bWxpbmssIHNraXAgdG8gdGhlIG5leHQgcGF0aCBwYXJ0XG4gICAgaWYgKCFzdGF0LmlzU3ltYm9saWNMaW5rKCkpIHtcbiAgICAgIGtub3duSGFyZFtiYXNlXSA9IHRydWU7XG4gICAgICBpZiAoY2FjaGUpIGNhY2hlW2Jhc2VdID0gYmFzZTtcbiAgICAgIHJldHVybiBwcm9jZXNzLm5leHRUaWNrKExPT1ApO1xuICAgIH1cblxuICAgIC8vIHN0YXQgJiByZWFkIHRoZSBsaW5rIGlmIG5vdCByZWFkIGJlZm9yZVxuICAgIC8vIGNhbGwgZ290VGFyZ2V0IGFzIHNvb24gYXMgdGhlIGxpbmsgdGFyZ2V0IGlzIGtub3duXG4gICAgLy8gZGV2L2lubyBhbHdheXMgcmV0dXJuIDAgb24gd2luZG93cywgc28gc2tpcCB0aGUgY2hlY2suXG4gICAgaWYgKCFpc1dpbmRvd3MpIHtcbiAgICAgIHZhciBpZCA9IHN0YXQuZGV2LnRvU3RyaW5nKDMyKSArICc6JyArIHN0YXQuaW5vLnRvU3RyaW5nKDMyKTtcbiAgICAgIGlmIChzZWVuTGlua3MuaGFzT3duUHJvcGVydHkoaWQpKSB7XG4gICAgICAgIHJldHVybiBnb3RUYXJnZXQobnVsbCwgc2VlbkxpbmtzW2lkXSwgYmFzZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGZzLnN0YXQoYmFzZSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICBpZiAoZXJyKSByZXR1cm4gY2IoZXJyKTtcblxuICAgICAgZnMucmVhZGxpbmsoYmFzZSwgZnVuY3Rpb24oZXJyLCB0YXJnZXQpIHtcbiAgICAgICAgaWYgKCFpc1dpbmRvd3MpIHNlZW5MaW5rc1tpZF0gPSB0YXJnZXQ7XG4gICAgICAgIGdvdFRhcmdldChlcnIsIHRhcmdldCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdvdFRhcmdldChlcnIsIHRhcmdldCwgYmFzZSkge1xuICAgIGlmIChlcnIpIHJldHVybiBjYihlcnIpO1xuXG4gICAgdmFyIHJlc29sdmVkTGluayA9IHBhdGhNb2R1bGUucmVzb2x2ZShwcmV2aW91cywgdGFyZ2V0KTtcbiAgICBpZiAoY2FjaGUpIGNhY2hlW2Jhc2VdID0gcmVzb2x2ZWRMaW5rO1xuICAgIGdvdFJlc29sdmVkTGluayhyZXNvbHZlZExpbmspO1xuICB9XG5cbiAgZnVuY3Rpb24gZ290UmVzb2x2ZWRMaW5rKHJlc29sdmVkTGluaykge1xuICAgIC8vIHJlc29sdmUgdGhlIGxpbmssIHRoZW4gc3RhcnQgb3ZlclxuICAgIHAgPSBwYXRoTW9kdWxlLnJlc29sdmUocmVzb2x2ZWRMaW5rLCBwLnNsaWNlKHBvcykpO1xuICAgIHN0YXJ0KCk7XG4gIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IG1pbmltYXRjaFxubWluaW1hdGNoLk1pbmltYXRjaCA9IE1pbmltYXRjaFxuXG52YXIgcGF0aCA9IHsgc2VwOiAnLycgfVxudHJ5IHtcbiAgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxufSBjYXRjaCAoZXIpIHt9XG5cbnZhciBHTE9CU1RBUiA9IG1pbmltYXRjaC5HTE9CU1RBUiA9IE1pbmltYXRjaC5HTE9CU1RBUiA9IHt9XG52YXIgZXhwYW5kID0gcmVxdWlyZSgnYnJhY2UtZXhwYW5zaW9uJylcblxudmFyIHBsVHlwZXMgPSB7XG4gICchJzogeyBvcGVuOiAnKD86KD8hKD86JywgY2xvc2U6ICcpKVteL10qPyknfSxcbiAgJz8nOiB7IG9wZW46ICcoPzonLCBjbG9zZTogJyk/JyB9LFxuICAnKyc6IHsgb3BlbjogJyg/OicsIGNsb3NlOiAnKSsnIH0sXG4gICcqJzogeyBvcGVuOiAnKD86JywgY2xvc2U6ICcpKicgfSxcbiAgJ0AnOiB7IG9wZW46ICcoPzonLCBjbG9zZTogJyknIH1cbn1cblxuLy8gYW55IHNpbmdsZSB0aGluZyBvdGhlciB0aGFuIC9cbi8vIGRvbid0IG5lZWQgdG8gZXNjYXBlIC8gd2hlbiB1c2luZyBuZXcgUmVnRXhwKClcbnZhciBxbWFyayA9ICdbXi9dJ1xuXG4vLyAqID0+IGFueSBudW1iZXIgb2YgY2hhcmFjdGVyc1xudmFyIHN0YXIgPSBxbWFyayArICcqPydcblxuLy8gKiogd2hlbiBkb3RzIGFyZSBhbGxvd2VkLiAgQW55dGhpbmcgZ29lcywgZXhjZXB0IC4uIGFuZCAuXG4vLyBub3QgKF4gb3IgLyBmb2xsb3dlZCBieSBvbmUgb3IgdHdvIGRvdHMgZm9sbG93ZWQgYnkgJCBvciAvKSxcbi8vIGZvbGxvd2VkIGJ5IGFueXRoaW5nLCBhbnkgbnVtYmVyIG9mIHRpbWVzLlxudmFyIHR3b1N0YXJEb3QgPSAnKD86KD8hKD86XFxcXFxcL3xeKSg/OlxcXFwuezEsMn0pKCR8XFxcXFxcLykpLikqPydcblxuLy8gbm90IGEgXiBvciAvIGZvbGxvd2VkIGJ5IGEgZG90LFxuLy8gZm9sbG93ZWQgYnkgYW55dGhpbmcsIGFueSBudW1iZXIgb2YgdGltZXMuXG52YXIgdHdvU3Rhck5vRG90ID0gJyg/Oig/ISg/OlxcXFxcXC98XilcXFxcLikuKSo/J1xuXG4vLyBjaGFyYWN0ZXJzIHRoYXQgbmVlZCB0byBiZSBlc2NhcGVkIGluIFJlZ0V4cC5cbnZhciByZVNwZWNpYWxzID0gY2hhclNldCgnKCkuKnt9Kz9bXV4kXFxcXCEnKVxuXG4vLyBcImFiY1wiIC0+IHsgYTp0cnVlLCBiOnRydWUsIGM6dHJ1ZSB9XG5mdW5jdGlvbiBjaGFyU2V0IChzKSB7XG4gIHJldHVybiBzLnNwbGl0KCcnKS5yZWR1Y2UoZnVuY3Rpb24gKHNldCwgYykge1xuICAgIHNldFtjXSA9IHRydWVcbiAgICByZXR1cm4gc2V0XG4gIH0sIHt9KVxufVxuXG4vLyBub3JtYWxpemVzIHNsYXNoZXMuXG52YXIgc2xhc2hTcGxpdCA9IC9cXC8rL1xuXG5taW5pbWF0Y2guZmlsdGVyID0gZmlsdGVyXG5mdW5jdGlvbiBmaWx0ZXIgKHBhdHRlcm4sIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cbiAgcmV0dXJuIGZ1bmN0aW9uIChwLCBpLCBsaXN0KSB7XG4gICAgcmV0dXJuIG1pbmltYXRjaChwLCBwYXR0ZXJuLCBvcHRpb25zKVxuICB9XG59XG5cbmZ1bmN0aW9uIGV4dCAoYSwgYikge1xuICBhID0gYSB8fCB7fVxuICBiID0gYiB8fCB7fVxuICB2YXIgdCA9IHt9XG4gIE9iamVjdC5rZXlzKGIpLmZvckVhY2goZnVuY3Rpb24gKGspIHtcbiAgICB0W2tdID0gYltrXVxuICB9KVxuICBPYmplY3Qua2V5cyhhKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7XG4gICAgdFtrXSA9IGFba11cbiAgfSlcbiAgcmV0dXJuIHRcbn1cblxubWluaW1hdGNoLmRlZmF1bHRzID0gZnVuY3Rpb24gKGRlZikge1xuICBpZiAoIWRlZiB8fCAhT2JqZWN0LmtleXMoZGVmKS5sZW5ndGgpIHJldHVybiBtaW5pbWF0Y2hcblxuICB2YXIgb3JpZyA9IG1pbmltYXRjaFxuXG4gIHZhciBtID0gZnVuY3Rpb24gbWluaW1hdGNoIChwLCBwYXR0ZXJuLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIG9yaWcubWluaW1hdGNoKHAsIHBhdHRlcm4sIGV4dChkZWYsIG9wdGlvbnMpKVxuICB9XG5cbiAgbS5NaW5pbWF0Y2ggPSBmdW5jdGlvbiBNaW5pbWF0Y2ggKHBhdHRlcm4sIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IG9yaWcuTWluaW1hdGNoKHBhdHRlcm4sIGV4dChkZWYsIG9wdGlvbnMpKVxuICB9XG5cbiAgcmV0dXJuIG1cbn1cblxuTWluaW1hdGNoLmRlZmF1bHRzID0gZnVuY3Rpb24gKGRlZikge1xuICBpZiAoIWRlZiB8fCAhT2JqZWN0LmtleXMoZGVmKS5sZW5ndGgpIHJldHVybiBNaW5pbWF0Y2hcbiAgcmV0dXJuIG1pbmltYXRjaC5kZWZhdWx0cyhkZWYpLk1pbmltYXRjaFxufVxuXG5mdW5jdGlvbiBtaW5pbWF0Y2ggKHAsIHBhdHRlcm4sIG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBwYXR0ZXJuICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2dsb2IgcGF0dGVybiBzdHJpbmcgcmVxdWlyZWQnKVxuICB9XG5cbiAgaWYgKCFvcHRpb25zKSBvcHRpb25zID0ge31cblxuICAvLyBzaG9ydGN1dDogY29tbWVudHMgbWF0Y2ggbm90aGluZy5cbiAgaWYgKCFvcHRpb25zLm5vY29tbWVudCAmJiBwYXR0ZXJuLmNoYXJBdCgwKSA9PT0gJyMnKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICAvLyBcIlwiIG9ubHkgbWF0Y2hlcyBcIlwiXG4gIGlmIChwYXR0ZXJuLnRyaW0oKSA9PT0gJycpIHJldHVybiBwID09PSAnJ1xuXG4gIHJldHVybiBuZXcgTWluaW1hdGNoKHBhdHRlcm4sIG9wdGlvbnMpLm1hdGNoKHApXG59XG5cbmZ1bmN0aW9uIE1pbmltYXRjaCAocGF0dGVybiwgb3B0aW9ucykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgTWluaW1hdGNoKSkge1xuICAgIHJldHVybiBuZXcgTWluaW1hdGNoKHBhdHRlcm4sIG9wdGlvbnMpXG4gIH1cblxuICBpZiAodHlwZW9mIHBhdHRlcm4gIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZ2xvYiBwYXR0ZXJuIHN0cmluZyByZXF1aXJlZCcpXG4gIH1cblxuICBpZiAoIW9wdGlvbnMpIG9wdGlvbnMgPSB7fVxuICBwYXR0ZXJuID0gcGF0dGVybi50cmltKClcblxuICAvLyB3aW5kb3dzIHN1cHBvcnQ6IG5lZWQgdG8gdXNlIC8sIG5vdCBcXFxuICBpZiAocGF0aC5zZXAgIT09ICcvJykge1xuICAgIHBhdHRlcm4gPSBwYXR0ZXJuLnNwbGl0KHBhdGguc2VwKS5qb2luKCcvJylcbiAgfVxuXG4gIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNcbiAgdGhpcy5zZXQgPSBbXVxuICB0aGlzLnBhdHRlcm4gPSBwYXR0ZXJuXG4gIHRoaXMucmVnZXhwID0gbnVsbFxuICB0aGlzLm5lZ2F0ZSA9IGZhbHNlXG4gIHRoaXMuY29tbWVudCA9IGZhbHNlXG4gIHRoaXMuZW1wdHkgPSBmYWxzZVxuXG4gIC8vIG1ha2UgdGhlIHNldCBvZiByZWdleHBzIGV0Yy5cbiAgdGhpcy5tYWtlKClcbn1cblxuTWluaW1hdGNoLnByb3RvdHlwZS5kZWJ1ZyA9IGZ1bmN0aW9uICgpIHt9XG5cbk1pbmltYXRjaC5wcm90b3R5cGUubWFrZSA9IG1ha2VcbmZ1bmN0aW9uIG1ha2UgKCkge1xuICAvLyBkb24ndCBkbyBpdCBtb3JlIHRoYW4gb25jZS5cbiAgaWYgKHRoaXMuX21hZGUpIHJldHVyblxuXG4gIHZhciBwYXR0ZXJuID0gdGhpcy5wYXR0ZXJuXG4gIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zXG5cbiAgLy8gZW1wdHkgcGF0dGVybnMgYW5kIGNvbW1lbnRzIG1hdGNoIG5vdGhpbmcuXG4gIGlmICghb3B0aW9ucy5ub2NvbW1lbnQgJiYgcGF0dGVybi5jaGFyQXQoMCkgPT09ICcjJykge1xuICAgIHRoaXMuY29tbWVudCA9IHRydWVcbiAgICByZXR1cm5cbiAgfVxuICBpZiAoIXBhdHRlcm4pIHtcbiAgICB0aGlzLmVtcHR5ID0gdHJ1ZVxuICAgIHJldHVyblxuICB9XG5cbiAgLy8gc3RlcCAxOiBmaWd1cmUgb3V0IG5lZ2F0aW9uLCBldGMuXG4gIHRoaXMucGFyc2VOZWdhdGUoKVxuXG4gIC8vIHN0ZXAgMjogZXhwYW5kIGJyYWNlc1xuICB2YXIgc2V0ID0gdGhpcy5nbG9iU2V0ID0gdGhpcy5icmFjZUV4cGFuZCgpXG5cbiAgaWYgKG9wdGlvbnMuZGVidWcpIHRoaXMuZGVidWcgPSBjb25zb2xlLmVycm9yXG5cbiAgdGhpcy5kZWJ1Zyh0aGlzLnBhdHRlcm4sIHNldClcblxuICAvLyBzdGVwIDM6IG5vdyB3ZSBoYXZlIGEgc2V0LCBzbyB0dXJuIGVhY2ggb25lIGludG8gYSBzZXJpZXMgb2YgcGF0aC1wb3J0aW9uXG4gIC8vIG1hdGNoaW5nIHBhdHRlcm5zLlxuICAvLyBUaGVzZSB3aWxsIGJlIHJlZ2V4cHMsIGV4Y2VwdCBpbiB0aGUgY2FzZSBvZiBcIioqXCIsIHdoaWNoIGlzXG4gIC8vIHNldCB0byB0aGUgR0xPQlNUQVIgb2JqZWN0IGZvciBnbG9ic3RhciBiZWhhdmlvcixcbiAgLy8gYW5kIHdpbGwgbm90IGNvbnRhaW4gYW55IC8gY2hhcmFjdGVyc1xuICBzZXQgPSB0aGlzLmdsb2JQYXJ0cyA9IHNldC5tYXAoZnVuY3Rpb24gKHMpIHtcbiAgICByZXR1cm4gcy5zcGxpdChzbGFzaFNwbGl0KVxuICB9KVxuXG4gIHRoaXMuZGVidWcodGhpcy5wYXR0ZXJuLCBzZXQpXG5cbiAgLy8gZ2xvYiAtLT4gcmVnZXhwc1xuICBzZXQgPSBzZXQubWFwKGZ1bmN0aW9uIChzLCBzaSwgc2V0KSB7XG4gICAgcmV0dXJuIHMubWFwKHRoaXMucGFyc2UsIHRoaXMpXG4gIH0sIHRoaXMpXG5cbiAgdGhpcy5kZWJ1Zyh0aGlzLnBhdHRlcm4sIHNldClcblxuICAvLyBmaWx0ZXIgb3V0IGV2ZXJ5dGhpbmcgdGhhdCBkaWRuJ3QgY29tcGlsZSBwcm9wZXJseS5cbiAgc2V0ID0gc2V0LmZpbHRlcihmdW5jdGlvbiAocykge1xuICAgIHJldHVybiBzLmluZGV4T2YoZmFsc2UpID09PSAtMVxuICB9KVxuXG4gIHRoaXMuZGVidWcodGhpcy5wYXR0ZXJuLCBzZXQpXG5cbiAgdGhpcy5zZXQgPSBzZXRcbn1cblxuTWluaW1hdGNoLnByb3RvdHlwZS5wYXJzZU5lZ2F0ZSA9IHBhcnNlTmVnYXRlXG5mdW5jdGlvbiBwYXJzZU5lZ2F0ZSAoKSB7XG4gIHZhciBwYXR0ZXJuID0gdGhpcy5wYXR0ZXJuXG4gIHZhciBuZWdhdGUgPSBmYWxzZVxuICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9uc1xuICB2YXIgbmVnYXRlT2Zmc2V0ID0gMFxuXG4gIGlmIChvcHRpb25zLm5vbmVnYXRlKSByZXR1cm5cblxuICBmb3IgKHZhciBpID0gMCwgbCA9IHBhdHRlcm4ubGVuZ3RoXG4gICAgOyBpIDwgbCAmJiBwYXR0ZXJuLmNoYXJBdChpKSA9PT0gJyEnXG4gICAgOyBpKyspIHtcbiAgICBuZWdhdGUgPSAhbmVnYXRlXG4gICAgbmVnYXRlT2Zmc2V0KytcbiAgfVxuXG4gIGlmIChuZWdhdGVPZmZzZXQpIHRoaXMucGF0dGVybiA9IHBhdHRlcm4uc3Vic3RyKG5lZ2F0ZU9mZnNldClcbiAgdGhpcy5uZWdhdGUgPSBuZWdhdGVcbn1cblxuLy8gQnJhY2UgZXhwYW5zaW9uOlxuLy8gYXtiLGN9ZCAtPiBhYmQgYWNkXG4vLyBhe2IsfWMgLT4gYWJjIGFjXG4vLyBhezAuLjN9ZCAtPiBhMGQgYTFkIGEyZCBhM2Rcbi8vIGF7Yixje2QsZX1mfWcgLT4gYWJnIGFjZGZnIGFjZWZnXG4vLyBhe2IsY31ke2UsZn1nIC0+IGFiZGVnIGFjZGVnIGFiZGVnIGFiZGZnXG4vL1xuLy8gSW52YWxpZCBzZXRzIGFyZSBub3QgZXhwYW5kZWQuXG4vLyBhezIuLn1iIC0+IGF7Mi4ufWJcbi8vIGF7Yn1jIC0+IGF7Yn1jXG5taW5pbWF0Y2guYnJhY2VFeHBhbmQgPSBmdW5jdGlvbiAocGF0dGVybiwgb3B0aW9ucykge1xuICByZXR1cm4gYnJhY2VFeHBhbmQocGF0dGVybiwgb3B0aW9ucylcbn1cblxuTWluaW1hdGNoLnByb3RvdHlwZS5icmFjZUV4cGFuZCA9IGJyYWNlRXhwYW5kXG5cbmZ1bmN0aW9uIGJyYWNlRXhwYW5kIChwYXR0ZXJuLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIGlmICh0aGlzIGluc3RhbmNlb2YgTWluaW1hdGNoKSB7XG4gICAgICBvcHRpb25zID0gdGhpcy5vcHRpb25zXG4gICAgfSBlbHNlIHtcbiAgICAgIG9wdGlvbnMgPSB7fVxuICAgIH1cbiAgfVxuXG4gIHBhdHRlcm4gPSB0eXBlb2YgcGF0dGVybiA9PT0gJ3VuZGVmaW5lZCdcbiAgICA/IHRoaXMucGF0dGVybiA6IHBhdHRlcm5cblxuICBpZiAodHlwZW9mIHBhdHRlcm4gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcigndW5kZWZpbmVkIHBhdHRlcm4nKVxuICB9XG5cbiAgaWYgKG9wdGlvbnMubm9icmFjZSB8fFxuICAgICFwYXR0ZXJuLm1hdGNoKC9cXHsuKlxcfS8pKSB7XG4gICAgLy8gc2hvcnRjdXQuIG5vIG5lZWQgdG8gZXhwYW5kLlxuICAgIHJldHVybiBbcGF0dGVybl1cbiAgfVxuXG4gIHJldHVybiBleHBhbmQocGF0dGVybilcbn1cblxuLy8gcGFyc2UgYSBjb21wb25lbnQgb2YgdGhlIGV4cGFuZGVkIHNldC5cbi8vIEF0IHRoaXMgcG9pbnQsIG5vIHBhdHRlcm4gbWF5IGNvbnRhaW4gXCIvXCIgaW4gaXRcbi8vIHNvIHdlJ3JlIGdvaW5nIHRvIHJldHVybiBhIDJkIGFycmF5LCB3aGVyZSBlYWNoIGVudHJ5IGlzIHRoZSBmdWxsXG4vLyBwYXR0ZXJuLCBzcGxpdCBvbiAnLycsIGFuZCB0aGVuIHR1cm5lZCBpbnRvIGEgcmVndWxhciBleHByZXNzaW9uLlxuLy8gQSByZWdleHAgaXMgbWFkZSBhdCB0aGUgZW5kIHdoaWNoIGpvaW5zIGVhY2ggYXJyYXkgd2l0aCBhblxuLy8gZXNjYXBlZCAvLCBhbmQgYW5vdGhlciBmdWxsIG9uZSB3aGljaCBqb2lucyBlYWNoIHJlZ2V4cCB3aXRoIHwuXG4vL1xuLy8gRm9sbG93aW5nIHRoZSBsZWFkIG9mIEJhc2ggNC4xLCBub3RlIHRoYXQgXCIqKlwiIG9ubHkgaGFzIHNwZWNpYWwgbWVhbmluZ1xuLy8gd2hlbiBpdCBpcyB0aGUgKm9ubHkqIHRoaW5nIGluIGEgcGF0aCBwb3J0aW9uLiAgT3RoZXJ3aXNlLCBhbnkgc2VyaWVzXG4vLyBvZiAqIGlzIGVxdWl2YWxlbnQgdG8gYSBzaW5nbGUgKi4gIEdsb2JzdGFyIGJlaGF2aW9yIGlzIGVuYWJsZWQgYnlcbi8vIGRlZmF1bHQsIGFuZCBjYW4gYmUgZGlzYWJsZWQgYnkgc2V0dGluZyBvcHRpb25zLm5vZ2xvYnN0YXIuXG5NaW5pbWF0Y2gucHJvdG90eXBlLnBhcnNlID0gcGFyc2VcbnZhciBTVUJQQVJTRSA9IHt9XG5mdW5jdGlvbiBwYXJzZSAocGF0dGVybiwgaXNTdWIpIHtcbiAgaWYgKHBhdHRlcm4ubGVuZ3RoID4gMTAyNCAqIDY0KSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncGF0dGVybiBpcyB0b28gbG9uZycpXG4gIH1cblxuICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9uc1xuXG4gIC8vIHNob3J0Y3V0c1xuICBpZiAoIW9wdGlvbnMubm9nbG9ic3RhciAmJiBwYXR0ZXJuID09PSAnKionKSByZXR1cm4gR0xPQlNUQVJcbiAgaWYgKHBhdHRlcm4gPT09ICcnKSByZXR1cm4gJydcblxuICB2YXIgcmUgPSAnJ1xuICB2YXIgaGFzTWFnaWMgPSAhIW9wdGlvbnMubm9jYXNlXG4gIHZhciBlc2NhcGluZyA9IGZhbHNlXG4gIC8vID8gPT4gb25lIHNpbmdsZSBjaGFyYWN0ZXJcbiAgdmFyIHBhdHRlcm5MaXN0U3RhY2sgPSBbXVxuICB2YXIgbmVnYXRpdmVMaXN0cyA9IFtdXG4gIHZhciBzdGF0ZUNoYXJcbiAgdmFyIGluQ2xhc3MgPSBmYWxzZVxuICB2YXIgcmVDbGFzc1N0YXJ0ID0gLTFcbiAgdmFyIGNsYXNzU3RhcnQgPSAtMVxuICAvLyAuIGFuZCAuLiBuZXZlciBtYXRjaCBhbnl0aGluZyB0aGF0IGRvZXNuJ3Qgc3RhcnQgd2l0aCAuLFxuICAvLyBldmVuIHdoZW4gb3B0aW9ucy5kb3QgaXMgc2V0LlxuICB2YXIgcGF0dGVyblN0YXJ0ID0gcGF0dGVybi5jaGFyQXQoMCkgPT09ICcuJyA/ICcnIC8vIGFueXRoaW5nXG4gIC8vIG5vdCAoc3RhcnQgb3IgLyBmb2xsb3dlZCBieSAuIG9yIC4uIGZvbGxvd2VkIGJ5IC8gb3IgZW5kKVxuICA6IG9wdGlvbnMuZG90ID8gJyg/ISg/Ol58XFxcXFxcLylcXFxcLnsxLDJ9KD86JHxcXFxcXFwvKSknXG4gIDogJyg/IVxcXFwuKSdcbiAgdmFyIHNlbGYgPSB0aGlzXG5cbiAgZnVuY3Rpb24gY2xlYXJTdGF0ZUNoYXIgKCkge1xuICAgIGlmIChzdGF0ZUNoYXIpIHtcbiAgICAgIC8vIHdlIGhhZCBzb21lIHN0YXRlLXRyYWNraW5nIGNoYXJhY3RlclxuICAgICAgLy8gdGhhdCB3YXNuJ3QgY29uc3VtZWQgYnkgdGhpcyBwYXNzLlxuICAgICAgc3dpdGNoIChzdGF0ZUNoYXIpIHtcbiAgICAgICAgY2FzZSAnKic6XG4gICAgICAgICAgcmUgKz0gc3RhclxuICAgICAgICAgIGhhc01hZ2ljID0gdHJ1ZVxuICAgICAgICBicmVha1xuICAgICAgICBjYXNlICc/JzpcbiAgICAgICAgICByZSArPSBxbWFya1xuICAgICAgICAgIGhhc01hZ2ljID0gdHJ1ZVxuICAgICAgICBicmVha1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJlICs9ICdcXFxcJyArIHN0YXRlQ2hhclxuICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgc2VsZi5kZWJ1ZygnY2xlYXJTdGF0ZUNoYXIgJWogJWonLCBzdGF0ZUNoYXIsIHJlKVxuICAgICAgc3RhdGVDaGFyID0gZmFsc2VcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gcGF0dGVybi5sZW5ndGgsIGNcbiAgICA7IChpIDwgbGVuKSAmJiAoYyA9IHBhdHRlcm4uY2hhckF0KGkpKVxuICAgIDsgaSsrKSB7XG4gICAgdGhpcy5kZWJ1ZygnJXNcXHQlcyAlcyAlaicsIHBhdHRlcm4sIGksIHJlLCBjKVxuXG4gICAgLy8gc2tpcCBvdmVyIGFueSB0aGF0IGFyZSBlc2NhcGVkLlxuICAgIGlmIChlc2NhcGluZyAmJiByZVNwZWNpYWxzW2NdKSB7XG4gICAgICByZSArPSAnXFxcXCcgKyBjXG4gICAgICBlc2NhcGluZyA9IGZhbHNlXG4gICAgICBjb250aW51ZVxuICAgIH1cblxuICAgIHN3aXRjaCAoYykge1xuICAgICAgY2FzZSAnLyc6XG4gICAgICAgIC8vIGNvbXBsZXRlbHkgbm90IGFsbG93ZWQsIGV2ZW4gZXNjYXBlZC5cbiAgICAgICAgLy8gU2hvdWxkIGFscmVhZHkgYmUgcGF0aC1zcGxpdCBieSBub3cuXG4gICAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgICBjYXNlICdcXFxcJzpcbiAgICAgICAgY2xlYXJTdGF0ZUNoYXIoKVxuICAgICAgICBlc2NhcGluZyA9IHRydWVcbiAgICAgIGNvbnRpbnVlXG5cbiAgICAgIC8vIHRoZSB2YXJpb3VzIHN0YXRlQ2hhciB2YWx1ZXNcbiAgICAgIC8vIGZvciB0aGUgXCJleHRnbG9iXCIgc3R1ZmYuXG4gICAgICBjYXNlICc/JzpcbiAgICAgIGNhc2UgJyonOlxuICAgICAgY2FzZSAnKyc6XG4gICAgICBjYXNlICdAJzpcbiAgICAgIGNhc2UgJyEnOlxuICAgICAgICB0aGlzLmRlYnVnKCclc1xcdCVzICVzICVqIDwtLSBzdGF0ZUNoYXInLCBwYXR0ZXJuLCBpLCByZSwgYylcblxuICAgICAgICAvLyBhbGwgb2YgdGhvc2UgYXJlIGxpdGVyYWxzIGluc2lkZSBhIGNsYXNzLCBleGNlcHQgdGhhdFxuICAgICAgICAvLyB0aGUgZ2xvYiBbIWFdIG1lYW5zIFteYV0gaW4gcmVnZXhwXG4gICAgICAgIGlmIChpbkNsYXNzKSB7XG4gICAgICAgICAgdGhpcy5kZWJ1ZygnICBpbiBjbGFzcycpXG4gICAgICAgICAgaWYgKGMgPT09ICchJyAmJiBpID09PSBjbGFzc1N0YXJ0ICsgMSkgYyA9ICdeJ1xuICAgICAgICAgIHJlICs9IGNcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgd2UgYWxyZWFkeSBoYXZlIGEgc3RhdGVDaGFyLCB0aGVuIGl0IG1lYW5zXG4gICAgICAgIC8vIHRoYXQgdGhlcmUgd2FzIHNvbWV0aGluZyBsaWtlICoqIG9yICs/IGluIHRoZXJlLlxuICAgICAgICAvLyBIYW5kbGUgdGhlIHN0YXRlQ2hhciwgdGhlbiBwcm9jZWVkIHdpdGggdGhpcyBvbmUuXG4gICAgICAgIHNlbGYuZGVidWcoJ2NhbGwgY2xlYXJTdGF0ZUNoYXIgJWonLCBzdGF0ZUNoYXIpXG4gICAgICAgIGNsZWFyU3RhdGVDaGFyKClcbiAgICAgICAgc3RhdGVDaGFyID0gY1xuICAgICAgICAvLyBpZiBleHRnbG9iIGlzIGRpc2FibGVkLCB0aGVuICsoYXNkZnxmb28pIGlzbid0IGEgdGhpbmcuXG4gICAgICAgIC8vIGp1c3QgY2xlYXIgdGhlIHN0YXRlY2hhciAqbm93KiwgcmF0aGVyIHRoYW4gZXZlbiBkaXZpbmcgaW50b1xuICAgICAgICAvLyB0aGUgcGF0dGVybkxpc3Qgc3R1ZmYuXG4gICAgICAgIGlmIChvcHRpb25zLm5vZXh0KSBjbGVhclN0YXRlQ2hhcigpXG4gICAgICBjb250aW51ZVxuXG4gICAgICBjYXNlICcoJzpcbiAgICAgICAgaWYgKGluQ2xhc3MpIHtcbiAgICAgICAgICByZSArPSAnKCdcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFzdGF0ZUNoYXIpIHtcbiAgICAgICAgICByZSArPSAnXFxcXCgnXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIHBhdHRlcm5MaXN0U3RhY2sucHVzaCh7XG4gICAgICAgICAgdHlwZTogc3RhdGVDaGFyLFxuICAgICAgICAgIHN0YXJ0OiBpIC0gMSxcbiAgICAgICAgICByZVN0YXJ0OiByZS5sZW5ndGgsXG4gICAgICAgICAgb3BlbjogcGxUeXBlc1tzdGF0ZUNoYXJdLm9wZW4sXG4gICAgICAgICAgY2xvc2U6IHBsVHlwZXNbc3RhdGVDaGFyXS5jbG9zZVxuICAgICAgICB9KVxuICAgICAgICAvLyBuZWdhdGlvbiBpcyAoPzooPyFqcylbXi9dKilcbiAgICAgICAgcmUgKz0gc3RhdGVDaGFyID09PSAnIScgPyAnKD86KD8hKD86JyA6ICcoPzonXG4gICAgICAgIHRoaXMuZGVidWcoJ3BsVHlwZSAlaiAlaicsIHN0YXRlQ2hhciwgcmUpXG4gICAgICAgIHN0YXRlQ2hhciA9IGZhbHNlXG4gICAgICBjb250aW51ZVxuXG4gICAgICBjYXNlICcpJzpcbiAgICAgICAgaWYgKGluQ2xhc3MgfHwgIXBhdHRlcm5MaXN0U3RhY2subGVuZ3RoKSB7XG4gICAgICAgICAgcmUgKz0gJ1xcXFwpJ1xuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICBjbGVhclN0YXRlQ2hhcigpXG4gICAgICAgIGhhc01hZ2ljID0gdHJ1ZVxuICAgICAgICB2YXIgcGwgPSBwYXR0ZXJuTGlzdFN0YWNrLnBvcCgpXG4gICAgICAgIC8vIG5lZ2F0aW9uIGlzICg/Oig/IWpzKVteL10qKVxuICAgICAgICAvLyBUaGUgb3RoZXJzIGFyZSAoPzo8cGF0dGVybj4pPHR5cGU+XG4gICAgICAgIHJlICs9IHBsLmNsb3NlXG4gICAgICAgIGlmIChwbC50eXBlID09PSAnIScpIHtcbiAgICAgICAgICBuZWdhdGl2ZUxpc3RzLnB1c2gocGwpXG4gICAgICAgIH1cbiAgICAgICAgcGwucmVFbmQgPSByZS5sZW5ndGhcbiAgICAgIGNvbnRpbnVlXG5cbiAgICAgIGNhc2UgJ3wnOlxuICAgICAgICBpZiAoaW5DbGFzcyB8fCAhcGF0dGVybkxpc3RTdGFjay5sZW5ndGggfHwgZXNjYXBpbmcpIHtcbiAgICAgICAgICByZSArPSAnXFxcXHwnXG4gICAgICAgICAgZXNjYXBpbmcgPSBmYWxzZVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICBjbGVhclN0YXRlQ2hhcigpXG4gICAgICAgIHJlICs9ICd8J1xuICAgICAgY29udGludWVcblxuICAgICAgLy8gdGhlc2UgYXJlIG1vc3RseSB0aGUgc2FtZSBpbiByZWdleHAgYW5kIGdsb2JcbiAgICAgIGNhc2UgJ1snOlxuICAgICAgICAvLyBzd2FsbG93IGFueSBzdGF0ZS10cmFja2luZyBjaGFyIGJlZm9yZSB0aGUgW1xuICAgICAgICBjbGVhclN0YXRlQ2hhcigpXG5cbiAgICAgICAgaWYgKGluQ2xhc3MpIHtcbiAgICAgICAgICByZSArPSAnXFxcXCcgKyBjXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIGluQ2xhc3MgPSB0cnVlXG4gICAgICAgIGNsYXNzU3RhcnQgPSBpXG4gICAgICAgIHJlQ2xhc3NTdGFydCA9IHJlLmxlbmd0aFxuICAgICAgICByZSArPSBjXG4gICAgICBjb250aW51ZVxuXG4gICAgICBjYXNlICddJzpcbiAgICAgICAgLy8gIGEgcmlnaHQgYnJhY2tldCBzaGFsbCBsb3NlIGl0cyBzcGVjaWFsXG4gICAgICAgIC8vICBtZWFuaW5nIGFuZCByZXByZXNlbnQgaXRzZWxmIGluXG4gICAgICAgIC8vICBhIGJyYWNrZXQgZXhwcmVzc2lvbiBpZiBpdCBvY2N1cnNcbiAgICAgICAgLy8gIGZpcnN0IGluIHRoZSBsaXN0LiAgLS0gUE9TSVguMiAyLjguMy4yXG4gICAgICAgIGlmIChpID09PSBjbGFzc1N0YXJ0ICsgMSB8fCAhaW5DbGFzcykge1xuICAgICAgICAgIHJlICs9ICdcXFxcJyArIGNcbiAgICAgICAgICBlc2NhcGluZyA9IGZhbHNlXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGhhbmRsZSB0aGUgY2FzZSB3aGVyZSB3ZSBsZWZ0IGEgY2xhc3Mgb3Blbi5cbiAgICAgICAgLy8gXCJbei1hXVwiIGlzIHZhbGlkLCBlcXVpdmFsZW50IHRvIFwiXFxbei1hXFxdXCJcbiAgICAgICAgaWYgKGluQ2xhc3MpIHtcbiAgICAgICAgICAvLyBzcGxpdCB3aGVyZSB0aGUgbGFzdCBbIHdhcywgbWFrZSBzdXJlIHdlIGRvbid0IGhhdmVcbiAgICAgICAgICAvLyBhbiBpbnZhbGlkIHJlLiBpZiBzbywgcmUtd2FsayB0aGUgY29udGVudHMgb2YgdGhlXG4gICAgICAgICAgLy8gd291bGQtYmUgY2xhc3MgdG8gcmUtdHJhbnNsYXRlIGFueSBjaGFyYWN0ZXJzIHRoYXRcbiAgICAgICAgICAvLyB3ZXJlIHBhc3NlZCB0aHJvdWdoIGFzLWlzXG4gICAgICAgICAgLy8gVE9ETzogSXQgd291bGQgcHJvYmFibHkgYmUgZmFzdGVyIHRvIGRldGVybWluZSB0aGlzXG4gICAgICAgICAgLy8gd2l0aG91dCBhIHRyeS9jYXRjaCBhbmQgYSBuZXcgUmVnRXhwLCBidXQgaXQncyB0cmlja3lcbiAgICAgICAgICAvLyB0byBkbyBzYWZlbHkuICBGb3Igbm93LCB0aGlzIGlzIHNhZmUgYW5kIHdvcmtzLlxuICAgICAgICAgIHZhciBjcyA9IHBhdHRlcm4uc3Vic3RyaW5nKGNsYXNzU3RhcnQgKyAxLCBpKVxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBSZWdFeHAoJ1snICsgY3MgKyAnXScpXG4gICAgICAgICAgfSBjYXRjaCAoZXIpIHtcbiAgICAgICAgICAgIC8vIG5vdCBhIHZhbGlkIGNsYXNzIVxuICAgICAgICAgICAgdmFyIHNwID0gdGhpcy5wYXJzZShjcywgU1VCUEFSU0UpXG4gICAgICAgICAgICByZSA9IHJlLnN1YnN0cigwLCByZUNsYXNzU3RhcnQpICsgJ1xcXFxbJyArIHNwWzBdICsgJ1xcXFxdJ1xuICAgICAgICAgICAgaGFzTWFnaWMgPSBoYXNNYWdpYyB8fCBzcFsxXVxuICAgICAgICAgICAgaW5DbGFzcyA9IGZhbHNlXG4gICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZpbmlzaCB1cCB0aGUgY2xhc3MuXG4gICAgICAgIGhhc01hZ2ljID0gdHJ1ZVxuICAgICAgICBpbkNsYXNzID0gZmFsc2VcbiAgICAgICAgcmUgKz0gY1xuICAgICAgY29udGludWVcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgLy8gc3dhbGxvdyBhbnkgc3RhdGUgY2hhciB0aGF0IHdhc24ndCBjb25zdW1lZFxuICAgICAgICBjbGVhclN0YXRlQ2hhcigpXG5cbiAgICAgICAgaWYgKGVzY2FwaW5nKSB7XG4gICAgICAgICAgLy8gbm8gbmVlZFxuICAgICAgICAgIGVzY2FwaW5nID0gZmFsc2VcbiAgICAgICAgfSBlbHNlIGlmIChyZVNwZWNpYWxzW2NdXG4gICAgICAgICAgJiYgIShjID09PSAnXicgJiYgaW5DbGFzcykpIHtcbiAgICAgICAgICByZSArPSAnXFxcXCdcbiAgICAgICAgfVxuXG4gICAgICAgIHJlICs9IGNcblxuICAgIH0gLy8gc3dpdGNoXG4gIH0gLy8gZm9yXG5cbiAgLy8gaGFuZGxlIHRoZSBjYXNlIHdoZXJlIHdlIGxlZnQgYSBjbGFzcyBvcGVuLlxuICAvLyBcIlthYmNcIiBpcyB2YWxpZCwgZXF1aXZhbGVudCB0byBcIlxcW2FiY1wiXG4gIGlmIChpbkNsYXNzKSB7XG4gICAgLy8gc3BsaXQgd2hlcmUgdGhlIGxhc3QgWyB3YXMsIGFuZCBlc2NhcGUgaXRcbiAgICAvLyB0aGlzIGlzIGEgaHVnZSBwaXRhLiAgV2Ugbm93IGhhdmUgdG8gcmUtd2Fsa1xuICAgIC8vIHRoZSBjb250ZW50cyBvZiB0aGUgd291bGQtYmUgY2xhc3MgdG8gcmUtdHJhbnNsYXRlXG4gICAgLy8gYW55IGNoYXJhY3RlcnMgdGhhdCB3ZXJlIHBhc3NlZCB0aHJvdWdoIGFzLWlzXG4gICAgY3MgPSBwYXR0ZXJuLnN1YnN0cihjbGFzc1N0YXJ0ICsgMSlcbiAgICBzcCA9IHRoaXMucGFyc2UoY3MsIFNVQlBBUlNFKVxuICAgIHJlID0gcmUuc3Vic3RyKDAsIHJlQ2xhc3NTdGFydCkgKyAnXFxcXFsnICsgc3BbMF1cbiAgICBoYXNNYWdpYyA9IGhhc01hZ2ljIHx8IHNwWzFdXG4gIH1cblxuICAvLyBoYW5kbGUgdGhlIGNhc2Ugd2hlcmUgd2UgaGFkIGEgKyggdGhpbmcgYXQgdGhlICplbmQqXG4gIC8vIG9mIHRoZSBwYXR0ZXJuLlxuICAvLyBlYWNoIHBhdHRlcm4gbGlzdCBzdGFjayBhZGRzIDMgY2hhcnMsIGFuZCB3ZSBuZWVkIHRvIGdvIHRocm91Z2hcbiAgLy8gYW5kIGVzY2FwZSBhbnkgfCBjaGFycyB0aGF0IHdlcmUgcGFzc2VkIHRocm91Z2ggYXMtaXMgZm9yIHRoZSByZWdleHAuXG4gIC8vIEdvIHRocm91Z2ggYW5kIGVzY2FwZSB0aGVtLCB0YWtpbmcgY2FyZSBub3QgdG8gZG91YmxlLWVzY2FwZSBhbnlcbiAgLy8gfCBjaGFycyB0aGF0IHdlcmUgYWxyZWFkeSBlc2NhcGVkLlxuICBmb3IgKHBsID0gcGF0dGVybkxpc3RTdGFjay5wb3AoKTsgcGw7IHBsID0gcGF0dGVybkxpc3RTdGFjay5wb3AoKSkge1xuICAgIHZhciB0YWlsID0gcmUuc2xpY2UocGwucmVTdGFydCArIHBsLm9wZW4ubGVuZ3RoKVxuICAgIHRoaXMuZGVidWcoJ3NldHRpbmcgdGFpbCcsIHJlLCBwbClcbiAgICAvLyBtYXliZSBzb21lIGV2ZW4gbnVtYmVyIG9mIFxcLCB0aGVuIG1heWJlIDEgXFwsIGZvbGxvd2VkIGJ5IGEgfFxuICAgIHRhaWwgPSB0YWlsLnJlcGxhY2UoLygoPzpcXFxcezJ9KXswLDY0fSkoXFxcXD8pXFx8L2csIGZ1bmN0aW9uIChfLCAkMSwgJDIpIHtcbiAgICAgIGlmICghJDIpIHtcbiAgICAgICAgLy8gdGhlIHwgaXNuJ3QgYWxyZWFkeSBlc2NhcGVkLCBzbyBlc2NhcGUgaXQuXG4gICAgICAgICQyID0gJ1xcXFwnXG4gICAgICB9XG5cbiAgICAgIC8vIG5lZWQgdG8gZXNjYXBlIGFsbCB0aG9zZSBzbGFzaGVzICphZ2FpbiosIHdpdGhvdXQgZXNjYXBpbmcgdGhlXG4gICAgICAvLyBvbmUgdGhhdCB3ZSBuZWVkIGZvciBlc2NhcGluZyB0aGUgfCBjaGFyYWN0ZXIuICBBcyBpdCB3b3JrcyBvdXQsXG4gICAgICAvLyBlc2NhcGluZyBhbiBldmVuIG51bWJlciBvZiBzbGFzaGVzIGNhbiBiZSBkb25lIGJ5IHNpbXBseSByZXBlYXRpbmdcbiAgICAgIC8vIGl0IGV4YWN0bHkgYWZ0ZXIgaXRzZWxmLiAgVGhhdCdzIHdoeSB0aGlzIHRyaWNrIHdvcmtzLlxuICAgICAgLy9cbiAgICAgIC8vIEkgYW0gc29ycnkgdGhhdCB5b3UgaGF2ZSB0byBzZWUgdGhpcy5cbiAgICAgIHJldHVybiAkMSArICQxICsgJDIgKyAnfCdcbiAgICB9KVxuXG4gICAgdGhpcy5kZWJ1ZygndGFpbD0lalxcbiAgICVzJywgdGFpbCwgdGFpbCwgcGwsIHJlKVxuICAgIHZhciB0ID0gcGwudHlwZSA9PT0gJyonID8gc3RhclxuICAgICAgOiBwbC50eXBlID09PSAnPycgPyBxbWFya1xuICAgICAgOiAnXFxcXCcgKyBwbC50eXBlXG5cbiAgICBoYXNNYWdpYyA9IHRydWVcbiAgICByZSA9IHJlLnNsaWNlKDAsIHBsLnJlU3RhcnQpICsgdCArICdcXFxcKCcgKyB0YWlsXG4gIH1cblxuICAvLyBoYW5kbGUgdHJhaWxpbmcgdGhpbmdzIHRoYXQgb25seSBtYXR0ZXIgYXQgdGhlIHZlcnkgZW5kLlxuICBjbGVhclN0YXRlQ2hhcigpXG4gIGlmIChlc2NhcGluZykge1xuICAgIC8vIHRyYWlsaW5nIFxcXFxcbiAgICByZSArPSAnXFxcXFxcXFwnXG4gIH1cblxuICAvLyBvbmx5IG5lZWQgdG8gYXBwbHkgdGhlIG5vZG90IHN0YXJ0IGlmIHRoZSByZSBzdGFydHMgd2l0aFxuICAvLyBzb21ldGhpbmcgdGhhdCBjb3VsZCBjb25jZWl2YWJseSBjYXB0dXJlIGEgZG90XG4gIHZhciBhZGRQYXR0ZXJuU3RhcnQgPSBmYWxzZVxuICBzd2l0Y2ggKHJlLmNoYXJBdCgwKSkge1xuICAgIGNhc2UgJy4nOlxuICAgIGNhc2UgJ1snOlxuICAgIGNhc2UgJygnOiBhZGRQYXR0ZXJuU3RhcnQgPSB0cnVlXG4gIH1cblxuICAvLyBIYWNrIHRvIHdvcmsgYXJvdW5kIGxhY2sgb2YgbmVnYXRpdmUgbG9va2JlaGluZCBpbiBKU1xuICAvLyBBIHBhdHRlcm4gbGlrZTogKi4hKHgpLiEoeXx6KSBuZWVkcyB0byBlbnN1cmUgdGhhdCBhIG5hbWVcbiAgLy8gbGlrZSAnYS54eXoueXonIGRvZXNuJ3QgbWF0Y2guICBTbywgdGhlIGZpcnN0IG5lZ2F0aXZlXG4gIC8vIGxvb2thaGVhZCwgaGFzIHRvIGxvb2sgQUxMIHRoZSB3YXkgYWhlYWQsIHRvIHRoZSBlbmQgb2ZcbiAgLy8gdGhlIHBhdHRlcm4uXG4gIGZvciAodmFyIG4gPSBuZWdhdGl2ZUxpc3RzLmxlbmd0aCAtIDE7IG4gPiAtMTsgbi0tKSB7XG4gICAgdmFyIG5sID0gbmVnYXRpdmVMaXN0c1tuXVxuXG4gICAgdmFyIG5sQmVmb3JlID0gcmUuc2xpY2UoMCwgbmwucmVTdGFydClcbiAgICB2YXIgbmxGaXJzdCA9IHJlLnNsaWNlKG5sLnJlU3RhcnQsIG5sLnJlRW5kIC0gOClcbiAgICB2YXIgbmxMYXN0ID0gcmUuc2xpY2UobmwucmVFbmQgLSA4LCBubC5yZUVuZClcbiAgICB2YXIgbmxBZnRlciA9IHJlLnNsaWNlKG5sLnJlRW5kKVxuXG4gICAgbmxMYXN0ICs9IG5sQWZ0ZXJcblxuICAgIC8vIEhhbmRsZSBuZXN0ZWQgc3R1ZmYgbGlrZSAqKCouanN8ISgqLmpzb24pKSwgd2hlcmUgb3BlbiBwYXJlbnNcbiAgICAvLyBtZWFuIHRoYXQgd2Ugc2hvdWxkICpub3QqIGluY2x1ZGUgdGhlICkgaW4gdGhlIGJpdCB0aGF0IGlzIGNvbnNpZGVyZWRcbiAgICAvLyBcImFmdGVyXCIgdGhlIG5lZ2F0ZWQgc2VjdGlvbi5cbiAgICB2YXIgb3BlblBhcmVuc0JlZm9yZSA9IG5sQmVmb3JlLnNwbGl0KCcoJykubGVuZ3RoIC0gMVxuICAgIHZhciBjbGVhbkFmdGVyID0gbmxBZnRlclxuICAgIGZvciAoaSA9IDA7IGkgPCBvcGVuUGFyZW5zQmVmb3JlOyBpKyspIHtcbiAgICAgIGNsZWFuQWZ0ZXIgPSBjbGVhbkFmdGVyLnJlcGxhY2UoL1xcKVsrKj9dPy8sICcnKVxuICAgIH1cbiAgICBubEFmdGVyID0gY2xlYW5BZnRlclxuXG4gICAgdmFyIGRvbGxhciA9ICcnXG4gICAgaWYgKG5sQWZ0ZXIgPT09ICcnICYmIGlzU3ViICE9PSBTVUJQQVJTRSkge1xuICAgICAgZG9sbGFyID0gJyQnXG4gICAgfVxuICAgIHZhciBuZXdSZSA9IG5sQmVmb3JlICsgbmxGaXJzdCArIG5sQWZ0ZXIgKyBkb2xsYXIgKyBubExhc3RcbiAgICByZSA9IG5ld1JlXG4gIH1cblxuICAvLyBpZiB0aGUgcmUgaXMgbm90IFwiXCIgYXQgdGhpcyBwb2ludCwgdGhlbiB3ZSBuZWVkIHRvIG1ha2Ugc3VyZVxuICAvLyBpdCBkb2Vzbid0IG1hdGNoIGFnYWluc3QgYW4gZW1wdHkgcGF0aCBwYXJ0LlxuICAvLyBPdGhlcndpc2UgYS8qIHdpbGwgbWF0Y2ggYS8sIHdoaWNoIGl0IHNob3VsZCBub3QuXG4gIGlmIChyZSAhPT0gJycgJiYgaGFzTWFnaWMpIHtcbiAgICByZSA9ICcoPz0uKScgKyByZVxuICB9XG5cbiAgaWYgKGFkZFBhdHRlcm5TdGFydCkge1xuICAgIHJlID0gcGF0dGVyblN0YXJ0ICsgcmVcbiAgfVxuXG4gIC8vIHBhcnNpbmcganVzdCBhIHBpZWNlIG9mIGEgbGFyZ2VyIHBhdHRlcm4uXG4gIGlmIChpc1N1YiA9PT0gU1VCUEFSU0UpIHtcbiAgICByZXR1cm4gW3JlLCBoYXNNYWdpY11cbiAgfVxuXG4gIC8vIHNraXAgdGhlIHJlZ2V4cCBmb3Igbm9uLW1hZ2ljYWwgcGF0dGVybnNcbiAgLy8gdW5lc2NhcGUgYW55dGhpbmcgaW4gaXQsIHRob3VnaCwgc28gdGhhdCBpdCdsbCBiZVxuICAvLyBhbiBleGFjdCBtYXRjaCBhZ2FpbnN0IGEgZmlsZSBldGMuXG4gIGlmICghaGFzTWFnaWMpIHtcbiAgICByZXR1cm4gZ2xvYlVuZXNjYXBlKHBhdHRlcm4pXG4gIH1cblxuICB2YXIgZmxhZ3MgPSBvcHRpb25zLm5vY2FzZSA/ICdpJyA6ICcnXG4gIHRyeSB7XG4gICAgdmFyIHJlZ0V4cCA9IG5ldyBSZWdFeHAoJ14nICsgcmUgKyAnJCcsIGZsYWdzKVxuICB9IGNhdGNoIChlcikge1xuICAgIC8vIElmIGl0IHdhcyBhbiBpbnZhbGlkIHJlZ3VsYXIgZXhwcmVzc2lvbiwgdGhlbiBpdCBjYW4ndCBtYXRjaFxuICAgIC8vIGFueXRoaW5nLiAgVGhpcyB0cmljayBsb29rcyBmb3IgYSBjaGFyYWN0ZXIgYWZ0ZXIgdGhlIGVuZCBvZlxuICAgIC8vIHRoZSBzdHJpbmcsIHdoaWNoIGlzIG9mIGNvdXJzZSBpbXBvc3NpYmxlLCBleGNlcHQgaW4gbXVsdGktbGluZVxuICAgIC8vIG1vZGUsIGJ1dCBpdCdzIG5vdCBhIC9tIHJlZ2V4LlxuICAgIHJldHVybiBuZXcgUmVnRXhwKCckLicpXG4gIH1cblxuICByZWdFeHAuX2dsb2IgPSBwYXR0ZXJuXG4gIHJlZ0V4cC5fc3JjID0gcmVcblxuICByZXR1cm4gcmVnRXhwXG59XG5cbm1pbmltYXRjaC5tYWtlUmUgPSBmdW5jdGlvbiAocGF0dGVybiwgb3B0aW9ucykge1xuICByZXR1cm4gbmV3IE1pbmltYXRjaChwYXR0ZXJuLCBvcHRpb25zIHx8IHt9KS5tYWtlUmUoKVxufVxuXG5NaW5pbWF0Y2gucHJvdG90eXBlLm1ha2VSZSA9IG1ha2VSZVxuZnVuY3Rpb24gbWFrZVJlICgpIHtcbiAgaWYgKHRoaXMucmVnZXhwIHx8IHRoaXMucmVnZXhwID09PSBmYWxzZSkgcmV0dXJuIHRoaXMucmVnZXhwXG5cbiAgLy8gYXQgdGhpcyBwb2ludCwgdGhpcy5zZXQgaXMgYSAyZCBhcnJheSBvZiBwYXJ0aWFsXG4gIC8vIHBhdHRlcm4gc3RyaW5ncywgb3IgXCIqKlwiLlxuICAvL1xuICAvLyBJdCdzIGJldHRlciB0byB1c2UgLm1hdGNoKCkuICBUaGlzIGZ1bmN0aW9uIHNob3VsZG4ndFxuICAvLyBiZSB1c2VkLCByZWFsbHksIGJ1dCBpdCdzIHByZXR0eSBjb252ZW5pZW50IHNvbWV0aW1lcyxcbiAgLy8gd2hlbiB5b3UganVzdCB3YW50IHRvIHdvcmsgd2l0aCBhIHJlZ2V4LlxuICB2YXIgc2V0ID0gdGhpcy5zZXRcblxuICBpZiAoIXNldC5sZW5ndGgpIHtcbiAgICB0aGlzLnJlZ2V4cCA9IGZhbHNlXG4gICAgcmV0dXJuIHRoaXMucmVnZXhwXG4gIH1cbiAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnNcblxuICB2YXIgdHdvU3RhciA9IG9wdGlvbnMubm9nbG9ic3RhciA/IHN0YXJcbiAgICA6IG9wdGlvbnMuZG90ID8gdHdvU3RhckRvdFxuICAgIDogdHdvU3Rhck5vRG90XG4gIHZhciBmbGFncyA9IG9wdGlvbnMubm9jYXNlID8gJ2knIDogJydcblxuICB2YXIgcmUgPSBzZXQubWFwKGZ1bmN0aW9uIChwYXR0ZXJuKSB7XG4gICAgcmV0dXJuIHBhdHRlcm4ubWFwKGZ1bmN0aW9uIChwKSB7XG4gICAgICByZXR1cm4gKHAgPT09IEdMT0JTVEFSKSA/IHR3b1N0YXJcbiAgICAgIDogKHR5cGVvZiBwID09PSAnc3RyaW5nJykgPyByZWdFeHBFc2NhcGUocClcbiAgICAgIDogcC5fc3JjXG4gICAgfSkuam9pbignXFxcXFxcLycpXG4gIH0pLmpvaW4oJ3wnKVxuXG4gIC8vIG11c3QgbWF0Y2ggZW50aXJlIHBhdHRlcm5cbiAgLy8gZW5kaW5nIGluIGEgKiBvciAqKiB3aWxsIG1ha2UgaXQgbGVzcyBzdHJpY3QuXG4gIHJlID0gJ14oPzonICsgcmUgKyAnKSQnXG5cbiAgLy8gY2FuIG1hdGNoIGFueXRoaW5nLCBhcyBsb25nIGFzIGl0J3Mgbm90IHRoaXMuXG4gIGlmICh0aGlzLm5lZ2F0ZSkgcmUgPSAnXig/IScgKyByZSArICcpLiokJ1xuXG4gIHRyeSB7XG4gICAgdGhpcy5yZWdleHAgPSBuZXcgUmVnRXhwKHJlLCBmbGFncylcbiAgfSBjYXRjaCAoZXgpIHtcbiAgICB0aGlzLnJlZ2V4cCA9IGZhbHNlXG4gIH1cbiAgcmV0dXJuIHRoaXMucmVnZXhwXG59XG5cbm1pbmltYXRjaC5tYXRjaCA9IGZ1bmN0aW9uIChsaXN0LCBwYXR0ZXJuLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gIHZhciBtbSA9IG5ldyBNaW5pbWF0Y2gocGF0dGVybiwgb3B0aW9ucylcbiAgbGlzdCA9IGxpc3QuZmlsdGVyKGZ1bmN0aW9uIChmKSB7XG4gICAgcmV0dXJuIG1tLm1hdGNoKGYpXG4gIH0pXG4gIGlmIChtbS5vcHRpb25zLm5vbnVsbCAmJiAhbGlzdC5sZW5ndGgpIHtcbiAgICBsaXN0LnB1c2gocGF0dGVybilcbiAgfVxuICByZXR1cm4gbGlzdFxufVxuXG5NaW5pbWF0Y2gucHJvdG90eXBlLm1hdGNoID0gbWF0Y2hcbmZ1bmN0aW9uIG1hdGNoIChmLCBwYXJ0aWFsKSB7XG4gIHRoaXMuZGVidWcoJ21hdGNoJywgZiwgdGhpcy5wYXR0ZXJuKVxuICAvLyBzaG9ydC1jaXJjdWl0IGluIHRoZSBjYXNlIG9mIGJ1c3RlZCB0aGluZ3MuXG4gIC8vIGNvbW1lbnRzLCBldGMuXG4gIGlmICh0aGlzLmNvbW1lbnQpIHJldHVybiBmYWxzZVxuICBpZiAodGhpcy5lbXB0eSkgcmV0dXJuIGYgPT09ICcnXG5cbiAgaWYgKGYgPT09ICcvJyAmJiBwYXJ0aWFsKSByZXR1cm4gdHJ1ZVxuXG4gIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zXG5cbiAgLy8gd2luZG93czogbmVlZCB0byB1c2UgLywgbm90IFxcXG4gIGlmIChwYXRoLnNlcCAhPT0gJy8nKSB7XG4gICAgZiA9IGYuc3BsaXQocGF0aC5zZXApLmpvaW4oJy8nKVxuICB9XG5cbiAgLy8gdHJlYXQgdGhlIHRlc3QgcGF0aCBhcyBhIHNldCBvZiBwYXRocGFydHMuXG4gIGYgPSBmLnNwbGl0KHNsYXNoU3BsaXQpXG4gIHRoaXMuZGVidWcodGhpcy5wYXR0ZXJuLCAnc3BsaXQnLCBmKVxuXG4gIC8vIGp1c3QgT05FIG9mIHRoZSBwYXR0ZXJuIHNldHMgaW4gdGhpcy5zZXQgbmVlZHMgdG8gbWF0Y2hcbiAgLy8gaW4gb3JkZXIgZm9yIGl0IHRvIGJlIHZhbGlkLiAgSWYgbmVnYXRpbmcsIHRoZW4ganVzdCBvbmVcbiAgLy8gbWF0Y2ggbWVhbnMgdGhhdCB3ZSBoYXZlIGZhaWxlZC5cbiAgLy8gRWl0aGVyIHdheSwgcmV0dXJuIG9uIHRoZSBmaXJzdCBoaXQuXG5cbiAgdmFyIHNldCA9IHRoaXMuc2V0XG4gIHRoaXMuZGVidWcodGhpcy5wYXR0ZXJuLCAnc2V0Jywgc2V0KVxuXG4gIC8vIEZpbmQgdGhlIGJhc2VuYW1lIG9mIHRoZSBwYXRoIGJ5IGxvb2tpbmcgZm9yIHRoZSBsYXN0IG5vbi1lbXB0eSBzZWdtZW50XG4gIHZhciBmaWxlbmFtZVxuICB2YXIgaVxuICBmb3IgKGkgPSBmLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgZmlsZW5hbWUgPSBmW2ldXG4gICAgaWYgKGZpbGVuYW1lKSBicmVha1xuICB9XG5cbiAgZm9yIChpID0gMDsgaSA8IHNldC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBwYXR0ZXJuID0gc2V0W2ldXG4gICAgdmFyIGZpbGUgPSBmXG4gICAgaWYgKG9wdGlvbnMubWF0Y2hCYXNlICYmIHBhdHRlcm4ubGVuZ3RoID09PSAxKSB7XG4gICAgICBmaWxlID0gW2ZpbGVuYW1lXVxuICAgIH1cbiAgICB2YXIgaGl0ID0gdGhpcy5tYXRjaE9uZShmaWxlLCBwYXR0ZXJuLCBwYXJ0aWFsKVxuICAgIGlmIChoaXQpIHtcbiAgICAgIGlmIChvcHRpb25zLmZsaXBOZWdhdGUpIHJldHVybiB0cnVlXG4gICAgICByZXR1cm4gIXRoaXMubmVnYXRlXG4gICAgfVxuICB9XG5cbiAgLy8gZGlkbid0IGdldCBhbnkgaGl0cy4gIHRoaXMgaXMgc3VjY2VzcyBpZiBpdCdzIGEgbmVnYXRpdmVcbiAgLy8gcGF0dGVybiwgZmFpbHVyZSBvdGhlcndpc2UuXG4gIGlmIChvcHRpb25zLmZsaXBOZWdhdGUpIHJldHVybiBmYWxzZVxuICByZXR1cm4gdGhpcy5uZWdhdGVcbn1cblxuLy8gc2V0IHBhcnRpYWwgdG8gdHJ1ZSB0byB0ZXN0IGlmLCBmb3IgZXhhbXBsZSxcbi8vIFwiL2EvYlwiIG1hdGNoZXMgdGhlIHN0YXJ0IG9mIFwiLyovYi8qL2RcIlxuLy8gUGFydGlhbCBtZWFucywgaWYgeW91IHJ1biBvdXQgb2YgZmlsZSBiZWZvcmUgeW91IHJ1blxuLy8gb3V0IG9mIHBhdHRlcm4sIHRoZW4gdGhhdCdzIGZpbmUsIGFzIGxvbmcgYXMgYWxsXG4vLyB0aGUgcGFydHMgbWF0Y2guXG5NaW5pbWF0Y2gucHJvdG90eXBlLm1hdGNoT25lID0gZnVuY3Rpb24gKGZpbGUsIHBhdHRlcm4sIHBhcnRpYWwpIHtcbiAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnNcblxuICB0aGlzLmRlYnVnKCdtYXRjaE9uZScsXG4gICAgeyAndGhpcyc6IHRoaXMsIGZpbGU6IGZpbGUsIHBhdHRlcm46IHBhdHRlcm4gfSlcblxuICB0aGlzLmRlYnVnKCdtYXRjaE9uZScsIGZpbGUubGVuZ3RoLCBwYXR0ZXJuLmxlbmd0aClcblxuICBmb3IgKHZhciBmaSA9IDAsXG4gICAgICBwaSA9IDAsXG4gICAgICBmbCA9IGZpbGUubGVuZ3RoLFxuICAgICAgcGwgPSBwYXR0ZXJuLmxlbmd0aFxuICAgICAgOyAoZmkgPCBmbCkgJiYgKHBpIDwgcGwpXG4gICAgICA7IGZpKyssIHBpKyspIHtcbiAgICB0aGlzLmRlYnVnKCdtYXRjaE9uZSBsb29wJylcbiAgICB2YXIgcCA9IHBhdHRlcm5bcGldXG4gICAgdmFyIGYgPSBmaWxlW2ZpXVxuXG4gICAgdGhpcy5kZWJ1ZyhwYXR0ZXJuLCBwLCBmKVxuXG4gICAgLy8gc2hvdWxkIGJlIGltcG9zc2libGUuXG4gICAgLy8gc29tZSBpbnZhbGlkIHJlZ2V4cCBzdHVmZiBpbiB0aGUgc2V0LlxuICAgIGlmIChwID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlXG5cbiAgICBpZiAocCA9PT0gR0xPQlNUQVIpIHtcbiAgICAgIHRoaXMuZGVidWcoJ0dMT0JTVEFSJywgW3BhdHRlcm4sIHAsIGZdKVxuXG4gICAgICAvLyBcIioqXCJcbiAgICAgIC8vIGEvKiovYi8qKi9jIHdvdWxkIG1hdGNoIHRoZSBmb2xsb3dpbmc6XG4gICAgICAvLyBhL2IveC95L3ovY1xuICAgICAgLy8gYS94L3kvei9iL2NcbiAgICAgIC8vIGEvYi94L2IveC9jXG4gICAgICAvLyBhL2IvY1xuICAgICAgLy8gVG8gZG8gdGhpcywgdGFrZSB0aGUgcmVzdCBvZiB0aGUgcGF0dGVybiBhZnRlclxuICAgICAgLy8gdGhlICoqLCBhbmQgc2VlIGlmIGl0IHdvdWxkIG1hdGNoIHRoZSBmaWxlIHJlbWFpbmRlci5cbiAgICAgIC8vIElmIHNvLCByZXR1cm4gc3VjY2Vzcy5cbiAgICAgIC8vIElmIG5vdCwgdGhlICoqIFwic3dhbGxvd3NcIiBhIHNlZ21lbnQsIGFuZCB0cnkgYWdhaW4uXG4gICAgICAvLyBUaGlzIGlzIHJlY3Vyc2l2ZWx5IGF3ZnVsLlxuICAgICAgLy9cbiAgICAgIC8vIGEvKiovYi8qKi9jIG1hdGNoaW5nIGEvYi94L3kvei9jXG4gICAgICAvLyAtIGEgbWF0Y2hlcyBhXG4gICAgICAvLyAtIGRvdWJsZXN0YXJcbiAgICAgIC8vICAgLSBtYXRjaE9uZShiL3gveS96L2MsIGIvKiovYylcbiAgICAgIC8vICAgICAtIGIgbWF0Y2hlcyBiXG4gICAgICAvLyAgICAgLSBkb3VibGVzdGFyXG4gICAgICAvLyAgICAgICAtIG1hdGNoT25lKHgveS96L2MsIGMpIC0+IG5vXG4gICAgICAvLyAgICAgICAtIG1hdGNoT25lKHkvei9jLCBjKSAtPiBub1xuICAgICAgLy8gICAgICAgLSBtYXRjaE9uZSh6L2MsIGMpIC0+IG5vXG4gICAgICAvLyAgICAgICAtIG1hdGNoT25lKGMsIGMpIHllcywgaGl0XG4gICAgICB2YXIgZnIgPSBmaVxuICAgICAgdmFyIHByID0gcGkgKyAxXG4gICAgICBpZiAocHIgPT09IHBsKSB7XG4gICAgICAgIHRoaXMuZGVidWcoJyoqIGF0IHRoZSBlbmQnKVxuICAgICAgICAvLyBhICoqIGF0IHRoZSBlbmQgd2lsbCBqdXN0IHN3YWxsb3cgdGhlIHJlc3QuXG4gICAgICAgIC8vIFdlIGhhdmUgZm91bmQgYSBtYXRjaC5cbiAgICAgICAgLy8gaG93ZXZlciwgaXQgd2lsbCBub3Qgc3dhbGxvdyAvLngsIHVubGVzc1xuICAgICAgICAvLyBvcHRpb25zLmRvdCBpcyBzZXQuXG4gICAgICAgIC8vIC4gYW5kIC4uIGFyZSAqbmV2ZXIqIG1hdGNoZWQgYnkgKiosIGZvciBleHBsb3NpdmVseVxuICAgICAgICAvLyBleHBvbmVudGlhbCByZWFzb25zLlxuICAgICAgICBmb3IgKDsgZmkgPCBmbDsgZmkrKykge1xuICAgICAgICAgIGlmIChmaWxlW2ZpXSA9PT0gJy4nIHx8IGZpbGVbZmldID09PSAnLi4nIHx8XG4gICAgICAgICAgICAoIW9wdGlvbnMuZG90ICYmIGZpbGVbZmldLmNoYXJBdCgwKSA9PT0gJy4nKSkgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cblxuICAgICAgLy8gb2ssIGxldCdzIHNlZSBpZiB3ZSBjYW4gc3dhbGxvdyB3aGF0ZXZlciB3ZSBjYW4uXG4gICAgICB3aGlsZSAoZnIgPCBmbCkge1xuICAgICAgICB2YXIgc3dhbGxvd2VlID0gZmlsZVtmcl1cblxuICAgICAgICB0aGlzLmRlYnVnKCdcXG5nbG9ic3RhciB3aGlsZScsIGZpbGUsIGZyLCBwYXR0ZXJuLCBwciwgc3dhbGxvd2VlKVxuXG4gICAgICAgIC8vIFhYWCByZW1vdmUgdGhpcyBzbGljZS4gIEp1c3QgcGFzcyB0aGUgc3RhcnQgaW5kZXguXG4gICAgICAgIGlmICh0aGlzLm1hdGNoT25lKGZpbGUuc2xpY2UoZnIpLCBwYXR0ZXJuLnNsaWNlKHByKSwgcGFydGlhbCkpIHtcbiAgICAgICAgICB0aGlzLmRlYnVnKCdnbG9ic3RhciBmb3VuZCBtYXRjaCEnLCBmciwgZmwsIHN3YWxsb3dlZSlcbiAgICAgICAgICAvLyBmb3VuZCBhIG1hdGNoLlxuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gY2FuJ3Qgc3dhbGxvdyBcIi5cIiBvciBcIi4uXCIgZXZlci5cbiAgICAgICAgICAvLyBjYW4gb25seSBzd2FsbG93IFwiLmZvb1wiIHdoZW4gZXhwbGljaXRseSBhc2tlZC5cbiAgICAgICAgICBpZiAoc3dhbGxvd2VlID09PSAnLicgfHwgc3dhbGxvd2VlID09PSAnLi4nIHx8XG4gICAgICAgICAgICAoIW9wdGlvbnMuZG90ICYmIHN3YWxsb3dlZS5jaGFyQXQoMCkgPT09ICcuJykpIHtcbiAgICAgICAgICAgIHRoaXMuZGVidWcoJ2RvdCBkZXRlY3RlZCEnLCBmaWxlLCBmciwgcGF0dGVybiwgcHIpXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vICoqIHN3YWxsb3dzIGEgc2VnbWVudCwgYW5kIGNvbnRpbnVlLlxuICAgICAgICAgIHRoaXMuZGVidWcoJ2dsb2JzdGFyIHN3YWxsb3cgYSBzZWdtZW50LCBhbmQgY29udGludWUnKVxuICAgICAgICAgIGZyKytcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBubyBtYXRjaCB3YXMgZm91bmQuXG4gICAgICAvLyBIb3dldmVyLCBpbiBwYXJ0aWFsIG1vZGUsIHdlIGNhbid0IHNheSB0aGlzIGlzIG5lY2Vzc2FyaWx5IG92ZXIuXG4gICAgICAvLyBJZiB0aGVyZSdzIG1vcmUgKnBhdHRlcm4qIGxlZnQsIHRoZW5cbiAgICAgIGlmIChwYXJ0aWFsKSB7XG4gICAgICAgIC8vIHJhbiBvdXQgb2YgZmlsZVxuICAgICAgICB0aGlzLmRlYnVnKCdcXG4+Pj4gbm8gbWF0Y2gsIHBhcnRpYWw/JywgZmlsZSwgZnIsIHBhdHRlcm4sIHByKVxuICAgICAgICBpZiAoZnIgPT09IGZsKSByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgLy8gc29tZXRoaW5nIG90aGVyIHRoYW4gKipcbiAgICAvLyBub24tbWFnaWMgcGF0dGVybnMganVzdCBoYXZlIHRvIG1hdGNoIGV4YWN0bHlcbiAgICAvLyBwYXR0ZXJucyB3aXRoIG1hZ2ljIGhhdmUgYmVlbiB0dXJuZWQgaW50byByZWdleHBzLlxuICAgIHZhciBoaXRcbiAgICBpZiAodHlwZW9mIHAgPT09ICdzdHJpbmcnKSB7XG4gICAgICBpZiAob3B0aW9ucy5ub2Nhc2UpIHtcbiAgICAgICAgaGl0ID0gZi50b0xvd2VyQ2FzZSgpID09PSBwLnRvTG93ZXJDYXNlKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGhpdCA9IGYgPT09IHBcbiAgICAgIH1cbiAgICAgIHRoaXMuZGVidWcoJ3N0cmluZyBtYXRjaCcsIHAsIGYsIGhpdClcbiAgICB9IGVsc2Uge1xuICAgICAgaGl0ID0gZi5tYXRjaChwKVxuICAgICAgdGhpcy5kZWJ1ZygncGF0dGVybiBtYXRjaCcsIHAsIGYsIGhpdClcbiAgICB9XG5cbiAgICBpZiAoIWhpdCkgcmV0dXJuIGZhbHNlXG4gIH1cblxuICAvLyBOb3RlOiBlbmRpbmcgaW4gLyBtZWFucyB0aGF0IHdlJ2xsIGdldCBhIGZpbmFsIFwiXCJcbiAgLy8gYXQgdGhlIGVuZCBvZiB0aGUgcGF0dGVybi4gIFRoaXMgY2FuIG9ubHkgbWF0Y2ggYVxuICAvLyBjb3JyZXNwb25kaW5nIFwiXCIgYXQgdGhlIGVuZCBvZiB0aGUgZmlsZS5cbiAgLy8gSWYgdGhlIGZpbGUgZW5kcyBpbiAvLCB0aGVuIGl0IGNhbiBvbmx5IG1hdGNoIGFcbiAgLy8gYSBwYXR0ZXJuIHRoYXQgZW5kcyBpbiAvLCB1bmxlc3MgdGhlIHBhdHRlcm4ganVzdFxuICAvLyBkb2Vzbid0IGhhdmUgYW55IG1vcmUgZm9yIGl0LiBCdXQsIGEvYi8gc2hvdWxkICpub3QqXG4gIC8vIG1hdGNoIFwiYS9iLypcIiwgZXZlbiB0aG91Z2ggXCJcIiBtYXRjaGVzIGFnYWluc3QgdGhlXG4gIC8vIFteL10qPyBwYXR0ZXJuLCBleGNlcHQgaW4gcGFydGlhbCBtb2RlLCB3aGVyZSBpdCBtaWdodFxuICAvLyBzaW1wbHkgbm90IGJlIHJlYWNoZWQgeWV0LlxuICAvLyBIb3dldmVyLCBhL2IvIHNob3VsZCBzdGlsbCBzYXRpc2Z5IGEvKlxuXG4gIC8vIG5vdyBlaXRoZXIgd2UgZmVsbCBvZmYgdGhlIGVuZCBvZiB0aGUgcGF0dGVybiwgb3Igd2UncmUgZG9uZS5cbiAgaWYgKGZpID09PSBmbCAmJiBwaSA9PT0gcGwpIHtcbiAgICAvLyByYW4gb3V0IG9mIHBhdHRlcm4gYW5kIGZpbGVuYW1lIGF0IHRoZSBzYW1lIHRpbWUuXG4gICAgLy8gYW4gZXhhY3QgaGl0IVxuICAgIHJldHVybiB0cnVlXG4gIH0gZWxzZSBpZiAoZmkgPT09IGZsKSB7XG4gICAgLy8gcmFuIG91dCBvZiBmaWxlLCBidXQgc3RpbGwgaGFkIHBhdHRlcm4gbGVmdC5cbiAgICAvLyB0aGlzIGlzIG9rIGlmIHdlJ3JlIGRvaW5nIHRoZSBtYXRjaCBhcyBwYXJ0IG9mXG4gICAgLy8gYSBnbG9iIGZzIHRyYXZlcnNhbC5cbiAgICByZXR1cm4gcGFydGlhbFxuICB9IGVsc2UgaWYgKHBpID09PSBwbCkge1xuICAgIC8vIHJhbiBvdXQgb2YgcGF0dGVybiwgc3RpbGwgaGF2ZSBmaWxlIGxlZnQuXG4gICAgLy8gdGhpcyBpcyBvbmx5IGFjY2VwdGFibGUgaWYgd2UncmUgb24gdGhlIHZlcnkgbGFzdFxuICAgIC8vIGVtcHR5IHNlZ21lbnQgb2YgYSBmaWxlIHdpdGggYSB0cmFpbGluZyBzbGFzaC5cbiAgICAvLyBhLyogc2hvdWxkIG1hdGNoIGEvYi9cbiAgICB2YXIgZW1wdHlGaWxlRW5kID0gKGZpID09PSBmbCAtIDEpICYmIChmaWxlW2ZpXSA9PT0gJycpXG4gICAgcmV0dXJuIGVtcHR5RmlsZUVuZFxuICB9XG5cbiAgLy8gc2hvdWxkIGJlIHVucmVhY2hhYmxlLlxuICB0aHJvdyBuZXcgRXJyb3IoJ3d0Zj8nKVxufVxuXG4vLyByZXBsYWNlIHN0dWZmIGxpa2UgXFwqIHdpdGggKlxuZnVuY3Rpb24gZ2xvYlVuZXNjYXBlIChzKSB7XG4gIHJldHVybiBzLnJlcGxhY2UoL1xcXFwoLikvZywgJyQxJylcbn1cblxuZnVuY3Rpb24gcmVnRXhwRXNjYXBlIChzKSB7XG4gIHJldHVybiBzLnJlcGxhY2UoL1stW1xcXXt9KCkqKz8uLFxcXFxeJHwjXFxzXS9nLCAnXFxcXCQmJylcbn1cbiIsInZhciBjb25jYXRNYXAgPSByZXF1aXJlKCdjb25jYXQtbWFwJyk7XG52YXIgYmFsYW5jZWQgPSByZXF1aXJlKCdiYWxhbmNlZC1tYXRjaCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cGFuZFRvcDtcblxudmFyIGVzY1NsYXNoID0gJ1xcMFNMQVNIJytNYXRoLnJhbmRvbSgpKydcXDAnO1xudmFyIGVzY09wZW4gPSAnXFwwT1BFTicrTWF0aC5yYW5kb20oKSsnXFwwJztcbnZhciBlc2NDbG9zZSA9ICdcXDBDTE9TRScrTWF0aC5yYW5kb20oKSsnXFwwJztcbnZhciBlc2NDb21tYSA9ICdcXDBDT01NQScrTWF0aC5yYW5kb20oKSsnXFwwJztcbnZhciBlc2NQZXJpb2QgPSAnXFwwUEVSSU9EJytNYXRoLnJhbmRvbSgpKydcXDAnO1xuXG5mdW5jdGlvbiBudW1lcmljKHN0cikge1xuICByZXR1cm4gcGFyc2VJbnQoc3RyLCAxMCkgPT0gc3RyXG4gICAgPyBwYXJzZUludChzdHIsIDEwKVxuICAgIDogc3RyLmNoYXJDb2RlQXQoMCk7XG59XG5cbmZ1bmN0aW9uIGVzY2FwZUJyYWNlcyhzdHIpIHtcbiAgcmV0dXJuIHN0ci5zcGxpdCgnXFxcXFxcXFwnKS5qb2luKGVzY1NsYXNoKVxuICAgICAgICAgICAgLnNwbGl0KCdcXFxceycpLmpvaW4oZXNjT3BlbilcbiAgICAgICAgICAgIC5zcGxpdCgnXFxcXH0nKS5qb2luKGVzY0Nsb3NlKVxuICAgICAgICAgICAgLnNwbGl0KCdcXFxcLCcpLmpvaW4oZXNjQ29tbWEpXG4gICAgICAgICAgICAuc3BsaXQoJ1xcXFwuJykuam9pbihlc2NQZXJpb2QpO1xufVxuXG5mdW5jdGlvbiB1bmVzY2FwZUJyYWNlcyhzdHIpIHtcbiAgcmV0dXJuIHN0ci5zcGxpdChlc2NTbGFzaCkuam9pbignXFxcXCcpXG4gICAgICAgICAgICAuc3BsaXQoZXNjT3Blbikuam9pbigneycpXG4gICAgICAgICAgICAuc3BsaXQoZXNjQ2xvc2UpLmpvaW4oJ30nKVxuICAgICAgICAgICAgLnNwbGl0KGVzY0NvbW1hKS5qb2luKCcsJylcbiAgICAgICAgICAgIC5zcGxpdChlc2NQZXJpb2QpLmpvaW4oJy4nKTtcbn1cblxuXG4vLyBCYXNpY2FsbHkganVzdCBzdHIuc3BsaXQoXCIsXCIpLCBidXQgaGFuZGxpbmcgY2FzZXNcbi8vIHdoZXJlIHdlIGhhdmUgbmVzdGVkIGJyYWNlZCBzZWN0aW9ucywgd2hpY2ggc2hvdWxkIGJlXG4vLyB0cmVhdGVkIGFzIGluZGl2aWR1YWwgbWVtYmVycywgbGlrZSB7YSx7YixjfSxkfVxuZnVuY3Rpb24gcGFyc2VDb21tYVBhcnRzKHN0cikge1xuICBpZiAoIXN0cilcbiAgICByZXR1cm4gWycnXTtcblxuICB2YXIgcGFydHMgPSBbXTtcbiAgdmFyIG0gPSBiYWxhbmNlZCgneycsICd9Jywgc3RyKTtcblxuICBpZiAoIW0pXG4gICAgcmV0dXJuIHN0ci5zcGxpdCgnLCcpO1xuXG4gIHZhciBwcmUgPSBtLnByZTtcbiAgdmFyIGJvZHkgPSBtLmJvZHk7XG4gIHZhciBwb3N0ID0gbS5wb3N0O1xuICB2YXIgcCA9IHByZS5zcGxpdCgnLCcpO1xuXG4gIHBbcC5sZW5ndGgtMV0gKz0gJ3snICsgYm9keSArICd9JztcbiAgdmFyIHBvc3RQYXJ0cyA9IHBhcnNlQ29tbWFQYXJ0cyhwb3N0KTtcbiAgaWYgKHBvc3QubGVuZ3RoKSB7XG4gICAgcFtwLmxlbmd0aC0xXSArPSBwb3N0UGFydHMuc2hpZnQoKTtcbiAgICBwLnB1c2guYXBwbHkocCwgcG9zdFBhcnRzKTtcbiAgfVxuXG4gIHBhcnRzLnB1c2guYXBwbHkocGFydHMsIHApO1xuXG4gIHJldHVybiBwYXJ0cztcbn1cblxuZnVuY3Rpb24gZXhwYW5kVG9wKHN0cikge1xuICBpZiAoIXN0cilcbiAgICByZXR1cm4gW107XG5cbiAgLy8gSSBkb24ndCBrbm93IHdoeSBCYXNoIDQuMyBkb2VzIHRoaXMsIGJ1dCBpdCBkb2VzLlxuICAvLyBBbnl0aGluZyBzdGFydGluZyB3aXRoIHt9IHdpbGwgaGF2ZSB0aGUgZmlyc3QgdHdvIGJ5dGVzIHByZXNlcnZlZFxuICAvLyBidXQgKm9ubHkqIGF0IHRoZSB0b3AgbGV2ZWwsIHNvIHt9LGF9YiB3aWxsIG5vdCBleHBhbmQgdG8gYW55dGhpbmcsXG4gIC8vIGJ1dCBhe30sYn1jIHdpbGwgYmUgZXhwYW5kZWQgdG8gW2F9YyxhYmNdLlxuICAvLyBPbmUgY291bGQgYXJndWUgdGhhdCB0aGlzIGlzIGEgYnVnIGluIEJhc2gsIGJ1dCBzaW5jZSB0aGUgZ29hbCBvZlxuICAvLyB0aGlzIG1vZHVsZSBpcyB0byBtYXRjaCBCYXNoJ3MgcnVsZXMsIHdlIGVzY2FwZSBhIGxlYWRpbmcge31cbiAgaWYgKHN0ci5zdWJzdHIoMCwgMikgPT09ICd7fScpIHtcbiAgICBzdHIgPSAnXFxcXHtcXFxcfScgKyBzdHIuc3Vic3RyKDIpO1xuICB9XG5cbiAgcmV0dXJuIGV4cGFuZChlc2NhcGVCcmFjZXMoc3RyKSwgdHJ1ZSkubWFwKHVuZXNjYXBlQnJhY2VzKTtcbn1cblxuZnVuY3Rpb24gaWRlbnRpdHkoZSkge1xuICByZXR1cm4gZTtcbn1cblxuZnVuY3Rpb24gZW1icmFjZShzdHIpIHtcbiAgcmV0dXJuICd7JyArIHN0ciArICd9Jztcbn1cbmZ1bmN0aW9uIGlzUGFkZGVkKGVsKSB7XG4gIHJldHVybiAvXi0/MFxcZC8udGVzdChlbCk7XG59XG5cbmZ1bmN0aW9uIGx0ZShpLCB5KSB7XG4gIHJldHVybiBpIDw9IHk7XG59XG5mdW5jdGlvbiBndGUoaSwgeSkge1xuICByZXR1cm4gaSA+PSB5O1xufVxuXG5mdW5jdGlvbiBleHBhbmQoc3RyLCBpc1RvcCkge1xuICB2YXIgZXhwYW5zaW9ucyA9IFtdO1xuXG4gIHZhciBtID0gYmFsYW5jZWQoJ3snLCAnfScsIHN0cik7XG4gIGlmICghbSB8fCAvXFwkJC8udGVzdChtLnByZSkpIHJldHVybiBbc3RyXTtcblxuICB2YXIgaXNOdW1lcmljU2VxdWVuY2UgPSAvXi0/XFxkK1xcLlxcLi0/XFxkKyg/OlxcLlxcLi0/XFxkKyk/JC8udGVzdChtLmJvZHkpO1xuICB2YXIgaXNBbHBoYVNlcXVlbmNlID0gL15bYS16QS1aXVxcLlxcLlthLXpBLVpdKD86XFwuXFwuLT9cXGQrKT8kLy50ZXN0KG0uYm9keSk7XG4gIHZhciBpc1NlcXVlbmNlID0gaXNOdW1lcmljU2VxdWVuY2UgfHwgaXNBbHBoYVNlcXVlbmNlO1xuICB2YXIgaXNPcHRpb25zID0gbS5ib2R5LmluZGV4T2YoJywnKSA+PSAwO1xuICBpZiAoIWlzU2VxdWVuY2UgJiYgIWlzT3B0aW9ucykge1xuICAgIC8vIHthfSxifVxuICAgIGlmIChtLnBvc3QubWF0Y2goLywuKlxcfS8pKSB7XG4gICAgICBzdHIgPSBtLnByZSArICd7JyArIG0uYm9keSArIGVzY0Nsb3NlICsgbS5wb3N0O1xuICAgICAgcmV0dXJuIGV4cGFuZChzdHIpO1xuICAgIH1cbiAgICByZXR1cm4gW3N0cl07XG4gIH1cblxuICB2YXIgbjtcbiAgaWYgKGlzU2VxdWVuY2UpIHtcbiAgICBuID0gbS5ib2R5LnNwbGl0KC9cXC5cXC4vKTtcbiAgfSBlbHNlIHtcbiAgICBuID0gcGFyc2VDb21tYVBhcnRzKG0uYm9keSk7XG4gICAgaWYgKG4ubGVuZ3RoID09PSAxKSB7XG4gICAgICAvLyB4e3thLGJ9fXkgPT0+IHh7YX15IHh7Yn15XG4gICAgICBuID0gZXhwYW5kKG5bMF0sIGZhbHNlKS5tYXAoZW1icmFjZSk7XG4gICAgICBpZiAobi5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgdmFyIHBvc3QgPSBtLnBvc3QubGVuZ3RoXG4gICAgICAgICAgPyBleHBhbmQobS5wb3N0LCBmYWxzZSlcbiAgICAgICAgICA6IFsnJ107XG4gICAgICAgIHJldHVybiBwb3N0Lm1hcChmdW5jdGlvbihwKSB7XG4gICAgICAgICAgcmV0dXJuIG0ucHJlICsgblswXSArIHA7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIGF0IHRoaXMgcG9pbnQsIG4gaXMgdGhlIHBhcnRzLCBhbmQgd2Uga25vdyBpdCdzIG5vdCBhIGNvbW1hIHNldFxuICAvLyB3aXRoIGEgc2luZ2xlIGVudHJ5LlxuXG4gIC8vIG5vIG5lZWQgdG8gZXhwYW5kIHByZSwgc2luY2UgaXQgaXMgZ3VhcmFudGVlZCB0byBiZSBmcmVlIG9mIGJyYWNlLXNldHNcbiAgdmFyIHByZSA9IG0ucHJlO1xuICB2YXIgcG9zdCA9IG0ucG9zdC5sZW5ndGhcbiAgICA/IGV4cGFuZChtLnBvc3QsIGZhbHNlKVxuICAgIDogWycnXTtcblxuICB2YXIgTjtcblxuICBpZiAoaXNTZXF1ZW5jZSkge1xuICAgIHZhciB4ID0gbnVtZXJpYyhuWzBdKTtcbiAgICB2YXIgeSA9IG51bWVyaWMoblsxXSk7XG4gICAgdmFyIHdpZHRoID0gTWF0aC5tYXgoblswXS5sZW5ndGgsIG5bMV0ubGVuZ3RoKVxuICAgIHZhciBpbmNyID0gbi5sZW5ndGggPT0gM1xuICAgICAgPyBNYXRoLmFicyhudW1lcmljKG5bMl0pKVxuICAgICAgOiAxO1xuICAgIHZhciB0ZXN0ID0gbHRlO1xuICAgIHZhciByZXZlcnNlID0geSA8IHg7XG4gICAgaWYgKHJldmVyc2UpIHtcbiAgICAgIGluY3IgKj0gLTE7XG4gICAgICB0ZXN0ID0gZ3RlO1xuICAgIH1cbiAgICB2YXIgcGFkID0gbi5zb21lKGlzUGFkZGVkKTtcblxuICAgIE4gPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSB4OyB0ZXN0KGksIHkpOyBpICs9IGluY3IpIHtcbiAgICAgIHZhciBjO1xuICAgICAgaWYgKGlzQWxwaGFTZXF1ZW5jZSkge1xuICAgICAgICBjID0gU3RyaW5nLmZyb21DaGFyQ29kZShpKTtcbiAgICAgICAgaWYgKGMgPT09ICdcXFxcJylcbiAgICAgICAgICBjID0gJyc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjID0gU3RyaW5nKGkpO1xuICAgICAgICBpZiAocGFkKSB7XG4gICAgICAgICAgdmFyIG5lZWQgPSB3aWR0aCAtIGMubGVuZ3RoO1xuICAgICAgICAgIGlmIChuZWVkID4gMCkge1xuICAgICAgICAgICAgdmFyIHogPSBuZXcgQXJyYXkobmVlZCArIDEpLmpvaW4oJzAnKTtcbiAgICAgICAgICAgIGlmIChpIDwgMClcbiAgICAgICAgICAgICAgYyA9ICctJyArIHogKyBjLnNsaWNlKDEpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICBjID0geiArIGM7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBOLnB1c2goYyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIE4gPSBjb25jYXRNYXAobiwgZnVuY3Rpb24oZWwpIHsgcmV0dXJuIGV4cGFuZChlbCwgZmFsc2UpIH0pO1xuICB9XG5cbiAgZm9yICh2YXIgaiA9IDA7IGogPCBOLmxlbmd0aDsgaisrKSB7XG4gICAgZm9yICh2YXIgayA9IDA7IGsgPCBwb3N0Lmxlbmd0aDsgaysrKSB7XG4gICAgICB2YXIgZXhwYW5zaW9uID0gcHJlICsgTltqXSArIHBvc3Rba107XG4gICAgICBpZiAoIWlzVG9wIHx8IGlzU2VxdWVuY2UgfHwgZXhwYW5zaW9uKVxuICAgICAgICBleHBhbnNpb25zLnB1c2goZXhwYW5zaW9uKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZXhwYW5zaW9ucztcbn1cblxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoeHMsIGZuKSB7XG4gICAgdmFyIHJlcyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgeHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHggPSBmbih4c1tpXSwgaSk7XG4gICAgICAgIGlmIChpc0FycmF5KHgpKSByZXMucHVzaC5hcHBseShyZXMsIHgpO1xuICAgICAgICBlbHNlIHJlcy5wdXNoKHgpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xufTtcblxudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uICh4cykge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeHMpID09PSAnW29iamVjdCBBcnJheV0nO1xufTtcbiIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gYmFsYW5jZWQ7XG5mdW5jdGlvbiBiYWxhbmNlZChhLCBiLCBzdHIpIHtcbiAgaWYgKGEgaW5zdGFuY2VvZiBSZWdFeHApIGEgPSBtYXliZU1hdGNoKGEsIHN0cik7XG4gIGlmIChiIGluc3RhbmNlb2YgUmVnRXhwKSBiID0gbWF5YmVNYXRjaChiLCBzdHIpO1xuXG4gIHZhciByID0gcmFuZ2UoYSwgYiwgc3RyKTtcblxuICByZXR1cm4gciAmJiB7XG4gICAgc3RhcnQ6IHJbMF0sXG4gICAgZW5kOiByWzFdLFxuICAgIHByZTogc3RyLnNsaWNlKDAsIHJbMF0pLFxuICAgIGJvZHk6IHN0ci5zbGljZShyWzBdICsgYS5sZW5ndGgsIHJbMV0pLFxuICAgIHBvc3Q6IHN0ci5zbGljZShyWzFdICsgYi5sZW5ndGgpXG4gIH07XG59XG5cbmZ1bmN0aW9uIG1heWJlTWF0Y2gocmVnLCBzdHIpIHtcbiAgdmFyIG0gPSBzdHIubWF0Y2gocmVnKTtcbiAgcmV0dXJuIG0gPyBtWzBdIDogbnVsbDtcbn1cblxuYmFsYW5jZWQucmFuZ2UgPSByYW5nZTtcbmZ1bmN0aW9uIHJhbmdlKGEsIGIsIHN0cikge1xuICB2YXIgYmVncywgYmVnLCBsZWZ0LCByaWdodCwgcmVzdWx0O1xuICB2YXIgYWkgPSBzdHIuaW5kZXhPZihhKTtcbiAgdmFyIGJpID0gc3RyLmluZGV4T2YoYiwgYWkgKyAxKTtcbiAgdmFyIGkgPSBhaTtcblxuICBpZiAoYWkgPj0gMCAmJiBiaSA+IDApIHtcbiAgICBiZWdzID0gW107XG4gICAgbGVmdCA9IHN0ci5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaSA+PSAwICYmICFyZXN1bHQpIHtcbiAgICAgIGlmIChpID09IGFpKSB7XG4gICAgICAgIGJlZ3MucHVzaChpKTtcbiAgICAgICAgYWkgPSBzdHIuaW5kZXhPZihhLCBpICsgMSk7XG4gICAgICB9IGVsc2UgaWYgKGJlZ3MubGVuZ3RoID09IDEpIHtcbiAgICAgICAgcmVzdWx0ID0gWyBiZWdzLnBvcCgpLCBiaSBdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYmVnID0gYmVncy5wb3AoKTtcbiAgICAgICAgaWYgKGJlZyA8IGxlZnQpIHtcbiAgICAgICAgICBsZWZ0ID0gYmVnO1xuICAgICAgICAgIHJpZ2h0ID0gYmk7XG4gICAgICAgIH1cblxuICAgICAgICBiaSA9IHN0ci5pbmRleE9mKGIsIGkgKyAxKTtcbiAgICAgIH1cblxuICAgICAgaSA9IGFpIDwgYmkgJiYgYWkgPj0gMCA/IGFpIDogYmk7XG4gICAgfVxuXG4gICAgaWYgKGJlZ3MubGVuZ3RoKSB7XG4gICAgICByZXN1bHQgPSBbIGxlZnQsIHJpZ2h0IF07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbiIsInRyeSB7XG4gIHZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpO1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBpZiAodHlwZW9mIHV0aWwuaW5oZXJpdHMgIT09ICdmdW5jdGlvbicpIHRocm93ICcnO1xuICBtb2R1bGUuZXhwb3J0cyA9IHV0aWwuaW5oZXJpdHM7XG59IGNhdGNoIChlKSB7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9pbmhlcml0c19icm93c2VyLmpzJyk7XG59XG4iLCJpZiAodHlwZW9mIE9iamVjdC5jcmVhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgLy8gaW1wbGVtZW50YXRpb24gZnJvbSBzdGFuZGFyZCBub2RlLmpzICd1dGlsJyBtb2R1bGVcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmhlcml0cyhjdG9yLCBzdXBlckN0b3IpIHtcbiAgICBpZiAoc3VwZXJDdG9yKSB7XG4gICAgICBjdG9yLnN1cGVyXyA9IHN1cGVyQ3RvclxuICAgICAgY3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ3Rvci5wcm90b3R5cGUsIHtcbiAgICAgICAgY29uc3RydWN0b3I6IHtcbiAgICAgICAgICB2YWx1ZTogY3RvcixcbiAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH07XG59IGVsc2Uge1xuICAvLyBvbGQgc2Nob29sIHNoaW0gZm9yIG9sZCBicm93c2Vyc1xuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluaGVyaXRzKGN0b3IsIHN1cGVyQ3Rvcikge1xuICAgIGlmIChzdXBlckN0b3IpIHtcbiAgICAgIGN0b3Iuc3VwZXJfID0gc3VwZXJDdG9yXG4gICAgICB2YXIgVGVtcEN0b3IgPSBmdW5jdGlvbiAoKSB7fVxuICAgICAgVGVtcEN0b3IucHJvdG90eXBlID0gc3VwZXJDdG9yLnByb3RvdHlwZVxuICAgICAgY3Rvci5wcm90b3R5cGUgPSBuZXcgVGVtcEN0b3IoKVxuICAgICAgY3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjdG9yXG4gICAgfVxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJldmVudHNcIik7IiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBwb3NpeChwYXRoKSB7XG5cdHJldHVybiBwYXRoLmNoYXJBdCgwKSA9PT0gJy8nO1xufVxuXG5mdW5jdGlvbiB3aW4zMihwYXRoKSB7XG5cdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlanMvbm9kZS9ibG9iL2IzZmNjMjQ1ZmIyNTUzOTkwOWVmMWQ1ZWFhMDFkYmY5MmUxNjg2MzMvbGliL3BhdGguanMjTDU2XG5cdHZhciBzcGxpdERldmljZVJlID0gL14oW2EtekEtWl06fFtcXFxcXFwvXXsyfVteXFxcXFxcL10rW1xcXFxcXC9dK1teXFxcXFxcL10rKT8oW1xcXFxcXC9dKT8oW1xcc1xcU10qPykkLztcblx0dmFyIHJlc3VsdCA9IHNwbGl0RGV2aWNlUmUuZXhlYyhwYXRoKTtcblx0dmFyIGRldmljZSA9IHJlc3VsdFsxXSB8fCAnJztcblx0dmFyIGlzVW5jID0gQm9vbGVhbihkZXZpY2UgJiYgZGV2aWNlLmNoYXJBdCgxKSAhPT0gJzonKTtcblxuXHQvLyBVTkMgcGF0aHMgYXJlIGFsd2F5cyBhYnNvbHV0ZVxuXHRyZXR1cm4gQm9vbGVhbihyZXN1bHRbMl0gfHwgaXNVbmMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHByb2Nlc3MucGxhdGZvcm0gPT09ICd3aW4zMicgPyB3aW4zMiA6IHBvc2l4O1xubW9kdWxlLmV4cG9ydHMucG9zaXggPSBwb3NpeDtcbm1vZHVsZS5leHBvcnRzLndpbjMyID0gd2luMzI7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGdsb2JTeW5jXG5nbG9iU3luYy5HbG9iU3luYyA9IEdsb2JTeW5jXG5cbnZhciBmcyA9IHJlcXVpcmUoJ2ZzJylcbnZhciBycCA9IHJlcXVpcmUoJ2ZzLnJlYWxwYXRoJylcbnZhciBtaW5pbWF0Y2ggPSByZXF1aXJlKCdtaW5pbWF0Y2gnKVxudmFyIE1pbmltYXRjaCA9IG1pbmltYXRjaC5NaW5pbWF0Y2hcbnZhciBHbG9iID0gcmVxdWlyZSgnLi9nbG9iLmpzJykuR2xvYlxudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsJylcbnZhciBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG52YXIgYXNzZXJ0ID0gcmVxdWlyZSgnYXNzZXJ0JylcbnZhciBpc0Fic29sdXRlID0gcmVxdWlyZSgncGF0aC1pcy1hYnNvbHV0ZScpXG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24uanMnKVxudmFyIGFscGhhc29ydCA9IGNvbW1vbi5hbHBoYXNvcnRcbnZhciBhbHBoYXNvcnRpID0gY29tbW9uLmFscGhhc29ydGlcbnZhciBzZXRvcHRzID0gY29tbW9uLnNldG9wdHNcbnZhciBvd25Qcm9wID0gY29tbW9uLm93blByb3BcbnZhciBjaGlsZHJlbklnbm9yZWQgPSBjb21tb24uY2hpbGRyZW5JZ25vcmVkXG52YXIgaXNJZ25vcmVkID0gY29tbW9uLmlzSWdub3JlZFxuXG5mdW5jdGlvbiBnbG9iU3luYyAocGF0dGVybiwgb3B0aW9ucykge1xuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMylcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdjYWxsYmFjayBwcm92aWRlZCB0byBzeW5jIGdsb2JcXG4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1NlZTogaHR0cHM6Ly9naXRodWIuY29tL2lzYWFjcy9ub2RlLWdsb2IvaXNzdWVzLzE2NycpXG5cbiAgcmV0dXJuIG5ldyBHbG9iU3luYyhwYXR0ZXJuLCBvcHRpb25zKS5mb3VuZFxufVxuXG5mdW5jdGlvbiBHbG9iU3luYyAocGF0dGVybiwgb3B0aW9ucykge1xuICBpZiAoIXBhdHRlcm4pXG4gICAgdGhyb3cgbmV3IEVycm9yKCdtdXN0IHByb3ZpZGUgcGF0dGVybicpXG5cbiAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDMpXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignY2FsbGJhY2sgcHJvdmlkZWQgdG8gc3luYyBnbG9iXFxuJytcbiAgICAgICAgICAgICAgICAgICAgICAgICdTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9pc2FhY3Mvbm9kZS1nbG9iL2lzc3Vlcy8xNjcnKVxuXG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBHbG9iU3luYykpXG4gICAgcmV0dXJuIG5ldyBHbG9iU3luYyhwYXR0ZXJuLCBvcHRpb25zKVxuXG4gIHNldG9wdHModGhpcywgcGF0dGVybiwgb3B0aW9ucylcblxuICBpZiAodGhpcy5ub3Byb2Nlc3MpXG4gICAgcmV0dXJuIHRoaXNcblxuICB2YXIgbiA9IHRoaXMubWluaW1hdGNoLnNldC5sZW5ndGhcbiAgdGhpcy5tYXRjaGVzID0gbmV3IEFycmF5KG4pXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgaSArKykge1xuICAgIHRoaXMuX3Byb2Nlc3ModGhpcy5taW5pbWF0Y2guc2V0W2ldLCBpLCBmYWxzZSlcbiAgfVxuICB0aGlzLl9maW5pc2goKVxufVxuXG5HbG9iU3luYy5wcm90b3R5cGUuX2ZpbmlzaCA9IGZ1bmN0aW9uICgpIHtcbiAgYXNzZXJ0KHRoaXMgaW5zdGFuY2VvZiBHbG9iU3luYylcbiAgaWYgKHRoaXMucmVhbHBhdGgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICB0aGlzLm1hdGNoZXMuZm9yRWFjaChmdW5jdGlvbiAobWF0Y2hzZXQsIGluZGV4KSB7XG4gICAgICB2YXIgc2V0ID0gc2VsZi5tYXRjaGVzW2luZGV4XSA9IE9iamVjdC5jcmVhdGUobnVsbClcbiAgICAgIGZvciAodmFyIHAgaW4gbWF0Y2hzZXQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBwID0gc2VsZi5fbWFrZUFicyhwKVxuICAgICAgICAgIHZhciByZWFsID0gcnAucmVhbHBhdGhTeW5jKHAsIHNlbGYucmVhbHBhdGhDYWNoZSlcbiAgICAgICAgICBzZXRbcmVhbF0gPSB0cnVlXG4gICAgICAgIH0gY2F0Y2ggKGVyKSB7XG4gICAgICAgICAgaWYgKGVyLnN5c2NhbGwgPT09ICdzdGF0JylcbiAgICAgICAgICAgIHNldFtzZWxmLl9tYWtlQWJzKHApXSA9IHRydWVcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aHJvdyBlclxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxuICBjb21tb24uZmluaXNoKHRoaXMpXG59XG5cblxuR2xvYlN5bmMucHJvdG90eXBlLl9wcm9jZXNzID0gZnVuY3Rpb24gKHBhdHRlcm4sIGluZGV4LCBpbkdsb2JTdGFyKSB7XG4gIGFzc2VydCh0aGlzIGluc3RhbmNlb2YgR2xvYlN5bmMpXG5cbiAgLy8gR2V0IHRoZSBmaXJzdCBbbl0gcGFydHMgb2YgcGF0dGVybiB0aGF0IGFyZSBhbGwgc3RyaW5ncy5cbiAgdmFyIG4gPSAwXG4gIHdoaWxlICh0eXBlb2YgcGF0dGVybltuXSA9PT0gJ3N0cmluZycpIHtcbiAgICBuICsrXG4gIH1cbiAgLy8gbm93IG4gaXMgdGhlIGluZGV4IG9mIHRoZSBmaXJzdCBvbmUgdGhhdCBpcyAqbm90KiBhIHN0cmluZy5cblxuICAvLyBTZWUgaWYgdGhlcmUncyBhbnl0aGluZyBlbHNlXG4gIHZhciBwcmVmaXhcbiAgc3dpdGNoIChuKSB7XG4gICAgLy8gaWYgbm90LCB0aGVuIHRoaXMgaXMgcmF0aGVyIHNpbXBsZVxuICAgIGNhc2UgcGF0dGVybi5sZW5ndGg6XG4gICAgICB0aGlzLl9wcm9jZXNzU2ltcGxlKHBhdHRlcm4uam9pbignLycpLCBpbmRleClcbiAgICAgIHJldHVyblxuXG4gICAgY2FzZSAwOlxuICAgICAgLy8gcGF0dGVybiAqc3RhcnRzKiB3aXRoIHNvbWUgbm9uLXRyaXZpYWwgaXRlbS5cbiAgICAgIC8vIGdvaW5nIHRvIHJlYWRkaXIoY3dkKSwgYnV0IG5vdCBpbmNsdWRlIHRoZSBwcmVmaXggaW4gbWF0Y2hlcy5cbiAgICAgIHByZWZpeCA9IG51bGxcbiAgICAgIGJyZWFrXG5cbiAgICBkZWZhdWx0OlxuICAgICAgLy8gcGF0dGVybiBoYXMgc29tZSBzdHJpbmcgYml0cyBpbiB0aGUgZnJvbnQuXG4gICAgICAvLyB3aGF0ZXZlciBpdCBzdGFydHMgd2l0aCwgd2hldGhlciB0aGF0J3MgJ2Fic29sdXRlJyBsaWtlIC9mb28vYmFyLFxuICAgICAgLy8gb3IgJ3JlbGF0aXZlJyBsaWtlICcuLi9iYXonXG4gICAgICBwcmVmaXggPSBwYXR0ZXJuLnNsaWNlKDAsIG4pLmpvaW4oJy8nKVxuICAgICAgYnJlYWtcbiAgfVxuXG4gIHZhciByZW1haW4gPSBwYXR0ZXJuLnNsaWNlKG4pXG5cbiAgLy8gZ2V0IHRoZSBsaXN0IG9mIGVudHJpZXMuXG4gIHZhciByZWFkXG4gIGlmIChwcmVmaXggPT09IG51bGwpXG4gICAgcmVhZCA9ICcuJ1xuICBlbHNlIGlmIChpc0Fic29sdXRlKHByZWZpeCkgfHwgaXNBYnNvbHV0ZShwYXR0ZXJuLmpvaW4oJy8nKSkpIHtcbiAgICBpZiAoIXByZWZpeCB8fCAhaXNBYnNvbHV0ZShwcmVmaXgpKVxuICAgICAgcHJlZml4ID0gJy8nICsgcHJlZml4XG4gICAgcmVhZCA9IHByZWZpeFxuICB9IGVsc2VcbiAgICByZWFkID0gcHJlZml4XG5cbiAgdmFyIGFicyA9IHRoaXMuX21ha2VBYnMocmVhZClcblxuICAvL2lmIGlnbm9yZWQsIHNraXAgcHJvY2Vzc2luZ1xuICBpZiAoY2hpbGRyZW5JZ25vcmVkKHRoaXMsIHJlYWQpKVxuICAgIHJldHVyblxuXG4gIHZhciBpc0dsb2JTdGFyID0gcmVtYWluWzBdID09PSBtaW5pbWF0Y2guR0xPQlNUQVJcbiAgaWYgKGlzR2xvYlN0YXIpXG4gICAgdGhpcy5fcHJvY2Vzc0dsb2JTdGFyKHByZWZpeCwgcmVhZCwgYWJzLCByZW1haW4sIGluZGV4LCBpbkdsb2JTdGFyKVxuICBlbHNlXG4gICAgdGhpcy5fcHJvY2Vzc1JlYWRkaXIocHJlZml4LCByZWFkLCBhYnMsIHJlbWFpbiwgaW5kZXgsIGluR2xvYlN0YXIpXG59XG5cblxuR2xvYlN5bmMucHJvdG90eXBlLl9wcm9jZXNzUmVhZGRpciA9IGZ1bmN0aW9uIChwcmVmaXgsIHJlYWQsIGFicywgcmVtYWluLCBpbmRleCwgaW5HbG9iU3Rhcikge1xuICB2YXIgZW50cmllcyA9IHRoaXMuX3JlYWRkaXIoYWJzLCBpbkdsb2JTdGFyKVxuXG4gIC8vIGlmIHRoZSBhYnMgaXNuJ3QgYSBkaXIsIHRoZW4gbm90aGluZyBjYW4gbWF0Y2ghXG4gIGlmICghZW50cmllcylcbiAgICByZXR1cm5cblxuICAvLyBJdCB3aWxsIG9ubHkgbWF0Y2ggZG90IGVudHJpZXMgaWYgaXQgc3RhcnRzIHdpdGggYSBkb3QsIG9yIGlmXG4gIC8vIGRvdCBpcyBzZXQuICBTdHVmZiBsaWtlIEAoLmZvb3wuYmFyKSBpc24ndCBhbGxvd2VkLlxuICB2YXIgcG4gPSByZW1haW5bMF1cbiAgdmFyIG5lZ2F0ZSA9ICEhdGhpcy5taW5pbWF0Y2gubmVnYXRlXG4gIHZhciByYXdHbG9iID0gcG4uX2dsb2JcbiAgdmFyIGRvdE9rID0gdGhpcy5kb3QgfHwgcmF3R2xvYi5jaGFyQXQoMCkgPT09ICcuJ1xuXG4gIHZhciBtYXRjaGVkRW50cmllcyA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZW50cmllcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBlID0gZW50cmllc1tpXVxuICAgIGlmIChlLmNoYXJBdCgwKSAhPT0gJy4nIHx8IGRvdE9rKSB7XG4gICAgICB2YXIgbVxuICAgICAgaWYgKG5lZ2F0ZSAmJiAhcHJlZml4KSB7XG4gICAgICAgIG0gPSAhZS5tYXRjaChwbilcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG0gPSBlLm1hdGNoKHBuKVxuICAgICAgfVxuICAgICAgaWYgKG0pXG4gICAgICAgIG1hdGNoZWRFbnRyaWVzLnB1c2goZSlcbiAgICB9XG4gIH1cblxuICB2YXIgbGVuID0gbWF0Y2hlZEVudHJpZXMubGVuZ3RoXG4gIC8vIElmIHRoZXJlIGFyZSBubyBtYXRjaGVkIGVudHJpZXMsIHRoZW4gbm90aGluZyBtYXRjaGVzLlxuICBpZiAobGVuID09PSAwKVxuICAgIHJldHVyblxuXG4gIC8vIGlmIHRoaXMgaXMgdGhlIGxhc3QgcmVtYWluaW5nIHBhdHRlcm4gYml0LCB0aGVuIG5vIG5lZWQgZm9yXG4gIC8vIGFuIGFkZGl0aW9uYWwgc3RhdCAqdW5sZXNzKiB0aGUgdXNlciBoYXMgc3BlY2lmaWVkIG1hcmsgb3JcbiAgLy8gc3RhdCBleHBsaWNpdGx5LiAgV2Uga25vdyB0aGV5IGV4aXN0LCBzaW5jZSByZWFkZGlyIHJldHVybmVkXG4gIC8vIHRoZW0uXG5cbiAgaWYgKHJlbWFpbi5sZW5ndGggPT09IDEgJiYgIXRoaXMubWFyayAmJiAhdGhpcy5zdGF0KSB7XG4gICAgaWYgKCF0aGlzLm1hdGNoZXNbaW5kZXhdKVxuICAgICAgdGhpcy5tYXRjaGVzW2luZGV4XSA9IE9iamVjdC5jcmVhdGUobnVsbClcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICsrKSB7XG4gICAgICB2YXIgZSA9IG1hdGNoZWRFbnRyaWVzW2ldXG4gICAgICBpZiAocHJlZml4KSB7XG4gICAgICAgIGlmIChwcmVmaXguc2xpY2UoLTEpICE9PSAnLycpXG4gICAgICAgICAgZSA9IHByZWZpeCArICcvJyArIGVcbiAgICAgICAgZWxzZVxuICAgICAgICAgIGUgPSBwcmVmaXggKyBlXG4gICAgICB9XG5cbiAgICAgIGlmIChlLmNoYXJBdCgwKSA9PT0gJy8nICYmICF0aGlzLm5vbW91bnQpIHtcbiAgICAgICAgZSA9IHBhdGguam9pbih0aGlzLnJvb3QsIGUpXG4gICAgICB9XG4gICAgICB0aGlzLl9lbWl0TWF0Y2goaW5kZXgsIGUpXG4gICAgfVxuICAgIC8vIFRoaXMgd2FzIHRoZSBsYXN0IG9uZSwgYW5kIG5vIHN0YXRzIHdlcmUgbmVlZGVkXG4gICAgcmV0dXJuXG4gIH1cblxuICAvLyBub3cgdGVzdCBhbGwgbWF0Y2hlZCBlbnRyaWVzIGFzIHN0YW5kLWlucyBmb3IgdGhhdCBwYXJ0XG4gIC8vIG9mIHRoZSBwYXR0ZXJuLlxuICByZW1haW4uc2hpZnQoKVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArKykge1xuICAgIHZhciBlID0gbWF0Y2hlZEVudHJpZXNbaV1cbiAgICB2YXIgbmV3UGF0dGVyblxuICAgIGlmIChwcmVmaXgpXG4gICAgICBuZXdQYXR0ZXJuID0gW3ByZWZpeCwgZV1cbiAgICBlbHNlXG4gICAgICBuZXdQYXR0ZXJuID0gW2VdXG4gICAgdGhpcy5fcHJvY2VzcyhuZXdQYXR0ZXJuLmNvbmNhdChyZW1haW4pLCBpbmRleCwgaW5HbG9iU3RhcilcbiAgfVxufVxuXG5cbkdsb2JTeW5jLnByb3RvdHlwZS5fZW1pdE1hdGNoID0gZnVuY3Rpb24gKGluZGV4LCBlKSB7XG4gIGlmIChpc0lnbm9yZWQodGhpcywgZSkpXG4gICAgcmV0dXJuXG5cbiAgdmFyIGFicyA9IHRoaXMuX21ha2VBYnMoZSlcblxuICBpZiAodGhpcy5tYXJrKVxuICAgIGUgPSB0aGlzLl9tYXJrKGUpXG5cbiAgaWYgKHRoaXMuYWJzb2x1dGUpIHtcbiAgICBlID0gYWJzXG4gIH1cblxuICBpZiAodGhpcy5tYXRjaGVzW2luZGV4XVtlXSlcbiAgICByZXR1cm5cblxuICBpZiAodGhpcy5ub2Rpcikge1xuICAgIHZhciBjID0gdGhpcy5jYWNoZVthYnNdXG4gICAgaWYgKGMgPT09ICdESVInIHx8IEFycmF5LmlzQXJyYXkoYykpXG4gICAgICByZXR1cm5cbiAgfVxuXG4gIHRoaXMubWF0Y2hlc1tpbmRleF1bZV0gPSB0cnVlXG5cbiAgaWYgKHRoaXMuc3RhdClcbiAgICB0aGlzLl9zdGF0KGUpXG59XG5cblxuR2xvYlN5bmMucHJvdG90eXBlLl9yZWFkZGlySW5HbG9iU3RhciA9IGZ1bmN0aW9uIChhYnMpIHtcbiAgLy8gZm9sbG93IGFsbCBzeW1saW5rZWQgZGlyZWN0b3JpZXMgZm9yZXZlclxuICAvLyBqdXN0IHByb2NlZWQgYXMgaWYgdGhpcyBpcyBhIG5vbi1nbG9ic3RhciBzaXR1YXRpb25cbiAgaWYgKHRoaXMuZm9sbG93KVxuICAgIHJldHVybiB0aGlzLl9yZWFkZGlyKGFicywgZmFsc2UpXG5cbiAgdmFyIGVudHJpZXNcbiAgdmFyIGxzdGF0XG4gIHZhciBzdGF0XG4gIHRyeSB7XG4gICAgbHN0YXQgPSBmcy5sc3RhdFN5bmMoYWJzKVxuICB9IGNhdGNoIChlcikge1xuICAgIGlmIChlci5jb2RlID09PSAnRU5PRU5UJykge1xuICAgICAgLy8gbHN0YXQgZmFpbGVkLCBkb2Vzbid0IGV4aXN0XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgfVxuXG4gIHZhciBpc1N5bSA9IGxzdGF0ICYmIGxzdGF0LmlzU3ltYm9saWNMaW5rKClcbiAgdGhpcy5zeW1saW5rc1thYnNdID0gaXNTeW1cblxuICAvLyBJZiBpdCdzIG5vdCBhIHN5bWxpbmsgb3IgYSBkaXIsIHRoZW4gaXQncyBkZWZpbml0ZWx5IGEgcmVndWxhciBmaWxlLlxuICAvLyBkb24ndCBib3RoZXIgZG9pbmcgYSByZWFkZGlyIGluIHRoYXQgY2FzZS5cbiAgaWYgKCFpc1N5bSAmJiBsc3RhdCAmJiAhbHN0YXQuaXNEaXJlY3RvcnkoKSlcbiAgICB0aGlzLmNhY2hlW2Fic10gPSAnRklMRSdcbiAgZWxzZVxuICAgIGVudHJpZXMgPSB0aGlzLl9yZWFkZGlyKGFicywgZmFsc2UpXG5cbiAgcmV0dXJuIGVudHJpZXNcbn1cblxuR2xvYlN5bmMucHJvdG90eXBlLl9yZWFkZGlyID0gZnVuY3Rpb24gKGFicywgaW5HbG9iU3Rhcikge1xuICB2YXIgZW50cmllc1xuXG4gIGlmIChpbkdsb2JTdGFyICYmICFvd25Qcm9wKHRoaXMuc3ltbGlua3MsIGFicykpXG4gICAgcmV0dXJuIHRoaXMuX3JlYWRkaXJJbkdsb2JTdGFyKGFicylcblxuICBpZiAob3duUHJvcCh0aGlzLmNhY2hlLCBhYnMpKSB7XG4gICAgdmFyIGMgPSB0aGlzLmNhY2hlW2Fic11cbiAgICBpZiAoIWMgfHwgYyA9PT0gJ0ZJTEUnKVxuICAgICAgcmV0dXJuIG51bGxcblxuICAgIGlmIChBcnJheS5pc0FycmF5KGMpKVxuICAgICAgcmV0dXJuIGNcbiAgfVxuXG4gIHRyeSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlYWRkaXJFbnRyaWVzKGFicywgZnMucmVhZGRpclN5bmMoYWJzKSlcbiAgfSBjYXRjaCAoZXIpIHtcbiAgICB0aGlzLl9yZWFkZGlyRXJyb3IoYWJzLCBlcilcbiAgICByZXR1cm4gbnVsbFxuICB9XG59XG5cbkdsb2JTeW5jLnByb3RvdHlwZS5fcmVhZGRpckVudHJpZXMgPSBmdW5jdGlvbiAoYWJzLCBlbnRyaWVzKSB7XG4gIC8vIGlmIHdlIGhhdmVuJ3QgYXNrZWQgdG8gc3RhdCBldmVyeXRoaW5nLCB0aGVuIGp1c3RcbiAgLy8gYXNzdW1lIHRoYXQgZXZlcnl0aGluZyBpbiB0aGVyZSBleGlzdHMsIHNvIHdlIGNhbiBhdm9pZFxuICAvLyBoYXZpbmcgdG8gc3RhdCBpdCBhIHNlY29uZCB0aW1lLlxuICBpZiAoIXRoaXMubWFyayAmJiAhdGhpcy5zdGF0KSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbnRyaWVzLmxlbmd0aDsgaSArKykge1xuICAgICAgdmFyIGUgPSBlbnRyaWVzW2ldXG4gICAgICBpZiAoYWJzID09PSAnLycpXG4gICAgICAgIGUgPSBhYnMgKyBlXG4gICAgICBlbHNlXG4gICAgICAgIGUgPSBhYnMgKyAnLycgKyBlXG4gICAgICB0aGlzLmNhY2hlW2VdID0gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIHRoaXMuY2FjaGVbYWJzXSA9IGVudHJpZXNcblxuICAvLyBtYXJrIGFuZCBjYWNoZSBkaXItbmVzc1xuICByZXR1cm4gZW50cmllc1xufVxuXG5HbG9iU3luYy5wcm90b3R5cGUuX3JlYWRkaXJFcnJvciA9IGZ1bmN0aW9uIChmLCBlcikge1xuICAvLyBoYW5kbGUgZXJyb3JzLCBhbmQgY2FjaGUgdGhlIGluZm9ybWF0aW9uXG4gIHN3aXRjaCAoZXIuY29kZSkge1xuICAgIGNhc2UgJ0VOT1RTVVAnOiAvLyBodHRwczovL2dpdGh1Yi5jb20vaXNhYWNzL25vZGUtZ2xvYi9pc3N1ZXMvMjA1XG4gICAgY2FzZSAnRU5PVERJUic6IC8vIHRvdGFsbHkgbm9ybWFsLiBtZWFucyBpdCAqZG9lcyogZXhpc3QuXG4gICAgICB2YXIgYWJzID0gdGhpcy5fbWFrZUFicyhmKVxuICAgICAgdGhpcy5jYWNoZVthYnNdID0gJ0ZJTEUnXG4gICAgICBpZiAoYWJzID09PSB0aGlzLmN3ZEFicykge1xuICAgICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IoZXIuY29kZSArICcgaW52YWxpZCBjd2QgJyArIHRoaXMuY3dkKVxuICAgICAgICBlcnJvci5wYXRoID0gdGhpcy5jd2RcbiAgICAgICAgZXJyb3IuY29kZSA9IGVyLmNvZGVcbiAgICAgICAgdGhyb3cgZXJyb3JcbiAgICAgIH1cbiAgICAgIGJyZWFrXG5cbiAgICBjYXNlICdFTk9FTlQnOiAvLyBub3QgdGVycmlibHkgdW51c3VhbFxuICAgIGNhc2UgJ0VMT09QJzpcbiAgICBjYXNlICdFTkFNRVRPT0xPTkcnOlxuICAgIGNhc2UgJ1VOS05PV04nOlxuICAgICAgdGhpcy5jYWNoZVt0aGlzLl9tYWtlQWJzKGYpXSA9IGZhbHNlXG4gICAgICBicmVha1xuXG4gICAgZGVmYXVsdDogLy8gc29tZSB1bnVzdWFsIGVycm9yLiAgVHJlYXQgYXMgZmFpbHVyZS5cbiAgICAgIHRoaXMuY2FjaGVbdGhpcy5fbWFrZUFicyhmKV0gPSBmYWxzZVxuICAgICAgaWYgKHRoaXMuc3RyaWN0KVxuICAgICAgICB0aHJvdyBlclxuICAgICAgaWYgKCF0aGlzLnNpbGVudClcbiAgICAgICAgY29uc29sZS5lcnJvcignZ2xvYiBlcnJvcicsIGVyKVxuICAgICAgYnJlYWtcbiAgfVxufVxuXG5HbG9iU3luYy5wcm90b3R5cGUuX3Byb2Nlc3NHbG9iU3RhciA9IGZ1bmN0aW9uIChwcmVmaXgsIHJlYWQsIGFicywgcmVtYWluLCBpbmRleCwgaW5HbG9iU3Rhcikge1xuXG4gIHZhciBlbnRyaWVzID0gdGhpcy5fcmVhZGRpcihhYnMsIGluR2xvYlN0YXIpXG5cbiAgLy8gbm8gZW50cmllcyBtZWFucyBub3QgYSBkaXIsIHNvIGl0IGNhbiBuZXZlciBoYXZlIG1hdGNoZXNcbiAgLy8gZm9vLnR4dC8qKiBkb2Vzbid0IG1hdGNoIGZvby50eHRcbiAgaWYgKCFlbnRyaWVzKVxuICAgIHJldHVyblxuXG4gIC8vIHRlc3Qgd2l0aG91dCB0aGUgZ2xvYnN0YXIsIGFuZCB3aXRoIGV2ZXJ5IGNoaWxkIGJvdGggYmVsb3dcbiAgLy8gYW5kIHJlcGxhY2luZyB0aGUgZ2xvYnN0YXIuXG4gIHZhciByZW1haW5XaXRob3V0R2xvYlN0YXIgPSByZW1haW4uc2xpY2UoMSlcbiAgdmFyIGdzcHJlZiA9IHByZWZpeCA/IFsgcHJlZml4IF0gOiBbXVxuICB2YXIgbm9HbG9iU3RhciA9IGdzcHJlZi5jb25jYXQocmVtYWluV2l0aG91dEdsb2JTdGFyKVxuXG4gIC8vIHRoZSBub0dsb2JTdGFyIHBhdHRlcm4gZXhpdHMgdGhlIGluR2xvYlN0YXIgc3RhdGVcbiAgdGhpcy5fcHJvY2Vzcyhub0dsb2JTdGFyLCBpbmRleCwgZmFsc2UpXG5cbiAgdmFyIGxlbiA9IGVudHJpZXMubGVuZ3RoXG4gIHZhciBpc1N5bSA9IHRoaXMuc3ltbGlua3NbYWJzXVxuXG4gIC8vIElmIGl0J3MgYSBzeW1saW5rLCBhbmQgd2UncmUgaW4gYSBnbG9ic3RhciwgdGhlbiBzdG9wXG4gIGlmIChpc1N5bSAmJiBpbkdsb2JTdGFyKVxuICAgIHJldHVyblxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICB2YXIgZSA9IGVudHJpZXNbaV1cbiAgICBpZiAoZS5jaGFyQXQoMCkgPT09ICcuJyAmJiAhdGhpcy5kb3QpXG4gICAgICBjb250aW51ZVxuXG4gICAgLy8gdGhlc2UgdHdvIGNhc2VzIGVudGVyIHRoZSBpbkdsb2JTdGFyIHN0YXRlXG4gICAgdmFyIGluc3RlYWQgPSBnc3ByZWYuY29uY2F0KGVudHJpZXNbaV0sIHJlbWFpbldpdGhvdXRHbG9iU3RhcilcbiAgICB0aGlzLl9wcm9jZXNzKGluc3RlYWQsIGluZGV4LCB0cnVlKVxuXG4gICAgdmFyIGJlbG93ID0gZ3NwcmVmLmNvbmNhdChlbnRyaWVzW2ldLCByZW1haW4pXG4gICAgdGhpcy5fcHJvY2VzcyhiZWxvdywgaW5kZXgsIHRydWUpXG4gIH1cbn1cblxuR2xvYlN5bmMucHJvdG90eXBlLl9wcm9jZXNzU2ltcGxlID0gZnVuY3Rpb24gKHByZWZpeCwgaW5kZXgpIHtcbiAgLy8gWFhYIHJldmlldyB0aGlzLiAgU2hvdWxkbid0IGl0IGJlIGRvaW5nIHRoZSBtb3VudGluZyBldGNcbiAgLy8gYmVmb3JlIGRvaW5nIHN0YXQ/ICBraW5kYSB3ZWlyZD9cbiAgdmFyIGV4aXN0cyA9IHRoaXMuX3N0YXQocHJlZml4KVxuXG4gIGlmICghdGhpcy5tYXRjaGVzW2luZGV4XSlcbiAgICB0aGlzLm1hdGNoZXNbaW5kZXhdID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuXG4gIC8vIElmIGl0IGRvZXNuJ3QgZXhpc3QsIHRoZW4ganVzdCBtYXJrIHRoZSBsYWNrIG9mIHJlc3VsdHNcbiAgaWYgKCFleGlzdHMpXG4gICAgcmV0dXJuXG5cbiAgaWYgKHByZWZpeCAmJiBpc0Fic29sdXRlKHByZWZpeCkgJiYgIXRoaXMubm9tb3VudCkge1xuICAgIHZhciB0cmFpbCA9IC9bXFwvXFxcXF0kLy50ZXN0KHByZWZpeClcbiAgICBpZiAocHJlZml4LmNoYXJBdCgwKSA9PT0gJy8nKSB7XG4gICAgICBwcmVmaXggPSBwYXRoLmpvaW4odGhpcy5yb290LCBwcmVmaXgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHByZWZpeCA9IHBhdGgucmVzb2x2ZSh0aGlzLnJvb3QsIHByZWZpeClcbiAgICAgIGlmICh0cmFpbClcbiAgICAgICAgcHJlZml4ICs9ICcvJ1xuICAgIH1cbiAgfVxuXG4gIGlmIChwcm9jZXNzLnBsYXRmb3JtID09PSAnd2luMzInKVxuICAgIHByZWZpeCA9IHByZWZpeC5yZXBsYWNlKC9cXFxcL2csICcvJylcblxuICAvLyBNYXJrIHRoaXMgYXMgYSBtYXRjaFxuICB0aGlzLl9lbWl0TWF0Y2goaW5kZXgsIHByZWZpeClcbn1cblxuLy8gUmV0dXJucyBlaXRoZXIgJ0RJUicsICdGSUxFJywgb3IgZmFsc2Vcbkdsb2JTeW5jLnByb3RvdHlwZS5fc3RhdCA9IGZ1bmN0aW9uIChmKSB7XG4gIHZhciBhYnMgPSB0aGlzLl9tYWtlQWJzKGYpXG4gIHZhciBuZWVkRGlyID0gZi5zbGljZSgtMSkgPT09ICcvJ1xuXG4gIGlmIChmLmxlbmd0aCA+IHRoaXMubWF4TGVuZ3RoKVxuICAgIHJldHVybiBmYWxzZVxuXG4gIGlmICghdGhpcy5zdGF0ICYmIG93blByb3AodGhpcy5jYWNoZSwgYWJzKSkge1xuICAgIHZhciBjID0gdGhpcy5jYWNoZVthYnNdXG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShjKSlcbiAgICAgIGMgPSAnRElSJ1xuXG4gICAgLy8gSXQgZXhpc3RzLCBidXQgbWF5YmUgbm90IGhvdyB3ZSBuZWVkIGl0XG4gICAgaWYgKCFuZWVkRGlyIHx8IGMgPT09ICdESVInKVxuICAgICAgcmV0dXJuIGNcblxuICAgIGlmIChuZWVkRGlyICYmIGMgPT09ICdGSUxFJylcbiAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgLy8gb3RoZXJ3aXNlIHdlIGhhdmUgdG8gc3RhdCwgYmVjYXVzZSBtYXliZSBjPXRydWVcbiAgICAvLyBpZiB3ZSBrbm93IGl0IGV4aXN0cywgYnV0IG5vdCB3aGF0IGl0IGlzLlxuICB9XG5cbiAgdmFyIGV4aXN0c1xuICB2YXIgc3RhdCA9IHRoaXMuc3RhdENhY2hlW2Fic11cbiAgaWYgKCFzdGF0KSB7XG4gICAgdmFyIGxzdGF0XG4gICAgdHJ5IHtcbiAgICAgIGxzdGF0ID0gZnMubHN0YXRTeW5jKGFicylcbiAgICB9IGNhdGNoIChlcikge1xuICAgICAgaWYgKGVyICYmIChlci5jb2RlID09PSAnRU5PRU5UJyB8fCBlci5jb2RlID09PSAnRU5PVERJUicpKSB7XG4gICAgICAgIHRoaXMuc3RhdENhY2hlW2Fic10gPSBmYWxzZVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobHN0YXQgJiYgbHN0YXQuaXNTeW1ib2xpY0xpbmsoKSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgc3RhdCA9IGZzLnN0YXRTeW5jKGFicylcbiAgICAgIH0gY2F0Y2ggKGVyKSB7XG4gICAgICAgIHN0YXQgPSBsc3RhdFxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0ID0gbHN0YXRcbiAgICB9XG4gIH1cblxuICB0aGlzLnN0YXRDYWNoZVthYnNdID0gc3RhdFxuXG4gIHZhciBjID0gdHJ1ZVxuICBpZiAoc3RhdClcbiAgICBjID0gc3RhdC5pc0RpcmVjdG9yeSgpID8gJ0RJUicgOiAnRklMRSdcblxuICB0aGlzLmNhY2hlW2Fic10gPSB0aGlzLmNhY2hlW2Fic10gfHwgY1xuXG4gIGlmIChuZWVkRGlyICYmIGMgPT09ICdGSUxFJylcbiAgICByZXR1cm4gZmFsc2VcblxuICByZXR1cm4gY1xufVxuXG5HbG9iU3luYy5wcm90b3R5cGUuX21hcmsgPSBmdW5jdGlvbiAocCkge1xuICByZXR1cm4gY29tbW9uLm1hcmsodGhpcywgcClcbn1cblxuR2xvYlN5bmMucHJvdG90eXBlLl9tYWtlQWJzID0gZnVuY3Rpb24gKGYpIHtcbiAgcmV0dXJuIGNvbW1vbi5tYWtlQWJzKHRoaXMsIGYpXG59XG4iLCJleHBvcnRzLmFscGhhc29ydCA9IGFscGhhc29ydFxuZXhwb3J0cy5hbHBoYXNvcnRpID0gYWxwaGFzb3J0aVxuZXhwb3J0cy5zZXRvcHRzID0gc2V0b3B0c1xuZXhwb3J0cy5vd25Qcm9wID0gb3duUHJvcFxuZXhwb3J0cy5tYWtlQWJzID0gbWFrZUFic1xuZXhwb3J0cy5maW5pc2ggPSBmaW5pc2hcbmV4cG9ydHMubWFyayA9IG1hcmtcbmV4cG9ydHMuaXNJZ25vcmVkID0gaXNJZ25vcmVkXG5leHBvcnRzLmNoaWxkcmVuSWdub3JlZCA9IGNoaWxkcmVuSWdub3JlZFxuXG5mdW5jdGlvbiBvd25Qcm9wIChvYmosIGZpZWxkKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBmaWVsZClcbn1cblxudmFyIHBhdGggPSByZXF1aXJlKFwicGF0aFwiKVxudmFyIG1pbmltYXRjaCA9IHJlcXVpcmUoXCJtaW5pbWF0Y2hcIilcbnZhciBpc0Fic29sdXRlID0gcmVxdWlyZShcInBhdGgtaXMtYWJzb2x1dGVcIilcbnZhciBNaW5pbWF0Y2ggPSBtaW5pbWF0Y2guTWluaW1hdGNoXG5cbmZ1bmN0aW9uIGFscGhhc29ydGkgKGEsIGIpIHtcbiAgcmV0dXJuIGEudG9Mb3dlckNhc2UoKS5sb2NhbGVDb21wYXJlKGIudG9Mb3dlckNhc2UoKSlcbn1cblxuZnVuY3Rpb24gYWxwaGFzb3J0IChhLCBiKSB7XG4gIHJldHVybiBhLmxvY2FsZUNvbXBhcmUoYilcbn1cblxuZnVuY3Rpb24gc2V0dXBJZ25vcmVzIChzZWxmLCBvcHRpb25zKSB7XG4gIHNlbGYuaWdub3JlID0gb3B0aW9ucy5pZ25vcmUgfHwgW11cblxuICBpZiAoIUFycmF5LmlzQXJyYXkoc2VsZi5pZ25vcmUpKVxuICAgIHNlbGYuaWdub3JlID0gW3NlbGYuaWdub3JlXVxuXG4gIGlmIChzZWxmLmlnbm9yZS5sZW5ndGgpIHtcbiAgICBzZWxmLmlnbm9yZSA9IHNlbGYuaWdub3JlLm1hcChpZ25vcmVNYXApXG4gIH1cbn1cblxuLy8gaWdub3JlIHBhdHRlcm5zIGFyZSBhbHdheXMgaW4gZG90OnRydWUgbW9kZS5cbmZ1bmN0aW9uIGlnbm9yZU1hcCAocGF0dGVybikge1xuICB2YXIgZ21hdGNoZXIgPSBudWxsXG4gIGlmIChwYXR0ZXJuLnNsaWNlKC0zKSA9PT0gJy8qKicpIHtcbiAgICB2YXIgZ3BhdHRlcm4gPSBwYXR0ZXJuLnJlcGxhY2UoLyhcXC9cXCpcXCopKyQvLCAnJylcbiAgICBnbWF0Y2hlciA9IG5ldyBNaW5pbWF0Y2goZ3BhdHRlcm4sIHsgZG90OiB0cnVlIH0pXG4gIH1cblxuICByZXR1cm4ge1xuICAgIG1hdGNoZXI6IG5ldyBNaW5pbWF0Y2gocGF0dGVybiwgeyBkb3Q6IHRydWUgfSksXG4gICAgZ21hdGNoZXI6IGdtYXRjaGVyXG4gIH1cbn1cblxuZnVuY3Rpb24gc2V0b3B0cyAoc2VsZiwgcGF0dGVybiwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpXG4gICAgb3B0aW9ucyA9IHt9XG5cbiAgLy8gYmFzZS1tYXRjaGluZzoganVzdCB1c2UgZ2xvYnN0YXIgZm9yIHRoYXQuXG4gIGlmIChvcHRpb25zLm1hdGNoQmFzZSAmJiAtMSA9PT0gcGF0dGVybi5pbmRleE9mKFwiL1wiKSkge1xuICAgIGlmIChvcHRpb25zLm5vZ2xvYnN0YXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImJhc2UgbWF0Y2hpbmcgcmVxdWlyZXMgZ2xvYnN0YXJcIilcbiAgICB9XG4gICAgcGF0dGVybiA9IFwiKiovXCIgKyBwYXR0ZXJuXG4gIH1cblxuICBzZWxmLnNpbGVudCA9ICEhb3B0aW9ucy5zaWxlbnRcbiAgc2VsZi5wYXR0ZXJuID0gcGF0dGVyblxuICBzZWxmLnN0cmljdCA9IG9wdGlvbnMuc3RyaWN0ICE9PSBmYWxzZVxuICBzZWxmLnJlYWxwYXRoID0gISFvcHRpb25zLnJlYWxwYXRoXG4gIHNlbGYucmVhbHBhdGhDYWNoZSA9IG9wdGlvbnMucmVhbHBhdGhDYWNoZSB8fCBPYmplY3QuY3JlYXRlKG51bGwpXG4gIHNlbGYuZm9sbG93ID0gISFvcHRpb25zLmZvbGxvd1xuICBzZWxmLmRvdCA9ICEhb3B0aW9ucy5kb3RcbiAgc2VsZi5tYXJrID0gISFvcHRpb25zLm1hcmtcbiAgc2VsZi5ub2RpciA9ICEhb3B0aW9ucy5ub2RpclxuICBpZiAoc2VsZi5ub2RpcilcbiAgICBzZWxmLm1hcmsgPSB0cnVlXG4gIHNlbGYuc3luYyA9ICEhb3B0aW9ucy5zeW5jXG4gIHNlbGYubm91bmlxdWUgPSAhIW9wdGlvbnMubm91bmlxdWVcbiAgc2VsZi5ub251bGwgPSAhIW9wdGlvbnMubm9udWxsXG4gIHNlbGYubm9zb3J0ID0gISFvcHRpb25zLm5vc29ydFxuICBzZWxmLm5vY2FzZSA9ICEhb3B0aW9ucy5ub2Nhc2VcbiAgc2VsZi5zdGF0ID0gISFvcHRpb25zLnN0YXRcbiAgc2VsZi5ub3Byb2Nlc3MgPSAhIW9wdGlvbnMubm9wcm9jZXNzXG4gIHNlbGYuYWJzb2x1dGUgPSAhIW9wdGlvbnMuYWJzb2x1dGVcblxuICBzZWxmLm1heExlbmd0aCA9IG9wdGlvbnMubWF4TGVuZ3RoIHx8IEluZmluaXR5XG4gIHNlbGYuY2FjaGUgPSBvcHRpb25zLmNhY2hlIHx8IE9iamVjdC5jcmVhdGUobnVsbClcbiAgc2VsZi5zdGF0Q2FjaGUgPSBvcHRpb25zLnN0YXRDYWNoZSB8fCBPYmplY3QuY3JlYXRlKG51bGwpXG4gIHNlbGYuc3ltbGlua3MgPSBvcHRpb25zLnN5bWxpbmtzIHx8IE9iamVjdC5jcmVhdGUobnVsbClcblxuICBzZXR1cElnbm9yZXMoc2VsZiwgb3B0aW9ucylcblxuICBzZWxmLmNoYW5nZWRDd2QgPSBmYWxzZVxuICB2YXIgY3dkID0gcHJvY2Vzcy5jd2QoKVxuICBpZiAoIW93blByb3Aob3B0aW9ucywgXCJjd2RcIikpXG4gICAgc2VsZi5jd2QgPSBjd2RcbiAgZWxzZSB7XG4gICAgc2VsZi5jd2QgPSBwYXRoLnJlc29sdmUob3B0aW9ucy5jd2QpXG4gICAgc2VsZi5jaGFuZ2VkQ3dkID0gc2VsZi5jd2QgIT09IGN3ZFxuICB9XG5cbiAgc2VsZi5yb290ID0gb3B0aW9ucy5yb290IHx8IHBhdGgucmVzb2x2ZShzZWxmLmN3ZCwgXCIvXCIpXG4gIHNlbGYucm9vdCA9IHBhdGgucmVzb2x2ZShzZWxmLnJvb3QpXG4gIGlmIChwcm9jZXNzLnBsYXRmb3JtID09PSBcIndpbjMyXCIpXG4gICAgc2VsZi5yb290ID0gc2VsZi5yb290LnJlcGxhY2UoL1xcXFwvZywgXCIvXCIpXG5cbiAgLy8gVE9ETzogaXMgYW4gYWJzb2x1dGUgYGN3ZGAgc3VwcG9zZWQgdG8gYmUgcmVzb2x2ZWQgYWdhaW5zdCBgcm9vdGA/XG4gIC8vIGUuZy4geyBjd2Q6ICcvdGVzdCcsIHJvb3Q6IF9fZGlybmFtZSB9ID09PSBwYXRoLmpvaW4oX19kaXJuYW1lLCAnL3Rlc3QnKVxuICBzZWxmLmN3ZEFicyA9IGlzQWJzb2x1dGUoc2VsZi5jd2QpID8gc2VsZi5jd2QgOiBtYWtlQWJzKHNlbGYsIHNlbGYuY3dkKVxuICBpZiAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gXCJ3aW4zMlwiKVxuICAgIHNlbGYuY3dkQWJzID0gc2VsZi5jd2RBYnMucmVwbGFjZSgvXFxcXC9nLCBcIi9cIilcbiAgc2VsZi5ub21vdW50ID0gISFvcHRpb25zLm5vbW91bnRcblxuICAvLyBkaXNhYmxlIGNvbW1lbnRzIGFuZCBuZWdhdGlvbiBpbiBNaW5pbWF0Y2guXG4gIC8vIE5vdGUgdGhhdCB0aGV5IGFyZSBub3Qgc3VwcG9ydGVkIGluIEdsb2IgaXRzZWxmIGFueXdheS5cbiAgb3B0aW9ucy5ub25lZ2F0ZSA9IHRydWVcbiAgb3B0aW9ucy5ub2NvbW1lbnQgPSB0cnVlXG5cbiAgc2VsZi5taW5pbWF0Y2ggPSBuZXcgTWluaW1hdGNoKHBhdHRlcm4sIG9wdGlvbnMpXG4gIHNlbGYub3B0aW9ucyA9IHNlbGYubWluaW1hdGNoLm9wdGlvbnNcbn1cblxuZnVuY3Rpb24gZmluaXNoIChzZWxmKSB7XG4gIHZhciBub3UgPSBzZWxmLm5vdW5pcXVlXG4gIHZhciBhbGwgPSBub3UgPyBbXSA6IE9iamVjdC5jcmVhdGUobnVsbClcblxuICBmb3IgKHZhciBpID0gMCwgbCA9IHNlbGYubWF0Y2hlcy5sZW5ndGg7IGkgPCBsOyBpICsrKSB7XG4gICAgdmFyIG1hdGNoZXMgPSBzZWxmLm1hdGNoZXNbaV1cbiAgICBpZiAoIW1hdGNoZXMgfHwgT2JqZWN0LmtleXMobWF0Y2hlcykubGVuZ3RoID09PSAwKSB7XG4gICAgICBpZiAoc2VsZi5ub251bGwpIHtcbiAgICAgICAgLy8gZG8gbGlrZSB0aGUgc2hlbGwsIGFuZCBzcGl0IG91dCB0aGUgbGl0ZXJhbCBnbG9iXG4gICAgICAgIHZhciBsaXRlcmFsID0gc2VsZi5taW5pbWF0Y2guZ2xvYlNldFtpXVxuICAgICAgICBpZiAobm91KVxuICAgICAgICAgIGFsbC5wdXNoKGxpdGVyYWwpXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBhbGxbbGl0ZXJhbF0gPSB0cnVlXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGhhZCBtYXRjaGVzXG4gICAgICB2YXIgbSA9IE9iamVjdC5rZXlzKG1hdGNoZXMpXG4gICAgICBpZiAobm91KVxuICAgICAgICBhbGwucHVzaC5hcHBseShhbGwsIG0pXG4gICAgICBlbHNlXG4gICAgICAgIG0uZm9yRWFjaChmdW5jdGlvbiAobSkge1xuICAgICAgICAgIGFsbFttXSA9IHRydWVcbiAgICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBpZiAoIW5vdSlcbiAgICBhbGwgPSBPYmplY3Qua2V5cyhhbGwpXG5cbiAgaWYgKCFzZWxmLm5vc29ydClcbiAgICBhbGwgPSBhbGwuc29ydChzZWxmLm5vY2FzZSA/IGFscGhhc29ydGkgOiBhbHBoYXNvcnQpXG5cbiAgLy8gYXQgKnNvbWUqIHBvaW50IHdlIHN0YXR0ZWQgYWxsIG9mIHRoZXNlXG4gIGlmIChzZWxmLm1hcmspIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFsbC5sZW5ndGg7IGkrKykge1xuICAgICAgYWxsW2ldID0gc2VsZi5fbWFyayhhbGxbaV0pXG4gICAgfVxuICAgIGlmIChzZWxmLm5vZGlyKSB7XG4gICAgICBhbGwgPSBhbGwuZmlsdGVyKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHZhciBub3REaXIgPSAhKC9cXC8kLy50ZXN0KGUpKVxuICAgICAgICB2YXIgYyA9IHNlbGYuY2FjaGVbZV0gfHwgc2VsZi5jYWNoZVttYWtlQWJzKHNlbGYsIGUpXVxuICAgICAgICBpZiAobm90RGlyICYmIGMpXG4gICAgICAgICAgbm90RGlyID0gYyAhPT0gJ0RJUicgJiYgIUFycmF5LmlzQXJyYXkoYylcbiAgICAgICAgcmV0dXJuIG5vdERpclxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBpZiAoc2VsZi5pZ25vcmUubGVuZ3RoKVxuICAgIGFsbCA9IGFsbC5maWx0ZXIoZnVuY3Rpb24obSkge1xuICAgICAgcmV0dXJuICFpc0lnbm9yZWQoc2VsZiwgbSlcbiAgICB9KVxuXG4gIHNlbGYuZm91bmQgPSBhbGxcbn1cblxuZnVuY3Rpb24gbWFyayAoc2VsZiwgcCkge1xuICB2YXIgYWJzID0gbWFrZUFicyhzZWxmLCBwKVxuICB2YXIgYyA9IHNlbGYuY2FjaGVbYWJzXVxuICB2YXIgbSA9IHBcbiAgaWYgKGMpIHtcbiAgICB2YXIgaXNEaXIgPSBjID09PSAnRElSJyB8fCBBcnJheS5pc0FycmF5KGMpXG4gICAgdmFyIHNsYXNoID0gcC5zbGljZSgtMSkgPT09ICcvJ1xuXG4gICAgaWYgKGlzRGlyICYmICFzbGFzaClcbiAgICAgIG0gKz0gJy8nXG4gICAgZWxzZSBpZiAoIWlzRGlyICYmIHNsYXNoKVxuICAgICAgbSA9IG0uc2xpY2UoMCwgLTEpXG5cbiAgICBpZiAobSAhPT0gcCkge1xuICAgICAgdmFyIG1hYnMgPSBtYWtlQWJzKHNlbGYsIG0pXG4gICAgICBzZWxmLnN0YXRDYWNoZVttYWJzXSA9IHNlbGYuc3RhdENhY2hlW2Fic11cbiAgICAgIHNlbGYuY2FjaGVbbWFic10gPSBzZWxmLmNhY2hlW2Fic11cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbVxufVxuXG4vLyBsb3R0YSBzaXR1cHMuLi5cbmZ1bmN0aW9uIG1ha2VBYnMgKHNlbGYsIGYpIHtcbiAgdmFyIGFicyA9IGZcbiAgaWYgKGYuY2hhckF0KDApID09PSAnLycpIHtcbiAgICBhYnMgPSBwYXRoLmpvaW4oc2VsZi5yb290LCBmKVxuICB9IGVsc2UgaWYgKGlzQWJzb2x1dGUoZikgfHwgZiA9PT0gJycpIHtcbiAgICBhYnMgPSBmXG4gIH0gZWxzZSBpZiAoc2VsZi5jaGFuZ2VkQ3dkKSB7XG4gICAgYWJzID0gcGF0aC5yZXNvbHZlKHNlbGYuY3dkLCBmKVxuICB9IGVsc2Uge1xuICAgIGFicyA9IHBhdGgucmVzb2x2ZShmKVxuICB9XG5cbiAgaWYgKHByb2Nlc3MucGxhdGZvcm0gPT09ICd3aW4zMicpXG4gICAgYWJzID0gYWJzLnJlcGxhY2UoL1xcXFwvZywgJy8nKVxuXG4gIHJldHVybiBhYnNcbn1cblxuXG4vLyBSZXR1cm4gdHJ1ZSwgaWYgcGF0dGVybiBlbmRzIHdpdGggZ2xvYnN0YXIgJyoqJywgZm9yIHRoZSBhY2NvbXBhbnlpbmcgcGFyZW50IGRpcmVjdG9yeS5cbi8vIEV4Oi0gSWYgbm9kZV9tb2R1bGVzLyoqIGlzIHRoZSBwYXR0ZXJuLCBhZGQgJ25vZGVfbW9kdWxlcycgdG8gaWdub3JlIGxpc3QgYWxvbmcgd2l0aCBpdCdzIGNvbnRlbnRzXG5mdW5jdGlvbiBpc0lnbm9yZWQgKHNlbGYsIHBhdGgpIHtcbiAgaWYgKCFzZWxmLmlnbm9yZS5sZW5ndGgpXG4gICAgcmV0dXJuIGZhbHNlXG5cbiAgcmV0dXJuIHNlbGYuaWdub3JlLnNvbWUoZnVuY3Rpb24oaXRlbSkge1xuICAgIHJldHVybiBpdGVtLm1hdGNoZXIubWF0Y2gocGF0aCkgfHwgISEoaXRlbS5nbWF0Y2hlciAmJiBpdGVtLmdtYXRjaGVyLm1hdGNoKHBhdGgpKVxuICB9KVxufVxuXG5mdW5jdGlvbiBjaGlsZHJlbklnbm9yZWQgKHNlbGYsIHBhdGgpIHtcbiAgaWYgKCFzZWxmLmlnbm9yZS5sZW5ndGgpXG4gICAgcmV0dXJuIGZhbHNlXG5cbiAgcmV0dXJuIHNlbGYuaWdub3JlLnNvbWUoZnVuY3Rpb24oaXRlbSkge1xuICAgIHJldHVybiAhIShpdGVtLmdtYXRjaGVyICYmIGl0ZW0uZ21hdGNoZXIubWF0Y2gocGF0aCkpXG4gIH0pXG59XG4iLCJ2YXIgd3JhcHB5ID0gcmVxdWlyZSgnd3JhcHB5JylcbnZhciByZXFzID0gT2JqZWN0LmNyZWF0ZShudWxsKVxudmFyIG9uY2UgPSByZXF1aXJlKCdvbmNlJylcblxubW9kdWxlLmV4cG9ydHMgPSB3cmFwcHkoaW5mbGlnaHQpXG5cbmZ1bmN0aW9uIGluZmxpZ2h0IChrZXksIGNiKSB7XG4gIGlmIChyZXFzW2tleV0pIHtcbiAgICByZXFzW2tleV0ucHVzaChjYilcbiAgICByZXR1cm4gbnVsbFxuICB9IGVsc2Uge1xuICAgIHJlcXNba2V5XSA9IFtjYl1cbiAgICByZXR1cm4gbWFrZXJlcyhrZXkpXG4gIH1cbn1cblxuZnVuY3Rpb24gbWFrZXJlcyAoa2V5KSB7XG4gIHJldHVybiBvbmNlKGZ1bmN0aW9uIFJFUyAoKSB7XG4gICAgdmFyIGNicyA9IHJlcXNba2V5XVxuICAgIHZhciBsZW4gPSBjYnMubGVuZ3RoXG4gICAgdmFyIGFyZ3MgPSBzbGljZShhcmd1bWVudHMpXG5cbiAgICAvLyBYWFggSXQncyBzb21ld2hhdCBhbWJpZ3VvdXMgd2hldGhlciBhIG5ldyBjYWxsYmFjayBhZGRlZCBpbiB0aGlzXG4gICAgLy8gcGFzcyBzaG91bGQgYmUgcXVldWVkIGZvciBsYXRlciBleGVjdXRpb24gaWYgc29tZXRoaW5nIGluIHRoZVxuICAgIC8vIGxpc3Qgb2YgY2FsbGJhY2tzIHRocm93cywgb3IgaWYgaXQgc2hvdWxkIGp1c3QgYmUgZGlzY2FyZGVkLlxuICAgIC8vIEhvd2V2ZXIsIGl0J3Mgc3VjaCBhbiBlZGdlIGNhc2UgdGhhdCBpdCBoYXJkbHkgbWF0dGVycywgYW5kIGVpdGhlclxuICAgIC8vIGNob2ljZSBpcyBsaWtlbHkgYXMgc3VycHJpc2luZyBhcyB0aGUgb3RoZXIuXG4gICAgLy8gQXMgaXQgaGFwcGVucywgd2UgZG8gZ28gYWhlYWQgYW5kIHNjaGVkdWxlIGl0IGZvciBsYXRlciBleGVjdXRpb24uXG4gICAgdHJ5IHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgY2JzW2ldLmFwcGx5KG51bGwsIGFyZ3MpXG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChjYnMubGVuZ3RoID4gbGVuKSB7XG4gICAgICAgIC8vIGFkZGVkIG1vcmUgaW4gdGhlIGludGVyaW0uXG4gICAgICAgIC8vIGRlLXphbGdvLCBqdXN0IGluIGNhc2UsIGJ1dCBkb24ndCBjYWxsIGFnYWluLlxuICAgICAgICBjYnMuc3BsaWNlKDAsIGxlbilcbiAgICAgICAgcHJvY2Vzcy5uZXh0VGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgUkVTLmFwcGx5KG51bGwsIGFyZ3MpXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWxldGUgcmVxc1trZXldXG4gICAgICB9XG4gICAgfVxuICB9KVxufVxuXG5mdW5jdGlvbiBzbGljZSAoYXJncykge1xuICB2YXIgbGVuZ3RoID0gYXJncy5sZW5ndGhcbiAgdmFyIGFycmF5ID0gW11cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSBhcnJheVtpXSA9IGFyZ3NbaV1cbiAgcmV0dXJuIGFycmF5XG59XG4iLCIvLyBSZXR1cm5zIGEgd3JhcHBlciBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSB3cmFwcGVkIGNhbGxiYWNrXG4vLyBUaGUgd3JhcHBlciBmdW5jdGlvbiBzaG91bGQgZG8gc29tZSBzdHVmZiwgYW5kIHJldHVybiBhXG4vLyBwcmVzdW1hYmx5IGRpZmZlcmVudCBjYWxsYmFjayBmdW5jdGlvbi5cbi8vIFRoaXMgbWFrZXMgc3VyZSB0aGF0IG93biBwcm9wZXJ0aWVzIGFyZSByZXRhaW5lZCwgc28gdGhhdFxuLy8gZGVjb3JhdGlvbnMgYW5kIHN1Y2ggYXJlIG5vdCBsb3N0IGFsb25nIHRoZSB3YXkuXG5tb2R1bGUuZXhwb3J0cyA9IHdyYXBweVxuZnVuY3Rpb24gd3JhcHB5IChmbiwgY2IpIHtcbiAgaWYgKGZuICYmIGNiKSByZXR1cm4gd3JhcHB5KGZuKShjYilcblxuICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ25lZWQgd3JhcHBlciBmdW5jdGlvbicpXG5cbiAgT2JqZWN0LmtleXMoZm4pLmZvckVhY2goZnVuY3Rpb24gKGspIHtcbiAgICB3cmFwcGVyW2tdID0gZm5ba11cbiAgfSlcblxuICByZXR1cm4gd3JhcHBlclxuXG4gIGZ1bmN0aW9uIHdyYXBwZXIoKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aClcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV1cbiAgICB9XG4gICAgdmFyIHJldCA9IGZuLmFwcGx5KHRoaXMsIGFyZ3MpXG4gICAgdmFyIGNiID0gYXJnc1thcmdzLmxlbmd0aC0xXVxuICAgIGlmICh0eXBlb2YgcmV0ID09PSAnZnVuY3Rpb24nICYmIHJldCAhPT0gY2IpIHtcbiAgICAgIE9iamVjdC5rZXlzKGNiKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7XG4gICAgICAgIHJldFtrXSA9IGNiW2tdXG4gICAgICB9KVxuICAgIH1cbiAgICByZXR1cm4gcmV0XG4gIH1cbn1cbiIsInZhciB3cmFwcHkgPSByZXF1aXJlKCd3cmFwcHknKVxubW9kdWxlLmV4cG9ydHMgPSB3cmFwcHkob25jZSlcbm1vZHVsZS5leHBvcnRzLnN0cmljdCA9IHdyYXBweShvbmNlU3RyaWN0KVxuXG5vbmNlLnByb3RvID0gb25jZShmdW5jdGlvbiAoKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShGdW5jdGlvbi5wcm90b3R5cGUsICdvbmNlJywge1xuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gb25jZSh0aGlzKVxuICAgIH0sXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pXG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZ1bmN0aW9uLnByb3RvdHlwZSwgJ29uY2VTdHJpY3QnLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBvbmNlU3RyaWN0KHRoaXMpXG4gICAgfSxcbiAgICBjb25maWd1cmFibGU6IHRydWVcbiAgfSlcbn0pXG5cbmZ1bmN0aW9uIG9uY2UgKGZuKSB7XG4gIHZhciBmID0gZnVuY3Rpb24gKCkge1xuICAgIGlmIChmLmNhbGxlZCkgcmV0dXJuIGYudmFsdWVcbiAgICBmLmNhbGxlZCA9IHRydWVcbiAgICByZXR1cm4gZi52YWx1ZSA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgfVxuICBmLmNhbGxlZCA9IGZhbHNlXG4gIHJldHVybiBmXG59XG5cbmZ1bmN0aW9uIG9uY2VTdHJpY3QgKGZuKSB7XG4gIHZhciBmID0gZnVuY3Rpb24gKCkge1xuICAgIGlmIChmLmNhbGxlZClcbiAgICAgIHRocm93IG5ldyBFcnJvcihmLm9uY2VFcnJvcilcbiAgICBmLmNhbGxlZCA9IHRydWVcbiAgICByZXR1cm4gZi52YWx1ZSA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgfVxuICB2YXIgbmFtZSA9IGZuLm5hbWUgfHwgJ0Z1bmN0aW9uIHdyYXBwZWQgd2l0aCBgb25jZWAnXG4gIGYub25jZUVycm9yID0gbmFtZSArIFwiIHNob3VsZG4ndCBiZSBjYWxsZWQgbW9yZSB0aGFuIG9uY2VcIlxuICBmLmNhbGxlZCA9IGZhbHNlXG4gIHJldHVybiBmXG59XG4iLCJpbXBvcnQge1V0aWxzfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEdyYWJiZXIge1xyXG5cclxuICAgIGFzeW5jIGdyYWIobnRsZGQ6IHN0cmluZywgdGFyZ2V0RmlsZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmdbXT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiY2hlY2tpbmc6IFwiLCB0YXJnZXRGaWxlKVxyXG4gICAgICAgIGNvbnN0IG91dHB1dCA9IGF3YWl0IFV0aWxzLmV4ZWN1dGUobnRsZGQgKyBcIiBcIiArIHRhcmdldEZpbGUpO1xyXG5cclxuICAgICAgICBjb25zdCByZWcgPSAvXFxiW14pXSpcXCkvZztcclxuICAgICAgICBjb25zdCBsaXN0ID0gb3V0cHV0Lm1hdGNoKHJlZyk7XHJcbiAgICAgICAgbGV0IHJlc3VsdDogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBsaW5lIG9mIGxpc3QpIHtcclxuICAgICAgICAgICAgY29uc3QgZmlsZVBhdGggPSBsaW5lLm1hdGNoKC8oPzw9PT5cXHMqKVteKF0qLylbMF0udHJpbSgpO1xyXG4gICAgICAgICAgICBpZiAoZmlsZVBhdGguaW5kZXhPZihcIlNZU1RFTTMyXCIpIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJkZXBlbmRlbmN5OlwiLCBmaWxlUGF0aCk7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChmaWxlUGF0aCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge2V4ZWN9IGZyb20gXCJjaGlsZF9wcm9jZXNzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVXRpbHMge1xyXG4gICAgc3RhdGljIGFzeW5jIGV4ZWN1dGUoY29tbWFuZDogc3RyaW5nKTpQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxzdHJpbmc+KHJlc29sdmUgPT4ge1xyXG4gICAgICAgICAgICBleGVjKGNvbW1hbmQsIChlcnIsIHN0ZG91dCwgc3RkZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJlc29sdmUoc3Rkb3V0KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNoaWxkX3Byb2Nlc3NcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==