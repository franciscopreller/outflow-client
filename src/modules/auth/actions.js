import * as constants from './constants';

export function updateWebsocketAuth(uuid) {
  return {
    type: constants.AUTH_WS_UPDATE,
    payload: {
      uuid,
    },
  }
}
