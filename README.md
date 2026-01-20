# Chrome Extension Template

> **Framework-Free**: A "bleeding-edge" Chrome extension template built from the ground up using **Vite 8 Beta (Rolldown)** and the **Oxc toolchain**. Unlike many templates that rely on extension frameworks (like **WXT**, **CRXJS**, or **Plasmo**), this project is "hand rolled", giving you full control and maximum performance with the latest web standards and dev tooling.

A modern, production-ready "Hello World" demonstrating **all 8 major extension features** using a high-performance tech stack: Vite 8 (Beta w/ Rolldown), React 19, Tailwind 4, Zod 4, and Oxc dev tooling.

<img width="1686" height="1190" alt="image" src="https://github.com/user-attachments/assets/902f94c2-aca2-489d-a40d-a3d2ccbd7ba8" />

---

## ✨ Features

This template implements every major Chrome Extension capability:

| Feature                          | Description                                                                   |
| -------------------------------- | ----------------------------------------------------------------------------- |
| 🔲 **Action Popup**              | Click the toolbar icon for a quick UI with greeting and click counter         |
| 📐 **Side Panel**                | Persistent panel that survives tab navigation with real-time state            |
| ⚙️ **Options Page**              | Full settings page with theme selector, notifications toggle, custom greeting |
| 🧠 **Background Service Worker** | Event-driven brain handling messages, menus, and commands                     |
| 📝 **Content Scripts**           | Injected into every page for DOM access and highlighting                      |
| 🖱️ **Context Menus**             | Right-click menu items on text selections and the extension icon              |
| ⌨️ **Keyboard Shortcuts**        | `Alt+Shift+S` to toggle side panel, `Alt+Shift+D` for Demo notifications      |
| 🔔 **Notifications**             | System-level alerts triggered by shortcuts and context menus                  |

---

## 🛠️ Tech Stack

