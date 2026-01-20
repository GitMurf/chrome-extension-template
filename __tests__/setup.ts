import { vi, beforeEach } from 'vitest';

// Mock storage
const mockLocalStorage = new Map<string, unknown>();
const mockSessionStorage = new Map<string, unknown>();

// Mock Chrome API
const chromeMock = {
  storage: {
    local: {
      get: vi.fn((keys: string | string[]) => {
        const result: Record<string, unknown> = {};
        const keyArray = Array.isArray(keys) ? keys : [keys];
        for (const key of keyArray) {
          if (mockLocalStorage.has(key)) {
            result[key] = mockLocalStorage.get(key);
          }
        }
        return Promise.resolve(result);
      }),
      set: vi.fn((items: Record<string, unknown>) => {
        for (const [key, value] of Object.entries(items)) {
          mockLocalStorage.set(key, value);
        }
        return Promise.resolve();
      }),
      remove: vi.fn((keys: string | string[]) => {
        const keyArray = Array.isArray(keys) ? keys : [keys];
        for (const key of keyArray) {
          mockLocalStorage.delete(key);
        }
        return Promise.resolve();
      }),
    },
    session: {
      get: vi.fn((keys: string | string[]) => {
        const result: Record<string, unknown> = {};
        const keyArray = Array.isArray(keys) ? keys : [keys];
        for (const key of keyArray) {
          if (mockSessionStorage.has(key)) {
            result[key] = mockSessionStorage.get(key);
          }
        }
        return Promise.resolve(result);
      }),
      set: vi.fn((items: Record<string, unknown>) => {
        for (const [key, value] of Object.entries(items)) {
          mockSessionStorage.set(key, value);
        }
        return Promise.resolve();
      }),
      remove: vi.fn((keys: string | string[]) => {
        const keyArray = Array.isArray(keys) ? keys : [keys];
        for (const key of keyArray) {
          mockSessionStorage.delete(key);
        }
        return Promise.resolve();
      }),
    },
    onChanged: {
      addListener: vi.fn(),
    },
  },
  runtime: {
    sendMessage: vi.fn(),
    onMessage: {
      addListener: vi.fn(),
    },
    onInstalled: {
      addListener: vi.fn(),
    },
    openOptionsPage: vi.fn(),
  },
  tabs: {
    query: vi.fn(),
    sendMessage: vi.fn(),
  },
  sidePanel: {
    setPanelBehavior: vi.fn(),
    open: vi.fn(),
  },
  contextMenus: {
    create: vi.fn(),
    onClicked: {
      addListener: vi.fn(),
    },
  },
  commands: {
    onCommand: {
      addListener: vi.fn(),
    },
  },
  notifications: {
    create: vi.fn(),
  },
};

vi.stubGlobal('chrome', chromeMock);

beforeEach(() => {
  mockLocalStorage.clear();
  mockSessionStorage.clear();
  vi.clearAllMocks();
});
