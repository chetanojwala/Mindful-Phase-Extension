# 🌿 Mindful Pause — Mood & Grounding Chrome Extension

**Mindful Pause** is a Chrome Extension built with **Manifest V3** that provides accessible mindfulness and grounding tools directly through Chrome's **Side Panel**.

The extension combines mood check-ins, guided box breathing, sensory grounding exercises, and daily streak tracking in a calming, user-friendly interface.

---

## ✨ Features

### 🎭 Mood Check-in

* Track your current emotional state:

  * 😊 Happy
  * 😌 Calm
  * 😣 Stressed
  * 😟 Anxious
  * 😴 Tired
  * 😔 Sad
* Receive mood-specific affirmations and wellness recommendations.
* Store mood activity locally for future reference.

### 🫁 4-4-4-4 Box Breathing

A guided breathing exercise based on the box-breathing technique:

**Inhale → Hold → Exhale → Hold**

Each phase lasts 4 seconds.

* Animated breathing indicator
* Start, Pause, and Reset controls
* Cycle tracking
* Visual progress feedback

### 🌱 5-4-3-2-1 Sensory Grounding

An interactive grounding exercise that guides users through their five senses:

* 👁️ **5** things you can see
* ✋ **4** things you can touch
* 👂 **3** things you can hear
* 👃 **2** things you can smell
* 👅 **1** thing you can taste

The extension also provides physical relaxation prompts such as unclenching your jaw and relaxing your shoulders.

### 🔥 Daily Streak Tracking

* Tracks daily engagement automatically.
* Uses `chrome.storage.local` for persistent local data.
* Maintains the current streak.
* Records the user's best streak.

### 🎨 Glassmorphic UI & Dark Mode

* Modern glassmorphism-based interface
* Soft pastel gradients
* Smooth micro-animations
* Light and Dark modes
* Responsive Chrome Side Panel layout
* Designed specifically for the Side Panel experience

---

## 🖼️ Screenshots

### Mood Check-in

![Mood Check-in](screenshots/mood-checkin.png)

### Box Breathing

![Box Breathing](screenshots/box-breathing.png)

### Sensory Grounding

![Sensory Grounding](screenshots/grounding.png)

> **Note:** Update the image filenames above to match the actual screenshot filenames in your repository.

---

## 🧠 How It Works

Mindful Pause runs entirely as a Chrome Extension and uses Chrome's built-in extension APIs to provide an interactive Side Panel experience.

### User Flow

**Open Extension → Select a Tool → Complete Activity → Track Progress**

User activity is stored locally using:

```javascript
chrome.storage.local
```

This allows relevant information such as mood and streak data to persist between browser sessions without requiring an external backend or database.

---

## 🏗️ Extension Architecture

The project uses **Chrome Extension Manifest V3** and separates the extension into a background service worker and Side Panel interface.

```text
Chrome Extension
│
├── Background Service Worker
│   └── Handles extension and Side Panel events
│
├── Chrome Side Panel
│   ├── Mood Check-in
│   ├── Box Breathing
│   ├── Sensory Grounding
│   └── Daily Streak
│
└── chrome.storage.local
    └── Stores user activity locally
```

---

## 📂 Project Structure

```text
Mindful-Pause-Extension/
│
├── manifest.json
├── background.js
├── sidepanel.html
├── sidepanel.css
├── sidepanel.js
│
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
│
├── screenshots/
│   ├── mood-checkin.png
│   ├── box-breathing.png
│   └── grounding.png
│
└── README.md
```

### Key Files

| File             | Purpose                                                           |
| ---------------- | ----------------------------------------------------------------- |
| `manifest.json`  | Manifest V3 configuration, permissions, and Side Panel setup      |
| `background.js`  | Background service worker and extension event handling            |
| `sidepanel.html` | Main Side Panel interface and structure                           |
| `sidepanel.css`  | UI styling, glassmorphism, animations, and dark mode              |
| `sidepanel.js`   | Mood tracking, breathing timer, grounding flow, and storage logic |
| `icons/`         | Chrome extension icons                                            |
| `screenshots/`   | Project screenshots used for documentation                        |

---

## 🛠️ Technology Stack

* **HTML5**
* **CSS3**

  * CSS Variables
  * Glassmorphism
  * CSS Animations
  * Responsive layouts
* **Vanilla JavaScript (ES6+)**
* **Chrome Extension Manifest V3**
* **Chrome Side Panel API**
* **Chrome Storage API**

  * `chrome.storage.local`

---

## 🚀 Installation

Because Mindful Pause is a Chrome Extension rather than a hosted web application, it can be tested locally using Chrome's **Load Unpacked** feature.

### 1. Clone the Repository

```bash
git clone <YOUR-GITHUB-REPOSITORY-URL>
cd Mindful-Pause-Extension
```

### 2. Open Chrome Extensions

Navigate to:

```text
chrome://extensions/
```

### 3. Enable Developer Mode

Turn on **Developer mode** in the top-right corner.

### 4. Load the Extension

Click:

**Load unpacked → Select the `Mindful-Pause-Extension` folder**

### 5. Open Mindful Pause

Click the extension icon and open the Chrome Side Panel to start using the extension.

---

## 🔐 Privacy

Mindful Pause is designed to operate locally within the browser.

* No external backend is required.
* User activity is stored locally using `chrome.storage.local`.
* No account or sign-in is required.
* No personal data needs to be sent to an external server.

---

## 🎯 Project Goals

This project explores how browser APIs, interactive UI design, and AI-assisted development can be combined to create a practical mindfulness and productivity tool.

### Key Learning Areas

* Chrome Extension development
* Manifest V3 architecture
* Chrome Side Panel API
* Browser storage and client-side state management
* Interactive UI development
* Responsive interface design
* Local data persistence
* User-centered product design

---

## 🔮 Future Improvements

Potential future enhancements include:

* 📊 Mood analytics and visualizations
* 🔔 Optional mindfulness reminders
* ☁️ Cross-device synchronization
* 🎯 Personalized mindfulness recommendations
* 📈 More detailed habit tracking
* 🎙️ Guided audio breathing exercises

---

## 👨‍💻 Project

**Mindful Pause — Mood & Grounding Assistant**

Built with:

**Manifest V3 · Vanilla JavaScript · HTML5 · CSS3 · Chrome Extension APIs**

**Repository:** [GitHub](YOUR-GITHUB-REPOSITORY-URL)

---

## ⭐ If You Found This Project Interesting

Feel free to explore the repository and try the extension locally using Chrome's **Load Unpacked** option.
