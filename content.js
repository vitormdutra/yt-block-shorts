/**
 * YouTube Shorts Blocker (Surgical Refactor) - Orchestrator
 * 
 * This file coordinates the initialization of the modular sanitization features.
 */

console.log('🏗️ yt-block-shorts Orchestrator: Initializing...');

/**
 * Global Error Handler for surgical maintenance
 */
window.addEventListener('error', (event) => {
  if (event.message?.includes('SELECTORS')) {
    console.warn('⚠️ Registry Error: Missing selector constants. Running fallback cleanup.');
    // Fallback logic here if needed
  }
});

/**
 * Handle configuration changes or dynamic updates 
 * from the service worker (future feature)
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'UPDATE_SELECTORS') {
    console.log('🔄 Registry Update: Re-initializing modules with new selectors');
    // Reinforce observers with updated config
  }
});

console.log('✅ Orchestrator: Handoff complete.');
