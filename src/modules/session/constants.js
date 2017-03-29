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

// Web-socket actions
export const SESSION_COMMAND = `${WS_PREFIX}/session.command`;
export const OPEN_CONNECTION = `${WS_PREFIX}/connection.open`;
