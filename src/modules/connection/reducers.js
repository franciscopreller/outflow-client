import { ADD_CONNECTION, REMOVE_CONNECTION, OPEN_CONNECTION } from './constants';

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
  [OPEN_CONNECTION]: (state, action) => Object.assign({}, state, {
    connections: state.connections.map((connection, index) =>
      (index !== action.payload.index) ?
        connection :
        Object.assign({}, connection, {
          uuid: action.payload.uuid
        })
    ),
  }),
  [REMOVE_CONNECTION]: (state, action) => Object.assign({}, state, {
    connections: [
      ...state.connections.filter((connection) => connection.uuid !== action.payload.connection.uuid),
    ],
  }),
};

// Expose reducer
export default function connectionReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
