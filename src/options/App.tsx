import { useState, useEffect } from 'react';
import { sendMessage, useTheme } from '@/shared';
import type { Settings } from '@/shared/storage';

export function App() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [saved, setSaved] = useState(false);

  useTheme(settings?.theme);

  useEffect(() => {
    sendMessage('GET_SETTINGS').then(setSettings);

    // Listen for storage changes if they happen elsewhere
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

  const handleSave = async () => {
    if (!settings) return;
    await sendMessage('UPDATE_SETTINGS', settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!settings) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8 transition-colors">
        <p className="text-gray-900 dark:text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8 transition-colors">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Extension Options
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Configure your extension preferences
        </p>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg dark:shadow-2xl border border-gray-100 dark:border-gray-800 p-6 space-y-6">
          {/* Theme */}
          <div>
            <label
              htmlFor="theme-select"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Theme
            </label>
            <select
              id="theme-select"
              value={settings.theme}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  theme: e.target.value as Settings['theme'],
                })
              }
              className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            >
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between">
            <div>
              <label
                htmlFor="notifications-toggle"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Notifications
              </label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Enable system notifications
              </p>
            </div>
            <button
              id="notifications-toggle"
              type="button"
              onClick={() =>
                setSettings({
                  ...settings,
                  notificationsEnabled: !settings.notificationsEnabled,
                })
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.notificationsEnabled
                  ? 'bg-indigo-600 dark:bg-indigo-500'
                  : 'bg-gray-300 dark:bg-gray-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white dark:bg-gray-100 transition-transform ${
                  settings.notificationsEnabled
                    ? 'translate-x-6'
                    : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Greeting */}
          <div>
            <label
              htmlFor="greeting-input"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Custom Greeting
            </label>
            <input
              id="greeting-input"
              type="text"
              value={settings.greeting}
              onChange={(e) =>
                setSettings({ ...settings, greeting: e.target.value })
              }
              className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              placeholder="Hello, World!"
            />
          </div>

          {/* Save Button */}
          <button
            type="button"
            onClick={handleSave}
            className="w-full bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 text-white font-semibold py-3 rounded-lg transition-colors shadow-sm"
          >
            {saved ? '✓ Saved!' : 'Save Settings'}
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Changes are stored in chrome.storage.local
        </p>
      </div>
    </div>
  );
}
