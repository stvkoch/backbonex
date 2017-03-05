import {combineReducers} from 'redux';
import cloneDeep from 'clone-deep';

import {__ACTION_DUX_CROSS_BACKBONE__} from './create-actions';

/**
 */
export function reducer(state = {}, action = {}) {
  if (action.type === __ACTION_DUX_CROSS_BACKBONE__) {
    const newState = cloneDeep(state);
    // beware this is a shallow copy
    return Object.assign({}, newState, {[action.entityName]: action.entity.toJSON()});
  }

  return state;
}

/*
 */
export default function(entities, otherReducers = {}) {
  const backboneReducers = {};

  for (let name in entities) {
    const entity = entities[name];
    backboneReducers[name] = (state = {}) => state;
  }

  for (let name in otherReducers) {
    backboneReducers[name] = otherReducers[name];
  }

  // combine all redux->backbone reducers
  const combinedReducers = combineReducers(backboneReducers);

  return (state, action) => {
    return reducer(
      combinedReducers(state, action),
      action
    );
  }
}
