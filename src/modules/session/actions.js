import {
  ADD_SESSION,
  IDENTIFY_SESSION,
  REMOVE_SESSION,
  CLOSE_SESSION,
  OPEN_CONNECTION,
  APPEND_CONTENT,
  SESSION_COMMAND,
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

export function appendContent(lines, uuid) {
  return {
    type: APPEND_CONTENT,
    payload: {
      lines,
      uuid,
    }
  };
}

export function sendCommand(command, uuid) {
  return {
    // We modify the SESSION_COMMAND type here to plug into the right command on server
    // Still not sure if this will work when scaling, need to consider
    type: `${SESSION_COMMAND}.${uuid}`,
    payload: {
      command,
      uuid,
    }
  };
}
