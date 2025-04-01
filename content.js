function removeShortsElements() {
    const selectors = [
      "ytd-reel-shelf-renderer", // Seção de Shorts na home
      "ytd-reel-item-renderer", // Cada vídeo Shorts
      'a[href^="/shorts"]', // Links para Shorts
      'ytd-mini-guide-entry-renderer[aria-label="Shorts"]', // menu lateral (mini)
      'ytd-guide-entry-renderer:has(a[href^="/shorts"])', // menu lateral (padrão)
      'tp-yt-paper-tab[title="Shorts"]', // guia de navegação em canais
      '#endpoint[title="Shorts"]', // botão do menu lateral
    ];
  
    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => el.remove());
    });
  
    // 🔍 Remove seções com título "Shorts" dinamicamente
    document.querySelectorAll("ytd-rich-section-renderer").forEach(el => {
      const title = el.querySelector("h2")?.textContent?.toLowerCase();
      if (title?.includes("shorts")) el.remove();
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

function skipYoutubeAds() {
  const adSelectors = [
    ".ytp-ad-overlay-container",
    ".ytp-ad-player-overlay-layout",
    ".video-ads",
    ".ytp-ad-module",
    "#player-ads",
    ".ytp-ad-text",
    ".ytp-ad-skip-button-container",
  ];

  adSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => el.remove());
  });

  // Clica automaticamente no botão "Pular Anúncio"
  const skipButton = document.querySelector(".ytp-ad-skip-button");
  if (skipButton) {
    skipButton.click();
    console.log("⏩ Skip button clicado");
  }

  const video = document.querySelector("video");
  const adOverlay = document.querySelector(".ad-showing");

  if (video && adOverlay) {
    const duration = video.duration;
    const currentTime = video.currentTime;
  
    // Certifique-se que duration é um número válido
    if (Number.isFinite(duration) && currentTime < duration - 0.5) {
      video.currentTime = duration;
      console.log('⏩ Pulando ad via currentTime');
    }
  }  
}

// Executar também no carregamento
skipYoutubeAds();

// Observar o DOM para detectar anúncios dinâmicos
const adObserver = new MutationObserver(skipYoutubeAds);
adObserver.observe(document.body, { childList: true, subtree: true });
