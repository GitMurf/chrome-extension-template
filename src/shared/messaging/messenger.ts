import type { MessageType, Message, MessageResponse } from './types';

/**
 * Sends a type-safe message to the background service worker
 */
export async function sendMessage<T extends MessageType>(
  type: T,
  payload?: Message<T>['payload']
): Promise<MessageResponse<T>> {
  return chrome.runtime.sendMessage({ type, payload });
}

/**
 * Sends a type-safe message to a specific tab's content script
 */
export async function sendTabMessage<T extends MessageType>(
  tabId: number,
  type: T,
  payload?: Message<T>['payload']
): Promise<MessageResponse<T>> {
  return chrome.tabs.sendMessage(tabId, { type, payload });
}
