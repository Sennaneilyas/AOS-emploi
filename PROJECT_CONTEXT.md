# PROJECT_CONTEXT.md
# AOS Emploi — Website Modernization
> Cursor AI context file — read this before writing any code in this project.
> Last updated: April 2026

---

## 🧭 What This Project Is

**AOS Emploi** (aosemploi.com) is the official web portal of **AOS** — a social welfare
association serving the staff (fonctionnaires) of Morocco's Ministry of Employment.

This is NOT a job portal. It is an **institutional association website**.
Tone: formal, bilingual (French + Arabic), trustworthy.

The project modernizes an outdated PHP site into a **headless WordPress + React** architecture.

**Two developers:**
- **Ilyas** — owns 100% of the React frontend
- **Teammate** — owns WordPress setup, CPT registration, ACF fields, CORS, cPanel deployment

**Timeline:** 1 month. Deadline is strict.

---

## 🛠️ Confirmed Tech Stack

| Layer | Technology | Version | Notes |
|---|---|---|---|
| Frontend framework | React | 18.3.1 | NOT React 19 |
| Build tool | Vite | 5.4.x | NOT Vite 6/7/8 |
| Styling | Tailwind CSS | 3.4.x | NOT v4 |
| Component library | Flowbite React | 0.12.x | Sole component library |
| Routing | React Router | v7 (v6 API) | Use classic component routing only |
| HTTP client | Axios | ^1.14 | Centralized in api.js |
| Forms | React Hook Form | ^7.72 | Contact form only |
| Notifications | Sonner | ^2.0 | Toast only |
| Animation | Framer Motion | ^11 | Used in Chiffres Clés and Auth success states |
| Icons | Lucide React | ^1.7 | All icons from here |
| Global state | React Context | — | LangContext and AuthContext, no Redux |
| CMS | WordPress (headless) | — | Teammate manages |
| Database | MySQL | — | Shared with WP |

### ❌ Not In This Project
- Laravel (evaluated and dropped — WP REST API is sufficient)
- Redux Toolkit (overkill — React Context is enough)
- Tailwind v4 (breaks Flowbite)
- React 19 (breaks Framer Motion v11 + Flowbite peer deps)
- TypeScript (future goal — introduce progressively if asked)
- Dark mode (not in scope)
- shadcn/ui, MUI, Chakra (Flowbite React is the sole component library)
- `tailwindcss-rtl` plugin (Tailwind 3.4 has native logical properties)

---

## 📁 Folder Structure

```
aos-emploi/
├── public/
├── src/
│   ├── assets/
│   │   ├── fonts/
│   │   └── images/
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── PageWrapper.jsx
│   │   │   └── DocumentLayout.jsx
│   │   ├── common/
│   │   ├── about/                   ← Replaced the old AboutPage
│   │   │   ├── StatutsPage.jsx
│   │   │   ├── ReglementPage.jsx
│   │   │   └── BureauPage.jsx
│   │   ├── auth/                    ← Auth Layer
│   │   │   ├── LoginForm.jsx
│   │   │   ├── RegisterForm.jsx
│   │   │   ├── Field.jsx
│   │   │   ├── authContent.js
│   │   │   └── ProtectedRoute.jsx
│   │   ├── home/
│   │   │   ├── HeroSection.jsx
│   │   │   ├── ActualitesSection.jsx
│   │   │   └── ChiffresClés.jsx
│   │   ├── blog/
│   │   ├── services/
│   │   ├── contact/
│   │   └── espace-adherent/
│   │
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── ServicesPage.jsx
│   │   ├── BlogPage.jsx
│   │   ├── BlogPostPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── AuthPage.jsx
│   │   ├── EspaceAdherentPage.jsx
│   │   └── NotFoundPage.jsx
│   │
│   ├── hooks/
│   │   ├── useAuth.js                 ← Manages auth state and localStorage
│   │   ├── usePosts.js
│   │   └── useServices.js
│   │
│   ├── context/
│   │   ├── LangContext.jsx            ← RTL/LTR + lang toggle
│   │   └── AuthContext.jsx
│   │
│   ├── services/
│   │   ├── api.js                     ← Axios instance + IS_MOCK flag
│   │   └── authAPI.js                 ← Specialized API for auth endpoints
│   │
│   ├── data/
│   │   └── cadreAssociatifContent.js  ← Shared content for the 3 About pages
│   │
│   ├── mocks/
│   │
│   ├── routes/
│   │   └── index.jsx                  ← All routes defined here
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── tailwind.config.js
└── vite.config.js
```

---

## 🌍 Bilingual System (Critical — Read Carefully)

The site is bilingual: **French (LTR)** and **Arabic (RTL)**.

### How it works

1. `LangContext` holds `lang` state (`'fr'` | `'ar'`) and `toggleLang()`
2. On lang change, `useEffect` sets `dir` and `lang` attributes on `<html>`
3. Font swap is handled **purely in CSS** — no JavaScript involved

