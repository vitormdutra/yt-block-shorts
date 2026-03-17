/**
 * UI Sanitizer Module - yt-block-shorts
 * 
 * Responsbile for surgical removal of distracting elements 
 * that are not caught by static CSS (dynamic shelves).
 */

const uiSanitizer = {
  /**
   * Remove shelves that say "Shorts" in their title
   */
  removeShortsSections() {
    const sections = document.querySelectorAll(window.SELECTORS.RICH_SECTION);
    sections.forEach(el => {
      const title = el.querySelector("h2")?.textContent?.toLowerCase();
      if (title?.includes("shorts")) {
        console.log("✂️ Surgical kill: Removing 'Shorts' shelf container");
        el.remove();
      }
    });

    // Also handle mini-shelves in search results if any
    document.querySelectorAll(window.SELECTORS.SHORTS_SHELF).forEach(el => el.remove());
  },

  /**
   * Scoped observer for the grid container
   */
  initialize() {
    // Initial hit
    this.removeShortsSections();

    // Observe heavy containers
    const gridContainer = document.querySelector(window.SELECTORS.GRID_CONTAINER);
    if (gridContainer) {
      console.log("🔭 UI Observer: Targeting rich-grid-renderer");
      const observer = new MutationObserver(() => this.removeShortsSections());
      observer.observe(gridContainer, { childList: true, subtree: true });
    } else {
      // Fallback: search for grid when it appears
      const bodyObserver = new MutationObserver(() => {
        const grid = document.querySelector(window.SELECTORS.GRID_CONTAINER);
        if (grid) {
          console.log("🔭 UI Observer (Late Hook): Grid found");
          this.initialize();
          bodyObserver.disconnect();
        }
      });
      bodyObserver.observe(document.body, { childList: true });
    }
  }
};

// Start sanitizer
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => uiSanitizer.initialize());
} else {
  uiSanitizer.initialize();
}
