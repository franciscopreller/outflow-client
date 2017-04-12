import { SESSION_CLOSE, SESSION_INIT, APPEND_CONTENT, APPEND_COMMAND } from '../session/constants';

// Initial State
const initialState = [];

// Handlers
const ACTION_HANDLERS = {
  [SESSION_INIT]: (state, action) => [
    ...state, {
      uuid: action.payload.uuid,
      segments: [],
    }
  ],
  [SESSION_CLOSE]: (state, action) => [
    ...state.filter((content) => content.uuid !== action.payload.uuid),
  ],
  [APPEND_CONTENT]: (state, action) => state.map((content) => {
    if (content.uuid !== action.payload.uuid) return content;
    let contentSegments = [...content.segments];
    let payloadSegments = [...action.payload.segments];
    // Command line input has odd behaviour
    if (content.segments.length && content.segments[content.segments.length - 1].classes.includes('at-input')) {
      contentSegments = contentSegments.slice(0, -1);
      payloadSegments = [...payloadSegments, content.segments[content.segments.length - 1]];
    }
    return Object.assign({}, content, {
      segments: [
        ...contentSegments,
        ...payloadSegments,
      ],
    });
  }),
  [APPEND_COMMAND]: (state, action) => state.map((content) => (
    (content.uuid !== action.payload.uuid) ? content : Object.assign({}, content, {
      segments: [
        ...content.segments,
        ...action.payload.segments,
      ],
    })
  )),
};

// Expose reducer
export default function contentReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
