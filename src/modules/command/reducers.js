import { SESSION_CLOSE, SESSION_INIT, COMMAND_SET_HISTORY } from '../session/constants';

// Initial State
const initialState = [];

// Handlers
const ACTION_HANDLERS = {
  [SESSION_INIT]: (state, action) => [
    ...state, {
      uuid: action.payload.uuid,
      history: [],
    }
  ],
  [SESSION_CLOSE]: (state, action) => [
    ...state.filter((command) => command.uuid !== action.payload.uuid),
  ],
  [COMMAND_SET_HISTORY]: (state, action) => state.map((command) => (
    (command.uuid !== action.payload.uuid) ? command : Object.assign({}, command, {
      history: [
        action.payload.command,
        ...command.history,
      ],
    })
  )),
};

// Expose reducer
export default function commandReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
