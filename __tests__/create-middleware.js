import {expect} from 'chai';
import sinon from 'sinon';
import {createStore, applyMiddleware} from 'redux';

import createMiddleware, {emitter} from './../src/create-middleware';

import {backboneTree, backboneState} from './../__mocks__/backbone';
import {ACTION_POST, ACTION_POSTS} from './../__mocks__/actions';


describe('createMiddleware redux actions -> backbone', () => {
  it('should be a function', function() {
    expect(createMiddleware).to.be.a('function');
  });

  it('should be run event callbacks from redux actions', () => {
    const callback = sinon.spy();
    const action = {type: ACTION_POST, title: 'hello'};

    const store = createStore((state)=>state, applyMiddleware(createMiddleware));

    emitter.on(ACTION_POST, callback);


    store.dispatch(action);

    expect(callback.called).to.be.true;
    expect(callback.calledWith(action)).to.be.true;
  });
});


