# Penasia

Livro de regras do sistema de RPG **Penasia**, publicado como site estático.

Feito com [Astro](https://astro.build): cada capítulo é uma página leve, sem JavaScript, e só a página de ferramentas (Roda interativa e calculadora de chances) carrega um script pequeno.

## Rodar no computador

```sh
npm install
npm run dev
```

Abre em `http://localhost:4321`.

## Editar o livro

Os capítulos ficam em `src/pages/`, um arquivo `.md` por capítulo. É texto comum em Markdown: edite e salve.

- Etiquetas de status: `<span class="st consenso">consenso</span>` (também `fechado`, `proposta`, `aberto`).
- Nota do revisor: um bloco `<div class="rev">` com o texto dentro, separado por linhas em branco.
- As figuras (Roda e mapa) são geradas por `node scripts/figuras.mjs`.

## Publicar na Vercel

1. Em [vercel.com/new](https://vercel.com/new), importe este repositório.
2. A Vercel reconhece o Astro sozinha: não precisa mudar nenhuma configuração.
3. Cada `git push` na branch `main` publica uma versão nova.
