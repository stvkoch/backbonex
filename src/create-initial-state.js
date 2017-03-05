/**
 * create initial state used to inject data on reducers
 */
export default function(entities) {
  const initialState = {};

  for (let name in entities) {
    initialState[name] = entities[name].toJSON();
  }

  return initialState;
}
