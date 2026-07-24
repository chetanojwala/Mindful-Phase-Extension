# 🌿 Mindful Pause – Mood & Grounding Assistant

**Mindful Pause** is a complete, modern Chrome Extension (Manifest V3) designed to help you ground yourself, manage stress, practice box breathing, track your mood, and cultivate daily mindfulness habits directly within Chrome's Side Panel.

---

## ✨ Features

1. **🎭 Mood Check-in**
   - Track your current emotional state (**Happy, Calm, Stressed, Anxious, Tired, Sad**).
   - Receive instant uplifting affirmations and tailored wellness recommendations based on your selection.
   - Keep a history of your daily check-ins.

2. **🫁 4-4-4-4 Box Breathing Exercise**
   - Guided breathing timer with smooth animated breathing circle (**Inhale 4s → Hold 4s → Exhale 4s → Hold 4s**).
   - Interactive controls: **Start**, **Pause**, **Reset**.
   - Cycle tracking and visual progress indicators.

3. **🌱 5-4-3-2-1 Sensory Grounding Technique**
   - Step-by-step interactive grounding guide for anxiety reduction:
     - 👁️ 5 things you can **see**
     - ✋ 4 things you can **touch**
     - 👂 3 things you can **hear**
     - 👃 2 things you can **smell**
     - 👅 1 thing you can **taste**
   - Rotating physical relaxation prompts (*e.g., Unclench your jaw, drop your shoulders*).

4. **🔥 Daily Streak Counter**
   - Automatically tracks continuous daily activity using `chrome.storage.local`.
   - Maintains your current streak and logs your best streak record.

5. **🎨 Modern Glassmorphic UI & Dark Mode**
   - Ambient soft pastel gradients, glassmorphism cards (`backdrop-filter`), smooth micro-animations.
   - Seamless **Light Mode** and **Dark Mode** toggle.
   - Specifically optimized for Chrome's Side Panel layout.

---

## 🚀 How to Load into Chrome (Load Unpacked)

1. Open **Google Chrome** and navigate to `chrome://extensions/`.
2. Enable **Developer mode** using the toggle switch in the top-right corner.
3. Click the **Load unpacked** button in the top-left corner.
4. Select this project folder (`Mindful-Pause-Extension`).
5. Click the extension icon in your Chrome toolbar or open the **Side Panel** to start your mindful pause!

---

## 📂 Project Structure

```
Mindful-Pause-Extension/
│── manifest.json       # Manifest V3 configuration (sidePanel, permissions, service worker)
│── background.js       # Background service worker handling side panel click events
│── sidepanel.html      # Glassmorphic UI layout & tab structure
│── sidepanel.css       # Complete CSS design system, dark mode & animations
│── sidepanel.js        # Core logic: Mood tracker, breathing timer, grounding, chrome.storage
│── icons/              # Extension PNG icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md           # Project documentation
```

---

## 🛠️ Technology Stack

- **HTML5** & **CSS3** (Vanilla CSS with variables, glassmorphism, animations)
- **Vanilla JavaScript** (ES6+)
- **Chrome Extension API Manifest V3** (`chrome.sidePanel`, `chrome.storage.local`)
