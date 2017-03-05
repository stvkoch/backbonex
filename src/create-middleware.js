import mitt from 'mitt';

export const emitter = mitt();

//redux -> backbone
export default (store) => (next) => (action) => {
  let result = next(action);
  emitter.emit(action.type, action);
  return result;
}
