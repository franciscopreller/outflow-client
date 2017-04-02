import WebSocket from 'socketcluster-client';
import * as actions from './actions';
import { REHYDRATE } from 'redux-persist/lib/constants';

// Some constants
export let SOCKET_READY = false;
export let ACTION_CACHE = [];
export let send = null;

/**
 * Binds the required socket events to run the WS middleware
 *
 * @param ws
 * @param dispatch
 */
export function bindWSEvents(ws, dispatch) {
  ws.on('connect', () => dispatch(actions.connected()));
  ws.on('error', (error) => dispatch(actions.error(error)));
  ws.on('disconnect', (code) => dispatch(actions.disconnected(code)));

  // Messages from socket server are wrapper in Redux actions, so dispatch them seamlessly
  ws.on('ws.message', (action) => dispatch(action));
}

/**
 * Connects the websocket and returns the socket emitter
 *
 * @param options
 * @param dispatch
 */
export function connectWebSocket(options, dispatch) {
  const ws = WebSocket.connect(options);
  bindWSEvents(ws, dispatch);

  return ws.emit.bind(ws);
}

/**
 * WS action handler
 *
 * @param prefix
 * @param action
 * @param next
 * @param send
 */
export function handleAction(prefix, action, next, send) {
  if (action.type) {
    // Only process this particular middleware's messages from here on.
    if (action.type.split('/').shift().indexOf(prefix) !== 0) {
      next(action);
    } else {
      next(action);
      const event = action.type.split('/')[1];
      const payload = action.payload;

      // Send event to socket server
      send(event, { payload });
    }
  }
}

/**
 * Allows you to register actions that when dispatched, are sent to webSocket server
 *
 * @param prefix  connected instance of ws module
 * @param options may be an array of action types, a test function, or a string prefix
 *
 * @returns {function({dispatch: *, getState: *})}
 */
export default function createWSMiddleware(prefix, options) {
  return ({ dispatch }) => {
    return next => (action) => {
      let actionCopy = action;

      // Check for re-hydration
      switch (true) {
        case (!SOCKET_READY && actionCopy.type !== REHYDRATE):
          // Store the pending action into an actions cache
          ACTION_CACHE.push(actionCopy);
          break;

        case (!SOCKET_READY && actionCopy.type === REHYDRATE):
          // Handle any actions in cache
          ACTION_CACHE.map((act) => {
            handleAction(prefix, act, next, send);
          });
          // Handle current action
          next(actionCopy);
          SOCKET_READY = true;
          ACTION_CACHE = [];

          // Connect to websocket
          send = connectWebSocket(options, dispatch);
          break;

        case (SOCKET_READY && typeof send === 'function'):
          // As long as we have the send socket available, we can handle it
          handleAction(prefix, actionCopy, next, send);
          break;

        default:
          console.error('Could not handle action, send method is undefined', { action: actionCopy, send });
          break;
      }

    };
  };
}
