const INCREMENT_COUNTER = 'INCREMENT_COUNTER'
const DECREMENT_COUNTER = 'DECREMENT_COUNTER'

export const actionTypes = {
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
}

export const actionCreators = {
  incrementCounter: () => ({
    type: INCREMENT_COUNTER
  }),
  decrementCounter: () => ({
    type: DECREMENT_COUNTER
  }),
}

export const thunks = {}

export const actions = Object.assign({}, thunks, actionCreators)

const initState = {
  count: 0
}

const ACTION_HANDLERS = {
  [INCREMENT_COUNTER]: (state, action) =>
    Object.assign({}, state, { count: (state.count + 1) }),
  [DECREMENT_COUNTER]: (state, action) =>
    Object.assign({}, state, { count: state.count - 1 }),
}

// ------------------------------------
// Reducer
// ------------------------------------
function counterReducer(state = initState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

export default counterReducer
