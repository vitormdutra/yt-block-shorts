# 🚫 YouTube Shorts & Ads Blocker

Extensão para Google Chrome (desktop) que remove completamente os vídeos Shorts da interface do YouTube, redireciona automaticamente os links de Shorts e pula anúncios de forma automática.

---

## 💻 Funcionalidades

✅ **Remove os Shorts do YouTube**:
- Seções de Shorts na página inicial
- Botão de Shorts no menu lateral
- Miniaturas e links com `/shorts`
- Seções com título "Shorts" detectadas dinamicamente

✅ **Redirecionamento automático**:
- URLs como `https://www.youtube.com/shorts/abc123` são convertidas para `https://www.youtube.com/watch?v=abc123`

✅ **Bloqueio de anúncios**:
- Remove overlays e elementos de propaganda
- Clica automaticamente no botão "Pular Anúncio"
- Pula vídeos de propaganda após 5 segundos de forma segura

---

## 🧱 Instalação (Chrome Desktop)

1. Baixe ou clone este repositório
2. Acesse `chrome://extensions/`
3. Ative o **Modo do Desenvolvedor**
4. Clique em **"Carregar sem compactação"**
5. Selecione a pasta do projeto

A extensão estará ativa automaticamente.

---

## 📂 Estrutura do projeto

```
yt-block-shorts/
├── manifest.json
├── background.js
└── content.js
```

---

## 🚧 Limitações

- A extensão funciona apenas em navegadores baseados em **Chromium no desktop**
- O pulo de anúncios acontece após 5 segundos, respeitando o tempo mínimo do botão "Pular"

---

Feito com 💻 para um YouTube mais limpo, direto e sem distrações.
