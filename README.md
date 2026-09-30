# Solar Tech Systems — Modern Redesigned Web Experience

A complete, 90%+ visual redesign of the Solar Tech Systems website built with React 19, TypeScript, Tailwind CSS v4, and modern scroll animations.

---

## 1. Visual Theme & Palette

The design transitions the previous dark/green aesthetic into an airy, high-contrast, modern architectural clean-energy aesthetic featuring **light blue** and **light red (soft coral/rose)** accents on white and off-white canvases with dark slate typography for WCAG AA readability.

### CSS Variables
Defined in `src/index.css`:
```css
:root {
  /* Light Blue Range */
  --blue-50:  #f0f7ff;
  --blue-100: #e0effe;
  --blue-200: #bae0fd;
  --blue-300: #7cc5fb;
  --blue-400: #38a5f8;
  --blue-500: #0ea5e9;
  --blue-600: #0284c7;
  --blue-700: #0369a1;

  /* Light Red / Soft Coral / Rose Range */
  --red-50:   #fff1f2;
  --red-100:  #ffe4e6;
  --red-200:  #fecdd3;
  --red-300:  #fda4af;
  --red-400:  #fb7185;
  --red-500:  #f43f5e;
  --red-600:  #e11d48;
  --red-700:  #be123c;

  /* Slate Neutrals */
  --slate-900: #0f172a;
  --slate-800: #1e293b;
  --slate-600: #475569;
  --slate-500: #64748b;
  --bg-canvas: #fbfcfe;
}
```

Typography pairing:
- **Display Headings**: `Outfit` (sans-serif geometric display)
- **Body & Controls**: `Plus Jakarta Sans` (refined readability)

---

## 2. Scroll-Driven Animations & Sun Journey

- **Scroll-Linked Sun**: A fixed SVG sun with rotating rays (`src/components/SunLayer.tsx`) travels across and down the sky as the user scrolls, intensifying its glow and subtly shifting the background atmosphere from dawn cyan-blue to sunset rose-coral. Mounted once in `src/components/Layout.tsx` so it persists across route changes.
- **Scroll Progress Indicator**: Top progress bar tracking page depth (`src/components/motion/ScrollProgress.tsx`).
- **Sticky Navbar**: Blurs and compresses elevation gracefully upon scroll.
- **Accessibility**: Automatically disables and simplifies animations when the user has `prefers-reduced-motion: reduce` enabled.

---

## 3. Routes & URLs

Clean, extension-less paths. The site used to ship real `.html` filenames; those are kept alive as HTTP 301 redirects so no inbound link, bookmark or search result breaks (see `public/_redirects` and `LEGACY_REDIRECTS` in `src/content/site.ts`).

| Page | URL | Legacy path (301s here) | Features |
|---|---|---|---|
| **Home** | `/` | `/solartechsystems.html` | Hero, capabilities, about split, why choose us, contact form, map |
| **About Us** | `/about-us` | `/about-us.html` | Company history, quality standards, engineering capabilities |
| **Solar Power Plant** | `/solar-power-plant` | `/solar-power-plant.html` | Megawatt turnkey plant specs, engineering checklist, other services |
| **Solar Rooftop** | `/solar-rooftop` | `/solar-rooftop.html` | Commercial and industrial rooftop mounting, net metering |
| **33 kV Transmission Line** | `/33kv-transmission-line` | `/33kv-transmission-line.html` | ROW surveys, stringing, towers, surge suppression |
| **33 / 11 kV Substation (USS)** | `/33-11kv-substation-uss` | `/33-11kv-substation-uss.html` | Unitized substations, VCB switchgear, transformer protection |
| **Our Clients** | `/our-clients` | `/our-clients.html` | Delivered market sectors, project statistics |
| **Gallery / Blog** | `/gallery-blog` | `/gallery-blog.html` | 33-photo responsive masonry grid with keyboard-navigable Lightbox + 5 original technical blog posts with dedicated reader view |
| **Contact Us** | `/contact-us` | `/contact-us.html` | Validated inquiry form with feedback, direct phone/email, Google Maps |

Two conventions keep each URL single:

- **One source of truth.** Route slugs live in `ROUTES` (`src/content/site.ts`); service pages are addressed by their `slug`. `routePath()` normalises `'about-us'`, `'/about-us'` and `'/'` into a router path, so no call site can build a `//` URL.
- **One canonical per page.** `useDocumentMeta` writes a per-route `link[rel="canonical"]`, `og:url` and `twitter:url` from `SITE_ORIGIN + pathname`. Before this, every page declared the homepage as its canonical and was treated as a duplicate of it. A trailing slash is folded back to the slash-free form by the catch-all route in `src/App.tsx`, so `/about-us/` and `/about-us` never both exist.

> Host note: the 301s must be served by the host, not by React Router — a client-side redirect looks the same to a visitor but tells a crawler nothing. `public/_redirects` is Netlify/Cloudflare Pages syntax. If you deploy elsewhere, reproduce those ten rules in that host's config (Apache `.htaccess`, nginx `return 301`, cPanel Redirects, …). The `/* /index.html 200` fallback must be the last rule.

---

## 4. Technical Blog Articles

5 comprehensive technical articles (~450–600 words each) tailored to Karnataka's industrial and agricultural energy sector:
1. *Grid Parity & Megawatt Plants: Navigating High-Voltage Industrial Solar in Karnataka*
2. *Commercial Rooftop Architecture: Maximizing Yield with Smart Ballasts & Net Metering*
3. *33 kV Transmission Line Engineering: ROW Approvals, Safety Clearances & Grid Synchrony*
4. *Decentralized 33/11 kV USS Substations: Mitigating T&D Losses for Renewable Clusters*
5. *Solar Agricultural Microgrids: Transforming Irrigation and Resilience Across Rural Karnataka*

---

## 5. Running & Deploying

### Development
```bash
npm run dev
```
Runs the Vite development server on port 3000.

### Build
```bash
npm run build
```
Creates an optimized production bundle in `dist/`.

### Lint
```bash
npm run lint
```
Runs TypeScript compiler validation with zero errors.

---

## 6. Where to Edit Content & Customization

- **Site Information & Copy**: Edit `src/data/siteData.ts` to adjust phone numbers, email addresses, service descriptions, testimonials, and blog posts.
- **Images**: Located in `public/images/` and `public/images/gallery/`.
- **Colors & Atmosphere**: Edit CSS variables in `src/index.css`.
- **Sun Behavior**: Fine-tune arc trajectory and glow in `src/components/SunLayer.tsx`, or the sky phases and sun tokens in `src/lib/motion/tokens.ts`.
