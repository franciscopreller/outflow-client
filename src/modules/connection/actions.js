import { ADD_CONNECTION, REMOVE_CONNECTION } from './constants';

export function addConnection(connection) {
  return {
    type: ADD_CONNECTION,
    payload: {
      connection,
    },
  };
}
export function removeConnection(index) {
  return {
    type: REMOVE_CONNECTION,
    payload: {
      index,
    },
  };
}