| Category       | Tool                                           | Why                                       |
| -------------- | ---------------------------------------------- | ----------------------------------------- |
| **Build**      | [Vite 8 Beta](https://vite.dev) + Rolldown     | Bleeding-edge bundler, ~10x faster builds |
| **UI**         | [React 19](https://react.dev)                  | Latest stable with concurrent features    |
| **Styling**    | [Tailwind CSS 4](https://tailwindcss.com)      | CSS-first config, no JS config file       |
| **Types**      | [tsgo](https://github.com/nicolo-ribaudo/tsgo) | TypeScript 7 Native Preview, 10x faster   |
| **Linting**    | [oxlint](https://oxc.rs)                       | 50-100x faster than ESLint                |
| **Formatting** | [oxfmt](https://oxc.rs)                        | 30x faster than Prettier                  |
| **Testing**    | [Vitest](https://vitest.dev)                   | Native Vite integration                   |
| **Validation** | [Zod 4](https://zod.dev)                       | Runtime type validation for storage       |

---

## 📸 Screenshots

### Popup

<!-- 📸 SCREENSHOT: Extension popup showing "Extension Template" header, greeting message, click counter with large number, and three buttons (Click Me, Notify, Highlight) -->
<img width="515" height="437" alt="image" src="https://github.com/user-attachments/assets/f113b52f-d702-4170-a1ab-dc8a85c0d352" />

### Side Panel

<!-- 📸 SCREENSHOT: Side panel showing "Side Panel" header, Current Settings section (Theme, Notifications, Greeting), Session State with large click count, and Increment Counter button -->
<img width="680" height="1200" alt="image" src="https://github.com/user-attachments/assets/d8b736fd-6d47-40db-b300-3e8081cc2d83" />

### Options Page

<!-- 📸 SCREENSHOT: Options page with "Extension Options" header, theme dropdown (System/Light/Dark), notifications toggle switch, custom greeting text input, and Save Settings button -->
<img width="727" height="639" alt="image" src="https://github.com/user-attachments/assets/d2d546bd-811d-4ee1-8e7e-367ff20fbb8c" />

### Dark Mode

<!-- 📸 SCREENSHOT: Any of the above pages in dark mode to demonstrate the theme system -->
<img width="578" height="682" alt="image" src="https://github.com/user-attachments/assets/9409b8bf-e726-4ce9-969b-fd4d109ca13a" />
<img width="657" height="682" alt="image" src="https://github.com/user-attachments/assets/51a773a5-0235-400e-abfc-0e329f03fd51" />

### Content Script Highlight

<!-- 📸 SCREENSHOT: A webpage with a green border outline effect (the highlight feature) -->
<img width="518" height="355" alt="image" src="https://github.com/user-attachments/assets/7bbbeccd-ba07-4731-b11f-66ee6f710f1f" />

---

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org) 22+
- [pnpm](https://pnpm.io) 9+ (configured with `save-exact=true`)
- Chrome 116+

### Installation

```bash
# Clone the repo
git clone https://github.com/GitMurf/chrome-extension-template.git
cd chrome-extension-template

# Install dependencies
pnpm install

# Build the extension
pnpm build
```

### Load in Chrome

1. Open `chrome://extensions/`
2. Enable **Developer mode** (toggle in top-right)
3. Click **Load unpacked**
4. Select the `dist/` folder

<!-- 📸 SCREENSHOT: Chrome extensions page with Developer mode enabled and the extension loaded, showing the extension card with icon and version -->
<img width="513" height="466" alt="image" src="https://github.com/user-attachments/assets/8d92842d-919f-4c4b-9d28-3d536733a245" />

---

## 📁 Project Structure

```
chrome-extension-template/
├── public/
│   ├── manifest.json       # Extension manifest (Manifest V3)
│   └── images/             # Extension icons (16, 48, 128px)
├── src/
│   ├── background/         # Service Worker (Feature 4)
│   ├── content/            # Content Script (Feature 5)
│   ├── popup/              # Action Popup UI (Feature 1)
│   ├── sidepanel/          # Side Panel UI (Feature 2)
│   ├── options/            # Options Page UI (Feature 3)
│   └── shared/             # Shared code
│       ├── storage/        # Zod schemas + typed helpers
│       ├── messaging/      # Type-safe message protocol
│       └── hooks/          # React hooks (useTheme)
├── __tests__/              # Vitest tests with Chrome API mocks
├── vite.config.ts          # Multi-entry build config
├── vitest.config.ts        # Test configuration
├── tsconfig.json           # Strict TypeScript
└── oxlint.json             # Linter rules
└── .oxfmtrc.json           # Formatting rules
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut      | Action                 |
| ------------- | ---------------------- |
| `Alt+Shift+E` | Open Popup             |
| `Alt+Shift+S` | Toggle Side Panel      |
| `Alt+Shift+D` | Show Demo Notification |

> Customize shortcuts at `chrome://extensions/shortcuts`

---

## 🧪 Development

```bash
# Watch mode (rebuilds on save)
pnpm dev

# Lint (oxlint)
pnpm lint

# Format (oxfmt)
pnpm fmt

# Type check (tsgo)
pnpm typecheck

# Run tests
pnpm test

# Build for testing in Chrome
pnpm build
```

After running `pnpm dev`, reload the extension in Chrome (`Ctrl+R` on the extensions page) to see changes.

---

## 🎨 Customization

### Change the Extension Name

Edit `public/manifest.json`:

```json
{
  "name": "Your Extension Name",
  "description": "Your description here"
}
```

### Add New Message Types

1. Add to `src/shared/messaging/types.ts`:

```typescript
export interface MessageMap {
  // ... existing messages
  YOUR_MESSAGE: { payload: { data: string }; response: { success: boolean } };
}
```

2. Handle in `src/background/index.ts`:

```typescript
case 'YOUR_MESSAGE':
  // Handle your message
  return { success: true };
```

### Modify Storage Schema

Edit `src/shared/storage/schemas.ts` with Zod:

```typescript
export const SettingsSchema = z.object({
  // ... existing fields
  yourNewField: z.string().default('value'),
});
```

---

## 📦 Building for Production

```bash
pnpm build
```

The `dist/` folder contains everything needed for Chrome Web Store submission:

- `manifest.json`
- `background.js`
- `content.js`
- `src/popup/index.html`
- `src/sidepanel/index.html`
- `src/options/index.html`
- `images/`
- `assets/`

---

## 🧩 Chrome APIs Used

| API                      | Permission      | Usage                       |
| ------------------------ | --------------- | --------------------------- |
| `chrome.storage.local`   | `storage`       | Persistent settings         |
| `chrome.storage.session` | `storage`       | Session state (click count) |
| `chrome.sidePanel`       | `sidePanel`     | Side panel UI               |
| `chrome.contextMenus`    | `contextMenus`  | Right-click menus           |
| `chrome.notifications`   | `notifications` | System alerts               |
| `chrome.commands`        | —               | Keyboard shortcuts          |
| `chrome.runtime`         | —               | Message passing             |
| `chrome.tabs`            | `activeTab`     | Tab communication           |

---

## 📄 License

[MIT](LICENSE)

---

## 🙏 Acknowledgments

- Built with modern tooling from the [Oxc](https://oxc.rs) project and the Vite ecosystem.
- Used the following Guides and Templates for inspiration:
    - https://www.artmann.co/articles/building-a-chrome-extension-with-vite-react-and-tailwind-css-in-2025
    - https://medium.com/@jamesprivett29/02-building-a-chrome-extension-template-using-vite-react-and-typescript-d5d9912f1b40
    - https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite
    - https://github.com/JohnBra/vite-web-extension
- See my Tweets on X about "coding in public": https://x.com/GitMurf/status/2013376160454058472
