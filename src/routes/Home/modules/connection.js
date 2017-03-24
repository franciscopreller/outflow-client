// Constants
export const ADD_CONNECTION = 'ADD_CONNECTION';
export const REMOVE_CONNECTION = 'REMOVE_CONNECTION';

// Actions
export function addConnection(connection) {
  return {
    type: ADD_CONNECTION,
    payload: {
      connection,
    },
  };
}
export function removeConnection(index) {
  return {
    type: REMOVE_CONNECTION,
    payload: {
      index,
    },
  };
}

// Action Handlers
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

// Reducer
const initialState = {
  connections: [],
};
export default function connectionReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
