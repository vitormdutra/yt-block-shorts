/**
 * Settings Popup Logic - yt-block-shorts
 */

document.addEventListener('DOMContentLoaded', () => {
  const zenToggle = document.getElementById('zenModeToggle');

  // Load existing preference
  chrome.storage.local.get(['zenModeEnabled'], (result) => {
    // Default to true if never set
    zenToggle.checked = result.zenModeEnabled !== false;
  });

  // Handle toggle change
  zenToggle.addEventListener('change', () => {
    const isEnabled = zenToggle.checked;
    
    // Save to storage
    chrome.storage.local.set({ zenModeEnabled: isEnabled }, () => {
      console.log(`🧘 Zen Mode ${isEnabled ? 'enabled' : 'disabled'}`);
      
      // Notify active tabs (optional, but good for instant feedback)
      chrome.tabs.query({ url: '*://www.youtube.com/*' }, (tabs) => {
        tabs.forEach(tab => {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: (enabled) => {
              if (enabled) {
                document.body.classList.add('yt-block-shorts-zen');
              } else {
                document.body.classList.remove('yt-block-shorts-zen');
              }
            },
            args: [isEnabled]
          });
        });
      });
    });
  });
});
