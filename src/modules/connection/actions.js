import { ADD_CONNECTION, OPEN_CONNECTION, REMOVE_CONNECTION, CLOSE_CONNECTION } from './constants';

export function addConnection(connection) {
  return {
    type: ADD_CONNECTION,
    payload: {
      connection,
    },
  };
}

export function openConnection(index, uuid) {
  return {
    type: OPEN_CONNECTION,
    payload: {
      index,
      uuid,
    },
  };
}

export function closeConnection(index) {
  return {
    type: CLOSE_CONNECTION,
    payload: {
      index,
    },
  };
}

export function removeConnection(connection) {
  return {
    type: REMOVE_CONNECTION,
    payload: {
      connection,
    },
  };
}
