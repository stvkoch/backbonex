"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (entities) {
  var initialState = {};

  for (var name in entities) {
    initialState[name] = entities[name].toJSON();
  }

  return initialState;
};