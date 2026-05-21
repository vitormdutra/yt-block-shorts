/**
 * Settings Popup Logic - yt-block-shorts
 */

document.addEventListener('DOMContentLoaded', () => {
  const hideCommentsToggle = document.getElementById('hideCommentsToggle');
  const hideRecommendationsToggle = document.getElementById('hideRecommendationsToggle');
  const hideMerchToggle = document.getElementById('hideMerchToggle');
  const adsCountEl = document.getElementById('adsCount');
  const shortsCountEl = document.getElementById('shortsCount');

  // Load existing preferences and stats
  chrome.storage.local.get([
    'hideComments',
    'hideRecommendations',
    'hideMerch',
    'adsMitigatedCount',
    'shortsRedirectedCount'
  ], (result) => {
    // Default toggles to true if never set
    hideCommentsToggle.checked = result.hideComments !== false;
    hideRecommendationsToggle.checked = result.hideRecommendations !== false;
    hideMerchToggle.checked = result.hideMerch !== false;

    // Load stats counters (default to 0)
    adsCountEl.textContent = (result.adsMitigatedCount || 0).toLocaleString();
    shortsCountEl.textContent = (result.shortsRedirectedCount || 0).toLocaleString();
  });

  /**
   * Helper to save a setting and push class updates to YouTube tabs
   */
  const updateSetting = (key, isChecked, className) => {
    chrome.storage.local.set({ [key]: isChecked }, () => {
      console.log(`🧘 Settings updated: ${key} = ${isChecked}`);
      
      // Update active YouTube tabs instantly
      chrome.tabs.query({ url: '*://www.youtube.com/*' }, (tabs) => {
        tabs.forEach(tab => {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: (cls, force) => {
              if (document.body) {
                document.body.classList.toggle(cls, force);
              }
            },
            args: [className, isChecked]
          }).catch(err => {
            // Ignore execution errors on restricted/unloaded tabs
            console.warn(`Could not execute script on tab ${tab.id}:`, err);
          });
        });
      });
    });
  };

  // Attach change listeners
  hideCommentsToggle.addEventListener('change', () => {
    updateSetting('hideComments', hideCommentsToggle.checked, 'yt-block-shorts-hide-comments');
  });

  hideRecommendationsToggle.addEventListener('change', () => {
    updateSetting('hideRecommendations', hideRecommendationsToggle.checked, 'yt-block-shorts-hide-recommendations');
  });

  hideMerchToggle.addEventListener('change', () => {
    updateSetting('hideMerch', hideMerchToggle.checked, 'yt-block-shorts-hide-merch');
  });
});
