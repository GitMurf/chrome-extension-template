import {
  SettingsSchema,
  SessionStateSchema,
  type Settings,
  type SessionState,
} from './schemas';

const SETTINGS_KEY = 'settings';
const SESSION_KEY = 'session';

/**
 * Persistent Settings (chrome.storage.local)
 */
export async function getSettings(): Promise<Settings> {
  const result = await chrome.storage.local.get(SETTINGS_KEY);
  const parsed = SettingsSchema.safeParse(result[SETTINGS_KEY]);
  return parsed.success ? parsed.data : SettingsSchema.parse({});
}

export async function setSettings(settings: Partial<Settings>): Promise<void> {
  const current = await getSettings();
  await chrome.storage.local.set({
    [SETTINGS_KEY]: { ...current, ...settings },
  });
}

/**
 * Session State (chrome.storage.session)
 */
export async function getSessionState(): Promise<SessionState> {
  const result = await chrome.storage.session.get(SESSION_KEY);
  const parsed = SessionStateSchema.safeParse(result[SESSION_KEY]);
  return parsed.success ? parsed.data : SessionStateSchema.parse({});
}

export async function setSessionState(
  state: Partial<SessionState>
): Promise<void> {
  const current = await getSessionState();
  await chrome.storage.session.set({ [SESSION_KEY]: { ...current, ...state } });
}

export async function incrementClickCount(): Promise<number> {
  const session = await getSessionState();
  const newCount = session.clickCount + 1;
  await setSessionState({ clickCount: newCount });
  return newCount;
}
