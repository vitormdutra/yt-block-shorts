function removeShortsElements() {
    const selectors = [
      'ytd-reel-shelf-renderer', // Seção de Shorts na home
      'ytd-reel-item-renderer',  // Cada vídeo Shorts
      'a[href^="/shorts"]',      // Links para Shorts
      'ytd-mini-guide-entry-renderer[aria-label="Shorts"]', // menu lateral (mini)
      'ytd-guide-entry-renderer:has(a[href^="/shorts"])',   // menu lateral (padrão)
      'tp-yt-paper-tab[title="Shorts"]', // guia de navegação em canais
      '#endpoint[title="Shorts"]',       // botão do menu lateral
    ];
  
    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => el.remove());
    });
  }
  
  // Executar no carregamento
  removeShortsElements();
  
  // Reexecutar quando o DOM for modificado (SPA style)
  const observer = new MutationObserver(removeShortsElements);
  observer.observe(document.body, { childList: true, subtree: true });
  
  // Redirecionar se acessar Shorts por link
  function redirectIfShorts() {
    const path = window.location.pathname;
    if (path.startsWith("/shorts/")) {
      const videoId = path.split("/")[2];
      if (videoId) {
        window.location.replace(`https://www.youtube.com/watch?v=${videoId}`);
      }
    }
  }
  redirectIfShorts();
  
  let lastUrl = location.href;
  new MutationObserver(() => {
    const currentUrl = location.href;
    if (currentUrl !== lastUrl) {
      lastUrl = currentUrl;
      redirectIfShorts();
      removeShortsElements();
    }
  }).observe(document.body, { childList: true, subtree: true });
  