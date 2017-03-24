import { ADD_SESSION, REMOVE_SESSION, IDENTIFY_SESSION } from './constants';

// Initial State
const initialState = {
  sessions: [],
};

// Handlers
const ACTION_HANDLERS = {
  [ADD_SESSION]     : (state, action) => Object.assign({}, state, {
    sessions: [
      ...state.sessions,
      Object.assign({}, action.payload.connection),
    ],
  }),
  [IDENTIFY_SESSION]: (state, action) => Object.assign({}, state, {
    sessions: state.sessions.map((connection, index) =>
      (index !== action.payload.index) ? connection : Object.assign({}, connection, {
        uuid: action.payload.uuid
      })
    ),
  }),
  [REMOVE_SESSION]  : (state, action) => Object.assign({}, state, {
    sessions: [
      ...state.sessions.filter((connection) => connection.uuid !== action.payload.connection.uuid),
    ],
  }),
};

// Expose reducer
export default function connectionReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
