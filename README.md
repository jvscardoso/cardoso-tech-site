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

## Deploy

**Automático (a cada push na `main`):** Cloudflare → Workers & Pages → `cardoso-tech-site` → **Settings → Build** → conectar o repositório GitHub com:
- Branch: `main`
- Build command: *(vazio)*
- Deploy command: `npx wrangler deploy`
- Root directory: `/`

**Manual (do computador):**

```bash
npx wrangler login    # só na primeira vez
npx wrangler deploy
```

## Domínio: cardosotech.dev.br

1. Registrar `cardosotech.dev.br` em <https://registro.br> usando o CNPJ.
2. Cloudflare → **Add a domain** → `cardosotech.dev.br` → plano **Free**. Anotar os 2 nameservers que o Cloudflare mostrar.
3. Registro.br → domínio → **DNS** → **Alterar servidores DNS** → colar os nameservers do Cloudflare.
4. Worker `cardoso-tech-site` → **Settings → Domains & Routes** → **Custom domain** → adicionar `cardosotech.dev.br` (e `www.cardosotech.dev.br`).

## E-mail: contato@cardosotech.dev.br

**Receber (grátis):** Cloudflare → domínio → **Email** → **Email Routing** → criar a regra `contato@` → encaminhar para o Gmail pessoal (confirmar o e-mail de verificação). O Cloudflare cria os registros MX/TXT sozinho.

**Responder como contato@ pelo Gmail:**
1. Ativar a verificação em duas etapas na conta Google e gerar uma **senha de app**.
2. Gmail → Configurações → **Contas e importação** → **Enviar e-mail como** → adicionar `contato@cardosotech.dev.br`.
3. SMTP: `smtp.gmail.com`, porta `587`, TLS, usuário = Gmail pessoal, senha = senha de app.
4. No DNS do Cloudflare, editar o registro TXT do SPF para incluir o Google:
   `v=spf1 include:_spf.mx.cloudflare.net include:_spf.google.com ~all`
