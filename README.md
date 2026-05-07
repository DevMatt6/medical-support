# Medical Support — Next.js Website Template

## Overview

This project is a production-ready website built for Medical Support, an Italian company specialising in 3D diagnostic devices for posturology and podiatry. It serves as a **reusable template** for professional product-showcase websites in the medical/healthcare sector.

The site is a multi-page marketing and product-catalogue website with animated UI, a dynamic product page system, dark/light theme, smooth scroll, and a custom cursor. Every design decision is encoded as CSS tokens in `app/globals.css`, making it straightforward to re-skin for a new client by editing a single file.

---

## Tech Stack

| Dependency                   | Version  | Purpose                                                | Notes                                                                                    |
| ---------------------------- | -------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| **Next.js**                  | 16.2.4   | Framework (App Router)                                 | `app/` directory, server components by default                                           |
| **React**                    | 19.2.4   | UI runtime                                             | React 19 concurrent features                                                             |
| **TypeScript**               | ^5       | Type safety                                            | Strict mode, path alias `@/` → project root                                              |
| **Tailwind CSS**             | ^4       | Utility styles & design-token layer                    | No `tailwind.config.js` — all config in `app/globals.css` via `@theme {}`                |
| **tw-animate-css**           | ^1.4.0   | Keyframe animation utilities                           | Imported at the top of `globals.css`                                                     |
| **Framer Motion**            | ^12.38.0 | Animations, scroll effects, parallax, page transitions | Used throughout — variants defined in `lib/animations.ts`                                |
| **Lenis**                    | ^1.3.23  | Smooth scroll                                          | Wrapped in `providers/LenisProvider.tsx`; ticked via Framer Motion's `useAnimationFrame` |
| **next-themes**              | ^0.4.6   | Dark/light theme toggle                                | Uses `data-theme` attribute (not `class`) — see `providers/ThemeProvider.tsx`            |
| **Lucide React**             | ^1.11.0  | Icon set                                               | Icons resolved dynamically by name string in `ProductPageTemplate`                       |
| **@base-ui/react**           | ^1.4.1   | Accessible UI primitives                               | Available for forms and overlays                                                         |
| **shadcn**                   | ^4.5.0   | Component scaffolding CLI                              | Config in `components.json`; component source lives in `components/ui/`                  |
| **class-variance-authority** | ^0.7.1   | Variant-driven class composition                       | Used in shadcn-generated components                                                      |
| **clsx**                     | ^2.1.1   | Conditional class merging                              | Wrapped in `lib/utils.ts` as `cn()`                                                      |
| **tailwind-merge**           | ^3.5.0   | Tailwind class conflict resolution                     | Combined with clsx in `cn()`                                                             |
| **@tailwindcss/postcss**     | ^4 (dev) | PostCSS integration                                    | Config in `postcss.config.mjs`                                                           |

