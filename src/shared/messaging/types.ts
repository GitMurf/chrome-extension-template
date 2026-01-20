import type { Settings, SessionState } from '../storage/schemas';

/**
 * Type-safe message map for all extension messaging
 */
export interface MessageMap {
  // Settings
  GET_SETTINGS: { payload: undefined; response: Settings };
  UPDATE_SETTINGS: {
    payload: Partial<Settings>;
    response: { success: boolean };
  };

  // Session
  GET_SESSION: { payload: undefined; response: SessionState };
  INCREMENT_CLICK: { payload: undefined; response: { count: number } };

  // Notifications
  SHOW_NOTIFICATION: {
    payload: { title: string; message: string };
    response: { success: boolean };
  };

  // Content Script
  CONTENT_LOADED: {
    payload: { url: string };
    response: { acknowledged: boolean };
  };
  GET_PAGE_TITLE: {
    payload: undefined;
    response: { title: string };
  };
  HIGHLIGHT_PAGE: {
    payload: undefined;
    response: { success: boolean };
  };
}

export type MessageType = keyof MessageMap;

export interface Message<T extends MessageType> {
  type: T;
  payload: MessageMap[T]['payload'];
}

export type MessageResponse<T extends MessageType> = MessageMap[T]['response'];
