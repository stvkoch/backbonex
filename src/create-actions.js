import {emitter} from './create-middleware';

export const __ACTION_DUX_CROSS_BACKBONE__ = 'ACTION_DUX_CROSS_BACKBONE';

// backbone-redux
export default function createActions(entities, store) {
  for (let name in entities) {
    const entity = entities[name];

    // event, callback, context
    entity.on('change', function() {
      this.dispatch({
        type: __ACTION_DUX_CROSS_BACKBONE__,
        entityName: this.name,
        entity: this.entity
      });
    }, {name, entity, dispatch: store.dispatch});
  }
}

