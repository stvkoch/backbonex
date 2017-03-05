import {expect} from 'chai';

import createInitialState from './../src/create-initial-state';

import {backboneTree, backboneState} from './../__mocks__/backbone';

describe('createInitialState', () => {
  it('should be a function', function() {
    expect(createInitialState).to.be.a('function');
  });

  it('should be return a object', function() {
    expect(createInitialState(backboneTree)).to.be.a('object');
  });

  it('should be return a object', function() {
    expect(createInitialState(backboneTree)).to.be.deep.equal(backboneState)
  });
});

