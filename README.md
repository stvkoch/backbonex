#Backbonex

Backbone -> Redux
Redux -> Backbone


Allow use your Models and Collections listen action and syncronize changes in a redux state tree


## Install

```
yarn add backbux
```

## Usage

### 1# backbone state tree

Create your state tree of backbone models or Collections

```
const backboneTree = {
  post,
  posts
};
```

If you desire you can createInitialState from current Backbone entities using `createInitialState`.


```
import {createInitialState} from 'backbonex';
const backboneState = createInitialState(backboneTree);
```

### 2# Create your store

```
import backbonex from 'backbonex';

const duxCreateStore = backbonex(createStore, applyMiddleware);
const store = duxCreateStore(backboneTree, backboneState, [...middlewares]);
```

### 3# Configure yours Models and Collections

```
import {emitter} from 'backbonex';
import {POST_CHANGE_ATTRIBUTES} from './actions/post';

class Post extends Backbone.Model {
  static initialize() {
    emitter.on(POST_CHANGE_ATTRIBUTES, (action)=> {
      this.set(action.payload.attributes);
    });
  }
}
```

### 4# Create yours actions

```
import {POST_CHANGE_ATTRIBUTES} from './actions/post';

export function postChangeAttr(attributes) {
  return {
    type: POST_CHANGE_ATTRIBUTES,
    attributes
  };
}
```

