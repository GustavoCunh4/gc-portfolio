# GC Portfolio — React + Vite + Tailwind + TS

Inspirado visualmente no neon tech do seu GC + referência do jvsdev, mas com estrutura e UI originais.

## Rodar localmente

```bash
npm i
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Deploy (Vercel)
- Importar o repositório no painel da Vercel (Framework: Vite/React).
- Build Command: `npm run build`
- Output: `dist`

## Deploy (GitHub Pages)
1. `npm i -D gh-pages`
2. Adicione ao `package.json`:
   ```json
   "homepage": "https://<user>.github.io/<repo>",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. `npm run deploy`

## Customização
- Mude os projetos em `src/data.ts`
- Ajuste textos e cores em `tailwind.config.js` e `src/index.css`
