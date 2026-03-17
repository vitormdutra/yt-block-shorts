/**
 * Redirect Brain (Service Worker) - yt-block-shorts
 * 
 * Handles URL redirection for cold loads (if DNR fails) 
 * and internal SPA transitions.
 */

const YOUTUBE_HOST = 'www.youtube.com';

/**
 * Handle internal SPA transitions via onUpdated
 */
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    try {
      const url = new URL(changeInfo.url);
      if (url.hostname === YOUTUBE_HOST) {
        
        // 1. Shorts Redirection (/shorts/xyz -> /watch?v=xyz)
        if (url.pathname.startsWith('/shorts/')) {
          const videoId = url.pathname.split('/')[2];
          if (videoId) {
            const redirectUrl = `https://${YOUTUBE_HOST}/watch?v=${videoId}`;
            console.log(`⏩ SPA Redirect: ${changeInfo.url} -> ${redirectUrl}`);
            chrome.tabs.update(tabId, { url: redirectUrl });
          }
        }

        // 2. Root Redirect (youtube.com/ -> subscriptions)
        // Only if it's EXACTLY the root URL
        if (url.pathname === '/' && !url.search && !url.hash) {
          const redirectUrl = `https://${YOUTUBE_HOST}/feed/subscriptions`;
          console.log(`⏩ Root Reroute triggered: ${redirectUrl}`);
          chrome.tabs.update(tabId, { url: redirectUrl });
        }
      }
    } catch (e) {
      // Not a valid URL
    }
  }
});

/**
 * Handle "On-Before-Navigate" for broader capture 
 */
chrome.webNavigation.onBeforeNavigate.addListener(
  (details) => {
    // Basic filter already applied in listener options
    try {
      const url = new URL(details.url);
      const videoId = url.pathname.split('/')[2];
      if (videoId) {
        const redirectUrl = `https://${YOUTUBE_HOST}/watch?v=${videoId}`;
        chrome.tabs.update(details.tabId, { url: redirectUrl });
      }
    } catch (e) {}
  },
  { url: [{ hostEquals: YOUTUBE_HOST, pathPrefix: '/shorts/' }] }
);

console.log('🧠 background.js initialized');