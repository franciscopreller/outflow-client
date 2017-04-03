import {
  SESSION_OPEN,
  SESSION_INIT,
  SESSION_CLOSED,
  SESSION_CLOSE,
  SESSION_CONNECT,
  APPEND_CONTENT,
  SESSION_COMMAND,
  APPEND_SYSTEM_MSG,
  SESSION_DISCONNECT,
  APPEND_SAME_LINE_CONTENT,
} from './constants';

export function addSession(connection) {
  return {
    type: SESSION_OPEN,
    payload: {
      connection,
    },
  };
}

export function initialiseSession(connection, uuid) {
  return {
    type: SESSION_INIT,
    payload: {
      connection,
      uuid,
    },
  };
}

export function closeSession(uuid) {
  return {
    type: SESSION_CLOSE,
    payload: {
      uuid,
    },
  };
}

export function sessionClosed(uuid) {
  return {
    type: SESSION_CLOSED,
    payload: {
      uuid,
    },
  };
}

export function disconnectSession(uuid) {
  return {
    type: SESSION_DISCONNECT,
    payload: {
      uuid,
    },
  };
}

export function sessionConnect(connection) {
  return {
    type: SESSION_CONNECT,
    payload: {
      ...connection,
    },
  }
}

export function appendContent(lines, uuid) {
  return {
    type: APPEND_CONTENT,
    payload: {
      lines,
      uuid,
    },
  };
}

export function appendSameLineContent(line, uuid) {
  return {
    type: APPEND_SAME_LINE_CONTENT,
    payload: {
      line,
      uuid,
    },
  };
}

export function appendSystemMessages(messages, uuid) {
  return {
    type: APPEND_SYSTEM_MSG,
    payload: {
      messages,
      uuid,
    },
  };
}

export function sendCommand(command, uuid, hidden) {
  return {
    type: SESSION_COMMAND,
    payload: {
      command,
      uuid,
      hidden,
    },
  };
}
