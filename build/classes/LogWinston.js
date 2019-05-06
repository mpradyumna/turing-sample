"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogWinston = void 0;

var winston = _interopRequireWildcard(require("winston"));

var _winstonLogglyBulk = require("winston-loggly-bulk");

var _Log = require("../classes/Log");

var _config = require("../config");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const env = _config.config.env;
winston.remove(winston.transports.Console);

function addWinstonTransport(transport) {
  winston.add(transport);
}

switch (env) {
  case 'test':
  case 'development':
    addWinstonTransport(new winston.transports.Console());
    break;

  default:
    addWinstonTransport(new _winstonLogglyBulk.Loggly({
      token: _config.config.get('loggly.token'),
      subdomain: _config.config.get('loggly.subdomain'),
      tags: ['winston@3.0.0'],
      json: true,
      handleExceptions: true,
      colorize: false
    }));
}

class LogWinston extends _Log.Log {
  log(level, message, meta) {
    winston.log(level, message, meta);
  }

}

exports.LogWinston = LogWinston;