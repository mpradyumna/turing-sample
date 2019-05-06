"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "get", {
  enumerable: true,
  get: function () {
    return _lodash.get;
  }
});
Object.defineProperty(exports, "isNil", {
  enumerable: true,
  get: function () {
    return _lodash.isNil;
  }
});
Object.defineProperty(exports, "isObject", {
  enumerable: true,
  get: function () {
    return _lodash.isObject;
  }
});
Object.defineProperty(exports, "set", {
  enumerable: true,
  get: function () {
    return _lodash.set;
  }
});
exports.timeout = void 0;

var _lodash = require("lodash");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const timeout =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (milliseconds) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, milliseconds);
    });
  });

  return function timeout(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.timeout = timeout;