```css
/* index.css */
[dir="ltr"] body { font-family: 'DM Sans', sans-serif; }
[dir="rtl"] body { font-family: 'Cairo', sans-serif; }
```

### Tailwind RTL rules
- **Always** use logical properties, never physical directional classes
- ✅ Use: `ms-4`, `me-4`, `ps-4`, `pe-4`, `text-start`, `text-end`
- ❌ Never use: `ml-4`, `mr-4`, `pl-4`, `pr-4`, `text-left`, `text-right`
- ✅ Use: `rounded-s-lg`, `border-e`, `start-0`, `end-0`
- ❌ Never use: `rounded-l-lg`, `border-r`, `left-0`, `right-0`

### Content structure
Every translatable string must support both languages.
We separate static content into localized files (e.g., `authContent.js`, `cadreAssociatifContent.js`) rather than hard-coding objects in the components.

```jsx
const { lang } = useLang()
const t = authContent[lang]
```

---

## 🎨 Design System

### Brand Colors (Tailwind tokens)
```js
navy: {
  DEFAULT: '#1B2A4A',   // Primary — main UI color
  light:   '#2D4270',   // Hover states, secondary nav
  dark:    '#121E35',   // Footer backgrounds
}
brand: {
  orange: '#F26522',    // ⚠️ PENDING M. KHALISSI APPROVAL — may change
}
'gray-soft': '#F4F6F9'  // Page backgrounds, card backgrounds
```

### Institutional Tone Rules
- No playful animations — only purposeful transitions (Framer Motion is used sparingly).
- No bright gradients — navy + white + soft gray is the base.
- Forms: clean floating labels or well-spaced fields with `autoComplete` guards against browser visual clutter.
- Buttons: solid navy primary, orange secondary (pending approval).

---

## 🔌 API Layer

### `src/services/api.js` & `authAPI.js`

```js
export const IS_MOCK = true  // ← flip to false when WP API is ready
```

### Mock-first Development
While `IS_MOCK = true`, the application mimics API latency and returns realistic dummy data (or fakes token-based authentication).
This lets the frontend run completely independently before WordPress is live.

---

## 📄 Pages × Data Map

| Page / Section | Route | WP Endpoint / Status |
|---|---|---|
| Home | `/` | Built (Mock Data) |
| Cadre Associatif (Statuts, Règlement, Bureau) | `/about/*` | Built (Static Content) |
| Services | `/services` | Built (Mock Data) |
| Actualités (News) | `/actualites` | **In Progress 🚧** |
| Actualités detail | `/actualites/:slug` | Stub |
| Contact | `/contact` | Built (Functional Form) |
| Auth Page (Login/Register) | `/auth` | Built (Mock JWT) |
| Espace Adhérent | `/espace-adherent` | Built (Protected Route) |
| 404 | `*` | Built |

---

## 🚫 Hard Rules — Never Violate These

1. **Never use `ml-`, `mr-`, `pl-`, `pr-`, `left-`, `right-`** — use logical properties
2. **Never call wpApi directly in a page** — always use a hook
3. **Never hardcode Arabic/French text inside JSX** — use centralized content files
4. **Never add a new state management solution** — Context is enough
5. **Never import from `flowbite-react/tailwind`** — that subpath was removed in v0.12
6. **Never write inline styles** — Tailwind classes only
7. **Never import shadcn, MUI, Chakra or any other component library**

---

## 📅 Development Phases

### Phase 1 — Shell (Complete ✅)
- [x] Vite + React 18 scaffolded with Tailwind + Flowbite
- [x] LangContext wired + RTL logic
- [x] Base routing set up

### Phase 2 — Core Pages & Auth (Complete ✅)
- [x] Auth Layer (LoginForm, RegisterForm, JWT simulation, ProtectedRoutes)
- [x] Cadre Associatif dropdown (Statuts, Règlement Intérieur, Bureau Dirigeant pages + DocumentLayout)
- [x] HomePage (Hero + Actualités + ChiffresClés + ServicesSection + CTABanner)
- [x] ServicesPage (Grid with logic for slugs)

### Phase 3 — Content Pages (In Progress 🚧)
- [ ] ActualitiesPage (List view with mock data)
- [ ] ActualitiesDetail (Single view)
- [x] ContactPage (Form + Sonner validation)

### Phase 4 — Polish + Integration (Pending ⏳)
- [ ] Connect real WP API (IS_MOCK = false)
- [ ] cPanel deployment

---

## 📌 Open Decisions (Pending Supervisor)

| Item | Status |
|---|---|
| Action Orange `#F26522` — too bold for institutional? | ⏳ Awaiting M. KHALISSI |

---

*Context file for Cursor AI — AOS Emploi project, Internship 2026*
*Developer: Ilyas Sennane*
