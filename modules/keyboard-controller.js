/**
 * Keyboard Controller Module - yt-block-shorts
 * 
 * Intercepts ArrowLeft, ArrowRight, and Spacebar keypresses on the watch page
 * to ensure they are directed to the player container. This prevents the browser
 * from scrolling the page when focus has shifted to the page body.
 */

const keyboardController = {
  /**
   * Initialize the keyboard listener
   */
  initialize() {
    console.log("⌨️ Keyboard Controller: Initializing key interceptor...");

    window.addEventListener('keydown', (event) => {
      // 1. Only intercept on watch page
      if (window.location.pathname !== '/watch') return;

      // 2. Only handle ArrowLeft, ArrowRight, and Spacebar
      const keysToIntercept = ['ArrowLeft', 'ArrowRight', ' '];
      if (!keysToIntercept.includes(event.key)) return;

      // 3. Do not intercept simulated events to avoid loops
      if (event.isTrusted === false) return;

      // 4. Do not intercept if user is typing in any input/textarea/editable element
      const activeEl = document.activeElement;
      const isEditable = activeEl && (
        activeEl.tagName === 'INPUT' ||
        activeEl.tagName === 'TEXTAREA' ||
        activeEl.isContentEditable ||
        activeEl.getAttribute('role') === 'textbox'
      );
      if (isEditable) return;

      const selector = window.SELECTORS?.PLAYER_CONTAINER || '#movie_player';
      const playerContainer = document.querySelector(selector);
      if (!playerContainer) return;

      // 5. If focus is already inside the player container, let YouTube handle it natively
      if (playerContainer.contains(activeEl)) return;

      // Prevent the page from scrolling/performing default browser action
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      // Refocus the player container
      playerContainer.focus();

      // Dispatch the identical event to the player container to trigger seeking/playback controls
      const simulatedEvent = new KeyboardEvent(event.type, {
        key: event.key,
        code: event.code,
        keyCode: event.keyCode,
        which: event.which,
        bubbles: true,
        cancelable: true,
        view: window,
        ctrlKey: event.ctrlKey,
        altKey: event.altKey,
        shiftKey: event.shiftKey,
        metaKey: event.metaKey
      });

      playerContainer.dispatchEvent(simulatedEvent);
      console.log(`⌨️ Keyboard Controller: Intercepted ${event.key} and redirected to player container`);
    }, true); // Use capture phase to intercept before page-level event listeners run
  }
};

// Start Keyboard Controller
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => keyboardController.initialize());
} else {
  keyboardController.initialize();
}
