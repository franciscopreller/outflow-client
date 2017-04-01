import { SESSION_INIT, SESSION_CLOSE } from './constants';

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
};

// Expose reducer
export default function sessionReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
