import { get, isNil, isObject, set } from 'lodash';

const timeout = async (milliseconds) => {
  return new Promise(((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  }));
};

class ErrorMsg {
  code: string;
  field: string;
  message: string;
}

const generateErrorMsg = function (code: string, field: string, msg: string): ErrorMsg {
  return { code: code, message: msg, field: field };
}

export { get, isNil, isObject, set, timeout, ErrorMsg, generateErrorMsg };