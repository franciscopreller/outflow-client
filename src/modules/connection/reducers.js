import { SESSION_CLOSE, SESSION_INIT } from '../session/constants';

// Initial State
const initialState = [];

// Handlers
const ACTION_HANDLERS = {
  [SESSION_INIT]: (state, action) => [
    ...state,
    Object.assign({}, action.payload.connection, { uuid: action.payload.uuid }),
  ],
  [SESSION_CLOSE]: (state, action) => [
    ...state.filter((connection) => connection.uuid !== action.payload.uuid),
  ],
};

// Expose reducer
export default function connectionsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
