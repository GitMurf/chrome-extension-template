import { z } from 'zod';

/**
 * User settings stored in chrome.storage.local
 * Persists across browser restarts
 */
export const SettingsSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']).default('system'),
  notificationsEnabled: z.boolean().default(true),
  greeting: z.string().default('Hello, World!'),
});
export type Settings = z.infer<typeof SettingsSchema>;

/**
 * Session state stored in chrome.storage.session
 * Survives service worker termination but clears on browser close
 */
export const SessionStateSchema = z.object({
  lastActiveTab: z.number().optional(),
  clickCount: z.number().default(0),
});
export type SessionState = z.infer<typeof SessionStateSchema>;
