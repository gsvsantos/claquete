# 🎬 Claquete (CLQT) — Catálogo TMDB em Angular

O **Claquete (CLQT)** é um SPA em **Angular 20** para explorar o catálogo do **The Movie Database (TMDB)**: filmes e séries por categoria, busca reativa, detalhes ricos (elenco, trailers) e **favoritos** persistidos no navegador — com seleção de idioma e UI fluida (carrosséis com auto‑scroll no hover).

---

[![wakatime](https://wakatime.com/badge/user/d66fe803-196c-4729-b330-f8a026db44ec/project/d2d7344b-79c7-408e-9cd8-1cff8f166aad.svg)](https://wakatime.com/badge/user/d66fe803-196c-4729-b330-f8a026db44ec/project/d2d7344b-79c7-408e-9cd8-1cff8f166aad)

## 🧩 Funcionalidades

- **Explorar por tipo** (Filmes/Séries) e **categorias** (Popular, Top Rated, Now Playing/Upcoming, Airing/On TV).
- **Busca reativa** com debounce e resultados tipados (filtra movie/tv).
- **Detalhes da mídia** com `videos` (trailers/clips) e `credits` (elenco/equipe).
- **Favoritos** com persistência em **LocalStorage**.
- **Seleção de idioma** (`en-US`, `pt-BR`, …) com persistência.
- **Proteção de rotas** via **verificação da API Key** da TMDB.
- **Toasts** de feedback (ngx-toastr).
- **Carrosséis** com navegação por **hover** (`clqt-hover-scroll`).

---

## 🧭 Rotas

| Caminho | Título | Proteção |
|---|---|---|
| `/main-menu` | Main Menu | ✅ Guard |
| `/:mediaType/all` | “Movies/TV Shows — All Categories” | ✅ Guard |
| `/:mediaType/:category` | “Movies/TV Shows — (categoria)” | ✅ Guard |
| `/:mediaType/details/:id` | Details | ✅ Guard |
| `/favorites` | Favorites | ✅ Guard |
| `/401` | Not Authorized | — |
| `/**` | Not Found | — |

> `ListPageTitleResolver` resolve dinamicamente os títulos de listagem com base em `mediaType` e `category`.

---

## 🏗️ Principais pastas/peças

```
src/
├─ app/
│  ├─ components/
│  │  ├─ main-menu/        # Vitrine inicial com populares
│  │  ├─ medias/           # Carrosséis por tipo/categoria
│  │  ├─ list-medias/      # Lista paginada com "Load More"
│  │  ├─ media-details/    # Detalhes (videos, credits)
│  │  ├─ favorites/        # Favoritos (LocalStorage)
│  │  ├─ search/           # Busca reativa
│  │  ├─ navbar/ footer/   # Layout e navegação
│  │  └─ language-selector/# Seletor e persistência de idioma
│  ├─ directives/
│  │  └─ hover-scroll/     # Diretiva clqt-hover-scroll
│  ├─ pipes/
│  │  └─ tmdb-percent/     # vote_average → percent
│  ├─ services/
│  │  ├─ tmdb.service.ts   # Chamadas à API TMDB
│  │  ├─ language.service.ts
│  │  ├─ local-storage.service.ts
│  │  └─ cache.service.ts
│  ├─ guards/
│  │  └─ token-is-valid.guard.ts
│  └─ routing/
│     ├─ app.routes.ts
│     └─ route-title.resolver.ts
├─ environments/
│  ├─ environment.ts
│  └─ environment.development.ts
└─ _variaveis.scss          # Paleta/gradientes/constantes
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

> Mantenha o `example.environments.ts` apenas como **referência** e **não** o importe no app.

---

## 🚀 Como executar

1. **Pré‑requisitos**
   - **Node 20+** e **npm 10+**
   - **Angular CLI 20+** (`npm i -g @angular/cli`)

2. **Instalar dependências**
   ```bash
   npm install
   ```

3. **Configurar environments** (passo anterior).

4. **Subir o dev-server**
   ```bash
   npm start
   # ou
   ng serve
   ```

5. **Acessar**: http://localhost:4200

> As rotas protegidas validam o token ao entrar. Token inválido → toast de erro + redirect **/401**.

---

## 🧰 Tecnologias

- **Angular 20 (standalone components)**, **RxJS**
- **HttpClient**, **ngx-toastr**, **bootstrap-icons**
- **SCSS modular** com `_variaveis.scss`
- **LocalStorage** + cache em memória

---
