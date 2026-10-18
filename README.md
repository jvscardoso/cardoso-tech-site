# cardoso-tech-site

Site institucional da **Cardoso Tech Solutions LTDA** (CNPJ 62.015.820/0001-04), publicado em <https://cardosotech.dev.br>.

Site estático (HTML + CSS + JS puro), sem build, com seletor de idioma PT/EN. Hospedado como Cloudflare Worker (static assets).

## Estrutura

```
wrangler.jsonc               Configuração do Worker (publica só a pasta public/)
public/index.html            Página principal
public/privacidade.html      Política de Privacidade (LGPD)
public/robots.txt, sitemap.xml
public/assets/css/style.css  Estilos
public/assets/js/i18n.js     Traduções PT/EN + animações
public/assets/js/carousel.js Carrossel de produtos
public/assets/img/logo.svg   Logo / favicon
```

Para editar textos, altere **os dois idiomas** em `public/assets/js/i18n.js` (o HTML só tem o texto padrão em PT).

## Rodar localmente

```bash
npx http-server public -p 8000
# abrir http://localhost:8000
```