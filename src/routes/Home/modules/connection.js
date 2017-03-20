// Constants
export const ADD_CONNECTION = 'ADD_CONNECTION';

// Actions
export function addConnection(connection) {
  return {
    type   : ADD_CONNECTION,
    payload: {
      connection,
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
};

// Reducer
const initialState = {
  connections: [],
};
export default function connectionReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
