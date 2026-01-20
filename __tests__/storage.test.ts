import { describe, it, expect } from 'vitest';
import {
  getSettings,
  setSettings,
  getSessionState,
  incrementClickCount,
} from '@/shared/storage/helpers';

describe('Storage Helpers', () => {
  describe('getSettings', () => {
    it('returns default settings when storage is empty', async () => {
      const settings = await getSettings();

      expect(settings.theme).toBe('system');
      expect(settings.notificationsEnabled).toBe(true);
      expect(settings.greeting).toBe('Hello, World!');
    });

    it('returns stored settings when available', async () => {
      await setSettings({ theme: 'dark', greeting: 'Hi there!' });

      const settings = await getSettings();

      expect(settings.theme).toBe('dark');
      expect(settings.greeting).toBe('Hi there!');
      expect(settings.notificationsEnabled).toBe(true); // default
    });
  });

  describe('setSettings', () => {
    it('merges partial settings with existing', async () => {
      await setSettings({ theme: 'light' });
      await setSettings({ greeting: 'Custom greeting' });

      const settings = await getSettings();

      expect(settings.theme).toBe('light');
      expect(settings.greeting).toBe('Custom greeting');
    });
  });

  describe('getSessionState', () => {
    it('returns default session state when empty', async () => {
      const session = await getSessionState();

      expect(session.clickCount).toBe(0);
      expect(session.lastActiveTab).toBeUndefined();
    });
  });

  describe('incrementClickCount', () => {
    it('increments from 0 to 1', async () => {
      const count = await incrementClickCount();

      expect(count).toBe(1);
    });

    it('increments multiple times', async () => {
      await incrementClickCount();
      await incrementClickCount();
      const count = await incrementClickCount();

      expect(count).toBe(3);
    });
  });
});
