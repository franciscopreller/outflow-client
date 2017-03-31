import {
  ADD_SESSION,
  IDENTIFY_SESSION,
  REMOVE_SESSION,
  CLOSE_SESSION,
  SESSION_CONNECT,
  APPEND_CONTENT,
  SESSION_COMMAND,
  APPEND_SYSTEM_MSG,
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
    type: SESSION_CONNECT,
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

export function appendSystemMessages(messages, uuid) {
  return {
    type: APPEND_SYSTEM_MSG,
    payload: {
      messages,
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
