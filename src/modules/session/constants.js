import { WS_PREFIX } from '../ws/constants';

// Open Session: Generates a new UUID
export const SESSION_OPEN = 'SESSION_OPEN';
export const SESSION_INIT = 'SESSION_INIT';
export const SESSION_CLOSE = 'SESSION_CLOSE';

export const APPEND_CONTENT = 'APPEND_CONTENT';
export const APPEND_SYSTEM_MSG = 'APPEND_SYSTEM_MSG';
export const APPEND_PROMPT = 'APPEND_PROMPT';
export const COMMAND_PRE_PROCESS = 'COMMAND_PRE_PROCESS';
export const COMMAND_SET_HISTORY = 'COMMAND_SET_HISTORY';

// Incoming web-socket actions
export const SESSION_OUTPUT = 'SESSION_OUTPUT';
export const SESSION_PROMPT = 'SESSION_PROMPT';
export const SESSION_ERROR = 'SESSION_ERROR';
export const SESSION_CONNECTED = 'SESSION_CONNECTED';
export const SESSION_DISCONNECTED = 'SESSION_DISCONNECTED';
export const SESSION_CLOSED = 'SESSION_CLOSED';
export const SESSION_HIDE_PROMPT_REQUESTED = 'SESSION_HIDE_PROMPT_REQUESTED';
export const SESSION_SHOW_PROMPT_REQUESTED = 'SESSION_SHOW_PROMPT_REQUESTED';
export const SESSION_DO_GO_AHEAD = 'SESSION_DO_GO_AHEAD';

// Web-socket actions
export const SESSION_COMMAND = `${WS_PREFIX}/session.command`;
export const SESSION_CONNECT = `${WS_PREFIX}/session.connect`;
export const SESSION_DISCONNECT = `${WS_PREFIX}/session.disconnect`;
