/**
 * sidePanel.close() was added in Sept 2025 but not added to the @types/chrome yet
 * @see https://developer.chrome.com/docs/extensions/reference/api/sidePanel?hl=en#method-close
 */
declare namespace chrome.sidePanel {
  export function close(options: { windowId: number }): Promise<void>;
}
