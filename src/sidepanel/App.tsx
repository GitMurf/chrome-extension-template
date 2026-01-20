import { useState, useEffect } from 'react';
import { sendMessage, useTheme } from '@/shared';
import type { Settings, SessionState } from '@/shared/storage';

export function App() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [session, setSession] = useState<SessionState | null>(null);

  useTheme(settings?.theme);

  useEffect(() => {
    // Establish connection to background to track if side panel is open
    const port = chrome.runtime.connect(undefined, { name: 'sidepanel' });

    // Send window ID to background for toggle state tracking
    chrome.windows.getCurrent().then((win) => {
      if (win.id !== undefined) {
        port.postMessage({ type: 'INIT_SIDEPANEL', windowId: win.id });
      }
    });

    sendMessage('GET_SETTINGS').then(setSettings);
    sendMessage('GET_SESSION').then(setSession);

    // Listen for storage changes to update in real-time
    const handleStorageChange = (changes: {
      [key: string]: chrome.storage.StorageChange;
    }) => {
      if (changes.settings) {
        sendMessage('GET_SETTINGS').then(setSettings);
      }
      if (changes.session) {
        sendMessage('GET_SESSION').then(setSession);
      }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);

    // Cleanup listener and connection on unmount
    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
      port.disconnect();
    };
  }, []);

  const handleIncrement = async () => {
    const result = await sendMessage('INCREMENT_CLICK');
    setSession((prev) => (prev ? { ...prev, clickCount: result.count } : null));
  };

  if (!settings || !session) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-4 transition-colors">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-6 transition-colors">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Side Panel</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Persistent extension panel
        </p>
      </header>

      <section className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-sm border border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold mb-2">Current Settings</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Theme:</span>
            <span className="capitalize">{settings.theme}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">
              Notifications:
            </span>
            <span>
              {settings.notificationsEnabled ? 'Enabled' : 'Disabled'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Greeting:</span>
            <span>{settings.greeting}</span>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-sm border border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold mb-2">Session State</h2>
        <div className="text-center py-4">
          <p className="text-5xl font-bold text-indigo-600 dark:text-indigo-400">
            {session.clickCount}
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Clicks this session
          </p>
        </div>
        <button
          type="button"
          onClick={handleIncrement}
          className="w-full bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 text-white font-semibold py-3 rounded-lg transition-colors shadow-sm"
        >
          Increment Counter
        </button>
      </section>

      <footer className="text-center text-xs text-gray-500 dark:text-gray-400">
        <p>This panel persists across tab navigation</p>
      </footer>
    </div>
  );
}
