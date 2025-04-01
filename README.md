# 🚫 YouTube Shorts Blocker

Extensão para Google Chrome (desktop) que remove vídeos Shorts da interface do YouTube e redireciona automaticamente links do tipo `/shorts/` para a versão normal do vídeo (`/watch?v=`).

---

## 💻 Funcionalidades

✅ Remove:

- Seção "Shorts" da página inicial
- Botão de Shorts na barra lateral
- Miniaturas e links de vídeos Shorts

✅ Redireciona automaticamente:

- URLs do tipo `https://www.youtube.com/shorts/abc123` para `https://www.youtube.com/watch?v=abc123`
- Funciona tanto ao colar links quanto ao clicar neles dentro do YouTube

---

## 🧱 Instalação (Chrome Desktop)

1. Clone este repositório ou [baixe o .zip](https://github.com/seu-usuario/youtube-shorts-blocker/archive/refs/heads/main.zip)
2. Vá até `chrome://extensions/`
3. Ative o **Modo do Desenvolvedor**
4. Clique em **"Carregar sem compactação"**
5. Selecione a pasta do projeto

A extensão estará ativa imediatamente.

---

## 📂 Estrutura do projeto

```
youtube-shorts-blocker/
├── manifest.json
├── background.js
└── content.js
```

---

## 🚧 Limitações

- A extensão funciona apenas em navegadores baseados em **Chromium no desktop**.
- Ainda não há suporte para Android — mas navegadores como o **Kiwi Browser** permitem usar extensões do Chrome.

---

Feito com 💻 para manter o YouTube menos viciante.
