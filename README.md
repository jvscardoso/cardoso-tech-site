# cardoso-tech-site

Site institucional da **Cardoso Tech Solutions LTDA** (CNPJ 62.015.820/0001-04).

Site estático (HTML + CSS + JS puro), sem build, com seletor de idioma PT/EN.

## Estrutura

```
index.html            Página principal
privacidade.html      Política de Privacidade (LGPD)
assets/css/style.css  Estilos
assets/js/i18n.js     Traduções PT/EN + animações
assets/img/logo.svg   Logo / favicon
```

Para editar textos, altere **os dois idiomas** em `assets/js/i18n.js` (o HTML só tem o texto padrão em PT).

## Rodar localmente

```bash
python -m http.server 8000
# abrir http://localhost:8000
```

## Deploy no Cloudflare Pages

1. Suba este repositório para o GitHub.
2. Em <https://dash.cloudflare.com> → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Selecione o repositório e configure:
   - Framework preset: **None**
   - Build command: *(vazio)*
   - Build output directory: `/`
4. **Save and Deploy**. O site fica em `https://<nome-do-projeto>.pages.dev`.

Cada `git push` na `main` publica automaticamente.

## Domínio: cardosotech.dev.br

1. Registrar `cardosotech.dev.br` em <https://registro.br> usando o CNPJ.
2. Cloudflare → **Add a domain** → `cardosotech.dev.br` → plano **Free**. Anotar os 2 nameservers que o Cloudflare mostrar.
3. Registro.br → domínio → **DNS** → **Alterar servidores DNS** → colar os nameservers do Cloudflare.
4. Projeto do Pages → **Custom domains** → adicionar `cardosotech.dev.br` (e `www.cardosotech.dev.br`).

## E-mail: contato@cardosotech.dev.br

**Receber (grátis):** Cloudflare → domínio → **Email** → **Email Routing** → criar a regra `contato@` → encaminhar para o Gmail pessoal (confirmar o e-mail de verificação). O Cloudflare cria os registros MX/TXT sozinho.

**Responder como contato@ pelo Gmail:**
1. Ativar a verificação em duas etapas na conta Google e gerar uma **senha de app**.
2. Gmail → Configurações → **Contas e importação** → **Enviar e-mail como** → adicionar `contato@cardosotech.dev.br`.
3. SMTP: `smtp.gmail.com`, porta `587`, TLS, usuário = Gmail pessoal, senha = senha de app.
4. No DNS do Cloudflare, editar o registro TXT do SPF para incluir o Google:
   `v=spf1 include:_spf.mx.cloudflare.net include:_spf.google.com ~all`
