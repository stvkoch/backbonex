import {expect} from 'chai';
import sinon from 'sinon';

import createReducer from './../src/create-reducers';
import createInitialState from './../src/create-initial-state';
import {__ACTION_DUX_CROSS_BACKBONE__} from './../src/create-actions';

import {backboneTree, backboneState} from './../__mocks__/backbone';
import {ACTION_POST, ACTION_POSTS} from './../__mocks__/actions';


describe('createReducer', () => {
  it('should be a function', function() {
    expect(createReducer).to.be.a('function');
  });

  it('should be pass reducers actions to backbone collection', function() {
    const initialState = createInitialState(backboneTree);

    const combinedReducers = createReducer(backboneTree);

    const state1 = combinedReducers(initialState, {});
    expect(state1).to.be.deep.equal(initialState);

    backboneTree.post.set({title: 'AWESOME TITLE'});

    const action = {
      type: __ACTION_DUX_CROSS_BACKBONE__,
      entityName: 'post',
      entity: backboneTree.post
    };


    const state2 = combinedReducers(state1, action);

    expect(state2).to.be.not.deep.equal(state1);

    const expectedState = state1;
    expectedState.post = backboneTree.post.toJSON();

    expect(state2).to.be.deep.equal(state1);
    expect(state2).to.be.deep.equal(expectedState);


  });

});

