'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emitter = exports.createReducers = exports.createActions = exports.createInitialState = exports.createMiddleware = undefined;

var _createActions = require('./create-actions');

var _createActions2 = _interopRequireDefault(_createActions);

var _createInitialState = require('./create-initial-state');

var _createInitialState2 = _interopRequireDefault(_createInitialState);

var _createMiddleware = require('./create-middleware');

var _createMiddleware2 = _interopRequireDefault(_createMiddleware);

var _createReducers = require('./create-reducers');

var _createReducers2 = _interopRequireDefault(_createReducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * dux(createStore, applyMiddleware)(entities, preloadedState, enhacer)
 */
exports.default = function (createStore, applyMiddleware) {
  return function (entities, preloadedState, enhacer) {

    // transform backbone entities on reducers
    var reducersFromBackbone = entities;
    if (typeof entities != 'function') reducersFromBackbone = (0, _createReducers2.default)(entities);

    // normal createStore, without redux->backbone
    if (typeof applyMiddleware === 'undefined') return createStore(reducersFromBackbone, preloadedState, enhacer);

    if (typeof preloadedState === 'undefined') {
      preloadedState = new Array();
    }

    if (Array.isArray(preloadedState)) {
      preloadedState.push(_createMiddleware2.default);
      preloadedState = applyMiddleware.apply(null, preloadedState);
    }

    if (Array.isArray(enhacer)) {
      enhacer.push(_createMiddleware2.default);
      enhacer = applyMiddleware.apply(null, enhacer);
    }

    var store = createStore(reducersFromBackbone, preloadedState, enhacer);

    // backbone->redux
    (0, _createActions2.default)(entities, store);

    return store;
  };
};

exports.createMiddleware = _createMiddleware2.default;
exports.createInitialState = _createInitialState2.default;
exports.createActions = _createActions2.default;
exports.createReducers = _createReducers2.default;
exports.emitter = _createMiddleware.emitter;