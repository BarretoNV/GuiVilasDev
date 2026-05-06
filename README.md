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
