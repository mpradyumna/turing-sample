"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogFactory = void 0;

var _Log = require("../classes/Log");

var _LogWinston = require("../classes/LogWinston");

class LogFactory {
  static getLogInstance(logProvider) {
    switch (logProvider) {
      case 'console':
        return new _Log.Log();

      case 'winston':
        return new _LogWinston.LogWinston();

      default:
        throw Error(`Logger ${logProvider} is not recognized`);
    }
  }

}

exports.LogFactory = LogFactory;