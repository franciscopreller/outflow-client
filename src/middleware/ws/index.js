import WebSocket from 'socketcluster-client';
import * as actions from './actions';

export function bindWSEvents(ws, dispatch) {
  ws.on('connect', () => dispatch(actions.connected()));
  ws.on('error', (error) => dispatch(actions.error(error)));
  ws.on('disconnect', (code) => dispatch(actions.disconnected(code)));
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
  const ws = WebSocket.connect(options);
  const send = ws.emit.bind(ws);
  return ({ dispatch, getState }) => {
    // Bind socket events
    bindWSEvents(ws, dispatch);

    return next => (action) => {
      let actionCopy = action;
      // @TODO: Fix once authentication is integrated
      // const authToken = getState().auth.token;

      // Only process this particular middleware's messages from here on.
      if (actionCopy.type.split('/').shift().indexOf(prefix) !== 0) {
        next(actionCopy);
      } else {
        next(actionCopy);
        const event = actionCopy.type.split('/')[1];
        const payload = actionCopy.payload;

        // Send event to socket server
        send(event, {
          payload,
        });
      }
    };
  };
}
