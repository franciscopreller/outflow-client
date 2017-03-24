import {
  ADD_SESSION,
  IDENTIFY_SESSION,
  REMOVE_SESSION,
  CLOSE_SESSION,
  OPEN_CONNECTION,
} from './constants';

export function addSession(connection) {
  return {
    type: ADD_SESSION,
    payload: {
      connection,
    },
  };
}

export function openSession(index, uuid) {
  return {
    type: IDENTIFY_SESSION,
    payload: {
      index,
      uuid,
    },
  };
}

export function closeSession(index) {
  return {
    type: CLOSE_SESSION,
    payload: {
      index,
    },
  };
}

export function removeSession(connection) {
  return {
    type: REMOVE_SESSION,
    payload: {
      connection,
    },
  };
}

export function openConnection(connection) {
  return {
    type: OPEN_CONNECTION,
    payload: {
      connection,
    }
  }
}
