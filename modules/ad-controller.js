/**
 * Ad Mitigation Module - yt-block-shorts
 * 
 * Implements "Stealth" ad rejection via playback acceleration (16x),
 * click triggers for skip buttons, and banner removal.
 * 
 * Includes "Auto-Mute" during ads to prevent audio distortion.
 */

const adController = {
  isAdMitigating: false,
  originalMutedState: false,
  originalPlaybackRate: 1,

  /**
   * Main ad mitigation logic
   */
  mitigateAds() {
    const video = document.querySelector(window.SELECTORS.PLAYER_VIDEO);
    const adShowing = document.querySelector(window.SELECTORS.AD_SHOWING);

    if (video) {
      if (adShowing) {
        // --- AD IS PLAYING ---
        if (!this.isAdMitigating) {
          // Entry point: Start mitigation
          console.log("⚡ Ad Detected: Starting Stealth Mitigation");
          this.isAdMitigating = true;
          this.originalMutedState = video.muted;
          this.originalPlaybackRate = video.playbackRate;
          
          video.muted = true;
          video.playbackRate = 16;
        } else {
          // Continuous ad presence: Ensure it stays muted and fast
          if (!video.muted) video.muted = true;
          if (video.playbackRate < 16) video.playbackRate = 16;
        }

        // Force the video to skip to end if it's longer than 0.5s left
        const duration = video.duration;
        if (Number.isFinite(duration) && video.currentTime < duration - 0.5) {
          video.currentTime = duration;
        }

        // 2. Click the skip button automatically (if present)
        const skipButton = document.querySelector(window.SELECTORS.AD_SKIP_BUTTON);
        if (skipButton) {
          console.log("⏩ Click: Triggering skip-ad-button");
          skipButton.click();
        }
      } else {
        // --- NO AD SHOWING ---
        if (this.isAdMitigating) {
          // Exit point: Restore original state
          console.log("🎬 Ad Finished: Restoring audio and speed");
          this.isAdMitigating = false;
          
          // Only restore if user hasn't manually unmuted during the transition
          video.muted = this.originalMutedState;
          
          // Reset speed to normal (or whatever it was)
          video.playbackRate = this.originalPlaybackRate > 10 ? 1 : this.originalPlaybackRate;
        }
      }
    }

    // 3. Remove overlay ads (the small banners)
    const overlays = document.querySelectorAll(window.SELECTORS.AD_OVERLAY_CONTAINER);
    overlays.forEach(el => el.remove());
  },

  /**
   * Scoped observer for the player area
   */
  initialize() {
    console.log("🚀 Ad Controller: Initializing stealth mitigation");
    this.mitigateAds();

    // Use a separate observer for the player manager to catch ad containers
    const playerManager = document.querySelector(window.SELECTORS.PAGE_MANAGER);
    if (playerManager) {
      const adObserver = new MutationObserver(() => this.mitigateAds());
      adObserver.observe(playerManager, { childList: true, subtree: true });
    } else {
      // Body fallback for player loads
      const bodyObserver = new MutationObserver(() => {
        if (document.querySelector(window.SELECTORS.PAGE_MANAGER)) {
          this.initialize();
          bodyObserver.disconnect();
        }
      });
      bodyObserver.observe(document.body, { childList: true });
    }
  }
};

// Start mitigation
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => adController.initialize());
} else {
  adController.initialize();
}
