import { describe, it, expect } from 'vitest';
import { SettingsSchema, SessionStateSchema } from '@/shared/storage/schemas';

describe('Schemas', () => {
  describe('SettingsSchema', () => {
    it('parses empty object with defaults', () => {
      const result = SettingsSchema.parse({});

      expect(result.theme).toBe('system');
      expect(result.notificationsEnabled).toBe(true);
      expect(result.greeting).toBe('Hello, World!');
    });

    it('validates theme enum', () => {
      expect(() => SettingsSchema.parse({ theme: 'invalid' })).toThrow();
    });

    it('accepts valid theme values', () => {
      expect(SettingsSchema.parse({ theme: 'light' }).theme).toBe('light');
      expect(SettingsSchema.parse({ theme: 'dark' }).theme).toBe('dark');
      expect(SettingsSchema.parse({ theme: 'system' }).theme).toBe('system');
    });
  });

  describe('SessionStateSchema', () => {
    it('parses empty object with defaults', () => {
      const result = SessionStateSchema.parse({});

      expect(result.clickCount).toBe(0);
      expect(result.lastActiveTab).toBeUndefined();
    });

    it('accepts valid session data', () => {
      const result = SessionStateSchema.parse({
        clickCount: 42,
        lastActiveTab: 123,
      });

      expect(result.clickCount).toBe(42);
      expect(result.lastActiveTab).toBe(123);
    });
  });
});
