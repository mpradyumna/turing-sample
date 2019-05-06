"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Log = void 0;

var util = _interopRequireWildcard(require("util"));

var _package = _interopRequireDefault(require("../../package.json"));

var _config = require("../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const version = _package.default.version;
const defaults = {
  msg: '',
  env: _config.config.env,
  service: _config.config.name,
  version,
  meta: {}
};

const generate = (payload = {}) => Object.assign(defaults, payload);

class Log {
  error(meta = {}, err) {
    this.log('error', generate({
      msg: util.inspect(err),
      err,
      meta
    }));
  }

  warn(meta = {}, msg) {
    this.log('warn', generate({
      msg,
      meta
    }));
  }

  info(meta = {}, msg) {
    this.log('info', generate({
      msg,
      meta
    }));
  }

  log(level, message, meta = null) {
    switch (level) {
      case 'info':
        // tslint:disable-next-line:no-console
        console.info(message);
        break;

      case 'warn':
        // tslint:disable-next-line:no-console
        console.warn(message);
        break;

      case 'error':
        // tslint:disable-next-line:no-console
        console.error(message);
        break;

      default:
        throw new Error(`${level} is not an acceptable log level.`);
    }
  }

}

exports.Log = Log;