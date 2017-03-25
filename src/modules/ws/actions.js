import { WS_CONNECTED, WS_ERROR, WS_DISCONNECTED } from './constants';

export function connected() {
  return {
    type: WS_CONNECTED,
  };
}

export function error(error) {
  return {
    type: WS_ERROR,
    payload: {
      error,
    },
  };
}

export function disconnected(code) {
  return {
    type: WS_DISCONNECTED,
    payload: {
      code,
    },
  };
}
