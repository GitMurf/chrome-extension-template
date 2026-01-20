/**
 * Content Script - Injected into every page
 *
 * - DOM access
 * - Message passing to background
 * - Receiving messages from popup/sidepanel
 */

// Notify background that content script loaded
chrome.runtime
  .sendMessage({
    type: 'CONTENT_LOADED',
    payload: { url: window.location.href },
  })
  .then((response) => {
    if (response?.acknowledged) {
      // Do something after acknowledgment if needed.
    }
  })
  .catch(() => {
    // Background may not be ready yet on initial load
  });

// Listen for messages from popup/sidepanel
chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  switch (message.type) {
    case 'GET_PAGE_TITLE':
      sendResponse({ title: document.title });
      break;

    case 'HIGHLIGHT_PAGE':
      highlightPage();
      sendResponse({ success: true });
      break;

    case 'GET_PAGE_INFO':
      sendResponse({
        title: document.title,
        url: window.location.href,
        description: getMetaDescription(),
      });
      break;

    default:
    // Unknown
  }
  return true;
});

/**
 * Temporarily highlights the page with a green border
 * Just a dummy example feature to demonstrate capabilities in our Hello World
 */
function highlightPage(): void {
  const body = document.body;
  const originalOutline = body.style.outline;
  const originalOffset = body.style.outlineOffset;

  // Use !important via setProperty to override page styles
  body.style.setProperty('outline', '4px solid #4ade80', 'important');
  body.style.setProperty('outline-offset', '-4px', 'important');

  setTimeout(() => {
    body.style.outline = originalOutline;
    body.style.outlineOffset = originalOffset;
  }, 1000);
}

function getMetaDescription(): string {
  const meta = document.querySelector('meta[name="description"]');
  return meta?.getAttribute('content') ?? '';
}

// Mark that content script is loaded
(
  window as Window & { extensionTemplateLoaded?: boolean }
).extensionTemplateLoaded = true;
