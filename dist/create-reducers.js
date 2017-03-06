'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = reducer;

exports.default = function (entities) {
  var otherReducers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var backboneReducers = {};

  for (var name in entities) {
    var entity = entities[name];
    backboneReducers[name] = function () {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return state;
    };
  }

  for (var _name in otherReducers) {
    backboneReducers[_name] = otherReducers[_name];
  }

  // combine all redux->backbone reducers
  var combinedReducers = (0, _redux.combineReducers)(backboneReducers);

  return function (state, action) {
    return reducer(combinedReducers(state, action), action);
  };
};

var _redux = require('redux');

var _cloneDeep = require('clone-deep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _createActions = require('./create-actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 */
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (action.type === _createActions.__ACTION_DUX_CROSS_BACKBONE__) {
    var newState = (0, _cloneDeep2.default)(state);
    // beware this is a shallow copy
    return Object.assign({}, newState, _defineProperty({}, action.entityName, action.entity.toJSON()));
  }

  return state;
}

/*
 */