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
    chrome.storage.local.get(['hideComments', 'hideRecommendations', 'hideMerch'], (result) => {
      // Default to true if not set
      const hideComments = result.hideComments !== false;
      const hideRecommendations = result.hideRecommendations !== false;
      const hideMerch = result.hideMerch !== false;
      
      console.log(`🧘 Zen Mode settings: Comments=${hideComments}, Recs=${hideRecommendations}, Merch=${hideMerch}`);
      
      document.body.classList.toggle('yt-block-shorts-hide-comments', hideComments);
      document.body.classList.toggle('yt-block-shorts-hide-recommendations', hideRecommendations);
      document.body.classList.toggle('yt-block-shorts-hide-merch', hideMerch);
    });
  },

  /**
   * Initialize Zen Mode
   */
  initialize() {
    this.applyZenMode();

    // Listen for storage changes
    chrome.storage.onChanged.addListener((changes) => {
      if (changes.hideComments || changes.hideRecommendations || changes.hideMerch) {
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
