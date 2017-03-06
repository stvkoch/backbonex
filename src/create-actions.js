import {emitter} from './create-middleware';

import updateState from './action';

// backbone-redux
export default function createActions(entities, store) {
  for (let name in entities) {
    const entity = entities[name];

    // event, callback, context
    entity.on('change', function() {
      this.dispatch(updateState(
        this.name,
        this.entity
      ));
    }, {name, entity, dispatch: store.dispatch});
  }
}

