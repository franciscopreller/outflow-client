import {
  SESSION_CLOSE,
  SESSION_INIT,
  SESSION_DO_GO_AHEAD,
  APPEND_CONTENT,
  APPEND_PROMPT,
} from '../session/constants';

// Initial State
const initialState = [];

// Handlers
const ACTION_HANDLERS = {
  [SESSION_INIT]: (state, action) => [
    ...state, {
      uuid: action.payload.uuid,
      segments: [],
      promptSegments: [],
      eor: false,
    }
  ],
  [SESSION_CLOSE]: (state, action) => [
    ...state.filter((content) => content.uuid !== action.payload.uuid),
  ],
  [APPEND_CONTENT]: (state, action) => state.map((content) => (
    (content.uuid !== action.payload.uuid) ? content : Object.assign({}, content, {
      segments: [
        ...content.segments,
        ...action.payload.segments,
      ],
    })
  )),
  [APPEND_PROMPT]: (state, action) => state.map((content) => (
    (content.uuid !== action.payload.uuid) ? content : Object.assign({}, content, {
      promptSegments: [
        ...action.payload.segments,
      ],
    })
  )),
  [SESSION_DO_GO_AHEAD]: (state, action) => state.map((s) => (
    (s.uuid !== action.payload.uuid) ? s : Object.assign({}, s, { eor: true })
  )),
};

// Expose reducer
export default function contentReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
