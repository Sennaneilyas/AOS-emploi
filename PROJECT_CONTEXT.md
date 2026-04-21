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

---

## 🛠️ Confirmed Tech Stack

| Layer | Technology | Version | Notes |
|---|---|---|---|
| Frontend framework | React | 18.3.1 | NOT React 19 |
| Build tool | Vite | 5.4.x | NOT Vite 6/7/8 |
| Styling | Tailwind CSS | 3.4.x | NOT v4 |
| Component library | Flowbite React | 0.12.x | Main component library |
| Routing | React Router | v7 | Classic component routing |
| HTTP client | Axios | ^1.14 | Centralized in api.js |
| Notifications | Sonner | ^2.0 | Toast only |
| Animation | Framer Motion | ^11 | Sparingly for headers and transitions |
| Icons | Lucide React | ^1.7 | All icons from here |
| Global state | React Context | — | LangContext and AuthContext |
| CMS | WordPress (headless) | — | Managed via REST API |

---

## 🎨 Design System & UI Patterns

### Brand Colors (Tailwind tokens)
- **Navy**: Primary institutional color.
  - `navy`: `#1B2A4A`
  - `navy-light`: `#2D4270`
- **Orange**: Action/Brand accent color.
  - `brand-orange`: `#F26522` (Use for buttons, icons, highlights)

### Layout Rules
- **Navy Headers**: Every subpage (except Home) starts with a navy background section.
- **Orange Stains**: Subpage headers feature abstract background "stains" (orange and navy-light blobs with `blur-3xl`).
- **White Content Area**: The main content section below the header **MUST** be white (`bg-white`). We moved away from `bg-gray-soft` for a cleaner, modern look.
- **Logical Properties**: Always use `ms-`, `me-`, `ps-`, `pe-`, `text-start`, `text-end` for RTL compatibility.

---

## 🔄 The Rotation Strategy (Mocks → Real)

The application is built to "rotate" from mock data to real WordPress/API data by flipping a single switch.

### 1. The Global Switch
In `src/services/api.js`:
```js
export const IS_MOCK = true // Flip to false to hit the real WP API
```

### 2. Data Rotation
- **Hooks**: Pages consume data through custom hooks (e.g., `usePosts`, `useServices`).
- **Services**: Hooks call service functions in `src/services/api.js`.
- **Mocks**: When `IS_MOCK` is true, these services return data from `src/mocks/*.js` or `*.json`.
- **Transition**: To go live, ensure the real WP JSON structure matches the mock structure or update the hook mapping logic.

### 3. Image & Asset Rotation
- **Placeholder Rule**: All mocked images use `Unsplash` URLs or local `/public/images/` assets.
- **WP Media**: When integrating, ensure `acf` fields for images return URLs that the frontend can consume directly.

### 4. Auth Rotation
- **Mock Auth**: Currently simulates a JWT cycle in `AuthContext.jsx`.
- **Real Auth**: Will need to hit the WordPress `JWT Auth` plugin endpoints. The logic for storing the token in `localStorage` is already in place.

---

## 🔗 Integrated Navbar & Auth Flow
- The **Navbar** is the brain of the app navigation.
- It dynamically shows **Login/Espace Adhérent** when guest, and **Adhérent Name + Logout icon** when authenticated.
- Logout is now simplified: a direct button in the Navbar calling `logout()` from `useAuth`. No extra files or complex confirmation loops.

---

## 🚫 Hard Rules — Never Violate These

1. **Never use physical directionals**: No `ml-`, `mr-`, `pl-`, `pr-`, `left-`, `right-`. Use logical properties.
2. **Main content must be white**: Navy is for headers and specific banners only.
3. **No extra UI libraries**: Stick to Flowbite React + Lucide Icons + Tailwind. (We removed HugeIcons).
4. **Centralized Content**: No hardcoded text in JSX. Use `/data/` or `/components/auth/authContent.js`.
5. **No direct API calls in Components**: Use Hooks → Services.

---

## 📅 Progress Tracking

- [x] **Phase 1**: Shell & Bilingual Setup
- [x] **Phase 2**: Auth Layer & Static About Pages
- [x] **Phase 3**: HomePage & Services Grid
- [x] **Phase 4**: Actualities & Detail Pages (Mocked)
- [x] **Phase 5**: Design Polish (Navy Headers + White Content)
- [ ] **Phase 6**: Final Integration (WP API)

---

*Context file for Cursor AI — AOS Emploi project*
*Developer: Ilyas Sennane*