> **i18n note:** `next-intl` is **not** currently installed. The site is Italian-only. See [Adding a New Language](#adding-a-new-language) for a step-by-step guide to add locale routing with `next-intl` in the future.

---

## Project Structure

```
medical-support/
├── app/                          # Next.js App Router root
│   ├── globals.css               # ALL design tokens, theme variables, base resets
│   ├── layout.tsx                # Root layout: font loading, providers, Navbar, Footer
│   ├── page.tsx                  # Homepage — composes home section components
│   ├── loading.tsx               # Global loading UI (route transitions)
│   ├── not-found.tsx             # Custom 404 page
│   ├── chi-siamo/
│   │   └── page.tsx              # "Chi siamo" (About) page
│   ├── contatti/
│   │   ├── page.tsx              # Contact page
│   │   └── _ContactForm.tsx      # Client component — contact form (prefixed _ = local)
│   ├── prodotti/
│   │   └── [slug]/
│   │       └── page.tsx          # Dynamic product page — PRODUCT_DATA map + generateStaticParams
│   └── software/
│       ├── page.tsx              # Software (New BMS) page
│       └── _TabSwitcher.tsx      # Client component — tab UI for software features
│
├── components/
│   ├── navigation/
│   │   ├── Navbar.tsx            # Fixed header: logo, desktop nav, theme toggle, mobile trigger
│   │   ├── MegaMenu.tsx          # Desktop dropdown for "Prodotti" nav item
│   │   ├── MobileDrawer.tsx      # Full-screen mobile navigation drawer
│   │   └── Footer.tsx            # Site footer: brand column, nav links, legal
│   ├── sections/
│   │   ├── HeroSection.tsx       # Homepage hero: parallax bg image, SplitText h1, CTAs
│   │   └── home/
│   │       ├── TrustBar.tsx          # Logo bar / trust signals strip
│   │       ├── IntroSection.tsx      # Brand intro text section
│   │       ├── ProductsSection.tsx   # Product cards grid from siteConfig.products
│   │       ├── ApplicationsSection.tsx # Clinical use-case grid
│   │       ├── SoftwareSection.tsx   # New BMS software teaser
│   │       ├── ClinicalSection.tsx   # Clinical evidence / case studies teaser
│   │       └── CTASection.tsx        # Bottom call-to-action banner
│   ├── templates/
│   │   └── ProductPageTemplate.tsx   # Full product page layout: hero, description, features, specs, models
│   └── ui/
│       ├── ScrollReveal.tsx      # Intersection-observer animation wrapper (Framer Motion)
│       ├── SplitText.tsx         # Word-by-word staggered text reveal (hero h1 only)
│       ├── MagneticButton.tsx    # Cursor-magnetic CTA button/link
│       ├── CustomCursor.tsx      # Dual-layer custom cursor (dot + spring-lagged ring)
│       ├── PageTransition.tsx    # Curtain wipe transition between routes
│       ├── NavbarDark.tsx        # Side-effect component — sets navbar to "light-on-dark" mode
│       ├── Logo.tsx              # SVG logo via next/image — swap src for new client
│       ├── badge.tsx             # shadcn Badge primitive
│       ├── button.tsx            # shadcn Button primitive
│       ├── input.tsx             # shadcn Input primitive
│       ├── select.tsx            # shadcn Select primitive
│       ├── separator.tsx         # shadcn Separator primitive
│       ├── sheet.tsx             # shadcn Sheet (drawer) primitive
│       ├── tabs.tsx              # shadcn Tabs primitive
│       └── textarea.tsx          # shadcn Textarea primitive
│
├── config/
│   └── site.ts                   # Central config: site name, URL, nav items, products array
│
├── lib/
│   ├── animations.ts             # Framer Motion variant definitions (fadeUp, slideIn, etc.)
│   └── utils.ts                  # cn() helper = clsx + tailwind-merge
│
├── providers/
│   ├── ThemeProvider.tsx         # next-themes wrapper + ThemeToggle button component
│   ├── LenisProvider.tsx         # Lenis smooth-scroll instance + useLenis() hook
│   └── NavbarThemeProvider.tsx   # Context for navbar colour mode (default | light-on-dark)
│
├── types/
│   └── index.ts                  # Shared TypeScript interfaces: NavItem, Product, SiteConfig
│
├── public/
│   └── images/
│       ├── partner/              # Partner logo images
│       ├── products/             # Product listing images (PNG/WebP)
│       ├── products-hero/        # Product hero background images
│       └── software/             # Software section screenshots
│
├── next.config.ts                # Next.js config (currently empty — no overrides needed)
├── postcss.config.mjs            # PostCSS: @tailwindcss/postcss plugin
├── tsconfig.json                 # TypeScript config: strict, path alias @/ → ./
├── eslint.config.mjs             # ESLint with eslint-config-next
└── components.json               # shadcn CLI configuration
```

---

## Design System

All tokens are defined in `app/globals.css` inside a `@theme {}` block (Tailwind v4 syntax). No `tailwind.config.js` exists.

### Brand Palette

```css
--color-brand-900: #1a3a4d --color-brand-800: #1e4458 --color-brand-700: #085068
	/* primary dark */ --color-brand-600: #2d6080 --color-brand-500: #4a8fa3
	--color-brand-400: #0fb5c8 /* accent / secondary */ --color-brand-300: #8ecfdb
	--color-brand-200: #b3e0e8 --color-brand-100: #e0f3f7
	--color-brand-50: #f4f9fb /* page background (light) */;
```

### Semantic Tokens (theme-aware, resolve at use-site)

| Token                  | Light                   | Dark                   |
| ---------------------- | ----------------------- | ---------------------- |
| `--background`         | `#f4f9fb`               | `#0c1a21`              |
| `--foreground`         | `#0c1a21`               | `#ddeef3`              |
| `--primary`            | `#085068`               | `#0fb5c8`              |
| `--primary-foreground` | `#f4f9fb`               | `#0c1a21`              |
| `--secondary`          | `#0fb5c8`               | `#1a2e3d`              |
| `--accent`             | `#0fb5c8`               | `#4a8fa3`              |
| `--muted`              | `#e0f3f7`               | `#1a2e3d`              |
| `--surface`            | `#ffffff`               | `#122130`              |
| `--surface-2`          | `#f4f9fb`               | `#1a2e3d`              |
| `--border`             | `oklch-mix 12% primary` | `oklch-mix 12% accent` |

Dark mode is triggered by the `data-theme="dark"` attribute on `<html>` (not a `class`). The `@custom-variant dark` in `globals.css` maps to this attribute.

### Typography Scale (fluid, clamp-based)

```css
--text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem) /* 12–14 px */
	--text-sm: clamp(0.875rem, 0.825rem + 0.25vw, 1rem) /* 14–16 px */
	--text-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem) /* 16–18 px */
	--text-lg: clamp(1.125rem, 1.05rem + 0.375vw, 1.375rem) /* 18–22 px */
	--text-xl: clamp(1.25rem, 1.15rem + 0.5vw, 1.625rem) /* 20–26 px */
	--text-2xl: clamp(1.5rem, 1.35rem + 0.75vw, 2rem) /* 24–32 px */
	--text-3xl: clamp(1.875rem, 1.625rem + 1.25vw, 2.5rem) /* 30–40 px */
	--text-4xl: clamp(2.25rem, 1.9rem + 1.75vw, 3.25rem) /* 36–52 px */
	--text-hero: clamp(2.75rem, 2.25rem + 2.5vw, 4.5rem) /* 44–72 px */;
```

### Spacing Scale (4 px grid)

```css
--space-1: 0.25rem /*   4 px */ --space-2: 0.5rem /*   8 px */
	--space-3: 0.75rem /*  12 px */ --space-4: 1rem /*  16 px */
	--space-5: 1.25rem /*  20 px */ --space-6: 1.5rem /*  24 px */ --space-8: 2rem
	/*  32 px */ --space-10: 2.5rem /*  40 px */ --space-12: 3rem /*  48 px */
	--space-16: 4rem /*  64 px */ --space-20: 5rem /*  80 px */ --space-24: 6rem
	/*  96 px */ --space-28: 7rem /* 112 px */ --space-32: 8rem /* 128 px */;
```

### Typography

- **Font family:** `Figtree` (Google Fonts), loaded via `next/font/google` in `app/layout.tsx`
- **CSS variable exposed:** `--font-figtree` (applied as `fontFamily: "var(--font-figtree), sans-serif"` on `<body>`)
- **Weights loaded:** 400, 500, 600, 700, 800
- **Aliases in `@theme`:** `--font-display`, `--font-body`, and `--font-sans` all resolve to `"Figtree", sans-serif`

### Radii & Shadows

All border-radius tokens are set to `0px` — the design uses a sharp, clinical aesthetic with no rounded corners. All shadow tokens are also `none`. These are intentional design decisions and should be kept unless the client brand requires otherwise.

### Transition

```css
--transition-ui: 200ms cubic-bezier(0.16, 1, 0.3, 1)
	--ease-ui: cubic-bezier(0.16, 1, 0.3, 1);
```

### Layout Convention

There are no `--content-*` width tokens. All sections use fluid inline padding via:

```css
paddinginline: "clamp(24px, 5vw, 80px)";
```

**All spacing and sizing is done with CSS tokens via inline `style={{}}` objects — Tailwind utility classes are intentionally avoided for layout and spacing in page components.**

---

## Key Architectural Patterns

### Component Style Convention

Components use **inline `style={{ }}`** with CSS token variables for all spacing, sizing, and colour. Tailwind utility classes (`className`) are only used for:

- Responsive visibility (`hidden md:flex`)
- Component state classes generated by shadcn primitives
- The `cn()` helper for conditional classes

Example of the standard section wrapper pattern:

```tsx
const sectionPad: React.CSSProperties = {
	paddingBlock: "clamp(80px, 10vw, 140px)",
	paddingInline: "clamp(24px, 5vw, 80px)",
};

function MySection() {
	return (
		<section style={{ ...sectionPad, background: "var(--surface)" }}>
			<ScrollReveal variant="fadeUp" delay={0}>
				<h2 style={{ fontSize: "var(--text-3xl)", color: "var(--foreground)" }}>
					Section Title
				</h2>
			</ScrollReveal>
		</section>
	);
}
```

### Section Pattern (ProductPageTemplate)

The `sectionPad` constant is defined at the top of each page/template file and spread into every `<section>` style. Children are wrapped in `<ScrollReveal>` with incremental `delay` values to stagger their entrance animations.

```tsx
// From components/templates/ProductPageTemplate.tsx
const sectionPad: React.CSSProperties = {
	paddingBlock: "clamp(80px, 10vw, 140px)",
	paddingInline: "clamp(24px, 5vw, 80px)",
};

// Usage
<section style={{ ...sectionPad, background: "var(--muted)" }}>
	<ScrollReveal delay={0}> {/* heading  */}</ScrollReveal>
	<ScrollReveal delay={0.1}> {/* subtext  */}</ScrollReveal>
	<ScrollReveal delay={0.2}> {/* content  */}</ScrollReveal>
</section>;
```

### ScrollReveal

`components/ui/ScrollReveal.tsx` — a thin Framer Motion wrapper that triggers an entrance animation when the element scrolls into view.

**Props:**

| Prop        | Type                                                                                   | Default    | Description                                                     |
| ----------- | -------------------------------------------------------------------------------------- | ---------- | --------------------------------------------------------------- |
| `variant`   | `"fadeUp" \| "fadeIn" \| "slideInLeft" \| "slideInRight" \| "scaleIn" \| "clipReveal"` | `"fadeUp"` | Animation variant from `lib/animations.ts`                      |
| `delay`     | `number`                                                                               | `0`        | Seconds to delay the animation start — used to stagger siblings |
| `once`      | `boolean`                                                                              | `true`     | Whether to replay when scrolling back up                        |
| `threshold` | `number`                                                                               | `0.15`     | Fraction of the element visible before triggering               |
| `as`        | `ElementType`                                                                          | `"div"`    | Rendered HTML element                                           |
| `className` | `string`                                                                               | —          | Passed to the motion element                                    |

**Stagger pattern:** Apply incrementing `delay` values (e.g. `0`, `0.1`, `0.2`) to consecutive `<ScrollReveal>` siblings inside the same section.

### SplitText

`components/ui/SplitText.tsx` — renders a heading with each **word** animating in independently using a staggered opacity/y reveal. Use this only for primary `<h1>` headings in hero sections.

**Props:**

| Prop                | Type                                  | Default           | Description                                        |
| ------------------- | ------------------------------------- | ----------------- | -------------------------------------------------- |
| `text` / `children` | `string`                              | —                 | Text content (must be a plain string)              |
| `tag`               | `"h1" \| "h2" \| "h3" \| "h4" \| "p"` | `"p"`             | The rendered HTML element                          |
| `delay`             | `number`                              | `0`               | Delay before the stagger begins                    |
| `stagger`           | `number`                              | `0.04`            | Seconds between each word appearing                |
| `accentWords`       | `string[]`                            | —                 | Words to render in `accentColor`                   |
| `accentColor`       | `string`                              | `"var(--accent)"` | CSS colour value for accented words                |
| `immediate`         | `boolean`                             | `false`           | Skip scroll trigger — animate immediately on mount |

```tsx
<SplitText
	tag="h1"
	stagger={0.03}
	delay={0.2}
	style={{
		fontSize: "var(--text-hero)",
		fontWeight: 500,
		color: "var(--primary)",
	}}
	accentWords={["diagnostica", "3D"]}
	accentColor="var(--accent)"
>
	L'innovazione della diagnostica 3D
</SplitText>
```

### MagneticButton

`components/ui/MagneticButton.tsx` — a Framer Motion button/anchor that follows the cursor with a spring offset when hovered, creating a magnetic attraction effect. Use for primary CTAs.

**Props:**

| Prop                  | Type              | Default    | Description                        |
| --------------------- | ----------------- | ---------- | ---------------------------------- |
| `as`                  | `"button" \| "a"` | `"button"` | Rendered element                   |
| `href`                | `string`          | —          | Required when `as="a"`             |
| `strength`            | `number`          | `0.4`      | Magnetic pull strength (0–1 range) |
| `className` / `style` | —                 | —          | Passed to the element              |

```tsx
<MagneticButton
	as="a"
	href="/contatti"
	style={{
		padding: "14px 32px",
		background: "var(--primary)",
		color: "var(--primary-foreground)",
		fontSize: "var(--text-sm)",
		fontWeight: 600,
	}}
>
	Richiedi un preventivo
</MagneticButton>
```

### NavbarThemeProvider + NavbarDark

The `Navbar` is transparent on page load and gains a `--background` fill after the user scrolls 50 px. On pages with a **dark hero image**, the navbar text and icons need to be white (not dark) before scrolling.

**Pattern:**

1. `providers/NavbarThemeProvider.tsx` provides a `navbarTheme` context value (`"default"` | `"light-on-dark"`) that the `Navbar` reads.
2. `components/ui/NavbarDark.tsx` is a **render-nothing** client component that calls `setNavbarTheme("light-on-dark")` on mount and resets to `"default"` on unmount.
3. Drop `<NavbarDark />` as the first child of any page that has a dark hero background.

```tsx
// app/prodotti/[slug]/page.tsx
import { NavbarDark } from "@/components/ui/NavbarDark";

export default function ProductPage() {
	return (
		<>
			<NavbarDark />
			{/* rest of page */}
		</>
	);
}
```

The `Navbar` then derives `lightContent = navbarTheme === "light-on-dark" && !scrolled` and conditionally applies white styles to text and icons.

---

## Page Transitions

`components/ui/PageTransition.tsx` wraps all page content in an `AnimatePresence` keyed by `usePathname()`. On every route change, two curtain panels (top half and bottom half, coloured with `--primary`) slide in and then slide out, revealing the new page underneath. The effect is a vertical split-wipe transition.

This component is mounted once in `app/layout.tsx` — no per-page configuration needed.

---

## Custom Cursor

`components/ui/CustomCursor.tsx` renders two absolutely-positioned elements: a small dot that follows the cursor directly and a larger ring that spring-lags behind it. On touch devices (`hover: none` media query) the cursor is hidden entirely. The cursor expands when hovering any `a`, `button`, or `[data-cursor="hover"]` element.

Mounted once in `app/layout.tsx`. No per-component work required.

---

## Adding a New Product Page

### Step 1 — Register the product in `config/site.ts`

Add an entry to the `products` array:

```ts
{
  id: "my-new-device",
  name: "My New Device",
  slug: "my-new-device",          // must be URL-safe
  tagline: "Short marketing line",
  description: "Longer description for cards and meta tags.",
  badges: ["Badge 1", "Badge 2"],
  category: "diagnostica",        // "diagnostica" | "produzione"
  image: "/images/products/my-new-device.png",
}
```

### Step 2 — Add the page data in `app/prodotti/[slug]/page.tsx`

Add a key to the `PRODUCT_DATA` object:

```ts
"my-new-device": {
  descriptionTitle: "Optional subtitle shown above the description paragraphs.",
  heroTagline: "Shown large in the hero section of the product page.",
  description: [
    "First paragraph of body copy.",
    "Second paragraph.",
  ],
  features: [
    {
      icon: "BarChart3",   // any key from ICON_MAP in ProductPageTemplate
      title: "Feature Name",
      description: "Feature description.",
    },
  ],
  specs: [
    { label: "Resolution", value: "0.5 mm" },
  ],
  models: [                       // optional — renders a models comparison table
    { name: "Pro", dimensions: "560 × 380 mm", sensors: 7, use: "Clinical" },
  ],
},
```

Available icon names (from `ICON_MAP` in `components/templates/ProductPageTemplate.tsx`): `Activity`, `BarChart3`, `Cloud`, `Cpu`, `Database`, `Globe`, `Heart`, `Layers`, `Monitor`, `Settings`, `Shield`, `Wifi`, `Zap`.

### Step 3 — No new file needed

`generateStaticParams()` in `app/prodotti/[slug]/page.tsx` reads `siteConfig.products` and pre-renders all slugs at build time.

### Step 4 — Add `<NavbarDark />` if the product hero is dark

```tsx
export default async function ProductPage({ params }) {
	return (
		<>
			<NavbarDark />
			<ProductPageTemplate product={product} {...data} />
		</>
	);
}
```

---

## Adding a New Language (next-intl setup)

i18n is **not currently implemented**. The site is Italian-only. To add multilingual support:

### 1. Install next-intl

```bash
pnpm add next-intl
```

### 2. Create `i18n/routing.ts`

```ts
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
	locales: ["it", "en"],
	defaultLocale: "it",
});
```

### 3. Create `i18n/request.ts`

```ts
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
	const locale = (await requestLocale) ?? routing.defaultLocale;
	return {
		locale,
		messages: (await import(`../messages/${locale}.json`)).default,
	};
});
```

### 4. Create `middleware.ts` at the project root

```ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
	matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
```

### 5. Move `app/` pages under `app/[locale]/`

Rename the directory and update `app/[locale]/layout.tsx` to wrap children in `NextIntlClientProvider`:

```tsx
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export default async function LocaleLayout({ children, params }) {
	const { locale } = await params;
	const messages = await getMessages();
	return (
		<html lang={locale}>
			<body>
				<NextIntlClientProvider messages={messages}>
					{children}
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
```

### 6. Create translation files

```
messages/
  it.json
  en.json
```

Add a third locale by adding it to the `locales` array in `i18n/routing.ts` and creating the corresponding `messages/fr.json` file.

---

## Reusing This as a Template for a New Client Site

Checklist of every file to change when cloning this repo:

- [ ] **`config/site.ts`** — update `name`, `description`, `url`, nav items, and the entire `products` array
- [ ] **`app/globals.css`** — replace the `--color-brand-*` palette and all `:root` / `[data-theme="dark"]` semantic tokens with the client's brand colours
- [ ] **Font** — replace `Figtree` in `app/layout.tsx` with the client's typeface; update `--font-display`, `--font-body`, `--font-sans` in `globals.css`
- [ ] **`components/ui/Logo.tsx`** — update `src="/logo-ms.svg"` to the new client's SVG logo path
- [ ] **`app/layout.tsx`** — update `metadata.title`, `metadata.description`, and `lang` attribute
- [ ] **`components/navigation/Footer.tsx`** — update address, email, phone, certifications, and legal text
- [ ] **`app/prodotti/[slug]/page.tsx`** — replace all keys in `PRODUCT_DATA` with the new client's product data
- [ ] **`public/images/`** — replace all product images, hero background (`hero-bg.jpg`), software screenshots, and partner logos
- [ ] **`types/index.ts`** — extend if the new client's product model requires additional fields
- [ ] **Home page sections** (`components/sections/home/`) — update all copy, statistics, and imagery
- [ ] **`app/chi-siamo/page.tsx`** — replace with the new client's about content
- [ ] **`app/contatti/page.tsx`** — update contact form endpoint and address details

---

## Local Development

```bash
# Install dependencies
pnpm install

# Run dev server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint
pnpm lint
```

---

## Environment & Deployment Notes

- **No environment variables** are required for base functionality. The contact form (`app/contatti/_ContactForm.tsx`) will need an API endpoint or a service key (e.g. Resend, Formspree) added as an env var when wired up.
- **Vercel** is the recommended deployment target — zero configuration required for Next.js App Router.
- All product pages are **statically generated** at build time via `generateStaticParams()` in `app/prodotti/[slug]/page.tsx`.
- All pages are **React Server Components** by default. Components that use browser APIs, hooks, or Framer Motion are marked `"use client"` at the top of the file.
- The custom cursor is automatically hidden on touch devices — no mobile-specific code needed.
