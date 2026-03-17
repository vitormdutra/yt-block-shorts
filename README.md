# 🛡️ yt-block-shorts: Surgical YouTube Refactor

A premium, distraction-free YouTube experience. This extension transforms YouTube from an engagement-driven loop into a high-utility video player by surgically removing clutter, silencing ads, and eliminating addictive features.

![Zen Mode Icon](assets/icon128.png)

## 🚀 Key Features

### 🧘 Zen Mode (Total Focus)
A toggleable focus environment that cleans the player page:
- **Comments & Chat:** Hidden to prevent infinite scrolling.
- **Related Videos:** Suppressed to stop the rabbit hole.
- **Theater Mode:** Automatically centers the primary player for a cinematic experience.

### ✂️ Surgical UI Sanitization
- **Shorts Elimination:** Removes Shorts shelves, sidebar buttons, and search result reels.
- **Root Rerouting:** Navigating to `youtube.com/` takes you straight to your **Subscriptions Feed**.
- **Engagement Triggers:** Hides "Home" and "Shorts" navigation anchors.

### ⚡ Stealth Ad Mitigation
Enhanced rejection logic that outperforms traditional element removal:
- **Auto-Mute:** Silences the player as soon as an ad is detected.
- **16x Acceleration:** Fast-forwards through ads in split seconds.
- **Sound Restoration:** Automatically restores your original volume and speed once the video starts.

### 🧠 Modern Architecture (MV3)
- **High Performance:** Core logic runs under a 50ms mutation budget.
- **Zero-Flicker:** Uses early `document_start` CSS injection to hide elements before they render.
- **Surgical Maintenance:** Centralized `config/selectors.js` for rapid updates against YouTube's evolving DOM.

---

## 📂 Project Structure

```text
yt-block-shorts/
├── manifest.json             # Extension manifest (MV3)
├── background.js              # Service Worker (Redirection Brain)
├── content.js                 # Content Script Orchestrator
├── config/
│   └── selectors.js           # Centralized Selector Registry
├── modules/
│   ├── ui-sanitizer.js        # Home/Shorts removal logic
│   ├── ad-controller.js       # Stealth 16x Ad Mitigation
│   └── zen-mode.js            # Focus mode controller
├── styles/
│   └── main.css               # Static "Hide-at-Document-Start" rules
└── popup/                     # Glassmorphic settings interface
```

---

## 🛠️ Installation

1.  **Clone/Download** this repository.
2.  Open **Chrome** and navigate to `chrome://extensions/`.
3.  Enable **Developer Mode** (top right toggle).
4.  Click **Load unpacked** and select the root folder of this project.
5.  Pin the extension for easy access to **Zen Mode** settings.

---

## 📝 Usage

- **Redirection:** Just browse normally; `/shorts/` links and root `youtube.com/` will redirect automatically.
- **Ads:** When a video starts, you might see a brief black screen and no sound—this is the extension fast-forwarding an ad.
- **Zen Mode:** Click the extension icon in the toolbar to toggle absolute focus mode.

---

## 🛡️ Privacy & Principles

- **Zero Data Collection:** No browsing history is tracked or sent anywhere.
- **Least Privilege:** Uses only the minimum required permissions (`declarativeNetRequest`, `storage`, `webNavigation`).
- **Open Source:** Modular, readable, and vanilla—no hidden dependencies.

---

Made with 🧘 for a cleaner, intentional YouTube experience.
