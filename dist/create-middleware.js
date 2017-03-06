'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emitter = undefined;

var _mitt = require('mitt');

var _mitt2 = _interopRequireDefault(_mitt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var emitter = exports.emitter = (0, _mitt2.default)();

//redux -> backbone

exports.default = function (store) {
  return function (next) {
    return function (action) {
      var result = next(action);
      emitter.emit(action.type, action);
      return result;
    };
  };
};