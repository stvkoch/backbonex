'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__ACTION_DUX_CROSS_BACKBONE__ = undefined;
exports.default = createActions;

var _createMiddleware = require('./create-middleware');

var __ACTION_DUX_CROSS_BACKBONE__ = exports.__ACTION_DUX_CROSS_BACKBONE__ = 'ACTION_DUX_CROSS_BACKBONE';

// backbone-redux
function createActions(entities, store) {
  for (var name in entities) {
    var entity = entities[name];

    // event, callback, context
    entity.on('change', function () {
      this.dispatch({
        type: __ACTION_DUX_CROSS_BACKBONE__,
        entityName: this.name,
        entity: this.entity
      });
    }, { name: name, entity: entity, dispatch: store.dispatch });
  }
}