chrome.webNavigation.onBeforeNavigate.addListener(
    function(details) {
      try {
        const url = new URL(details.url);
        if (url.hostname === 'www.youtube.com' && url.pathname.startsWith('/shorts/')) {
          const videoId = url.pathname.split('/')[2];
          const redirectUrl = `https://www.youtube.com/watch?v=${videoId}`;
          chrome.tabs.update(details.tabId, { url: redirectUrl });
        }
      } catch (e) {
        console.error('URL parsing failed', e);
      }
    },
    { url: [{ hostEquals: 'www.youtube.com', pathPrefix: '/shorts/' }] }
  );
  