import createActions from './create-actions';
import createInitialState from './create-initial-state';
import createMiddleware, {emitter} from './create-middleware';
import createReducers from './create-reducers';

/**
 * dux(createStore, applyMiddleware)(entities, preloadedState, enhacer)
 */
export default (createStore, applyMiddleware) => (entities, preloadedState, enhacer) => {

  // transform backbone entities on reducers
  let reducersFromBackbone = entities;
  if (typeof entities != 'function')
    reducersFromBackbone = createReducers(entities);

  // normal createStore, without redux->backbone
  if (typeof applyMiddleware === 'undefined')
    return createStore(reducersFromBackbone, preloadedState, enhacer);

  if (typeof preloadedState === 'undefined') {
    preloadedState = new Array();
  }

  if (Array.isArray(preloadedState)) {
    preloadedState.push(createMiddleware);
    preloadedState = applyMiddleware.apply(null, preloadedState);
  }

  if (Array.isArray(enhacer)) {
    enhacer.push(createMiddleware);
    enhacer = applyMiddleware.apply(null, enhacer);
  }

  const store = createStore(reducersFromBackbone, preloadedState, enhacer);

  // backbone->redux
  createActions(entities, store);

  return store;
}


export {
  createMiddleware,
  createInitialState,
  createActions,
  createReducers,
  emitter
};

