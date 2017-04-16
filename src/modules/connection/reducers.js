import { REHYDRATE } from 'redux-persist/constants';
import {
  SESSION_CLOSED,
  SESSION_INIT,
  SESSION_CONNECTED,
  SESSION_DISCONNECTED,
} from '../session/constants';

// Initial State
const initialState = [];

// Handlers
const ACTION_HANDLERS = {
  [REHYDRATE]: (state, action) => {
    const { connections } = action.payload;
    if (connections) {
      return connections.map(conn => Object.assign({}, conn, {
        connected: false,
        connecting: false,
      }));
    }
    return state;
  },
  [SESSION_INIT]: (state, action) => [
    ...state,
    Object.assign({}, action.payload.connection, {
      uuid: action.payload.uuid,
      connected: false,
      connecting: true,
    }),
  ],
  [SESSION_CONNECTED]: (state, action) => [
    ...state.map((conn) => (conn.uuid !== action.payload.uuid) ? conn : Object.assign({}, conn, {
      connected: true,
      connecting: false,
    })),
  ],
  [SESSION_DISCONNECTED]: (state, action) => [
    ...state.map((conn) => (conn.uuid !== action.payload.uuid) ? conn : Object.assign({}, conn, {
      connected: false,
      connecting: false,
    })),
  ],
  [SESSION_CLOSED]: (state, action) => [
    ...state.filter((connection) => connection.uuid !== action.payload.uuid),
  ],
};

// Expose reducer
export default function connectionsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
