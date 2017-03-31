import { ADD_SESSION, REMOVE_SESSION, IDENTIFY_SESSION, APPEND_CONTENT } from './constants';

// Initial State
const initialState = {
  connections: [],
  content: [],
};

// Handlers
const ACTION_HANDLERS = {
  [ADD_SESSION]: (state, action) => Object.assign({}, state, {
    connections: [
      ...state.connections,
      Object.assign({}, action.payload.connection),
    ],
    content: [
      ...state.content,
      Object.assign({}, { lines: [] }),
    ],
  }),
  [IDENTIFY_SESSION]: (state, action) => Object.assign({}, state, {
    connections: state.connections.map((connection, index) =>
      (index !== action.payload.index) ? connection : Object.assign({}, connection, {
        uuid: action.payload.uuid
      })
    ),
    content: state.content.map((content, index) =>
      (index !== action.payload.index) ? content : Object.assign({}, content, {
        uuid: action.payload.uuid
      })
    ),
  }),
  [REMOVE_SESSION]: (state, action) => Object.assign({}, state, {
    connections: [
      ...state.connections.filter((connection) => connection.uuid !== action.payload.connection.uuid),
    ],
    content: [
      ...state.content.filter((content) => content.uuid !== action.payload.connection.uuid),
    ],
  }),
  [APPEND_CONTENT]: (state, action) => Object.assign({}, state, {
    content: state.content.map((content) => (
      (content.uuid !== action.payload.uuid) ? content : Object.assign({}, content, {
        lines: [
          ...content.lines,
          ...action.payload.lines,
        ],
      })
    )),
  }),
};

// Expose reducer
export default function connectionReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
