import { useState, useEffect } from 'react';
import { sendMessage, useTheme } from '@/shared';
import type { Settings, SessionState } from '@/shared/storage';

export function App() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [session, setSession] = useState<SessionState | null>(null);

  useTheme(settings?.theme);

  useEffect(() => {
    // Load initial data
    sendMessage('GET_SETTINGS').then(setSettings);
    sendMessage('GET_SESSION').then(setSession);

    // Listen for storage changes (especially theme)
    const handleStorageChange = (changes: {
      [key: string]: chrome.storage.StorageChange;
    }) => {
      if (changes.settings) {
        sendMessage('GET_SETTINGS').then(setSettings);
      }
    };
    chrome.storage.onChanged.addListener(handleStorageChange);
    return () => chrome.storage.onChanged.removeListener(handleStorageChange);
  }, []);

  const handleClick = async () => {
    const result = await sendMessage('INCREMENT_CLICK');
    setSession((prev) => (prev ? { ...prev, clickCount: result.count } : null));
  };

  const handleNotify = async () => {
    await sendMessage('SHOW_NOTIFICATION', {
      title: 'Hello!',
      message: settings?.greeting ?? 'Hello, World!',
    });
  };

  const handleHighlight = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (tab?.id) {
      await chrome.tabs.sendMessage(tab.id, { type: 'HIGHLIGHT_PAGE' });
    }
  };

  if (!settings || !session) {
    return (
      <div className="p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-w-[320px] bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6 transition-colors">
      <h1 className="text-xl font-bold mb-2">Extension Template</h1>
      <p className="text-gray-600 dark:text-indigo-200 mb-4">
        {settings.greeting}
      </p>

      <div className="bg-indigo-50 dark:bg-white/10 rounded-lg p-4 mb-4">
        <p className="text-sm text-indigo-600 dark:text-indigo-200">
          Click count this session:
        </p>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">
          {session.clickCount}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleClick}
          className="flex-1 bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors shadow-sm"
        >
          Click Me
        </button>
        <button
          type="button"
          onClick={handleNotify}
          className="flex-1 bg-purple-600 hover:bg-purple-500 dark:bg-purple-500 dark:hover:bg-purple-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors shadow-sm"
        >
          Notify
        </button>
        <button
          type="button"
          onClick={handleHighlight}
          className="flex-1 bg-green-600 hover:bg-green-500 dark:bg-green-500 dark:hover:bg-green-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors shadow-sm"
        >
          Highlight
        </button>
      </div>

      <p className="text-xs text-gray-500 dark:text-indigo-300 mt-4 text-center">
        Press Alt+Shift+S for Side Panel
      </p>
    </div>
  );
}
