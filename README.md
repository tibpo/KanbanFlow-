# ECOVIS BPO | Manual Interativo de POPs - TI (Next.js)

Aplicação reescrita em **Next.js (App Router)**, **React**, **TypeScript** e **Tailwind CSS** a partir do arquivo estático `portal_interativo_de_pops_ti_ecovis_bpo (1).html`.

## Como executar

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Build de produção

```bash
npm run build
npm start
```

## Estrutura do Projeto

- `src/app/layout.tsx` — Layout raiz, metadados e fonte `Inter` (`next/font/google`)
- `src/app/globals.css` — Estilos globais, `kbd`, `code.inline-code` e animação `fade-in`
- `src/app/page.tsx` — Página principal carregando `PortalApp`
- `src/types/pop.ts` — Tipagens TypeScript para Temas, POPs, Etapas e Triagem
- `src/data/themes.ts` — Definição dos 5 temas + visão geral
- `src/data/pops.ts` — Dados completos dos 38 POPs (`POP-001` a `POP-038`)
- `src/data/triage.ts` — Árvore de decisão da Triagem Inteligente
- `src/components/PortalApp.tsx` — Orquestrador de estado e modos (`triage`, `catalog`, `detail`)
- `src/components/Header.tsx` — Barra superior, busca global e alternador de modos
- `src/components/HeroBanner.tsx` — Banner de abertura e "A Regra de Ouro"
- `src/components/TriageView.tsx` — Assistente interativo de triagem guiada
- `src/components/CatalogView.tsx` — Catálogo filtrável por tema e busca sem acento
- `src/components/PopDetailView.tsx` — Visualização detalhada do POP + navegação anterior/próximo
- `src/components/PopMockups.tsx` — Ilustrações visuais das telas do Windows e checklists
- `src/components/RichText.tsx` — Renderizador seguro de formatação e links internos entre POPs
- `src/components/Footer.tsx` — Rodapé institucional
