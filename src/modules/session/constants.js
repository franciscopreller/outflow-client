import { WS_PREFIX } from '../ws/constants';

export const ADD_SESSION = 'ADD_CONNECTION';
export const IDENTIFY_SESSION = 'OPEN_CONNECTION';
export const CLOSE_SESSION = 'CLOSE_CONNECTION';
export const REMOVE_SESSION = 'REMOVE_CONNECTION';
export const APPEND_CONTENT = 'APPEND_CONTENT';

// Incoming web-socket actions
export const SESSION_OUTPUT = 'SESSION_OUTPUT';
export const SESSION_ERROR = 'SESSION_ERROR';

// Web-socket actions
export const OPEN_CONNECTION = `${WS_PREFIX}/connection.open`;
