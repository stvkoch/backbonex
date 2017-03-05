import {expect} from 'chai';
import sinon from 'sinon';

import backbonex, {emitter, createInitialState} from './../src';
import {createStore, applyMiddleware} from 'redux';

import {backboneTree, backboneState} from './../__mocks__/backbone';
import {ACTION_POST, ACTION_POSTS} from './../__mocks__/actions';

const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

describe('backbonex', () => {
  it('should be a function', function() {
    expect(backbonex).to.be.a('function');
  });

  it('should return store redux api', () => {

    const store = backbonex(createStore, applyMiddleware)(backboneTree);

    const methods = Object.keys(store)

    expect(methods).to.have.lengthOf(4);
    expect(methods).to.contain('subscribe');
    expect(methods).to.contain('dispatch');
    expect(methods).to.contain('getState');
    expect(methods).to.contain('replaceReducer');
  });


  it('should have same state of backbone', () => {
    const initialState = createInitialState(backboneTree);
    const store = backbonex(createStore, applyMiddleware)(backboneTree, initialState);

    expect(initialState).to.be.not.empty;
    expect(store.getState()).to.be.deep.equal(initialState);
  });

  it('should have reflect changes made on backbone', () => {
    const initialState = createInitialState(backboneTree);
    const store = backbonex(createStore, applyMiddleware)(backboneTree, initialState);

    expect(initialState).to.be.not.empty;
    expect(store.getState()).to.be.deep.equal(initialState);

    backboneTree.post.set({title: 'TITLE CHANGED'});
    expect(store.getState()).to.be.not.deep.equal(initialState);

    const newInitialState = createInitialState(backboneTree);
    expect(store.getState()).to.be.deep.equal(newInitialState);
  });


  it('should allow trigger backbone events using redux actions', () => {
    const initialState = createInitialState(backboneTree);
    const store = backbonex(createStore, applyMiddleware)(
      backboneTree,
      initialState,
      [
        //logger
      ]
    );

    expect(store.getState()).to.be.deep.equal(initialState);

    emitter.on(
      ACTION_POST,
      function (action){
        this.set({title: action.title});
      }.bind(backboneTree.post)
    )

    const action = {
      type: ACTION_POST,
      title: 'AWESOME TITLE'
    };

    store.dispatch(action);

    const newInitialState = createInitialState(backboneTree);

    expect(store.getState()).to.be.not.deep.equal(initialState);
    expect(store.getState()).to.be.deep.equal(newInitialState);

  });

});



