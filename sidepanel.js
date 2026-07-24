// Mindful Pause - Main Extension Logic

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements ---
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  
  // Streak Elements
  const streakCountElem = document.getElementById('streakCount');
  const statsCurrentStreak = document.getElementById('statsCurrentStreak');
  const statsBestStreak = document.getElementById('statsBestStreak');
  const statsTotalBreathing = document.getElementById('statsTotalBreathing');
  const statsTotalGrounding = document.getElementById('statsTotalGrounding');

  // Mood Elements
  const moodCards = document.querySelectorAll('.mood-card');
  const moodResult = document.getElementById('moodResult');
  const selectedMoodEmoji = document.getElementById('selectedMoodEmoji');
  const selectedMoodTitle = document.getElementById('selectedMoodTitle');
  const moodTimestamp = document.getElementById('moodTimestamp');
  const moodAffirmation = document.getElementById('moodAffirmation');
  const moodRecommendation = document.getElementById('moodRecommendation');
  const suggestedActionBtn = document.getElementById('suggestedActionBtn');
  const moodHistoryList = document.getElementById('moodHistoryList');

  // Breathing Elements
  const breathingCircle = document.getElementById('breathingCircle');
  const breathingGlow = document.getElementById('breathingGlow');
  const breathPhaseText = document.getElementById('breathPhaseText');
  const breathTimerText = document.getElementById('breathTimerText');
  const breathSubtext = document.getElementById('breathSubtext');
  const startBreathBtn = document.getElementById('startBreathBtn');
  const pauseBreathBtn = document.getElementById('pauseBreathBtn');
  const resetBreathBtn = document.getElementById('resetBreathBtn');
  const cycleCountElem = document.getElementById('cycleCount');
  const targetCyclesElem = document.getElementById('targetCycles');
  const cycleProgressBar = document.getElementById('cycleProgressBar');

  // Grounding Elements
  const completeGroundingBtn = document.getElementById('completeGroundingBtn');
  const nextRelaxPromptBtn = document.getElementById('nextRelaxPromptBtn');
  const relaxPromptText = document.getElementById('relaxPromptText');
  const resetDataBtn = document.getElementById('resetDataBtn');

  // --- Data & State ---
  const MOOD_DATA = {
    happy: {
      title: "Happy & Vibrant",
      emoji: "✨",
      affirmation: "Joy is a wonderful energy. Share your warmth or save a piece of this brightness for yourself.",
      recommendation: "Channel your positive energy into a brief 5-4-3-2-1 sensory appreciation walk.",
      targetTab: "grounding"
    },
    calm: {
      title: "Calm & Peaceful",
      emoji: "🌊",
      affirmation: "Stillness is your superpower. Allow yourself to rest deeply in this tranquility.",
      recommendation: "Maintain your inner harmony with a soothing 4-4-4-4 box breathing cycle.",
      targetTab: "breathing"
    },
    stressed: {
      title: "Stressed & Overwhelmed",
      emoji: "⚡",
      affirmation: "This feeling is temporary. You don't have to carry every responsibility all at once.",
      recommendation: "Use Box Breathing right now to activate your body's natural parasympathetic calm response.",
      targetTab: "breathing"
    },
    anxious: {
      title: "Anxious & Restless",
      emoji: "🌀",
      affirmation: "You are safe in this exact moment. Take it one single second at a time.",
      recommendation: "Anchor your focus in your physical surroundings using the 5-4-3-2-1 Grounding exercise.",
      targetTab: "grounding"
    },
    tired: {
      title: "Tired & Drained",
      emoji: "🌙",
      affirmation: "Your body is asking for gentleness. Give yourself permission to slow down.",
      recommendation: "Unclench your muscles with physical relaxation check-ins and gentle breathing.",
      targetTab: "breathing"
    },
    sad: {
      title: "Sad & Heavy",
      emoji: "🌧️",
      affirmation: "It is okay to feel sad. Be soft with yourself, just as you would be with a good friend.",
      recommendation: "Try a gentle sensory grounding session to bring soft focus back to the present.",
      targetTab: "grounding"
    }
  };

  const RELAXATION_PROMPTS = [
    "Drop your shoulders away from your ears and unclench your jaw.",
    "Softly rest your eyes and smooth out any tension in your forehead.",
    "Uncurl your fingers and feel your palms open and relaxed.",
    "Rest both feet flat on the floor and feel the solid earth supporting you.",
    "Take a deep belly breath and feel your ribcage gently expand.",
    "Release the tension in your neck with a tiny, slow head tilt."
  ];

  let currentRelaxIndex = 0;
  let recommendedTab = 'breathing';

  // --- Box Breathing State ---
  const PHASES = [
    { name: 'Inhale', duration: 4, class: 'inhale', subtext: 'Breathe in slowly through your nose...' },
    { name: 'Hold', duration: 4, class: 'hold-in', subtext: 'Hold your breath gently...' },
    { name: 'Exhale', duration: 4, class: 'exhale', subtext: 'Release slowly through your mouth...' },
    { name: 'Hold', duration: 4, class: 'hold-out', subtext: 'Rest comfortably before next breath...' }
  ];

  let currentPhaseIndex = 0;
  let phaseSecondsLeft = 4;
  let breathingInterval = null;
  let isBreathingRunning = false;
  let completedCycles = 0;
  const TARGET_CYCLES = 4;

  // --- App Initialization ---
  initApp();

  function initApp() {
    setupTabNavigation();
    setupThemeToggle();
    setupMoodCheckIn();
    setupBoxBreathing();
    setupGrounding();
    loadStoredData();
  }

  // --- Tab Navigation ---
  function setupTabNavigation() {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        switchTab(targetTab);
      });
    });
  }

  function switchTab(tabId) {
    tabBtns.forEach(btn => {
      const isTarget = btn.getAttribute('data-tab') === tabId;
      btn.classList.toggle('active', isTarget);
      btn.setAttribute('aria-selected', isTarget);
    });

    tabPanels.forEach(panel => {
      panel.classList.toggle('active', panel.id === `panel-${tabId}`);
    });
  }

  // --- Theme Toggle ---
  function setupThemeToggle() {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      saveData({ theme: newTheme });
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  // --- Mood Check-in ---
  function setupMoodCheckIn() {
    moodCards.forEach(card => {
      card.addEventListener('click', () => {
        const moodKey = card.getAttribute('data-mood');
        selectMood(moodKey);
      });
    });

    suggestedActionBtn.addEventListener('click', () => {
      switchTab(recommendedTab);
    });
  }

  function selectMood(moodKey) {
    const data = MOOD_DATA[moodKey];
    if (!data) return;

    moodCards.forEach(c => c.classList.remove('selected'));
    const selectedCard = document.querySelector(`.mood-card[data-mood="${moodKey}"]`);
    if (selectedCard) selectedCard.classList.add('selected');

    selectedMoodEmoji.textContent = data.emoji;
    selectedMoodTitle.textContent = data.title;
    moodTimestamp.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    moodAffirmation.textContent = `"${data.affirmation}"`;
    moodRecommendation.textContent = data.recommendation;
    recommendedTab = data.targetTab;

    moodResult.classList.remove('hidden');

    // Save mood entry
    const moodEntry = {
      mood: moodKey,
      emoji: data.emoji,
      title: data.title,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toISOString().split('T')[0]
    };

    updateMoodHistory(moodEntry);
    checkAndUpdateStreak();
  }

  function updateMoodHistory(entry) {
    getStoredData(['moodHistory'], (result) => {
      let history = result.moodHistory || [];
      history.unshift(entry);
      history = history.slice(0, 10); // Keep last 10 entries
      saveData({ moodHistory: history });
      renderMoodHistory(history);
    });
  }

  function renderMoodHistory(history) {
    if (!history || history.length === 0) {
      moodHistoryList.innerHTML = '<li class="empty-log">No mood check-ins recorded yet today.</li>';
      return;
    }

    moodHistoryList.innerHTML = history.map(item => `
      <li class="history-item">
        <span>${item.emoji} <strong>${item.title}</strong></span>
        <span class="timestamp">${item.time}</span>
      </li>
    `).join('');
  }

  // --- Box Breathing ---
  function setupBoxBreathing() {
    startBreathBtn.addEventListener('click', startBreathing);
    pauseBreathBtn.addEventListener('click', pauseBreathing);
    resetBreathBtn.addEventListener('click', resetBreathing);
  }

  function startBreathing() {
    if (isBreathingRunning) return;
    isBreathingRunning = true;
    startBreathBtn.disabled = true;
    pauseBreathBtn.disabled = false;
    breathingGlow.classList.add('inhale');

    updatePhaseDisplay();

    breathingInterval = setInterval(() => {
      phaseSecondsLeft--;
      if (phaseSecondsLeft <= 0) {
        // Move to next phase
        currentPhaseIndex = (currentPhaseIndex + 1) % PHASES.length;
        phaseSecondsLeft = PHASES[currentPhaseIndex].duration;

        // Check cycle completion (after phase 3 -> hold out)
        if (currentPhaseIndex === 0) {
          completedCycles++;
          updateCycleProgress();
          if (completedCycles >= TARGET_CYCLES) {
            finishBreathingSession();
            return;
          }
        }
      }
      updatePhaseDisplay();
    }, 1000);
  }

  function pauseBreathing() {
    if (!isBreathingRunning) return;
    isBreathingRunning = false;
    clearInterval(breathingInterval);
    startBreathBtn.disabled = false;
    pauseBreathBtn.disabled = true;
    breathPhaseText.textContent = "Paused";
    breathSubtext.textContent = "Tap Start to resume";
    breathingGlow.classList.remove('inhale');
  }

  function resetBreathing() {
    pauseBreathing();
    currentPhaseIndex = 0;
    phaseSecondsLeft = 4;
    completedCycles = 0;
    updatePhaseDisplay();
    updateCycleProgress();
    breathPhaseText.textContent = "Ready";
    breathTimerText.textContent = "4";
    breathSubtext.textContent = "Tap Start to begin";
    breathingCircle.className = "breathing-circle";
  }

  function updatePhaseDisplay() {
    const phase = PHASES[currentPhaseIndex];
    breathPhaseText.textContent = phase.name;
    breathTimerText.textContent = phaseSecondsLeft;
    breathSubtext.textContent = phase.subtext;

    breathingCircle.className = `breathing-circle ${phase.class}`;
  }

  function updateCycleProgress() {
    cycleCountElem.textContent = completedCycles;
    const percentage = Math.min((completedCycles / TARGET_CYCLES) * 100, 100);
    cycleProgressBar.style.width = `${percentage}%`;
  }

  function finishBreathingSession() {
    pauseBreathing();
    breathPhaseText.textContent = "Complete!";
    breathTimerText.textContent = "🎉";
    breathSubtext.textContent = "Great job! Mindful breath completed.";
    breathingCircle.className = "breathing-circle hold-in";

    // Increment stats
    getStoredData(['totalBreathing'], (result) => {
      const count = (result.totalBreathing || 0) + 1;
      saveData({ totalBreathing: count });
      statsTotalBreathing.textContent = count;
    });

    checkAndUpdateStreak();
  }

  // --- Grounding Exercise ---
  function setupGrounding() {
    nextRelaxPromptBtn.addEventListener('click', () => {
      currentRelaxIndex = (currentRelaxIndex + 1) % RELAXATION_PROMPTS.length;
      relaxPromptText.textContent = RELAXATION_PROMPTS[currentRelaxIndex];
    });

    completeGroundingBtn.addEventListener('click', () => {
      // Uncheck steps
      [1, 2, 3, 4, 5].forEach(num => {
        const chk = document.getElementById(`check-${num}`);
        if (chk) chk.checked = false;
      });

      // Clear text inputs
      document.querySelectorAll('#panel-grounding .input-field').forEach(input => input.value = '');

      // Increment total grounding count
      getStoredData(['totalGrounding'], (result) => {
        const count = (result.totalGrounding || 0) + 1;
        saveData({ totalGrounding: count });
        statsTotalGrounding.textContent = count;
      });

      checkAndUpdateStreak();

      completeGroundingBtn.textContent = "✨ Session Completed!";
      setTimeout(() => {
        completeGroundingBtn.textContent = "🎉 Complete Grounding Session";
      }, 2500);
    });

    resetDataBtn.addEventListener('click', () => {
      if (confirm("Are you sure you want to reset all your streak and history data?")) {
        clearStoredData(() => {
          location.reload();
        });
      }
    });
  }

  // --- Streak & Storage Helper Functions ---
  function checkAndUpdateStreak() {
    const todayStr = new Date().toISOString().split('T')[0];

    getStoredData(['lastActiveDate', 'currentStreak', 'bestStreak'], (data) => {
      let currentStreak = data.currentStreak || 0;
      let bestStreak = data.bestStreak || 0;
      const lastActive = data.lastActiveDate;

      if (!lastActive) {
        currentStreak = 1;
      } else if (lastActive === todayStr) {
        // Already active today
      } else {
        const lastDate = new Date(lastActive);
        const todayDate = new Date(todayStr);
        const diffDays = Math.round((todayDate - lastDate) / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          currentStreak += 1;
        } else if (diffDays > 1) {
          currentStreak = 1;
        }
      }

      if (currentStreak > bestStreak) {
        bestStreak = currentStreak;
      }

      saveData({
        lastActiveDate: todayStr,
        currentStreak: currentStreak,
        bestStreak: bestStreak
      });

      updateStreakUI(currentStreak, bestStreak);
    });
  }

  function updateStreakUI(current, best) {
    streakCountElem.textContent = current;
    statsCurrentStreak.textContent = current;
    statsBestStreak.textContent = best;
  }

  function loadStoredData() {
    getStoredData(['theme', 'currentStreak', 'bestStreak', 'totalBreathing', 'totalGrounding', 'moodHistory'], (data) => {
      if (data.theme) {
        applyTheme(data.theme);
      }
      updateStreakUI(data.currentStreak || 0, data.bestStreak || 0);
      statsTotalBreathing.textContent = data.totalBreathing || 0;
      statsTotalGrounding.textContent = data.totalGrounding || 0;

      if (data.moodHistory) {
        renderMoodHistory(data.moodHistory);
      }
    });
  }

  // Universal Storage Handlers (works in Chrome extension context or standard localStorage fallback)
  function getStoredData(keys, callback) {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get(keys, callback);
    } else {
      const res = {};
      keys.forEach(k => {
        const val = localStorage.getItem(k);
        if (val) res[k] = JSON.parse(val);
      });
      callback(res);
    }
  }

  function saveData(obj) {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.set(obj);
    } else {
      Object.keys(obj).forEach(k => {
        localStorage.setItem(k, JSON.stringify(obj[k]));
      });
    }
  }

  function clearStoredData(callback) {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.clear(callback);
    } else {
      localStorage.clear();
      callback();
    }
  }
});
