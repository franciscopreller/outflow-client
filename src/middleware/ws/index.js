export function bindWSEvents(ws, dispatch) {
  ws.on('open', () => dispatch({
    type: 'WS_OPEN'
  }));
  ws.on('error', (error) => dispatch({
    type: 'WS_ERROR',
    payload: {
      error
    },
  }));
  ws.on('close', (code, reason) => dispatch({
    type: 'WS_CLOSE',
    payload: {
      code,
      reason,
    },
  }));
}

/**
 * Allows you to register actions that when dispatched, are sent to webSocket server
 *
 * @param ws        connected instance of ws module
 * @param option    may be an array of action types, a test function, or a string prefix
 *
 * @returns {function({dispatch: *, getState: *})}
 */
export default function createWSMiddleware(ws, option) {
  const send = ws.send.bind(ws);
  return ({ dispatch, getState }) => {
    // Bind socket events
    bindWSEvents(ws, dispatch);

    return next => (action) => {
      let actionCopy = action;
      // @TODO: Fix once authentication is integrated
      // const authToken = getState().auth.token;

      // Only process this particular middleware's messages from here on.
      if (actionCopy.type.split('/').shift().indexOf(option) !== 0) {
        next(actionCopy);
      } else {
        send(actionCopy);
      }
    };
  };
}
