/**
 * Zen Mode Module - yt-block-shorts
 * 
 * Handles absolute distraction-free viewing by suppressing 
 * comments, related videos, and chat.
 */

const zenMode = {
  /**
   * Apply Zen Mode configurations
   */
  applyZenMode() {
    chrome.storage.local.get(['zenModeEnabled'], (result) => {
      // For MVP, we'll assume it's ENABLED if the user asked for it
      const isEnabled = result.zenModeEnabled !== false; 
      
      if (isEnabled) {
        console.log("🧘 Zen Mode: Active. Suppressing engagement triggers.");
        document.body.classList.add('yt-block-shorts-zen');
      } else {
        document.body.classList.remove('yt-block-shorts-zen');
      }
    });
  },

  /**
   * Initialize Zen Mode
   */
  initialize() {
    this.applyZenMode();

    // Listen for storage changes (for the future popup)
    chrome.storage.onChanged.addListener((changes) => {
      if (changes.zenModeEnabled) {
        this.applyZenMode();
      }
    });
  }
};

// Start Zen Mode
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => zenMode.initialize());
} else {
  zenMode.initialize();
}
