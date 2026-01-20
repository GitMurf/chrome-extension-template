import {
  getSettings,
  setSettings,
  getSessionState,
  setSessionState,
  incrementClickCount,
  type Settings,
} from '@/shared/storage';

interface CustomMessageSender extends chrome.runtime.MessageSender {
  windowId?: number;
}

// Don't open side panel on action click (popup handles that)
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: false });

const openSidePanels = new Set<number>();

// Keeping track of open side panels
chrome.runtime.onConnect.addListener((port) => {
  if (port.name === 'sidepanel') {
    let windowId = (port.sender as CustomMessageSender)?.windowId;

    const registerPanel = (id: number) => {
      openSidePanels.add(id);
      port.onDisconnect.addListener(() => {
        openSidePanels.delete(id);
      });
    };

    if (windowId !== undefined) {
      registerPanel(windowId);
    } else {
      port.onMessage.addListener((msg) => {
        if (msg.type === 'INIT_SIDEPANEL' && msg.windowId !== undefined) {
          windowId = msg.windowId;
          registerPanel(windowId as number);
        }
      });
    }
  }
});

// "Right-click" context menus in the webpage your extension is loaded for
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'greet-selection',
    title: 'Greet: "%s"',
    contexts: ['selection'],
  });

  chrome.contextMenus.create({
    id: 'open-side-panel',
    title: 'Open Side Panel',
    contexts: ['action'],
  });

  chrome.contextMenus.create({
    id: 'open-options',
    title: 'Extension Options',
    contexts: ['action'],
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === 'greet-selection' && info.selectionText) {
    const settings = await getSettings();
    if (settings.notificationsEnabled) {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'images/icon-128.png',
        title: 'Greeting',
        message: `Hello, ${info.selectionText}!`,
      });
    }
  }

  if (info.menuItemId === 'open-side-panel' && tab?.windowId) {
    chrome.sidePanel.open({ windowId: tab.windowId });
  }

  if (info.menuItemId === 'open-options') {
    chrome.runtime.openOptionsPage();
  }
});

// Keyboard Shortcuts
chrome.commands.onCommand.addListener((command, tab) => {
  if (command === 'toggle-side-panel') {
    if (tab?.windowId) {
      if (openSidePanels.has(tab.windowId)) {
        // @ts-ignore - sidePanel.close is available in Chrome 123+
        if (chrome.sidePanel.close) {
          // @ts-ignore
          chrome.sidePanel.close({ windowId: tab.windowId });
        }
      } else {
        chrome.sidePanel.open({ windowId: tab.windowId });
      }
    }
  }

  if (command === 'show-notification') {
    getSettings().then((settings) => {
      if (settings.notificationsEnabled) {
        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'images/icon-128.png',
          title: 'Keyboard Shortcut Triggered',
          message: settings.greeting,
        });
      }
    });
  }
});

/**
 * MESSAGE ROUTER
 *
 * Sets up a message listener for the Chrome extension background script.
 *
 * Handles incoming messages from other extension components (e.g., content scripts, popup)
 * and sends asynchronous responses using the provided `handleMessage` function.
 *
 * Note: The listener returns `true` to indicate that the response will be sent asynchronously,
 * as required by the Chrome Extensions API.
 *
 * @see https://developer.chrome.com/docs/extensions/mv3/messaging/
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  handleMessage(message, sender).then(sendResponse);
  return true;
});

async function handleMessage(
  message: { type: string; payload?: unknown },
  sender: chrome.runtime.MessageSender
): Promise<unknown> {
  switch (message.type) {
    case 'GET_SETTINGS':
      return await getSettings();

    case 'UPDATE_SETTINGS':
      await setSettings(message.payload as Partial<Settings>);
      return { success: true };

    case 'GET_SESSION':
      return await getSessionState();

    case 'INCREMENT_CLICK': {
      const count = await incrementClickCount();
      return { count };
    }

    case 'SHOW_NOTIFICATION': {
      const { title, message: msg } = message.payload as {
        title: string;
        message: string;
      };
      const settings = await getSettings();
      if (settings.notificationsEnabled) {
        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'images/icon-128.png',
          title,
          message: msg,
        });
      }
      return { success: true };
    }

    case 'CONTENT_LOADED': {
      await setSessionState({ lastActiveTab: sender.tab?.id });
      return { acknowledged: true };
    }

    default:
      return { error: 'Unknown message type' };
  }
}
