import { WS_PREFIX } from '../ws/constants';

export const ADD_SESSION = 'ADD_SESSION';
export const IDENTIFY_SESSION = 'OPEN_SESSION';
export const CLOSE_SESSION = 'CLOSE_SESSION';
export const REMOVE_SESSION = 'REMOVE_SESSION';
export const APPEND_CONTENT = 'APPEND_CONTENT';
export const APPEND_SYSTEM_MSG = 'APPEND_SYSTEM_MSG';

// Incoming web-socket actions
export const SESSION_OUTPUT = 'SESSION_OUTPUT';
export const SESSION_ERROR = 'SESSION_ERROR';
export const SESSION_CONNECTED = 'SESSION_CONNECTED';
export const SESSION_DISCONNECTED = 'SESSION_DISCONNECTED';
export const SESSION_CLOSED = 'SESSION_CLOSED';

// Web-socket actions
export const SESSION_COMMAND = `${WS_PREFIX}/session.command`;
export const SESSION_CONNECT = `${WS_PREFIX}/session.connect`;
