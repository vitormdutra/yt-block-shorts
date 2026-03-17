/**
 * Centralized Selector Registry for yt-block-shorts
 * 
 * All DOM selectors must be defined here to facilitate surgical maintenance
 * when YouTube updates its internal layout.
 */

window.SELECTORS = {
  // --- SHORTS ELEMENTS ---
  SHORTS_SHELF: "ytd-reel-shelf-renderer", // Shorts shelf on homepage
  SHORTS_ITEM: "ytd-reel-item-renderer", // Individual Shorts video items
  SHORTS_LINKS: 'a[href^="/shorts"]', // Links pointing to /shorts/
  SHORTS_MINI_GUIDE: 'ytd-mini-guide-entry-renderer[aria-label="Shorts"]', // mini sidebar button
  SHORTS_GUIDE_ENTRY: 'ytd-guide-entry-renderer:has(a[href^="/shorts"])', // standard sidebar button
  SHORTS_CHANNEL_TAB: 'tp-yt-paper-tab[title="Shorts"]', // Shorts tab in channel pages
  SHORTS_ENDPOINT: '#endpoint[title="Shorts"]', // specific menu endpoint
  RICH_SECTION: "ytd-rich-section-renderer", // Container for various shelves

  // --- AD MITIGATION ---
  AD_OVERLAY_CONTAINER: ".ytp-ad-overlay-container",
  AD_PLAYER_OVERLAY_LAYOUT: ".ytp-ad-player-overlay-layout",
  VIDEO_ADS: ".video-ads",
  AD_MODULE: ".ytp-ad-module",
  PLAYER_ADS: "#player-ads",
  AD_TEXT: ".ytp-ad-text",
  AD_SKIP_BUTTON_CONTAINER: ".ytp-ad-skip-button-container",
  AD_SKIP_BUTTON: ".ytp-ad-skip-button",
  PLAYER_VIDEO: "video",
  AD_SHOWING: ".ad-showing",

  // --- UI ELEMENTS (ZEN MODE READY) ---
  YOUTUBE_LOGO: "a#logo", // For root rerouting
  HOME_LINK: 'a#endpoint[href="/"]', // Home button to be redirected
  SUBSCRIPTIONS_LINK: 'a#endpoint[href="/feed/subscriptions"]',
  
  // ZEN MODE SELECTORS
  COMMENTS: "#comments",
  RELATED_VIDEOS: "#secondary",
  SECONDARY_RESULTS: "ytd-watch-next-secondary-results-renderer",
  CHAT: "#chat",
  MERCH_SHELF: "#merchandise-shelf",
  TICKET_SHELF: "#ticket-shelf",

  // Containers for Scoped MutationObservers
  GRID_CONTAINER: "ytd-rich-grid-renderer",
  PAGE_MANAGER: "ytd-page-manager",
};
