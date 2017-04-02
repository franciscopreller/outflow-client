import { SESSION_INIT, SESSION_CLOSE, SESSION_HIDE_PROMPT_REQUESTED, SESSION_SHOW_PROMPT_REQUESTED } from './constants';

// Initial State
const initialState = [];

// Handlers
const ACTION_HANDLERS = {
  [SESSION_INIT]: (state, action) => [
    ...state, {
      uuid: action.payload.uuid,
      name: action.payload.connection.name,
      hidePrompt: false,
    }
  ],
  [SESSION_CLOSE]: (state, action) => [
    ...state.filter((s) => s.uuid !== action.payload.uuid),
  ],
  [SESSION_HIDE_PROMPT_REQUESTED]: (state, action) => state.map((s) => (
    (s.uuid !== action.payload.uuid) ? s : Object.assign({}, s, { hidePrompt: true })
  )),
  [SESSION_SHOW_PROMPT_REQUESTED]: (state, action) => state.map((s) => (
    (s.uuid !== action.payload.uuid) ? s : Object.assign({}, s, { hidePrompt: false })
  )),
};

// Expose reducer
export default function sessionReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
