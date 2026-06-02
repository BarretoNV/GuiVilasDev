# My personal WebSite

This Website was created using React + Vite, and is being maintained by me.

For any further questions, contact me using the links at my profile .ReadMe

## Blog e astrofotografia

O site tem duas areas de conteudo versionado no repositorio:

- `src/content/blog`: textos gerais, revisoes, pensamentos e opinioes.
- `src/content/astrofotografia`: fotos, sessoes e relatos tecnicos de astrofotografia.

Cada post e um arquivo `.mdx`. MDX permite escrever Markdown normal e tambem
exportar metadados no topo do arquivo. As paginas importam esses arquivos
automaticamente, entao nao e necessario editar listas manuais.

### Como criar um post de blog

1. Copie `src/content/blog/_template.mdx`.
2. Renomeie a copia com um slug claro, por exemplo `meu-jogo-favorito.mdx`.
3. Altere o objeto `metadata` no topo do arquivo.
4. Escreva o texto abaixo do metadata usando Markdown.
5. Rode `npm run build` para conferir se esta tudo valido.

Campos principais do blog:

- `title`: titulo publico do post.
- `slug`: parte final da URL, usada em `/blog/seu-slug`.
- `date`: data em formato `YYYY-MM-DD`.
- `category`: categoria principal.
- `tags`: lista de tags.
- `excerpt`: resumo exibido na listagem.
- `readingTime`: tempo estimado de leitura.
- `coverImage`: imagem de capa vinda do Cloudinary.

### Como criar uma entrada de astrofotografia

1. Copie `src/content/astrofotografia/_template.mdx`.
2. Renomeie a copia com um slug claro, por exemplo `lua-crescente-maio.mdx`.
3. Preencha os campos tecnicos que fizerem sentido.
4. Escreva o relato da captura abaixo do metadata.
5. Rode `npm run build`.

Campos principais da astrofotografia:

- `title`: titulo da foto ou sessao.
- `slug`: parte final da URL, usada em `/astrofotografia/seu-slug`.
- `date`: data em formato `YYYY-MM-DD`.
- `target`: objeto fotografado.
- `constellation`: constelacao ou regiao do ceu.
- `locationLabel`: local aproximado, sem coordenadas precisas.
- `camera`: camera usada.
- `lensOrTelescope`: lente ou telescopio.
- `exposure`, `iso`, `aperture`: configuracoes da captura.
- `stacking`, `processing`: softwares ou metodos usados.
- `image`: imagem principal vinda do Cloudinary.

Campos opcionais podem ser removidos. Se um campo tecnico nao existir, ele
simplesmente nao aparece na pagina.

### Como usar imagens do Cloudinary

Suba a imagem no Cloudinary e copie o `publicId`. No MDX, use:

```js
image: {
  cloudName: "seu-cloud-name",
  publicId: "pasta/nome-da-imagem",
  alt: "Descricao acessivel da imagem",
  width: 1600,
}
```

Tambem e possivel definir `VITE_CLOUDINARY_CLOUD_NAME` no `.env` e omitir
`cloudName` em cada imagem. O site gera URLs otimizadas com `f_auto`, `q_auto`
e larguras responsivas.

Os arquivos `_template.mdx` possuem `template: true` e nao aparecem no site.

## Previews sociais

O site usa metatags Open Graph e Twitter Card em `index.html` para gerar um
preview geral quando um link e colado no WhatsApp, LinkedIn, Discord, iMessage
e outros apps que leem metadata social.

Configure `VITE_SITE_URL` com a URL publica do deploy, sem barra final. Exemplo:

```env
VITE_SITE_URL=https://guivilassite.vercel.app
```

As imagens prontas ficam em `public/social`:

- `og-default.png`: card `1200x630` usado pelos previews de link.
- `instagram-feed.png`: card `1080x1080` para posts no feed.
- `instagram-story.png`: card `1080x1920` para stories.

Para testar localmente com URLs absolutas no HTML gerado:

```bash
VITE_SITE_URL=https://guivilassite.vercel.app npm run build
```

No PowerShell:

```powershell
$env:VITE_SITE_URL = "https://guivilassite.vercel.app"; npm run build
```

Depois do deploy, cole a URL em uma conversa do WhatsApp ou use um debugger de
Open Graph/LinkedIn/Facebook para conferir o resultado. Se um preview antigo
aparecer, pode ser cache do app social.

A versao inicial e um preview geral para todo o site. Previews especificos para
rotas como `/blog/:slug` ou `/astrofotografia/:slug` precisam de prerender, SSR
ou geracao de HTML por rota, porque o `vercel.json` atual reescreve todas as
rotas para `/`.
