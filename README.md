# Gustavo Cunha — Portfolio v3

Portfolio bilíngue com hero 3D leve e conteúdo orientado a recrutadores. A identidade visual preserva a ambientação cyberpunk, mas as seções principais seguem um fluxo vertical acessível e rápido de ler.

## Executar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # gera dist/
npm run preview  # valida o build local
```

Requisito: Node.js `^20.19.0 || >=22.12.0`.

## Estrutura

```text
index.html
public/
  favicon.svg
  og-card.png
src/
  css/               estilos globais, navegação, seções e responsividade
  fonts/             Outfit e Space Mono em WOFF2 local
  imgs/
    brand/           logo vetorial e fallback da hero
    projects/        screenshots reais otimizados em AVIF e WebP
  js/
    data.js          projetos em destaque e projetos adicionais
    i18n.js          textos PT-BR e EN
    main.js          navegação, renderização e carregamento sob demanda
    modules/scene.js cena Three.js da hero
```

## Decisões Técnicas

- O idioma inicial usa `navigator.language`; alterações manuais ficam salvas em `localStorage`.
- A cena Three.js é importada dinamicamente após a renderização do conteúdo.
- O loop 3D pausa fora da hero e quando a aba fica oculta.
- `prefers-reduced-motion: reduce` mantém somente o fallback estático.
- Projetos em destaque usam screenshots reais e formatos AVIF/WebP.
- Nenhum telefone pessoal é exibido na interface pública.

## Personalização

- Conteúdo e projetos: `src/js/data.js` e `src/js/i18n.js`
- Tokens visuais: `src/css/variables.css`
- Cena 3D: `src/js/modules/scene.js`
- Metadados SEO e sociais: `index.html`

## Verificação

```bash
npm run build
npm audit
```

Antes de publicar, valide teclado, menu mobile, seletor de idioma e modo de movimento reduzido nos principais breakpoints.
