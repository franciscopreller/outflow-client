import { SESSION_CLOSE, SESSION_INIT, APPEND_CONTENT, APPEND_SAME_LINE_CONTENT } from '../session/constants';

// Initial State
const initialState = [];

// Handlers
const ACTION_HANDLERS = {
  [SESSION_INIT]: (state, action) => [
    ...state, {
      uuid: action.payload.uuid,
      lines: [],
    }
  ],
  [SESSION_CLOSE]: (state, action) => [
    ...state.filter((content) => content.uuid !== action.payload.uuid),
  ],
  [APPEND_CONTENT]: (state, action) => state.map((content) => (
    (content.uuid !== action.payload.uuid) ? content : Object.assign({}, content, {
      lines: [
        ...content.lines,
        ...action.payload.lines,
      ],
    })
  )),
  [APPEND_SAME_LINE_CONTENT]: (state, action) => state.map((content) => (
    (content.uuid !== action.payload.uuid) ? content : Object.assign({}, content, {
      lines: content.lines.map((line, index) => (
        (index < (content.lines.length - 1)) ? line : `${line}${action.payload.line}`
      )),
    })
  )),
};

// Expose reducer
export default function contentReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
