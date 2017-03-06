
export const __ACTION_DUX_CROSS_BACKBONE__ = 'ACTION_DUX_CROSS_BACKBONE';



export default function updateState(entityName, entity) {
  if (typeof entity.toJSON === 'function') {
    entity = entity.toJSON()
  }

  return {
    type: __ACTION_DUX_CROSS_BACKBONE__,
    entityName,
    entity
  }
}
