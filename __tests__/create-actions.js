import {expect} from 'chai';
import sinon from 'sinon';

import createActions, {__ACTION_DUX_CROSS_BACKBONE__} from './../src/create-actions';

import {backboneTree, backboneState} from './../__mocks__/backbone';
import {ACTION_POST, ACTION_POSTS} from './../__mocks__/actions';


describe('createActions', () => {
  it('should be a function', function() {
    expect(createActions).to.be.a('function');
  });


  it('when change a model should be dispatch DUX_ACTION', function() {
    const storeMock = {
      dispatch: sinon.spy()
    };

    createActions(backboneTree, storeMock);

    backboneTree.post.set({title: 'should dispatched changes'});

    expect(storeMock.dispatch.called).to.be.true;
    expect(storeMock.dispatch.calledWith({
      type: __ACTION_DUX_CROSS_BACKBONE__,
      entityName: 'post',
      entity: backboneTree.post
    })).to.be.true;

  });


});

