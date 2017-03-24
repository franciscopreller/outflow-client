import { ADD_CONNECTION, REMOVE_CONNECTION } from './constants';

// Initial State
const initialState = {
  connections: [],
};

// Handlers
const ACTION_HANDLERS = {
  [ADD_CONNECTION]: (state, action) => Object.assign({}, state, {
    connections: [
      ...state.connections,
      Object.assign({}, action.payload.connection),
    ],
  }),
  [REMOVE_CONNECTION]: (state, action) => Object.assign({}, state, {
    connections: [
      ...state.connections.slice(0, action.payload.index),
      ...state.connections.slice(action.payload.index + 1),
    ],
  }),
};

// Expose reducer
export default function connectionReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
