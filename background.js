/**
 * Redirect Brain (Service Worker) - yt-block-shorts
 *
 * declarativeNetRequest (rules/redirect-rules.json) handles cold/full-navigation
 * loads with zero flicker. But YouTube's home/Shorts navigation is mostly
 * client-side (history.pushState) - it never hits the network as a main_frame
 * request, so DNR can't see it. This listener catches those SPA transitions.
 */

const YOUTUBE_HOST = 'www.youtube.com';

/**
 * Increment the Shorts redirection counter in local storage
 */
function incrementShortsRedirected() {
  chrome.storage.local.get(['shortsRedirectedCount'], (result) => {
    const current = result.shortsRedirectedCount || 0;
    chrome.storage.local.set({ shortsRedirectedCount: current + 1 });
  });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (!changeInfo.url) return;

  try {
    const url = new URL(changeInfo.url);
    if (url.hostname !== YOUTUBE_HOST) return;

    // Shorts Redirection (/shorts/xyz -> /watch?v=xyz)
    if (url.pathname.startsWith('/shorts/')) {
      const videoId = url.pathname.split('/')[2];
      if (videoId) {
        const redirectUrl = `https://${YOUTUBE_HOST}/watch?v=${videoId}`;
        console.log(`⏩ SPA Redirect: ${changeInfo.url} -> ${redirectUrl}`);
        incrementShortsRedirected();
        chrome.tabs.update(tabId, { url: redirectUrl });
      }
      return;
    }

    // Root Redirect (youtube.com/ -> subscriptions), only on the exact root URL
    if (url.pathname === '/' && !url.search && !url.hash) {
      const redirectUrl = `https://${YOUTUBE_HOST}/feed/subscriptions`;
      console.log(`⏩ Root Reroute triggered: ${redirectUrl}`);
      chrome.tabs.update(tabId, { url: redirectUrl });
    }
  } catch (e) {
    // Not a valid URL
  }
});

console.log('🧠 background.js initialized');