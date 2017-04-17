import {
  SESSION_OPEN,
  SESSION_INIT,
  SESSION_CLOSED,
  SESSION_CLOSE,
  SESSION_CONNECT,
  SESSION_COMMAND,
  SESSION_DISCONNECT,
  COMMAND_PRE_PROCESS,
  APPEND_CONTENT,
  APPEND_SYSTEM_MSG,
  APPEND_PROMPT,
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

export function appendContent(segments, uuid) {
  return {
    type: APPEND_CONTENT,
    payload: {
      segments,
      uuid,
    },
  };
}

export function appendPrompt(segments, uuid) {
  return {
    type: APPEND_PROMPT,
    payload: {
      segments,
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

export function processCommand(command, uuid, hidden) {
  return {
    type: COMMAND_PRE_PROCESS,
    payload: {
      command,
      uuid,
      hidden,
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
