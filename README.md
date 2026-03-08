# Gustavo Cunha — Portfólio 3D v2.0

Portfólio pessoal com experiência 3D imersiva usando **Three.js**.
A câmera navega por uma cena cyberpunk ao rolar a página, revelando
cada seção como painel flutuante. Os projetos ficam em um **carrossel
orbital 3D** com rotação automática no estilo mousham.design.

---

## ✨ Novidades v2.0

- ✅ **Responsivo** — mobile, tablet e desktop
- ✅ **Carrossel orbital 3D** com auto-rotate, drag/touch e keyboard
- ✅ **Projetos reais** com tecnologias corretas e links funcionais
- ✅ **Performance** — menos geometrias em mobile, sem shadow maps
- ✅ **Cursor oculto em touch** — experiência nativa em dispositivos móveis
- ✅ **Menu hamburger** para mobile

---

## 🚀 Como rodar

```bash
npm install
npm run dev      # → http://localhost:3000
npm run build    # gera /dist para deploy
npm run preview  # visualiza o build
```

---

## 📁 Estrutura

```
gustavo-portfolio/
├── index.html
├── src/
│   ├── css/
│   │   ├── variables.css   ← tokens de design (cores, fontes)
│   │   ├── reset.css
│   │   ├── base.css
│   │   ├── nav.css
│   │   ├── hud.css
│   │   ├── cursor.css
│   │   ├── panels.css      ← estilo de todas as seções
│   │   ├── carousel.css    ← carrossel orbital
│   │   └── responsive.css  ← media queries (mobile/tablet/desktop)
│   └── js/
│       ├── main.js
│       └── modules/
│           ├── scene.js    ← cena Three.js
│           ├── camera.js
│           ├── scroll.js   ← câmera animada por scroll
│           ├── cursor.js
│           └── carousel.js ← carrossel 3D orbital
├── vite.config.js
└── package.json
```

---

## 🎨 Personalizar

### Cores — `src/css/variables.css`
```css
--color-cyan: #00c8ff;  /* cor principal */
--color-bg:   #030810;  /* fundo */
```

### Posição da câmera por seção — `src/js/modules/scroll.js`
```js
{ label: 'Hero', pos: [0, 3, 22], target: [0, 0, 0] }
// pos = [x, y, z] câmera | target = ponto que ela olha
```

### Adicionar projeto — `index.html`
Copie um `.orb-card` dentro de `#orbital-track` e atualize nome, descrição, links e tecnologias.
Adicione também um `.orb-dot` em `#orb-dots`.

---

## 🛠 Stack

| Lib        | Uso                          |
|------------|------------------------------|
| Three.js   | Cena 3D, câmera, animações   |
| Vite       | Dev server + bundler         |
| HTML/CSS   | Painéis, carrossel, layout   |
| JS ES6+    | Módulos, scroll, carousel    |

---

## 📦 Deploy

```bash
npm run build   # gera /dist
```

- **Vercel** → conecte o repositório
- **Netlify** → arraste a pasta `dist/`
- **GitHub Pages** → use a action do Vite
