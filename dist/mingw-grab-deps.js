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
console.log("Hello from GROm!");
if (process.argv.length < 3) {
    console.warn("executable is not specified!");
    process.exit(-1);
}
const config = FileUtils_1.FileUtils.readJson(new FilePath_1.FilePath(process.cwd() + "/config.json"));
if (!config) {
    process.exit(-1);
}
const ntldd = config["ntldd-exec"];
if (!ntldd) {
    console.error("ntldd is not specified in the config");
    process.exit(-1);
}
console.log("DONE");


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
  Object.defineProperty(fs, 'FileReadStream', {
    get: function () {
      return ReadStream
    },
    set: function (val) {
      ReadStream = val
    },
    enumerable: true,
    configurable: true
  })
  Object.defineProperty(fs, 'FileWriteStream', {
    get: function () {
      return WriteStream
    },
    set: function (val) {
      WriteStream = val
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


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9maWxlL0ZpbGVVdGlscy50cyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZnMtZXh0cmEvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mcy1leHRyYS9saWIvZnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3VuaXZlcnNhbGlmeS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ3JhY2VmdWwtZnMvZ3JhY2VmdWwtZnMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZnNcIiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ3JhY2VmdWwtZnMvcG9seWZpbGxzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvbnN0YW50c1wiIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ncmFjZWZ1bC1mcy9sZWdhY3ktc3RyZWFtcy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzdHJlYW1cIiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ3JhY2VmdWwtZnMvY2xvbmUuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidXRpbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImFzc2VydFwiIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mcy1leHRyYS9saWIvY29weS1zeW5jL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mcy1leHRyYS9saWIvY29weS1zeW5jL2NvcHktc3luYy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZzLWV4dHJhL2xpYi9ta2RpcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZzLWV4dHJhL2xpYi9ta2RpcnMvbWtkaXJzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mcy1leHRyYS9saWIvbWtkaXJzL3dpbjMyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mcy1leHRyYS9saWIvbWtkaXJzL21rZGlycy1zeW5jLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mcy1leHRyYS9saWIvdXRpbC91dGltZXMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwib3NcIiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZnMtZXh0cmEvbGliL3V0aWwvc3RhdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZnMtZXh0cmEvbGliL3V0aWwvYnVmZmVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mcy1leHRyYS9saWIvY29weS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZnMtZXh0cmEvbGliL2NvcHkvY29weS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZnMtZXh0cmEvbGliL3BhdGgtZXhpc3RzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mcy1leHRyYS9saWIvZW1wdHkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZzLWV4dHJhL2xpYi9yZW1vdmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZzLWV4dHJhL2xpYi9yZW1vdmUvcmltcmFmLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mcy1leHRyYS9saWIvZW5zdXJlL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mcy1leHRyYS9saWIvZW5zdXJlL2ZpbGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZzLWV4dHJhL2xpYi9lbnN1cmUvbGluay5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZnMtZXh0cmEvbGliL2Vuc3VyZS9zeW1saW5rLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mcy1leHRyYS9saWIvZW5zdXJlL3N5bWxpbmstcGF0aHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZzLWV4dHJhL2xpYi9lbnN1cmUvc3ltbGluay10eXBlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mcy1leHRyYS9saWIvanNvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZnMtZXh0cmEvbGliL2pzb24vanNvbmZpbGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2pzb25maWxlL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mcy1leHRyYS9saWIvanNvbi9vdXRwdXQtanNvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZnMtZXh0cmEvbGliL2pzb24vb3V0cHV0LWpzb24tc3luYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZnMtZXh0cmEvbGliL21vdmUtc3luYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZnMtZXh0cmEvbGliL21vdmUtc3luYy9tb3ZlLXN5bmMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZzLWV4dHJhL2xpYi9tb3ZlL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mcy1leHRyYS9saWIvbW92ZS9tb3ZlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mcy1leHRyYS9saWIvb3V0cHV0L2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9maWxlL0ZpbGVQYXRoLnRzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jaGFsay9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXNjYXBlLXN0cmluZy1yZWdleHAvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Fuc2ktc3R5bGVzL2luZGV4LmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbG9yLWNvbnZlcnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbG9yLWNvbnZlcnQvY29udmVyc2lvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbG9yLW5hbWUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbG9yLWNvbnZlcnQvcm91dGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N1cHBvcnRzLWNvbG9yL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9oYXMtZmxhZy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY2hhbGsvdGVtcGxhdGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90bXAvbGliL3RtcC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjcnlwdG9cIiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmltcmFmL3JpbXJhZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2xvYi9nbG9iLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mcy5yZWFscGF0aC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZnMucmVhbHBhdGgvb2xkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9taW5pbWF0Y2gvbWluaW1hdGNoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9icmFjZS1leHBhbnNpb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbmNhdC1tYXAvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhbGFuY2VkLW1hdGNoL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pbmhlcml0cy9pbmhlcml0cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaW5oZXJpdHMvaW5oZXJpdHNfYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJldmVudHNcIiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcGF0aC1pcy1hYnNvbHV0ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2xvYi9zeW5jLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9nbG9iL2NvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaW5mbGlnaHQvaW5mbGlnaHQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dyYXBweS93cmFwcHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL29uY2Uvb25jZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7O0FDbEZBLDJDQUEyQztBQUMzQywyQ0FBeUM7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QTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQy9DWTs7QUFFWixVQUFVLG1CQUFPLENBQUMsQ0FBYztBQUNoQyxlQUFlLG1CQUFPLENBQUMsRUFBVTs7QUFFakM7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDUlk7O0FBRVosV0FBVyxtQkFBTyxDQUFDLENBQWE7QUFDaEMsYUFBYSxtQkFBTyxDQUFDLEVBQU07QUFDM0IsZUFBZSxtQkFBTyxDQUFDLEVBQVE7O0FBRS9COztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyxhQUFhO0FBQ3BCLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7QUN6VFk7O0FB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLFNBQVM7QUFDN0IscUJBQXFCLFNBQVM7QUFDOUI7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7QUNwS0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDckJBLGtCQUFrQixtQkFBTyxDQUFDLEVBQWU7QUFDekMsWUFBWSxtQkFBTyxDQUFDLEVBQVM7O0FBRTdCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0EsdUNBQXVDLFNBQVM7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHdEQUF3RCx1Q0FBdUM7QUFDL0Ysc0RBQXNELHFDQUFxQzs7QUFFM0Y7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0YsQ0FBQzs7QUFFRDs7Ozs7OztBQzdFQTtBQUNBLGtCQUFrQixtQkFBTyxDQUFDLEVBQVk7O0FBRXRDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxPQUFPLDJCQUEyQjtBQUNsQyxPQUFPLDJCQUEyQjtBQUNsQyxPQUFPLDJCQUEyQjtBQUNsQyxPQUFPLDJCQUEyQjtBQUNsQyxRQUFRLDRCQUE0QjtBQUNwQyxPQUFPLDJCQUEyQjtBQUNsQyxPQUFPLDJCQUEyQjtBQUNsQyxPQUFPLDJCQUEyQjtBQUNsQyxPQUFPLDZCQUE2QjtBQUNwQyxXQUFXLGlDQUFpQztBQUM1QyxVQUFVLGdDQUFnQztBQUMxQyxXQUFXLGlDQUFpQztBQUM1QyxPQUFPLHFDQUFxQztBQUM1QyxTQUFTLDJDQUEyQztBQUNwRCxRQUFRO0FBQ1I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQsZ0JBQWdCO0FBQ3JFLG1EQUFtRCxjQUFjO0FBQ2pFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBLEVBQUU7QUFDRjtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBOztBQUVBO0FBQ0EsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHVCQUF1Qjs7QUFFdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLE9BQU8sUUFBUTtBQUMvQixnQkFBZ0IsT0FBTyxRQUFRO0FBQy9CLGlCQUFpQixPQUFPLE9BQU87QUFDL0IsaUJBQWlCLE9BQU8sT0FBTztBQUMvQixnQkFBZ0IsUUFBUSxPQUFPO0FBQy9CLGdCQUFnQixRQUFRLE9BQU87QUFDL0I7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0VBQXNFOztBQUV0RTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsK0NBQStDLEVBQUUsVUFBVSxFQUFFO0FBQzdEO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLGFBQWEsYUFBYTtBQUN6QztBQUNBLGVBQWUsYUFBYSxhQUFhO0FBQ3pDO0FBQ0EsZUFBZSxhQUFhLGFBQWE7QUFDekM7QUFDQSxlQUFlLGFBQWEsYUFBYTtBQUN6QztBQUNBLGVBQWUsYUFBYSxhQUFhO0FBQ3pDO0FBQ0EsZUFBZSxhQUFhO0FBQzVCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDbjJCWTs7QUFFWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN2SkEsa0JBQWtCLG1CQUFPLENBQUMsRUFBZTs7QUFFekM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQyxTQUFTO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EseUJBQXlCOztBQUV6Qjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEseUNBQXlDLFNBQVM7QUFDbEQ7QUFDQTs7QUFFQTtB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QUNBQTtBQUNBOztBQUVBLGFBQWEsbUJBQU8sQ0FBQyxFQUFRO0FBQzdCLFdBQVcsbUJBQU8sQ0FBQyxFQUFNO0FBQ3pCLFNBQVMsbUJBQU8sQ0FBQyxDQUFJO0FBQ3JCO0FBQ0E7QUFDQSxTQUFTLG1CQUFPLENBQUMsRUFBTTtBQUN2QixDQUFDO0FBQ0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsaUJBQWlCLG9CQUFvQjtBQUNyQzs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFD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QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLG9CQUFvQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLFNBQVM7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixvQkFBb0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUNyeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTLG1CQUFPLENBQUMsQ0FBSTtBQUNyQjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVLG1CQUFPLENBQUMsRUFBVTs7QUFFNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsbUJBQU8sQ0FBQyxFQUFNO0FBQy9CO0FBQ0EsU0FBUyxtQkFBTyxDQUFDLENBQUk7O0FBRXJCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMENBQTBDLEVBQUU7QUFDNUMsQ0FBQztBQUNEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9CQUFvQjtBQUNwQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9CQUFvQjtBQUNwQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztB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QTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxJQUFJO0FBQ3hDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBOztBQUVBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsSUFBSTtBQUN2QztBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsRUFBRSxFQUFFLEtBQUs7QUFDekM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLFFBQVE7QUFDaEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsc0JBQXNCO0FBQ3JDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDZDQUE2QztBQUM3Qzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFFBQVE7QUFDaEM7QUFDQTtBQUNBOztBQUVBLGFBQWEsZ0JBQWdCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUssNkNBQTZDOztBQUVsRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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Q0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsb0JBQW9CO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixZQUFZO0FBQzdCO0FBQ0E7Ozs7Ozs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsaUJBQWlCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDaENBLGFBQWEsbUJBQU8sQ0FBQyxFQUFRO0FBQzdCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWluZ3ctZ3JhYi1kZXBzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiaW1wb3J0IHtGaWxlVXRpbHN9IGZyb20gXCIuL2ZpbGUvRmlsZVV0aWxzXCI7XHJcbmltcG9ydCB7RmlsZVBhdGh9IGZyb20gXCIuL2ZpbGUvRmlsZVBhdGhcIjtcclxuXHJcbmNvbnNvbGUubG9nKFwiSGVsbG8gZnJvbSBHUk9tIVwiKTtcclxuXHJcbmlmIChwcm9jZXNzLmFyZ3YubGVuZ3RoIDwgMykge1xyXG4gICAgY29uc29sZS53YXJuKFwiZXhlY3V0YWJsZSBpcyBub3Qgc3BlY2lmaWVkIVwiKTtcclxuICAgIHByb2Nlc3MuZXhpdCgtMSk7XHJcbn1cclxuXHJcbmNvbnN0IGNvbmZpZyA9IEZpbGVVdGlscy5yZWFkSnNvbihuZXcgRmlsZVBhdGgocHJvY2Vzcy5jd2QoKSArIFwiL2NvbmZpZy5qc29uXCIpKTtcclxuaWYgKCFjb25maWcpIHtcclxuICAgIHByb2Nlc3MuZXhpdCgtMSk7XHJcbn1cclxuXHJcbmNvbnN0IG50bGRkID0gY29uZmlnW1wibnRsZGQtZXhlY1wiXTtcclxuaWYgKCFudGxkZCkge1xyXG4gICAgY29uc29sZS5lcnJvcihcIm50bGRkIGlzIG5vdCBzcGVjaWZpZWQgaW4gdGhlIGNvbmZpZ1wiKTtcclxuICAgIHByb2Nlc3MuZXhpdCgtMSk7XHJcbn1cclxuXHJcblxyXG5cclxuY29uc29sZS5sb2coXCJET05FXCIpO1xyXG5cclxuXHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFJvbWFuLkdhaWtvdiBvbiAzLzIxLzIwMTlcclxuICovXHJcbmltcG9ydCB7RmlsZVBhdGh9IGZyb20gXCIuL0ZpbGVQYXRoXCI7XHJcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmcy1leHRyYVwiO1xyXG5pbXBvcnQge3JlYWRKU09OU3luYywgd3JpdGVKU09OU3luY30gZnJvbSBcImZzLWV4dHJhXCI7XHJcbmltcG9ydCB7XHJcbiAgICByZWFkRmlsZVN5bmMsXHJcbiAgICB3cml0ZUZpbGVTeW5jXHJcbn0gZnJvbSBcImZzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRmlsZVV0aWxzIHtcclxuXHJcbiAgICBzdGF0aWMgcmVhZFRleHQoZmlsZTogRmlsZVBhdGgpOiBzdHJpbmcge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZWFkRmlsZVN5bmMoZmlsZS5wYXRoLCBcInV0ZjhcIik7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiY2FuJ3QgcmVhZCB0ZXh0OiBcIiwgZmlsZS5wYXRoKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgd3JpdGVUZXh0KGZpbGU6IEZpbGVQYXRoLCB0ZXh0OiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB3cml0ZUZpbGVTeW5jKGZpbGUucGF0aCwgdGV4dCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJjYW4ndCB3cml0ZSB0ZXh0OiBcIiwgZmlsZS5wYXRoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHJlYWRKc29uKGZpbGU6IEZpbGVQYXRoKTogYW55IHtcclxuICAgICAgICBjb25zb2xlLmluZm8oXCIuLi5yZWFkaW5nIGpzb246IFwiLCBmaWxlLnBhdGgpO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZWFkSlNPTlN5bmMoZmlsZS5wYXRoLCB7ZW5jb2Rpbmc6IFwidXRmOFwifSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiY2FuJ3QgcmVhZCBqc29uOiBcIiwgZmlsZS5wYXRoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHdyaXRlSnNvbihmaWxlOiBGaWxlUGF0aCwganNvbjogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc29sZS5pbmZvKFwiLi4ud3JpdGluZyBqc29uOiBcIiwgZmlsZS5wYXRoKTtcclxuICAgICAgICBpZiAoIWZpbGUuY3JlYXRlRm9sZGVyKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgd3JpdGVKU09OU3luYyhmaWxlLnBhdGgsIGpzb24sIHtlbmNvZGluZzogXCJ1dGY4XCIsIHNwYWNlczogXCJcXHRcIn0pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcImNhbid0IHdyaXRlIGpzb246XCIsIGZpbGUucGF0aCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZWN1cnNpdmVGb3VuZCh0YXJnZXREaXJlY3Rvcnk6IEZpbGVQYXRoLCBmb2xkZXJIYW5kbGVyOiAoZm9sZGVyOiBGaWxlUGF0aCkgPT4gdm9pZCwgZmlsZUhhbmRsZXI6IChmaWxlOiBGaWxlUGF0aCkgPT4gdm9pZCkge1xyXG4gICAgICAgIGlmICghdGFyZ2V0RGlyZWN0b3J5LmlzRm9sZGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnMucmVhZGRpclN5bmModGFyZ2V0RGlyZWN0b3J5LnBhdGgpXHJcbiAgICAgICAgICAgIC5mb3JFYWNoKGZpbGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZVBhdGg6IEZpbGVQYXRoID0gdGFyZ2V0RGlyZWN0b3J5LnJlc29sdmVQYXRoKGZpbGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGZpbGVQYXRoLmlzRm9sZGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZvbGRlckhhbmRsZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9sZGVySGFuZGxlcihmaWxlUGF0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVjdXJzaXZlRm91bmQoZmlsZVBhdGgsIGZvbGRlckhhbmRsZXIsIGZpbGVIYW5kbGVyKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbGVIYW5kbGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVIYW5kbGVyKGZpbGVQYXRoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiIsIid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5hc3NpZ24oXG4gIHt9LFxuICAvLyBFeHBvcnQgcHJvbWlzZWlmaWVkIGdyYWNlZnVsLWZzOlxuICByZXF1aXJlKCcuL2ZzJyksXG4gIC8vIEV4cG9ydCBleHRyYSBtZXRob2RzOlxuICByZXF1aXJlKCcuL2NvcHktc3luYycpLFxuICByZXF1aXJlKCcuL2NvcHknKSxcbiAgcmVxdWlyZSgnLi9lbXB0eScpLFxuICByZXF1aXJlKCcuL2Vuc3VyZScpLFxuICByZXF1aXJlKCcuL2pzb24nKSxcbiAgcmVxdWlyZSgnLi9ta2RpcnMnKSxcbiAgcmVxdWlyZSgnLi9tb3ZlLXN5bmMnKSxcbiAgcmVxdWlyZSgnLi9tb3ZlJyksXG4gIHJlcXVpcmUoJy4vb3V0cHV0JyksXG4gIHJlcXVpcmUoJy4vcGF0aC1leGlzdHMnKSxcbiAgcmVxdWlyZSgnLi9yZW1vdmUnKVxuKVxuXG4vLyBFeHBvcnQgZnMucHJvbWlzZXMgYXMgYSBnZXR0ZXIgcHJvcGVydHkgc28gdGhhdCB3ZSBkb24ndCB0cmlnZ2VyXG4vLyBFeHBlcmltZW50YWxXYXJuaW5nIGJlZm9yZSBmcy5wcm9taXNlcyBpcyBhY3R1YWxseSBhY2Nlc3NlZC5cbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKVxuaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZnMsICdwcm9taXNlcycpKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUuZXhwb3J0cywgJ3Byb21pc2VzJywge1xuICAgIGdldCAoKSB7IHJldHVybiBmcy5wcm9taXNlcyB9XG4gIH0pXG59XG4iLCIndXNlIHN0cmljdCdcbi8vIFRoaXMgaXMgYWRhcHRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9ub3JtYWxpemUvbXpcbi8vIENvcHlyaWdodCAoYykgMjAxNC0yMDE2IEpvbmF0aGFuIE9uZyBtZUBqb25nbGViZXJyeS5jb20gYW5kIENvbnRyaWJ1dG9yc1xuY29uc3QgdSA9IHJlcXVpcmUoJ3VuaXZlcnNhbGlmeScpLmZyb21DYWxsYmFja1xuY29uc3QgZnMgPSByZXF1aXJlKCdncmFjZWZ1bC1mcycpXG5cbmNvbnN0IGFwaSA9IFtcbiAgJ2FjY2VzcycsXG4gICdhcHBlbmRGaWxlJyxcbiAgJ2NobW9kJyxcbiAgJ2Nob3duJyxcbiAgJ2Nsb3NlJyxcbiAgJ2NvcHlGaWxlJyxcbiAgJ2ZjaG1vZCcsXG4gICdmY2hvd24nLFxuICAnZmRhdGFzeW5jJyxcbiAgJ2ZzdGF0JyxcbiAgJ2ZzeW5jJyxcbiAgJ2Z0cnVuY2F0ZScsXG4gICdmdXRpbWVzJyxcbiAgJ2xjaG93bicsXG4gICdsY2htb2QnLFxuICAnbGluaycsXG4gICdsc3RhdCcsXG4gICdta2RpcicsXG4gICdta2R0ZW1wJyxcbiAgJ29wZW4nLFxuICAncmVhZEZpbGUnLFxuICAncmVhZGRpcicsXG4gICdyZWFkbGluaycsXG4gICdyZWFscGF0aCcsXG4gICdyZW5hbWUnLFxuICAncm1kaXInLFxuICAnc3RhdCcsXG4gICdzeW1saW5rJyxcbiAgJ3RydW5jYXRlJyxcbiAgJ3VubGluaycsXG4gICd1dGltZXMnLFxuICAnd3JpdGVGaWxlJ1xuXS5maWx0ZXIoa2V5ID0+IHtcbiAgLy8gU29tZSBjb21tYW5kcyBhcmUgbm90IGF2YWlsYWJsZSBvbiBzb21lIHN5c3RlbXMuIEV4OlxuICAvLyBmcy5jb3B5RmlsZSB3YXMgYWRkZWQgaW4gTm9kZS5qcyB2OC41LjBcbiAgLy8gZnMubWtkdGVtcCB3YXMgYWRkZWQgaW4gTm9kZS5qcyB2NS4xMC4wXG4gIC8vIGZzLmxjaG93biBpcyBub3QgYXZhaWxhYmxlIG9uIGF0IGxlYXN0IHNvbWUgTGludXhcbiAgcmV0dXJuIHR5cGVvZiBmc1trZXldID09PSAnZnVuY3Rpb24nXG59KVxuXG4vLyBFeHBvcnQgYWxsIGtleXM6XG5PYmplY3Qua2V5cyhmcykuZm9yRWFjaChrZXkgPT4ge1xuICBpZiAoa2V5ID09PSAncHJvbWlzZXMnKSB7XG4gICAgLy8gZnMucHJvbWlzZXMgaXMgYSBnZXR0ZXIgcHJvcGVydHkgdGhhdCB0cmlnZ2VycyBFeHBlcmltZW50YWxXYXJuaW5nXG4gICAgLy8gRG9uJ3QgcmUtZXhwb3J0IGl0IGhlcmUsIHRoZSBnZXR0ZXIgaXMgZGVmaW5lZCBpbiBcImxpYi9pbmRleC5qc1wiXG4gICAgcmV0dXJuXG4gIH1cbiAgZXhwb3J0c1trZXldID0gZnNba2V5XVxufSlcblxuLy8gVW5pdmVyc2FsaWZ5IGFzeW5jIG1ldGhvZHM6XG5hcGkuZm9yRWFjaChtZXRob2QgPT4ge1xuICBleHBvcnRzW21ldGhvZF0gPSB1KGZzW21ldGhvZF0pXG59KVxuXG4vLyBXZSBkaWZmZXIgZnJvbSBtei9mcyBpbiB0aGF0IHdlIHN0aWxsIHNoaXAgdGhlIG9sZCwgYnJva2VuLCBmcy5leGlzdHMoKVxuLy8gc2luY2Ugd2UgYXJlIGEgZHJvcC1pbiByZXBsYWNlbWVudCBmb3IgdGhlIG5hdGl2ZSBtb2R1bGVcbmV4cG9ydHMuZXhpc3RzID0gZnVuY3Rpb24gKGZpbGVuYW1lLCBjYWxsYmFjaykge1xuICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGZzLmV4aXN0cyhmaWxlbmFtZSwgY2FsbGJhY2spXG4gIH1cbiAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgIHJldHVybiBmcy5leGlzdHMoZmlsZW5hbWUsIHJlc29sdmUpXG4gIH0pXG59XG5cbi8vIGZzLnJlYWQoKSAmIGZzLndyaXRlIG5lZWQgc3BlY2lhbCB0cmVhdG1lbnQgZHVlIHRvIG11bHRpcGxlIGNhbGxiYWNrIGFyZ3NcblxuZXhwb3J0cy5yZWFkID0gZnVuY3Rpb24gKGZkLCBidWZmZXIsIG9mZnNldCwgbGVuZ3RoLCBwb3NpdGlvbiwgY2FsbGJhY2spIHtcbiAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBmcy5yZWFkKGZkLCBidWZmZXIsIG9mZnNldCwgbGVuZ3RoLCBwb3NpdGlvbiwgY2FsbGJhY2spXG4gIH1cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBmcy5yZWFkKGZkLCBidWZmZXIsIG9mZnNldCwgbGVuZ3RoLCBwb3NpdGlvbiwgKGVyciwgYnl0ZXNSZWFkLCBidWZmZXIpID0+IHtcbiAgICAgIGlmIChlcnIpIHJldHVybiByZWplY3QoZXJyKVxuICAgICAgcmVzb2x2ZSh7IGJ5dGVzUmVhZCwgYnVmZmVyIH0pXG4gICAgfSlcbiAgfSlcbn1cblxuLy8gRnVuY3Rpb24gc2lnbmF0dXJlIGNhbiBiZVxuLy8gZnMud3JpdGUoZmQsIGJ1ZmZlclssIG9mZnNldFssIGxlbmd0aFssIHBvc2l0aW9uXV1dLCBjYWxsYmFjaylcbi8vIE9SXG4vLyBmcy53cml0ZShmZCwgc3RyaW5nWywgcG9zaXRpb25bLCBlbmNvZGluZ11dLCBjYWxsYmFjaylcbi8vIFdlIG5lZWQgdG8gaGFuZGxlIGJvdGggY2FzZXMsIHNvIHdlIHVzZSAuLi5hcmdzXG5leHBvcnRzLndyaXRlID0gZnVuY3Rpb24gKGZkLCBidWZmZXIsIC4uLmFyZ3MpIHtcbiAgaWYgKHR5cGVvZiBhcmdzW2FyZ3MubGVuZ3RoIC0gMV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZnMud3JpdGUoZmQsIGJ1ZmZlciwgLi4uYXJncylcbiAgfVxuXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgZnMud3JpdGUoZmQsIGJ1ZmZlciwgLi4uYXJncywgKGVyciwgYnl0ZXNXcml0dGVuLCBidWZmZXIpID0+IHtcbiAgICAgIGlmIChlcnIpIHJldHVybiByZWplY3QoZXJyKVxuICAgICAgcmVzb2x2ZSh7IGJ5dGVzV3JpdHRlbiwgYnVmZmVyIH0pXG4gICAgfSlcbiAgfSlcbn1cblxuLy8gZnMucmVhbHBhdGgubmF0aXZlIG9ubHkgYXZhaWxhYmxlIGluIE5vZGUgdjkuMitcbmlmICh0eXBlb2YgZnMucmVhbHBhdGgubmF0aXZlID09PSAnZnVuY3Rpb24nKSB7XG4gIGV4cG9ydHMucmVhbHBhdGgubmF0aXZlID0gdShmcy5yZWFscGF0aC5uYXRpdmUpXG59XG4iLCIndXNlIHN0cmljdCdcblxuZXhwb3J0cy5mcm9tQ2FsbGJhY2sgPSBmdW5jdGlvbiAoZm4pIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHR5cGVvZiBhcmd1bWVudHNbYXJndW1lbnRzLmxlbmd0aCAtIDFdID09PSAnZnVuY3Rpb24nKSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBhcmd1bWVudHNbYXJndW1lbnRzLmxlbmd0aF0gPSAoZXJyLCByZXMpID0+IHtcbiAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gcmVqZWN0KGVycilcbiAgICAgICAgICByZXNvbHZlKHJlcylcbiAgICAgICAgfVxuICAgICAgICBhcmd1bWVudHMubGVuZ3RoKytcbiAgICAgICAgZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgICAgfSlcbiAgICB9XG4gIH0sICduYW1lJywgeyB2YWx1ZTogZm4ubmFtZSB9KVxufVxuXG5leHBvcnRzLmZyb21Qcm9taXNlID0gZnVuY3Rpb24gKGZuKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGNiID0gYXJndW1lbnRzW2FyZ3VtZW50cy5sZW5ndGggLSAxXVxuICAgIGlmICh0eXBlb2YgY2IgIT09ICdmdW5jdGlvbicpIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgZWxzZSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpLnRoZW4ociA9PiBjYihudWxsLCByKSwgY2IpXG4gIH0sICduYW1lJywgeyB2YWx1ZTogZm4ubmFtZSB9KVxufVxuIiwidmFyIGZzID0gcmVxdWlyZSgnZnMnKVxudmFyIHBvbHlmaWxscyA9IHJlcXVpcmUoJy4vcG9seWZpbGxzLmpzJylcbnZhciBsZWdhY3kgPSByZXF1aXJlKCcuL2xlZ2FjeS1zdHJlYW1zLmpzJylcbnZhciBjbG9uZSA9IHJlcXVpcmUoJy4vY2xvbmUuanMnKVxuXG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAtIG5vZGUgMC54IHBvbHlmaWxsICovXG52YXIgZ3JhY2VmdWxRdWV1ZVxudmFyIHByZXZpb3VzU3ltYm9sXG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlIC0gbm9kZSAwLnggcG9seWZpbGwgKi9cbmlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBTeW1ib2wuZm9yID09PSAnZnVuY3Rpb24nKSB7XG4gIGdyYWNlZnVsUXVldWUgPSBTeW1ib2wuZm9yKCdncmFjZWZ1bC1mcy5xdWV1ZScpXG4gIC8vIFRoaXMgaXMgdXNlZCBpbiB0ZXN0aW5nIGJ5IGZ1dHVyZSB2ZXJzaW9uc1xuICBwcmV2aW91c1N5bWJvbCA9IFN5bWJvbC5mb3IoJ2dyYWNlZnVsLWZzLnByZXZpb3VzJylcbn0gZWxzZSB7XG4gIGdyYWNlZnVsUXVldWUgPSAnX19fZ3JhY2VmdWwtZnMucXVldWUnXG4gIHByZXZpb3VzU3ltYm9sID0gJ19fX2dyYWNlZnVsLWZzLnByZXZpb3VzJ1xufVxuXG5mdW5jdGlvbiBub29wICgpIHt9XG5cbnZhciBkZWJ1ZyA9IG5vb3BcbmlmICh1dGlsLmRlYnVnbG9nKVxuICBkZWJ1ZyA9IHV0aWwuZGVidWdsb2coJ2dmczQnKVxuZWxzZSBpZiAoL1xcYmdmczRcXGIvaS50ZXN0KHByb2Nlc3MuZW52Lk5PREVfREVCVUcgfHwgJycpKVxuICBkZWJ1ZyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBtID0gdXRpbC5mb3JtYXQuYXBwbHkodXRpbCwgYXJndW1lbnRzKVxuICAgIG0gPSAnR0ZTNDogJyArIG0uc3BsaXQoL1xcbi8pLmpvaW4oJ1xcbkdGUzQ6ICcpXG4gICAgY29uc29sZS5lcnJvcihtKVxuICB9XG5cbi8vIE9uY2UgdGltZSBpbml0aWFsaXphdGlvblxuaWYgKCFnbG9iYWxbZ3JhY2VmdWxRdWV1ZV0pIHtcbiAgLy8gVGhpcyBxdWV1ZSBjYW4gYmUgc2hhcmVkIGJ5IG11bHRpcGxlIGxvYWRlZCBpbnN0YW5jZXNcbiAgdmFyIHF1ZXVlID0gW11cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGdsb2JhbCwgZ3JhY2VmdWxRdWV1ZSwge1xuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gcXVldWVcbiAgICB9XG4gIH0pXG5cbiAgLy8gUGF0Y2ggZnMuY2xvc2UvY2xvc2VTeW5jIHRvIHNoYXJlZCBxdWV1ZSB2ZXJzaW9uLCBiZWNhdXNlIHdlIG5lZWRcbiAgLy8gdG8gcmV0cnkoKSB3aGVuZXZlciBhIGNsb3NlIGhhcHBlbnMgKmFueXdoZXJlKiBpbiB0aGUgcHJvZ3JhbS5cbiAgLy8gVGhpcyBpcyBlc3NlbnRpYWwgd2hlbiBtdWx0aXBsZSBncmFjZWZ1bC1mcyBpbnN0YW5jZXMgYXJlXG4gIC8vIGluIHBsYXkgYXQgdGhlIHNhbWUgdGltZS5cbiAgZnMuY2xvc2UgPSAoZnVuY3Rpb24gKGZzJGNsb3NlKSB7XG4gICAgZnVuY3Rpb24gY2xvc2UgKGZkLCBjYikge1xuICAgICAgcmV0dXJuIGZzJGNsb3NlLmNhbGwoZnMsIGZkLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIC8vIFRoaXMgZnVuY3Rpb24gdXNlcyB0aGUgZ3JhY2VmdWwtZnMgc2hhcmVkIHF1ZXVlXG4gICAgICAgIGlmICghZXJyKSB7XG4gICAgICAgICAgcmV0cnkoKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICBjYi5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgICB9KVxuICAgIH1cblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjbG9zZSwgcHJldmlvdXNTeW1ib2wsIHtcbiAgICAgIHZhbHVlOiBmcyRjbG9zZVxuICAgIH0pXG4gICAgcmV0dXJuIGNsb3NlXG4gIH0pKGZzLmNsb3NlKVxuXG4gIGZzLmNsb3NlU3luYyA9IChmdW5jdGlvbiAoZnMkY2xvc2VTeW5jKSB7XG4gICAgZnVuY3Rpb24gY2xvc2VTeW5jIChmZCkge1xuICAgICAgLy8gVGhpcyBmdW5jdGlvbiB1c2VzIHRoZSBncmFjZWZ1bC1mcyBzaGFyZWQgcXVldWVcbiAgICAgIGZzJGNsb3NlU3luYy5hcHBseShmcywgYXJndW1lbnRzKVxuICAgICAgcmV0cnkoKVxuICAgIH1cblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjbG9zZVN5bmMsIHByZXZpb3VzU3ltYm9sLCB7XG4gICAgICB2YWx1ZTogZnMkY2xvc2VTeW5jXG4gICAgfSlcbiAgICByZXR1cm4gY2xvc2VTeW5jXG4gIH0pKGZzLmNsb3NlU3luYylcblxuICBpZiAoL1xcYmdmczRcXGIvaS50ZXN0KHByb2Nlc3MuZW52Lk5PREVfREVCVUcgfHwgJycpKSB7XG4gICAgcHJvY2Vzcy5vbignZXhpdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgZGVidWcoZ2xvYmFsW2dyYWNlZnVsUXVldWVdKVxuICAgICAgcmVxdWlyZSgnYXNzZXJ0JykuZXF1YWwoZ2xvYmFsW2dyYWNlZnVsUXVldWVdLmxlbmd0aCwgMClcbiAgICB9KVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcGF0Y2goY2xvbmUoZnMpKVxuaWYgKHByb2Nlc3MuZW52LlRFU1RfR1JBQ0VGVUxfRlNfR0xPQkFMX1BBVENIICYmICFmcy5fX3BhdGNoZWQpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHBhdGNoKGZzKVxuICAgIGZzLl9fcGF0Y2hlZCA9IHRydWU7XG59XG5cbmZ1bmN0aW9uIHBhdGNoIChmcykge1xuICAvLyBFdmVyeXRoaW5nIHRoYXQgcmVmZXJlbmNlcyB0aGUgb3BlbigpIGZ1bmN0aW9uIG5lZWRzIHRvIGJlIGluIGhlcmVcbiAgcG9seWZpbGxzKGZzKVxuICBmcy5ncmFjZWZ1bGlmeSA9IHBhdGNoXG5cbiAgZnMuY3JlYXRlUmVhZFN0cmVhbSA9IGNyZWF0ZVJlYWRTdHJlYW1cbiAgZnMuY3JlYXRlV3JpdGVTdHJlYW0gPSBjcmVhdGVXcml0ZVN0cmVhbVxuICB2YXIgZnMkcmVhZEZpbGUgPSBmcy5yZWFkRmlsZVxuICBmcy5yZWFkRmlsZSA9IHJlYWRGaWxlXG4gIGZ1bmN0aW9uIHJlYWRGaWxlIChwYXRoLCBvcHRpb25zLCBjYikge1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgIGNiID0gb3B0aW9ucywgb3B0aW9ucyA9IG51bGxcblxuICAgIHJldHVybiBnbyRyZWFkRmlsZShwYXRoLCBvcHRpb25zLCBjYilcblxuICAgIGZ1bmN0aW9uIGdvJHJlYWRGaWxlIChwYXRoLCBvcHRpb25zLCBjYikge1xuICAgICAgcmV0dXJuIGZzJHJlYWRGaWxlKHBhdGgsIG9wdGlvbnMsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgaWYgKGVyciAmJiAoZXJyLmNvZGUgPT09ICdFTUZJTEUnIHx8IGVyci5jb2RlID09PSAnRU5GSUxFJykpXG4gICAgICAgICAgZW5xdWV1ZShbZ28kcmVhZEZpbGUsIFtwYXRoLCBvcHRpb25zLCBjYl1dKVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGNiID09PSAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgY2IuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgICAgICAgIHJldHJ5KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICB2YXIgZnMkd3JpdGVGaWxlID0gZnMud3JpdGVGaWxlXG4gIGZzLndyaXRlRmlsZSA9IHdyaXRlRmlsZVxuICBmdW5jdGlvbiB3cml0ZUZpbGUgKHBhdGgsIGRhdGEsIG9wdGlvbnMsIGNiKSB7XG4gICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKVxuICAgICAgY2IgPSBvcHRpb25zLCBvcHRpb25zID0gbnVsbFxuXG4gICAgcmV0dXJuIGdvJHdyaXRlRmlsZShwYXRoLCBkYXRhLCBvcHRpb25zLCBjYilcblxuICAgIGZ1bmN0aW9uIGdvJHdyaXRlRmlsZSAocGF0aCwgZGF0YSwgb3B0aW9ucywgY2IpIHtcbiAgICAgIHJldHVybiBmcyR3cml0ZUZpbGUocGF0aCwgZGF0YSwgb3B0aW9ucywgZnVuY3Rpb24gKGVycikge1xuICAgICAgICBpZiAoZXJyICYmIChlcnIuY29kZSA9PT0gJ0VNRklMRScgfHwgZXJyLmNvZGUgPT09ICdFTkZJTEUnKSlcbiAgICAgICAgICBlbnF1ZXVlKFtnbyR3cml0ZUZpbGUsIFtwYXRoLCBkYXRhLCBvcHRpb25zLCBjYl1dKVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGNiID09PSAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgY2IuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgICAgICAgIHJldHJ5KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICB2YXIgZnMkYXBwZW5kRmlsZSA9IGZzLmFwcGVuZEZpbGVcbiAgaWYgKGZzJGFwcGVuZEZpbGUpXG4gICAgZnMuYXBwZW5kRmlsZSA9IGFwcGVuZEZpbGVcbiAgZnVuY3Rpb24gYXBwZW5kRmlsZSAocGF0aCwgZGF0YSwgb3B0aW9ucywgY2IpIHtcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpXG4gICAgICBjYiA9IG9wdGlvbnMsIG9wdGlvbnMgPSBudWxsXG5cbiAgICByZXR1cm4gZ28kYXBwZW5kRmlsZShwYXRoLCBkYXRhLCBvcHRpb25zLCBjYilcblxuICAgIGZ1bmN0aW9uIGdvJGFwcGVuZEZpbGUgKHBhdGgsIGRhdGEsIG9wdGlvbnMsIGNiKSB7XG4gICAgICByZXR1cm4gZnMkYXBwZW5kRmlsZShwYXRoLCBkYXRhLCBvcHRpb25zLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGlmIChlcnIgJiYgKGVyci5jb2RlID09PSAnRU1GSUxFJyB8fCBlcnIuY29kZSA9PT0gJ0VORklMRScpKVxuICAgICAgICAgIGVucXVldWUoW2dvJGFwcGVuZEZpbGUsIFtwYXRoLCBkYXRhLCBvcHRpb25zLCBjYl1dKVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGNiID09PSAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgY2IuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgICAgICAgIHJldHJ5KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICB2YXIgZnMkcmVhZGRpciA9IGZzLnJlYWRkaXJcbiAgZnMucmVhZGRpciA9IHJlYWRkaXJcbiAgZnVuY3Rpb24gcmVhZGRpciAocGF0aCwgb3B0aW9ucywgY2IpIHtcbiAgICB2YXIgYXJncyA9IFtwYXRoXVxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYXJncy5wdXNoKG9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNiID0gb3B0aW9uc1xuICAgIH1cbiAgICBhcmdzLnB1c2goZ28kcmVhZGRpciRjYilcblxuICAgIHJldHVybiBnbyRyZWFkZGlyKGFyZ3MpXG5cbiAgICBmdW5jdGlvbiBnbyRyZWFkZGlyJGNiIChlcnIsIGZpbGVzKSB7XG4gICAgICBpZiAoZmlsZXMgJiYgZmlsZXMuc29ydClcbiAgICAgICAgZmlsZXMuc29ydCgpXG5cbiAgICAgIGlmIChlcnIgJiYgKGVyci5jb2RlID09PSAnRU1GSUxFJyB8fCBlcnIuY29kZSA9PT0gJ0VORklMRScpKVxuICAgICAgICBlbnF1ZXVlKFtnbyRyZWFkZGlyLCBbYXJnc11dKVxuXG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICBjYi5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgICAgIHJldHJ5KClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnbyRyZWFkZGlyIChhcmdzKSB7XG4gICAgcmV0dXJuIGZzJHJlYWRkaXIuYXBwbHkoZnMsIGFyZ3MpXG4gIH1cblxuICBpZiAocHJvY2Vzcy52ZXJzaW9uLnN1YnN0cigwLCA0KSA9PT0gJ3YwLjgnKSB7XG4gICAgdmFyIGxlZ1N0cmVhbXMgPSBsZWdhY3koZnMpXG4gICAgUmVhZFN0cmVhbSA9IGxlZ1N0cmVhbXMuUmVhZFN0cmVhbVxuICAgIFdyaXRlU3RyZWFtID0gbGVnU3RyZWFtcy5Xcml0ZVN0cmVhbVxuICB9XG5cbiAgdmFyIGZzJFJlYWRTdHJlYW0gPSBmcy5SZWFkU3RyZWFtXG4gIGlmIChmcyRSZWFkU3RyZWFtKSB7XG4gICAgUmVhZFN0cmVhbS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKGZzJFJlYWRTdHJlYW0ucHJvdG90eXBlKVxuICAgIFJlYWRTdHJlYW0ucHJvdG90eXBlLm9wZW4gPSBSZWFkU3RyZWFtJG9wZW5cbiAgfVxuXG4gIHZhciBmcyRXcml0ZVN0cmVhbSA9IGZzLldyaXRlU3RyZWFtXG4gIGlmIChmcyRXcml0ZVN0cmVhbSkge1xuICAgIFdyaXRlU3RyZWFtLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoZnMkV3JpdGVTdHJlYW0ucHJvdG90eXBlKVxuICAgIFdyaXRlU3RyZWFtLnByb3RvdHlwZS5vcGVuID0gV3JpdGVTdHJlYW0kb3BlblxuICB9XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZzLCAnUmVhZFN0cmVhbScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBSZWFkU3RyZWFtXG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgIFJlYWRTdHJlYW0gPSB2YWxcbiAgICB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmcywgJ1dyaXRlU3RyZWFtJywge1xuICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIFdyaXRlU3RyZWFtXG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgIFdyaXRlU3RyZWFtID0gdmFsXG4gICAgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KVxuXG4gIC8vIGxlZ2FjeSBuYW1lc1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZnMsICdGaWxlUmVhZFN0cmVhbScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBSZWFkU3RyZWFtXG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgIFJlYWRTdHJlYW0gPSB2YWxcbiAgICB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmcywgJ0ZpbGVXcml0ZVN0cmVhbScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBXcml0ZVN0cmVhbVxuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICBXcml0ZVN0cmVhbSA9IHZhbFxuICAgIH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBjb25maWd1cmFibGU6IHRydWVcbiAgfSlcblxuICBmdW5jdGlvbiBSZWFkU3RyZWFtIChwYXRoLCBvcHRpb25zKSB7XG4gICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBSZWFkU3RyZWFtKVxuICAgICAgcmV0dXJuIGZzJFJlYWRTdHJlYW0uYXBwbHkodGhpcywgYXJndW1lbnRzKSwgdGhpc1xuICAgIGVsc2VcbiAgICAgIHJldHVybiBSZWFkU3RyZWFtLmFwcGx5KE9iamVjdC5jcmVhdGUoUmVhZFN0cmVhbS5wcm90b3R5cGUpLCBhcmd1bWVudHMpXG4gIH1cblxuICBmdW5jdGlvbiBSZWFkU3RyZWFtJG9wZW4gKCkge1xuICAgIHZhciB0aGF0ID0gdGhpc1xuICAgIG9wZW4odGhhdC5wYXRoLCB0aGF0LmZsYWdzLCB0aGF0Lm1vZGUsIGZ1bmN0aW9uIChlcnIsIGZkKSB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGlmICh0aGF0LmF1dG9DbG9zZSlcbiAgICAgICAgICB0aGF0LmRlc3Ryb3koKVxuXG4gICAgICAgIHRoYXQuZW1pdCgnZXJyb3InLCBlcnIpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGF0LmZkID0gZmRcbiAgICAgICAgdGhhdC5lbWl0KCdvcGVuJywgZmQpXG4gICAgICAgIHRoYXQucmVhZCgpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIFdyaXRlU3RyZWFtIChwYXRoLCBvcHRpb25zKSB7XG4gICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBXcml0ZVN0cmVhbSlcbiAgICAgIHJldHVybiBmcyRXcml0ZVN0cmVhbS5hcHBseSh0aGlzLCBhcmd1bWVudHMpLCB0aGlzXG4gICAgZWxzZVxuICAgICAgcmV0dXJuIFdyaXRlU3RyZWFtLmFwcGx5KE9iamVjdC5jcmVhdGUoV3JpdGVTdHJlYW0ucHJvdG90eXBlKSwgYXJndW1lbnRzKVxuICB9XG5cbiAgZnVuY3Rpb24gV3JpdGVTdHJlYW0kb3BlbiAoKSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgb3Blbih0aGF0LnBhdGgsIHRoYXQuZmxhZ3MsIHRoYXQubW9kZSwgZnVuY3Rpb24gKGVyciwgZmQpIHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgdGhhdC5kZXN0cm95KClcbiAgICAgICAgdGhhdC5lbWl0KCdlcnJvcicsIGVycilcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoYXQuZmQgPSBmZFxuICAgICAgICB0aGF0LmVtaXQoJ29wZW4nLCBmZClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlUmVhZFN0cmVhbSAocGF0aCwgb3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgZnMuUmVhZFN0cmVhbShwYXRoLCBvcHRpb25zKVxuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlV3JpdGVTdHJlYW0gKHBhdGgsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IGZzLldyaXRlU3RyZWFtKHBhdGgsIG9wdGlvbnMpXG4gIH1cblxuICB2YXIgZnMkb3BlbiA9IGZzLm9wZW5cbiAgZnMub3BlbiA9IG9wZW5cbiAgZnVuY3Rpb24gb3BlbiAocGF0aCwgZmxhZ3MsIG1vZGUsIGNiKSB7XG4gICAgaWYgKHR5cGVvZiBtb2RlID09PSAnZnVuY3Rpb24nKVxuICAgICAgY2IgPSBtb2RlLCBtb2RlID0gbnVsbFxuXG4gICAgcmV0dXJuIGdvJG9wZW4ocGF0aCwgZmxhZ3MsIG1vZGUsIGNiKVxuXG4gICAgZnVuY3Rpb24gZ28kb3BlbiAocGF0aCwgZmxhZ3MsIG1vZGUsIGNiKSB7XG4gICAgICByZXR1cm4gZnMkb3BlbihwYXRoLCBmbGFncywgbW9kZSwgZnVuY3Rpb24gKGVyciwgZmQpIHtcbiAgICAgICAgaWYgKGVyciAmJiAoZXJyLmNvZGUgPT09ICdFTUZJTEUnIHx8IGVyci5jb2RlID09PSAnRU5GSUxFJykpXG4gICAgICAgICAgZW5xdWV1ZShbZ28kb3BlbiwgW3BhdGgsIGZsYWdzLCBtb2RlLCBjYl1dKVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGNiID09PSAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgY2IuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgICAgICAgIHJldHJ5KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnNcbn1cblxuZnVuY3Rpb24gZW5xdWV1ZSAoZWxlbSkge1xuICBkZWJ1ZygnRU5RVUVVRScsIGVsZW1bMF0ubmFtZSwgZWxlbVsxXSlcbiAgZ2xvYmFsW2dyYWNlZnVsUXVldWVdLnB1c2goZWxlbSlcbn1cblxuZnVuY3Rpb24gcmV0cnkgKCkge1xuICB2YXIgZWxlbSA9IGdsb2JhbFtncmFjZWZ1bFF1ZXVlXS5zaGlmdCgpXG4gIGlmIChlbGVtKSB7XG4gICAgZGVidWcoJ1JFVFJZJywgZWxlbVswXS5uYW1lLCBlbGVtWzFdKVxuICAgIGVsZW1bMF0uYXBwbHkobnVsbCwgZWxlbVsxXSlcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7IiwidmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoJ2NvbnN0YW50cycpXG5cbnZhciBvcmlnQ3dkID0gcHJvY2Vzcy5jd2RcbnZhciBjd2QgPSBudWxsXG5cbnZhciBwbGF0Zm9ybSA9IHByb2Nlc3MuZW52LkdSQUNFRlVMX0ZTX1BMQVRGT1JNIHx8IHByb2Nlc3MucGxhdGZvcm1cblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCFjd2QpXG4gICAgY3dkID0gb3JpZ0N3ZC5jYWxsKHByb2Nlc3MpXG4gIHJldHVybiBjd2Rcbn1cbnRyeSB7XG4gIHByb2Nlc3MuY3dkKClcbn0gY2F0Y2ggKGVyKSB7fVxuXG52YXIgY2hkaXIgPSBwcm9jZXNzLmNoZGlyXG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24oZCkge1xuICBjd2QgPSBudWxsXG4gIGNoZGlyLmNhbGwocHJvY2VzcywgZClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwYXRjaFxuXG5mdW5jdGlvbiBwYXRjaCAoZnMpIHtcbiAgLy8gKHJlLSlpbXBsZW1lbnQgc29tZSB0aGluZ3MgdGhhdCBhcmUga25vd24gYnVzdGVkIG9yIG1pc3NpbmcuXG5cbiAgLy8gbGNobW9kLCBicm9rZW4gcHJpb3IgdG8gMC42LjJcbiAgLy8gYmFjay1wb3J0IHRoZSBmaXggaGVyZS5cbiAgaWYgKGNvbnN0YW50cy5oYXNPd25Qcm9wZXJ0eSgnT19TWU1MSU5LJykgJiZcbiAgICAgIHByb2Nlc3MudmVyc2lvbi5tYXRjaCgvXnYwXFwuNlxcLlswLTJdfF52MFxcLjVcXC4vKSkge1xuICAgIHBhdGNoTGNobW9kKGZzKVxuICB9XG5cbiAgLy8gbHV0aW1lcyBpbXBsZW1lbnRhdGlvbiwgb3Igbm8tb3BcbiAgaWYgKCFmcy5sdXRpbWVzKSB7XG4gICAgcGF0Y2hMdXRpbWVzKGZzKVxuICB9XG5cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2lzYWFjcy9ub2RlLWdyYWNlZnVsLWZzL2lzc3Vlcy80XG4gIC8vIENob3duIHNob3VsZCBub3QgZmFpbCBvbiBlaW52YWwgb3IgZXBlcm0gaWYgbm9uLXJvb3QuXG4gIC8vIEl0IHNob3VsZCBub3QgZmFpbCBvbiBlbm9zeXMgZXZlciwgYXMgdGhpcyBqdXN0IGluZGljYXRlc1xuICAvLyB0aGF0IGEgZnMgZG9lc24ndCBzdXBwb3J0IHRoZSBpbnRlbmRlZCBvcGVyYXRpb24uXG5cbiAgZnMuY2hvd24gPSBjaG93bkZpeChmcy5jaG93bilcbiAgZnMuZmNob3duID0gY2hvd25GaXgoZnMuZmNob3duKVxuICBmcy5sY2hvd24gPSBjaG93bkZpeChmcy5sY2hvd24pXG5cbiAgZnMuY2htb2QgPSBjaG1vZEZpeChmcy5jaG1vZClcbiAgZnMuZmNobW9kID0gY2htb2RGaXgoZnMuZmNobW9kKVxuICBmcy5sY2htb2QgPSBjaG1vZEZpeChmcy5sY2htb2QpXG5cbiAgZnMuY2hvd25TeW5jID0gY2hvd25GaXhTeW5jKGZzLmNob3duU3luYylcbiAgZnMuZmNob3duU3luYyA9IGNob3duRml4U3luYyhmcy5mY2hvd25TeW5jKVxuICBmcy5sY2hvd25TeW5jID0gY2hvd25GaXhTeW5jKGZzLmxjaG93blN5bmMpXG5cbiAgZnMuY2htb2RTeW5jID0gY2htb2RGaXhTeW5jKGZzLmNobW9kU3luYylcbiAgZnMuZmNobW9kU3luYyA9IGNobW9kRml4U3luYyhmcy5mY2htb2RTeW5jKVxuICBmcy5sY2htb2RTeW5jID0gY2htb2RGaXhTeW5jKGZzLmxjaG1vZFN5bmMpXG5cbiAgZnMuc3RhdCA9IHN0YXRGaXgoZnMuc3RhdClcbiAgZnMuZnN0YXQgPSBzdGF0Rml4KGZzLmZzdGF0KVxuICBmcy5sc3RhdCA9IHN0YXRGaXgoZnMubHN0YXQpXG5cbiAgZnMuc3RhdFN5bmMgPSBzdGF0Rml4U3luYyhmcy5zdGF0U3luYylcbiAgZnMuZnN0YXRTeW5jID0gc3RhdEZpeFN5bmMoZnMuZnN0YXRTeW5jKVxuICBmcy5sc3RhdFN5bmMgPSBzdGF0Rml4U3luYyhmcy5sc3RhdFN5bmMpXG5cbiAgLy8gaWYgbGNobW9kL2xjaG93biBkbyBub3QgZXhpc3QsIHRoZW4gbWFrZSB0aGVtIG5vLW9wc1xuICBpZiAoIWZzLmxjaG1vZCkge1xuICAgIGZzLmxjaG1vZCA9IGZ1bmN0aW9uIChwYXRoLCBtb2RlLCBjYikge1xuICAgICAgaWYgKGNiKSBwcm9jZXNzLm5leHRUaWNrKGNiKVxuICAgIH1cbiAgICBmcy5sY2htb2RTeW5jID0gZnVuY3Rpb24gKCkge31cbiAgfVxuICBpZiAoIWZzLmxjaG93bikge1xuICAgIGZzLmxjaG93biA9IGZ1bmN0aW9uIChwYXRoLCB1aWQsIGdpZCwgY2IpIHtcbiAgICAgIGlmIChjYikgcHJvY2Vzcy5uZXh0VGljayhjYilcbiAgICB9XG4gICAgZnMubGNob3duU3luYyA9IGZ1bmN0aW9uICgpIHt9XG4gIH1cblxuICAvLyBvbiBXaW5kb3dzLCBBL1Ygc29mdHdhcmUgY2FuIGxvY2sgdGhlIGRpcmVjdG9yeSwgY2F1c2luZyB0aGlzXG4gIC8vIHRvIGZhaWwgd2l0aCBhbiBFQUNDRVMgb3IgRVBFUk0gaWYgdGhlIGRpcmVjdG9yeSBjb250YWlucyBuZXdseVxuICAvLyBjcmVhdGVkIGZpbGVzLiAgVHJ5IGFnYWluIG9uIGZhaWx1cmUsIGZvciB1cCB0byA2MCBzZWNvbmRzLlxuXG4gIC8vIFNldCB0aGUgdGltZW91dCB0aGlzIGxvbmcgYmVjYXVzZSBzb21lIFdpbmRvd3MgQW50aS1WaXJ1cywgc3VjaCBhcyBQYXJpdHlcbiAgLy8gYml0OSwgbWF5IGxvY2sgZmlsZXMgZm9yIHVwIHRvIGEgbWludXRlLCBjYXVzaW5nIG5wbSBwYWNrYWdlIGluc3RhbGxcbiAgLy8gZmFpbHVyZXMuIEFsc28sIHRha2UgY2FyZSB0byB5aWVsZCB0aGUgc2NoZWR1bGVyLiBXaW5kb3dzIHNjaGVkdWxpbmcgZ2l2ZXNcbiAgLy8gQ1BVIHRvIGEgYnVzeSBsb29waW5nIHByb2Nlc3MsIHdoaWNoIGNhbiBjYXVzZSB0aGUgcHJvZ3JhbSBjYXVzaW5nIHRoZSBsb2NrXG4gIC8vIGNvbnRlbnRpb24gdG8gYmUgc3RhcnZlZCBvZiBDUFUgYnkgbm9kZSwgc28gdGhlIGNvbnRlbnRpb24gZG9lc24ndCByZXNvbHZlLlxuICBpZiAocGxhdGZvcm0gPT09IFwid2luMzJcIikge1xuICAgIGZzLnJlbmFtZSA9IChmdW5jdGlvbiAoZnMkcmVuYW1lKSB7IHJldHVybiBmdW5jdGlvbiAoZnJvbSwgdG8sIGNiKSB7XG4gICAgICB2YXIgc3RhcnQgPSBEYXRlLm5vdygpXG4gICAgICB2YXIgYmFja29mZiA9IDA7XG4gICAgICBmcyRyZW5hbWUoZnJvbSwgdG8sIGZ1bmN0aW9uIENCIChlcikge1xuICAgICAgICBpZiAoZXJcbiAgICAgICAgICAgICYmIChlci5jb2RlID09PSBcIkVBQ0NFU1wiIHx8IGVyLmNvZGUgPT09IFwiRVBFUk1cIilcbiAgICAgICAgICAgICYmIERhdGUubm93KCkgLSBzdGFydCA8IDYwMDAwKSB7XG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGZzLnN0YXQodG8sIGZ1bmN0aW9uIChzdGF0ZXIsIHN0KSB7XG4gICAgICAgICAgICAgIGlmIChzdGF0ZXIgJiYgc3RhdGVyLmNvZGUgPT09IFwiRU5PRU5UXCIpXG4gICAgICAgICAgICAgICAgZnMkcmVuYW1lKGZyb20sIHRvLCBDQik7XG4gICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBjYihlcilcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSwgYmFja29mZilcbiAgICAgICAgICBpZiAoYmFja29mZiA8IDEwMClcbiAgICAgICAgICAgIGJhY2tvZmYgKz0gMTA7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjYikgY2IoZXIpXG4gICAgICB9KVxuICAgIH19KShmcy5yZW5hbWUpXG4gIH1cblxuICAvLyBpZiByZWFkKCkgcmV0dXJucyBFQUdBSU4sIHRoZW4ganVzdCB0cnkgaXQgYWdhaW4uXG4gIGZzLnJlYWQgPSAoZnVuY3Rpb24gKGZzJHJlYWQpIHtcbiAgICBmdW5jdGlvbiByZWFkIChmZCwgYnVmZmVyLCBvZmZzZXQsIGxlbmd0aCwgcG9zaXRpb24sIGNhbGxiYWNrXykge1xuICAgICAgdmFyIGNhbGxiYWNrXG4gICAgICBpZiAoY2FsbGJhY2tfICYmIHR5cGVvZiBjYWxsYmFja18gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdmFyIGVhZ0NvdW50ZXIgPSAwXG4gICAgICAgIGNhbGxiYWNrID0gZnVuY3Rpb24gKGVyLCBfLCBfXykge1xuICAgICAgICAgIGlmIChlciAmJiBlci5jb2RlID09PSAnRUFHQUlOJyAmJiBlYWdDb3VudGVyIDwgMTApIHtcbiAgICAgICAgICAgIGVhZ0NvdW50ZXIgKytcbiAgICAgICAgICAgIHJldHVybiBmcyRyZWFkLmNhbGwoZnMsIGZkLCBidWZmZXIsIG9mZnNldCwgbGVuZ3RoLCBwb3NpdGlvbiwgY2FsbGJhY2spXG4gICAgICAgICAgfVxuICAgICAgICAgIGNhbGxiYWNrXy5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmcyRyZWFkLmNhbGwoZnMsIGZkLCBidWZmZXIsIG9mZnNldCwgbGVuZ3RoLCBwb3NpdGlvbiwgY2FsbGJhY2spXG4gICAgfVxuXG4gICAgLy8gVGhpcyBlbnN1cmVzIGB1dGlsLnByb21pc2lmeWAgd29ya3MgYXMgaXQgZG9lcyBmb3IgbmF0aXZlIGBmcy5yZWFkYC5cbiAgICByZWFkLl9fcHJvdG9fXyA9IGZzJHJlYWRcbiAgICByZXR1cm4gcmVhZFxuICB9KShmcy5yZWFkKVxuXG4gIGZzLnJlYWRTeW5jID0gKGZ1bmN0aW9uIChmcyRyZWFkU3luYykgeyByZXR1cm4gZnVuY3Rpb24gKGZkLCBidWZmZXIsIG9mZnNldCwgbGVuZ3RoLCBwb3NpdGlvbikge1xuICAgIHZhciBlYWdDb3VudGVyID0gMFxuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gZnMkcmVhZFN5bmMuY2FsbChmcywgZmQsIGJ1ZmZlciwgb2Zmc2V0LCBsZW5ndGgsIHBvc2l0aW9uKVxuICAgICAgfSBjYXRjaCAoZXIpIHtcbiAgICAgICAgaWYgKGVyLmNvZGUgPT09ICdFQUdBSU4nICYmIGVhZ0NvdW50ZXIgPCAxMCkge1xuICAgICAgICAgIGVhZ0NvdW50ZXIgKytcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG4gICAgICAgIHRocm93IGVyXG4gICAgICB9XG4gICAgfVxuICB9fSkoZnMucmVhZFN5bmMpXG5cbiAgZnVuY3Rpb24gcGF0Y2hMY2htb2QgKGZzKSB7XG4gICAgZnMubGNobW9kID0gZnVuY3Rpb24gKHBhdGgsIG1vZGUsIGNhbGxiYWNrKSB7XG4gICAgICBmcy5vcGVuKCBwYXRoXG4gICAgICAgICAgICAgLCBjb25zdGFudHMuT19XUk9OTFkgfCBjb25zdGFudHMuT19TWU1MSU5LXG4gICAgICAgICAgICAgLCBtb2RlXG4gICAgICAgICAgICAgLCBmdW5jdGlvbiAoZXJyLCBmZCkge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjayhlcnIpXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgLy8gcHJlZmVyIHRvIHJldHVybiB0aGUgY2htb2QgZXJyb3IsIGlmIG9uZSBvY2N1cnMsXG4gICAgICAgIC8vIGJ1dCBzdGlsbCB0cnkgdG8gY2xvc2UsIGFuZCByZXBvcnQgY2xvc2luZyBlcnJvcnMgaWYgdGhleSBvY2N1ci5cbiAgICAgICAgZnMuZmNobW9kKGZkLCBtb2RlLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgZnMuY2xvc2UoZmQsIGZ1bmN0aW9uKGVycjIpIHtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soZXJyIHx8IGVycjIpXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnMubGNobW9kU3luYyA9IGZ1bmN0aW9uIChwYXRoLCBtb2RlKSB7XG4gICAgICB2YXIgZmQgPSBmcy5vcGVuU3luYyhwYXRoLCBjb25zdGFudHMuT19XUk9OTFkgfCBjb25zdGFudHMuT19TWU1MSU5LLCBtb2RlKVxuXG4gICAgICAvLyBwcmVmZXIgdG8gcmV0dXJuIHRoZSBjaG1vZCBlcnJvciwgaWYgb25lIG9jY3VycyxcbiAgICAgIC8vIGJ1dCBzdGlsbCB0cnkgdG8gY2xvc2UsIGFuZCByZXBvcnQgY2xvc2luZyBlcnJvcnMgaWYgdGhleSBvY2N1ci5cbiAgICAgIHZhciB0aHJldyA9IHRydWVcbiAgICAgIHZhciByZXRcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldCA9IGZzLmZjaG1vZFN5bmMoZmQsIG1vZGUpXG4gICAgICAgIHRocmV3ID0gZmFsc2VcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmICh0aHJldykge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmcy5jbG9zZVN5bmMoZmQpXG4gICAgICAgICAgfSBjYXRjaCAoZXIpIHt9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZnMuY2xvc2VTeW5jKGZkKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcmV0XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcGF0Y2hMdXRpbWVzIChmcykge1xuICAgIGlmIChjb25zdGFudHMuaGFzT3duUHJvcGVydHkoXCJPX1NZTUxJTktcIikpIHtcbiAgICAgIGZzLmx1dGltZXMgPSBmdW5jdGlvbiAocGF0aCwgYXQsIG10LCBjYikge1xuICAgICAgICBmcy5vcGVuKHBhdGgsIGNvbnN0YW50cy5PX1NZTUxJTkssIGZ1bmN0aW9uIChlciwgZmQpIHtcbiAgICAgICAgICBpZiAoZXIpIHtcbiAgICAgICAgICAgIGlmIChjYikgY2IoZXIpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICB9XG4gICAgICAgICAgZnMuZnV0aW1lcyhmZCwgYXQsIG10LCBmdW5jdGlvbiAoZXIpIHtcbiAgICAgICAgICAgIGZzLmNsb3NlKGZkLCBmdW5jdGlvbiAoZXIyKSB7XG4gICAgICAgICAgICAgIGlmIChjYikgY2IoZXIgfHwgZXIyKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICBmcy5sdXRpbWVzU3luYyA9IGZ1bmN0aW9uIChwYXRoLCBhdCwgbXQpIHtcbiAgICAgICAgdmFyIGZkID0gZnMub3BlblN5bmMocGF0aCwgY29uc3RhbnRzLk9fU1lNTElOSylcbiAgICAgICAgdmFyIHJldFxuICAgICAgICB2YXIgdGhyZXcgPSB0cnVlXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0ID0gZnMuZnV0aW1lc1N5bmMoZmQsIGF0LCBtdClcbiAgICAgICAgICB0aHJldyA9IGZhbHNlXG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgaWYgKHRocmV3KSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBmcy5jbG9zZVN5bmMoZmQpXG4gICAgICAgICAgICB9IGNhdGNoIChlcikge31cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZnMuY2xvc2VTeW5jKGZkKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgZnMubHV0aW1lcyA9IGZ1bmN0aW9uIChfYSwgX2IsIF9jLCBjYikgeyBpZiAoY2IpIHByb2Nlc3MubmV4dFRpY2soY2IpIH1cbiAgICAgIGZzLmx1dGltZXNTeW5jID0gZnVuY3Rpb24gKCkge31cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjaG1vZEZpeCAob3JpZykge1xuICAgIGlmICghb3JpZykgcmV0dXJuIG9yaWdcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwgbW9kZSwgY2IpIHtcbiAgICAgIHJldHVybiBvcmlnLmNhbGwoZnMsIHRhcmdldCwgbW9kZSwgZnVuY3Rpb24gKGVyKSB7XG4gICAgICAgIGlmIChjaG93bkVyT2soZXIpKSBlciA9IG51bGxcbiAgICAgICAgaWYgKGNiKSBjYi5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNobW9kRml4U3luYyAob3JpZykge1xuICAgIGlmICghb3JpZykgcmV0dXJuIG9yaWdcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwgbW9kZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIG9yaWcuY2FsbChmcywgdGFyZ2V0LCBtb2RlKVxuICAgICAgfSBjYXRjaCAoZXIpIHtcbiAgICAgICAgaWYgKCFjaG93bkVyT2soZXIpKSB0aHJvdyBlclxuICAgICAgfVxuICAgIH1cbiAgfVxuXG5cbiAgZnVuY3Rpb24gY2hvd25GaXggKG9yaWcpIHtcbiAgICBpZiAoIW9yaWcpIHJldHVybiBvcmlnXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIHVpZCwgZ2lkLCBjYikge1xuICAgICAgcmV0dXJuIG9yaWcuY2FsbChmcywgdGFyZ2V0LCB1aWQsIGdpZCwgZnVuY3Rpb24gKGVyKSB7XG4gICAgICAgIGlmIChjaG93bkVyT2soZXIpKSBlciA9IG51bGxcbiAgICAgICAgaWYgKGNiKSBjYi5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNob3duRml4U3luYyAob3JpZykge1xuICAgIGlmICghb3JpZykgcmV0dXJuIG9yaWdcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwgdWlkLCBnaWQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBvcmlnLmNhbGwoZnMsIHRhcmdldCwgdWlkLCBnaWQpXG4gICAgICB9IGNhdGNoIChlcikge1xuICAgICAgICBpZiAoIWNob3duRXJPayhlcikpIHRocm93IGVyXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc3RhdEZpeCAob3JpZykge1xuICAgIGlmICghb3JpZykgcmV0dXJuIG9yaWdcbiAgICAvLyBPbGRlciB2ZXJzaW9ucyBvZiBOb2RlIGVycm9uZW91c2x5IHJldHVybmVkIHNpZ25lZCBpbnRlZ2VycyBmb3JcbiAgICAvLyB1aWQgKyBnaWQuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIG9wdGlvbnMsIGNiKSB7XG4gICAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY2IgPSBvcHRpb25zXG4gICAgICAgIG9wdGlvbnMgPSBudWxsXG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBjYWxsYmFjayAoZXIsIHN0YXRzKSB7XG4gICAgICAgIGlmIChzdGF0cykge1xuICAgICAgICAgIGlmIChzdGF0cy51aWQgPCAwKSBzdGF0cy51aWQgKz0gMHgxMDAwMDAwMDBcbiAgICAgICAgICBpZiAoc3RhdHMuZ2lkIDwgMCkgc3RhdHMuZ2lkICs9IDB4MTAwMDAwMDAwXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNiKSBjYi5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgICB9XG4gICAgICByZXR1cm4gb3B0aW9ucyA/IG9yaWcuY2FsbChmcywgdGFyZ2V0LCBvcHRpb25zLCBjYWxsYmFjaylcbiAgICAgICAgOiBvcmlnLmNhbGwoZnMsIHRhcmdldCwgY2FsbGJhY2spXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc3RhdEZpeFN5bmMgKG9yaWcpIHtcbiAgICBpZiAoIW9yaWcpIHJldHVybiBvcmlnXG4gICAgLy8gT2xkZXIgdmVyc2lvbnMgb2YgTm9kZSBlcnJvbmVvdXNseSByZXR1cm5lZCBzaWduZWQgaW50ZWdlcnMgZm9yXG4gICAgLy8gdWlkICsgZ2lkLlxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBvcHRpb25zKSB7XG4gICAgICB2YXIgc3RhdHMgPSBvcHRpb25zID8gb3JpZy5jYWxsKGZzLCB0YXJnZXQsIG9wdGlvbnMpXG4gICAgICAgIDogb3JpZy5jYWxsKGZzLCB0YXJnZXQpXG4gICAgICBpZiAoc3RhdHMudWlkIDwgMCkgc3RhdHMudWlkICs9IDB4MTAwMDAwMDAwXG4gICAgICBpZiAoc3RhdHMuZ2lkIDwgMCkgc3RhdHMuZ2lkICs9IDB4MTAwMDAwMDAwXG4gICAgICByZXR1cm4gc3RhdHM7XG4gICAgfVxuICB9XG5cbiAgLy8gRU5PU1lTIG1lYW5zIHRoYXQgdGhlIGZzIGRvZXNuJ3Qgc3VwcG9ydCB0aGUgb3AuIEp1c3QgaWdub3JlXG4gIC8vIHRoYXQsIGJlY2F1c2UgaXQgZG9lc24ndCBtYXR0ZXIuXG4gIC8vXG4gIC8vIGlmIHRoZXJlJ3Mgbm8gZ2V0dWlkLCBvciBpZiBnZXR1aWQoKSBpcyBzb21ldGhpbmcgb3RoZXJcbiAgLy8gdGhhbiAwLCBhbmQgdGhlIGVycm9yIGlzIEVJTlZBTCBvciBFUEVSTSwgdGhlbiBqdXN0IGlnbm9yZVxuICAvLyBpdC5cbiAgLy9cbiAgLy8gVGhpcyBzcGVjaWZpYyBjYXNlIGlzIGEgc2lsZW50IGZhaWx1cmUgaW4gY3AsIGluc3RhbGwsIHRhcixcbiAgLy8gYW5kIG1vc3Qgb3RoZXIgdW5peCB0b29scyB0aGF0IG1hbmFnZSBwZXJtaXNzaW9ucy5cbiAgLy9cbiAgLy8gV2hlbiBydW5uaW5nIGFzIHJvb3QsIG9yIGlmIG90aGVyIHR5cGVzIG9mIGVycm9ycyBhcmVcbiAgLy8gZW5jb3VudGVyZWQsIHRoZW4gaXQncyBzdHJpY3QuXG4gIGZ1bmN0aW9uIGNob3duRXJPayAoZXIpIHtcbiAgICBpZiAoIWVyKVxuICAgICAgcmV0dXJuIHRydWVcblxuICAgIGlmIChlci5jb2RlID09PSBcIkVOT1NZU1wiKVxuICAgICAgcmV0dXJuIHRydWVcblxuICAgIHZhciBub25yb290ID0gIXByb2Nlc3MuZ2V0dWlkIHx8IHByb2Nlc3MuZ2V0dWlkKCkgIT09IDBcbiAgICBpZiAobm9ucm9vdCkge1xuICAgICAgaWYgKGVyLmNvZGUgPT09IFwiRUlOVkFMXCIgfHwgZXIuY29kZSA9PT0gXCJFUEVSTVwiKVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb25zdGFudHNcIik7IiwidmFyIFN0cmVhbSA9IHJlcXVpcmUoJ3N0cmVhbScpLlN0cmVhbVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxlZ2FjeVxuXG5mdW5jdGlvbiBsZWdhY3kgKGZzKSB7XG4gIHJldHVybiB7XG4gICAgUmVhZFN0cmVhbTogUmVhZFN0cmVhbSxcbiAgICBXcml0ZVN0cmVhbTogV3JpdGVTdHJlYW1cbiAgfVxuXG4gIGZ1bmN0aW9uIFJlYWRTdHJlYW0gKHBhdGgsIG9wdGlvbnMpIHtcbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUmVhZFN0cmVhbSkpIHJldHVybiBuZXcgUmVhZFN0cmVhbShwYXRoLCBvcHRpb25zKTtcblxuICAgIFN0cmVhbS5jYWxsKHRoaXMpO1xuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgdGhpcy5wYXRoID0gcGF0aDtcbiAgICB0aGlzLmZkID0gbnVsbDtcbiAgICB0aGlzLnJlYWRhYmxlID0gdHJ1ZTtcbiAgICB0aGlzLnBhdXNlZCA9IGZhbHNlO1xuXG4gICAgdGhpcy5mbGFncyA9ICdyJztcbiAgICB0aGlzLm1vZGUgPSA0Mzg7IC8qPTA2NjYqL1xuICAgIHRoaXMuYnVmZmVyU2l6ZSA9IDY0ICogMTAyNDtcblxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgLy8gTWl4aW4gb3B0aW9ucyBpbnRvIHRoaXNcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9wdGlvbnMpO1xuICAgIGZvciAodmFyIGluZGV4ID0gMCwgbGVuZ3RoID0ga2V5cy5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpbmRleF07XG4gICAgICB0aGlzW2tleV0gPSBvcHRpb25zW2tleV07XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZW5jb2RpbmcpIHRoaXMuc2V0RW5jb2RpbmcodGhpcy5lbmNvZGluZyk7XG5cbiAgICBpZiAodGhpcy5zdGFydCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoJ251bWJlcicgIT09IHR5cGVvZiB0aGlzLnN0YXJ0KSB7XG4gICAgICAgIHRocm93IFR5cGVFcnJvcignc3RhcnQgbXVzdCBiZSBhIE51bWJlcicpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZW5kID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5lbmQgPSBJbmZpbml0eTtcbiAgICAgIH0gZWxzZSBpZiAoJ251bWJlcicgIT09IHR5cGVvZiB0aGlzLmVuZCkge1xuICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2VuZCBtdXN0IGJlIGEgTnVtYmVyJyk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnN0YXJ0ID4gdGhpcy5lbmQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdzdGFydCBtdXN0IGJlIDw9IGVuZCcpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnBvcyA9IHRoaXMuc3RhcnQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZmQgIT09IG51bGwpIHtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgIHNlbGYuX3JlYWQoKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZzLm9wZW4odGhpcy5wYXRoLCB0aGlzLmZsYWdzLCB0aGlzLm1vZGUsIGZ1bmN0aW9uIChlcnIsIGZkKSB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHNlbGYuZW1pdCgnZXJyb3InLCBlcnIpO1xuICAgICAgICBzZWxmLnJlYWRhYmxlID0gZmFsc2U7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc2VsZi5mZCA9IGZkO1xuICAgICAgc2VsZi5lbWl0KCdvcGVuJywgZmQpO1xuICAgICAgc2VsZi5fcmVhZCgpO1xuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBXcml0ZVN0cmVhbSAocGF0aCwgb3B0aW9ucykge1xuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBXcml0ZVN0cmVhbSkpIHJldHVybiBuZXcgV3JpdGVTdHJlYW0ocGF0aCwgb3B0aW9ucyk7XG5cbiAgICBTdHJlYW0uY2FsbCh0aGlzKTtcblxuICAgIHRoaXMucGF0aCA9IHBhdGg7XG4gICAgdGhpcy5mZCA9IG51bGw7XG4gICAgdGhpcy53cml0YWJsZSA9IHRydWU7XG5cbiAgICB0aGlzLmZsYWdzID0gJ3cnO1xuICAgIHRoaXMuZW5jb2RpbmcgPSAnYmluYXJ5JztcbiAgICB0aGlzLm1vZGUgPSA0Mzg7IC8qPTA2NjYqL1xuICAgIHRoaXMuYnl0ZXNXcml0dGVuID0gMDtcblxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgLy8gTWl4aW4gb3B0aW9ucyBpbnRvIHRoaXNcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9wdGlvbnMpO1xuICAgIGZvciAodmFyIGluZGV4ID0gMCwgbGVuZ3RoID0ga2V5cy5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpbmRleF07XG4gICAgICB0aGlzW2tleV0gPSBvcHRpb25zW2tleV07XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc3RhcnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKCdudW1iZXInICE9PSB0eXBlb2YgdGhpcy5zdGFydCkge1xuICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ3N0YXJ0IG11c3QgYmUgYSBOdW1iZXInKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnN0YXJ0IDwgMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3N0YXJ0IG11c3QgYmUgPj0gemVybycpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnBvcyA9IHRoaXMuc3RhcnQ7XG4gICAgfVxuXG4gICAgdGhpcy5idXN5ID0gZmFsc2U7XG4gICAgdGhpcy5fcXVldWUgPSBbXTtcblxuICAgIGlmICh0aGlzLmZkID09PSBudWxsKSB7XG4gICAgICB0aGlzLl9vcGVuID0gZnMub3BlbjtcbiAgICAgIHRoaXMuX3F1ZXVlLnB1c2goW3RoaXMuX29wZW4sIHRoaXMucGF0aCwgdGhpcy5mbGFncywgdGhpcy5tb2RlLCB1bmRlZmluZWRdKTtcbiAgICAgIHRoaXMuZmx1c2goKTtcbiAgICB9XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInN0cmVhbVwiKTsiLCIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBjbG9uZVxuXG5mdW5jdGlvbiBjbG9uZSAob2JqKSB7XG4gIGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpXG4gICAgcmV0dXJuIG9ialxuXG4gIGlmIChvYmogaW5zdGFuY2VvZiBPYmplY3QpXG4gICAgdmFyIGNvcHkgPSB7IF9fcHJvdG9fXzogb2JqLl9fcHJvdG9fXyB9XG4gIGVsc2VcbiAgICB2YXIgY29weSA9IE9iamVjdC5jcmVhdGUobnVsbClcblxuICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb3B5LCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpKVxuICB9KVxuXG4gIHJldHVybiBjb3B5XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1dGlsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImFzc2VydFwiKTsiLCIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNvcHlTeW5jOiByZXF1aXJlKCcuL2NvcHktc3luYycpXG59XG4iLCIndXNlIHN0cmljdCdcblxuY29uc3QgZnMgPSByZXF1aXJlKCdncmFjZWZ1bC1mcycpXG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG5jb25zdCBta2RpcnBTeW5jID0gcmVxdWlyZSgnLi4vbWtkaXJzJykubWtkaXJzU3luY1xuY29uc3QgdXRpbWVzU3luYyA9IHJlcXVpcmUoJy4uL3V0aWwvdXRpbWVzLmpzJykudXRpbWVzTWlsbGlzU3luY1xuY29uc3Qgc3RhdCA9IHJlcXVpcmUoJy4uL3V0aWwvc3RhdCcpXG5cbmZ1bmN0aW9uIGNvcHlTeW5jIChzcmMsIGRlc3QsIG9wdHMpIHtcbiAgaWYgKHR5cGVvZiBvcHRzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgb3B0cyA9IHsgZmlsdGVyOiBvcHRzIH1cbiAgfVxuXG4gIG9wdHMgPSBvcHRzIHx8IHt9XG4gIG9wdHMuY2xvYmJlciA9ICdjbG9iYmVyJyBpbiBvcHRzID8gISFvcHRzLmNsb2JiZXIgOiB0cnVlIC8vIGRlZmF1bHQgdG8gdHJ1ZSBmb3Igbm93XG4gIG9wdHMub3ZlcndyaXRlID0gJ292ZXJ3cml0ZScgaW4gb3B0cyA/ICEhb3B0cy5vdmVyd3JpdGUgOiBvcHRzLmNsb2JiZXIgLy8gb3ZlcndyaXRlIGZhbGxzIGJhY2sgdG8gY2xvYmJlclxuXG4gIC8vIFdhcm4gYWJvdXQgdXNpbmcgcHJlc2VydmVUaW1lc3RhbXBzIG9uIDMyLWJpdCBub2RlXG4gIGlmIChvcHRzLnByZXNlcnZlVGltZXN0YW1wcyAmJiBwcm9jZXNzLmFyY2ggPT09ICdpYTMyJykge1xuICAgIGNvbnNvbGUud2FybihgZnMtZXh0cmE6IFVzaW5nIHRoZSBwcmVzZXJ2ZVRpbWVzdGFtcHMgb3B0aW9uIGluIDMyLWJpdCBub2RlIGlzIG5vdCByZWNvbW1lbmRlZDtcXG5cbiAgICBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2pwcmljaGFyZHNvbi9ub2RlLWZzLWV4dHJhL2lzc3Vlcy8yNjlgKVxuICB9XG5cbiAgY29uc3QgeyBzcmNTdGF0LCBkZXN0U3RhdCB9ID0gc3RhdC5jaGVja1BhdGhzU3luYyhzcmMsIGRlc3QsICdjb3B5JylcbiAgc3RhdC5jaGVja1BhcmVudFBhdGhzU3luYyhzcmMsIHNyY1N0YXQsIGRlc3QsICdjb3B5JylcbiAgcmV0dXJuIGhhbmRsZUZpbHRlckFuZENvcHkoZGVzdFN0YXQsIHNyYywgZGVzdCwgb3B0cylcbn1cblxuZnVuY3Rpb24gaGFuZGxlRmlsdGVyQW5kQ29weSAoZGVzdFN0YXQsIHNyYywgZGVzdCwgb3B0cykge1xuICBpZiAob3B0cy5maWx0ZXIgJiYgIW9wdHMuZmlsdGVyKHNyYywgZGVzdCkpIHJldHVyblxuICBjb25zdCBkZXN0UGFyZW50ID0gcGF0aC5kaXJuYW1lKGRlc3QpXG4gIGlmICghZnMuZXhpc3RzU3luYyhkZXN0UGFyZW50KSkgbWtkaXJwU3luYyhkZXN0UGFyZW50KVxuICByZXR1cm4gc3RhcnRDb3B5KGRlc3RTdGF0LCBzcmMsIGRlc3QsIG9wdHMpXG59XG5cbmZ1bmN0aW9uIHN0YXJ0Q29weSAoZGVzdFN0YXQsIHNyYywgZGVzdCwgb3B0cykge1xuICBpZiAob3B0cy5maWx0ZXIgJiYgIW9wdHMuZmlsdGVyKHNyYywgZGVzdCkpIHJldHVyblxuICByZXR1cm4gZ2V0U3RhdHMoZGVzdFN0YXQsIHNyYywgZGVzdCwgb3B0cylcbn1cblxuZnVuY3Rpb24gZ2V0U3RhdHMgKGRlc3RTdGF0LCBzcmMsIGRlc3QsIG9wdHMpIHtcbiAgY29uc3Qgc3RhdFN5bmMgPSBvcHRzLmRlcmVmZXJlbmNlID8gZnMuc3RhdFN5bmMgOiBmcy5sc3RhdFN5bmNcbiAgY29uc3Qgc3JjU3RhdCA9IHN0YXRTeW5jKHNyYylcblxuICBpZiAoc3JjU3RhdC5pc0RpcmVjdG9yeSgpKSByZXR1cm4gb25EaXIoc3JjU3RhdCwgZGVzdFN0YXQsIHNyYywgZGVzdCwgb3B0cylcbiAgZWxzZSBpZiAoc3JjU3RhdC5pc0ZpbGUoKSB8fFxuICAgICAgICAgICBzcmNTdGF0LmlzQ2hhcmFjdGVyRGV2aWNlKCkgfHxcbiAgICAgICAgICAgc3JjU3RhdC5pc0Jsb2NrRGV2aWNlKCkpIHJldHVybiBvbkZpbGUoc3JjU3RhdCwgZGVzdFN0YXQsIHNyYywgZGVzdCwgb3B0cylcbiAgZWxzZSBpZiAoc3JjU3RhdC5pc1N5bWJvbGljTGluaygpKSByZXR1cm4gb25MaW5rKGRlc3RTdGF0LCBzcmMsIGRlc3QsIG9wdHMpXG59XG5cbmZ1bmN0aW9uIG9uRmlsZSAoc3JjU3RhdCwgZGVzdFN0YXQsIHNyYywgZGVzdCwgb3B0cykge1xuICBpZiAoIWRlc3RTdGF0KSByZXR1cm4gY29weUZpbGUoc3JjU3RhdCwgc3JjLCBkZXN0LCBvcHRzKVxuICByZXR1cm4gbWF5Q29weUZpbGUoc3JjU3RhdCwgc3JjLCBkZXN0LCBvcHRzKVxufVxuXG5mdW5jdGlvbiBtYXlDb3B5RmlsZSAoc3JjU3RhdCwgc3JjLCBkZXN0LCBvcHRzKSB7XG4gIGlmIChvcHRzLm92ZXJ3cml0ZSkge1xuICAgIGZzLnVubGlua1N5bmMoZGVzdClcbiAgICByZXR1cm4gY29weUZpbGUoc3JjU3RhdCwgc3JjLCBkZXN0LCBvcHRzKVxuICB9IGVsc2UgaWYgKG9wdHMuZXJyb3JPbkV4aXN0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGAnJHtkZXN0fScgYWxyZWFkeSBleGlzdHNgKVxuICB9XG59XG5cbmZ1bmN0aW9uIGNvcHlGaWxlIChzcmNTdGF0LCBzcmMsIGRlc3QsIG9wdHMpIHtcbiAgaWYgKHR5cGVvZiBmcy5jb3B5RmlsZVN5bmMgPT09ICdmdW5jdGlvbicpIHtcbiAgICBmcy5jb3B5RmlsZVN5bmMoc3JjLCBkZXN0KVxuICAgIGZzLmNobW9kU3luYyhkZXN0LCBzcmNTdGF0Lm1vZGUpXG4gICAgaWYgKG9wdHMucHJlc2VydmVUaW1lc3RhbXBzKSB7XG4gICAgICByZXR1cm4gdXRpbWVzU3luYyhkZXN0LCBzcmNTdGF0LmF0aW1lLCBzcmNTdGF0Lm10aW1lKVxuICAgIH1cbiAgICByZXR1cm5cbiAgfVxuICByZXR1cm4gY29weUZpbGVGYWxsYmFjayhzcmNTdGF0LCBzcmMsIGRlc3QsIG9wdHMpXG59XG5cbmZ1bmN0aW9uIGNvcHlGaWxlRmFsbGJhY2sgKHNyY1N0YXQsIHNyYywgZGVzdCwgb3B0cykge1xuICBjb25zdCBCVUZfTEVOR1RIID0gNjQgKiAxMDI0XG4gIGNvbnN0IF9idWZmID0gcmVxdWlyZSgnLi4vdXRpbC9idWZmZXInKShCVUZfTEVOR1RIKVxuXG4gIGNvbnN0IGZkciA9IGZzLm9wZW5TeW5jKHNyYywgJ3InKVxuICBjb25zdCBmZHcgPSBmcy5vcGVuU3luYyhkZXN0LCAndycsIHNyY1N0YXQubW9kZSlcbiAgbGV0IHBvcyA9IDBcblxuICB3aGlsZSAocG9zIDwgc3JjU3RhdC5zaXplKSB7XG4gICAgY29uc3QgYnl0ZXNSZWFkID0gZnMucmVhZFN5bmMoZmRyLCBfYnVmZiwgMCwgQlVGX0xFTkdUSCwgcG9zKVxuICAgIGZzLndyaXRlU3luYyhmZHcsIF9idWZmLCAwLCBieXRlc1JlYWQpXG4gICAgcG9zICs9IGJ5dGVzUmVhZFxuICB9XG5cbiAgaWYgKG9wdHMucHJlc2VydmVUaW1lc3RhbXBzKSBmcy5mdXRpbWVzU3luYyhmZHcsIHNyY1N0YXQuYXRpbWUsIHNyY1N0YXQubXRpbWUpXG5cbiAgZnMuY2xvc2VTeW5jKGZkcilcbiAgZnMuY2xvc2VTeW5jKGZkdylcbn1cblxuZnVuY3Rpb24gb25EaXIgKHNyY1N0YXQsIGRlc3RTdGF0LCBzcmMsIGRlc3QsIG9wdHMpIHtcbiAgaWYgKCFkZXN0U3RhdCkgcmV0dXJuIG1rRGlyQW5kQ29weShzcmNTdGF0LCBzcmMsIGRlc3QsIG9wdHMpXG4gIGlmIChkZXN0U3RhdCAmJiAhZGVzdFN0YXQuaXNEaXJlY3RvcnkoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IG92ZXJ3cml0ZSBub24tZGlyZWN0b3J5ICcke2Rlc3R9JyB3aXRoIGRpcmVjdG9yeSAnJHtzcmN9Jy5gKVxuICB9XG4gIHJldHVybiBjb3B5RGlyKHNyYywgZGVzdCwgb3B0cylcbn1cblxuZnVuY3Rpb24gbWtEaXJBbmRDb3B5IChzcmNTdGF0LCBzcmMsIGRlc3QsIG9wdHMpIHtcbiAgZnMubWtkaXJTeW5jKGRlc3QpXG4gIGNvcHlEaXIoc3JjLCBkZXN0LCBvcHRzKVxuICByZXR1cm4gZnMuY2htb2RTeW5jKGRlc3QsIHNyY1N0YXQubW9kZSlcbn1cblxuZnVuY3Rpb24gY29weURpciAoc3JjLCBkZXN0LCBvcHRzKSB7XG4gIGZzLnJlYWRkaXJTeW5jKHNyYykuZm9yRWFjaChpdGVtID0+IGNvcHlEaXJJdGVtKGl0ZW0sIHNyYywgZGVzdCwgb3B0cykpXG59XG5cbmZ1bmN0aW9uIGNvcHlEaXJJdGVtIChpdGVtLCBzcmMsIGRlc3QsIG9wdHMpIHtcbiAgY29uc3Qgc3JjSXRlbSA9IHBhdGguam9pbihzcmMsIGl0ZW0pXG4gIGNvbnN0IGRlc3RJdGVtID0gcGF0aC5qb2luKGRlc3QsIGl0ZW0pXG4gIGNvbnN0IHsgZGVzdFN0YXQgfSA9IHN0YXQuY2hlY2tQYXRoc1N5bmMoc3JjSXRlbSwgZGVzdEl0ZW0sICdjb3B5JylcbiAgcmV0dXJuIHN0YXJ0Q29weShkZXN0U3RhdCwgc3JjSXRlbSwgZGVzdEl0ZW0sIG9wdHMpXG59XG5cbmZ1bmN0aW9uIG9uTGluayAoZGVzdFN0YXQsIHNyYywgZGVzdCwgb3B0cykge1xuICBsZXQgcmVzb2x2ZWRTcmMgPSBmcy5yZWFkbGlua1N5bmMoc3JjKVxuICBpZiAob3B0cy5kZXJlZmVyZW5jZSkge1xuICAgIHJlc29sdmVkU3JjID0gcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIHJlc29sdmVkU3JjKVxuICB9XG5cbiAgaWYgKCFkZXN0U3RhdCkge1xuICAgIHJldHVybiBmcy5zeW1saW5rU3luYyhyZXNvbHZlZFNyYywgZGVzdClcbiAgfSBlbHNlIHtcbiAgICBsZXQgcmVzb2x2ZWREZXN0XG4gICAgdHJ5IHtcbiAgICAgIHJlc29sdmVkRGVzdCA9IGZzLnJlYWRsaW5rU3luYyhkZXN0KVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgLy8gZGVzdCBleGlzdHMgYW5kIGlzIGEgcmVndWxhciBmaWxlIG9yIGRpcmVjdG9yeSxcbiAgICAgIC8vIFdpbmRvd3MgbWF5IHRocm93IFVOS05PV04gZXJyb3IuIElmIGRlc3QgYWxyZWFkeSBleGlzdHMsXG4gICAgICAvLyBmcyB0aHJvd3MgZXJyb3IgYW55d2F5LCBzbyBubyBuZWVkIHRvIGd1YXJkIGFnYWluc3QgaXQgaGVyZS5cbiAgICAgIGlmIChlcnIuY29kZSA9PT0gJ0VJTlZBTCcgfHwgZXJyLmNvZGUgPT09ICdVTktOT1dOJykgcmV0dXJuIGZzLnN5bWxpbmtTeW5jKHJlc29sdmVkU3JjLCBkZXN0KVxuICAgICAgdGhyb3cgZXJyXG4gICAgfVxuICAgIGlmIChvcHRzLmRlcmVmZXJlbmNlKSB7XG4gICAgICByZXNvbHZlZERlc3QgPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgcmVzb2x2ZWREZXN0KVxuICAgIH1cbiAgICBpZiAoc3RhdC5pc1NyY1N1YmRpcihyZXNvbHZlZFNyYywgcmVzb2x2ZWREZXN0KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgY29weSAnJHtyZXNvbHZlZFNyY30nIHRvIGEgc3ViZGlyZWN0b3J5IG9mIGl0c2VsZiwgJyR7cmVzb2x2ZWREZXN0fScuYClcbiAgICB9XG5cbiAgICAvLyBwcmV2ZW50IGNvcHkgaWYgc3JjIGlzIGEgc3ViZGlyIG9mIGRlc3Qgc2luY2UgdW5saW5raW5nXG4gICAgLy8gZGVzdCBpbiB0aGlzIGNhc2Ugd291bGQgcmVzdWx0IGluIHJlbW92aW5nIHNyYyBjb250ZW50c1xuICAgIC8vIGFuZCB0aGVyZWZvcmUgYSBicm9rZW4gc3ltbGluayB3b3VsZCBiZSBjcmVhdGVkLlxuICAgIGlmIChmcy5zdGF0U3luYyhkZXN0KS5pc0RpcmVjdG9yeSgpICYmIHN0YXQuaXNTcmNTdWJkaXIocmVzb2x2ZWREZXN0LCByZXNvbHZlZFNyYykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IG92ZXJ3cml0ZSAnJHtyZXNvbHZlZERlc3R9JyB3aXRoICcke3Jlc29sdmVkU3JjfScuYClcbiAgICB9XG4gICAgcmV0dXJuIGNvcHlMaW5rKHJlc29sdmVkU3JjLCBkZXN0KVxuICB9XG59XG5cbmZ1bmN0aW9uIGNvcHlMaW5rIChyZXNvbHZlZFNyYywgZGVzdCkge1xuICBmcy51bmxpbmtTeW5jKGRlc3QpXG4gIHJldHVybiBmcy5zeW1saW5rU3luYyhyZXNvbHZlZFNyYywgZGVzdClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb3B5U3luY1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiLCIndXNlIHN0cmljdCdcbmNvbnN0IHUgPSByZXF1aXJlKCd1bml2ZXJzYWxpZnknKS5mcm9tQ2FsbGJhY2tcbmNvbnN0IG1rZGlycyA9IHUocmVxdWlyZSgnLi9ta2RpcnMnKSlcbmNvbnN0IG1rZGlyc1N5bmMgPSByZXF1aXJlKCcuL21rZGlycy1zeW5jJylcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG1rZGlycyxcbiAgbWtkaXJzU3luYyxcbiAgLy8gYWxpYXNcbiAgbWtkaXJwOiBta2RpcnMsXG4gIG1rZGlycFN5bmM6IG1rZGlyc1N5bmMsXG4gIGVuc3VyZURpcjogbWtkaXJzLFxuICBlbnN1cmVEaXJTeW5jOiBta2RpcnNTeW5jXG59XG4iLCIndXNlIHN0cmljdCdcblxuY29uc3QgZnMgPSByZXF1aXJlKCdncmFjZWZ1bC1mcycpXG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG5jb25zdCBpbnZhbGlkV2luMzJQYXRoID0gcmVxdWlyZSgnLi93aW4zMicpLmludmFsaWRXaW4zMlBhdGhcblxuY29uc3Qgbzc3NyA9IHBhcnNlSW50KCcwNzc3JywgOClcblxuZnVuY3Rpb24gbWtkaXJzIChwLCBvcHRzLCBjYWxsYmFjaywgbWFkZSkge1xuICBpZiAodHlwZW9mIG9wdHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYWxsYmFjayA9IG9wdHNcbiAgICBvcHRzID0ge31cbiAgfSBlbHNlIGlmICghb3B0cyB8fCB0eXBlb2Ygb3B0cyAhPT0gJ29iamVjdCcpIHtcbiAgICBvcHRzID0geyBtb2RlOiBvcHRzIH1cbiAgfVxuXG4gIGlmIChwcm9jZXNzLnBsYXRmb3JtID09PSAnd2luMzInICYmIGludmFsaWRXaW4zMlBhdGgocCkpIHtcbiAgICBjb25zdCBlcnJJbnZhbCA9IG5ldyBFcnJvcihwICsgJyBjb250YWlucyBpbnZhbGlkIFdJTjMyIHBhdGggY2hhcmFjdGVycy4nKVxuICAgIGVyckludmFsLmNvZGUgPSAnRUlOVkFMJ1xuICAgIHJldHVybiBjYWxsYmFjayhlcnJJbnZhbClcbiAgfVxuXG4gIGxldCBtb2RlID0gb3B0cy5tb2RlXG4gIGNvbnN0IHhmcyA9IG9wdHMuZnMgfHwgZnNcblxuICBpZiAobW9kZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbW9kZSA9IG83NzcgJiAofnByb2Nlc3MudW1hc2soKSlcbiAgfVxuICBpZiAoIW1hZGUpIG1hZGUgPSBudWxsXG5cbiAgY2FsbGJhY2sgPSBjYWxsYmFjayB8fCBmdW5jdGlvbiAoKSB7fVxuICBwID0gcGF0aC5yZXNvbHZlKHApXG5cbiAgeGZzLm1rZGlyKHAsIG1vZGUsIGVyID0+IHtcbiAgICBpZiAoIWVyKSB7XG4gICAgICBtYWRlID0gbWFkZSB8fCBwXG4gICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgbWFkZSlcbiAgICB9XG4gICAgc3dpdGNoIChlci5jb2RlKSB7XG4gICAgICBjYXNlICdFTk9FTlQnOlxuICAgICAgICBpZiAocGF0aC5kaXJuYW1lKHApID09PSBwKSByZXR1cm4gY2FsbGJhY2soZXIpXG4gICAgICAgIG1rZGlycyhwYXRoLmRpcm5hbWUocCksIG9wdHMsIChlciwgbWFkZSkgPT4ge1xuICAgICAgICAgIGlmIChlcikgY2FsbGJhY2soZXIsIG1hZGUpXG4gICAgICAgICAgZWxzZSBta2RpcnMocCwgb3B0cywgY2FsbGJhY2ssIG1hZGUpXG4gICAgICAgIH0pXG4gICAgICAgIGJyZWFrXG5cbiAgICAgIC8vIEluIHRoZSBjYXNlIG9mIGFueSBvdGhlciBlcnJvciwganVzdCBzZWUgaWYgdGhlcmUncyBhIGRpclxuICAgICAgLy8gdGhlcmUgYWxyZWFkeS4gIElmIHNvLCB0aGVuIGhvb3JheSEgIElmIG5vdCwgdGhlbiBzb21ldGhpbmdcbiAgICAgIC8vIGlzIGJvcmtlZC5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHhmcy5zdGF0KHAsIChlcjIsIHN0YXQpID0+IHtcbiAgICAgICAgICAvLyBpZiB0aGUgc3RhdCBmYWlscywgdGhlbiB0aGF0J3Mgc3VwZXIgd2VpcmQuXG4gICAgICAgICAgLy8gbGV0IHRoZSBvcmlnaW5hbCBlcnJvciBiZSB0aGUgZmFpbHVyZSByZWFzb24uXG4gICAgICAgICAgaWYgKGVyMiB8fCAhc3RhdC5pc0RpcmVjdG9yeSgpKSBjYWxsYmFjayhlciwgbWFkZSlcbiAgICAgICAgICBlbHNlIGNhbGxiYWNrKG51bGwsIG1hZGUpXG4gICAgICAgIH0pXG4gICAgICAgIGJyZWFrXG4gICAgfVxuICB9KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1rZGlyc1xuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcblxuLy8gZ2V0IGRyaXZlIG9uIHdpbmRvd3NcbmZ1bmN0aW9uIGdldFJvb3RQYXRoIChwKSB7XG4gIHAgPSBwYXRoLm5vcm1hbGl6ZShwYXRoLnJlc29sdmUocCkpLnNwbGl0KHBhdGguc2VwKVxuICBpZiAocC5sZW5ndGggPiAwKSByZXR1cm4gcFswXVxuICByZXR1cm4gbnVsbFxufVxuXG4vLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS82Mjg4OC8xMDMzMyBjb250YWlucyBtb3JlIGFjY3VyYXRlXG4vLyBUT0RPOiBleHBhbmQgdG8gaW5jbHVkZSB0aGUgcmVzdFxuY29uc3QgSU5WQUxJRF9QQVRIX0NIQVJTID0gL1s8PjpcInw/Kl0vXG5cbmZ1bmN0aW9uIGludmFsaWRXaW4zMlBhdGggKHApIHtcbiAgY29uc3QgcnAgPSBnZXRSb290UGF0aChwKVxuICBwID0gcC5yZXBsYWNlKHJwLCAnJylcbiAgcmV0dXJuIElOVkFMSURfUEFUSF9DSEFSUy50ZXN0KHApXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXRSb290UGF0aCxcbiAgaW52YWxpZFdpbjMyUGF0aFxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGZzID0gcmVxdWlyZSgnZ3JhY2VmdWwtZnMnKVxuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuY29uc3QgaW52YWxpZFdpbjMyUGF0aCA9IHJlcXVpcmUoJy4vd2luMzInKS5pbnZhbGlkV2luMzJQYXRoXG5cbmNvbnN0IG83NzcgPSBwYXJzZUludCgnMDc3NycsIDgpXG5cbmZ1bmN0aW9uIG1rZGlyc1N5bmMgKHAsIG9wdHMsIG1hZGUpIHtcbiAgaWYgKCFvcHRzIHx8IHR5cGVvZiBvcHRzICE9PSAnb2JqZWN0Jykge1xuICAgIG9wdHMgPSB7IG1vZGU6IG9wdHMgfVxuICB9XG5cbiAgbGV0IG1vZGUgPSBvcHRzLm1vZGVcbiAgY29uc3QgeGZzID0gb3B0cy5mcyB8fCBmc1xuXG4gIGlmIChwcm9jZXNzLnBsYXRmb3JtID09PSAnd2luMzInICYmIGludmFsaWRXaW4zMlBhdGgocCkpIHtcbiAgICBjb25zdCBlcnJJbnZhbCA9IG5ldyBFcnJvcihwICsgJyBjb250YWlucyBpbnZhbGlkIFdJTjMyIHBhdGggY2hhcmFjdGVycy4nKVxuICAgIGVyckludmFsLmNvZGUgPSAnRUlOVkFMJ1xuICAgIHRocm93IGVyckludmFsXG4gIH1cblxuICBpZiAobW9kZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbW9kZSA9IG83NzcgJiAofnByb2Nlc3MudW1hc2soKSlcbiAgfVxuICBpZiAoIW1hZGUpIG1hZGUgPSBudWxsXG5cbiAgcCA9IHBhdGgucmVzb2x2ZShwKVxuXG4gIHRyeSB7XG4gICAgeGZzLm1rZGlyU3luYyhwLCBtb2RlKVxuICAgIG1hZGUgPSBtYWRlIHx8IHBcbiAgfSBjYXRjaCAoZXJyMCkge1xuICAgIGlmIChlcnIwLmNvZGUgPT09ICdFTk9FTlQnKSB7XG4gICAgICBpZiAocGF0aC5kaXJuYW1lKHApID09PSBwKSB0aHJvdyBlcnIwXG4gICAgICBtYWRlID0gbWtkaXJzU3luYyhwYXRoLmRpcm5hbWUocCksIG9wdHMsIG1hZGUpXG4gICAgICBta2RpcnNTeW5jKHAsIG9wdHMsIG1hZGUpXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEluIHRoZSBjYXNlIG9mIGFueSBvdGhlciBlcnJvciwganVzdCBzZWUgaWYgdGhlcmUncyBhIGRpciB0aGVyZVxuICAgICAgLy8gYWxyZWFkeS4gSWYgc28sIHRoZW4gaG9vcmF5ISAgSWYgbm90LCB0aGVuIHNvbWV0aGluZyBpcyBib3JrZWQuXG4gICAgICBsZXQgc3RhdFxuICAgICAgdHJ5IHtcbiAgICAgICAgc3RhdCA9IHhmcy5zdGF0U3luYyhwKVxuICAgICAgfSBjYXRjaCAoZXJyMSkge1xuICAgICAgICB0aHJvdyBlcnIwXG4gICAgICB9XG4gICAgICBpZiAoIXN0YXQuaXNEaXJlY3RvcnkoKSkgdGhyb3cgZXJyMFxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBtYWRlXG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWtkaXJzU3luY1xuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGZzID0gcmVxdWlyZSgnZ3JhY2VmdWwtZnMnKVxuY29uc3Qgb3MgPSByZXF1aXJlKCdvcycpXG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG5cbi8vIEhGUywgZXh0ezIsM30sIEZBVCBkbyBub3QsIE5vZGUuanMgdjAuMTAgZG9lcyBub3RcbmZ1bmN0aW9uIGhhc01pbGxpc1Jlc1N5bmMgKCkge1xuICBsZXQgdG1wZmlsZSA9IHBhdGguam9pbignbWlsbGlzLXRlc3Qtc3luYycgKyBEYXRlLm5vdygpLnRvU3RyaW5nKCkgKyBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCkuc2xpY2UoMikpXG4gIHRtcGZpbGUgPSBwYXRoLmpvaW4ob3MudG1wZGlyKCksIHRtcGZpbGUpXG5cbiAgLy8gNTUwIG1pbGxpcyBwYXN0IFVOSVggZXBvY2hcbiAgY29uc3QgZCA9IG5ldyBEYXRlKDE0MzU0MTAyNDM4NjIpXG4gIGZzLndyaXRlRmlsZVN5bmModG1wZmlsZSwgJ2h0dHBzOi8vZ2l0aHViLmNvbS9qcHJpY2hhcmRzb24vbm9kZS1mcy1leHRyYS9wdWxsLzE0MScpXG4gIGNvbnN0IGZkID0gZnMub3BlblN5bmModG1wZmlsZSwgJ3IrJylcbiAgZnMuZnV0aW1lc1N5bmMoZmQsIGQsIGQpXG4gIGZzLmNsb3NlU3luYyhmZClcbiAgcmV0dXJuIGZzLnN0YXRTeW5jKHRtcGZpbGUpLm10aW1lID4gMTQzNTQxMDI0MzAwMFxufVxuXG5mdW5jdGlvbiBoYXNNaWxsaXNSZXMgKGNhbGxiYWNrKSB7XG4gIGxldCB0bXBmaWxlID0gcGF0aC5qb2luKCdtaWxsaXMtdGVzdCcgKyBEYXRlLm5vdygpLnRvU3RyaW5nKCkgKyBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCkuc2xpY2UoMikpXG4gIHRtcGZpbGUgPSBwYXRoLmpvaW4ob3MudG1wZGlyKCksIHRtcGZpbGUpXG5cbiAgLy8gNTUwIG1pbGxpcyBwYXN0IFVOSVggZXBvY2hcbiAgY29uc3QgZCA9IG5ldyBEYXRlKDE0MzU0MTAyNDM4NjIpXG4gIGZzLndyaXRlRmlsZSh0bXBmaWxlLCAnaHR0cHM6Ly9naXRodWIuY29tL2pwcmljaGFyZHNvbi9ub2RlLWZzLWV4dHJhL3B1bGwvMTQxJywgZXJyID0+IHtcbiAgICBpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKVxuICAgIGZzLm9wZW4odG1wZmlsZSwgJ3IrJywgKGVyciwgZmQpID0+IHtcbiAgICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgICBmcy5mdXRpbWVzKGZkLCBkLCBkLCBlcnIgPT4ge1xuICAgICAgICBpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKVxuICAgICAgICBmcy5jbG9zZShmZCwgZXJyID0+IHtcbiAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKVxuICAgICAgICAgIGZzLnN0YXQodG1wZmlsZSwgKGVyciwgc3RhdHMpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgICAgICAgICBjYWxsYmFjayhudWxsLCBzdGF0cy5tdGltZSA+IDE0MzU0MTAyNDMwMDApXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfSlcbn1cblxuZnVuY3Rpb24gdGltZVJlbW92ZU1pbGxpcyAodGltZXN0YW1wKSB7XG4gIGlmICh0eXBlb2YgdGltZXN0YW1wID09PSAnbnVtYmVyJykge1xuICAgIHJldHVybiBNYXRoLmZsb29yKHRpbWVzdGFtcCAvIDEwMDApICogMTAwMFxuICB9IGVsc2UgaWYgKHRpbWVzdGFtcCBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoTWF0aC5mbG9vcih0aW1lc3RhbXAuZ2V0VGltZSgpIC8gMTAwMCkgKiAxMDAwKVxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignZnMtZXh0cmE6IHRpbWVSZW1vdmVNaWxsaXMoKSB1bmtub3duIHBhcmFtZXRlciB0eXBlJylcbiAgfVxufVxuXG5mdW5jdGlvbiB1dGltZXNNaWxsaXMgKHBhdGgsIGF0aW1lLCBtdGltZSwgY2FsbGJhY2spIHtcbiAgLy8gaWYgKCFIQVNfTUlMTElTX1JFUykgcmV0dXJuIGZzLnV0aW1lcyhwYXRoLCBhdGltZSwgbXRpbWUsIGNhbGxiYWNrKVxuICBmcy5vcGVuKHBhdGgsICdyKycsIChlcnIsIGZkKSA9PiB7XG4gICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycilcbiAgICBmcy5mdXRpbWVzKGZkLCBhdGltZSwgbXRpbWUsIGZ1dGltZXNFcnIgPT4ge1xuICAgICAgZnMuY2xvc2UoZmQsIGNsb3NlRXJyID0+IHtcbiAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjayhmdXRpbWVzRXJyIHx8IGNsb3NlRXJyKVxuICAgICAgfSlcbiAgICB9KVxuICB9KVxufVxuXG5mdW5jdGlvbiB1dGltZXNNaWxsaXNTeW5jIChwYXRoLCBhdGltZSwgbXRpbWUpIHtcbiAgY29uc3QgZmQgPSBmcy5vcGVuU3luYyhwYXRoLCAncisnKVxuICBmcy5mdXRpbWVzU3luYyhmZCwgYXRpbWUsIG10aW1lKVxuICByZXR1cm4gZnMuY2xvc2VTeW5jKGZkKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaGFzTWlsbGlzUmVzLFxuICBoYXNNaWxsaXNSZXNTeW5jLFxuICB0aW1lUmVtb3ZlTWlsbGlzLFxuICB1dGltZXNNaWxsaXMsXG4gIHV0aW1lc01pbGxpc1N5bmNcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm9zXCIpOyIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBmcyA9IHJlcXVpcmUoJ2dyYWNlZnVsLWZzJylcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcblxuY29uc3QgTk9ERV9WRVJTSU9OX01BSk9SX1dJVEhfQklHSU5UID0gMTBcbmNvbnN0IE5PREVfVkVSU0lPTl9NSU5PUl9XSVRIX0JJR0lOVCA9IDVcbmNvbnN0IE5PREVfVkVSU0lPTl9QQVRDSF9XSVRIX0JJR0lOVCA9IDBcbmNvbnN0IG5vZGVWZXJzaW9uID0gcHJvY2Vzcy52ZXJzaW9ucy5ub2RlLnNwbGl0KCcuJylcbmNvbnN0IG5vZGVWZXJzaW9uTWFqb3IgPSBOdW1iZXIucGFyc2VJbnQobm9kZVZlcnNpb25bMF0sIDEwKVxuY29uc3Qgbm9kZVZlcnNpb25NaW5vciA9IE51bWJlci5wYXJzZUludChub2RlVmVyc2lvblsxXSwgMTApXG5jb25zdCBub2RlVmVyc2lvblBhdGNoID0gTnVtYmVyLnBhcnNlSW50KG5vZGVWZXJzaW9uWzJdLCAxMClcblxuZnVuY3Rpb24gbm9kZVN1cHBvcnRzQmlnSW50ICgpIHtcbiAgaWYgKG5vZGVWZXJzaW9uTWFqb3IgPiBOT0RFX1ZFUlNJT05fTUFKT1JfV0lUSF9CSUdJTlQpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9IGVsc2UgaWYgKG5vZGVWZXJzaW9uTWFqb3IgPT09IE5PREVfVkVSU0lPTl9NQUpPUl9XSVRIX0JJR0lOVCkge1xuICAgIGlmIChub2RlVmVyc2lvbk1pbm9yID4gTk9ERV9WRVJTSU9OX01JTk9SX1dJVEhfQklHSU5UKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH0gZWxzZSBpZiAobm9kZVZlcnNpb25NaW5vciA9PT0gTk9ERV9WRVJTSU9OX01JTk9SX1dJVEhfQklHSU5UKSB7XG4gICAgICBpZiAobm9kZVZlcnNpb25QYXRjaCA+PSBOT0RFX1ZFUlNJT05fUEFUQ0hfV0lUSF9CSUdJTlQpIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59XG5cbmZ1bmN0aW9uIGdldFN0YXRzIChzcmMsIGRlc3QsIGNiKSB7XG4gIGlmIChub2RlU3VwcG9ydHNCaWdJbnQoKSkge1xuICAgIGZzLnN0YXQoc3JjLCB7IGJpZ2ludDogdHJ1ZSB9LCAoZXJyLCBzcmNTdGF0KSA9PiB7XG4gICAgICBpZiAoZXJyKSByZXR1cm4gY2IoZXJyKVxuICAgICAgZnMuc3RhdChkZXN0LCB7IGJpZ2ludDogdHJ1ZSB9LCAoZXJyLCBkZXN0U3RhdCkgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgaWYgKGVyci5jb2RlID09PSAnRU5PRU5UJykgcmV0dXJuIGNiKG51bGwsIHsgc3JjU3RhdCwgZGVzdFN0YXQ6IG51bGwgfSlcbiAgICAgICAgICByZXR1cm4gY2IoZXJyKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjYihudWxsLCB7IHNyY1N0YXQsIGRlc3RTdGF0IH0pXG4gICAgICB9KVxuICAgIH0pXG4gIH0gZWxzZSB7XG4gICAgZnMuc3RhdChzcmMsIChlcnIsIHNyY1N0YXQpID0+IHtcbiAgICAgIGlmIChlcnIpIHJldHVybiBjYihlcnIpXG4gICAgICBmcy5zdGF0KGRlc3QsIChlcnIsIGRlc3RTdGF0KSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICBpZiAoZXJyLmNvZGUgPT09ICdFTk9FTlQnKSByZXR1cm4gY2IobnVsbCwgeyBzcmNTdGF0LCBkZXN0U3RhdDogbnVsbCB9KVxuICAgICAgICAgIHJldHVybiBjYihlcnIpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNiKG51bGwsIHsgc3JjU3RhdCwgZGVzdFN0YXQgfSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRTdGF0c1N5bmMgKHNyYywgZGVzdCkge1xuICBsZXQgc3JjU3RhdCwgZGVzdFN0YXRcbiAgaWYgKG5vZGVTdXBwb3J0c0JpZ0ludCgpKSB7XG4gICAgc3JjU3RhdCA9IGZzLnN0YXRTeW5jKHNyYywgeyBiaWdpbnQ6IHRydWUgfSlcbiAgfSBlbHNlIHtcbiAgICBzcmNTdGF0ID0gZnMuc3RhdFN5bmMoc3JjKVxuICB9XG4gIHRyeSB7XG4gICAgaWYgKG5vZGVTdXBwb3J0c0JpZ0ludCgpKSB7XG4gICAgICBkZXN0U3RhdCA9IGZzLnN0YXRTeW5jKGRlc3QsIHsgYmlnaW50OiB0cnVlIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGRlc3RTdGF0ID0gZnMuc3RhdFN5bmMoZGVzdClcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGlmIChlcnIuY29kZSA9PT0gJ0VOT0VOVCcpIHJldHVybiB7IHNyY1N0YXQsIGRlc3RTdGF0OiBudWxsIH1cbiAgICB0aHJvdyBlcnJcbiAgfVxuICByZXR1cm4geyBzcmNTdGF0LCBkZXN0U3RhdCB9XG59XG5cbmZ1bmN0aW9uIGNoZWNrUGF0aHMgKHNyYywgZGVzdCwgZnVuY05hbWUsIGNiKSB7XG4gIGdldFN0YXRzKHNyYywgZGVzdCwgKGVyciwgc3RhdHMpID0+IHtcbiAgICBpZiAoZXJyKSByZXR1cm4gY2IoZXJyKVxuICAgIGNvbnN0IHsgc3JjU3RhdCwgZGVzdFN0YXQgfSA9IHN0YXRzXG4gICAgaWYgKGRlc3RTdGF0ICYmIGRlc3RTdGF0LmlubyAmJiBkZXN0U3RhdC5kZXYgJiYgZGVzdFN0YXQuaW5vID09PSBzcmNTdGF0LmlubyAmJiBkZXN0U3RhdC5kZXYgPT09IHNyY1N0YXQuZGV2KSB7XG4gICAgICByZXR1cm4gY2IobmV3IEVycm9yKCdTb3VyY2UgYW5kIGRlc3RpbmF0aW9uIG11c3Qgbm90IGJlIHRoZSBzYW1lLicpKVxuICAgIH1cbiAgICBpZiAoc3JjU3RhdC5pc0RpcmVjdG9yeSgpICYmIGlzU3JjU3ViZGlyKHNyYywgZGVzdCkpIHtcbiAgICAgIHJldHVybiBjYihuZXcgRXJyb3IoZXJyTXNnKHNyYywgZGVzdCwgZnVuY05hbWUpKSlcbiAgICB9XG4gICAgcmV0dXJuIGNiKG51bGwsIHsgc3JjU3RhdCwgZGVzdFN0YXQgfSlcbiAgfSlcbn1cblxuZnVuY3Rpb24gY2hlY2tQYXRoc1N5bmMgKHNyYywgZGVzdCwgZnVuY05hbWUpIHtcbiAgY29uc3QgeyBzcmNTdGF0LCBkZXN0U3RhdCB9ID0gZ2V0U3RhdHNTeW5jKHNyYywgZGVzdClcbiAgaWYgKGRlc3RTdGF0ICYmIGRlc3RTdGF0LmlubyAmJiBkZXN0U3RhdC5kZXYgJiYgZGVzdFN0YXQuaW5vID09PSBzcmNTdGF0LmlubyAmJiBkZXN0U3RhdC5kZXYgPT09IHNyY1N0YXQuZGV2KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdTb3VyY2UgYW5kIGRlc3RpbmF0aW9uIG11c3Qgbm90IGJlIHRoZSBzYW1lLicpXG4gIH1cbiAgaWYgKHNyY1N0YXQuaXNEaXJlY3RvcnkoKSAmJiBpc1NyY1N1YmRpcihzcmMsIGRlc3QpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGVyck1zZyhzcmMsIGRlc3QsIGZ1bmNOYW1lKSlcbiAgfVxuICByZXR1cm4geyBzcmNTdGF0LCBkZXN0U3RhdCB9XG59XG5cbi8vIHJlY3Vyc2l2ZWx5IGNoZWNrIGlmIGRlc3QgcGFyZW50IGlzIGEgc3ViZGlyZWN0b3J5IG9mIHNyYy5cbi8vIEl0IHdvcmtzIGZvciBhbGwgZmlsZSB0eXBlcyBpbmNsdWRpbmcgc3ltbGlua3Mgc2luY2UgaXRcbi8vIGNoZWNrcyB0aGUgc3JjIGFuZCBkZXN0IGlub2Rlcy4gSXQgc3RhcnRzIGZyb20gdGhlIGRlZXBlc3Rcbi8vIHBhcmVudCBhbmQgc3RvcHMgb25jZSBpdCByZWFjaGVzIHRoZSBzcmMgcGFyZW50IG9yIHRoZSByb290IHBhdGguXG5mdW5jdGlvbiBjaGVja1BhcmVudFBhdGhzIChzcmMsIHNyY1N0YXQsIGRlc3QsIGZ1bmNOYW1lLCBjYikge1xuICBjb25zdCBzcmNQYXJlbnQgPSBwYXRoLnJlc29sdmUocGF0aC5kaXJuYW1lKHNyYykpXG4gIGNvbnN0IGRlc3RQYXJlbnQgPSBwYXRoLnJlc29sdmUocGF0aC5kaXJuYW1lKGRlc3QpKVxuICBpZiAoZGVzdFBhcmVudCA9PT0gc3JjUGFyZW50IHx8IGRlc3RQYXJlbnQgPT09IHBhdGgucGFyc2UoZGVzdFBhcmVudCkucm9vdCkgcmV0dXJuIGNiKClcbiAgaWYgKG5vZGVTdXBwb3J0c0JpZ0ludCgpKSB7XG4gICAgZnMuc3RhdChkZXN0UGFyZW50LCB7IGJpZ2ludDogdHJ1ZSB9LCAoZXJyLCBkZXN0U3RhdCkgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBpZiAoZXJyLmNvZGUgPT09ICdFTk9FTlQnKSByZXR1cm4gY2IoKVxuICAgICAgICByZXR1cm4gY2IoZXJyKVxuICAgICAgfVxuICAgICAgaWYgKGRlc3RTdGF0LmlubyAmJiBkZXN0U3RhdC5kZXYgJiYgZGVzdFN0YXQuaW5vID09PSBzcmNTdGF0LmlubyAmJiBkZXN0U3RhdC5kZXYgPT09IHNyY1N0YXQuZGV2KSB7XG4gICAgICAgIHJldHVybiBjYihuZXcgRXJyb3IoZXJyTXNnKHNyYywgZGVzdCwgZnVuY05hbWUpKSlcbiAgICAgIH1cbiAgICAgIHJldHVybiBjaGVja1BhcmVudFBhdGhzKHNyYywgc3JjU3RhdCwgZGVzdFBhcmVudCwgZnVuY05hbWUsIGNiKVxuICAgIH0pXG4gIH0gZWxzZSB7XG4gICAgZnMuc3RhdChkZXN0UGFyZW50LCAoZXJyLCBkZXN0U3RhdCkgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBpZiAoZXJyLmNvZGUgPT09ICdFTk9FTlQnKSByZXR1cm4gY2IoKVxuICAgICAgICByZXR1cm4gY2IoZXJyKVxuICAgICAgfVxuICAgICAgaWYgKGRlc3RTdGF0LmlubyAmJiBkZXN0U3RhdC5kZXYgJiYgZGVzdFN0YXQuaW5vID09PSBzcmNTdGF0LmlubyAmJiBkZXN0U3RhdC5kZXYgPT09IHNyY1N0YXQuZGV2KSB7XG4gICAgICAgIHJldHVybiBjYihuZXcgRXJyb3IoZXJyTXNnKHNyYywgZGVzdCwgZnVuY05hbWUpKSlcbiAgICAgIH1cbiAgICAgIHJldHVybiBjaGVja1BhcmVudFBhdGhzKHNyYywgc3JjU3RhdCwgZGVzdFBhcmVudCwgZnVuY05hbWUsIGNiKVxuICAgIH0pXG4gIH1cbn1cblxuZnVuY3Rpb24gY2hlY2tQYXJlbnRQYXRoc1N5bmMgKHNyYywgc3JjU3RhdCwgZGVzdCwgZnVuY05hbWUpIHtcbiAgY29uc3Qgc3JjUGFyZW50ID0gcGF0aC5yZXNvbHZlKHBhdGguZGlybmFtZShzcmMpKVxuICBjb25zdCBkZXN0UGFyZW50ID0gcGF0aC5yZXNvbHZlKHBhdGguZGlybmFtZShkZXN0KSlcbiAgaWYgKGRlc3RQYXJlbnQgPT09IHNyY1BhcmVudCB8fCBkZXN0UGFyZW50ID09PSBwYXRoLnBhcnNlKGRlc3RQYXJlbnQpLnJvb3QpIHJldHVyblxuICBsZXQgZGVzdFN0YXRcbiAgdHJ5IHtcbiAgICBpZiAobm9kZVN1cHBvcnRzQmlnSW50KCkpIHtcbiAgICAgIGRlc3RTdGF0ID0gZnMuc3RhdFN5bmMoZGVzdFBhcmVudCwgeyBiaWdpbnQ6IHRydWUgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgZGVzdFN0YXQgPSBmcy5zdGF0U3luYyhkZXN0UGFyZW50KVxuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgaWYgKGVyci5jb2RlID09PSAnRU5PRU5UJykgcmV0dXJuXG4gICAgdGhyb3cgZXJyXG4gIH1cbiAgaWYgKGRlc3RTdGF0LmlubyAmJiBkZXN0U3RhdC5kZXYgJiYgZGVzdFN0YXQuaW5vID09PSBzcmNTdGF0LmlubyAmJiBkZXN0U3RhdC5kZXYgPT09IHNyY1N0YXQuZGV2KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGVyck1zZyhzcmMsIGRlc3QsIGZ1bmNOYW1lKSlcbiAgfVxuICByZXR1cm4gY2hlY2tQYXJlbnRQYXRoc1N5bmMoc3JjLCBzcmNTdGF0LCBkZXN0UGFyZW50LCBmdW5jTmFtZSlcbn1cblxuLy8gcmV0dXJuIHRydWUgaWYgZGVzdCBpcyBhIHN1YmRpciBvZiBzcmMsIG90aGVyd2lzZSBmYWxzZS5cbi8vIEl0IG9ubHkgY2hlY2tzIHRoZSBwYXRoIHN0cmluZ3MuXG5mdW5jdGlvbiBpc1NyY1N1YmRpciAoc3JjLCBkZXN0KSB7XG4gIGNvbnN0IHNyY0FyciA9IHBhdGgucmVzb2x2ZShzcmMpLnNwbGl0KHBhdGguc2VwKS5maWx0ZXIoaSA9PiBpKVxuICBjb25zdCBkZXN0QXJyID0gcGF0aC5yZXNvbHZlKGRlc3QpLnNwbGl0KHBhdGguc2VwKS5maWx0ZXIoaSA9PiBpKVxuICByZXR1cm4gc3JjQXJyLnJlZHVjZSgoYWNjLCBjdXIsIGkpID0+IGFjYyAmJiBkZXN0QXJyW2ldID09PSBjdXIsIHRydWUpXG59XG5cbmZ1bmN0aW9uIGVyck1zZyAoc3JjLCBkZXN0LCBmdW5jTmFtZSkge1xuICByZXR1cm4gYENhbm5vdCAke2Z1bmNOYW1lfSAnJHtzcmN9JyB0byBhIHN1YmRpcmVjdG9yeSBvZiBpdHNlbGYsICcke2Rlc3R9Jy5gXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBjaGVja1BhdGhzLFxuICBjaGVja1BhdGhzU3luYyxcbiAgY2hlY2tQYXJlbnRQYXRocyxcbiAgY2hlY2tQYXJlbnRQYXRoc1N5bmMsXG4gIGlzU3JjU3ViZGlyXG59XG4iLCIndXNlIHN0cmljdCdcbi8qIGVzbGludC1kaXNhYmxlIG5vZGUvbm8tZGVwcmVjYXRlZC1hcGkgKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgaWYgKHR5cGVvZiBCdWZmZXIuYWxsb2NVbnNhZmUgPT09ICdmdW5jdGlvbicpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIEJ1ZmZlci5hbGxvY1Vuc2FmZShzaXplKVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBuZXcgQnVmZmVyKHNpemUpXG4gICAgfVxuICB9XG4gIHJldHVybiBuZXcgQnVmZmVyKHNpemUpXG59XG4iLCIndXNlIHN0cmljdCdcblxuY29uc3QgdSA9IHJlcXVpcmUoJ3VuaXZlcnNhbGlmeScpLmZyb21DYWxsYmFja1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNvcHk6IHUocmVxdWlyZSgnLi9jb3B5JykpXG59XG4iLCIndXNlIHN0cmljdCdcblxuY29uc3QgZnMgPSByZXF1aXJlKCdncmFjZWZ1bC1mcycpXG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG5jb25zdCBta2RpcnAgPSByZXF1aXJlKCcuLi9ta2RpcnMnKS5ta2RpcnNcbmNvbnN0IHBhdGhFeGlzdHMgPSByZXF1aXJlKCcuLi9wYXRoLWV4aXN0cycpLnBhdGhFeGlzdHNcbmNvbnN0IHV0aW1lcyA9IHJlcXVpcmUoJy4uL3V0aWwvdXRpbWVzJykudXRpbWVzTWlsbGlzXG5jb25zdCBzdGF0ID0gcmVxdWlyZSgnLi4vdXRpbC9zdGF0JylcblxuZnVuY3Rpb24gY29weSAoc3JjLCBkZXN0LCBvcHRzLCBjYikge1xuICBpZiAodHlwZW9mIG9wdHMgPT09ICdmdW5jdGlvbicgJiYgIWNiKSB7XG4gICAgY2IgPSBvcHRzXG4gICAgb3B0cyA9IHt9XG4gIH0gZWxzZSBpZiAodHlwZW9mIG9wdHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICBvcHRzID0geyBmaWx0ZXI6IG9wdHMgfVxuICB9XG5cbiAgY2IgPSBjYiB8fCBmdW5jdGlvbiAoKSB7fVxuICBvcHRzID0gb3B0cyB8fCB7fVxuXG4gIG9wdHMuY2xvYmJlciA9ICdjbG9iYmVyJyBpbiBvcHRzID8gISFvcHRzLmNsb2JiZXIgOiB0cnVlIC8vIGRlZmF1bHQgdG8gdHJ1ZSBmb3Igbm93XG4gIG9wdHMub3ZlcndyaXRlID0gJ292ZXJ3cml0ZScgaW4gb3B0cyA/ICEhb3B0cy5vdmVyd3JpdGUgOiBvcHRzLmNsb2JiZXIgLy8gb3ZlcndyaXRlIGZhbGxzIGJhY2sgdG8gY2xvYmJlclxuXG4gIC8vIFdhcm4gYWJvdXQgdXNpbmcgcHJlc2VydmVUaW1lc3RhbXBzIG9uIDMyLWJpdCBub2RlXG4gIGlmIChvcHRzLnByZXNlcnZlVGltZXN0YW1wcyAmJiBwcm9jZXNzLmFyY2ggPT09ICdpYTMyJykge1xuICAgIGNvbnNvbGUud2FybihgZnMtZXh0cmE6IFVzaW5nIHRoZSBwcmVzZXJ2ZVRpbWVzdGFtcHMgb3B0aW9uIGluIDMyLWJpdCBub2RlIGlzIG5vdCByZWNvbW1lbmRlZDtcXG5cbiAgICBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2pwcmljaGFyZHNvbi9ub2RlLWZzLWV4dHJhL2lzc3Vlcy8yNjlgKVxuICB9XG5cbiAgc3RhdC5jaGVja1BhdGhzKHNyYywgZGVzdCwgJ2NvcHknLCAoZXJyLCBzdGF0cykgPT4ge1xuICAgIGlmIChlcnIpIHJldHVybiBjYihlcnIpXG4gICAgY29uc3QgeyBzcmNTdGF0LCBkZXN0U3RhdCB9ID0gc3RhdHNcbiAgICBzdGF0LmNoZWNrUGFyZW50UGF0aHMoc3JjLCBzcmNTdGF0LCBkZXN0LCAnY29weScsIGVyciA9PiB7XG4gICAgICBpZiAoZXJyKSByZXR1cm4gY2IoZXJyKVxuICAgICAgaWYgKG9wdHMuZmlsdGVyKSByZXR1cm4gaGFuZGxlRmlsdGVyKGNoZWNrUGFyZW50RGlyLCBkZXN0U3RhdCwgc3JjLCBkZXN0LCBvcHRzLCBjYilcbiAgICAgIHJldHVybiBjaGVja1BhcmVudERpcihkZXN0U3RhdCwgc3JjLCBkZXN0LCBvcHRzLCBjYilcbiAgICB9KVxuICB9KVxufVxuXG5mdW5jdGlvbiBjaGVja1BhcmVudERpciAoZGVzdFN0YXQsIHNyYywgZGVzdCwgb3B0cywgY2IpIHtcbiAgY29uc3QgZGVzdFBhcmVudCA9IHBhdGguZGlybmFtZShkZXN0KVxuICBwYXRoRXhpc3RzKGRlc3RQYXJlbnQsIChlcnIsIGRpckV4aXN0cykgPT4ge1xuICAgIGlmIChlcnIpIHJldHVybiBjYihlcnIpXG4gICAgaWYgKGRpckV4aXN0cykgcmV0dXJuIHN0YXJ0Q29weShkZXN0U3RhdCwgc3JjLCBkZXN0LCBvcHRzLCBjYilcbiAgICBta2RpcnAoZGVzdFBhcmVudCwgZXJyID0+IHtcbiAgICAgIGlmIChlcnIpIHJldHVybiBjYihlcnIpXG4gICAgICByZXR1cm4gc3RhcnRDb3B5KGRlc3RTdGF0LCBzcmMsIGRlc3QsIG9wdHMsIGNiKVxuICAgIH0pXG4gIH0pXG59XG5cbmZ1bmN0aW9uIGhhbmRsZUZpbHRlciAob25JbmNsdWRlLCBkZXN0U3RhdCwgc3JjLCBkZXN0LCBvcHRzLCBjYikge1xuICBQcm9taXNlLnJlc29sdmUob3B0cy5maWx0ZXIoc3JjLCBkZXN0KSkudGhlbihpbmNsdWRlID0+IHtcbiAgICBpZiAoaW5jbHVkZSkgcmV0dXJuIG9uSW5jbHVkZShkZXN0U3RhdCwgc3JjLCBkZXN0LCBvcHRzLCBjYilcbiAgICByZXR1cm4gY2IoKVxuICB9LCBlcnJvciA9PiBjYihlcnJvcikpXG59XG5cbmZ1bmN0aW9uIHN0YXJ0Q29weSAoZGVzdFN0YXQsIHNyYywgZGVzdCwgb3B0cywgY2IpIHtcbiAgaWYgKG9wdHMuZmlsdGVyKSByZXR1cm4gaGFuZGxlRmlsdGVyKGdldFN0YXRzLCBkZXN0U3RhdCwgc3JjLCBkZXN0LCBvcHRzLCBjYilcbiAgcmV0dXJuIGdldFN0YXRzKGRlc3RTdGF0LCBzcmMsIGRlc3QsIG9wdHMsIGNiKVxufVxuXG5mdW5jdGlvbiBnZXRTdGF0cyAoZGVzdFN0YXQsIHNyYywgZGVzdCwgb3B0cywgY2IpIHtcbiAgY29uc3Qgc3RhdCA9IG9wdHMuZGVyZWZlcmVuY2UgPyBmcy5zdGF0IDogZnMubHN0YXRcbiAgc3RhdChzcmMsIChlcnIsIHNyY1N0YXQpID0+IHtcbiAgICBpZiAoZXJyKSByZXR1cm4gY2IoZXJyKVxuXG4gICAgaWYgKHNyY1N0YXQuaXNEaXJlY3RvcnkoKSkgcmV0dXJuIG9uRGlyKHNyY1N0YXQsIGRlc3RTdGF0LCBzcmMsIGRlc3QsIG9wdHMsIGNiKVxuICAgIGVsc2UgaWYgKHNyY1N0YXQuaXNGaWxlKCkgfHxcbiAgICAgICAgICAgICBzcmNTdGF0LmlzQ2hhcmFjdGVyRGV2aWNlKCkgfHxcbiAgICAgICAgICAgICBzcmNTdGF0LmlzQmxvY2tEZXZpY2UoKSkgcmV0dXJuIG9uRmlsZShzcmNTdGF0LCBkZXN0U3RhdCwgc3JjLCBkZXN0LCBvcHRzLCBjYilcbiAgICBlbHNlIGlmIChzcmNTdGF0LmlzU3ltYm9saWNMaW5rKCkpIHJldHVybiBvbkxpbmsoZGVzdFN0YXQsIHNyYywgZGVzdCwgb3B0cywgY2IpXG4gIH0pXG59XG5cbmZ1bmN0aW9uIG9uRmlsZSAoc3JjU3RhdCwgZGVzdFN0YXQsIHNyYywgZGVzdCwgb3B0cywgY2IpIHtcbiAgaWYgKCFkZXN0U3RhdCkgcmV0dXJuIGNvcHlGaWxlKHNyY1N0YXQsIHNyYywgZGVzdCwgb3B0cywgY2IpXG4gIHJldHVybiBtYXlDb3B5RmlsZShzcmNTdGF0LCBzcmMsIGRlc3QsIG9wdHMsIGNiKVxufVxuXG5mdW5jdGlvbiBtYXlDb3B5RmlsZSAoc3JjU3RhdCwgc3JjLCBkZXN0LCBvcHRzLCBjYikge1xuICBpZiAob3B0cy5vdmVyd3JpdGUpIHtcbiAgICBmcy51bmxpbmsoZGVzdCwgZXJyID0+IHtcbiAgICAgIGlmIChlcnIpIHJldHVybiBjYihlcnIpXG4gICAgICByZXR1cm4gY29weUZpbGUoc3JjU3RhdCwgc3JjLCBkZXN0LCBvcHRzLCBjYilcbiAgICB9KVxuICB9IGVsc2UgaWYgKG9wdHMuZXJyb3JPbkV4aXN0KSB7XG4gICAgcmV0dXJuIGNiKG5ldyBFcnJvcihgJyR7ZGVzdH0nIGFscmVhZHkgZXhpc3RzYCkpXG4gIH0gZWxzZSByZXR1cm4gY2IoKVxufVxuXG5mdW5jdGlvbiBjb3B5RmlsZSAoc3JjU3RhdCwgc3JjLCBkZXN0LCBvcHRzLCBjYikge1xuICBpZiAodHlwZW9mIGZzLmNvcHlGaWxlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGZzLmNvcHlGaWxlKHNyYywgZGVzdCwgZXJyID0+IHtcbiAgICAgIGlmIChlcnIpIHJldHVybiBjYihlcnIpXG4gICAgICByZXR1cm4gc2V0RGVzdE1vZGVBbmRUaW1lc3RhbXBzKHNyY1N0YXQsIGRlc3QsIG9wdHMsIGNiKVxuICAgIH0pXG4gIH1cbiAgcmV0dXJuIGNvcHlGaWxlRmFsbGJhY2soc3JjU3RhdCwgc3JjLCBkZXN0LCBvcHRzLCBjYilcbn1cblxuZnVuY3Rpb24gY29weUZpbGVGYWxsYmFjayAoc3JjU3RhdCwgc3JjLCBkZXN0LCBvcHRzLCBjYikge1xuICBjb25zdCBycyA9IGZzLmNyZWF0ZVJlYWRTdHJlYW0oc3JjKVxuICBycy5vbignZXJyb3InLCBlcnIgPT4gY2IoZXJyKSkub25jZSgnb3BlbicsICgpID0+IHtcbiAgICBjb25zdCB3cyA9IGZzLmNyZWF0ZVdyaXRlU3RyZWFtKGRlc3QsIHsgbW9kZTogc3JjU3RhdC5tb2RlIH0pXG4gICAgd3Mub24oJ2Vycm9yJywgZXJyID0+IGNiKGVycikpXG4gICAgICAub24oJ29wZW4nLCAoKSA9PiBycy5waXBlKHdzKSlcbiAgICAgIC5vbmNlKCdjbG9zZScsICgpID0+IHNldERlc3RNb2RlQW5kVGltZXN0YW1wcyhzcmNTdGF0LCBkZXN0LCBvcHRzLCBjYikpXG4gIH0pXG59XG5cbmZ1bmN0aW9uIHNldERlc3RNb2RlQW5kVGltZXN0YW1wcyAoc3JjU3RhdCwgZGVzdCwgb3B0cywgY2IpIHtcbiAgZnMuY2htb2QoZGVzdCwgc3JjU3RhdC5tb2RlLCBlcnIgPT4ge1xuICAgIGlmIChlcnIpIHJldHVybiBjYihlcnIpXG4gICAgaWYgKG9wdHMucHJlc2VydmVUaW1lc3RhbXBzKSB7XG4gICAgICByZXR1cm4gdXRpbWVzKGRlc3QsIHNyY1N0YXQuYXRpbWUsIHNyY1N0YXQubXRpbWUsIGNiKVxuICAgIH1cbiAgICByZXR1cm4gY2IoKVxuICB9KVxufVxuXG5mdW5jdGlvbiBvbkRpciAoc3JjU3RhdCwgZGVzdFN0YXQsIHNyYywgZGVzdCwgb3B0cywgY2IpIHtcbiAgaWYgKCFkZXN0U3RhdCkgcmV0dXJuIG1rRGlyQW5kQ29weShzcmNTdGF0LCBzcmMsIGRlc3QsIG9wdHMsIGNiKVxuICBpZiAoZGVzdFN0YXQgJiYgIWRlc3RTdGF0LmlzRGlyZWN0b3J5KCkpIHtcbiAgICByZXR1cm4gY2IobmV3IEVycm9yKGBDYW5ub3Qgb3ZlcndyaXRlIG5vbi1kaXJlY3RvcnkgJyR7ZGVzdH0nIHdpdGggZGlyZWN0b3J5ICcke3NyY30nLmApKVxuICB9XG4gIHJldHVybiBjb3B5RGlyKHNyYywgZGVzdCwgb3B0cywgY2IpXG59XG5cbmZ1bmN0aW9uIG1rRGlyQW5kQ29weSAoc3JjU3RhdCwgc3JjLCBkZXN0LCBvcHRzLCBjYikge1xuICBmcy5ta2RpcihkZXN0LCBlcnIgPT4ge1xuICAgIGlmIChlcnIpIHJldHVybiBjYihlcnIpXG4gICAgY29weURpcihzcmMsIGRlc3QsIG9wdHMsIGVyciA9PiB7XG4gICAgICBpZiAoZXJyKSByZXR1cm4gY2IoZXJyKVxuICAgICAgcmV0dXJuIGZzLmNobW9kKGRlc3QsIHNyY1N0YXQubW9kZSwgY2IpXG4gICAgfSlcbiAgfSlcbn1cblxuZnVuY3Rpb24gY29weURpciAoc3JjLCBkZXN0LCBvcHRzLCBjYikge1xuICBmcy5yZWFkZGlyKHNyYywgKGVyciwgaXRlbXMpID0+IHtcbiAgICBpZiAoZXJyKSByZXR1cm4gY2IoZXJyKVxuICAgIHJldHVybiBjb3B5RGlySXRlbXMoaXRlbXMsIHNyYywgZGVzdCwgb3B0cywgY2IpXG4gIH0pXG59XG5cbmZ1bmN0aW9uIGNvcHlEaXJJdGVtcyAoaXRlbXMsIHNyYywgZGVzdCwgb3B0cywgY2IpIHtcbiAgY29uc3QgaXRlbSA9IGl0ZW1zLnBvcCgpXG4gIGlmICghaXRlbSkgcmV0dXJuIGNiKClcbiAgcmV0dXJuIGNvcHlEaXJJdGVtKGl0ZW1zLCBpdGVtLCBzcmMsIGRlc3QsIG9wdHMsIGNiKVxufVxuXG5mdW5jdGlvbiBjb3B5RGlySXRlbSAoaXRlbXMsIGl0ZW0sIHNyYywgZGVzdCwgb3B0cywgY2IpIHtcbiAgY29uc3Qgc3JjSXRlbSA9IHBhdGguam9pbihzcmMsIGl0ZW0pXG4gIGNvbnN0IGRlc3RJdGVtID0gcGF0aC5qb2luKGRlc3QsIGl0ZW0pXG4gIHN0YXQuY2hlY2tQYXRocyhzcmNJdGVtLCBkZXN0SXRlbSwgJ2NvcHknLCAoZXJyLCBzdGF0cykgPT4ge1xuICAgIGlmIChlcnIpIHJldHVybiBjYihlcnIpXG4gICAgY29uc3QgeyBkZXN0U3RhdCB9ID0gc3RhdHNcbiAgICBzdGFydENvcHkoZGVzdFN0YXQsIHNyY0l0ZW0sIGRlc3RJdGVtLCBvcHRzLCBlcnIgPT4ge1xuICAgICAgaWYgKGVycikgcmV0dXJuIGNiKGVycilcbiAgICAgIHJldHVybiBjb3B5RGlySXRlbXMoaXRlbXMsIHNyYywgZGVzdCwgb3B0cywgY2IpXG4gICAgfSlcbiAgfSlcbn1cblxuZnVuY3Rpb24gb25MaW5rIChkZXN0U3RhdCwgc3JjLCBkZXN0LCBvcHRzLCBjYikge1xuICBmcy5yZWFkbGluayhzcmMsIChlcnIsIHJlc29sdmVkU3JjKSA9PiB7XG4gICAgaWYgKGVycikgcmV0dXJuIGNiKGVycilcbiAgICBpZiAob3B0cy5kZXJlZmVyZW5jZSkge1xuICAgICAgcmVzb2x2ZWRTcmMgPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgcmVzb2x2ZWRTcmMpXG4gICAgfVxuXG4gICAgaWYgKCFkZXN0U3RhdCkge1xuICAgICAgcmV0dXJuIGZzLnN5bWxpbmsocmVzb2x2ZWRTcmMsIGRlc3QsIGNiKVxuICAgIH0gZWxzZSB7XG4gICAgICBmcy5yZWFkbGluayhkZXN0LCAoZXJyLCByZXNvbHZlZERlc3QpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIC8vIGRlc3QgZXhpc3RzIGFuZCBpcyBhIHJlZ3VsYXIgZmlsZSBvciBkaXJlY3RvcnksXG4gICAgICAgICAgLy8gV2luZG93cyBtYXkgdGhyb3cgVU5LTk9XTiBlcnJvci4gSWYgZGVzdCBhbHJlYWR5IGV4aXN0cyxcbiAgICAgICAgICAvLyBmcyB0aHJvd3MgZXJyb3IgYW55d2F5LCBzbyBubyBuZWVkIHRvIGd1YXJkIGFnYWluc3QgaXQgaGVyZS5cbiAgICAgICAgICBpZiAoZXJyLmNvZGUgPT09ICdFSU5WQUwnIHx8IGVyci5jb2RlID09PSAnVU5LTk9XTicpIHJldHVybiBmcy5zeW1saW5rKHJlc29sdmVkU3JjLCBkZXN0LCBjYilcbiAgICAgICAgICByZXR1cm4gY2IoZXJyKVxuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRzLmRlcmVmZXJlbmNlKSB7XG4gICAgICAgICAgcmVzb2x2ZWREZXN0ID0gcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIHJlc29sdmVkRGVzdClcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhdC5pc1NyY1N1YmRpcihyZXNvbHZlZFNyYywgcmVzb2x2ZWREZXN0KSkge1xuICAgICAgICAgIHJldHVybiBjYihuZXcgRXJyb3IoYENhbm5vdCBjb3B5ICcke3Jlc29sdmVkU3JjfScgdG8gYSBzdWJkaXJlY3Rvcnkgb2YgaXRzZWxmLCAnJHtyZXNvbHZlZERlc3R9Jy5gKSlcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRvIG5vdCBjb3B5IGlmIHNyYyBpcyBhIHN1YmRpciBvZiBkZXN0IHNpbmNlIHVubGlua2luZ1xuICAgICAgICAvLyBkZXN0IGluIHRoaXMgY2FzZSB3b3VsZCByZXN1bHQgaW4gcmVtb3Zpbmcgc3JjIGNvbnRlbnRzXG4gICAgICAgIC8vIGFuZCB0aGVyZWZvcmUgYSBicm9rZW4gc3ltbGluayB3b3VsZCBiZSBjcmVhdGVkLlxuICAgICAgICBpZiAoZGVzdFN0YXQuaXNEaXJlY3RvcnkoKSAmJiBzdGF0LmlzU3JjU3ViZGlyKHJlc29sdmVkRGVzdCwgcmVzb2x2ZWRTcmMpKSB7XG4gICAgICAgICAgcmV0dXJuIGNiKG5ldyBFcnJvcihgQ2Fubm90IG92ZXJ3cml0ZSAnJHtyZXNvbHZlZERlc3R9JyB3aXRoICcke3Jlc29sdmVkU3JjfScuYCkpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvcHlMaW5rKHJlc29sdmVkU3JjLCBkZXN0LCBjYilcbiAgICAgIH0pXG4gICAgfVxuICB9KVxufVxuXG5mdW5jdGlvbiBjb3B5TGluayAocmVzb2x2ZWRTcmMsIGRlc3QsIGNiKSB7XG4gIGZzLnVubGluayhkZXN0LCBlcnIgPT4ge1xuICAgIGlmIChlcnIpIHJldHVybiBjYihlcnIpXG4gICAgcmV0dXJuIGZzLnN5bWxpbmsocmVzb2x2ZWRTcmMsIGRlc3QsIGNiKVxuICB9KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvcHlcbiIsIid1c2Ugc3RyaWN0J1xuY29uc3QgdSA9IHJlcXVpcmUoJ3VuaXZlcnNhbGlmeScpLmZyb21Qcm9taXNlXG5jb25zdCBmcyA9IHJlcXVpcmUoJy4uL2ZzJylcblxuZnVuY3Rpb24gcGF0aEV4aXN0cyAocGF0aCkge1xuICByZXR1cm4gZnMuYWNjZXNzKHBhdGgpLnRoZW4oKCkgPT4gdHJ1ZSkuY2F0Y2goKCkgPT4gZmFsc2UpXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBwYXRoRXhpc3RzOiB1KHBhdGhFeGlzdHMpLFxuICBwYXRoRXhpc3RzU3luYzogZnMuZXhpc3RzU3luY1xufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IHUgPSByZXF1aXJlKCd1bml2ZXJzYWxpZnknKS5mcm9tQ2FsbGJhY2tcbmNvbnN0IGZzID0gcmVxdWlyZSgnZ3JhY2VmdWwtZnMnKVxuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuY29uc3QgbWtkaXIgPSByZXF1aXJlKCcuLi9ta2RpcnMnKVxuY29uc3QgcmVtb3ZlID0gcmVxdWlyZSgnLi4vcmVtb3ZlJylcblxuY29uc3QgZW1wdHlEaXIgPSB1KGZ1bmN0aW9uIGVtcHR5RGlyIChkaXIsIGNhbGxiYWNrKSB7XG4gIGNhbGxiYWNrID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24gKCkge31cbiAgZnMucmVhZGRpcihkaXIsIChlcnIsIGl0ZW1zKSA9PiB7XG4gICAgaWYgKGVycikgcmV0dXJuIG1rZGlyLm1rZGlycyhkaXIsIGNhbGxiYWNrKVxuXG4gICAgaXRlbXMgPSBpdGVtcy5tYXAoaXRlbSA9PiBwYXRoLmpvaW4oZGlyLCBpdGVtKSlcblxuICAgIGRlbGV0ZUl0ZW0oKVxuXG4gICAgZnVuY3Rpb24gZGVsZXRlSXRlbSAoKSB7XG4gICAgICBjb25zdCBpdGVtID0gaXRlbXMucG9wKClcbiAgICAgIGlmICghaXRlbSkgcmV0dXJuIGNhbGxiYWNrKClcbiAgICAgIHJlbW92ZS5yZW1vdmUoaXRlbSwgZXJyID0+IHtcbiAgICAgICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycilcbiAgICAgICAgZGVsZXRlSXRlbSgpXG4gICAgICB9KVxuICAgIH1cbiAgfSlcbn0pXG5cbmZ1bmN0aW9uIGVtcHR5RGlyU3luYyAoZGlyKSB7XG4gIGxldCBpdGVtc1xuICB0cnkge1xuICAgIGl0ZW1zID0gZnMucmVhZGRpclN5bmMoZGlyKVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gbWtkaXIubWtkaXJzU3luYyhkaXIpXG4gIH1cblxuICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgIGl0ZW0gPSBwYXRoLmpvaW4oZGlyLCBpdGVtKVxuICAgIHJlbW92ZS5yZW1vdmVTeW5jKGl0ZW0pXG4gIH0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBlbXB0eURpclN5bmMsXG4gIGVtcHR5ZGlyU3luYzogZW1wdHlEaXJTeW5jLFxuICBlbXB0eURpcixcbiAgZW1wdHlkaXI6IGVtcHR5RGlyXG59XG4iLCIndXNlIHN0cmljdCdcblxuY29uc3QgdSA9IHJlcXVpcmUoJ3VuaXZlcnNhbGlmeScpLmZyb21DYWxsYmFja1xuY29uc3QgcmltcmFmID0gcmVxdWlyZSgnLi9yaW1yYWYnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcmVtb3ZlOiB1KHJpbXJhZiksXG4gIHJlbW92ZVN5bmM6IHJpbXJhZi5zeW5jXG59XG4iLCIndXNlIHN0cmljdCdcblxuY29uc3QgZnMgPSByZXF1aXJlKCdncmFjZWZ1bC1mcycpXG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG5jb25zdCBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKVxuXG5jb25zdCBpc1dpbmRvd3MgPSAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJylcblxuZnVuY3Rpb24gZGVmYXVsdHMgKG9wdGlvbnMpIHtcbiAgY29uc3QgbWV0aG9kcyA9IFtcbiAgICAndW5saW5rJyxcbiAgICAnY2htb2QnLFxuICAgICdzdGF0JyxcbiAgICAnbHN0YXQnLFxuICAgICdybWRpcicsXG4gICAgJ3JlYWRkaXInXG4gIF1cbiAgbWV0aG9kcy5mb3JFYWNoKG0gPT4ge1xuICAgIG9wdGlvbnNbbV0gPSBvcHRpb25zW21dIHx8IGZzW21dXG4gICAgbSA9IG0gKyAnU3luYydcbiAgICBvcHRpb25zW21dID0gb3B0aW9uc1ttXSB8fCBmc1ttXVxuICB9KVxuXG4gIG9wdGlvbnMubWF4QnVzeVRyaWVzID0gb3B0aW9ucy5tYXhCdXN5VHJpZXMgfHwgM1xufVxuXG5mdW5jdGlvbiByaW1yYWYgKHAsIG9wdGlvbnMsIGNiKSB7XG4gIGxldCBidXN5VHJpZXMgPSAwXG5cbiAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2IgPSBvcHRpb25zXG4gICAgb3B0aW9ucyA9IHt9XG4gIH1cblxuICBhc3NlcnQocCwgJ3JpbXJhZjogbWlzc2luZyBwYXRoJylcbiAgYXNzZXJ0LnN0cmljdEVxdWFsKHR5cGVvZiBwLCAnc3RyaW5nJywgJ3JpbXJhZjogcGF0aCBzaG91bGQgYmUgYSBzdHJpbmcnKVxuICBhc3NlcnQuc3RyaWN0RXF1YWwodHlwZW9mIGNiLCAnZnVuY3Rpb24nLCAncmltcmFmOiBjYWxsYmFjayBmdW5jdGlvbiByZXF1aXJlZCcpXG4gIGFzc2VydChvcHRpb25zLCAncmltcmFmOiBpbnZhbGlkIG9wdGlvbnMgYXJndW1lbnQgcHJvdmlkZWQnKVxuICBhc3NlcnQuc3RyaWN0RXF1YWwodHlwZW9mIG9wdGlvbnMsICdvYmplY3QnLCAncmltcmFmOiBvcHRpb25zIHNob3VsZCBiZSBvYmplY3QnKVxuXG4gIGRlZmF1bHRzKG9wdGlvbnMpXG5cbiAgcmltcmFmXyhwLCBvcHRpb25zLCBmdW5jdGlvbiBDQiAoZXIpIHtcbiAgICBpZiAoZXIpIHtcbiAgICAgIGlmICgoZXIuY29kZSA9PT0gJ0VCVVNZJyB8fCBlci5jb2RlID09PSAnRU5PVEVNUFRZJyB8fCBlci5jb2RlID09PSAnRVBFUk0nKSAmJlxuICAgICAgICAgIGJ1c3lUcmllcyA8IG9wdGlvbnMubWF4QnVzeVRyaWVzKSB7XG4gICAgICAgIGJ1c3lUcmllcysrXG4gICAgICAgIGNvbnN0IHRpbWUgPSBidXN5VHJpZXMgKiAxMDBcbiAgICAgICAgLy8gdHJ5IGFnYWluLCB3aXRoIHRoZSBzYW1lIGV4YWN0IGNhbGxiYWNrIGFzIHRoaXMgb25lLlxuICAgICAgICByZXR1cm4gc2V0VGltZW91dCgoKSA9PiByaW1yYWZfKHAsIG9wdGlvbnMsIENCKSwgdGltZSlcbiAgICAgIH1cblxuICAgICAgLy8gYWxyZWFkeSBnb25lXG4gICAgICBpZiAoZXIuY29kZSA9PT0gJ0VOT0VOVCcpIGVyID0gbnVsbFxuICAgIH1cblxuICAgIGNiKGVyKVxuICB9KVxufVxuXG4vLyBUd28gcG9zc2libGUgc3RyYXRlZ2llcy5cbi8vIDEuIEFzc3VtZSBpdCdzIGEgZmlsZS4gIHVubGluayBpdCwgdGhlbiBkbyB0aGUgZGlyIHN0dWZmIG9uIEVQRVJNIG9yIEVJU0RJUlxuLy8gMi4gQXNzdW1lIGl0J3MgYSBkaXJlY3RvcnkuICByZWFkZGlyLCB0aGVuIGRvIHRoZSBmaWxlIHN0dWZmIG9uIEVOT1RESVJcbi8vXG4vLyBCb3RoIHJlc3VsdCBpbiBhbiBleHRyYSBzeXNjYWxsIHdoZW4geW91IGd1ZXNzIHdyb25nLiAgSG93ZXZlciwgdGhlcmVcbi8vIGFyZSBsaWtlbHkgZmFyIG1vcmUgbm9ybWFsIGZpbGVzIGluIHRoZSB3b3JsZCB0aGFuIGRpcmVjdG9yaWVzLiAgVGhpc1xuLy8gaXMgYmFzZWQgb24gdGhlIGFzc3VtcHRpb24gdGhhdCBhIHRoZSBhdmVyYWdlIG51bWJlciBvZiBmaWxlcyBwZXJcbi8vIGRpcmVjdG9yeSBpcyA+PSAxLlxuLy9cbi8vIElmIGFueW9uZSBldmVyIGNvbXBsYWlucyBhYm91dCB0aGlzLCB0aGVuIEkgZ3Vlc3MgdGhlIHN0cmF0ZWd5IGNvdWxkXG4vLyBiZSBtYWRlIGNvbmZpZ3VyYWJsZSBzb21laG93LiAgQnV0IHVudGlsIHRoZW4sIFlBR05JLlxuZnVuY3Rpb24gcmltcmFmXyAocCwgb3B0aW9ucywgY2IpIHtcbiAgYXNzZXJ0KHApXG4gIGFzc2VydChvcHRpb25zKVxuICBhc3NlcnQodHlwZW9mIGNiID09PSAnZnVuY3Rpb24nKVxuXG4gIC8vIHN1bm9zIGxldHMgdGhlIHJvb3QgdXNlciB1bmxpbmsgZGlyZWN0b3JpZXMsIHdoaWNoIGlzLi4uIHdlaXJkLlxuICAvLyBzbyB3ZSBoYXZlIHRvIGxzdGF0IGhlcmUgYW5kIG1ha2Ugc3VyZSBpdCdzIG5vdCBhIGRpci5cbiAgb3B0aW9ucy5sc3RhdChwLCAoZXIsIHN0KSA9PiB7XG4gICAgaWYgKGVyICYmIGVyLmNvZGUgPT09ICdFTk9FTlQnKSB7XG4gICAgICByZXR1cm4gY2IobnVsbClcbiAgICB9XG5cbiAgICAvLyBXaW5kb3dzIGNhbiBFUEVSTSBvbiBzdGF0LiAgTGlmZSBpcyBzdWZmZXJpbmcuXG4gICAgaWYgKGVyICYmIGVyLmNvZGUgPT09ICdFUEVSTScgJiYgaXNXaW5kb3dzKSB7XG4gICAgICByZXR1cm4gZml4V2luRVBFUk0ocCwgb3B0aW9ucywgZXIsIGNiKVxuICAgIH1cblxuICAgIGlmIChzdCAmJiBzdC5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICByZXR1cm4gcm1kaXIocCwgb3B0aW9ucywgZXIsIGNiKVxuICAgIH1cblxuICAgIG9wdGlvbnMudW5saW5rKHAsIGVyID0+IHtcbiAgICAgIGlmIChlcikge1xuICAgICAgICBpZiAoZXIuY29kZSA9PT0gJ0VOT0VOVCcpIHtcbiAgICAgICAgICByZXR1cm4gY2IobnVsbClcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXIuY29kZSA9PT0gJ0VQRVJNJykge1xuICAgICAgICAgIHJldHVybiAoaXNXaW5kb3dzKVxuICAgICAgICAgICAgPyBmaXhXaW5FUEVSTShwLCBvcHRpb25zLCBlciwgY2IpXG4gICAgICAgICAgICA6IHJtZGlyKHAsIG9wdGlvbnMsIGVyLCBjYilcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXIuY29kZSA9PT0gJ0VJU0RJUicpIHtcbiAgICAgICAgICByZXR1cm4gcm1kaXIocCwgb3B0aW9ucywgZXIsIGNiKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gY2IoZXIpXG4gICAgfSlcbiAgfSlcbn1cblxuZnVuY3Rpb24gZml4V2luRVBFUk0gKHAsIG9wdGlvbnMsIGVyLCBjYikge1xuICBhc3NlcnQocClcbiAgYXNzZXJ0KG9wdGlvbnMpXG4gIGFzc2VydCh0eXBlb2YgY2IgPT09ICdmdW5jdGlvbicpXG4gIGlmIChlcikge1xuICAgIGFzc2VydChlciBpbnN0YW5jZW9mIEVycm9yKVxuICB9XG5cbiAgb3B0aW9ucy5jaG1vZChwLCAwbzY2NiwgZXIyID0+IHtcbiAgICBpZiAoZXIyKSB7XG4gICAgICBjYihlcjIuY29kZSA9PT0gJ0VOT0VOVCcgPyBudWxsIDogZXIpXG4gICAgfSBlbHNlIHtcbiAgICAgIG9wdGlvbnMuc3RhdChwLCAoZXIzLCBzdGF0cykgPT4ge1xuICAgICAgICBpZiAoZXIzKSB7XG4gICAgICAgICAgY2IoZXIzLmNvZGUgPT09ICdFTk9FTlQnID8gbnVsbCA6IGVyKVxuICAgICAgICB9IGVsc2UgaWYgKHN0YXRzLmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgICAgICBybWRpcihwLCBvcHRpb25zLCBlciwgY2IpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb3B0aW9ucy51bmxpbmsocCwgY2IpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9KVxufVxuXG5mdW5jdGlvbiBmaXhXaW5FUEVSTVN5bmMgKHAsIG9wdGlvbnMsIGVyKSB7XG4gIGxldCBzdGF0c1xuXG4gIGFzc2VydChwKVxuICBhc3NlcnQob3B0aW9ucylcbiAgaWYgKGVyKSB7XG4gICAgYXNzZXJ0KGVyIGluc3RhbmNlb2YgRXJyb3IpXG4gIH1cblxuICB0cnkge1xuICAgIG9wdGlvbnMuY2htb2RTeW5jKHAsIDBvNjY2KVxuICB9IGNhdGNoIChlcjIpIHtcbiAgICBpZiAoZXIyLmNvZGUgPT09ICdFTk9FTlQnKSB7XG4gICAgICByZXR1cm5cbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgZXJcbiAgICB9XG4gIH1cblxuICB0cnkge1xuICAgIHN0YXRzID0gb3B0aW9ucy5zdGF0U3luYyhwKVxuICB9IGNhdGNoIChlcjMpIHtcbiAgICBpZiAoZXIzLmNvZGUgPT09ICdFTk9FTlQnKSB7XG4gICAgICByZXR1cm5cbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgZXJcbiAgICB9XG4gIH1cblxuICBpZiAoc3RhdHMuaXNEaXJlY3RvcnkoKSkge1xuICAgIHJtZGlyU3luYyhwLCBvcHRpb25zLCBlcilcbiAgfSBlbHNlIHtcbiAgICBvcHRpb25zLnVubGlua1N5bmMocClcbiAgfVxufVxuXG5mdW5jdGlvbiBybWRpciAocCwgb3B0aW9ucywgb3JpZ2luYWxFciwgY2IpIHtcbiAgYXNzZXJ0KHApXG4gIGFzc2VydChvcHRpb25zKVxuICBpZiAob3JpZ2luYWxFcikge1xuICAgIGFzc2VydChvcmlnaW5hbEVyIGluc3RhbmNlb2YgRXJyb3IpXG4gIH1cbiAgYXNzZXJ0KHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJylcblxuICAvLyB0cnkgdG8gcm1kaXIgZmlyc3QsIGFuZCBvbmx5IHJlYWRkaXIgb24gRU5PVEVNUFRZIG9yIEVFWElTVCAoU3VuT1MpXG4gIC8vIGlmIHdlIGd1ZXNzZWQgd3JvbmcsIGFuZCBpdCdzIG5vdCBhIGRpcmVjdG9yeSwgdGhlblxuICAvLyByYWlzZSB0aGUgb3JpZ2luYWwgZXJyb3IuXG4gIG9wdGlvbnMucm1kaXIocCwgZXIgPT4ge1xuICAgIGlmIChlciAmJiAoZXIuY29kZSA9PT0gJ0VOT1RFTVBUWScgfHwgZXIuY29kZSA9PT0gJ0VFWElTVCcgfHwgZXIuY29kZSA9PT0gJ0VQRVJNJykpIHtcbiAgICAgIHJta2lkcyhwLCBvcHRpb25zLCBjYilcbiAgICB9IGVsc2UgaWYgKGVyICYmIGVyLmNvZGUgPT09ICdFTk9URElSJykge1xuICAgICAgY2Iob3JpZ2luYWxFcilcbiAgICB9IGVsc2Uge1xuICAgICAgY2IoZXIpXG4gICAgfVxuICB9KVxufVxuXG5mdW5jdGlvbiBybWtpZHMgKHAsIG9wdGlvbnMsIGNiKSB7XG4gIGFzc2VydChwKVxuICBhc3NlcnQob3B0aW9ucylcbiAgYXNzZXJ0KHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJylcblxuICBvcHRpb25zLnJlYWRkaXIocCwgKGVyLCBmaWxlcykgPT4ge1xuICAgIGlmIChlcikgcmV0dXJuIGNiKGVyKVxuXG4gICAgbGV0IG4gPSBmaWxlcy5sZW5ndGhcbiAgICBsZXQgZXJyU3RhdGVcblxuICAgIGlmIChuID09PSAwKSByZXR1cm4gb3B0aW9ucy5ybWRpcihwLCBjYilcblxuICAgIGZpbGVzLmZvckVhY2goZiA9PiB7XG4gICAgICByaW1yYWYocGF0aC5qb2luKHAsIGYpLCBvcHRpb25zLCBlciA9PiB7XG4gICAgICAgIGlmIChlcnJTdGF0ZSkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGlmIChlcikgcmV0dXJuIGNiKGVyclN0YXRlID0gZXIpXG4gICAgICAgIGlmICgtLW4gPT09IDApIHtcbiAgICAgICAgICBvcHRpb25zLnJtZGlyKHAsIGNiKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH0pXG59XG5cbi8vIHRoaXMgbG9va3Mgc2ltcGxlciwgYW5kIGlzIHN0cmljdGx5ICpmYXN0ZXIqLCBidXQgd2lsbFxuLy8gdGllIHVwIHRoZSBKYXZhU2NyaXB0IHRocmVhZCBhbmQgZmFpbCBvbiBleGNlc3NpdmVseVxuLy8gZGVlcCBkaXJlY3RvcnkgdHJlZXMuXG5mdW5jdGlvbiByaW1yYWZTeW5jIChwLCBvcHRpb25zKSB7XG4gIGxldCBzdFxuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gIGRlZmF1bHRzKG9wdGlvbnMpXG5cbiAgYXNzZXJ0KHAsICdyaW1yYWY6IG1pc3NpbmcgcGF0aCcpXG4gIGFzc2VydC5zdHJpY3RFcXVhbCh0eXBlb2YgcCwgJ3N0cmluZycsICdyaW1yYWY6IHBhdGggc2hvdWxkIGJlIGEgc3RyaW5nJylcbiAgYXNzZXJ0KG9wdGlvbnMsICdyaW1yYWY6IG1pc3Npbmcgb3B0aW9ucycpXG4gIGFzc2VydC5zdHJpY3RFcXVhbCh0eXBlb2Ygb3B0aW9ucywgJ29iamVjdCcsICdyaW1yYWY6IG9wdGlvbnMgc2hvdWxkIGJlIG9iamVjdCcpXG5cbiAgdHJ5IHtcbiAgICBzdCA9IG9wdGlvbnMubHN0YXRTeW5jKHApXG4gIH0gY2F0Y2ggKGVyKSB7XG4gICAgaWYgKGVyLmNvZGUgPT09ICdFTk9FTlQnKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAvLyBXaW5kb3dzIGNhbiBFUEVSTSBvbiBzdGF0LiAgTGlmZSBpcyBzdWZmZXJpbmcuXG4gICAgaWYgKGVyLmNvZGUgPT09ICdFUEVSTScgJiYgaXNXaW5kb3dzKSB7XG4gICAgICBmaXhXaW5FUEVSTVN5bmMocCwgb3B0aW9ucywgZXIpXG4gICAgfVxuICB9XG5cbiAgdHJ5IHtcbiAgICAvLyBzdW5vcyBsZXRzIHRoZSByb290IHVzZXIgdW5saW5rIGRpcmVjdG9yaWVzLCB3aGljaCBpcy4uLiB3ZWlyZC5cbiAgICBpZiAoc3QgJiYgc3QuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgcm1kaXJTeW5jKHAsIG9wdGlvbnMsIG51bGwpXG4gICAgfSBlbHNlIHtcbiAgICAgIG9wdGlvbnMudW5saW5rU3luYyhwKVxuICAgIH1cbiAgfSBjYXRjaCAoZXIpIHtcbiAgICBpZiAoZXIuY29kZSA9PT0gJ0VOT0VOVCcpIHtcbiAgICAgIHJldHVyblxuICAgIH0gZWxzZSBpZiAoZXIuY29kZSA9PT0gJ0VQRVJNJykge1xuICAgICAgcmV0dXJuIGlzV2luZG93cyA/IGZpeFdpbkVQRVJNU3luYyhwLCBvcHRpb25zLCBlcikgOiBybWRpclN5bmMocCwgb3B0aW9ucywgZXIpXG4gICAgfSBlbHNlIGlmIChlci5jb2RlICE9PSAnRUlTRElSJykge1xuICAgICAgdGhyb3cgZXJcbiAgICB9XG4gICAgcm1kaXJTeW5jKHAsIG9wdGlvbnMsIGVyKVxuICB9XG59XG5cbmZ1bmN0aW9uIHJtZGlyU3luYyAocCwgb3B0aW9ucywgb3JpZ2luYWxFcikge1xuICBhc3NlcnQocClcbiAgYXNzZXJ0KG9wdGlvbnMpXG4gIGlmIChvcmlnaW5hbEVyKSB7XG4gICAgYXNzZXJ0KG9yaWdpbmFsRXIgaW5zdGFuY2VvZiBFcnJvcilcbiAgfVxuXG4gIHRyeSB7XG4gICAgb3B0aW9ucy5ybWRpclN5bmMocClcbiAgfSBjYXRjaCAoZXIpIHtcbiAgICBpZiAoZXIuY29kZSA9PT0gJ0VOT1RESVInKSB7XG4gICAgICB0aHJvdyBvcmlnaW5hbEVyXG4gICAgfSBlbHNlIGlmIChlci5jb2RlID09PSAnRU5PVEVNUFRZJyB8fCBlci5jb2RlID09PSAnRUVYSVNUJyB8fCBlci5jb2RlID09PSAnRVBFUk0nKSB7XG4gICAgICBybWtpZHNTeW5jKHAsIG9wdGlvbnMpXG4gICAgfSBlbHNlIGlmIChlci5jb2RlICE9PSAnRU5PRU5UJykge1xuICAgICAgdGhyb3cgZXJcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcm1raWRzU3luYyAocCwgb3B0aW9ucykge1xuICBhc3NlcnQocClcbiAgYXNzZXJ0KG9wdGlvbnMpXG4gIG9wdGlvbnMucmVhZGRpclN5bmMocCkuZm9yRWFjaChmID0+IHJpbXJhZlN5bmMocGF0aC5qb2luKHAsIGYpLCBvcHRpb25zKSlcblxuICBpZiAoaXNXaW5kb3dzKSB7XG4gICAgLy8gV2Ugb25seSBlbmQgdXAgaGVyZSBvbmNlIHdlIGdvdCBFTk9URU1QVFkgYXQgbGVhc3Qgb25jZSwgYW5kXG4gICAgLy8gYXQgdGhpcyBwb2ludCwgd2UgYXJlIGd1YXJhbnRlZWQgdG8gaGF2ZSByZW1vdmVkIGFsbCB0aGUga2lkcy5cbiAgICAvLyBTbywgd2Uga25vdyB0aGF0IGl0IHdvbid0IGJlIEVOT0VOVCBvciBFTk9URElSIG9yIGFueXRoaW5nIGVsc2UuXG4gICAgLy8gdHJ5IHJlYWxseSBoYXJkIHRvIGRlbGV0ZSBzdHVmZiBvbiB3aW5kb3dzLCBiZWNhdXNlIGl0IGhhcyBhXG4gICAgLy8gUFJPRk9VTkRMWSBhbm5veWluZyBoYWJpdCBvZiBub3QgY2xvc2luZyBoYW5kbGVzIHByb21wdGx5IHdoZW5cbiAgICAvLyBmaWxlcyBhcmUgZGVsZXRlZCwgcmVzdWx0aW5nIGluIHNwdXJpb3VzIEVOT1RFTVBUWSBlcnJvcnMuXG4gICAgY29uc3Qgc3RhcnRUaW1lID0gRGF0ZS5ub3coKVxuICAgIGRvIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJldCA9IG9wdGlvbnMucm1kaXJTeW5jKHAsIG9wdGlvbnMpXG4gICAgICAgIHJldHVybiByZXRcbiAgICAgIH0gY2F0Y2ggKGVyKSB7IH1cbiAgICB9IHdoaWxlIChEYXRlLm5vdygpIC0gc3RhcnRUaW1lIDwgNTAwKSAvLyBnaXZlIHVwIGFmdGVyIDUwMG1zXG4gIH0gZWxzZSB7XG4gICAgY29uc3QgcmV0ID0gb3B0aW9ucy5ybWRpclN5bmMocCwgb3B0aW9ucylcbiAgICByZXR1cm4gcmV0XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSByaW1yYWZcbnJpbXJhZi5zeW5jID0gcmltcmFmU3luY1xuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGZpbGUgPSByZXF1aXJlKCcuL2ZpbGUnKVxuY29uc3QgbGluayA9IHJlcXVpcmUoJy4vbGluaycpXG5jb25zdCBzeW1saW5rID0gcmVxdWlyZSgnLi9zeW1saW5rJylcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGZpbGVcbiAgY3JlYXRlRmlsZTogZmlsZS5jcmVhdGVGaWxlLFxuICBjcmVhdGVGaWxlU3luYzogZmlsZS5jcmVhdGVGaWxlU3luYyxcbiAgZW5zdXJlRmlsZTogZmlsZS5jcmVhdGVGaWxlLFxuICBlbnN1cmVGaWxlU3luYzogZmlsZS5jcmVhdGVGaWxlU3luYyxcbiAgLy8gbGlua1xuICBjcmVhdGVMaW5rOiBsaW5rLmNyZWF0ZUxpbmssXG4gIGNyZWF0ZUxpbmtTeW5jOiBsaW5rLmNyZWF0ZUxpbmtTeW5jLFxuICBlbnN1cmVMaW5rOiBsaW5rLmNyZWF0ZUxpbmssXG4gIGVuc3VyZUxpbmtTeW5jOiBsaW5rLmNyZWF0ZUxpbmtTeW5jLFxuICAvLyBzeW1saW5rXG4gIGNyZWF0ZVN5bWxpbms6IHN5bWxpbmsuY3JlYXRlU3ltbGluayxcbiAgY3JlYXRlU3ltbGlua1N5bmM6IHN5bWxpbmsuY3JlYXRlU3ltbGlua1N5bmMsXG4gIGVuc3VyZVN5bWxpbms6IHN5bWxpbmsuY3JlYXRlU3ltbGluayxcbiAgZW5zdXJlU3ltbGlua1N5bmM6IHN5bWxpbmsuY3JlYXRlU3ltbGlua1N5bmNcbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCB1ID0gcmVxdWlyZSgndW5pdmVyc2FsaWZ5JykuZnJvbUNhbGxiYWNrXG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG5jb25zdCBmcyA9IHJlcXVpcmUoJ2dyYWNlZnVsLWZzJylcbmNvbnN0IG1rZGlyID0gcmVxdWlyZSgnLi4vbWtkaXJzJylcbmNvbnN0IHBhdGhFeGlzdHMgPSByZXF1aXJlKCcuLi9wYXRoLWV4aXN0cycpLnBhdGhFeGlzdHNcblxuZnVuY3Rpb24gY3JlYXRlRmlsZSAoZmlsZSwgY2FsbGJhY2spIHtcbiAgZnVuY3Rpb24gbWFrZUZpbGUgKCkge1xuICAgIGZzLndyaXRlRmlsZShmaWxlLCAnJywgZXJyID0+IHtcbiAgICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgICBjYWxsYmFjaygpXG4gICAgfSlcbiAgfVxuXG4gIGZzLnN0YXQoZmlsZSwgKGVyciwgc3RhdHMpID0+IHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBoYW5kbGUtY2FsbGJhY2stZXJyXG4gICAgaWYgKCFlcnIgJiYgc3RhdHMuaXNGaWxlKCkpIHJldHVybiBjYWxsYmFjaygpXG4gICAgY29uc3QgZGlyID0gcGF0aC5kaXJuYW1lKGZpbGUpXG4gICAgcGF0aEV4aXN0cyhkaXIsIChlcnIsIGRpckV4aXN0cykgPT4ge1xuICAgICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycilcbiAgICAgIGlmIChkaXJFeGlzdHMpIHJldHVybiBtYWtlRmlsZSgpXG4gICAgICBta2Rpci5ta2RpcnMoZGlyLCBlcnIgPT4ge1xuICAgICAgICBpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKVxuICAgICAgICBtYWtlRmlsZSgpXG4gICAgICB9KVxuICAgIH0pXG4gIH0pXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUZpbGVTeW5jIChmaWxlKSB7XG4gIGxldCBzdGF0c1xuICB0cnkge1xuICAgIHN0YXRzID0gZnMuc3RhdFN5bmMoZmlsZSlcbiAgfSBjYXRjaCAoZSkge31cbiAgaWYgKHN0YXRzICYmIHN0YXRzLmlzRmlsZSgpKSByZXR1cm5cblxuICBjb25zdCBkaXIgPSBwYXRoLmRpcm5hbWUoZmlsZSlcbiAgaWYgKCFmcy5leGlzdHNTeW5jKGRpcikpIHtcbiAgICBta2Rpci5ta2RpcnNTeW5jKGRpcilcbiAgfVxuXG4gIGZzLndyaXRlRmlsZVN5bmMoZmlsZSwgJycpXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBjcmVhdGVGaWxlOiB1KGNyZWF0ZUZpbGUpLFxuICBjcmVhdGVGaWxlU3luY1xufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IHUgPSByZXF1aXJlKCd1bml2ZXJzYWxpZnknKS5mcm9tQ2FsbGJhY2tcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcbmNvbnN0IGZzID0gcmVxdWlyZSgnZ3JhY2VmdWwtZnMnKVxuY29uc3QgbWtkaXIgPSByZXF1aXJlKCcuLi9ta2RpcnMnKVxuY29uc3QgcGF0aEV4aXN0cyA9IHJlcXVpcmUoJy4uL3BhdGgtZXhpc3RzJykucGF0aEV4aXN0c1xuXG5mdW5jdGlvbiBjcmVhdGVMaW5rIChzcmNwYXRoLCBkc3RwYXRoLCBjYWxsYmFjaykge1xuICBmdW5jdGlvbiBtYWtlTGluayAoc3JjcGF0aCwgZHN0cGF0aCkge1xuICAgIGZzLmxpbmsoc3JjcGF0aCwgZHN0cGF0aCwgZXJyID0+IHtcbiAgICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgICBjYWxsYmFjayhudWxsKVxuICAgIH0pXG4gIH1cblxuICBwYXRoRXhpc3RzKGRzdHBhdGgsIChlcnIsIGRlc3RpbmF0aW9uRXhpc3RzKSA9PiB7XG4gICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycilcbiAgICBpZiAoZGVzdGluYXRpb25FeGlzdHMpIHJldHVybiBjYWxsYmFjayhudWxsKVxuICAgIGZzLmxzdGF0KHNyY3BhdGgsIChlcnIpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSBlcnIubWVzc2FnZS5yZXBsYWNlKCdsc3RhdCcsICdlbnN1cmVMaW5rJylcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycilcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGlyID0gcGF0aC5kaXJuYW1lKGRzdHBhdGgpXG4gICAgICBwYXRoRXhpc3RzKGRpciwgKGVyciwgZGlyRXhpc3RzKSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgICAgIGlmIChkaXJFeGlzdHMpIHJldHVybiBtYWtlTGluayhzcmNwYXRoLCBkc3RwYXRoKVxuICAgICAgICBta2Rpci5ta2RpcnMoZGlyLCBlcnIgPT4ge1xuICAgICAgICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgICAgICAgbWFrZUxpbmsoc3JjcGF0aCwgZHN0cGF0aClcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfSlcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGlua1N5bmMgKHNyY3BhdGgsIGRzdHBhdGgpIHtcbiAgY29uc3QgZGVzdGluYXRpb25FeGlzdHMgPSBmcy5leGlzdHNTeW5jKGRzdHBhdGgpXG4gIGlmIChkZXN0aW5hdGlvbkV4aXN0cykgcmV0dXJuIHVuZGVmaW5lZFxuXG4gIHRyeSB7XG4gICAgZnMubHN0YXRTeW5jKHNyY3BhdGgpXG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGVyci5tZXNzYWdlID0gZXJyLm1lc3NhZ2UucmVwbGFjZSgnbHN0YXQnLCAnZW5zdXJlTGluaycpXG4gICAgdGhyb3cgZXJyXG4gIH1cblxuICBjb25zdCBkaXIgPSBwYXRoLmRpcm5hbWUoZHN0cGF0aClcbiAgY29uc3QgZGlyRXhpc3RzID0gZnMuZXhpc3RzU3luYyhkaXIpXG4gIGlmIChkaXJFeGlzdHMpIHJldHVybiBmcy5saW5rU3luYyhzcmNwYXRoLCBkc3RwYXRoKVxuICBta2Rpci5ta2RpcnNTeW5jKGRpcilcblxuICByZXR1cm4gZnMubGlua1N5bmMoc3JjcGF0aCwgZHN0cGF0aClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNyZWF0ZUxpbms6IHUoY3JlYXRlTGluayksXG4gIGNyZWF0ZUxpbmtTeW5jXG59XG4iLCIndXNlIHN0cmljdCdcblxuY29uc3QgdSA9IHJlcXVpcmUoJ3VuaXZlcnNhbGlmeScpLmZyb21DYWxsYmFja1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuY29uc3QgZnMgPSByZXF1aXJlKCdncmFjZWZ1bC1mcycpXG5jb25zdCBfbWtkaXJzID0gcmVxdWlyZSgnLi4vbWtkaXJzJylcbmNvbnN0IG1rZGlycyA9IF9ta2RpcnMubWtkaXJzXG5jb25zdCBta2RpcnNTeW5jID0gX21rZGlycy5ta2RpcnNTeW5jXG5cbmNvbnN0IF9zeW1saW5rUGF0aHMgPSByZXF1aXJlKCcuL3N5bWxpbmstcGF0aHMnKVxuY29uc3Qgc3ltbGlua1BhdGhzID0gX3N5bWxpbmtQYXRocy5zeW1saW5rUGF0aHNcbmNvbnN0IHN5bWxpbmtQYXRoc1N5bmMgPSBfc3ltbGlua1BhdGhzLnN5bWxpbmtQYXRoc1N5bmNcblxuY29uc3QgX3N5bWxpbmtUeXBlID0gcmVxdWlyZSgnLi9zeW1saW5rLXR5cGUnKVxuY29uc3Qgc3ltbGlua1R5cGUgPSBfc3ltbGlua1R5cGUuc3ltbGlua1R5cGVcbmNvbnN0IHN5bWxpbmtUeXBlU3luYyA9IF9zeW1saW5rVHlwZS5zeW1saW5rVHlwZVN5bmNcblxuY29uc3QgcGF0aEV4aXN0cyA9IHJlcXVpcmUoJy4uL3BhdGgtZXhpc3RzJykucGF0aEV4aXN0c1xuXG5mdW5jdGlvbiBjcmVhdGVTeW1saW5rIChzcmNwYXRoLCBkc3RwYXRoLCB0eXBlLCBjYWxsYmFjaykge1xuICBjYWxsYmFjayA9ICh0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJykgPyB0eXBlIDogY2FsbGJhY2tcbiAgdHlwZSA9ICh0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJykgPyBmYWxzZSA6IHR5cGVcblxuICBwYXRoRXhpc3RzKGRzdHBhdGgsIChlcnIsIGRlc3RpbmF0aW9uRXhpc3RzKSA9PiB7XG4gICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycilcbiAgICBpZiAoZGVzdGluYXRpb25FeGlzdHMpIHJldHVybiBjYWxsYmFjayhudWxsKVxuICAgIHN5bWxpbmtQYXRocyhzcmNwYXRoLCBkc3RwYXRoLCAoZXJyLCByZWxhdGl2ZSkgPT4ge1xuICAgICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycilcbiAgICAgIHNyY3BhdGggPSByZWxhdGl2ZS50b0RzdFxuICAgICAgc3ltbGlua1R5cGUocmVsYXRpdmUudG9Dd2QsIHR5cGUsIChlcnIsIHR5cGUpID0+IHtcbiAgICAgICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycilcbiAgICAgICAgY29uc3QgZGlyID0gcGF0aC5kaXJuYW1lKGRzdHBhdGgpXG4gICAgICAgIHBhdGhFeGlzdHMoZGlyLCAoZXJyLCBkaXJFeGlzdHMpID0+IHtcbiAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKVxuICAgICAgICAgIGlmIChkaXJFeGlzdHMpIHJldHVybiBmcy5zeW1saW5rKHNyY3BhdGgsIGRzdHBhdGgsIHR5cGUsIGNhbGxiYWNrKVxuICAgICAgICAgIG1rZGlycyhkaXIsIGVyciA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKVxuICAgICAgICAgICAgZnMuc3ltbGluayhzcmNwYXRoLCBkc3RwYXRoLCB0eXBlLCBjYWxsYmFjaylcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9KVxuICB9KVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTeW1saW5rU3luYyAoc3JjcGF0aCwgZHN0cGF0aCwgdHlwZSkge1xuICBjb25zdCBkZXN0aW5hdGlvbkV4aXN0cyA9IGZzLmV4aXN0c1N5bmMoZHN0cGF0aClcbiAgaWYgKGRlc3RpbmF0aW9uRXhpc3RzKSByZXR1cm4gdW5kZWZpbmVkXG5cbiAgY29uc3QgcmVsYXRpdmUgPSBzeW1saW5rUGF0aHNTeW5jKHNyY3BhdGgsIGRzdHBhdGgpXG4gIHNyY3BhdGggPSByZWxhdGl2ZS50b0RzdFxuICB0eXBlID0gc3ltbGlua1R5cGVTeW5jKHJlbGF0aXZlLnRvQ3dkLCB0eXBlKVxuICBjb25zdCBkaXIgPSBwYXRoLmRpcm5hbWUoZHN0cGF0aClcbiAgY29uc3QgZXhpc3RzID0gZnMuZXhpc3RzU3luYyhkaXIpXG4gIGlmIChleGlzdHMpIHJldHVybiBmcy5zeW1saW5rU3luYyhzcmNwYXRoLCBkc3RwYXRoLCB0eXBlKVxuICBta2RpcnNTeW5jKGRpcilcbiAgcmV0dXJuIGZzLnN5bWxpbmtTeW5jKHNyY3BhdGgsIGRzdHBhdGgsIHR5cGUpXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBjcmVhdGVTeW1saW5rOiB1KGNyZWF0ZVN5bWxpbmspLFxuICBjcmVhdGVTeW1saW5rU3luY1xufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcbmNvbnN0IGZzID0gcmVxdWlyZSgnZ3JhY2VmdWwtZnMnKVxuY29uc3QgcGF0aEV4aXN0cyA9IHJlcXVpcmUoJy4uL3BhdGgtZXhpc3RzJykucGF0aEV4aXN0c1xuXG4vKipcbiAqIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0d28gdHlwZXMgb2YgcGF0aHMsIG9uZSByZWxhdGl2ZSB0byBzeW1saW5rLCBhbmQgb25lXG4gKiByZWxhdGl2ZSB0byB0aGUgY3VycmVudCB3b3JraW5nIGRpcmVjdG9yeS4gQ2hlY2tzIGlmIHBhdGggaXMgYWJzb2x1dGUgb3JcbiAqIHJlbGF0aXZlLiBJZiB0aGUgcGF0aCBpcyByZWxhdGl2ZSwgdGhpcyBmdW5jdGlvbiBjaGVja3MgaWYgdGhlIHBhdGggaXNcbiAqIHJlbGF0aXZlIHRvIHN5bWxpbmsgb3IgcmVsYXRpdmUgdG8gY3VycmVudCB3b3JraW5nIGRpcmVjdG9yeS4gVGhpcyBpcyBhblxuICogaW5pdGlhdGl2ZSB0byBmaW5kIGEgc21hcnRlciBgc3JjcGF0aGAgdG8gc3VwcGx5IHdoZW4gYnVpbGRpbmcgc3ltbGlua3MuXG4gKiBUaGlzIGFsbG93cyB5b3UgdG8gZGV0ZXJtaW5lIHdoaWNoIHBhdGggdG8gdXNlIG91dCBvZiBvbmUgb2YgdGhyZWUgcG9zc2libGVcbiAqIHR5cGVzIG9mIHNvdXJjZSBwYXRocy4gVGhlIGZpcnN0IGlzIGFuIGFic29sdXRlIHBhdGguIFRoaXMgaXMgZGV0ZWN0ZWQgYnlcbiAqIGBwYXRoLmlzQWJzb2x1dGUoKWAuIFdoZW4gYW4gYWJzb2x1dGUgcGF0aCBpcyBwcm92aWRlZCwgaXQgaXMgY2hlY2tlZCB0b1xuICogc2VlIGlmIGl0IGV4aXN0cy4gSWYgaXQgZG9lcyBpdCdzIHVzZWQsIGlmIG5vdCBhbiBlcnJvciBpcyByZXR1cm5lZFxuICogKGNhbGxiYWNrKS8gdGhyb3duIChzeW5jKS4gVGhlIG90aGVyIHR3byBvcHRpb25zIGZvciBgc3JjcGF0aGAgYXJlIGFcbiAqIHJlbGF0aXZlIHVybC4gQnkgZGVmYXVsdCBOb2RlJ3MgYGZzLnN5bWxpbmtgIHdvcmtzIGJ5IGNyZWF0aW5nIGEgc3ltbGlua1xuICogdXNpbmcgYGRzdHBhdGhgIGFuZCBleHBlY3RzIHRoZSBgc3JjcGF0aGAgdG8gYmUgcmVsYXRpdmUgdG8gdGhlIG5ld2x5XG4gKiBjcmVhdGVkIHN5bWxpbmsuIElmIHlvdSBwcm92aWRlIGEgYHNyY3BhdGhgIHRoYXQgZG9lcyBub3QgZXhpc3Qgb24gdGhlIGZpbGVcbiAqIHN5c3RlbSBpdCByZXN1bHRzIGluIGEgYnJva2VuIHN5bWxpbmsuIFRvIG1pbmltaXplIHRoaXMsIHRoZSBmdW5jdGlvblxuICogY2hlY2tzIHRvIHNlZSBpZiB0aGUgJ3JlbGF0aXZlIHRvIHN5bWxpbmsnIHNvdXJjZSBmaWxlIGV4aXN0cywgYW5kIGlmIGl0XG4gKiBkb2VzIGl0IHdpbGwgdXNlIGl0LiBJZiBpdCBkb2VzIG5vdCwgaXQgY2hlY2tzIGlmIHRoZXJlJ3MgYSBmaWxlIHRoYXRcbiAqIGV4aXN0cyB0aGF0IGlzIHJlbGF0aXZlIHRvIHRoZSBjdXJyZW50IHdvcmtpbmcgZGlyZWN0b3J5LCBpZiBkb2VzIGl0cyB1c2VkLlxuICogVGhpcyBwcmVzZXJ2ZXMgdGhlIGV4cGVjdGF0aW9ucyBvZiB0aGUgb3JpZ2luYWwgZnMuc3ltbGluayBzcGVjIGFuZCBhZGRzXG4gKiB0aGUgYWJpbGl0eSB0byBwYXNzIGluIGByZWxhdGl2ZSB0byBjdXJyZW50IHdvcmtpbmcgZGlyZWNvdHJ5YCBwYXRocy5cbiAqL1xuXG5mdW5jdGlvbiBzeW1saW5rUGF0aHMgKHNyY3BhdGgsIGRzdHBhdGgsIGNhbGxiYWNrKSB7XG4gIGlmIChwYXRoLmlzQWJzb2x1dGUoc3JjcGF0aCkpIHtcbiAgICByZXR1cm4gZnMubHN0YXQoc3JjcGF0aCwgKGVycikgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBlcnIubWVzc2FnZSA9IGVyci5tZXNzYWdlLnJlcGxhY2UoJ2xzdGF0JywgJ2Vuc3VyZVN5bWxpbmsnKVxuICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyKVxuICAgICAgfVxuICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIHtcbiAgICAgICAgJ3RvQ3dkJzogc3JjcGF0aCxcbiAgICAgICAgJ3RvRHN0Jzogc3JjcGF0aFxuICAgICAgfSlcbiAgICB9KVxuICB9IGVsc2Uge1xuICAgIGNvbnN0IGRzdGRpciA9IHBhdGguZGlybmFtZShkc3RwYXRoKVxuICAgIGNvbnN0IHJlbGF0aXZlVG9Ec3QgPSBwYXRoLmpvaW4oZHN0ZGlyLCBzcmNwYXRoKVxuICAgIHJldHVybiBwYXRoRXhpc3RzKHJlbGF0aXZlVG9Ec3QsIChlcnIsIGV4aXN0cykgPT4ge1xuICAgICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycilcbiAgICAgIGlmIChleGlzdHMpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIHtcbiAgICAgICAgICAndG9Dd2QnOiByZWxhdGl2ZVRvRHN0LFxuICAgICAgICAgICd0b0RzdCc6IHNyY3BhdGhcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmcy5sc3RhdChzcmNwYXRoLCAoZXJyKSA9PiB7XG4gICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgZXJyLm1lc3NhZ2UgPSBlcnIubWVzc2FnZS5yZXBsYWNlKCdsc3RhdCcsICdlbnN1cmVTeW1saW5rJylcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCB7XG4gICAgICAgICAgICAndG9Dd2QnOiBzcmNwYXRoLFxuICAgICAgICAgICAgJ3RvRHN0JzogcGF0aC5yZWxhdGl2ZShkc3RkaXIsIHNyY3BhdGgpXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG5cbmZ1bmN0aW9uIHN5bWxpbmtQYXRoc1N5bmMgKHNyY3BhdGgsIGRzdHBhdGgpIHtcbiAgbGV0IGV4aXN0c1xuICBpZiAocGF0aC5pc0Fic29sdXRlKHNyY3BhdGgpKSB7XG4gICAgZXhpc3RzID0gZnMuZXhpc3RzU3luYyhzcmNwYXRoKVxuICAgIGlmICghZXhpc3RzKSB0aHJvdyBuZXcgRXJyb3IoJ2Fic29sdXRlIHNyY3BhdGggZG9lcyBub3QgZXhpc3QnKVxuICAgIHJldHVybiB7XG4gICAgICAndG9Dd2QnOiBzcmNwYXRoLFxuICAgICAgJ3RvRHN0Jzogc3JjcGF0aFxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBjb25zdCBkc3RkaXIgPSBwYXRoLmRpcm5hbWUoZHN0cGF0aClcbiAgICBjb25zdCByZWxhdGl2ZVRvRHN0ID0gcGF0aC5qb2luKGRzdGRpciwgc3JjcGF0aClcbiAgICBleGlzdHMgPSBmcy5leGlzdHNTeW5jKHJlbGF0aXZlVG9Ec3QpXG4gICAgaWYgKGV4aXN0cykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgJ3RvQ3dkJzogcmVsYXRpdmVUb0RzdCxcbiAgICAgICAgJ3RvRHN0Jzogc3JjcGF0aFxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBleGlzdHMgPSBmcy5leGlzdHNTeW5jKHNyY3BhdGgpXG4gICAgICBpZiAoIWV4aXN0cykgdGhyb3cgbmV3IEVycm9yKCdyZWxhdGl2ZSBzcmNwYXRoIGRvZXMgbm90IGV4aXN0JylcbiAgICAgIHJldHVybiB7XG4gICAgICAgICd0b0N3ZCc6IHNyY3BhdGgsXG4gICAgICAgICd0b0RzdCc6IHBhdGgucmVsYXRpdmUoZHN0ZGlyLCBzcmNwYXRoKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc3ltbGlua1BhdGhzLFxuICBzeW1saW5rUGF0aHNTeW5jXG59XG4iLCIndXNlIHN0cmljdCdcblxuY29uc3QgZnMgPSByZXF1aXJlKCdncmFjZWZ1bC1mcycpXG5cbmZ1bmN0aW9uIHN5bWxpbmtUeXBlIChzcmNwYXRoLCB0eXBlLCBjYWxsYmFjaykge1xuICBjYWxsYmFjayA9ICh0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJykgPyB0eXBlIDogY2FsbGJhY2tcbiAgdHlwZSA9ICh0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJykgPyBmYWxzZSA6IHR5cGVcbiAgaWYgKHR5cGUpIHJldHVybiBjYWxsYmFjayhudWxsLCB0eXBlKVxuICBmcy5sc3RhdChzcmNwYXRoLCAoZXJyLCBzdGF0cykgPT4ge1xuICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhudWxsLCAnZmlsZScpXG4gICAgdHlwZSA9IChzdGF0cyAmJiBzdGF0cy5pc0RpcmVjdG9yeSgpKSA/ICdkaXInIDogJ2ZpbGUnXG4gICAgY2FsbGJhY2sobnVsbCwgdHlwZSlcbiAgfSlcbn1cblxuZnVuY3Rpb24gc3ltbGlua1R5cGVTeW5jIChzcmNwYXRoLCB0eXBlKSB7XG4gIGxldCBzdGF0c1xuXG4gIGlmICh0eXBlKSByZXR1cm4gdHlwZVxuICB0cnkge1xuICAgIHN0YXRzID0gZnMubHN0YXRTeW5jKHNyY3BhdGgpXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gJ2ZpbGUnXG4gIH1cbiAgcmV0dXJuIChzdGF0cyAmJiBzdGF0cy5pc0RpcmVjdG9yeSgpKSA/ICdkaXInIDogJ2ZpbGUnXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzeW1saW5rVHlwZSxcbiAgc3ltbGlua1R5cGVTeW5jXG59XG4iLCIndXNlIHN0cmljdCdcblxuY29uc3QgdSA9IHJlcXVpcmUoJ3VuaXZlcnNhbGlmeScpLmZyb21DYWxsYmFja1xuY29uc3QganNvbkZpbGUgPSByZXF1aXJlKCcuL2pzb25maWxlJylcblxuanNvbkZpbGUub3V0cHV0SnNvbiA9IHUocmVxdWlyZSgnLi9vdXRwdXQtanNvbicpKVxuanNvbkZpbGUub3V0cHV0SnNvblN5bmMgPSByZXF1aXJlKCcuL291dHB1dC1qc29uLXN5bmMnKVxuLy8gYWxpYXNlc1xuanNvbkZpbGUub3V0cHV0SlNPTiA9IGpzb25GaWxlLm91dHB1dEpzb25cbmpzb25GaWxlLm91dHB1dEpTT05TeW5jID0ganNvbkZpbGUub3V0cHV0SnNvblN5bmNcbmpzb25GaWxlLndyaXRlSlNPTiA9IGpzb25GaWxlLndyaXRlSnNvblxuanNvbkZpbGUud3JpdGVKU09OU3luYyA9IGpzb25GaWxlLndyaXRlSnNvblN5bmNcbmpzb25GaWxlLnJlYWRKU09OID0ganNvbkZpbGUucmVhZEpzb25cbmpzb25GaWxlLnJlYWRKU09OU3luYyA9IGpzb25GaWxlLnJlYWRKc29uU3luY1xuXG5tb2R1bGUuZXhwb3J0cyA9IGpzb25GaWxlXG4iLCIndXNlIHN0cmljdCdcblxuY29uc3QgdSA9IHJlcXVpcmUoJ3VuaXZlcnNhbGlmeScpLmZyb21DYWxsYmFja1xuY29uc3QganNvbkZpbGUgPSByZXF1aXJlKCdqc29uZmlsZScpXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBqc29uZmlsZSBleHBvcnRzXG4gIHJlYWRKc29uOiB1KGpzb25GaWxlLnJlYWRGaWxlKSxcbiAgcmVhZEpzb25TeW5jOiBqc29uRmlsZS5yZWFkRmlsZVN5bmMsXG4gIHdyaXRlSnNvbjogdShqc29uRmlsZS53cml0ZUZpbGUpLFxuICB3cml0ZUpzb25TeW5jOiBqc29uRmlsZS53cml0ZUZpbGVTeW5jXG59XG4iLCJ2YXIgX2ZzXG50cnkge1xuICBfZnMgPSByZXF1aXJlKCdncmFjZWZ1bC1mcycpXG59IGNhdGNoIChfKSB7XG4gIF9mcyA9IHJlcXVpcmUoJ2ZzJylcbn1cblxuZnVuY3Rpb24gcmVhZEZpbGUgKGZpbGUsIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gIGlmIChjYWxsYmFjayA9PSBudWxsKSB7XG4gICAgY2FsbGJhY2sgPSBvcHRpb25zXG4gICAgb3B0aW9ucyA9IHt9XG4gIH1cblxuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdzdHJpbmcnKSB7XG4gICAgb3B0aW9ucyA9IHtlbmNvZGluZzogb3B0aW9uc31cbiAgfVxuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gIHZhciBmcyA9IG9wdGlvbnMuZnMgfHwgX2ZzXG5cbiAgdmFyIHNob3VsZFRocm93ID0gdHJ1ZVxuICBpZiAoJ3Rocm93cycgaW4gb3B0aW9ucykge1xuICAgIHNob3VsZFRocm93ID0gb3B0aW9ucy50aHJvd3NcbiAgfVxuXG4gIGZzLnJlYWRGaWxlKGZpbGUsIG9wdGlvbnMsIGZ1bmN0aW9uIChlcnIsIGRhdGEpIHtcbiAgICBpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKVxuXG4gICAgZGF0YSA9IHN0cmlwQm9tKGRhdGEpXG5cbiAgICB2YXIgb2JqXG4gICAgdHJ5IHtcbiAgICAgIG9iaiA9IEpTT04ucGFyc2UoZGF0YSwgb3B0aW9ucyA/IG9wdGlvbnMucmV2aXZlciA6IG51bGwpXG4gICAgfSBjYXRjaCAoZXJyMikge1xuICAgICAgaWYgKHNob3VsZFRocm93KSB7XG4gICAgICAgIGVycjIubWVzc2FnZSA9IGZpbGUgKyAnOiAnICsgZXJyMi5tZXNzYWdlXG4gICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIyKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIG51bGwpXG4gICAgICB9XG4gICAgfVxuXG4gICAgY2FsbGJhY2sobnVsbCwgb2JqKVxuICB9KVxufVxuXG5mdW5jdGlvbiByZWFkRmlsZVN5bmMgKGZpbGUsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cbiAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnc3RyaW5nJykge1xuICAgIG9wdGlvbnMgPSB7ZW5jb2Rpbmc6IG9wdGlvbnN9XG4gIH1cblxuICB2YXIgZnMgPSBvcHRpb25zLmZzIHx8IF9mc1xuXG4gIHZhciBzaG91bGRUaHJvdyA9IHRydWVcbiAgaWYgKCd0aHJvd3MnIGluIG9wdGlvbnMpIHtcbiAgICBzaG91bGRUaHJvdyA9IG9wdGlvbnMudGhyb3dzXG4gIH1cblxuICB0cnkge1xuICAgIHZhciBjb250ZW50ID0gZnMucmVhZEZpbGVTeW5jKGZpbGUsIG9wdGlvbnMpXG4gICAgY29udGVudCA9IHN0cmlwQm9tKGNvbnRlbnQpXG4gICAgcmV0dXJuIEpTT04ucGFyc2UoY29udGVudCwgb3B0aW9ucy5yZXZpdmVyKVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBpZiAoc2hvdWxkVGhyb3cpIHtcbiAgICAgIGVyci5tZXNzYWdlID0gZmlsZSArICc6ICcgKyBlcnIubWVzc2FnZVxuICAgICAgdGhyb3cgZXJyXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeSAob2JqLCBvcHRpb25zKSB7XG4gIHZhciBzcGFjZXNcbiAgdmFyIEVPTCA9ICdcXG4nXG4gIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ29iamVjdCcgJiYgb3B0aW9ucyAhPT0gbnVsbCkge1xuICAgIGlmIChvcHRpb25zLnNwYWNlcykge1xuICAgICAgc3BhY2VzID0gb3B0aW9ucy5zcGFjZXNcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuRU9MKSB7XG4gICAgICBFT0wgPSBvcHRpb25zLkVPTFxuICAgIH1cbiAgfVxuXG4gIHZhciBzdHIgPSBKU09OLnN0cmluZ2lmeShvYmosIG9wdGlvbnMgPyBvcHRpb25zLnJlcGxhY2VyIDogbnVsbCwgc3BhY2VzKVxuXG4gIHJldHVybiBzdHIucmVwbGFjZSgvXFxuL2csIEVPTCkgKyBFT0xcbn1cblxuZnVuY3Rpb24gd3JpdGVGaWxlIChmaWxlLCBvYmosIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gIGlmIChjYWxsYmFjayA9PSBudWxsKSB7XG4gICAgY2FsbGJhY2sgPSBvcHRpb25zXG4gICAgb3B0aW9ucyA9IHt9XG4gIH1cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cbiAgdmFyIGZzID0gb3B0aW9ucy5mcyB8fCBfZnNcblxuICB2YXIgc3RyID0gJydcbiAgdHJ5IHtcbiAgICBzdHIgPSBzdHJpbmdpZnkob2JqLCBvcHRpb25zKVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICAvLyBOZWVkIHRvIHJldHVybiB3aGV0aGVyIGEgY2FsbGJhY2sgd2FzIHBhc3NlZCBvciBub3RcbiAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKGVyciwgbnVsbClcbiAgICByZXR1cm5cbiAgfVxuXG4gIGZzLndyaXRlRmlsZShmaWxlLCBzdHIsIG9wdGlvbnMsIGNhbGxiYWNrKVxufVxuXG5mdW5jdGlvbiB3cml0ZUZpbGVTeW5jIChmaWxlLCBvYmosIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cbiAgdmFyIGZzID0gb3B0aW9ucy5mcyB8fCBfZnNcblxuICB2YXIgc3RyID0gc3RyaW5naWZ5KG9iaiwgb3B0aW9ucylcbiAgLy8gbm90IHN1cmUgaWYgZnMud3JpdGVGaWxlU3luYyByZXR1cm5zIGFueXRoaW5nLCBidXQganVzdCBpbiBjYXNlXG4gIHJldHVybiBmcy53cml0ZUZpbGVTeW5jKGZpbGUsIHN0ciwgb3B0aW9ucylcbn1cblxuZnVuY3Rpb24gc3RyaXBCb20gKGNvbnRlbnQpIHtcbiAgLy8gd2UgZG8gdGhpcyBiZWNhdXNlIEpTT04ucGFyc2Ugd291bGQgY29udmVydCBpdCB0byBhIHV0Zjggc3RyaW5nIGlmIGVuY29kaW5nIHdhc24ndCBzcGVjaWZpZWRcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihjb250ZW50KSkgY29udGVudCA9IGNvbnRlbnQudG9TdHJpbmcoJ3V0ZjgnKVxuICBjb250ZW50ID0gY29udGVudC5yZXBsYWNlKC9eXFx1RkVGRi8sICcnKVxuICByZXR1cm4gY29udGVudFxufVxuXG52YXIganNvbmZpbGUgPSB7XG4gIHJlYWRGaWxlOiByZWFkRmlsZSxcbiAgcmVhZEZpbGVTeW5jOiByZWFkRmlsZVN5bmMsXG4gIHdyaXRlRmlsZTogd3JpdGVGaWxlLFxuICB3cml0ZUZpbGVTeW5jOiB3cml0ZUZpbGVTeW5jXG59XG5cbm1vZHVsZS5leHBvcnRzID0ganNvbmZpbGVcbiIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG5jb25zdCBta2RpciA9IHJlcXVpcmUoJy4uL21rZGlycycpXG5jb25zdCBwYXRoRXhpc3RzID0gcmVxdWlyZSgnLi4vcGF0aC1leGlzdHMnKS5wYXRoRXhpc3RzXG5jb25zdCBqc29uRmlsZSA9IHJlcXVpcmUoJy4vanNvbmZpbGUnKVxuXG5mdW5jdGlvbiBvdXRwdXRKc29uIChmaWxlLCBkYXRhLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYWxsYmFjayA9IG9wdGlvbnNcbiAgICBvcHRpb25zID0ge31cbiAgfVxuXG4gIGNvbnN0IGRpciA9IHBhdGguZGlybmFtZShmaWxlKVxuXG4gIHBhdGhFeGlzdHMoZGlyLCAoZXJyLCBpdERvZXMpID0+IHtcbiAgICBpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKVxuICAgIGlmIChpdERvZXMpIHJldHVybiBqc29uRmlsZS53cml0ZUpzb24oZmlsZSwgZGF0YSwgb3B0aW9ucywgY2FsbGJhY2spXG5cbiAgICBta2Rpci5ta2RpcnMoZGlyLCBlcnIgPT4ge1xuICAgICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycilcbiAgICAgIGpzb25GaWxlLndyaXRlSnNvbihmaWxlLCBkYXRhLCBvcHRpb25zLCBjYWxsYmFjaylcbiAgICB9KVxuICB9KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG91dHB1dEpzb25cbiIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBmcyA9IHJlcXVpcmUoJ2dyYWNlZnVsLWZzJylcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcbmNvbnN0IG1rZGlyID0gcmVxdWlyZSgnLi4vbWtkaXJzJylcbmNvbnN0IGpzb25GaWxlID0gcmVxdWlyZSgnLi9qc29uZmlsZScpXG5cbmZ1bmN0aW9uIG91dHB1dEpzb25TeW5jIChmaWxlLCBkYXRhLCBvcHRpb25zKSB7XG4gIGNvbnN0IGRpciA9IHBhdGguZGlybmFtZShmaWxlKVxuXG4gIGlmICghZnMuZXhpc3RzU3luYyhkaXIpKSB7XG4gICAgbWtkaXIubWtkaXJzU3luYyhkaXIpXG4gIH1cblxuICBqc29uRmlsZS53cml0ZUpzb25TeW5jKGZpbGUsIGRhdGEsIG9wdGlvbnMpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gb3V0cHV0SnNvblN5bmNcbiIsIid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbW92ZVN5bmM6IHJlcXVpcmUoJy4vbW92ZS1zeW5jJylcbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBmcyA9IHJlcXVpcmUoJ2dyYWNlZnVsLWZzJylcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcbmNvbnN0IGNvcHlTeW5jID0gcmVxdWlyZSgnLi4vY29weS1zeW5jJykuY29weVN5bmNcbmNvbnN0IHJlbW92ZVN5bmMgPSByZXF1aXJlKCcuLi9yZW1vdmUnKS5yZW1vdmVTeW5jXG5jb25zdCBta2RpcnBTeW5jID0gcmVxdWlyZSgnLi4vbWtkaXJzJykubWtkaXJwU3luY1xuY29uc3Qgc3RhdCA9IHJlcXVpcmUoJy4uL3V0aWwvc3RhdCcpXG5cbmZ1bmN0aW9uIG1vdmVTeW5jIChzcmMsIGRlc3QsIG9wdHMpIHtcbiAgb3B0cyA9IG9wdHMgfHwge31cbiAgY29uc3Qgb3ZlcndyaXRlID0gb3B0cy5vdmVyd3JpdGUgfHwgb3B0cy5jbG9iYmVyIHx8IGZhbHNlXG5cbiAgY29uc3QgeyBzcmNTdGF0IH0gPSBzdGF0LmNoZWNrUGF0aHNTeW5jKHNyYywgZGVzdCwgJ21vdmUnKVxuICBzdGF0LmNoZWNrUGFyZW50UGF0aHNTeW5jKHNyYywgc3JjU3RhdCwgZGVzdCwgJ21vdmUnKVxuICBta2RpcnBTeW5jKHBhdGguZGlybmFtZShkZXN0KSlcbiAgcmV0dXJuIGRvUmVuYW1lKHNyYywgZGVzdCwgb3ZlcndyaXRlKVxufVxuXG5mdW5jdGlvbiBkb1JlbmFtZSAoc3JjLCBkZXN0LCBvdmVyd3JpdGUpIHtcbiAgaWYgKG92ZXJ3cml0ZSkge1xuICAgIHJlbW92ZVN5bmMoZGVzdClcbiAgICByZXR1cm4gcmVuYW1lKHNyYywgZGVzdCwgb3ZlcndyaXRlKVxuICB9XG4gIGlmIChmcy5leGlzdHNTeW5jKGRlc3QpKSB0aHJvdyBuZXcgRXJyb3IoJ2Rlc3QgYWxyZWFkeSBleGlzdHMuJylcbiAgcmV0dXJuIHJlbmFtZShzcmMsIGRlc3QsIG92ZXJ3cml0ZSlcbn1cblxuZnVuY3Rpb24gcmVuYW1lIChzcmMsIGRlc3QsIG92ZXJ3cml0ZSkge1xuICB0cnkge1xuICAgIGZzLnJlbmFtZVN5bmMoc3JjLCBkZXN0KVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBpZiAoZXJyLmNvZGUgIT09ICdFWERFVicpIHRocm93IGVyclxuICAgIHJldHVybiBtb3ZlQWNyb3NzRGV2aWNlKHNyYywgZGVzdCwgb3ZlcndyaXRlKVxuICB9XG59XG5cbmZ1bmN0aW9uIG1vdmVBY3Jvc3NEZXZpY2UgKHNyYywgZGVzdCwgb3ZlcndyaXRlKSB7XG4gIGNvbnN0IG9wdHMgPSB7XG4gICAgb3ZlcndyaXRlLFxuICAgIGVycm9yT25FeGlzdDogdHJ1ZVxuICB9XG4gIGNvcHlTeW5jKHNyYywgZGVzdCwgb3B0cylcbiAgcmV0dXJuIHJlbW92ZVN5bmMoc3JjKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1vdmVTeW5jXG4iLCIndXNlIHN0cmljdCdcblxuY29uc3QgdSA9IHJlcXVpcmUoJ3VuaXZlcnNhbGlmeScpLmZyb21DYWxsYmFja1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG1vdmU6IHUocmVxdWlyZSgnLi9tb3ZlJykpXG59XG4iLCIndXNlIHN0cmljdCdcblxuY29uc3QgZnMgPSByZXF1aXJlKCdncmFjZWZ1bC1mcycpXG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG5jb25zdCBjb3B5ID0gcmVxdWlyZSgnLi4vY29weScpLmNvcHlcbmNvbnN0IHJlbW92ZSA9IHJlcXVpcmUoJy4uL3JlbW92ZScpLnJlbW92ZVxuY29uc3QgbWtkaXJwID0gcmVxdWlyZSgnLi4vbWtkaXJzJykubWtkaXJwXG5jb25zdCBwYXRoRXhpc3RzID0gcmVxdWlyZSgnLi4vcGF0aC1leGlzdHMnKS5wYXRoRXhpc3RzXG5jb25zdCBzdGF0ID0gcmVxdWlyZSgnLi4vdXRpbC9zdGF0JylcblxuZnVuY3Rpb24gbW92ZSAoc3JjLCBkZXN0LCBvcHRzLCBjYikge1xuICBpZiAodHlwZW9mIG9wdHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYiA9IG9wdHNcbiAgICBvcHRzID0ge31cbiAgfVxuXG4gIGNvbnN0IG92ZXJ3cml0ZSA9IG9wdHMub3ZlcndyaXRlIHx8IG9wdHMuY2xvYmJlciB8fCBmYWxzZVxuXG4gIHN0YXQuY2hlY2tQYXRocyhzcmMsIGRlc3QsICdtb3ZlJywgKGVyciwgc3RhdHMpID0+IHtcbiAgICBpZiAoZXJyKSByZXR1cm4gY2IoZXJyKVxuICAgIGNvbnN0IHsgc3JjU3RhdCB9ID0gc3RhdHNcbiAgICBzdGF0LmNoZWNrUGFyZW50UGF0aHMoc3JjLCBzcmNTdGF0LCBkZXN0LCAnbW92ZScsIGVyciA9PiB7XG4gICAgICBpZiAoZXJyKSByZXR1cm4gY2IoZXJyKVxuICAgICAgbWtkaXJwKHBhdGguZGlybmFtZShkZXN0KSwgZXJyID0+IHtcbiAgICAgICAgaWYgKGVycikgcmV0dXJuIGNiKGVycilcbiAgICAgICAgcmV0dXJuIGRvUmVuYW1lKHNyYywgZGVzdCwgb3ZlcndyaXRlLCBjYilcbiAgICAgIH0pXG4gICAgfSlcbiAgfSlcbn1cblxuZnVuY3Rpb24gZG9SZW5hbWUgKHNyYywgZGVzdCwgb3ZlcndyaXRlLCBjYikge1xuICBpZiAob3ZlcndyaXRlKSB7XG4gICAgcmV0dXJuIHJlbW92ZShkZXN0LCBlcnIgPT4ge1xuICAgICAgaWYgKGVycikgcmV0dXJuIGNiKGVycilcbiAgICAgIHJldHVybiByZW5hbWUoc3JjLCBkZXN0LCBvdmVyd3JpdGUsIGNiKVxuICAgIH0pXG4gIH1cbiAgcGF0aEV4aXN0cyhkZXN0LCAoZXJyLCBkZXN0RXhpc3RzKSA9PiB7XG4gICAgaWYgKGVycikgcmV0dXJuIGNiKGVycilcbiAgICBpZiAoZGVzdEV4aXN0cykgcmV0dXJuIGNiKG5ldyBFcnJvcignZGVzdCBhbHJlYWR5IGV4aXN0cy4nKSlcbiAgICByZXR1cm4gcmVuYW1lKHNyYywgZGVzdCwgb3ZlcndyaXRlLCBjYilcbiAgfSlcbn1cblxuZnVuY3Rpb24gcmVuYW1lIChzcmMsIGRlc3QsIG92ZXJ3cml0ZSwgY2IpIHtcbiAgZnMucmVuYW1lKHNyYywgZGVzdCwgZXJyID0+IHtcbiAgICBpZiAoIWVycikgcmV0dXJuIGNiKClcbiAgICBpZiAoZXJyLmNvZGUgIT09ICdFWERFVicpIHJldHVybiBjYihlcnIpXG4gICAgcmV0dXJuIG1vdmVBY3Jvc3NEZXZpY2Uoc3JjLCBkZXN0LCBvdmVyd3JpdGUsIGNiKVxuICB9KVxufVxuXG5mdW5jdGlvbiBtb3ZlQWNyb3NzRGV2aWNlIChzcmMsIGRlc3QsIG92ZXJ3cml0ZSwgY2IpIHtcbiAgY29uc3Qgb3B0cyA9IHtcbiAgICBvdmVyd3JpdGUsXG4gICAgZXJyb3JPbkV4aXN0OiB0cnVlXG4gIH1cbiAgY29weShzcmMsIGRlc3QsIG9wdHMsIGVyciA9PiB7XG4gICAgaWYgKGVycikgcmV0dXJuIGNiKGVycilcbiAgICByZXR1cm4gcmVtb3ZlKHNyYywgY2IpXG4gIH0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0gbW92ZVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IHUgPSByZXF1aXJlKCd1bml2ZXJzYWxpZnknKS5mcm9tQ2FsbGJhY2tcbmNvbnN0IGZzID0gcmVxdWlyZSgnZ3JhY2VmdWwtZnMnKVxuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuY29uc3QgbWtkaXIgPSByZXF1aXJlKCcuLi9ta2RpcnMnKVxuY29uc3QgcGF0aEV4aXN0cyA9IHJlcXVpcmUoJy4uL3BhdGgtZXhpc3RzJykucGF0aEV4aXN0c1xuXG5mdW5jdGlvbiBvdXRwdXRGaWxlIChmaWxlLCBkYXRhLCBlbmNvZGluZywgY2FsbGJhY2spIHtcbiAgaWYgKHR5cGVvZiBlbmNvZGluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNhbGxiYWNrID0gZW5jb2RpbmdcbiAgICBlbmNvZGluZyA9ICd1dGY4J1xuICB9XG5cbiAgY29uc3QgZGlyID0gcGF0aC5kaXJuYW1lKGZpbGUpXG4gIHBhdGhFeGlzdHMoZGlyLCAoZXJyLCBpdERvZXMpID0+IHtcbiAgICBpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKVxuICAgIGlmIChpdERvZXMpIHJldHVybiBmcy53cml0ZUZpbGUoZmlsZSwgZGF0YSwgZW5jb2RpbmcsIGNhbGxiYWNrKVxuXG4gICAgbWtkaXIubWtkaXJzKGRpciwgZXJyID0+IHtcbiAgICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpXG5cbiAgICAgIGZzLndyaXRlRmlsZShmaWxlLCBkYXRhLCBlbmNvZGluZywgY2FsbGJhY2spXG4gICAgfSlcbiAgfSlcbn1cblxuZnVuY3Rpb24gb3V0cHV0RmlsZVN5bmMgKGZpbGUsIC4uLmFyZ3MpIHtcbiAgY29uc3QgZGlyID0gcGF0aC5kaXJuYW1lKGZpbGUpXG4gIGlmIChmcy5leGlzdHNTeW5jKGRpcikpIHtcbiAgICByZXR1cm4gZnMud3JpdGVGaWxlU3luYyhmaWxlLCAuLi5hcmdzKVxuICB9XG4gIG1rZGlyLm1rZGlyc1N5bmMoZGlyKVxuICBmcy53cml0ZUZpbGVTeW5jKGZpbGUsIC4uLmFyZ3MpXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBvdXRwdXRGaWxlOiB1KG91dHB1dEZpbGUpLFxuICBvdXRwdXRGaWxlU3luY1xufVxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgUm9tYW4uR2Fpa292IG9uIDMvMjEvMjAxOVxyXG4gKi9cclxuaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzLWV4dHJhXCI7XHJcbmltcG9ydCB7Y29weVN5bmMsIHJlbW92ZVN5bmN9IGZyb20gXCJmcy1leHRyYVwiO1xyXG5pbXBvcnQge25vcm1hbGl6ZSwgcmVsYXRpdmV9IGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCBjaGFsayBmcm9tIFwiY2hhbGtcIjtcclxuaW1wb3J0IHt1bmxpbmtTeW5jfSBmcm9tIFwiZnNcIjtcclxuaW1wb3J0IHtkaXJTeW5jfSBmcm9tIFwidG1wXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRmlsZVBhdGgge1xyXG5cclxuICAgIHByaXZhdGUgX3BhdGg6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwYXRoOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnBhdGggPSBwYXRoO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBwYXRoKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhdGg7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHBhdGgodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX3BhdGggPSBub3JtYWxpemUodmFsdWUpLnJlcGxhY2UoL1xcXFwvZywgXCIvXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBuYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgcGFydHMgPSB0aGlzLnBhdGguc3BsaXQoXCIvXCIpO1xyXG4gICAgICAgIHJldHVybiBwYXJ0c1twYXJ0cy5sZW5ndGggLSAxXTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZXh0ZW5zaW9uKCk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgcGFydHMgPSB0aGlzLm5hbWUuc3BsaXQoXCIuXCIpO1xyXG4gICAgICAgIGlmIChwYXJ0cy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwYXJ0c1twYXJ0cy5sZW5ndGggLSAxXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGV4aXN0cygpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGF0aCAmJiBmcy5leGlzdHNTeW5jKHRoaXMuX3BhdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpc0ZvbGRlcigpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5leGlzdHMpIHtcclxuICAgICAgICAgICAgY29uc3Qgc3RhdCA9IGZzLnN0YXRTeW5jKHRoaXMuX3BhdGgpO1xyXG4gICAgICAgICAgICByZXR1cm4gc3RhdC5pc0RpcmVjdG9yeSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzb2x2ZVBhdGgocmVsYXRpdmVQYXRoOiBzdHJpbmcpOiBGaWxlUGF0aCB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBGaWxlUGF0aCh0aGlzLnBhdGggKyBcIi9cIiArIHJlbGF0aXZlUGF0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVsYXRpdmVQYXRoKGZpbGU6IEZpbGVQYXRoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gcmVsYXRpdmUodGhpcy5wYXRoLCBmaWxlLnBhdGgpLnJlcGxhY2UoL1xcXFwvZywgXCIvXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUZvbGRlcigpOiBib29sZWFuIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZXh0ZW5zaW9uKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBmcy5lbnN1cmVGaWxlU3luYyh0aGlzLnBhdGgpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJjYW4ndCBjcmVhdGUgZmlsZSBwYXRoOiBcIiwgdGhpcy5wYXRoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBmcy5lbnN1cmVEaXJTeW5jKHRoaXMucGF0aCk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcImNhbid0IGNyZWF0ZSBmb2xkZXIgcGF0aDogXCIsIHRoaXMucGF0aCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlVGVtcEZvbGRlcihwcmVmaXg/OiBzdHJpbmcpOiBGaWxlUGF0aCB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gZGlyU3luYyh7cHJlZml4OiBwcmVmaXgsIHVuc2FmZUNsZWFudXA6IHRydWV9KTtcclxuICAgICAgICByZXR1cm4gbmV3IEZpbGVQYXRoKHJlc3VsdC5uYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLmlzRm9sZGVyKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVTeW5jKHRoaXMucGF0aCk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IobnVsbCwgYENhbid0IHJlbW92ZSBkaXJlY3RvcnkgJyR7Y2hhbGsuYmx1ZSh0aGlzLnBhdGgpfSdgKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB1bmxpbmtTeW5jKHRoaXMucGF0aCk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IobnVsbCwgYENhbid0IHJlbW92ZSBmaWxlICcke2NoYWxrLmJsdWUodGhpcy5wYXRoKX0nYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNvcHkoZGVzdGluYXRpb246IEZpbGVQYXRoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc29sZS5sb2cobnVsbCwgYGNvcHkgJyR7Y2hhbGsuYmx1ZSh0aGlzLnBhdGgpfScgdG8gJyR7Y2hhbGsuYmx1ZShkZXN0aW5hdGlvbi5wYXRoKX0nYCk7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29weVN5bmModGhpcy5wYXRoLCBkZXN0aW5hdGlvbi5wYXRoKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IobnVsbCwgYENhbid0IGNvcHkgJyR7Y2hhbGsuYmx1ZSh0aGlzLnBhdGgpfScgdG8gJyR7Y2hhbGsuYmx1ZShkZXN0aW5hdGlvbi5wYXRoKX0nYCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsaXN0aW5nKCk6IEZpbGVQYXRoW10ge1xyXG4gICAgICAgIGlmICh0aGlzLmlzRm9sZGVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpc3Q6IEZpbGVQYXRoW10gPSBbXTtcclxuICAgICAgICAgICAgZnMucmVhZGRpclN5bmModGhpcy5wYXRoKS5mb3JFYWNoKGZpbGVOYW1lID0+IHtcclxuICAgICAgICAgICAgICAgIGxpc3QucHVzaCh0aGlzLnJlc29sdmVQYXRoKGZpbGVOYW1lKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gbGlzdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxpc3RpbmdEZWVwKCk6IEZpbGVQYXRoW10ge1xyXG4gICAgICAgIGNvbnN0IGxpc3Q6IEZpbGVQYXRoW10gPSB0aGlzLmxpc3RpbmcoKTtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gbGlzdDtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBmaWxlIG9mIGxpc3QpIHtcclxuICAgICAgICAgICAgaWYgKGZpbGUuaXNGb2xkZXIpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5jb25jYXQoZmlsZS5saXN0aW5nRGVlcCgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxufVxyXG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCBlc2NhcGVTdHJpbmdSZWdleHAgPSByZXF1aXJlKCdlc2NhcGUtc3RyaW5nLXJlZ2V4cCcpO1xuY29uc3QgYW5zaVN0eWxlcyA9IHJlcXVpcmUoJ2Fuc2ktc3R5bGVzJyk7XG5jb25zdCBzdGRvdXRDb2xvciA9IHJlcXVpcmUoJ3N1cHBvcnRzLWNvbG9yJykuc3Rkb3V0O1xuXG5jb25zdCB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vdGVtcGxhdGVzLmpzJyk7XG5cbmNvbnN0IGlzU2ltcGxlV2luZG93c1Rlcm0gPSBwcm9jZXNzLnBsYXRmb3JtID09PSAnd2luMzInICYmICEocHJvY2Vzcy5lbnYuVEVSTSB8fCAnJykudG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKCd4dGVybScpO1xuXG4vLyBgc3VwcG9ydHNDb2xvci5sZXZlbGAg4oaSIGBhbnNpU3R5bGVzLmNvbG9yW25hbWVdYCBtYXBwaW5nXG5jb25zdCBsZXZlbE1hcHBpbmcgPSBbJ2Fuc2knLCAnYW5zaScsICdhbnNpMjU2JywgJ2Fuc2kxNm0nXTtcblxuLy8gYGNvbG9yLWNvbnZlcnRgIG1vZGVscyB0byBleGNsdWRlIGZyb20gdGhlIENoYWxrIEFQSSBkdWUgdG8gY29uZmxpY3RzIGFuZCBzdWNoXG5jb25zdCBza2lwTW9kZWxzID0gbmV3IFNldChbJ2dyYXknXSk7XG5cbmNvbnN0IHN0eWxlcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbmZ1bmN0aW9uIGFwcGx5T3B0aW9ucyhvYmosIG9wdGlvbnMpIHtcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblx0Ly8gRGV0ZWN0IGxldmVsIGlmIG5vdCBzZXQgbWFudWFsbHlcblx0Y29uc3Qgc2NMZXZlbCA9IHN0ZG91dENvbG9yID8gc3Rkb3V0Q29sb3IubGV2ZWwgOiAwO1xuXHRvYmoubGV2ZWwgPSBvcHRpb25zLmxldmVsID09PSB1bmRlZmluZWQgPyBzY0xldmVsIDogb3B0aW9ucy5sZXZlbDtcblx0b2JqLmVuYWJsZWQgPSAnZW5hYmxlZCcgaW4gb3B0aW9ucyA/IG9wdGlvbnMuZW5hYmxlZCA6IG9iai5sZXZlbCA+IDA7XG59XG5cbmZ1bmN0aW9uIENoYWxrKG9wdGlvbnMpIHtcblx0Ly8gV2UgY2hlY2sgZm9yIHRoaXMudGVtcGxhdGUgaGVyZSBzaW5jZSBjYWxsaW5nIGBjaGFsay5jb25zdHJ1Y3RvcigpYFxuXHQvLyBieSBpdHNlbGYgd2lsbCBoYXZlIGEgYHRoaXNgIG9mIGEgcHJldmlvdXNseSBjb25zdHJ1Y3RlZCBjaGFsayBvYmplY3Rcblx0aWYgKCF0aGlzIHx8ICEodGhpcyBpbnN0YW5jZW9mIENoYWxrKSB8fCB0aGlzLnRlbXBsYXRlKSB7XG5cdFx0Y29uc3QgY2hhbGsgPSB7fTtcblx0XHRhcHBseU9wdGlvbnMoY2hhbGssIG9wdGlvbnMpO1xuXG5cdFx0Y2hhbGsudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRjb25zdCBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuXHRcdFx0cmV0dXJuIGNoYWxrVGFnLmFwcGx5KG51bGwsIFtjaGFsay50ZW1wbGF0ZV0uY29uY2F0KGFyZ3MpKTtcblx0XHR9O1xuXG5cdFx0T2JqZWN0LnNldFByb3RvdHlwZU9mKGNoYWxrLCBDaGFsay5wcm90b3R5cGUpO1xuXHRcdE9iamVjdC5zZXRQcm90b3R5cGVPZihjaGFsay50ZW1wbGF0ZSwgY2hhbGspO1xuXG5cdFx0Y2hhbGsudGVtcGxhdGUuY29uc3RydWN0b3IgPSBDaGFsaztcblxuXHRcdHJldHVybiBjaGFsay50ZW1wbGF0ZTtcblx0fVxuXG5cdGFwcGx5T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcbn1cblxuLy8gVXNlIGJyaWdodCBibHVlIG9uIFdpbmRvd3MgYXMgdGhlIG5vcm1hbCBibHVlIGNvbG9yIGlzIGlsbGVnaWJsZVxuaWYgKGlzU2ltcGxlV2luZG93c1Rlcm0pIHtcblx0YW5zaVN0eWxlcy5ibHVlLm9wZW4gPSAnXFx1MDAxQls5NG0nO1xufVxuXG5mb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhhbnNpU3R5bGVzKSkge1xuXHRhbnNpU3R5bGVzW2tleV0uY2xvc2VSZSA9IG5ldyBSZWdFeHAoZXNjYXBlU3RyaW5nUmVnZXhwKGFuc2lTdHlsZXNba2V5XS5jbG9zZSksICdnJyk7XG5cblx0c3R5bGVzW2tleV0gPSB7XG5cdFx0Z2V0KCkge1xuXHRcdFx0Y29uc3QgY29kZXMgPSBhbnNpU3R5bGVzW2tleV07XG5cdFx0XHRyZXR1cm4gYnVpbGQuY2FsbCh0aGlzLCB0aGlzLl9zdHlsZXMgPyB0aGlzLl9zdHlsZXMuY29uY2F0KGNvZGVzKSA6IFtjb2Rlc10sIHRoaXMuX2VtcHR5LCBrZXkpO1xuXHRcdH1cblx0fTtcbn1cblxuc3R5bGVzLnZpc2libGUgPSB7XG5cdGdldCgpIHtcblx0XHRyZXR1cm4gYnVpbGQuY2FsbCh0aGlzLCB0aGlzLl9zdHlsZXMgfHwgW10sIHRydWUsICd2aXNpYmxlJyk7XG5cdH1cbn07XG5cbmFuc2lTdHlsZXMuY29sb3IuY2xvc2VSZSA9IG5ldyBSZWdFeHAoZXNjYXBlU3RyaW5nUmVnZXhwKGFuc2lTdHlsZXMuY29sb3IuY2xvc2UpLCAnZycpO1xuZm9yIChjb25zdCBtb2RlbCBvZiBPYmplY3Qua2V5cyhhbnNpU3R5bGVzLmNvbG9yLmFuc2kpKSB7XG5cdGlmIChza2lwTW9kZWxzLmhhcyhtb2RlbCkpIHtcblx0XHRjb250aW51ZTtcblx0fVxuXG5cdHN0eWxlc1ttb2RlbF0gPSB7XG5cdFx0Z2V0KCkge1xuXHRcdFx0Y29uc3QgbGV2ZWwgPSB0aGlzLmxldmVsO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0Y29uc3Qgb3BlbiA9IGFuc2lTdHlsZXMuY29sb3JbbGV2ZWxNYXBwaW5nW2xldmVsXV1bbW9kZWxdLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG5cdFx0XHRcdGNvbnN0IGNvZGVzID0ge1xuXHRcdFx0XHRcdG9wZW4sXG5cdFx0XHRcdFx0Y2xvc2U6IGFuc2lTdHlsZXMuY29sb3IuY2xvc2UsXG5cdFx0XHRcdFx0Y2xvc2VSZTogYW5zaVN0eWxlcy5jb2xvci5jbG9zZVJlXG5cdFx0XHRcdH07XG5cdFx0XHRcdHJldHVybiBidWlsZC5jYWxsKHRoaXMsIHRoaXMuX3N0eWxlcyA/IHRoaXMuX3N0eWxlcy5jb25jYXQoY29kZXMpIDogW2NvZGVzXSwgdGhpcy5fZW1wdHksIG1vZGVsKTtcblx0XHRcdH07XG5cdFx0fVxuXHR9O1xufVxuXG5hbnNpU3R5bGVzLmJnQ29sb3IuY2xvc2VSZSA9IG5ldyBSZWdFeHAoZXNjYXBlU3RyaW5nUmVnZXhwKGFuc2lTdHlsZXMuYmdDb2xvci5jbG9zZSksICdnJyk7XG5mb3IgKGNvbnN0IG1vZGVsIG9mIE9iamVjdC5rZXlzKGFuc2lTdHlsZXMuYmdDb2xvci5hbnNpKSkge1xuXHRpZiAoc2tpcE1vZGVscy5oYXMobW9kZWwpKSB7XG5cdFx0Y29udGludWU7XG5cdH1cblxuXHRjb25zdCBiZ01vZGVsID0gJ2JnJyArIG1vZGVsWzBdLnRvVXBwZXJDYXNlKCkgKyBtb2RlbC5zbGljZSgxKTtcblx0c3R5bGVzW2JnTW9kZWxdID0ge1xuXHRcdGdldCgpIHtcblx0XHRcdGNvbnN0IGxldmVsID0gdGhpcy5sZXZlbDtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGNvbnN0IG9wZW4gPSBhbnNpU3R5bGVzLmJnQ29sb3JbbGV2ZWxNYXBwaW5nW2xldmVsXV1bbW9kZWxdLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG5cdFx0XHRcdGNvbnN0IGNvZGVzID0ge1xuXHRcdFx0XHRcdG9wZW4sXG5cdFx0XHRcdFx0Y2xvc2U6IGFuc2lTdHlsZXMuYmdDb2xvci5jbG9zZSxcblx0XHRcdFx0XHRjbG9zZVJlOiBhbnNpU3R5bGVzLmJnQ29sb3IuY2xvc2VSZVxuXHRcdFx0XHR9O1xuXHRcdFx0XHRyZXR1cm4gYnVpbGQuY2FsbCh0aGlzLCB0aGlzLl9zdHlsZXMgPyB0aGlzLl9zdHlsZXMuY29uY2F0KGNvZGVzKSA6IFtjb2Rlc10sIHRoaXMuX2VtcHR5LCBtb2RlbCk7XG5cdFx0XHR9O1xuXHRcdH1cblx0fTtcbn1cblxuY29uc3QgcHJvdG8gPSBPYmplY3QuZGVmaW5lUHJvcGVydGllcygoKSA9PiB7fSwgc3R5bGVzKTtcblxuZnVuY3Rpb24gYnVpbGQoX3N0eWxlcywgX2VtcHR5LCBrZXkpIHtcblx0Y29uc3QgYnVpbGRlciA9IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gYXBwbHlTdHlsZS5hcHBseShidWlsZGVyLCBhcmd1bWVudHMpO1xuXHR9O1xuXG5cdGJ1aWxkZXIuX3N0eWxlcyA9IF9zdHlsZXM7XG5cdGJ1aWxkZXIuX2VtcHR5ID0gX2VtcHR5O1xuXG5cdGNvbnN0IHNlbGYgPSB0aGlzO1xuXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShidWlsZGVyLCAnbGV2ZWwnLCB7XG5cdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRnZXQoKSB7XG5cdFx0XHRyZXR1cm4gc2VsZi5sZXZlbDtcblx0XHR9LFxuXHRcdHNldChsZXZlbCkge1xuXHRcdFx0c2VsZi5sZXZlbCA9IGxldmVsO1xuXHRcdH1cblx0fSk7XG5cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGJ1aWxkZXIsICdlbmFibGVkJywge1xuXHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0Z2V0KCkge1xuXHRcdFx0cmV0dXJuIHNlbGYuZW5hYmxlZDtcblx0XHR9LFxuXHRcdHNldChlbmFibGVkKSB7XG5cdFx0XHRzZWxmLmVuYWJsZWQgPSBlbmFibGVkO1xuXHRcdH1cblx0fSk7XG5cblx0Ly8gU2VlIGJlbG93IGZvciBmaXggcmVnYXJkaW5nIGludmlzaWJsZSBncmV5L2RpbSBjb21iaW5hdGlvbiBvbiBXaW5kb3dzXG5cdGJ1aWxkZXIuaGFzR3JleSA9IHRoaXMuaGFzR3JleSB8fCBrZXkgPT09ICdncmF5JyB8fCBrZXkgPT09ICdncmV5JztcblxuXHQvLyBgX19wcm90b19fYCBpcyB1c2VkIGJlY2F1c2Ugd2UgbXVzdCByZXR1cm4gYSBmdW5jdGlvbiwgYnV0IHRoZXJlIGlzXG5cdC8vIG5vIHdheSB0byBjcmVhdGUgYSBmdW5jdGlvbiB3aXRoIGEgZGlmZmVyZW50IHByb3RvdHlwZVxuXHRidWlsZGVyLl9fcHJvdG9fXyA9IHByb3RvOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXByb3RvXG5cblx0cmV0dXJuIGJ1aWxkZXI7XG59XG5cbmZ1bmN0aW9uIGFwcGx5U3R5bGUoKSB7XG5cdC8vIFN1cHBvcnQgdmFyYWdzLCBidXQgc2ltcGx5IGNhc3QgdG8gc3RyaW5nIGluIGNhc2UgdGhlcmUncyBvbmx5IG9uZSBhcmdcblx0Y29uc3QgYXJncyA9IGFyZ3VtZW50cztcblx0Y29uc3QgYXJnc0xlbiA9IGFyZ3MubGVuZ3RoO1xuXHRsZXQgc3RyID0gU3RyaW5nKGFyZ3VtZW50c1swXSk7XG5cblx0aWYgKGFyZ3NMZW4gPT09IDApIHtcblx0XHRyZXR1cm4gJyc7XG5cdH1cblxuXHRpZiAoYXJnc0xlbiA+IDEpIHtcblx0XHQvLyBEb24ndCBzbGljZSBgYXJndW1lbnRzYCwgaXQgcHJldmVudHMgVjggb3B0aW1pemF0aW9uc1xuXHRcdGZvciAobGV0IGEgPSAxOyBhIDwgYXJnc0xlbjsgYSsrKSB7XG5cdFx0XHRzdHIgKz0gJyAnICsgYXJnc1thXTtcblx0XHR9XG5cdH1cblxuXHRpZiAoIXRoaXMuZW5hYmxlZCB8fCB0aGlzLmxldmVsIDw9IDAgfHwgIXN0cikge1xuXHRcdHJldHVybiB0aGlzLl9lbXB0eSA/ICcnIDogc3RyO1xuXHR9XG5cblx0Ly8gVHVybnMgb3V0IHRoYXQgb24gV2luZG93cyBkaW1tZWQgZ3JheSB0ZXh0IGJlY29tZXMgaW52aXNpYmxlIGluIGNtZC5leGUsXG5cdC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vY2hhbGsvY2hhbGsvaXNzdWVzLzU4XG5cdC8vIElmIHdlJ3JlIG9uIFdpbmRvd3MgYW5kIHdlJ3JlIGRlYWxpbmcgd2l0aCBhIGdyYXkgY29sb3IsIHRlbXBvcmFyaWx5IG1ha2UgJ2RpbScgYSBub29wLlxuXHRjb25zdCBvcmlnaW5hbERpbSA9IGFuc2lTdHlsZXMuZGltLm9wZW47XG5cdGlmIChpc1NpbXBsZVdpbmRvd3NUZXJtICYmIHRoaXMuaGFzR3JleSkge1xuXHRcdGFuc2lTdHlsZXMuZGltLm9wZW4gPSAnJztcblx0fVxuXG5cdGZvciAoY29uc3QgY29kZSBvZiB0aGlzLl9zdHlsZXMuc2xpY2UoKS5yZXZlcnNlKCkpIHtcblx0XHQvLyBSZXBsYWNlIGFueSBpbnN0YW5jZXMgYWxyZWFkeSBwcmVzZW50IHdpdGggYSByZS1vcGVuaW5nIGNvZGVcblx0XHQvLyBvdGhlcndpc2Ugb25seSB0aGUgcGFydCBvZiB0aGUgc3RyaW5nIHVudGlsIHNhaWQgY2xvc2luZyBjb2RlXG5cdFx0Ly8gd2lsbCBiZSBjb2xvcmVkLCBhbmQgdGhlIHJlc3Qgd2lsbCBzaW1wbHkgYmUgJ3BsYWluJy5cblx0XHRzdHIgPSBjb2RlLm9wZW4gKyBzdHIucmVwbGFjZShjb2RlLmNsb3NlUmUsIGNvZGUub3BlbikgKyBjb2RlLmNsb3NlO1xuXG5cdFx0Ly8gQ2xvc2UgdGhlIHN0eWxpbmcgYmVmb3JlIGEgbGluZWJyZWFrIGFuZCByZW9wZW5cblx0XHQvLyBhZnRlciBuZXh0IGxpbmUgdG8gZml4IGEgYmxlZWQgaXNzdWUgb24gbWFjT1Ncblx0XHQvLyBodHRwczovL2dpdGh1Yi5jb20vY2hhbGsvY2hhbGsvcHVsbC85MlxuXHRcdHN0ciA9IHN0ci5yZXBsYWNlKC9cXHI/XFxuL2csIGAke2NvZGUuY2xvc2V9JCYke2NvZGUub3Blbn1gKTtcblx0fVxuXG5cdC8vIFJlc2V0IHRoZSBvcmlnaW5hbCBgZGltYCBpZiB3ZSBjaGFuZ2VkIGl0IHRvIHdvcmsgYXJvdW5kIHRoZSBXaW5kb3dzIGRpbW1lZCBncmF5IGlzc3VlXG5cdGFuc2lTdHlsZXMuZGltLm9wZW4gPSBvcmlnaW5hbERpbTtcblxuXHRyZXR1cm4gc3RyO1xufVxuXG5mdW5jdGlvbiBjaGFsa1RhZyhjaGFsaywgc3RyaW5ncykge1xuXHRpZiAoIUFycmF5LmlzQXJyYXkoc3RyaW5ncykpIHtcblx0XHQvLyBJZiBjaGFsaygpIHdhcyBjYWxsZWQgYnkgaXRzZWxmIG9yIHdpdGggYSBzdHJpbmcsXG5cdFx0Ly8gcmV0dXJuIHRoZSBzdHJpbmcgaXRzZWxmIGFzIGEgc3RyaW5nLlxuXHRcdHJldHVybiBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkuam9pbignICcpO1xuXHR9XG5cblx0Y29uc3QgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcblx0Y29uc3QgcGFydHMgPSBbc3RyaW5ncy5yYXdbMF1dO1xuXG5cdGZvciAobGV0IGkgPSAxOyBpIDwgc3RyaW5ncy5sZW5ndGg7IGkrKykge1xuXHRcdHBhcnRzLnB1c2goU3RyaW5nKGFyZ3NbaSAtIDFdKS5yZXBsYWNlKC9be31cXFxcXS9nLCAnXFxcXCQmJykpO1xuXHRcdHBhcnRzLnB1c2goU3RyaW5nKHN0cmluZ3MucmF3W2ldKSk7XG5cdH1cblxuXHRyZXR1cm4gdGVtcGxhdGUoY2hhbGssIHBhcnRzLmpvaW4oJycpKTtcbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoQ2hhbGsucHJvdG90eXBlLCBzdHlsZXMpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENoYWxrKCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbmV3LWNhcFxubW9kdWxlLmV4cG9ydHMuc3VwcG9ydHNDb2xvciA9IHN0ZG91dENvbG9yO1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IG1vZHVsZS5leHBvcnRzOyAvLyBGb3IgVHlwZVNjcmlwdFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgbWF0Y2hPcGVyYXRvcnNSZSA9IC9bfFxcXFx7fSgpW1xcXV4kKyo/Ll0vZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc3RyKSB7XG5cdGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGEgc3RyaW5nJyk7XG5cdH1cblxuXHRyZXR1cm4gc3RyLnJlcGxhY2UobWF0Y2hPcGVyYXRvcnNSZSwgJ1xcXFwkJicpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IGNvbG9yQ29udmVydCA9IHJlcXVpcmUoJ2NvbG9yLWNvbnZlcnQnKTtcblxuY29uc3Qgd3JhcEFuc2kxNiA9IChmbiwgb2Zmc2V0KSA9PiBmdW5jdGlvbiAoKSB7XG5cdGNvbnN0IGNvZGUgPSBmbi5hcHBseShjb2xvckNvbnZlcnQsIGFyZ3VtZW50cyk7XG5cdHJldHVybiBgXFx1MDAxQlske2NvZGUgKyBvZmZzZXR9bWA7XG59O1xuXG5jb25zdCB3cmFwQW5zaTI1NiA9IChmbiwgb2Zmc2V0KSA9PiBmdW5jdGlvbiAoKSB7XG5cdGNvbnN0IGNvZGUgPSBmbi5hcHBseShjb2xvckNvbnZlcnQsIGFyZ3VtZW50cyk7XG5cdHJldHVybiBgXFx1MDAxQlskezM4ICsgb2Zmc2V0fTs1OyR7Y29kZX1tYDtcbn07XG5cbmNvbnN0IHdyYXBBbnNpMTZtID0gKGZuLCBvZmZzZXQpID0+IGZ1bmN0aW9uICgpIHtcblx0Y29uc3QgcmdiID0gZm4uYXBwbHkoY29sb3JDb252ZXJ0LCBhcmd1bWVudHMpO1xuXHRyZXR1cm4gYFxcdTAwMUJbJHszOCArIG9mZnNldH07Mjske3JnYlswXX07JHtyZ2JbMV19OyR7cmdiWzJdfW1gO1xufTtcblxuZnVuY3Rpb24gYXNzZW1ibGVTdHlsZXMoKSB7XG5cdGNvbnN0IGNvZGVzID0gbmV3IE1hcCgpO1xuXHRjb25zdCBzdHlsZXMgPSB7XG5cdFx0bW9kaWZpZXI6IHtcblx0XHRcdHJlc2V0OiBbMCwgMF0sXG5cdFx0XHQvLyAyMSBpc24ndCB3aWRlbHkgc3VwcG9ydGVkIGFuZCAyMiBkb2VzIHRoZSBzYW1lIHRoaW5nXG5cdFx0XHRib2xkOiBbMSwgMjJdLFxuXHRcdFx0ZGltOiBbMiwgMjJdLFxuXHRcdFx0aXRhbGljOiBbMywgMjNdLFxuXHRcdFx0dW5kZXJsaW5lOiBbNCwgMjRdLFxuXHRcdFx0aW52ZXJzZTogWzcsIDI3XSxcblx0XHRcdGhpZGRlbjogWzgsIDI4XSxcblx0XHRcdHN0cmlrZXRocm91Z2g6IFs5LCAyOV1cblx0XHR9LFxuXHRcdGNvbG9yOiB7XG5cdFx0XHRibGFjazogWzMwLCAzOV0sXG5cdFx0XHRyZWQ6IFszMSwgMzldLFxuXHRcdFx0Z3JlZW46IFszMiwgMzldLFxuXHRcdFx0eWVsbG93OiBbMzMsIDM5XSxcblx0XHRcdGJsdWU6IFszNCwgMzldLFxuXHRcdFx0bWFnZW50YTogWzM1LCAzOV0sXG5cdFx0XHRjeWFuOiBbMzYsIDM5XSxcblx0XHRcdHdoaXRlOiBbMzcsIDM5XSxcblx0XHRcdGdyYXk6IFs5MCwgMzldLFxuXG5cdFx0XHQvLyBCcmlnaHQgY29sb3Jcblx0XHRcdHJlZEJyaWdodDogWzkxLCAzOV0sXG5cdFx0XHRncmVlbkJyaWdodDogWzkyLCAzOV0sXG5cdFx0XHR5ZWxsb3dCcmlnaHQ6IFs5MywgMzldLFxuXHRcdFx0Ymx1ZUJyaWdodDogWzk0LCAzOV0sXG5cdFx0XHRtYWdlbnRhQnJpZ2h0OiBbOTUsIDM5XSxcblx0XHRcdGN5YW5CcmlnaHQ6IFs5NiwgMzldLFxuXHRcdFx0d2hpdGVCcmlnaHQ6IFs5NywgMzldXG5cdFx0fSxcblx0XHRiZ0NvbG9yOiB7XG5cdFx0XHRiZ0JsYWNrOiBbNDAsIDQ5XSxcblx0XHRcdGJnUmVkOiBbNDEsIDQ5XSxcblx0XHRcdGJnR3JlZW46IFs0MiwgNDldLFxuXHRcdFx0YmdZZWxsb3c6IFs0MywgNDldLFxuXHRcdFx0YmdCbHVlOiBbNDQsIDQ5XSxcblx0XHRcdGJnTWFnZW50YTogWzQ1LCA0OV0sXG5cdFx0XHRiZ0N5YW46IFs0NiwgNDldLFxuXHRcdFx0YmdXaGl0ZTogWzQ3LCA0OV0sXG5cblx0XHRcdC8vIEJyaWdodCBjb2xvclxuXHRcdFx0YmdCbGFja0JyaWdodDogWzEwMCwgNDldLFxuXHRcdFx0YmdSZWRCcmlnaHQ6IFsxMDEsIDQ5XSxcblx0XHRcdGJnR3JlZW5CcmlnaHQ6IFsxMDIsIDQ5XSxcblx0XHRcdGJnWWVsbG93QnJpZ2h0OiBbMTAzLCA0OV0sXG5cdFx0XHRiZ0JsdWVCcmlnaHQ6IFsxMDQsIDQ5XSxcblx0XHRcdGJnTWFnZW50YUJyaWdodDogWzEwNSwgNDldLFxuXHRcdFx0YmdDeWFuQnJpZ2h0OiBbMTA2LCA0OV0sXG5cdFx0XHRiZ1doaXRlQnJpZ2h0OiBbMTA3LCA0OV1cblx0XHR9XG5cdH07XG5cblx0Ly8gRml4IGh1bWFuc1xuXHRzdHlsZXMuY29sb3IuZ3JleSA9IHN0eWxlcy5jb2xvci5ncmF5O1xuXG5cdGZvciAoY29uc3QgZ3JvdXBOYW1lIG9mIE9iamVjdC5rZXlzKHN0eWxlcykpIHtcblx0XHRjb25zdCBncm91cCA9IHN0eWxlc1tncm91cE5hbWVdO1xuXG5cdFx0Zm9yIChjb25zdCBzdHlsZU5hbWUgb2YgT2JqZWN0LmtleXMoZ3JvdXApKSB7XG5cdFx0XHRjb25zdCBzdHlsZSA9IGdyb3VwW3N0eWxlTmFtZV07XG5cblx0XHRcdHN0eWxlc1tzdHlsZU5hbWVdID0ge1xuXHRcdFx0XHRvcGVuOiBgXFx1MDAxQlske3N0eWxlWzBdfW1gLFxuXHRcdFx0XHRjbG9zZTogYFxcdTAwMUJbJHtzdHlsZVsxXX1tYFxuXHRcdFx0fTtcblxuXHRcdFx0Z3JvdXBbc3R5bGVOYW1lXSA9IHN0eWxlc1tzdHlsZU5hbWVdO1xuXG5cdFx0XHRjb2Rlcy5zZXQoc3R5bGVbMF0sIHN0eWxlWzFdKTtcblx0XHR9XG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoc3R5bGVzLCBncm91cE5hbWUsIHtcblx0XHRcdHZhbHVlOiBncm91cCxcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlXG5cdFx0fSk7XG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoc3R5bGVzLCAnY29kZXMnLCB7XG5cdFx0XHR2YWx1ZTogY29kZXMsXG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZVxuXHRcdH0pO1xuXHR9XG5cblx0Y29uc3QgYW5zaTJhbnNpID0gbiA9PiBuO1xuXHRjb25zdCByZ2IycmdiID0gKHIsIGcsIGIpID0+IFtyLCBnLCBiXTtcblxuXHRzdHlsZXMuY29sb3IuY2xvc2UgPSAnXFx1MDAxQlszOW0nO1xuXHRzdHlsZXMuYmdDb2xvci5jbG9zZSA9ICdcXHUwMDFCWzQ5bSc7XG5cblx0c3R5bGVzLmNvbG9yLmFuc2kgPSB7XG5cdFx0YW5zaTogd3JhcEFuc2kxNihhbnNpMmFuc2ksIDApXG5cdH07XG5cdHN0eWxlcy5jb2xvci5hbnNpMjU2ID0ge1xuXHRcdGFuc2kyNTY6IHdyYXBBbnNpMjU2KGFuc2kyYW5zaSwgMClcblx0fTtcblx0c3R5bGVzLmNvbG9yLmFuc2kxNm0gPSB7XG5cdFx0cmdiOiB3cmFwQW5zaTE2bShyZ2IycmdiLCAwKVxuXHR9O1xuXG5cdHN0eWxlcy5iZ0NvbG9yLmFuc2kgPSB7XG5cdFx0YW5zaTogd3JhcEFuc2kxNihhbnNpMmFuc2ksIDEwKVxuXHR9O1xuXHRzdHlsZXMuYmdDb2xvci5hbnNpMjU2ID0ge1xuXHRcdGFuc2kyNTY6IHdyYXBBbnNpMjU2KGFuc2kyYW5zaSwgMTApXG5cdH07XG5cdHN0eWxlcy5iZ0NvbG9yLmFuc2kxNm0gPSB7XG5cdFx0cmdiOiB3cmFwQW5zaTE2bShyZ2IycmdiLCAxMClcblx0fTtcblxuXHRmb3IgKGxldCBrZXkgb2YgT2JqZWN0LmtleXMoY29sb3JDb252ZXJ0KSkge1xuXHRcdGlmICh0eXBlb2YgY29sb3JDb252ZXJ0W2tleV0gIT09ICdvYmplY3QnKSB7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHRjb25zdCBzdWl0ZSA9IGNvbG9yQ29udmVydFtrZXldO1xuXG5cdFx0aWYgKGtleSA9PT0gJ2Fuc2kxNicpIHtcblx0XHRcdGtleSA9ICdhbnNpJztcblx0XHR9XG5cblx0XHRpZiAoJ2Fuc2kxNicgaW4gc3VpdGUpIHtcblx0XHRcdHN0eWxlcy5jb2xvci5hbnNpW2tleV0gPSB3cmFwQW5zaTE2KHN1aXRlLmFuc2kxNiwgMCk7XG5cdFx0XHRzdHlsZXMuYmdDb2xvci5hbnNpW2tleV0gPSB3cmFwQW5zaTE2KHN1aXRlLmFuc2kxNiwgMTApO1xuXHRcdH1cblxuXHRcdGlmICgnYW5zaTI1NicgaW4gc3VpdGUpIHtcblx0XHRcdHN0eWxlcy5jb2xvci5hbnNpMjU2W2tleV0gPSB3cmFwQW5zaTI1NihzdWl0ZS5hbnNpMjU2LCAwKTtcblx0XHRcdHN0eWxlcy5iZ0NvbG9yLmFuc2kyNTZba2V5XSA9IHdyYXBBbnNpMjU2KHN1aXRlLmFuc2kyNTYsIDEwKTtcblx0XHR9XG5cblx0XHRpZiAoJ3JnYicgaW4gc3VpdGUpIHtcblx0XHRcdHN0eWxlcy5jb2xvci5hbnNpMTZtW2tleV0gPSB3cmFwQW5zaTE2bShzdWl0ZS5yZ2IsIDApO1xuXHRcdFx0c3R5bGVzLmJnQ29sb3IuYW5zaTE2bVtrZXldID0gd3JhcEFuc2kxNm0oc3VpdGUucmdiLCAxMCk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHN0eWxlcztcbn1cblxuLy8gTWFrZSB0aGUgZXhwb3J0IGltbXV0YWJsZVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgJ2V4cG9ydHMnLCB7XG5cdGVudW1lcmFibGU6IHRydWUsXG5cdGdldDogYXNzZW1ibGVTdHlsZXNcbn0pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0aWYgKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XG5cdFx0bW9kdWxlLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKCkge307XG5cdFx0bW9kdWxlLnBhdGhzID0gW107XG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XG5cdFx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmw7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xuXHR9XG5cdHJldHVybiBtb2R1bGU7XG59O1xuIiwidmFyIGNvbnZlcnNpb25zID0gcmVxdWlyZSgnLi9jb252ZXJzaW9ucycpO1xudmFyIHJvdXRlID0gcmVxdWlyZSgnLi9yb3V0ZScpO1xuXG52YXIgY29udmVydCA9IHt9O1xuXG52YXIgbW9kZWxzID0gT2JqZWN0LmtleXMoY29udmVyc2lvbnMpO1xuXG5mdW5jdGlvbiB3cmFwUmF3KGZuKSB7XG5cdHZhciB3cmFwcGVkRm4gPSBmdW5jdGlvbiAoYXJncykge1xuXHRcdGlmIChhcmdzID09PSB1bmRlZmluZWQgfHwgYXJncyA9PT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuIGFyZ3M7XG5cdFx0fVxuXG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG5cdFx0XHRhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZm4oYXJncyk7XG5cdH07XG5cblx0Ly8gcHJlc2VydmUgLmNvbnZlcnNpb24gcHJvcGVydHkgaWYgdGhlcmUgaXMgb25lXG5cdGlmICgnY29udmVyc2lvbicgaW4gZm4pIHtcblx0XHR3cmFwcGVkRm4uY29udmVyc2lvbiA9IGZuLmNvbnZlcnNpb247XG5cdH1cblxuXHRyZXR1cm4gd3JhcHBlZEZuO1xufVxuXG5mdW5jdGlvbiB3cmFwUm91bmRlZChmbikge1xuXHR2YXIgd3JhcHBlZEZuID0gZnVuY3Rpb24gKGFyZ3MpIHtcblx0XHRpZiAoYXJncyA9PT0gdW5kZWZpbmVkIHx8IGFyZ3MgPT09IG51bGwpIHtcblx0XHRcdHJldHVybiBhcmdzO1xuXHRcdH1cblxuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuXHRcdFx0YXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG5cdFx0fVxuXG5cdFx0dmFyIHJlc3VsdCA9IGZuKGFyZ3MpO1xuXG5cdFx0Ly8gd2UncmUgYXNzdW1pbmcgdGhlIHJlc3VsdCBpcyBhbiBhcnJheSBoZXJlLlxuXHRcdC8vIHNlZSBub3RpY2UgaW4gY29udmVyc2lvbnMuanM7IGRvbid0IHVzZSBib3ggdHlwZXNcblx0XHQvLyBpbiBjb252ZXJzaW9uIGZ1bmN0aW9ucy5cblx0XHRpZiAodHlwZW9mIHJlc3VsdCA9PT0gJ29iamVjdCcpIHtcblx0XHRcdGZvciAodmFyIGxlbiA9IHJlc3VsdC5sZW5ndGgsIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdFx0cmVzdWx0W2ldID0gTWF0aC5yb3VuZChyZXN1bHRbaV0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH07XG5cblx0Ly8gcHJlc2VydmUgLmNvbnZlcnNpb24gcHJvcGVydHkgaWYgdGhlcmUgaXMgb25lXG5cdGlmICgnY29udmVyc2lvbicgaW4gZm4pIHtcblx0XHR3cmFwcGVkRm4uY29udmVyc2lvbiA9IGZuLmNvbnZlcnNpb247XG5cdH1cblxuXHRyZXR1cm4gd3JhcHBlZEZuO1xufVxuXG5tb2RlbHMuZm9yRWFjaChmdW5jdGlvbiAoZnJvbU1vZGVsKSB7XG5cdGNvbnZlcnRbZnJvbU1vZGVsXSA9IHt9O1xuXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb252ZXJ0W2Zyb21Nb2RlbF0sICdjaGFubmVscycsIHt2YWx1ZTogY29udmVyc2lvbnNbZnJvbU1vZGVsXS5jaGFubmVsc30pO1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoY29udmVydFtmcm9tTW9kZWxdLCAnbGFiZWxzJywge3ZhbHVlOiBjb252ZXJzaW9uc1tmcm9tTW9kZWxdLmxhYmVsc30pO1xuXG5cdHZhciByb3V0ZXMgPSByb3V0ZShmcm9tTW9kZWwpO1xuXHR2YXIgcm91dGVNb2RlbHMgPSBPYmplY3Qua2V5cyhyb3V0ZXMpO1xuXG5cdHJvdXRlTW9kZWxzLmZvckVhY2goZnVuY3Rpb24gKHRvTW9kZWwpIHtcblx0XHR2YXIgZm4gPSByb3V0ZXNbdG9Nb2RlbF07XG5cblx0XHRjb252ZXJ0W2Zyb21Nb2RlbF1bdG9Nb2RlbF0gPSB3cmFwUm91bmRlZChmbik7XG5cdFx0Y29udmVydFtmcm9tTW9kZWxdW3RvTW9kZWxdLnJhdyA9IHdyYXBSYXcoZm4pO1xuXHR9KTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbnZlcnQ7XG4iLCIvKiBNSVQgbGljZW5zZSAqL1xudmFyIGNzc0tleXdvcmRzID0gcmVxdWlyZSgnY29sb3ItbmFtZScpO1xuXG4vLyBOT1RFOiBjb252ZXJzaW9ucyBzaG91bGQgb25seSByZXR1cm4gcHJpbWl0aXZlIHZhbHVlcyAoaS5lLiBhcnJheXMsIG9yXG4vLyAgICAgICB2YWx1ZXMgdGhhdCBnaXZlIGNvcnJlY3QgYHR5cGVvZmAgcmVzdWx0cykuXG4vLyAgICAgICBkbyBub3QgdXNlIGJveCB2YWx1ZXMgdHlwZXMgKGkuZS4gTnVtYmVyKCksIFN0cmluZygpLCBldGMuKVxuXG52YXIgcmV2ZXJzZUtleXdvcmRzID0ge307XG5mb3IgKHZhciBrZXkgaW4gY3NzS2V5d29yZHMpIHtcblx0aWYgKGNzc0tleXdvcmRzLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRyZXZlcnNlS2V5d29yZHNbY3NzS2V5d29yZHNba2V5XV0gPSBrZXk7XG5cdH1cbn1cblxudmFyIGNvbnZlcnQgPSBtb2R1bGUuZXhwb3J0cyA9IHtcblx0cmdiOiB7Y2hhbm5lbHM6IDMsIGxhYmVsczogJ3JnYid9LFxuXHRoc2w6IHtjaGFubmVsczogMywgbGFiZWxzOiAnaHNsJ30sXG5cdGhzdjoge2NoYW5uZWxzOiAzLCBsYWJlbHM6ICdoc3YnfSxcblx0aHdiOiB7Y2hhbm5lbHM6IDMsIGxhYmVsczogJ2h3Yid9LFxuXHRjbXlrOiB7Y2hhbm5lbHM6IDQsIGxhYmVsczogJ2NteWsnfSxcblx0eHl6OiB7Y2hhbm5lbHM6IDMsIGxhYmVsczogJ3h5eid9LFxuXHRsYWI6IHtjaGFubmVsczogMywgbGFiZWxzOiAnbGFiJ30sXG5cdGxjaDoge2NoYW5uZWxzOiAzLCBsYWJlbHM6ICdsY2gnfSxcblx0aGV4OiB7Y2hhbm5lbHM6IDEsIGxhYmVsczogWydoZXgnXX0sXG5cdGtleXdvcmQ6IHtjaGFubmVsczogMSwgbGFiZWxzOiBbJ2tleXdvcmQnXX0sXG5cdGFuc2kxNjoge2NoYW5uZWxzOiAxLCBsYWJlbHM6IFsnYW5zaTE2J119LFxuXHRhbnNpMjU2OiB7Y2hhbm5lbHM6IDEsIGxhYmVsczogWydhbnNpMjU2J119LFxuXHRoY2c6IHtjaGFubmVsczogMywgbGFiZWxzOiBbJ2gnLCAnYycsICdnJ119LFxuXHRhcHBsZToge2NoYW5uZWxzOiAzLCBsYWJlbHM6IFsncjE2JywgJ2cxNicsICdiMTYnXX0sXG5cdGdyYXk6IHtjaGFubmVsczogMSwgbGFiZWxzOiBbJ2dyYXknXX1cbn07XG5cbi8vIGhpZGUgLmNoYW5uZWxzIGFuZCAubGFiZWxzIHByb3BlcnRpZXNcbmZvciAodmFyIG1vZGVsIGluIGNvbnZlcnQpIHtcblx0aWYgKGNvbnZlcnQuaGFzT3duUHJvcGVydHkobW9kZWwpKSB7XG5cdFx0aWYgKCEoJ2NoYW5uZWxzJyBpbiBjb252ZXJ0W21vZGVsXSkpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignbWlzc2luZyBjaGFubmVscyBwcm9wZXJ0eTogJyArIG1vZGVsKTtcblx0XHR9XG5cblx0XHRpZiAoISgnbGFiZWxzJyBpbiBjb252ZXJ0W21vZGVsXSkpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignbWlzc2luZyBjaGFubmVsIGxhYmVscyBwcm9wZXJ0eTogJyArIG1vZGVsKTtcblx0XHR9XG5cblx0XHRpZiAoY29udmVydFttb2RlbF0ubGFiZWxzLmxlbmd0aCAhPT0gY29udmVydFttb2RlbF0uY2hhbm5lbHMpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignY2hhbm5lbCBhbmQgbGFiZWwgY291bnRzIG1pc21hdGNoOiAnICsgbW9kZWwpO1xuXHRcdH1cblxuXHRcdHZhciBjaGFubmVscyA9IGNvbnZlcnRbbW9kZWxdLmNoYW5uZWxzO1xuXHRcdHZhciBsYWJlbHMgPSBjb252ZXJ0W21vZGVsXS5sYWJlbHM7XG5cdFx0ZGVsZXRlIGNvbnZlcnRbbW9kZWxdLmNoYW5uZWxzO1xuXHRcdGRlbGV0ZSBjb252ZXJ0W21vZGVsXS5sYWJlbHM7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbnZlcnRbbW9kZWxdLCAnY2hhbm5lbHMnLCB7dmFsdWU6IGNoYW5uZWxzfSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbnZlcnRbbW9kZWxdLCAnbGFiZWxzJywge3ZhbHVlOiBsYWJlbHN9KTtcblx0fVxufVxuXG5jb252ZXJ0LnJnYi5oc2wgPSBmdW5jdGlvbiAocmdiKSB7XG5cdHZhciByID0gcmdiWzBdIC8gMjU1O1xuXHR2YXIgZyA9IHJnYlsxXSAvIDI1NTtcblx0dmFyIGIgPSByZ2JbMl0gLyAyNTU7XG5cdHZhciBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKTtcblx0dmFyIG1heCA9IE1hdGgubWF4KHIsIGcsIGIpO1xuXHR2YXIgZGVsdGEgPSBtYXggLSBtaW47XG5cdHZhciBoO1xuXHR2YXIgcztcblx0dmFyIGw7XG5cblx0aWYgKG1heCA9PT0gbWluKSB7XG5cdFx0aCA9IDA7XG5cdH0gZWxzZSBpZiAociA9PT0gbWF4KSB7XG5cdFx0aCA9IChnIC0gYikgLyBkZWx0YTtcblx0fSBlbHNlIGlmIChnID09PSBtYXgpIHtcblx0XHRoID0gMiArIChiIC0gcikgLyBkZWx0YTtcblx0fSBlbHNlIGlmIChiID09PSBtYXgpIHtcblx0XHRoID0gNCArIChyIC0gZykgLyBkZWx0YTtcblx0fVxuXG5cdGggPSBNYXRoLm1pbihoICogNjAsIDM2MCk7XG5cblx0aWYgKGggPCAwKSB7XG5cdFx0aCArPSAzNjA7XG5cdH1cblxuXHRsID0gKG1pbiArIG1heCkgLyAyO1xuXG5cdGlmIChtYXggPT09IG1pbikge1xuXHRcdHMgPSAwO1xuXHR9IGVsc2UgaWYgKGwgPD0gMC41KSB7XG5cdFx0cyA9IGRlbHRhIC8gKG1heCArIG1pbik7XG5cdH0gZWxzZSB7XG5cdFx0cyA9IGRlbHRhIC8gKDIgLSBtYXggLSBtaW4pO1xuXHR9XG5cblx0cmV0dXJuIFtoLCBzICogMTAwLCBsICogMTAwXTtcbn07XG5cbmNvbnZlcnQucmdiLmhzdiA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0dmFyIHJkaWY7XG5cdHZhciBnZGlmO1xuXHR2YXIgYmRpZjtcblx0dmFyIGg7XG5cdHZhciBzO1xuXG5cdHZhciByID0gcmdiWzBdIC8gMjU1O1xuXHR2YXIgZyA9IHJnYlsxXSAvIDI1NTtcblx0dmFyIGIgPSByZ2JbMl0gLyAyNTU7XG5cdHZhciB2ID0gTWF0aC5tYXgociwgZywgYik7XG5cdHZhciBkaWZmID0gdiAtIE1hdGgubWluKHIsIGcsIGIpO1xuXHR2YXIgZGlmZmMgPSBmdW5jdGlvbiAoYykge1xuXHRcdHJldHVybiAodiAtIGMpIC8gNiAvIGRpZmYgKyAxIC8gMjtcblx0fTtcblxuXHRpZiAoZGlmZiA9PT0gMCkge1xuXHRcdGggPSBzID0gMDtcblx0fSBlbHNlIHtcblx0XHRzID0gZGlmZiAvIHY7XG5cdFx0cmRpZiA9IGRpZmZjKHIpO1xuXHRcdGdkaWYgPSBkaWZmYyhnKTtcblx0XHRiZGlmID0gZGlmZmMoYik7XG5cblx0XHRpZiAociA9PT0gdikge1xuXHRcdFx0aCA9IGJkaWYgLSBnZGlmO1xuXHRcdH0gZWxzZSBpZiAoZyA9PT0gdikge1xuXHRcdFx0aCA9ICgxIC8gMykgKyByZGlmIC0gYmRpZjtcblx0XHR9IGVsc2UgaWYgKGIgPT09IHYpIHtcblx0XHRcdGggPSAoMiAvIDMpICsgZ2RpZiAtIHJkaWY7XG5cdFx0fVxuXHRcdGlmIChoIDwgMCkge1xuXHRcdFx0aCArPSAxO1xuXHRcdH0gZWxzZSBpZiAoaCA+IDEpIHtcblx0XHRcdGggLT0gMTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gW1xuXHRcdGggKiAzNjAsXG5cdFx0cyAqIDEwMCxcblx0XHR2ICogMTAwXG5cdF07XG59O1xuXG5jb252ZXJ0LnJnYi5od2IgPSBmdW5jdGlvbiAocmdiKSB7XG5cdHZhciByID0gcmdiWzBdO1xuXHR2YXIgZyA9IHJnYlsxXTtcblx0dmFyIGIgPSByZ2JbMl07XG5cdHZhciBoID0gY29udmVydC5yZ2IuaHNsKHJnYilbMF07XG5cdHZhciB3ID0gMSAvIDI1NSAqIE1hdGgubWluKHIsIE1hdGgubWluKGcsIGIpKTtcblxuXHRiID0gMSAtIDEgLyAyNTUgKiBNYXRoLm1heChyLCBNYXRoLm1heChnLCBiKSk7XG5cblx0cmV0dXJuIFtoLCB3ICogMTAwLCBiICogMTAwXTtcbn07XG5cbmNvbnZlcnQucmdiLmNteWsgPSBmdW5jdGlvbiAocmdiKSB7XG5cdHZhciByID0gcmdiWzBdIC8gMjU1O1xuXHR2YXIgZyA9IHJnYlsxXSAvIDI1NTtcblx0dmFyIGIgPSByZ2JbMl0gLyAyNTU7XG5cdHZhciBjO1xuXHR2YXIgbTtcblx0dmFyIHk7XG5cdHZhciBrO1xuXG5cdGsgPSBNYXRoLm1pbigxIC0gciwgMSAtIGcsIDEgLSBiKTtcblx0YyA9ICgxIC0gciAtIGspIC8gKDEgLSBrKSB8fCAwO1xuXHRtID0gKDEgLSBnIC0gaykgLyAoMSAtIGspIHx8IDA7XG5cdHkgPSAoMSAtIGIgLSBrKSAvICgxIC0gaykgfHwgMDtcblxuXHRyZXR1cm4gW2MgKiAxMDAsIG0gKiAxMDAsIHkgKiAxMDAsIGsgKiAxMDBdO1xufTtcblxuLyoqXG4gKiBTZWUgaHR0cHM6Ly9lbi5tLndpa2lwZWRpYS5vcmcvd2lraS9FdWNsaWRlYW5fZGlzdGFuY2UjU3F1YXJlZF9FdWNsaWRlYW5fZGlzdGFuY2VcbiAqICovXG5mdW5jdGlvbiBjb21wYXJhdGl2ZURpc3RhbmNlKHgsIHkpIHtcblx0cmV0dXJuIChcblx0XHRNYXRoLnBvdyh4WzBdIC0geVswXSwgMikgK1xuXHRcdE1hdGgucG93KHhbMV0gLSB5WzFdLCAyKSArXG5cdFx0TWF0aC5wb3coeFsyXSAtIHlbMl0sIDIpXG5cdCk7XG59XG5cbmNvbnZlcnQucmdiLmtleXdvcmQgPSBmdW5jdGlvbiAocmdiKSB7XG5cdHZhciByZXZlcnNlZCA9IHJldmVyc2VLZXl3b3Jkc1tyZ2JdO1xuXHRpZiAocmV2ZXJzZWQpIHtcblx0XHRyZXR1cm4gcmV2ZXJzZWQ7XG5cdH1cblxuXHR2YXIgY3VycmVudENsb3Nlc3REaXN0YW5jZSA9IEluZmluaXR5O1xuXHR2YXIgY3VycmVudENsb3Nlc3RLZXl3b3JkO1xuXG5cdGZvciAodmFyIGtleXdvcmQgaW4gY3NzS2V5d29yZHMpIHtcblx0XHRpZiAoY3NzS2V5d29yZHMuaGFzT3duUHJvcGVydHkoa2V5d29yZCkpIHtcblx0XHRcdHZhciB2YWx1ZSA9IGNzc0tleXdvcmRzW2tleXdvcmRdO1xuXG5cdFx0XHQvLyBDb21wdXRlIGNvbXBhcmF0aXZlIGRpc3RhbmNlXG5cdFx0XHR2YXIgZGlzdGFuY2UgPSBjb21wYXJhdGl2ZURpc3RhbmNlKHJnYiwgdmFsdWUpO1xuXG5cdFx0XHQvLyBDaGVjayBpZiBpdHMgbGVzcywgaWYgc28gc2V0IGFzIGNsb3Nlc3Rcblx0XHRcdGlmIChkaXN0YW5jZSA8IGN1cnJlbnRDbG9zZXN0RGlzdGFuY2UpIHtcblx0XHRcdFx0Y3VycmVudENsb3Nlc3REaXN0YW5jZSA9IGRpc3RhbmNlO1xuXHRcdFx0XHRjdXJyZW50Q2xvc2VzdEtleXdvcmQgPSBrZXl3b3JkO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBjdXJyZW50Q2xvc2VzdEtleXdvcmQ7XG59O1xuXG5jb252ZXJ0LmtleXdvcmQucmdiID0gZnVuY3Rpb24gKGtleXdvcmQpIHtcblx0cmV0dXJuIGNzc0tleXdvcmRzW2tleXdvcmRdO1xufTtcblxuY29udmVydC5yZ2IueHl6ID0gZnVuY3Rpb24gKHJnYikge1xuXHR2YXIgciA9IHJnYlswXSAvIDI1NTtcblx0dmFyIGcgPSByZ2JbMV0gLyAyNTU7XG5cdHZhciBiID0gcmdiWzJdIC8gMjU1O1xuXG5cdC8vIGFzc3VtZSBzUkdCXG5cdHIgPSByID4gMC4wNDA0NSA/IE1hdGgucG93KCgociArIDAuMDU1KSAvIDEuMDU1KSwgMi40KSA6IChyIC8gMTIuOTIpO1xuXHRnID0gZyA+IDAuMDQwNDUgPyBNYXRoLnBvdygoKGcgKyAwLjA1NSkgLyAxLjA1NSksIDIuNCkgOiAoZyAvIDEyLjkyKTtcblx0YiA9IGIgPiAwLjA0MDQ1ID8gTWF0aC5wb3coKChiICsgMC4wNTUpIC8gMS4wNTUpLCAyLjQpIDogKGIgLyAxMi45Mik7XG5cblx0dmFyIHggPSAociAqIDAuNDEyNCkgKyAoZyAqIDAuMzU3NikgKyAoYiAqIDAuMTgwNSk7XG5cdHZhciB5ID0gKHIgKiAwLjIxMjYpICsgKGcgKiAwLjcxNTIpICsgKGIgKiAwLjA3MjIpO1xuXHR2YXIgeiA9IChyICogMC4wMTkzKSArIChnICogMC4xMTkyKSArIChiICogMC45NTA1KTtcblxuXHRyZXR1cm4gW3ggKiAxMDAsIHkgKiAxMDAsIHogKiAxMDBdO1xufTtcblxuY29udmVydC5yZ2IubGFiID0gZnVuY3Rpb24gKHJnYikge1xuXHR2YXIgeHl6ID0gY29udmVydC5yZ2IueHl6KHJnYik7XG5cdHZhciB4ID0geHl6WzBdO1xuXHR2YXIgeSA9IHh5elsxXTtcblx0dmFyIHogPSB4eXpbMl07XG5cdHZhciBsO1xuXHR2YXIgYTtcblx0dmFyIGI7XG5cblx0eCAvPSA5NS4wNDc7XG5cdHkgLz0gMTAwO1xuXHR6IC89IDEwOC44ODM7XG5cblx0eCA9IHggPiAwLjAwODg1NiA/IE1hdGgucG93KHgsIDEgLyAzKSA6ICg3Ljc4NyAqIHgpICsgKDE2IC8gMTE2KTtcblx0eSA9IHkgPiAwLjAwODg1NiA/IE1hdGgucG93KHksIDEgLyAzKSA6ICg3Ljc4NyAqIHkpICsgKDE2IC8gMTE2KTtcblx0eiA9IHogPiAwLjAwODg1NiA/IE1hdGgucG93KHosIDEgLyAzKSA6ICg3Ljc4NyAqIHopICsgKDE2IC8gMTE2KTtcblxuXHRsID0gKDExNiAqIHkpIC0gMTY7XG5cdGEgPSA1MDAgKiAoeCAtIHkpO1xuXHRiID0gMjAwICogKHkgLSB6KTtcblxuXHRyZXR1cm4gW2wsIGEsIGJdO1xufTtcblxuY29udmVydC5oc2wucmdiID0gZnVuY3Rpb24gKGhzbCkge1xuXHR2YXIgaCA9IGhzbFswXSAvIDM2MDtcblx0dmFyIHMgPSBoc2xbMV0gLyAxMDA7XG5cdHZhciBsID0gaHNsWzJdIC8gMTAwO1xuXHR2YXIgdDE7XG5cdHZhciB0Mjtcblx0dmFyIHQzO1xuXHR2YXIgcmdiO1xuXHR2YXIgdmFsO1xuXG5cdGlmIChzID09PSAwKSB7XG5cdFx0dmFsID0gbCAqIDI1NTtcblx0XHRyZXR1cm4gW3ZhbCwgdmFsLCB2YWxdO1xuXHR9XG5cblx0aWYgKGwgPCAwLjUpIHtcblx0XHR0MiA9IGwgKiAoMSArIHMpO1xuXHR9IGVsc2Uge1xuXHRcdHQyID0gbCArIHMgLSBsICogcztcblx0fVxuXG5cdHQxID0gMiAqIGwgLSB0MjtcblxuXHRyZ2IgPSBbMCwgMCwgMF07XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgMzsgaSsrKSB7XG5cdFx0dDMgPSBoICsgMSAvIDMgKiAtKGkgLSAxKTtcblx0XHRpZiAodDMgPCAwKSB7XG5cdFx0XHR0MysrO1xuXHRcdH1cblx0XHRpZiAodDMgPiAxKSB7XG5cdFx0XHR0My0tO1xuXHRcdH1cblxuXHRcdGlmICg2ICogdDMgPCAxKSB7XG5cdFx0XHR2YWwgPSB0MSArICh0MiAtIHQxKSAqIDYgKiB0Mztcblx0XHR9IGVsc2UgaWYgKDIgKiB0MyA8IDEpIHtcblx0XHRcdHZhbCA9IHQyO1xuXHRcdH0gZWxzZSBpZiAoMyAqIHQzIDwgMikge1xuXHRcdFx0dmFsID0gdDEgKyAodDIgLSB0MSkgKiAoMiAvIDMgLSB0MykgKiA2O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YWwgPSB0MTtcblx0XHR9XG5cblx0XHRyZ2JbaV0gPSB2YWwgKiAyNTU7XG5cdH1cblxuXHRyZXR1cm4gcmdiO1xufTtcblxuY29udmVydC5oc2wuaHN2ID0gZnVuY3Rpb24gKGhzbCkge1xuXHR2YXIgaCA9IGhzbFswXTtcblx0dmFyIHMgPSBoc2xbMV0gLyAxMDA7XG5cdHZhciBsID0gaHNsWzJdIC8gMTAwO1xuXHR2YXIgc21pbiA9IHM7XG5cdHZhciBsbWluID0gTWF0aC5tYXgobCwgMC4wMSk7XG5cdHZhciBzdjtcblx0dmFyIHY7XG5cblx0bCAqPSAyO1xuXHRzICo9IChsIDw9IDEpID8gbCA6IDIgLSBsO1xuXHRzbWluICo9IGxtaW4gPD0gMSA/IGxtaW4gOiAyIC0gbG1pbjtcblx0diA9IChsICsgcykgLyAyO1xuXHRzdiA9IGwgPT09IDAgPyAoMiAqIHNtaW4pIC8gKGxtaW4gKyBzbWluKSA6ICgyICogcykgLyAobCArIHMpO1xuXG5cdHJldHVybiBbaCwgc3YgKiAxMDAsIHYgKiAxMDBdO1xufTtcblxuY29udmVydC5oc3YucmdiID0gZnVuY3Rpb24gKGhzdikge1xuXHR2YXIgaCA9IGhzdlswXSAvIDYwO1xuXHR2YXIgcyA9IGhzdlsxXSAvIDEwMDtcblx0dmFyIHYgPSBoc3ZbMl0gLyAxMDA7XG5cdHZhciBoaSA9IE1hdGguZmxvb3IoaCkgJSA2O1xuXG5cdHZhciBmID0gaCAtIE1hdGguZmxvb3IoaCk7XG5cdHZhciBwID0gMjU1ICogdiAqICgxIC0gcyk7XG5cdHZhciBxID0gMjU1ICogdiAqICgxIC0gKHMgKiBmKSk7XG5cdHZhciB0ID0gMjU1ICogdiAqICgxIC0gKHMgKiAoMSAtIGYpKSk7XG5cdHYgKj0gMjU1O1xuXG5cdHN3aXRjaCAoaGkpIHtcblx0XHRjYXNlIDA6XG5cdFx0XHRyZXR1cm4gW3YsIHQsIHBdO1xuXHRcdGNhc2UgMTpcblx0XHRcdHJldHVybiBbcSwgdiwgcF07XG5cdFx0Y2FzZSAyOlxuXHRcdFx0cmV0dXJuIFtwLCB2LCB0XTtcblx0XHRjYXNlIDM6XG5cdFx0XHRyZXR1cm4gW3AsIHEsIHZdO1xuXHRcdGNhc2UgNDpcblx0XHRcdHJldHVybiBbdCwgcCwgdl07XG5cdFx0Y2FzZSA1OlxuXHRcdFx0cmV0dXJuIFt2LCBwLCBxXTtcblx0fVxufTtcblxuY29udmVydC5oc3YuaHNsID0gZnVuY3Rpb24gKGhzdikge1xuXHR2YXIgaCA9IGhzdlswXTtcblx0dmFyIHMgPSBoc3ZbMV0gLyAxMDA7XG5cdHZhciB2ID0gaHN2WzJdIC8gMTAwO1xuXHR2YXIgdm1pbiA9IE1hdGgubWF4KHYsIDAuMDEpO1xuXHR2YXIgbG1pbjtcblx0dmFyIHNsO1xuXHR2YXIgbDtcblxuXHRsID0gKDIgLSBzKSAqIHY7XG5cdGxtaW4gPSAoMiAtIHMpICogdm1pbjtcblx0c2wgPSBzICogdm1pbjtcblx0c2wgLz0gKGxtaW4gPD0gMSkgPyBsbWluIDogMiAtIGxtaW47XG5cdHNsID0gc2wgfHwgMDtcblx0bCAvPSAyO1xuXG5cdHJldHVybiBbaCwgc2wgKiAxMDAsIGwgKiAxMDBdO1xufTtcblxuLy8gaHR0cDovL2Rldi53My5vcmcvY3Nzd2cvY3NzLWNvbG9yLyNod2ItdG8tcmdiXG5jb252ZXJ0Lmh3Yi5yZ2IgPSBmdW5jdGlvbiAoaHdiKSB7XG5cdHZhciBoID0gaHdiWzBdIC8gMzYwO1xuXHR2YXIgd2ggPSBod2JbMV0gLyAxMDA7XG5cdHZhciBibCA9IGh3YlsyXSAvIDEwMDtcblx0dmFyIHJhdGlvID0gd2ggKyBibDtcblx0dmFyIGk7XG5cdHZhciB2O1xuXHR2YXIgZjtcblx0dmFyIG47XG5cblx0Ly8gd2ggKyBibCBjYW50IGJlID4gMVxuXHRpZiAocmF0aW8gPiAxKSB7XG5cdFx0d2ggLz0gcmF0aW87XG5cdFx0YmwgLz0gcmF0aW87XG5cdH1cblxuXHRpID0gTWF0aC5mbG9vcig2ICogaCk7XG5cdHYgPSAxIC0gYmw7XG5cdGYgPSA2ICogaCAtIGk7XG5cblx0aWYgKChpICYgMHgwMSkgIT09IDApIHtcblx0XHRmID0gMSAtIGY7XG5cdH1cblxuXHRuID0gd2ggKyBmICogKHYgLSB3aCk7IC8vIGxpbmVhciBpbnRlcnBvbGF0aW9uXG5cblx0dmFyIHI7XG5cdHZhciBnO1xuXHR2YXIgYjtcblx0c3dpdGNoIChpKSB7XG5cdFx0ZGVmYXVsdDpcblx0XHRjYXNlIDY6XG5cdFx0Y2FzZSAwOiByID0gdjsgZyA9IG47IGIgPSB3aDsgYnJlYWs7XG5cdFx0Y2FzZSAxOiByID0gbjsgZyA9IHY7IGIgPSB3aDsgYnJlYWs7XG5cdFx0Y2FzZSAyOiByID0gd2g7IGcgPSB2OyBiID0gbjsgYnJlYWs7XG5cdFx0Y2FzZSAzOiByID0gd2g7IGcgPSBuOyBiID0gdjsgYnJlYWs7XG5cdFx0Y2FzZSA0OiByID0gbjsgZyA9IHdoOyBiID0gdjsgYnJlYWs7XG5cdFx0Y2FzZSA1OiByID0gdjsgZyA9IHdoOyBiID0gbjsgYnJlYWs7XG5cdH1cblxuXHRyZXR1cm4gW3IgKiAyNTUsIGcgKiAyNTUsIGIgKiAyNTVdO1xufTtcblxuY29udmVydC5jbXlrLnJnYiA9IGZ1bmN0aW9uIChjbXlrKSB7XG5cdHZhciBjID0gY215a1swXSAvIDEwMDtcblx0dmFyIG0gPSBjbXlrWzFdIC8gMTAwO1xuXHR2YXIgeSA9IGNteWtbMl0gLyAxMDA7XG5cdHZhciBrID0gY215a1szXSAvIDEwMDtcblx0dmFyIHI7XG5cdHZhciBnO1xuXHR2YXIgYjtcblxuXHRyID0gMSAtIE1hdGgubWluKDEsIGMgKiAoMSAtIGspICsgayk7XG5cdGcgPSAxIC0gTWF0aC5taW4oMSwgbSAqICgxIC0gaykgKyBrKTtcblx0YiA9IDEgLSBNYXRoLm1pbigxLCB5ICogKDEgLSBrKSArIGspO1xuXG5cdHJldHVybiBbciAqIDI1NSwgZyAqIDI1NSwgYiAqIDI1NV07XG59O1xuXG5jb252ZXJ0Lnh5ei5yZ2IgPSBmdW5jdGlvbiAoeHl6KSB7XG5cdHZhciB4ID0geHl6WzBdIC8gMTAwO1xuXHR2YXIgeSA9IHh5elsxXSAvIDEwMDtcblx0dmFyIHogPSB4eXpbMl0gLyAxMDA7XG5cdHZhciByO1xuXHR2YXIgZztcblx0dmFyIGI7XG5cblx0ciA9ICh4ICogMy4yNDA2KSArICh5ICogLTEuNTM3MikgKyAoeiAqIC0wLjQ5ODYpO1xuXHRnID0gKHggKiAtMC45Njg5KSArICh5ICogMS44NzU4KSArICh6ICogMC4wNDE1KTtcblx0YiA9ICh4ICogMC4wNTU3KSArICh5ICogLTAuMjA0MCkgKyAoeiAqIDEuMDU3MCk7XG5cblx0Ly8gYXNzdW1lIHNSR0Jcblx0ciA9IHIgPiAwLjAwMzEzMDhcblx0XHQ/ICgoMS4wNTUgKiBNYXRoLnBvdyhyLCAxLjAgLyAyLjQpKSAtIDAuMDU1KVxuXHRcdDogciAqIDEyLjkyO1xuXG5cdGcgPSBnID4gMC4wMDMxMzA4XG5cdFx0PyAoKDEuMDU1ICogTWF0aC5wb3coZywgMS4wIC8gMi40KSkgLSAwLjA1NSlcblx0XHQ6IGcgKiAxMi45MjtcblxuXHRiID0gYiA+IDAuMDAzMTMwOFxuXHRcdD8gKCgxLjA1NSAqIE1hdGgucG93KGIsIDEuMCAvIDIuNCkpIC0gMC4wNTUpXG5cdFx0OiBiICogMTIuOTI7XG5cblx0ciA9IE1hdGgubWluKE1hdGgubWF4KDAsIHIpLCAxKTtcblx0ZyA9IE1hdGgubWluKE1hdGgubWF4KDAsIGcpLCAxKTtcblx0YiA9IE1hdGgubWluKE1hdGgubWF4KDAsIGIpLCAxKTtcblxuXHRyZXR1cm4gW3IgKiAyNTUsIGcgKiAyNTUsIGIgKiAyNTVdO1xufTtcblxuY29udmVydC54eXoubGFiID0gZnVuY3Rpb24gKHh5eikge1xuXHR2YXIgeCA9IHh5elswXTtcblx0dmFyIHkgPSB4eXpbMV07XG5cdHZhciB6ID0geHl6WzJdO1xuXHR2YXIgbDtcblx0dmFyIGE7XG5cdHZhciBiO1xuXG5cdHggLz0gOTUuMDQ3O1xuXHR5IC89IDEwMDtcblx0eiAvPSAxMDguODgzO1xuXG5cdHggPSB4ID4gMC4wMDg4NTYgPyBNYXRoLnBvdyh4LCAxIC8gMykgOiAoNy43ODcgKiB4KSArICgxNiAvIDExNik7XG5cdHkgPSB5ID4gMC4wMDg4NTYgPyBNYXRoLnBvdyh5LCAxIC8gMykgOiAoNy43ODcgKiB5KSArICgxNiAvIDExNik7XG5cdHogPSB6ID4gMC4wMDg4NTYgPyBNYXRoLnBvdyh6LCAxIC8gMykgOiAoNy43ODcgKiB6KSArICgxNiAvIDExNik7XG5cblx0bCA9ICgxMTYgKiB5KSAtIDE2O1xuXHRhID0gNTAwICogKHggLSB5KTtcblx0YiA9IDIwMCAqICh5IC0geik7XG5cblx0cmV0dXJuIFtsLCBhLCBiXTtcbn07XG5cbmNvbnZlcnQubGFiLnh5eiA9IGZ1bmN0aW9uIChsYWIpIHtcblx0dmFyIGwgPSBsYWJbMF07XG5cdHZhciBhID0gbGFiWzFdO1xuXHR2YXIgYiA9IGxhYlsyXTtcblx0dmFyIHg7XG5cdHZhciB5O1xuXHR2YXIgejtcblxuXHR5ID0gKGwgKyAxNikgLyAxMTY7XG5cdHggPSBhIC8gNTAwICsgeTtcblx0eiA9IHkgLSBiIC8gMjAwO1xuXG5cdHZhciB5MiA9IE1hdGgucG93KHksIDMpO1xuXHR2YXIgeDIgPSBNYXRoLnBvdyh4LCAzKTtcblx0dmFyIHoyID0gTWF0aC5wb3coeiwgMyk7XG5cdHkgPSB5MiA+IDAuMDA4ODU2ID8geTIgOiAoeSAtIDE2IC8gMTE2KSAvIDcuNzg3O1xuXHR4ID0geDIgPiAwLjAwODg1NiA/IHgyIDogKHggLSAxNiAvIDExNikgLyA3Ljc4Nztcblx0eiA9IHoyID4gMC4wMDg4NTYgPyB6MiA6ICh6IC0gMTYgLyAxMTYpIC8gNy43ODc7XG5cblx0eCAqPSA5NS4wNDc7XG5cdHkgKj0gMTAwO1xuXHR6ICo9IDEwOC44ODM7XG5cblx0cmV0dXJuIFt4LCB5LCB6XTtcbn07XG5cbmNvbnZlcnQubGFiLmxjaCA9IGZ1bmN0aW9uIChsYWIpIHtcblx0dmFyIGwgPSBsYWJbMF07XG5cdHZhciBhID0gbGFiWzFdO1xuXHR2YXIgYiA9IGxhYlsyXTtcblx0dmFyIGhyO1xuXHR2YXIgaDtcblx0dmFyIGM7XG5cblx0aHIgPSBNYXRoLmF0YW4yKGIsIGEpO1xuXHRoID0gaHIgKiAzNjAgLyAyIC8gTWF0aC5QSTtcblxuXHRpZiAoaCA8IDApIHtcblx0XHRoICs9IDM2MDtcblx0fVxuXG5cdGMgPSBNYXRoLnNxcnQoYSAqIGEgKyBiICogYik7XG5cblx0cmV0dXJuIFtsLCBjLCBoXTtcbn07XG5cbmNvbnZlcnQubGNoLmxhYiA9IGZ1bmN0aW9uIChsY2gpIHtcblx0dmFyIGwgPSBsY2hbMF07XG5cdHZhciBjID0gbGNoWzFdO1xuXHR2YXIgaCA9IGxjaFsyXTtcblx0dmFyIGE7XG5cdHZhciBiO1xuXHR2YXIgaHI7XG5cblx0aHIgPSBoIC8gMzYwICogMiAqIE1hdGguUEk7XG5cdGEgPSBjICogTWF0aC5jb3MoaHIpO1xuXHRiID0gYyAqIE1hdGguc2luKGhyKTtcblxuXHRyZXR1cm4gW2wsIGEsIGJdO1xufTtcblxuY29udmVydC5yZ2IuYW5zaTE2ID0gZnVuY3Rpb24gKGFyZ3MpIHtcblx0dmFyIHIgPSBhcmdzWzBdO1xuXHR2YXIgZyA9IGFyZ3NbMV07XG5cdHZhciBiID0gYXJnc1syXTtcblx0dmFyIHZhbHVlID0gMSBpbiBhcmd1bWVudHMgPyBhcmd1bWVudHNbMV0gOiBjb252ZXJ0LnJnYi5oc3YoYXJncylbMl07IC8vIGhzdiAtPiBhbnNpMTYgb3B0aW1pemF0aW9uXG5cblx0dmFsdWUgPSBNYXRoLnJvdW5kKHZhbHVlIC8gNTApO1xuXG5cdGlmICh2YWx1ZSA9PT0gMCkge1xuXHRcdHJldHVybiAzMDtcblx0fVxuXG5cdHZhciBhbnNpID0gMzBcblx0XHQrICgoTWF0aC5yb3VuZChiIC8gMjU1KSA8PCAyKVxuXHRcdHwgKE1hdGgucm91bmQoZyAvIDI1NSkgPDwgMSlcblx0XHR8IE1hdGgucm91bmQociAvIDI1NSkpO1xuXG5cdGlmICh2YWx1ZSA9PT0gMikge1xuXHRcdGFuc2kgKz0gNjA7XG5cdH1cblxuXHRyZXR1cm4gYW5zaTtcbn07XG5cbmNvbnZlcnQuaHN2LmFuc2kxNiA9IGZ1bmN0aW9uIChhcmdzKSB7XG5cdC8vIG9wdGltaXphdGlvbiBoZXJlOyB3ZSBhbHJlYWR5IGtub3cgdGhlIHZhbHVlIGFuZCBkb24ndCBuZWVkIHRvIGdldFxuXHQvLyBpdCBjb252ZXJ0ZWQgZm9yIHVzLlxuXHRyZXR1cm4gY29udmVydC5yZ2IuYW5zaTE2KGNvbnZlcnQuaHN2LnJnYihhcmdzKSwgYXJnc1syXSk7XG59O1xuXG5jb252ZXJ0LnJnYi5hbnNpMjU2ID0gZnVuY3Rpb24gKGFyZ3MpIHtcblx0dmFyIHIgPSBhcmdzWzBdO1xuXHR2YXIgZyA9IGFyZ3NbMV07XG5cdHZhciBiID0gYXJnc1syXTtcblxuXHQvLyB3ZSB1c2UgdGhlIGV4dGVuZGVkIGdyZXlzY2FsZSBwYWxldHRlIGhlcmUsIHdpdGggdGhlIGV4Y2VwdGlvbiBvZlxuXHQvLyBibGFjayBhbmQgd2hpdGUuIG5vcm1hbCBwYWxldHRlIG9ubHkgaGFzIDQgZ3JleXNjYWxlIHNoYWRlcy5cblx0aWYgKHIgPT09IGcgJiYgZyA9PT0gYikge1xuXHRcdGlmIChyIDwgOCkge1xuXHRcdFx0cmV0dXJuIDE2O1xuXHRcdH1cblxuXHRcdGlmIChyID4gMjQ4KSB7XG5cdFx0XHRyZXR1cm4gMjMxO1xuXHRcdH1cblxuXHRcdHJldHVybiBNYXRoLnJvdW5kKCgociAtIDgpIC8gMjQ3KSAqIDI0KSArIDIzMjtcblx0fVxuXG5cdHZhciBhbnNpID0gMTZcblx0XHQrICgzNiAqIE1hdGgucm91bmQociAvIDI1NSAqIDUpKVxuXHRcdCsgKDYgKiBNYXRoLnJvdW5kKGcgLyAyNTUgKiA1KSlcblx0XHQrIE1hdGgucm91bmQoYiAvIDI1NSAqIDUpO1xuXG5cdHJldHVybiBhbnNpO1xufTtcblxuY29udmVydC5hbnNpMTYucmdiID0gZnVuY3Rpb24gKGFyZ3MpIHtcblx0dmFyIGNvbG9yID0gYXJncyAlIDEwO1xuXG5cdC8vIGhhbmRsZSBncmV5c2NhbGVcblx0aWYgKGNvbG9yID09PSAwIHx8IGNvbG9yID09PSA3KSB7XG5cdFx0aWYgKGFyZ3MgPiA1MCkge1xuXHRcdFx0Y29sb3IgKz0gMy41O1xuXHRcdH1cblxuXHRcdGNvbG9yID0gY29sb3IgLyAxMC41ICogMjU1O1xuXG5cdFx0cmV0dXJuIFtjb2xvciwgY29sb3IsIGNvbG9yXTtcblx0fVxuXG5cdHZhciBtdWx0ID0gKH5+KGFyZ3MgPiA1MCkgKyAxKSAqIDAuNTtcblx0dmFyIHIgPSAoKGNvbG9yICYgMSkgKiBtdWx0KSAqIDI1NTtcblx0dmFyIGcgPSAoKChjb2xvciA+PiAxKSAmIDEpICogbXVsdCkgKiAyNTU7XG5cdHZhciBiID0gKCgoY29sb3IgPj4gMikgJiAxKSAqIG11bHQpICogMjU1O1xuXG5cdHJldHVybiBbciwgZywgYl07XG59O1xuXG5jb252ZXJ0LmFuc2kyNTYucmdiID0gZnVuY3Rpb24gKGFyZ3MpIHtcblx0Ly8gaGFuZGxlIGdyZXlzY2FsZVxuXHRpZiAoYXJncyA+PSAyMzIpIHtcblx0XHR2YXIgYyA9IChhcmdzIC0gMjMyKSAqIDEwICsgODtcblx0XHRyZXR1cm4gW2MsIGMsIGNdO1xuXHR9XG5cblx0YXJncyAtPSAxNjtcblxuXHR2YXIgcmVtO1xuXHR2YXIgciA9IE1hdGguZmxvb3IoYXJncyAvIDM2KSAvIDUgKiAyNTU7XG5cdHZhciBnID0gTWF0aC5mbG9vcigocmVtID0gYXJncyAlIDM2KSAvIDYpIC8gNSAqIDI1NTtcblx0dmFyIGIgPSAocmVtICUgNikgLyA1ICogMjU1O1xuXG5cdHJldHVybiBbciwgZywgYl07XG59O1xuXG5jb252ZXJ0LnJnYi5oZXggPSBmdW5jdGlvbiAoYXJncykge1xuXHR2YXIgaW50ZWdlciA9ICgoTWF0aC5yb3VuZChhcmdzWzBdKSAmIDB4RkYpIDw8IDE2KVxuXHRcdCsgKChNYXRoLnJvdW5kKGFyZ3NbMV0pICYgMHhGRikgPDwgOClcblx0XHQrIChNYXRoLnJvdW5kKGFyZ3NbMl0pICYgMHhGRik7XG5cblx0dmFyIHN0cmluZyA9IGludGVnZXIudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7XG5cdHJldHVybiAnMDAwMDAwJy5zdWJzdHJpbmcoc3RyaW5nLmxlbmd0aCkgKyBzdHJpbmc7XG59O1xuXG5jb252ZXJ0LmhleC5yZ2IgPSBmdW5jdGlvbiAoYXJncykge1xuXHR2YXIgbWF0Y2ggPSBhcmdzLnRvU3RyaW5nKDE2KS5tYXRjaCgvW2EtZjAtOV17Nn18W2EtZjAtOV17M30vaSk7XG5cdGlmICghbWF0Y2gpIHtcblx0XHRyZXR1cm4gWzAsIDAsIDBdO1xuXHR9XG5cblx0dmFyIGNvbG9yU3RyaW5nID0gbWF0Y2hbMF07XG5cblx0aWYgKG1hdGNoWzBdLmxlbmd0aCA9PT0gMykge1xuXHRcdGNvbG9yU3RyaW5nID0gY29sb3JTdHJpbmcuc3BsaXQoJycpLm1hcChmdW5jdGlvbiAoY2hhcikge1xuXHRcdFx0cmV0dXJuIGNoYXIgKyBjaGFyO1xuXHRcdH0pLmpvaW4oJycpO1xuXHR9XG5cblx0dmFyIGludGVnZXIgPSBwYXJzZUludChjb2xvclN0cmluZywgMTYpO1xuXHR2YXIgciA9IChpbnRlZ2VyID4+IDE2KSAmIDB4RkY7XG5cdHZhciBnID0gKGludGVnZXIgPj4gOCkgJiAweEZGO1xuXHR2YXIgYiA9IGludGVnZXIgJiAweEZGO1xuXG5cdHJldHVybiBbciwgZywgYl07XG59O1xuXG5jb252ZXJ0LnJnYi5oY2cgPSBmdW5jdGlvbiAocmdiKSB7XG5cdHZhciByID0gcmdiWzBdIC8gMjU1O1xuXHR2YXIgZyA9IHJnYlsxXSAvIDI1NTtcblx0dmFyIGIgPSByZ2JbMl0gLyAyNTU7XG5cdHZhciBtYXggPSBNYXRoLm1heChNYXRoLm1heChyLCBnKSwgYik7XG5cdHZhciBtaW4gPSBNYXRoLm1pbihNYXRoLm1pbihyLCBnKSwgYik7XG5cdHZhciBjaHJvbWEgPSAobWF4IC0gbWluKTtcblx0dmFyIGdyYXlzY2FsZTtcblx0dmFyIGh1ZTtcblxuXHRpZiAoY2hyb21hIDwgMSkge1xuXHRcdGdyYXlzY2FsZSA9IG1pbiAvICgxIC0gY2hyb21hKTtcblx0fSBlbHNlIHtcblx0XHRncmF5c2NhbGUgPSAwO1xuXHR9XG5cblx0aWYgKGNocm9tYSA8PSAwKSB7XG5cdFx0aHVlID0gMDtcblx0fSBlbHNlXG5cdGlmIChtYXggPT09IHIpIHtcblx0XHRodWUgPSAoKGcgLSBiKSAvIGNocm9tYSkgJSA2O1xuXHR9IGVsc2Vcblx0aWYgKG1heCA9PT0gZykge1xuXHRcdGh1ZSA9IDIgKyAoYiAtIHIpIC8gY2hyb21hO1xuXHR9IGVsc2Uge1xuXHRcdGh1ZSA9IDQgKyAociAtIGcpIC8gY2hyb21hICsgNDtcblx0fVxuXG5cdGh1ZSAvPSA2O1xuXHRodWUgJT0gMTtcblxuXHRyZXR1cm4gW2h1ZSAqIDM2MCwgY2hyb21hICogMTAwLCBncmF5c2NhbGUgKiAxMDBdO1xufTtcblxuY29udmVydC5oc2wuaGNnID0gZnVuY3Rpb24gKGhzbCkge1xuXHR2YXIgcyA9IGhzbFsxXSAvIDEwMDtcblx0dmFyIGwgPSBoc2xbMl0gLyAxMDA7XG5cdHZhciBjID0gMTtcblx0dmFyIGYgPSAwO1xuXG5cdGlmIChsIDwgMC41KSB7XG5cdFx0YyA9IDIuMCAqIHMgKiBsO1xuXHR9IGVsc2Uge1xuXHRcdGMgPSAyLjAgKiBzICogKDEuMCAtIGwpO1xuXHR9XG5cblx0aWYgKGMgPCAxLjApIHtcblx0XHRmID0gKGwgLSAwLjUgKiBjKSAvICgxLjAgLSBjKTtcblx0fVxuXG5cdHJldHVybiBbaHNsWzBdLCBjICogMTAwLCBmICogMTAwXTtcbn07XG5cbmNvbnZlcnQuaHN2LmhjZyA9IGZ1bmN0aW9uIChoc3YpIHtcblx0dmFyIHMgPSBoc3ZbMV0gLyAxMDA7XG5cdHZhciB2ID0gaHN2WzJdIC8gMTAwO1xuXG5cdHZhciBjID0gcyAqIHY7XG5cdHZhciBmID0gMDtcblxuXHRpZiAoYyA8IDEuMCkge1xuXHRcdGYgPSAodiAtIGMpIC8gKDEgLSBjKTtcblx0fVxuXG5cdHJldHVybiBbaHN2WzBdLCBjICogMTAwLCBmICogMTAwXTtcbn07XG5cbmNvbnZlcnQuaGNnLnJnYiA9IGZ1bmN0aW9uIChoY2cpIHtcblx0dmFyIGggPSBoY2dbMF0gLyAzNjA7XG5cdHZhciBjID0gaGNnWzFdIC8gMTAwO1xuXHR2YXIgZyA9IGhjZ1syXSAvIDEwMDtcblxuXHRpZiAoYyA9PT0gMC4wKSB7XG5cdFx0cmV0dXJuIFtnICogMjU1LCBnICogMjU1LCBnICogMjU1XTtcblx0fVxuXG5cdHZhciBwdXJlID0gWzAsIDAsIDBdO1xuXHR2YXIgaGkgPSAoaCAlIDEpICogNjtcblx0dmFyIHYgPSBoaSAlIDE7XG5cdHZhciB3ID0gMSAtIHY7XG5cdHZhciBtZyA9IDA7XG5cblx0c3dpdGNoIChNYXRoLmZsb29yKGhpKSkge1xuXHRcdGNhc2UgMDpcblx0XHRcdHB1cmVbMF0gPSAxOyBwdXJlWzFdID0gdjsgcHVyZVsyXSA9IDA7IGJyZWFrO1xuXHRcdGNhc2UgMTpcblx0XHRcdHB1cmVbMF0gPSB3OyBwdXJlWzFdID0gMTsgcHVyZVsyXSA9IDA7IGJyZWFrO1xuXHRcdGNhc2UgMjpcblx0XHRcdHB1cmVbMF0gPSAwOyBwdXJlWzFdID0gMTsgcHVyZVsyXSA9IHY7IGJyZWFrO1xuXHRcdGNhc2UgMzpcblx0XHRcdHB1cmVbMF0gPSAwOyBwdXJlWzFdID0gdzsgcHVyZVsyXSA9IDE7IGJyZWFrO1xuXHRcdGNhc2UgNDpcblx0XHRcdHB1cmVbMF0gPSB2OyBwdXJlWzFdID0gMDsgcHVyZVsyXSA9IDE7IGJyZWFrO1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHRwdXJlWzBdID0gMTsgcHVyZVsxXSA9IDA7IHB1cmVbMl0gPSB3O1xuXHR9XG5cblx0bWcgPSAoMS4wIC0gYykgKiBnO1xuXG5cdHJldHVybiBbXG5cdFx0KGMgKiBwdXJlWzBdICsgbWcpICogMjU1LFxuXHRcdChjICogcHVyZVsxXSArIG1nKSAqIDI1NSxcblx0XHQoYyAqIHB1cmVbMl0gKyBtZykgKiAyNTVcblx0XTtcbn07XG5cbmNvbnZlcnQuaGNnLmhzdiA9IGZ1bmN0aW9uIChoY2cpIHtcblx0dmFyIGMgPSBoY2dbMV0gLyAxMDA7XG5cdHZhciBnID0gaGNnWzJdIC8gMTAwO1xuXG5cdHZhciB2ID0gYyArIGcgKiAoMS4wIC0gYyk7XG5cdHZhciBmID0gMDtcblxuXHRpZiAodiA+IDAuMCkge1xuXHRcdGYgPSBjIC8gdjtcblx0fVxuXG5cdHJldHVybiBbaGNnWzBdLCBmICogMTAwLCB2ICogMTAwXTtcbn07XG5cbmNvbnZlcnQuaGNnLmhzbCA9IGZ1bmN0aW9uIChoY2cpIHtcblx0dmFyIGMgPSBoY2dbMV0gLyAxMDA7XG5cdHZhciBnID0gaGNnWzJdIC8gMTAwO1xuXG5cdHZhciBsID0gZyAqICgxLjAgLSBjKSArIDAuNSAqIGM7XG5cdHZhciBzID0gMDtcblxuXHRpZiAobCA+IDAuMCAmJiBsIDwgMC41KSB7XG5cdFx0cyA9IGMgLyAoMiAqIGwpO1xuXHR9IGVsc2Vcblx0aWYgKGwgPj0gMC41ICYmIGwgPCAxLjApIHtcblx0XHRzID0gYyAvICgyICogKDEgLSBsKSk7XG5cdH1cblxuXHRyZXR1cm4gW2hjZ1swXSwgcyAqIDEwMCwgbCAqIDEwMF07XG59O1xuXG5jb252ZXJ0LmhjZy5od2IgPSBmdW5jdGlvbiAoaGNnKSB7XG5cdHZhciBjID0gaGNnWzFdIC8gMTAwO1xuXHR2YXIgZyA9IGhjZ1syXSAvIDEwMDtcblx0dmFyIHYgPSBjICsgZyAqICgxLjAgLSBjKTtcblx0cmV0dXJuIFtoY2dbMF0sICh2IC0gYykgKiAxMDAsICgxIC0gdikgKiAxMDBdO1xufTtcblxuY29udmVydC5od2IuaGNnID0gZnVuY3Rpb24gKGh3Yikge1xuXHR2YXIgdyA9IGh3YlsxXSAvIDEwMDtcblx0dmFyIGIgPSBod2JbMl0gLyAxMDA7XG5cdHZhciB2ID0gMSAtIGI7XG5cdHZhciBjID0gdiAtIHc7XG5cdHZhciBnID0gMDtcblxuXHRpZiAoYyA8IDEpIHtcblx0XHRnID0gKHYgLSBjKSAvICgxIC0gYyk7XG5cdH1cblxuXHRyZXR1cm4gW2h3YlswXSwgYyAqIDEwMCwgZyAqIDEwMF07XG59O1xuXG5jb252ZXJ0LmFwcGxlLnJnYiA9IGZ1bmN0aW9uIChhcHBsZSkge1xuXHRyZXR1cm4gWyhhcHBsZVswXSAvIDY1NTM1KSAqIDI1NSwgKGFwcGxlWzFdIC8gNjU1MzUpICogMjU1LCAoYXBwbGVbMl0gLyA2NTUzNSkgKiAyNTVdO1xufTtcblxuY29udmVydC5yZ2IuYXBwbGUgPSBmdW5jdGlvbiAocmdiKSB7XG5cdHJldHVybiBbKHJnYlswXSAvIDI1NSkgKiA2NTUzNSwgKHJnYlsxXSAvIDI1NSkgKiA2NTUzNSwgKHJnYlsyXSAvIDI1NSkgKiA2NTUzNV07XG59O1xuXG5jb252ZXJ0LmdyYXkucmdiID0gZnVuY3Rpb24gKGFyZ3MpIHtcblx0cmV0dXJuIFthcmdzWzBdIC8gMTAwICogMjU1LCBhcmdzWzBdIC8gMTAwICogMjU1LCBhcmdzWzBdIC8gMTAwICogMjU1XTtcbn07XG5cbmNvbnZlcnQuZ3JheS5oc2wgPSBjb252ZXJ0LmdyYXkuaHN2ID0gZnVuY3Rpb24gKGFyZ3MpIHtcblx0cmV0dXJuIFswLCAwLCBhcmdzWzBdXTtcbn07XG5cbmNvbnZlcnQuZ3JheS5od2IgPSBmdW5jdGlvbiAoZ3JheSkge1xuXHRyZXR1cm4gWzAsIDEwMCwgZ3JheVswXV07XG59O1xuXG5jb252ZXJ0LmdyYXkuY215ayA9IGZ1bmN0aW9uIChncmF5KSB7XG5cdHJldHVybiBbMCwgMCwgMCwgZ3JheVswXV07XG59O1xuXG5jb252ZXJ0LmdyYXkubGFiID0gZnVuY3Rpb24gKGdyYXkpIHtcblx0cmV0dXJuIFtncmF5WzBdLCAwLCAwXTtcbn07XG5cbmNvbnZlcnQuZ3JheS5oZXggPSBmdW5jdGlvbiAoZ3JheSkge1xuXHR2YXIgdmFsID0gTWF0aC5yb3VuZChncmF5WzBdIC8gMTAwICogMjU1KSAmIDB4RkY7XG5cdHZhciBpbnRlZ2VyID0gKHZhbCA8PCAxNikgKyAodmFsIDw8IDgpICsgdmFsO1xuXG5cdHZhciBzdHJpbmcgPSBpbnRlZ2VyLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpO1xuXHRyZXR1cm4gJzAwMDAwMCcuc3Vic3RyaW5nKHN0cmluZy5sZW5ndGgpICsgc3RyaW5nO1xufTtcblxuY29udmVydC5yZ2IuZ3JheSA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0dmFyIHZhbCA9IChyZ2JbMF0gKyByZ2JbMV0gKyByZ2JbMl0pIC8gMztcblx0cmV0dXJuIFt2YWwgLyAyNTUgKiAxMDBdO1xufTtcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0XCJhbGljZWJsdWVcIjogWzI0MCwgMjQ4LCAyNTVdLFxyXG5cdFwiYW50aXF1ZXdoaXRlXCI6IFsyNTAsIDIzNSwgMjE1XSxcclxuXHRcImFxdWFcIjogWzAsIDI1NSwgMjU1XSxcclxuXHRcImFxdWFtYXJpbmVcIjogWzEyNywgMjU1LCAyMTJdLFxyXG5cdFwiYXp1cmVcIjogWzI0MCwgMjU1LCAyNTVdLFxyXG5cdFwiYmVpZ2VcIjogWzI0NSwgMjQ1LCAyMjBdLFxyXG5cdFwiYmlzcXVlXCI6IFsyNTUsIDIyOCwgMTk2XSxcclxuXHRcImJsYWNrXCI6IFswLCAwLCAwXSxcclxuXHRcImJsYW5jaGVkYWxtb25kXCI6IFsyNTUsIDIzNSwgMjA1XSxcclxuXHRcImJsdWVcIjogWzAsIDAsIDI1NV0sXHJcblx0XCJibHVldmlvbGV0XCI6IFsxMzgsIDQzLCAyMjZdLFxyXG5cdFwiYnJvd25cIjogWzE2NSwgNDIsIDQyXSxcclxuXHRcImJ1cmx5d29vZFwiOiBbMjIyLCAxODQsIDEzNV0sXHJcblx0XCJjYWRldGJsdWVcIjogWzk1LCAxNTgsIDE2MF0sXHJcblx0XCJjaGFydHJldXNlXCI6IFsxMjcsIDI1NSwgMF0sXHJcblx0XCJjaG9jb2xhdGVcIjogWzIxMCwgMTA1LCAzMF0sXHJcblx0XCJjb3JhbFwiOiBbMjU1LCAxMjcsIDgwXSxcclxuXHRcImNvcm5mbG93ZXJibHVlXCI6IFsxMDAsIDE0OSwgMjM3XSxcclxuXHRcImNvcm5zaWxrXCI6IFsyNTUsIDI0OCwgMjIwXSxcclxuXHRcImNyaW1zb25cIjogWzIyMCwgMjAsIDYwXSxcclxuXHRcImN5YW5cIjogWzAsIDI1NSwgMjU1XSxcclxuXHRcImRhcmtibHVlXCI6IFswLCAwLCAxMzldLFxyXG5cdFwiZGFya2N5YW5cIjogWzAsIDEzOSwgMTM5XSxcclxuXHRcImRhcmtnb2xkZW5yb2RcIjogWzE4NCwgMTM0LCAxMV0sXHJcblx0XCJkYXJrZ3JheVwiOiBbMTY5LCAxNjksIDE2OV0sXHJcblx0XCJkYXJrZ3JlZW5cIjogWzAsIDEwMCwgMF0sXHJcblx0XCJkYXJrZ3JleVwiOiBbMTY5LCAxNjksIDE2OV0sXHJcblx0XCJkYXJra2hha2lcIjogWzE4OSwgMTgzLCAxMDddLFxyXG5cdFwiZGFya21hZ2VudGFcIjogWzEzOSwgMCwgMTM5XSxcclxuXHRcImRhcmtvbGl2ZWdyZWVuXCI6IFs4NSwgMTA3LCA0N10sXHJcblx0XCJkYXJrb3JhbmdlXCI6IFsyNTUsIDE0MCwgMF0sXHJcblx0XCJkYXJrb3JjaGlkXCI6IFsxNTMsIDUwLCAyMDRdLFxyXG5cdFwiZGFya3JlZFwiOiBbMTM5LCAwLCAwXSxcclxuXHRcImRhcmtzYWxtb25cIjogWzIzMywgMTUwLCAxMjJdLFxyXG5cdFwiZGFya3NlYWdyZWVuXCI6IFsxNDMsIDE4OCwgMTQzXSxcclxuXHRcImRhcmtzbGF0ZWJsdWVcIjogWzcyLCA2MSwgMTM5XSxcclxuXHRcImRhcmtzbGF0ZWdyYXlcIjogWzQ3LCA3OSwgNzldLFxyXG5cdFwiZGFya3NsYXRlZ3JleVwiOiBbNDcsIDc5LCA3OV0sXHJcblx0XCJkYXJrdHVycXVvaXNlXCI6IFswLCAyMDYsIDIwOV0sXHJcblx0XCJkYXJrdmlvbGV0XCI6IFsxNDgsIDAsIDIxMV0sXHJcblx0XCJkZWVwcGlua1wiOiBbMjU1LCAyMCwgMTQ3XSxcclxuXHRcImRlZXBza3libHVlXCI6IFswLCAxOTEsIDI1NV0sXHJcblx0XCJkaW1ncmF5XCI6IFsxMDUsIDEwNSwgMTA1XSxcclxuXHRcImRpbWdyZXlcIjogWzEwNSwgMTA1LCAxMDVdLFxyXG5cdFwiZG9kZ2VyYmx1ZVwiOiBbMzAsIDE0NCwgMjU1XSxcclxuXHRcImZpcmVicmlja1wiOiBbMTc4LCAzNCwgMzRdLFxyXG5cdFwiZmxvcmFsd2hpdGVcIjogWzI1NSwgMjUwLCAyNDBdLFxyXG5cdFwiZm9yZXN0Z3JlZW5cIjogWzM0LCAxMzksIDM0XSxcclxuXHRcImZ1Y2hzaWFcIjogWzI1NSwgMCwgMjU1XSxcclxuXHRcImdhaW5zYm9yb1wiOiBbMjIwLCAyMjAsIDIyMF0sXHJcblx0XCJnaG9zdHdoaXRlXCI6IFsyNDgsIDI0OCwgMjU1XSxcclxuXHRcImdvbGRcIjogWzI1NSwgMjE1LCAwXSxcclxuXHRcImdvbGRlbnJvZFwiOiBbMjE4LCAxNjUsIDMyXSxcclxuXHRcImdyYXlcIjogWzEyOCwgMTI4LCAxMjhdLFxyXG5cdFwiZ3JlZW5cIjogWzAsIDEyOCwgMF0sXHJcblx0XCJncmVlbnllbGxvd1wiOiBbMTczLCAyNTUsIDQ3XSxcclxuXHRcImdyZXlcIjogWzEyOCwgMTI4LCAxMjhdLFxyXG5cdFwiaG9uZXlkZXdcIjogWzI0MCwgMjU1LCAyNDBdLFxyXG5cdFwiaG90cGlua1wiOiBbMjU1LCAxMDUsIDE4MF0sXHJcblx0XCJpbmRpYW5yZWRcIjogWzIwNSwgOTIsIDkyXSxcclxuXHRcImluZGlnb1wiOiBbNzUsIDAsIDEzMF0sXHJcblx0XCJpdm9yeVwiOiBbMjU1LCAyNTUsIDI0MF0sXHJcblx0XCJraGFraVwiOiBbMjQwLCAyMzAsIDE0MF0sXHJcblx0XCJsYXZlbmRlclwiOiBbMjMwLCAyMzAsIDI1MF0sXHJcblx0XCJsYXZlbmRlcmJsdXNoXCI6IFsyNTUsIDI0MCwgMjQ1XSxcclxuXHRcImxhd25ncmVlblwiOiBbMTI0LCAyNTIsIDBdLFxyXG5cdFwibGVtb25jaGlmZm9uXCI6IFsyNTUsIDI1MCwgMjA1XSxcclxuXHRcImxpZ2h0Ymx1ZVwiOiBbMTczLCAyMTYsIDIzMF0sXHJcblx0XCJsaWdodGNvcmFsXCI6IFsyNDAsIDEyOCwgMTI4XSxcclxuXHRcImxpZ2h0Y3lhblwiOiBbMjI0LCAyNTUsIDI1NV0sXHJcblx0XCJsaWdodGdvbGRlbnJvZHllbGxvd1wiOiBbMjUwLCAyNTAsIDIxMF0sXHJcblx0XCJsaWdodGdyYXlcIjogWzIxMSwgMjExLCAyMTFdLFxyXG5cdFwibGlnaHRncmVlblwiOiBbMTQ0LCAyMzgsIDE0NF0sXHJcblx0XCJsaWdodGdyZXlcIjogWzIxMSwgMjExLCAyMTFdLFxyXG5cdFwibGlnaHRwaW5rXCI6IFsyNTUsIDE4MiwgMTkzXSxcclxuXHRcImxpZ2h0c2FsbW9uXCI6IFsyNTUsIDE2MCwgMTIyXSxcclxuXHRcImxpZ2h0c2VhZ3JlZW5cIjogWzMyLCAxNzgsIDE3MF0sXHJcblx0XCJsaWdodHNreWJsdWVcIjogWzEzNSwgMjA2LCAyNTBdLFxyXG5cdFwibGlnaHRzbGF0ZWdyYXlcIjogWzExOSwgMTM2LCAxNTNdLFxyXG5cdFwibGlnaHRzbGF0ZWdyZXlcIjogWzExOSwgMTM2LCAxNTNdLFxyXG5cdFwibGlnaHRzdGVlbGJsdWVcIjogWzE3NiwgMTk2LCAyMjJdLFxyXG5cdFwibGlnaHR5ZWxsb3dcIjogWzI1NSwgMjU1LCAyMjRdLFxyXG5cdFwibGltZVwiOiBbMCwgMjU1LCAwXSxcclxuXHRcImxpbWVncmVlblwiOiBbNTAsIDIwNSwgNTBdLFxyXG5cdFwibGluZW5cIjogWzI1MCwgMjQwLCAyMzBdLFxyXG5cdFwibWFnZW50YVwiOiBbMjU1LCAwLCAyNTVdLFxyXG5cdFwibWFyb29uXCI6IFsxMjgsIDAsIDBdLFxyXG5cdFwibWVkaXVtYXF1YW1hcmluZVwiOiBbMTAyLCAyMDUsIDE3MF0sXHJcblx0XCJtZWRpdW1ibHVlXCI6IFswLCAwLCAyMDVdLFxyXG5cdFwibWVkaXVtb3JjaGlkXCI6IFsxODYsIDg1LCAyMTFdLFxyXG5cdFwibWVkaXVtcHVycGxlXCI6IFsxNDcsIDExMiwgMjE5XSxcclxuXHRcIm1lZGl1bXNlYWdyZWVuXCI6IFs2MCwgMTc5LCAxMTNdLFxyXG5cdFwibWVkaXVtc2xhdGVibHVlXCI6IFsxMjMsIDEwNCwgMjM4XSxcclxuXHRcIm1lZGl1bXNwcmluZ2dyZWVuXCI6IFswLCAyNTAsIDE1NF0sXHJcblx0XCJtZWRpdW10dXJxdW9pc2VcIjogWzcyLCAyMDksIDIwNF0sXHJcblx0XCJtZWRpdW12aW9sZXRyZWRcIjogWzE5OSwgMjEsIDEzM10sXHJcblx0XCJtaWRuaWdodGJsdWVcIjogWzI1LCAyNSwgMTEyXSxcclxuXHRcIm1pbnRjcmVhbVwiOiBbMjQ1LCAyNTUsIDI1MF0sXHJcblx0XCJtaXN0eXJvc2VcIjogWzI1NSwgMjI4LCAyMjVdLFxyXG5cdFwibW9jY2FzaW5cIjogWzI1NSwgMjI4LCAxODFdLFxyXG5cdFwibmF2YWpvd2hpdGVcIjogWzI1NSwgMjIyLCAxNzNdLFxyXG5cdFwibmF2eVwiOiBbMCwgMCwgMTI4XSxcclxuXHRcIm9sZGxhY2VcIjogWzI1MywgMjQ1LCAyMzBdLFxyXG5cdFwib2xpdmVcIjogWzEyOCwgMTI4LCAwXSxcclxuXHRcIm9saXZlZHJhYlwiOiBbMTA3LCAxNDIsIDM1XSxcclxuXHRcIm9yYW5nZVwiOiBbMjU1LCAxNjUsIDBdLFxyXG5cdFwib3JhbmdlcmVkXCI6IFsyNTUsIDY5LCAwXSxcclxuXHRcIm9yY2hpZFwiOiBbMjE4LCAxMTIsIDIxNF0sXHJcblx0XCJwYWxlZ29sZGVucm9kXCI6IFsyMzgsIDIzMiwgMTcwXSxcclxuXHRcInBhbGVncmVlblwiOiBbMTUyLCAyNTEsIDE1Ml0sXHJcblx0XCJwYWxldHVycXVvaXNlXCI6IFsxNzUsIDIzOCwgMjM4XSxcclxuXHRcInBhbGV2aW9sZXRyZWRcIjogWzIxOSwgMTEyLCAxNDddLFxyXG5cdFwicGFwYXlhd2hpcFwiOiBbMjU1LCAyMzksIDIxM10sXHJcblx0XCJwZWFjaHB1ZmZcIjogWzI1NSwgMjE4LCAxODVdLFxyXG5cdFwicGVydVwiOiBbMjA1LCAxMzMsIDYzXSxcclxuXHRcInBpbmtcIjogWzI1NSwgMTkyLCAyMDNdLFxyXG5cdFwicGx1bVwiOiBbMjIxLCAxNjAsIDIyMV0sXHJcblx0XCJwb3dkZXJibHVlXCI6IFsxNzYsIDIyNCwgMjMwXSxcclxuXHRcInB1cnBsZVwiOiBbMTI4LCAwLCAxMjhdLFxyXG5cdFwicmViZWNjYXB1cnBsZVwiOiBbMTAyLCA1MSwgMTUzXSxcclxuXHRcInJlZFwiOiBbMjU1LCAwLCAwXSxcclxuXHRcInJvc3licm93blwiOiBbMTg4LCAxNDMsIDE0M10sXHJcblx0XCJyb3lhbGJsdWVcIjogWzY1LCAxMDUsIDIyNV0sXHJcblx0XCJzYWRkbGVicm93blwiOiBbMTM5LCA2OSwgMTldLFxyXG5cdFwic2FsbW9uXCI6IFsyNTAsIDEyOCwgMTE0XSxcclxuXHRcInNhbmR5YnJvd25cIjogWzI0NCwgMTY0LCA5Nl0sXHJcblx0XCJzZWFncmVlblwiOiBbNDYsIDEzOSwgODddLFxyXG5cdFwic2Vhc2hlbGxcIjogWzI1NSwgMjQ1LCAyMzhdLFxyXG5cdFwic2llbm5hXCI6IFsxNjAsIDgyLCA0NV0sXHJcblx0XCJzaWx2ZXJcIjogWzE5MiwgMTkyLCAxOTJdLFxyXG5cdFwic2t5Ymx1ZVwiOiBbMTM1LCAyMDYsIDIzNV0sXHJcblx0XCJzbGF0ZWJsdWVcIjogWzEwNiwgOTAsIDIwNV0sXHJcblx0XCJzbGF0ZWdyYXlcIjogWzExMiwgMTI4LCAxNDRdLFxyXG5cdFwic2xhdGVncmV5XCI6IFsxMTIsIDEyOCwgMTQ0XSxcclxuXHRcInNub3dcIjogWzI1NSwgMjUwLCAyNTBdLFxyXG5cdFwic3ByaW5nZ3JlZW5cIjogWzAsIDI1NSwgMTI3XSxcclxuXHRcInN0ZWVsYmx1ZVwiOiBbNzAsIDEzMCwgMTgwXSxcclxuXHRcInRhblwiOiBbMjEwLCAxODAsIDE0MF0sXHJcblx0XCJ0ZWFsXCI6IFswLCAxMjgsIDEyOF0sXHJcblx0XCJ0aGlzdGxlXCI6IFsyMTYsIDE5MSwgMjE2XSxcclxuXHRcInRvbWF0b1wiOiBbMjU1LCA5OSwgNzFdLFxyXG5cdFwidHVycXVvaXNlXCI6IFs2NCwgMjI0LCAyMDhdLFxyXG5cdFwidmlvbGV0XCI6IFsyMzgsIDEzMCwgMjM4XSxcclxuXHRcIndoZWF0XCI6IFsyNDUsIDIyMiwgMTc5XSxcclxuXHRcIndoaXRlXCI6IFsyNTUsIDI1NSwgMjU1XSxcclxuXHRcIndoaXRlc21va2VcIjogWzI0NSwgMjQ1LCAyNDVdLFxyXG5cdFwieWVsbG93XCI6IFsyNTUsIDI1NSwgMF0sXHJcblx0XCJ5ZWxsb3dncmVlblwiOiBbMTU0LCAyMDUsIDUwXVxyXG59O1xyXG4iLCJ2YXIgY29udmVyc2lvbnMgPSByZXF1aXJlKCcuL2NvbnZlcnNpb25zJyk7XG5cbi8qXG5cdHRoaXMgZnVuY3Rpb24gcm91dGVzIGEgbW9kZWwgdG8gYWxsIG90aGVyIG1vZGVscy5cblxuXHRhbGwgZnVuY3Rpb25zIHRoYXQgYXJlIHJvdXRlZCBoYXZlIGEgcHJvcGVydHkgYC5jb252ZXJzaW9uYCBhdHRhY2hlZFxuXHR0byB0aGUgcmV0dXJuZWQgc3ludGhldGljIGZ1bmN0aW9uLiBUaGlzIHByb3BlcnR5IGlzIGFuIGFycmF5XG5cdG9mIHN0cmluZ3MsIGVhY2ggd2l0aCB0aGUgc3RlcHMgaW4gYmV0d2VlbiB0aGUgJ2Zyb20nIGFuZCAndG8nXG5cdGNvbG9yIG1vZGVscyAoaW5jbHVzaXZlKS5cblxuXHRjb252ZXJzaW9ucyB0aGF0IGFyZSBub3QgcG9zc2libGUgc2ltcGx5IGFyZSBub3QgaW5jbHVkZWQuXG4qL1xuXG5mdW5jdGlvbiBidWlsZEdyYXBoKCkge1xuXHR2YXIgZ3JhcGggPSB7fTtcblx0Ly8gaHR0cHM6Ly9qc3BlcmYuY29tL29iamVjdC1rZXlzLXZzLWZvci1pbi13aXRoLWNsb3N1cmUvM1xuXHR2YXIgbW9kZWxzID0gT2JqZWN0LmtleXMoY29udmVyc2lvbnMpO1xuXG5cdGZvciAodmFyIGxlbiA9IG1vZGVscy5sZW5ndGgsIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcblx0XHRncmFwaFttb2RlbHNbaV1dID0ge1xuXHRcdFx0Ly8gaHR0cDovL2pzcGVyZi5jb20vMS12cy1pbmZpbml0eVxuXHRcdFx0Ly8gbWljcm8tb3B0LCBidXQgdGhpcyBpcyBzaW1wbGUuXG5cdFx0XHRkaXN0YW5jZTogLTEsXG5cdFx0XHRwYXJlbnQ6IG51bGxcblx0XHR9O1xuXHR9XG5cblx0cmV0dXJuIGdyYXBoO1xufVxuXG4vLyBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9CcmVhZHRoLWZpcnN0X3NlYXJjaFxuZnVuY3Rpb24gZGVyaXZlQkZTKGZyb21Nb2RlbCkge1xuXHR2YXIgZ3JhcGggPSBidWlsZEdyYXBoKCk7XG5cdHZhciBxdWV1ZSA9IFtmcm9tTW9kZWxdOyAvLyB1bnNoaWZ0IC0+IHF1ZXVlIC0+IHBvcFxuXG5cdGdyYXBoW2Zyb21Nb2RlbF0uZGlzdGFuY2UgPSAwO1xuXG5cdHdoaWxlIChxdWV1ZS5sZW5ndGgpIHtcblx0XHR2YXIgY3VycmVudCA9IHF1ZXVlLnBvcCgpO1xuXHRcdHZhciBhZGphY2VudHMgPSBPYmplY3Qua2V5cyhjb252ZXJzaW9uc1tjdXJyZW50XSk7XG5cblx0XHRmb3IgKHZhciBsZW4gPSBhZGphY2VudHMubGVuZ3RoLCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHR2YXIgYWRqYWNlbnQgPSBhZGphY2VudHNbaV07XG5cdFx0XHR2YXIgbm9kZSA9IGdyYXBoW2FkamFjZW50XTtcblxuXHRcdFx0aWYgKG5vZGUuZGlzdGFuY2UgPT09IC0xKSB7XG5cdFx0XHRcdG5vZGUuZGlzdGFuY2UgPSBncmFwaFtjdXJyZW50XS5kaXN0YW5jZSArIDE7XG5cdFx0XHRcdG5vZGUucGFyZW50ID0gY3VycmVudDtcblx0XHRcdFx0cXVldWUudW5zaGlmdChhZGphY2VudCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGdyYXBoO1xufVxuXG5mdW5jdGlvbiBsaW5rKGZyb20sIHRvKSB7XG5cdHJldHVybiBmdW5jdGlvbiAoYXJncykge1xuXHRcdHJldHVybiB0byhmcm9tKGFyZ3MpKTtcblx0fTtcbn1cblxuZnVuY3Rpb24gd3JhcENvbnZlcnNpb24odG9Nb2RlbCwgZ3JhcGgpIHtcblx0dmFyIHBhdGggPSBbZ3JhcGhbdG9Nb2RlbF0ucGFyZW50LCB0b01vZGVsXTtcblx0dmFyIGZuID0gY29udmVyc2lvbnNbZ3JhcGhbdG9Nb2RlbF0ucGFyZW50XVt0b01vZGVsXTtcblxuXHR2YXIgY3VyID0gZ3JhcGhbdG9Nb2RlbF0ucGFyZW50O1xuXHR3aGlsZSAoZ3JhcGhbY3VyXS5wYXJlbnQpIHtcblx0XHRwYXRoLnVuc2hpZnQoZ3JhcGhbY3VyXS5wYXJlbnQpO1xuXHRcdGZuID0gbGluayhjb252ZXJzaW9uc1tncmFwaFtjdXJdLnBhcmVudF1bY3VyXSwgZm4pO1xuXHRcdGN1ciA9IGdyYXBoW2N1cl0ucGFyZW50O1xuXHR9XG5cblx0Zm4uY29udmVyc2lvbiA9IHBhdGg7XG5cdHJldHVybiBmbjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZnJvbU1vZGVsKSB7XG5cdHZhciBncmFwaCA9IGRlcml2ZUJGUyhmcm9tTW9kZWwpO1xuXHR2YXIgY29udmVyc2lvbiA9IHt9O1xuXG5cdHZhciBtb2RlbHMgPSBPYmplY3Qua2V5cyhncmFwaCk7XG5cdGZvciAodmFyIGxlbiA9IG1vZGVscy5sZW5ndGgsIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcblx0XHR2YXIgdG9Nb2RlbCA9IG1vZGVsc1tpXTtcblx0XHR2YXIgbm9kZSA9IGdyYXBoW3RvTW9kZWxdO1xuXG5cdFx0aWYgKG5vZGUucGFyZW50ID09PSBudWxsKSB7XG5cdFx0XHQvLyBubyBwb3NzaWJsZSBjb252ZXJzaW9uLCBvciB0aGlzIG5vZGUgaXMgdGhlIHNvdXJjZSBtb2RlbC5cblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdGNvbnZlcnNpb25bdG9Nb2RlbF0gPSB3cmFwQ29udmVyc2lvbih0b01vZGVsLCBncmFwaCk7XG5cdH1cblxuXHRyZXR1cm4gY29udmVyc2lvbjtcbn07XG5cbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IG9zID0gcmVxdWlyZSgnb3MnKTtcbmNvbnN0IGhhc0ZsYWcgPSByZXF1aXJlKCdoYXMtZmxhZycpO1xuXG5jb25zdCBlbnYgPSBwcm9jZXNzLmVudjtcblxubGV0IGZvcmNlQ29sb3I7XG5pZiAoaGFzRmxhZygnbm8tY29sb3InKSB8fFxuXHRoYXNGbGFnKCduby1jb2xvcnMnKSB8fFxuXHRoYXNGbGFnKCdjb2xvcj1mYWxzZScpKSB7XG5cdGZvcmNlQ29sb3IgPSBmYWxzZTtcbn0gZWxzZSBpZiAoaGFzRmxhZygnY29sb3InKSB8fFxuXHRoYXNGbGFnKCdjb2xvcnMnKSB8fFxuXHRoYXNGbGFnKCdjb2xvcj10cnVlJykgfHxcblx0aGFzRmxhZygnY29sb3I9YWx3YXlzJykpIHtcblx0Zm9yY2VDb2xvciA9IHRydWU7XG59XG5pZiAoJ0ZPUkNFX0NPTE9SJyBpbiBlbnYpIHtcblx0Zm9yY2VDb2xvciA9IGVudi5GT1JDRV9DT0xPUi5sZW5ndGggPT09IDAgfHwgcGFyc2VJbnQoZW52LkZPUkNFX0NPTE9SLCAxMCkgIT09IDA7XG59XG5cbmZ1bmN0aW9uIHRyYW5zbGF0ZUxldmVsKGxldmVsKSB7XG5cdGlmIChsZXZlbCA9PT0gMCkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0bGV2ZWwsXG5cdFx0aGFzQmFzaWM6IHRydWUsXG5cdFx0aGFzMjU2OiBsZXZlbCA+PSAyLFxuXHRcdGhhczE2bTogbGV2ZWwgPj0gM1xuXHR9O1xufVxuXG5mdW5jdGlvbiBzdXBwb3J0c0NvbG9yKHN0cmVhbSkge1xuXHRpZiAoZm9yY2VDb2xvciA9PT0gZmFsc2UpIHtcblx0XHRyZXR1cm4gMDtcblx0fVxuXG5cdGlmIChoYXNGbGFnKCdjb2xvcj0xNm0nKSB8fFxuXHRcdGhhc0ZsYWcoJ2NvbG9yPWZ1bGwnKSB8fFxuXHRcdGhhc0ZsYWcoJ2NvbG9yPXRydWVjb2xvcicpKSB7XG5cdFx0cmV0dXJuIDM7XG5cdH1cblxuXHRpZiAoaGFzRmxhZygnY29sb3I9MjU2JykpIHtcblx0XHRyZXR1cm4gMjtcblx0fVxuXG5cdGlmIChzdHJlYW0gJiYgIXN0cmVhbS5pc1RUWSAmJiBmb3JjZUNvbG9yICE9PSB0cnVlKSB7XG5cdFx0cmV0dXJuIDA7XG5cdH1cblxuXHRjb25zdCBtaW4gPSBmb3JjZUNvbG9yID8gMSA6IDA7XG5cblx0aWYgKHByb2Nlc3MucGxhdGZvcm0gPT09ICd3aW4zMicpIHtcblx0XHQvLyBOb2RlLmpzIDcuNS4wIGlzIHRoZSBmaXJzdCB2ZXJzaW9uIG9mIE5vZGUuanMgdG8gaW5jbHVkZSBhIHBhdGNoIHRvXG5cdFx0Ly8gbGlidXYgdGhhdCBlbmFibGVzIDI1NiBjb2xvciBvdXRwdXQgb24gV2luZG93cy4gQW55dGhpbmcgZWFybGllciBhbmQgaXRcblx0XHQvLyB3b24ndCB3b3JrLiBIb3dldmVyLCBoZXJlIHdlIHRhcmdldCBOb2RlLmpzIDggYXQgbWluaW11bSBhcyBpdCBpcyBhbiBMVFNcblx0XHQvLyByZWxlYXNlLCBhbmQgTm9kZS5qcyA3IGlzIG5vdC4gV2luZG93cyAxMCBidWlsZCAxMDU4NiBpcyB0aGUgZmlyc3QgV2luZG93c1xuXHRcdC8vIHJlbGVhc2UgdGhhdCBzdXBwb3J0cyAyNTYgY29sb3JzLiBXaW5kb3dzIDEwIGJ1aWxkIDE0OTMxIGlzIHRoZSBmaXJzdCByZWxlYXNlXG5cdFx0Ly8gdGhhdCBzdXBwb3J0cyAxNm0vVHJ1ZUNvbG9yLlxuXHRcdGNvbnN0IG9zUmVsZWFzZSA9IG9zLnJlbGVhc2UoKS5zcGxpdCgnLicpO1xuXHRcdGlmIChcblx0XHRcdE51bWJlcihwcm9jZXNzLnZlcnNpb25zLm5vZGUuc3BsaXQoJy4nKVswXSkgPj0gOCAmJlxuXHRcdFx0TnVtYmVyKG9zUmVsZWFzZVswXSkgPj0gMTAgJiZcblx0XHRcdE51bWJlcihvc1JlbGVhc2VbMl0pID49IDEwNTg2XG5cdFx0KSB7XG5cdFx0XHRyZXR1cm4gTnVtYmVyKG9zUmVsZWFzZVsyXSkgPj0gMTQ5MzEgPyAzIDogMjtcblx0XHR9XG5cblx0XHRyZXR1cm4gMTtcblx0fVxuXG5cdGlmICgnQ0knIGluIGVudikge1xuXHRcdGlmIChbJ1RSQVZJUycsICdDSVJDTEVDSScsICdBUFBWRVlPUicsICdHSVRMQUJfQ0knXS5zb21lKHNpZ24gPT4gc2lnbiBpbiBlbnYpIHx8IGVudi5DSV9OQU1FID09PSAnY29kZXNoaXAnKSB7XG5cdFx0XHRyZXR1cm4gMTtcblx0XHR9XG5cblx0XHRyZXR1cm4gbWluO1xuXHR9XG5cblx0aWYgKCdURUFNQ0lUWV9WRVJTSU9OJyBpbiBlbnYpIHtcblx0XHRyZXR1cm4gL14oOVxcLigwKlsxLTldXFxkKilcXC58XFxkezIsfVxcLikvLnRlc3QoZW52LlRFQU1DSVRZX1ZFUlNJT04pID8gMSA6IDA7XG5cdH1cblxuXHRpZiAoZW52LkNPTE9SVEVSTSA9PT0gJ3RydWVjb2xvcicpIHtcblx0XHRyZXR1cm4gMztcblx0fVxuXG5cdGlmICgnVEVSTV9QUk9HUkFNJyBpbiBlbnYpIHtcblx0XHRjb25zdCB2ZXJzaW9uID0gcGFyc2VJbnQoKGVudi5URVJNX1BST0dSQU1fVkVSU0lPTiB8fCAnJykuc3BsaXQoJy4nKVswXSwgMTApO1xuXG5cdFx0c3dpdGNoIChlbnYuVEVSTV9QUk9HUkFNKSB7XG5cdFx0XHRjYXNlICdpVGVybS5hcHAnOlxuXHRcdFx0XHRyZXR1cm4gdmVyc2lvbiA+PSAzID8gMyA6IDI7XG5cdFx0XHRjYXNlICdBcHBsZV9UZXJtaW5hbCc6XG5cdFx0XHRcdHJldHVybiAyO1xuXHRcdFx0Ly8gTm8gZGVmYXVsdFxuXHRcdH1cblx0fVxuXG5cdGlmICgvLTI1Nihjb2xvcik/JC9pLnRlc3QoZW52LlRFUk0pKSB7XG5cdFx0cmV0dXJuIDI7XG5cdH1cblxuXHRpZiAoL15zY3JlZW58Xnh0ZXJtfF52dDEwMHxednQyMjB8XnJ4dnR8Y29sb3J8YW5zaXxjeWd3aW58bGludXgvaS50ZXN0KGVudi5URVJNKSkge1xuXHRcdHJldHVybiAxO1xuXHR9XG5cblx0aWYgKCdDT0xPUlRFUk0nIGluIGVudikge1xuXHRcdHJldHVybiAxO1xuXHR9XG5cblx0aWYgKGVudi5URVJNID09PSAnZHVtYicpIHtcblx0XHRyZXR1cm4gbWluO1xuXHR9XG5cblx0cmV0dXJuIG1pbjtcbn1cblxuZnVuY3Rpb24gZ2V0U3VwcG9ydExldmVsKHN0cmVhbSkge1xuXHRjb25zdCBsZXZlbCA9IHN1cHBvcnRzQ29sb3Ioc3RyZWFtKTtcblx0cmV0dXJuIHRyYW5zbGF0ZUxldmVsKGxldmVsKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdHN1cHBvcnRzQ29sb3I6IGdldFN1cHBvcnRMZXZlbCxcblx0c3Rkb3V0OiBnZXRTdXBwb3J0TGV2ZWwocHJvY2Vzcy5zdGRvdXQpLFxuXHRzdGRlcnI6IGdldFN1cHBvcnRMZXZlbChwcm9jZXNzLnN0ZGVycilcbn07XG4iLCIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IChmbGFnLCBhcmd2KSA9PiB7XG5cdGFyZ3YgPSBhcmd2IHx8IHByb2Nlc3MuYXJndjtcblx0Y29uc3QgcHJlZml4ID0gZmxhZy5zdGFydHNXaXRoKCctJykgPyAnJyA6IChmbGFnLmxlbmd0aCA9PT0gMSA/ICctJyA6ICctLScpO1xuXHRjb25zdCBwb3MgPSBhcmd2LmluZGV4T2YocHJlZml4ICsgZmxhZyk7XG5cdGNvbnN0IHRlcm1pbmF0b3JQb3MgPSBhcmd2LmluZGV4T2YoJy0tJyk7XG5cdHJldHVybiBwb3MgIT09IC0xICYmICh0ZXJtaW5hdG9yUG9zID09PSAtMSA/IHRydWUgOiBwb3MgPCB0ZXJtaW5hdG9yUG9zKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCBURU1QTEFURV9SRUdFWCA9IC8oPzpcXFxcKHVbYS1mXFxkXXs0fXx4W2EtZlxcZF17Mn18LikpfCg/Olxceyh+KT8oXFx3Kyg/OlxcKFteKV0qXFwpKT8oPzpcXC5cXHcrKD86XFwoW14pXSpcXCkpPykqKSg/OlsgXFx0XXwoPz1cXHI/XFxuKSkpfChcXH0pfCgoPzoufFtcXHJcXG5cXGZdKSs/KS9naTtcbmNvbnN0IFNUWUxFX1JFR0VYID0gLyg/Ol58XFwuKShcXHcrKSg/OlxcKChbXildKilcXCkpPy9nO1xuY29uc3QgU1RSSU5HX1JFR0VYID0gL14oWydcIl0pKCg/OlxcXFwufCg/IVxcMSlbXlxcXFxdKSopXFwxJC87XG5jb25zdCBFU0NBUEVfUkVHRVggPSAvXFxcXCh1W2EtZlxcZF17NH18eFthLWZcXGRdezJ9fC4pfChbXlxcXFxdKS9naTtcblxuY29uc3QgRVNDQVBFUyA9IG5ldyBNYXAoW1xuXHRbJ24nLCAnXFxuJ10sXG5cdFsncicsICdcXHInXSxcblx0Wyd0JywgJ1xcdCddLFxuXHRbJ2InLCAnXFxiJ10sXG5cdFsnZicsICdcXGYnXSxcblx0Wyd2JywgJ1xcdiddLFxuXHRbJzAnLCAnXFwwJ10sXG5cdFsnXFxcXCcsICdcXFxcJ10sXG5cdFsnZScsICdcXHUwMDFCJ10sXG5cdFsnYScsICdcXHUwMDA3J11cbl0pO1xuXG5mdW5jdGlvbiB1bmVzY2FwZShjKSB7XG5cdGlmICgoY1swXSA9PT0gJ3UnICYmIGMubGVuZ3RoID09PSA1KSB8fCAoY1swXSA9PT0gJ3gnICYmIGMubGVuZ3RoID09PSAzKSkge1xuXHRcdHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKHBhcnNlSW50KGMuc2xpY2UoMSksIDE2KSk7XG5cdH1cblxuXHRyZXR1cm4gRVNDQVBFUy5nZXQoYykgfHwgYztcbn1cblxuZnVuY3Rpb24gcGFyc2VBcmd1bWVudHMobmFtZSwgYXJncykge1xuXHRjb25zdCByZXN1bHRzID0gW107XG5cdGNvbnN0IGNodW5rcyA9IGFyZ3MudHJpbSgpLnNwbGl0KC9cXHMqLFxccyovZyk7XG5cdGxldCBtYXRjaGVzO1xuXG5cdGZvciAoY29uc3QgY2h1bmsgb2YgY2h1bmtzKSB7XG5cdFx0aWYgKCFpc05hTihjaHVuaykpIHtcblx0XHRcdHJlc3VsdHMucHVzaChOdW1iZXIoY2h1bmspKTtcblx0XHR9IGVsc2UgaWYgKChtYXRjaGVzID0gY2h1bmsubWF0Y2goU1RSSU5HX1JFR0VYKSkpIHtcblx0XHRcdHJlc3VsdHMucHVzaChtYXRjaGVzWzJdLnJlcGxhY2UoRVNDQVBFX1JFR0VYLCAobSwgZXNjYXBlLCBjaHIpID0+IGVzY2FwZSA/IHVuZXNjYXBlKGVzY2FwZSkgOiBjaHIpKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIENoYWxrIHRlbXBsYXRlIHN0eWxlIGFyZ3VtZW50OiAke2NodW5rfSAoaW4gc3R5bGUgJyR7bmFtZX0nKWApO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiByZXN1bHRzO1xufVxuXG5mdW5jdGlvbiBwYXJzZVN0eWxlKHN0eWxlKSB7XG5cdFNUWUxFX1JFR0VYLmxhc3RJbmRleCA9IDA7XG5cblx0Y29uc3QgcmVzdWx0cyA9IFtdO1xuXHRsZXQgbWF0Y2hlcztcblxuXHR3aGlsZSAoKG1hdGNoZXMgPSBTVFlMRV9SRUdFWC5leGVjKHN0eWxlKSkgIT09IG51bGwpIHtcblx0XHRjb25zdCBuYW1lID0gbWF0Y2hlc1sxXTtcblxuXHRcdGlmIChtYXRjaGVzWzJdKSB7XG5cdFx0XHRjb25zdCBhcmdzID0gcGFyc2VBcmd1bWVudHMobmFtZSwgbWF0Y2hlc1syXSk7XG5cdFx0XHRyZXN1bHRzLnB1c2goW25hbWVdLmNvbmNhdChhcmdzKSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlc3VsdHMucHVzaChbbmFtZV0pO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiByZXN1bHRzO1xufVxuXG5mdW5jdGlvbiBidWlsZFN0eWxlKGNoYWxrLCBzdHlsZXMpIHtcblx0Y29uc3QgZW5hYmxlZCA9IHt9O1xuXG5cdGZvciAoY29uc3QgbGF5ZXIgb2Ygc3R5bGVzKSB7XG5cdFx0Zm9yIChjb25zdCBzdHlsZSBvZiBsYXllci5zdHlsZXMpIHtcblx0XHRcdGVuYWJsZWRbc3R5bGVbMF1dID0gbGF5ZXIuaW52ZXJzZSA/IG51bGwgOiBzdHlsZS5zbGljZSgxKTtcblx0XHR9XG5cdH1cblxuXHRsZXQgY3VycmVudCA9IGNoYWxrO1xuXHRmb3IgKGNvbnN0IHN0eWxlTmFtZSBvZiBPYmplY3Qua2V5cyhlbmFibGVkKSkge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KGVuYWJsZWRbc3R5bGVOYW1lXSkpIHtcblx0XHRcdGlmICghKHN0eWxlTmFtZSBpbiBjdXJyZW50KSkge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gQ2hhbGsgc3R5bGU6ICR7c3R5bGVOYW1lfWApO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZW5hYmxlZFtzdHlsZU5hbWVdLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0Y3VycmVudCA9IGN1cnJlbnRbc3R5bGVOYW1lXS5hcHBseShjdXJyZW50LCBlbmFibGVkW3N0eWxlTmFtZV0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y3VycmVudCA9IGN1cnJlbnRbc3R5bGVOYW1lXTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gY3VycmVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSAoY2hhbGssIHRtcCkgPT4ge1xuXHRjb25zdCBzdHlsZXMgPSBbXTtcblx0Y29uc3QgY2h1bmtzID0gW107XG5cdGxldCBjaHVuayA9IFtdO1xuXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtcGFyYW1zXG5cdHRtcC5yZXBsYWNlKFRFTVBMQVRFX1JFR0VYLCAobSwgZXNjYXBlQ2hhciwgaW52ZXJzZSwgc3R5bGUsIGNsb3NlLCBjaHIpID0+IHtcblx0XHRpZiAoZXNjYXBlQ2hhcikge1xuXHRcdFx0Y2h1bmsucHVzaCh1bmVzY2FwZShlc2NhcGVDaGFyKSk7XG5cdFx0fSBlbHNlIGlmIChzdHlsZSkge1xuXHRcdFx0Y29uc3Qgc3RyID0gY2h1bmsuam9pbignJyk7XG5cdFx0XHRjaHVuayA9IFtdO1xuXHRcdFx0Y2h1bmtzLnB1c2goc3R5bGVzLmxlbmd0aCA9PT0gMCA/IHN0ciA6IGJ1aWxkU3R5bGUoY2hhbGssIHN0eWxlcykoc3RyKSk7XG5cdFx0XHRzdHlsZXMucHVzaCh7aW52ZXJzZSwgc3R5bGVzOiBwYXJzZVN0eWxlKHN0eWxlKX0pO1xuXHRcdH0gZWxzZSBpZiAoY2xvc2UpIHtcblx0XHRcdGlmIChzdHlsZXMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignRm91bmQgZXh0cmFuZW91cyB9IGluIENoYWxrIHRlbXBsYXRlIGxpdGVyYWwnKTtcblx0XHRcdH1cblxuXHRcdFx0Y2h1bmtzLnB1c2goYnVpbGRTdHlsZShjaGFsaywgc3R5bGVzKShjaHVuay5qb2luKCcnKSkpO1xuXHRcdFx0Y2h1bmsgPSBbXTtcblx0XHRcdHN0eWxlcy5wb3AoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y2h1bmsucHVzaChjaHIpO1xuXHRcdH1cblx0fSk7XG5cblx0Y2h1bmtzLnB1c2goY2h1bmsuam9pbignJykpO1xuXG5cdGlmIChzdHlsZXMubGVuZ3RoID4gMCkge1xuXHRcdGNvbnN0IGVyck1zZyA9IGBDaGFsayB0ZW1wbGF0ZSBsaXRlcmFsIGlzIG1pc3NpbmcgJHtzdHlsZXMubGVuZ3RofSBjbG9zaW5nIGJyYWNrZXQke3N0eWxlcy5sZW5ndGggPT09IDEgPyAnJyA6ICdzJ30gKFxcYH1cXGApYDtcblx0XHR0aHJvdyBuZXcgRXJyb3IoZXJyTXNnKTtcblx0fVxuXG5cdHJldHVybiBjaHVua3Muam9pbignJyk7XG59O1xuIiwiLyohXG4gKiBUbXBcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTEtMjAxNyBLQVJBU1pJIElzdHZhbiA8Z2l0aHViQHNwYW0ucmFzemkuaHU+XG4gKlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuLypcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcbmNvbnN0IG9zID0gcmVxdWlyZSgnb3MnKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCBjcnlwdG8gPSByZXF1aXJlKCdjcnlwdG8nKTtcbmNvbnN0IF9jID0gZnMuY29uc3RhbnRzICYmIG9zLmNvbnN0YW50cyA/XG4gIHsgZnM6IGZzLmNvbnN0YW50cywgb3M6IG9zLmNvbnN0YW50cyB9IDpcbiAgcHJvY2Vzcy5iaW5kaW5nKCdjb25zdGFudHMnKTtcbmNvbnN0IHJpbXJhZiA9IHJlcXVpcmUoJ3JpbXJhZicpO1xuXG4vKlxuICogVGhlIHdvcmtpbmcgaW5uZXIgdmFyaWFibGVzLlxuICovXG5jb25zdFxuICAvLyB0aGUgcmFuZG9tIGNoYXJhY3RlcnMgdG8gY2hvb3NlIGZyb21cbiAgUkFORE9NX0NIQVJTID0gJzAxMjM0NTY3ODlBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6JyxcblxuICBURU1QTEFURV9QQVRURVJOID0gL1hYWFhYWC8sXG5cbiAgREVGQVVMVF9UUklFUyA9IDMsXG5cbiAgQ1JFQVRFX0ZMQUdTID0gKF9jLk9fQ1JFQVQgfHwgX2MuZnMuT19DUkVBVCkgfCAoX2MuT19FWENMIHx8IF9jLmZzLk9fRVhDTCkgfCAoX2MuT19SRFdSIHx8IF9jLmZzLk9fUkRXUiksXG5cbiAgRUJBREYgPSBfYy5FQkFERiB8fCBfYy5vcy5lcnJuby5FQkFERixcbiAgRU5PRU5UID0gX2MuRU5PRU5UIHx8IF9jLm9zLmVycm5vLkVOT0VOVCxcblxuICBESVJfTU9ERSA9IDQ0OCAvKiAwbzcwMCAqLyxcbiAgRklMRV9NT0RFID0gMzg0IC8qIDBvNjAwICovLFxuXG4gIEVYSVQgPSAnZXhpdCcsXG5cbiAgU0lHSU5UID0gJ1NJR0lOVCcsXG5cbiAgLy8gdGhpcyB3aWxsIGhvbGQgdGhlIG9iamVjdHMgbmVlZCB0byBiZSByZW1vdmVkIG9uIGV4aXRcbiAgX3JlbW92ZU9iamVjdHMgPSBbXTtcblxudmFyXG4gIF9ncmFjZWZ1bENsZWFudXAgPSBmYWxzZTtcblxuLyoqXG4gKiBSYW5kb20gbmFtZSBnZW5lcmF0b3IgYmFzZWQgb24gY3J5cHRvLlxuICogQWRhcHRlZCBmcm9tIGh0dHA6Ly9ibG9nLnRvbXBhd2xhay5vcmcvaG93LXRvLWdlbmVyYXRlLXJhbmRvbS12YWx1ZXMtbm9kZWpzLWphdmFzY3JpcHRcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gaG93TWFueVxuICogQHJldHVybnMge3N0cmluZ30gdGhlIGdlbmVyYXRlZCByYW5kb20gbmFtZVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gX3JhbmRvbUNoYXJzKGhvd01hbnkpIHtcbiAgdmFyXG4gICAgdmFsdWUgPSBbXSxcbiAgICBybmQgPSBudWxsO1xuXG4gIC8vIG1ha2Ugc3VyZSB0aGF0IHdlIGRvIG5vdCBmYWlsIGJlY2F1c2Ugd2UgcmFuIG91dCBvZiBlbnRyb3B5XG4gIHRyeSB7XG4gICAgcm5kID0gY3J5cHRvLnJhbmRvbUJ5dGVzKGhvd01hbnkpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcm5kID0gY3J5cHRvLnBzZXVkb1JhbmRvbUJ5dGVzKGhvd01hbnkpO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBob3dNYW55OyBpKyspIHtcbiAgICB2YWx1ZS5wdXNoKFJBTkRPTV9DSEFSU1tybmRbaV0gJSBSQU5ET01fQ0hBUlMubGVuZ3RoXSk7XG4gIH1cblxuICByZXR1cm4gdmFsdWUuam9pbignJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIHdoZXRoZXIgdGhlIGBvYmpgIHBhcmFtZXRlciBpcyBkZWZpbmVkIG9yIG5vdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgb2JqZWN0IGlzIHVuZGVmaW5lZFxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gX2lzVW5kZWZpbmVkKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCc7XG59XG5cbi8qKlxuICogUGFyc2VzIHRoZSBmdW5jdGlvbiBhcmd1bWVudHMuXG4gKlxuICogVGhpcyBmdW5jdGlvbiBoZWxwcyB0byBoYXZlIG9wdGlvbmFsIGFyZ3VtZW50cy5cbiAqXG4gKiBAcGFyYW0geyhPcHRpb25zfEZ1bmN0aW9uKX0gb3B0aW9uc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm5zIHtBcnJheX0gcGFyc2VkIGFyZ3VtZW50c1xuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gX3BhcnNlQXJndW1lbnRzKG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBbe30sIG9wdGlvbnNdO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgaWYgKF9pc1VuZGVmaW5lZChvcHRpb25zKSkge1xuICAgIHJldHVybiBbe30sIGNhbGxiYWNrXTtcbiAgfVxuXG4gIHJldHVybiBbb3B0aW9ucywgY2FsbGJhY2tdO1xufVxuXG4vKipcbiAqIEdlbmVyYXRlcyBhIG5ldyB0ZW1wb3JhcnkgbmFtZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0c1xuICogQHJldHVybnMge3N0cmluZ30gdGhlIG5ldyByYW5kb20gbmFtZSBhY2NvcmRpbmcgdG8gb3B0c1xuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gX2dlbmVyYXRlVG1wTmFtZShvcHRzKSB7XG5cbiAgY29uc3QgdG1wRGlyID0gX2dldFRtcERpcigpO1xuXG4gIC8vIGZhaWwgZWFybHkgb24gbWlzc2luZyB0bXAgZGlyXG4gIGlmIChpc0JsYW5rKG9wdHMuZGlyKSAmJiBpc0JsYW5rKHRtcERpcikpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHRtcCBkaXIgc3BlY2lmaWVkJyk7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICBpZiAoIWlzQmxhbmsob3B0cy5uYW1lKSkge1xuICAgIHJldHVybiBwYXRoLmpvaW4ob3B0cy5kaXIgfHwgdG1wRGlyLCBvcHRzLm5hbWUpO1xuICB9XG5cbiAgLy8gbWtzdGVtcHMgbGlrZSB0ZW1wbGF0ZVxuICAvLyBvcHRzLnRlbXBsYXRlIGhhcyBhbHJlYWR5IGJlZW4gZ3VhcmRlZCBpbiB0bXBOYW1lKCkgYmVsb3dcbiAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgaWYgKG9wdHMudGVtcGxhdGUpIHtcbiAgICB2YXIgdGVtcGxhdGUgPSBvcHRzLnRlbXBsYXRlO1xuICAgIC8vIG1ha2Ugc3VyZSB0aGF0IHdlIHByZXBlbmQgdGhlIHRtcCBwYXRoIGlmIG5vbmUgd2FzIGdpdmVuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICBpZiAocGF0aC5iYXNlbmFtZSh0ZW1wbGF0ZSkgPT09IHRlbXBsYXRlKVxuICAgICAgdGVtcGxhdGUgPSBwYXRoLmpvaW4ob3B0cy5kaXIgfHwgdG1wRGlyLCB0ZW1wbGF0ZSk7XG4gICAgcmV0dXJuIHRlbXBsYXRlLnJlcGxhY2UoVEVNUExBVEVfUEFUVEVSTiwgX3JhbmRvbUNoYXJzKDYpKTtcbiAgfVxuXG4gIC8vIHByZWZpeCBhbmQgcG9zdGZpeFxuICBjb25zdCBuYW1lID0gW1xuICAgIChpc0JsYW5rKG9wdHMucHJlZml4KSA/ICd0bXAtJyA6IG9wdHMucHJlZml4KSxcbiAgICBwcm9jZXNzLnBpZCxcbiAgICBfcmFuZG9tQ2hhcnMoMTIpLFxuICAgIChvcHRzLnBvc3RmaXggPyBvcHRzLnBvc3RmaXggOiAnJylcbiAgXS5qb2luKCcnKTtcblxuICByZXR1cm4gcGF0aC5qb2luKG9wdHMuZGlyIHx8IHRtcERpciwgbmFtZSk7XG59XG5cbi8qKlxuICogR2V0cyBhIHRlbXBvcmFyeSBmaWxlIG5hbWUuXG4gKlxuICogQHBhcmFtIHsoT3B0aW9uc3x0bXBOYW1lQ2FsbGJhY2spfSBvcHRpb25zIG9wdGlvbnMgb3IgY2FsbGJhY2tcbiAqIEBwYXJhbSB7P3RtcE5hbWVDYWxsYmFja30gY2FsbGJhY2sgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIHRtcE5hbWUob3B0aW9ucywgY2FsbGJhY2spIHtcbiAgdmFyXG4gICAgYXJncyA9IF9wYXJzZUFyZ3VtZW50cyhvcHRpb25zLCBjYWxsYmFjayksXG4gICAgb3B0cyA9IGFyZ3NbMF0sXG4gICAgY2IgPSBhcmdzWzFdLFxuICAgIHRyaWVzID0gIWlzQmxhbmsob3B0cy5uYW1lKSA/IDEgOiBvcHRzLnRyaWVzIHx8IERFRkFVTFRfVFJJRVM7XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgaWYgKGlzTmFOKHRyaWVzKSB8fCB0cmllcyA8IDApXG4gICAgcmV0dXJuIGNiKG5ldyBFcnJvcignSW52YWxpZCB0cmllcycpKTtcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICBpZiAob3B0cy50ZW1wbGF0ZSAmJiAhb3B0cy50ZW1wbGF0ZS5tYXRjaChURU1QTEFURV9QQVRURVJOKSlcbiAgICByZXR1cm4gY2IobmV3IEVycm9yKCdJbnZhbGlkIHRlbXBsYXRlIHByb3ZpZGVkJykpO1xuXG4gIChmdW5jdGlvbiBfZ2V0VW5pcXVlTmFtZSgpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgbmFtZSA9IF9nZW5lcmF0ZVRtcE5hbWUob3B0cyk7XG5cbiAgICAgIC8vIGNoZWNrIHdoZXRoZXIgdGhlIHBhdGggZXhpc3RzIHRoZW4gcmV0cnkgaWYgbmVlZGVkXG4gICAgICBmcy5zdGF0KG5hbWUsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgICAgaWYgKCFlcnIpIHtcbiAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgICAgIGlmICh0cmllcy0tID4gMCkgcmV0dXJuIF9nZXRVbmlxdWVOYW1lKCk7XG5cbiAgICAgICAgICByZXR1cm4gY2IobmV3IEVycm9yKCdDb3VsZCBub3QgZ2V0IGEgdW5pcXVlIHRtcCBmaWxlbmFtZSwgbWF4IHRyaWVzIHJlYWNoZWQgJyArIG5hbWUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNiKG51bGwsIG5hbWUpO1xuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjYihlcnIpO1xuICAgIH1cbiAgfSgpKTtcbn1cblxuLyoqXG4gKiBTeW5jaHJvbm91cyB2ZXJzaW9uIG9mIHRtcE5hbWUuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEByZXR1cm5zIHtzdHJpbmd9IHRoZSBnZW5lcmF0ZWQgcmFuZG9tIG5hbWVcbiAqIEB0aHJvd3Mge0Vycm9yfSBpZiB0aGUgb3B0aW9ucyBhcmUgaW52YWxpZCBvciBjb3VsZCBub3QgZ2VuZXJhdGUgYSBmaWxlbmFtZVxuICovXG5mdW5jdGlvbiB0bXBOYW1lU3luYyhvcHRpb25zKSB7XG4gIHZhclxuICAgIGFyZ3MgPSBfcGFyc2VBcmd1bWVudHMob3B0aW9ucyksXG4gICAgb3B0cyA9IGFyZ3NbMF0sXG4gICAgdHJpZXMgPSAhaXNCbGFuayhvcHRzLm5hbWUpID8gMSA6IG9wdHMudHJpZXMgfHwgREVGQVVMVF9UUklFUztcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICBpZiAoaXNOYU4odHJpZXMpIHx8IHRyaWVzIDwgMClcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgdHJpZXMnKTtcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICBpZiAob3B0cy50ZW1wbGF0ZSAmJiAhb3B0cy50ZW1wbGF0ZS5tYXRjaChURU1QTEFURV9QQVRURVJOKSlcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgdGVtcGxhdGUgcHJvdmlkZWQnKTtcblxuICBkbyB7XG4gICAgY29uc3QgbmFtZSA9IF9nZW5lcmF0ZVRtcE5hbWUob3B0cyk7XG4gICAgdHJ5IHtcbiAgICAgIGZzLnN0YXRTeW5jKG5hbWUpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBuYW1lO1xuICAgIH1cbiAgfSB3aGlsZSAodHJpZXMtLSA+IDApO1xuXG4gIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGdldCBhIHVuaXF1ZSB0bXAgZmlsZW5hbWUsIG1heCB0cmllcyByZWFjaGVkJyk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbmQgb3BlbnMgYSB0ZW1wb3JhcnkgZmlsZS5cbiAqXG4gKiBAcGFyYW0geyhPcHRpb25zfGZpbGVDYWxsYmFjayl9IG9wdGlvbnMgdGhlIGNvbmZpZyBvcHRpb25zIG9yIHRoZSBjYWxsYmFjayBmdW5jdGlvblxuICogQHBhcmFtIHs/ZmlsZUNhbGxiYWNrfSBjYWxsYmFja1xuICovXG5mdW5jdGlvbiBmaWxlKG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gIHZhclxuICAgIGFyZ3MgPSBfcGFyc2VBcmd1bWVudHMob3B0aW9ucywgY2FsbGJhY2spLFxuICAgIG9wdHMgPSBhcmdzWzBdLFxuICAgIGNiID0gYXJnc1sxXTtcblxuICAvLyBnZXRzIGEgdGVtcG9yYXJ5IGZpbGVuYW1lXG4gIHRtcE5hbWUob3B0cywgZnVuY3Rpb24gX3RtcE5hbWVDcmVhdGVkKGVyciwgbmFtZSkge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgaWYgKGVycikgcmV0dXJuIGNiKGVycik7XG5cbiAgICAvLyBjcmVhdGUgYW5kIG9wZW4gdGhlIGZpbGVcbiAgICBmcy5vcGVuKG5hbWUsIENSRUFURV9GTEFHUywgb3B0cy5tb2RlIHx8IEZJTEVfTU9ERSwgZnVuY3Rpb24gX2ZpbGVDcmVhdGVkKGVyciwgZmQpIHtcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICBpZiAoZXJyKSByZXR1cm4gY2IoZXJyKTtcblxuICAgICAgaWYgKG9wdHMuZGlzY2FyZERlc2NyaXB0b3IpIHtcbiAgICAgICAgcmV0dXJuIGZzLmNsb3NlKGZkLCBmdW5jdGlvbiBfZGlzY2FyZENhbGxiYWNrKGVycikge1xuICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgLy8gTG93IHByb2JhYmlsaXR5LCBhbmQgdGhlIGZpbGUgZXhpc3RzLCBzbyB0aGlzIGNvdWxkIGJlXG4gICAgICAgICAgICAvLyBpZ25vcmVkLiAgSWYgaXQgaXNuJ3Qgd2UgY2VydGFpbmx5IG5lZWQgdG8gdW5saW5rIHRoZVxuICAgICAgICAgICAgLy8gZmlsZSwgYW5kIGlmIHRoYXQgZmFpbHMgdG9vIGl0cyBlcnJvciBpcyBtb3JlXG4gICAgICAgICAgICAvLyBpbXBvcnRhbnQuXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBmcy51bmxpbmtTeW5jKG5hbWUpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICBpZiAoIWlzRU5PRU5UKGUpKSB7XG4gICAgICAgICAgICAgICAgZXJyID0gZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNiKGVycik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNiKG51bGwsIG5hbWUsIHVuZGVmaW5lZCwgX3ByZXBhcmVUbXBGaWxlUmVtb3ZlQ2FsbGJhY2sobmFtZSwgLTEsIG9wdHMpKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgaWYgKG9wdHMuZGV0YWNoRGVzY3JpcHRvcikge1xuICAgICAgICByZXR1cm4gY2IobnVsbCwgbmFtZSwgZmQsIF9wcmVwYXJlVG1wRmlsZVJlbW92ZUNhbGxiYWNrKG5hbWUsIC0xLCBvcHRzKSk7XG4gICAgICB9XG4gICAgICBjYihudWxsLCBuYW1lLCBmZCwgX3ByZXBhcmVUbXBGaWxlUmVtb3ZlQ2FsbGJhY2sobmFtZSwgZmQsIG9wdHMpKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbi8qKlxuICogU3luY2hyb25vdXMgdmVyc2lvbiBvZiBmaWxlLlxuICpcbiAqIEBwYXJhbSB7T3B0aW9uc30gb3B0aW9uc1xuICogQHJldHVybnMge0ZpbGVTeW5jT2JqZWN0fSBvYmplY3QgY29uc2lzdHMgb2YgbmFtZSwgZmQgYW5kIHJlbW92ZUNhbGxiYWNrXG4gKiBAdGhyb3dzIHtFcnJvcn0gaWYgY2Fubm90IGNyZWF0ZSBhIGZpbGVcbiAqL1xuZnVuY3Rpb24gZmlsZVN5bmMob3B0aW9ucykge1xuICB2YXJcbiAgICBhcmdzID0gX3BhcnNlQXJndW1lbnRzKG9wdGlvbnMpLFxuICAgIG9wdHMgPSBhcmdzWzBdO1xuXG4gIGNvbnN0IGRpc2NhcmRPckRldGFjaERlc2NyaXB0b3IgPSBvcHRzLmRpc2NhcmREZXNjcmlwdG9yIHx8IG9wdHMuZGV0YWNoRGVzY3JpcHRvcjtcbiAgY29uc3QgbmFtZSA9IHRtcE5hbWVTeW5jKG9wdHMpO1xuICB2YXIgZmQgPSBmcy5vcGVuU3luYyhuYW1lLCBDUkVBVEVfRkxBR1MsIG9wdHMubW9kZSB8fCBGSUxFX01PREUpO1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICBpZiAob3B0cy5kaXNjYXJkRGVzY3JpcHRvcikge1xuICAgIGZzLmNsb3NlU3luYyhmZCk7XG4gICAgZmQgPSB1bmRlZmluZWQ7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG5hbWU6IG5hbWUsXG4gICAgZmQ6IGZkLFxuICAgIHJlbW92ZUNhbGxiYWNrOiBfcHJlcGFyZVRtcEZpbGVSZW1vdmVDYWxsYmFjayhuYW1lLCBkaXNjYXJkT3JEZXRhY2hEZXNjcmlwdG9yID8gLTEgOiBmZCwgb3B0cylcbiAgfTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgdGVtcG9yYXJ5IGRpcmVjdG9yeS5cbiAqXG4gKiBAcGFyYW0geyhPcHRpb25zfGRpckNhbGxiYWNrKX0gb3B0aW9ucyB0aGUgb3B0aW9ucyBvciB0aGUgY2FsbGJhY2sgZnVuY3Rpb25cbiAqIEBwYXJhbSB7P2RpckNhbGxiYWNrfSBjYWxsYmFja1xuICovXG5mdW5jdGlvbiBkaXIob3B0aW9ucywgY2FsbGJhY2spIHtcbiAgdmFyXG4gICAgYXJncyA9IF9wYXJzZUFyZ3VtZW50cyhvcHRpb25zLCBjYWxsYmFjayksXG4gICAgb3B0cyA9IGFyZ3NbMF0sXG4gICAgY2IgPSBhcmdzWzFdO1xuXG4gIC8vIGdldHMgYSB0ZW1wb3JhcnkgZmlsZW5hbWVcbiAgdG1wTmFtZShvcHRzLCBmdW5jdGlvbiBfdG1wTmFtZUNyZWF0ZWQoZXJyLCBuYW1lKSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICBpZiAoZXJyKSByZXR1cm4gY2IoZXJyKTtcblxuICAgIC8vIGNyZWF0ZSB0aGUgZGlyZWN0b3J5XG4gICAgZnMubWtkaXIobmFtZSwgb3B0cy5tb2RlIHx8IERJUl9NT0RFLCBmdW5jdGlvbiBfZGlyQ3JlYXRlZChlcnIpIHtcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICBpZiAoZXJyKSByZXR1cm4gY2IoZXJyKTtcblxuICAgICAgY2IobnVsbCwgbmFtZSwgX3ByZXBhcmVUbXBEaXJSZW1vdmVDYWxsYmFjayhuYW1lLCBvcHRzKSk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG4vKipcbiAqIFN5bmNocm9ub3VzIHZlcnNpb24gb2YgZGlyLlxuICpcbiAqIEBwYXJhbSB7T3B0aW9uc30gb3B0aW9uc1xuICogQHJldHVybnMge0RpclN5bmNPYmplY3R9IG9iamVjdCBjb25zaXN0cyBvZiBuYW1lIGFuZCByZW1vdmVDYWxsYmFja1xuICogQHRocm93cyB7RXJyb3J9IGlmIGl0IGNhbm5vdCBjcmVhdGUgYSBkaXJlY3RvcnlcbiAqL1xuZnVuY3Rpb24gZGlyU3luYyhvcHRpb25zKSB7XG4gIHZhclxuICAgIGFyZ3MgPSBfcGFyc2VBcmd1bWVudHMob3B0aW9ucyksXG4gICAgb3B0cyA9IGFyZ3NbMF07XG5cbiAgY29uc3QgbmFtZSA9IHRtcE5hbWVTeW5jKG9wdHMpO1xuICBmcy5ta2RpclN5bmMobmFtZSwgb3B0cy5tb2RlIHx8IERJUl9NT0RFKTtcblxuICByZXR1cm4ge1xuICAgIG5hbWU6IG5hbWUsXG4gICAgcmVtb3ZlQ2FsbGJhY2s6IF9wcmVwYXJlVG1wRGlyUmVtb3ZlQ2FsbGJhY2sobmFtZSwgb3B0cylcbiAgfTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGZpbGVzIGFzeW5jaHJvbm91c2x5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBmZFBhdGhcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG5leHRcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIF9yZW1vdmVGaWxlQXN5bmMoZmRQYXRoLCBuZXh0KSB7XG4gIGNvbnN0IF9oYW5kbGVyID0gZnVuY3Rpb24gKGVycikge1xuICAgIGlmIChlcnIgJiYgIWlzRU5PRU5UKGVycikpIHtcbiAgICAgIC8vIHJlcmFpc2UgYW55IHVuYW50aWNpcGF0ZWQgZXJyb3JcbiAgICAgIHJldHVybiBuZXh0KGVycik7XG4gICAgfVxuICAgIG5leHQoKTtcbiAgfVxuXG4gIGlmICgwIDw9IGZkUGF0aFswXSlcbiAgICBmcy5jbG9zZShmZFBhdGhbMF0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgIGZzLnVubGluayhmZFBhdGhbMV0sIF9oYW5kbGVyKTtcbiAgICB9KTtcbiAgZWxzZSBmcy51bmxpbmsoZmRQYXRoWzFdLCBfaGFuZGxlcik7XG59XG5cbi8qKlxuICogUmVtb3ZlcyBmaWxlcyBzeW5jaHJvbm91c2x5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBmZFBhdGhcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIF9yZW1vdmVGaWxlU3luYyhmZFBhdGgpIHtcbiAgdHJ5IHtcbiAgICBpZiAoMCA8PSBmZFBhdGhbMF0pIGZzLmNsb3NlU3luYyhmZFBhdGhbMF0pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gcmVyYWlzZSBhbnkgdW5hbnRpY2lwYXRlZCBlcnJvclxuICAgIGlmICghaXNFQkFERihlKSAmJiAhaXNFTk9FTlQoZSkpIHRocm93IGU7XG4gIH0gZmluYWxseSB7XG4gICAgdHJ5IHtcbiAgICAgIGZzLnVubGlua1N5bmMoZmRQYXRoWzFdKTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgIC8vIHJlcmFpc2UgYW55IHVuYW50aWNpcGF0ZWQgZXJyb3JcbiAgICAgIGlmICghaXNFTk9FTlQoZSkpIHRocm93IGU7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogUHJlcGFyZXMgdGhlIGNhbGxiYWNrIGZvciByZW1vdmFsIG9mIHRoZSB0ZW1wb3JhcnkgZmlsZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSB0aGUgcGF0aCBvZiB0aGUgZmlsZVxuICogQHBhcmFtIHtudW1iZXJ9IGZkIGZpbGUgZGVzY3JpcHRvclxuICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAqIEByZXR1cm5zIHtmaWxlQ2FsbGJhY2t9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBfcHJlcGFyZVRtcEZpbGVSZW1vdmVDYWxsYmFjayhuYW1lLCBmZCwgb3B0cykge1xuICBjb25zdCByZW1vdmVDYWxsYmFja1N5bmMgPSBfcHJlcGFyZVJlbW92ZUNhbGxiYWNrKF9yZW1vdmVGaWxlU3luYywgW2ZkLCBuYW1lXSk7XG4gIGNvbnN0IHJlbW92ZUNhbGxiYWNrID0gX3ByZXBhcmVSZW1vdmVDYWxsYmFjayhfcmVtb3ZlRmlsZUFzeW5jLCBbZmQsIG5hbWVdLCByZW1vdmVDYWxsYmFja1N5bmMpO1xuXG4gIGlmICghb3B0cy5rZWVwKSBfcmVtb3ZlT2JqZWN0cy51bnNoaWZ0KHJlbW92ZUNhbGxiYWNrU3luYyk7XG5cbiAgcmV0dXJuIHJlbW92ZUNhbGxiYWNrO1xufVxuXG4vKipcbiAqIFNpbXBsZSB3cmFwcGVyIGZvciByaW1yYWYuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGRpclBhdGhcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG5leHRcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIF9yaW1yYWZSZW1vdmVEaXJXcmFwcGVyKGRpclBhdGgsIG5leHQpIHtcbiAgcmltcmFmKGRpclBhdGgsIG5leHQpO1xufVxuXG4vKipcbiAqIFNpbXBsZSB3cmFwcGVyIGZvciByaW1yYWYuc3luYy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZGlyUGF0aFxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gX3JpbXJhZlJlbW92ZURpclN5bmNXcmFwcGVyKGRpclBhdGgsIG5leHQpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gbmV4dChudWxsLCByaW1yYWYuc3luYyhkaXJQYXRoKSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBuZXh0KGVycik7XG4gIH1cbn1cblxuLyoqXG4gKiBQcmVwYXJlcyB0aGUgY2FsbGJhY2sgZm9yIHJlbW92YWwgb2YgdGhlIHRlbXBvcmFyeSBkaXJlY3RvcnkuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IHRoZSBjYWxsYmFja1xuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gX3ByZXBhcmVUbXBEaXJSZW1vdmVDYWxsYmFjayhuYW1lLCBvcHRzKSB7XG4gIGNvbnN0IHJlbW92ZUZ1bmN0aW9uID0gb3B0cy51bnNhZmVDbGVhbnVwID8gX3JpbXJhZlJlbW92ZURpcldyYXBwZXIgOiBmcy5ybWRpci5iaW5kKGZzKTtcbiAgY29uc3QgcmVtb3ZlRnVuY3Rpb25TeW5jID0gb3B0cy51bnNhZmVDbGVhbnVwID8gX3JpbXJhZlJlbW92ZURpclN5bmNXcmFwcGVyIDogZnMucm1kaXJTeW5jLmJpbmQoZnMpO1xuICBjb25zdCByZW1vdmVDYWxsYmFja1N5bmMgPSBfcHJlcGFyZVJlbW92ZUNhbGxiYWNrKHJlbW92ZUZ1bmN0aW9uU3luYywgbmFtZSk7XG4gIGNvbnN0IHJlbW92ZUNhbGxiYWNrID0gX3ByZXBhcmVSZW1vdmVDYWxsYmFjayhyZW1vdmVGdW5jdGlvbiwgbmFtZSwgcmVtb3ZlQ2FsbGJhY2tTeW5jKTtcbiAgaWYgKCFvcHRzLmtlZXApIF9yZW1vdmVPYmplY3RzLnVuc2hpZnQocmVtb3ZlQ2FsbGJhY2tTeW5jKTtcblxuICByZXR1cm4gcmVtb3ZlQ2FsbGJhY2s7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGd1YXJkZWQgZnVuY3Rpb24gd3JhcHBpbmcgdGhlIHJlbW92ZUZ1bmN0aW9uIGNhbGwuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVtb3ZlRnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBhcmdcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIF9wcmVwYXJlUmVtb3ZlQ2FsbGJhY2socmVtb3ZlRnVuY3Rpb24sIGFyZywgY2xlYW51cENhbGxiYWNrU3luYykge1xuICB2YXIgY2FsbGVkID0gZmFsc2U7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIF9jbGVhbnVwQ2FsbGJhY2sobmV4dCkge1xuICAgIG5leHQgPSBuZXh0IHx8IGZ1bmN0aW9uICgpIHt9O1xuICAgIGlmICghY2FsbGVkKSB7XG4gICAgICBjb25zdCB0b1JlbW92ZSA9IGNsZWFudXBDYWxsYmFja1N5bmMgfHwgX2NsZWFudXBDYWxsYmFjaztcbiAgICAgIGNvbnN0IGluZGV4ID0gX3JlbW92ZU9iamVjdHMuaW5kZXhPZih0b1JlbW92ZSk7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgaWYgKGluZGV4ID49IDApIF9yZW1vdmVPYmplY3RzLnNwbGljZShpbmRleCwgMSk7XG5cbiAgICAgIGNhbGxlZCA9IHRydWU7XG4gICAgICAvLyBzeW5jP1xuICAgICAgaWYgKHJlbW92ZUZ1bmN0aW9uLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJlbW92ZUZ1bmN0aW9uKGFyZyk7XG4gICAgICAgICAgcmV0dXJuIG5leHQobnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgIC8vIGlmIG5vIG5leHQgaXMgcHJvdmlkZWQgYW5kIHNpbmNlIHdlIGFyZVxuICAgICAgICAgIC8vIGluIHNpbGVudCBjbGVhbnVwIG1vZGUgb24gcHJvY2VzcyBleGl0LFxuICAgICAgICAgIC8vIHdlIHdpbGwgaWdub3JlIHRoZSBlcnJvclxuICAgICAgICAgIHJldHVybiBuZXh0KGVycik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSByZXR1cm4gcmVtb3ZlRnVuY3Rpb24oYXJnLCBuZXh0KTtcbiAgICB9IGVsc2UgcmV0dXJuIG5leHQobmV3IEVycm9yKCdjbGVhbnVwIGNhbGxiYWNrIGhhcyBhbHJlYWR5IGJlZW4gY2FsbGVkJykpO1xuICB9O1xufVxuXG4vKipcbiAqIFRoZSBnYXJiYWdlIGNvbGxlY3Rvci5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBfZ2FyYmFnZUNvbGxlY3RvcigpIHtcbiAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgaWYgKCFfZ3JhY2VmdWxDbGVhbnVwKSByZXR1cm47XG5cbiAgLy8gdGhlIGZ1bmN0aW9uIGJlaW5nIGNhbGxlZCByZW1vdmVzIGl0c2VsZiBmcm9tIF9yZW1vdmVPYmplY3RzLFxuICAvLyBsb29wIHVudGlsIF9yZW1vdmVPYmplY3RzIGlzIGVtcHR5XG4gIHdoaWxlIChfcmVtb3ZlT2JqZWN0cy5sZW5ndGgpIHtcbiAgICB0cnkge1xuICAgICAgX3JlbW92ZU9iamVjdHNbMF0oKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBhbHJlYWR5IHJlbW92ZWQ/XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogSGVscGVyIGZvciB0ZXN0aW5nIGFnYWluc3QgRUJBREYgdG8gY29tcGVuc2F0ZSBjaGFuZ2VzIG1hZGUgdG8gTm9kZSA3LnggdW5kZXIgV2luZG93cy5cbiAqL1xuZnVuY3Rpb24gaXNFQkFERihlcnJvcikge1xuICByZXR1cm4gaXNFeHBlY3RlZEVycm9yKGVycm9yLCAtRUJBREYsICdFQkFERicpO1xufVxuXG4vKipcbiAqIEhlbHBlciBmb3IgdGVzdGluZyBhZ2FpbnN0IEVOT0VOVCB0byBjb21wZW5zYXRlIGNoYW5nZXMgbWFkZSB0byBOb2RlIDcueCB1bmRlciBXaW5kb3dzLlxuICovXG5mdW5jdGlvbiBpc0VOT0VOVChlcnJvcikge1xuICByZXR1cm4gaXNFeHBlY3RlZEVycm9yKGVycm9yLCAtRU5PRU5ULCAnRU5PRU5UJyk7XG59XG5cbi8qKlxuICogSGVscGVyIHRvIGRldGVybWluZSB3aGV0aGVyIHRoZSBleHBlY3RlZCBlcnJvciBjb2RlIG1hdGNoZXMgdGhlIGFjdHVhbCBjb2RlIGFuZCBlcnJubyxcbiAqIHdoaWNoIHdpbGwgZGlmZmVyIGJldHdlZW4gdGhlIHN1cHBvcnRlZCBub2RlIHZlcnNpb25zLlxuICpcbiAqIC0gTm9kZSA+PSA3LjA6XG4gKiAgIGVycm9yLmNvZGUge3N0cmluZ31cbiAqICAgZXJyb3IuZXJybm8ge3N0cmluZ3xudW1iZXJ9IGFueSBudW1lcmljYWwgdmFsdWUgd2lsbCBiZSBuZWdhdGVkXG4gKlxuICogLSBOb2RlID49IDYuMCA8IDcuMDpcbiAqICAgZXJyb3IuY29kZSB7c3RyaW5nfVxuICogICBlcnJvci5lcnJubyB7bnVtYmVyfSBuZWdhdGVkXG4gKlxuICogLSBOb2RlID49IDQuMCA8IDYuMDogaW50cm9kdWNlcyBTeXN0ZW1FcnJvclxuICogICBlcnJvci5jb2RlIHtzdHJpbmd9XG4gKiAgIGVycm9yLmVycm5vIHtudW1iZXJ9IG5lZ2F0ZWRcbiAqXG4gKiAtIE5vZGUgPj0gMC4xMCA8IDQuMDpcbiAqICAgZXJyb3IuY29kZSB7bnVtYmVyfSBuZWdhdGVkXG4gKiAgIGVycm9yLmVycm5vIG4vYVxuICovXG5mdW5jdGlvbiBpc0V4cGVjdGVkRXJyb3IoZXJyb3IsIGNvZGUsIGVycm5vKSB7XG4gIHJldHVybiBlcnJvci5jb2RlID09PSBjb2RlIHx8IGVycm9yLmNvZGUgPT09IGVycm5vO1xufVxuXG4vKipcbiAqIEhlbHBlciB3aGljaCBkZXRlcm1pbmVzIHdoZXRoZXIgYSBzdHJpbmcgcyBpcyBibGFuaywgdGhhdCBpcyB1bmRlZmluZWQsIG9yIGVtcHR5IG9yIG51bGwuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gdHJ1ZSB3aGV0aGVyIHRoZSBzdHJpbmcgcyBpcyBibGFuaywgZmFsc2Ugb3RoZXJ3aXNlXG4gKi9cbmZ1bmN0aW9uIGlzQmxhbmsocykge1xuICByZXR1cm4gcyA9PT0gbnVsbCB8fCBzID09PSB1bmRlZmluZWQgfHwgIXMudHJpbSgpO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIGdyYWNlZnVsIGNsZWFudXAuXG4gKi9cbmZ1bmN0aW9uIHNldEdyYWNlZnVsQ2xlYW51cCgpIHtcbiAgX2dyYWNlZnVsQ2xlYW51cCA9IHRydWU7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgY3VycmVudGx5IGNvbmZpZ3VyZWQgdG1wIGRpciBmcm9tIG9zLnRtcGRpcigpLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcmV0dXJucyB7c3RyaW5nfSB0aGUgY3VycmVudGx5IGNvbmZpZ3VyZWQgdG1wIGRpclxuICovXG5mdW5jdGlvbiBfZ2V0VG1wRGlyKCkge1xuICByZXR1cm4gb3MudG1wZGlyKCk7XG59XG5cbi8qKlxuICogSWYgdGhlcmUgYXJlIG11bHRpcGxlIGRpZmZlcmVudCB2ZXJzaW9ucyBvZiB0bXAgaW4gcGxhY2UsIG1ha2Ugc3VyZSB0aGF0XG4gKiB3ZSByZWNvZ25pemUgdGhlIG9sZCBsaXN0ZW5lcnMuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqIEBwcml2YXRlXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gdHJ1ZSB3aGV0aGVyIGxpc3RlbmVyIGlzIGEgbGVnYWN5IGxpc3RlbmVyXG4gKi9cbmZ1bmN0aW9uIF9pc19sZWdhY3lfbGlzdGVuZXIobGlzdGVuZXIpIHtcbiAgcmV0dXJuIChsaXN0ZW5lci5uYW1lID09PSAnX2V4aXQnIHx8IGxpc3RlbmVyLm5hbWUgPT09ICdfdW5jYXVnaHRFeGNlcHRpb25UaHJvd24nKVxuICAgICYmIGxpc3RlbmVyLnRvU3RyaW5nKCkuaW5kZXhPZignX2dhcmJhZ2VDb2xsZWN0b3IoKTsnKSA+IC0xO1xufVxuXG4vKipcbiAqIFNhZmVseSBpbnN0YWxsIFNJR0lOVCBsaXN0ZW5lci5cbiAqXG4gKiBOT1RFOiB0aGlzIHdpbGwgb25seSB3b3JrIG9uIE9TWCBhbmQgTGludXguXG4gKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gX3NhZmVseV9pbnN0YWxsX3NpZ2ludF9saXN0ZW5lcigpIHtcblxuICBjb25zdCBsaXN0ZW5lcnMgPSBwcm9jZXNzLmxpc3RlbmVycyhTSUdJTlQpO1xuICBjb25zdCBleGlzdGluZ0xpc3RlbmVycyA9IFtdO1xuICBmb3IgKGxldCBpID0gMCwgbGVuZ3RoID0gbGlzdGVuZXJzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgbHN0bnIgPSBsaXN0ZW5lcnNbaV07XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICBpZiAobHN0bnIubmFtZSA9PT0gJ190bXAkc2lnaW50X2xpc3RlbmVyJykge1xuICAgICAgZXhpc3RpbmdMaXN0ZW5lcnMucHVzaChsc3Rucik7XG4gICAgICBwcm9jZXNzLnJlbW92ZUxpc3RlbmVyKFNJR0lOVCwgbHN0bnIpO1xuICAgIH1cbiAgfVxuICBwcm9jZXNzLm9uKFNJR0lOVCwgZnVuY3Rpb24gX3RtcCRzaWdpbnRfbGlzdGVuZXIoZG9FeGl0KSB7XG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbmd0aCA9IGV4aXN0aW5nTGlzdGVuZXJzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAvLyBsZXQgdGhlIGV4aXN0aW5nIGxpc3RlbmVyIGRvIHRoZSBnYXJiYWdlIGNvbGxlY3Rpb24gKGUuZy4gamVzdCBzYW5kYm94KVxuICAgICAgdHJ5IHtcbiAgICAgICAgZXhpc3RpbmdMaXN0ZW5lcnNbaV0oZmFsc2UpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIC8vIGlnbm9yZVxuICAgICAgfVxuICAgIH1cbiAgICB0cnkge1xuICAgICAgLy8gZm9yY2UgdGhlIGdhcmJhZ2UgY29sbGVjdG9yIGV2ZW4gaXQgaXMgY2FsbGVkIGFnYWluIGluIHRoZSBleGl0IGxpc3RlbmVyXG4gICAgICBfZ2FyYmFnZUNvbGxlY3RvcigpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoISFkb0V4aXQpIHtcbiAgICAgICAgcHJvY2Vzcy5leGl0KDApO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuICogU2FmZWx5IGluc3RhbGwgcHJvY2VzcyBleGl0IGxpc3RlbmVyLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIF9zYWZlbHlfaW5zdGFsbF9leGl0X2xpc3RlbmVyKCkge1xuICBjb25zdCBsaXN0ZW5lcnMgPSBwcm9jZXNzLmxpc3RlbmVycyhFWElUKTtcblxuICAvLyBjb2xsZWN0IGFueSBleGlzdGluZyBsaXN0ZW5lcnNcbiAgY29uc3QgZXhpc3RpbmdMaXN0ZW5lcnMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDAsIGxlbmd0aCA9IGxpc3RlbmVycy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGxzdG5yID0gbGlzdGVuZXJzW2ldO1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgLy8gVE9ETzogcmVtb3ZlIHN1cHBvcnQgZm9yIGxlZ2FjeSBsaXN0ZW5lcnMgb25jZSByZWxlYXNlIDEuMC4wIGlzIG91dFxuICAgIGlmIChsc3Ruci5uYW1lID09PSAnX3RtcCRzYWZlX2xpc3RlbmVyJyB8fCBfaXNfbGVnYWN5X2xpc3RlbmVyKGxzdG5yKSkge1xuICAgICAgLy8gd2UgbXVzdCBmb3JnZXQgYWJvdXQgdGhlIHVuY2F1Z2h0RXhjZXB0aW9uIGxpc3RlbmVyLCBob3BlZnVsbHkgaXQgaXMgb3Vyc1xuICAgICAgaWYgKGxzdG5yLm5hbWUgIT09ICdfdW5jYXVnaHRFeGNlcHRpb25UaHJvd24nKSB7XG4gICAgICAgIGV4aXN0aW5nTGlzdGVuZXJzLnB1c2gobHN0bnIpO1xuICAgICAgfVxuICAgICAgcHJvY2Vzcy5yZW1vdmVMaXN0ZW5lcihFWElULCBsc3Rucik7XG4gICAgfVxuICB9XG4gIC8vIFRPRE86IHdoYXQgd2FzIHRoZSBkYXRhIHBhcmFtZXRlciBnb29kIGZvcj9cbiAgcHJvY2Vzcy5hZGRMaXN0ZW5lcihFWElULCBmdW5jdGlvbiBfdG1wJHNhZmVfbGlzdGVuZXIoZGF0YSkge1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW5ndGggPSBleGlzdGluZ0xpc3RlbmVycy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgLy8gbGV0IHRoZSBleGlzdGluZyBsaXN0ZW5lciBkbyB0aGUgZ2FyYmFnZSBjb2xsZWN0aW9uIChlLmcuIGplc3Qgc2FuZGJveClcbiAgICAgIHRyeSB7XG4gICAgICAgIGV4aXN0aW5nTGlzdGVuZXJzW2ldKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIC8vIGlnbm9yZVxuICAgICAgfVxuICAgIH1cbiAgICBfZ2FyYmFnZUNvbGxlY3RvcigpO1xuICB9KTtcbn1cblxuX3NhZmVseV9pbnN0YWxsX2V4aXRfbGlzdGVuZXIoKTtcbl9zYWZlbHlfaW5zdGFsbF9zaWdpbnRfbGlzdGVuZXIoKTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIG9wdGlvbnMuXG4gKlxuICogQHR5cGVkZWYge09iamVjdH0gT3B0aW9uc1xuICogQHByb3BlcnR5IHs/bnVtYmVyfSB0cmllcyB0aGUgbnVtYmVyIG9mIHRyaWVzIGJlZm9yZSBnaXZlIHVwIHRoZSBuYW1lIGdlbmVyYXRpb25cbiAqIEBwcm9wZXJ0eSB7P3N0cmluZ30gdGVtcGxhdGUgdGhlIFwibWtzdGVtcFwiIGxpa2UgZmlsZW5hbWUgdGVtcGxhdGVcbiAqIEBwcm9wZXJ0eSB7P3N0cmluZ30gbmFtZSBmaXggbmFtZVxuICogQHByb3BlcnR5IHs/c3RyaW5nfSBkaXIgdGhlIHRtcCBkaXJlY3RvcnkgdG8gdXNlXG4gKiBAcHJvcGVydHkgez9zdHJpbmd9IHByZWZpeCBwcmVmaXggZm9yIHRoZSBnZW5lcmF0ZWQgbmFtZVxuICogQHByb3BlcnR5IHs/c3RyaW5nfSBwb3N0Zml4IHBvc3RmaXggZm9yIHRoZSBnZW5lcmF0ZWQgbmFtZVxuICogQHByb3BlcnR5IHs/Ym9vbGVhbn0gdW5zYWZlQ2xlYW51cCByZWN1cnNpdmVseSByZW1vdmVzIHRoZSBjcmVhdGVkIHRlbXBvcmFyeSBkaXJlY3RvcnksIGV2ZW4gd2hlbiBpdCdzIG5vdCBlbXB0eVxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gRmlsZVN5bmNPYmplY3RcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBuYW1lIHRoZSBuYW1lIG9mIHRoZSBmaWxlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gZmQgdGhlIGZpbGUgZGVzY3JpcHRvclxuICogQHByb3BlcnR5IHtmaWxlQ2FsbGJhY2t9IHJlbW92ZUNhbGxiYWNrIHRoZSBjYWxsYmFjayBmdW5jdGlvbiB0byByZW1vdmUgdGhlIGZpbGVcbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IERpclN5bmNPYmplY3RcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBuYW1lIHRoZSBuYW1lIG9mIHRoZSBkaXJlY3RvcnlcbiAqIEBwcm9wZXJ0eSB7ZmlsZUNhbGxiYWNrfSByZW1vdmVDYWxsYmFjayB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gdG8gcmVtb3ZlIHRoZSBkaXJlY3RvcnlcbiAqL1xuXG4vKipcbiAqIEBjYWxsYmFjayB0bXBOYW1lQ2FsbGJhY2tcbiAqIEBwYXJhbSB7P0Vycm9yfSBlcnIgdGhlIGVycm9yIG9iamVjdCBpZiBhbnl0aGluZyBnb2VzIHdyb25nXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSB0aGUgdGVtcG9yYXJ5IGZpbGUgbmFtZVxuICovXG5cbi8qKlxuICogQGNhbGxiYWNrIGZpbGVDYWxsYmFja1xuICogQHBhcmFtIHs/RXJyb3J9IGVyciB0aGUgZXJyb3Igb2JqZWN0IGlmIGFueXRoaW5nIGdvZXMgd3JvbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIHRoZSB0ZW1wb3JhcnkgZmlsZSBuYW1lXG4gKiBAcGFyYW0ge251bWJlcn0gZmQgdGhlIGZpbGUgZGVzY3JpcHRvclxuICogQHBhcmFtIHtjbGVhbnVwQ2FsbGJhY2t9IGZuIHRoZSBjbGVhbnVwIGNhbGxiYWNrIGZ1bmN0aW9uXG4gKi9cblxuLyoqXG4gKiBAY2FsbGJhY2sgZGlyQ2FsbGJhY2tcbiAqIEBwYXJhbSB7P0Vycm9yfSBlcnIgdGhlIGVycm9yIG9iamVjdCBpZiBhbnl0aGluZyBnb2VzIHdyb25nXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSB0aGUgdGVtcG9yYXJ5IGZpbGUgbmFtZVxuICogQHBhcmFtIHtjbGVhbnVwQ2FsbGJhY2t9IGZuIHRoZSBjbGVhbnVwIGNhbGxiYWNrIGZ1bmN0aW9uXG4gKi9cblxuLyoqXG4gKiBSZW1vdmVzIHRoZSB0ZW1wb3JhcnkgY3JlYXRlZCBmaWxlIG9yIGRpcmVjdG9yeS5cbiAqXG4gKiBAY2FsbGJhY2sgY2xlYW51cENhbGxiYWNrXG4gKiBAcGFyYW0ge3NpbXBsZUNhbGxiYWNrfSBbbmV4dF0gZnVuY3Rpb24gdG8gY2FsbCBhZnRlciBlbnRyeSB3YXMgcmVtb3ZlZFxuICovXG5cbi8qKlxuICogQ2FsbGJhY2sgZnVuY3Rpb24gZm9yIGZ1bmN0aW9uIGNvbXBvc2l0aW9uLlxuICogQHNlZSB7QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL3Jhc3ppL25vZGUtdG1wL2lzc3Vlcy81N3xyYXN6aS9ub2RlLXRtcCM1N31cbiAqXG4gKiBAY2FsbGJhY2sgc2ltcGxlQ2FsbGJhY2tcbiAqL1xuXG4vLyBleHBvcnRpbmcgYWxsIHRoZSBuZWVkZWQgbWV0aG9kc1xuXG4vLyBldmFsdWF0ZSBvcy50bXBkaXIoKSBsYXppbHksIG1haW5seSBmb3Igc2ltcGxpZnlpbmcgdGVzdGluZyBidXQgaXQgYWxzbyB3aWxsXG4vLyBhbGxvdyB1c2VycyB0byByZWNvbmZpZ3VyZSB0aGUgdGVtcG9yYXJ5IGRpcmVjdG9yeVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZS5leHBvcnRzLCAndG1wZGlyJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBjb25maWd1cmFibGU6IGZhbHNlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gX2dldFRtcERpcigpO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMuZGlyID0gZGlyO1xubW9kdWxlLmV4cG9ydHMuZGlyU3luYyA9IGRpclN5bmM7XG5cbm1vZHVsZS5leHBvcnRzLmZpbGUgPSBmaWxlO1xubW9kdWxlLmV4cG9ydHMuZmlsZVN5bmMgPSBmaWxlU3luYztcblxubW9kdWxlLmV4cG9ydHMudG1wTmFtZSA9IHRtcE5hbWU7XG5tb2R1bGUuZXhwb3J0cy50bXBOYW1lU3luYyA9IHRtcE5hbWVTeW5jO1xuXG5tb2R1bGUuZXhwb3J0cy5zZXRHcmFjZWZ1bENsZWFudXAgPSBzZXRHcmFjZWZ1bENsZWFudXA7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjcnlwdG9cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByaW1yYWZcbnJpbXJhZi5zeW5jID0gcmltcmFmU3luY1xuXG52YXIgYXNzZXJ0ID0gcmVxdWlyZShcImFzc2VydFwiKVxudmFyIHBhdGggPSByZXF1aXJlKFwicGF0aFwiKVxudmFyIGZzID0gcmVxdWlyZShcImZzXCIpXG52YXIgZ2xvYiA9IHVuZGVmaW5lZFxudHJ5IHtcbiAgZ2xvYiA9IHJlcXVpcmUoXCJnbG9iXCIpXG59IGNhdGNoIChfZXJyKSB7XG4gIC8vIHRyZWF0IGdsb2IgYXMgb3B0aW9uYWwuXG59XG52YXIgXzA2NjYgPSBwYXJzZUludCgnNjY2JywgOClcblxudmFyIGRlZmF1bHRHbG9iT3B0cyA9IHtcbiAgbm9zb3J0OiB0cnVlLFxuICBzaWxlbnQ6IHRydWVcbn1cblxuLy8gZm9yIEVNRklMRSBoYW5kbGluZ1xudmFyIHRpbWVvdXQgPSAwXG5cbnZhciBpc1dpbmRvd3MgPSAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gXCJ3aW4zMlwiKVxuXG5mdW5jdGlvbiBkZWZhdWx0cyAob3B0aW9ucykge1xuICB2YXIgbWV0aG9kcyA9IFtcbiAgICAndW5saW5rJyxcbiAgICAnY2htb2QnLFxuICAgICdzdGF0JyxcbiAgICAnbHN0YXQnLFxuICAgICdybWRpcicsXG4gICAgJ3JlYWRkaXInXG4gIF1cbiAgbWV0aG9kcy5mb3JFYWNoKGZ1bmN0aW9uKG0pIHtcbiAgICBvcHRpb25zW21dID0gb3B0aW9uc1ttXSB8fCBmc1ttXVxuICAgIG0gPSBtICsgJ1N5bmMnXG4gICAgb3B0aW9uc1ttXSA9IG9wdGlvbnNbbV0gfHwgZnNbbV1cbiAgfSlcblxuICBvcHRpb25zLm1heEJ1c3lUcmllcyA9IG9wdGlvbnMubWF4QnVzeVRyaWVzIHx8IDNcbiAgb3B0aW9ucy5lbWZpbGVXYWl0ID0gb3B0aW9ucy5lbWZpbGVXYWl0IHx8IDEwMDBcbiAgaWYgKG9wdGlvbnMuZ2xvYiA9PT0gZmFsc2UpIHtcbiAgICBvcHRpb25zLmRpc2FibGVHbG9iID0gdHJ1ZVxuICB9XG4gIGlmIChvcHRpb25zLmRpc2FibGVHbG9iICE9PSB0cnVlICYmIGdsb2IgPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IEVycm9yKCdnbG9iIGRlcGVuZGVuY3kgbm90IGZvdW5kLCBzZXQgYG9wdGlvbnMuZGlzYWJsZUdsb2IgPSB0cnVlYCBpZiBpbnRlbnRpb25hbCcpXG4gIH1cbiAgb3B0aW9ucy5kaXNhYmxlR2xvYiA9IG9wdGlvbnMuZGlzYWJsZUdsb2IgfHwgZmFsc2VcbiAgb3B0aW9ucy5nbG9iID0gb3B0aW9ucy5nbG9iIHx8IGRlZmF1bHRHbG9iT3B0c1xufVxuXG5mdW5jdGlvbiByaW1yYWYgKHAsIG9wdGlvbnMsIGNiKSB7XG4gIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNiID0gb3B0aW9uc1xuICAgIG9wdGlvbnMgPSB7fVxuICB9XG5cbiAgYXNzZXJ0KHAsICdyaW1yYWY6IG1pc3NpbmcgcGF0aCcpXG4gIGFzc2VydC5lcXVhbCh0eXBlb2YgcCwgJ3N0cmluZycsICdyaW1yYWY6IHBhdGggc2hvdWxkIGJlIGEgc3RyaW5nJylcbiAgYXNzZXJ0LmVxdWFsKHR5cGVvZiBjYiwgJ2Z1bmN0aW9uJywgJ3JpbXJhZjogY2FsbGJhY2sgZnVuY3Rpb24gcmVxdWlyZWQnKVxuICBhc3NlcnQob3B0aW9ucywgJ3JpbXJhZjogaW52YWxpZCBvcHRpb25zIGFyZ3VtZW50IHByb3ZpZGVkJylcbiAgYXNzZXJ0LmVxdWFsKHR5cGVvZiBvcHRpb25zLCAnb2JqZWN0JywgJ3JpbXJhZjogb3B0aW9ucyBzaG91bGQgYmUgb2JqZWN0JylcblxuICBkZWZhdWx0cyhvcHRpb25zKVxuXG4gIHZhciBidXN5VHJpZXMgPSAwXG4gIHZhciBlcnJTdGF0ZSA9IG51bGxcbiAgdmFyIG4gPSAwXG5cbiAgaWYgKG9wdGlvbnMuZGlzYWJsZUdsb2IgfHwgIWdsb2IuaGFzTWFnaWMocCkpXG4gICAgcmV0dXJuIGFmdGVyR2xvYihudWxsLCBbcF0pXG5cbiAgb3B0aW9ucy5sc3RhdChwLCBmdW5jdGlvbiAoZXIsIHN0YXQpIHtcbiAgICBpZiAoIWVyKVxuICAgICAgcmV0dXJuIGFmdGVyR2xvYihudWxsLCBbcF0pXG5cbiAgICBnbG9iKHAsIG9wdGlvbnMuZ2xvYiwgYWZ0ZXJHbG9iKVxuICB9KVxuXG4gIGZ1bmN0aW9uIG5leHQgKGVyKSB7XG4gICAgZXJyU3RhdGUgPSBlcnJTdGF0ZSB8fCBlclxuICAgIGlmICgtLW4gPT09IDApXG4gICAgICBjYihlcnJTdGF0ZSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGFmdGVyR2xvYiAoZXIsIHJlc3VsdHMpIHtcbiAgICBpZiAoZXIpXG4gICAgICByZXR1cm4gY2IoZXIpXG5cbiAgICBuID0gcmVzdWx0cy5sZW5ndGhcbiAgICBpZiAobiA9PT0gMClcbiAgICAgIHJldHVybiBjYigpXG5cbiAgICByZXN1bHRzLmZvckVhY2goZnVuY3Rpb24gKHApIHtcbiAgICAgIHJpbXJhZl8ocCwgb3B0aW9ucywgZnVuY3Rpb24gQ0IgKGVyKSB7XG4gICAgICAgIGlmIChlcikge1xuICAgICAgICAgIGlmICgoZXIuY29kZSA9PT0gXCJFQlVTWVwiIHx8IGVyLmNvZGUgPT09IFwiRU5PVEVNUFRZXCIgfHwgZXIuY29kZSA9PT0gXCJFUEVSTVwiKSAmJlxuICAgICAgICAgICAgICBidXN5VHJpZXMgPCBvcHRpb25zLm1heEJ1c3lUcmllcykge1xuICAgICAgICAgICAgYnVzeVRyaWVzICsrXG4gICAgICAgICAgICB2YXIgdGltZSA9IGJ1c3lUcmllcyAqIDEwMFxuICAgICAgICAgICAgLy8gdHJ5IGFnYWluLCB3aXRoIHRoZSBzYW1lIGV4YWN0IGNhbGxiYWNrIGFzIHRoaXMgb25lLlxuICAgICAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICByaW1yYWZfKHAsIG9wdGlvbnMsIENCKVxuICAgICAgICAgICAgfSwgdGltZSlcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyB0aGlzIG9uZSB3b24ndCBoYXBwZW4gaWYgZ3JhY2VmdWwtZnMgaXMgdXNlZC5cbiAgICAgICAgICBpZiAoZXIuY29kZSA9PT0gXCJFTUZJTEVcIiAmJiB0aW1lb3V0IDwgb3B0aW9ucy5lbWZpbGVXYWl0KSB7XG4gICAgICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHJpbXJhZl8ocCwgb3B0aW9ucywgQ0IpXG4gICAgICAgICAgICB9LCB0aW1lb3V0ICsrKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGFscmVhZHkgZ29uZVxuICAgICAgICAgIGlmIChlci5jb2RlID09PSBcIkVOT0VOVFwiKSBlciA9IG51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIHRpbWVvdXQgPSAwXG4gICAgICAgIG5leHQoZXIpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cblxuLy8gVHdvIHBvc3NpYmxlIHN0cmF0ZWdpZXMuXG4vLyAxLiBBc3N1bWUgaXQncyBhIGZpbGUuICB1bmxpbmsgaXQsIHRoZW4gZG8gdGhlIGRpciBzdHVmZiBvbiBFUEVSTSBvciBFSVNESVJcbi8vIDIuIEFzc3VtZSBpdCdzIGEgZGlyZWN0b3J5LiAgcmVhZGRpciwgdGhlbiBkbyB0aGUgZmlsZSBzdHVmZiBvbiBFTk9URElSXG4vL1xuLy8gQm90aCByZXN1bHQgaW4gYW4gZXh0cmEgc3lzY2FsbCB3aGVuIHlvdSBndWVzcyB3cm9uZy4gIEhvd2V2ZXIsIHRoZXJlXG4vLyBhcmUgbGlrZWx5IGZhciBtb3JlIG5vcm1hbCBmaWxlcyBpbiB0aGUgd29ybGQgdGhhbiBkaXJlY3Rvcmllcy4gIFRoaXNcbi8vIGlzIGJhc2VkIG9uIHRoZSBhc3N1bXB0aW9uIHRoYXQgYSB0aGUgYXZlcmFnZSBudW1iZXIgb2YgZmlsZXMgcGVyXG4vLyBkaXJlY3RvcnkgaXMgPj0gMS5cbi8vXG4vLyBJZiBhbnlvbmUgZXZlciBjb21wbGFpbnMgYWJvdXQgdGhpcywgdGhlbiBJIGd1ZXNzIHRoZSBzdHJhdGVneSBjb3VsZFxuLy8gYmUgbWFkZSBjb25maWd1cmFibGUgc29tZWhvdy4gIEJ1dCB1bnRpbCB0aGVuLCBZQUdOSS5cbmZ1bmN0aW9uIHJpbXJhZl8gKHAsIG9wdGlvbnMsIGNiKSB7XG4gIGFzc2VydChwKVxuICBhc3NlcnQob3B0aW9ucylcbiAgYXNzZXJ0KHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJylcblxuICAvLyBzdW5vcyBsZXRzIHRoZSByb290IHVzZXIgdW5saW5rIGRpcmVjdG9yaWVzLCB3aGljaCBpcy4uLiB3ZWlyZC5cbiAgLy8gc28gd2UgaGF2ZSB0byBsc3RhdCBoZXJlIGFuZCBtYWtlIHN1cmUgaXQncyBub3QgYSBkaXIuXG4gIG9wdGlvbnMubHN0YXQocCwgZnVuY3Rpb24gKGVyLCBzdCkge1xuICAgIGlmIChlciAmJiBlci5jb2RlID09PSBcIkVOT0VOVFwiKVxuICAgICAgcmV0dXJuIGNiKG51bGwpXG5cbiAgICAvLyBXaW5kb3dzIGNhbiBFUEVSTSBvbiBzdGF0LiAgTGlmZSBpcyBzdWZmZXJpbmcuXG4gICAgaWYgKGVyICYmIGVyLmNvZGUgPT09IFwiRVBFUk1cIiAmJiBpc1dpbmRvd3MpXG4gICAgICBmaXhXaW5FUEVSTShwLCBvcHRpb25zLCBlciwgY2IpXG5cbiAgICBpZiAoc3QgJiYgc3QuaXNEaXJlY3RvcnkoKSlcbiAgICAgIHJldHVybiBybWRpcihwLCBvcHRpb25zLCBlciwgY2IpXG5cbiAgICBvcHRpb25zLnVubGluayhwLCBmdW5jdGlvbiAoZXIpIHtcbiAgICAgIGlmIChlcikge1xuICAgICAgICBpZiAoZXIuY29kZSA9PT0gXCJFTk9FTlRcIilcbiAgICAgICAgICByZXR1cm4gY2IobnVsbClcbiAgICAgICAgaWYgKGVyLmNvZGUgPT09IFwiRVBFUk1cIilcbiAgICAgICAgICByZXR1cm4gKGlzV2luZG93cylcbiAgICAgICAgICAgID8gZml4V2luRVBFUk0ocCwgb3B0aW9ucywgZXIsIGNiKVxuICAgICAgICAgICAgOiBybWRpcihwLCBvcHRpb25zLCBlciwgY2IpXG4gICAgICAgIGlmIChlci5jb2RlID09PSBcIkVJU0RJUlwiKVxuICAgICAgICAgIHJldHVybiBybWRpcihwLCBvcHRpb25zLCBlciwgY2IpXG4gICAgICB9XG4gICAgICByZXR1cm4gY2IoZXIpXG4gICAgfSlcbiAgfSlcbn1cblxuZnVuY3Rpb24gZml4V2luRVBFUk0gKHAsIG9wdGlvbnMsIGVyLCBjYikge1xuICBhc3NlcnQocClcbiAgYXNzZXJ0KG9wdGlvbnMpXG4gIGFzc2VydCh0eXBlb2YgY2IgPT09ICdmdW5jdGlvbicpXG4gIGlmIChlcilcbiAgICBhc3NlcnQoZXIgaW5zdGFuY2VvZiBFcnJvcilcblxuICBvcHRpb25zLmNobW9kKHAsIF8wNjY2LCBmdW5jdGlvbiAoZXIyKSB7XG4gICAgaWYgKGVyMilcbiAgICAgIGNiKGVyMi5jb2RlID09PSBcIkVOT0VOVFwiID8gbnVsbCA6IGVyKVxuICAgIGVsc2VcbiAgICAgIG9wdGlvbnMuc3RhdChwLCBmdW5jdGlvbihlcjMsIHN0YXRzKSB7XG4gICAgICAgIGlmIChlcjMpXG4gICAgICAgICAgY2IoZXIzLmNvZGUgPT09IFwiRU5PRU5UXCIgPyBudWxsIDogZXIpXG4gICAgICAgIGVsc2UgaWYgKHN0YXRzLmlzRGlyZWN0b3J5KCkpXG4gICAgICAgICAgcm1kaXIocCwgb3B0aW9ucywgZXIsIGNiKVxuICAgICAgICBlbHNlXG4gICAgICAgICAgb3B0aW9ucy51bmxpbmsocCwgY2IpXG4gICAgICB9KVxuICB9KVxufVxuXG5mdW5jdGlvbiBmaXhXaW5FUEVSTVN5bmMgKHAsIG9wdGlvbnMsIGVyKSB7XG4gIGFzc2VydChwKVxuICBhc3NlcnQob3B0aW9ucylcbiAgaWYgKGVyKVxuICAgIGFzc2VydChlciBpbnN0YW5jZW9mIEVycm9yKVxuXG4gIHRyeSB7XG4gICAgb3B0aW9ucy5jaG1vZFN5bmMocCwgXzA2NjYpXG4gIH0gY2F0Y2ggKGVyMikge1xuICAgIGlmIChlcjIuY29kZSA9PT0gXCJFTk9FTlRcIilcbiAgICAgIHJldHVyblxuICAgIGVsc2VcbiAgICAgIHRocm93IGVyXG4gIH1cblxuICB0cnkge1xuICAgIHZhciBzdGF0cyA9IG9wdGlvbnMuc3RhdFN5bmMocClcbiAgfSBjYXRjaCAoZXIzKSB7XG4gICAgaWYgKGVyMy5jb2RlID09PSBcIkVOT0VOVFwiKVxuICAgICAgcmV0dXJuXG4gICAgZWxzZVxuICAgICAgdGhyb3cgZXJcbiAgfVxuXG4gIGlmIChzdGF0cy5pc0RpcmVjdG9yeSgpKVxuICAgIHJtZGlyU3luYyhwLCBvcHRpb25zLCBlcilcbiAgZWxzZVxuICAgIG9wdGlvbnMudW5saW5rU3luYyhwKVxufVxuXG5mdW5jdGlvbiBybWRpciAocCwgb3B0aW9ucywgb3JpZ2luYWxFciwgY2IpIHtcbiAgYXNzZXJ0KHApXG4gIGFzc2VydChvcHRpb25zKVxuICBpZiAob3JpZ2luYWxFcilcbiAgICBhc3NlcnQob3JpZ2luYWxFciBpbnN0YW5jZW9mIEVycm9yKVxuICBhc3NlcnQodHlwZW9mIGNiID09PSAnZnVuY3Rpb24nKVxuXG4gIC8vIHRyeSB0byBybWRpciBmaXJzdCwgYW5kIG9ubHkgcmVhZGRpciBvbiBFTk9URU1QVFkgb3IgRUVYSVNUIChTdW5PUylcbiAgLy8gaWYgd2UgZ3Vlc3NlZCB3cm9uZywgYW5kIGl0J3Mgbm90IGEgZGlyZWN0b3J5LCB0aGVuXG4gIC8vIHJhaXNlIHRoZSBvcmlnaW5hbCBlcnJvci5cbiAgb3B0aW9ucy5ybWRpcihwLCBmdW5jdGlvbiAoZXIpIHtcbiAgICBpZiAoZXIgJiYgKGVyLmNvZGUgPT09IFwiRU5PVEVNUFRZXCIgfHwgZXIuY29kZSA9PT0gXCJFRVhJU1RcIiB8fCBlci5jb2RlID09PSBcIkVQRVJNXCIpKVxuICAgICAgcm1raWRzKHAsIG9wdGlvbnMsIGNiKVxuICAgIGVsc2UgaWYgKGVyICYmIGVyLmNvZGUgPT09IFwiRU5PVERJUlwiKVxuICAgICAgY2Iob3JpZ2luYWxFcilcbiAgICBlbHNlXG4gICAgICBjYihlcilcbiAgfSlcbn1cblxuZnVuY3Rpb24gcm1raWRzKHAsIG9wdGlvbnMsIGNiKSB7XG4gIGFzc2VydChwKVxuICBhc3NlcnQob3B0aW9ucylcbiAgYXNzZXJ0KHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJylcblxuICBvcHRpb25zLnJlYWRkaXIocCwgZnVuY3Rpb24gKGVyLCBmaWxlcykge1xuICAgIGlmIChlcilcbiAgICAgIHJldHVybiBjYihlcilcbiAgICB2YXIgbiA9IGZpbGVzLmxlbmd0aFxuICAgIGlmIChuID09PSAwKVxuICAgICAgcmV0dXJuIG9wdGlvbnMucm1kaXIocCwgY2IpXG4gICAgdmFyIGVyclN0YXRlXG4gICAgZmlsZXMuZm9yRWFjaChmdW5jdGlvbiAoZikge1xuICAgICAgcmltcmFmKHBhdGguam9pbihwLCBmKSwgb3B0aW9ucywgZnVuY3Rpb24gKGVyKSB7XG4gICAgICAgIGlmIChlcnJTdGF0ZSlcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgaWYgKGVyKVxuICAgICAgICAgIHJldHVybiBjYihlcnJTdGF0ZSA9IGVyKVxuICAgICAgICBpZiAoLS1uID09PSAwKVxuICAgICAgICAgIG9wdGlvbnMucm1kaXIocCwgY2IpXG4gICAgICB9KVxuICAgIH0pXG4gIH0pXG59XG5cbi8vIHRoaXMgbG9va3Mgc2ltcGxlciwgYW5kIGlzIHN0cmljdGx5ICpmYXN0ZXIqLCBidXQgd2lsbFxuLy8gdGllIHVwIHRoZSBKYXZhU2NyaXB0IHRocmVhZCBhbmQgZmFpbCBvbiBleGNlc3NpdmVseVxuLy8gZGVlcCBkaXJlY3RvcnkgdHJlZXMuXG5mdW5jdGlvbiByaW1yYWZTeW5jIChwLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gIGRlZmF1bHRzKG9wdGlvbnMpXG5cbiAgYXNzZXJ0KHAsICdyaW1yYWY6IG1pc3NpbmcgcGF0aCcpXG4gIGFzc2VydC5lcXVhbCh0eXBlb2YgcCwgJ3N0cmluZycsICdyaW1yYWY6IHBhdGggc2hvdWxkIGJlIGEgc3RyaW5nJylcbiAgYXNzZXJ0KG9wdGlvbnMsICdyaW1yYWY6IG1pc3Npbmcgb3B0aW9ucycpXG4gIGFzc2VydC5lcXVhbCh0eXBlb2Ygb3B0aW9ucywgJ29iamVjdCcsICdyaW1yYWY6IG9wdGlvbnMgc2hvdWxkIGJlIG9iamVjdCcpXG5cbiAgdmFyIHJlc3VsdHNcblxuICBpZiAob3B0aW9ucy5kaXNhYmxlR2xvYiB8fCAhZ2xvYi5oYXNNYWdpYyhwKSkge1xuICAgIHJlc3VsdHMgPSBbcF1cbiAgfSBlbHNlIHtcbiAgICB0cnkge1xuICAgICAgb3B0aW9ucy5sc3RhdFN5bmMocClcbiAgICAgIHJlc3VsdHMgPSBbcF1cbiAgICB9IGNhdGNoIChlcikge1xuICAgICAgcmVzdWx0cyA9IGdsb2Iuc3luYyhwLCBvcHRpb25zLmdsb2IpXG4gICAgfVxuICB9XG5cbiAgaWYgKCFyZXN1bHRzLmxlbmd0aClcbiAgICByZXR1cm5cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc3VsdHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgcCA9IHJlc3VsdHNbaV1cblxuICAgIHRyeSB7XG4gICAgICB2YXIgc3QgPSBvcHRpb25zLmxzdGF0U3luYyhwKVxuICAgIH0gY2F0Y2ggKGVyKSB7XG4gICAgICBpZiAoZXIuY29kZSA9PT0gXCJFTk9FTlRcIilcbiAgICAgICAgcmV0dXJuXG5cbiAgICAgIC8vIFdpbmRvd3MgY2FuIEVQRVJNIG9uIHN0YXQuICBMaWZlIGlzIHN1ZmZlcmluZy5cbiAgICAgIGlmIChlci5jb2RlID09PSBcIkVQRVJNXCIgJiYgaXNXaW5kb3dzKVxuICAgICAgICBmaXhXaW5FUEVSTVN5bmMocCwgb3B0aW9ucywgZXIpXG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIC8vIHN1bm9zIGxldHMgdGhlIHJvb3QgdXNlciB1bmxpbmsgZGlyZWN0b3JpZXMsIHdoaWNoIGlzLi4uIHdlaXJkLlxuICAgICAgaWYgKHN0ICYmIHN0LmlzRGlyZWN0b3J5KCkpXG4gICAgICAgIHJtZGlyU3luYyhwLCBvcHRpb25zLCBudWxsKVxuICAgICAgZWxzZVxuICAgICAgICBvcHRpb25zLnVubGlua1N5bmMocClcbiAgICB9IGNhdGNoIChlcikge1xuICAgICAgaWYgKGVyLmNvZGUgPT09IFwiRU5PRU5UXCIpXG4gICAgICAgIHJldHVyblxuICAgICAgaWYgKGVyLmNvZGUgPT09IFwiRVBFUk1cIilcbiAgICAgICAgcmV0dXJuIGlzV2luZG93cyA/IGZpeFdpbkVQRVJNU3luYyhwLCBvcHRpb25zLCBlcikgOiBybWRpclN5bmMocCwgb3B0aW9ucywgZXIpXG4gICAgICBpZiAoZXIuY29kZSAhPT0gXCJFSVNESVJcIilcbiAgICAgICAgdGhyb3cgZXJcblxuICAgICAgcm1kaXJTeW5jKHAsIG9wdGlvbnMsIGVyKVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBybWRpclN5bmMgKHAsIG9wdGlvbnMsIG9yaWdpbmFsRXIpIHtcbiAgYXNzZXJ0KHApXG4gIGFzc2VydChvcHRpb25zKVxuICBpZiAob3JpZ2luYWxFcilcbiAgICBhc3NlcnQob3JpZ2luYWxFciBpbnN0YW5jZW9mIEVycm9yKVxuXG4gIHRyeSB7XG4gICAgb3B0aW9ucy5ybWRpclN5bmMocClcbiAgfSBjYXRjaCAoZXIpIHtcbiAgICBpZiAoZXIuY29kZSA9PT0gXCJFTk9FTlRcIilcbiAgICAgIHJldHVyblxuICAgIGlmIChlci5jb2RlID09PSBcIkVOT1RESVJcIilcbiAgICAgIHRocm93IG9yaWdpbmFsRXJcbiAgICBpZiAoZXIuY29kZSA9PT0gXCJFTk9URU1QVFlcIiB8fCBlci5jb2RlID09PSBcIkVFWElTVFwiIHx8IGVyLmNvZGUgPT09IFwiRVBFUk1cIilcbiAgICAgIHJta2lkc1N5bmMocCwgb3B0aW9ucylcbiAgfVxufVxuXG5mdW5jdGlvbiBybWtpZHNTeW5jIChwLCBvcHRpb25zKSB7XG4gIGFzc2VydChwKVxuICBhc3NlcnQob3B0aW9ucylcbiAgb3B0aW9ucy5yZWFkZGlyU3luYyhwKS5mb3JFYWNoKGZ1bmN0aW9uIChmKSB7XG4gICAgcmltcmFmU3luYyhwYXRoLmpvaW4ocCwgZiksIG9wdGlvbnMpXG4gIH0pXG5cbiAgLy8gV2Ugb25seSBlbmQgdXAgaGVyZSBvbmNlIHdlIGdvdCBFTk9URU1QVFkgYXQgbGVhc3Qgb25jZSwgYW5kXG4gIC8vIGF0IHRoaXMgcG9pbnQsIHdlIGFyZSBndWFyYW50ZWVkIHRvIGhhdmUgcmVtb3ZlZCBhbGwgdGhlIGtpZHMuXG4gIC8vIFNvLCB3ZSBrbm93IHRoYXQgaXQgd29uJ3QgYmUgRU5PRU5UIG9yIEVOT1RESVIgb3IgYW55dGhpbmcgZWxzZS5cbiAgLy8gdHJ5IHJlYWxseSBoYXJkIHRvIGRlbGV0ZSBzdHVmZiBvbiB3aW5kb3dzLCBiZWNhdXNlIGl0IGhhcyBhXG4gIC8vIFBST0ZPVU5ETFkgYW5ub3lpbmcgaGFiaXQgb2Ygbm90IGNsb3NpbmcgaGFuZGxlcyBwcm9tcHRseSB3aGVuXG4gIC8vIGZpbGVzIGFyZSBkZWxldGVkLCByZXN1bHRpbmcgaW4gc3B1cmlvdXMgRU5PVEVNUFRZIGVycm9ycy5cbiAgdmFyIHJldHJpZXMgPSBpc1dpbmRvd3MgPyAxMDAgOiAxXG4gIHZhciBpID0gMFxuICBkbyB7XG4gICAgdmFyIHRocmV3ID0gdHJ1ZVxuICAgIHRyeSB7XG4gICAgICB2YXIgcmV0ID0gb3B0aW9ucy5ybWRpclN5bmMocCwgb3B0aW9ucylcbiAgICAgIHRocmV3ID0gZmFsc2VcbiAgICAgIHJldHVybiByZXRcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKCsraSA8IHJldHJpZXMgJiYgdGhyZXcpXG4gICAgICAgIGNvbnRpbnVlXG4gICAgfVxuICB9IHdoaWxlICh0cnVlKVxufVxuIiwiLy8gQXBwcm9hY2g6XG4vL1xuLy8gMS4gR2V0IHRoZSBtaW5pbWF0Y2ggc2V0XG4vLyAyLiBGb3IgZWFjaCBwYXR0ZXJuIGluIHRoZSBzZXQsIFBST0NFU1MocGF0dGVybiwgZmFsc2UpXG4vLyAzLiBTdG9yZSBtYXRjaGVzIHBlci1zZXQsIHRoZW4gdW5pcSB0aGVtXG4vL1xuLy8gUFJPQ0VTUyhwYXR0ZXJuLCBpbkdsb2JTdGFyKVxuLy8gR2V0IHRoZSBmaXJzdCBbbl0gaXRlbXMgZnJvbSBwYXR0ZXJuIHRoYXQgYXJlIGFsbCBzdHJpbmdzXG4vLyBKb2luIHRoZXNlIHRvZ2V0aGVyLiAgVGhpcyBpcyBQUkVGSVguXG4vLyAgIElmIHRoZXJlIGlzIG5vIG1vcmUgcmVtYWluaW5nLCB0aGVuIHN0YXQoUFJFRklYKSBhbmRcbi8vICAgYWRkIHRvIG1hdGNoZXMgaWYgaXQgc3VjY2VlZHMuICBFTkQuXG4vL1xuLy8gSWYgaW5HbG9iU3RhciBhbmQgUFJFRklYIGlzIHN5bWxpbmsgYW5kIHBvaW50cyB0byBkaXJcbi8vICAgc2V0IEVOVFJJRVMgPSBbXVxuLy8gZWxzZSByZWFkZGlyKFBSRUZJWCkgYXMgRU5UUklFU1xuLy8gICBJZiBmYWlsLCBFTkRcbi8vXG4vLyB3aXRoIEVOVFJJRVNcbi8vICAgSWYgcGF0dGVybltuXSBpcyBHTE9CU1RBUlxuLy8gICAgIC8vIGhhbmRsZSB0aGUgY2FzZSB3aGVyZSB0aGUgZ2xvYnN0YXIgbWF0Y2ggaXMgZW1wdHlcbi8vICAgICAvLyBieSBwcnVuaW5nIGl0IG91dCwgYW5kIHRlc3RpbmcgdGhlIHJlc3VsdGluZyBwYXR0ZXJuXG4vLyAgICAgUFJPQ0VTUyhwYXR0ZXJuWzAuLm5dICsgcGF0dGVybltuKzEgLi4gJF0sIGZhbHNlKVxuLy8gICAgIC8vIGhhbmRsZSBvdGhlciBjYXNlcy5cbi8vICAgICBmb3IgRU5UUlkgaW4gRU5UUklFUyAobm90IGRvdGZpbGVzKVxuLy8gICAgICAgLy8gYXR0YWNoIGdsb2JzdGFyICsgdGFpbCBvbnRvIHRoZSBlbnRyeVxuLy8gICAgICAgLy8gTWFyayB0aGF0IHRoaXMgZW50cnkgaXMgYSBnbG9ic3RhciBtYXRjaFxuLy8gICAgICAgUFJPQ0VTUyhwYXR0ZXJuWzAuLm5dICsgRU5UUlkgKyBwYXR0ZXJuW24gLi4gJF0sIHRydWUpXG4vL1xuLy8gICBlbHNlIC8vIG5vdCBnbG9ic3RhclxuLy8gICAgIGZvciBFTlRSWSBpbiBFTlRSSUVTIChub3QgZG90ZmlsZXMsIHVubGVzcyBwYXR0ZXJuW25dIGlzIGRvdClcbi8vICAgICAgIFRlc3QgRU5UUlkgYWdhaW5zdCBwYXR0ZXJuW25dXG4vLyAgICAgICBJZiBmYWlscywgY29udGludWVcbi8vICAgICAgIElmIHBhc3NlcywgUFJPQ0VTUyhwYXR0ZXJuWzAuLm5dICsgaXRlbSArIHBhdHRlcm5bbisxIC4uICRdKVxuLy9cbi8vIENhdmVhdDpcbi8vICAgQ2FjaGUgYWxsIHN0YXRzIGFuZCByZWFkZGlycyByZXN1bHRzIHRvIG1pbmltaXplIHN5c2NhbGwuICBTaW5jZSBhbGxcbi8vICAgd2UgZXZlciBjYXJlIGFib3V0IGlzIGV4aXN0ZW5jZSBhbmQgZGlyZWN0b3J5LW5lc3MsIHdlIGNhbiBqdXN0IGtlZXBcbi8vICAgYHRydWVgIGZvciBmaWxlcywgYW5kIFtjaGlsZHJlbiwuLi5dIGZvciBkaXJlY3Rvcmllcywgb3IgYGZhbHNlYCBmb3Jcbi8vICAgdGhpbmdzIHRoYXQgZG9uJ3QgZXhpc3QuXG5cbm1vZHVsZS5leHBvcnRzID0gZ2xvYlxuXG52YXIgZnMgPSByZXF1aXJlKCdmcycpXG52YXIgcnAgPSByZXF1aXJlKCdmcy5yZWFscGF0aCcpXG52YXIgbWluaW1hdGNoID0gcmVxdWlyZSgnbWluaW1hdGNoJylcbnZhciBNaW5pbWF0Y2ggPSBtaW5pbWF0Y2guTWluaW1hdGNoXG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpXG52YXIgRUUgPSByZXF1aXJlKCdldmVudHMnKS5FdmVudEVtaXR0ZXJcbnZhciBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG52YXIgYXNzZXJ0ID0gcmVxdWlyZSgnYXNzZXJ0JylcbnZhciBpc0Fic29sdXRlID0gcmVxdWlyZSgncGF0aC1pcy1hYnNvbHV0ZScpXG52YXIgZ2xvYlN5bmMgPSByZXF1aXJlKCcuL3N5bmMuanMnKVxudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uLmpzJylcbnZhciBhbHBoYXNvcnQgPSBjb21tb24uYWxwaGFzb3J0XG52YXIgYWxwaGFzb3J0aSA9IGNvbW1vbi5hbHBoYXNvcnRpXG52YXIgc2V0b3B0cyA9IGNvbW1vbi5zZXRvcHRzXG52YXIgb3duUHJvcCA9IGNvbW1vbi5vd25Qcm9wXG52YXIgaW5mbGlnaHQgPSByZXF1aXJlKCdpbmZsaWdodCcpXG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKVxudmFyIGNoaWxkcmVuSWdub3JlZCA9IGNvbW1vbi5jaGlsZHJlbklnbm9yZWRcbnZhciBpc0lnbm9yZWQgPSBjb21tb24uaXNJZ25vcmVkXG5cbnZhciBvbmNlID0gcmVxdWlyZSgnb25jZScpXG5cbmZ1bmN0aW9uIGdsb2IgKHBhdHRlcm4sIG9wdGlvbnMsIGNiKSB7XG4gIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykgY2IgPSBvcHRpb25zLCBvcHRpb25zID0ge31cbiAgaWYgKCFvcHRpb25zKSBvcHRpb25zID0ge31cblxuICBpZiAob3B0aW9ucy5zeW5jKSB7XG4gICAgaWYgKGNiKVxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignY2FsbGJhY2sgcHJvdmlkZWQgdG8gc3luYyBnbG9iJylcbiAgICByZXR1cm4gZ2xvYlN5bmMocGF0dGVybiwgb3B0aW9ucylcbiAgfVxuXG4gIHJldHVybiBuZXcgR2xvYihwYXR0ZXJuLCBvcHRpb25zLCBjYilcbn1cblxuZ2xvYi5zeW5jID0gZ2xvYlN5bmNcbnZhciBHbG9iU3luYyA9IGdsb2IuR2xvYlN5bmMgPSBnbG9iU3luYy5HbG9iU3luY1xuXG4vLyBvbGQgYXBpIHN1cmZhY2Vcbmdsb2IuZ2xvYiA9IGdsb2JcblxuZnVuY3Rpb24gZXh0ZW5kIChvcmlnaW4sIGFkZCkge1xuICBpZiAoYWRkID09PSBudWxsIHx8IHR5cGVvZiBhZGQgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIG9yaWdpblxuICB9XG5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhhZGQpXG4gIHZhciBpID0ga2V5cy5sZW5ndGhcbiAgd2hpbGUgKGktLSkge1xuICAgIG9yaWdpbltrZXlzW2ldXSA9IGFkZFtrZXlzW2ldXVxuICB9XG4gIHJldHVybiBvcmlnaW5cbn1cblxuZ2xvYi5oYXNNYWdpYyA9IGZ1bmN0aW9uIChwYXR0ZXJuLCBvcHRpb25zXykge1xuICB2YXIgb3B0aW9ucyA9IGV4dGVuZCh7fSwgb3B0aW9uc18pXG4gIG9wdGlvbnMubm9wcm9jZXNzID0gdHJ1ZVxuXG4gIHZhciBnID0gbmV3IEdsb2IocGF0dGVybiwgb3B0aW9ucylcbiAgdmFyIHNldCA9IGcubWluaW1hdGNoLnNldFxuXG4gIGlmICghcGF0dGVybilcbiAgICByZXR1cm4gZmFsc2VcblxuICBpZiAoc2V0Lmxlbmd0aCA+IDEpXG4gICAgcmV0dXJuIHRydWVcblxuICBmb3IgKHZhciBqID0gMDsgaiA8IHNldFswXS5sZW5ndGg7IGorKykge1xuICAgIGlmICh0eXBlb2Ygc2V0WzBdW2pdICE9PSAnc3RyaW5nJylcbiAgICAgIHJldHVybiB0cnVlXG4gIH1cblxuICByZXR1cm4gZmFsc2Vcbn1cblxuZ2xvYi5HbG9iID0gR2xvYlxuaW5oZXJpdHMoR2xvYiwgRUUpXG5mdW5jdGlvbiBHbG9iIChwYXR0ZXJuLCBvcHRpb25zLCBjYikge1xuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYiA9IG9wdGlvbnNcbiAgICBvcHRpb25zID0gbnVsbFxuICB9XG5cbiAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5zeW5jKSB7XG4gICAgaWYgKGNiKVxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignY2FsbGJhY2sgcHJvdmlkZWQgdG8gc3luYyBnbG9iJylcbiAgICByZXR1cm4gbmV3IEdsb2JTeW5jKHBhdHRlcm4sIG9wdGlvbnMpXG4gIH1cblxuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgR2xvYikpXG4gICAgcmV0dXJuIG5ldyBHbG9iKHBhdHRlcm4sIG9wdGlvbnMsIGNiKVxuXG4gIHNldG9wdHModGhpcywgcGF0dGVybiwgb3B0aW9ucylcbiAgdGhpcy5fZGlkUmVhbFBhdGggPSBmYWxzZVxuXG4gIC8vIHByb2Nlc3MgZWFjaCBwYXR0ZXJuIGluIHRoZSBtaW5pbWF0Y2ggc2V0XG4gIHZhciBuID0gdGhpcy5taW5pbWF0Y2guc2V0Lmxlbmd0aFxuXG4gIC8vIFRoZSBtYXRjaGVzIGFyZSBzdG9yZWQgYXMgezxmaWxlbmFtZT46IHRydWUsLi4ufSBzbyB0aGF0XG4gIC8vIGR1cGxpY2F0ZXMgYXJlIGF1dG9tYWdpY2FsbHkgcHJ1bmVkLlxuICAvLyBMYXRlciwgd2UgZG8gYW4gT2JqZWN0LmtleXMoKSBvbiB0aGVzZS5cbiAgLy8gS2VlcCB0aGVtIGFzIGEgbGlzdCBzbyB3ZSBjYW4gZmlsbCBpbiB3aGVuIG5vbnVsbCBpcyBzZXQuXG4gIHRoaXMubWF0Y2hlcyA9IG5ldyBBcnJheShuKVxuXG4gIGlmICh0eXBlb2YgY2IgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYiA9IG9uY2UoY2IpXG4gICAgdGhpcy5vbignZXJyb3InLCBjYilcbiAgICB0aGlzLm9uKCdlbmQnLCBmdW5jdGlvbiAobWF0Y2hlcykge1xuICAgICAgY2IobnVsbCwgbWF0Y2hlcylcbiAgICB9KVxuICB9XG5cbiAgdmFyIHNlbGYgPSB0aGlzXG4gIHRoaXMuX3Byb2Nlc3NpbmcgPSAwXG5cbiAgdGhpcy5fZW1pdFF1ZXVlID0gW11cbiAgdGhpcy5fcHJvY2Vzc1F1ZXVlID0gW11cbiAgdGhpcy5wYXVzZWQgPSBmYWxzZVxuXG4gIGlmICh0aGlzLm5vcHJvY2VzcylcbiAgICByZXR1cm4gdGhpc1xuXG4gIGlmIChuID09PSAwKVxuICAgIHJldHVybiBkb25lKClcblxuICB2YXIgc3luYyA9IHRydWVcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyBpICsrKSB7XG4gICAgdGhpcy5fcHJvY2Vzcyh0aGlzLm1pbmltYXRjaC5zZXRbaV0sIGksIGZhbHNlLCBkb25lKVxuICB9XG4gIHN5bmMgPSBmYWxzZVxuXG4gIGZ1bmN0aW9uIGRvbmUgKCkge1xuICAgIC0tc2VsZi5fcHJvY2Vzc2luZ1xuICAgIGlmIChzZWxmLl9wcm9jZXNzaW5nIDw9IDApIHtcbiAgICAgIGlmIChzeW5jKSB7XG4gICAgICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHNlbGYuX2ZpbmlzaCgpXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWxmLl9maW5pc2goKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5HbG9iLnByb3RvdHlwZS5fZmluaXNoID0gZnVuY3Rpb24gKCkge1xuICBhc3NlcnQodGhpcyBpbnN0YW5jZW9mIEdsb2IpXG4gIGlmICh0aGlzLmFib3J0ZWQpXG4gICAgcmV0dXJuXG5cbiAgaWYgKHRoaXMucmVhbHBhdGggJiYgIXRoaXMuX2RpZFJlYWxwYXRoKVxuICAgIHJldHVybiB0aGlzLl9yZWFscGF0aCgpXG5cbiAgY29tbW9uLmZpbmlzaCh0aGlzKVxuICB0aGlzLmVtaXQoJ2VuZCcsIHRoaXMuZm91bmQpXG59XG5cbkdsb2IucHJvdG90eXBlLl9yZWFscGF0aCA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuX2RpZFJlYWxwYXRoKVxuICAgIHJldHVyblxuXG4gIHRoaXMuX2RpZFJlYWxwYXRoID0gdHJ1ZVxuXG4gIHZhciBuID0gdGhpcy5tYXRjaGVzLmxlbmd0aFxuICBpZiAobiA9PT0gMClcbiAgICByZXR1cm4gdGhpcy5fZmluaXNoKClcblxuICB2YXIgc2VsZiA9IHRoaXNcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm1hdGNoZXMubGVuZ3RoOyBpKyspXG4gICAgdGhpcy5fcmVhbHBhdGhTZXQoaSwgbmV4dClcblxuICBmdW5jdGlvbiBuZXh0ICgpIHtcbiAgICBpZiAoLS1uID09PSAwKVxuICAgICAgc2VsZi5fZmluaXNoKClcbiAgfVxufVxuXG5HbG9iLnByb3RvdHlwZS5fcmVhbHBhdGhTZXQgPSBmdW5jdGlvbiAoaW5kZXgsIGNiKSB7XG4gIHZhciBtYXRjaHNldCA9IHRoaXMubWF0Y2hlc1tpbmRleF1cbiAgaWYgKCFtYXRjaHNldClcbiAgICByZXR1cm4gY2IoKVxuXG4gIHZhciBmb3VuZCA9IE9iamVjdC5rZXlzKG1hdGNoc2V0KVxuICB2YXIgc2VsZiA9IHRoaXNcbiAgdmFyIG4gPSBmb3VuZC5sZW5ndGhcblxuICBpZiAobiA9PT0gMClcbiAgICByZXR1cm4gY2IoKVxuXG4gIHZhciBzZXQgPSB0aGlzLm1hdGNoZXNbaW5kZXhdID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuICBmb3VuZC5mb3JFYWNoKGZ1bmN0aW9uIChwLCBpKSB7XG4gICAgLy8gSWYgdGhlcmUncyBhIHByb2JsZW0gd2l0aCB0aGUgc3RhdCwgdGhlbiBpdCBtZWFucyB0aGF0XG4gICAgLy8gb25lIG9yIG1vcmUgb2YgdGhlIGxpbmtzIGluIHRoZSByZWFscGF0aCBjb3VsZG4ndCBiZVxuICAgIC8vIHJlc29sdmVkLiAganVzdCByZXR1cm4gdGhlIGFicyB2YWx1ZSBpbiB0aGF0IGNhc2UuXG4gICAgcCA9IHNlbGYuX21ha2VBYnMocClcbiAgICBycC5yZWFscGF0aChwLCBzZWxmLnJlYWxwYXRoQ2FjaGUsIGZ1bmN0aW9uIChlciwgcmVhbCkge1xuICAgICAgaWYgKCFlcilcbiAgICAgICAgc2V0W3JlYWxdID0gdHJ1ZVxuICAgICAgZWxzZSBpZiAoZXIuc3lzY2FsbCA9PT0gJ3N0YXQnKVxuICAgICAgICBzZXRbcF0gPSB0cnVlXG4gICAgICBlbHNlXG4gICAgICAgIHNlbGYuZW1pdCgnZXJyb3InLCBlcikgLy8gc3JzbHkgd3RmIHJpZ2h0IGhlcmVcblxuICAgICAgaWYgKC0tbiA9PT0gMCkge1xuICAgICAgICBzZWxmLm1hdGNoZXNbaW5kZXhdID0gc2V0XG4gICAgICAgIGNiKClcbiAgICAgIH1cbiAgICB9KVxuICB9KVxufVxuXG5HbG9iLnByb3RvdHlwZS5fbWFyayA9IGZ1bmN0aW9uIChwKSB7XG4gIHJldHVybiBjb21tb24ubWFyayh0aGlzLCBwKVxufVxuXG5HbG9iLnByb3RvdHlwZS5fbWFrZUFicyA9IGZ1bmN0aW9uIChmKSB7XG4gIHJldHVybiBjb21tb24ubWFrZUFicyh0aGlzLCBmKVxufVxuXG5HbG9iLnByb3RvdHlwZS5hYm9ydCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5hYm9ydGVkID0gdHJ1ZVxuICB0aGlzLmVtaXQoJ2Fib3J0Jylcbn1cblxuR2xvYi5wcm90b3R5cGUucGF1c2UgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICghdGhpcy5wYXVzZWQpIHtcbiAgICB0aGlzLnBhdXNlZCA9IHRydWVcbiAgICB0aGlzLmVtaXQoJ3BhdXNlJylcbiAgfVxufVxuXG5HbG9iLnByb3RvdHlwZS5yZXN1bWUgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLnBhdXNlZCkge1xuICAgIHRoaXMuZW1pdCgncmVzdW1lJylcbiAgICB0aGlzLnBhdXNlZCA9IGZhbHNlXG4gICAgaWYgKHRoaXMuX2VtaXRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgIHZhciBlcSA9IHRoaXMuX2VtaXRRdWV1ZS5zbGljZSgwKVxuICAgICAgdGhpcy5fZW1pdFF1ZXVlLmxlbmd0aCA9IDBcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXEubGVuZ3RoOyBpICsrKSB7XG4gICAgICAgIHZhciBlID0gZXFbaV1cbiAgICAgICAgdGhpcy5fZW1pdE1hdGNoKGVbMF0sIGVbMV0pXG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLl9wcm9jZXNzUXVldWUubGVuZ3RoKSB7XG4gICAgICB2YXIgcHEgPSB0aGlzLl9wcm9jZXNzUXVldWUuc2xpY2UoMClcbiAgICAgIHRoaXMuX3Byb2Nlc3NRdWV1ZS5sZW5ndGggPSAwXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBxLmxlbmd0aDsgaSArKykge1xuICAgICAgICB2YXIgcCA9IHBxW2ldXG4gICAgICAgIHRoaXMuX3Byb2Nlc3NpbmctLVxuICAgICAgICB0aGlzLl9wcm9jZXNzKHBbMF0sIHBbMV0sIHBbMl0sIHBbM10pXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbkdsb2IucHJvdG90eXBlLl9wcm9jZXNzID0gZnVuY3Rpb24gKHBhdHRlcm4sIGluZGV4LCBpbkdsb2JTdGFyLCBjYikge1xuICBhc3NlcnQodGhpcyBpbnN0YW5jZW9mIEdsb2IpXG4gIGFzc2VydCh0eXBlb2YgY2IgPT09ICdmdW5jdGlvbicpXG5cbiAgaWYgKHRoaXMuYWJvcnRlZClcbiAgICByZXR1cm5cblxuICB0aGlzLl9wcm9jZXNzaW5nKytcbiAgaWYgKHRoaXMucGF1c2VkKSB7XG4gICAgdGhpcy5fcHJvY2Vzc1F1ZXVlLnB1c2goW3BhdHRlcm4sIGluZGV4LCBpbkdsb2JTdGFyLCBjYl0pXG4gICAgcmV0dXJuXG4gIH1cblxuICAvL2NvbnNvbGUuZXJyb3IoJ1BST0NFU1MgJWQnLCB0aGlzLl9wcm9jZXNzaW5nLCBwYXR0ZXJuKVxuXG4gIC8vIEdldCB0aGUgZmlyc3QgW25dIHBhcnRzIG9mIHBhdHRlcm4gdGhhdCBhcmUgYWxsIHN0cmluZ3MuXG4gIHZhciBuID0gMFxuICB3aGlsZSAodHlwZW9mIHBhdHRlcm5bbl0gPT09ICdzdHJpbmcnKSB7XG4gICAgbiArK1xuICB9XG4gIC8vIG5vdyBuIGlzIHRoZSBpbmRleCBvZiB0aGUgZmlyc3Qgb25lIHRoYXQgaXMgKm5vdCogYSBzdHJpbmcuXG5cbiAgLy8gc2VlIGlmIHRoZXJlJ3MgYW55dGhpbmcgZWxzZVxuICB2YXIgcHJlZml4XG4gIHN3aXRjaCAobikge1xuICAgIC8vIGlmIG5vdCwgdGhlbiB0aGlzIGlzIHJhdGhlciBzaW1wbGVcbiAgICBjYXNlIHBhdHRlcm4ubGVuZ3RoOlxuICAgICAgdGhpcy5fcHJvY2Vzc1NpbXBsZShwYXR0ZXJuLmpvaW4oJy8nKSwgaW5kZXgsIGNiKVxuICAgICAgcmV0dXJuXG5cbiAgICBjYXNlIDA6XG4gICAgICAvLyBwYXR0ZXJuICpzdGFydHMqIHdpdGggc29tZSBub24tdHJpdmlhbCBpdGVtLlxuICAgICAgLy8gZ29pbmcgdG8gcmVhZGRpcihjd2QpLCBidXQgbm90IGluY2x1ZGUgdGhlIHByZWZpeCBpbiBtYXRjaGVzLlxuICAgICAgcHJlZml4ID0gbnVsbFxuICAgICAgYnJlYWtcblxuICAgIGRlZmF1bHQ6XG4gICAgICAvLyBwYXR0ZXJuIGhhcyBzb21lIHN0cmluZyBiaXRzIGluIHRoZSBmcm9udC5cbiAgICAgIC8vIHdoYXRldmVyIGl0IHN0YXJ0cyB3aXRoLCB3aGV0aGVyIHRoYXQncyAnYWJzb2x1dGUnIGxpa2UgL2Zvby9iYXIsXG4gICAgICAvLyBvciAncmVsYXRpdmUnIGxpa2UgJy4uL2JheidcbiAgICAgIHByZWZpeCA9IHBhdHRlcm4uc2xpY2UoMCwgbikuam9pbignLycpXG4gICAgICBicmVha1xuICB9XG5cbiAgdmFyIHJlbWFpbiA9IHBhdHRlcm4uc2xpY2UobilcblxuICAvLyBnZXQgdGhlIGxpc3Qgb2YgZW50cmllcy5cbiAgdmFyIHJlYWRcbiAgaWYgKHByZWZpeCA9PT0gbnVsbClcbiAgICByZWFkID0gJy4nXG4gIGVsc2UgaWYgKGlzQWJzb2x1dGUocHJlZml4KSB8fCBpc0Fic29sdXRlKHBhdHRlcm4uam9pbignLycpKSkge1xuICAgIGlmICghcHJlZml4IHx8ICFpc0Fic29sdXRlKHByZWZpeCkpXG4gICAgICBwcmVmaXggPSAnLycgKyBwcmVmaXhcbiAgICByZWFkID0gcHJlZml4XG4gIH0gZWxzZVxuICAgIHJlYWQgPSBwcmVmaXhcblxuICB2YXIgYWJzID0gdGhpcy5fbWFrZUFicyhyZWFkKVxuXG4gIC8vaWYgaWdub3JlZCwgc2tpcCBfcHJvY2Vzc2luZ1xuICBpZiAoY2hpbGRyZW5JZ25vcmVkKHRoaXMsIHJlYWQpKVxuICAgIHJldHVybiBjYigpXG5cbiAgdmFyIGlzR2xvYlN0YXIgPSByZW1haW5bMF0gPT09IG1pbmltYXRjaC5HTE9CU1RBUlxuICBpZiAoaXNHbG9iU3RhcilcbiAgICB0aGlzLl9wcm9jZXNzR2xvYlN0YXIocHJlZml4LCByZWFkLCBhYnMsIHJlbWFpbiwgaW5kZXgsIGluR2xvYlN0YXIsIGNiKVxuICBlbHNlXG4gICAgdGhpcy5fcHJvY2Vzc1JlYWRkaXIocHJlZml4LCByZWFkLCBhYnMsIHJlbWFpbiwgaW5kZXgsIGluR2xvYlN0YXIsIGNiKVxufVxuXG5HbG9iLnByb3RvdHlwZS5fcHJvY2Vzc1JlYWRkaXIgPSBmdW5jdGlvbiAocHJlZml4LCByZWFkLCBhYnMsIHJlbWFpbiwgaW5kZXgsIGluR2xvYlN0YXIsIGNiKSB7XG4gIHZhciBzZWxmID0gdGhpc1xuICB0aGlzLl9yZWFkZGlyKGFicywgaW5HbG9iU3RhciwgZnVuY3Rpb24gKGVyLCBlbnRyaWVzKSB7XG4gICAgcmV0dXJuIHNlbGYuX3Byb2Nlc3NSZWFkZGlyMihwcmVmaXgsIHJlYWQsIGFicywgcmVtYWluLCBpbmRleCwgaW5HbG9iU3RhciwgZW50cmllcywgY2IpXG4gIH0pXG59XG5cbkdsb2IucHJvdG90eXBlLl9wcm9jZXNzUmVhZGRpcjIgPSBmdW5jdGlvbiAocHJlZml4LCByZWFkLCBhYnMsIHJlbWFpbiwgaW5kZXgsIGluR2xvYlN0YXIsIGVudHJpZXMsIGNiKSB7XG5cbiAgLy8gaWYgdGhlIGFicyBpc24ndCBhIGRpciwgdGhlbiBub3RoaW5nIGNhbiBtYXRjaCFcbiAgaWYgKCFlbnRyaWVzKVxuICAgIHJldHVybiBjYigpXG5cbiAgLy8gSXQgd2lsbCBvbmx5IG1hdGNoIGRvdCBlbnRyaWVzIGlmIGl0IHN0YXJ0cyB3aXRoIGEgZG90LCBvciBpZlxuICAvLyBkb3QgaXMgc2V0LiAgU3R1ZmYgbGlrZSBAKC5mb298LmJhcikgaXNuJ3QgYWxsb3dlZC5cbiAgdmFyIHBuID0gcmVtYWluWzBdXG4gIHZhciBuZWdhdGUgPSAhIXRoaXMubWluaW1hdGNoLm5lZ2F0ZVxuICB2YXIgcmF3R2xvYiA9IHBuLl9nbG9iXG4gIHZhciBkb3RPayA9IHRoaXMuZG90IHx8IHJhd0dsb2IuY2hhckF0KDApID09PSAnLidcblxuICB2YXIgbWF0Y2hlZEVudHJpZXMgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGVudHJpZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZSA9IGVudHJpZXNbaV1cbiAgICBpZiAoZS5jaGFyQXQoMCkgIT09ICcuJyB8fCBkb3RPaykge1xuICAgICAgdmFyIG1cbiAgICAgIGlmIChuZWdhdGUgJiYgIXByZWZpeCkge1xuICAgICAgICBtID0gIWUubWF0Y2gocG4pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtID0gZS5tYXRjaChwbilcbiAgICAgIH1cbiAgICAgIGlmIChtKVxuICAgICAgICBtYXRjaGVkRW50cmllcy5wdXNoKGUpXG4gICAgfVxuICB9XG5cbiAgLy9jb25zb2xlLmVycm9yKCdwcmQyJywgcHJlZml4LCBlbnRyaWVzLCByZW1haW5bMF0uX2dsb2IsIG1hdGNoZWRFbnRyaWVzKVxuXG4gIHZhciBsZW4gPSBtYXRjaGVkRW50cmllcy5sZW5ndGhcbiAgLy8gSWYgdGhlcmUgYXJlIG5vIG1hdGNoZWQgZW50cmllcywgdGhlbiBub3RoaW5nIG1hdGNoZXMuXG4gIGlmIChsZW4gPT09IDApXG4gICAgcmV0dXJuIGNiKClcblxuICAvLyBpZiB0aGlzIGlzIHRoZSBsYXN0IHJlbWFpbmluZyBwYXR0ZXJuIGJpdCwgdGhlbiBubyBuZWVkIGZvclxuICAvLyBhbiBhZGRpdGlvbmFsIHN0YXQgKnVubGVzcyogdGhlIHVzZXIgaGFzIHNwZWNpZmllZCBtYXJrIG9yXG4gIC8vIHN0YXQgZXhwbGljaXRseS4gIFdlIGtub3cgdGhleSBleGlzdCwgc2luY2UgcmVhZGRpciByZXR1cm5lZFxuICAvLyB0aGVtLlxuXG4gIGlmIChyZW1haW4ubGVuZ3RoID09PSAxICYmICF0aGlzLm1hcmsgJiYgIXRoaXMuc3RhdCkge1xuICAgIGlmICghdGhpcy5tYXRjaGVzW2luZGV4XSlcbiAgICAgIHRoaXMubWF0Y2hlc1tpbmRleF0gPSBPYmplY3QuY3JlYXRlKG51bGwpXG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArKykge1xuICAgICAgdmFyIGUgPSBtYXRjaGVkRW50cmllc1tpXVxuICAgICAgaWYgKHByZWZpeCkge1xuICAgICAgICBpZiAocHJlZml4ICE9PSAnLycpXG4gICAgICAgICAgZSA9IHByZWZpeCArICcvJyArIGVcbiAgICAgICAgZWxzZVxuICAgICAgICAgIGUgPSBwcmVmaXggKyBlXG4gICAgICB9XG5cbiAgICAgIGlmIChlLmNoYXJBdCgwKSA9PT0gJy8nICYmICF0aGlzLm5vbW91bnQpIHtcbiAgICAgICAgZSA9IHBhdGguam9pbih0aGlzLnJvb3QsIGUpXG4gICAgICB9XG4gICAgICB0aGlzLl9lbWl0TWF0Y2goaW5kZXgsIGUpXG4gICAgfVxuICAgIC8vIFRoaXMgd2FzIHRoZSBsYXN0IG9uZSwgYW5kIG5vIHN0YXRzIHdlcmUgbmVlZGVkXG4gICAgcmV0dXJuIGNiKClcbiAgfVxuXG4gIC8vIG5vdyB0ZXN0IGFsbCBtYXRjaGVkIGVudHJpZXMgYXMgc3RhbmQtaW5zIGZvciB0aGF0IHBhcnRcbiAgLy8gb2YgdGhlIHBhdHRlcm4uXG4gIHJlbWFpbi5zaGlmdCgpXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICsrKSB7XG4gICAgdmFyIGUgPSBtYXRjaGVkRW50cmllc1tpXVxuICAgIHZhciBuZXdQYXR0ZXJuXG4gICAgaWYgKHByZWZpeCkge1xuICAgICAgaWYgKHByZWZpeCAhPT0gJy8nKVxuICAgICAgICBlID0gcHJlZml4ICsgJy8nICsgZVxuICAgICAgZWxzZVxuICAgICAgICBlID0gcHJlZml4ICsgZVxuICAgIH1cbiAgICB0aGlzLl9wcm9jZXNzKFtlXS5jb25jYXQocmVtYWluKSwgaW5kZXgsIGluR2xvYlN0YXIsIGNiKVxuICB9XG4gIGNiKClcbn1cblxuR2xvYi5wcm90b3R5cGUuX2VtaXRNYXRjaCA9IGZ1bmN0aW9uIChpbmRleCwgZSkge1xuICBpZiAodGhpcy5hYm9ydGVkKVxuICAgIHJldHVyblxuXG4gIGlmIChpc0lnbm9yZWQodGhpcywgZSkpXG4gICAgcmV0dXJuXG5cbiAgaWYgKHRoaXMucGF1c2VkKSB7XG4gICAgdGhpcy5fZW1pdFF1ZXVlLnB1c2goW2luZGV4LCBlXSlcbiAgICByZXR1cm5cbiAgfVxuXG4gIHZhciBhYnMgPSBpc0Fic29sdXRlKGUpID8gZSA6IHRoaXMuX21ha2VBYnMoZSlcblxuICBpZiAodGhpcy5tYXJrKVxuICAgIGUgPSB0aGlzLl9tYXJrKGUpXG5cbiAgaWYgKHRoaXMuYWJzb2x1dGUpXG4gICAgZSA9IGFic1xuXG4gIGlmICh0aGlzLm1hdGNoZXNbaW5kZXhdW2VdKVxuICAgIHJldHVyblxuXG4gIGlmICh0aGlzLm5vZGlyKSB7XG4gICAgdmFyIGMgPSB0aGlzLmNhY2hlW2Fic11cbiAgICBpZiAoYyA9PT0gJ0RJUicgfHwgQXJyYXkuaXNBcnJheShjKSlcbiAgICAgIHJldHVyblxuICB9XG5cbiAgdGhpcy5tYXRjaGVzW2luZGV4XVtlXSA9IHRydWVcblxuICB2YXIgc3QgPSB0aGlzLnN0YXRDYWNoZVthYnNdXG4gIGlmIChzdClcbiAgICB0aGlzLmVtaXQoJ3N0YXQnLCBlLCBzdClcblxuICB0aGlzLmVtaXQoJ21hdGNoJywgZSlcbn1cblxuR2xvYi5wcm90b3R5cGUuX3JlYWRkaXJJbkdsb2JTdGFyID0gZnVuY3Rpb24gKGFicywgY2IpIHtcbiAgaWYgKHRoaXMuYWJvcnRlZClcbiAgICByZXR1cm5cblxuICAvLyBmb2xsb3cgYWxsIHN5bWxpbmtlZCBkaXJlY3RvcmllcyBmb3JldmVyXG4gIC8vIGp1c3QgcHJvY2VlZCBhcyBpZiB0aGlzIGlzIGEgbm9uLWdsb2JzdGFyIHNpdHVhdGlvblxuICBpZiAodGhpcy5mb2xsb3cpXG4gICAgcmV0dXJuIHRoaXMuX3JlYWRkaXIoYWJzLCBmYWxzZSwgY2IpXG5cbiAgdmFyIGxzdGF0a2V5ID0gJ2xzdGF0XFwwJyArIGFic1xuICB2YXIgc2VsZiA9IHRoaXNcbiAgdmFyIGxzdGF0Y2IgPSBpbmZsaWdodChsc3RhdGtleSwgbHN0YXRjYl8pXG5cbiAgaWYgKGxzdGF0Y2IpXG4gICAgZnMubHN0YXQoYWJzLCBsc3RhdGNiKVxuXG4gIGZ1bmN0aW9uIGxzdGF0Y2JfIChlciwgbHN0YXQpIHtcbiAgICBpZiAoZXIgJiYgZXIuY29kZSA9PT0gJ0VOT0VOVCcpXG4gICAgICByZXR1cm4gY2IoKVxuXG4gICAgdmFyIGlzU3ltID0gbHN0YXQgJiYgbHN0YXQuaXNTeW1ib2xpY0xpbmsoKVxuICAgIHNlbGYuc3ltbGlua3NbYWJzXSA9IGlzU3ltXG5cbiAgICAvLyBJZiBpdCdzIG5vdCBhIHN5bWxpbmsgb3IgYSBkaXIsIHRoZW4gaXQncyBkZWZpbml0ZWx5IGEgcmVndWxhciBmaWxlLlxuICAgIC8vIGRvbid0IGJvdGhlciBkb2luZyBhIHJlYWRkaXIgaW4gdGhhdCBjYXNlLlxuICAgIGlmICghaXNTeW0gJiYgbHN0YXQgJiYgIWxzdGF0LmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgIHNlbGYuY2FjaGVbYWJzXSA9ICdGSUxFJ1xuICAgICAgY2IoKVxuICAgIH0gZWxzZVxuICAgICAgc2VsZi5fcmVhZGRpcihhYnMsIGZhbHNlLCBjYilcbiAgfVxufVxuXG5HbG9iLnByb3RvdHlwZS5fcmVhZGRpciA9IGZ1bmN0aW9uIChhYnMsIGluR2xvYlN0YXIsIGNiKSB7XG4gIGlmICh0aGlzLmFib3J0ZWQpXG4gICAgcmV0dXJuXG5cbiAgY2IgPSBpbmZsaWdodCgncmVhZGRpclxcMCcrYWJzKydcXDAnK2luR2xvYlN0YXIsIGNiKVxuICBpZiAoIWNiKVxuICAgIHJldHVyblxuXG4gIC8vY29uc29sZS5lcnJvcignUkQgJWogJWonLCAraW5HbG9iU3RhciwgYWJzKVxuICBpZiAoaW5HbG9iU3RhciAmJiAhb3duUHJvcCh0aGlzLnN5bWxpbmtzLCBhYnMpKVxuICAgIHJldHVybiB0aGlzLl9yZWFkZGlySW5HbG9iU3RhcihhYnMsIGNiKVxuXG4gIGlmIChvd25Qcm9wKHRoaXMuY2FjaGUsIGFicykpIHtcbiAgICB2YXIgYyA9IHRoaXMuY2FjaGVbYWJzXVxuICAgIGlmICghYyB8fCBjID09PSAnRklMRScpXG4gICAgICByZXR1cm4gY2IoKVxuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYykpXG4gICAgICByZXR1cm4gY2IobnVsbCwgYylcbiAgfVxuXG4gIHZhciBzZWxmID0gdGhpc1xuICBmcy5yZWFkZGlyKGFicywgcmVhZGRpckNiKHRoaXMsIGFicywgY2IpKVxufVxuXG5mdW5jdGlvbiByZWFkZGlyQ2IgKHNlbGYsIGFicywgY2IpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChlciwgZW50cmllcykge1xuICAgIGlmIChlcilcbiAgICAgIHNlbGYuX3JlYWRkaXJFcnJvcihhYnMsIGVyLCBjYilcbiAgICBlbHNlXG4gICAgICBzZWxmLl9yZWFkZGlyRW50cmllcyhhYnMsIGVudHJpZXMsIGNiKVxuICB9XG59XG5cbkdsb2IucHJvdG90eXBlLl9yZWFkZGlyRW50cmllcyA9IGZ1bmN0aW9uIChhYnMsIGVudHJpZXMsIGNiKSB7XG4gIGlmICh0aGlzLmFib3J0ZWQpXG4gICAgcmV0dXJuXG5cbiAgLy8gaWYgd2UgaGF2ZW4ndCBhc2tlZCB0byBzdGF0IGV2ZXJ5dGhpbmcsIHRoZW4ganVzdFxuICAvLyBhc3N1bWUgdGhhdCBldmVyeXRoaW5nIGluIHRoZXJlIGV4aXN0cywgc28gd2UgY2FuIGF2b2lkXG4gIC8vIGhhdmluZyB0byBzdGF0IGl0IGEgc2Vjb25kIHRpbWUuXG4gIGlmICghdGhpcy5tYXJrICYmICF0aGlzLnN0YXQpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVudHJpZXMubGVuZ3RoOyBpICsrKSB7XG4gICAgICB2YXIgZSA9IGVudHJpZXNbaV1cbiAgICAgIGlmIChhYnMgPT09ICcvJylcbiAgICAgICAgZSA9IGFicyArIGVcbiAgICAgIGVsc2VcbiAgICAgICAgZSA9IGFicyArICcvJyArIGVcbiAgICAgIHRoaXMuY2FjaGVbZV0gPSB0cnVlXG4gICAgfVxuICB9XG5cbiAgdGhpcy5jYWNoZVthYnNdID0gZW50cmllc1xuICByZXR1cm4gY2IobnVsbCwgZW50cmllcylcbn1cblxuR2xvYi5wcm90b3R5cGUuX3JlYWRkaXJFcnJvciA9IGZ1bmN0aW9uIChmLCBlciwgY2IpIHtcbiAgaWYgKHRoaXMuYWJvcnRlZClcbiAgICByZXR1cm5cblxuICAvLyBoYW5kbGUgZXJyb3JzLCBhbmQgY2FjaGUgdGhlIGluZm9ybWF0aW9uXG4gIHN3aXRjaCAoZXIuY29kZSkge1xuICAgIGNhc2UgJ0VOT1RTVVAnOiAvLyBodHRwczovL2dpdGh1Yi5jb20vaXNhYWNzL25vZGUtZ2xvYi9pc3N1ZXMvMjA1XG4gICAgY2FzZSAnRU5PVERJUic6IC8vIHRvdGFsbHkgbm9ybWFsLiBtZWFucyBpdCAqZG9lcyogZXhpc3QuXG4gICAgICB2YXIgYWJzID0gdGhpcy5fbWFrZUFicyhmKVxuICAgICAgdGhpcy5jYWNoZVthYnNdID0gJ0ZJTEUnXG4gICAgICBpZiAoYWJzID09PSB0aGlzLmN3ZEFicykge1xuICAgICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IoZXIuY29kZSArICcgaW52YWxpZCBjd2QgJyArIHRoaXMuY3dkKVxuICAgICAgICBlcnJvci5wYXRoID0gdGhpcy5jd2RcbiAgICAgICAgZXJyb3IuY29kZSA9IGVyLmNvZGVcbiAgICAgICAgdGhpcy5lbWl0KCdlcnJvcicsIGVycm9yKVxuICAgICAgICB0aGlzLmFib3J0KClcbiAgICAgIH1cbiAgICAgIGJyZWFrXG5cbiAgICBjYXNlICdFTk9FTlQnOiAvLyBub3QgdGVycmlibHkgdW51c3VhbFxuICAgIGNhc2UgJ0VMT09QJzpcbiAgICBjYXNlICdFTkFNRVRPT0xPTkcnOlxuICAgIGNhc2UgJ1VOS05PV04nOlxuICAgICAgdGhpcy5jYWNoZVt0aGlzLl9tYWtlQWJzKGYpXSA9IGZhbHNlXG4gICAgICBicmVha1xuXG4gICAgZGVmYXVsdDogLy8gc29tZSB1bnVzdWFsIGVycm9yLiAgVHJlYXQgYXMgZmFpbHVyZS5cbiAgICAgIHRoaXMuY2FjaGVbdGhpcy5fbWFrZUFicyhmKV0gPSBmYWxzZVxuICAgICAgaWYgKHRoaXMuc3RyaWN0KSB7XG4gICAgICAgIHRoaXMuZW1pdCgnZXJyb3InLCBlcilcbiAgICAgICAgLy8gSWYgdGhlIGVycm9yIGlzIGhhbmRsZWQsIHRoZW4gd2UgYWJvcnRcbiAgICAgICAgLy8gaWYgbm90LCB3ZSB0aHJldyBvdXQgb2YgaGVyZVxuICAgICAgICB0aGlzLmFib3J0KClcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5zaWxlbnQpXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ2dsb2IgZXJyb3InLCBlcilcbiAgICAgIGJyZWFrXG4gIH1cblxuICByZXR1cm4gY2IoKVxufVxuXG5HbG9iLnByb3RvdHlwZS5fcHJvY2Vzc0dsb2JTdGFyID0gZnVuY3Rpb24gKHByZWZpeCwgcmVhZCwgYWJzLCByZW1haW4sIGluZGV4LCBpbkdsb2JTdGFyLCBjYikge1xuICB2YXIgc2VsZiA9IHRoaXNcbiAgdGhpcy5fcmVhZGRpcihhYnMsIGluR2xvYlN0YXIsIGZ1bmN0aW9uIChlciwgZW50cmllcykge1xuICAgIHNlbGYuX3Byb2Nlc3NHbG9iU3RhcjIocHJlZml4LCByZWFkLCBhYnMsIHJlbWFpbiwgaW5kZXgsIGluR2xvYlN0YXIsIGVudHJpZXMsIGNiKVxuICB9KVxufVxuXG5cbkdsb2IucHJvdG90eXBlLl9wcm9jZXNzR2xvYlN0YXIyID0gZnVuY3Rpb24gKHByZWZpeCwgcmVhZCwgYWJzLCByZW1haW4sIGluZGV4LCBpbkdsb2JTdGFyLCBlbnRyaWVzLCBjYikge1xuICAvL2NvbnNvbGUuZXJyb3IoJ3BnczInLCBwcmVmaXgsIHJlbWFpblswXSwgZW50cmllcylcblxuICAvLyBubyBlbnRyaWVzIG1lYW5zIG5vdCBhIGRpciwgc28gaXQgY2FuIG5ldmVyIGhhdmUgbWF0Y2hlc1xuICAvLyBmb28udHh0LyoqIGRvZXNuJ3QgbWF0Y2ggZm9vLnR4dFxuICBpZiAoIWVudHJpZXMpXG4gICAgcmV0dXJuIGNiKClcblxuICAvLyB0ZXN0IHdpdGhvdXQgdGhlIGdsb2JzdGFyLCBhbmQgd2l0aCBldmVyeSBjaGlsZCBib3RoIGJlbG93XG4gIC8vIGFuZCByZXBsYWNpbmcgdGhlIGdsb2JzdGFyLlxuICB2YXIgcmVtYWluV2l0aG91dEdsb2JTdGFyID0gcmVtYWluLnNsaWNlKDEpXG4gIHZhciBnc3ByZWYgPSBwcmVmaXggPyBbIHByZWZpeCBdIDogW11cbiAgdmFyIG5vR2xvYlN0YXIgPSBnc3ByZWYuY29uY2F0KHJlbWFpbldpdGhvdXRHbG9iU3RhcilcblxuICAvLyB0aGUgbm9HbG9iU3RhciBwYXR0ZXJuIGV4aXRzIHRoZSBpbkdsb2JTdGFyIHN0YXRlXG4gIHRoaXMuX3Byb2Nlc3Mobm9HbG9iU3RhciwgaW5kZXgsIGZhbHNlLCBjYilcblxuICB2YXIgaXNTeW0gPSB0aGlzLnN5bWxpbmtzW2Fic11cbiAgdmFyIGxlbiA9IGVudHJpZXMubGVuZ3RoXG5cbiAgLy8gSWYgaXQncyBhIHN5bWxpbmssIGFuZCB3ZSdyZSBpbiBhIGdsb2JzdGFyLCB0aGVuIHN0b3BcbiAgaWYgKGlzU3ltICYmIGluR2xvYlN0YXIpXG4gICAgcmV0dXJuIGNiKClcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgdmFyIGUgPSBlbnRyaWVzW2ldXG4gICAgaWYgKGUuY2hhckF0KDApID09PSAnLicgJiYgIXRoaXMuZG90KVxuICAgICAgY29udGludWVcblxuICAgIC8vIHRoZXNlIHR3byBjYXNlcyBlbnRlciB0aGUgaW5HbG9iU3RhciBzdGF0ZVxuICAgIHZhciBpbnN0ZWFkID0gZ3NwcmVmLmNvbmNhdChlbnRyaWVzW2ldLCByZW1haW5XaXRob3V0R2xvYlN0YXIpXG4gICAgdGhpcy5fcHJvY2VzcyhpbnN0ZWFkLCBpbmRleCwgdHJ1ZSwgY2IpXG5cbiAgICB2YXIgYmVsb3cgPSBnc3ByZWYuY29uY2F0KGVudHJpZXNbaV0sIHJlbWFpbilcbiAgICB0aGlzLl9wcm9jZXNzKGJlbG93LCBpbmRleCwgdHJ1ZSwgY2IpXG4gIH1cblxuICBjYigpXG59XG5cbkdsb2IucHJvdG90eXBlLl9wcm9jZXNzU2ltcGxlID0gZnVuY3Rpb24gKHByZWZpeCwgaW5kZXgsIGNiKSB7XG4gIC8vIFhYWCByZXZpZXcgdGhpcy4gIFNob3VsZG4ndCBpdCBiZSBkb2luZyB0aGUgbW91bnRpbmcgZXRjXG4gIC8vIGJlZm9yZSBkb2luZyBzdGF0PyAga2luZGEgd2VpcmQ/XG4gIHZhciBzZWxmID0gdGhpc1xuICB0aGlzLl9zdGF0KHByZWZpeCwgZnVuY3Rpb24gKGVyLCBleGlzdHMpIHtcbiAgICBzZWxmLl9wcm9jZXNzU2ltcGxlMihwcmVmaXgsIGluZGV4LCBlciwgZXhpc3RzLCBjYilcbiAgfSlcbn1cbkdsb2IucHJvdG90eXBlLl9wcm9jZXNzU2ltcGxlMiA9IGZ1bmN0aW9uIChwcmVmaXgsIGluZGV4LCBlciwgZXhpc3RzLCBjYikge1xuXG4gIC8vY29uc29sZS5lcnJvcigncHMyJywgcHJlZml4LCBleGlzdHMpXG5cbiAgaWYgKCF0aGlzLm1hdGNoZXNbaW5kZXhdKVxuICAgIHRoaXMubWF0Y2hlc1tpbmRleF0gPSBPYmplY3QuY3JlYXRlKG51bGwpXG5cbiAgLy8gSWYgaXQgZG9lc24ndCBleGlzdCwgdGhlbiBqdXN0IG1hcmsgdGhlIGxhY2sgb2YgcmVzdWx0c1xuICBpZiAoIWV4aXN0cylcbiAgICByZXR1cm4gY2IoKVxuXG4gIGlmIChwcmVmaXggJiYgaXNBYnNvbHV0ZShwcmVmaXgpICYmICF0aGlzLm5vbW91bnQpIHtcbiAgICB2YXIgdHJhaWwgPSAvW1xcL1xcXFxdJC8udGVzdChwcmVmaXgpXG4gICAgaWYgKHByZWZpeC5jaGFyQXQoMCkgPT09ICcvJykge1xuICAgICAgcHJlZml4ID0gcGF0aC5qb2luKHRoaXMucm9vdCwgcHJlZml4KVxuICAgIH0gZWxzZSB7XG4gICAgICBwcmVmaXggPSBwYXRoLnJlc29sdmUodGhpcy5yb290LCBwcmVmaXgpXG4gICAgICBpZiAodHJhaWwpXG4gICAgICAgIHByZWZpeCArPSAnLydcbiAgICB9XG4gIH1cblxuICBpZiAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJylcbiAgICBwcmVmaXggPSBwcmVmaXgucmVwbGFjZSgvXFxcXC9nLCAnLycpXG5cbiAgLy8gTWFyayB0aGlzIGFzIGEgbWF0Y2hcbiAgdGhpcy5fZW1pdE1hdGNoKGluZGV4LCBwcmVmaXgpXG4gIGNiKClcbn1cblxuLy8gUmV0dXJucyBlaXRoZXIgJ0RJUicsICdGSUxFJywgb3IgZmFsc2Vcbkdsb2IucHJvdG90eXBlLl9zdGF0ID0gZnVuY3Rpb24gKGYsIGNiKSB7XG4gIHZhciBhYnMgPSB0aGlzLl9tYWtlQWJzKGYpXG4gIHZhciBuZWVkRGlyID0gZi5zbGljZSgtMSkgPT09ICcvJ1xuXG4gIGlmIChmLmxlbmd0aCA+IHRoaXMubWF4TGVuZ3RoKVxuICAgIHJldHVybiBjYigpXG5cbiAgaWYgKCF0aGlzLnN0YXQgJiYgb3duUHJvcCh0aGlzLmNhY2hlLCBhYnMpKSB7XG4gICAgdmFyIGMgPSB0aGlzLmNhY2hlW2Fic11cblxuICAgIGlmIChBcnJheS5pc0FycmF5KGMpKVxuICAgICAgYyA9ICdESVInXG5cbiAgICAvLyBJdCBleGlzdHMsIGJ1dCBtYXliZSBub3QgaG93IHdlIG5lZWQgaXRcbiAgICBpZiAoIW5lZWREaXIgfHwgYyA9PT0gJ0RJUicpXG4gICAgICByZXR1cm4gY2IobnVsbCwgYylcblxuICAgIGlmIChuZWVkRGlyICYmIGMgPT09ICdGSUxFJylcbiAgICAgIHJldHVybiBjYigpXG5cbiAgICAvLyBvdGhlcndpc2Ugd2UgaGF2ZSB0byBzdGF0LCBiZWNhdXNlIG1heWJlIGM9dHJ1ZVxuICAgIC8vIGlmIHdlIGtub3cgaXQgZXhpc3RzLCBidXQgbm90IHdoYXQgaXQgaXMuXG4gIH1cblxuICB2YXIgZXhpc3RzXG4gIHZhciBzdGF0ID0gdGhpcy5zdGF0Q2FjaGVbYWJzXVxuICBpZiAoc3RhdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKHN0YXQgPT09IGZhbHNlKVxuICAgICAgcmV0dXJuIGNiKG51bGwsIHN0YXQpXG4gICAgZWxzZSB7XG4gICAgICB2YXIgdHlwZSA9IHN0YXQuaXNEaXJlY3RvcnkoKSA/ICdESVInIDogJ0ZJTEUnXG4gICAgICBpZiAobmVlZERpciAmJiB0eXBlID09PSAnRklMRScpXG4gICAgICAgIHJldHVybiBjYigpXG4gICAgICBlbHNlXG4gICAgICAgIHJldHVybiBjYihudWxsLCB0eXBlLCBzdGF0KVxuICAgIH1cbiAgfVxuXG4gIHZhciBzZWxmID0gdGhpc1xuICB2YXIgc3RhdGNiID0gaW5mbGlnaHQoJ3N0YXRcXDAnICsgYWJzLCBsc3RhdGNiXylcbiAgaWYgKHN0YXRjYilcbiAgICBmcy5sc3RhdChhYnMsIHN0YXRjYilcblxuICBmdW5jdGlvbiBsc3RhdGNiXyAoZXIsIGxzdGF0KSB7XG4gICAgaWYgKGxzdGF0ICYmIGxzdGF0LmlzU3ltYm9saWNMaW5rKCkpIHtcbiAgICAgIC8vIElmIGl0J3MgYSBzeW1saW5rLCB0aGVuIHRyZWF0IGl0IGFzIHRoZSB0YXJnZXQsIHVubGVzc1xuICAgICAgLy8gdGhlIHRhcmdldCBkb2VzIG5vdCBleGlzdCwgdGhlbiB0cmVhdCBpdCBhcyBhIGZpbGUuXG4gICAgICByZXR1cm4gZnMuc3RhdChhYnMsIGZ1bmN0aW9uIChlciwgc3RhdCkge1xuICAgICAgICBpZiAoZXIpXG4gICAgICAgICAgc2VsZi5fc3RhdDIoZiwgYWJzLCBudWxsLCBsc3RhdCwgY2IpXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBzZWxmLl9zdGF0MihmLCBhYnMsIGVyLCBzdGF0LCBjYilcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbGYuX3N0YXQyKGYsIGFicywgZXIsIGxzdGF0LCBjYilcbiAgICB9XG4gIH1cbn1cblxuR2xvYi5wcm90b3R5cGUuX3N0YXQyID0gZnVuY3Rpb24gKGYsIGFicywgZXIsIHN0YXQsIGNiKSB7XG4gIGlmIChlciAmJiAoZXIuY29kZSA9PT0gJ0VOT0VOVCcgfHwgZXIuY29kZSA9PT0gJ0VOT1RESVInKSkge1xuICAgIHRoaXMuc3RhdENhY2hlW2Fic10gPSBmYWxzZVxuICAgIHJldHVybiBjYigpXG4gIH1cblxuICB2YXIgbmVlZERpciA9IGYuc2xpY2UoLTEpID09PSAnLydcbiAgdGhpcy5zdGF0Q2FjaGVbYWJzXSA9IHN0YXRcblxuICBpZiAoYWJzLnNsaWNlKC0xKSA9PT0gJy8nICYmIHN0YXQgJiYgIXN0YXQuaXNEaXJlY3RvcnkoKSlcbiAgICByZXR1cm4gY2IobnVsbCwgZmFsc2UsIHN0YXQpXG5cbiAgdmFyIGMgPSB0cnVlXG4gIGlmIChzdGF0KVxuICAgIGMgPSBzdGF0LmlzRGlyZWN0b3J5KCkgPyAnRElSJyA6ICdGSUxFJ1xuICB0aGlzLmNhY2hlW2Fic10gPSB0aGlzLmNhY2hlW2Fic10gfHwgY1xuXG4gIGlmIChuZWVkRGlyICYmIGMgPT09ICdGSUxFJylcbiAgICByZXR1cm4gY2IoKVxuXG4gIHJldHVybiBjYihudWxsLCBjLCBzdGF0KVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZWFscGF0aFxucmVhbHBhdGgucmVhbHBhdGggPSByZWFscGF0aFxucmVhbHBhdGguc3luYyA9IHJlYWxwYXRoU3luY1xucmVhbHBhdGgucmVhbHBhdGhTeW5jID0gcmVhbHBhdGhTeW5jXG5yZWFscGF0aC5tb25rZXlwYXRjaCA9IG1vbmtleXBhdGNoXG5yZWFscGF0aC51bm1vbmtleXBhdGNoID0gdW5tb25rZXlwYXRjaFxuXG52YXIgZnMgPSByZXF1aXJlKCdmcycpXG52YXIgb3JpZ1JlYWxwYXRoID0gZnMucmVhbHBhdGhcbnZhciBvcmlnUmVhbHBhdGhTeW5jID0gZnMucmVhbHBhdGhTeW5jXG5cbnZhciB2ZXJzaW9uID0gcHJvY2Vzcy52ZXJzaW9uXG52YXIgb2sgPSAvXnZbMC01XVxcLi8udGVzdCh2ZXJzaW9uKVxudmFyIG9sZCA9IHJlcXVpcmUoJy4vb2xkLmpzJylcblxuZnVuY3Rpb24gbmV3RXJyb3IgKGVyKSB7XG4gIHJldHVybiBlciAmJiBlci5zeXNjYWxsID09PSAncmVhbHBhdGgnICYmIChcbiAgICBlci5jb2RlID09PSAnRUxPT1AnIHx8XG4gICAgZXIuY29kZSA9PT0gJ0VOT01FTScgfHxcbiAgICBlci5jb2RlID09PSAnRU5BTUVUT09MT05HJ1xuICApXG59XG5cbmZ1bmN0aW9uIHJlYWxwYXRoIChwLCBjYWNoZSwgY2IpIHtcbiAgaWYgKG9rKSB7XG4gICAgcmV0dXJuIG9yaWdSZWFscGF0aChwLCBjYWNoZSwgY2IpXG4gIH1cblxuICBpZiAodHlwZW9mIGNhY2hlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2IgPSBjYWNoZVxuICAgIGNhY2hlID0gbnVsbFxuICB9XG4gIG9yaWdSZWFscGF0aChwLCBjYWNoZSwgZnVuY3Rpb24gKGVyLCByZXN1bHQpIHtcbiAgICBpZiAobmV3RXJyb3IoZXIpKSB7XG4gICAgICBvbGQucmVhbHBhdGgocCwgY2FjaGUsIGNiKVxuICAgIH0gZWxzZSB7XG4gICAgICBjYihlciwgcmVzdWx0KVxuICAgIH1cbiAgfSlcbn1cblxuZnVuY3Rpb24gcmVhbHBhdGhTeW5jIChwLCBjYWNoZSkge1xuICBpZiAob2spIHtcbiAgICByZXR1cm4gb3JpZ1JlYWxwYXRoU3luYyhwLCBjYWNoZSlcbiAgfVxuXG4gIHRyeSB7XG4gICAgcmV0dXJuIG9yaWdSZWFscGF0aFN5bmMocCwgY2FjaGUpXG4gIH0gY2F0Y2ggKGVyKSB7XG4gICAgaWYgKG5ld0Vycm9yKGVyKSkge1xuICAgICAgcmV0dXJuIG9sZC5yZWFscGF0aFN5bmMocCwgY2FjaGUpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IGVyXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIG1vbmtleXBhdGNoICgpIHtcbiAgZnMucmVhbHBhdGggPSByZWFscGF0aFxuICBmcy5yZWFscGF0aFN5bmMgPSByZWFscGF0aFN5bmNcbn1cblxuZnVuY3Rpb24gdW5tb25rZXlwYXRjaCAoKSB7XG4gIGZzLnJlYWxwYXRoID0gb3JpZ1JlYWxwYXRoXG4gIGZzLnJlYWxwYXRoU3luYyA9IG9yaWdSZWFscGF0aFN5bmNcbn1cbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG52YXIgcGF0aE1vZHVsZSA9IHJlcXVpcmUoJ3BhdGgnKTtcbnZhciBpc1dpbmRvd3MgPSBwcm9jZXNzLnBsYXRmb3JtID09PSAnd2luMzInO1xudmFyIGZzID0gcmVxdWlyZSgnZnMnKTtcblxuLy8gSmF2YVNjcmlwdCBpbXBsZW1lbnRhdGlvbiBvZiByZWFscGF0aCwgcG9ydGVkIGZyb20gbm9kZSBwcmUtdjZcblxudmFyIERFQlVHID0gcHJvY2Vzcy5lbnYuTk9ERV9ERUJVRyAmJiAvZnMvLnRlc3QocHJvY2Vzcy5lbnYuTk9ERV9ERUJVRyk7XG5cbmZ1bmN0aW9uIHJldGhyb3coKSB7XG4gIC8vIE9ubHkgZW5hYmxlIGluIGRlYnVnIG1vZGUuIEEgYmFja3RyYWNlIHVzZXMgfjEwMDAgYnl0ZXMgb2YgaGVhcCBzcGFjZSBhbmRcbiAgLy8gaXMgZmFpcmx5IHNsb3cgdG8gZ2VuZXJhdGUuXG4gIHZhciBjYWxsYmFjaztcbiAgaWYgKERFQlVHKSB7XG4gICAgdmFyIGJhY2t0cmFjZSA9IG5ldyBFcnJvcjtcbiAgICBjYWxsYmFjayA9IGRlYnVnQ2FsbGJhY2s7XG4gIH0gZWxzZVxuICAgIGNhbGxiYWNrID0gbWlzc2luZ0NhbGxiYWNrO1xuXG4gIHJldHVybiBjYWxsYmFjaztcblxuICBmdW5jdGlvbiBkZWJ1Z0NhbGxiYWNrKGVycikge1xuICAgIGlmIChlcnIpIHtcbiAgICAgIGJhY2t0cmFjZS5tZXNzYWdlID0gZXJyLm1lc3NhZ2U7XG4gICAgICBlcnIgPSBiYWNrdHJhY2U7XG4gICAgICBtaXNzaW5nQ2FsbGJhY2soZXJyKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBtaXNzaW5nQ2FsbGJhY2soZXJyKSB7XG4gICAgaWYgKGVycikge1xuICAgICAgaWYgKHByb2Nlc3MudGhyb3dEZXByZWNhdGlvbilcbiAgICAgICAgdGhyb3cgZXJyOyAgLy8gRm9yZ290IGEgY2FsbGJhY2sgYnV0IGRvbid0IGtub3cgd2hlcmU/IFVzZSBOT0RFX0RFQlVHPWZzXG4gICAgICBlbHNlIGlmICghcHJvY2Vzcy5ub0RlcHJlY2F0aW9uKSB7XG4gICAgICAgIHZhciBtc2cgPSAnZnM6IG1pc3NpbmcgY2FsbGJhY2sgJyArIChlcnIuc3RhY2sgfHwgZXJyLm1lc3NhZ2UpO1xuICAgICAgICBpZiAocHJvY2Vzcy50cmFjZURlcHJlY2F0aW9uKVxuICAgICAgICAgIGNvbnNvbGUudHJhY2UobXNnKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IobXNnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gbWF5YmVDYWxsYmFjayhjYikge1xuICByZXR1cm4gdHlwZW9mIGNiID09PSAnZnVuY3Rpb24nID8gY2IgOiByZXRocm93KCk7XG59XG5cbnZhciBub3JtYWxpemUgPSBwYXRoTW9kdWxlLm5vcm1hbGl6ZTtcblxuLy8gUmVnZXhwIHRoYXQgZmluZHMgdGhlIG5leHQgcGFydGlvbiBvZiBhIChwYXJ0aWFsKSBwYXRoXG4vLyByZXN1bHQgaXMgW2Jhc2Vfd2l0aF9zbGFzaCwgYmFzZV0sIGUuZy4gWydzb21lZGlyLycsICdzb21lZGlyJ11cbmlmIChpc1dpbmRvd3MpIHtcbiAgdmFyIG5leHRQYXJ0UmUgPSAvKC4qPykoPzpbXFwvXFxcXF0rfCQpL2c7XG59IGVsc2Uge1xuICB2YXIgbmV4dFBhcnRSZSA9IC8oLio/KSg/OltcXC9dK3wkKS9nO1xufVxuXG4vLyBSZWdleCB0byBmaW5kIHRoZSBkZXZpY2Ugcm9vdCwgaW5jbHVkaW5nIHRyYWlsaW5nIHNsYXNoLiBFLmcuICdjOlxcXFwnLlxuaWYgKGlzV2luZG93cykge1xuICB2YXIgc3BsaXRSb290UmUgPSAvXig/OlthLXpBLVpdOnxbXFxcXFxcL117Mn1bXlxcXFxcXC9dK1tcXFxcXFwvXVteXFxcXFxcL10rKT9bXFxcXFxcL10qLztcbn0gZWxzZSB7XG4gIHZhciBzcGxpdFJvb3RSZSA9IC9eW1xcL10qLztcbn1cblxuZXhwb3J0cy5yZWFscGF0aFN5bmMgPSBmdW5jdGlvbiByZWFscGF0aFN5bmMocCwgY2FjaGUpIHtcbiAgLy8gbWFrZSBwIGlzIGFic29sdXRlXG4gIHAgPSBwYXRoTW9kdWxlLnJlc29sdmUocCk7XG5cbiAgaWYgKGNhY2hlICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjYWNoZSwgcCkpIHtcbiAgICByZXR1cm4gY2FjaGVbcF07XG4gIH1cblxuICB2YXIgb3JpZ2luYWwgPSBwLFxuICAgICAgc2VlbkxpbmtzID0ge30sXG4gICAgICBrbm93bkhhcmQgPSB7fTtcblxuICAvLyBjdXJyZW50IGNoYXJhY3RlciBwb3NpdGlvbiBpbiBwXG4gIHZhciBwb3M7XG4gIC8vIHRoZSBwYXJ0aWFsIHBhdGggc28gZmFyLCBpbmNsdWRpbmcgYSB0cmFpbGluZyBzbGFzaCBpZiBhbnlcbiAgdmFyIGN1cnJlbnQ7XG4gIC8vIHRoZSBwYXJ0aWFsIHBhdGggd2l0aG91dCBhIHRyYWlsaW5nIHNsYXNoIChleGNlcHQgd2hlbiBwb2ludGluZyBhdCBhIHJvb3QpXG4gIHZhciBiYXNlO1xuICAvLyB0aGUgcGFydGlhbCBwYXRoIHNjYW5uZWQgaW4gdGhlIHByZXZpb3VzIHJvdW5kLCB3aXRoIHNsYXNoXG4gIHZhciBwcmV2aW91cztcblxuICBzdGFydCgpO1xuXG4gIGZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgIC8vIFNraXAgb3ZlciByb290c1xuICAgIHZhciBtID0gc3BsaXRSb290UmUuZXhlYyhwKTtcbiAgICBwb3MgPSBtWzBdLmxlbmd0aDtcbiAgICBjdXJyZW50ID0gbVswXTtcbiAgICBiYXNlID0gbVswXTtcbiAgICBwcmV2aW91cyA9ICcnO1xuXG4gICAgLy8gT24gd2luZG93cywgY2hlY2sgdGhhdCB0aGUgcm9vdCBleGlzdHMuIE9uIHVuaXggdGhlcmUgaXMgbm8gbmVlZC5cbiAgICBpZiAoaXNXaW5kb3dzICYmICFrbm93bkhhcmRbYmFzZV0pIHtcbiAgICAgIGZzLmxzdGF0U3luYyhiYXNlKTtcbiAgICAgIGtub3duSGFyZFtiYXNlXSA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgLy8gd2FsayBkb3duIHRoZSBwYXRoLCBzd2FwcGluZyBvdXQgbGlua2VkIHBhdGhwYXJ0cyBmb3IgdGhlaXIgcmVhbFxuICAvLyB2YWx1ZXNcbiAgLy8gTkI6IHAubGVuZ3RoIGNoYW5nZXMuXG4gIHdoaWxlIChwb3MgPCBwLmxlbmd0aCkge1xuICAgIC8vIGZpbmQgdGhlIG5leHQgcGFydFxuICAgIG5leHRQYXJ0UmUubGFzdEluZGV4ID0gcG9zO1xuICAgIHZhciByZXN1bHQgPSBuZXh0UGFydFJlLmV4ZWMocCk7XG4gICAgcHJldmlvdXMgPSBjdXJyZW50O1xuICAgIGN1cnJlbnQgKz0gcmVzdWx0WzBdO1xuICAgIGJhc2UgPSBwcmV2aW91cyArIHJlc3VsdFsxXTtcbiAgICBwb3MgPSBuZXh0UGFydFJlLmxhc3RJbmRleDtcblxuICAgIC8vIGNvbnRpbnVlIGlmIG5vdCBhIHN5bWxpbmtcbiAgICBpZiAoa25vd25IYXJkW2Jhc2VdIHx8IChjYWNoZSAmJiBjYWNoZVtiYXNlXSA9PT0gYmFzZSkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHZhciByZXNvbHZlZExpbms7XG4gICAgaWYgKGNhY2hlICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjYWNoZSwgYmFzZSkpIHtcbiAgICAgIC8vIHNvbWUga25vd24gc3ltYm9saWMgbGluay4gIG5vIG5lZWQgdG8gc3RhdCBhZ2Fpbi5cbiAgICAgIHJlc29sdmVkTGluayA9IGNhY2hlW2Jhc2VdO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgc3RhdCA9IGZzLmxzdGF0U3luYyhiYXNlKTtcbiAgICAgIGlmICghc3RhdC5pc1N5bWJvbGljTGluaygpKSB7XG4gICAgICAgIGtub3duSGFyZFtiYXNlXSA9IHRydWU7XG4gICAgICAgIGlmIChjYWNoZSkgY2FjaGVbYmFzZV0gPSBiYXNlO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gcmVhZCB0aGUgbGluayBpZiBpdCB3YXNuJ3QgcmVhZCBiZWZvcmVcbiAgICAgIC8vIGRldi9pbm8gYWx3YXlzIHJldHVybiAwIG9uIHdpbmRvd3MsIHNvIHNraXAgdGhlIGNoZWNrLlxuICAgICAgdmFyIGxpbmtUYXJnZXQgPSBudWxsO1xuICAgICAgaWYgKCFpc1dpbmRvd3MpIHtcbiAgICAgICAgdmFyIGlkID0gc3RhdC5kZXYudG9TdHJpbmcoMzIpICsgJzonICsgc3RhdC5pbm8udG9TdHJpbmcoMzIpO1xuICAgICAgICBpZiAoc2VlbkxpbmtzLmhhc093blByb3BlcnR5KGlkKSkge1xuICAgICAgICAgIGxpbmtUYXJnZXQgPSBzZWVuTGlua3NbaWRdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobGlua1RhcmdldCA9PT0gbnVsbCkge1xuICAgICAgICBmcy5zdGF0U3luYyhiYXNlKTtcbiAgICAgICAgbGlua1RhcmdldCA9IGZzLnJlYWRsaW5rU3luYyhiYXNlKTtcbiAgICAgIH1cbiAgICAgIHJlc29sdmVkTGluayA9IHBhdGhNb2R1bGUucmVzb2x2ZShwcmV2aW91cywgbGlua1RhcmdldCk7XG4gICAgICAvLyB0cmFjayB0aGlzLCBpZiBnaXZlbiBhIGNhY2hlLlxuICAgICAgaWYgKGNhY2hlKSBjYWNoZVtiYXNlXSA9IHJlc29sdmVkTGluaztcbiAgICAgIGlmICghaXNXaW5kb3dzKSBzZWVuTGlua3NbaWRdID0gbGlua1RhcmdldDtcbiAgICB9XG5cbiAgICAvLyByZXNvbHZlIHRoZSBsaW5rLCB0aGVuIHN0YXJ0IG92ZXJcbiAgICBwID0gcGF0aE1vZHVsZS5yZXNvbHZlKHJlc29sdmVkTGluaywgcC5zbGljZShwb3MpKTtcbiAgICBzdGFydCgpO1xuICB9XG5cbiAgaWYgKGNhY2hlKSBjYWNoZVtvcmlnaW5hbF0gPSBwO1xuXG4gIHJldHVybiBwO1xufTtcblxuXG5leHBvcnRzLnJlYWxwYXRoID0gZnVuY3Rpb24gcmVhbHBhdGgocCwgY2FjaGUsIGNiKSB7XG4gIGlmICh0eXBlb2YgY2IgIT09ICdmdW5jdGlvbicpIHtcbiAgICBjYiA9IG1heWJlQ2FsbGJhY2soY2FjaGUpO1xuICAgIGNhY2hlID0gbnVsbDtcbiAgfVxuXG4gIC8vIG1ha2UgcCBpcyBhYnNvbHV0ZVxuICBwID0gcGF0aE1vZHVsZS5yZXNvbHZlKHApO1xuXG4gIGlmIChjYWNoZSAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY2FjaGUsIHApKSB7XG4gICAgcmV0dXJuIHByb2Nlc3MubmV4dFRpY2soY2IuYmluZChudWxsLCBudWxsLCBjYWNoZVtwXSkpO1xuICB9XG5cbiAgdmFyIG9yaWdpbmFsID0gcCxcbiAgICAgIHNlZW5MaW5rcyA9IHt9LFxuICAgICAga25vd25IYXJkID0ge307XG5cbiAgLy8gY3VycmVudCBjaGFyYWN0ZXIgcG9zaXRpb24gaW4gcFxuICB2YXIgcG9zO1xuICAvLyB0aGUgcGFydGlhbCBwYXRoIHNvIGZhciwgaW5jbHVkaW5nIGEgdHJhaWxpbmcgc2xhc2ggaWYgYW55XG4gIHZhciBjdXJyZW50O1xuICAvLyB0aGUgcGFydGlhbCBwYXRoIHdpdGhvdXQgYSB0cmFpbGluZyBzbGFzaCAoZXhjZXB0IHdoZW4gcG9pbnRpbmcgYXQgYSByb290KVxuICB2YXIgYmFzZTtcbiAgLy8gdGhlIHBhcnRpYWwgcGF0aCBzY2FubmVkIGluIHRoZSBwcmV2aW91cyByb3VuZCwgd2l0aCBzbGFzaFxuICB2YXIgcHJldmlvdXM7XG5cbiAgc3RhcnQoKTtcblxuICBmdW5jdGlvbiBzdGFydCgpIHtcbiAgICAvLyBTa2lwIG92ZXIgcm9vdHNcbiAgICB2YXIgbSA9IHNwbGl0Um9vdFJlLmV4ZWMocCk7XG4gICAgcG9zID0gbVswXS5sZW5ndGg7XG4gICAgY3VycmVudCA9IG1bMF07XG4gICAgYmFzZSA9IG1bMF07XG4gICAgcHJldmlvdXMgPSAnJztcblxuICAgIC8vIE9uIHdpbmRvd3MsIGNoZWNrIHRoYXQgdGhlIHJvb3QgZXhpc3RzLiBPbiB1bml4IHRoZXJlIGlzIG5vIG5lZWQuXG4gICAgaWYgKGlzV2luZG93cyAmJiAha25vd25IYXJkW2Jhc2VdKSB7XG4gICAgICBmcy5sc3RhdChiYXNlLCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgaWYgKGVycikgcmV0dXJuIGNiKGVycik7XG4gICAgICAgIGtub3duSGFyZFtiYXNlXSA9IHRydWU7XG4gICAgICAgIExPT1AoKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcm9jZXNzLm5leHRUaWNrKExPT1ApO1xuICAgIH1cbiAgfVxuXG4gIC8vIHdhbGsgZG93biB0aGUgcGF0aCwgc3dhcHBpbmcgb3V0IGxpbmtlZCBwYXRocGFydHMgZm9yIHRoZWlyIHJlYWxcbiAgLy8gdmFsdWVzXG4gIGZ1bmN0aW9uIExPT1AoKSB7XG4gICAgLy8gc3RvcCBpZiBzY2FubmVkIHBhc3QgZW5kIG9mIHBhdGhcbiAgICBpZiAocG9zID49IHAubGVuZ3RoKSB7XG4gICAgICBpZiAoY2FjaGUpIGNhY2hlW29yaWdpbmFsXSA9IHA7XG4gICAgICByZXR1cm4gY2IobnVsbCwgcCk7XG4gICAgfVxuXG4gICAgLy8gZmluZCB0aGUgbmV4dCBwYXJ0XG4gICAgbmV4dFBhcnRSZS5sYXN0SW5kZXggPSBwb3M7XG4gICAgdmFyIHJlc3VsdCA9IG5leHRQYXJ0UmUuZXhlYyhwKTtcbiAgICBwcmV2aW91cyA9IGN1cnJlbnQ7XG4gICAgY3VycmVudCArPSByZXN1bHRbMF07XG4gICAgYmFzZSA9IHByZXZpb3VzICsgcmVzdWx0WzFdO1xuICAgIHBvcyA9IG5leHRQYXJ0UmUubGFzdEluZGV4O1xuXG4gICAgLy8gY29udGludWUgaWYgbm90IGEgc3ltbGlua1xuICAgIGlmIChrbm93bkhhcmRbYmFzZV0gfHwgKGNhY2hlICYmIGNhY2hlW2Jhc2VdID09PSBiYXNlKSkge1xuICAgICAgcmV0dXJuIHByb2Nlc3MubmV4dFRpY2soTE9PUCk7XG4gICAgfVxuXG4gICAgaWYgKGNhY2hlICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjYWNoZSwgYmFzZSkpIHtcbiAgICAgIC8vIGtub3duIHN5bWJvbGljIGxpbmsuICBubyBuZWVkIHRvIHN0YXQgYWdhaW4uXG4gICAgICByZXR1cm4gZ290UmVzb2x2ZWRMaW5rKGNhY2hlW2Jhc2VdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnMubHN0YXQoYmFzZSwgZ290U3RhdCk7XG4gIH1cblxuICBmdW5jdGlvbiBnb3RTdGF0KGVyciwgc3RhdCkge1xuICAgIGlmIChlcnIpIHJldHVybiBjYihlcnIpO1xuXG4gICAgLy8gaWYgbm90IGEgc3ltbGluaywgc2tpcCB0byB0aGUgbmV4dCBwYXRoIHBhcnRcbiAgICBpZiAoIXN0YXQuaXNTeW1ib2xpY0xpbmsoKSkge1xuICAgICAga25vd25IYXJkW2Jhc2VdID0gdHJ1ZTtcbiAgICAgIGlmIChjYWNoZSkgY2FjaGVbYmFzZV0gPSBiYXNlO1xuICAgICAgcmV0dXJuIHByb2Nlc3MubmV4dFRpY2soTE9PUCk7XG4gICAgfVxuXG4gICAgLy8gc3RhdCAmIHJlYWQgdGhlIGxpbmsgaWYgbm90IHJlYWQgYmVmb3JlXG4gICAgLy8gY2FsbCBnb3RUYXJnZXQgYXMgc29vbiBhcyB0aGUgbGluayB0YXJnZXQgaXMga25vd25cbiAgICAvLyBkZXYvaW5vIGFsd2F5cyByZXR1cm4gMCBvbiB3aW5kb3dzLCBzbyBza2lwIHRoZSBjaGVjay5cbiAgICBpZiAoIWlzV2luZG93cykge1xuICAgICAgdmFyIGlkID0gc3RhdC5kZXYudG9TdHJpbmcoMzIpICsgJzonICsgc3RhdC5pbm8udG9TdHJpbmcoMzIpO1xuICAgICAgaWYgKHNlZW5MaW5rcy5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcbiAgICAgICAgcmV0dXJuIGdvdFRhcmdldChudWxsLCBzZWVuTGlua3NbaWRdLCBiYXNlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZnMuc3RhdChiYXNlLCBmdW5jdGlvbihlcnIpIHtcbiAgICAgIGlmIChlcnIpIHJldHVybiBjYihlcnIpO1xuXG4gICAgICBmcy5yZWFkbGluayhiYXNlLCBmdW5jdGlvbihlcnIsIHRhcmdldCkge1xuICAgICAgICBpZiAoIWlzV2luZG93cykgc2VlbkxpbmtzW2lkXSA9IHRhcmdldDtcbiAgICAgICAgZ290VGFyZ2V0KGVyciwgdGFyZ2V0KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ290VGFyZ2V0KGVyciwgdGFyZ2V0LCBiYXNlKSB7XG4gICAgaWYgKGVycikgcmV0dXJuIGNiKGVycik7XG5cbiAgICB2YXIgcmVzb2x2ZWRMaW5rID0gcGF0aE1vZHVsZS5yZXNvbHZlKHByZXZpb3VzLCB0YXJnZXQpO1xuICAgIGlmIChjYWNoZSkgY2FjaGVbYmFzZV0gPSByZXNvbHZlZExpbms7XG4gICAgZ290UmVzb2x2ZWRMaW5rKHJlc29sdmVkTGluayk7XG4gIH1cblxuICBmdW5jdGlvbiBnb3RSZXNvbHZlZExpbmsocmVzb2x2ZWRMaW5rKSB7XG4gICAgLy8gcmVzb2x2ZSB0aGUgbGluaywgdGhlbiBzdGFydCBvdmVyXG4gICAgcCA9IHBhdGhNb2R1bGUucmVzb2x2ZShyZXNvbHZlZExpbmssIHAuc2xpY2UocG9zKSk7XG4gICAgc3RhcnQoKTtcbiAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gbWluaW1hdGNoXG5taW5pbWF0Y2guTWluaW1hdGNoID0gTWluaW1hdGNoXG5cbnZhciBwYXRoID0geyBzZXA6ICcvJyB9XG50cnkge1xuICBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG59IGNhdGNoIChlcikge31cblxudmFyIEdMT0JTVEFSID0gbWluaW1hdGNoLkdMT0JTVEFSID0gTWluaW1hdGNoLkdMT0JTVEFSID0ge31cbnZhciBleHBhbmQgPSByZXF1aXJlKCdicmFjZS1leHBhbnNpb24nKVxuXG52YXIgcGxUeXBlcyA9IHtcbiAgJyEnOiB7IG9wZW46ICcoPzooPyEoPzonLCBjbG9zZTogJykpW14vXSo/KSd9LFxuICAnPyc6IHsgb3BlbjogJyg/OicsIGNsb3NlOiAnKT8nIH0sXG4gICcrJzogeyBvcGVuOiAnKD86JywgY2xvc2U6ICcpKycgfSxcbiAgJyonOiB7IG9wZW46ICcoPzonLCBjbG9zZTogJykqJyB9LFxuICAnQCc6IHsgb3BlbjogJyg/OicsIGNsb3NlOiAnKScgfVxufVxuXG4vLyBhbnkgc2luZ2xlIHRoaW5nIG90aGVyIHRoYW4gL1xuLy8gZG9uJ3QgbmVlZCB0byBlc2NhcGUgLyB3aGVuIHVzaW5nIG5ldyBSZWdFeHAoKVxudmFyIHFtYXJrID0gJ1teL10nXG5cbi8vICogPT4gYW55IG51bWJlciBvZiBjaGFyYWN0ZXJzXG52YXIgc3RhciA9IHFtYXJrICsgJyo/J1xuXG4vLyAqKiB3aGVuIGRvdHMgYXJlIGFsbG93ZWQuICBBbnl0aGluZyBnb2VzLCBleGNlcHQgLi4gYW5kIC5cbi8vIG5vdCAoXiBvciAvIGZvbGxvd2VkIGJ5IG9uZSBvciB0d28gZG90cyBmb2xsb3dlZCBieSAkIG9yIC8pLFxuLy8gZm9sbG93ZWQgYnkgYW55dGhpbmcsIGFueSBudW1iZXIgb2YgdGltZXMuXG52YXIgdHdvU3RhckRvdCA9ICcoPzooPyEoPzpcXFxcXFwvfF4pKD86XFxcXC57MSwyfSkoJHxcXFxcXFwvKSkuKSo/J1xuXG4vLyBub3QgYSBeIG9yIC8gZm9sbG93ZWQgYnkgYSBkb3QsXG4vLyBmb2xsb3dlZCBieSBhbnl0aGluZywgYW55IG51bWJlciBvZiB0aW1lcy5cbnZhciB0d29TdGFyTm9Eb3QgPSAnKD86KD8hKD86XFxcXFxcL3xeKVxcXFwuKS4pKj8nXG5cbi8vIGNoYXJhY3RlcnMgdGhhdCBuZWVkIHRvIGJlIGVzY2FwZWQgaW4gUmVnRXhwLlxudmFyIHJlU3BlY2lhbHMgPSBjaGFyU2V0KCcoKS4qe30rP1tdXiRcXFxcIScpXG5cbi8vIFwiYWJjXCIgLT4geyBhOnRydWUsIGI6dHJ1ZSwgYzp0cnVlIH1cbmZ1bmN0aW9uIGNoYXJTZXQgKHMpIHtcbiAgcmV0dXJuIHMuc3BsaXQoJycpLnJlZHVjZShmdW5jdGlvbiAoc2V0LCBjKSB7XG4gICAgc2V0W2NdID0gdHJ1ZVxuICAgIHJldHVybiBzZXRcbiAgfSwge30pXG59XG5cbi8vIG5vcm1hbGl6ZXMgc2xhc2hlcy5cbnZhciBzbGFzaFNwbGl0ID0gL1xcLysvXG5cbm1pbmltYXRjaC5maWx0ZXIgPSBmaWx0ZXJcbmZ1bmN0aW9uIGZpbHRlciAocGF0dGVybiwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICByZXR1cm4gZnVuY3Rpb24gKHAsIGksIGxpc3QpIHtcbiAgICByZXR1cm4gbWluaW1hdGNoKHAsIHBhdHRlcm4sIG9wdGlvbnMpXG4gIH1cbn1cblxuZnVuY3Rpb24gZXh0IChhLCBiKSB7XG4gIGEgPSBhIHx8IHt9XG4gIGIgPSBiIHx8IHt9XG4gIHZhciB0ID0ge31cbiAgT2JqZWN0LmtleXMoYikuZm9yRWFjaChmdW5jdGlvbiAoaykge1xuICAgIHRba10gPSBiW2tdXG4gIH0pXG4gIE9iamVjdC5rZXlzKGEpLmZvckVhY2goZnVuY3Rpb24gKGspIHtcbiAgICB0W2tdID0gYVtrXVxuICB9KVxuICByZXR1cm4gdFxufVxuXG5taW5pbWF0Y2guZGVmYXVsdHMgPSBmdW5jdGlvbiAoZGVmKSB7XG4gIGlmICghZGVmIHx8ICFPYmplY3Qua2V5cyhkZWYpLmxlbmd0aCkgcmV0dXJuIG1pbmltYXRjaFxuXG4gIHZhciBvcmlnID0gbWluaW1hdGNoXG5cbiAgdmFyIG0gPSBmdW5jdGlvbiBtaW5pbWF0Y2ggKHAsIHBhdHRlcm4sIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gb3JpZy5taW5pbWF0Y2gocCwgcGF0dGVybiwgZXh0KGRlZiwgb3B0aW9ucykpXG4gIH1cblxuICBtLk1pbmltYXRjaCA9IGZ1bmN0aW9uIE1pbmltYXRjaCAocGF0dGVybiwgb3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgb3JpZy5NaW5pbWF0Y2gocGF0dGVybiwgZXh0KGRlZiwgb3B0aW9ucykpXG4gIH1cblxuICByZXR1cm4gbVxufVxuXG5NaW5pbWF0Y2guZGVmYXVsdHMgPSBmdW5jdGlvbiAoZGVmKSB7XG4gIGlmICghZGVmIHx8ICFPYmplY3Qua2V5cyhkZWYpLmxlbmd0aCkgcmV0dXJuIE1pbmltYXRjaFxuICByZXR1cm4gbWluaW1hdGNoLmRlZmF1bHRzKGRlZikuTWluaW1hdGNoXG59XG5cbmZ1bmN0aW9uIG1pbmltYXRjaCAocCwgcGF0dGVybiwgb3B0aW9ucykge1xuICBpZiAodHlwZW9mIHBhdHRlcm4gIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZ2xvYiBwYXR0ZXJuIHN0cmluZyByZXF1aXJlZCcpXG4gIH1cblxuICBpZiAoIW9wdGlvbnMpIG9wdGlvbnMgPSB7fVxuXG4gIC8vIHNob3J0Y3V0OiBjb21tZW50cyBtYXRjaCBub3RoaW5nLlxuICBpZiAoIW9wdGlvbnMubm9jb21tZW50ICYmIHBhdHRlcm4uY2hhckF0KDApID09PSAnIycpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIC8vIFwiXCIgb25seSBtYXRjaGVzIFwiXCJcbiAgaWYgKHBhdHRlcm4udHJpbSgpID09PSAnJykgcmV0dXJuIHAgPT09ICcnXG5cbiAgcmV0dXJuIG5ldyBNaW5pbWF0Y2gocGF0dGVybiwgb3B0aW9ucykubWF0Y2gocClcbn1cblxuZnVuY3Rpb24gTWluaW1hdGNoIChwYXR0ZXJuLCBvcHRpb25zKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBNaW5pbWF0Y2gpKSB7XG4gICAgcmV0dXJuIG5ldyBNaW5pbWF0Y2gocGF0dGVybiwgb3B0aW9ucylcbiAgfVxuXG4gIGlmICh0eXBlb2YgcGF0dGVybiAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdnbG9iIHBhdHRlcm4gc3RyaW5nIHJlcXVpcmVkJylcbiAgfVxuXG4gIGlmICghb3B0aW9ucykgb3B0aW9ucyA9IHt9XG4gIHBhdHRlcm4gPSBwYXR0ZXJuLnRyaW0oKVxuXG4gIC8vIHdpbmRvd3Mgc3VwcG9ydDogbmVlZCB0byB1c2UgLywgbm90IFxcXG4gIGlmIChwYXRoLnNlcCAhPT0gJy8nKSB7XG4gICAgcGF0dGVybiA9IHBhdHRlcm4uc3BsaXQocGF0aC5zZXApLmpvaW4oJy8nKVxuICB9XG5cbiAgdGhpcy5vcHRpb25zID0gb3B0aW9uc1xuICB0aGlzLnNldCA9IFtdXG4gIHRoaXMucGF0dGVybiA9IHBhdHRlcm5cbiAgdGhpcy5yZWdleHAgPSBudWxsXG4gIHRoaXMubmVnYXRlID0gZmFsc2VcbiAgdGhpcy5jb21tZW50ID0gZmFsc2VcbiAgdGhpcy5lbXB0eSA9IGZhbHNlXG5cbiAgLy8gbWFrZSB0aGUgc2V0IG9mIHJlZ2V4cHMgZXRjLlxuICB0aGlzLm1ha2UoKVxufVxuXG5NaW5pbWF0Y2gucHJvdG90eXBlLmRlYnVnID0gZnVuY3Rpb24gKCkge31cblxuTWluaW1hdGNoLnByb3RvdHlwZS5tYWtlID0gbWFrZVxuZnVuY3Rpb24gbWFrZSAoKSB7XG4gIC8vIGRvbid0IGRvIGl0IG1vcmUgdGhhbiBvbmNlLlxuICBpZiAodGhpcy5fbWFkZSkgcmV0dXJuXG5cbiAgdmFyIHBhdHRlcm4gPSB0aGlzLnBhdHRlcm5cbiAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnNcblxuICAvLyBlbXB0eSBwYXR0ZXJucyBhbmQgY29tbWVudHMgbWF0Y2ggbm90aGluZy5cbiAgaWYgKCFvcHRpb25zLm5vY29tbWVudCAmJiBwYXR0ZXJuLmNoYXJBdCgwKSA9PT0gJyMnKSB7XG4gICAgdGhpcy5jb21tZW50ID0gdHJ1ZVxuICAgIHJldHVyblxuICB9XG4gIGlmICghcGF0dGVybikge1xuICAgIHRoaXMuZW1wdHkgPSB0cnVlXG4gICAgcmV0dXJuXG4gIH1cblxuICAvLyBzdGVwIDE6IGZpZ3VyZSBvdXQgbmVnYXRpb24sIGV0Yy5cbiAgdGhpcy5wYXJzZU5lZ2F0ZSgpXG5cbiAgLy8gc3RlcCAyOiBleHBhbmQgYnJhY2VzXG4gIHZhciBzZXQgPSB0aGlzLmdsb2JTZXQgPSB0aGlzLmJyYWNlRXhwYW5kKClcblxuICBpZiAob3B0aW9ucy5kZWJ1ZykgdGhpcy5kZWJ1ZyA9IGNvbnNvbGUuZXJyb3JcblxuICB0aGlzLmRlYnVnKHRoaXMucGF0dGVybiwgc2V0KVxuXG4gIC8vIHN0ZXAgMzogbm93IHdlIGhhdmUgYSBzZXQsIHNvIHR1cm4gZWFjaCBvbmUgaW50byBhIHNlcmllcyBvZiBwYXRoLXBvcnRpb25cbiAgLy8gbWF0Y2hpbmcgcGF0dGVybnMuXG4gIC8vIFRoZXNlIHdpbGwgYmUgcmVnZXhwcywgZXhjZXB0IGluIHRoZSBjYXNlIG9mIFwiKipcIiwgd2hpY2ggaXNcbiAgLy8gc2V0IHRvIHRoZSBHTE9CU1RBUiBvYmplY3QgZm9yIGdsb2JzdGFyIGJlaGF2aW9yLFxuICAvLyBhbmQgd2lsbCBub3QgY29udGFpbiBhbnkgLyBjaGFyYWN0ZXJzXG4gIHNldCA9IHRoaXMuZ2xvYlBhcnRzID0gc2V0Lm1hcChmdW5jdGlvbiAocykge1xuICAgIHJldHVybiBzLnNwbGl0KHNsYXNoU3BsaXQpXG4gIH0pXG5cbiAgdGhpcy5kZWJ1Zyh0aGlzLnBhdHRlcm4sIHNldClcblxuICAvLyBnbG9iIC0tPiByZWdleHBzXG4gIHNldCA9IHNldC5tYXAoZnVuY3Rpb24gKHMsIHNpLCBzZXQpIHtcbiAgICByZXR1cm4gcy5tYXAodGhpcy5wYXJzZSwgdGhpcylcbiAgfSwgdGhpcylcblxuICB0aGlzLmRlYnVnKHRoaXMucGF0dGVybiwgc2V0KVxuXG4gIC8vIGZpbHRlciBvdXQgZXZlcnl0aGluZyB0aGF0IGRpZG4ndCBjb21waWxlIHByb3Blcmx5LlxuICBzZXQgPSBzZXQuZmlsdGVyKGZ1bmN0aW9uIChzKSB7XG4gICAgcmV0dXJuIHMuaW5kZXhPZihmYWxzZSkgPT09IC0xXG4gIH0pXG5cbiAgdGhpcy5kZWJ1Zyh0aGlzLnBhdHRlcm4sIHNldClcblxuICB0aGlzLnNldCA9IHNldFxufVxuXG5NaW5pbWF0Y2gucHJvdG90eXBlLnBhcnNlTmVnYXRlID0gcGFyc2VOZWdhdGVcbmZ1bmN0aW9uIHBhcnNlTmVnYXRlICgpIHtcbiAgdmFyIHBhdHRlcm4gPSB0aGlzLnBhdHRlcm5cbiAgdmFyIG5lZ2F0ZSA9IGZhbHNlXG4gIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zXG4gIHZhciBuZWdhdGVPZmZzZXQgPSAwXG5cbiAgaWYgKG9wdGlvbnMubm9uZWdhdGUpIHJldHVyblxuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gcGF0dGVybi5sZW5ndGhcbiAgICA7IGkgPCBsICYmIHBhdHRlcm4uY2hhckF0KGkpID09PSAnISdcbiAgICA7IGkrKykge1xuICAgIG5lZ2F0ZSA9ICFuZWdhdGVcbiAgICBuZWdhdGVPZmZzZXQrK1xuICB9XG5cbiAgaWYgKG5lZ2F0ZU9mZnNldCkgdGhpcy5wYXR0ZXJuID0gcGF0dGVybi5zdWJzdHIobmVnYXRlT2Zmc2V0KVxuICB0aGlzLm5lZ2F0ZSA9IG5lZ2F0ZVxufVxuXG4vLyBCcmFjZSBleHBhbnNpb246XG4vLyBhe2IsY31kIC0+IGFiZCBhY2Rcbi8vIGF7Yix9YyAtPiBhYmMgYWNcbi8vIGF7MC4uM31kIC0+IGEwZCBhMWQgYTJkIGEzZFxuLy8gYXtiLGN7ZCxlfWZ9ZyAtPiBhYmcgYWNkZmcgYWNlZmdcbi8vIGF7YixjfWR7ZSxmfWcgLT4gYWJkZWcgYWNkZWcgYWJkZWcgYWJkZmdcbi8vXG4vLyBJbnZhbGlkIHNldHMgYXJlIG5vdCBleHBhbmRlZC5cbi8vIGF7Mi4ufWIgLT4gYXsyLi59YlxuLy8gYXtifWMgLT4gYXtifWNcbm1pbmltYXRjaC5icmFjZUV4cGFuZCA9IGZ1bmN0aW9uIChwYXR0ZXJuLCBvcHRpb25zKSB7XG4gIHJldHVybiBicmFjZUV4cGFuZChwYXR0ZXJuLCBvcHRpb25zKVxufVxuXG5NaW5pbWF0Y2gucHJvdG90eXBlLmJyYWNlRXhwYW5kID0gYnJhY2VFeHBhbmRcblxuZnVuY3Rpb24gYnJhY2VFeHBhbmQgKHBhdHRlcm4sIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBNaW5pbWF0Y2gpIHtcbiAgICAgIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnNcbiAgICB9IGVsc2Uge1xuICAgICAgb3B0aW9ucyA9IHt9XG4gICAgfVxuICB9XG5cbiAgcGF0dGVybiA9IHR5cGVvZiBwYXR0ZXJuID09PSAndW5kZWZpbmVkJ1xuICAgID8gdGhpcy5wYXR0ZXJuIDogcGF0dGVyblxuXG4gIGlmICh0eXBlb2YgcGF0dGVybiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd1bmRlZmluZWQgcGF0dGVybicpXG4gIH1cblxuICBpZiAob3B0aW9ucy5ub2JyYWNlIHx8XG4gICAgIXBhdHRlcm4ubWF0Y2goL1xcey4qXFx9LykpIHtcbiAgICAvLyBzaG9ydGN1dC4gbm8gbmVlZCB0byBleHBhbmQuXG4gICAgcmV0dXJuIFtwYXR0ZXJuXVxuICB9XG5cbiAgcmV0dXJuIGV4cGFuZChwYXR0ZXJuKVxufVxuXG4vLyBwYXJzZSBhIGNvbXBvbmVudCBvZiB0aGUgZXhwYW5kZWQgc2V0LlxuLy8gQXQgdGhpcyBwb2ludCwgbm8gcGF0dGVybiBtYXkgY29udGFpbiBcIi9cIiBpbiBpdFxuLy8gc28gd2UncmUgZ29pbmcgdG8gcmV0dXJuIGEgMmQgYXJyYXksIHdoZXJlIGVhY2ggZW50cnkgaXMgdGhlIGZ1bGxcbi8vIHBhdHRlcm4sIHNwbGl0IG9uICcvJywgYW5kIHRoZW4gdHVybmVkIGludG8gYSByZWd1bGFyIGV4cHJlc3Npb24uXG4vLyBBIHJlZ2V4cCBpcyBtYWRlIGF0IHRoZSBlbmQgd2hpY2ggam9pbnMgZWFjaCBhcnJheSB3aXRoIGFuXG4vLyBlc2NhcGVkIC8sIGFuZCBhbm90aGVyIGZ1bGwgb25lIHdoaWNoIGpvaW5zIGVhY2ggcmVnZXhwIHdpdGggfC5cbi8vXG4vLyBGb2xsb3dpbmcgdGhlIGxlYWQgb2YgQmFzaCA0LjEsIG5vdGUgdGhhdCBcIioqXCIgb25seSBoYXMgc3BlY2lhbCBtZWFuaW5nXG4vLyB3aGVuIGl0IGlzIHRoZSAqb25seSogdGhpbmcgaW4gYSBwYXRoIHBvcnRpb24uICBPdGhlcndpc2UsIGFueSBzZXJpZXNcbi8vIG9mICogaXMgZXF1aXZhbGVudCB0byBhIHNpbmdsZSAqLiAgR2xvYnN0YXIgYmVoYXZpb3IgaXMgZW5hYmxlZCBieVxuLy8gZGVmYXVsdCwgYW5kIGNhbiBiZSBkaXNhYmxlZCBieSBzZXR0aW5nIG9wdGlvbnMubm9nbG9ic3Rhci5cbk1pbmltYXRjaC5wcm90b3R5cGUucGFyc2UgPSBwYXJzZVxudmFyIFNVQlBBUlNFID0ge31cbmZ1bmN0aW9uIHBhcnNlIChwYXR0ZXJuLCBpc1N1Yikge1xuICBpZiAocGF0dGVybi5sZW5ndGggPiAxMDI0ICogNjQpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdwYXR0ZXJuIGlzIHRvbyBsb25nJylcbiAgfVxuXG4gIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zXG5cbiAgLy8gc2hvcnRjdXRzXG4gIGlmICghb3B0aW9ucy5ub2dsb2JzdGFyICYmIHBhdHRlcm4gPT09ICcqKicpIHJldHVybiBHTE9CU1RBUlxuICBpZiAocGF0dGVybiA9PT0gJycpIHJldHVybiAnJ1xuXG4gIHZhciByZSA9ICcnXG4gIHZhciBoYXNNYWdpYyA9ICEhb3B0aW9ucy5ub2Nhc2VcbiAgdmFyIGVzY2FwaW5nID0gZmFsc2VcbiAgLy8gPyA9PiBvbmUgc2luZ2xlIGNoYXJhY3RlclxuICB2YXIgcGF0dGVybkxpc3RTdGFjayA9IFtdXG4gIHZhciBuZWdhdGl2ZUxpc3RzID0gW11cbiAgdmFyIHN0YXRlQ2hhclxuICB2YXIgaW5DbGFzcyA9IGZhbHNlXG4gIHZhciByZUNsYXNzU3RhcnQgPSAtMVxuICB2YXIgY2xhc3NTdGFydCA9IC0xXG4gIC8vIC4gYW5kIC4uIG5ldmVyIG1hdGNoIGFueXRoaW5nIHRoYXQgZG9lc24ndCBzdGFydCB3aXRoIC4sXG4gIC8vIGV2ZW4gd2hlbiBvcHRpb25zLmRvdCBpcyBzZXQuXG4gIHZhciBwYXR0ZXJuU3RhcnQgPSBwYXR0ZXJuLmNoYXJBdCgwKSA9PT0gJy4nID8gJycgLy8gYW55dGhpbmdcbiAgLy8gbm90IChzdGFydCBvciAvIGZvbGxvd2VkIGJ5IC4gb3IgLi4gZm9sbG93ZWQgYnkgLyBvciBlbmQpXG4gIDogb3B0aW9ucy5kb3QgPyAnKD8hKD86XnxcXFxcXFwvKVxcXFwuezEsMn0oPzokfFxcXFxcXC8pKSdcbiAgOiAnKD8hXFxcXC4pJ1xuICB2YXIgc2VsZiA9IHRoaXNcblxuICBmdW5jdGlvbiBjbGVhclN0YXRlQ2hhciAoKSB7XG4gICAgaWYgKHN0YXRlQ2hhcikge1xuICAgICAgLy8gd2UgaGFkIHNvbWUgc3RhdGUtdHJhY2tpbmcgY2hhcmFjdGVyXG4gICAgICAvLyB0aGF0IHdhc24ndCBjb25zdW1lZCBieSB0aGlzIHBhc3MuXG4gICAgICBzd2l0Y2ggKHN0YXRlQ2hhcikge1xuICAgICAgICBjYXNlICcqJzpcbiAgICAgICAgICByZSArPSBzdGFyXG4gICAgICAgICAgaGFzTWFnaWMgPSB0cnVlXG4gICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJz8nOlxuICAgICAgICAgIHJlICs9IHFtYXJrXG4gICAgICAgICAgaGFzTWFnaWMgPSB0cnVlXG4gICAgICAgIGJyZWFrXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmUgKz0gJ1xcXFwnICsgc3RhdGVDaGFyXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBzZWxmLmRlYnVnKCdjbGVhclN0YXRlQ2hhciAlaiAlaicsIHN0YXRlQ2hhciwgcmUpXG4gICAgICBzdGF0ZUNoYXIgPSBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBwYXR0ZXJuLmxlbmd0aCwgY1xuICAgIDsgKGkgPCBsZW4pICYmIChjID0gcGF0dGVybi5jaGFyQXQoaSkpXG4gICAgOyBpKyspIHtcbiAgICB0aGlzLmRlYnVnKCclc1xcdCVzICVzICVqJywgcGF0dGVybiwgaSwgcmUsIGMpXG5cbiAgICAvLyBza2lwIG92ZXIgYW55IHRoYXQgYXJlIGVzY2FwZWQuXG4gICAgaWYgKGVzY2FwaW5nICYmIHJlU3BlY2lhbHNbY10pIHtcbiAgICAgIHJlICs9ICdcXFxcJyArIGNcbiAgICAgIGVzY2FwaW5nID0gZmFsc2VcbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuXG4gICAgc3dpdGNoIChjKSB7XG4gICAgICBjYXNlICcvJzpcbiAgICAgICAgLy8gY29tcGxldGVseSBub3QgYWxsb3dlZCwgZXZlbiBlc2NhcGVkLlxuICAgICAgICAvLyBTaG91bGQgYWxyZWFkeSBiZSBwYXRoLXNwbGl0IGJ5IG5vdy5cbiAgICAgICAgcmV0dXJuIGZhbHNlXG5cbiAgICAgIGNhc2UgJ1xcXFwnOlxuICAgICAgICBjbGVhclN0YXRlQ2hhcigpXG4gICAgICAgIGVzY2FwaW5nID0gdHJ1ZVxuICAgICAgY29udGludWVcblxuICAgICAgLy8gdGhlIHZhcmlvdXMgc3RhdGVDaGFyIHZhbHVlc1xuICAgICAgLy8gZm9yIHRoZSBcImV4dGdsb2JcIiBzdHVmZi5cbiAgICAgIGNhc2UgJz8nOlxuICAgICAgY2FzZSAnKic6XG4gICAgICBjYXNlICcrJzpcbiAgICAgIGNhc2UgJ0AnOlxuICAgICAgY2FzZSAnISc6XG4gICAgICAgIHRoaXMuZGVidWcoJyVzXFx0JXMgJXMgJWogPC0tIHN0YXRlQ2hhcicsIHBhdHRlcm4sIGksIHJlLCBjKVxuXG4gICAgICAgIC8vIGFsbCBvZiB0aG9zZSBhcmUgbGl0ZXJhbHMgaW5zaWRlIGEgY2xhc3MsIGV4Y2VwdCB0aGF0XG4gICAgICAgIC8vIHRoZSBnbG9iIFshYV0gbWVhbnMgW15hXSBpbiByZWdleHBcbiAgICAgICAgaWYgKGluQ2xhc3MpIHtcbiAgICAgICAgICB0aGlzLmRlYnVnKCcgIGluIGNsYXNzJylcbiAgICAgICAgICBpZiAoYyA9PT0gJyEnICYmIGkgPT09IGNsYXNzU3RhcnQgKyAxKSBjID0gJ14nXG4gICAgICAgICAgcmUgKz0gY1xuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiB3ZSBhbHJlYWR5IGhhdmUgYSBzdGF0ZUNoYXIsIHRoZW4gaXQgbWVhbnNcbiAgICAgICAgLy8gdGhhdCB0aGVyZSB3YXMgc29tZXRoaW5nIGxpa2UgKiogb3IgKz8gaW4gdGhlcmUuXG4gICAgICAgIC8vIEhhbmRsZSB0aGUgc3RhdGVDaGFyLCB0aGVuIHByb2NlZWQgd2l0aCB0aGlzIG9uZS5cbiAgICAgICAgc2VsZi5kZWJ1ZygnY2FsbCBjbGVhclN0YXRlQ2hhciAlaicsIHN0YXRlQ2hhcilcbiAgICAgICAgY2xlYXJTdGF0ZUNoYXIoKVxuICAgICAgICBzdGF0ZUNoYXIgPSBjXG4gICAgICAgIC8vIGlmIGV4dGdsb2IgaXMgZGlzYWJsZWQsIHRoZW4gKyhhc2RmfGZvbykgaXNuJ3QgYSB0aGluZy5cbiAgICAgICAgLy8ganVzdCBjbGVhciB0aGUgc3RhdGVjaGFyICpub3cqLCByYXRoZXIgdGhhbiBldmVuIGRpdmluZyBpbnRvXG4gICAgICAgIC8vIHRoZSBwYXR0ZXJuTGlzdCBzdHVmZi5cbiAgICAgICAgaWYgKG9wdGlvbnMubm9leHQpIGNsZWFyU3RhdGVDaGFyKClcbiAgICAgIGNvbnRpbnVlXG5cbiAgICAgIGNhc2UgJygnOlxuICAgICAgICBpZiAoaW5DbGFzcykge1xuICAgICAgICAgIHJlICs9ICcoJ1xuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXN0YXRlQ2hhcikge1xuICAgICAgICAgIHJlICs9ICdcXFxcKCdcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgcGF0dGVybkxpc3RTdGFjay5wdXNoKHtcbiAgICAgICAgICB0eXBlOiBzdGF0ZUNoYXIsXG4gICAgICAgICAgc3RhcnQ6IGkgLSAxLFxuICAgICAgICAgIHJlU3RhcnQ6IHJlLmxlbmd0aCxcbiAgICAgICAgICBvcGVuOiBwbFR5cGVzW3N0YXRlQ2hhcl0ub3BlbixcbiAgICAgICAgICBjbG9zZTogcGxUeXBlc1tzdGF0ZUNoYXJdLmNsb3NlXG4gICAgICAgIH0pXG4gICAgICAgIC8vIG5lZ2F0aW9uIGlzICg/Oig/IWpzKVteL10qKVxuICAgICAgICByZSArPSBzdGF0ZUNoYXIgPT09ICchJyA/ICcoPzooPyEoPzonIDogJyg/OidcbiAgICAgICAgdGhpcy5kZWJ1ZygncGxUeXBlICVqICVqJywgc3RhdGVDaGFyLCByZSlcbiAgICAgICAgc3RhdGVDaGFyID0gZmFsc2VcbiAgICAgIGNvbnRpbnVlXG5cbiAgICAgIGNhc2UgJyknOlxuICAgICAgICBpZiAoaW5DbGFzcyB8fCAhcGF0dGVybkxpc3RTdGFjay5sZW5ndGgpIHtcbiAgICAgICAgICByZSArPSAnXFxcXCknXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIGNsZWFyU3RhdGVDaGFyKClcbiAgICAgICAgaGFzTWFnaWMgPSB0cnVlXG4gICAgICAgIHZhciBwbCA9IHBhdHRlcm5MaXN0U3RhY2sucG9wKClcbiAgICAgICAgLy8gbmVnYXRpb24gaXMgKD86KD8hanMpW14vXSopXG4gICAgICAgIC8vIFRoZSBvdGhlcnMgYXJlICg/OjxwYXR0ZXJuPik8dHlwZT5cbiAgICAgICAgcmUgKz0gcGwuY2xvc2VcbiAgICAgICAgaWYgKHBsLnR5cGUgPT09ICchJykge1xuICAgICAgICAgIG5lZ2F0aXZlTGlzdHMucHVzaChwbClcbiAgICAgICAgfVxuICAgICAgICBwbC5yZUVuZCA9IHJlLmxlbmd0aFxuICAgICAgY29udGludWVcblxuICAgICAgY2FzZSAnfCc6XG4gICAgICAgIGlmIChpbkNsYXNzIHx8ICFwYXR0ZXJuTGlzdFN0YWNrLmxlbmd0aCB8fCBlc2NhcGluZykge1xuICAgICAgICAgIHJlICs9ICdcXFxcfCdcbiAgICAgICAgICBlc2NhcGluZyA9IGZhbHNlXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIGNsZWFyU3RhdGVDaGFyKClcbiAgICAgICAgcmUgKz0gJ3wnXG4gICAgICBjb250aW51ZVxuXG4gICAgICAvLyB0aGVzZSBhcmUgbW9zdGx5IHRoZSBzYW1lIGluIHJlZ2V4cCBhbmQgZ2xvYlxuICAgICAgY2FzZSAnWyc6XG4gICAgICAgIC8vIHN3YWxsb3cgYW55IHN0YXRlLXRyYWNraW5nIGNoYXIgYmVmb3JlIHRoZSBbXG4gICAgICAgIGNsZWFyU3RhdGVDaGFyKClcblxuICAgICAgICBpZiAoaW5DbGFzcykge1xuICAgICAgICAgIHJlICs9ICdcXFxcJyArIGNcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgaW5DbGFzcyA9IHRydWVcbiAgICAgICAgY2xhc3NTdGFydCA9IGlcbiAgICAgICAgcmVDbGFzc1N0YXJ0ID0gcmUubGVuZ3RoXG4gICAgICAgIHJlICs9IGNcbiAgICAgIGNvbnRpbnVlXG5cbiAgICAgIGNhc2UgJ10nOlxuICAgICAgICAvLyAgYSByaWdodCBicmFja2V0IHNoYWxsIGxvc2UgaXRzIHNwZWNpYWxcbiAgICAgICAgLy8gIG1lYW5pbmcgYW5kIHJlcHJlc2VudCBpdHNlbGYgaW5cbiAgICAgICAgLy8gIGEgYnJhY2tldCBleHByZXNzaW9uIGlmIGl0IG9jY3Vyc1xuICAgICAgICAvLyAgZmlyc3QgaW4gdGhlIGxpc3QuICAtLSBQT1NJWC4yIDIuOC4zLjJcbiAgICAgICAgaWYgKGkgPT09IGNsYXNzU3RhcnQgKyAxIHx8ICFpbkNsYXNzKSB7XG4gICAgICAgICAgcmUgKz0gJ1xcXFwnICsgY1xuICAgICAgICAgIGVzY2FwaW5nID0gZmFsc2VcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gaGFuZGxlIHRoZSBjYXNlIHdoZXJlIHdlIGxlZnQgYSBjbGFzcyBvcGVuLlxuICAgICAgICAvLyBcIlt6LWFdXCIgaXMgdmFsaWQsIGVxdWl2YWxlbnQgdG8gXCJcXFt6LWFcXF1cIlxuICAgICAgICBpZiAoaW5DbGFzcykge1xuICAgICAgICAgIC8vIHNwbGl0IHdoZXJlIHRoZSBsYXN0IFsgd2FzLCBtYWtlIHN1cmUgd2UgZG9uJ3QgaGF2ZVxuICAgICAgICAgIC8vIGFuIGludmFsaWQgcmUuIGlmIHNvLCByZS13YWxrIHRoZSBjb250ZW50cyBvZiB0aGVcbiAgICAgICAgICAvLyB3b3VsZC1iZSBjbGFzcyB0byByZS10cmFuc2xhdGUgYW55IGNoYXJhY3RlcnMgdGhhdFxuICAgICAgICAgIC8vIHdlcmUgcGFzc2VkIHRocm91Z2ggYXMtaXNcbiAgICAgICAgICAvLyBUT0RPOiBJdCB3b3VsZCBwcm9iYWJseSBiZSBmYXN0ZXIgdG8gZGV0ZXJtaW5lIHRoaXNcbiAgICAgICAgICAvLyB3aXRob3V0IGEgdHJ5L2NhdGNoIGFuZCBhIG5ldyBSZWdFeHAsIGJ1dCBpdCdzIHRyaWNreVxuICAgICAgICAgIC8vIHRvIGRvIHNhZmVseS4gIEZvciBub3csIHRoaXMgaXMgc2FmZSBhbmQgd29ya3MuXG4gICAgICAgICAgdmFyIGNzID0gcGF0dGVybi5zdWJzdHJpbmcoY2xhc3NTdGFydCArIDEsIGkpXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIFJlZ0V4cCgnWycgKyBjcyArICddJylcbiAgICAgICAgICB9IGNhdGNoIChlcikge1xuICAgICAgICAgICAgLy8gbm90IGEgdmFsaWQgY2xhc3MhXG4gICAgICAgICAgICB2YXIgc3AgPSB0aGlzLnBhcnNlKGNzLCBTVUJQQVJTRSlcbiAgICAgICAgICAgIHJlID0gcmUuc3Vic3RyKDAsIHJlQ2xhc3NTdGFydCkgKyAnXFxcXFsnICsgc3BbMF0gKyAnXFxcXF0nXG4gICAgICAgICAgICBoYXNNYWdpYyA9IGhhc01hZ2ljIHx8IHNwWzFdXG4gICAgICAgICAgICBpbkNsYXNzID0gZmFsc2VcbiAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZmluaXNoIHVwIHRoZSBjbGFzcy5cbiAgICAgICAgaGFzTWFnaWMgPSB0cnVlXG4gICAgICAgIGluQ2xhc3MgPSBmYWxzZVxuICAgICAgICByZSArPSBjXG4gICAgICBjb250aW51ZVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvLyBzd2FsbG93IGFueSBzdGF0ZSBjaGFyIHRoYXQgd2Fzbid0IGNvbnN1bWVkXG4gICAgICAgIGNsZWFyU3RhdGVDaGFyKClcblxuICAgICAgICBpZiAoZXNjYXBpbmcpIHtcbiAgICAgICAgICAvLyBubyBuZWVkXG4gICAgICAgICAgZXNjYXBpbmcgPSBmYWxzZVxuICAgICAgICB9IGVsc2UgaWYgKHJlU3BlY2lhbHNbY11cbiAgICAgICAgICAmJiAhKGMgPT09ICdeJyAmJiBpbkNsYXNzKSkge1xuICAgICAgICAgIHJlICs9ICdcXFxcJ1xuICAgICAgICB9XG5cbiAgICAgICAgcmUgKz0gY1xuXG4gICAgfSAvLyBzd2l0Y2hcbiAgfSAvLyBmb3JcblxuICAvLyBoYW5kbGUgdGhlIGNhc2Ugd2hlcmUgd2UgbGVmdCBhIGNsYXNzIG9wZW4uXG4gIC8vIFwiW2FiY1wiIGlzIHZhbGlkLCBlcXVpdmFsZW50IHRvIFwiXFxbYWJjXCJcbiAgaWYgKGluQ2xhc3MpIHtcbiAgICAvLyBzcGxpdCB3aGVyZSB0aGUgbGFzdCBbIHdhcywgYW5kIGVzY2FwZSBpdFxuICAgIC8vIHRoaXMgaXMgYSBodWdlIHBpdGEuICBXZSBub3cgaGF2ZSB0byByZS13YWxrXG4gICAgLy8gdGhlIGNvbnRlbnRzIG9mIHRoZSB3b3VsZC1iZSBjbGFzcyB0byByZS10cmFuc2xhdGVcbiAgICAvLyBhbnkgY2hhcmFjdGVycyB0aGF0IHdlcmUgcGFzc2VkIHRocm91Z2ggYXMtaXNcbiAgICBjcyA9IHBhdHRlcm4uc3Vic3RyKGNsYXNzU3RhcnQgKyAxKVxuICAgIHNwID0gdGhpcy5wYXJzZShjcywgU1VCUEFSU0UpXG4gICAgcmUgPSByZS5zdWJzdHIoMCwgcmVDbGFzc1N0YXJ0KSArICdcXFxcWycgKyBzcFswXVxuICAgIGhhc01hZ2ljID0gaGFzTWFnaWMgfHwgc3BbMV1cbiAgfVxuXG4gIC8vIGhhbmRsZSB0aGUgY2FzZSB3aGVyZSB3ZSBoYWQgYSArKCB0aGluZyBhdCB0aGUgKmVuZCpcbiAgLy8gb2YgdGhlIHBhdHRlcm4uXG4gIC8vIGVhY2ggcGF0dGVybiBsaXN0IHN0YWNrIGFkZHMgMyBjaGFycywgYW5kIHdlIG5lZWQgdG8gZ28gdGhyb3VnaFxuICAvLyBhbmQgZXNjYXBlIGFueSB8IGNoYXJzIHRoYXQgd2VyZSBwYXNzZWQgdGhyb3VnaCBhcy1pcyBmb3IgdGhlIHJlZ2V4cC5cbiAgLy8gR28gdGhyb3VnaCBhbmQgZXNjYXBlIHRoZW0sIHRha2luZyBjYXJlIG5vdCB0byBkb3VibGUtZXNjYXBlIGFueVxuICAvLyB8IGNoYXJzIHRoYXQgd2VyZSBhbHJlYWR5IGVzY2FwZWQuXG4gIGZvciAocGwgPSBwYXR0ZXJuTGlzdFN0YWNrLnBvcCgpOyBwbDsgcGwgPSBwYXR0ZXJuTGlzdFN0YWNrLnBvcCgpKSB7XG4gICAgdmFyIHRhaWwgPSByZS5zbGljZShwbC5yZVN0YXJ0ICsgcGwub3Blbi5sZW5ndGgpXG4gICAgdGhpcy5kZWJ1Zygnc2V0dGluZyB0YWlsJywgcmUsIHBsKVxuICAgIC8vIG1heWJlIHNvbWUgZXZlbiBudW1iZXIgb2YgXFwsIHRoZW4gbWF5YmUgMSBcXCwgZm9sbG93ZWQgYnkgYSB8XG4gICAgdGFpbCA9IHRhaWwucmVwbGFjZSgvKCg/OlxcXFx7Mn0pezAsNjR9KShcXFxcPylcXHwvZywgZnVuY3Rpb24gKF8sICQxLCAkMikge1xuICAgICAgaWYgKCEkMikge1xuICAgICAgICAvLyB0aGUgfCBpc24ndCBhbHJlYWR5IGVzY2FwZWQsIHNvIGVzY2FwZSBpdC5cbiAgICAgICAgJDIgPSAnXFxcXCdcbiAgICAgIH1cblxuICAgICAgLy8gbmVlZCB0byBlc2NhcGUgYWxsIHRob3NlIHNsYXNoZXMgKmFnYWluKiwgd2l0aG91dCBlc2NhcGluZyB0aGVcbiAgICAgIC8vIG9uZSB0aGF0IHdlIG5lZWQgZm9yIGVzY2FwaW5nIHRoZSB8IGNoYXJhY3Rlci4gIEFzIGl0IHdvcmtzIG91dCxcbiAgICAgIC8vIGVzY2FwaW5nIGFuIGV2ZW4gbnVtYmVyIG9mIHNsYXNoZXMgY2FuIGJlIGRvbmUgYnkgc2ltcGx5IHJlcGVhdGluZ1xuICAgICAgLy8gaXQgZXhhY3RseSBhZnRlciBpdHNlbGYuICBUaGF0J3Mgd2h5IHRoaXMgdHJpY2sgd29ya3MuXG4gICAgICAvL1xuICAgICAgLy8gSSBhbSBzb3JyeSB0aGF0IHlvdSBoYXZlIHRvIHNlZSB0aGlzLlxuICAgICAgcmV0dXJuICQxICsgJDEgKyAkMiArICd8J1xuICAgIH0pXG5cbiAgICB0aGlzLmRlYnVnKCd0YWlsPSVqXFxuICAgJXMnLCB0YWlsLCB0YWlsLCBwbCwgcmUpXG4gICAgdmFyIHQgPSBwbC50eXBlID09PSAnKicgPyBzdGFyXG4gICAgICA6IHBsLnR5cGUgPT09ICc/JyA/IHFtYXJrXG4gICAgICA6ICdcXFxcJyArIHBsLnR5cGVcblxuICAgIGhhc01hZ2ljID0gdHJ1ZVxuICAgIHJlID0gcmUuc2xpY2UoMCwgcGwucmVTdGFydCkgKyB0ICsgJ1xcXFwoJyArIHRhaWxcbiAgfVxuXG4gIC8vIGhhbmRsZSB0cmFpbGluZyB0aGluZ3MgdGhhdCBvbmx5IG1hdHRlciBhdCB0aGUgdmVyeSBlbmQuXG4gIGNsZWFyU3RhdGVDaGFyKClcbiAgaWYgKGVzY2FwaW5nKSB7XG4gICAgLy8gdHJhaWxpbmcgXFxcXFxuICAgIHJlICs9ICdcXFxcXFxcXCdcbiAgfVxuXG4gIC8vIG9ubHkgbmVlZCB0byBhcHBseSB0aGUgbm9kb3Qgc3RhcnQgaWYgdGhlIHJlIHN0YXJ0cyB3aXRoXG4gIC8vIHNvbWV0aGluZyB0aGF0IGNvdWxkIGNvbmNlaXZhYmx5IGNhcHR1cmUgYSBkb3RcbiAgdmFyIGFkZFBhdHRlcm5TdGFydCA9IGZhbHNlXG4gIHN3aXRjaCAocmUuY2hhckF0KDApKSB7XG4gICAgY2FzZSAnLic6XG4gICAgY2FzZSAnWyc6XG4gICAgY2FzZSAnKCc6IGFkZFBhdHRlcm5TdGFydCA9IHRydWVcbiAgfVxuXG4gIC8vIEhhY2sgdG8gd29yayBhcm91bmQgbGFjayBvZiBuZWdhdGl2ZSBsb29rYmVoaW5kIGluIEpTXG4gIC8vIEEgcGF0dGVybiBsaWtlOiAqLiEoeCkuISh5fHopIG5lZWRzIHRvIGVuc3VyZSB0aGF0IGEgbmFtZVxuICAvLyBsaWtlICdhLnh5ei55eicgZG9lc24ndCBtYXRjaC4gIFNvLCB0aGUgZmlyc3QgbmVnYXRpdmVcbiAgLy8gbG9va2FoZWFkLCBoYXMgdG8gbG9vayBBTEwgdGhlIHdheSBhaGVhZCwgdG8gdGhlIGVuZCBvZlxuICAvLyB0aGUgcGF0dGVybi5cbiAgZm9yICh2YXIgbiA9IG5lZ2F0aXZlTGlzdHMubGVuZ3RoIC0gMTsgbiA+IC0xOyBuLS0pIHtcbiAgICB2YXIgbmwgPSBuZWdhdGl2ZUxpc3RzW25dXG5cbiAgICB2YXIgbmxCZWZvcmUgPSByZS5zbGljZSgwLCBubC5yZVN0YXJ0KVxuICAgIHZhciBubEZpcnN0ID0gcmUuc2xpY2UobmwucmVTdGFydCwgbmwucmVFbmQgLSA4KVxuICAgIHZhciBubExhc3QgPSByZS5zbGljZShubC5yZUVuZCAtIDgsIG5sLnJlRW5kKVxuICAgIHZhciBubEFmdGVyID0gcmUuc2xpY2UobmwucmVFbmQpXG5cbiAgICBubExhc3QgKz0gbmxBZnRlclxuXG4gICAgLy8gSGFuZGxlIG5lc3RlZCBzdHVmZiBsaWtlICooKi5qc3whKCouanNvbikpLCB3aGVyZSBvcGVuIHBhcmVuc1xuICAgIC8vIG1lYW4gdGhhdCB3ZSBzaG91bGQgKm5vdCogaW5jbHVkZSB0aGUgKSBpbiB0aGUgYml0IHRoYXQgaXMgY29uc2lkZXJlZFxuICAgIC8vIFwiYWZ0ZXJcIiB0aGUgbmVnYXRlZCBzZWN0aW9uLlxuICAgIHZhciBvcGVuUGFyZW5zQmVmb3JlID0gbmxCZWZvcmUuc3BsaXQoJygnKS5sZW5ndGggLSAxXG4gICAgdmFyIGNsZWFuQWZ0ZXIgPSBubEFmdGVyXG4gICAgZm9yIChpID0gMDsgaSA8IG9wZW5QYXJlbnNCZWZvcmU7IGkrKykge1xuICAgICAgY2xlYW5BZnRlciA9IGNsZWFuQWZ0ZXIucmVwbGFjZSgvXFwpWysqP10/LywgJycpXG4gICAgfVxuICAgIG5sQWZ0ZXIgPSBjbGVhbkFmdGVyXG5cbiAgICB2YXIgZG9sbGFyID0gJydcbiAgICBpZiAobmxBZnRlciA9PT0gJycgJiYgaXNTdWIgIT09IFNVQlBBUlNFKSB7XG4gICAgICBkb2xsYXIgPSAnJCdcbiAgICB9XG4gICAgdmFyIG5ld1JlID0gbmxCZWZvcmUgKyBubEZpcnN0ICsgbmxBZnRlciArIGRvbGxhciArIG5sTGFzdFxuICAgIHJlID0gbmV3UmVcbiAgfVxuXG4gIC8vIGlmIHRoZSByZSBpcyBub3QgXCJcIiBhdCB0aGlzIHBvaW50LCB0aGVuIHdlIG5lZWQgdG8gbWFrZSBzdXJlXG4gIC8vIGl0IGRvZXNuJ3QgbWF0Y2ggYWdhaW5zdCBhbiBlbXB0eSBwYXRoIHBhcnQuXG4gIC8vIE90aGVyd2lzZSBhLyogd2lsbCBtYXRjaCBhLywgd2hpY2ggaXQgc2hvdWxkIG5vdC5cbiAgaWYgKHJlICE9PSAnJyAmJiBoYXNNYWdpYykge1xuICAgIHJlID0gJyg/PS4pJyArIHJlXG4gIH1cblxuICBpZiAoYWRkUGF0dGVyblN0YXJ0KSB7XG4gICAgcmUgPSBwYXR0ZXJuU3RhcnQgKyByZVxuICB9XG5cbiAgLy8gcGFyc2luZyBqdXN0IGEgcGllY2Ugb2YgYSBsYXJnZXIgcGF0dGVybi5cbiAgaWYgKGlzU3ViID09PSBTVUJQQVJTRSkge1xuICAgIHJldHVybiBbcmUsIGhhc01hZ2ljXVxuICB9XG5cbiAgLy8gc2tpcCB0aGUgcmVnZXhwIGZvciBub24tbWFnaWNhbCBwYXR0ZXJuc1xuICAvLyB1bmVzY2FwZSBhbnl0aGluZyBpbiBpdCwgdGhvdWdoLCBzbyB0aGF0IGl0J2xsIGJlXG4gIC8vIGFuIGV4YWN0IG1hdGNoIGFnYWluc3QgYSBmaWxlIGV0Yy5cbiAgaWYgKCFoYXNNYWdpYykge1xuICAgIHJldHVybiBnbG9iVW5lc2NhcGUocGF0dGVybilcbiAgfVxuXG4gIHZhciBmbGFncyA9IG9wdGlvbnMubm9jYXNlID8gJ2knIDogJydcbiAgdHJ5IHtcbiAgICB2YXIgcmVnRXhwID0gbmV3IFJlZ0V4cCgnXicgKyByZSArICckJywgZmxhZ3MpXG4gIH0gY2F0Y2ggKGVyKSB7XG4gICAgLy8gSWYgaXQgd2FzIGFuIGludmFsaWQgcmVndWxhciBleHByZXNzaW9uLCB0aGVuIGl0IGNhbid0IG1hdGNoXG4gICAgLy8gYW55dGhpbmcuICBUaGlzIHRyaWNrIGxvb2tzIGZvciBhIGNoYXJhY3RlciBhZnRlciB0aGUgZW5kIG9mXG4gICAgLy8gdGhlIHN0cmluZywgd2hpY2ggaXMgb2YgY291cnNlIGltcG9zc2libGUsIGV4Y2VwdCBpbiBtdWx0aS1saW5lXG4gICAgLy8gbW9kZSwgYnV0IGl0J3Mgbm90IGEgL20gcmVnZXguXG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoJyQuJylcbiAgfVxuXG4gIHJlZ0V4cC5fZ2xvYiA9IHBhdHRlcm5cbiAgcmVnRXhwLl9zcmMgPSByZVxuXG4gIHJldHVybiByZWdFeHBcbn1cblxubWluaW1hdGNoLm1ha2VSZSA9IGZ1bmN0aW9uIChwYXR0ZXJuLCBvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgTWluaW1hdGNoKHBhdHRlcm4sIG9wdGlvbnMgfHwge30pLm1ha2VSZSgpXG59XG5cbk1pbmltYXRjaC5wcm90b3R5cGUubWFrZVJlID0gbWFrZVJlXG5mdW5jdGlvbiBtYWtlUmUgKCkge1xuICBpZiAodGhpcy5yZWdleHAgfHwgdGhpcy5yZWdleHAgPT09IGZhbHNlKSByZXR1cm4gdGhpcy5yZWdleHBcblxuICAvLyBhdCB0aGlzIHBvaW50LCB0aGlzLnNldCBpcyBhIDJkIGFycmF5IG9mIHBhcnRpYWxcbiAgLy8gcGF0dGVybiBzdHJpbmdzLCBvciBcIioqXCIuXG4gIC8vXG4gIC8vIEl0J3MgYmV0dGVyIHRvIHVzZSAubWF0Y2goKS4gIFRoaXMgZnVuY3Rpb24gc2hvdWxkbid0XG4gIC8vIGJlIHVzZWQsIHJlYWxseSwgYnV0IGl0J3MgcHJldHR5IGNvbnZlbmllbnQgc29tZXRpbWVzLFxuICAvLyB3aGVuIHlvdSBqdXN0IHdhbnQgdG8gd29yayB3aXRoIGEgcmVnZXguXG4gIHZhciBzZXQgPSB0aGlzLnNldFxuXG4gIGlmICghc2V0Lmxlbmd0aCkge1xuICAgIHRoaXMucmVnZXhwID0gZmFsc2VcbiAgICByZXR1cm4gdGhpcy5yZWdleHBcbiAgfVxuICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9uc1xuXG4gIHZhciB0d29TdGFyID0gb3B0aW9ucy5ub2dsb2JzdGFyID8gc3RhclxuICAgIDogb3B0aW9ucy5kb3QgPyB0d29TdGFyRG90XG4gICAgOiB0d29TdGFyTm9Eb3RcbiAgdmFyIGZsYWdzID0gb3B0aW9ucy5ub2Nhc2UgPyAnaScgOiAnJ1xuXG4gIHZhciByZSA9IHNldC5tYXAoZnVuY3Rpb24gKHBhdHRlcm4pIHtcbiAgICByZXR1cm4gcGF0dGVybi5tYXAoZnVuY3Rpb24gKHApIHtcbiAgICAgIHJldHVybiAocCA9PT0gR0xPQlNUQVIpID8gdHdvU3RhclxuICAgICAgOiAodHlwZW9mIHAgPT09ICdzdHJpbmcnKSA/IHJlZ0V4cEVzY2FwZShwKVxuICAgICAgOiBwLl9zcmNcbiAgICB9KS5qb2luKCdcXFxcXFwvJylcbiAgfSkuam9pbignfCcpXG5cbiAgLy8gbXVzdCBtYXRjaCBlbnRpcmUgcGF0dGVyblxuICAvLyBlbmRpbmcgaW4gYSAqIG9yICoqIHdpbGwgbWFrZSBpdCBsZXNzIHN0cmljdC5cbiAgcmUgPSAnXig/OicgKyByZSArICcpJCdcblxuICAvLyBjYW4gbWF0Y2ggYW55dGhpbmcsIGFzIGxvbmcgYXMgaXQncyBub3QgdGhpcy5cbiAgaWYgKHRoaXMubmVnYXRlKSByZSA9ICdeKD8hJyArIHJlICsgJykuKiQnXG5cbiAgdHJ5IHtcbiAgICB0aGlzLnJlZ2V4cCA9IG5ldyBSZWdFeHAocmUsIGZsYWdzKVxuICB9IGNhdGNoIChleCkge1xuICAgIHRoaXMucmVnZXhwID0gZmFsc2VcbiAgfVxuICByZXR1cm4gdGhpcy5yZWdleHBcbn1cblxubWluaW1hdGNoLm1hdGNoID0gZnVuY3Rpb24gKGxpc3QsIHBhdHRlcm4sIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cbiAgdmFyIG1tID0gbmV3IE1pbmltYXRjaChwYXR0ZXJuLCBvcHRpb25zKVxuICBsaXN0ID0gbGlzdC5maWx0ZXIoZnVuY3Rpb24gKGYpIHtcbiAgICByZXR1cm4gbW0ubWF0Y2goZilcbiAgfSlcbiAgaWYgKG1tLm9wdGlvbnMubm9udWxsICYmICFsaXN0Lmxlbmd0aCkge1xuICAgIGxpc3QucHVzaChwYXR0ZXJuKVxuICB9XG4gIHJldHVybiBsaXN0XG59XG5cbk1pbmltYXRjaC5wcm90b3R5cGUubWF0Y2ggPSBtYXRjaFxuZnVuY3Rpb24gbWF0Y2ggKGYsIHBhcnRpYWwpIHtcbiAgdGhpcy5kZWJ1ZygnbWF0Y2gnLCBmLCB0aGlzLnBhdHRlcm4pXG4gIC8vIHNob3J0LWNpcmN1aXQgaW4gdGhlIGNhc2Ugb2YgYnVzdGVkIHRoaW5ncy5cbiAgLy8gY29tbWVudHMsIGV0Yy5cbiAgaWYgKHRoaXMuY29tbWVudCkgcmV0dXJuIGZhbHNlXG4gIGlmICh0aGlzLmVtcHR5KSByZXR1cm4gZiA9PT0gJydcblxuICBpZiAoZiA9PT0gJy8nICYmIHBhcnRpYWwpIHJldHVybiB0cnVlXG5cbiAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnNcblxuICAvLyB3aW5kb3dzOiBuZWVkIHRvIHVzZSAvLCBub3QgXFxcbiAgaWYgKHBhdGguc2VwICE9PSAnLycpIHtcbiAgICBmID0gZi5zcGxpdChwYXRoLnNlcCkuam9pbignLycpXG4gIH1cblxuICAvLyB0cmVhdCB0aGUgdGVzdCBwYXRoIGFzIGEgc2V0IG9mIHBhdGhwYXJ0cy5cbiAgZiA9IGYuc3BsaXQoc2xhc2hTcGxpdClcbiAgdGhpcy5kZWJ1Zyh0aGlzLnBhdHRlcm4sICdzcGxpdCcsIGYpXG5cbiAgLy8ganVzdCBPTkUgb2YgdGhlIHBhdHRlcm4gc2V0cyBpbiB0aGlzLnNldCBuZWVkcyB0byBtYXRjaFxuICAvLyBpbiBvcmRlciBmb3IgaXQgdG8gYmUgdmFsaWQuICBJZiBuZWdhdGluZywgdGhlbiBqdXN0IG9uZVxuICAvLyBtYXRjaCBtZWFucyB0aGF0IHdlIGhhdmUgZmFpbGVkLlxuICAvLyBFaXRoZXIgd2F5LCByZXR1cm4gb24gdGhlIGZpcnN0IGhpdC5cblxuICB2YXIgc2V0ID0gdGhpcy5zZXRcbiAgdGhpcy5kZWJ1Zyh0aGlzLnBhdHRlcm4sICdzZXQnLCBzZXQpXG5cbiAgLy8gRmluZCB0aGUgYmFzZW5hbWUgb2YgdGhlIHBhdGggYnkgbG9va2luZyBmb3IgdGhlIGxhc3Qgbm9uLWVtcHR5IHNlZ21lbnRcbiAgdmFyIGZpbGVuYW1lXG4gIHZhciBpXG4gIGZvciAoaSA9IGYubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBmaWxlbmFtZSA9IGZbaV1cbiAgICBpZiAoZmlsZW5hbWUpIGJyZWFrXG4gIH1cblxuICBmb3IgKGkgPSAwOyBpIDwgc2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHBhdHRlcm4gPSBzZXRbaV1cbiAgICB2YXIgZmlsZSA9IGZcbiAgICBpZiAob3B0aW9ucy5tYXRjaEJhc2UgJiYgcGF0dGVybi5sZW5ndGggPT09IDEpIHtcbiAgICAgIGZpbGUgPSBbZmlsZW5hbWVdXG4gICAgfVxuICAgIHZhciBoaXQgPSB0aGlzLm1hdGNoT25lKGZpbGUsIHBhdHRlcm4sIHBhcnRpYWwpXG4gICAgaWYgKGhpdCkge1xuICAgICAgaWYgKG9wdGlvbnMuZmxpcE5lZ2F0ZSkgcmV0dXJuIHRydWVcbiAgICAgIHJldHVybiAhdGhpcy5uZWdhdGVcbiAgICB9XG4gIH1cblxuICAvLyBkaWRuJ3QgZ2V0IGFueSBoaXRzLiAgdGhpcyBpcyBzdWNjZXNzIGlmIGl0J3MgYSBuZWdhdGl2ZVxuICAvLyBwYXR0ZXJuLCBmYWlsdXJlIG90aGVyd2lzZS5cbiAgaWYgKG9wdGlvbnMuZmxpcE5lZ2F0ZSkgcmV0dXJuIGZhbHNlXG4gIHJldHVybiB0aGlzLm5lZ2F0ZVxufVxuXG4vLyBzZXQgcGFydGlhbCB0byB0cnVlIHRvIHRlc3QgaWYsIGZvciBleGFtcGxlLFxuLy8gXCIvYS9iXCIgbWF0Y2hlcyB0aGUgc3RhcnQgb2YgXCIvKi9iLyovZFwiXG4vLyBQYXJ0aWFsIG1lYW5zLCBpZiB5b3UgcnVuIG91dCBvZiBmaWxlIGJlZm9yZSB5b3UgcnVuXG4vLyBvdXQgb2YgcGF0dGVybiwgdGhlbiB0aGF0J3MgZmluZSwgYXMgbG9uZyBhcyBhbGxcbi8vIHRoZSBwYXJ0cyBtYXRjaC5cbk1pbmltYXRjaC5wcm90b3R5cGUubWF0Y2hPbmUgPSBmdW5jdGlvbiAoZmlsZSwgcGF0dGVybiwgcGFydGlhbCkge1xuICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9uc1xuXG4gIHRoaXMuZGVidWcoJ21hdGNoT25lJyxcbiAgICB7ICd0aGlzJzogdGhpcywgZmlsZTogZmlsZSwgcGF0dGVybjogcGF0dGVybiB9KVxuXG4gIHRoaXMuZGVidWcoJ21hdGNoT25lJywgZmlsZS5sZW5ndGgsIHBhdHRlcm4ubGVuZ3RoKVxuXG4gIGZvciAodmFyIGZpID0gMCxcbiAgICAgIHBpID0gMCxcbiAgICAgIGZsID0gZmlsZS5sZW5ndGgsXG4gICAgICBwbCA9IHBhdHRlcm4ubGVuZ3RoXG4gICAgICA7IChmaSA8IGZsKSAmJiAocGkgPCBwbClcbiAgICAgIDsgZmkrKywgcGkrKykge1xuICAgIHRoaXMuZGVidWcoJ21hdGNoT25lIGxvb3AnKVxuICAgIHZhciBwID0gcGF0dGVybltwaV1cbiAgICB2YXIgZiA9IGZpbGVbZmldXG5cbiAgICB0aGlzLmRlYnVnKHBhdHRlcm4sIHAsIGYpXG5cbiAgICAvLyBzaG91bGQgYmUgaW1wb3NzaWJsZS5cbiAgICAvLyBzb21lIGludmFsaWQgcmVnZXhwIHN0dWZmIGluIHRoZSBzZXQuXG4gICAgaWYgKHAgPT09IGZhbHNlKSByZXR1cm4gZmFsc2VcblxuICAgIGlmIChwID09PSBHTE9CU1RBUikge1xuICAgICAgdGhpcy5kZWJ1ZygnR0xPQlNUQVInLCBbcGF0dGVybiwgcCwgZl0pXG5cbiAgICAgIC8vIFwiKipcIlxuICAgICAgLy8gYS8qKi9iLyoqL2Mgd291bGQgbWF0Y2ggdGhlIGZvbGxvd2luZzpcbiAgICAgIC8vIGEvYi94L3kvei9jXG4gICAgICAvLyBhL3gveS96L2IvY1xuICAgICAgLy8gYS9iL3gvYi94L2NcbiAgICAgIC8vIGEvYi9jXG4gICAgICAvLyBUbyBkbyB0aGlzLCB0YWtlIHRoZSByZXN0IG9mIHRoZSBwYXR0ZXJuIGFmdGVyXG4gICAgICAvLyB0aGUgKiosIGFuZCBzZWUgaWYgaXQgd291bGQgbWF0Y2ggdGhlIGZpbGUgcmVtYWluZGVyLlxuICAgICAgLy8gSWYgc28sIHJldHVybiBzdWNjZXNzLlxuICAgICAgLy8gSWYgbm90LCB0aGUgKiogXCJzd2FsbG93c1wiIGEgc2VnbWVudCwgYW5kIHRyeSBhZ2Fpbi5cbiAgICAgIC8vIFRoaXMgaXMgcmVjdXJzaXZlbHkgYXdmdWwuXG4gICAgICAvL1xuICAgICAgLy8gYS8qKi9iLyoqL2MgbWF0Y2hpbmcgYS9iL3gveS96L2NcbiAgICAgIC8vIC0gYSBtYXRjaGVzIGFcbiAgICAgIC8vIC0gZG91Ymxlc3RhclxuICAgICAgLy8gICAtIG1hdGNoT25lKGIveC95L3ovYywgYi8qKi9jKVxuICAgICAgLy8gICAgIC0gYiBtYXRjaGVzIGJcbiAgICAgIC8vICAgICAtIGRvdWJsZXN0YXJcbiAgICAgIC8vICAgICAgIC0gbWF0Y2hPbmUoeC95L3ovYywgYykgLT4gbm9cbiAgICAgIC8vICAgICAgIC0gbWF0Y2hPbmUoeS96L2MsIGMpIC0+IG5vXG4gICAgICAvLyAgICAgICAtIG1hdGNoT25lKHovYywgYykgLT4gbm9cbiAgICAgIC8vICAgICAgIC0gbWF0Y2hPbmUoYywgYykgeWVzLCBoaXRcbiAgICAgIHZhciBmciA9IGZpXG4gICAgICB2YXIgcHIgPSBwaSArIDFcbiAgICAgIGlmIChwciA9PT0gcGwpIHtcbiAgICAgICAgdGhpcy5kZWJ1ZygnKiogYXQgdGhlIGVuZCcpXG4gICAgICAgIC8vIGEgKiogYXQgdGhlIGVuZCB3aWxsIGp1c3Qgc3dhbGxvdyB0aGUgcmVzdC5cbiAgICAgICAgLy8gV2UgaGF2ZSBmb3VuZCBhIG1hdGNoLlxuICAgICAgICAvLyBob3dldmVyLCBpdCB3aWxsIG5vdCBzd2FsbG93IC8ueCwgdW5sZXNzXG4gICAgICAgIC8vIG9wdGlvbnMuZG90IGlzIHNldC5cbiAgICAgICAgLy8gLiBhbmQgLi4gYXJlICpuZXZlciogbWF0Y2hlZCBieSAqKiwgZm9yIGV4cGxvc2l2ZWx5XG4gICAgICAgIC8vIGV4cG9uZW50aWFsIHJlYXNvbnMuXG4gICAgICAgIGZvciAoOyBmaSA8IGZsOyBmaSsrKSB7XG4gICAgICAgICAgaWYgKGZpbGVbZmldID09PSAnLicgfHwgZmlsZVtmaV0gPT09ICcuLicgfHxcbiAgICAgICAgICAgICghb3B0aW9ucy5kb3QgJiYgZmlsZVtmaV0uY2hhckF0KDApID09PSAnLicpKSByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuXG4gICAgICAvLyBvaywgbGV0J3Mgc2VlIGlmIHdlIGNhbiBzd2FsbG93IHdoYXRldmVyIHdlIGNhbi5cbiAgICAgIHdoaWxlIChmciA8IGZsKSB7XG4gICAgICAgIHZhciBzd2FsbG93ZWUgPSBmaWxlW2ZyXVxuXG4gICAgICAgIHRoaXMuZGVidWcoJ1xcbmdsb2JzdGFyIHdoaWxlJywgZmlsZSwgZnIsIHBhdHRlcm4sIHByLCBzd2FsbG93ZWUpXG5cbiAgICAgICAgLy8gWFhYIHJlbW92ZSB0aGlzIHNsaWNlLiAgSnVzdCBwYXNzIHRoZSBzdGFydCBpbmRleC5cbiAgICAgICAgaWYgKHRoaXMubWF0Y2hPbmUoZmlsZS5zbGljZShmciksIHBhdHRlcm4uc2xpY2UocHIpLCBwYXJ0aWFsKSkge1xuICAgICAgICAgIHRoaXMuZGVidWcoJ2dsb2JzdGFyIGZvdW5kIG1hdGNoIScsIGZyLCBmbCwgc3dhbGxvd2VlKVxuICAgICAgICAgIC8vIGZvdW5kIGEgbWF0Y2guXG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBjYW4ndCBzd2FsbG93IFwiLlwiIG9yIFwiLi5cIiBldmVyLlxuICAgICAgICAgIC8vIGNhbiBvbmx5IHN3YWxsb3cgXCIuZm9vXCIgd2hlbiBleHBsaWNpdGx5IGFza2VkLlxuICAgICAgICAgIGlmIChzd2FsbG93ZWUgPT09ICcuJyB8fCBzd2FsbG93ZWUgPT09ICcuLicgfHxcbiAgICAgICAgICAgICghb3B0aW9ucy5kb3QgJiYgc3dhbGxvd2VlLmNoYXJBdCgwKSA9PT0gJy4nKSkge1xuICAgICAgICAgICAgdGhpcy5kZWJ1ZygnZG90IGRldGVjdGVkIScsIGZpbGUsIGZyLCBwYXR0ZXJuLCBwcilcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gKiogc3dhbGxvd3MgYSBzZWdtZW50LCBhbmQgY29udGludWUuXG4gICAgICAgICAgdGhpcy5kZWJ1ZygnZ2xvYnN0YXIgc3dhbGxvdyBhIHNlZ21lbnQsIGFuZCBjb250aW51ZScpXG4gICAgICAgICAgZnIrK1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIG5vIG1hdGNoIHdhcyBmb3VuZC5cbiAgICAgIC8vIEhvd2V2ZXIsIGluIHBhcnRpYWwgbW9kZSwgd2UgY2FuJ3Qgc2F5IHRoaXMgaXMgbmVjZXNzYXJpbHkgb3Zlci5cbiAgICAgIC8vIElmIHRoZXJlJ3MgbW9yZSAqcGF0dGVybiogbGVmdCwgdGhlblxuICAgICAgaWYgKHBhcnRpYWwpIHtcbiAgICAgICAgLy8gcmFuIG91dCBvZiBmaWxlXG4gICAgICAgIHRoaXMuZGVidWcoJ1xcbj4+PiBubyBtYXRjaCwgcGFydGlhbD8nLCBmaWxlLCBmciwgcGF0dGVybiwgcHIpXG4gICAgICAgIGlmIChmciA9PT0gZmwpIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICAvLyBzb21ldGhpbmcgb3RoZXIgdGhhbiAqKlxuICAgIC8vIG5vbi1tYWdpYyBwYXR0ZXJucyBqdXN0IGhhdmUgdG8gbWF0Y2ggZXhhY3RseVxuICAgIC8vIHBhdHRlcm5zIHdpdGggbWFnaWMgaGF2ZSBiZWVuIHR1cm5lZCBpbnRvIHJlZ2V4cHMuXG4gICAgdmFyIGhpdFxuICAgIGlmICh0eXBlb2YgcCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmIChvcHRpb25zLm5vY2FzZSkge1xuICAgICAgICBoaXQgPSBmLnRvTG93ZXJDYXNlKCkgPT09IHAudG9Mb3dlckNhc2UoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaGl0ID0gZiA9PT0gcFxuICAgICAgfVxuICAgICAgdGhpcy5kZWJ1Zygnc3RyaW5nIG1hdGNoJywgcCwgZiwgaGl0KVxuICAgIH0gZWxzZSB7XG4gICAgICBoaXQgPSBmLm1hdGNoKHApXG4gICAgICB0aGlzLmRlYnVnKCdwYXR0ZXJuIG1hdGNoJywgcCwgZiwgaGl0KVxuICAgIH1cblxuICAgIGlmICghaGl0KSByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIC8vIE5vdGU6IGVuZGluZyBpbiAvIG1lYW5zIHRoYXQgd2UnbGwgZ2V0IGEgZmluYWwgXCJcIlxuICAvLyBhdCB0aGUgZW5kIG9mIHRoZSBwYXR0ZXJuLiAgVGhpcyBjYW4gb25seSBtYXRjaCBhXG4gIC8vIGNvcnJlc3BvbmRpbmcgXCJcIiBhdCB0aGUgZW5kIG9mIHRoZSBmaWxlLlxuICAvLyBJZiB0aGUgZmlsZSBlbmRzIGluIC8sIHRoZW4gaXQgY2FuIG9ubHkgbWF0Y2ggYVxuICAvLyBhIHBhdHRlcm4gdGhhdCBlbmRzIGluIC8sIHVubGVzcyB0aGUgcGF0dGVybiBqdXN0XG4gIC8vIGRvZXNuJ3QgaGF2ZSBhbnkgbW9yZSBmb3IgaXQuIEJ1dCwgYS9iLyBzaG91bGQgKm5vdCpcbiAgLy8gbWF0Y2ggXCJhL2IvKlwiLCBldmVuIHRob3VnaCBcIlwiIG1hdGNoZXMgYWdhaW5zdCB0aGVcbiAgLy8gW14vXSo/IHBhdHRlcm4sIGV4Y2VwdCBpbiBwYXJ0aWFsIG1vZGUsIHdoZXJlIGl0IG1pZ2h0XG4gIC8vIHNpbXBseSBub3QgYmUgcmVhY2hlZCB5ZXQuXG4gIC8vIEhvd2V2ZXIsIGEvYi8gc2hvdWxkIHN0aWxsIHNhdGlzZnkgYS8qXG5cbiAgLy8gbm93IGVpdGhlciB3ZSBmZWxsIG9mZiB0aGUgZW5kIG9mIHRoZSBwYXR0ZXJuLCBvciB3ZSdyZSBkb25lLlxuICBpZiAoZmkgPT09IGZsICYmIHBpID09PSBwbCkge1xuICAgIC8vIHJhbiBvdXQgb2YgcGF0dGVybiBhbmQgZmlsZW5hbWUgYXQgdGhlIHNhbWUgdGltZS5cbiAgICAvLyBhbiBleGFjdCBoaXQhXG4gICAgcmV0dXJuIHRydWVcbiAgfSBlbHNlIGlmIChmaSA9PT0gZmwpIHtcbiAgICAvLyByYW4gb3V0IG9mIGZpbGUsIGJ1dCBzdGlsbCBoYWQgcGF0dGVybiBsZWZ0LlxuICAgIC8vIHRoaXMgaXMgb2sgaWYgd2UncmUgZG9pbmcgdGhlIG1hdGNoIGFzIHBhcnQgb2ZcbiAgICAvLyBhIGdsb2IgZnMgdHJhdmVyc2FsLlxuICAgIHJldHVybiBwYXJ0aWFsXG4gIH0gZWxzZSBpZiAocGkgPT09IHBsKSB7XG4gICAgLy8gcmFuIG91dCBvZiBwYXR0ZXJuLCBzdGlsbCBoYXZlIGZpbGUgbGVmdC5cbiAgICAvLyB0aGlzIGlzIG9ubHkgYWNjZXB0YWJsZSBpZiB3ZSdyZSBvbiB0aGUgdmVyeSBsYXN0XG4gICAgLy8gZW1wdHkgc2VnbWVudCBvZiBhIGZpbGUgd2l0aCBhIHRyYWlsaW5nIHNsYXNoLlxuICAgIC8vIGEvKiBzaG91bGQgbWF0Y2ggYS9iL1xuICAgIHZhciBlbXB0eUZpbGVFbmQgPSAoZmkgPT09IGZsIC0gMSkgJiYgKGZpbGVbZmldID09PSAnJylcbiAgICByZXR1cm4gZW1wdHlGaWxlRW5kXG4gIH1cblxuICAvLyBzaG91bGQgYmUgdW5yZWFjaGFibGUuXG4gIHRocm93IG5ldyBFcnJvcignd3RmPycpXG59XG5cbi8vIHJlcGxhY2Ugc3R1ZmYgbGlrZSBcXCogd2l0aCAqXG5mdW5jdGlvbiBnbG9iVW5lc2NhcGUgKHMpIHtcbiAgcmV0dXJuIHMucmVwbGFjZSgvXFxcXCguKS9nLCAnJDEnKVxufVxuXG5mdW5jdGlvbiByZWdFeHBFc2NhcGUgKHMpIHtcbiAgcmV0dXJuIHMucmVwbGFjZSgvWy1bXFxde30oKSorPy4sXFxcXF4kfCNcXHNdL2csICdcXFxcJCYnKVxufVxuIiwidmFyIGNvbmNhdE1hcCA9IHJlcXVpcmUoJ2NvbmNhdC1tYXAnKTtcbnZhciBiYWxhbmNlZCA9IHJlcXVpcmUoJ2JhbGFuY2VkLW1hdGNoJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwYW5kVG9wO1xuXG52YXIgZXNjU2xhc2ggPSAnXFwwU0xBU0gnK01hdGgucmFuZG9tKCkrJ1xcMCc7XG52YXIgZXNjT3BlbiA9ICdcXDBPUEVOJytNYXRoLnJhbmRvbSgpKydcXDAnO1xudmFyIGVzY0Nsb3NlID0gJ1xcMENMT1NFJytNYXRoLnJhbmRvbSgpKydcXDAnO1xudmFyIGVzY0NvbW1hID0gJ1xcMENPTU1BJytNYXRoLnJhbmRvbSgpKydcXDAnO1xudmFyIGVzY1BlcmlvZCA9ICdcXDBQRVJJT0QnK01hdGgucmFuZG9tKCkrJ1xcMCc7XG5cbmZ1bmN0aW9uIG51bWVyaWMoc3RyKSB7XG4gIHJldHVybiBwYXJzZUludChzdHIsIDEwKSA9PSBzdHJcbiAgICA/IHBhcnNlSW50KHN0ciwgMTApXG4gICAgOiBzdHIuY2hhckNvZGVBdCgwKTtcbn1cblxuZnVuY3Rpb24gZXNjYXBlQnJhY2VzKHN0cikge1xuICByZXR1cm4gc3RyLnNwbGl0KCdcXFxcXFxcXCcpLmpvaW4oZXNjU2xhc2gpXG4gICAgICAgICAgICAuc3BsaXQoJ1xcXFx7Jykuam9pbihlc2NPcGVuKVxuICAgICAgICAgICAgLnNwbGl0KCdcXFxcfScpLmpvaW4oZXNjQ2xvc2UpXG4gICAgICAgICAgICAuc3BsaXQoJ1xcXFwsJykuam9pbihlc2NDb21tYSlcbiAgICAgICAgICAgIC5zcGxpdCgnXFxcXC4nKS5qb2luKGVzY1BlcmlvZCk7XG59XG5cbmZ1bmN0aW9uIHVuZXNjYXBlQnJhY2VzKHN0cikge1xuICByZXR1cm4gc3RyLnNwbGl0KGVzY1NsYXNoKS5qb2luKCdcXFxcJylcbiAgICAgICAgICAgIC5zcGxpdChlc2NPcGVuKS5qb2luKCd7JylcbiAgICAgICAgICAgIC5zcGxpdChlc2NDbG9zZSkuam9pbignfScpXG4gICAgICAgICAgICAuc3BsaXQoZXNjQ29tbWEpLmpvaW4oJywnKVxuICAgICAgICAgICAgLnNwbGl0KGVzY1BlcmlvZCkuam9pbignLicpO1xufVxuXG5cbi8vIEJhc2ljYWxseSBqdXN0IHN0ci5zcGxpdChcIixcIiksIGJ1dCBoYW5kbGluZyBjYXNlc1xuLy8gd2hlcmUgd2UgaGF2ZSBuZXN0ZWQgYnJhY2VkIHNlY3Rpb25zLCB3aGljaCBzaG91bGQgYmVcbi8vIHRyZWF0ZWQgYXMgaW5kaXZpZHVhbCBtZW1iZXJzLCBsaWtlIHthLHtiLGN9LGR9XG5mdW5jdGlvbiBwYXJzZUNvbW1hUGFydHMoc3RyKSB7XG4gIGlmICghc3RyKVxuICAgIHJldHVybiBbJyddO1xuXG4gIHZhciBwYXJ0cyA9IFtdO1xuICB2YXIgbSA9IGJhbGFuY2VkKCd7JywgJ30nLCBzdHIpO1xuXG4gIGlmICghbSlcbiAgICByZXR1cm4gc3RyLnNwbGl0KCcsJyk7XG5cbiAgdmFyIHByZSA9IG0ucHJlO1xuICB2YXIgYm9keSA9IG0uYm9keTtcbiAgdmFyIHBvc3QgPSBtLnBvc3Q7XG4gIHZhciBwID0gcHJlLnNwbGl0KCcsJyk7XG5cbiAgcFtwLmxlbmd0aC0xXSArPSAneycgKyBib2R5ICsgJ30nO1xuICB2YXIgcG9zdFBhcnRzID0gcGFyc2VDb21tYVBhcnRzKHBvc3QpO1xuICBpZiAocG9zdC5sZW5ndGgpIHtcbiAgICBwW3AubGVuZ3RoLTFdICs9IHBvc3RQYXJ0cy5zaGlmdCgpO1xuICAgIHAucHVzaC5hcHBseShwLCBwb3N0UGFydHMpO1xuICB9XG5cbiAgcGFydHMucHVzaC5hcHBseShwYXJ0cywgcCk7XG5cbiAgcmV0dXJuIHBhcnRzO1xufVxuXG5mdW5jdGlvbiBleHBhbmRUb3Aoc3RyKSB7XG4gIGlmICghc3RyKVxuICAgIHJldHVybiBbXTtcblxuICAvLyBJIGRvbid0IGtub3cgd2h5IEJhc2ggNC4zIGRvZXMgdGhpcywgYnV0IGl0IGRvZXMuXG4gIC8vIEFueXRoaW5nIHN0YXJ0aW5nIHdpdGgge30gd2lsbCBoYXZlIHRoZSBmaXJzdCB0d28gYnl0ZXMgcHJlc2VydmVkXG4gIC8vIGJ1dCAqb25seSogYXQgdGhlIHRvcCBsZXZlbCwgc28ge30sYX1iIHdpbGwgbm90IGV4cGFuZCB0byBhbnl0aGluZyxcbiAgLy8gYnV0IGF7fSxifWMgd2lsbCBiZSBleHBhbmRlZCB0byBbYX1jLGFiY10uXG4gIC8vIE9uZSBjb3VsZCBhcmd1ZSB0aGF0IHRoaXMgaXMgYSBidWcgaW4gQmFzaCwgYnV0IHNpbmNlIHRoZSBnb2FsIG9mXG4gIC8vIHRoaXMgbW9kdWxlIGlzIHRvIG1hdGNoIEJhc2gncyBydWxlcywgd2UgZXNjYXBlIGEgbGVhZGluZyB7fVxuICBpZiAoc3RyLnN1YnN0cigwLCAyKSA9PT0gJ3t9Jykge1xuICAgIHN0ciA9ICdcXFxce1xcXFx9JyArIHN0ci5zdWJzdHIoMik7XG4gIH1cblxuICByZXR1cm4gZXhwYW5kKGVzY2FwZUJyYWNlcyhzdHIpLCB0cnVlKS5tYXAodW5lc2NhcGVCcmFjZXMpO1xufVxuXG5mdW5jdGlvbiBpZGVudGl0eShlKSB7XG4gIHJldHVybiBlO1xufVxuXG5mdW5jdGlvbiBlbWJyYWNlKHN0cikge1xuICByZXR1cm4gJ3snICsgc3RyICsgJ30nO1xufVxuZnVuY3Rpb24gaXNQYWRkZWQoZWwpIHtcbiAgcmV0dXJuIC9eLT8wXFxkLy50ZXN0KGVsKTtcbn1cblxuZnVuY3Rpb24gbHRlKGksIHkpIHtcbiAgcmV0dXJuIGkgPD0geTtcbn1cbmZ1bmN0aW9uIGd0ZShpLCB5KSB7XG4gIHJldHVybiBpID49IHk7XG59XG5cbmZ1bmN0aW9uIGV4cGFuZChzdHIsIGlzVG9wKSB7XG4gIHZhciBleHBhbnNpb25zID0gW107XG5cbiAgdmFyIG0gPSBiYWxhbmNlZCgneycsICd9Jywgc3RyKTtcbiAgaWYgKCFtIHx8IC9cXCQkLy50ZXN0KG0ucHJlKSkgcmV0dXJuIFtzdHJdO1xuXG4gIHZhciBpc051bWVyaWNTZXF1ZW5jZSA9IC9eLT9cXGQrXFwuXFwuLT9cXGQrKD86XFwuXFwuLT9cXGQrKT8kLy50ZXN0KG0uYm9keSk7XG4gIHZhciBpc0FscGhhU2VxdWVuY2UgPSAvXlthLXpBLVpdXFwuXFwuW2EtekEtWl0oPzpcXC5cXC4tP1xcZCspPyQvLnRlc3QobS5ib2R5KTtcbiAgdmFyIGlzU2VxdWVuY2UgPSBpc051bWVyaWNTZXF1ZW5jZSB8fCBpc0FscGhhU2VxdWVuY2U7XG4gIHZhciBpc09wdGlvbnMgPSBtLmJvZHkuaW5kZXhPZignLCcpID49IDA7XG4gIGlmICghaXNTZXF1ZW5jZSAmJiAhaXNPcHRpb25zKSB7XG4gICAgLy8ge2F9LGJ9XG4gICAgaWYgKG0ucG9zdC5tYXRjaCgvLC4qXFx9LykpIHtcbiAgICAgIHN0ciA9IG0ucHJlICsgJ3snICsgbS5ib2R5ICsgZXNjQ2xvc2UgKyBtLnBvc3Q7XG4gICAgICByZXR1cm4gZXhwYW5kKHN0cik7XG4gICAgfVxuICAgIHJldHVybiBbc3RyXTtcbiAgfVxuXG4gIHZhciBuO1xuICBpZiAoaXNTZXF1ZW5jZSkge1xuICAgIG4gPSBtLmJvZHkuc3BsaXQoL1xcLlxcLi8pO1xuICB9IGVsc2Uge1xuICAgIG4gPSBwYXJzZUNvbW1hUGFydHMobS5ib2R5KTtcbiAgICBpZiAobi5sZW5ndGggPT09IDEpIHtcbiAgICAgIC8vIHh7e2EsYn19eSA9PT4geHthfXkgeHtifXlcbiAgICAgIG4gPSBleHBhbmQoblswXSwgZmFsc2UpLm1hcChlbWJyYWNlKTtcbiAgICAgIGlmIChuLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICB2YXIgcG9zdCA9IG0ucG9zdC5sZW5ndGhcbiAgICAgICAgICA/IGV4cGFuZChtLnBvc3QsIGZhbHNlKVxuICAgICAgICAgIDogWycnXTtcbiAgICAgICAgcmV0dXJuIHBvc3QubWFwKGZ1bmN0aW9uKHApIHtcbiAgICAgICAgICByZXR1cm4gbS5wcmUgKyBuWzBdICsgcDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gYXQgdGhpcyBwb2ludCwgbiBpcyB0aGUgcGFydHMsIGFuZCB3ZSBrbm93IGl0J3Mgbm90IGEgY29tbWEgc2V0XG4gIC8vIHdpdGggYSBzaW5nbGUgZW50cnkuXG5cbiAgLy8gbm8gbmVlZCB0byBleHBhbmQgcHJlLCBzaW5jZSBpdCBpcyBndWFyYW50ZWVkIHRvIGJlIGZyZWUgb2YgYnJhY2Utc2V0c1xuICB2YXIgcHJlID0gbS5wcmU7XG4gIHZhciBwb3N0ID0gbS5wb3N0Lmxlbmd0aFxuICAgID8gZXhwYW5kKG0ucG9zdCwgZmFsc2UpXG4gICAgOiBbJyddO1xuXG4gIHZhciBOO1xuXG4gIGlmIChpc1NlcXVlbmNlKSB7XG4gICAgdmFyIHggPSBudW1lcmljKG5bMF0pO1xuICAgIHZhciB5ID0gbnVtZXJpYyhuWzFdKTtcbiAgICB2YXIgd2lkdGggPSBNYXRoLm1heChuWzBdLmxlbmd0aCwgblsxXS5sZW5ndGgpXG4gICAgdmFyIGluY3IgPSBuLmxlbmd0aCA9PSAzXG4gICAgICA/IE1hdGguYWJzKG51bWVyaWMoblsyXSkpXG4gICAgICA6IDE7XG4gICAgdmFyIHRlc3QgPSBsdGU7XG4gICAgdmFyIHJldmVyc2UgPSB5IDwgeDtcbiAgICBpZiAocmV2ZXJzZSkge1xuICAgICAgaW5jciAqPSAtMTtcbiAgICAgIHRlc3QgPSBndGU7XG4gICAgfVxuICAgIHZhciBwYWQgPSBuLnNvbWUoaXNQYWRkZWQpO1xuXG4gICAgTiA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IHg7IHRlc3QoaSwgeSk7IGkgKz0gaW5jcikge1xuICAgICAgdmFyIGM7XG4gICAgICBpZiAoaXNBbHBoYVNlcXVlbmNlKSB7XG4gICAgICAgIGMgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpO1xuICAgICAgICBpZiAoYyA9PT0gJ1xcXFwnKVxuICAgICAgICAgIGMgPSAnJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGMgPSBTdHJpbmcoaSk7XG4gICAgICAgIGlmIChwYWQpIHtcbiAgICAgICAgICB2YXIgbmVlZCA9IHdpZHRoIC0gYy5sZW5ndGg7XG4gICAgICAgICAgaWYgKG5lZWQgPiAwKSB7XG4gICAgICAgICAgICB2YXIgeiA9IG5ldyBBcnJheShuZWVkICsgMSkuam9pbignMCcpO1xuICAgICAgICAgICAgaWYgKGkgPCAwKVxuICAgICAgICAgICAgICBjID0gJy0nICsgeiArIGMuc2xpY2UoMSk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgIGMgPSB6ICsgYztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIE4ucHVzaChjKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgTiA9IGNvbmNhdE1hcChuLCBmdW5jdGlvbihlbCkgeyByZXR1cm4gZXhwYW5kKGVsLCBmYWxzZSkgfSk7XG4gIH1cblxuICBmb3IgKHZhciBqID0gMDsgaiA8IE4ubGVuZ3RoOyBqKyspIHtcbiAgICBmb3IgKHZhciBrID0gMDsgayA8IHBvc3QubGVuZ3RoOyBrKyspIHtcbiAgICAgIHZhciBleHBhbnNpb24gPSBwcmUgKyBOW2pdICsgcG9zdFtrXTtcbiAgICAgIGlmICghaXNUb3AgfHwgaXNTZXF1ZW5jZSB8fCBleHBhbnNpb24pXG4gICAgICAgIGV4cGFuc2lvbnMucHVzaChleHBhbnNpb24pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBleHBhbnNpb25zO1xufVxuXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh4cywgZm4pIHtcbiAgICB2YXIgcmVzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB4cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgeCA9IGZuKHhzW2ldLCBpKTtcbiAgICAgICAgaWYgKGlzQXJyYXkoeCkpIHJlcy5wdXNoLmFwcGx5KHJlcywgeCk7XG4gICAgICAgIGVsc2UgcmVzLnB1c2goeCk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG59O1xuXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKHhzKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4cykgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSBiYWxhbmNlZDtcbmZ1bmN0aW9uIGJhbGFuY2VkKGEsIGIsIHN0cikge1xuICBpZiAoYSBpbnN0YW5jZW9mIFJlZ0V4cCkgYSA9IG1heWJlTWF0Y2goYSwgc3RyKTtcbiAgaWYgKGIgaW5zdGFuY2VvZiBSZWdFeHApIGIgPSBtYXliZU1hdGNoKGIsIHN0cik7XG5cbiAgdmFyIHIgPSByYW5nZShhLCBiLCBzdHIpO1xuXG4gIHJldHVybiByICYmIHtcbiAgICBzdGFydDogclswXSxcbiAgICBlbmQ6IHJbMV0sXG4gICAgcHJlOiBzdHIuc2xpY2UoMCwgclswXSksXG4gICAgYm9keTogc3RyLnNsaWNlKHJbMF0gKyBhLmxlbmd0aCwgclsxXSksXG4gICAgcG9zdDogc3RyLnNsaWNlKHJbMV0gKyBiLmxlbmd0aClcbiAgfTtcbn1cblxuZnVuY3Rpb24gbWF5YmVNYXRjaChyZWcsIHN0cikge1xuICB2YXIgbSA9IHN0ci5tYXRjaChyZWcpO1xuICByZXR1cm4gbSA/IG1bMF0gOiBudWxsO1xufVxuXG5iYWxhbmNlZC5yYW5nZSA9IHJhbmdlO1xuZnVuY3Rpb24gcmFuZ2UoYSwgYiwgc3RyKSB7XG4gIHZhciBiZWdzLCBiZWcsIGxlZnQsIHJpZ2h0LCByZXN1bHQ7XG4gIHZhciBhaSA9IHN0ci5pbmRleE9mKGEpO1xuICB2YXIgYmkgPSBzdHIuaW5kZXhPZihiLCBhaSArIDEpO1xuICB2YXIgaSA9IGFpO1xuXG4gIGlmIChhaSA+PSAwICYmIGJpID4gMCkge1xuICAgIGJlZ3MgPSBbXTtcbiAgICBsZWZ0ID0gc3RyLmxlbmd0aDtcblxuICAgIHdoaWxlIChpID49IDAgJiYgIXJlc3VsdCkge1xuICAgICAgaWYgKGkgPT0gYWkpIHtcbiAgICAgICAgYmVncy5wdXNoKGkpO1xuICAgICAgICBhaSA9IHN0ci5pbmRleE9mKGEsIGkgKyAxKTtcbiAgICAgIH0gZWxzZSBpZiAoYmVncy5sZW5ndGggPT0gMSkge1xuICAgICAgICByZXN1bHQgPSBbIGJlZ3MucG9wKCksIGJpIF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBiZWcgPSBiZWdzLnBvcCgpO1xuICAgICAgICBpZiAoYmVnIDwgbGVmdCkge1xuICAgICAgICAgIGxlZnQgPSBiZWc7XG4gICAgICAgICAgcmlnaHQgPSBiaTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJpID0gc3RyLmluZGV4T2YoYiwgaSArIDEpO1xuICAgICAgfVxuXG4gICAgICBpID0gYWkgPCBiaSAmJiBhaSA+PSAwID8gYWkgOiBiaTtcbiAgICB9XG5cbiAgICBpZiAoYmVncy5sZW5ndGgpIHtcbiAgICAgIHJlc3VsdCA9IFsgbGVmdCwgcmlnaHQgXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuIiwidHJ5IHtcbiAgdmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsJyk7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGlmICh0eXBlb2YgdXRpbC5pbmhlcml0cyAhPT0gJ2Z1bmN0aW9uJykgdGhyb3cgJyc7XG4gIG1vZHVsZS5leHBvcnRzID0gdXRpbC5pbmhlcml0cztcbn0gY2F0Y2ggKGUpIHtcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2luaGVyaXRzX2Jyb3dzZXIuanMnKTtcbn1cbiIsImlmICh0eXBlb2YgT2JqZWN0LmNyZWF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAvLyBpbXBsZW1lbnRhdGlvbiBmcm9tIHN0YW5kYXJkIG5vZGUuanMgJ3V0aWwnIG1vZHVsZVxuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluaGVyaXRzKGN0b3IsIHN1cGVyQ3Rvcikge1xuICAgIGlmIChzdXBlckN0b3IpIHtcbiAgICAgIGN0b3Iuc3VwZXJfID0gc3VwZXJDdG9yXG4gICAgICBjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDdG9yLnByb3RvdHlwZSwge1xuICAgICAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgICAgIHZhbHVlOiBjdG9yLFxuICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfTtcbn0gZWxzZSB7XG4gIC8vIG9sZCBzY2hvb2wgc2hpbSBmb3Igb2xkIGJyb3dzZXJzXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5oZXJpdHMoY3Rvciwgc3VwZXJDdG9yKSB7XG4gICAgaWYgKHN1cGVyQ3Rvcikge1xuICAgICAgY3Rvci5zdXBlcl8gPSBzdXBlckN0b3JcbiAgICAgIHZhciBUZW1wQ3RvciA9IGZ1bmN0aW9uICgpIHt9XG4gICAgICBUZW1wQ3Rvci5wcm90b3R5cGUgPSBzdXBlckN0b3IucHJvdG90eXBlXG4gICAgICBjdG9yLnByb3RvdHlwZSA9IG5ldyBUZW1wQ3RvcigpXG4gICAgICBjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGN0b3JcbiAgICB9XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV2ZW50c1wiKTsiLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIHBvc2l4KHBhdGgpIHtcblx0cmV0dXJuIHBhdGguY2hhckF0KDApID09PSAnLyc7XG59XG5cbmZ1bmN0aW9uIHdpbjMyKHBhdGgpIHtcblx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL25vZGVqcy9ub2RlL2Jsb2IvYjNmY2MyNDVmYjI1NTM5OTA5ZWYxZDVlYWEwMWRiZjkyZTE2ODYzMy9saWIvcGF0aC5qcyNMNTZcblx0dmFyIHNwbGl0RGV2aWNlUmUgPSAvXihbYS16QS1aXTp8W1xcXFxcXC9dezJ9W15cXFxcXFwvXStbXFxcXFxcL10rW15cXFxcXFwvXSspPyhbXFxcXFxcL10pPyhbXFxzXFxTXSo/KSQvO1xuXHR2YXIgcmVzdWx0ID0gc3BsaXREZXZpY2VSZS5leGVjKHBhdGgpO1xuXHR2YXIgZGV2aWNlID0gcmVzdWx0WzFdIHx8ICcnO1xuXHR2YXIgaXNVbmMgPSBCb29sZWFuKGRldmljZSAmJiBkZXZpY2UuY2hhckF0KDEpICE9PSAnOicpO1xuXG5cdC8vIFVOQyBwYXRocyBhcmUgYWx3YXlzIGFic29sdXRlXG5cdHJldHVybiBCb29sZWFuKHJlc3VsdFsyXSB8fCBpc1VuYyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJyA/IHdpbjMyIDogcG9zaXg7XG5tb2R1bGUuZXhwb3J0cy5wb3NpeCA9IHBvc2l4O1xubW9kdWxlLmV4cG9ydHMud2luMzIgPSB3aW4zMjtcbiIsIm1vZHVsZS5leHBvcnRzID0gZ2xvYlN5bmNcbmdsb2JTeW5jLkdsb2JTeW5jID0gR2xvYlN5bmNcblxudmFyIGZzID0gcmVxdWlyZSgnZnMnKVxudmFyIHJwID0gcmVxdWlyZSgnZnMucmVhbHBhdGgnKVxudmFyIG1pbmltYXRjaCA9IHJlcXVpcmUoJ21pbmltYXRjaCcpXG52YXIgTWluaW1hdGNoID0gbWluaW1hdGNoLk1pbmltYXRjaFxudmFyIEdsb2IgPSByZXF1aXJlKCcuL2dsb2IuanMnKS5HbG9iXG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKVxudmFyIHBhdGggPSByZXF1aXJlKCdwYXRoJylcbnZhciBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKVxudmFyIGlzQWJzb2x1dGUgPSByZXF1aXJlKCdwYXRoLWlzLWFic29sdXRlJylcbnZhciBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbi5qcycpXG52YXIgYWxwaGFzb3J0ID0gY29tbW9uLmFscGhhc29ydFxudmFyIGFscGhhc29ydGkgPSBjb21tb24uYWxwaGFzb3J0aVxudmFyIHNldG9wdHMgPSBjb21tb24uc2V0b3B0c1xudmFyIG93blByb3AgPSBjb21tb24ub3duUHJvcFxudmFyIGNoaWxkcmVuSWdub3JlZCA9IGNvbW1vbi5jaGlsZHJlbklnbm9yZWRcbnZhciBpc0lnbm9yZWQgPSBjb21tb24uaXNJZ25vcmVkXG5cbmZ1bmN0aW9uIGdsb2JTeW5jIChwYXR0ZXJuLCBvcHRpb25zKSB7XG4gIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJyB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAzKVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2NhbGxiYWNrIHByb3ZpZGVkIHRvIHN5bmMgZ2xvYlxcbicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnU2VlOiBodHRwczovL2dpdGh1Yi5jb20vaXNhYWNzL25vZGUtZ2xvYi9pc3N1ZXMvMTY3JylcblxuICByZXR1cm4gbmV3IEdsb2JTeW5jKHBhdHRlcm4sIG9wdGlvbnMpLmZvdW5kXG59XG5cbmZ1bmN0aW9uIEdsb2JTeW5jIChwYXR0ZXJuLCBvcHRpb25zKSB7XG4gIGlmICghcGF0dGVybilcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ211c3QgcHJvdmlkZSBwYXR0ZXJuJylcblxuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMylcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdjYWxsYmFjayBwcm92aWRlZCB0byBzeW5jIGdsb2JcXG4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1NlZTogaHR0cHM6Ly9naXRodWIuY29tL2lzYWFjcy9ub2RlLWdsb2IvaXNzdWVzLzE2NycpXG5cbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIEdsb2JTeW5jKSlcbiAgICByZXR1cm4gbmV3IEdsb2JTeW5jKHBhdHRlcm4sIG9wdGlvbnMpXG5cbiAgc2V0b3B0cyh0aGlzLCBwYXR0ZXJuLCBvcHRpb25zKVxuXG4gIGlmICh0aGlzLm5vcHJvY2VzcylcbiAgICByZXR1cm4gdGhpc1xuXG4gIHZhciBuID0gdGhpcy5taW5pbWF0Y2guc2V0Lmxlbmd0aFxuICB0aGlzLm1hdGNoZXMgPSBuZXcgQXJyYXkobilcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyBpICsrKSB7XG4gICAgdGhpcy5fcHJvY2Vzcyh0aGlzLm1pbmltYXRjaC5zZXRbaV0sIGksIGZhbHNlKVxuICB9XG4gIHRoaXMuX2ZpbmlzaCgpXG59XG5cbkdsb2JTeW5jLnByb3RvdHlwZS5fZmluaXNoID0gZnVuY3Rpb24gKCkge1xuICBhc3NlcnQodGhpcyBpbnN0YW5jZW9mIEdsb2JTeW5jKVxuICBpZiAodGhpcy5yZWFscGF0aCkge1xuICAgIHZhciBzZWxmID0gdGhpc1xuICAgIHRoaXMubWF0Y2hlcy5mb3JFYWNoKGZ1bmN0aW9uIChtYXRjaHNldCwgaW5kZXgpIHtcbiAgICAgIHZhciBzZXQgPSBzZWxmLm1hdGNoZXNbaW5kZXhdID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuICAgICAgZm9yICh2YXIgcCBpbiBtYXRjaHNldCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHAgPSBzZWxmLl9tYWtlQWJzKHApXG4gICAgICAgICAgdmFyIHJlYWwgPSBycC5yZWFscGF0aFN5bmMocCwgc2VsZi5yZWFscGF0aENhY2hlKVxuICAgICAgICAgIHNldFtyZWFsXSA9IHRydWVcbiAgICAgICAgfSBjYXRjaCAoZXIpIHtcbiAgICAgICAgICBpZiAoZXIuc3lzY2FsbCA9PT0gJ3N0YXQnKVxuICAgICAgICAgICAgc2V0W3NlbGYuX21ha2VBYnMocCldID0gdHJ1ZVxuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRocm93IGVyXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIGNvbW1vbi5maW5pc2godGhpcylcbn1cblxuXG5HbG9iU3luYy5wcm90b3R5cGUuX3Byb2Nlc3MgPSBmdW5jdGlvbiAocGF0dGVybiwgaW5kZXgsIGluR2xvYlN0YXIpIHtcbiAgYXNzZXJ0KHRoaXMgaW5zdGFuY2VvZiBHbG9iU3luYylcblxuICAvLyBHZXQgdGhlIGZpcnN0IFtuXSBwYXJ0cyBvZiBwYXR0ZXJuIHRoYXQgYXJlIGFsbCBzdHJpbmdzLlxuICB2YXIgbiA9IDBcbiAgd2hpbGUgKHR5cGVvZiBwYXR0ZXJuW25dID09PSAnc3RyaW5nJykge1xuICAgIG4gKytcbiAgfVxuICAvLyBub3cgbiBpcyB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IG9uZSB0aGF0IGlzICpub3QqIGEgc3RyaW5nLlxuXG4gIC8vIFNlZSBpZiB0aGVyZSdzIGFueXRoaW5nIGVsc2VcbiAgdmFyIHByZWZpeFxuICBzd2l0Y2ggKG4pIHtcbiAgICAvLyBpZiBub3QsIHRoZW4gdGhpcyBpcyByYXRoZXIgc2ltcGxlXG4gICAgY2FzZSBwYXR0ZXJuLmxlbmd0aDpcbiAgICAgIHRoaXMuX3Byb2Nlc3NTaW1wbGUocGF0dGVybi5qb2luKCcvJyksIGluZGV4KVxuICAgICAgcmV0dXJuXG5cbiAgICBjYXNlIDA6XG4gICAgICAvLyBwYXR0ZXJuICpzdGFydHMqIHdpdGggc29tZSBub24tdHJpdmlhbCBpdGVtLlxuICAgICAgLy8gZ29pbmcgdG8gcmVhZGRpcihjd2QpLCBidXQgbm90IGluY2x1ZGUgdGhlIHByZWZpeCBpbiBtYXRjaGVzLlxuICAgICAgcHJlZml4ID0gbnVsbFxuICAgICAgYnJlYWtcblxuICAgIGRlZmF1bHQ6XG4gICAgICAvLyBwYXR0ZXJuIGhhcyBzb21lIHN0cmluZyBiaXRzIGluIHRoZSBmcm9udC5cbiAgICAgIC8vIHdoYXRldmVyIGl0IHN0YXJ0cyB3aXRoLCB3aGV0aGVyIHRoYXQncyAnYWJzb2x1dGUnIGxpa2UgL2Zvby9iYXIsXG4gICAgICAvLyBvciAncmVsYXRpdmUnIGxpa2UgJy4uL2JheidcbiAgICAgIHByZWZpeCA9IHBhdHRlcm4uc2xpY2UoMCwgbikuam9pbignLycpXG4gICAgICBicmVha1xuICB9XG5cbiAgdmFyIHJlbWFpbiA9IHBhdHRlcm4uc2xpY2UobilcblxuICAvLyBnZXQgdGhlIGxpc3Qgb2YgZW50cmllcy5cbiAgdmFyIHJlYWRcbiAgaWYgKHByZWZpeCA9PT0gbnVsbClcbiAgICByZWFkID0gJy4nXG4gIGVsc2UgaWYgKGlzQWJzb2x1dGUocHJlZml4KSB8fCBpc0Fic29sdXRlKHBhdHRlcm4uam9pbignLycpKSkge1xuICAgIGlmICghcHJlZml4IHx8ICFpc0Fic29sdXRlKHByZWZpeCkpXG4gICAgICBwcmVmaXggPSAnLycgKyBwcmVmaXhcbiAgICByZWFkID0gcHJlZml4XG4gIH0gZWxzZVxuICAgIHJlYWQgPSBwcmVmaXhcblxuICB2YXIgYWJzID0gdGhpcy5fbWFrZUFicyhyZWFkKVxuXG4gIC8vaWYgaWdub3JlZCwgc2tpcCBwcm9jZXNzaW5nXG4gIGlmIChjaGlsZHJlbklnbm9yZWQodGhpcywgcmVhZCkpXG4gICAgcmV0dXJuXG5cbiAgdmFyIGlzR2xvYlN0YXIgPSByZW1haW5bMF0gPT09IG1pbmltYXRjaC5HTE9CU1RBUlxuICBpZiAoaXNHbG9iU3RhcilcbiAgICB0aGlzLl9wcm9jZXNzR2xvYlN0YXIocHJlZml4LCByZWFkLCBhYnMsIHJlbWFpbiwgaW5kZXgsIGluR2xvYlN0YXIpXG4gIGVsc2VcbiAgICB0aGlzLl9wcm9jZXNzUmVhZGRpcihwcmVmaXgsIHJlYWQsIGFicywgcmVtYWluLCBpbmRleCwgaW5HbG9iU3Rhcilcbn1cblxuXG5HbG9iU3luYy5wcm90b3R5cGUuX3Byb2Nlc3NSZWFkZGlyID0gZnVuY3Rpb24gKHByZWZpeCwgcmVhZCwgYWJzLCByZW1haW4sIGluZGV4LCBpbkdsb2JTdGFyKSB7XG4gIHZhciBlbnRyaWVzID0gdGhpcy5fcmVhZGRpcihhYnMsIGluR2xvYlN0YXIpXG5cbiAgLy8gaWYgdGhlIGFicyBpc24ndCBhIGRpciwgdGhlbiBub3RoaW5nIGNhbiBtYXRjaCFcbiAgaWYgKCFlbnRyaWVzKVxuICAgIHJldHVyblxuXG4gIC8vIEl0IHdpbGwgb25seSBtYXRjaCBkb3QgZW50cmllcyBpZiBpdCBzdGFydHMgd2l0aCBhIGRvdCwgb3IgaWZcbiAgLy8gZG90IGlzIHNldC4gIFN0dWZmIGxpa2UgQCguZm9vfC5iYXIpIGlzbid0IGFsbG93ZWQuXG4gIHZhciBwbiA9IHJlbWFpblswXVxuICB2YXIgbmVnYXRlID0gISF0aGlzLm1pbmltYXRjaC5uZWdhdGVcbiAgdmFyIHJhd0dsb2IgPSBwbi5fZ2xvYlxuICB2YXIgZG90T2sgPSB0aGlzLmRvdCB8fCByYXdHbG9iLmNoYXJBdCgwKSA9PT0gJy4nXG5cbiAgdmFyIG1hdGNoZWRFbnRyaWVzID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbnRyaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGUgPSBlbnRyaWVzW2ldXG4gICAgaWYgKGUuY2hhckF0KDApICE9PSAnLicgfHwgZG90T2spIHtcbiAgICAgIHZhciBtXG4gICAgICBpZiAobmVnYXRlICYmICFwcmVmaXgpIHtcbiAgICAgICAgbSA9ICFlLm1hdGNoKHBuKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbSA9IGUubWF0Y2gocG4pXG4gICAgICB9XG4gICAgICBpZiAobSlcbiAgICAgICAgbWF0Y2hlZEVudHJpZXMucHVzaChlKVxuICAgIH1cbiAgfVxuXG4gIHZhciBsZW4gPSBtYXRjaGVkRW50cmllcy5sZW5ndGhcbiAgLy8gSWYgdGhlcmUgYXJlIG5vIG1hdGNoZWQgZW50cmllcywgdGhlbiBub3RoaW5nIG1hdGNoZXMuXG4gIGlmIChsZW4gPT09IDApXG4gICAgcmV0dXJuXG5cbiAgLy8gaWYgdGhpcyBpcyB0aGUgbGFzdCByZW1haW5pbmcgcGF0dGVybiBiaXQsIHRoZW4gbm8gbmVlZCBmb3JcbiAgLy8gYW4gYWRkaXRpb25hbCBzdGF0ICp1bmxlc3MqIHRoZSB1c2VyIGhhcyBzcGVjaWZpZWQgbWFyayBvclxuICAvLyBzdGF0IGV4cGxpY2l0bHkuICBXZSBrbm93IHRoZXkgZXhpc3QsIHNpbmNlIHJlYWRkaXIgcmV0dXJuZWRcbiAgLy8gdGhlbS5cblxuICBpZiAocmVtYWluLmxlbmd0aCA9PT0gMSAmJiAhdGhpcy5tYXJrICYmICF0aGlzLnN0YXQpIHtcbiAgICBpZiAoIXRoaXMubWF0Y2hlc1tpbmRleF0pXG4gICAgICB0aGlzLm1hdGNoZXNbaW5kZXhdID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKyspIHtcbiAgICAgIHZhciBlID0gbWF0Y2hlZEVudHJpZXNbaV1cbiAgICAgIGlmIChwcmVmaXgpIHtcbiAgICAgICAgaWYgKHByZWZpeC5zbGljZSgtMSkgIT09ICcvJylcbiAgICAgICAgICBlID0gcHJlZml4ICsgJy8nICsgZVxuICAgICAgICBlbHNlXG4gICAgICAgICAgZSA9IHByZWZpeCArIGVcbiAgICAgIH1cblxuICAgICAgaWYgKGUuY2hhckF0KDApID09PSAnLycgJiYgIXRoaXMubm9tb3VudCkge1xuICAgICAgICBlID0gcGF0aC5qb2luKHRoaXMucm9vdCwgZSlcbiAgICAgIH1cbiAgICAgIHRoaXMuX2VtaXRNYXRjaChpbmRleCwgZSlcbiAgICB9XG4gICAgLy8gVGhpcyB3YXMgdGhlIGxhc3Qgb25lLCBhbmQgbm8gc3RhdHMgd2VyZSBuZWVkZWRcbiAgICByZXR1cm5cbiAgfVxuXG4gIC8vIG5vdyB0ZXN0IGFsbCBtYXRjaGVkIGVudHJpZXMgYXMgc3RhbmQtaW5zIGZvciB0aGF0IHBhcnRcbiAgLy8gb2YgdGhlIHBhdHRlcm4uXG4gIHJlbWFpbi5zaGlmdCgpXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICsrKSB7XG4gICAgdmFyIGUgPSBtYXRjaGVkRW50cmllc1tpXVxuICAgIHZhciBuZXdQYXR0ZXJuXG4gICAgaWYgKHByZWZpeClcbiAgICAgIG5ld1BhdHRlcm4gPSBbcHJlZml4LCBlXVxuICAgIGVsc2VcbiAgICAgIG5ld1BhdHRlcm4gPSBbZV1cbiAgICB0aGlzLl9wcm9jZXNzKG5ld1BhdHRlcm4uY29uY2F0KHJlbWFpbiksIGluZGV4LCBpbkdsb2JTdGFyKVxuICB9XG59XG5cblxuR2xvYlN5bmMucHJvdG90eXBlLl9lbWl0TWF0Y2ggPSBmdW5jdGlvbiAoaW5kZXgsIGUpIHtcbiAgaWYgKGlzSWdub3JlZCh0aGlzLCBlKSlcbiAgICByZXR1cm5cblxuICB2YXIgYWJzID0gdGhpcy5fbWFrZUFicyhlKVxuXG4gIGlmICh0aGlzLm1hcmspXG4gICAgZSA9IHRoaXMuX21hcmsoZSlcblxuICBpZiAodGhpcy5hYnNvbHV0ZSkge1xuICAgIGUgPSBhYnNcbiAgfVxuXG4gIGlmICh0aGlzLm1hdGNoZXNbaW5kZXhdW2VdKVxuICAgIHJldHVyblxuXG4gIGlmICh0aGlzLm5vZGlyKSB7XG4gICAgdmFyIGMgPSB0aGlzLmNhY2hlW2Fic11cbiAgICBpZiAoYyA9PT0gJ0RJUicgfHwgQXJyYXkuaXNBcnJheShjKSlcbiAgICAgIHJldHVyblxuICB9XG5cbiAgdGhpcy5tYXRjaGVzW2luZGV4XVtlXSA9IHRydWVcblxuICBpZiAodGhpcy5zdGF0KVxuICAgIHRoaXMuX3N0YXQoZSlcbn1cblxuXG5HbG9iU3luYy5wcm90b3R5cGUuX3JlYWRkaXJJbkdsb2JTdGFyID0gZnVuY3Rpb24gKGFicykge1xuICAvLyBmb2xsb3cgYWxsIHN5bWxpbmtlZCBkaXJlY3RvcmllcyBmb3JldmVyXG4gIC8vIGp1c3QgcHJvY2VlZCBhcyBpZiB0aGlzIGlzIGEgbm9uLWdsb2JzdGFyIHNpdHVhdGlvblxuICBpZiAodGhpcy5mb2xsb3cpXG4gICAgcmV0dXJuIHRoaXMuX3JlYWRkaXIoYWJzLCBmYWxzZSlcblxuICB2YXIgZW50cmllc1xuICB2YXIgbHN0YXRcbiAgdmFyIHN0YXRcbiAgdHJ5IHtcbiAgICBsc3RhdCA9IGZzLmxzdGF0U3luYyhhYnMpXG4gIH0gY2F0Y2ggKGVyKSB7XG4gICAgaWYgKGVyLmNvZGUgPT09ICdFTk9FTlQnKSB7XG4gICAgICAvLyBsc3RhdCBmYWlsZWQsIGRvZXNuJ3QgZXhpc3RcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICB9XG5cbiAgdmFyIGlzU3ltID0gbHN0YXQgJiYgbHN0YXQuaXNTeW1ib2xpY0xpbmsoKVxuICB0aGlzLnN5bWxpbmtzW2Fic10gPSBpc1N5bVxuXG4gIC8vIElmIGl0J3Mgbm90IGEgc3ltbGluayBvciBhIGRpciwgdGhlbiBpdCdzIGRlZmluaXRlbHkgYSByZWd1bGFyIGZpbGUuXG4gIC8vIGRvbid0IGJvdGhlciBkb2luZyBhIHJlYWRkaXIgaW4gdGhhdCBjYXNlLlxuICBpZiAoIWlzU3ltICYmIGxzdGF0ICYmICFsc3RhdC5pc0RpcmVjdG9yeSgpKVxuICAgIHRoaXMuY2FjaGVbYWJzXSA9ICdGSUxFJ1xuICBlbHNlXG4gICAgZW50cmllcyA9IHRoaXMuX3JlYWRkaXIoYWJzLCBmYWxzZSlcblxuICByZXR1cm4gZW50cmllc1xufVxuXG5HbG9iU3luYy5wcm90b3R5cGUuX3JlYWRkaXIgPSBmdW5jdGlvbiAoYWJzLCBpbkdsb2JTdGFyKSB7XG4gIHZhciBlbnRyaWVzXG5cbiAgaWYgKGluR2xvYlN0YXIgJiYgIW93blByb3AodGhpcy5zeW1saW5rcywgYWJzKSlcbiAgICByZXR1cm4gdGhpcy5fcmVhZGRpckluR2xvYlN0YXIoYWJzKVxuXG4gIGlmIChvd25Qcm9wKHRoaXMuY2FjaGUsIGFicykpIHtcbiAgICB2YXIgYyA9IHRoaXMuY2FjaGVbYWJzXVxuICAgIGlmICghYyB8fCBjID09PSAnRklMRScpXG4gICAgICByZXR1cm4gbnVsbFxuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYykpXG4gICAgICByZXR1cm4gY1xuICB9XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gdGhpcy5fcmVhZGRpckVudHJpZXMoYWJzLCBmcy5yZWFkZGlyU3luYyhhYnMpKVxuICB9IGNhdGNoIChlcikge1xuICAgIHRoaXMuX3JlYWRkaXJFcnJvcihhYnMsIGVyKVxuICAgIHJldHVybiBudWxsXG4gIH1cbn1cblxuR2xvYlN5bmMucHJvdG90eXBlLl9yZWFkZGlyRW50cmllcyA9IGZ1bmN0aW9uIChhYnMsIGVudHJpZXMpIHtcbiAgLy8gaWYgd2UgaGF2ZW4ndCBhc2tlZCB0byBzdGF0IGV2ZXJ5dGhpbmcsIHRoZW4ganVzdFxuICAvLyBhc3N1bWUgdGhhdCBldmVyeXRoaW5nIGluIHRoZXJlIGV4aXN0cywgc28gd2UgY2FuIGF2b2lkXG4gIC8vIGhhdmluZyB0byBzdGF0IGl0IGEgc2Vjb25kIHRpbWUuXG4gIGlmICghdGhpcy5tYXJrICYmICF0aGlzLnN0YXQpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVudHJpZXMubGVuZ3RoOyBpICsrKSB7XG4gICAgICB2YXIgZSA9IGVudHJpZXNbaV1cbiAgICAgIGlmIChhYnMgPT09ICcvJylcbiAgICAgICAgZSA9IGFicyArIGVcbiAgICAgIGVsc2VcbiAgICAgICAgZSA9IGFicyArICcvJyArIGVcbiAgICAgIHRoaXMuY2FjaGVbZV0gPSB0cnVlXG4gICAgfVxuICB9XG5cbiAgdGhpcy5jYWNoZVthYnNdID0gZW50cmllc1xuXG4gIC8vIG1hcmsgYW5kIGNhY2hlIGRpci1uZXNzXG4gIHJldHVybiBlbnRyaWVzXG59XG5cbkdsb2JTeW5jLnByb3RvdHlwZS5fcmVhZGRpckVycm9yID0gZnVuY3Rpb24gKGYsIGVyKSB7XG4gIC8vIGhhbmRsZSBlcnJvcnMsIGFuZCBjYWNoZSB0aGUgaW5mb3JtYXRpb25cbiAgc3dpdGNoIChlci5jb2RlKSB7XG4gICAgY2FzZSAnRU5PVFNVUCc6IC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9pc2FhY3Mvbm9kZS1nbG9iL2lzc3Vlcy8yMDVcbiAgICBjYXNlICdFTk9URElSJzogLy8gdG90YWxseSBub3JtYWwuIG1lYW5zIGl0ICpkb2VzKiBleGlzdC5cbiAgICAgIHZhciBhYnMgPSB0aGlzLl9tYWtlQWJzKGYpXG4gICAgICB0aGlzLmNhY2hlW2Fic10gPSAnRklMRSdcbiAgICAgIGlmIChhYnMgPT09IHRoaXMuY3dkQWJzKSB7XG4gICAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcihlci5jb2RlICsgJyBpbnZhbGlkIGN3ZCAnICsgdGhpcy5jd2QpXG4gICAgICAgIGVycm9yLnBhdGggPSB0aGlzLmN3ZFxuICAgICAgICBlcnJvci5jb2RlID0gZXIuY29kZVxuICAgICAgICB0aHJvdyBlcnJvclxuICAgICAgfVxuICAgICAgYnJlYWtcblxuICAgIGNhc2UgJ0VOT0VOVCc6IC8vIG5vdCB0ZXJyaWJseSB1bnVzdWFsXG4gICAgY2FzZSAnRUxPT1AnOlxuICAgIGNhc2UgJ0VOQU1FVE9PTE9ORyc6XG4gICAgY2FzZSAnVU5LTk9XTic6XG4gICAgICB0aGlzLmNhY2hlW3RoaXMuX21ha2VBYnMoZildID0gZmFsc2VcbiAgICAgIGJyZWFrXG5cbiAgICBkZWZhdWx0OiAvLyBzb21lIHVudXN1YWwgZXJyb3IuICBUcmVhdCBhcyBmYWlsdXJlLlxuICAgICAgdGhpcy5jYWNoZVt0aGlzLl9tYWtlQWJzKGYpXSA9IGZhbHNlXG4gICAgICBpZiAodGhpcy5zdHJpY3QpXG4gICAgICAgIHRocm93IGVyXG4gICAgICBpZiAoIXRoaXMuc2lsZW50KVxuICAgICAgICBjb25zb2xlLmVycm9yKCdnbG9iIGVycm9yJywgZXIpXG4gICAgICBicmVha1xuICB9XG59XG5cbkdsb2JTeW5jLnByb3RvdHlwZS5fcHJvY2Vzc0dsb2JTdGFyID0gZnVuY3Rpb24gKHByZWZpeCwgcmVhZCwgYWJzLCByZW1haW4sIGluZGV4LCBpbkdsb2JTdGFyKSB7XG5cbiAgdmFyIGVudHJpZXMgPSB0aGlzLl9yZWFkZGlyKGFicywgaW5HbG9iU3RhcilcblxuICAvLyBubyBlbnRyaWVzIG1lYW5zIG5vdCBhIGRpciwgc28gaXQgY2FuIG5ldmVyIGhhdmUgbWF0Y2hlc1xuICAvLyBmb28udHh0LyoqIGRvZXNuJ3QgbWF0Y2ggZm9vLnR4dFxuICBpZiAoIWVudHJpZXMpXG4gICAgcmV0dXJuXG5cbiAgLy8gdGVzdCB3aXRob3V0IHRoZSBnbG9ic3RhciwgYW5kIHdpdGggZXZlcnkgY2hpbGQgYm90aCBiZWxvd1xuICAvLyBhbmQgcmVwbGFjaW5nIHRoZSBnbG9ic3Rhci5cbiAgdmFyIHJlbWFpbldpdGhvdXRHbG9iU3RhciA9IHJlbWFpbi5zbGljZSgxKVxuICB2YXIgZ3NwcmVmID0gcHJlZml4ID8gWyBwcmVmaXggXSA6IFtdXG4gIHZhciBub0dsb2JTdGFyID0gZ3NwcmVmLmNvbmNhdChyZW1haW5XaXRob3V0R2xvYlN0YXIpXG5cbiAgLy8gdGhlIG5vR2xvYlN0YXIgcGF0dGVybiBleGl0cyB0aGUgaW5HbG9iU3RhciBzdGF0ZVxuICB0aGlzLl9wcm9jZXNzKG5vR2xvYlN0YXIsIGluZGV4LCBmYWxzZSlcblxuICB2YXIgbGVuID0gZW50cmllcy5sZW5ndGhcbiAgdmFyIGlzU3ltID0gdGhpcy5zeW1saW5rc1thYnNdXG5cbiAgLy8gSWYgaXQncyBhIHN5bWxpbmssIGFuZCB3ZSdyZSBpbiBhIGdsb2JzdGFyLCB0aGVuIHN0b3BcbiAgaWYgKGlzU3ltICYmIGluR2xvYlN0YXIpXG4gICAgcmV0dXJuXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIHZhciBlID0gZW50cmllc1tpXVxuICAgIGlmIChlLmNoYXJBdCgwKSA9PT0gJy4nICYmICF0aGlzLmRvdClcbiAgICAgIGNvbnRpbnVlXG5cbiAgICAvLyB0aGVzZSB0d28gY2FzZXMgZW50ZXIgdGhlIGluR2xvYlN0YXIgc3RhdGVcbiAgICB2YXIgaW5zdGVhZCA9IGdzcHJlZi5jb25jYXQoZW50cmllc1tpXSwgcmVtYWluV2l0aG91dEdsb2JTdGFyKVxuICAgIHRoaXMuX3Byb2Nlc3MoaW5zdGVhZCwgaW5kZXgsIHRydWUpXG5cbiAgICB2YXIgYmVsb3cgPSBnc3ByZWYuY29uY2F0KGVudHJpZXNbaV0sIHJlbWFpbilcbiAgICB0aGlzLl9wcm9jZXNzKGJlbG93LCBpbmRleCwgdHJ1ZSlcbiAgfVxufVxuXG5HbG9iU3luYy5wcm90b3R5cGUuX3Byb2Nlc3NTaW1wbGUgPSBmdW5jdGlvbiAocHJlZml4LCBpbmRleCkge1xuICAvLyBYWFggcmV2aWV3IHRoaXMuICBTaG91bGRuJ3QgaXQgYmUgZG9pbmcgdGhlIG1vdW50aW5nIGV0Y1xuICAvLyBiZWZvcmUgZG9pbmcgc3RhdD8gIGtpbmRhIHdlaXJkP1xuICB2YXIgZXhpc3RzID0gdGhpcy5fc3RhdChwcmVmaXgpXG5cbiAgaWYgKCF0aGlzLm1hdGNoZXNbaW5kZXhdKVxuICAgIHRoaXMubWF0Y2hlc1tpbmRleF0gPSBPYmplY3QuY3JlYXRlKG51bGwpXG5cbiAgLy8gSWYgaXQgZG9lc24ndCBleGlzdCwgdGhlbiBqdXN0IG1hcmsgdGhlIGxhY2sgb2YgcmVzdWx0c1xuICBpZiAoIWV4aXN0cylcbiAgICByZXR1cm5cblxuICBpZiAocHJlZml4ICYmIGlzQWJzb2x1dGUocHJlZml4KSAmJiAhdGhpcy5ub21vdW50KSB7XG4gICAgdmFyIHRyYWlsID0gL1tcXC9cXFxcXSQvLnRlc3QocHJlZml4KVxuICAgIGlmIChwcmVmaXguY2hhckF0KDApID09PSAnLycpIHtcbiAgICAgIHByZWZpeCA9IHBhdGguam9pbih0aGlzLnJvb3QsIHByZWZpeClcbiAgICB9IGVsc2Uge1xuICAgICAgcHJlZml4ID0gcGF0aC5yZXNvbHZlKHRoaXMucm9vdCwgcHJlZml4KVxuICAgICAgaWYgKHRyYWlsKVxuICAgICAgICBwcmVmaXggKz0gJy8nXG4gICAgfVxuICB9XG5cbiAgaWYgKHByb2Nlc3MucGxhdGZvcm0gPT09ICd3aW4zMicpXG4gICAgcHJlZml4ID0gcHJlZml4LnJlcGxhY2UoL1xcXFwvZywgJy8nKVxuXG4gIC8vIE1hcmsgdGhpcyBhcyBhIG1hdGNoXG4gIHRoaXMuX2VtaXRNYXRjaChpbmRleCwgcHJlZml4KVxufVxuXG4vLyBSZXR1cm5zIGVpdGhlciAnRElSJywgJ0ZJTEUnLCBvciBmYWxzZVxuR2xvYlN5bmMucHJvdG90eXBlLl9zdGF0ID0gZnVuY3Rpb24gKGYpIHtcbiAgdmFyIGFicyA9IHRoaXMuX21ha2VBYnMoZilcbiAgdmFyIG5lZWREaXIgPSBmLnNsaWNlKC0xKSA9PT0gJy8nXG5cbiAgaWYgKGYubGVuZ3RoID4gdGhpcy5tYXhMZW5ndGgpXG4gICAgcmV0dXJuIGZhbHNlXG5cbiAgaWYgKCF0aGlzLnN0YXQgJiYgb3duUHJvcCh0aGlzLmNhY2hlLCBhYnMpKSB7XG4gICAgdmFyIGMgPSB0aGlzLmNhY2hlW2Fic11cblxuICAgIGlmIChBcnJheS5pc0FycmF5KGMpKVxuICAgICAgYyA9ICdESVInXG5cbiAgICAvLyBJdCBleGlzdHMsIGJ1dCBtYXliZSBub3QgaG93IHdlIG5lZWQgaXRcbiAgICBpZiAoIW5lZWREaXIgfHwgYyA9PT0gJ0RJUicpXG4gICAgICByZXR1cm4gY1xuXG4gICAgaWYgKG5lZWREaXIgJiYgYyA9PT0gJ0ZJTEUnKVxuICAgICAgcmV0dXJuIGZhbHNlXG5cbiAgICAvLyBvdGhlcndpc2Ugd2UgaGF2ZSB0byBzdGF0LCBiZWNhdXNlIG1heWJlIGM9dHJ1ZVxuICAgIC8vIGlmIHdlIGtub3cgaXQgZXhpc3RzLCBidXQgbm90IHdoYXQgaXQgaXMuXG4gIH1cblxuICB2YXIgZXhpc3RzXG4gIHZhciBzdGF0ID0gdGhpcy5zdGF0Q2FjaGVbYWJzXVxuICBpZiAoIXN0YXQpIHtcbiAgICB2YXIgbHN0YXRcbiAgICB0cnkge1xuICAgICAgbHN0YXQgPSBmcy5sc3RhdFN5bmMoYWJzKVxuICAgIH0gY2F0Y2ggKGVyKSB7XG4gICAgICBpZiAoZXIgJiYgKGVyLmNvZGUgPT09ICdFTk9FTlQnIHx8IGVyLmNvZGUgPT09ICdFTk9URElSJykpIHtcbiAgICAgICAgdGhpcy5zdGF0Q2FjaGVbYWJzXSA9IGZhbHNlXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChsc3RhdCAmJiBsc3RhdC5pc1N5bWJvbGljTGluaygpKSB7XG4gICAgICB0cnkge1xuICAgICAgICBzdGF0ID0gZnMuc3RhdFN5bmMoYWJzKVxuICAgICAgfSBjYXRjaCAoZXIpIHtcbiAgICAgICAgc3RhdCA9IGxzdGF0XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXQgPSBsc3RhdFxuICAgIH1cbiAgfVxuXG4gIHRoaXMuc3RhdENhY2hlW2Fic10gPSBzdGF0XG5cbiAgdmFyIGMgPSB0cnVlXG4gIGlmIChzdGF0KVxuICAgIGMgPSBzdGF0LmlzRGlyZWN0b3J5KCkgPyAnRElSJyA6ICdGSUxFJ1xuXG4gIHRoaXMuY2FjaGVbYWJzXSA9IHRoaXMuY2FjaGVbYWJzXSB8fCBjXG5cbiAgaWYgKG5lZWREaXIgJiYgYyA9PT0gJ0ZJTEUnKVxuICAgIHJldHVybiBmYWxzZVxuXG4gIHJldHVybiBjXG59XG5cbkdsb2JTeW5jLnByb3RvdHlwZS5fbWFyayA9IGZ1bmN0aW9uIChwKSB7XG4gIHJldHVybiBjb21tb24ubWFyayh0aGlzLCBwKVxufVxuXG5HbG9iU3luYy5wcm90b3R5cGUuX21ha2VBYnMgPSBmdW5jdGlvbiAoZikge1xuICByZXR1cm4gY29tbW9uLm1ha2VBYnModGhpcywgZilcbn1cbiIsImV4cG9ydHMuYWxwaGFzb3J0ID0gYWxwaGFzb3J0XG5leHBvcnRzLmFscGhhc29ydGkgPSBhbHBoYXNvcnRpXG5leHBvcnRzLnNldG9wdHMgPSBzZXRvcHRzXG5leHBvcnRzLm93blByb3AgPSBvd25Qcm9wXG5leHBvcnRzLm1ha2VBYnMgPSBtYWtlQWJzXG5leHBvcnRzLmZpbmlzaCA9IGZpbmlzaFxuZXhwb3J0cy5tYXJrID0gbWFya1xuZXhwb3J0cy5pc0lnbm9yZWQgPSBpc0lnbm9yZWRcbmV4cG9ydHMuY2hpbGRyZW5JZ25vcmVkID0gY2hpbGRyZW5JZ25vcmVkXG5cbmZ1bmN0aW9uIG93blByb3AgKG9iaiwgZmllbGQpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGZpZWxkKVxufVxuXG52YXIgcGF0aCA9IHJlcXVpcmUoXCJwYXRoXCIpXG52YXIgbWluaW1hdGNoID0gcmVxdWlyZShcIm1pbmltYXRjaFwiKVxudmFyIGlzQWJzb2x1dGUgPSByZXF1aXJlKFwicGF0aC1pcy1hYnNvbHV0ZVwiKVxudmFyIE1pbmltYXRjaCA9IG1pbmltYXRjaC5NaW5pbWF0Y2hcblxuZnVuY3Rpb24gYWxwaGFzb3J0aSAoYSwgYikge1xuICByZXR1cm4gYS50b0xvd2VyQ2FzZSgpLmxvY2FsZUNvbXBhcmUoYi50b0xvd2VyQ2FzZSgpKVxufVxuXG5mdW5jdGlvbiBhbHBoYXNvcnQgKGEsIGIpIHtcbiAgcmV0dXJuIGEubG9jYWxlQ29tcGFyZShiKVxufVxuXG5mdW5jdGlvbiBzZXR1cElnbm9yZXMgKHNlbGYsIG9wdGlvbnMpIHtcbiAgc2VsZi5pZ25vcmUgPSBvcHRpb25zLmlnbm9yZSB8fCBbXVxuXG4gIGlmICghQXJyYXkuaXNBcnJheShzZWxmLmlnbm9yZSkpXG4gICAgc2VsZi5pZ25vcmUgPSBbc2VsZi5pZ25vcmVdXG5cbiAgaWYgKHNlbGYuaWdub3JlLmxlbmd0aCkge1xuICAgIHNlbGYuaWdub3JlID0gc2VsZi5pZ25vcmUubWFwKGlnbm9yZU1hcClcbiAgfVxufVxuXG4vLyBpZ25vcmUgcGF0dGVybnMgYXJlIGFsd2F5cyBpbiBkb3Q6dHJ1ZSBtb2RlLlxuZnVuY3Rpb24gaWdub3JlTWFwIChwYXR0ZXJuKSB7XG4gIHZhciBnbWF0Y2hlciA9IG51bGxcbiAgaWYgKHBhdHRlcm4uc2xpY2UoLTMpID09PSAnLyoqJykge1xuICAgIHZhciBncGF0dGVybiA9IHBhdHRlcm4ucmVwbGFjZSgvKFxcL1xcKlxcKikrJC8sICcnKVxuICAgIGdtYXRjaGVyID0gbmV3IE1pbmltYXRjaChncGF0dGVybiwgeyBkb3Q6IHRydWUgfSlcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbWF0Y2hlcjogbmV3IE1pbmltYXRjaChwYXR0ZXJuLCB7IGRvdDogdHJ1ZSB9KSxcbiAgICBnbWF0Y2hlcjogZ21hdGNoZXJcbiAgfVxufVxuXG5mdW5jdGlvbiBzZXRvcHRzIChzZWxmLCBwYXR0ZXJuLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucylcbiAgICBvcHRpb25zID0ge31cblxuICAvLyBiYXNlLW1hdGNoaW5nOiBqdXN0IHVzZSBnbG9ic3RhciBmb3IgdGhhdC5cbiAgaWYgKG9wdGlvbnMubWF0Y2hCYXNlICYmIC0xID09PSBwYXR0ZXJuLmluZGV4T2YoXCIvXCIpKSB7XG4gICAgaWYgKG9wdGlvbnMubm9nbG9ic3Rhcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYmFzZSBtYXRjaGluZyByZXF1aXJlcyBnbG9ic3RhclwiKVxuICAgIH1cbiAgICBwYXR0ZXJuID0gXCIqKi9cIiArIHBhdHRlcm5cbiAgfVxuXG4gIHNlbGYuc2lsZW50ID0gISFvcHRpb25zLnNpbGVudFxuICBzZWxmLnBhdHRlcm4gPSBwYXR0ZXJuXG4gIHNlbGYuc3RyaWN0ID0gb3B0aW9ucy5zdHJpY3QgIT09IGZhbHNlXG4gIHNlbGYucmVhbHBhdGggPSAhIW9wdGlvbnMucmVhbHBhdGhcbiAgc2VsZi5yZWFscGF0aENhY2hlID0gb3B0aW9ucy5yZWFscGF0aENhY2hlIHx8IE9iamVjdC5jcmVhdGUobnVsbClcbiAgc2VsZi5mb2xsb3cgPSAhIW9wdGlvbnMuZm9sbG93XG4gIHNlbGYuZG90ID0gISFvcHRpb25zLmRvdFxuICBzZWxmLm1hcmsgPSAhIW9wdGlvbnMubWFya1xuICBzZWxmLm5vZGlyID0gISFvcHRpb25zLm5vZGlyXG4gIGlmIChzZWxmLm5vZGlyKVxuICAgIHNlbGYubWFyayA9IHRydWVcbiAgc2VsZi5zeW5jID0gISFvcHRpb25zLnN5bmNcbiAgc2VsZi5ub3VuaXF1ZSA9ICEhb3B0aW9ucy5ub3VuaXF1ZVxuICBzZWxmLm5vbnVsbCA9ICEhb3B0aW9ucy5ub251bGxcbiAgc2VsZi5ub3NvcnQgPSAhIW9wdGlvbnMubm9zb3J0XG4gIHNlbGYubm9jYXNlID0gISFvcHRpb25zLm5vY2FzZVxuICBzZWxmLnN0YXQgPSAhIW9wdGlvbnMuc3RhdFxuICBzZWxmLm5vcHJvY2VzcyA9ICEhb3B0aW9ucy5ub3Byb2Nlc3NcbiAgc2VsZi5hYnNvbHV0ZSA9ICEhb3B0aW9ucy5hYnNvbHV0ZVxuXG4gIHNlbGYubWF4TGVuZ3RoID0gb3B0aW9ucy5tYXhMZW5ndGggfHwgSW5maW5pdHlcbiAgc2VsZi5jYWNoZSA9IG9wdGlvbnMuY2FjaGUgfHwgT2JqZWN0LmNyZWF0ZShudWxsKVxuICBzZWxmLnN0YXRDYWNoZSA9IG9wdGlvbnMuc3RhdENhY2hlIHx8IE9iamVjdC5jcmVhdGUobnVsbClcbiAgc2VsZi5zeW1saW5rcyA9IG9wdGlvbnMuc3ltbGlua3MgfHwgT2JqZWN0LmNyZWF0ZShudWxsKVxuXG4gIHNldHVwSWdub3JlcyhzZWxmLCBvcHRpb25zKVxuXG4gIHNlbGYuY2hhbmdlZEN3ZCA9IGZhbHNlXG4gIHZhciBjd2QgPSBwcm9jZXNzLmN3ZCgpXG4gIGlmICghb3duUHJvcChvcHRpb25zLCBcImN3ZFwiKSlcbiAgICBzZWxmLmN3ZCA9IGN3ZFxuICBlbHNlIHtcbiAgICBzZWxmLmN3ZCA9IHBhdGgucmVzb2x2ZShvcHRpb25zLmN3ZClcbiAgICBzZWxmLmNoYW5nZWRDd2QgPSBzZWxmLmN3ZCAhPT0gY3dkXG4gIH1cblxuICBzZWxmLnJvb3QgPSBvcHRpb25zLnJvb3QgfHwgcGF0aC5yZXNvbHZlKHNlbGYuY3dkLCBcIi9cIilcbiAgc2VsZi5yb290ID0gcGF0aC5yZXNvbHZlKHNlbGYucm9vdClcbiAgaWYgKHByb2Nlc3MucGxhdGZvcm0gPT09IFwid2luMzJcIilcbiAgICBzZWxmLnJvb3QgPSBzZWxmLnJvb3QucmVwbGFjZSgvXFxcXC9nLCBcIi9cIilcblxuICAvLyBUT0RPOiBpcyBhbiBhYnNvbHV0ZSBgY3dkYCBzdXBwb3NlZCB0byBiZSByZXNvbHZlZCBhZ2FpbnN0IGByb290YD9cbiAgLy8gZS5nLiB7IGN3ZDogJy90ZXN0Jywgcm9vdDogX19kaXJuYW1lIH0gPT09IHBhdGguam9pbihfX2Rpcm5hbWUsICcvdGVzdCcpXG4gIHNlbGYuY3dkQWJzID0gaXNBYnNvbHV0ZShzZWxmLmN3ZCkgPyBzZWxmLmN3ZCA6IG1ha2VBYnMoc2VsZiwgc2VsZi5jd2QpXG4gIGlmIChwcm9jZXNzLnBsYXRmb3JtID09PSBcIndpbjMyXCIpXG4gICAgc2VsZi5jd2RBYnMgPSBzZWxmLmN3ZEFicy5yZXBsYWNlKC9cXFxcL2csIFwiL1wiKVxuICBzZWxmLm5vbW91bnQgPSAhIW9wdGlvbnMubm9tb3VudFxuXG4gIC8vIGRpc2FibGUgY29tbWVudHMgYW5kIG5lZ2F0aW9uIGluIE1pbmltYXRjaC5cbiAgLy8gTm90ZSB0aGF0IHRoZXkgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gR2xvYiBpdHNlbGYgYW55d2F5LlxuICBvcHRpb25zLm5vbmVnYXRlID0gdHJ1ZVxuICBvcHRpb25zLm5vY29tbWVudCA9IHRydWVcblxuICBzZWxmLm1pbmltYXRjaCA9IG5ldyBNaW5pbWF0Y2gocGF0dGVybiwgb3B0aW9ucylcbiAgc2VsZi5vcHRpb25zID0gc2VsZi5taW5pbWF0Y2gub3B0aW9uc1xufVxuXG5mdW5jdGlvbiBmaW5pc2ggKHNlbGYpIHtcbiAgdmFyIG5vdSA9IHNlbGYubm91bmlxdWVcbiAgdmFyIGFsbCA9IG5vdSA/IFtdIDogT2JqZWN0LmNyZWF0ZShudWxsKVxuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gc2VsZi5tYXRjaGVzLmxlbmd0aDsgaSA8IGw7IGkgKyspIHtcbiAgICB2YXIgbWF0Y2hlcyA9IHNlbGYubWF0Y2hlc1tpXVxuICAgIGlmICghbWF0Y2hlcyB8fCBPYmplY3Qua2V5cyhtYXRjaGVzKS5sZW5ndGggPT09IDApIHtcbiAgICAgIGlmIChzZWxmLm5vbnVsbCkge1xuICAgICAgICAvLyBkbyBsaWtlIHRoZSBzaGVsbCwgYW5kIHNwaXQgb3V0IHRoZSBsaXRlcmFsIGdsb2JcbiAgICAgICAgdmFyIGxpdGVyYWwgPSBzZWxmLm1pbmltYXRjaC5nbG9iU2V0W2ldXG4gICAgICAgIGlmIChub3UpXG4gICAgICAgICAgYWxsLnB1c2gobGl0ZXJhbClcbiAgICAgICAgZWxzZVxuICAgICAgICAgIGFsbFtsaXRlcmFsXSA9IHRydWVcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaGFkIG1hdGNoZXNcbiAgICAgIHZhciBtID0gT2JqZWN0LmtleXMobWF0Y2hlcylcbiAgICAgIGlmIChub3UpXG4gICAgICAgIGFsbC5wdXNoLmFwcGx5KGFsbCwgbSlcbiAgICAgIGVsc2VcbiAgICAgICAgbS5mb3JFYWNoKGZ1bmN0aW9uIChtKSB7XG4gICAgICAgICAgYWxsW21dID0gdHJ1ZVxuICAgICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGlmICghbm91KVxuICAgIGFsbCA9IE9iamVjdC5rZXlzKGFsbClcblxuICBpZiAoIXNlbGYubm9zb3J0KVxuICAgIGFsbCA9IGFsbC5zb3J0KHNlbGYubm9jYXNlID8gYWxwaGFzb3J0aSA6IGFscGhhc29ydClcblxuICAvLyBhdCAqc29tZSogcG9pbnQgd2Ugc3RhdHRlZCBhbGwgb2YgdGhlc2VcbiAgaWYgKHNlbGYubWFyaykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWxsLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhbGxbaV0gPSBzZWxmLl9tYXJrKGFsbFtpXSlcbiAgICB9XG4gICAgaWYgKHNlbGYubm9kaXIpIHtcbiAgICAgIGFsbCA9IGFsbC5maWx0ZXIoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdmFyIG5vdERpciA9ICEoL1xcLyQvLnRlc3QoZSkpXG4gICAgICAgIHZhciBjID0gc2VsZi5jYWNoZVtlXSB8fCBzZWxmLmNhY2hlW21ha2VBYnMoc2VsZiwgZSldXG4gICAgICAgIGlmIChub3REaXIgJiYgYylcbiAgICAgICAgICBub3REaXIgPSBjICE9PSAnRElSJyAmJiAhQXJyYXkuaXNBcnJheShjKVxuICAgICAgICByZXR1cm4gbm90RGlyXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGlmIChzZWxmLmlnbm9yZS5sZW5ndGgpXG4gICAgYWxsID0gYWxsLmZpbHRlcihmdW5jdGlvbihtKSB7XG4gICAgICByZXR1cm4gIWlzSWdub3JlZChzZWxmLCBtKVxuICAgIH0pXG5cbiAgc2VsZi5mb3VuZCA9IGFsbFxufVxuXG5mdW5jdGlvbiBtYXJrIChzZWxmLCBwKSB7XG4gIHZhciBhYnMgPSBtYWtlQWJzKHNlbGYsIHApXG4gIHZhciBjID0gc2VsZi5jYWNoZVthYnNdXG4gIHZhciBtID0gcFxuICBpZiAoYykge1xuICAgIHZhciBpc0RpciA9IGMgPT09ICdESVInIHx8IEFycmF5LmlzQXJyYXkoYylcbiAgICB2YXIgc2xhc2ggPSBwLnNsaWNlKC0xKSA9PT0gJy8nXG5cbiAgICBpZiAoaXNEaXIgJiYgIXNsYXNoKVxuICAgICAgbSArPSAnLydcbiAgICBlbHNlIGlmICghaXNEaXIgJiYgc2xhc2gpXG4gICAgICBtID0gbS5zbGljZSgwLCAtMSlcblxuICAgIGlmIChtICE9PSBwKSB7XG4gICAgICB2YXIgbWFicyA9IG1ha2VBYnMoc2VsZiwgbSlcbiAgICAgIHNlbGYuc3RhdENhY2hlW21hYnNdID0gc2VsZi5zdGF0Q2FjaGVbYWJzXVxuICAgICAgc2VsZi5jYWNoZVttYWJzXSA9IHNlbGYuY2FjaGVbYWJzXVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBtXG59XG5cbi8vIGxvdHRhIHNpdHVwcy4uLlxuZnVuY3Rpb24gbWFrZUFicyAoc2VsZiwgZikge1xuICB2YXIgYWJzID0gZlxuICBpZiAoZi5jaGFyQXQoMCkgPT09ICcvJykge1xuICAgIGFicyA9IHBhdGguam9pbihzZWxmLnJvb3QsIGYpXG4gIH0gZWxzZSBpZiAoaXNBYnNvbHV0ZShmKSB8fCBmID09PSAnJykge1xuICAgIGFicyA9IGZcbiAgfSBlbHNlIGlmIChzZWxmLmNoYW5nZWRDd2QpIHtcbiAgICBhYnMgPSBwYXRoLnJlc29sdmUoc2VsZi5jd2QsIGYpXG4gIH0gZWxzZSB7XG4gICAgYWJzID0gcGF0aC5yZXNvbHZlKGYpXG4gIH1cblxuICBpZiAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJylcbiAgICBhYnMgPSBhYnMucmVwbGFjZSgvXFxcXC9nLCAnLycpXG5cbiAgcmV0dXJuIGFic1xufVxuXG5cbi8vIFJldHVybiB0cnVlLCBpZiBwYXR0ZXJuIGVuZHMgd2l0aCBnbG9ic3RhciAnKionLCBmb3IgdGhlIGFjY29tcGFueWluZyBwYXJlbnQgZGlyZWN0b3J5LlxuLy8gRXg6LSBJZiBub2RlX21vZHVsZXMvKiogaXMgdGhlIHBhdHRlcm4sIGFkZCAnbm9kZV9tb2R1bGVzJyB0byBpZ25vcmUgbGlzdCBhbG9uZyB3aXRoIGl0J3MgY29udGVudHNcbmZ1bmN0aW9uIGlzSWdub3JlZCAoc2VsZiwgcGF0aCkge1xuICBpZiAoIXNlbGYuaWdub3JlLmxlbmd0aClcbiAgICByZXR1cm4gZmFsc2VcblxuICByZXR1cm4gc2VsZi5pZ25vcmUuc29tZShmdW5jdGlvbihpdGVtKSB7XG4gICAgcmV0dXJuIGl0ZW0ubWF0Y2hlci5tYXRjaChwYXRoKSB8fCAhIShpdGVtLmdtYXRjaGVyICYmIGl0ZW0uZ21hdGNoZXIubWF0Y2gocGF0aCkpXG4gIH0pXG59XG5cbmZ1bmN0aW9uIGNoaWxkcmVuSWdub3JlZCAoc2VsZiwgcGF0aCkge1xuICBpZiAoIXNlbGYuaWdub3JlLmxlbmd0aClcbiAgICByZXR1cm4gZmFsc2VcblxuICByZXR1cm4gc2VsZi5pZ25vcmUuc29tZShmdW5jdGlvbihpdGVtKSB7XG4gICAgcmV0dXJuICEhKGl0ZW0uZ21hdGNoZXIgJiYgaXRlbS5nbWF0Y2hlci5tYXRjaChwYXRoKSlcbiAgfSlcbn1cbiIsInZhciB3cmFwcHkgPSByZXF1aXJlKCd3cmFwcHknKVxudmFyIHJlcXMgPSBPYmplY3QuY3JlYXRlKG51bGwpXG52YXIgb25jZSA9IHJlcXVpcmUoJ29uY2UnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdyYXBweShpbmZsaWdodClcblxuZnVuY3Rpb24gaW5mbGlnaHQgKGtleSwgY2IpIHtcbiAgaWYgKHJlcXNba2V5XSkge1xuICAgIHJlcXNba2V5XS5wdXNoKGNiKVxuICAgIHJldHVybiBudWxsXG4gIH0gZWxzZSB7XG4gICAgcmVxc1trZXldID0gW2NiXVxuICAgIHJldHVybiBtYWtlcmVzKGtleSlcbiAgfVxufVxuXG5mdW5jdGlvbiBtYWtlcmVzIChrZXkpIHtcbiAgcmV0dXJuIG9uY2UoZnVuY3Rpb24gUkVTICgpIHtcbiAgICB2YXIgY2JzID0gcmVxc1trZXldXG4gICAgdmFyIGxlbiA9IGNicy5sZW5ndGhcbiAgICB2YXIgYXJncyA9IHNsaWNlKGFyZ3VtZW50cylcblxuICAgIC8vIFhYWCBJdCdzIHNvbWV3aGF0IGFtYmlndW91cyB3aGV0aGVyIGEgbmV3IGNhbGxiYWNrIGFkZGVkIGluIHRoaXNcbiAgICAvLyBwYXNzIHNob3VsZCBiZSBxdWV1ZWQgZm9yIGxhdGVyIGV4ZWN1dGlvbiBpZiBzb21ldGhpbmcgaW4gdGhlXG4gICAgLy8gbGlzdCBvZiBjYWxsYmFja3MgdGhyb3dzLCBvciBpZiBpdCBzaG91bGQganVzdCBiZSBkaXNjYXJkZWQuXG4gICAgLy8gSG93ZXZlciwgaXQncyBzdWNoIGFuIGVkZ2UgY2FzZSB0aGF0IGl0IGhhcmRseSBtYXR0ZXJzLCBhbmQgZWl0aGVyXG4gICAgLy8gY2hvaWNlIGlzIGxpa2VseSBhcyBzdXJwcmlzaW5nIGFzIHRoZSBvdGhlci5cbiAgICAvLyBBcyBpdCBoYXBwZW5zLCB3ZSBkbyBnbyBhaGVhZCBhbmQgc2NoZWR1bGUgaXQgZm9yIGxhdGVyIGV4ZWN1dGlvbi5cbiAgICB0cnkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBjYnNbaV0uYXBwbHkobnVsbCwgYXJncylcbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKGNicy5sZW5ndGggPiBsZW4pIHtcbiAgICAgICAgLy8gYWRkZWQgbW9yZSBpbiB0aGUgaW50ZXJpbS5cbiAgICAgICAgLy8gZGUtemFsZ28sIGp1c3QgaW4gY2FzZSwgYnV0IGRvbid0IGNhbGwgYWdhaW4uXG4gICAgICAgIGNicy5zcGxpY2UoMCwgbGVuKVxuICAgICAgICBwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBSRVMuYXBwbHkobnVsbCwgYXJncylcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlbGV0ZSByZXFzW2tleV1cbiAgICAgIH1cbiAgICB9XG4gIH0pXG59XG5cbmZ1bmN0aW9uIHNsaWNlIChhcmdzKSB7XG4gIHZhciBsZW5ndGggPSBhcmdzLmxlbmd0aFxuICB2YXIgYXJyYXkgPSBbXVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIGFycmF5W2ldID0gYXJnc1tpXVxuICByZXR1cm4gYXJyYXlcbn1cbiIsIi8vIFJldHVybnMgYSB3cmFwcGVyIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIHdyYXBwZWQgY2FsbGJhY2tcbi8vIFRoZSB3cmFwcGVyIGZ1bmN0aW9uIHNob3VsZCBkbyBzb21lIHN0dWZmLCBhbmQgcmV0dXJuIGFcbi8vIHByZXN1bWFibHkgZGlmZmVyZW50IGNhbGxiYWNrIGZ1bmN0aW9uLlxuLy8gVGhpcyBtYWtlcyBzdXJlIHRoYXQgb3duIHByb3BlcnRpZXMgYXJlIHJldGFpbmVkLCBzbyB0aGF0XG4vLyBkZWNvcmF0aW9ucyBhbmQgc3VjaCBhcmUgbm90IGxvc3QgYWxvbmcgdGhlIHdheS5cbm1vZHVsZS5leHBvcnRzID0gd3JhcHB5XG5mdW5jdGlvbiB3cmFwcHkgKGZuLCBjYikge1xuICBpZiAoZm4gJiYgY2IpIHJldHVybiB3cmFwcHkoZm4pKGNiKVxuXG4gIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignbmVlZCB3cmFwcGVyIGZ1bmN0aW9uJylcblxuICBPYmplY3Qua2V5cyhmbikuZm9yRWFjaChmdW5jdGlvbiAoaykge1xuICAgIHdyYXBwZXJba10gPSBmbltrXVxuICB9KVxuXG4gIHJldHVybiB3cmFwcGVyXG5cbiAgZnVuY3Rpb24gd3JhcHBlcigpIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXVxuICAgIH1cbiAgICB2YXIgcmV0ID0gZm4uYXBwbHkodGhpcywgYXJncylcbiAgICB2YXIgY2IgPSBhcmdzW2FyZ3MubGVuZ3RoLTFdXG4gICAgaWYgKHR5cGVvZiByZXQgPT09ICdmdW5jdGlvbicgJiYgcmV0ICE9PSBjYikge1xuICAgICAgT2JqZWN0LmtleXMoY2IpLmZvckVhY2goZnVuY3Rpb24gKGspIHtcbiAgICAgICAgcmV0W2tdID0gY2Jba11cbiAgICAgIH0pXG4gICAgfVxuICAgIHJldHVybiByZXRcbiAgfVxufVxuIiwidmFyIHdyYXBweSA9IHJlcXVpcmUoJ3dyYXBweScpXG5tb2R1bGUuZXhwb3J0cyA9IHdyYXBweShvbmNlKVxubW9kdWxlLmV4cG9ydHMuc3RyaWN0ID0gd3JhcHB5KG9uY2VTdHJpY3QpXG5cbm9uY2UucHJvdG8gPSBvbmNlKGZ1bmN0aW9uICgpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZ1bmN0aW9uLnByb3RvdHlwZSwgJ29uY2UnLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBvbmNlKHRoaXMpXG4gICAgfSxcbiAgICBjb25maWd1cmFibGU6IHRydWVcbiAgfSlcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRnVuY3Rpb24ucHJvdG90eXBlLCAnb25jZVN0cmljdCcsIHtcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG9uY2VTdHJpY3QodGhpcylcbiAgICB9LFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KVxufSlcblxuZnVuY3Rpb24gb25jZSAoZm4pIHtcbiAgdmFyIGYgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGYuY2FsbGVkKSByZXR1cm4gZi52YWx1ZVxuICAgIGYuY2FsbGVkID0gdHJ1ZVxuICAgIHJldHVybiBmLnZhbHVlID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICB9XG4gIGYuY2FsbGVkID0gZmFsc2VcbiAgcmV0dXJuIGZcbn1cblxuZnVuY3Rpb24gb25jZVN0cmljdCAoZm4pIHtcbiAgdmFyIGYgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGYuY2FsbGVkKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGYub25jZUVycm9yKVxuICAgIGYuY2FsbGVkID0gdHJ1ZVxuICAgIHJldHVybiBmLnZhbHVlID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICB9XG4gIHZhciBuYW1lID0gZm4ubmFtZSB8fCAnRnVuY3Rpb24gd3JhcHBlZCB3aXRoIGBvbmNlYCdcbiAgZi5vbmNlRXJyb3IgPSBuYW1lICsgXCIgc2hvdWxkbid0IGJlIGNhbGxlZCBtb3JlIHRoYW4gb25jZVwiXG4gIGYuY2FsbGVkID0gZmFsc2VcbiAgcmV0dXJuIGZcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=