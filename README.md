# 🎬 Claquete (CLQT) — Catálogo TMDB em Angular

O **Claquete (CLQT)** é um SPA em **Angular 20** para explorar o catálogo do **The Movie Database (TMDB)**: filmes e séries por categoria, busca reativa, detalhes ricos (elenco, trailers) e **favoritos** persistidos no navegador — com seleção de idioma e UI fluida (carrosséis com auto‑scroll no hover).

---

[![wakatime](https://wakatime.com/badge/user/d66fe803-196c-4729-b330-f8a026db44ec/project/d2d7344b-79c7-408e-9cd8-1cff8f166aad.svg)](https://wakatime.com/badge/user/d66fe803-196c-4729-b330-f8a026db44ec/project/d2d7344b-79c7-408e-9cd8-1cff8f166aad)

## 🧩 Funcionalidades

- **Explorar por tipo** (Filmes/Séries) e **categorias** (Popular, Top Rated, Now Playing/Upcoming, Airing/On TV).
- **Busca reativa** com debounce e resultados tipados (filtra movie/tv).
- **Detalhes da mídia** com `videos` (trailers/clips) e `credits` (elenco/equipe).
- **Favoritos** com persistência em **LocalStorage**.
- **Seleção de idioma** (`en-US`, `pt-BR`, `es-ES`) com persistência.
- **Proteção de rotas** via **verificação da API Key** da TMDB.
- **Toasts** de feedback (ngx-toastr).
- **Carrosséis** com navegação por **hover** (`clqt-hover-scroll`).

---

## 🧭 Rotas

| Caminho                   | Título                             | Proteção |
| ------------------------- | ---------------------------------- | -------- |
| `/main-menu`              | Main Menu                          | ✅ Guard |
| `/:mediaType/all`         | “Movies/TV Shows — All Categories” | ✅ Guard |
| `/:mediaType/:category`   | “Movies/TV Shows — (categoria)”    | ✅ Guard |
| `/:mediaType/details/:id` | Details                            | ✅ Guard |
| `/favorites`              | Favorites                          | ✅ Guard |
| `/401`                    | Not Authorized                     | —        |
| `/**`                     | Not Found                          | —        |

> `ListPageTitleResolver` resolve dinamicamente os títulos de listagem com base em `mediaType` e `category`.

---

## 🏗️ Principais pastas/peças

```
src/
├─ app/
│  ├─ components/
│  │  ├─ main-menu/
│  │  ├─ medias/
│  │  ├─ list-medias/
│  │  ├─ media-details/
│  │  ├─ favorites/
│  │  ├─ not-authorized/
│  │  └─ not-found/
│  ├─ shared/
│  │  ├─ carousel/
│  │  ├─ footer/
│  │  ├─ language-selector/
│  │  ├─ media-card/
│  │  ├─ navbar/
│  │  └─ search/
│  ├─ directives/
│  │  └─ hover-scroll.ts
│  ├─ pipes/
│  │  └─ tmdb-percent.pipe.ts
│  ├─ services/
│  │  ├─ tmdb.service.ts
│  │  ├─ language.service.ts
│  │  ├─ local-storage.service.ts
│  │  └─ cache.service.ts
│  ├─ guards/
│  │  └─ token-is-valid.guard.ts
│  └─ routing/
│     ├─ app.routes.ts
│     └─ route-title.resolver.ts
├─ environments/
│  └─ example.environments.ts    # copie para environment.ts e environment.development.ts
└─ _variaveis.scss
```

---

## ⚙️ Configuração (TMDB API Key)

O app usa o **TMDB Read Access Token** no header `Authorization: Bearer <TOKEN>`.

### Arquivos de environment

**`src/environments/environment.development.ts`**

```ts
export const environment = {
  production: false,
  apiKey: `Bearer PlaceHereYourTMDBAPIReadAccessToken`,
};
```

**`src/environments/environment.ts`**

```ts
export const environment = {
  production: true,
  apiKey: `Bearer PlaceHereYourTMDBAPIReadAccessToken`,
};
```

> O `angular.json` já contém o `fileReplacements` para usar o `.development.ts` no modo dev.

---

## 🚀 Como executar

1. **Pré‑requisitos**
   - **Node 20+** e **npm 10+**
   - **Angular CLI 20+** (`npm i -g @angular/cli`)
   - **Sem CLI global:** os comandos usam `npx ng` (usa a versão local do Angular CLI do projeto).
     > _Opcional:_ `npm i -g @angular/cli` se preferir `ng` global.

2. **Instalar dependências**

   ```bash
   npm install
   ```

3. **Configurar environments** (passo anterior).

4. **Subir o dev-server**

   ```bash
   npm start
   # ou
   npx ng serve
   ```

5. **Acessar**: http://localhost:4200

> As rotas protegidas validam o token ao entrar. Token inválido → toast de erro + redirect **/401**.

---

## 📦 Build & Deploy

```bash
npx ng build
npx ng deploy   # requer angular-cli-ghpages;
```

## 🧰 Tecnologias

- **Angular 20 (standalone)**, **RxJS**, **SCSS**
- **HttpClient**, **ngx-toastr**, **bootstrap-icons**, **gs-buttons**
- **i18n: Transloco (@jsverse/transloco)** — `en-US`, `pt-BR`, `es-ES` _(public/i18n/)_
- **SCSS modular** com `_variaveis.scss`
- **ESLint + Prettier**
- **LocalStorage + cache em memória**

---
