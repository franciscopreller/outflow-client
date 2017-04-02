import UUID from 'uuid/v4';

// Initial State
const initialState = {
  uuid: UUID(),
  authenticated: false,
  authenticating: false,
};

// Handlers
const ACTION_HANDLERS = {

};

// Expose reducer
export default function authReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
